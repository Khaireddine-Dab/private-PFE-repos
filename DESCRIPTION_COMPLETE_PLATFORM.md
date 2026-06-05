# 📋 Description Complète de la Plateforme - Fichiers `app/` et `lib/`

**Plateforme:** Phantom Marketplace - Marketplace moderne avec IA, Darija, Détection de Fraude, Recommandations personnalisées

**Date:** 2 Juin 2026 | **Version:** 4.4 (Finale)

---

## 📚 TABLE DES MATIÈRES

1. [Vue d'ensemble architecture](#vue-densemble)
2. [Structure `/app` - Routes & Pages](#structure-app)
3. [Structure `/lib` - Utilitaires & Services](#structure-lib)
4. [Services Critiques](#services-critiques)
5. [Flux de Données](#flux-de-données)

---

## 🏗️ Vue d'ensemble

La plateforme est une **marketplace e-commerce full-stack** avec:

### Piliers Technologiques:
- **Frontend:** Next.js 14 (React 18) + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes + Server Actions
- **Base de données:** Supabase (PostgreSQL)
- **Cache:** Redis (via Upstash)
- **IA/LLM:** OpenRouter + Groq
- **Storage:** Cloudinary (images) + Supabase Storage
- **Payment:** Stripe
- **Notifications:** Upstash QStash (queues asynchrones)

### Fonctionnalités Principales:
- ✅ Authentification (Email/Password, Magic Link)
- ✅ Recherche sémantique (vecteur + hybrid)
- ✅ Support Darija tunisien natif
- ✅ Détection de fraude 4-couches
- ✅ Système de recommandations personnalisé (Ranking Feed)
- ✅ Gestion de commandes & transactions
- ✅ Chat temps réel et notifications
- ✅ Gestion de réels/histoires (TikTok-like)
- ✅ Dashboard marchand
- ✅ Analyse IA des commentaires

---

## 📁 STRUCTURE `/app` - Routes & Pages

### 🔑 Fichiers Racine

#### `app/layout.tsx`
**Rôle:** Layout racine (RootLayout) de toute l'application
- SessionProvider: Authentification globale
- AINotificationTrigger: Notifications temps réel
- GlobalActionDrawer: Menu d'action flottant
- ChatHeads: Interface chat (lazy loaded)
- Toaster: Notifications sonner
```typescript
// Metadata: "Phantom Marketplace"
// Enfants: SessionProvider > [children] > GlobalDrawer > ChatHeads > Toaster
```

#### `app/globals.css`
**Rôle:** Styles globaux Tailwind CSS
- Variables de couleurs, typographie
- Classes utilitaires personnalisées
- Animations globales

#### `app/page.tsx`
**Rôle:** Page d'accueil (HomePage) 
```typescript
// Composants affichés:
- Navbar (navigation)
- Hero (bannière principale)
- SmartStrip (carrousel catégories avec prix)
- TrendingArtists (créateurs tendance)
- OffersCarouselDemo (promotions)
- Sponsors (partenaires)
- CommerceHero (bannière commerce)
- LogoCarousel (témoignages)
- ShortAdsSection (annonces courtes)
- FloatingAiAssistant (assistant IA flottant)
- BackgroundScene (3D background, no-SSR)
// State: isFiltering (filtre actif)
```

---

### 🔐 API: Authentification

#### `app/api/auth/login/route.ts`
**Rôle:** Endpoint POST login
```typescript
Input: { email, password }
Process:
  1. Supabase auth.signInWithPassword()
  2. Fetch user.role depuis table 'users'
  3. Route redirect selon rôle:
     - ADMIN → /admin/dashboard
     - PRO/BUSINESS_OWNER → /dashboard/[storeId]
     - CLIENT → /
Output: { user_id, role, redirectUrl }
```

#### `app/api/auth/signup/route.ts`
**Rôle:** Inscription utilisateur

#### `app/api/auth/verify/route.ts`
**Rôle:** Vérification email/OTP

#### `app/api/auth/magic-link/route.ts`
**Rôle:** Connexion par magic link

#### `app/api/auth/logout/route.ts`
**Rôle:** Déconnexion utilisateur

#### `app/api/auth/session/route.ts`
**Rôle:** Récupération session actuelle

---

### 🛍️ API: Produits & Boutiques

#### `app/api/items/route.ts`
**Rôle:** GET items globaux avec filtres
```typescript
Params: ?category=, ?search=, ?sort=, ?limit=, ?offset=
Process:
  1. Fetch items avec relations (stores, reels)
  2. Apply search/filter
  3. Retour: items[] avec metadata
```

#### `app/api/items/[id]/route.ts`
**Rôle:** GET item détail par ID

#### `app/api/stores/route.ts`
**Rôle:** GET toutes les boutiques avec pagination

#### `app/api/stores/[id]/route.ts`
**Rôle:** GET détail boutique + produits du marchand

#### `app/api/stores/me/route.ts`
**Rôle:** GET boutique actuelle du merchant connecté

#### `app/api/stores/follow/route.ts`
**Rôle:** POST/DELETE follow boutique

---

### 🔍 API: Recherche Avancée

#### `app/api/semantic-search/route.ts`
**Rôle:** Recherche sémantique via embeddings vecteur
```typescript
Params: ?q=<query>, ?limit=, ?offset=
Process:
  1. Normalize query (darija → français)
  2. Generate embedding via OpenRouter (baai/bge-m3)
  3. Vector search PostgreSQL (pgvector)
  4. Rerank résultats
  5. Cache Redis 10min
Output: SearchResultItem[] avec scores
```

#### `app/api/image-search/route.ts`
**Rôle:** Recherche par image
```typescript
Process:
  1. Upload image → Cloudinary
  2. Generate embedding image
  3. Compare avec embeddings produits
  4. Retour produits similaires
```

#### `app/api/ranking/feed/route.ts`
**Rôle:** Feed personnalisé ranked (YouTube-like algorithm)
```typescript
Process:
  1. User intent detection (behavioral signals)
  2. Build 20+ features (engagement, recency, price, distance, etc)
  3. ML scoring algorithm
  4. Retrieve top 50 items ranked
  5. Cache per-user 5min
Output: RankedItem[] + engagement metrics
```

#### `app/api/ranking/intent/route.ts`
**Rôle:** Détection intention utilisateur

#### `app/api/ranking/score/route.ts`
**Rôle:** Calcul score pour item spécifique

---

### 🛒 API: Commandes & Transactions

#### `app/api/orders/route.ts`
**Rôle:** POST créer commande, GET historique
```typescript
POST:
  1. Validation (user not owner, stock available)
  2. Fraud detection 4-layer
  3. Create order record
  4. Decrement stock
  5. QStash event pour payment-retry
```

#### `app/api/orders/bulk/route.ts`
**Rôle:** Créer multiple commandes (panier)

#### `app/api/transactions/route.ts`
**Rôle:** Sync transactions Stripe ↔ DB

#### `app/api/webhooks/order/confirm/route.ts`
**Rôle:** Webhook Stripe payment.intent.succeeded
```typescript
Process:
  1. Verify webhook signature
  2. Update order status → PAID
  3. Send notifications
  4. Log transaction
```

#### `app/api/webhooks/order/refund/route.ts`
**Rôle:** Webhook remboursement

---

### 💬 API: Messagerie & Chat

#### `app/api/chat/route.ts`
**Rôle:** Chat OpenRouter (streaming)
```typescript
Process:
  1. Build conversation history
  2. Stream response via OpenRouter
  3. Save message to DB
```

#### `app/api/notifications/route.ts`
**Rôle:** GET/POST notifications utilisateur

#### `app/api/notifications/push-token/route.ts`
**Rôle:** Register FCM push token

#### `app/api/notifications/push-send/route.ts`
**Rôle:** Send push notification

---

### 🤖 API: IA & Détection

#### `app/api/ai-agent/route.ts`
**Rôle:** Darija agent (RAG-based) pour créer produits/promotions
```typescript
Process:
  1. Parse Darija input
  2. Intent classification (create_product | create_promotion | chat)
  3. Extract structured data
  4. Call appropriate action
  5. Return results
```

#### `app/api/ai-darija/route.ts`
**Rôle:** Traitement Darija tunisien brut
```typescript
Process:
  1. Extract Darija words via regex/dictionary
  2. Translate via DARIJA_TUNISIAN_DICTIONARY
  3. Normalize (remove diacritics, etc)
  4. Return tokens traduits
```

#### `app/api/comments/analyze/route.ts`
**Rôle:** Analyse IA des commentaires
```typescript
Process:
  1. Extract sentiment (positive/negative/neutral)
  2. Detect fraud keywords
  3. Extract topics
  4. Save analysis
```

#### `app/api/comments/alerts/route.ts`
**Rôle:** Alertes commentaires suspects

#### `app/api/comments/batch/route.ts`
**Rôle:** Batch process comments

---

### 📊 API: Dashboard Marchand

#### `app/api/dashboard/[storeId]/stats/route.ts`
**Rôle:** Statistiques vendeur (ventes, revenue, trending)

#### `app/api/dashboard/[storeId]/products/route.ts`
**Rôle:** GET/POST/PUT produits du marchand

#### `app/api/dashboard/[storeId]/sales/route.ts`
**Rôle:** Analyse ventes détaillées

#### `app/api/dashboard/[storeId]/account/route.ts`
**Rôle:** Paramètres compte vendeur

#### `app/api/dashboard/[storeId]/reels/route.ts`
**Rôle:** Gestion réels/vidéos du marchand

#### `app/api/dashboard/[storeId]/intelligence/route.ts`
**Rôle:** BI insights (recommandations d'optimisation)

#### `app/api/dashboard/[storeId]/leads/route.ts`
**Rôle:** Leads qualifiés pour marchand

#### `app/api/dashboard/[storeId]/messages/route.ts`
**Rôle:** Messages reçus

#### `app/api/dashboard/[storeId]/support/route.ts`
**Rôle:** Support tickets

---

### 📄 API: Administration

#### `app/api/admin/stats/route.ts`
**Rôle:** Statistiques globales plateforme

#### `app/api/admin/orders/route.ts`
**Rôle:** GET toutes commandes

#### `app/api/admin/orders/[id]/status/route.ts`
**Rôle:** Update ordre status

#### `app/api/admin/orders/validate/route.ts`
**Rôle:** Valider/rejeter ordre (fraud check)

#### `app/api/admin/orders/export/route.ts`
**Rôle:** Export CSV toutes commandes

#### `app/api/admin/transactions/route.ts`
**Rôle:** Audit transactions

---

### 🔧 API: Utilitaires

#### `app/api/cloudinary/delete/route.ts`
**Rôle:** Supprimer image Cloudinary

#### `app/api/geo/autocomplete/route.ts`
**Rôle:** Autocomplétion adresses

#### `app/api/geo/nearby/route.ts`
**Rôle:** Items/boutiques à proximité (géolocalisation)

#### `app/api/geo/reverse/route.ts`
**Rôle:** Reverse geocoding

#### `app/api/events/track/route.ts`
**Rôle:** Tracker événements utilisateur (analytics)

#### `app/api/friendships/route.ts`
**Rôle:** Suivi utilisateurs (follows)

#### `app/api/suggestions/route.ts`
**Rôle:** Suggestions de produits/boutiques

---

### 📱 Pages Frontend

#### `app/login/page.tsx`
**Rôle:** Page de connexion

#### `app/register/page.tsx`
**Rôle:** Page inscription

#### `app/discover/page.tsx`
**Rôle:** Page découverte items

#### `app/profile/user/page.tsx`
**Rôle:** Profil utilisateur CLIENT

#### `app/profile/businessOwner/page.tsx`
**Rôle:** Profil MARCHAND

#### `app/profile/cart/page.tsx`
**Rôle:** Panier d'achat

#### `app/messages/page.tsx`
**Rôle:** Messagerie conversations

#### `app/messages/suggestions/page.tsx`
**Rôle:** Suggestions de messages (IA)

#### `app/reels/page.tsx`
**Rôle:** Feed réels (TikTok-like)

#### `app/shops/[id]/page.tsx`
**Rôle:** Page détail boutique

#### `app/search/page.tsx`
**Rôle:** Résultats recherche

#### `app/dashboard/[id]/page.tsx`
**Rôle:** Dashboard marchand - Vue d'ensemble

#### `app/dashboard/[id]/products/page.tsx`
**Rôle:** Gestion produits

#### `app/dashboard/[id]/reels/page.tsx`
**Rôle:** Gestion réels/vidéos

#### `app/dashboard/[id]/transactions/page.tsx`
**Rôle:** Historique transactions

#### `app/dashboard/[id]/leads/page.tsx`
**Rôle:** Leads qualifiés

#### `app/dashboard/[id]/social/page.tsx`
**Rôle:** Statistiques sociales

#### `app/merchants/product/[id]/page.tsx`
**Rôle:** Détail produit pour achat

#### `app/merchants/service/[id]/page.tsx`
**Rôle:** Détail service pour réservation

---

## 📁 STRUCTURE `/lib` - Utilitaires & Services

### 🔑 Fichiers Racine

#### `lib/utils.ts`
**Rôle:** Fonction utilitaire `cn()` (classNames avec Tailwind merge)
```typescript
Export: cn(...inputs: ClassValue[]) → string
// Merge Tailwind classes sans conflits
// Exemple: cn("px-2", "px-4") → "px-4"
```

#### `lib/utils.ts`
**Rôle:** Utilitaires globaux

#### `lib/admin-auth.ts`
**Rôle:** Vérifier si utilisateur est ADMIN

#### `lib/cloudinary.ts`
**Rôle:** Client Cloudinary pour upload/delete images

#### `lib/rate-limit.ts`
**Rôle:** Rate limiter (throttle API requests)

#### `lib/session-utils.ts`
**Rôle:** Gestion sessions utilisateur

#### `lib/storage.ts`
**Rôle:** LocalStorage wrapper (client-side)

#### `lib/suggestions.ts`
**Rôle:** Générer suggestions IA

#### `lib/upload.ts`
**Rôle:** Upload fichiers vers Supabase Storage

#### `lib/openrouter-embeddings.ts`
**Rôle:** Générer embeddings vecteur via OpenRouter
```typescript
Export:
  - generateEmbedding(text: string) → number[]
  - generateQueryEmbedding(query: string) → number[]
  - generateImageEmbedding(imageUrl: string) → number[]
// Model: baai/bge-m3 (384 dimensions)
```

---

### 🗣️ Darija Tunisien

#### `lib/darija-dictionary.ts`
**Rôle:** Dictionnaire Darija complet (20k+ mots)
```typescript
Export: DARIJA_TUNISIAN_DICTIONARY
Structure: {
  'n7eb': { french: 'je veux', category: 'verb' },
  'nhb nakel': { french: 'je veux manger restaurant', category: 'food' },
  ...
}
Catégories: verb, food, auto, shopping, tech, fashion, etc.

Functions:
  - translateDarijaForSearch(text) → français normalized
  - extractDarijaWords(text) → string[]
```

#### `lib/darija-corpus-1.json` à `4.json`
**Rôle:** 4 fichiers corpus Darija (4000+ phrases)
- Exemples de phrases réelles Darija
- Variantes phonétiques + arabes

#### `lib/darija-dictionary.test.ts`
**Rôle:** Tests dictionnaire Darija

#### `lib/mock-data.ts`
**Rôle:** Données mock pour dev/tests

#### `lib/mock-data-10k.ts`
**Rôle:** 10000 items mock pour load testing

---

### 📦 Supabase

#### `lib/supabase/client.ts`
**Rôle:** Client Supabase browser (frontend)
```typescript
Export: createClient()
// Used in: client components, hooks
```

#### `lib/supabase/server.ts`
**Rôle:** Client Supabase server (backend)
```typescript
Export: createClient()
// Used in: Server Actions, API routes
// Authentification: ANON_KEY (pas ADMIN_KEY)
```

#### `lib/supabase/admin.ts`
**Rôle:** Client Supabase admin (backend sécurisé)
```typescript
Export: createAdminClient()
// Used in: Admin operations, webhooks
// Authentification: SERVICE_ROLE_KEY (all permissions)
```

#### `lib/supabase/browser.ts`
**Rôle:** Browser client alternative

#### `lib/supabase/auth.ts`
**Rôle:** Authentication utilities

#### `lib/supabase/database.ts`
**Rôle:** Database query helpers

#### `lib/supabase/storage.ts`
**Rôle:** File storage operations

#### `lib/supabase/storage-diagnostics.ts`
**Rôle:** Debugging storage issues

#### `lib/supabase/realtime.ts`
**Rôle:** Realtime subscriptions (notifications temps réel)

#### `lib/supabase/middleware.ts`
**Rôle:** Supabase middleware pour Next.js

---

### 🔄 Cache

#### `lib/cache/redis.ts`
**Rôle:** Redis cache client via Upstash
```typescript
Export:
  - cacheGet(key: string) → value | null
  - cacheSet(key: string, value: any, ttl_sec?: number) → void
  - cacheGetOrSet(key, fn, ttl) → value // Lazy load pattern
  - cacheDelete(key: string) → void
// TTL default: 600 sec (10 min)
// Fallback: memory cache si Redis indisponible
```

---

### 🎯 Recherche Avancée

#### `lib/search/hybrid-search.ts`
**Rôle:** Hybrid search (keyword + vector)
```typescript
Export:
  - hybridSearch(query, filters) → SearchResult[]
  - fetchLinkedReels(itemId) → Reel[]
// Combine BM25 keyword search + vector similarity
```

#### `lib/search/normalizer.ts`
**Rôle:** Normaliser queries (darija → français, trim, etc)

#### `lib/search/reranker.ts`
**Rôle:** Re-rank résultats par relevance
```typescript
Export: rerank(results, query) → SortedResults[]
// Order by: relevance score, engagement, recency, distance
```

#### `lib/search/vector-search.ts`
**Rôle:** Recherche vecteur via pgvector
```typescript
Export: vectorSearch(embedding, limit) → Item[]
// PostgreSQL: SELECT * FROM items ORDER BY embedding <-> query_embedding
```

---

### 🤖 IA & LLM

#### `lib/ai/darija-parser.ts`
**Rôle:** Parser Darija → Structured data
```typescript
Export: parseDarijaInput(prompt: string) → ParsedDarijaResult

Types:
  - ParsedProductData (intent: create_product)
  - ParsedPromotionData (intent: create_promotion)
  - { intent: 'chat'; message }
  - { intent: 'unknown'; raw }

Process:
  1. Translate Darija → French
  2. Classify intent via embeddings (cosine similarity vs anchors)
  3. Extract fields (name, price, discount, etc)
  4. Generate image prompt
```

#### `lib/ai/comment-analyzer.ts`
**Rôle:** Analyser commentaires (sentiment, fraud keywords)

#### `lib/ai/image-generator.ts`
**Rôle:** Générer images via Replicate/Stability AI

#### `lib/agents/darija-rag.ts`
**Rôle:** Darija RAG (Retrieval-Augmented Generation)
```typescript
// Build context from corpus
// Query OpenRouter avec context
// Extract answer
```

#### `lib/agents/darija-rules.ts`
**Rôle:** Rule-based Darija processing (fallback)

#### `lib/agents/prompts.ts`
**Rôle:** System prompts pour LLM

#### `lib/agents/darija-sample.json`
**Rôle:** Exemples prompts Darija

---

### 📊 Ranking & Recommandations

#### `lib/ranking/feed.ts`
**Rôle:** Generate personalized ranking feed
```typescript
Export: buildRankingFeed(userId, limit) → RankedItem[]

Process:
  1. Get user behavioral signals (clicks, saves, views, scroll)
  2. Detect dominant intent (shopping, fashion, food, auto, etc)
  3. Score items via 20+ features:
     - Engagement (views, likes, saves)
     - Recency (item posted < 24h)
     - Price match (user price affinity)
     - Distance (geo-proximity)
     - Category match (intent)
     - Merchant quality (rating)
     - Stock (items en stock)
     - Discount (promotional boost)
  4. ML ranking algorithm (gradient boosting-inspired)
  5. Diversify results (avoid same merchant repeating)
  6. Cache per-user 5 min
```

#### `lib/ranking/intent.ts`
**Rôle:** User intent detection
```typescript
Types: shopping, fashion, food, auto, tech, beauty, home, travel, fitness

Process:
  - Aggregate user events last 7 days
  - Calculate probability distribution
  - Return dominant intent
```

#### `lib/ranking/scoring.ts`
**Rôle:** ML scoring algorithm
```typescript
Export: rankItems(items[], features) → ScoredItem[]

Model:
  score = w1*engagement + w2*recency + w3*price_match + 
          w4*distance + w5*category_match + w6*merchant_quality + 
          w7*stock + w8*discount

// Weights tuned via historical data
```

#### `lib/ranking/signals.ts`
**Rôle:** Extract behavioral signals
```typescript
Types:
  - Engagement: views, likes, saves, shares, clicks
  - Interaction: scroll_speed, watch_time
  - User: previous_purchases, follow_status
  - Item: price, category, distance, stock, discount
```

#### `lib/ranking/event-schema.ts`
**Rôle:** Schema événements tracking

#### `lib/ranking/types.ts`
**Rôle:** TypeScript types pour ranking

#### `lib/ranking/constants.ts`
**Rôle:** Constantes (sliding window, weights, thresholds)

#### `lib/ranking/feed-cache.ts`
**Rôle:** Cache per-user feeds (Redis)

#### `lib/ranking/intent-cache.ts`
**Rôle:** Cache user intents

---

### 🔐 Détection de Fraude

#### `lib/actions/fraud-detection.ts`
**Rôle:** Système détection fraude 4-couches
```typescript
Export:
  - analyzeFraud(context: FraudContext) → FraudAnalysis
  - saveFraudAnalysis(userId, analysis) → void

Architecture:
  Layer 1: Collect 7 Heuristic Signals
    - Signal 1: NEW ACCOUNT (0-1h: HIGH=30pts, 0-24h: MED=15pts)
    - Signal 2: REPEAT ORDERS (same item repeat: 15pts)
    - Signal 3: HIGH VELOCITY (multiple orders/hour: 25pts)
    - Signal 4: UNUSUAL GEOGRAPHY (order far from user location: 20pts)
    - Signal 5: UNUSUAL PRICE (item way below market: 15pts)
    - Signal 6: PAYMENT METHOD (new CC, prepaid card: 10pts)
    - Signal 7: DELIVERY ADDRESS (mismatch location: 10pts)

  Layer 2: Heuristic Score (0-100 scale)
    score = sum(signal.weight) / 10

  Layer 3: AI Analysis
    - Call OpenRouter (gemini-2.0-flash) avec context
    - LLM analyze + provide reasoning

  Layer 4: Final Classification
    - safe (score < 25): Approve
    - suspicious (25-54): Manual review
    - high_risk (55-74): Challenge (2FA, verification)
    - blocked (≥75): Auto-reject

Recommendation: approve | review | reject
```

---

### 💼 Server Actions (lib/actions/)

#### `lib/actions/auth.ts`
**Rôle:** Authentification actions
```typescript
- signIn(email, password)
- signUp(email, password, profile)
- signOut()
- resetPassword(email)
- updatePassword(oldPwd, newPwd)
```

#### `lib/actions/users.ts`
**Rôle:** Gestion utilisateurs
```typescript
- getUser(userId)
- updateProfile(userId, data)
- deleteAccount(userId)
```

#### `lib/actions/stores.ts`
**Rôle:** Gestion boutiques marchands
```typescript
- createStore(merchantId, storeData)
- updateStore(storeId, data)
- getStoreStats(storeId)
```

#### `lib/actions/items.ts`
**Rôle:** Gestion produits/services
```typescript
- createItem(storeId, itemData)
- updateItem(itemId, data)
- deleteItem(itemId)
- getProductById(itemId) → PRODUCT | SERVICE
- decrementStock(itemId, qty)
```

#### `lib/actions/orders.ts`
**Rôle:** Gestion commandes
```typescript
- createOrder(orderData)
  Process:
    1. Get current user
    2. Check store owner (can't order own items)
    3. Check existing PENDING orders (prevent duplicates)
    4. Run fraud detection
    5. Decrement stock
    6. Create order record
    7. Schedule payment-retry worker

- updateOrderStatus(orderId, status)
- getOrderHistory(userId)
- cancelOrder(orderId) → sync refund via QStash
```

#### `lib/actions/transactions.ts`
**Rôle:** Sync transactions DB ↔ Stripe
```typescript
- syncOrderTransaction(orderId, stripePaymentIntentId)
- getTransactionHistory(userId)
```

#### `lib/actions/search.ts`
**Rôle:** Pipeline recherche sémantique
```typescript
- globalSearch(query, filters, limit) → SearchResult[]
  
Pipeline:
  1. Cache check (Redis)
  2. Normalize query (Darija → French, trim, remove accents)
  3. Generate embedding (OpenRouter baai/bge-m3)
  4. Vector search (pgvector)
  5. Hybrid search (keyword BM25 + vector)
  6. Rerank (relevance, engagement, distance)
  7. Cache results (10 min)
  8. Log search (user activity)

Features:
  - Darija support (native)
  - Redis cache (30% latency gain vs v1)
  - Timeout handling (4s embed timeout)
  - Memory cache fallback
```

#### `lib/actions/reels.ts`
**Rôle:** Gestion réels/vidéos TikTok-like
```typescript
- createReel(storeId, reelData)
- updateReel(reelId, data)
- deleteReel(reelId)
- getReelsFeed(userId, limit)
- likeReel(userId, reelId)
- commentReel(userId, reelId, comment)
```

#### `lib/actions/stories.ts`
**Rôle:** Gestion stories (Instastyle)

#### `lib/actions/recommendations.ts`
**Rôle:** Recommandations personnalisées
```typescript
- getRecommendations(userId) → Item[]
// Use ranking/feed algorithm
```

#### `lib/actions/comments.ts`
**Rôle:** Gestion commentaires
```typescript
- createComment(userId, itemId, text)
- analyzeComment(comment) → sentiment, keywords
- detectFraudKeywords(comment)
```

#### `lib/actions/notifications.ts`
**Rôle:** Gestion notifications
```typescript
- createNotification(userId, data)
- getNotifications(userId)
- markAsRead(notificationId)
- sendPushNotification(token, message)
```

#### `lib/actions/ai-agent.ts`
**Rôle:** Darija AI agent
```typescript
- processDarijaInput(userId, prompt)
  1. Parse Darija → structured data
  2. Execute intent (create_product, create_promotion, chat)
  3. Return results + images generated
```

#### `lib/actions/ai-notifications.ts`
**Rôle:** IA pour notifications intelligentes

#### `lib/actions/profile.ts`
**Rôle:** Gestion profils utilisateurs

#### `lib/actions/public-profile.ts`
**Rôle:** Profils publics marchands

#### `lib/actions/overviews.ts`
**Rôle:** Vue d'ensemble statistiques

#### `lib/actions/sales-analyzer.ts`
**Rôle:** Analyse ventes marchands
```typescript
- analyzeSales(storeId, period)
- getTrendingItems(storeId)
- getAbandonedCarts(storeId)
```

#### `lib/actions/admin.ts`
**Rôle:** Actions admin
```typescript
- getPlatformStats()
- getTopMerchants()
- getFraudAlerts()
- blockUser/Store/Item
```

#### `lib/actions/groq-service.ts`
**Rôle:** Groq LLM alternative à OpenRouter

#### `lib/actions/openrouter-service.ts`
**Rôle:** OpenRouter service (streaming, embeddings)

#### `lib/actions/alerts.engine.ts`
**Rôle:** Engine alertes temps réel

#### `lib/actions/analyzer-service.ts`
**Rôle:** Service analyse données

#### `lib/actions/leads.ts`
**Rôle:** Gestion leads marchands

#### `lib/actions/reservations.ts`
**Rôle:** Gestion réservations services

#### `lib/actions/promotions.ts`
**Rôle:** Gestion promotions/discounts

#### `lib/actions/reviews.ts`
**Rôle:** Gestion avis clients

#### `lib/actions/favorites.ts`
**Rôle:** Gestion favoris utilisateurs

#### `lib/actions/friendships.ts`
**Rôle:** Gestion follows/followers

#### `lib/actions/store-follows.ts`
**Rôle:** Follow boutiques

#### `lib/actions/support.ts`
**Rôle:** Support tickets

#### `lib/actions/account_subscription.ts`
**Rôle:** Gestion abonnements premium

#### `lib/actions/addbuss.ts`
**Rôle:** Ajouter boutique marchands

#### `lib/actions/business.ts`
**Rôle:** Gestion business settings

#### `lib/actions/user-activity.ts`
**Rôle:** Logger activité utilisateurs
```typescript
- logUserSearch(userId, query, results)
- logProductView(userId, itemId)
- logAddToCart(userId, itemId)
- logCheckout(userId, orderId)
```

#### `lib/actions/product_detail.ts`
**Rôle:** Détail produit (reviews, questions)

#### `lib/actions/service_detail.ts`
**Rôle:** Détail service (réservations, avis)

#### `lib/actions/debug-schema.ts`
**Rôle:** Debug database schema

---

### 💾 Store (Zustand)

#### `lib/store/use-cart-store.ts`
**Rôle:** Global state panier
```typescript
State:
  - items: CartItem[]
  - total: number
  - quantity: number

Actions:
  - addItem(item)
  - removeItem(itemId)
  - updateQuantity(itemId, qty)
  - clearCart()
  - checkout()
```

#### `lib/store/use-messaging-store.ts`
**Rôle:** State messages/conversations

#### `lib/store/use-saves-store.ts`
**Rôle:** State favoris/saves

#### `lib/store/use-call-store.ts`
**Rôle:** State appels/calls

---

### 🎨 Context & Hooks

#### `lib/context/UploadContext.tsx`
**Rôle:** Context pour upload images
```typescript
State:
  - uploadProgress: number
  - uploadedFiles: File[]
  - isUploading: boolean
  - error?: string

Functions:
  - uploadFile(file)
  - removeFile(fileId)
```

---

### 📍 Dashboard

#### `lib/dashboard/store-access.ts`
**Rôle:** Vérifier accès dashboard marchand
```typescript
- canAccessStore(userId, storeId) → boolean
- getUserStores(userId) → Store[]
```

---

### 📡 Monitoring & Tracking

#### `lib/monitoring/index.ts`
**Rôle:** Observabilité & logging
```typescript
- logEvent(eventType, data)
- trackError(error)
- recordMetric(name, value)
```

#### `lib/tracking/eventTypes.ts`
**Rôle:** Types événements tracking

#### `lib/tracking/trackEvent.ts`
**Rôle:** Function tracker événements

---

### 🛠️ Utilitaires

#### `lib/utils/avatar.ts`
**Rôle:** Générer avatars utilisateurs (initiales ou gravatar)

#### `lib/utils/qr-code.ts`
**Rôle:** Générer QR codes (order verification)

---

---

## 🔄 Services Critiques

### 1️⃣ Authentification (Session Provider)
- **Fichier:** `lib/supabase/auth.ts` + `app/layout.tsx`
- **Flux:** Login → SessionProvider → GlobalContext
- **Rôles:** CLIENT, PRO/BUSINESS_OWNER, ADMIN

### 2️⃣ Recherche Sémantique Globale
- **Fichier:** `lib/actions/search.ts`
- **Pipeline:** Query → Darija Translation → Embedding → Vector Search → Rerank → Cache
- **Tech:** OpenRouter (embeddings), PostgreSQL pgvector, Redis
- **TTL:** 10 min

### 3️⃣ Détection de Fraude 4-Couches
- **Fichier:** `lib/actions/fraud-detection.ts` + `app/api/orders/route.ts`
- **Signals:** 7 heuristics (new account, velocity, geography, price, etc)
- **Score:** 0-100 → safe/suspicious/high_risk/blocked
- **AI:** OpenRouter analysis + reasoning
- **Action:** Auto-approve/review/reject

### 4️⃣ Ranking & Recommandations
- **Fichier:** `lib/ranking/feed.ts`
- **Features:** 20+ (engagement, recency, price, distance, category, merchant, stock, discount)
- **Algorithm:** ML scoring with gradient boosting-inspired weights
- **Cache:** Per-user 5 min (Redis)
- **Output:** YouTube-like personalized feed

### 5️⃣ Darija Support (Natif)
- **Fichier:** `lib/darija-dictionary.ts` + `lib/ai/darija-parser.ts`
- **Dictionary:** 20k+ mots, 4 corpus files
- **Formats:** Arabic script, phonetic (123abc), mixed
- **Use Cases:**
  - Search queries (darija → french translation)
  - Intent classification (create_product, create_promotion)
  - Comment analysis
  - IA agent commands

### 6️⃣ Real-time Notifications
- **Files:** `lib/supabase/realtime.ts`, `app/api/notifications/route.ts`
- **Tech:** Supabase Realtime, FCM Push
- **Types:** Order updates, messages, alerts, AI notifications

### 7️⃣ Payment & Transactions
- **Files:** `lib/actions/orders.ts`, `app/api/webhooks/order/confirm/route.ts`
- **Tech:** Stripe, QStash workers, Supabase DB
- **Flow:** Order → Stripe Payment Intent → Webhook → Transaction Sync → Notification

### 8️⃣ Media Management
- **Cloudinary:** Images, video thumbnails
- **Supabase Storage:** Files, documents
- **Functions:** Upload, delete, transform, generate variants

---

## 📊 Flux de Données

### User Journey: Achat Produit

```
1. User Browse (Home/Discover)
   └─ load: /api/ranking/feed
   └─ save: events/track
   └─ render: RankedItem[]

2. User Search "nhb nakel" (Darija)
   └─ POST: /api/semantic-search?q=nhb nakel
   └─ lib/actions/search.ts:
      ├─ Cache check (Redis) ❌
      ├─ Normalize: darija → french
      ├─ Embed: OpenRouter (4s timeout)
      ├─ Vector search: pgvector
      ├─ Hybrid: BM25 + vector
      ├─ Rerank: relevance
      ├─ Cache: 10 min
      └─ Log: user-activity
   └─ Display: SearchResult[]

3. User Click Product (e.g., "Couscous merguez")
   └─ Render: /merchants/product/[id]
   └─ Load: GET /api/items/[id]
   └─ Track: events/track (view)
   └─ Show: price, reviews, seller info, similar items

4. User Add to Cart
   └─ State: use-cart-store (Zustand)
   └─ Persist: localStorage

5. User Checkout
   └─ Route: /profile/cart
   └─ Validate: stock, seller, user
   └─ POST: /api/orders/bulk
   │  └─ Fraud Analysis (Layer 1-4):
   │     ├─ Collect 7 signals
   │     ├─ Calc heuristic score
   │     ├─ AI analysis
   │     └─ Classification (safe/suspicious/high_risk/blocked)
   │
   ├─ If SAFE/SUSPICIOUS:
   │  ├─ Create order → DB
   │  ├─ Decrement stock
   │  ├─ QStash: schedule payment-retry worker
   │  └─ Redirect: Stripe Checkout
   │
   ├─ If HIGH_RISK:
   │  ├─ Require 2FA verification
   │  └─ Retry payment
   │
   └─ If BLOCKED:
      ├─ Auto-reject order
      └─ Notify: admin fraud alert

6. User Pays via Stripe
   └─ Stripe: payment_intent.succeeded
   └─ Webhook: POST /api/webhooks/order/confirm
   │  ├─ Verify signature
   │  ├─ Update order status → PAID
   │  ├─ Sync transaction → DB
   │  ├─ Create notification
   │  └─ QStash: notify merchant
   │
   └─ User sees: "Order confirmed ✅"

7. Merchant Receives Order
   └─ Dashboard: /dashboard/[storeId]
   └─ See: order in "Recent Orders"
   └─ Actions: mark shipped, add tracking
   └─ Customer notified: real-time via Realtime
```

### Merchant Journey: Create Product via Darija

```
1. Merchant Opens: /dashboard/[storeId]/products
   └─ Button: "Create with AI (Darija)"

2. Merchant Input (Darija): "نحب نزيد كسكسي بسعر 15 دينار وصورة محمرة"
   └─ Translation: "Je veux ajouter couscous à 15dt avec image rougeâtre"

3. POST: /api/ai-darija
   └─ lib/actions/ai-agent.ts:
      ├─ Parse input: parseDarijaInput()
      ├─ Extract Darija words: extractDarijaWords()
      ├─ Translate: DARIJA_DICTIONARY lookup
      ├─ Intent classification: "create_product"
      ├─ Extract data:
      │  ├─ name: "Couscous"
      │  ├─ price: 15
      │  ├─ category: "Food"
      │  ├─ image_prompt: "Moroccan couscous, reddish, appetizing"
      │  └─ description: "Traditional couscous recipe..."
      │
      └─ Generate image: Replicate (image_prompt)

4. System creates item
   └─ INSERT items table
   └─ Attach image
   └─ Embedding generated (pgvector)
   └─ Notification: merchant "Item créé ✅"

5. Item visible in feed
   └─ Ranking algorithm picks it up
   └─ Personalized to users matching intent
```

### IA Comment Analysis Flow

```
1. User comments on product: "Ce produit est fake, arnaquer!"
   └─ POST: /api/reels/comments

2. System triggers: /api/comments/analyze
   └─ lib/ai/comment-analyzer.ts:
      ├─ Sentiment: negative (fraud keywords: "fake", "arnaquer")
      ├─ Extract keywords: ["fake", "scam", "warning"]
      ├─ Alert flag: FRAUD_SUSPECTED
      └─ Save: comments_analysis table

3. Admin Dashboard Alert
   └─ RED FLAG: "Review suspect on item #123"
   └─ Auto notify: merchant + admin
   └─ Merchant can: respond, flag as inappropriate

4. Merchant Response
   └─ Comment threads maintained
   └─ Seller rating affected if confirmed fraud
```

---

## 📈 Key Metrics & Performance

| Metric | Target | Tech |
|--------|--------|------|
| Search latency | <2s | Redis cache + vector indexing |
| Feed generation | <3s | Redis per-user cache |
| Fraud detection | <500ms | Heuristics + timeout AI |
| Embedding generation | <4s | OpenRouter with timeout |
| Payment processing | <30s | Stripe + QStash workers |
| Real-time messaging | <100ms | Supabase Realtime |

---

## 🔒 Security

- ✅ Supabase RLS (Row-Level Security)
- ✅ API rate limiting (rate-limit.ts)
- ✅ JWT authentication
- ✅ Admin key segregation
- ✅ Webhook signature verification (Stripe)
- ✅ Fraud detection multi-layer
- ✅ Input sanitization (Darija normalization)

---

**Fin de la documentation | Version: 4.4**
