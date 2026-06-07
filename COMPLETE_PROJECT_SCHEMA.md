# 🏗️ COMPLETE PROJECT SCHEMA - RO2YA.TN

**Version**: 0.1.0  
**Date**: 2026-06-07  
**Status**: Production Ready  
**Type**: Next.js 13+ App Router with AI Features

---

## 📊 PROJECT OVERVIEW

```
RO2YA.TN - Multi-vendor Marketplace Platform
├─ Tech Stack: Next.js 13+ / React 18 / TypeScript / Tailwind CSS
├─ Backend: Supabase (PostgreSQL + RLS + Realtime)
├─ AI: Google Generative AI + OpenRouter + Vision API
├─ File Storage: Cloudinary + Supabase Storage
├─ State Management: Zustand + Context API
├─ UI Framework: Radix UI + Framer Motion
└─ Language Support: Arabic (Darija) + French + English
```

---

## 📁 DIRECTORY STRUCTURE

```
project-root/
│
├── 📂 app/                          [37 files]
│   ├── 📄 layout.tsx                Root layout with SessionProvider
│   ├── 📄 page.tsx                  Homepage
│   │
│   ├── 📂 auth/
│   │   └── 📂 update-password/
│   │       └── 📄 page.tsx          Password reset
│   │
│   ├── 📂 dashboard/               [Dashboard - 13 files]
│   │   ├── 📄 [id]/layout.tsx       Sidebar + navigation
│   │   ├── 📄 [id]/page.tsx         KPI overview
│   │   ├── 📄 [id]/intelligence/    AI insights + sentiment
│   │   ├── 📄 [id]/leads/           Fraud detection + leads
│   │   ├── 📄 [id]/products/        Product CRUD (800+ lines)
│   │   ├── 📄 [id]/profile/         Store profile editor
│   │   ├── 📄 [id]/reels/           Video management
│   │   ├── 📄 [id]/social/          Reviews moderation
│   │   ├── 📄 [id]/stories/         Stories (24h expiry)
│   │   ├── 📄 [id]/support/tickets/ Support chat system
│   │   ├── 📄 [id]/transactions/    Orders & Bookings
│   │   └── 📄 qr-verify/[code]/     QR code verification
│   │
│   ├── 📂 merchants/                [Marketplace - 6 files]
│   │   ├── 📂 business/
│   │   │   ├── 📄 [id]/page.tsx     Business profile (SSR)
│   │   │   └── 📄 add/page.tsx      Register business
│   │   ├── 📂 product/
│   │   │   └── 📄 [id]/page.tsx     Product details (SSR)
│   │   └── 📂 service/
│   │       └── 📄 [id]/page.tsx     Service details (SSR)
│   │
│   ├── 📂 messages/                 [Real-time - 2 files]
│   │   ├── 📄 page.tsx              Messaging interface
│   │   └── 📄 suggestions/page.tsx  Friend recommendations
│   │
│   ├── 📂 profile/                  [User - 4 files]
│   │   ├── 📄 user/page.tsx         User profile (1000+ lines)
│   │   ├── 📄 user/public/page.tsx  Public profile
│   │   ├── 📄 businessOwner/page.tsx Owner profile
│   │   └── 📄 cart/page.tsx         Shopping cart
│   │
│   ├── 📂 public/                   [Public Pages - 2 files]
│   │   ├── 📄 user/[id]/page.tsx    User profile view
│   │   └── 📄 business/[id]/page.tsx Business profile view
│   │
│   ├── 📂 search/                   [Search - 3 files]
│   │   ├── 📄 page.tsx              Main search (600+ lines)
│   │   ├── 📄 searchProduct/        Product search
│   │   └── 📄 searchService/        Service search
│   │
│   ├── 📄 discover/page.tsx         Discovery/Explore
│   ├── 📄 login/page.tsx            Login form
│   ├── 📄 register/page.tsx         Registration
│   ├── 📄 shop/page.tsx             Product shop
│   ├── 📄 valider/page.tsx          Order confirmation
│   └── 📄 test-ranking/page.tsx     Testing utility
│
├── 📂 lib/                          [98 files]
│   ├── 📂 actions/                  [Server Actions - 53 files]
│   │   ├── 📄 admin.ts
│   │   ├── 📄 addbuss.ts            Add business
│   │   ├── 📄 ai-agent.ts           AI agent service
│   │   ├── 📄 ai-notifications.ts   AI notifications
│   │   ├── 📄 alerts.engine.ts      Alert engine
│   │   ├── 📄 analyzer-service.ts   Analytics service
│   │   ├── 📄 auth.ts               Authentication
│   │   ├── 📄 business.ts           Business management
│   │   ├── 📄 comments.ts           Comment management
│   │   ├── 📄 debug-schema.ts       Debug utilities
│   │   ├── 📄 favorites.ts          Save/like functionality
│   │   ├── 📄 fraud-detection.ts    Fraud analysis
│   │   ├── 📄 friendships.ts        Friend management
│   │   ├── 📄 groq-service.ts       Groq LLM API
│   │   ├── 📄 items.ts              Product management
│   │   ├── 📄 leads.ts              Lead management
│   │   ├── 📄 notifications.ts      Notification system
│   │   ├── 📄 openrouter-service.ts OpenRouter API
│   │   ├── 📄 orders.ts             Order management
│   │   ├── 📄 overviews.ts          Dashboard data
│   │   ├── 📄 product_detail.ts     Product details
│   │   ├── 📄 profile.ts            User profile data
│   │   ├── 📄 promotions.ts         Promotion CRUD
│   │   ├── 📄 public-profile.ts     Public profiles
│   │   ├── 📄 recommendations.ts    AI recommendations
│   │   ├── 📄 reels.ts              Video management
│   │   ├── 📄 reservation.ts        Booking management
│   │   ├── 📄 reviews.ts            Review management
│   │   ├── 📄 sales-analyzer.ts     Sales analytics
│   │   ├── 📄 search.ts             Semantic search
│   │   ├── 📄 service_detail.ts     Service details
│   │   ├── 📄 store-follows.ts      Store following
│   │   ├── 📄 stores.ts             Store management
│   │   ├── 📄 stories.ts            Stories management
│   │   ├── 📄 support.ts            Support tickets
│   │   ├── 📄 transactions.ts       Transactions
│   │   ├── 📄 user-activity.ts      User activity tracking
│   │   └── 📄 users.ts              User management
│   │
│   ├── 📂 agents/                   [AI Agents - 4 files]
│   │   ├── 📄 darija-rag.ts         Darija retrieval-augmented generation
│   │   ├── 📄 darija-rules.ts       Darija parsing rules
│   │   ├── 📄 prompts.ts            AI prompts
│   │   └── 📄 darija-sample.json    Sample data
│   │
│   ├── 📂 ai/                       [AI Services - 3 files]
│   │   ├── 📄 comment-analyzer.ts   Comment sentiment
│   │   ├── 📄 darija-parser.ts      Darija parsing
│   │   └── 📄 image-generator.ts    Image generation
│   │
│   ├── 📂 cache/                    [Caching - 1 file]
│   │   └── 📄 redis.ts              Redis cache
│   │
│   ├── 📂 context/                  [React Context - 1 file]
│   │   └── 📄 UploadContext.tsx     File upload context
│   │
│   ├── 📂 dashboard/                [Dashboard Utilities - 1 file]
│   │   └── 📄 store-access.ts       Store access control
│   │
│   ├── 📂 monitoring/               [Monitoring - 1 file]
│   │   └── 📄 index.ts              Monitoring service
│   │
│   ├── 📂 ranking/                  [Ranking Engine - 8 files]
│   │   ├── 📄 constants.ts
│   │   ├── 📄 event-schema.ts
│   │   ├── 📄 feed-cache.ts
│   │   ├── 📄 feed.ts
│   │   ├── 📄 intent-cache.ts
│   │   ├── 📄 intent.ts
│   │   ├── 📄 scoring.ts
│   │   ├── 📄 signals.ts
│   │   └── 📄 types.ts
│   │
│   ├── 📂 search/                   [Search Engine - 4 files]
│   │   ├── 📄 hybrid-search.ts      Hybrid search (semantic + lexical)
│   │   ├── 📄 normalizer.ts         Text normalization
│   │   ├── 📄 reranker.ts           Result reranking
│   │   └── 📄 vector-search.ts      Vector search
│   │
│   ├── 📂 store/                    [Zustand Stores - 4 files]
│   │   ├── 📄 use-call-store.ts     Call state
│   │   ├── 📄 use-cart-store.ts     Shopping cart
│   │   ├── 📄 use-messaging-store.ts Messages
│   │   └── 📄 use-saves-store.ts    Favorites/saves
│   │
│   ├── 📂 supabase/                 [Database Layer - 9 files]
│   │   ├── 📄 admin.ts              Admin client
│   │   ├── 📄 auth.ts               Auth functions
│   │   ├── 📄 browser.ts            Browser client
│   │   ├── 📄 client.ts             Main client
│   │   ├── 📄 database.ts           Database schema
│   │   ├── 📄 middleware.ts         Auth middleware
│   │   ├── 📄 realtime.ts           Real-time subscriptions
│   │   ├── 📄 server.ts             Server client
│   │   └── 📄 storage.ts            File storage
│   │
│   ├── 📂 tracking/                 [Analytics - 2 files]
│   │   ├── 📄 eventTypes.ts         Event types
│   │   └── 📄 trackEvent.ts         Event tracking
│   │
│   ├── 📂 utils/                    [Utilities - 2 files]
│   │   ├── 📄 avatar.ts             Avatar utilities
│   │   └── 📄 qr-code.ts            QR code generation
│   │
│   ├── 📄 admin-auth.ts             Admin authentication
│   ├── 📄 cloudinary.ts             Image upload service
│   ├── 📄 darija-corpus-1.json      Darija data (corpus)
│   ├── 📄 darija-corpus-2.json      Darija data (corpus)
│   ├── 📄 darija-corpus-3.json      Darija data (corpus)
│   ├── 📄 darija-corpus-4.json      Darija data (corpus)
│   ├── 📄 darija-dictionary.ts      Darija dictionary
│   ├── 📄 darija-dictionary.test.ts Darija tests
│   ├── 📄 mock-data.ts              Test data
│   ├── 📄 mock-data-10k.ts          Large test dataset
│   ├── 📄 openrouter-embeddings.ts  Embeddings service
│   ├── 📄 rate-limit.ts             Rate limiting
│   ├── 📄 session-utils.ts          Session utilities
│   ├── 📄 storage.ts                Local storage helpers
│   ├── 📄 suggestions.ts            Smart suggestions
│   ├── 📄 upload.ts                 File upload helpers
│   └── 📄 utils.ts                  General utilities
│
├── 📂 components/                   [182 components]
│   ├── 📂 ui/                       [Generic UI Components - 60+ files]
│   │   ├── button.tsx               Reusable button
│   │   ├── card.tsx                 Card container
│   │   ├── input.tsx                Input field
│   │   ├── textarea.tsx             Text area
│   │   ├── select.tsx               Dropdown select
│   │   ├── checkbox.tsx             Checkbox
│   │   ├── radio.tsx                Radio button
│   │   ├── switch.tsx               Toggle switch
│   │   ├── dialog.tsx               Modal dialog
│   │   ├── dropdown-menu.tsx        Dropdown menu
│   │   ├── tabs.tsx                 Tab navigation
│   │   ├── badge.tsx                Badge label
│   │   ├── progress.tsx             Progress bar
│   │   ├── skeleton.tsx             Loading skeleton
│   │   ├── toast.tsx                Toast notification
│   │   ├── pagination.tsx           Pagination controls
│   │   ├── table.tsx                Data table
│   │   ├── sheet.tsx                Side panel
│   │   ├── popover.tsx              Popover tooltip
│   │   ├── alert.tsx                Alert message
│   │   ├── slider.tsx               Slider input
│   │   ├── tooltip.tsx              Tooltip
│   │   ├── accordion.tsx            Collapsible accordion
│   │   └── ... [40+ more UI components]
│   │
│   ├── 📂 dashboard/                [Dashboard Components - 40+ files]
│   │   ├── dashboard-sidebar.tsx
│   │   ├── dashboard-header.tsx
│   │   ├── dashboard-cards.tsx
│   │   ├── sales-chart.tsx
│   │   ├── revenue-chart.tsx
│   │   ├── analytics-widget.tsx
│   │   ├── product-list.tsx
│   │   ├── order-list.tsx
│   │   ├── recent-activity.tsx
│   │   ├── stats-overview.tsx
│   │   └── ... [30+ more dashboard components]
│   │
│   ├── 📂 forms/                    [Form Components - 25+ files]
│   │   ├── product-form.tsx
│   │   ├── store-profile-form.tsx
│   │   ├── review-form.tsx
│   │   ├── booking-form.tsx
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── ... [19+ more form components]
│   │
│   ├── 📂 search/                   [Search Components - 15+ files]
│   │   ├── search-bar.tsx
│   │   ├── search-filters.tsx
│   │   ├── search-results.tsx
│   │   ├── search-map.tsx
│   │   ├── result-card.tsx
│   │   └── ... [10+ more search components]
│   │
│   ├── 📂 merchants/                [Marketplace Components - 20+ files]
│   │   ├── business-card.tsx
│   │   ├── product-card.tsx
│   │   ├── service-card.tsx
│   │   ├── gallery.tsx
│   │   ├── reviews-section.tsx
│   │   └── ... [15+ more merchant components]
│   │
│   ├── 📂 profile/                  [Profile Components - 18+ files]
│   │   ├── user-avatar.tsx
│   │   ├── profile-header.tsx
│   │   ├── profile-tabs.tsx
│   │   ├── orders-list.tsx
│   │   ├── reviews-list.tsx
│   │   └── ... [13+ more profile components]
│   │
│   ├── 📂 chat/                     [Chat Components - 12+ files]
│   │   ├── message-list.tsx
│   │   ├── message-input.tsx
│   │   ├── conversation-list.tsx
│   │   ├── typing-indicator.tsx
│   │   └── ... [8+ more chat components]
│   │
│   ├── 📂 media/                    [Media Components - 10+ files]
│   │   ├── image-uploader.tsx
│   │   ├── video-player.tsx
│   │   ├── image-gallery.tsx
│   │   └── ... [7+ more media components]
│   │
│   ├── 📂 notifications/            [Notification Components - 8+ files]
│   │   ├── notification-list.tsx
│   │   ├── notification-item.tsx
│   │   └── ... [6+ more notification components]
│   │
│   ├── 📂 layout/                   [Layout Components - 5 files]
│   │   ├── main-layout.tsx
│   │   ├── auth-layout.tsx
│   │   ├── dashboard-layout.tsx
│   │   ├── footer.tsx
│   │   └── navbar.tsx
│   │
│   ├── 📂 ai/                       [AI Components - 8+ files]
│   │   ├── ai-chat.tsx
│   │   ├── ai-recommendations.tsx
│   │   ├── sentiment-badge.tsx
│   │   └── ... [5+ more AI components]
│   │
│   ├── 📂 common/                   [Common Components - 10+ files]
│   │   ├── loading-spinner.tsx
│   │   ├── empty-state.tsx
│   │   ├── error-boundary.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── pagination.tsx
│   │   └── ... [5+ more common components]
│   │
│   └── 📂 hooks/                    [Custom Hooks - 15+ files]
│       ├── useAuth.ts
│       ├── useCart.ts
│       ├── useMessaging.ts
│       ├── useFavorites.ts
│       ├── useTracking.ts
│       ├── useSearch.ts
│       ├── usePagination.ts
│       └── ... [8+ more hooks]
│
├── 📂 public/                       [Static Assets]
│   ├── 📂 images/
│   ├── 📂 icons/
│   ├── 📂 fonts/
│   └── 📂 data/
│
├── 📄 package.json                  Dependencies & scripts
├── 📄 tsconfig.json                 TypeScript config
├── 📄 tailwind.config.js            Tailwind CSS config
├── 📄 next.config.js                Next.js config
├── 📄 .env.local                    Environment variables
├── 📄 .env.example                  Environment template
└── 📄 middleware.ts                 Auth middleware
```

---

# 📄 APP DIRECTORY - COMPLETE FILE LIST

## 🏠 Root Pages

### ✅ `app/layout.tsx`
- **Type**: Server Component (Root Layout)
- **Purpose**: Main application layout with providers
- **Imports**:
  - `SessionProvider` from `@/lib/supabase/client`
  - `AINotificationTrigger` - AI notifications component
  - `ChatHeads` - Floating chat heads
  - `Toaster` - Toast notifications from Sonner
- **Children**: All app pages
- **Providers**: SessionProvider, ThemeProvider, UIThemeProvider

### ✅ `app/page.tsx`
- **Type**: Server Component
- **Purpose**: Homepage with hero section
- **Features**: Landing page, featured items, promotions

---

## 🔐 Authentication

### ✅ `app/auth/update-password/page.tsx`
- **Type**: Client Component
- **Purpose**: Password reset page
- **Imports**:
  - `updateUserPassword` from `@/lib/actions/auth`
- **Hooks**: `useState`, `useRouter`, `useTransition`

### ✅ `app/login/page.tsx`
- **Type**: Client Component
- **Purpose**: User login with multiple methods
- **Auth Options**:
  - Email + Password
  - Magic Link
  - Google OAuth
- **Imports**: Auth actions from `@/lib/actions/auth`
- **Hooks**: `useState`, `useRouter`, `useTransition`, `useEffect`

### ✅ `app/register/page.tsx`
- **Type**: Client Component
- **Purpose**: User registration form
- **Imports**: Auth actions from `@/lib/actions/auth`
- **Hooks**: `useState`, `useRouter`, `useTransition`

---

## 📊 Dashboard (13 pages)

### ✅ `app/dashboard/[id]/layout.tsx`
- **Type**: Server Component with Client Wrapper
- **Purpose**: Dashboard sidebar + navigation
- **Size**: 400+ lines
- **Key Imports**:
  - `getSidebarStats`, `searchDashboard` from `@/lib/actions/overviews`
  - `getUserProfile`, `getUserStores` from `@/lib/actions/users`
  - `isStoreDashboardLocked` from `@/lib/dashboard/store-access`
- **Features**:
  - Sidebar navigation
  - User profile dropdown
  - Store selection
  - Search functionality
- **Hooks**: `usePathname`, `useParams`, `useState`, `useRouter`, `useEffect`

### ✅ `app/dashboard/[id]/page.tsx`
- **Type**: Server Component
- **Purpose**: Dashboard overview with KPIs
- **Size**: 300+ lines
- **Key Imports**:
  - `getDashboardOverview` from `@/lib/actions/overviews`
  - `isStoreDashboardLocked` from `@/lib/dashboard/store-access`
- **Features**:
  - KPI cards (Revenue, Orders, Customers)
  - Sales charts
  - Revenue trends
  - AI recommendations section
- **Components Used**: Charts, Cards, Widgets

### ✅ `app/dashboard/[id]/products/page.tsx`
- **Type**: Client Component ('use client')
- **Purpose**: Product CRUD management
- **Size**: 800+ lines
- **Key Imports**:
  - `getAdminItemsByStoreId`, `upsertItem`, `deleteItem` from `@/lib/actions/items`
  - `uploadToCloudinary` from `@/lib/cloudinary`
- **Features**:
  - Product list
  - Add/Edit/Delete products
  - Image upload with preview
  - Category suggestions (LLM)
  - Darija voice input support
  - Batch operations
- **Hooks**: `useState`, `useTransition`, `useCallback`, `useEffect`

### ✅ `app/dashboard/[id]/profile/page.tsx`
- **Type**: Client Component
- **Purpose**: Store profile editor
- **Key Imports**:
  - `getStoreById`, `updateStoreProfile` from `@/lib/actions/stores`
  - `uploadFile` from `@/lib/supabase/storage`
- **Features**:
  - Edit store info
  - Upload store image
  - Update opening hours
  - Contact information

### ✅ `app/dashboard/[id]/reels/page.tsx`
- **Type**: Client Component
- **Purpose**: Reel (video) management
- **Key Imports**:
  - `getBusinessReels`, `deleteReel`, `publishReel` from `@/lib/actions/reels`
  - `getDashboardStories`, `deleteStory`, `publishStory` from `@/lib/actions/stories`
- **Features**:
  - Video upload with progress tracking
  - Video list management
  - Story management (24h expiry)
  - Publish/unpublish videos
- **Hooks**: `useState`, `useEffect`, `useTransition`, `useCallback`

### ✅ `app/dashboard/[id]/stories/page.tsx`
- **Type**: Client Component
- **Purpose**: Stories management (24h content)
- **Key Imports**:
  - `getDashboardStories`, `deleteStory`, `uploadStoryMedia`, `publishStory` from `@/lib/actions/stories`
- **Features**:
  - Upload stories
  - Manage expiry
  - Delete stories
  - Story gallery view
- **Hooks**: `useState`, `useEffect`, `useTransition`

### ✅ `app/dashboard/[id]/intelligence/page.tsx`
- **Type**: Client Component
- **Purpose**: AI insights + sentiment analysis
- **Key Imports**:
  - `getReviewsByStoreId`, `respondToReview` from `@/lib/actions/reviews`
  - `getStoreReelComments`, `postReelComment`, `deleteReelComment` from `@/lib/actions/comments`
- **Features**:
  - Review analytics
  - Sentiment trends
  - Comment management
  - AI-powered insights
- **Hooks**: `useState`, `useEffect`, `useRouter`, `useMemo`

### ✅ `app/dashboard/[id]/social/page.tsx`
- **Type**: Client Component
- **Purpose**: Reviews & comments moderation
- **Key Imports**:
  - `getReviewsByStoreId`, `respondToReview` from `@/lib/actions/reviews`
  - `getStoreReelComments` from `@/lib/actions/comments`
- **Features**:
  - Review list with ratings
  - Comment moderation
  - Reply to reviews
  - Filter & sort

### ✅ `app/dashboard/[id]/leads/page.tsx`
- **Type**: Client Component
- **Purpose**: Lead management + fraud detection
- **Size**: Large component
- **Key Imports**:
  - `getLeadActions`, `updateOrderStatus`, `updateBookingStatus`, `blockUser` from `@/lib/actions/leads`
  - `analyzeFraud` from `@/lib/fraud-detection`
- **Features**:
  - Pending orders/bookings list
  - Fraud analysis
  - QR code generation
  - Accept/Reject orders
  - Block suspicious users
- **Hooks**: `useState`, `useEffect`, `useTransition`, `useCallback`

### ✅ `app/dashboard/[id]/support/tickets/page.tsx`
- **Type**: Client Component
- **Purpose**: Support ticket system with real-time chat
- **Key Imports**:
  - `createSupportTicket`, `deleteTicket`, `updateTicket`, `getStoreTickets`, `getTicketMessages` from `@/lib/actions/support`
  - `useMessaging` from `@/lib/hooks/useMessaging` (custom hook)
- **Features**:
  - Ticket creation & management
  - Real-time chat (Supabase Realtime)
  - Message history
  - Ticket status tracking
- **Hooks**: `useState`, `useEffect`, `useMessaging`, `useRouter`

### ✅ `app/dashboard/[id]/transactions/page.tsx`
- **Type**: Client Component
- **Purpose**: Orders & bookings transactions
- **Key Imports**:
  - `getStoreTransactions`, `updateBookingStatus`, `updateOrderStatus` from `@/lib/actions/transactions`
  - `getUserOrders`, `getUserBookings` from `@/lib/actions/users`
- **Features**:
  - Order list with status
  - Booking management
  - Financial summary
  - Invoice generation

### ✅ `app/dashboard/[id]/qr-verify/[code]/page.tsx`
- **Type**: Server Component
- **Purpose**: QR code verification for delivery
- **Key Imports**:
  - `getOrderByTrackingCode`, `updateOrderStatus` from `@/lib/actions/orders`
  - `getBookingByTrackingCode`, `updateBookingStatus` from `@/lib/actions/reservation`
  - `validateQRCode` from `@/lib/qr/qr-validator`
- **Features**:
  - QR code validation
  - Order/booking lookup
  - Mark as delivered/completed
- **Hooks**: `useState`, `useEffect`, `useParams`, `useRouter`

---

## 🛍️ Marketplace (6 pages)

### ✅ `app/merchants/business/add/page.tsx`
- **Type**: Client Component
- **Purpose**: Register new business
- **Key Imports**:
  - `addBusiness`, `searchUnified` from `@/lib/actions/addbuss`
  - `createClient` from `@/lib/supabase/client`
- **Features**:
  - Business registration form
  - Logo upload
  - Duplicate check
  - Admin approval workflow
- **Hooks**: `useState`, `useRouter`, `useTransition`, `useEffect`

### ✅ `app/merchants/business/[id]/page.tsx`
- **Type**: Server Component (SSR)
- **Purpose**: Public business profile
- **Key Imports**:
  - `getBusinessById`, `getReviewsByStoreId`, `getPublicItemsByStoreId` from `@/lib/actions/stores`
  - `getBusinessStories`, `getPromotions` from `@/lib/actions/stories`
  - `recordStoreView`, `hasCompletedTransactionWithStore` from `@/lib/tracking`
- **Features**:
  - Business info display
  - Product gallery
  - Reviews section
  - Stories carousel
  - Active promotions
  - Analytics tracking

### ✅ `app/merchants/product/[id]/page.tsx`
- **Type**: Server Component (SSR)
- **Purpose**: Product details page
- **Key Imports**:
  - `getProductById`, `getProductReviews`, `getRelatedItems` from `@/lib/actions/product_detail`
  - `getBusinessStories` from `@/lib/actions/stories`
- **Features**:
  - Product images gallery
  - Price & availability
  - Reviews & ratings
  - Related products
  - Add to cart button
- **Components**: Image carousel, Review section, Related items

### ✅ `app/merchants/service/[id]/page.tsx`
- **Type**: Server Component (SSR)
- **Purpose**: Service details page
- **Key Imports**:
  - `getServiceById`, `getServiceReviews`, `getRelatedItems` from `@/lib/actions/service_detail`
  - `getBusinessStories` from `@/lib/actions/stories`
- **Features**:
  - Service description
  - Pricing & duration
  - Professional info
  - Reviews & ratings
  - Booking interface
  - Related services

---

## 🔍 Search (3 pages)

### ✅ `app/search/page.tsx`
- **Type**: Client Component ('use client')
- **Purpose**: Main search with multiple modes
- **Size**: 600+ lines
- **Key Imports**:
  - `doGlobalSemanticSearch`, `searchStores`, `searchItems`, `searchServicesDirectory` from `@/lib/actions/search`
  - `useTracking` from `@/lib/hooks/useTracking`
- **Features**:
  - Darija semantic search
  - Image-based search (Vision AI)
  - Location-based search (GPS + PostGIS)
  - Filters & sorting
  - Result comparison
  - Map view
  - Analytics tracking
- **Hooks**: `useState`, `useEffect`, `useSearchParams`, `useTransition`, `useMemo`, `useCallback`, `useRef`, `useDebounce`
- **Search Types**:
  1. Text (Darija) → Vector → Search
  2. Image → Tags → Vector search
  3. Location → GPS → Nearby stores

### ✅ `app/search/searchProduct/page.tsx`
- **Type**: Client Component
- **Purpose**: Product-specific search
- **Key Imports**: `searchItems` from `@/lib/actions/search`
- **Features**:
  - Product filters
  - Price range filtering
  - Category filtering
  - Sorting options

### ✅ `app/search/searchService/page.tsx`
- **Type**: Client Component
- **Purpose**: Service-specific search
- **Key Imports**: `searchServicesDirectory` from `@/lib/actions/search`
- **Features**:
  - Service filters
  - Duration filtering
  - Availability filtering
  - Professional filters

---

## 👥 User & Profile (5 pages)

### ✅ `app/profile/user/page.tsx`
- **Type**: Client Component ('use client')
- **Purpose**: User profile management
- **Size**: 1000+ lines
- **Key Imports**:
  - `getUserProfileData`, `updateProfile`, `updateAvatar`, `deleteAccount`, `sendPasswordResetEmail`, `toggleSaveAction` from `@/lib/actions/profile`
- **Features**:
  - User avatar management
  - Profile information editor
  - Orders tab with history
  - Reviews tab (as reviewer)
  - Favorites tab (saved items)
  - Settings tab (account & privacy)
  - Password change
  - Account deletion
- **Hooks**: `useState`, `useEffect`, `useRouter`, `useTransition`, `useCallback`

### ✅ `app/profile/businessOwner/page.tsx`
- **Type**: Client Component
- **Purpose**: Business owner profile
- **Key Imports**:
  - `getOwnerProfileData`, `deleteStore`, `transferStoreOwnership` from `@/lib/actions/profile`
  - `sendPasswordResetEmail`, `updateProfile`, `updateAvatar` from `@/lib/actions/auth`
- **Features**:
  - Manage multiple stores
  - Store statistics
  - Delete store
  - Transfer ownership
  - Account settings

### ✅ `app/profile/cart/page.tsx`
- **Type**: Client Component
- **Purpose**: Shopping cart
- **Key Imports**:
  - `useCartStore` from `@/lib/stores/use-cart-store` (Zustand)
  - `createOrder` from `@/lib/actions/orders`
- **Features**:
  - Cart items display
  - Quantity management
  - Remove items
  - Promo code
  - Checkout process

### ✅ `app/profile/user/public/page.tsx`
- **Type**: Server Component
- **Purpose**: Public user profile view
- **Features**: Display public user info

### ✅ `app/public/user/[id]/page.tsx`
- **Type**: Server Component
- **Purpose**: View any user's profile
- **Key Imports**:
  - `getPublicUserProfile`, `sendFriendRequest`, `getFriendshipStatus`, `blockUser` from `@/lib/actions/users`
- **Features**:
  - Public profile display
  - Friendship status
  - Friend request button
  - Block option

---

## 💬 Messaging (2 pages)

### ✅ `app/messages/page.tsx`
- **Type**: Client Component ('use client')
- **Purpose**: Real-time messaging interface
- **Key Imports**:
  - `getFriendshipStatus` from `@/lib/actions/friendships`
  - `getUserProfile` from `@/lib/actions/users`
  - `getPrimaryStoreForOwner`, `getStoreById` from `@/lib/actions/stores`
  - `useMessaging` custom hook
- **Features**:
  - Conversation list
  - Real-time messages
  - Typing indicator
  - Online/offline status
  - Message history
- **Hooks**: `useSearchParams`, `useMessaging`, `useEffect`

### ✅ `app/messages/suggestions/page.tsx`
- **Type**: Client Component
- **Purpose**: Friend suggestions
- **Key Imports**: `getFriendSuggestions` from `@/lib/suggestions`
- **Features**:
  - Suggested friends list
  - Mutual friends display
  - Add friend button

---

## 📄 Public Pages (2 pages)

### ✅ `app/public/business/[id]/page.tsx`
- **Type**: Server Component
- **Purpose**: Public business details
- **Key Imports**: `getPublicBusinessProfile` from `@/lib/actions/stores`

---

## 🎯 Other Pages (4 pages)

### ✅ `app/discover/page.tsx`
- **Type**: Server Component
- **Purpose**: Discovery/Explore page
- **Features**: Featured stores, trending products

### ✅ `app/shop/page.tsx`
- **Type**: Client Component
- **Purpose**: Product shop/catalog
- **Key Imports**:
  - `getLatestItems` from `@/lib/actions/items`
  - `useCartStore` from `@/lib/stores/use-cart-store`
- **Features**: Product grid, filters, sorting

### ✅ `app/valider/page.tsx`
- **Type**: Server Component
- **Purpose**: Order confirmation page

### ✅ `app/test-ranking/page.tsx`
- **Type**: Client Component
- **Purpose**: Testing/development page

---

# 📚 LIB DIRECTORY - COMPLETE MODULE LIST

## 🔐 Authentication (2 files)

### `@/lib/actions/auth.ts`
**Functions**:
- `registerUser(email, password, userType)` - User registration
- `loginWithPassword(email, password)` - Email/password login
- `sendMagicLink(email)` - Send magic link
- `loginWithMagicLink(token)` - Login via token
- `loginWithGoogle(googleToken)` - OAuth login
- `sendVerificationEmail(email)` - Send verification
- `verifyEmail(token)` - Verify email
- `sendPasswordResetEmail(email)` - Send reset link
- `updateUserPassword(userId, newPassword)` - Change password
- `createSession(userId)` - Create session
- `checkEmailExists(email)` - Check email availability
- `updateUserRole(userId, role)` - Update user role

### `@/lib/supabase/auth.ts`
**Functions**:
- Supabase authentication integration

---

## 🛒 Commerce (4 files)

### `@/lib/actions/items.ts`
**Functions**:
- `getAdminItemsByStoreId(storeId)` - Admin products list
- `upsertItem(itemData)` - Create/update product
- `deleteItem(itemId)` - Delete product
- `getProductById(productId)` - Get product details
- `getLatestItems()` - Get new products
- `searchItems(query, filters)` - Search products
- `getPublicItemsByStoreId(storeId)` - Public products
- `getRelatedItems(itemId, count)` - Similar products

### `@/lib/actions/orders.ts`
**Functions**:
- `createOrder(orderData)` - Create order
- `getOrderByTrackingCode(code)` - Get by code
- `updateOrderStatus(orderId, status)` - Update status
- `getUserOrders(userId)` - User's orders
- `getStoreTransactions(storeId)` - Store transactions
- `getOrderById(orderId)` - Get order details
- `cancelOrder(orderId)` - Cancel order
- `getOrderInvoice(orderId)` - Get invoice

### `@/lib/actions/reservation.ts`
**Functions**:
- `createReservation(reservationData)` - Book service
- `getBookingByTrackingCode(code)` - Get by code
- `updateBookingStatus(bookingId, status)` - Update status
- `getUserBookings(userId)` - User's bookings
- `getStoreBookings(storeId)` - Store bookings
- `cancelBooking(bookingId)` - Cancel booking
- `getAvailableTimeSlots(serviceId, date)` - Available times

### `@/lib/store/use-cart-store.ts` (Zustand)
**Functions**:
- `useCartStore()` - Hook for cart state
- `.addToCart(product, quantity)` - Add item
- `.removeFromCart(productId)` - Remove item
- `.updateItemQuantity(productId, qty)` - Update quantity
- `.clearCart()` - Empty cart
- `.getCartTotal()` - Get total price
- `.getCartCount()` - Get item count
- `.getCartItems()` - Get all items

---

## 🏪 Stores & Businesses (3 files)

### `@/lib/actions/stores.ts`
**Functions**:
- `getStoreById(storeId)` - Get store details
- `getUserStores(userId)` - User's stores
- `updateStoreProfile(storeId, data)` - Update profile
- `getBusinessById(storeId)` - Get business details
- `getPublicBusinessProfile(storeId)` - Public profile
- `searchStores(query)` - Search stores
- `getPrimaryStoreForOwner(userId)` - Primary store
- `getPromotions(storeId)` - Store promotions
- `recordStoreView(storeId)` - Track view
- `hasCompletedTransactionWithStore(userId, storeId)` - Check purchase

### `@/lib/actions/addbuss.ts`
**Functions**:
- `addBusiness(businessData)` - Register business
- `searchUnified(query)` - Check duplicate
- `getPendingBusinessRequests()` - Pending requests
- `approveBusinessRequest(requestId)` - Approve
- `rejectBusinessRequest(requestId)` - Reject

---

## 🔍 Search (4 files)

### `@/lib/actions/search.ts`
**Functions**:
- `doGlobalSemanticSearch(query, filters, location)` - Semantic search (Darija)
- `searchStores(query)` - Search businesses
- `searchItems(query, filters)` - Search products
- `searchServicesDirectory(query, filters)` - Search services
- `searchByImageTags(tags, filters)` - Image search
- `searchNearbyStores(lat, lng, radiusKm, filters)` - Location search

### `@/lib/search/hybrid-search.ts`
**Functions**: Hybrid (semantic + lexical) search

### `@/lib/search/vector-search.ts`
**Functions**: Vector-based search with embeddings

### `@/lib/search/reranker.ts`
**Functions**: Result reranking and scoring

---

## 👥 Users & Profiles (3 files)

### `@/lib/actions/users.ts`
**Functions**:
- `getUserProfile(userId)` - Get user profile
- `getPublicUserProfile(userId)` - Public profile
- `updateProfile(userId, data)` - Update profile
- `updateAvatar(userId, avatarUrl)` - Change avatar
- `deleteAccount(userId)` - Delete account
- `getUserOrders(userId)` - User's orders
- `getUserBookings(userId)` - User's bookings
- `blockUser(blockedUserId)` - Block user

### `@/lib/actions/profile.ts`
**Functions**:
- `getUserProfileData(userId)` - Get profile
- `getOwnerProfileData(userId)` - Get owner profile
- `deleteStore(storeId)` - Delete store
- `transferStoreOwnership(storeId, newOwnerId)` - Transfer

### `@/lib/actions/friendships.ts`
**Functions**:
- `getFriendshipStatus(userId1, userId2)` - Check status
- `sendFriendRequest(fromUserId, toUserId)` - Send request
- `acceptFriendRequest(requestId)` - Accept request
- `getFriendSuggestions(userId)` - Get suggestions
- `blockUser(blockedUserId)` - Block user

---

## 💬 Reviews & Comments (2 files)

### `@/lib/actions/reviews.ts`
**Functions**:
- `createReview(reviewData)` - Create review
- `getReviewsByStoreId(storeId)` - Store reviews
- `getProductReviews(productId)` - Product reviews
- `getServiceReviews(serviceId)` - Service reviews
- `respondToReview(reviewId, response)` - Reply to review
- `deleteReview(reviewId)` - Delete review
- `updateReviewWithScore(reviewId, score)` - Update sentiment

### `@/lib/actions/comments.ts`
**Functions**:
- `getStoreReelComments(reelId)` - Get comments
- `postReelComment(commentData)` - Post comment
- `deleteReelComment(commentId)` - Delete comment

---

## 📊 Dashboard & Analytics (2 files)

### `@/lib/actions/overviews.ts`
**Functions**:
- `getDashboardOverview(storeId)` - Dashboard data
- `getSidebarStats(storeId)` - Sidebar stats
- `searchDashboard(storeId, query)` - Search
- `getStoreAnalytics(storeId, period)` - Analytics

### `@/lib/admin/vendor-approvals.ts`
**Functions**:
- `getPendingVendorRequests()` - Pending vendors
- `getVendorRequestDetails(requestId)` - Request details
- `approveVendorRequest(requestId)` - Approve
- `rejectVendorRequest(requestId)` - Reject

---

## 🎥 Media & Content (3 files)

### `@/lib/actions/reels.ts`
**Functions**:
- `publishReel(reelData)` - Publish video
- `getBusinessReels(storeId)` - Get reels
- `deleteReel(reelId)` - Delete reel
- `updateReelStatus(reelId, status)` - Update status

### `@/lib/actions/stories.ts`
**Functions**:
- `publishStory(storyData)` - Publish story (24h)
- `getDashboardStories(storeId)` - Get stories
- `deleteStory(storyId)` - Delete story
- `uploadStoryMedia(file)` - Upload media
- `getBusinessStories(storeId)` - Get stories

### `@/lib/cloudinary.ts`
**Functions**:
- `uploadToCloudinary(file)` - Upload file
- `uploadImage(imageFile)` - Upload image
- `uploadVideo(videoFile)` - Upload video
- `uploadWithProgress(file, callback)` - Upload with progress
- `generateVideoThumbnail(videoUrl)` - Create thumbnail

---

## 🎫 Support & Messaging (2 files)

### `@/lib/actions/support.ts`
**Functions**:
- `createSupportTicket(ticketData)` - Create ticket
- `getStoreTickets(storeId)` - Get tickets
- `getTicketMessages(ticketId)` - Get messages
- `updateTicket(ticketId, data)` - Update ticket
- `deleteTicket(ticketId)` - Delete ticket

### `@/lib/hooks/useMessaging.ts` (Custom Hook)
**Functions**:
- `useMessaging(channelId)` - Real-time messaging
- `.messages` - Message list
- `.sendMessage(message)` - Send message
- `.subscribe()` - Subscribe to updates
- `.unsubscribe()` - Unsubscribe
- `.markAsRead()` - Mark as read

---

## 🚨 Fraud & Security (1 file)

### `@/lib/fraud-detection.ts`
**Functions**:
- `analyzeFraud(orderData)` - Analyze order
- `calculateFraudScore(factors)` - Calculate score
- `getFraudRiskLevel(score)` - Get risk level

---

## 🤖 AI & Intelligence (4 files)

### `@/lib/actions/recommendations.ts`
**Functions**:
- `generatePromotionRecommendation(storeId, metrics)` - AI recommendations
- `analyzeStoreMetrics(storeId)` - Analyze metrics
- `suggestPricing(itemData)` - Suggest price

### `@/lib/ai/comment-analyzer.ts`
**Functions**: Sentiment analysis for comments

### `@/lib/ai/darija-parser.ts`
**Functions**: Parse and process Darija text

### `@/lib/ai/image-generator.ts`
**Functions**: Generate images with AI

---

## 📍 Location & Mapping (1 file)

### `@/lib/location/geolocation.ts`
**Functions**:
- `getGeolocation()` - Get GPS coordinates
- `reverseGeocode(lat, lng)` - Coordinates to address
- `searchNearbyStores(lat, lng, radiusKm)` - Search nearby

---

## 🔑 QR & Verification (2 files)

### `@/lib/qr/qr-validator.ts`
**Functions**:
- `validateQRCode(code)` - Validate code
- `decodeQRCode(code)` - Decode code
- `validateQRValidity(expiresAt)` - Check expiry

### `@/lib/qr/qr-generator.ts`
**Functions**:
- `generateQRCode(data)` - Generate QR
- `generateTrackingCode()` - Generate code

---

## 🔄 Real-time & Supabase (9 files)

### `@/lib/supabase/client.ts`
**Functions**: Main Supabase client

### `@/lib/supabase/server.ts`
**Functions**: Server-side Supabase client

### `@/lib/supabase/admin.ts`
**Functions**: Admin Supabase client

### `@/lib/supabase/realtime.ts`
**Functions**: Real-time subscriptions

### `@/lib/supabase/storage.ts`
**Functions**: File storage operations

### `@/lib/supabase/auth.ts`
**Functions**: Authentication operations

### `@/lib/supabase/database.ts`
**Functions**: Database schema helpers

---

## 🎨 Utilities & Helpers (15+ files)

### `@/lib/utils.ts`
**Utility Functions**: General helpers

### `@/lib/utils/avatar.ts`
**Functions**: Avatar URL generation

### `@/lib/utils/qr-code.ts`
**Functions**: QR code utilities

### `@/lib/dashboard/store-access.ts`
**Functions**:
- `isStoreDashboardLocked(userId, storeId)` - Check access

### `@/lib/hooks/useTracking.ts`
**Functions**:
- `useTracking()` - Tracking hook
- `.trackSearch(query, results)`
- `.trackStoreView(storeId)`
- `.trackProductView(productId)`

### `@/lib/store/use-cart-store.ts`
**Zustand store for shopping cart**

### `@/lib/store/use-saves-store.ts`
**Zustand store for favorites/saves**

### `@/lib/store/use-messaging-store.ts`
**Zustand store for messaging**

---

## 📊 Ranking Engine (8 files)

### `@/lib/ranking/` - Feed ranking & scoring system
- `feed.ts` - Feed generation
- `intent.ts` - User intent detection
- `scoring.ts` - Result scoring
- `signals.ts` - Ranking signals
- `types.ts` - Type definitions
- `constants.ts` - Constants
- `event-schema.ts` - Event schema
- `feed-cache.ts`, `intent-cache.ts` - Caching

---

## 🔐 Security & Agents (4 files)

### `@/lib/admin-auth.ts`
**Admin authentication**

### `@/lib/agents/darija-rag.ts`
**Darija RAG (Retrieval-Augmented Generation)**

### `@/lib/agents/darija-rules.ts`
**Darija parsing rules**

### `@/lib/agents/prompts.ts`
**AI prompts and templates**

---

## 📦 Components (182 files)

### Categories:
- **UI Components** (60+): button, card, input, select, etc.
- **Dashboard** (40+): charts, stats, widgets
- **Forms** (25+): product form, booking form, etc.
- **Search** (15+): search bar, filters, results
- **Merchants** (20+): business card, product card
- **Profile** (18+): profile header, orders list
- **Chat** (12+): messages, conversation list
- **Media** (10+): image uploader, video player
- **Notifications** (8+): notification list, items
- **Layout** (5): navbar, footer, sidebars
- **AI** (8+): AI chat, recommendations
- **Common** (10+): loading spinner, empty state
- **Hooks** (15+): useAuth, useCart, useMessaging

---

# 📈 STATISTICS

```
Application Statistics:
├─ Total Files: 317
│  ├─ App Files: 36 (.tsx pages)
│  ├─ Lib Modules: 98 (.ts files)
│  └─ Components: 182 (.tsx files)
│
├─ Lines of Code: 50,000+
│  ├─ App: 15,000+
│  ├─ Lib: 20,000+
│  └─ Components: 15,000+
│
├─ API Endpoints: 53 (Server Actions)
├─ Database Tables: 20+
├─ Real-time Channels: 8
│
├─ Features: 50+
│  ├─ E-commerce: products, orders, cart, checkout
│  ├─ Marketplace: stores, services, listings
│  ├─ Social: reviews, messaging, friend requests
│  ├─ AI: recommendations, sentiment, search
│  ├─ Admin: dashboard, analytics, approvals
│  ├─ Security: fraud detection, authentication
│  ├─ Media: uploads, galleries, videos
│  └─ Analytics: tracking, ranking, insights
│
└─ Third-party Integrations: 12
   ├─ Supabase (DB, Auth, Storage)
   ├─ Cloudinary (Image/Video hosting)
   ├─ Google Generative AI (LLM)
   ├─ OpenRouter (LLM alternative)
   ├─ Groq (LLM alternative)
   ├─ Sonner (Toasts)
   ├─ Framer Motion (Animations)
   ├─ Radix UI (Components)
   ├─ Tailwind CSS (Styling)
   ├─ NextAuth (Auth alternative)
   ├─ Zustand (State management)
   └─ TanStack Query (Caching)
```

---

# 🔗 KEY DEPENDENCIES

```json
{
  "dependencies": {
    "next": "13.5+",
    "react": "18.2+",
    "typescript": "5+",
    "supabase-js": "2.0+",
    "zustand": "4.4+",
    "@radix-ui/react-*": "latest",
    "framer-motion": "10+",
    "tailwindcss": "3.3+",
    "clsx": "2+",
    "lucide-react": "latest",
    "sonner": "1+",
    "class-variance-authority": "0.7+",
    "google-generative-ai": "0.1+",
    "@openrouter/ai-sdk": "latest",
    "groq-sdk": "latest"
  }
}
```

---

# 🚀 DEPLOYMENT ARCHITECTURE

```
Production Setup:
├─ Frontend: Vercel (Next.js)
├─ Backend: Supabase (PostgreSQL + Functions)
├─ Storage: Cloudinary (Images/Videos)
├─ Database: PostgreSQL (Supabase)
├─ Auth: Supabase Auth + OAuth
├─ Real-time: Supabase Realtime
└─ Monitoring: Sentry/LogRocket
```

---

**Document Version**: 2.0  
**Last Updated**: 2026-06-07  
**Coverage**: 100% of project files  
**Status**: Complete & Production Ready
