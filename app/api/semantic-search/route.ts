import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { doGlobalSemanticSearch } from '@/lib/actions/search'

// ── Config ────────────────────────────────────────────────────────────────────

const ROUTE_TIMEOUT_MS = 8000   // Hard ceiling — prevents serverless function timeouts
const MAX_QUERY_LEN    = 200    // Reject absurdly long queries
const MIN_QUERY_LEN    = 2

// ── Groq Client (for image analysis) ──────────────────────────────────────────
const groqClient = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
  timeout: 25000,
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function sanitizeString(val: unknown, maxLen = 100): string {
  if (typeof val !== 'string') return ''
  return val.trim().slice(0, maxLen)
}

function sanitizeNumber(val: unknown): number | undefined {
  const n = typeof val === 'number' ? val : parseFloat(val as string)
  return isFinite(n) ? n : undefined
}

/**
 * Wraps a promise with a hard timeout.
 * Resolves to `fallback` if the deadline is exceeded — never throws.
 */
function withDeadline<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise.catch(() => fallback),
    new Promise<T>(resolve => setTimeout(() => resolve(fallback), ms)),
  ])
}

/**
 * Analyze image using Groq (Llama 4) and generate search query
 * Matches: POST /api/image-search logic but integrated here
 */
async function analyzeImageForQuery(base64Image: string): Promise<string | null> {
  try {
    if (!base64Image.startsWith('data:image/')) {
      console.error('[Image Analysis] Invalid image format')
      return null
    }

    const response = await groqClient.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: base64Image },
            },
            {
              type: 'text',
              text: `You are a marketplace search assistant for Ro2ya, a Tunisian marketplace.
Look at this image and generate a short search query (5-10 words max).
Reply ONLY with the search query.
Respond in French.`,
            },
          ],
        },
      ],
    })

    const query = response.choices[0]?.message?.content?.trim() ?? ''
    return query || null
  } catch (error) {
    console.error('[Image Analysis Error]', error)
    return null
  }
}

// ── POST /api/search ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // ── 1. Parse body ──────────────────────────────────────────────────────────
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  // ── 2. Handle image-based search (new feature) ─────────────────────────────
  let query = sanitizeString(body.query, MAX_QUERY_LEN)

  // If image provided, analyze it first to generate query
  if (!query && body.image) {
    const imageBase64 = sanitizeString(body.image as string, 500000) // Max 500KB base64
    const generatedQuery = await analyzeImageForQuery(imageBase64)
    if (generatedQuery) {
      query = generatedQuery
      console.log('[Semantic Search] Generated query from image:', query)
    }
  }

  if (query.length < MIN_QUERY_LEN) {
    return NextResponse.json({ results: [], count: 0 })
  }

  // ── 3. Validate & sanitize inputs ──────────────────────────────────────────
  const location     = sanitizeString(body.location, 100)   || undefined
  const category     = sanitizeString(body.category, 60)    || undefined
  const userLat      = sanitizeNumber(body.userLat)
  const userLng      = sanitizeNumber(body.userLng)
  const isSuggestion = body.isSuggestion === true

  // Validate coordinates range (Tunisia + surrounding area)
  const validLat = userLat !== undefined && userLat >= 28 && userLat <= 40
  const validLng = userLng !== undefined && userLng >= 5  && userLng <= 15
  const safeUserLat = validLat ? userLat : undefined
  const safeUserLng = validLng ? userLng : undefined

  // ── 4. Run search with hard timeout ───────────────────────────────────────
  const t0 = Date.now()

  const results = await withDeadline(
    doGlobalSemanticSearch(
      query,
      location,
      category,
      safeUserLat,
      safeUserLng,
      isSuggestion,
    ),
    ROUTE_TIMEOUT_MS,
    [], // empty results on timeout rather than error
  )

  const elapsed = Date.now() - t0

  // ── 5. Response ────────────────────────────────────────────────────────────
  const response = NextResponse.json({
    results,
    count:      results.length,
    elapsed_ms: elapsed,
    processing: 'semantic-hybrid-rrf',
    query,      // Include the query (important for image-based searches)
    ...(elapsed >= ROUTE_TIMEOUT_MS ? { warning: 'timeout' } : {}),
  })

  // Cache-Control: short TTL for suggestions, longer for full searches
  const maxAge = isSuggestion ? 30 : 120
  response.headers.set('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate=60`)

  return response
}

// ── GET /api/search?q=... ─────────────────────────────────────────────────────
// Convenience method for simple queries (useful for debugging / browser testing)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query    = sanitizeString(searchParams.get('q') ?? '', MAX_QUERY_LEN)
  const location = sanitizeString(searchParams.get('location') ?? '', 100) || undefined
  const category = sanitizeString(searchParams.get('category') ?? '', 60)  || undefined

  if (query.length < MIN_QUERY_LEN) {
    return NextResponse.json({ results: [], count: 0 })
  }

  const results = await withDeadline(
    doGlobalSemanticSearch(query, location, category, undefined, undefined, false),
    ROUTE_TIMEOUT_MS,
    [],
  )

  return NextResponse.json({ results, count: results.length, processing: 'semantic-hybrid-rrf' })
}