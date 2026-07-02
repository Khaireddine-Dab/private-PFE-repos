/**
 * ETAPE 5 - RERANKER
 * Fusion RRF (Reciprocal Rank Fusion) + Cross-Encoder / LLM reranking
 */

import { SearchResult } from './vector-search'

export interface RerankerOptions {
  query:        string
  intent?:      string
  isSuggestion: boolean
}

const NATIVE_TYPES = new Set(['STORE', 'ITEM', 'REEL'])

export function reciprocalRankFusion(
  vectorResults: SearchResult[],
  textResults:   SearchResult[],
  linkedReels:   SearchResult[],
  k = 60,
): SearchResult[] {
  const scores = new Map<string, { score: number; item: SearchResult }>()

  const add = (list: SearchResult[], weight: number) => {
    list.forEach((item, r) => {
      const id  = item.id != null ? String(item.id) : (item.name ?? '').slice(0, 20)
      const key = `${item.result_type ?? 'UNK'}::${id}`
      const s = weight / (k + r + 1)
      const existing = scores.get(key)
      if (existing) existing.score += s
      else scores.set(key, { score: s, item })
    })
  }

  add(vectorResults, 1.8)
  add(textResults,   1.2)
  add(linkedReels,   1.0)

  return [...scores.values()]
    .sort((a, b) => b.score - a.score)
    .map(x => x.item)
}

function getModelChain(): string[] {
  const list = [
    process.env.OPENROUTER_MODEL,
    'meta-llama/llama-3.2-3b-instruct',
    'meta-llama/llama-3.3-70b-instruct',
    'meta-llama/llama-3.2-3b-instruct:free',
    'meta-llama/llama-3.3-70b-instruct:free',
  ].filter(Boolean) as string[]
  return [...new Set(list)]
}

async function crossEncoderRerank(
  query: string,
  results: SearchResult[],
  topN = 15,
): Promise<SearchResult[] | null> {
  if (results.length < 2) return results

  const toRerank = results.slice(0, topN)
  const documents = toRerank.map(it => {
    const name = it.name ?? it.title ?? ''
    const desc = it.description ?? ''
    const type = it.result_type ?? ''
    const city = it.location_city ?? ''
    const cat = it.category ?? ''
    return `Nom: ${name}. Type: ${type}. Categorie: ${cat}. Ville: ${city}. Description: ${desc}`.trim()
  })

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) return null

  const models = ['cohere/rerank-v3.5', 'nvidia/llama-nemotron-rerank-vl-1b-v2']

  for (const model of models) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/rerank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          'X-Title': 'Ro2ya Search Reranker',
        },
        body: JSON.stringify({
          model,
          query,
          documents,
          top_n: topN,
        }),
      })

      if (!res.ok) {
        console.warn(`[CROSS-ENCODER] Model ${model} failed with HTTP ${res.status}`)
        continue
      }

      const data = await res.json()
      const rerankedResults = data.results as Array<{ index: number; relevance_score: number }>
      if (!rerankedResults || rerankedResults.length === 0) {
        console.warn(`[CROSS-ENCODER] Model ${model} returned empty results`)
        continue
      }

      const ordered = rerankedResults
        .map(r => toRerank[r.index])
        .filter(Boolean)

      const seenIdx = new Set(rerankedResults.map(r => r.index))
      const remaining = toRerank.filter((_, i) => !seenIdx.has(i))

      console.log(`[CROSS-ENCODER] Successful rerank with ${model}`)
      return [...ordered, ...remaining, ...results.slice(topN)]
    } catch (err: any) {
      console.warn(`[CROSS-ENCODER] Error with model ${model}:`, err.message)
    }
  }

  return null
}

async function llmRerankGemini(
  query: string,
  list: string,
  systemPrompt: string,
): Promise<number[] | null> {
  const geminiKey = process.env.GEMINI_API_KEY
  if (!geminiKey) return null

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`
    const userText = `${systemPrompt}\n\nVoici la liste :\n${list}`
    
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: userText }] }],
        generationConfig: { maxOutputTokens: 100, temperature: 0.1 },
      }),
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
    if (!text) return null

    const cleanText = text.replace(/```[a-z]*\n?/g, '').replace(/```\n?/g, '').trim()
    const order = cleanText.split(',').map((x: string) => parseInt(x.replace(/[^0-9]/g, '').trim(), 10)).filter((x: number) => !isNaN(x))
    if (order.length >= 2) {
      console.log('[RERANKER] Gemini direct rerank succeeded')
      return order
    }
  } catch (err: any) {
    console.warn('[RERANKER] Gemini direct failed:', err.message)
  }
  return null
}

async function llmRerankGroq(
  query: string,
  list: string,
  systemPrompt: string,
): Promise<number[] | null> {
  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) return null

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: list },
        ],
        max_tokens: 100,
        temperature: 0.1,
      }),
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const text = data.choices?.[0]?.message?.content?.trim()
    if (!text) return null

    const order = text.split(',').map((x: string) => parseInt(x.replace(/[^0-9]/g, '').trim(), 10)).filter((x: number) => !isNaN(x))
    if (order.length >= 2) {
      console.log('[RERANKER] Groq direct rerank succeeded')
      return order
    }
  } catch (err: any) {
    console.warn('[RERANKER] Groq direct failed:', err.message)
  }
  return null
}

async function llmRerank(
  rawQuery: string,
  normalizedQuery: string,
  results: SearchResult[],
  intent: string,
  topN = 15,
): Promise<SearchResult[]> {
  if (results.length < 4) return results

  const toRerank = results.slice(0, topN)
  const list = toRerank
    .map((it, i) => `${i}:${it.name ?? it.title ?? '?'}(${it.result_type}) - ${(it.description ?? '').slice(0, 60)}`)
    .join('\n')

  const displayQuery = normalizedQuery !== rawQuery ? `${rawQuery} (= ${normalizedQuery})` : rawQuery

  const systemPrompt = `Expert marketplace tunisienne. Trie ces resultats pour "${displayQuery}" (intent:${intent}).
  Priorites: 1)Correspondance exacte 2)STORE/ITEM/REEL natifs avant annuaires 3)Rejette hors-sujet.
  Reponds OBLIGATOIREMENT UNIQUEMENT avec les indices en ordre decroissant de pertinence, separes par virgule, sans texte explicatif. Ex: 2,0,5,1`

  let order = await llmRerankGemini(displayQuery, list, systemPrompt)
  
  if (!order) {
    order = await llmRerankGroq(displayQuery, list, systemPrompt)
  }

  if (!order) {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (apiKey) {
      let lastErr: Error | null = null
      for (const model of getModelChain()) {
        try {
          const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
              'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
              'X-Title': 'Ro2ya Reranker',
            },
            body: JSON.stringify({
              model,
              max_tokens: 120,
              temperature: 0.1,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: list },
              ],
            }),
          })
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const data = await res.json()
          const text = data.choices?.[0]?.message?.content?.trim()
          if (!text) throw new Error('Empty')
          order = text
            .split(',')
            .map((x: string) => parseInt(x.trim(), 10))
            .filter((x: number) => !isNaN(x))
          if (order && order.length >= 2) {
            console.log(`[RERANKER] OpenRouter (${model}) rerank succeeded`)
            break
          }
        } catch (e) {
          lastErr = e as Error
        }
      }
      if (!order) {
        console.warn('[RERANKER] All OpenRouter LLM attempts failed:', lastErr?.message)
      }
    }
  }

  if (order && order.length >= 2) {
    const validOrder = order.filter((x: number) => x >= 0 && x < topN)
    const reranked = validOrder.map((i: number) => toRerank[i]).filter(Boolean)
    const seenIdx = new Set(validOrder)
    const remaining = toRerank.filter((_: any, i: number) => !seenIdx.has(i))
    return [...reranked, ...remaining, ...results.slice(topN)]
  }

  return results
}

function finalSort(items: SearchResult[], isSuggestion: boolean): SearchResult[] {
  return [...items].sort((a, b) => {
    if (isSuggestion) {
      const ORDER: Record<string, number> = { STORE: 1, REEL: 2, ITEM: 3, SERVICE_DIR: 4, BUSINESS_DIR: 5 }
      const diff = (ORDER[a.result_type] ?? 6) - (ORDER[b.result_type] ?? 6)
      if (diff !== 0) return diff
    } else {
      const aN = NATIVE_TYPES.has(a.result_type)
      const bN = NATIVE_TYPES.has(b.result_type)
      if (aN !== bN) return aN ? -1 : 1
    }
    if (a.distance != null && b.distance != null && Math.abs(a.distance - b.distance) > 5) {
      return a.distance - b.distance
    }
    const aR = Number(a.rating_average ?? a.metadata?.rating ?? a.totalScore ?? 0)
    const bR = Number(b.rating_average ?? b.metadata?.rating ?? b.totalScore ?? 0)
    return bR - aR
  })
}

const RERANK_TIMEOUT_MS = 5000

function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([p, new Promise<T>(r => setTimeout(() => r(fallback), ms))])
}

export async function rerank(
  vectorResults: SearchResult[],
  textResults:   SearchResult[],
  linkedReels:   SearchResult[],
  options:       RerankerOptions,
): Promise<SearchResult[]> {
  const { query, intent = 'other', isSuggestion } = options
  const t0 = Date.now()

  const fused = reciprocalRankFusion(vectorResults, textResults, linkedReels)

  const normalizedQuery = (options as any).normalizedQuery ?? query

  let reranked = fused
  if (!isSuggestion && fused.length > 4) {
    const crossRes = await withTimeout(
      crossEncoderRerank(normalizedQuery, fused),
      RERANK_TIMEOUT_MS,
      null
    )
    if (crossRes) {
      reranked = crossRes
    } else {
      reranked = await withTimeout(
        llmRerank(query, normalizedQuery, fused, intent),
        RERANK_TIMEOUT_MS,
        fused,
      )
    }
  }

  const output = finalSort(reranked, isSuggestion)

  if (process.env.NODE_ENV !== 'production') {
    console.log('\n----------------------------------------------------------')
    console.log(`[RERANKER] ${output.length} resultats finaux en ${Date.now() - t0}ms`)
    output.slice(0, 5).forEach((r, i) =>
      console.log(`   [${i}] ${r.result_type}: "${r.name}" - ${r.location_city ?? 'N/A'}`)
    )
    console.log('----------------------------------------------------------\n')
  }

  return output
}
