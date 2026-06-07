# 📊 WORKFLOWS & DIAGRAMS - FILES MAPPING

## 🎯 Mapping des Diagrammes de Séquence aux Fichiers App & Lib

---

## 1️⃣ **RECHERCHE DARIJA** (Semantic Search in Darija)
### 🔄 Workflow:
`Client écrit requête en Darija → Convertit en vecteur → LLM → BaseVectorielle → BaseDonnées → Résultats`

### 📄 **Fichiers APP:**
- **[app/search/page.tsx](app/search/page.tsx)** - Page de recherche principale
  - Imports: `doGlobalSemanticSearch`, `searchStores`, `searchItems`, `useTracking`
  - Hooks: `useState`, `useEffect`, `useSearchParams`, `useTransition`

### 📚 **Fichiers LIB:**
- **`@/lib/actions/search.ts`** - Semantic search functions
  - `doGlobalSemanticSearch()` - Search in Darija
  - `searchStores()` - Search businesses
  - `searchItems()` - Search products
  
- **`@/lib/actions/items.ts`** - Items retrieval
- **`@/lib/supabase/client.ts`** - Supabase client
- **`@/lib/hooks/useTracking.ts`** - Analytics tracking

### 🔧 **Fonctions Clés:**
- `doGlobalSemanticSearch()` - Appel LLM + recherche vectorielle
- `searchStores()` - Recherche commerces
- `searchItems()` - Recherche produits

---

## 2️⃣ **AJOUTER AU PANIER** (Add to Cart)
### 🔄 Workflow:
`Client consulte produit/service → Choix type → Ajouter panier → Validation → Réserver/Commander`

### 📄 **Fichiers APP:**
- **[app/merchants/product/[id]/page.tsx](app/merchants/product/[id]/page.tsx)** - Page produit
  - Imports: `getProductById`, `getProductReviews`, `getRelatedItems`
  
- **[app/merchants/service/[id]/page.tsx](app/merchants/service/[id]/page.tsx)** - Page service
  - Imports: `getServiceById`, `getServiceReviews`, `getRelatedItems`

- **[app/profile/cart/page.tsx](app/profile/cart/page.tsx)** - Panier
  - Imports: `cn` (styling)
  - Hooks: `useState`, `useEffect`, `useRouter`

### 📚 **Fichiers LIB:**
- **`@/lib/stores/use-cart-store.ts`** - Cart state management
  - `addToCart()` - Ajouter au panier
  - `removeFromCart()` - Retirer du panier
  - `clearCart()` - Vider le panier

- **`@/lib/actions/product_detail.ts`** - Product details
  - `getProductById()`
  - `getProductReviews()`
  - `getRelatedItems()`

- **`@/lib/actions/service_detail.ts`** - Service details
  - `getServiceById()`
  - `getServiceReviews()`
  - `getRelatedItems()`

- **`@/lib/actions/orders.ts`** - Order management
  - `createOrder()` - Créer commande

- **`@/lib/actions/reservation.ts`** - Booking management
  - `createReservation()` - Créer réservation

### 🔧 **Fonctions Clés:**
- `addToCart()` - State Zustand
- `createOrder()` - Backend
- `createReservation()` - Backend (pour services)

---

## 3️⃣ **RECOMMANDATION IA** (AI Recommendation)
### 🔄 Workflow:
`Commerçant ouvre "Promotions" → Clic "Recommandation IA" → Analyse ventes globales → Suggestion → Affiche recommandation`

### 📄 **Fichiers APP:**
- **[app/dashboard/[id]/page.tsx](app/dashboard/[id]/page.tsx)** - Dashboard overview
  - Imports: `getDashboardOverview`, `isStoreDashboardLocked`
  - Section: AI Recommendations visible

- **[app/dashboard/[id]/intelligence/page.tsx](app/dashboard/[id]/intelligence/page.tsx)** - AI Intelligence page
  - Imports: `getReviewsByStoreId`, `respondToReview`, `getStoreReelComments`
  - Hooks: `useState`, `useEffect`, `useRouter`, `useMemo`

### 📚 **Fichiers LIB:**
- **`@/lib/actions/overviews.ts`** - Dashboard data
  - `getDashboardOverview()` - Ventes globales

- **`@/lib/ai/recommendations.ts`** - AI engine for recommendations
  - `generatePromotionRecommendation()` - Suggest promotions
  - `analyzeStoreMetrics()` - Analyze store performance

- **`@/lib/supabase/client.ts`** - Database
- **`@/lib/google-ai.ts`** - Google Generative AI integration

### 🔧 **Fonctions Clés:**
- `generatePromotionRecommendation()` - IA recommendation
- `getDashboardOverview()` - Get store metrics
- `analyzeStoreMetrics()` - Analysis engine

---

## 4️⃣ **CRÉER PRODUIT** (Add Product with IA Validation)
### 🔄 Workflow:
`Commerçant Parle/écrit en Darija → Transcription + extraction → LLM → Recherche catégorie → Vérif prix → Enregistrement produit`

### 📄 **Fichiers APP:**
- **[app/dashboard/[id]/products/page.tsx](app/dashboard/[id]/products/page.tsx)** - Products management
  - Imports: `getAdminItemsByStoreId`, `upsertItem`, `deleteItem`, `uploadToCloudinary`
  - Hooks: `useState`, `useEffect`, `useTransition`, `useCallback`
  - Lines: 800+ (complex form)

### 📚 **Fichiers LIB:**
- **`@/lib/actions/items.ts`** - Item management
  - `upsertItem()` - Create/update product
  - `deleteItem()` - Delete product
  - `getAdminItemsByStoreId()` - Get store products

- **`@/lib/ai/darija-voice.ts`** - Voice to text
  - `transcribeDarija()` - Transcribe voice in Darija
  - `extractProductInfo()` - Extract name, price from text

- **`@/lib/google-ai.ts`** - LLM
  - `suggestCategory()` - Suggest product category
  - `validatePrice()` - Price validation

- **`@/lib/cloudinary.ts`** - File upload
  - `uploadToCloudinary()` - Upload product image/video

- **`@/lib/supabase/client.ts`** - Database

### 🔧 **Fonctions Clés:**
- `transcribeDarija()` - Voice → Text
- `extractProductInfo()` - Extract metadata
- `suggestCategory()` - LLM category
- `upsertItem()` - Save to DB
- `uploadToCloudinary()` - Save media

---

## 5️⃣ **VISION (SEARCH BY IMAGE)** (Image-based Search)
### 🔄 Workflow:
`Client Prend/importe photo → Analyse image → Tags → Recherche vectorielle → Résultats → Affiche liste`

### 📄 **Fichiers APP:**
- **[app/search/page.tsx](app/search/page.tsx)** - Search page
  - Can include image search tab
  - Imports: `doGlobalSemanticSearch`, `searchItems`

- **[app/merchants/business/add/page.tsx](app/merchants/business/add/page.tsx)** - Add business (uses image)
  - Imports: `addBusiness`, `searchUnified`

### 📚 **Fichiers LIB:**
- **`@/lib/vision/image-analyzer.ts`** - Image analysis
  - `analyzeImage()` - Extract tags from image
  - `generateImageVector()` - Convert image to vector

- **`@/lib/actions/search.ts`** - Search
  - `searchByImageTags()` - Search with image tags

- **`@/lib/cloudinary.ts`** - Image upload
  - `uploadImage()` - Upload to Cloudinary

- **`@/lib/supabase/client.ts`** - Vector search

### 🔧 **Fonctions Clés:**
- `analyzeImage()` - VisionIA API
- `generateImageVector()` - Vector generation
- `searchByImageTags()` - DB search

---

## 6️⃣ **GÉOLOCALISATION** (GPS Location Search)
### 🔄 Workflow:
`Ouvre page recherche → Clic flèche localisation → Demande position → Géocode → Coordonnées GPS → Recherche stores + filtre + sémantique`

### 📄 **Fichiers APP:**
- **[app/search/page.tsx](app/search/page.tsx)** - Main search
  - Imports: `searchStores`, `doGlobalSemanticSearch`
  - Hooks: `useState`, `useEffect`, `useSearchParams`
  - Has location picker button

### 📚 **Fichiers LIB:**
- **`@/lib/location/geolocation.ts`** - GPS functions
  - `getGeolocation()` - Get user coordinates
  - `reverseGeocode()` - Coordinates → Address
  - `searchNearbyStores()` - Search in radius

- **`@/lib/actions/search.ts`** - Search
  - `doGlobalSemanticSearch()` - Search with location filter

- **`@/lib/supabase/client.ts`** - PostGIS queries
  - Spatial queries with ST_Distance

### 🔧 **Fonctions Clés:**
- `getGeolocation()` - Browser Geolocation API
- `reverseGeocode()` - GPS to coordinates
- `searchNearbyStores()` - Distance query (PostGIS)

---

## 7️⃣ **VÉRIFICATION QR CODE** (QR Verification)
### 🔄 Workflow:
`Client scanne QR code → Vérifie QR + entité → Alt: QR invalid/expiré → [OK] Statut "Terminé" → Message`

### 📄 **Fichiers APP:**
- **[app/dashboard/[id]/qr-verify/[code]/page.tsx](app/dashboard/[id]/qr-verify/[code]/page.tsx)** - QR verification
  - Imports: `getOrderByTrackingCode`, `updateOrderStatus`, `getBookingByTrackingCode`, `updateBookingStatus`
  - Hooks: `useState`, `useEffect`, `useParams`, `useRouter`

### 📚 **Fichiers LIB:**
- **`@/lib/actions/orders.ts`** - Order management
  - `getOrderByTrackingCode()` - Get order by QR
  - `updateOrderStatus()` - Mark as delivered/completed

- **`@/lib/actions/reservation.ts`** - Booking management
  - `getBookingByTrackingCode()` - Get booking by QR
  - `updateBookingStatus()` - Mark as completed

- **`@/lib/qr/qr-validator.ts`** - QR validation
  - `validateQRCode()` - Check QR validity
  - `decodeQRCode()` - Decode tracking code

- **`@/lib/supabase/client.ts`** - Database

### 🔧 **Fonctions Clés:**
- `validateQRCode()` - Verify QR
- `getOrderByTrackingCode()` - Fetch order
- `updateOrderStatus()` - Mark completed

---

## 8️⃣ **INSCRIPTION** (Registration/Email Verification)
### 🔄 Workflow:
`Saisit email, mot de passe → Vérifie email non utilisé → [Email déjà utilisé] Alt → Envoie lien verification → Clic lien → Active compte → "Compte actif"`

### 📄 **Fichiers APP:**
- **[app/register/page.tsx](app/register/page.tsx)** - Registration form
  - Imports: `cn` (styling)
  - Hooks: `useState`, `useRouter`, `useTransition`

### 📚 **Fichiers LIB:**
- **`@/lib/actions/auth.ts`** - Authentication
  - `registerUser()` - Create user account
  - `sendVerificationEmail()` - Send verification link
  - `verifyEmail()` - Activate account after email click
  - `checkEmailExists()` - Check if email already used

- **`@/lib/supabase/client.ts`** - Database + Auth
- **`@/lib/email/verification.ts`** - Email verification
  - `generateVerificationToken()` - Create unique token
  - `validateToken()` - Check token validity

### 🔧 **Fonctions Clés:**
- `checkEmailExists()` - Validation
- `registerUser()` - Create account
- `sendVerificationEmail()` - Email service
- `verifyEmail()` - Activate account

---

## 9️⃣ **CONNEXION** (Login - Multi-method)
### 🔄 Workflow:
`Choisit méthode → [Email+password ou Magic Link] → Saisit email+password → Vérifie identifiants → Crée session → Connexion réussie`

### 📄 **Fichiers APP:**
- **[app/login/page.tsx](app/login/page.tsx)** - Login form
  - Imports: `cn` (styling)
  - Hooks: `useState`, `useRouter`, `useTransition`, `useEffect`
  - Auth options: Email/Password, Google OAuth, Magic Link

### 📚 **Fichiers LIB:**
- **`@/lib/actions/auth.ts`** - Auth functions
  - `loginWithPassword()` - Email+password login
  - `sendMagicLink()` - Send magic link email
  - `loginWithMagicLink()` - Login via token
  - `loginWithGoogle()` - OAuth login
  - `createSession()` - Create auth session

- **`@/lib/supabase/client.ts`** - Supabase Auth
- **`@/lib/email/magic-link.ts`** - Magic link service
- **`@/lib/session-provider.ts`** - Session management

### 🔧 **Fonctions Clés:**
- `loginWithPassword()` - Credentials check
- `sendMagicLink()` - Email link
- `createSession()` - Session creation
- `loginWithGoogle()` - OAuth flow

---

## 🔟 **DEMANDE VENDEUR** (Vendor Approval Request)
### 🔄 Workflow:
`Vendeur Remplit formulaire + télécharge logo → Enregistre demande (status "En attente") → Admin examine → [Approuvé: status→"Active", role→Business Owner] ou [Refusé: status→"Refusée"]`

### 📄 **Fichiers APP:**
- **[app/merchants/business/add/page.tsx](app/merchants/business/add/page.tsx)** - Add business
  - Imports: `addBusiness`, `searchUnified`
  - Hooks: `useState`, `useRouter`, `useTransition`, `useEffect`

### 📚 **Fichiers LIB:**
- **`@/lib/actions/addbuss.ts`** - Business creation
  - `addBusiness()` - Submit business request
  - `searchUnified()` - Verify not duplicate

- **`@/lib/actions/auth.ts`** - Auth management
  - `updateUserRole()` - Set role to "Business Owner"

- **`@/lib/cloudinary.ts`** - File upload
  - `uploadLogo()` - Upload business logo

- **`@/lib/supabase/client.ts`** - Database
  - Status: "pending" → "approved" or "rejected"

- **`@/lib/admin/vendor-approvals.ts`** - Admin functions
  - `getPendingVendorRequests()` - List pending
  - `approveVendorRequest()` - Approve vendor
  - `rejectVendorRequest()` - Reject vendor

### 🔧 **Fonctions Clés:**
- `addBusiness()` - Create request
- `approveVendorRequest()` - Admin approval
- `rejectVendorRequest()` - Admin rejection
- `updateUserRole()` - Set Business Owner role

---

## 1️⃣1️⃣ **TABLEAU DE BORD ADMIN** (Admin Dashboard - Vendor Approval)
### 🔄 Workflow:
`Admin accède tableau de bord → Affiche liste demandes → Examine une demande → [Approuve: status→"approuvé"] ou [Refuse: status→"refusée"]`

### 📄 **Fichiers APP:**
- **[app/dashboard/[id]/layout.tsx](app/dashboard/[id]/layout.tsx)** - Dashboard layout
  - For admin: Shows vendor requests
  - Imports: `getSidebarStats`, `createClient`, `getUserProfile`

- Admin-specific page (if exists):
  - `app/admin/vendor-requests/page.tsx` (likely)

### 📚 **Fichiers LIB:**
- **`@/lib/admin/vendor-approvals.ts`** - Admin operations
  - `getPendingVendorRequests()` - List pending vendors
  - `getVendorRequestDetails()` - Get request details
  - `approveVendorRequest()` - Approve
  - `rejectVendorRequest()` - Reject

- **`@/lib/actions/overviews.ts`** - Dashboard data
  - `getSidebarStats()` - Show pending count

- **`@/lib/supabase/client.ts`** - Database

### 🔧 **Fonctions Clés:**
- `getPendingVendorRequests()` - Get pending list
- `approveVendorRequest()` - Approve vendor
- `rejectVendorRequest()` - Reject vendor
- `updateStoreStatus()` - Activate store

---

## 1️⃣2️⃣ **ADMIN AJOUTER PRODUIT** (Admin Add Product)
### 🔄 Workflow:
`Admin Saisit détails produit → Enregistre nouveau produit → "Produit ajouté avec succès"`

OR

`Modifie informations → Met à jour données produit → "Produit mis à jour"`

OR

`Demande suppression → Supprime (ou désactivation) → "Produit supprimé"`

### 📄 **Fichiers APP:**
- **[app/dashboard/[id]/products/page.tsx](app/dashboard/[id]/products/page.tsx)** - Products management
  - Admin can add/edit/delete products
  - Imports: `getAdminItemsByStoreId`, `upsertItem`, `deleteItem`
  - Hooks: `useState`, `useTransition`

### 📚 **Fichiers LIB:**
- **`@/lib/actions/items.ts`** - Item management
  - `upsertItem()` - Create/update product
  - `deleteItem()` - Delete product
  - `getAdminItemsByStoreId()` - Get store products

- **`@/lib/supabase/client.ts`** - Database

### 🔧 **Fonctions Clés:**
- `upsertItem()` - Create/update
- `deleteItem()` - Delete/deactivate
- `getAdminItemsByStoreId()` - Fetch products

---

## 1️⃣3️⃣ **ADMIN CRÉER PROMOTION** (Admin Create Promotion)
### 🔄 Workflow:
`Admin Définit promotion (code, remise, dates) → Enregistre nouvelle promotion → "Promotion créée avec succès"`

OR

`Modifie conditions → Met à jour promotion → "Promotion mise à jour"`

OR

`Demande suppression → Supprime ou désactive promotion → "Promotion supprimée"`

### 📄 **Fichiers APP:**
- Likely: `app/dashboard/[id]/promotions/page.tsx` (not in main list yet)
- Or part of **[app/dashboard/[id]/page.tsx](app/dashboard/[id]/page.tsx)**

### 📚 **Fichiers LIB:**
- **`@/lib/actions/promotions.ts`** - Promotion management
  - `createPromotion()` - Create promotion
  - `updatePromotion()` - Update promotion
  - `deletePromotion()` - Delete promotion
  - `getStorePromotions()` - Get store promotions

- **`@/lib/supabase/client.ts`** - Database

### 🔧 **Fonctions Clés:**
- `createPromotion()` - Create
- `updatePromotion()` - Update
- `deletePromotion()` - Delete
- `validatePromotionCode()` - Check code uniqueness

---

## 1️⃣4️⃣ **AVIS/REVIEW** (Leave Review)
### 🔄 Workflow:
`Client Saisit Note (1-5) + commentaire → Enregistre avis → Analyse sentiment (LLM) → Met à jour avis → "Merci pour votre avis"`

### 📄 **Fichiers APP:**
- **[app/merchants/product/[id]/page.tsx](app/merchants/product/[id]/page.tsx)** - Product page
  - Can leave review
  - Imports: `getProductReviews`

- **[app/merchants/business/[id]/page.tsx](app/merchants/business/[id]/page.tsx)** - Business page
  - Can leave review
  - Imports: `getReviewsByStoreId`

- **[app/dashboard/[id]/social/page.tsx](app/dashboard/[id]/social/page.tsx)** - Reviews moderation
  - Imports: `getReviewsByStoreId`, `respondToReview`

### 📚 **Fichiers LIB:**
- **`@/lib/actions/reviews.ts`** - Review management
  - `createReview()` - Submit review
  - `getReviewsByStoreId()` - Get store reviews
  - `getProductReviews()` - Get product reviews
  - `respondToReview()` - Reply to review

- **`@/lib/ai/sentiment-analysis.ts`** - Sentiment analysis
  - `analyzeSentiment()` - LLM sentiment analysis
  - `extractScore()` - Extract sentiment score

- **`@/lib/supabase/client.ts`** - Database

### 🔧 **Fonctions Clés:**
- `createReview()` - Submit review
- `analyzeSentiment()` - LLM analysis
- `updateReviewWithScore()` - Save sentiment score
- `respondToReview()` - Reply to review

---

## 1️⃣5️⃣ **DÉTECTION FRAUDE** (Fraud Detection)
### 🔄 Workflow:
`Commerçant Ouvre "Customer Actions" → Charge demandes en attente → Choisit une demande → Analyse fraude (détecteur de fraude) → Résultat analyse (score fraude) → [Refuser] Alt → [Accepter: Génère QR code → Associe QR → Service QR → Client "Accepté, QR envoyé"]`

### 📄 **Fichiers APP:**
- **[app/dashboard/[id]/leads/page.tsx](app/dashboard/[id]/leads/page.tsx)** - Leads/Customer Actions
  - Imports: `getLeadActions`, `updateOrderStatus`, `updateBookingStatus`, `blockUser`
  - Hooks: `useState`, `useEffect`, `useTransition`

### 📚 **Fichiers LIB:**
- **`@/lib/actions/leads.ts`** - Lead management
  - `getLeadActions()` - Get pending orders/bookings
  - `getLeadDetails()` - Get lead details

- **`@/lib/fraud-detection.ts`** - Fraud detection
  - `analyzeFraud()` - Call fraud detection API
  - `calculateFraudScore()` - Get fraud score
  - `getFraudRiskLevel()` - Classify risk level

- **`@/lib/qr/qr-generator.ts`** - QR code
  - `generateQRCode()` - Create QR for order/booking
  - `generateTrackingCode()` - Create tracking token

- **`@/lib/actions/orders.ts`** - Order update
  - `updateOrderStatus()` - Accept/Reject order

- **`@/lib/supabase/client.ts`** - Database

### 🔧 **Fonctions Clés:**
- `getLeadActions()` - Get pending actions
- `analyzeFraud()` - Call fraud API
- `calculateFraudScore()` - Score computation
- `generateQRCode()` - Create QR
- `updateOrderStatus()` - Accept/Reject

---

## 1️⃣6️⃣ **SUPPORT TICKETS** (Support Messaging)
### 🔄 Workflow:
`Commerçant Clique "Envoyer un message" → Crée canal chat dédié au ticket → Écrit message → Enregistre → Diffuse → Nouveau message support + Dashboard → Affiche échange → Répond → Peut clore le ticket`

### 📄 **Fichiers APP:**
- **[app/dashboard/[id]/support/tickets/page.tsx](app/dashboard/[id]/support/tickets/page.tsx)** - Support tickets
  - Imports: `createSupportTicket`, `deleteTicket`, `updateTicket`, `getStoreTickets`, `getTicketMessages`
  - Hooks: `useState`, `useEffect`, `useMessaging()`, `useRealtimeUpdates`

- **[app/messages/page.tsx](app/messages/page.tsx)** - Messaging interface (real-time)
  - Imports: `getFriendshipStatus`, `getUserProfile`
  - Hooks: `useSearchParams`, `useMessaging`, `useEffect`

### 📚 **Fichiers LIB:**
- **`@/lib/actions/support.ts`** - Support management
  - `createSupportTicket()` - Create ticket
  - `getStoreTickets()` - Get store tickets
  - `getTicketMessages()` - Get ticket messages
  - `updateTicket()` - Update ticket status
  - `deleteTicket()` - Delete ticket

- **`@/lib/hooks/useMessaging.ts`** - Real-time messaging
  - `useMessaging()` - Real-time message hook
  - `subscribeToMessages()` - Listen for new messages
  - `sendMessage()` - Send message

- **`@/lib/supabase/client.ts`** - Database + Realtime
  - Supabase Realtime for live updates

### 🔧 **Fonctions Clés:**
- `createSupportTicket()` - Create ticket
- `sendMessage()` - Send message
- `subscribeToMessages()` - Listen realtime
- `updateTicket()` - Update status

---

## 1️⃣7️⃣ **CRÉER REEL** (Create Reel/Video)
### 🔄 Workflow:
`Commerçant Ouvre "Créer Reel" → Interface (upload ou caméra) → [Upload fichier] ou [Capture vidéo] → Barre progression 0% → Envoie fichier → [Mise à jour] loop: Progression x% → Mis à jour barre → Upload terminé (100%) + URL → Enregistre Reel → "Reel publié"`

### 📄 **Fichiers APP:**
- **[app/dashboard/[id]/reels/page.tsx](app/dashboard/[id]/reels/page.tsx)** - Reels management
  - Imports: `getBusinessReels`, `deleteReel`, `publishReel`
  - Hooks: `useState`, `useEffect`, `useTransition`, `useCallback`
  - Upload with progress bar

### 📚 **Fichiers LIB:**
- **`@/lib/actions/reels.ts`** - Reel management
  - `publishReel()` - Publish reel
  - `getBusinessReels()` - Get store reels
  - `deleteReel()` - Delete reel
  - `updateReelStatus()` - Update status

- **`@/lib/cloudinary.ts`** - File upload
  - `uploadVideo()` - Upload to Cloudinary
  - `uploadWithProgress()` - Upload with progress callback
  - `generateVideoThumbnail()` - Create thumbnail

- **`@/lib/supabase/client.ts`** - Database
  - Save reel URL after upload

### 🔧 **Fonctions Clés:**
- `uploadVideo()` - Upload to Cloudinary
- `uploadWithProgress()` - Track progress
- `publishReel()` - Save reel DB
- `getBusinessReels()` - List reels

---

## 1️⃣8️⃣ **CRÉER STORY** (Create Story)
### 🔄 Workflow:
`Commerçant Ouvre "Créer Story" → Interface (upload ou caméra) → [Upload fichier] ou [Capture média] → Envoie fichier → [progression] loop: Progression → Mis à jour barre → URL → Enregistre Story + expires_at = now+24h → "Story publiée (24h)"`

### 📄 **Fichiers APP:**
- **[app/dashboard/[id]/stories/page.tsx](app/dashboard/[id]/stories/page.tsx)** - Stories management
  - Imports: `getDashboardStories`, `deleteStory`, `uploadStoryMedia`, `publishStory`
  - Hooks: `useState`, `useEffect`, `useTransition`

### 📚 **Fichiers LIB:**
- **`@/lib/actions/stories.ts`** - Story management
  - `publishStory()` - Publish story
  - `getDashboardStories()` - Get store stories
  - `deleteStory()` - Delete story
  - `uploadStoryMedia()` - Upload media
  - `setStoryExpiration()` - Set 24h expiry

- **`@/lib/cloudinary.ts`** - File upload
  - `uploadImage()` - Upload image
  - `uploadVideo()` - Upload video
  - `uploadWithProgress()` - With progress tracking

- **`@/lib/supabase/client.ts`** - Database
  - Set expires_at = now + 24 hours

### 🔧 **Fonctions Clés:**
- `uploadStoryMedia()` - Upload media
- `publishStory()` - Save story with expiry
- `setStoryExpiration()` - Set 24h timer
- `getDashboardStories()` - List stories

---

## 📊 **SUMMARY TABLE**

| # | Workflow | App Files | Lib Modules | Key Functions |
|---|----------|-----------|-------------|----------------|
| 1 | Recherche Darija | search/page.tsx | search, supabase | doGlobalSemanticSearch() |
| 2 | Ajouter au panier | product/[id], service/[id], cart/page.tsx | items, orders, reservation, cart-store | addToCart(), createOrder() |
| 3 | Recommandation IA | dashboard/page.tsx, intelligence/page.tsx | overviews, ai/recommendations | generatePromotionRecommendation() |
| 4 | Créer produit | dashboard/products/page.tsx | items, ai/darija, cloudinary | upsertItem(), uploadToCloudinary() |
| 5 | Vision (Image) | search/page.tsx | vision, search, cloudinary | analyzeImage(), searchByImageTags() |
| 6 | Géolocalisation | search/page.tsx | location, search, supabase | getGeolocation(), searchNearbyStores() |
| 7 | Vérification QR | dashboard/qr-verify/[code]/page.tsx | orders, reservation, qr | validateQRCode(), updateOrderStatus() |
| 8 | Inscription | register/page.tsx | auth, email, supabase | registerUser(), verifyEmail() |
| 9 | Connexion | login/page.tsx | auth, session | loginWithPassword(), createSession() |
| 10 | Demande Vendeur | merchants/business/add/page.tsx | addbuss, auth, cloudinary | addBusiness(), approveVendorRequest() |
| 11 | Dashboard Admin | dashboard/layout.tsx | admin/vendor-approvals, overviews | getPendingVendorRequests() |
| 12 | Admin Ajouter Produit | dashboard/products/page.tsx | items, supabase | upsertItem(), deleteItem() |
| 13 | Admin Créer Promo | dashboard/page.tsx | promotions, supabase | createPromotion(), updatePromotion() |
| 14 | Avis/Review | merchants/product/[id], dashboard/social/page.tsx | reviews, ai/sentiment | createReview(), analyzeSentiment() |
| 15 | Détection Fraude | dashboard/leads/page.tsx | fraud-detection, qr, orders | analyzeFraud(), generateQRCode() |
| 16 | Support Tickets | dashboard/support/tickets/page.tsx, messages/page.tsx | support, useMessaging, supabase | createSupportTicket(), sendMessage() |
| 17 | Créer Reel | dashboard/reels/page.tsx | reels, cloudinary, supabase | uploadVideo(), publishReel() |
| 18 | Créer Story | dashboard/stories/page.tsx | stories, cloudinary, supabase | uploadStoryMedia(), publishStory() |

---

## 🔑 **KEY PATTERNS**

### 🎯 **Server Actions Pattern:**
```typescript
// In @/lib/actions/xxx.ts
export async function actionFunction(data) {
  'use server';
  // Backend logic
  return result;
}

// In app/page.tsx
const result = await actionFunction(data);
```

### 🎨 **State Management:**
- **Zustand**: Global state (cart, favorites)
- **Context**: Session, Upload
- **useState**: Component-level UI state

### 📡 **Data Fetching:**
- **Server Components**: SSR with direct lib imports
- **Client Components**: useEffect + server actions
- **Real-time**: Supabase Realtime subscriptions

### 🔐 **Authentication:**
- SessionProvider context
- Supabase Auth (JWT tokens)
- Row Level Security (RLS) on DB

---

## 🎯 **NEXT STEPS**

To analyze components:
1. Each App file uses 5-15 components
2. Components are in `/components/` folder (192 files)
3. Components import from `@/lib/` for business logic
4. Consider analyzing component tree for each workflow

---

**Generated**: 2026-06-07
**Version**: 1.0
**Coverage**: 18 major workflows mapped to app and lib files
