# CARTOGRAPHIE FONCTIONNALITÉS ↔️ FICHIERS DE CODE

**RO2YA Marketplace Platform**  
**Web App (Next.js) + Mobile App (React Native) + Backend (Django)**

---

## 📱 FONCTIONNALITÉS CLIENT

### 1️⃣ **AUTHENTIFICATION**

#### Fichiers Web (Next.js):
- **[lib/actions/auth.ts](lib/actions/auth.ts)**
  - `login(formData)` - Connexion email/password
  - `signup(formData)` - Inscription utilisateur
  - `sendLoginMagicLink(formData)` - Lien magique connexion
  - `sendSignupMagicLink(formData)` - Lien magique inscription
  - `signout()` - Déconnexion
  - `sendPasswordResetEmail(email)` - Réinitialiser mot de passe
  - `updateUserPassword(password)` - Changer mot de passe

- **[app/auth/](app/auth/)**
  - `page.tsx` - Page de connexion
  - `login/page.tsx` - Formulaire login
  - `register/page.tsx` - Formulaire inscription
  - `update-password/page.tsx` - Changer mot de passe

#### Fichiers Mobile (React Native):
- **[lib/auth.ts](../ro2ya-mobile-app/lib/auth.ts)**
  - `signUp(email, password, fullName)` - Inscription
  - `signIn(email, password)` - Connexion
  - `signOut()` - Déconnexion
  - `refreshSession()` - Actualiser JWT token
  - `updatePassword(oldPassword, newPassword)` - Changer mot de passe
  - `resetPassword(email)` - Email réinitialisation

- **[context/AuthContext.tsx](../ro2ya-mobile-app/context/AuthContext.tsx)**
  - État global d'authentification
  - Gestion automatique du JWT

---

### 2️⃣ **RECHERCHE PAR IA**

#### Fichiers Web (Next.js):
- **[lib/actions/search.ts](lib/actions/search.ts)** ⭐ **PIPELINE CONSOLIDÉ**
  - `doGlobalSemanticSearch(query, location, category, userLat, userLng)` - **ORCHESTRATEUR PRINCIPAL**
    - **ÉTAPE 0**: Vérification cache Redis
    - **ÉTAPE 1**: Normalisation requête (Darija → Français)
    - **ÉTAPE 2**: Génération embeddings (OpenRouter)
    - **ÉTAPE 3**: Recherche vectorielle (pgvector)
    - **ÉTAPE 4**: Recherche hybride (3 tables: stores, items, reels)
    - **ÉTAPE 5**: Récupération reels liés
    - **ÉTAPE 6**: Fusion + reranking (RRF + LLM)
    - **ÉTAPE 7**: Tri final par distance, rating

  - `normalizeQuery(query)` - Traduction Darija + expansions sémantiques
  - `vectorSearch(embedding, options)` - Recherche par similarité sémantique
  - `hybridSearch(options)` - Recherche textuelle (ILIKE) sur 3 tables
  - `fetchLinkedReels(vectorResults)` - Récupérer reels associés
  - `rerank(vectorResults, textResults, linkedReels, options)` - RRF + LLM reranking
  - `searchStores(query, location, category)` - Recherche stores
  - `searchItems(query, category)` - Recherche items/produits
  - `searchServicesDirectory(query, location, category)` - Recherche services

- **[lib/openrouter-embeddings.ts](lib/openrouter-embeddings.ts)**
  - `generateEmbedding(text)` - Créer embedding pour requête/document
  - `generateQueryEmbedding(query)` - Optimisé pour requêtes
  - `generateEmbeddingsBatch(texts)` - Batch embeddings

- **[lib/ai/darija-parser.ts](lib/ai/darija-parser.ts)**
  - `parseDarijaPrompt(prompt)` - Parser Darija pour extraction d'intents

- **[lib/agents/darija-rag.ts](lib/agents/darija-rag.ts)**
  - `lookupDarija(text, limit)` - Lookup Darija-to-French avec context

- **[app/search/](app/search/)**
  - `page.tsx` - Page recherche principale
  - `searchProduct/page.tsx` - Recherche produits
  - `searchService/page.tsx` - Recherche services

#### Fichiers Mobile (React Native):
- **[lib/items.ts](../ro2ya-mobile-app/lib/items.ts)**
  - `fetchItems(params)` - GET /api/items
  - `fetchItemDetail(id)` - GET /api/items/{id}

- **[lib/stores.ts](../ro2ya-mobile-app/lib/stores.ts)**
  - `fetchStores(location)` - GET /api/stores
  - `fetchMyStores()` - GET /api/stores/me

- **[lib/geo.ts](../ro2ya-mobile-app/lib/geo.ts)**
  - `getCurrentLocation()` - GPS utilisateur
  - `calculateDistance(lat1, lon1, lat2, lon2)` - Distance en km
  - `searchNearby(query, radius)` - Recherche à proximité

---

### 3️⃣ **CONSULTER ET INTERAGIR REELS** (Ranking + Système de notation)

#### Fichiers Web (Next.js):
- **[lib/ranking/](lib/ranking/)**
  - **[event-schema.ts](lib/ranking/event-schema.ts)** - Schéma événements (like, view, share, etc.)
  - **[feed-cache.ts](lib/ranking/feed-cache.ts)** - Cache feed utilisateur
  - **[constants.ts](lib/ranking/constants.ts)** - Poids, decay, constantes ranking
  - Système: **7+ signaux de ranking** (engagement, recency, trust, fraud score)

- **[lib/actions/comments.ts](lib/actions/comments.ts)**
  - `getReelComments(reelId)` - Récupérer commentaires reel
  - `postReelComment(input)` - Poster commentaire
  - `deleteReelComment(commentId)` - Supprimer commentaire
  - `uploadCommentAttachment(formData)` - Uploader fichier avec commentaire
  - `getStoreReelComments(storeId)` - Commentaires d'une store

- **[app/dashboard/[id]/reels/](app/dashboard/[id]/reels/)**
  - Affichage + interaction reels

#### Système de Ranking (Multi-signaux):
```
Score = (
  + engagement_score × 0.35
  + recency_score × 0.25
  + trust_score × 0.20
  + personalization_score × 0.15
  + anti_fraud_score × 0.05
)
```

**Signaux captés**: view, like, comment, share, bookmark, report

#### Fichiers Mobile (React Native):
- **[lib/reels.ts](../ro2ya-mobile-app/lib/reels.ts)**
  - `fetchReels()` - GET /api/reels (feed)
  - `fetchReelById(id)` - GET /api/reels/{id}
  - `createReel(data)` - POST /api/reels (créer reel)
  - `likeReel(id)` - POST /api/reels/{id}/like
  - `deleteReel(id)` - DELETE /api/reels/{id}

- **[app/(tabs)/index.tsx](../ro2ya-mobile-app/app/(tabs)/index.tsx)**
  - Affichage feed + reels section

---

### 4️⃣ **CHAT** (User ↔ Store)

#### Fichiers Web (Next.js):
- **À explorer**: lib/actions/messages.ts (probablement)

- **[app/messages/](app/messages/)**
  - Conversations et détails messages

#### Fichiers Mobile (React Native):
- **[lib/chat.ts](../ro2ya-mobile-app/lib/chat.ts)**
  - `fetchConversations(storeId?)` - GET /api/dashboard/{storeId}/messages
  - `fetchMessages(conversationId)` - Supabase realtime
  - `sendMessage(receiverId, content, type)` - Poster message
  - `subscribeToMessages(conversationId, callback)` - Écoute temps réel
  - `markAsRead(messageId)` - Marquer lu

- **[store/chatStore.ts](../ro2ya-mobile-app/store/chatStore.ts)**
  - État Zustand pour conversations

- **[app/chat/](../ro2ya-mobile-app/app/chat/)**
  - `[id].tsx` - Conversation détail

---

### 5️⃣ **PASSER COMMANDE / RÉSERVATION**

#### Fichiers Web (Next.js):
- **À explorer**: lib/actions/orders.ts

- **[app/checkout/](app/checkout/)** (probablement)

#### Fichiers Mobile (React Native):
- **[lib/orders.ts](../ro2ya-mobile-app/lib/orders.ts)**
  - `createOrder(orderData)` - POST /api/orders (créer commande simple)
  - `createBulkOrders(items, customerInfo)` - POST /api/orders/bulk (multiple items)
  - `getUserOrders()` - GET /api/orders (mes commandes)
  - `getStoreOrders(storeId)` - GET /api/orders?storeId (vendeur)

- **[lib/reservations.ts](../ro2ya-mobile-app/lib/reservations.ts)**
  - `createReservation(data)` - POST /api/reservations (réserver service)
  - `getUserReservations()` - GET /api/reservations
  - `updateReservation(id, data)` - PATCH /api/reservations/{id}
  - `cancelReservation(id)` - DELETE /api/reservations/{id}

- **[store/cartStore.ts](../ro2ya-mobile-app/store/cartStore.ts)**
  - État Zustand pour panier
  - `addItem(), removeItem(), updateQuantity(), clear()`

- **[app/cart.tsx](../ro2ya-mobile-app/app/cart.tsx)**
  - Affichage panier + checkout

---

### 6️⃣ **CRÉER UN AVIS**

#### Fichiers Web (Next.js):
- **[lib/actions/comments.ts](lib/actions/comments.ts)**
  - `postReelComment(input)` - Poster avis/commentaire

- **[app/product/[id]/](app/product/[id]/)** (probablement)
  - Formulaire créer avis

#### Fichiers Mobile (React Native):
- **[lib/comments.ts](../ro2ya-mobile-app/lib/comments.ts)**
  - `postComment(data)` - POST /api/comments (créer commentaire/avis)
  - `getComments(itemId)` - GET /api/comments (avis produit)
  - `deleteComment(id)` - DELETE /api/comments/{id}
  - `likeComment(id)` - POST /api/comments/{id}/like

---

### 7️⃣ **CONSULTER STORES / ITEMS / PROMOTIONS**

#### Fichiers Web (Next.js):
- **[lib/actions/business.ts](lib/actions/business.ts)**
  - `getBusinessById(id)` - Détail store/business
  - `getLatestStores(limit)` - Stores récentes

- **[app/shop/](app/shop/)**
  - Affichage stores/marketplace

- **[app/business/](app/business/)**
  - Détail store

- **À explorer**: lib/actions/promotions.ts

#### Fichiers Mobile (React Native):
- **[lib/promotions.ts](../ro2ya-mobile-app/lib/promotions.ts)**
  - `fetchPromotions()` - GET /api/promotions
  - `createPromotion(data)` - POST /api/promotions
  - `updatePromotion(id, data)` - PATCH /api/promotions/{id}
  - `deletePromotion(id)` - DELETE /api/promotions/{id}

- **[lib/profile.ts](../ro2ya-mobile-app/lib/profile.ts)**
  - `getProfile()` - GET /api/profile (profil utilisateur complet)

- **[app/(tabs)/discover.tsx](../ro2ya-mobile-app/app/(tabs)/discover.tsx)**
  - Découvrir stores/items/promotions

---

---

## 🏪 FONCTIONNALITÉS COMMERÇANT

### 1️⃣ **AJOUTER ITEMS (PRODUITS / SERVICES)**

#### Fichiers Web (Next.js):
- **À explorer**: lib/actions/products.ts

- **[app/dashboard/[id]/products/](app/dashboard/[id]/products/)**
  - `page.tsx` - Liste + formulaire création produit

#### Fichiers Mobile (React Native):
- **[lib/items.ts](../ro2ya-mobile-app/lib/items.ts)**
  - `upsertItem(itemData)` - POST/PATCH /api/items (créer/modifier)

- **[lib/upload.ts](../ro2ya-mobile-app/lib/upload.ts)**
  - `uploadImage(uri, type)` - Upload images produit

- **[app/create.tsx](../ro2ya-mobile-app/app/create.tsx)**
  - Formulaire création produit/service

---

### 2️⃣ **CRÉATION REELS / STORIES**

#### Fichiers Web (Next.js):
- **[app/dashboard/[id]/reels/](app/dashboard/[id]/reels/)**
  - Création et gestion reels

- **[app/dashboard/[id]/stories/](app/dashboard/[id]/stories/)**
  - Création et gestion stories

#### Fichiers Mobile (React Native):
- **[lib/reels.ts](../ro2ya-mobile-app/lib/reels.ts)**
  - `createReel(data)` - POST /api/reels (créer reel)
  - `deleteReel(id)` - DELETE /api/reels/{id}

- **[lib/stories.ts](../ro2ya-mobile-app/lib/stories.ts)**
  - `publishStory(data)` - POST /api/stories (publier story)
  - `deleteStory(id)` - DELETE /api/stories/{id}

- **[lib/upload.ts](../ro2ya-mobile-app/lib/upload.ts)**
  - `uploadImage(uri, type)` - Upload vidéo/image

---

### 3️⃣ **ACCEPTER / REFUSER ACTIONS** (Leads, Commandes)

#### Fichiers Web (Next.js):
- **[app/dashboard/[id]/leads/](app/dashboard/[id]/leads/)**
  - Dashboard leads (inquiries)
  - Actions: accept, reject, respond

- **[app/dashboard/[id]/](app/dashboard/[id]/)**
  - Dashboard principal avec quick actions

---

### 4️⃣ **CONSULTER TRANSACTIONS**

#### Fichiers Web (Next.js):
- **[app/dashboard/[id]/transactions/](app/dashboard/[id]/transactions/)**
  - `page.tsx` - Historique transactions/revenue

#### Fichiers Mobile (React Native):
- **[lib/dashboard.ts](../ro2ya-mobile-app/lib/dashboard.ts)**
  - `fetchDashboardStats(storeId)` - GET /api/dashboard/{storeId}/stats
  - `fetchDashboardOrders(storeId)` - GET /api/dashboard/{storeId}/orders
  - `fetchDashboardTransactions(storeId)` - GET /api/dashboard/{storeId}/transactions (probablement)

- **[app/dashboard/index.tsx](../ro2ya-mobile-app/app/dashboard/index.tsx)**
  - Affichage KPIs + transactions

---

### 5️⃣ **FRAUDE DETECTION**

#### Fichiers Web (Next.js):
- **[lib/actions/alerts.engine.ts](lib/actions/alerts.engine.ts)** ⭐ **SYSTÈME FRAUDE COMPLET**
  - `computeScores(analysis)` - Calcul 6+ scores:
    - fraud_risk_score (0-100)
    - comment_sentiment_score
    - text_authenticity_score
    - bot_likelihood_score
    - reviewer_reputation_score
    - competitor_likelihood_score

  - `generateAlerts(analysis)` - Génération alerts:
    - HIGH_FRAUD_RISK (score > 75)
    - SUSPICIOUS_PATTERN (>70)
    - FAKE_REVIEW_SUSPECTED (>60)
    - BOT_DETECTED (>65)
    - COMPETITOR_ATTACK (>70)
    - REVIEW_STORM (>5 en 1h)
    - UNUSUAL_BEHAVIOR (>55)

  - `computeHealthScore(results)` - Score santé store (0-100)

- **[lib/actions/analyzer-service.ts](lib/actions/analyzer-service.ts)**
  - `analyzeComment(text, context)` - Analyse commentaire
  - `analyzeBatch(comments, batchSize)` - Batch analysis

- **[lib/ai/comment-analyzer.ts](lib/ai/comment-analyzer.ts)**
  - NLP analysis des commentaires

- **[app/dashboard/[id]/intelligence/](app/dashboard/[id]/intelligence/)**
  - Dashboard intelligence (fraude alerts, analytics)

---

### 6️⃣ **RECOMMENDATION DE PROMOTION**

#### Fichiers Web (Next.js):
- **[lib/suggestions.ts](lib/suggestions.ts)**
  - Suggestions promotions basées sur IA

- **[lib/actions/ai-notifications.ts](lib/actions/ai-notifications.ts)**
  - `triggerInstantRecommendation(category)` - Recommandation promo instantanée
  - `triggerPersonalizedAINotifications()` - Notifications personnalisées

- **[lib/agents/prompts.ts](lib/agents/prompts.ts)**
  - `buildMarketingPrompt(ctx)` - Prompt LLM pour marketing
  - `buildAnalyticsPrompt(ctx)` - Prompt LLM pour analytics

- **À explorer**: Dashboard promotions recommendations

#### Fichiers Mobile (React Native):
- **[lib/promotions.ts](../ro2ya-mobile-app/lib/promotions.ts)**
  - `createPromotion(data)` - POST /api/promotions (créer selon recommandation)

---

### 7️⃣ **ANALYSE DE COMMENTAIRE**

#### Fichiers Web (Next.js):
- **[lib/actions/analyzer-service.ts](lib/actions/analyzer-service.ts)**
  - `analyzeComment(text, context)` - Analyse:
    - Sentiment (positif, négatif, neutre)
    - Thèmes clés
    - Spam score
    - Authenticity score

  - `analyzeBatch(comments, batchSize)` - Analyse batch

- **[lib/ai/comment-analyzer.ts](lib/ai/comment-analyzer.ts)**
  - NLP avec LLM (OpenRouter)

- **[lib/actions/alerts.engine.ts](lib/actions/alerts.engine.ts)**
  - Génération d'alertes basées sur analyse

- **[app/dashboard/[id]/intelligence/](app/dashboard/[id]/intelligence/)**
  - Affichage commentaires + analyses + sentiments

---

### 8️⃣ **CRÉER SUPPORT TICKET**

#### Fichiers Web (Next.js):
- **[app/dashboard/[id]/support/tickets/](app/dashboard/[id]/support/tickets/)**
  - `page.tsx` - Liste + création tickets

#### Fichiers Mobile (React Native):
- **[lib/dashboard.ts](../ro2ya-mobile-app/lib/dashboard.ts)**
  - `createSupportTicket(payload)` - POST /api/support/tickets
  - `fetchDashboardTickets(storeId)` - GET /api/support/tickets?store_id={id}

- **[app/dashboard/index.tsx](../ro2ya-mobile-app/app/dashboard/index.tsx)**
  - Affichage tickets support

---

### 9️⃣ **CHAT AVEC CLIENT / ADMIN**

#### Fichiers Web (Next.js):
- **[app/messages/](app/messages/)**
  - Conversation avec clients + admins

#### Fichiers Mobile (React Native):
- **[lib/chat.ts](../ro2ya-mobile-app/lib/chat.ts)**
  - `fetchConversations(storeId)` - GET /api/dashboard/{storeId}/messages
  - `sendMessage(receiverId, content)` - POST message
  - `subscribeToMessages()` - Écoute temps réel

- **[app/chat/[id].tsx](../ro2ya-mobile-app/app/chat/[id].tsx)**
  - Chat détail avec client/admin

---

---

## 🎯 RÉSUMÉ FICHIERS CRITIQUES

### Web App (Next.js) - Fichiers principaux:
```
lib/actions/
├── search.ts ⭐ (pipeline recherche 7 étapes)
├── auth.ts ⭐ (authentification)
├── alerts.engine.ts ⭐ (fraude detection)
├── analyzer-service.ts ⭐ (analyse commentaires)
├── comments.ts (gestion commentaires/reels)
├── business.ts (stores)
├── ai-notifications.ts (recommandations)
└── admin.ts (modération admin)

lib/ranking/
├── event-schema.ts (événements)
├── feed-cache.ts (cache feed)
└── constants.ts (poids ranking)

lib/ai/
├── comment-analyzer.ts (NLP commentaires)
├── image-generator.ts (génération images)
└── darija-parser.ts (parsing Darija)

lib/agents/
├── prompts.ts (LLM prompts)
└── darija-rag.ts (Darija lookup)

app/
├── auth/ (authentification)
├── search/ (recherche)
├── dashboard/[id]/ ⭐ (dashboard complet commerçant)
├── messages/ (chat)
└── shop/ (affichage marketplace)
```

### Mobile App (React Native) - Fichiers principaux:
```
lib/
├── api.ts ⭐ (axios + JWT interceptor)
├── auth.ts ⭐ (Supabase auth)
├── items.ts (produits)
├── stores.ts (magasins)
├── orders.ts (commandes)
├── chat.ts (messages)
├── reels.ts (vidéos)
├── dashboard.ts (vendeur dashboard)
├── comments.ts (avis/commentaires)
└── upload.ts (fichiers)

context/
├── AuthContext.tsx (état auth)
├── ProfileContext.tsx (état profil)
└── NotificationsContext.tsx (notifications)

store/
├── cartStore.ts (Zustand panier)
├── chatStore.ts (Zustand messages)
└── storiesStore.ts (Zustand stories)

app/
├── (auth)/ (authentification)
├── (tabs)/ ⭐ (navigation principale)
├── dashboard/ (vendeur dashboard)
├── product/[id] (détail produit)
├── cart.tsx (panier)
└── chat/[id] (conversation)
```

---

## 🔗 FLUX D'INTÉGRATION

### Exemple: Recherche client
```
Mobile: app/(tabs)/discover.tsx
  ↓ (utilisateur tape "kif hadak")
Mobile: lib/items.ts → fetchItems(q="kif hadak")
  ↓ (Axios appel API)
Web Backend: API /api/items?q=kif hadak
  ↓ (route vers server action)
Web Backend: lib/actions/search.ts → doGlobalSemanticSearch()
  ├─ ÉTAPE 1: normalizeQuery("kif hadak")
  ├─ ÉTAPE 2: generateEmbedding() via OpenRouter
  ├─ ÉTAPE 3: vectorSearch() via pgvector
  ├─ ÉTAPE 4: hybridSearch() via Supabase
  ├─ ÉTAPE 5: fetchLinkedReels()
  ├─ ÉTAPE 6: rerank() avec LLM
  └─ ÉTAPE 7: finalSort()
  ↓
Backend: Retourne SearchResult[] avec 10-15 résultats
  ↓
Mobile: Affiche results dans FlatList
  ↓
User: Tap sur produit → product/[id]
```

### Exemple: Fraude Detection commerçant
```
Web Dashboard: app/dashboard/[id]/intelligence/
  ↓ (vendeur ouvre intelligence)
Web: Charge fetchDashboardComments() + analyzeComments()
  ↓
Backend: lib/actions/analyzer-service.ts → analyzeBatch(comments)
  ├─ analyzeComment() pour chaque commentaire
  │  ├─ lib/ai/comment-analyzer.ts (NLP)
  │  └─ Scores: sentiment, spam, authenticity, bot, reputation
  ↓
Backend: lib/actions/alerts.engine.ts → generateAlerts()
  ├─ Vérifie scores > thresholds
  ├─ Génère BusinessAlert[] (FRAUD_RISK, BOT_DETECTED, etc.)
  └─ computeHealthScore() → store health 0-100
  ↓
Web UI: Affiche:
  ├─ Red alerts (FRAUD_RISK)
  ├─ Yellow warnings (SUSPICIOUS)
  ├─ Health score graph
  ├─ Suspicious comments highlighted
  └─ Recommended actions
```

---

**Document créé**: Juin 2026  
**Version**: 1.0  
**Statut**: Complet - Cartographie fonctionnalités ↔️ Fichiers
