/**
 * ═══════════════════════════════════════════════════════════════
 * ÉTAPE 1 — NORMALIZER DARIJA
 * ═══════════════════════════════════════════════════════════════
 * Entrée  : query string brute (Darija latin, arabe, français, mix)
 * Sortie  : NormalizedQuery — tout ce dont le pipeline a besoin
 *
 * Ce module ne fait AUCUN appel API. C'est une étape synchrone,
 * gratuite et instantanée basée sur le dictionnaire local.
 */

import {
  DARIJA_TUNISIAN_DICTIONARY,
  extractDarijaWords,
} from '@/lib/darija-dictionary'

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Map catégorie → mots-clés sémantiques ───────────────────────────────────

const CATEGORY_SEMANTIC_MAP: Record<string, string[]> = {
  verb:        ['action', 'service', 'prestation'],
  auto:        ['voiture', 'mécanique', 'garage', 'pneu', 'huile', 'révision', 'carrosserie',
                'garagiste', 'dépannage', 'pièces auto', 'carrossier', 'réparation voiture'],
  nourriture:  ['restaurant', 'traiteur', 'plat', 'cuisine', 'repas', 'livraison', 'menu',
                'food', 'manger', 'restauration rapide', 'économique', 'bon marché',
                'pas cher', 'snack', 'fast food', 'café restaurant'],
  commerce:    ['magasin', 'boutique', 'vente', 'achat', 'marché', 'shop', 'commerce'],
  beaute:      ['coiffure', 'salon', 'soin', 'esthétique', 'manucure', 'hammam',
                'salon de beauté', 'esthéticienne', 'nail art', 'spa', 'hair'],
  santé:       ['médecin', 'clinique', 'pharmacie', 'docteur', 'soins', 'cabinet'],
  mode:        ['vêtements', 'habits', 'prêt-à-porter', 'confection', 'tissu', 'mode'],
  lieux:       ['quartier', 'adresse', 'local', 'espace', 'lieu'],
  transports:  ['taxi', 'livraison', 'transport', 'chauffeur', 'déménagement', 'moto'],
  artisanat:   ['fait main', 'traditionnel', 'artisan', 'poterie', 'tissu'],
  gastronomie: ['cuisine tunisienne', 'spécialité', 'plat traditionnel', 'restaurant'],
  product:     ['produit', 'article', 'vente', 'achat'],
  business:    ['entreprise', 'boutique', 'service', 'professionnel', 'société'],
  services:    ['prestataire', 'artisan', 'technicien', 'réparation',
                'disponible', 'urgent', 'rapide', 'intervention', 'dépannage'],
  médical:     ['santé', 'médecin', 'clinique', 'pharmacie', 'soins'],
  éducation:   ['cours', 'formation', 'école', 'enseignement', 'soutien', 'professeur'],
  finance:     ['banque', 'assurance', 'crédit', 'prêt', 'argent'],
  sport:       ['fitness', 'salle', 'coach', 'musculation', 'yoga', 'gym'],
}

/**
 * Dictionnaire de synonymes français → expansions sémantiques.
 * Permet aux requêtes françaises pures de bénéficier du même enrichissement
 * que les requêtes Darija — sans appel API, coût zéro.
 */
const FRENCH_KEYWORD_MAP: Record<string, string[]> = {
  // Restauration
  'restaurant':    ['nourriture', 'manger', 'repas', 'traiteur', 'cuisine', 'plat', 'food'],
  'économique':    ['pas cher', 'bon marché', 'abordable', 'prix bas', 'rkhis'],
  'manger':        ['restaurant', 'nourriture', 'repas', 'plat', 'cuisine'],
  'repas':         ['restaurant', 'nourriture', 'plat', 'cuisine'],
  // Automobile
  'garagiste':     ['mécanicien', 'garage', 'réparation voiture', 'auto', 'carrosserie'],
  'mécanicien':    ['garage', 'garagiste', 'réparation', 'voiture', 'auto'],
  'voiture':       ['garage', 'mécanicien', 'auto', 'pneu', 'révision'],
  'réparation':    ['technicien', 'artisan', 'service', 'dépannage', 'garage'],
  // Beauté
  'coiffeur':      ['salon de coiffure', 'coiffure', 'hair', 'beauté', 'salon'],
  'esthéticienne': ['salon beauté', 'beauté', 'manucure', 'soin', 'spa'],
  'salon':         ['coiffure', 'beauté', 'soin', 'esthétique'],
  // Emploi
  'emploi':        ['recrutement', 'travail', 'job', 'poste', 'embauche', 'offre emploi'],
  'recrutement':   ['emploi', 'travail', 'job', 'candidature', 'embauche', 'poste'],
  'travail':       ['emploi', 'job', 'recrutement', 'poste'],
  'job':           ['emploi', 'travail', 'recrutement', 'poste', 'offre'],
  // Services
  'plombier':      ['plomberie', 'réparation fuite', 'artisan', 'technicien', 'dépannage'],
  'électricien':   ['électricité', 'panne', 'installation', 'technicien', 'artisan'],
  'disponible':    ['ouvert', 'libre', 'maintenant', 'rapidement', 'service'],
  'urgent':        ['disponible', 'maintenant', 'rapide', 'immédiat', 'dépannage'],
  // Commerce
  'magasin':       ['boutique', 'commerce', 'shop', 'vente', 'achat'],
  'boutique':      ['magasin', 'commerce', 'shop', 'vente'],
  'prix':          ['tarif', 'coût', 'combien', 'pas cher', 'économique'],
  'pas cher':      ['économique', 'bon marché', 'abordable', 'prix bas'],
}

// ─── Détection de script ──────────────────────────────────────────────────────

const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F]/
const LATIN_REGEX  = /[a-zA-Z]/
const DIGIT_REGEX  = /\d/

function detectScript(query: string): NormalizedQuery['script'] {
  const trimmed = query.trim()
  if (!trimmed) return 'french'

  const hasArabic = ARABIC_REGEX.test(trimmed)
  const hasLatin  = LATIN_REGEX.test(trimmed)
  const hasDigit  = DIGIT_REGEX.test(trimmed)

  if (hasDigit && !hasLatin && !hasArabic) return 'numeric'
  if (hasArabic && hasLatin) return 'mixed'
  if (hasArabic) return 'arabic'

  // Détection Darija en latin : si >25% des mots sont dans le dict
  const words = trimmed.toLowerCase().split(/\s+/).filter(Boolean)
  const darijaCount = words.filter(w => DARIJA_TUNISIAN_DICTIONARY[w]).length
  if (words.length > 0 && darijaCount / words.length > 0.25) return 'latin_darija'
  return 'french'
}

// ─── Lookup multi-mot (ex: "nhb nakel ji3an" en une seule clé) ───────────────

function multiWordLookup(query: string): string | null {
  const lower = query.toLowerCase().trim()
  // Essaie la phrase entière, puis les sous-phrases de 3, 2 mots
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

// ─── Levenshtein Fuzzy Matching ──────────────────────────────────────────────

/**
 * Calcule la distance de Levenshtein entre deux chaînes.
 * Complexité O(n*m) — acceptable car les mots du dictionnaire sont courts (<20 chars).
 */
function levenshteinDistance(a: string, b: string): number {
  const la = a.length
  const lb = b.length
  if (la === 0) return lb
  if (lb === 0) return la

  // Optimisation : une seule ligne de DP au lieu d'une matrice complète
  let prev = Array.from({ length: lb + 1 }, (_, i) => i)
  let curr = new Array<number>(lb + 1)

  for (let i = 1; i <= la; i++) {
    curr[0] = i
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(
        prev[j] + 1,      // suppression
        curr[j - 1] + 1,  // insertion
        prev[j - 1] + cost // substitution
      )
    }
    ;[prev, curr] = [curr, prev]
  }
  return prev[lb]
}

/**
 * Cherche le mot le plus proche dans le dictionnaire Darija via Levenshtein.
 * Seuil adaptatif : distance max = 1 pour les mots courts (≤5), 2 pour les mots longs.
 * Retourne l'entrée du dictionnaire ou null si aucun match assez proche.
 */
function fuzzyDictionaryLookup(
  word: string
): { key: string; french: string; category: string } | null {
  const maxDist = word.length <= 5 ? 1 : 2
  let bestKey: string | null = null
  let bestDist = Infinity

  for (const dictKey of Object.keys(DARIJA_TUNISIAN_DICTIONARY)) {
    // Skip multi-word dictionary entries for single-word fuzzy match
    if (dictKey.includes(' ')) continue
    // Quick length filter: if lengths differ by more than maxDist, skip
    if (Math.abs(dictKey.length - word.length) > maxDist) continue

    const dist = levenshteinDistance(word, dictKey)
    if (dist < bestDist && dist <= maxDist) {
      bestDist = dist
      bestKey = dictKey
      if (dist === 0) break // exact match, stop early
    }
  }

  if (bestKey) {
    const entry = DARIJA_TUNISIAN_DICTIONARY[bestKey]
    return { key: bestKey, french: entry.french, category: entry.category }
  }
  return null
}

// ─── Traduction mot par mot + expansion ──────────────────────────────────────

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
      // ── Mot Darija : traduction + expansions catégorielles (dictionnaire local, coût zéro)
      translatedWords.push(entry.french)
      detectedCategories.add(entry.category)
      const catExp = CATEGORY_SEMANTIC_MAP[entry.category]
      if (catExp) semanticExpansions.push(...catExp)
    } else {
      // ── Mot français/autre : garde l'original + applique les synonymes français
      // (même enrichissement que le Darija, sans coût API)
      translatedWords.push(word)
      const frExp = FRENCH_KEYWORD_MAP[normalized]
      if (frExp) semanticExpansions.push(...frExp)
    }
  }

  // Essai multi-mots dans FRENCH_KEYWORD_MAP (ex: "pas cher")
  const lower = query.toLowerCase().trim()
  const bigramKeys = Object.keys(FRENCH_KEYWORD_MAP).filter(k => k.includes(' '))
  for (const key of bigramKeys) {
    if (lower.includes(key)) {
      semanticExpansions.push(...FRENCH_KEYWORD_MAP[key])
    }
  }

  return {
    translated:         translatedWords.join(' ').trim() || query,
    detectedCategories: [...detectedCategories],
    semanticExpansions: [...new Set(semanticExpansions)].slice(0, 12),
  }
}

// ─── Extraction des keywords pour la recherche texte ─────────────────────────

function buildKeywords(original: string, translated: string): string[] {
  const raw = [
    ...translated.toLowerCase().split(/\s+/),
    ...original.toLowerCase().split(/\s+/).map(
      w => DARIJA_TUNISIAN_DICTIONARY[w]?.french ?? w
    ),
  ]
  return [...new Set(raw)]
    .map(w => w.trim())
    .filter(w => w.length > 2)
    .slice(0, 8)
}

// ─── Fonction principale ──────────────────────────────────────────────────────

/**
 * Normalise une requête brute (Darija/arabe/français/mix) en une structure
 * enrichie utilisable par toutes les étapes du pipeline de recherche.
 *
 * @pure — synchrone, aucun appel API, gratuit
 */
export function normalizeQuery(query: string): NormalizedQuery {
  const original = query.trim()

  // 1. Lookup multi-mot (phrase complète dans le dict)
  const phraseTranslation = multiWordLookup(original)

  // 2. Traduction mot par mot
  const { translated: wordByWordTranslation, detectedCategories, semanticExpansions } =
    buildTranslation(original)

  // Priorité : phrase complète > mot par mot
  const translated = phraseTranslation ?? wordByWordTranslation

  // 3. Phrase étendue pour l'embedding (contient les expansions sémantiques)
  const expanded = [translated, ...semanticExpansions].join(', ')

  // 4. Script
  const script = detectScript(original)

  // 5. Mots Darija détectés (pour le hint LLM)
  const darijaWords = extractDarijaWords(original)

  // 6. fullyTranslated : true si chaque mot est dans le dict (skip LLM safe)
  const words = original.split(/\s+/)
  const fullyTranslated = words.every(
    w => DARIJA_TUNISIAN_DICTIONARY[w.toLowerCase()] || w.length <= 2
  )

  // 7. Keywords pour la recherche texte
  const keywords = buildKeywords(original, translated)

  // ── Debug log ──────────────────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`🔤 [NORMALIZER] Requête     : "${original}"`)
    console.log(`🌐 [NORMALIZER] Script      : ${script}`)
    words.forEach(w => {
      const entry = DARIJA_TUNISIAN_DICTIONARY[w.toLowerCase()]
      console.log(entry
        ? `   "${w}" ✅ → "${entry.french}" [${entry.category}]`
        : `   "${w}" ❌ → non trouvé dans le dictionnaire`
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
