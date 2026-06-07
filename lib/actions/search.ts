'use server'

// ═══════════════════════════════════════════════════════════════════════════════
// CONSOLIDATED SEARCH PIPELINE — ALL MODULES MERGED
// Support natif Darija tunisien + arabe + français + code-switch
// Modules consolidés:
//   - normalizer.ts   → normalizeQuery() & NormalizedQuery
//   - vector-search.ts → vectorSearch() & haversineKm()
//   - hybrid-search.ts → hybridSearch() & fetchLinkedReels()
//   - reranker.ts     → rerank() & RRF fusion
//   - search.ts       → doGlobalSemanticSearch() & store/item/service searches
// ═══════════════════════════════════════════════════════════════════════════════

import { createClient } from '@/lib/supabase/server'
import { Business } from '@/types/business'
import {
  DARIJA_TUNISIAN_DICTIONARY,
  extractDarijaWords,
  translateDarijaForSearch,
} from '@/lib/darija-dictionary'
import { logUserSearch } from './user-activity'
import { generateQueryEmbedding } from '@/lib/openrouter-embeddings'
import { Item } from './items'
import { cacheGet, cacheSet } from '@/lib/cache/redis'
import { monitoring } from '@/lib/monitoring'

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1: TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

export interface NormalizedQuery {
  /** Requête originale nettoyée */
  original: string
  /** Phrase traduite mot à mot (Darija → Français) */
  translated: string
  /** Phrase étendue avec expansions sémantiques (pour l'embedding) */
  expanded: string
  /** Mots-clés uniques pour la recherche texte */
  keywords: string[]
  /** Script détecté */
  script: 'arabic' | 'latin_darija' | 'french' | 'mixed' | 'numeric'
  /** Catégories Darija détectées */
  detectedCategories: string[]
  /** Expansions sémantiques générées depuis les catégories */
  semanticExpansions: string[]
  /** true si tous les mots sont dans le dictionnaire (skip LLM) */
  fullyTranslated: boolean
  /** Mots Darija détectés avec leur traduction */
  darijaWords: Array<{ original: string; french: string; category: string }>
}

export interface SearchResult {
  id: number | string
  name: string
  description?: string
  result_type: 'STORE' | 'ITEM' | 'REEL' | 'BUSINESS_DIR' | 'SERVICE_DIR'
  image_url?: string
  similarity?: number
  location_city?: string
  category?: string
  metadata?: Record<string, any>
  distance?: number
  is_nearby?: boolean
  [key: string]: any
}

export interface VectorSearchOptions {
  threshold?: number
  limit?: number
  geoFilter?: { lat: number; lng: number; deltaDeg?: number }
}

export interface HybridSearchOptions {
  originalQuery: string
  translatedQuery: string
  keywords: string[]
  location?: string
  category?: string
}

export interface RerankerOptions {
  query: string
  intent?: string
  isSuggestion: boolean
}

export interface SearchResultItem extends Item {
  stores?: {
    id: number
    name: string
    logo_url?: string
    status?: string
    category?: string
    [key: string]: any
  }
  is_nearby?: boolean
  distance?: number
  [key: string]: any
}

interface CacheEntry {
  ts: number
  data: any
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2: CONSTANTS & CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

const CACHE_TTL_MS = 1000 * 60 * 10 // 10 min
const MAX_CACHE_SIZE = 500
const EMBED_TIMEOUT_MS = 4000
const RERANK_TIMEOUT_MS = 2000

const NATIVE_TYPES = new Set(['STORE', 'ITEM', 'REEL'])

const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F]/
const LATIN_REGEX = /[a-zA-Z]/
const DIGIT_REGEX = /\d/

const CATEGORY_SEMANTIC_MAP: Record<string, string[]> = {
  verb: ['action', 'service', 'prestation'],
  auto: ['voiture', 'mécanique', 'garage', 'pneu', 'huile', 'révision', 'carrosserie'],
  nourriture: ['restaurant', 'traiteur', 'plat', 'cuisine', 'repas', 'livraison', 'menu', 'food', 'manger', 'restauration rapide'],
  commerce: ['magasin', 'boutique', 'vente', 'achat', 'marché', 'shop'],
  beaute: ['coiffure', 'salon', 'soin', 'esthétique', 'manucure', 'hammam'],
  santé: ['médecin', 'clinique', 'pharmacie', 'docteur', 'soins'],
  mode: ['vêtements', 'habits', 'prêt-à-porter', 'confection', 'tissu'],
  lieux: ['quartier', 'adresse', 'local', 'espace', 'lieu'],
  transports: ['taxi', 'livraison', 'transport', 'chauffeur', 'déménagement'],
  artisanat: ['fait main', 'traditionnel', 'artisan', 'poterie', 'tissu'],
  gastronomie: ['cuisine tunisienne', 'spécialité', 'plat traditionnel', 'restaurant'],
  product: ['produit', 'article', 'vente', 'achat'],
  business: ['entreprise', 'boutique', 'service', 'professionnel'],
  services: ['prestataire', 'artisan', 'technicien', 'réparation'],
  médical: ['santé', 'médecin', 'clinique', 'pharmacie', 'soins'],
  éducation: ['cours', 'formation', 'école', 'enseignement', 'soutien'],
  finance: ['banque', 'assurance', 'crédit', 'prêt'],
  sport: ['fitness', 'salle', 'coach', 'musculation', 'yoga'],
}

const memoryQueryCache = new Map<string, CacheEntry>()

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3: UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════
// Fonctions utilitaires pour: timeout avec fallback, cache mémoire, extraction ville,
// filtres Supabase, calculs géographiques, détection de script, traductions Darija
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * withTimeout — Ajoute un timeout à une Promise avec fallback
 * 🎯 Rôle: Protéger les opérations longues (API, embeddings) avec timeout + fallback
 * @param promise Promise à exécuter
 * @param ms Timeout en millisecondes
 * @param fallback Valeur par défaut si timeout atteint
 * @returns Résultat ou fallback si timeout
 * @usage withTimeout(fetchData(), 3000, [])
 */
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>(resolve => setTimeout(() => resolve(fallback), ms)),
  ])
}

/**
 * memorySetCache — Enregistre données dans cache mémoire (LRU)
 * 🎯 Rôle: Mettre en cache les résultats de recherche pour éviter requêtes redondantes
 * @param key Clé unique pour le cache
 * @param data Données à cacher
 * @description Supprime l'entrée la plus ancienne si cache full (MAX_CACHE_SIZE=500)
 */
function memorySetCache(key: string, data: any) {
  if (memoryQueryCache.size >= MAX_CACHE_SIZE) {
    const oldest = memoryQueryCache.keys().next().value
    if (oldest) memoryQueryCache.delete(oldest)
  }
  memoryQueryCache.set(key, { ts: Date.now(), data })
}

/**
 * memoryGetCache — Récupère données du cache mémoire
 * 🎯 Rôle: Vérifier si résultat déjà en cache + éviter requête DB/API
 * @param key Clé unique du cache
 * @returns Données cachées ou null si expiré/absent
 * @description Expires après CACHE_TTL_MS (10 min), déplace entrée au bout (LRU)
 */
function memoryGetCache(key: string): any | null {
  const entry = memoryQueryCache.get(key)
  if (!entry) return null
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    memoryQueryCache.delete(key)
    return null
  }
  memoryQueryCache.delete(key)
  memoryQueryCache.set(key, entry)
  return entry.data
}

/**
 * extractCity — Extrait la ville de la string location
 * 🎯 Rôle: Parser location en ville pour filtrer résultats par géolocalisation
 * @param location String location (ex: "Tunis", "près de Tunis", "7awli moi")
 * @returns Nom de la ville ou '' si invalide
 * @description Ignore les patterns de proximité (près, 7awli, moi, nearby, etc.)
 */
function extractCity(location?: string): string {
  if (!location || location.trim().length < 2) return ''
  const loc = location.trim()
  const PROXIMITY_PATTERNS = /\b(près|pres|7awli|moi|me|my|nearby|bhdhaya|qriba|hna|houni)\b/i
  if (PROXIMITY_PATTERNS.test(loc)) return ''
  const city = loc.split(/[,\-(]/)[0].trim()
  return city.length >= 2 && city.length <= 40 ? city : ''
}

/**
 * buildOrFilter — Construit filtre OR pour Supabase (ILIKE)
 * 🎯 Rôle: Générer syntaxe Supabase pour recherche texte fuzzy (ILIKE) multi-champs
 * @param fields Noms des colonnes (ex: ['name', 'description'])
 * @param keywords Mots-clés à rechercher (limité à 5)
 * @returns String filtre Supabase (ex: "name.ilike.%search%,description.ilike.%search%")
 * @description Utilisé dans hybridSearch pour faire des recherches texte fuzzy
 */
function buildOrFilter(fields: string[], keywords: string[]): string {
  return keywords
    .slice(0, 5)
    .flatMap(k => fields.map(f => `${f}.ilike.%${k}%`))
    .join(',')
}

/**
 * haversineKm — Calcule distance entre deux points GPS
 * 🎯 Rôle: Calculer distance réelle entre utilisateur et magasin/lieu (en km)
 * @param lat1 Latitude point 1 (degrés)
 * @param lon1 Longitude point 1 (degrés)
 * @param lat2 Latitude point 2 (degrés)
 * @param lon2 Longitude point 2 (degrés)
 * @returns Distance en kilomètres
 * @description Utilise formule Haversine pour calcul précis sur Terre (rayon=6371 km)
 */
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/**
 * detectScript — Détecte le script/langage de la requête
 * 🎯 Rôle: Identifier la langue (Darija, Français, Arabe, mixte) pour adapter traduction
 * @param query String de requête
 * @returns Type script: 'arabic' | 'latin_darija' | 'french' | 'mixed' | 'numeric'
 * @description Détecte: arabe, darija (latin), français, mélange, ou nombres uniquement
 * @logic Si >25% mots dans dictionnaire Darija → 'latin_darija'
 */
function detectScript(query: string): NormalizedQuery['script'] {
  const trimmed = query.trim()
  if (!trimmed) return 'french'

  const hasArabic = ARABIC_REGEX.test(trimmed)
  const hasLatin = LATIN_REGEX.test(trimmed)
  const hasDigit = DIGIT_REGEX.test(trimmed)

  if (hasDigit && !hasLatin && !hasArabic) return 'numeric'
  if (hasArabic && hasLatin) return 'mixed'
  if (hasArabic) return 'arabic'

  const words = trimmed.toLowerCase().split(/\s+/).filter(Boolean)
  const darijaCount = words.filter(w => DARIJA_TUNISIAN_DICTIONARY[w]).length
  if (words.length > 0 && darijaCount / words.length > 0.25) return 'latin_darija'
  return 'french'
}

/**
 * multiWordLookup — Cherche une phrase entière dans le dictionnaire Darija
 * 🎯 Rôle: Traduire expressions/phrases Darija complètes (plus précis que mot-à-mot)
 * @param query String requête à chercher
 * @returns Traduction française ou null si pas trouvée
 * @description Cherche d'abord phrase entière (ex: "kif hadak"), puis bi-grams, tri-grams, etc.
 * @logic Top-down: cherche phrases de 4 mots, puis 3, puis 2 mots avant fallback
 */
function multiWordLookup(query: string): string | null {
  const lower = query.toLowerCase().trim()
  if (DARIJA_TUNISIAN_DICTIONARY[lower]) {
    return DARIJA_TUNISIAN_DICTIONARY[lower].french
  }
  const words = lower.split(/\s+/)
  for (let len = Math.min(words.length, 4); len >= 2; len--) {
    for (let start = 0; start <= words.length - len; start++) {
      const phrase = words.slice(start, start + len).join(' ')
      if (DARIJA_TUNISIAN_DICTIONARY[phrase]) {
        return DARIJA_TUNISIAN_DICTIONARY[phrase].french
      }
    }
  }
  return null
}

/**
 * buildTranslation — Traduit requête mot-à-mot + détecte catégories + expansions
 * 🎯 Rôle: Traduire mots individuels + enrichir avec expansions sémantiques (synonymes, catégories)
 * @param query String requête (souvent Darija)
 * @returns {translated, detectedCategories, semanticExpansions}
 * @description Pour chaque mot: cherche dans dictionnaire, ajoute traduction + catégorie
 * @expansions Utilise CATEGORY_SEMANTIC_MAP pour enrichir avec mots associés
 */
function buildTranslation(query: string): {
  translated: string
  detectedCategories: string[]
  semanticExpansions: string[]
} {
  const words = query.trim().split(/\s+/).filter(Boolean)
  const translatedWords: string[] = []
  const detectedCategories = new Set<string>()
  const semanticExpansions: string[] = []

  for (const word of words) {
    const normalized = word.toLowerCase().trim()
    const entry = DARIJA_TUNISIAN_DICTIONARY[normalized]
    if (entry) {
      translatedWords.push(entry.french)
      detectedCategories.add(entry.category)
      const catExp = CATEGORY_SEMANTIC_MAP[entry.category]
      if (catExp) semanticExpansions.push(...catExp)
    } else {
      translatedWords.push(word)
    }
  }

  return {
    translated: translatedWords.join(' ').trim() || query,
    detectedCategories: [...detectedCategories],
    semanticExpansions: [...new Set(semanticExpansions)].slice(0, 10),
  }
}

/**
 * buildKeywords — Crée liste unique de mots-clés pour la recherche texte
 * 🎯 Rôle: Générer liste de mots-clés pour recherche textuelle ILIKE multi-champs (hybride)
 * @param original String original (Darija souvent)
 * @param translated String traduit en français
 * @returns Array de mots-clés uniques (longueur >2, max 8)
 * @description Combine mots traduits + mots originaux + traductions du dico
 * @usage Keywords utilisés pour buildOrFilter (recherche ILIKE texte)
 */
function buildKeywords(original: string, translated: string): string[] {
  const raw = [
    ...translated.toLowerCase().split(/\s+/),
    ...original
      .toLowerCase()
      .split(/\s+/)
      .map(w => DARIJA_TUNISIAN_DICTIONARY[w]?.french ?? w),
  ]
  return [...new Set(raw)]
    .map(w => w.trim())
    .filter(w => w.length > 2)
    .slice(0, 8)
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4: NORMALIZER — normalizeQuery()
// ═══════════════════════════════════════════════════════════════════════════════

export function normalizeQuery(query: string): NormalizedQuery {
  const original = query.trim()

  const phraseTranslation = multiWordLookup(original)

  const { translated: wordByWordTranslation, detectedCategories, semanticExpansions } =
    buildTranslation(original)

  const translated = phraseTranslation ?? wordByWordTranslation

  const expanded = [translated, ...semanticExpansions].join(', ')

  const script = detectScript(original)

  const darijaWords = extractDarijaWords(original)

  const words = original.split(/\s+/)
  const fullyTranslated = words.every(
    w => DARIJA_TUNISIAN_DICTIONARY[w.toLowerCase()] || w.length <= 2,
  )

  const keywords = buildKeywords(original, translated)

  if (process.env.NODE_ENV !== 'production') {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`🔤 [NORMALIZER] Requête     : "${original}"`)
    console.log(`🌐 [NORMALIZER] Script      : ${script}`)
    words.forEach(w => {
      const entry = DARIJA_TUNISIAN_DICTIONARY[w.toLowerCase()]
      console.log(
        entry
          ? `   "${w}" ✅ → "${entry.french}" [${entry.category}]`
          : `   "${w}" ❌ → non trouvé dans le dictionnaire`,
      )
    })
    if (phraseTranslation) {
      console.log(`🔗 [NORMALIZER] Phrase entière trouvée : "${phraseTranslation}"`)
    }
    console.log(`📝 [NORMALIZER] Traduit     : "${translated}"`)
    console.log(`📦 [NORMALIZER] Expanded    : "${expanded.slice(0, 120)}..."`)
    console.log(`🏷️  [NORMALIZER] Catégories  : [${detectedCategories.join(', ')}]`)
    console.log(`🔑 [NORMALIZER] Keywords    : [${keywords.join(', ')}]`)
    console.log(`⚡ [NORMALIZER] fullyTranslated: ${fullyTranslated}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  }

  return {
    original,
    translated,
    expanded,
    keywords,
    script,
    detectedCategories,
    semanticExpansions,
    fullyTranslated,
    darijaWords,
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5: VECTOR SEARCH — vectorSearch()
// ═══════════════════════════════════════════════════════════════════════════════

export async function vectorSearch(
  embedding: number[],
  options: VectorSearchOptions = {},
): Promise<SearchResult[]> {
  const { threshold = 0.18, limit = 50, geoFilter } = options

  if (!embedding || embedding.length === 0) {
    console.warn('⚠️  [VECTOR SEARCH] Embedding vide — étape ignorée')
    return []
  }

  const t0 = Date.now()
  const supabase = createClient()

  const { data, error } = await supabase.rpc('search_global_semantic' as any, {
    query_embedding: `[${embedding.join(',')}]`,
    match_threshold: threshold,
    match_count: limit,
  })

  if (error) {
    console.error('[VECTOR SEARCH] Erreur RPC:', error.message)
    return []
  }

  let results: SearchResult[] = (data ?? []) as SearchResult[]

  if (geoFilter) {
    const { lat, lng, deltaDeg = 1.1 } = geoFilter
    results = results.filter(item => {
      const iLat = Number(item.latitude ?? item.stores?.latitude ?? 0)
      const iLon = Number(item.longitude ?? item.stores?.longitude ?? 0)
      if (!iLat || !iLon) return true
      return Math.abs(iLat - lat) <= deltaDeg && Math.abs(iLon - lng) <= deltaDeg
    })
    for (const item of results) {
      const iLat = Number(item.latitude ?? item.stores?.latitude ?? 0)
      const iLon = Number(item.longitude ?? item.stores?.longitude ?? 0)
      if (iLat && iLon) {
        item.distance = haversineKm(lat, lng, iLat, iLon)
        item.is_nearby = item.distance < 15
      }
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(
      '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    )
    console.log(
      `🔍 [VECTOR SEARCH] ${results.length} résultat(s) en ${Date.now() - t0}ms (seuil: ${threshold})`,
    )
    if (results.length === 0)
      console.log('   ⚠️  Embeddings stores/items peut-être vides en DB')
    else
      results.slice(0, 5).forEach((r, i) =>
        console.log(
          `   [${i}] ${r.result_type}: "${r.name}" sim=${r.similarity?.toFixed(4) ?? 'N/A'}`,
        ),
      )
    console.log(
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n',
    )
  }

  return results
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6: HYBRID SEARCH — hybridSearch() & fetchLinkedReels()
// ═══════════════════════════════════════════════════════════════════════════════

export async function hybridSearch(options: HybridSearchOptions): Promise<SearchResult[]> {
  const {
    originalQuery,
    translatedQuery,
    keywords,
    location,
    category,
  } = options

  const supabase = createClient()
  const city = extractCity(location)
  const buildOr = (fields: string[]) => buildOrFilter(fields, keywords)

  const t0 = Date.now()

  const queries = [
    // ─── TABLE 1: ITEMS ────────────────────────────────────────────
    supabase
      .from('items')
      .select('id, name, description, item_type, status, store_id, main_image, created_at')
      .eq('status', 'AVAILABLE')
      .limit(30)
      .then(r => ({
        data: r.data?.map((item: any) => ({
          ...item,
          result_type: 'ITEM',
          image_url: item.main_image,
        })),
        error: r.error,
      }))
      .then(r => {
        if (!r.error && r.data && keywords.length > 0)
          return supabase
            .from('items')
            .select('id, name, description, item_type, status, store_id, main_image')
            .eq('status', 'AVAILABLE')
            .or(buildOr(['name', 'description']))
            .limit(30)
            .then(res => ({
              data: res.data?.map((item: any) => ({
                ...item,
                result_type: 'ITEM',
                image_url: item.main_image,
              })),
              error: res.error,
            }))
        return r
      }),

    // ─── TABLE 2: STORES ───────────────────────────────────────────
    supabase
      .from('stores')
      .select('id, name, slug, city, logo_url, description, category, address, latitude, longitude, rating_average')
      .in('status', ['APPROVED', 'PUBLISHED'])
      .limit(30)
      .then(r => ({
        data: r.data?.map((item: any) => ({
          ...item,
          result_type: 'STORE',
          image_url: item.logo_url,
          location_city: item.city,
        })),
        error: r.error,
      }))
      .then(r => {
        if (!r.error && r.data && keywords.length > 0)
          return supabase
            .from('stores')
            .select('id, name, slug, city, logo_url, description, category, address, latitude, longitude, rating_average')
            .in('status', ['APPROVED', 'PUBLISHED'])
            .or(buildOr(['name', 'description', 'address']))
            .limit(30)
            .then(res => ({
              data: res.data?.map((item: any) => ({
                ...item,
                result_type: 'STORE',
                image_url: item.logo_url,
                location_city: item.city,
              })),
              error: res.error,
            }))
        return r
      }),

    // ─── TABLE 3: REELS ────────────────────────────────────────────
    supabase
      .from('reels')
      .select('id, title, description, thumbnail_url, created_at')
      .eq('status', 'PUBLISHED')
      .limit(15)
      .then(r => ({
        data: r.data?.map((item: any) => ({
          ...item,
          result_type: 'REEL',
          name: item.title,
          image_url: item.thumbnail_url,
        })),
        error: r.error,
      }))
      .then(r => {
        if (!r.error && r.data && keywords.length > 0)
          return supabase
            .from('reels')
            .select('id, title, description, thumbnail_url')
            .eq('status', 'PUBLISHED')
            .or(buildOr(['title', 'description']))
            .limit(15)
            .then(res => ({
              data: res.data?.map((item: any) => ({
                ...item,
                result_type: 'REEL',
                name: item.title,
                image_url: item.thumbnail_url,
              })),
              error: res.error,
            }))
        return r
      }),
  ]

  const results: SearchResult[] = []
  const responses = await Promise.all(queries)

  responses.forEach(res => {
    if (!res.error && res.data) results.push(...res.data)
  })

  // Apply location/category filters
  let filtered = results
  if (city) {
    filtered = filtered.filter(
      r =>
        !r.location_city ||
        r.location_city.toLowerCase().includes(city.toLowerCase()),
    )
  }
  if (category) {
    filtered = filtered.filter(
      r =>
        !r.category ||
        r.category.toLowerCase().includes(category.toLowerCase()),
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`🔍 [HYBRID SEARCH] ${filtered.length} résultats en ${Date.now() - t0}ms`)
    filtered.slice(0, 5).forEach((r, i) =>
      console.log(`   [${i}] ${r.result_type}: "${r.name}" — ${r.location_city ?? 'N/A'}`),
    )
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  }

  return filtered.slice(0, 100)
}

export async function fetchLinkedReels(vectorResults: SearchResult[]): Promise<SearchResult[]> {
  if (!vectorResults.length) return []

  const itemIds = vectorResults
    .filter(r => r.result_type === 'ITEM')
    .map(r => {
      const id = typeof r.id === 'number' ? r.id : parseInt(String(r.id), 10)
      return isNaN(id) ? null : id
    })
    .filter((id): id is number => id !== null)
    .slice(0, 10)

  if (!itemIds.length) return []

  const supabase = createClient()
  const { data, error } = await supabase
    .from('reels')
    .select('id, title, description, thumbnail_url, item_id')
    .in('item_id', itemIds)
    .eq('status', 'PUBLISHED')
    .limit(20)

  if (error) return []

  return (
    data?.map((reel: any) => ({
      ...reel,
      result_type: 'REEL',
      name: reel.title,
      image_url: reel.thumbnail_url,
    })) ?? []
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7: RERANKER — rerank() with RRF
// ═══════════════════════════════════════════════════════════════════════════════

function reciprocalRankFusion(
  vectorResults: SearchResult[],
  textResults: SearchResult[],
  linkedReels: SearchResult[],
  k = 60,
): SearchResult[] {
  const scores = new Map<string, { score: number; item: SearchResult }>()

  const add = (list: SearchResult[], weight: number) => {
    list.forEach((item, r) => {
      const id = item.id != null ? String(item.id) : (item.name ?? '').slice(0, 20)
      const key = `${item.result_type ?? 'UNK'}::${id}`
      const s = weight / (k + r + 1)
      const existing = scores.get(key)
      if (existing) existing.score += s
      else scores.set(key, { score: s, item })
    })
  }

  add(vectorResults, 1.5)
  add(textResults, 1.0)
  add(linkedReels, 1.3)

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

async function llmRerank(
  query: string,
  results: SearchResult[],
  intent: string,
  topN = 15,
): Promise<SearchResult[]> {
  if (results.length < 4) return results

  const toRerank = results.slice(0, topN)
  const list = toRerank
    .map(
      (it, i) =>
        `${i}:${it.name ?? it.title ?? '?'}(${it.result_type}) — ${(it.description ?? '').slice(0, 60)}`,
    )
    .join('\n')

  const systemPrompt = `Expert marketplace tunisienne. Trie ces résultats pour "${query}" (intent:${intent}).
  Priorités: 1)Correspondance exacte 2)STORE/ITEM/REEL natifs avant annuaires 3)Rejette hors-sujet.
  Réponds UNIQUEMENT avec les indices en ordre décroissant de pertinence, séparés par virgule. Ex: 2,0,5,1`

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) return results

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
      if (!res.ok) {
        const errMsg = await res.text()
        console.warn(
          `[RERANKER] Model ${model} failed: HTTP ${res.status} - ${errMsg.slice(0, 150)}`,
        )
        throw new Error(`HTTP ${res.status}`)
      }
      const data = await res.json()
      const text = data.choices?.[0]?.message?.content?.trim()
      if (!text) throw new Error('Empty')

      const order = text
        .split(',')
        .map((x: string) => parseInt(x.trim(), 10))
        .filter((x: number) => !isNaN(x) && x >= 0 && x < topN)
      if (order.length < 2) return results

      const reranked = order.map((i: number) => toRerank[i]).filter(Boolean)
      const seenIdx = new Set(order)
      const remaining = toRerank.filter((_: any, i: number) => !seenIdx.has(i))
      return [...reranked, ...remaining, ...results.slice(topN)]
    } catch (e) {
      lastErr = e as Error
    }
  }
  console.warn('[RERANKER] LLM reranking échoué, ordre RRF conservé:', lastErr?.message)
  return results
}

function finalSort(items: SearchResult[], isSuggestion: boolean): SearchResult[] {
  return [...items].sort((a, b) => {
    if (isSuggestion) {
      const ORDER: Record<string, number> = {
        STORE: 1,
        REEL: 2,
        ITEM: 3,
        SERVICE_DIR: 4,
        BUSINESS_DIR: 5,
      }
      const diff = (ORDER[a.result_type] ?? 6) - (ORDER[b.result_type] ?? 6)
      if (diff !== 0) return diff
    } else {
      const aN = NATIVE_TYPES.has(a.result_type)
      const bN = NATIVE_TYPES.has(b.result_type)
      if (aN !== bN) return aN ? -1 : 1
    }
    if (
      a.distance != null &&
      b.distance != null &&
      Math.abs(a.distance - b.distance) > 5
    ) {
      return a.distance - b.distance
    }
    const aR = Number(a.rating_average ?? a.metadata?.rating ?? a.totalScore ?? 0)
    const bR = Number(b.rating_average ?? b.metadata?.rating ?? b.totalScore ?? 0)
    return bR - aR
  })
}

export async function rerank(
  vectorResults: SearchResult[],
  textResults: SearchResult[],
  linkedReels: SearchResult[],
  options: RerankerOptions,
): Promise<SearchResult[]> {
  const { query, intent = 'other', isSuggestion } = options
  const t0 = Date.now()

  const fused = reciprocalRankFusion(vectorResults, textResults, linkedReels)

  const reranked =
    !isSuggestion && fused.length > 4
      ? await withTimeout(llmRerank(query, fused, intent), RERANK_TIMEOUT_MS, fused)
      : fused

  const output = finalSort(reranked, isSuggestion)

  if (process.env.NODE_ENV !== 'production') {
    console.log(
      '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    )
    console.log(
      `🏆 [RERANKER] ${output.length} résultats finaux en ${Date.now() - t0}ms`,
    )
    output.slice(0, 5).forEach((r, i) =>
      console.log(`   [${i}] ${r.result_type}: "${r.name}" — ${r.location_city ?? 'N/A'}`),
    )
    console.log(
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n',
    )
  }

  return output
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8: MAIN ORCHESTRATOR — doGlobalSemanticSearch()
// ═══════════════════════════════════════════════════════════════════════════════

export async function doGlobalSemanticSearch(
  query: string,
  location?: string,
  category?: string,
  userLat?: number,
  userLng?: number,
  isSuggestion: boolean = false,
) {
  const cleanQuery = query?.trim()
  if (!cleanQuery || cleanQuery.length < 2) return []

  const cacheKey = `search:${cleanQuery}|${location ?? ''}|${category ?? ''}|${userLat ?? ''}|${userLng ?? ''}|${isSuggestion}`

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 0: VÉRIFICATION CACHE REDIS
  // Cherche si la requête a déjà été exécutée et mise en cache
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const t0 = Date.now()
  const cached = await cacheGet(cacheKey)
  if (cached) {
    const cacheLatency = Date.now() - t0
    console.log(`✅ [ÉTAPE 0: CACHE] HIT "${cleanQuery}" en ${cacheLatency}ms`)
    await monitoring.recordMetric('search_cache_hit', 1)
    await monitoring.recordMetric('search_cache_latency', cacheLatency)
    return cached
  }

  console.log(`\n🚀 [PIPELINE] Début recherche "${cleanQuery}" (suggestion=${isSuggestion})`)

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 1: NORMALISATION DE LA REQUÊTE
  // Traduction Darija → Français, détection script, expansion sémantique
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const normalized = normalizeQuery(cleanQuery)
  if (cleanQuery) logUserSearch(cleanQuery)

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 2: GÉNÉRATION D'EMBEDDINGS
  // Crée le vecteur sémantique de la requête normalisée pour le search vectoriel
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const skipEmbed = isSuggestion && cleanQuery.length < 4
  let embedding: number[] = []

  if (!skipEmbed) {
    try {
      embedding = await withTimeout(
        generateQueryEmbedding(normalized.expanded),
        EMBED_TIMEOUT_MS,
        [] as number[],
      )
    } catch {
      console.warn('⚠️  [ÉTAPE 2: EMBEDDING] Échoué — recherche texte seulement')
    }
  }

  const geoFilter =
    userLat && userLng ? { lat: userLat, lng: userLng } : undefined

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 3 & 4: RECHERCHE PARALLÈLE (VECTEUR + HYBRIDE)
  // - ÉTAPE 3: Recherche vectorielle (pgvector cosine similarity)
  // - ÉTAPE 4: Recherche hybride (ILIKE texte sur 5 tables)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [vectorResults, textResults] = await Promise.all([
    embedding.length > 0
      ? withTimeout(
          vectorSearch(embedding, { threshold: 0.18, limit: 50, geoFilter }),
          3000,
          [] as any[],
        )
      : Promise.resolve([] as any[]),

    hybridSearch({
      originalQuery: cleanQuery,
      translatedQuery: normalized.translated,
      keywords: normalized.keywords,
      location,
      category,
    }),
  ])

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 5: RÉCUPÉRATION DES REELS LIÉS
  // Récupère les reels associés aux items trouvés pour enrichir les résultats
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const linkedReels = await withTimeout(fetchLinkedReels(vectorResults), 1500, [] as any[])

  console.log(
    `📊 [ÉTAPES 3-5] vecteur=${vectorResults.length} | texte=${textResults.length} | reels=${linkedReels.length}`,
  )

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 6: RERANKING (FUSION RRF + LLM)
  // - Fusion RRF: Combine les 3 listes (vecteur, texte, reels)
  // - LLM Reranking: Réordonne les top résultats avec LLM
  // - Tri final: Par type, distance géographique, et score
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const output = await rerank(vectorResults, textResults, linkedReels, {
    query: normalized.translated || cleanQuery,
    intent: normalized.detectedCategories[0] ?? 'other',
    isSuggestion,
  })

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ÉTAPE 7: ENREGISTREMENT CACHE & MÉTRIQUES
  // Sauvegarde les résultats en cache et enregistre les performances
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const latency = Date.now() - t0
  console.log(
    `✅ [ÉTAPE 6: RERANKING] Terminé en ${latency}ms — ${output.length} résultats pour "${cleanQuery}"`,
  )

  const plain = JSON.parse(JSON.stringify(output))

  await cacheSet(cacheKey, plain, 3600)
  await monitoring.recordMetric('search_miss', 1)
  await monitoring.recordMetric('search_latency', latency)

  return plain
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9: STORE/ITEM/SERVICE SEARCHES
// ═══════════════════════════════════════════════════════════════════════════════

export async function searchStores(
  queryStr = '',
  locationStr = '',
  category = '',
): Promise<Business[]> {
  const supabase = createClient()
  const city = extractCity(locationStr)
  if (queryStr) logUserSearch(queryStr)

  const translated = translateDarijaForSearch(queryStr)
  const keywords = [
    ...new Set([
      ...translated.toLowerCase().split(/\s+/).filter((w: string) => w.length > 2),
      ...queryStr
        .toLowerCase()
        .split(/\s+/)
        .filter(
          (w: string) => DARIJA_TUNISIAN_DICTIONARY[w] && w.length > 1,
        ),
    ]),
  ].slice(0, 6)

  const buildOr = (fields: string[]) => buildOrFilter(fields, keywords)

  const storesPromise = (() => {
    let q = supabase
      .from('stores')
      .select(
        'id, name, slug, city, phone, address, category, latitude, longitude, rating_average, total_reviews, logo_url, description',
      )
      .in('status', ['APPROVED', 'PUBLISHED'])
      .is('service_id', null)
    if (keywords.length > 0) q = q.or(buildOr(['name', 'description', 'address']))
    if (city) q = q.ilike('city', `%${city}%`)
    if (category) q = q.ilike('category', `%${category}%`)
    return q.limit(50)
  })()

  const dirPromise = (() => {
    let q = supabase
      .from('business_directory_tunisia' as any)
      .select(
        'id, title, city, phone, full_address, vitrine_category, categoryName, latitude, longitude, totalScore, reviewsCount, photos',
      )
    if (keywords.length > 0)
      q = q.or(buildOr(['title', 'categoryName', 'vitrine_category', 'full_address']))
    if (city) q = q.ilike('city', `%${city}%`)
    if (category)
      q = q.or(`categoryName.ilike.%${category}%,vitrine_category.ilike.%${category}%`)
    return q.limit(50)
  })()

  const [storesRes, dirRes] = await Promise.all([storesPromise, dirPromise])

  const FALLBACK_IMG =
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
  const results: (Business & { isNative?: boolean })[] = []

  storesRes.data?.forEach((item: any) =>
    results.push({
      isNative: true,
      id: item.slug ?? String(item.id),
      name: item.name ?? '',
      image: item.logo_url ?? FALLBACK_IMG,
      rating: Number(item.rating_average) || 0,
      reviewCount: item.total_reviews ?? 0,
      category: item.category ?? 'Other',
      priceRange: '$$',
      isOpen: true,
      description: item.description ?? item.address ?? '',
      location: {
        address: item.address ?? '',
        lat: Number(item.latitude) || 36.8065,
        lng: Number(item.longitude) || 10.1815,
      },
    }),
  )

  dirRes.data?.forEach((item: any) =>
    results.push({
      isNative: false,
      id: String(item.id),
      name: item.title ?? '',
      image: Array.isArray(item.photos) ? item.photos[0] : FALLBACK_IMG,
      rating: Number(item.totalScore) || 0,
      reviewCount: item.reviewsCount ?? 0,
      category: item.vitrine_category ?? item.categoryName ?? 'Other',
      priceRange: '$$',
      isOpen: true,
      description: item.full_address ?? '',
      location: {
        address: item.full_address ?? '',
        lat: Number(item.latitude) || 36.8065,
        lng: Number(item.longitude) || 10.1815,
      },
    }),
  )

  results.sort((a, b) =>
    a.isNative === b.isNative ? b.rating - a.rating : a.isNative ? -1 : 1,
  )
  return JSON.parse(JSON.stringify(results.slice(0, 100)))
}

export async function searchItems(query?: string, category?: string) {
  const supabase = createClient()
  if (query) logUserSearch(query)

  const translated = query ? translateDarijaForSearch(query) : ''
  const keywords = translated
    .toLowerCase()
    .split(/\s+/)
    .filter((w: string) => w.length > 1)
    .slice(0, 6)

  const isTypeFilter = category === 'PRODUCT' || category === 'SERVICE'

  let req = supabase
    .from('items')
    .select(isTypeFilter ? '*, stores (*)' : '*, stores!inner (*)')
    .eq('status', 'AVAILABLE')
    .not('store_id', 'is', null)

  if (category) {
    if (isTypeFilter) req = req.eq('item_type', category)
    else req = req.ilike('stores.category', `%${category}%`)
  }

  if (keywords.length > 0) {
    req = req.or(
      keywords
        .flatMap(kw => [`name.ilike.%${kw}%`, `description.ilike.%${kw}%`])
        .join(','),
    )
  }

  const { data, error } = await req
    .order('created_at', { ascending: false })
    .limit(100)

  return JSON.parse(
    JSON.stringify({ data: (data as any[]) ?? [], error: error?.message ?? null }),
  )
}

export async function searchServicesDirectory(
  query?: string,
  location?: string,
  category?: string,
) {
  const supabase = createClient()
  const city = extractCity(location)

  const translated = query ? translateDarijaForSearch(query) : ''
  const keywords = translated
    .toLowerCase()
    .split(/\s+/)
    .filter((w: string) => w.length > 2)
    .slice(0, 6)

  const buildOr = (fields: string[]) => buildOrFilter(fields, keywords)

  const sdPromise = (() => {
    let q = supabase
      .from('service_directory')
      .select('*, stores (id, name, rating_average, total_reviews, logo_url)')
      .eq('status', 'ACTIVE')
    if (keywords.length > 0) q = q.or(buildOr(['name', 'description', 'category']))
    if (city) q = q.ilike('city', `%${city}%`)
    if (category) q = q.ilike('category', `%${category}%`)
    return q.limit(50)
  })()

  const storesPromise = (() => {
    let q = supabase
      .from('stores')
      .select('*')
      .in('status', ['APPROVED', 'PUBLISHED'])
      .is('id_business', null)
    if (keywords.length > 0) q = q.or(buildOr(['name', 'description', 'address']))
    if (city) q = q.ilike('city', `%${city}%`)
    if (category) q = q.ilike('category', `%${category}%`)
    return q.limit(50)
  })()

  const [sdRes, storesRes] = await Promise.all([sdPromise, storesPromise])
  const FALLBACK =
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800'
  const mappedData: any[] = []

  sdRes.data?.forEach((item: any) =>
    mappedData.push({
      ...item,
      isNative: false,
      id: item.slug ?? String(item.service_id),
      item_type: 'SERVICE',
      price: item.price ?? 0,
      main_image: item.stores?.logo_url ?? FALLBACK,
    }),
  )

  storesRes.data?.forEach((item: any) =>
    mappedData.push({
      ...item,
      isNative: true,
      id: item.slug ?? String(item.id),
      item_type: 'SERVICE',
      price: item.price ?? 0,
      main_image: item.logo_url ?? FALLBACK,
      stores: { name: item.name },
    }),
  )

  return JSON.parse(JSON.stringify({ data: mappedData, error: null }))
}
