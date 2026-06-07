# Rapport Complet: Dépendances LIB → APP

## Résumé Statistique
- **Fichiers LIB au total**: 107 fichiers
- **Fichiers APP au total**: 106 fichiers
- **Imports LIB dans APP**: 192 imports

---

## ACTIONS - lib/actions/*.ts

### LIB: lib/actions/account_subscription.ts
- **Type**: Action/Service
- **Statut**: Non importé
- **Utilisation**: Gestion des abonnements utilisateurs

### LIB: lib/actions/addbuss.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/merchants/business/add/page.tsx](app/merchants/business/add/page.tsx#L9) (ligne 9)
  - [app/api/stores/route.ts](app/api/stores/route.ts#L6) (ligne 6)
- **Functions**: `addBusiness`, `searchUnified`, `UnifiedSearchResult`
- **Utilisation**: Ajout et recherche d'entreprises

### LIB: lib/actions/admin.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/api/admin/stats/route.ts](app/api/admin/stats/route.ts#L2) (ligne 2)
- **Functions**: `getGlobalAdminStats`
- **Utilisation**: Statistiques globales admin

### LIB: lib/actions/ai-agent.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/api/ai-agent/route.ts](app/api/ai-agent/route.ts#L2) (ligne 2)
- **Functions**: `getStoreContext`
- **Utilisation**: Contexte pour l'agent IA

### LIB: lib/actions/ai-notifications.ts
- **Type**: Action/Service
- **Statut**: Non importé directement dans app
- **Utilisation**: Notifications générées par IA

### LIB: lib/actions/alerts.engine.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/api/comments/alerts/route.ts](app/api/comments/alerts/route.ts#L12) (ligne 12)
- **Functions**: `generateAlerts`
- **Utilisation**: Génération d'alertes pour les commentaires

### LIB: lib/actions/analyzer-service.ts
- **Type**: Service
- **Importé par**:
  - [app/api/comments/batch/route.ts](app/api/comments/batch/route.ts#L11) (ligne 11)
  - [app/api/comments/analyze/route.ts](app/api/comments/analyze/route.ts#L13) (ligne 13)
  - [app/api/dashboard/[storeId]/intelligence/route.ts](app/api/dashboard/[storeId]/intelligence/route.ts#L3) (ligne 3)
- **Types**: `ValidationError`, `ParseError`
- **Functions**: `analyzeBatch`, `analyzeComment`
- **Utilisation**: Analyse de commentaires avec validation

### LIB: lib/actions/auth.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/auth/update-password/page.tsx](app/auth/update-password/page.tsx#L6) (ligne 6)
  - [app/profile/user/page.tsx](app/profile/user/page.tsx#L17) (ligne 17)
  - [app/profile/businessOwner/page.tsx](app/profile/businessOwner/page.tsx#L24) (ligne 24)
- **Functions**: `updateUserPassword`, `sendPasswordResetEmail`
- **Utilisation**: Authentification et réinitialisation de mot de passe

### LIB: lib/actions/business.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/merchants/business/[id]/page.tsx](app/merchants/business/[id]/page.tsx#L1) (ligne 1)
- **Functions**: `getBusinessById`
- **Utilisation**: Récupération des détails de l'entreprise

### LIB: lib/actions/comments.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/dashboard/[id]/intelligence/page.tsx](app/dashboard/[id]/intelligence/page.tsx#L54) (ligne 54)
  - [app/dashboard/[id]/social/page.tsx](app/dashboard/[id]/social/page.tsx#L6) (ligne 6)
  - [app/api/reels/comments/route.ts](app/api/reels/comments/route.ts#L2) (ligne 2)
- **Functions**: `getStoreReelComments`, `postReelComment`, `deleteReelComment`, `getReelComments`
- **Utilisation**: Gestion des commentaires sur les reels

### LIB: lib/actions/debug-schema.ts
- **Type**: Utility/Debug
- **Statut**: Non importé
- **Utilisation**: Utilitaires de débogage de schéma

### LIB: lib/actions/favorites.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/profile/user/page.tsx](app/profile/user/page.tsx#L18) (ligne 18)
- **Functions**: `toggleSaveAction`
- **Utilisation**: Gestion des favoris

### LIB: lib/actions/fraud-detection.ts
- **Type**: Service
- **Statut**: Non importé directement dans app
- **Utilisation**: Détection de fraude

### LIB: lib/actions/friendships.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/dashboard/[id]/leads/page.tsx](app/dashboard/[id]/leads/page.tsx#L22) (ligne 22)
  - [app/messages/page.tsx](app/messages/page.tsx#L9) (ligne 9)
  - [app/public/user/[id]/page.tsx](app/public/user/[id]/page.tsx#L13) (ligne 13)
  - [app/api/friendships/route.ts](app/api/friendships/route.ts#L9) (ligne 9)
- **Functions**: `blockUser`, `getFriendshipStatus`, `sendFriendRequest`, `acceptFriendRequest`, `unblockUser`
- **Utilisation**: Gestion des amis et des relations

### LIB: lib/actions/groq-service.ts
- **Type**: Service
- **Statut**: Non importé directement dans app
- **Utilisation**: Service d'IA Groq

### LIB: lib/actions/items.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/merchants/business/[id]/page.tsx](app/merchants/business/[id]/page.tsx#L4) (ligne 4)
  - [app/dashboard/[id]/products/page.tsx](app/dashboard/[id]/products/page.tsx#L4) (ligne 4)
  - [app/dashboard/[id]/products/page.tsx](app/dashboard/[id]/products/page.tsx#L5) (ligne 5)
  - [app/shop/page.tsx](app/shop/page.tsx#L6) (ligne 6)
  - [app/api/items/route.ts](app/api/items/route.ts#L3) (ligne 3)
- **Types**: `Item`
- **Functions**: `getPublicItemsByStoreId`, `getAdminItemsByStoreId`, `upsertItem`, `deleteItem`, `getLatestItems`
- **Utilisation**: Gestion des produits/items

### LIB: lib/actions/leads.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/dashboard/[id]/leads/page.tsx](app/dashboard/[id]/leads/page.tsx#L5) (ligne 5)
  - [app/dashboard/[id]/transactions/page.tsx](app/dashboard/[id]/transactions/page.tsx#L21) (ligne 21)
  - [app/valider/page.tsx](app/valider/page.tsx#L7) (ligne 7)
- **Functions**: `getLeadActions`, `updateOrderStatus`
- **Utilisation**: Gestion des leads

### LIB: lib/actions/notifications.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/api/notifications/route.ts](app/api/notifications/route.ts#L3) (ligne 3)
- **Functions**: `getNotifications`, `markAsRead`, `markAllAsRead`, `getUnreadCount`
- **Utilisation**: Gestion des notifications

### LIB: lib/actions/openrouter-service.ts
- **Type**: Service
- **Statut**: Non importé
- **Utilisation**: Service OpenRouter pour IA

### LIB: lib/actions/orders.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/dashboard/qr-verify/[code]/page.tsx](app/dashboard/qr-verify/[code]/page.tsx#L5) (ligne 5)
  - [app/dashboard/[id]/transactions/page.tsx](app/dashboard/[id]/transactions/page.tsx#L24) (ligne 24)
  - [app/api/workers/process-refund/route.ts](app/api/workers/process-refund/route.ts#L12) (ligne 12)
  - [app/api/orders/route.ts](app/api/orders/route.ts#L3) (ligne 3)
  - [app/api/orders/bulk/route.ts](app/api/orders/bulk/route.ts#L3) (ligne 3)
- **Functions**: `getOrderByTrackingCode`, `updateOrderStatus`, `createOrder`, `getUserOrders`, `getStoreOrders`, `cancelOrder`
- **Utilisation**: Gestion des commandes

### LIB: lib/actions/overviews.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/dashboard/[id]/layout.tsx](app/dashboard/[id]/layout.tsx#L17) (ligne 17)
  - [app/dashboard/[id]/layout.tsx](app/dashboard/[id]/layout.tsx#L21) (ligne 21)
  - [app/dashboard/[id]/page.tsx](app/dashboard/[id]/page.tsx#L21) (ligne 21)
- **Functions**: `getSidebarStats`, `searchDashboard`, `getDashboardOverview`
- **Utilisation**: Aperçu du dashboard

### LIB: lib/actions/product_detail.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/merchants/product/[id]/page.tsx](app/merchants/product/[id]/page.tsx#L4) (ligne 4)
  - [app/api/items/[id]/route.ts](app/api/items/[id]/route.ts#L3) (ligne 3)
- **Functions**: `getProductById`, `getProductReviews`, `getRelatedItems`
- **Utilisation**: Détails des produits

### LIB: lib/actions/profile.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/profile/user/page.tsx](app/profile/user/page.tsx#L15) (ligne 15)
  - [app/profile/businessOwner/page.tsx](app/profile/businessOwner/page.tsx#L22) (ligne 22)
  - [app/api/profile/route.ts](app/api/profile/route.ts#L3) (ligne 3)
- **Functions**: `getUserProfileData`, `getOwnerProfileData`
- **Utilisation**: Gestion des profils utilisateurs

### LIB: lib/actions/promotions.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/merchants/business/[id]/page.tsx](app/merchants/business/[id]/page.tsx#L6) (ligne 6)
  - [app/dashboard/[id]/products/page.tsx](app/dashboard/[id]/products/page.tsx#L7) (ligne 7)
- **Functions**: `getPromotions`
- **Utilisation**: Gestion des promotions

### LIB: lib/actions/public-profile.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/public/user/[id]/page.tsx](app/public/user/[id]/page.tsx#L12) (ligne 12)
  - [app/public/business/[id]/page.tsx](app/public/business/[id]/page.tsx#L14) (ligne 14)
- **Functions**: `getPublicUserProfile`, `getPublicBusinessProfile`
- **Utilisation**: Profils publics

### LIB: lib/actions/recommendations.ts
- **Type**: Service
- **Importé par**:
  - [app/api/reels/route.ts](app/api/reels/route.ts#L3) (ligne 3)
- **Functions**: `getPersonalizedReels`
- **Utilisation**: Recommandations personnalisées

### LIB: lib/actions/reels.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/merchants/business/[id]/page.tsx](app/merchants/business/[id]/page.tsx#L7) (ligne 7)
  - [app/dashboard/[id]/reels/page.tsx](app/dashboard/[id]/reels/page.tsx#L9) (ligne 9)
  - [app/api/reels/route.ts](app/api/reels/route.ts#L4) (ligne 4)
- **Functions**: `recordStoreView`, `getBusinessReels`, `trackReelInteraction`
- **Utilisation**: Gestion des reels/vidéos

### LIB: lib/actions/reservation.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/dashboard/qr-verify/[code]/page.tsx](app/dashboard/qr-verify/[code]/page.tsx#L6) (ligne 6)
  - [app/dashboard/[id]/leads/page.tsx](app/dashboard/[id]/leads/page.tsx#L20) (ligne 20)
  - [app/dashboard/[id]/transactions/page.tsx](app/dashboard/[id]/transactions/page.tsx#L20) (ligne 20)
  - [app/dashboard/[id]/transactions/page.tsx](app/dashboard/[id]/transactions/page.tsx#L25) (ligne 25)
  - [app/valider/page.tsx](app/valider/page.tsx#L6) (ligne 6)
  - [app/api/reservations/route.ts](app/api/reservations/route.ts#L3) (ligne 3)
- **Functions**: `getBookingByTrackingCode`, `updateBookingStatus`, `createBooking`, `getUserBookings`, `getBusinessBookings`
- **Utilisation**: Gestion des réservations/bookings

### LIB: lib/actions/reviews.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/dashboard/[id]/intelligence/page.tsx](app/dashboard/[id]/intelligence/page.tsx#L53) (ligne 53)
  - [app/merchants/business/[id]/page.tsx](app/merchants/business/[id]/page.tsx#L3) (ligne 3)
  - [app/dashboard/[id]/social/page.tsx](app/dashboard/[id]/social/page.tsx#L5) (ligne 5)
- **Functions**: `getReviewsByStoreId`, `respondToReview`
- **Utilisation**: Gestion des avis/reviews

### LIB: lib/actions/sales-analyzer.ts
- **Type**: Service
- **Importé par**:
  - [app/api/dashboard/[storeId]/sales-recommendations/route.ts](app/api/dashboard/[storeId]/sales-recommendations/route.ts#L3) (ligne 3)
- **Functions**: `analyzeSalesDataWithGroq`
- **Utilisation**: Analyse des ventes avec IA

### LIB: lib/actions/search.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/search/page.tsx](app/search/page.tsx#L11) (ligne 11)
  - [app/search/searchService/page.tsx](app/search/searchService/page.tsx#L8) (ligne 8)
  - [app/search/searchProduct/page.tsx](app/search/searchProduct/page.tsx#L8) (ligne 8)
  - [app/api/items/route.ts](app/api/items/route.ts#L4) (ligne 4)
  - [app/api/semantic-search/route.ts](app/api/semantic-search/route.ts#L3) (ligne 3)
  - [app/api/stores/route.ts](app/api/stores/route.ts#L3) (ligne 3)
- **Types**: `SearchResultItem`
- **Functions**: `searchStores`, `searchItems`, `searchServicesDirectory`, `doGlobalSemanticSearch`
- **Utilisation**: Recherche d'items et magasins

### LIB: lib/actions/service_detail.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/merchants/service/[id]/page.tsx](app/merchants/service/[id]/page.tsx#L4) (ligne 4)
- **Functions**: `getServiceById`, `getServiceReviews`, `getRelatedItems`
- **Utilisation**: Détails des services

### LIB: lib/actions/store-follows.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/api/stores/follow/route.ts](app/api/stores/follow/route.ts#L6) (ligne 6)
- **Functions**: (Gestion des abonnements aux magasins)
- **Utilisation**: Suivi des magasins

### LIB: lib/actions/stores.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/dashboard/[id]/layout.tsx](app/dashboard/[id]/layout.tsx#L20) (ligne 20)
  - [app/messages/page.tsx](app/messages/page.tsx#L12) (ligne 12)
  - [app/profile/businessOwner/page.tsx](app/profile/businessOwner/page.tsx#L23) (ligne 23)
  - [app/dashboard/[id]/profile/page.tsx](app/dashboard/[id]/profile/page.tsx#L20) (ligne 20)
  - [app/api/stores/[id]/route.ts](app/api/stores/[id]/route.ts#L2) (ligne 2)
  - [app/api/stores/route.ts](app/api/stores/route.ts#L4) (ligne 4)
- **Functions**: `getUserStores`, `getStoreById`, `getPrimaryStoreForOwner`, `deleteStore`, `transferStoreOwnership`, `updateStoreProfile`, `getStoreByAnyId`
- **Utilisation**: Gestion des magasins

### LIB: lib/actions/stories.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/merchants/business/[id]/page.tsx](app/merchants/business/[id]/page.tsx#L5) (ligne 5)
  - [app/merchants/product/[id]/page.tsx](app/merchants/product/[id]/page.tsx#L5) (ligne 5)
  - [app/merchants/service/[id]/page.tsx](app/merchants/service/[id]/page.tsx#L5) (ligne 5)
  - [app/dashboard/[id]/reels/page.tsx](app/dashboard/[id]/reels/page.tsx#L15) (ligne 15)
  - [app/dashboard/[id]/stories/page.tsx](app/dashboard/[id]/stories/page.tsx#L22) (ligne 22)
  - [app/api/stories/route.ts](app/api/stories/route.ts#L2) (ligne 2)
- **Functions**: `getBusinessStories`, `getDiscoverStories`
- **Utilisation**: Gestion des stories

### LIB: lib/actions/support.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/dashboard/[id]/support/tickets/page.tsx](app/dashboard/[id]/support/tickets/page.tsx#L29) (ligne 29)
- **Functions**: (Gestion du support client)
- **Utilisation**: Support client/tickets

### LIB: lib/actions/transactions.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/merchants/business/[id]/page.tsx](app/merchants/business/[id]/page.tsx#L8) (ligne 8)
  - [app/dashboard/[id]/transactions/page.tsx](app/dashboard/[id]/transactions/page.tsx#L4) (ligne 4)
  - [app/api/admin/orders/[id]/status/route.ts](app/api/admin/orders/[id]/status/route.ts#L5) (ligne 5)
  - [app/api/webhooks/order/refund/route.ts](app/api/webhooks/order/refund/route.ts#L4) (ligne 4)
  - [app/api/admin/orders/validate/route.ts](app/api/admin/orders/validate/route.ts#L5) (ligne 5)
  - [app/api/webhooks/order/confirm/route.ts](app/api/webhooks/order/confirm/route.ts#L4) (ligne 4)
- **Types**: `Transaction`
- **Functions**: `hasCompletedTransactionWithStore`, `getStoreTransactions`, `syncOrderTransaction`
- **Utilisation**: Gestion des transactions

### LIB: lib/actions/user-activity.ts
- **Type**: Service
- **Statut**: Non importé
- **Utilisation**: Suivi de l'activité utilisateur

### LIB: lib/actions/users.ts
- **Type**: Action/Service
- **Importé par**:
  - [app/dashboard/[id]/layout.tsx](app/dashboard/[id]/layout.tsx#L19) (ligne 19)
  - [app/messages/page.tsx](app/messages/page.tsx#L11) (ligne 11)
  - [app/profile/user/page.tsx](app/profile/user/page.tsx#L16) (ligne 16)
  - [app/profile/businessOwner/page.tsx](app/profile/businessOwner/page.tsx#L25) (ligne 25)
  - [app/auth/callback/route.ts](app/auth/callback/route.ts#L2) (ligne 2)
  - [app/api/profile/route.ts](app/api/profile/route.ts#L4) (ligne 4)
- **Functions**: `getUserProfile`, `updateProfile`, `updateAvatar`, `deleteAccount`, `ensureUserExists`
- **Utilisation**: Gestion des utilisateurs

---

## AGENTS - lib/agents/*.ts

### LIB: lib/agents/darija-rag.ts
- **Type**: Service/AI
- **Importé par**:
  - [app/api/ai-agent/route.ts](app/api/ai-agent/route.ts#L4) (ligne 4)
  - [app/api/darija-lookup/route.ts](app/api/darija-lookup/route.ts#L2) (ligne 2)
- **Functions**: `lookupDarija`, `formatDarijaContext`
- **Utilisation**: Recherche RAG pour Darija (reconnaissance vocale/texte)

### LIB: lib/agents/darija-rules.ts
- **Type**: Service/AI
- **Statut**: Non importé
- **Utilisation**: Règles de parsing Darija

### LIB: lib/agents/prompts.ts
- **Type**: Service/AI
- **Importé par**:
  - [app/api/ai-agent/route.ts](app/api/ai-agent/route.ts#L3) (ligne 3)
- **Functions**: `buildRouterPrompt`, `getAgentPrompt`
- **Utilisation**: Prompts pour l'agent IA

---

## AI - lib/ai/*.ts

### LIB: lib/ai/comment-analyzer.ts
- **Type**: Service/AI
- **Statut**: Non importé
- **Utilisation**: Analyse de commentaires avec IA

### LIB: lib/ai/darija-parser.ts
- **Type**: Service/AI
- **Importé par**:
  - [app/api/ai-darija/route.ts](app/api/ai-darija/route.ts#L2) (ligne 2)
- **Functions**: `parseDarijaPrompt`
- **Utilisation**: Parsing de prompts en Darija

### LIB: lib/ai/image-generator.ts
- **Type**: Service/AI
- **Importé par**:
  - [app/api/ai-darija/route.ts](app/api/ai-darija/route.ts#L3) (ligne 3)
- **Functions**: `generateAndUploadImage`
- **Utilisation**: Génération d'images avec IA

---

## CACHE - lib/cache/*.ts

### LIB: lib/cache/redis.ts
- **Type**: Service/Infrastructure
- **Statut**: Non importé
- **Utilisation**: Configuration Redis pour cache

---

## CONTEXT - lib/context/*.tsx

### LIB: lib/context/UploadContext.tsx
- **Type**: React Context
- **Importé par**:
  - [app/dashboard/[id]/layout.tsx](app/dashboard/[id]/layout.tsx#L22) (ligne 22)
  - [app/dashboard/[id]/reels/page.tsx](app/dashboard/[id]/reels/page.tsx#L10) (ligne 10)
- **Hooks/Components**: `UploadProvider`, `useUpload`
- **Utilisation**: Contexte React pour uploads de fichiers

---

## DASHBOARD - lib/dashboard/*.ts

### LIB: lib/dashboard/store-access.ts
- **Type**: Service/Utility
- **Importé par**:
  - [app/dashboard/[id]/layout.tsx](app/dashboard/[id]/layout.tsx#L25) (ligne 25)
  - [app/dashboard/[id]/page.tsx](app/dashboard/[id]/page.tsx#L26) (ligne 26)
- **Functions**: `isStoreDashboardLocked`
- **Utilisation**: Vérification d'accès au dashboard du magasin

---

## MONITORING - lib/monitoring/*.ts

### LIB: lib/monitoring/index.ts
- **Type**: Service/Infrastructure
- **Statut**: Non importé
- **Utilisation**: Monitoring et logging

---

## RANKING - lib/ranking/*.ts

### LIB: lib/ranking/constants.ts
- **Type**: Utility/Constants
- **Statut**: Non importé
- **Utilisation**: Constantes de ranking

### LIB: lib/ranking/event-schema.ts
- **Type**: Utility/Schema
- **Importé par**:
  - [app/api/events/track/route.ts](app/api/events/track/route.ts#L3) (ligne 3)
- **Functions**: `parseTrackEventsBody`
- **Utilisation**: Schéma de validation des événements

### LIB: lib/ranking/feed-cache.ts
- **Type**: Service/Cache
- **Importé par**:
  - [app/api/ranking/feed/route.ts](app/api/ranking/feed/route.ts#L2) (ligne 2)
- **Functions**: `getCachedFeed`, `setCachedFeed`
- **Utilisation**: Cache du feed personnalisé

### LIB: lib/ranking/feed.ts
- **Type**: Service
- **Importé par**:
  - [app/api/events/track/route.ts](app/api/events/track/route.ts#L4) (ligne 4)
  - [app/api/ranking/feed/route.ts](app/api/ranking/feed/route.ts#L3) (ligne 3)
- **Functions**: `updateItemRankingStats`, `generateRankedFeed`
- **Utilisation**: Génération du feed personnalisé

### LIB: lib/ranking/intent-cache.ts
- **Type**: Service/Cache
- **Importé par**:
  - [app/api/events/track/route.ts](app/api/events/track/route.ts#L8) (ligne 8)
- **Functions**: (Gestion du cache d'intentions)
- **Utilisation**: Cache des intentions utilisateur

### LIB: lib/ranking/intent.ts
- **Type**: Service
- **Importé par**:
  - [app/api/events/track/route.ts](app/api/events/track/route.ts#L13) (ligne 13)
  - [app/api/ranking/feed/route.ts](app/api/ranking/feed/route.ts#L4) (ligne 4)
- **Functions**: `getDominantIntent`
- **Utilisation**: Détection de l'intention dominante

### LIB: lib/ranking/scoring.ts
- **Type**: Service/Algorithm
- **Statut**: Non importé
- **Utilisation**: Algorithme de scoring

### LIB: lib/ranking/signals.ts
- **Type**: Service/Algorithm
- **Statut**: Non importé
- **Utilisation**: Signaux de ranking

### LIB: lib/ranking/types.ts
- **Type**: Types/Interfaces
- **Importé par**:
  - [app/test-ranking/page.tsx](app/test-ranking/page.tsx#L7) (ligne 7)
  - [app/api/events/track/route.ts](app/api/events/track/route.ts#L14) (ligne 14)
  - [app/api/ranking/feed/route.ts](app/api/ranking/feed/route.ts#L6) (ligne 6)
- **Types**: `ItemType`, `EventType`, `BehavioralEvent`, `IntentProbabilities`
- **Utilisation**: Types et interfaces de ranking

---

## SEARCH - lib/search/*.ts

### LIB: lib/search/hybrid-search.ts
- **Type**: Service/Algorithm
- **Statut**: Non importé
- **Utilisation**: Recherche hybride (vecteur + texte)

### LIB: lib/search/normalizer.ts
- **Type**: Utility
- **Statut**: Non importé
- **Utilisation**: Normalisation des résultats de recherche

### LIB: lib/search/reranker.ts
- **Type**: Service/Algorithm
- **Statut**: Non importé
- **Utilisation**: Réorganisation des résultats de recherche

### LIB: lib/search/vector-search.ts
- **Type**: Service/Algorithm
- **Statut**: Non importé
- **Utilisation**: Recherche vectorielle/sémantique

---

## STORE - lib/store/*.ts

### LIB: lib/store/use-call-store.ts
- **Type**: React Hook/Zustand
- **Statut**: Non importé
- **Utilisation**: Store Zustand pour appels

### LIB: lib/store/use-cart-store.ts
- **Type**: React Hook/Zustand
- **Statut**: Non importé
- **Utilisation**: Store Zustand pour panier

### LIB: lib/store/use-messaging-store.ts
- **Type**: React Hook/Zustand
- **Statut**: Non importé
- **Utilisation**: Store Zustand pour messaging

### LIB: lib/store/use-saves-store.ts
- **Type**: React Hook/Zustand
- **Statut**: Non importé
- **Utilisation**: Store Zustand pour favoris

---

## SUPABASE - lib/supabase/*.ts

### LIB: lib/supabase/admin.ts
- **Type**: Service/Database
- **Importé par**:
  - [app/api/workers/sync-orders/route.ts](app/api/workers/sync-orders/route.ts#L12) (ligne 12)
  - [app/api/admin/transactions/route.ts](app/api/admin/transactions/route.ts#L3) (ligne 3)
  - [app/api/admin/orders/[id]/status/route.ts](app/api/admin/orders/[id]/status/route.ts#L3) (ligne 3)
  - [app/api/workers/payment-retry/route.ts](app/api/workers/payment-retry/route.ts#L12) (ligne 12)
  - [app/api/webhooks/order/refund/route.ts](app/api/webhooks/order/refund/route.ts#L3) (ligne 3)
  - [app/api/admin/orders/validate/route.ts](app/api/admin/orders/validate/route.ts#L3) (ligne 3)
  - [app/api/webhooks/order/confirm/route.ts](app/api/webhooks/order/confirm/route.ts#L3) (ligne 3)
  - [app/api/events/track/route.ts](app/api/events/track/route.ts#L15) (ligne 15)
  - [app/api/auth/magic-link/route.ts](app/api/auth/magic-link/route.ts#L2) (ligne 2)
- **Functions**: `createAdminClient`
- **Utilisation**: Client Supabase pour opérations admin

### LIB: lib/supabase/auth.ts
- **Type**: Service/Auth
- **Statut**: Non importé directement dans app
- **Utilisation**: Configuration d'authentification Supabase

### LIB: lib/supabase/browser.ts
- **Type**: Service/Client
- **Statut**: Non importé
- **Utilisation**: Client Supabase pour navigateur

### LIB: lib/supabase/client.ts
- **Type**: Service/Client
- **Importé par**:
  - [app/dashboard/[id]/layout.tsx](app/dashboard/[id]/layout.tsx#L18) (ligne 18)
  - [app/merchants/business/add/page.tsx](app/merchants/business/add/page.tsx#L12) (ligne 12)
  - [app/valider/page.tsx](app/valider/page.tsx#L5) (ligne 5)
  - [app/api/promotions/route.ts](app/api/promotions/route.ts#L1) (ligne 1)
  - [app/api/profile/route.ts](app/api/profile/route.ts#L1) (ligne 1)
  - [app/api/notifications/route.ts](app/api/notifications/route.ts#L1) (ligne 1)
  - [app/api/orders/route.ts](app/api/orders/route.ts#L1) (ligne 1)
  - [app/api/places/search/route.ts](app/api/places/search/route.ts#L3) (ligne 3)
  - [app/api/auth/session/route.ts](app/api/auth/session/route.ts#L2) (ligne 2)
  - [app/api/suggestions/route.ts](app/api/suggestions/route.ts#L3) (ligne 3)
  - [app/api/geo/nearby/route.ts](app/api/geo/nearby/route.ts#L2) (ligne 2)
  - [app/api/reels/route.ts](app/api/reels/route.ts#L1) (ligne 1)
  - [app/api/reservations/route.ts](app/api/reservations/route.ts#L1) (ligne 1)
  - [app/api/geo/autocomplete/route.ts](app/api/geo/autocomplete/route.ts#L2) (ligne 2)
  - [app/api/friendships/route.ts](app/api/friendships/route.ts#L10) (ligne 10)
  - [app/api/items/route.ts](app/api/items/route.ts#L1) (ligne 1)
  - [app/api/stores/follow/route.ts](app/api/stores/follow/route.ts#L7) (ligne 7)
  - [app/api/stores/route.ts](app/api/stores/route.ts#L1) (ligne 1)
  - [app/api/auth/signup/route.ts](app/api/auth/signup/route.ts#L2) (ligne 2)
  - [app/api/auth/login/route.ts](app/api/auth/login/route.ts#L2) (ligne 2)
  - [app/api/auth/logout/route.ts](app/api/auth/logout/route.ts#L2) (ligne 2)
- **Functions**: `createClient`
- **Utilisation**: Client Supabase pour browser/client-side

### LIB: lib/supabase/database.ts
- **Type**: Service/Database
- **Statut**: Non importé directement
- **Utilisation**: Configuration de base de données

### LIB: lib/supabase/middleware.ts
- **Type**: Service/Middleware
- **Statut**: Non importé
- **Utilisation**: Middleware d'authentification

### LIB: lib/supabase/realtime.ts
- **Type**: Service/Realtime
- **Statut**: Non importé
- **Utilisation**: Gestion des connexions realtime

### LIB: lib/supabase/server.ts
- **Type**: Service/Client
- **Importé par**:
  - [app/merchants/business/[id]/page.tsx](app/merchants/business/[id]/page.tsx#L9) (ligne 9)
  - [app/auth/callback/route.ts](app/auth/callback/route.ts#L1) (ligne 1)
  - [app/api/auth/verify/route.ts](app/api/auth/verify/route.ts#L2) (ligne 2)
  - [app/api/orders/bulk/route.ts](app/api/orders/bulk/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/sales-recommendations/route.ts](app/api/dashboard/[storeId]/sales-recommendations/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/stats/route.ts](app/api/dashboard/[storeId]/stats/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/support/route.ts](app/api/dashboard/[storeId]/support/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/reels/route.ts](app/api/dashboard/[storeId]/reels/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/promotions/route.ts](app/api/dashboard/[storeId]/promotions/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/products/route.ts](app/api/dashboard/[storeId]/products/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/intelligence/route.ts](app/api/dashboard/[storeId]/intelligence/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/profile/route.ts](app/api/dashboard/[storeId]/profile/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/refunds/route.ts](app/api/dashboard/[storeId]/refunds/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/messages/route.ts](app/api/dashboard/[storeId]/messages/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/leads/route.ts](app/api/dashboard/[storeId]/leads/route.ts#L1) (ligne 1)
  - [app/api/dashboard/[storeId]/transactions/route.ts](app/api/dashboard/[storeId]/transactions/route.ts#L1) (ligne 1)
- **Functions**: `createClient`
- **Utilisation**: Client Supabase pour server-side

### LIB: lib/supabase/storage-diagnostics.ts
- **Type**: Service/Debug
- **Statut**: Non importé
- **Utilisation**: Diagnostics du stockage Supabase

### LIB: lib/supabase/storage.ts
- **Type**: Service/Storage
- **Importé par**:
  - [app/dashboard/[id]/profile/page.tsx](app/dashboard/[id]/profile/page.tsx#L21) (ligne 21)
- **Functions**: `uploadFile`
- **Utilisation**: Gestion du stockage Supabase

---

## TRACKING - lib/tracking/*.ts

### LIB: lib/tracking/eventTypes.ts
- **Type**: Types/Constants
- **Statut**: Non importé
- **Utilisation**: Types d'événements de tracking

### LIB: lib/tracking/trackEvent.ts
- **Type**: Service/Tracking
- **Statut**: Non importé
- **Utilisation**: Fonction de tracking d'événements

---

## UTILS - lib/utils/*.ts

### LIB: lib/utils/avatar.ts
- **Type**: Utility
- **Importé par**:
  - [app/dashboard/[id]/layout.tsx](app/dashboard/[id]/layout.tsx#L24) (ligne 24)
- **Functions**: `getAvatarUrl`
- **Utilisation**: Génération d'URL d'avatar

### LIB: lib/utils/qr-code.ts
- **Type**: Utility
- **Statut**: Non importé
- **Utilisation**: Génération de codes QR

---

## ROOT LIB FILES

### LIB: lib/utils.ts
- **Type**: Utility/Helper
- **Importé par**:
  - [app/dashboard/[id]/intelligence/page.tsx](app/dashboard/[id]/intelligence/page.tsx#L56) (ligne 56)
  - [app/dashboard/[id]/layout.tsx](app/dashboard/[id]/layout.tsx#L14) (ligne 14)
  - [app/dashboard/[id]/reels/page.tsx](app/dashboard/[id]/reels/page.tsx#L51) (ligne 51)
  - [app/dashboard/[id]/support/tickets/page.tsx](app/dashboard/[id]/support/tickets/page.tsx#L6) (ligne 6)
  - [app/dashboard/[id]/page.tsx](app/dashboard/[id]/page.tsx#L27) (ligne 27)
- **Utilisation**: Utilitaires généraux du projet

### LIB: lib/admin-auth.ts
- **Type**: Service/Authentication
- **Statut**: À vérifier
- **Utilisation**: Authentification admin

### LIB: lib/cloudinary.ts
- **Type**: Service/Storage
- **Statut**: À vérifier
- **Utilisation**: Intégration Cloudinary pour images/vidéos

### LIB: lib/openrouter-embeddings.ts
- **Type**: Service/IA
- **Statut**: À vérifier
- **Utilisation**: Embeddings via OpenRouter

### LIB: lib/rate-limit.ts
- **Type**: Middleware/Utility
- **Statut**: À vérifier
- **Utilisation**: Rate limiting pour API

### LIB: lib/session-utils.ts
- **Type**: Utility/Session
- **Statut**: À vérifier
- **Utilisation**: Utilitaires de gestion de session

### LIB: lib/storage.ts
- **Type**: Service/Storage
- **Statut**: À vérifier
- **Utilisation**: Gestion du stockage

### LIB: lib/suggestions.ts
- **Type**: Service
- **Statut**: À vérifier
- **Utilisation**: Génération de suggestions

### LIB: lib/upload.ts
- **Type**: Service/Upload
- **Statut**: À vérifier
- **Utilisation**: Gestion des uploads de fichiers

### LIB: lib/darija-dictionary.ts
- **Type**: Data/Dictionary
- **Statut**: À vérifier
- **Utilisation**: Dictionnaire Darija pour NLP

### LIB: lib/darija-corpus-*.json
- **Type**: Data/Corpus
- **Statut**: À vérifier
- **Utilisation**: Corpus Darija pour ML

---

## RÉSUMÉ FINAL

### Statistiques Mises à Jour
- **Fichiers LIB racine**: 17 fichiers
- **Fichiers LIB dans sous-dossiers**: ~81 fichiers
- **Total LIB**: ~98 fichiers
- **Fichiers APP**: 106 fichiers
- **Total imports LIB dans APP**: 192+ imports

### Fichiers LIB Non Utilisés (Non importés)
Les fichiers suivants ne sont pas importés directement dans les fichiers APP:
1. `lib/actions/account_subscription.ts`
2. `lib/actions/ai-notifications.ts`
3. `lib/actions/debug-schema.ts`
4. `lib/actions/fraud-detection.ts`
5. `lib/actions/groq-service.ts`
6. `lib/actions/openrouter-service.ts`
7. `lib/actions/recommendations.ts` (seulement par un endpoint API)
8. `lib/hooks/useAdvancedSearch.ts`
9. `lib/hooks/useDarija.ts`
10. `lib/supabase/auth.ts`
11. `lib/supabase/realtime.ts`
12. `lib/supabase/storage-diagnostics.ts`
13. `lib/tracking/eventTypes.ts`
14. `lib/tracking/trackEvent.ts`
15. `lib/utils/qr-code.ts`

### Points à Investiguer
- `lib/admin-auth.ts` - Utilisation?
- `lib/cloudinary.ts` - Utilisation?
- `lib/openrouter-embeddings.ts` - Utilisation?
- `lib/rate-limit.ts` - Utilisation?
- `lib/session-utils.ts` - Utilisation?
- `lib/storage.ts` - Utilisation?
- `lib/suggestions.ts` - Utilisation?
- `lib/upload.ts` - Utilisation?

---

## FLUX D'IMPORTATION PRINCIPAUX

### 1. **Flux API Routes** (app/api/*)
- Importent massivement les services de `lib/actions/`
- Serveurs de données pour le frontend
- Exemples: orders, reservations, items, stores, etc.

### 2. **Flux Dashboard** (app/dashboard/*)
- Import de multiples utilitaires et services
- Gestion des données utilisateur et store
- Visualisation et statistiques

### 3. **Flux Authentication** (app/auth/*)
- Importent `lib/actions/auth.ts`
- Gestion des sessions utilisateur

### 4. **Flux Public** (app/public/*)
- Importent les services de profil et recherche
- Accessible sans authentification

---

## CONCLUSION

L'architecture montre une **séparation claire** entre:
- **lib/**: Code métier et services (actions, hooks, utilitaires)
- **app/**: Interface utilisateur et endpoints API
- **La majorité des imports provient des API routes** qui servent de middleware entre frontend et services

La structure est bien organisée mais certains fichiers LIB restent inutilisés et pourraient être:
1. Supprimés s'ils ne sont plus nécessaires
2. Ou utilisés via le backend directement (non via app)
3. Ou en phase de dépréciation
  - [app/public/user/[id]/page.tsx](app/public/user/[id]/page.tsx#L149) (ligne 149)
  - [app/profile/businessOwner/page.tsx](app/profile/businessOwner/page.tsx#L17) (ligne 17)
- **Functions**: `cn` (classname helper)
- **Utilisation**: Utilitaires généraux (ex: cn pour TailwindCSS)

### LIB: lib/upload.ts
- **Type**: Service/Upload
- **Statut**: Non importé
- **Utilisation**: Gestion des uploads

### LIB: lib/darija-dictionary.ts
- **Type**: Data/Dictionary
- **Importé par**:
  - [app/api/darija-lookup/route.ts](app/api/darija-lookup/route.ts#L3) (ligne 3)
- **Constants**: `DARIJA_TUNISIAN_DICTIONARY`
- **Utilisation**: Dictionnaire Darija tunisien

### LIB: lib/cloudinary.ts
- **Type**: Service/Storage
- **Importé par**:
  - [app/dashboard/[id]/products/page.tsx](app/dashboard/[id]/products/page.tsx#L14) (ligne 14)
- **Functions**: `uploadToCloudinary`, `uploadMultipleToCloudinary`
- **Utilisation**: Téléchargement d'images sur Cloudinary

### LIB: lib/session-utils.ts
- **Type**: Utility/Session
- **Statut**: Non importé
- **Utilisation**: Utilitaires de session

### LIB: lib/storage.ts
- **Type**: Service/Storage
- **Statut**: Non importé
- **Utilisation**: Gestion du stockage

### LIB: lib/rate-limit.ts
- **Type**: Middleware/Service
- **Statut**: Non importé
- **Utilisation**: Limitation de débit

### LIB: lib/suggestions.ts
- **Type**: Service/Recommendations
- **Importé par**:
  - [app/messages/suggestions/page.tsx](app/messages/suggestions/page.tsx#L1) (ligne 1)
  - [app/api/suggestions/route.ts](app/api/suggestions/route.ts#L2) (ligne 2)
- **Functions**: `getFriendSuggestions`
- **Utilisation**: Suggestions d'amis

### LIB: lib/openrouter-embeddings.ts
- **Type**: Service/AI
- **Importé par**:
  - [app/api/stores/route.ts](app/api/stores/route.ts#L5) (ligne 5)
- **Functions**: `generateEmbedding`
- **Utilisation**: Génération d'embeddings avec OpenRouter

### LIB: lib/admin-auth.ts
- **Type**: Service/Auth
- **Importé par**:
  - [app/api/admin/transactions/route.ts](app/api/admin/transactions/route.ts#L4) (ligne 4)
  - [app/api/admin/orders/[id]/status/route.ts](app/api/admin/orders/[id]/status/route.ts#L4) (ligne 4)
  - [app/api/admin/stats/route.ts](app/api/admin/stats/route.ts#L3) (ligne 3)
  - [app/api/admin/orders/validate/route.ts](app/api/admin/orders/validate/route.ts#L4) (ligne 4)
  - [app/api/admin/orders/export/route.ts](app/api/admin/orders/export/route.ts#L4) (ligne 4)
- **Functions**: `checkAdminAuth`
- **Utilisation**: Vérification de l'authentification admin

### LIB: lib/darija-dictionary.test.ts
- **Type**: Test
- **Statut**: Non importé
- **Utilisation**: Tests du dictionnaire Darija

---

## JSON FILES

### LIB: lib/darija-corpus-1.json
- **Type**: Data/Corpus
- **Statut**: Non importé
- **Utilisation**: Corpus d'entraînement Darija

### LIB: lib/darija-corpus-2.json
- **Type**: Data/Corpus
- **Statut**: Non importé
- **Utilisation**: Corpus d'entraînement Darija

### LIB: lib/darija-corpus-3.json
- **Type**: Data/Corpus
- **Statut**: Non importé
- **Utilisation**: Corpus d'entraînement Darija

### LIB: lib/darija-corpus-4.json
- **Type**: Data/Corpus
- **Statut**: Non importé
- **Utilisation**: Corpus d'entraînement Darija

### LIB: lib/agents/darija-sample.json
- **Type**: Data/Sample
- **Statut**: Non importé
- **Utilisation**: Exemples Darija

---

## RÉSUMÉ DES DÉPENDANCES

### Files LIB les plus importés dans APP:
1. **lib/supabase/client.ts** - 21 imports (client-side database)
2. **lib/supabase/server.ts** - 15 imports (server-side database)
3. **lib/actions/users.ts** - 6 imports (gestion utilisateurs)
4. **lib/actions/orders.ts** - 5 imports (gestion commandes)
5. **lib/actions/stories.ts** - 6 imports (gestion stories)
6. **lib/actions/stores.ts** - 6 imports (gestion magasins)

### Fichiers LIB NON importés:
- lib/cache/redis.ts
- lib/store/*.ts (4 fichiers)
- lib/search/*.ts (4 fichiers)
- lib/ranking/scoring.ts
- lib/ranking/signals.ts
- lib/ai/comment-analyzer.ts
- lib/agents/darija-rules.ts
- lib/actions/user-activity.ts
- lib/actions/fraud-detection.ts
- lib/actions/groq-service.ts
- lib/actions/openrouter-service.ts
- Et autres 10+ fichiers

### Catégories principales:
- **Actions** (39 fichiers) : Opérations CRUD et métier
- **Supabase** (10 fichiers) : Base de données et authentification
- **Agents/AI** (6 fichiers) : Services d'IA et NLP
- **Ranking/Search** (13 fichiers) : Moteurs de recherche et recommandation
- **Store** (4 fichiers) : Gestion d'état Zustand
- **Utils** (9 fichiers) : Fonctions utilitaires
