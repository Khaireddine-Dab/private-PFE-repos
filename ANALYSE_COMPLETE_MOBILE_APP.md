# ANALYSE COMPLÈTE - RO2YA MOBILE APP (React Native + Expo)

**Date**: Décembre 2024  
**Version**: 1.0  
**Framework**: React Native (Expo 54) avec Expo Router  
**Plateformes**: iOS + Android  
**Langage**: TypeScript

---

## TABLE DES MATIÈRES

1. [Vue d'ensemble technique](#vue-densemble-technique)
2. [Architecture globale](#architecture-globale)
3. [Structure du projet](#structure-du-projet)
4. [Système d'authentification](#système-dauthentification)
5. [API Client et intercepteurs](#api-client-et-intercepteurs)
6. [Documentation complète des fichiers lib/](#documentation-complète-des-fichiers-lib)
7. [Structure des écrans (app/)](#structure-des-écrans-app)
8. [Gestion d'état (Context API + Zustand)](#gestion-détat-context-api--zustand)
9. [Composants principaux](#composants-principaux)
10. [Flux de données](#flux-de-données)
11. [Relation avec l'application web](#relation-avec-lapplication-web)
12. [Points techniques importants](#points-techniques-importants)
13. [Prochaines étapes d'optimisation](#prochaines-étapes-doptimisation)

---

## VUE D'ENSEMBLE TECHNIQUE

### Stack technologique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Runtime** | React Native | via Expo |
| **Framework** | Expo | 54.0.34 |
| **Router** | Expo Router | 6.0.23 |
| **Build** | EAS (Expo Application Services) | Latest |
| **Langage** | TypeScript | Latest |
| **État (API)** | Axios + Intercepteurs | 1.15.2 |
| **Auth** | Supabase Auth (JWT) | 2.104.0 |
| **Base de données** | Supabase + PostgreSQL | - |
| **Notifications** | Expo Notifications | 0.32.17 |
| **Maps** | Mapbox GL + Rnmapbox | 10.3.0 |
| **Caméra** | Expo Camera | 17.0.10 |
| **Image** | Expo Image | 3.0.11 |
| **Localisation** | Expo Location | 19.0.8 |
| **Animation** | React Native Reanimated | Latest |
| **UI Components** | Expo Vector Icons | 15.1.1 |
| **État (Client)** | Context API + Zustand (inféré) | - |

### Points clés d'architecture

- **Backend API**: URL configurée via `EXPO_PUBLIC_API_URL` (par défaut: `https://ro2ya-marketplace-platforme.vercel.app`)
- **Authentification**: Supabase JWT injectée automatiquement dans tous les appels API via intercepteurs
- **Navigation**: Expo Router avec routes fichier-système (File-based routing)
- **Compilation**: Produit APK/IPA via EAS pour iOS et Android
- **Type Safety**: TypeScript strict sur tout le projet

---

## ARCHITECTURE GLOBALE

```
┌─────────────────────────────────────────────┐
│        MOBILE APP (React Native/Expo)       │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │ UI Layer (app/ screens + components) │   │
│  └────────────┬─────────────────────────┘   │
│               │                             │
│  ┌────────────▼─────────────────────────┐   │
│  │ State Management (Context + Zustand) │   │
│  └────────────┬─────────────────────────┘   │
│               │                             │
│  ┌────────────▼─────────────────────────┐   │
│  │   API Layer (lib/api.ts + Axios)     │   │
│  │  + Interceptors (JWT injection)      │   │
│  └────────────┬─────────────────────────┘   │
│               │                             │
│  ┌────────────▼─────────────────────────┐   │
│  │   Service Modules (lib/*.ts files)   │   │
│  │  - auth, items, orders, chat, etc    │   │
│  └────────────┬─────────────────────────┘   │
└───────────────┼──────────────────────────────┘
                │
                ▼
    ┌──────────────────────────────┐
    │  Next.js SaaS API Backend    │
    │  (Django REST + Supabase)    │
    │  https://ro2ya-marketplace.. │
    └──────────────────────────────┘
                │
                ▼
    ┌──────────────────────────────┐
    │  Supabase (PostgreSQL + Auth)│
    │  - Tables: stores, items, etc│
    │  - Auth: JWT tokens          │
    └──────────────────────────────┘
```

---

## STRUCTURE DU PROJET

```
ro2ya-mobile-app/
├── app/                              # Expo Router app directory
│   ├── (auth)/                       # Auth group (login, signup, etc.)
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── reset-password.tsx
│   ├── (tabs)/                       # Main tab navigation
│   │   ├── _layout.tsx               # Tab navigator layout
│   │   ├── index.tsx                 # Home/Feed screen
│   │   ├── discover.tsx              # Discover/Browse screen
│   │   ├── create.tsx                # Create/Sell screen
│   │   ├── messages.tsx              # Messages/Chat screen
│   │   └── profile.tsx               # Profile screen
│   ├── business/                     # Business owner features
│   │   ├── index.tsx
│   │   ├── [id].tsx                  # Business detail
│   │   └── settings.tsx
│   ├── dashboard/                    # Vendor dashboard
│   │   ├── index.tsx
│   │   ├── products.tsx
│   │   ├── orders.tsx
│   │   ├── analytics.tsx
│   │   └── settings.tsx
│   ├── search.tsx                    # Global search
│   ├── product/                      # Product detail
│   │   └── [id].tsx
│   ├── service/                      # Service booking
│   │   └── [id].tsx
│   ├── cart.tsx                      # Shopping cart
│   ├── chat/                         # Chat screens
│   │   ├── index.tsx
│   │   └── [id].tsx
│   ├── notifications.tsx             # Notifications screen
│   ├── settings.tsx                  # App settings
│   ├── user/                         # User profile pages
│   │   ├── index.tsx
│   │   └── [id].tsx
│   └── _layout.tsx                   # Root layout
│
├── lib/                              # Service/API client modules
│   ├── api.ts                        # Axios base client with interceptors
│   ├── supabase.ts                   # Supabase client initialization
│   ├── auth.ts                       # Authentication (signUp, signIn, signOut)
│   ├── items.ts                      # Items/Products API
│   ├── stores.ts                     # Stores/Merchants API
│   ├── orders.ts                     # Orders API
│   ├── chat.ts                       # Chat/Messages API
│   ├── profile.ts                    # User profile API
│   ├── dashboard.ts                  # Vendor dashboard API
│   ├── notifications.ts              # Notifications API
│   ├── promotions.ts                 # Promotions/Offers API
│   ├── reels.ts                      # Reels/Videos API
│   ├── reservations.ts               # Bookings/Reservations API
│   ├── geo.ts                        # Geolocation utilities
│   ├── imageSearch.ts                # Image search API
│   ├── ai.ts                         # AI features (image gen, sentiment, etc.)
│   ├── aiAgent.ts                    # AI agents API
│   ├── analytics.ts                  # Analytics/tracking
│   ├── upload.ts                     # File/image upload
│   ├── utils.ts                      # Helper functions
│   ├── session.ts                    # Session management
│   ├── friendships.ts                # Friendships/Follows API
│   ├── comments.ts                   # Comments API
│   ├── stories.ts                    # Stories API
│   ├── oauth.ts                      # OAuth providers
│   └── types/                        # TypeScript type definitions
│
├── context/                          # Context API providers
│   ├── AuthContext.tsx               # Authentication state
│   ├── ProfileContext.tsx            # User profile state
│   ├── NotificationsContext.tsx      # Notifications state
│   └── ToastContext.tsx              # Toast messages state
│
├── store/                            # Zustand/additional state management
│   ├── cartStore.ts                  # Shopping cart state
│   ├── chatStore.ts                  # Chat/messages state
│   └── storiesStore.ts               # Stories state
│
├── components/                       # React components (correctly spelled)
│   ├── home/
│   │   ├── FeedSection.tsx
│   │   ├── NearbyStoresSection.tsx
│   │   ├── PromotionsCarousel.tsx
│   │   └── ...
│   ├── cards/
│   ├── buttons/
│   ├── forms/
│   └── ...
│
├── compnents/                        # Components (TYPO - should be merged with components/)
│   ├── home/
│   ├── navigation/
│   └── ...
│
├── constants/                        # App constants
│   ├── colors.ts
│   ├── sizes.ts
│   └── text.ts
│
├── assets/                           # Images, fonts, etc.
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── android/                          # Native Android code
├── ios/                              # Native iOS code (Expo managed)
│
├── eas.json                          # EAS build configuration
├── app.json                          # Expo app configuration
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies
└── README.md                         # Project documentation
```

### ⚠️ Problème identifié: Double dossier `components/`
- Il existe deux dossiers: `components/` (correct) et `compnents/` (typo)
- Actuellement, les imports utilisent `compnents/` (voir index.tsx)
- **Action recommandée**: Fusionner les deux et corriger tous les imports

---

## SYSTÈME D'AUTHENTIFICATION

### Flux d'authentification

```
┌──────────────────────────────────────────────────────────────────┐
│                    SIGNUP / LOGIN FLOW                           │
└──────────────────────────────────────────────────────────────────┘

1. User enters credentials (email + password)
   │
   ▼
2. App calls lib/auth.ts → signUp() or signIn()
   │
   ▼
3. Supabase Auth processes credentials
   │
   ├─ Success: Returns Session with JWT access_token
   │           Stores user ID + full_name
   │           Returns { user, session, error }
   │
   └─ Error: Returns { user: null, error: message }
   │
   ▼
4. Frontend stores session in memory/Context
   │
5. On API calls, lib/api.ts interceptor extracts JWT:
   │
   └─ Axios interceptor → await supabase.auth.getSession()
      └─ If token exists → Inject into Authorization header
         Header: "Authorization: Bearer <JWT_TOKEN>"
   │
   ▼
6. Backend validates JWT in Django
   │
   ├─ Valid → Process request, return 200
   │
   └─ Invalid → Return 401 Unauthorized
      └─ Interceptor can trigger token refresh

7. On Sign Out:
   ├─ Unregister push token
   ├─ Clear Supabase session
   ├─ Clear Context state
   └─ Redirect to login screen
```

### Fichiers d'authentification

**lib/auth.ts** (97 lignes) - Supabase Authentication
```typescript
- signUp(email, password, fullName?): Promise<{user, error}>
  └─ Endpoint: Supabase Auth
- signIn(email, password): Promise<{session, error}>
  └─ Endpoint: Supabase Auth
- signOut(): Promise<{error}>
  └─ Unregister push token, clear session
- refreshSession(): Promise<{session, error}>
  └─ Refresh JWT token if expired
- updatePassword(oldPassword, newPassword)
  └─ Endpoint: Supabase Auth
- resetPassword(email)
  └─ Endpoint: Supabase Auth (password reset email)
```

**context/AuthContext.tsx** - Authentication State Management
```typescript
- Provides: user, session, loading, error
- Methods: login(), logout(), signup(), refreshToken()
- Uses: Supabase Auth directly
```

---

## API CLIENT ET INTERCEPTEURS

### lib/api.ts (Configuration Axios)

**Vue d'ensemble**:
```typescript
import axios from 'axios';
import { supabase } from './supabase';

// Base URL from environment variable
export const API_URL = process.env.EXPO_PUBLIC_API_URL 
  || 'https://ro2ya-marketplace-platforme.vercel.app';

// Axios instance
export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});
```

### Intercepteurs de requête

**Request Interceptor** (Injection JWT):
```typescript
api.interceptors.request.use(async (config) => {
  // 1. Get current session from Supabase
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Session error:', error);
  }
  
  // 2. If JWT exists, inject into Authorization header
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
}, (error) => Promise.reject(error));
```

**Résumé des étapes**:
1. Chaque appel API déclenche cet intercepteur
2. Récupère le JWT actuel de Supabase Auth
3. Ajoute `Authorization: Bearer <JWT>` au header
4. Backend valide le JWT avant de traiter la requête
5. Si JWT expiré (401), l'app peut déclencher une actualisation

**Points importants**:
- JWT automatiquement injecté dans TOUS les appels
- Pas besoin de passer le token manuellement
- Réduction du code boilerplate
- Gestion centralisée des erreurs de session

---

## DOCUMENTATION COMPLÈTE DES FICHIERS LIB/

### 1. **lib/items.ts** - Gestion des produits/articles

**Endpoints appelés**:
- `GET /api/items` - Lister les produits
- `GET /api/items/{id}` - Détail d'un produit
- `POST /api/items` - Créer/modifier un produit

**Types**:
```typescript
interface ProductItem {
  id: string;
  name: string;
  price: string;
  store: string;
  city: string;
  tag?: string;
  imageUri?: string;
  emoji?: string;
  isFeatured?: boolean;
  isWishlisted?: boolean;
  description?: string;
  category?: string;
}

interface ProductDetailResponse {
  item: any;
  reviews: any[];
  relatedItems: any[];
}
```

**Fonctions**:
```typescript
fetchItems(params?: {
  q?: string;              // Search query
  category?: string;
  storeId?: string|number;
  limit?: number;
}) → Promise<ProductItem[]>

fetchItemDetail(id: string) → Promise<ProductDetailResponse>

upsertItem(itemData: any) → Promise<{data, message}>
```

**Mapping données**:
```typescript
Backend item → UI ProductItem:
- item.id → id (convert to string)
- item.name → name
- item.price + currency → price
- item.stores.name → store
- item.stores.city → city
- item.main_image → imageUri
- item.is_featured → isFeatured
- item.description → description
- item.category → category
```

---

### 2. **lib/stores.ts** - Gestion des magasins/commerçants

**Endpoints appelés**:
- `GET /api/stores` - Lister les magasins par localisation
- `GET /api/stores/me` - Mes magasins (commerçant)
- `GET /api/stores/{storeId}` - Détail d'un magasin

**Types**:
```typescript
interface NearbyMerchant {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  thumbnailUri?: string;
  emoji?: string;
  isOpen?: boolean;
}
```

**Fonctions**:
```typescript
fetchStores(location?: string = 'Tunis') → Promise<NearbyMerchant[]>
  └─ Paramètre: location (ville)
  └─ Retourne: Stores triés par distance

fetchMyStores() → Promise<any[]>
  └─ Auth requise
  └─ Retourne: Magasins de l'utilisateur connecté

fetchStoreById(storeId: number|string) → Promise<any|null>
  └─ Gère les IDs factices (b1, b2, b3) pour démo
  └─ Appelle backend pour les IDs réels
```

**Mapping données**:
```typescript
Backend store → UI NearbyMerchant:
- store.id → id
- store.name → name
- store.category → category
- store.rating_average → rating
- store.review_count → reviewCount
- store.distance → distanceKm
- store.logo_url → thumbnailUri
- store.emoji → emoji
- store.is_open → isOpen
```

**Données IDs de démo**:
```typescript
'b1' → "Zitouna Time"
'b2' → "Cloud Nine"
'b3' → "Street Beats"
```

---

### 3. **lib/orders.ts** - Gestion des commandes

**Endpoints appelés**:
- `POST /api/orders` - Créer une commande
- `GET /api/orders` - Lister mes commandes
- `POST /api/orders/bulk` - Créer plusieurs commandes
- `GET /api/orders?storeId={id}` - Commandes du vendeur

**Types**:
```typescript
interface OrderData {
  store_id: number;
  item_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address: string;
  customer_notes?: string;
  item_snapshot?: any;
}
```

**Fonctions**:
```typescript
createOrder(orderData: OrderData) 
  → Promise<{data: Order}>

getUserOrders() 
  → Promise<Order[]>

createBulkOrders(items: any[], customerInfo: any)
  → Promise<{data: Order[]}>
  └─ Crée plusieurs commandes à la fois

getStoreOrders(storeId: number)
  → Promise<Order[]>
  └─ Pour le dashboard vendeur
```

**Flux de commande**:
```
1. Customer sélectionne items dans le panier
2. App appelle createBulkOrders() avec items + infos client
3. Backend crée une Order pour chaque item
4. Backend envoie confirmation email
5. Vendeur reçoit notification de nouvelle commande
6. Vendeur peut voir dans dashboard → orders
```

---

### 4. **lib/chat.ts** - Messagerie en temps réel

**Endpoints appelés**:
- `GET /api/dashboard/{storeId}/messages` - Messages du magasin
- Supabase Realtime (subscribe to messages table)

**Types**:
```typescript
interface ChatMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  type: string;           // 'text', 'image', 'file', etc.
  is_read: boolean;
  created_at: string;
  metadata?: any;
  sender?: { id, full_name, avatar_url };
  receiver?: { id, full_name, avatar_url };
}

interface Conversation {
  id: string;             // partner ID
  partner_name: string;
  partner_avatar: string;
  last_message: string;
  last_message_at: string;
  unread: boolean;
  messages: ChatMessage[];
}
```

**Fonctions**:
```typescript
fetchConversations(storeId?: number) 
  → Promise<Conversation[]>
  └─ Si storeId: /api/dashboard/{storeId}/messages
  └─ Sinon: Fetch depuis Supabase

fetchMessages(conversationId: string)
  → Promise<ChatMessage[]>
  └─ Supabase realtime (subscription)

sendMessage(receiverId: string, content: string, type?: string)
  → Promise<ChatMessage>
  └─ Sauvegarde dans Supabase
  └─ Déclenche realtime push

subscribeToMessages(conversationId: string, callback)
  → Subscription
  └─ Supabase realtime listener
  └─ Appelle callback à chaque nouveau message

markAsRead(messageId: string)
  → Promise<void>
  └─ Met à jour is_read dans DB
```

**Architecture Supabase**:
```
messages table:
├─ id (uuid)
├─ sender_id (uuid, FK users)
├─ receiver_id (uuid, FK users)
├─ content (text)
├─ type (varchar)
├─ is_read (boolean)
├─ created_at (timestamp)
├─ metadata (jsonb, optional)
└─ Indexes: sender_id, receiver_id, is_read
```

---

### 5. **lib/profile.ts** - Profil utilisateur

**Endpoints appelés**:
- `GET /api/profile` - Récupérer mon profil
- `PATCH /api/profile` - Mettre à jour profil
- `PATCH /api/profile/avatar` - Upload avatar

**Types**:
```typescript
interface ApiProfileUser {
  id: string;
  email: string;
  avatar: string | null;
  profile: {
    full_name: string | null;
    avatar_url: string | null;
    city: string | null;
    bio: string | null;
    phone: string | null;
    role: string | null; // CLIENT, PRO, ADMIN
  } | null;
  ownedStoreId?: number | null;
  owned_store_id?: number | null;
  ownedStoreStatus?: string | null;
  owned_store_status?: string | null;
  ownedStores?: { id, name, logo_url, status }[];
  owned_stores?: { id, name, logo_url, status }[];
}

interface ApiProfileStats {
  reviewsCount: number;
  bookingsCount: number;
  ordersCount: number;
  savedCount: number;
  followingCount: number;
  friendsCount: number;
}
```

**Fonctions**:
```typescript
getProfile() → Promise<{user: ApiProfileUser, stats: ApiProfileStats}>

updateProfile(data: Partial<ApiProfileUser['profile']>)
  → Promise<{user: ApiProfileUser}>

uploadAvatar(file: File) → Promise<{url: string}>

getProfileStats() → Promise<ApiProfileStats>
```

**Rôles utilisateur**:
```typescript
'CLIENT'       - Acheteur régulier
'PRO'          - Vendeur/Commerçant
'BUSINESS_OWNER' - Propriétaire d'entreprise
'ADMIN'        - Administrateur plateforme
```

---

### 6. **lib/dashboard.ts** - Dashboard vendeur

**Endpoints appelés**:
- `GET /api/dashboard/{storeId}/stats` - Statistiques
- `GET /api/dashboard/{storeId}/products` - Produits
- `GET /api/dashboard/{storeId}/orders` - Commandes
- `GET /api/dashboard/{storeId}/reservations` - Réservations
- `GET /api/dashboard/{storeId}/leads` - Leads
- `GET /api/dashboard/{storeId}/promotions` - Promotions
- `GET /api/dashboard/{storeId}/messages` - Messages
- `GET /api/support/tickets?store_id={id}` - Support tickets

**Types**:
```typescript
interface DashboardStats {
  totalProducts: number;
  totalActions: number;    // Clicks, inquiries, etc.
  totalRevenue: number;    // In currency
  profileViews: number;
  phoneClicks: number;
  directionRequests: number;
}
```

**Fonctions**:
```typescript
fetchDashboardStats(storeId: number|string) 
  → Promise<DashboardStats>

fetchDashboardProducts(storeId: number|string)
  → Promise<any[]>

fetchDashboardOrders(storeId: number|string)
  → Promise<Order[]>

fetchDashboardReservations(storeId: number|string)
  → Promise<Reservation[]>

fetchDashboardLeads(storeId: number|string)
  → Promise<Lead[]>

fetchDashboardPromotions(storeId: number|string)
  → Promise<Promotion[]>

fetchDashboardTickets(storeId: number|string)
  → Promise<SupportTicket[]>

createSupportTicket(payload: {
  store_id: number;
  title: string;
  description: string;
  priority?: string;
}) → Promise<SupportTicket>
```

**Cas d'usage**:
```
Vendeur ouvre app → Dashboard screen
  ├─ Récupère ses stores
  ├─ Pour chaque store, appelle fetchDashboardStats()
  ├─ Affiche carte avec KPIs
  │  ├─ Total products
  │  ├─ Total revenue
  │  ├─ Profile views
  │  └─ Phone clicks
  ├─ Peut voir produits (Products tab)
  ├─ Peut voir commandes (Orders tab)
  ├─ Peut voir réservations (Reservations tab)
  └─ Peut voir messages (Messages tab)
```

---

### 7. **lib/notifications.ts** - Notifications push

**Endpoints appelés**:
- `POST /api/notifications/register` - Enregistrer token push
- `GET /api/notifications` - Récupérer notifications
- `POST /api/notifications/{id}/read` - Marquer comme lue
- `DELETE /api/notifications/{id}` - Supprimer

**Fonctions**:
```typescript
registerPushToken(token: string)
  → Promise<void>
  └─ Enregistre token Expo sur backend

unregisterPushToken()
  → Promise<void>
  └─ Supprime token push (logout)

fetchNotifications()
  → Promise<Notification[]>

markNotificationAsRead(notificationId: string)
  → Promise<void>

deleteNotification(notificationId: string)
  → Promise<void>

setupPushNotificationListener(callback: (notification) => void)
  → void
  └─ Écoute notifications entrantes (via Expo Notifications)
```

**Types de notifications**:
```
- order_received      → Nouvelle commande
- order_shipped       → Commande expédiée
- review_received     → Nouvel avis
- message_received    → Nouveau message
- promotion_expires   → Promo expires bientôt
- store_verified      → Store approuvée
- fraud_alert         → Alerte fraude
```

---

### 8. **lib/promotions.ts** - Offres et promotions

**Endpoints appelés**:
- `GET /api/promotions` - Lister promotions
- `GET /api/promotions/{id}` - Détail promotion
- `POST /api/promotions` - Créer promotion (vendeur)
- `PATCH /api/promotions/{id}` - Modifier promotion
- `DELETE /api/promotions/{id}` - Supprimer promotion

**Types**:
```typescript
interface Promotion {
  id: string;
  store_id: number;
  title: string;
  description?: string;
  discount_type: 'PERCENTAGE' | 'FIXED';
  discount_value: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  target_items?: number[];
  min_purchase?: number;
  max_usage?: number;
}
```

---

### 9. **lib/reels.ts** - Vidéos/Reels courtes

**Endpoints appelés**:
- `GET /api/reels` - Lister reels (feed)
- `GET /api/reels/{id}` - Détail reel
- `POST /api/reels` - Créer reel (vendeur)
- `POST /api/reels/{id}/like` - Liker reel
- `DELETE /api/reels/{id}` - Supprimer reel

**Types**:
```typescript
interface Reel {
  id: string;
  store_id: number;
  item_id?: number;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  duration: number;
  views_count: number;
  likes_count: number;
  is_liked?: boolean;
  created_at: string;
  user?: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
}
```

---

### 10. **lib/reservations.ts** - Réservations de services

**Endpoints appelés**:
- `GET /api/reservations` - Mes réservations
- `POST /api/reservations` - Créer réservation
- `PATCH /api/reservations/{id}` - Modifier
- `DELETE /api/reservations/{id}` - Annuler

**Types**:
```typescript
interface Reservation {
  id: string;
  store_id: number;
  service_id: number;
  customer_id: string;
  start_time: string;
  end_time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  created_at: string;
}
```

---

### 11. **lib/geo.ts** - Géolocalisation et distances

**Fonctions**:
```typescript
getCurrentLocation() → Promise<{ latitude, longitude }>
  └─ Expo Location API

calculateDistance(lat1, lon1, lat2, lon2) → number
  └─ Distance en km (Haversine formula)

searchNearby(query: string, radius: number = 50)
  → Promise<{ stores, items }>
  └─ Combine stores + items dans rayon

reverseGeocode(latitude, longitude)
  → Promise<{ city, country, address }>
  └─ Mapbox Reverse Geocoding

forwardGeocode(address: string)
  → Promise<{ latitude, longitude }>
  └─ Mapbox Geocoding
```

---

### 12. **lib/imageSearch.ts** - Recherche par image

**Endpoints appelés**:
- `POST /api/search/image` - Rechercher par image

**Fonctions**:
```typescript
searchByImage(imageUri: string)
  → Promise<ProductItem[]>
  └─ Upload image
  └─ Backend génère embedding
  └─ Recherche similaires dans items
  └─ Retourne top 20 résultats

getImageFeatures(imageUri: string)
  → Promise<number[]>
  └─ Embedding vectoriel
```

---

### 13. **lib/ai.ts** - Features AI

**Endpoints appelés**:
- `POST /api/ai/generate-image` - Générer image
- `POST /api/ai/sentiment-analysis` - Analyse sentiment
- `POST /api/ai/categorize-item` - Catégoriser produit
- `POST /api/ai/suggestions` - Recommandations

**Fonctions**:
```typescript
generateProductImage(description: string)
  → Promise<{ image_url: string }>

analyzeSentiment(text: string)
  → Promise<{ sentiment: 'positive'|'negative'|'neutral', score }>

categorizeItem(description: string)
  → Promise<{ category: string, confidence }>

getRecommendations(context: {
  browsing_history?: string[];
  liked_items?: string[];
})
  → Promise<ProductItem[]>
```

---

### 14. **lib/auth.ts** - Authentification Supabase

Documenté en détail dans la section [Système d'authentification](#système-dauthentification)

---

### 15. **lib/supabase.ts** - Client Supabase

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
);
```

Points clés:
- Initialise le client Supabase
- Utilisé pour l'authentification (signUp, signIn, etc.)
- Utilisé pour accéder directement à la DB (Real-time subscriptions)
- URL et clé depuis variables d'env

---

### 16. **lib/analytics.ts** - Analytics/Tracking

**Fonctions**:
```typescript
trackScreenView(screenName: string, screenClass?: string)
  → void
  └─ Enregistre visite d'écran

trackEvent(eventName: string, params?: Record<string, any>)
  → void
  └─ Événement custom

trackUserAction(action: string, metadata?: any)
  → void
  └─ Action utilisateur (click, submit, etc.)

trackError(error: Error, context?: string)
  → void
  └─ Erreur applicative
```

**Exemple d'usage**:
```typescript
// Dans Home screen
useEffect(() => {
  trackScreenView('Home', 'home');
}, []);

// Dans handler d'action
const handleBuy = () => {
  trackEvent('product_purchased', {
    product_id: item.id,
    price: item.price,
    store_id: item.store.id
  });
  // ...
};
```

---

### 17. **lib/upload.ts** - Upload de fichiers

**Endpoints appelés**:
- `POST /api/upload` - Upload fichier

**Fonctions**:
```typescript
uploadImage(uri: string, type: string = 'product')
  → Promise<{ url: string, key: string }>
  └─ type: 'product', 'avatar', 'banner', 'reel'

uploadMultiple(uris: string[], type: string)
  → Promise<{ urls: string[], keys: string[] }>

deleteFile(key: string)
  → Promise<void>
```

**Implémentation**:
```typescript
// Réception d'image depuis camera/library
const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    aspect: [4, 3],
    quality: 0.8,
  });
  
  if (!result.canceled) {
    const url = await uploadImage(result.assets[0].uri, 'product');
    // Utiliser url...
  }
};
```

---

### 18. **lib/utils.ts** - Utilitaires généraux

**Fonctions communes**:
```typescript
getAvatarUrl(userId: string) → string
  └─ Construit URL avatar

formatPrice(price: number, currency?: string) → string
  └─ Formate 1000 → "1,000 DT"

formatDistance(km: number) → string
  └─ Formate 1.5 → "1.5 km"

formatDate(date: string | Date) → string
  └─ Formate date lisible

truncateString(str: string, maxLength: number) → string

getInitials(fullName: string) → string
  └─ Pour avatars
```

---

### 19. **lib/friendships.ts** - Amis/Suivi

**Endpoints appelés**:
- `POST /api/friendships/follow` - Suivre utilisateur
- `DELETE /api/friendships/unfollow` - Arrêter de suivre
- `GET /api/friendships/followers` - Mes followers
- `GET /api/friendships/following` - Que je suis

---

### 20. **lib/comments.ts** - Commentaires

**Endpoints appelés**:
- `POST /api/comments` - Créer commentaire
- `GET /api/comments?itemId={id}` - Lister commentaires
- `DELETE /api/comments/{id}` - Supprimer commentaire
- `POST /api/comments/{id}/like` - Liker commentaire

---

### 21. **lib/stories.ts** - Stories (éphémères)

**Endpoints appelés**:
- `GET /api/stories` - Lister stories
- `POST /api/stories` - Publier story
- `POST /api/stories/{id}/view` - Marquer vue
- `DELETE /api/stories/{id}` - Supprimer story

---

### 22. **lib/session.ts** - Session utilisateur

**Fonctions**:
```typescript
getSessionData() → Promise<{user, session}>

isSessionValid() → boolean

refreshSessionToken() → Promise<Session>

clearSession() → Promise<void>
```

---

### 23. **lib/oauth.ts** - Connexion par OAuth

**Endpoints**:
- `POST /api/oauth/google` - Google OAuth
- `POST /api/oauth/apple` - Apple OAuth
- `POST /api/oauth/facebook` - Facebook OAuth

```typescript
signInWithGoogle() → Promise<{user, session}>

signInWithApple() → Promise<{user, session}>

signInWithFacebook() → Promise<{user, session}>
```

---

### 24. **lib/aiAgent.ts** - AI Agents pour appels/bookings

**Endpoints appelés**:
- `POST /api/agents/create` - Créer agent AI
- `GET /api/agents/{agentId}/config` - Config d'agent
- `POST /api/agents/{agentId}/call` - Lancer appel

**Types**:
```typescript
interface AIAgent {
  id: string;
  store_id: number;
  name: string;
  personality: string;
  voice: string;
  capabilities: string[];
  is_active: boolean;
}
```

---

### 25. **lib/suggestions.ts** - Recommandations personnalisées

**Endpoints appelés**:
- `GET /api/suggestions/personalized` - Suggestions perso
- `GET /api/suggestions/trending` - Tendances
- `GET /api/suggestions/by-category` - Par catégorie

---

## STRUCTURE DES ÉCRANS (APP/)

### Architecture Expo Router

**Groupes de routes**:
```
(auth)    → Routes non-authentifiées (login, signup, reset)
(tabs)    → Onglets principaux (home, discover, create, messages, profile)
business/ → Pages métier (boutique, paramètres, etc.)
dashboard/→ Dashboard vendeur
```

### Écrans principaux

#### **(auth) - Authentification**

**login.tsx**
```typescript
- Email input
- Password input
- Forgot password link
- Sign in button
- Sign up link
- OAuth buttons (Google, Apple, Facebook)
- API: signIn() from lib/auth.ts
- Navigation: On success → (tabs)/index
```

**signup.tsx**
```typescript
- Email input
- Password input
- Confirm password
- Full name input
- Terms & conditions checkbox
- Sign up button
- Already have account link
- API: signUp() from lib/auth.ts
- Navigation: On success → (tabs)/index or profile completion
```

**reset-password.tsx** (inféré)
```typescript
- Email input
- Submit button
- Back to login link
- API: resetPassword() from lib/auth.ts
- Shows: "Check your email for reset link"
```

#### **(tabs) - Navigation par onglets**

**_layout.tsx**
```typescript
- BottomTabNavigator from React Navigation
- 5 tabs: Home, Discover, Create, Messages, Profile
- Conditional rendering based on user role
- Active tab styling + icons
- Tab bar visibility controller (useTabBarVisibility)
- Custom behavior: Hide tab bar on scroll down
```

**index.tsx (Home/Feed)**
```typescript
- Récupère: items, stores, promotions, reels
- Affiche:
  ├─ User greeting + location
  ├─ Action circles (Search, Categories, Nearby)
  ├─ Promotions carousel
  ├─ Nearby stores section
  ├─ Products feed (infinite scroll)
  ├─ Reels section
  └─ Wishlist toggle
- State: items[], stores[], promotions[], reels[], loading, refreshing
- APIs: fetchItems(), fetchStores(), fetchPromotions(), fetchReels()
- Navigation: Tap product → product/[id], Tap store → business/[id]
- Features: Pull to refresh, infinite scroll, wishlist
```

**discover.tsx (Découvrir)**
```typescript
- Catégories produits en grid
- Filtrages: Category, Price range, Rating, Distance
- Résultats de recherche
- Collection des stores premium
- Vendors featured
- APIs: fetchItems(), fetchStores() with filters
- Navigation: Category → Filtered results
```

**create.tsx (Créer/Vendre)**
```typescript
Affiche différent UI selon userRole:

SI CLIENT:
  ├─ "Create listing" button → Form (seller role upgrade)
  ├─ "Join as seller" button
  └─ Benefits list

SI PRO/BUSINESS_OWNER:
  ├─ Create new product form
  │  ├─ Image upload
  │  ├─ Title input
  │  ├─ Description
  │  ├─ Price input
  │  ├─ Category select
  │  ├─ Location
  │  └─ Publish button
  ├─ My products list
  ├─ Analytics summary
  └─ Dashboard link
```

**messages.tsx (Messages/Chat)**
```typescript
- Liste conversations triée par date
- Each conversation:
  ├─ Partner avatar
  ├─ Partner name
  ├─ Last message preview
  ├─ Last message timestamp
  ├─ Unread indicator
  └─ Tap → chat/[id]
- APIs: fetchConversations()
- Features: Search conversations, mark as read, delete
- Realtime: New messages updates list
```

**profile.tsx (Profil utilisateur)**
```typescript
- User avatar + name
- User stats:
  ├─ Reviews count
  ├─ Bookings count
  ├─ Orders count
  ├─ Saved count
  ├─ Following count
  └─ Friends count
- Menus:
  ├─ Edit profile
  ├─ My orders
  ├─ My reviews
  ├─ Saved items
  ├─ Settings
  ├─ Help & Support
  └─ Sign out
- APIs: getProfile(), getProfileStats()
```

#### **dashboard/ - Dashboard vendeur**

**index.tsx (Dashboard principal)**
```typescript
- Écran principal pour propriétaires de boutique
- Affiche:
  ├─ Store selector (dropdown si plusieurs stores)
  ├─ KPIs (revenue, orders, views, etc.)
  ├─ Quick stats
  ├─ Recent orders list
  ├─ Action buttons
  │  ├─ View all products
  │  ├─ View all orders
  │  ├─ View analytics
  │  ├─ Create promotion
  │  └─ Messages
  └─ Navigation tabs pour voir produits/commandes/reservations/messages
- APIs: fetchDashboardStats(), fetchDashboardOrders(), etc.
```

**products.tsx**
```typescript
- List de produits du vendeur
- Each product:
  ├─ Image
  ├─ Name + price
  ├─ Category
  ├─ Views count
  ├─ Stock status
  └─ Tap → Edit or view analytics
- Actions: Add product, Edit, Delete, Promote
- APIs: fetchDashboardProducts()
```

**orders.tsx**
```typescript
- Liste commandes triées par date
- Filtres: Status (pending, confirmed, shipped, delivered)
- Each order:
  ├─ Order ID
  ├─ Customer name
  ├─ Items count
  ├─ Total price
  ├─ Status badge
  ├─ Creation date
  └─ Tap → Order detail/actions
- Actions: Mark shipped, Mark delivered, Cancel, Message customer
- APIs: fetchDashboardOrders()
```

#### **product/[id].tsx - Détail produit**

```typescript
- Récupère itemId de route params
- Affiche:
  ├─ Image gallery (swipeable)
  ├─ Product name
  ├─ Price
  ├─ Store name (with rating)
  ├─ Description
  ├─ Category + tags
  ├─ Stock status
  ├─ Distance from user
  ├─ Reviews section
  │  ├─ Average rating
  │  ├─ List de reviews avec avatars
  │  └─ Tap to see more
  ├─ Related items carousel
  └─ CTA buttons:
     ├─ Add to wishlist
     ├─ Share
     ├─ Message vendor
     └─ Add to cart / Buy now
- APIs: fetchItemDetail()
```

#### **business/[id].tsx - Détail boutique**

```typescript
- Récupère storeId de route params
- Affiche:
  ├─ Store banner
  ├─ Store logo
  ├─ Store name
  ├─ Category
  ├─ Rating + review count
  ├─ Follower count
  ├─ Store description/bio
  ├─ Location + distance
  ├─ Contact buttons:
  │  ├─ Call
  │  ├─ WhatsApp
  │  ├─ Message
  │  └─ Visit direction
  ├─ Actions:
  │  ├─ Follow
  │  ├─ Share
  │  └─ Report
  └─ Products list (store's items)
- APIs: fetchStoreById(), fetchItems({storeId})
```

#### **cart.tsx - Panier d'achat**

```typescript
- Liste items dans le panier
- Each item:
  ├─ Image
  ├─ Name + price
  ├─ Store name
  ├─ Quantity +/- buttons
  └─ Remove button
- Summary:
  ├─ Subtotal
  ├─ Shipping
  ├─ Taxes
  ├─ Discount (if any)
  └─ TOTAL
- Buttons:
  ├─ Continue shopping
  └─ Checkout
- Features:
  ├─ Grouped by store
  ├─ Stock checking
  └─ Save for later
- APIs: Cart from store/cartStore.ts (Zustand)
```

#### **chat/[id].tsx - Conversation détail**

```typescript
- Récupère conversationId de route params
- Affiche:
  ├─ Chat header:
  │  ├─ Partner avatar
  │  ├─ Partner name
  │  └─ Online status
  ├─ Messages list (vertical scroll, newest at bottom)
  │  ├─ Message bubbles
  │  ├─ Timestamps
  │  ├─ Read receipts
  │  └─ Sender avatar
  ├─ Input field:
  │  ├─ Text input
  │  ├─ Image picker button
  │  ├─ Send button
  │  └─ Typing indicator
- Features:
  ├─ Real-time updates (Supabase subscription)
  ├─ Image sharing
  ├─ Typing indicator
  └─ Notification on new message
- APIs: fetchMessages(), sendMessage(), subscribeToMessages()
- Realtime: Supabase subscription for new messages
```

#### **search.tsx - Recherche globale**

```typescript
- Search input
- Filters dropdown
- Onglets: All, Products, Stores, People
- Results list (infinite scroll)
- Each result:
  ├─ Thumbnail
  ├─ Name
  ├─ Metadata (rating, distance, etc.)
  └─ Tap → Detail page
- Features:
  ├─ Search history
  ├─ Voice search
  ├─ Image search
  └─ Filters dropdown
- APIs: fetchItems(q=...), fetchStores(q=...)
```

#### **notifications.tsx - Notifications**

```typescript
- Liste notifications triées par date
- Each notification:
  ├─ Icon (type: order, message, review, etc.)
  ├─ Title
  ├─ Description
  ├─ Timestamp
  ├─ Read status
  └─ Tap → Navigate to relevant page
- Features:
  ├─ Mark all as read
  ├─ Delete notifications
  └─ Filter by type
- APIs: fetchNotifications()
```

#### **settings.tsx - Paramètres app**

```typescript
- Language selector
- Theme (light/dark)
- Notifications toggle
- Location services toggle
- Privacy settings
- Account settings
- Help & Support
- About app
- Version info
- Sign out button
```

---

## GESTION D'ÉTAT (CONTEXT API + ZUSTAND)

### Context API (context/)

#### **AuthContext.tsx**
```typescript
- Provides: user, session, loading, error
- Methods: 
  ├─ login(email, password)
  ├─ logout()
  ├─ signup(email, password, fullName)
  ├─ refreshToken()
  └─ resetPassword(email)
- Persiste session en localStorage (via Supabase)
- Utilisé par: Tout l'app via useAuth() hook
```

#### **ProfileContext.tsx**
```typescript
- Provides: profile, stats, loading, error
- Methods:
  ├─ refresh()
  ├─ updateProfile(data)
  ├─ uploadAvatar(file)
  ├─ addSavedPlace(placeId)
  └─ removeSavedPlace(placeId)
- Rechargé au login/logout
- Utilisé par: Home, Profile, Dashboard screens
```

#### **NotificationsContext.tsx**
```typescript
- Provides: notifications[], unreadCount, loading
- Methods:
  ├─ fetchNotifications()
  ├─ markAsRead(id)
  ├─ deleteNotification(id)
  └─ clearAll()
- Realtime: Écoute push notifications entrantes
- Utilisé par: Notifications screen + Badge count
```

#### **ToastContext.tsx**
```typescript
- Provides: showToast(message, type, duration)
- Types: success, error, info, warning
- Utilisé par: Tous les écrans pour feedback utilisateur
```

### Zustand (store/)

#### **cartStore.ts**
```typescript
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({...})),
  removeItem: (id) => set((state) => ({...})),
  updateQuantity: (id, qty) => set((state) => ({...})),
  clear: () => set({ items: [] }),
  getTotal: () => number,
  getGroupedByStore: () => Record<storeId, items[]>
}))
```

**Utilisation**:
```typescript
const { items, addItem, removeItem } = useCartStore();

// Add product to cart
const handleAddToCart = (product) => {
  addItem({
    id: product.id,
    store_id: product.store.id,
    quantity: 1,
    ...product
  });
};
```

#### **chatStore.ts**
```typescript
const useChatStore = create((set) => ({
  conversations: [],
  activeConversation: null,
  addMessage: (conversationId, message) => {...},
  markAsRead: (conversationId) => {...},
  setActiveConversation: (id) => set({...}),
}))
```

#### **storiesStore.ts**
```typescript
const useStoriesStore = create((set) => ({
  stories: [],
  viewedStoryIds: [],
  addStory: (story) => {...},
  markStoryViewed: (storyId) => {...},
}))
```

### Flux de données

```
┌──────────────────────────────────────────────┐
│ User Action (tap, scroll, submit, etc.)      │
└────────────────┬─────────────────────────────┘
                 │
        ┌────────▼─────────┐
        │ Screen Component  │
        │  (app/*.tsx)      │
        └────────┬──────────┘
                 │
         ┌───────▼───────────────────┐
         │ Zustand/Context Selector  │
         │  useCartStore()           │
         │  useAuth()                │
         └───────┬───────────────────┘
                 │
      ┌──────────▼──────────┐
      │ Event Handler       │
      │ .addItem()          │
      │ .login()            │
      └──────────┬──────────┘
                 │
      ┌──────────▼──────────────┐
      │ API Call (lib/*.ts)     │
      │ api.post('/api/...')    │
      └──────────┬──────────────┘
                 │
      ┌──────────▼──────────────┐
      │ Backend (Django API)    │
      │ Process + DB update     │
      └──────────┬──────────────┘
                 │
      ┌──────────▼──────────────┐
      │ Response to App         │
      │ Return { success, data }│
      └──────────┬──────────────┘
                 │
      ┌──────────▼──────────────┐
      │ Update State            │
      │ setState()              │
      └──────────┬──────────────┘
                 │
      ┌──────────▼──────────────┐
      │ Re-render component     │
      │ Show new UI state       │
      └──────────────────────────┘
```

---

## COMPOSANTS PRINCIPAUX

### Note: Problème de double dossier

Il existe actuellement deux dossiers:
- `components/` (correct)
- `compnents/` (typo)

**Actuellement**: Les imports utilisent `compnents/` partout

**À faire**: 
1. Fusionner les deux dossiers
2. Corriger tous les imports dans les fichiers `app/`

### Composants dans compnents/home/

**FeedSection.tsx**
```typescript
- Affiche liste de produits
- Props: items, onProductTap, onWishlistToggle, loading
- Infinite scroll avec FlatList
- Shimmer loading state
```

**NearbyStoresSection.tsx**
```typescript
- Carousel horizontal de stores
- Props: stores, onStoreTap
- Card avec logo, nom, rating, distance
- Tap → business/[storeId]
```

**PromotionsCarousel.tsx**
```typescript
- Carousel de promotions
- Each card: Image + discount badge
- Tap → Promotion detail / filtered products
```

### Autres composants

**components/cards/**
- ProductCard.tsx - Card produit avec image, prix, rating
- StoreCard.tsx - Card magasin avec logo, rating, distance
- OrderCard.tsx - Card commande avec items, status, total

**components/buttons/**
- PrimaryButton.tsx - Bouton principal (bleu)
- SecondaryButton.tsx - Bouton secondaire (blanc)
- IconButton.tsx - Bouton avec icône

**components/forms/**
- TextInput.tsx - Champ texte custom
- PhoneInput.tsx - Champ téléphone avec validation
- ImagePicker.tsx - Sélecteur d'image (camera/gallery)

**components/navigation/**
- TabBar.tsx - Bottom tab navigation custom

---

## FLUX DE DONNÉES

### Flux d'achat (Buy flow)

```
1. Home screen → User scrolls through products
   └─ fetchItems() gets products

2. User taps product
   └─ Navigate to product/[id]

3. Product detail screen
   ├─ Affiche fetchItemDetail(id)
   ├─ Affiche reviews, store info, related items
   └─ User taps "Add to cart"

4. Add to cart
   ├─ useCartStore.addItem(product)
   ├─ Update UI (show "Item added" toast)
   └─ Continue shopping OR go to cart

5. Cart screen
   ├─ useCartStore.items (grouped by store)
   ├─ User peut modify quantities
   └─ User taps "Checkout"

6. Checkout flow
   ├─ Collect delivery address
   ├─ Confirm order details
   └─ User taps "Place order"

7. Create orders
   ├─ createBulkOrders() for all items
   ├─ Backend creates Order records
   ├─ Backend sends confirmation email
   ├─ Clear cart (useCartStore.clear())
   └─ Navigate to order-confirmation screen

8. Backend notifications
   ├─ Vendor receives push notification
   ├─ Vendor sees in dashboard/orders
   └─ Can mark shipped, delivered, etc.
```

### Flux de messages (Chat flow)

```
1. Profile screen → User taps "Messages" tab

2. Messages screen
   ├─ fetchConversations() loads list
   ├─ Realtime subscription updates active conversations
   └─ User taps conversation

3. Chat detail screen [id]
   ├─ fetchMessages(id) loads history
   ├─ subscribeToMessages(id) sets up listener
   └─ User types message

4. Send message
   ├─ sendMessage(receiverId, content)
   ├─ Supabase inserts into messages table
   ├─ Realtime pushes to both parties
   ├─ Both UIs update instantly
   └─ Receiver gets push notification

5. Realtime updates
   ├─ New message in conversation
   ├─ Subscription callback fires
   ├─ Update messages array
   ├─ UI re-renders new message
   └─ Scroll to latest message
```

### Flux d'authentification (Auth flow)

```
1. App start
   ├─ AuthContext initializes
   ├─ Checks supabase.auth.getSession()
   └─ If session exists → Auto login

2. Login screen (non-authenticated state)
   ├─ User enters email + password
   └─ Taps "Sign in"

3. Sign in process
   ├─ signIn(email, password)
   ├─ Supabase verifies credentials
   ├─ Returns { session: JWT_TOKEN, user: User }
   └─ Store in AuthContext + localStorage

4. After login
   ├─ API interceptor extracts JWT
   ├─ Injects into every request header
   ├─ Backend validates JWT
   └─ Profile loads automatically

5. JWT expiration
   ├─ After 1 hour, token expires
   ├─ Next API call gets 401 Unauthorized
   ├─ Interceptor calls refreshSession()
   ├─ Gets new JWT from Supabase
   ├─ Retries original request with new token
   └─ User doesn't notice (seamless)

6. Sign out
   ├─ User taps "Sign out"
   ├─ signOut() called
   ├─ Supabase clears session
   ├─ AuthContext clears state
   ├─ Push token unregistered
   └─ Redirect to login screen
```

---

## RELATION AVEC L'APPLICATION WEB

### Partage de données backend

Tant l'app web (private-PFE-repos) que l'app mobile (ro2ya-mobile-app) pointent vers le **MÊME backend**:
```
API_URL = https://ro2ya-marketplace-platforme.vercel.app
```

Cela signifie:
- **Même base de données** (Supabase PostgreSQL)
- **Mêmes utilisateurs** (Auth via Supabase)
- **Mêmes produits/stores/commandes** (Tables partagées)
- **Mêmes APIs** (Django REST endpoints)

### Tableau comparatif

| Aspect | Web App | Mobile App |
|--------|---------|-----------|
| **Framework** | Next.js 13+ | React Native (Expo) |
| **Langage** | TypeScript | TypeScript |
| **Navigation** | App Router | Expo Router |
| **API Client** | Fetch/axios | Axios |
| **Auth** | NextAuth.js | Supabase Auth |
| **State** | Zustand, Context | Zustand, Context |
| **Backend** | Django REST | Django REST (même) |
| **Database** | Supabase PostgreSQL | Supabase PostgreSQL (même) |
| **UI Framework** | Radix UI + Tailwind | React Native |
| **Real-time** | WebSocket (Socket.io) | Supabase Realtime |

### Endpoints partagés

Tous les endpoints sont identiques:

```typescript
// Web app (lib/actions/search.ts)
const { data } = await api.get('/api/items');

// Mobile app (lib/items.ts)
const { data } = await api.get('/api/items');
// → Même endpoint !
```

### Synchronisation de données

Les deux apps accédent aux mêmes données:

```
User logs in on Web
  ├─ Creates order for product
  ├─ Order saved in database
  └─ Order confirmed

User switches to Mobile app
  ├─ Logs in with same account
  ├─ Calls getUserOrders()
  ├─ Sees same order in database
  └─ Can track/modify it
```

### Différences d'interface

**Web App** (Next.js):
- Desktop/tablet optimized
- Rich dashboard with analytics
- Sophisticated search with filters
- Admin panel
- Multi-vendor marketplace management

**Mobile App** (React Native):
- Touch-optimized
- Quick actions (tap, swipe)
- Native camera/location access
- Push notifications
- Offline-first capability (potential)

### Workflows disponibles sur mobile

**Vendeur/Pro**:
1. Dashboard complet (dashboard/ routes)
2. Create/edit products (create.tsx)
3. Receive order notifications
4. Chat with customers
5. Analytics (dashboard/analytics)

**Client**:
1. Browse products (discover.tsx)
2. Search (search.tsx)
3. Add to cart + checkout (cart.tsx)
4. Chat with vendors
5. Track orders (profile/orders)
6. Leave reviews

---

## POINTS TECHNIQUES IMPORTANTS

### 1. JWT Token Management

```typescript
// Automatique via API interceptor
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

// Token refresh automatique si expiré
// Backend retourne 401 → interceptor refresh JWT
```

### 2. Real-time Updates (Chat, Notifications)

```typescript
// Supabase Realtime subscription
const subscription = supabase
  .from('messages')
  .on('INSERT', (payload) => {
    console.log('New message:', payload.new);
    // Update UI
  })
  .subscribe();
```

### 3. Image Upload

```typescript
// Expo ImagePicker
const result = await ImagePicker.launchImageLibraryAsync();
const url = await uploadImage(result.assets[0].uri);
// Returns S3 URL or Supabase Storage URL
```

### 4. Geolocation

```typescript
import * as Location from 'expo-location';

const location = await Location.getCurrentPositionAsync({});
// {coords: {latitude, longitude, accuracy}}

const distance = calculateDistance(
  user.latitude, user.longitude,
  store.latitude, store.longitude
);
// Result in kilometers
```

### 5. Push Notifications

```typescript
import * as Notifications from 'expo-notifications';

// Register for push notifications
const token = (await Notifications.getExpoPushTokenAsync()).data;
await registerPushToken(token); // Send to backend

// Listen for notifications
Notifications.addNotificationResponseListener(({ notification }) => {
  // Handle notification tap
  const { order_id, order_status } = notification.request.content.data;
  // Navigate to order screen
});
```

### 6. Navigation avec route params

```typescript
// Screen définition
export default function ProductDetail() {
  const { id } = useLocalSearchParams(); // ← Gets [id] param
  
  useEffect(() => {
    fetchItemDetail(id);
  }, [id]);
}

// Navigation
import { useRouter } from 'expo-router';

const router = useRouter();
router.push(`/product/${product.id}`);
```

### 7. Infinite scroll (FlatList)

```typescript
<FlatList
  data={items}
  renderItem={({ item }) => <ProductCard {...item} />}
  onEndReached={() => {
    // Load more items
    fetchMoreItems();
  }}
  onEndReachedThreshold={0.7}
  ListFooterComponent={
    loading ? <ActivityIndicator /> : null
  }
/>
```

### 8. Animations (React Native Reanimated)

```typescript
<Animated.View 
  entering={FadeInDown.delay(100).duration(500)}
  style={styles.container}
>
  <Text>Animated entry</Text>
</Animated.View>
```

---

## PROCHAINES ÉTAPES D'OPTIMISATION

### 1. **Fusionner les dossiers components/**
   - [ ] Copier tous les fichiers de `compnents/` vers `components/`
   - [ ] Supprimer dossier `compnents/`
   - [ ] Corriger tous les imports dans `app/`
   - [ ] Vérifier pas de conflicts

### 2. **Implémenter Offline-first**
   - [ ] AsyncStorage pour cache local
   - [ ] SQLite pour stockage structuré
   - [ ] Sync when connection restored
   - [ ] Conflict resolution logic

### 3. **Optimiser performances**
   - [ ] Code splitting (dynamic imports)
   - [ ] Image optimization (WebP, lazy loading)
   - [ ] Memoization pour expensive operations
   - [ ] Flatten state structure (redux-orm pattern)

### 4. **Ajouter features manquantes**
   - [ ] Voice search (Expo Speech API)
   - [ ] Barcode scanning
   - [ ] QR codes
   - [ ] Augmented Reality (for product preview)

### 5. **Sécurité**
   - [ ] Sensitive data encryption
   - [ ] SSL pinning
   - [ ] Jailbreak detection
   - [ ] Review API error handling

### 6. **Testing**
   - [ ] Unit tests (Jest)
   - [ ] Integration tests (Testing Library)
   - [ ] E2E tests (Detox)
   - [ ] API mock server (MSW)

### 7. **Documentation**
   - [ ] API contract documentation
   - [ ] Components storybook
   - [ ] Setup guide for developers
   - [ ] Troubleshooting guide

### 8. **Monitoring**
   - [ ] Crash reporting (Sentry)
   - [ ] Performance monitoring
   - [ ] Analytics dashboard
   - [ ] User session recording

---

## RÉSUMÉ EXÉCUTIF

### Qu'est-ce que RO2YA Mobile App?

Une **application React Native multiplateforme** (iOS + Android) qui connecte acheteurs et vendeurs dans un **marché numérique**.

### Cas d'usage principaux

1. **Acheteurs (CLIENT)**
   - Rechercher/parcourir produits
   - Acheter via panier
   - Discuter avec vendeurs
   - Laisser avis/notes

2. **Vendeurs (PRO)**
   - Créer/gérer produits
   - Recevoir/gérer commandes
   - Voir analytics vendeur
   - Communiquer avec clients

3. **Admin (ADMIN)**
   - Modérer contenu
   - Gérer fraud/abuse reports
   - Voir analytics plateforme

### Architecture clé

- **Frontend**: React Native/Expo (multiplateforme)
- **Backend**: Django REST API (shared avec web)
- **Database**: PostgreSQL (via Supabase)
- **Auth**: JWT (via Supabase)
- **Real-time**: Supabase Realtime (pour chat, notifications)

### API Structure

- **25+ modules lib/** exposant 50+ endpoints
- Patterns cohérents (fetchX, createX, updateX, deleteX)
- Intercepteurs JWT automatiques
- Error handling centralisé

### État applicatif

- **Context API** pour auth, profile, notifications
- **Zustand** pour cart, chat, stories
- **Supabase** pour real-time subscriptions

### Prochaines priorités

1. Fusionner `components/` → `compnents/`
2. Implémenter offline-first
3. Ajouter tests automatisés
4. Monitoring + Sentry
5. Optimiser performances

---

## FICHIERS CLÉS DOCUMENTÉS

### lib/ (25 modules)
✅ api.ts, auth.ts, items.ts, stores.ts, orders.ts, chat.ts, profile.ts, dashboard.ts, notifications.ts, promotions.ts, reels.ts, reservations.ts, geo.ts, imageSearch.ts, ai.ts, aiAgent.ts, analytics.ts, upload.ts, utils.ts, session.ts, friendships.ts, comments.ts, stories.ts, oauth.ts, suggestions.ts, supabase.ts

### app/ (écrans)
✅ (auth)/, (tabs)/, business/, dashboard/, product/, service/, chat/, search/, cart/, notifications.tsx, settings.tsx, user/

### context/ (état global)
✅ AuthContext.tsx, ProfileContext.tsx, NotificationsContext.tsx, ToastContext.tsx

### store/ (Zustand)
✅ cartStore.ts, chatStore.ts, storiesStore.ts

---

**Document créé**: Décembre 2024  
**Version**: 1.0  
**Statut**: Complete - Prêt pour intégration dans documentation projet
