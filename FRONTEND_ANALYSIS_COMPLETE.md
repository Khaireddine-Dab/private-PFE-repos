# Analyse Complète du Frontend - APP + COMPONENTS

## 📊 Statistiques Globales
- **Fichiers APP (sans API)**: 37 fichiers
- **Fichiers COMPONENTS**: 192 fichiers
- **Total Frontend**: 229 fichiers

---

## 📁 STRUCTURE DU DOSSIER APP (37 fichiers)

### Root App Files

#### `app/layout.tsx` - Layout Principal
- **Directive**: N/A (root layout)
- **Imports**:
  - `@/components/session-provider` - SessionProvider
  - `sonner` - Toaster
  - `next/dynamic` - dynamic
  - `@/components/GlobalActionDrawer` - GlobalActionDrawer
  - `@/components/messaging/MessageBubble` - MessageBubble
  - `@/components/messaging/ChatHeads` - ChatHeads
  - `@/components/notifications/AINotificationTrigger` - AINotificationTrigger
- **Exports**: RootLayout (default)
- **Fonctionnalités**: 
  - Wrapper global avec SessionProvider pour authentification
  - Notifications IA globales
  - Chat heads et messaging
  - Toast notifications avec Sonner

#### `app/page.tsx` - Page d'Accueil
- **Directive**: 'use client'
- **State**: 
  - `isFiltering` - Bool pour filtrer les offres
- **Imports**:
  - `useState` (React)
  - `next/dynamic` - BackgroundScene (lazy load)
  - Components: Navbar, Footer, OffersCarouselDemo, Offers, ShortAdsSection, LogoCarouselDemo, FloatingAiAssistant
- **Exports**: Home (default)
- **Fonctionnalités**:
  - Gestion de l'état de filtrage
  - Affichage de la scène 3D en arrière-plan
  - Carousel d'offres
  - Assistant IA flottant

### app/auth/ - Authentification (2 fichiers)
**Fichiers:**
- `update-password/page.tsx` - Mise à jour du mot de passe
- `callback/route.ts` - Callback OAuth Supabase

**Imports principaux:**
- `lib/actions/auth.ts` - updateUserPassword, sendPasswordResetEmail
- `lib/supabase/server.ts` - createClient
- Components: AuthCard

**Fonctionnalités:**
- Authentification utilisateur via Supabase
- Réinitialisation de mot de passe
- OAuth callbacks (Google, GitHub, etc.)
- Validation des formulaires

### app/dashboard/ - Tableau de Bord (12+ fichiers)
**Structure:**
- `layout.tsx` - Sidebar, Navigation, Search
- `page.tsx` - Overview/Home dashboard
- `[id]/intelligence/page.tsx` - IA insights
- `[id]/leads/page.tsx` - Gestion des leads
- `[id]/products/page.tsx` - Gestion produits
- `[id]/profile/page.tsx` - Profil du store
- `[id]/reels/page.tsx` - Gestion des vidéos
- `[id]/social/page.tsx` - Avis/commentaires
- `[id]/stories/page.tsx` - Gestion des stories
- `[id]/support/` - Support client
- `[id]/transactions/page.tsx` - Commandes/réservations
- `qr-verify/[code]/page.tsx` - Vérification QR code

**Imports principaux:**
- `lib/actions/overviews.ts` - getDashboardOverview, getSidebarStats
- `lib/actions/items.ts` - getAdminItemsByStoreId, upsertItem
- `lib/actions/orders.ts` - getStoreOrders, updateOrderStatus
- `lib/actions/reservation.ts` - getBusinessBookings
- `lib/actions/reviews.ts` - getReviewsByStoreId
- `lib/actions/reels.ts` - getBusinessReels
- `lib/supabase/client.ts` - createClient
- `lib/utils/avatar.ts` - getAvatarUrl
- `lib/dashboard/store-access.ts` - isStoreDashboardLocked
- Components: Charts (Recharts), Cards, Modals

**Fonctionnalités:**
- Analytics en temps réel (ventes, views, conversions)
- Gestion de l'inventaire (produits, services)
- Commandes et réservations
- Avis et commentaires clients
- IA Intelligence (recommandations, insights)
- Support client et tickets
- Upload de médias (vidéos, photos)
- Gestion des promotions

### app/discover/ - Découverte (1-2 fichiers)
**Imports principaux:**
- `lib/actions/search.ts` - searchStores, searchItems
- Components: ProductCard, ServiceCard, BusinessCard

**Fonctionnalités:**
- Parcourir les magasins et produits
- Filtrage par catégorie et localisation

### app/login/ - Connexion (1 fichier)
**Fonctionnalités:**
- Formulaire de connexion
- Email/password authentication
- Redirection OAuth

### app/merchants/ - Pages Marchands (6+ fichiers)
**Routes:**
- `business/[id]/page.tsx` - Détails entreprise
- `product/[id]/page.tsx` - Détails produit
- `service/[id]/page.tsx` - Détails service

**Imports principaux:**
- `lib/actions/business.ts` - getBusinessById
- `lib/actions/product_detail.ts` - getProductById, getRelatedItems
- `lib/actions/service_detail.ts` - getServiceById
- `lib/actions/reviews.ts` - getReviewsByStoreId, respondToReview
- `lib/actions/items.ts` - getPublicItemsByStoreId
- `lib/actions/stories.ts` - getBusinessStories
- `lib/actions/promotions.ts` - getPromotions
- Components: BusinessImageGallery, BusinessItemsList, ReviewCard, PromotionBanner

**Fonctionnalités:**
- Affichage détaillé des entreprises
- Galerie de produits/services
- Avis et ratings
- Promotions actives
- Stories du business
- Booking/Commander

### app/messages/ - Messagerie (2-3 fichiers)
**Imports principaux:**
- `lib/actions/friendships.ts` - getFriendshipStatus, sendFriendRequest
- Components: ChatHeads, MessageBubble, ConversationList

**Fonctionnalités:**
- Chat en temps réel
- Gestion des amis
- Notifications de messages

### app/profile/ - Profil Utilisateur (3 fichiers)
**Routes:**
- `user/page.tsx` - Profil client
- `businessOwner/page.tsx` - Profil propriétaire

**Imports principaux:**
- `lib/actions/profile.ts` - getUserProfileData, getOwnerProfileData
- `lib/actions/users.ts` - updateProfile, updateAvatar, deleteAccount
- `lib/actions/auth.ts` - sendPasswordResetEmail
- `lib/actions/favorites.ts` - toggleSaveAction
- Components: ProfileHeader, ProfileStats, ProfileTabs, ReviewCard, OrderCard

**Fonctionnalités:**
- Gestion du profil utilisateur
- Mise à jour avatar/infos
- Historique des commandes
- Favoris et sauvegardes
- Paramètres de compte
- Suppression de compte

### app/public/ - Pages Publiques (2 fichiers)
**Routes:**
- `user/[id]/page.tsx` - Profil public utilisateur
- `business/[id]/page.tsx` - Profil public business

**Imports principaux:**
- `lib/actions/public-profile.ts` - getPublicUserProfile, getPublicBusinessProfile
- Components: PublicProfileCard, ReviewsList

**Fonctionnalités:**
- Visualisation des profils publics
- Avis publics
- Informations publiques des businesses

### app/reels/ - Vidéos/Reels (1-2 fichiers)
**Imports principaux:**
- `lib/actions/reels.ts` - recordStoreView, trackReelInteraction
- Components: ReelCard, ReelPlayer

**Fonctionnalités:**
- Lecture des vidéos
- Tracking des interactions
- Partage de reels

### app/register/ - Enregistrement (1 fichier)
**Fonctionnalités:**
- Formulaire d'enregistrement utilisateur
- Validation email
- Confirmation OTP

### app/search/ - Recherche (4 fichiers)
**Routes:**
- `page.tsx` - Recherche globale
- `searchProduct/page.tsx` - Recherche produits
- `searchService/page.tsx` - Recherche services

**Imports principaux:**
- `lib/actions/search.ts` - searchStores, searchItems, searchServicesDirectory, doGlobalSemanticSearch
- `lib/actions/addbuss.ts` - searchUnified
- `lib/hooks/useTracking.ts` - useTracking
- Components: SearchFilters, ProductCard, ServiceCard, BusinessCard, ResultsMap

**Fonctionnalités:**
- Recherche multi-critères
- Filtrage (prix, rating, localisation)
- Recherche sémantique IA
- Carte interactive
- Comparaison de produits

### app/shop/ - Boutique (1 fichier)
**Imports principaux:**
- `lib/actions/items.ts` - getLatestItems
- Components: ProductCard, ProductOrderCard

**Fonctionnalités:**
- Catalogue de tous les produits
- Shopping cart
- Filtrage et tri

### app/valider/ - Validation (1 fichier)
**Imports principaux:**
- `lib/actions/orders.ts` - getOrderByTrackingCode, updateOrderStatus
- `lib/actions/reservation.ts` - getBookingByTrackingCode

**Fonctionnalités:**
- Validation des codes de suivi
- Confirmation de livraison/réservation

### app/test-ranking/ - Tests (1 fichier)
**Fonctionnalités:**
- Tests et ranking des résultats de recherche

---

## 🧩 STRUCTURE DÉTAILLÉE DES COMPONENTS (192 fichiers)

### components/ui/ - Composants UI Génériques (74+ fichiers)
**Composants de base:**
- `button.tsx` - Boutons avec variants (default, destructive, outline, ghost, link)
- `card.tsx` - Cartes conteneurs
- `input.tsx` - Inputs de formulaire
- `label.tsx` - Labels de formulaire
- `textarea.tsx` - Textarea
- `badge.tsx` - Badges et tags
- `avatar.tsx` - Avatars utilisateur
- `skeleton.tsx` - Loading skeletons
- `spinner.tsx` - Spinner de chargement
- `alert.tsx` - Alertes
- `alert-dialog.tsx` - Dialog d'alerte
- `dialog.tsx` - Modales
- `drawer.tsx` - Drawer/Sidebar
- `dropdown-menu.tsx` - Menus déroulants
- `sheet.tsx` - Sheet (mobile-friendly drawer)
- `toast.tsx`, `toaster.tsx` - Toast notifications

**Composants de navigation:**
- `navbar-menu.tsx` - Menu navbar avec hover
- `navigation-menu.tsx` - Menu de navigation
- `breadcrumb.tsx` - Fil d'Ariane
- `sidebar.tsx` - Sidebar navigation
- `tabs.tsx` - Tabs/Onglets
- `pagination.tsx` - Pagination

**Composants de données:**
- `table.tsx` - Tableaux
- `chart.tsx` - Graphiques Recharts
- `carousel.tsx` - Carousels
- `stories-carousel.tsx` - Carousel pour stories

**Composants formulaires avancés:**
- `form.tsx` - Form wrapper
- `field.tsx` - Field wrapper
- `input-group.tsx` - Input groups
- `checkbox.tsx` - Checkboxes
- `radio-group.tsx` - Radio buttons
- `select.tsx` - Select dropdowns
- `toggle.tsx` - Toggle switches
- `switch.tsx` - Switch toggles
- `slider.tsx` - Range sliders
- `input-otp.tsx` - OTP inputs
- `calendar.tsx` - Date pickers

**Composants spécialisés:**
- `notification-popover.tsx` - Notifications
- `user-dropdown.tsx` - Dropdown utilisateur
- `MapPicker.tsx` - Sélecteur de map
- `ResultsMap.tsx` - Carte de résultats
- `BusinessCard.tsx` - Carte business
- `offer-carousel-products.tsx` - Carousel d'offres produits
- `offers-carousel-business.tsx` - Carousel d'offres business
- `glowing-ai-chat-assistant.tsx` - Chat IA flottant
- `chatbot-modal.tsx`, `chatbot-trigger.tsx` - Chatbot
- `ai-input-with-search.tsx` - Input IA avec recherche
- `command.tsx` - Command palette
- `context-menu.tsx` - Context menus
- `hover-card.tsx` - Hover cards
- `popover.tsx` - Popovers
- `tooltip.tsx` - Tooltips
- `accordion.tsx` - Accordéons
- `collapsible.tsx` - Collapsibles

**Composants visuels:**
- `blur-fade.tsx` - Animation blur fade
- `dot-pattern.tsx` - Pattern de points
- `gradient-heading.tsx` - Headings avec gradient
- `vertical-image-stack.tsx` - Stack vertical d'images
- `aspect-ratio.tsx` - Aspect ratio containers
- `progress.tsx` - Progress bars
- `separator.tsx` - Séparateurs
- `scroll-area.tsx` - Scroll areas personnalisés
- `resizable.tsx` - Éléments redimensionnables
- `mac-os-dock.tsx` - Mac OS dock style
- `toggle-group.tsx` - Toggle groups
- `logo-carousel.tsx` - Carousel de logos
- `testimonials.tsx` - Testimonials section
- `sponsors.tsx` - Sponsors section
- `trending-artists.tsx`, `artists-column.tsx` - Artists sections

**Utilitaires UI:**
- `kbd.tsx` - Keyboard keys
- `empty.tsx` - Empty states
- `simple-ui.tsx` - Simple UI elements
- `menubar.tsx` - Menubar
- `share-button.tsx` - Share buttons
- `use-mobile.ts` - Hook mobile detection
- `use-toast.ts` - Toast hook

### components/dashboard/ - Composants Dashboard (10+ fichiers)
**Fichiers principaux:**
- `AccountSection.tsx` - Section compte
- `UploadProgressManager.tsx` - Gestion des uploads
- Et autres composants spécialisés au dashboard

**Fonctionnalités:**
- Gestion des uploads de fichiers
- Sections d'informations
- Widgets de statistiques

### components/messaging/ - Composants Messagerie (5+ fichiers)
**Fichiers principaux:**
- `MessageBubble.tsx` - Bulles de message
- `ChatHeads.tsx` - Têtes de chat flottantes
- `ConversationList.tsx` (presumed) - Liste de conversations

**Fonctionnalités:**
- Chat en temps réel
- Messages groupés
- Notifications de messages

### components/notifications/ - Composants Notifications (3+ fichiers)
**Fichiers principaux:**
- `AINotificationTrigger.tsx` - Déclencheur de notifications IA
- `NotificationCenter.tsx` (presumed) - Centre de notifications

**Fonctionnalités:**
- Notifications système
- Notifications IA
- Notifications en temps réel

### components/profile/ - Composants Profil (6+ fichiers)
**Fichiers principaux:**
- `profile-header.tsx` - En-tête de profil
- `profile-stats.tsx` - Statistiques du profil
- `profile-tabs.tsx` - Onglets du profil
- `review-card.tsx` - Carte de review
- `order-card.tsx` - Carte de commande
- `empty-state.tsx` - État vide
- `activity-item.tsx` - Élément d'activité
- `UserReservationsList.tsx` - Liste des réservations

**Fonctionnalités:**
- Affichage du profil
- Historique des commandes
- Avis et commentaires
- Statistiques utilisateur

### components/search/ - Composants Recherche (3+ fichiers)
**Fichiers principaux:**
- `SearchFilters.tsx` - Filtres de recherche avancés
- `SearchResults.tsx` (presumed) - Affichage des résultats
- Composants de filtrage spécifiques

**Fonctionnalités:**
- Filtrage multi-critères
- Facettes de recherche
- Paramètres avancés

### components/checkout/ - Composants Checkout (5+ fichiers)
**Fonctionnalités:**
- Processus de commande
- Panier d'achat
- Paiement

### components/reservation/ - Composants Réservation (3+ fichiers)
**Fichiers principaux:**
- `BookingForm.tsx` (presumed) - Formulaire de booking
- `BusinessReservationSidebar.tsx` - Sidebar de réservation
- Calendrier de disponibilités

**Fonctionnalités:**
- Formulaire de réservation
- Sélection de créneaux
- Confirmation de booking

### components/feed/ - Composants Feed (3+ fichiers)
**Fonctionnalités:**
- Feed social
- Affichage des stories
- Timeline d'activités

### components/discover/ - Composants Découverte (2+ fichiers)
**Fonctionnalités:**
- Parcourir les contenus
- Recommandations

### components/shop/ - Composants Shop (2+ fichiers)
**Fonctionnalités:**
- Affichage du catalogue
- Shopping cart

### components/ai-agent/ - Composants IA Agent (2+ fichiers)
**Fichiers principaux:**
- `AIAgent.tsx` - Agent IA principal
- Chat avec IA

**Fonctionnalités:**
- Assistant IA conversationnel
- Recommendations IA
- Réponses intelligentes

### Components Root (30+ fichiers)
**Composants majeurs:**
- `Navbar.tsx` - Navigation principale
- `Footer.tsx` - Pied de page
- `AuthCard.tsx` - Carte d'authentification
- `BackgroundScene.tsx` - Scène 3D en arrière-plan
- `LoginForm.tsx` - Formulaire de connexion
- `SignUpForm.tsx` - Formulaire d'inscription
- `ProductCard.tsx` - Carte produit
- `ServiceCard.tsx` - Carte service
- `BusinessItemsList.tsx` - Liste d'items du business
- `BusinessImageGallery.tsx` - Galerie d'images
- `BusinessStories.tsx` - Stories du business
- `BusinessReservationSidebar.tsx` - Sidebar réservations
- `BusinessGallerySection.tsx` - Section galerie
- `ReviewModal.tsx` - Modal d'avis
- `WriteReviewButton.tsx` - Bouton d'avis
- `NavbarWriteReviewButton.tsx` - Bouton avis navbar
- `FavoriteButton.tsx` - Bouton favoris
- `FollowButton.tsx` - Bouton follow
- `ShareBusinessButton.tsx` - Bouton partage
- `CameraCapture.tsx` - Capture caméra
- `GlobalActionDrawer.tsx` - Drawer d'actions globales
- `OffersCarouselDemo.tsx` - Carousel d'offres
- `OffersCarouselDemoBusiness.tsx` - Carousel d'offres business
- `Offers.tsx` - Section d'offres
- `ShortAdsSection.tsx` - Section d'annonces courtes
- `SmartStrip.tsx` - Bande intelligente
- `SnapchatReels.tsx` - Reels Snapchat
- `SponsorsDemo.tsx` - Démo sponsors
- `StorageUploadDiagnostic.tsx` - Diagnostic d'upload
- `StoreAnalyticsTracker.tsx` - Tracker d'analytics
- `story-demo.tsx` - Démo stories
- `TrendingArtists.tsx` - Artists tendance
- `Hero.tsx` - Section hero
- `PromotionBanner.tsx` - Bannière de promotion
- `ProductOrderCard.tsx` - Carte de commande produit
- `session-provider.tsx` - Session provider
- `theme-provider.tsx` - Theme provider
- `ourClients.tsx` - Clients

**Hooks utilisés:**
- `hooks/useVoiceSearch.ts` - Recherche vocale
- `hooks/useSmartSearch.ts` - Recherche intelligente
- `hooks/useMessaging.ts` - Messagerie
- `hooks/useNotifications.ts` - Notifications
- `hooks/useTracking.ts` - Tracking d'événements
- `hooks/useAdvancedSearch.ts` - Recherche avancée
- `hooks/useDarija.ts` - Support Darija

## 🔗 CHAÎNES D'IMPORTATION PRINCIPALES

### Pattern 1: APP PAGE → LIB ACTIONS → SUPABASE
```
app/dashboard/[id]/page.tsx
  ├→ lib/actions/overviews.ts (getDashboardOverview)
  │   └→ lib/supabase/server.ts (createClient)
  ├→ lib/actions/items.ts (getAdminItemsByStoreId)
  ├→ lib/actions/orders.ts (getStoreOrders)
  └→ Components: StatCard, Charts (Recharts)
```

### Pattern 2: APP PAGE → MULTIPLE LIB ACTIONS
```
app/profile/user/page.tsx
  ├→ lib/actions/profile.ts (getUserProfileData)
  ├→ lib/actions/users.ts (updateProfile, updateAvatar)
  ├→ lib/actions/auth.ts (sendPasswordResetEmail)
  ├→ lib/actions/favorites.ts (toggleSaveAction)
  └→ Components: ProfileHeader, ProfileTabs, ReviewCard
```

### Pattern 3: SEARCH PAGE → SEARCH SERVICE + COMPONENTS
```
app/search/page.tsx
  ├→ lib/actions/search.ts (searchStores, searchItems, doGlobalSemanticSearch)
  ├→ lib/actions/addbuss.ts (searchUnified)
  ├→ hooks/useTracking.ts (event tracking)
  └→ Components: SearchFilters, ProductCard, ServiceCard, ResultsMap
```

### Pattern 4: MERCHANTS PAGE → PUBLIC DATA + COMPONENTS
```
app/merchants/business/[id]/page.tsx
  ├→ lib/actions/business.ts (getBusinessById)
  ├→ lib/actions/reviews.ts (getReviewsByStoreId)
  ├→ lib/actions/items.ts (getPublicItemsByStoreId)
  ├→ lib/actions/stories.ts (getBusinessStories)
  └→ Components: BusinessImageGallery, BusinessItemsList, ReviewCard
```

### Pattern 5: COMPONENTS → SUB-COMPONENTS + LIB HOOKS
```
Navbar.tsx
  ├→ hooks/useVoiceSearch.ts
  ├→ hooks/useSmartSearch.ts
  ├→ hooks/useMessaging.ts
  ├→ hooks/useNotifications.ts
  ├→ lib/store/use-saves-store.ts (Zustand store)
  ├→ lib/store/use-cart-store.ts (Zustand store)
  └→ Sub-components: NotificationPopover, UserDropdown, CategoryMenu

Component.tsx
  ├→ UI Components: Button, Card, Input, etc.
  ├→ LIB: lib/utils.ts (cn function, helpers)
  └→ LIB: lib/utils/avatar.ts (getAvatarUrl)
```

---

## 📊 DÉPENDANCES LIB LES PLUS UTILISÉES

### Top 10 LIB Imports dans APP:
1. **lib/actions/search.ts** - Recherche globale (6+ pages)
2. **lib/actions/items.ts** - Gestion produits (6+ pages)
3. **lib/actions/orders.ts** - Commandes (5+ pages)
4. **lib/actions/overviews.ts** - Dashboard overview (4+ pages)
5. **lib/actions/reviews.ts** - Avis clients (4+ pages)
6. **lib/supabase/client.ts** - Client Supabase (8+ pages)
7. **lib/actions/profile.ts** - Profils utilisateurs (3+ pages)
8. **lib/utils.ts** - Utilitaires généraux (6+ pages)
9. **lib/actions/reservation.ts** - Réservations (4+ pages)
10. **lib/actions/reels.ts** - Gestion reels (3+ pages)

### Top Libraries Externes:
1. **next/navigation** - Routing et navigation
2. **react** - Core React (useState, useEffect, etc.)
3. **framer-motion** - Animations avancées
4. **lucide-react** - Icônes SVG
5. **recharts** - Graphiques et charts
6. **sonner** - Toast notifications
7. **zustand** - State management
8. **@radix-ui** - Composants UI primitifs
9. **class-variance-authority** - CSS variants
10. **tailwindcss** - Styling

---

## 🎯 PATTERNS D'ARCHITECTURE OBSERVÉS

### 1. **Server-Side Data Fetching Pattern**
```
Page.tsx ('use client')
  ├→ useEffect(() => fetchData())
  ├→ useState for local state
  └→ Server Action from lib/actions/
      └→ createClient() from lib/supabase/server.ts
```

### 2. **Component Composition Pattern**
- Pages importent des composants UI simples
- Composants composés pour des fonctionnalités complexes
- Sub-components pour la réutilisabilité

### 3. **State Management Pattern**
- **Local State**: useState pour l'UI locale
- **Global State**: Zustand stores (saves, cart)
- **Context**: SessionProvider, UploadContext
- **Server State**: React Server Components via lib/actions

### 4. **Navigation Pattern**
- Client-side routing avec useRouter
- Dynamic routes avec [id] et [code]
- Search params pour filters

### 5. **Form Pattern**
- Controlled components avec useState
- Server Actions pour submissions
- Toast notifications pour feedback

---

## 📈 STATISTIQUES D'UTILISATION DES IMPORTS

### Imports LIB par Type:
- **lib/actions/** → ~60% des imports (logique métier)
- **lib/supabase/** → ~15% des imports (base de données)
- **lib/utils/** → ~10% des imports (utilitaires)
- **lib/store/** → ~5% des imports (state management)
- **lib/hooks/** → ~5% des imports (logique réutilisable)
- **lib/context/** → ~3% des imports (providers globaux)
- **lib/dashboard/** → ~2% des imports (logique dashboard)

### Composants les Plus Réutilisés:
1. **Button** - 50+ utilisations
2. **Card** - 40+ utilisations
3. **Input** - 35+ utilisations
4. **Dialog** - 25+ utilisations
5. **ProductCard** - 20+ utilisations
6. **Navbar** - 30+ pages
7. **Footer** - 25+ pages

---

## 🚨 ZONES DE COMPLEXITÉ IDENTIFIÉES

### 1. **Dashboard Layout** (HIGH COMPLEXITY)
- Combinaison de plusieurs states
- Interaction avec 10+ lib/actions
- Gestion du sidebar, search, uploads
- ~300 lignes de code

### 2. **Search Page** (HIGH COMPLEXITY)
- Filtrage multi-critères
- Recherche sémantique IA
- Carte interactive
- Comparaison de produits
- ~400 lignes de code

### 3. **Profile User Page** (HIGH COMPLEXITY)
- Multiples tabs (orders, reviews, favorites, settings)
- Upload d'avatar
- Suppression de compte
- Edition de profil
- ~500 lignes de code

### 4. **Merchant Business Page** (MEDIUM COMPLEXITY)
- Fetching de multiples data sources
- Affichage de galerie, items, avis, promotions
- Booking sidebar
- ~350 lignes de code

---

## ✅ BONNES PRATIQUES OBSERVÉES

1. ✅ **Séparation des responsabilités** - Pages vs Components
2. ✅ **Code splitting avec dynamic()** - Pour BackgroundScene, MapPicker
3. ✅ **Type safety** - Interfaces bien définies
4. ✅ **Error handling** - Try-catch avec toast notifications
5. ✅ **Loading states** - Skeleton, spinner, useTransition
6. ✅ **Responsive design** - Tailwind utilities
7. ✅ **Accessibility** - Aria labels, semantic HTML
8. ✅ **Performance** - Memoization, lazy loading

---

## ⚠️ POINTS D'OPTIMISATION POTENTIELS

1. **Lazy Load Components** - Certains composants pourraient être dynamic()
2. **Memoization** - Ajouter React.memo() pour les composants coûteux
3. **Query Caching** - Implémenter SWR ou React Query pour cacher les requêtes
4. **Code Splitting** - Diviser de grandes pages en plus petits chunks
5. **Image Optimization** - Utiliser next/image pour optimiser les images
6. **Bundle Size** - Analyser et réduire les dépendances inutiles

---

## 📋 FICHIERS À INVESTIGUER EN PRIORITÉ

### Pages Complexes:
- [ ] `app/dashboard/[id]/layout.tsx` (Sidebar complexity)
- [ ] `app/search/page.tsx` (Search logic)
- [ ] `app/profile/user/page.tsx` (Multi-tab management)
- [ ] `app/merchants/business/[id]/page.tsx` (Data fetching)

### Composants Critiques:
- [ ] `components/Navbar.tsx` (Global navigation)
- [ ] `components/dashboard/UploadProgressManager.tsx` (Upload handling)
- [ ] `components/ai-agent/AIAgent.tsx` (IA integration)
- [ ] `components/messaging/ChatHeads.tsx` (Real-time messaging)

### Fichiers LIB Critiques:
- [ ] `lib/actions/search.ts` - Semantic search logic
- [ ] `lib/actions/items.ts` - Product management
- [ ] `lib/actions/overviews.ts` - Dashboard aggregation
- [ ] `lib/store/*.ts` - State management

---

## 🎓 RÉSUMÉ FINAL

### Architecture Frontend:
```
┌─────────────────────────────────────────────────────────┐
│                    NEXTJS APP ROUTER                    │
├─────────────────────────────────────────────────────────┤
│  Pages (37 files) - 'use client' components            │
│  ├─ Dashboard, Profile, Search, Merchants, etc.        │
│  └─ Fetch data via lib/actions                         │
├─────────────────────────────────────────────────────────┤
│  Components (192 files) - Reusable UI blocks           │
│  ├─ UI Components (74) - Generic UI building blocks    │
│  ├─ Feature Components (100+) - Page-specific          │
│  └─ Hooks (5+) - Custom logic                          │
├─────────────────────────────────────────────────────────┤
│  LIB Layer - Business Logic                            │
│  ├─ lib/actions/ (35+) - Server actions                │
│  ├─ lib/supabase/ - Database clients                   │
│  ├─ lib/store/ - Zustand state                         │
│  └─ lib/utils/ - Utilities & helpers                   │
├─────────────────────────────────────────────────────────┤
│  External Libraries                                     │
│  ├─ React & Next.js                                    │
│  ├─ Tailwind CSS & Radix UI                            │
│  ├─ Framer Motion & Recharts                           │
│  └─ Supabase & Zustand                                 │
└─────────────────────────────────────────────────────────┘
```

### Données Principales:
- **Total App Files**: 37 (sans API)
- **Total Components**: 192
- **UI Components Génériques**: 74
- **Features Components**: 100+
- **Custom Hooks**: 5+
- **State Management**: Zustand + Context
- **Database**: Supabase avec Server Actions

### Flux de Données:
1. **User Interaction** → Page 'use client'
2. **State Update** → Local useState ou Zustand
3. **API Call** → lib/actions Server Action
4. **Database** → Supabase via lib/supabase/
5. **Response** → Update state → Re-render

---

*Rapport généré: 2026-06-06*
