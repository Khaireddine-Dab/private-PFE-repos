# 📁 FILES & WORKFLOWS FLOWS MAPPING

## 🎯 Vue par Fichier: Workflows associés et Flux détaillés

---

# 📄 FICHIERS APP

---

## 1️⃣ **app/auth/update-password/page.tsx**

### 🔗 Workflows Associés:
- (No direct workflow in diagrams)
- Used for password recovery

### 📚 Imports LIB:
```typescript
import { updateUserPassword } from '@/lib/actions/auth';
```

### 🔧 Flux Principal:
```
User enters new password
    ↓
Validates password
    ↓
Call updateUserPassword()
    ↓
Updates in Supabase Auth
    ↓
Redirect to login
```

### 📊 Détails:
- **File**: `app/auth/update-password/page.tsx`
- **Type**: Server Component
- **Hooks**: `useState`, `useRouter`, `useTransition`
- **Lib Dependencies**: `@/lib/actions/auth`
- **Functions Used**:
  - `updateUserPassword()` - Change password in DB

---

## 2️⃣ **app/dashboard/[id]/layout.tsx**

### 🔗 Workflows Associés:
- ✅ **Dashboard Admin** (Workflows #11)
- ✅ **Sidebar Navigation** (Supporting multiple workflows)

### 📚 Imports LIB:
```typescript
import { getSidebarStats, searchDashboard } from '@/lib/actions/overviews';
import { createClient } from '@/lib/supabase/client';
import { getUserProfile } from '@/lib/actions/users';
import { getUserStores } from '@/lib/actions/stores';
import { getAvatarUrl } from '@/lib/utils/avatar';
import { isStoreDashboardLocked } from '@/lib/dashboard/store-access';
import { cn } from '@/lib/utils';
```

### 🔧 Flux Principal:
```
User accesses /dashboard/[storeId]
    ↓
Load user profile data
    ↓
Fetch sidebar statistics
    ↓
Check store access permissions
    ↓
Render sidebar + children
    ↓
Enable search functionality
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/layout.tsx`
- **Type**: Server Component with Client Wrapper
- **Hooks**: `usePathname`, `useParams`, `useState`, `useRouter`, `useEffect`
- **Lib Dependencies**: `@/lib/actions/overviews`, `@/lib/supabase/client`, `@/lib/utils`
- **Functions Used**:
  - `getSidebarStats()` - Load dashboard stats
  - `getUserProfile()` - Get user info
  - `getUserStores()` - Get user's stores
  - `isStoreDashboardLocked()` - Authorization check (4 calls)
  - `searchDashboard()` - Search within dashboard
  - `getAvatarUrl()` - Get user avatar
  - `cn()` - Class name utility (8 calls)

### 🔐 Security:
- **Access Control**: `isStoreDashboardLocked()` checks user owns store
- **RLS**: Supabase RLS on all queries
- **Session**: Via SessionProvider

---

## 3️⃣ **app/dashboard/[id]/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Dashboard Overview** (Multiple workflow entry point)
- ✅ **Recommandation IA** (Workflow #3)

### 📚 Imports LIB:
```typescript
import { getDashboardOverview } from '@/lib/actions/overviews';
import { isStoreDashboardLocked } from '@/lib/dashboard/store-access';
import { cn } from '@/lib/utils';
```

### 🔧 Flux Principal:
```
User views dashboard /dashboard/[id]
    ↓
Check if store is locked
    ↓
Fetch overview data (KPIs, charts, sales)
    ↓
Display KPI cards
    ↓
Show charts (sales trends, etc)
    ↓
Show AI recommendations section
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/page.tsx`
- **Type**: Server Component
- **Hooks**: `useState`, `useEffect` (in nested components)
- **Lib Dependencies**: `@/lib/actions/overviews`, `@/lib/dashboard/store-access`, `@/lib/utils`
- **Functions Used**:
  - `getDashboardOverview()` - Fetch KPI data
  - `isStoreDashboardLocked()` - Check access (2 calls)
  - `cn()` - Styling (3 calls)

### 📈 Data Structure:
```json
{
  "kpis": {
    "total_sales": 5000,
    "total_orders": 150,
    "avg_rating": 4.5,
    "new_customers": 25
  },
  "charts": {
    "sales_by_day": [...],
    "category_distribution": [...]
  },
  "recommendations": [...]
}
```

---

## 4️⃣ **app/dashboard/[id]/products/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Créer Produit** (Workflow #4)
- ✅ **Admin Ajouter Produit** (Workflow #12)

### 📚 Imports LIB:
```typescript
import { getAdminItemsByStoreId, upsertItem, deleteItem } from '@/lib/actions/items';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { cn } from '@/lib/utils';
```

### 🔧 Flux Principal:
```
Merchant opens Products page
    ↓
Load all store products
    ├─ Option 1: Add new product
    │   ├─ Fill form (name, price, category, image)
    │   ├─ Upload image to Cloudinary
    │   ├─ Extract Darija info (if voice input)
    │   ├─ Suggest category via LLM
    │   ├─ Validate price
    │   └─ Save via upsertItem()
    │
    ├─ Option 2: Edit product
    │   ├─ Load product data
    │   ├─ Modify fields
    │   ├─ Update image if needed
    │   └─ Save via upsertItem()
    │
    └─ Option 3: Delete product
        ├─ Confirm deletion
        └─ Call deleteItem()
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/products/page.tsx` (800+ lines)
- **Type**: Client Component ('use client')
- **Hooks**: `useState` (form state), `useTransition` (async), `useCallback` (handlers), `useEffect`
- **Lib Dependencies**: `@/lib/actions/items`, `@/lib/cloudinary`, `@/lib/utils`
- **Functions Used**:
  - `getAdminItemsByStoreId()` - Load products
  - `upsertItem()` - Create/Update product
  - `deleteItem()` - Delete product
  - `uploadToCloudinary()` - Upload image/video

### 🎨 Features:
- Product form with validation
- Image preview before upload
- Category suggestions from LLM
- Darija voice input support
- Batch operations
- Real-time updates

---

## 5️⃣ **app/dashboard/[id]/intelligence/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Recommandation IA** (Workflow #3)
- ✅ **Avis/Review** (Workflow #14)

### 📚 Imports LIB:
```typescript
import { getReviewsByStoreId, respondToReview } from '@/lib/actions/reviews';
import { getStoreReelComments, postReelComment, deleteReelComment } from '@/lib/actions/comments';
```

### 🔧 Flux Principal:
```
Merchant opens Intelligence page
    ↓
Load reviews by store
    ├─ Display all reviews
    ├─ Show sentiment analysis score
    ├─ Show review trends
    └─ Enable respond to review
        ├─ Merchant types response
        └─ Save via respondToReview()
    │
Load reel comments
    ├─ Display comments per reel
    ├─ Enable posting comment
    │   └─ Save via postReelComment()
    ├─ Enable deleting comment
    │   └─ Delete via deleteReelComment()
    │
AI Insights:
    ├─ Sentiment analysis trends
    ├─ Common complaint categories
    ├─ Customer sentiment by date
    └─ Recommendations for improvement
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/intelligence/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useRouter`, `useMemo` (memoized data)
- **Lib Dependencies**: `@/lib/actions/reviews`, `@/lib/actions/comments`, `@/lib/ai/sentiment`
- **Functions Used**:
  - `getReviewsByStoreId()` - Load reviews
  - `respondToReview()` - Reply to review
  - `getStoreReelComments()` - Load reel comments
  - `postReelComment()` - Add comment
  - `deleteReelComment()` - Remove comment

### 📈 Analytics:
```json
{
  "reviews": [
    {
      "id": "...",
      "rating": 5,
      "comment": "Excellent service",
      "sentiment_score": 0.95,
      "sentiment_label": "positive"
    }
  ],
  "sentiment_trends": {
    "average_score": 4.2,
    "positive_count": 45,
    "negative_count": 5
  }
}
```

---

## 6️⃣ **app/dashboard/[id]/profile/page.tsx**

### 🔗 Workflows Associés:
- (Supporting workflow - Store profile management)

### 📚 Imports LIB:
```typescript
import { getStoreById, updateStoreProfile } from '@/lib/actions/stores';
import { uploadFile } from '@/lib/supabase/storage';
```

### 🔧 Flux Principal:
```
Merchant opens Profile page
    ↓
Load store information
    ↓
Edit store details (name, description, address, phone)
    ↓
Upload/change store image
    ↓
Save changes
    ↓
Success message
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/profile/page.tsx`
- **Type**: Client Component
- **Hooks**: `useState`, `useTransition`, `useEffect`
- **Lib Dependencies**: `@/lib/actions/stores`, `@/lib/supabase/storage`
- **Functions Used**:
  - `getStoreById()` - Load store data
  - `updateStoreProfile()` - Update store info
  - `uploadFile()` - Upload image

---

## 7️⃣ **app/dashboard/[id]/reels/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Créer Reel** (Workflow #17)

### 📚 Imports LIB:
```typescript
import { getBusinessReels, deleteReel, publishReel } from '@/lib/actions/reels';
import { getDashboardStories, deleteStory, publishStory } from '@/lib/actions/stories';
```

### 🔧 Flux Principal:
```
Merchant opens Reels page
    ↓
Load all reels
    ├─ Display video list
    ├─ Show view counts
    ├─ Enable delete reel
    │   └─ Delete via deleteReel()
    └─ Enable publish reel
        └─ Publish via publishReel()
    │
Also manages Stories:
    ├─ Load all stories (24h expiry)
    ├─ Display story grid
    ├─ Enable upload new story
    │   ├─ Select file or capture
    │   ├─ Upload to Cloudinary
    │   ├─ Create story with expiry
    │   └─ Save via publishStory()
    │
    ├─ Enable delete story
    │   └─ Delete via deleteStory()
    │
    └─ Show expiry countdown
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/reels/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useTransition`, `useCallback`
- **Lib Dependencies**: `@/lib/actions/reels`, `@/lib/actions/stories`, `@/lib/cloudinary`
- **Functions Used**:
  - `getBusinessReels()` - Load reels
  - `deleteReel()` - Remove reel
  - `publishReel()` - Publish reel
  - `getDashboardStories()` - Load stories
  - `deleteStory()` - Remove story
  - `publishStory()` - Publish story
  - `uploadToCloudinary()` - Upload video/image

### 📹 Upload Progress:
```
User selects file
    ↓
Shows preview + upload button
    ↓
Upload starts → Progress bar 0%
    ↓
Loop: Update progress (Cloudinary callback)
    ↓
Upload complete (100%) + Get URL
    ↓
Save metadata to DB
    ↓
"Reel/Story published"
```

---

## 8️⃣ **app/dashboard/[id]/social/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Avis/Review** (Workflow #14)

### 📚 Imports LIB:
```typescript
import { getReviewsByStoreId, respondToReview } from '@/lib/actions/reviews';
import { getStoreReelComments } from '@/lib/actions/comments';
```

### 🔧 Flux Principal:
```
Merchant opens Social page
    ↓
Load all reviews
    ├─ Display review list
    ├─ Show ratings and comments
    ├─ Enable filtering by rating
    └─ Enable respond to review
        ├─ Open reply form
        ├─ Type response message
        └─ Save via respondToReview()
    │
Load reel/story comments
    ├─ Display all comments
    ├─ Show comment metadata
    └─ Moderation options (delete, pin)
    │
Analytics:
    ├─ Average rating
    ├─ Review count trends
    └─ Sentiment distribution
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/social/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useFilter`
- **Lib Dependencies**: `@/lib/actions/reviews`, `@/lib/actions/comments`
- **Functions Used**:
  - `getReviewsByStoreId()` - Load reviews
  - `respondToReview()` - Reply to review
  - `getStoreReelComments()` - Load comments

---

## 9️⃣ **app/dashboard/[id]/stories/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Créer Story** (Workflow #18)

### 📚 Imports LIB:
```typescript
import { getDashboardStories, deleteStory, uploadStoryMedia, publishStory } from '@/lib/actions/stories';
```

### 🔧 Flux Principal:
```
Merchant opens Stories page
    ↓
Load all stories with 24h timer
    ├─ Display story grid
    ├─ Show expiry countdown
    ├─ Enable create new story
    │   ├─ Open upload interface
    │   ├─ Select file or capture from camera
    │   ├─ Upload to Cloudinary
    │   ├─ Set expiry_at = now + 24h
    │   └─ Publish via publishStory()
    │
    └─ Enable delete story
        └─ Delete via deleteStory()
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/stories/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useTransition`
- **Lib Dependencies**: `@/lib/actions/stories`, `@/lib/cloudinary`
- **Functions Used**:
  - `getDashboardStories()` - Load stories
  - `uploadStoryMedia()` - Upload media
  - `publishStory()` - Publish with expiry
  - `deleteStory()` - Remove story

---

## 🔟 **app/dashboard/[id]/support/tickets/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Support Tickets** (Workflow #16)

### 📚 Imports LIB:
```typescript
import { 
  createSupportTicket, 
  deleteTicket, 
  updateTicket, 
  getStoreTickets, 
  getTicketMessages 
} from '@/lib/actions/support';
import { useMessaging } from '@/lib/hooks/useMessaging';
```

### 🔧 Flux Principal:
```
Merchant opens Support Tickets
    ↓
Load all tickets for store
    ├─ Display list with status
    ├─ Show ticket count by status
    │
    ├─ Click "Create New Ticket"
    │   ├─ Open ticket form
    │   ├─ Fill title + description
    │   └─ Create via createSupportTicket()
    │
    ├─ Click ticket to open chat
    │   ├─ Load ticket messages
    │   ├─ Subscribe to real-time updates (useMessaging)
    │   ├─ Display conversation history
    │   ├─ Show new messages instantly
    │   ├─ Type reply message
    │   └─ Send via message hook
    │
    └─ Close ticket
        ├─ Confirm closure
        └─ Update status via updateTicket()
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/support/tickets/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useMessaging` (custom - real-time), `useRouter`
- **Lib Dependencies**: `@/lib/actions/support`, `@/lib/hooks/useMessaging`, `@/lib/supabase/realtime`
- **Functions Used**:
  - `getStoreTickets()` - Load tickets
  - `getTicketMessages()` - Load chat history
  - `createSupportTicket()` - Create new
  - `updateTicket()` - Change status
  - `deleteTicket()` - Remove ticket
  - `useMessaging()` - Real-time messaging

### 📡 Real-time Updates:
```typescript
// Supabase Realtime subscription
useMessaging() → 
  subscribes to ticket channel →
  instant notification on new message →
  auto-refresh conversation
```

---

## 1️⃣1️⃣ **app/dashboard/[id]/leads/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Détection Fraude** (Workflow #15)

### 📚 Imports LIB:
```typescript
import { getLeadActions, updateOrderStatus, updateBookingStatus, blockUser } from '@/lib/actions/leads';
import { analyzeFraud } from '@/lib/fraud-detection';
```

### 🔧 Flux Principal:
```
Merchant opens Leads/Customer Actions
    ↓
Load pending orders & bookings
    ├─ Display in list format
    ├─ Show customer info
    ├─ Show order/booking details
    │
    ├─ Click action to review
    │   ├─ Open detail panel
    │   ├─ Show customer history
    │   ├─ Show order value
    │   │
    │   ├─ Click "Analyze Fraud"
    │   │   ├─ Send to fraud detection API
    │   │   ├─ Get fraud score (0-100)
    │   │   ├─ Display risk level (Low/Med/High)
    │   │   └─ Show risk factors
    │   │
    │   ├─ Option 1: REJECT
    │   │   ├─ Confirm rejection
    │   │   ├─ Set status → "Refused"
    │   │   └─ Notify customer
    │   │
    │   └─ Option 2: ACCEPT
    │       ├─ Generate QR code
    │       ├─ Create tracking token
    │       ├─ Send QR to customer
    │       └─ Status → "Accepted"
    │
    └─ Block user (if fraud detected)
        └─ Call blockUser()
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/leads/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useTransition`, `useCallback`
- **Lib Dependencies**: `@/lib/actions/leads`, `@/lib/fraud-detection`, `@/lib/qr/qr-generator`
- **Functions Used**:
  - `getLeadActions()` - Load pending actions
  - `analyzeFraud()` - Call fraud API
  - `generateQRCode()` - Create QR
  - `updateOrderStatus()` - Accept/Reject
  - `updateBookingStatus()` - Update booking
  - `blockUser()` - Block customer

### 🚨 Fraud Detection:
```json
{
  "order_id": "...",
  "customer": {
    "name": "...",
    "email": "...",
    "previous_orders": 5,
    "avg_order_value": 500,
    "account_age_days": 120
  },
  "fraud_analysis": {
    "score": 45,
    "risk_level": "medium",
    "factors": [
      "high_order_value",
      "new_payment_method",
      "unusual_location"
    ]
  }
}
```

---

## 1️⃣2️⃣ **app/dashboard/[id]/transactions/page.tsx**

### 🔗 Workflows Associés:
- (Supporting workflow - Orders/Bookings management)

### 📚 Imports LIB:
```typescript
import { getStoreTransactions, updateBookingStatus, updateOrderStatus } from '@/lib/actions/transactions';
import { getUserOrders, getUserBookings } from '@/lib/actions/users';
```

### 🔧 Flux Principal:
```
Merchant opens Transactions
    ↓
Load all orders & bookings
    ├─ Display orders list
    ├─ Display bookings list
    ├─ Show financial summary
    │   ├─ Total revenue
    │   ├─ Pending amount
    │   └─ Refunds
    │
    ├─ Order management
    │   ├─ View order details
    │   ├─ Update status
    │   │   ├─ pending → processing
    │   │   ├─ processing → shipped
    │   │   └─ shipped → delivered
    │   │
    │   └─ Generate invoice
    │
    └─ Booking management
        ├─ View booking details
        ├─ Update status
        │   ├─ pending → confirmed
        │   ├─ confirmed → completed
        │   └─ completed → paid
        │
        └─ Send reminder
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/transactions/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useRouter`
- **Lib Dependencies**: `@/lib/actions/transactions`, `@/lib/actions/orders`, `@/lib/actions/bookings`
- **Functions Used**:
  - `getStoreTransactions()` - Load all transactions
  - `updateOrderStatus()` - Update order
  - `updateBookingStatus()` - Update booking
  - `getUserOrders()` - Fetch orders
  - `getUserBookings()` - Fetch bookings

---

## 1️⃣3️⃣ **app/dashboard/[id]/qr-verify/[code]/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Vérification QR Code** (Workflow #7)

### 📚 Imports LIB:
```typescript
import { getOrderByTrackingCode, updateOrderStatus } from '@/lib/actions/orders';
import { getBookingByTrackingCode, updateBookingStatus } from '@/lib/actions/reservation';
import { validateQRCode } from '@/lib/qr/qr-validator';
```

### 🔧 Flux Principal:
```
User/Merchant scans/enters QR code
    ↓
App navigates to /dashboard/[id]/qr-verify/[code]
    ↓
Validate QR code format
    ↓
Decode tracking code from QR
    ↓
Alt 1: QR INVALID/EXPIRED
    ├─ "QR code invalid or expired"
    ├─ Show error message
    └─ Option to try again
    │
Alt 2: QR VALID
    ├─ Fetch order by code
    │   OR
    ├─ Fetch booking by code
    │   ↓
    │   Display order/booking details
    │   ├─ Customer info
    │   ├─ Items/Services
    │   ├─ Status
    │   ├─ Total amount
    │   │
    │   ├─ Mark as DELIVERED/COMPLETED
    │   │   ├─ Confirm action
    │   │   ├─ Update status → "Completed"
    │   │   ├─ Record timestamp
    │   │   └─ Update via updateOrderStatus()
    │   │
    │   └─ "Your order/booking is completed"
```

### 📊 Détails:
- **File**: `app/dashboard/[id]/qr-verify/[code]/page.tsx`
- **Type**: Server Component (with client interactivity)
- **Hooks**: `useState`, `useEffect`, `useParams`, `useRouter`
- **Lib Dependencies**: `@/lib/actions/orders`, `@/lib/actions/reservation`, `@/lib/qr/qr-validator`
- **Functions Used**:
  - `validateQRCode()` - Verify QR validity
  - `getOrderByTrackingCode()` - Fetch order
  - `getBookingByTrackingCode()` - Fetch booking
  - `updateOrderStatus()` - Mark delivered
  - `updateBookingStatus()` - Mark completed

### 🔐 Verification:
```typescript
// QR Code structure
{
  "type": "order|booking",
  "id": "tracking_code_uuid",
  "store_id": "...",
  "created_at": "2026-06-07T10:00:00Z",
  "expires_at": "2026-06-08T10:00:00Z"  // 24h validity
}
```

---

## 1️⃣4️⃣ **app/search/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Recherche Darija** (Workflow #1)
- ✅ **Vision (Search by Image)** (Workflow #5)
- ✅ **Géolocalisation** (Workflow #6)

### 📚 Imports LIB:
```typescript
import { searchStores, searchItems, searchServicesDirectory, doGlobalSemanticSearch } from '@/lib/actions/search';
import { useTracking } from '@/lib/hooks/useTracking';
```

### 🔧 Flux Principal:
```
User opens Search page
    ↓
Display search interface
    ├─ Search input (Darija support)
    ├─ Filters panel
    ├─ View options (list/map/comparison)
    │
    ├─ SEARCH TYPE 1: TEXT SEARCH (Darija)
    │   ├─ User types search query in Darija
    │   ├─ Trigger debounced search (~300ms)
    │   ├─ Call doGlobalSemanticSearch()
    │   │   ├─ Convert Darija → vector
    │   │   ├─ Query BaseVectorielle
    │   │   ├─ Search BaseVectorielle for stores/items
    │   │   └─ Re-rank results
    │   │
    │   └─ Display results (stores, items, services)
    │       ├─ Show relevance scores
    │       ├─ Enable result comparison
    │       └─ Track search (useTracking)
    │
    ├─ SEARCH TYPE 2: IMAGE SEARCH
    │   ├─ User uploads/takes photo
    │   ├─ Analyze image (Vision AI)
    │   ├─ Extract tags
    │   ├─ Search by tags + semantic
    │   └─ Display similar items
    │
    ├─ SEARCH TYPE 3: LOCATION SEARCH
    │   ├─ User clicks location button
    │   ├─ Request geolocation permission
    │   ├─ Get GPS coordinates
    │   ├─ Optional: Reverse geocode
    │   ├─ Search nearby stores (PostGIS)
    │   ├─ Apply text filter (if entered)
    │   ├─ Apply semantic search
    │   │
    │   └─ Display results on map
    │       ├─ Show store pins
    │       ├─ Show distance to each
    │       └─ Sort by distance
    │
    └─ RESULT FILTERING
        ├─ Filter by category
        ├─ Filter by price range
        ├─ Filter by rating
        ├─ Sort by: relevance/distance/rating/price
        └─ Apply filters dynamically
```

### 📊 Détails:
- **File**: `app/search/page.tsx` (600+ lines)
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useSearchParams`, `useTransition`, `useMemo`, `useCallback`, `useRef`, `useDebounce`
- **Lib Dependencies**: `@/lib/actions/search`, `@/lib/hooks/useTracking`, `@/lib/location`, `@/lib/vision`
- **Functions Used**:
  - `doGlobalSemanticSearch()` - Semantic search (Darija)
  - `searchStores()` - Search businesses
  - `searchItems()` - Search products
  - `searchServicesDirectory()` - Search services
  - `useTracking()` - Track search analytics

### 🔍 Search Features:
```typescript
{
  "search_type": "semantic|image|location",
  "query": "coiffeur",  // Darija
  "location": {
    "lat": 36.8065,
    "lng": 10.1615,
    "radius_km": 5
  },
  "filters": {
    "category": ["salon"],
    "price_range": [50, 200],
    "rating_min": 4,
    "sort_by": "distance"
  },
  "results": [
    {
      "id": "...",
      "name": "...",
      "distance_km": 0.5,
      "rating": 4.8,
      "relevance_score": 0.95
    }
  ]
}
```

---

## 1️⃣5️⃣ **app/search/searchProduct/page.tsx**

### 🔗 Workflows Associés:
- (Specialized search - Products only)

### 📚 Imports LIB:
```typescript
import { searchItems } from '@/lib/actions/search';
```

### 🔧 Flux Principal:
```
User on product search page
    ↓
Specialized for products
    ├─ Product-specific filters
    │   ├─ Category
    │   ├─ Brand
    │   ├─ Price range
    │   ├─ Ratings
    │   │
    ├─ Search products
    │   ├─ Call searchItems()
    │   ├─ Return product results
    │   │
    │   └─ Display product grid
    │       ├─ Product image
    │       ├─ Name + price
    │       ├─ Rating + reviews count
    │       └─ "Add to cart" button
```

### 📊 Détails:
- **File**: `app/search/searchProduct/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useSearchParams`
- **Lib Dependencies**: `@/lib/actions/search`
- **Functions Used**:
  - `searchItems()` - Search products

---

## 1️⃣6️⃣ **app/search/searchService/page.tsx**

### 🔗 Workflows Associés:
- (Specialized search - Services only)

### 📚 Imports LIB:
```typescript
import { searchServicesDirectory } from '@/lib/actions/search';
```

### 🔧 Flux Principal:
```
User on service search page
    ↓
Specialized for services
    ├─ Service-specific filters
    │   ├─ Category
    │   ├─ Duration
    │   ├─ Price range
    │   ├─ Availability
    │   │
    ├─ Search services
    │   ├─ Call searchServicesDirectory()
    │   ├─ Return service results
    │   │
    │   └─ Display service cards
    │       ├─ Service name
    │       ├─ Description
    │       ├─ Price
    │       ├─ Duration
    │       ├─ Rating
    │       └─ "Book now" button
```

### 📊 Détails:
- **File**: `app/search/searchService/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useSearchParams`
- **Lib Dependencies**: `@/lib/actions/search`
- **Functions Used**:
  - `searchServicesDirectory()` - Search services

---

## 1️⃣7️⃣ **app/merchants/business/[id]/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Ajouter au Panier** (Workflow #2)
- ✅ **Avis/Review** (Workflow #14)

### 📚 Imports LIB:
```typescript
import { getBusinessById, getReviewsByStoreId, getPublicItemsByStoreId } from '@/lib/actions/stores';
import { getBusinessStories, getPromotions } from '@/lib/actions/stories';
import { recordStoreView, hasCompletedTransactionWithStore } from '@/lib/tracking';
```

### 🔧 Flux Principal:
```
User opens business page /merchants/business/[id]
    ↓
Load business information (SSR)
    ├─ Store name, address, phone
    ├─ Store description
    ├─ Opening hours
    ├─ Tags/categories
    │
    ├─ Load products gallery
    │   ├─ Display product grid
    │   ├─ Show product details
    │   └─ "Add to cart" buttons
    │
    ├─ Load reviews
    │   ├─ Display review list
    │   ├─ Show average rating
    │   ├─ Enable rating filter
    │   │
    │   └─ User can leave review
    │       ├─ Click "Leave review"
    │       ├─ Enter rating (1-5)
    │       ├─ Type comment
    │       └─ Submit review
    │
    ├─ Load stories (24h)
    │   ├─ Display story carousel
    │   └─ Click story to view
    │
    ├─ Load promotions
    │   ├─ Display active promotions
    │   ├─ Show discount %
    │   └─ Show expiry date
    │
    └─ Record analytics
        ├─ recordStoreView()
        └─ hasCompletedTransactionWithStore()
```

### 📊 Détails:
- **File**: `app/merchants/business/[id]/page.tsx` (SSR)
- **Type**: Server Component
- **Hooks**: `useState`, `useEffect` (for client actions)
- **Lib Dependencies**: `@/lib/actions/stores`, `@/lib/actions/stories`, `@/lib/tracking`
- **Functions Used**:
  - `getBusinessById()` - Load business data
  - `getReviewsByStoreId()` - Load reviews
  - `getPublicItemsByStoreId()` - Load products
  - `getBusinessStories()` - Load stories
  - `getPromotions()` - Load promotions
  - `recordStoreView()` - Track view
  - `hasCompletedTransactionWithStore()` - Check purchase history

### 📱 Business Page Layout:
```
[Hero section with store image]
[Store name + rating + open/closed]
[Store info: phone, address, hours]

[Products Gallery]
[Reviews section]
[Stories carousel]
[Active Promotions]
[Contact/Action buttons]
```

---

## 1️⃣8️⃣ **app/merchants/business/add/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Demande Vendeur** (Workflow #10)

### 📚 Imports LIB:
```typescript
import { addBusiness, searchUnified } from '@/lib/actions/addbuss';
import { createClient } from '@/lib/supabase/client';
```

### 🔧 Flux Principal:
```
User opens "Add Business" page
    ↓
Display business registration form
    ├─ Business name
    ├─ Category
    ├─ Address
    ├─ Phone number
    ├─ Email
    ├─ Website (optional)
    ├─ Upload logo
    ├─ Upload cover image
    ├─ Description
    │
    ├─ Form validation
    │   ├─ Check business name not empty
    │   ├─ Check category selected
    │   ├─ Validate phone number
    │   └─ Validate email
    │
    ├─ Check if business already exists
    │   ├─ Call searchUnified()
    │   ├─ Search by name or address
    │   ├─ If found: Show "Business already registered"
    │   │
    │   └─ If not found: Continue
    │
    └─ Submit form
        ├─ Upload images to Cloudinary
        ├─ Call addBusiness()
        ├─ Save with status = "pending"
        ├─ Create admin notification
        └─ "Business request submitted. Awaiting approval"
```

### 📊 Détails:
- **File**: `app/merchants/business/add/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useRouter`, `useTransition`, `useEffect`
- **Lib Dependencies**: `@/lib/actions/addbuss`, `@/lib/supabase/client`, `@/lib/cloudinary`
- **Functions Used**:
  - `addBusiness()` - Submit business request
  - `searchUnified()` - Check if business exists
  - `uploadToCloudinary()` - Upload logo/cover

### 📝 Business Form:
```json
{
  "name": "Coiffure Mohamed",
  "category": "salon",
  "address": "Tunis, Rue ...",
  "phone": "+216 XX XXX XXX",
  "email": "owner@business.com",
  "description": "Best salon in town",
  "logo_url": "cloudinary_url",
  "cover_image_url": "cloudinary_url",
  "status": "pending"  // Awaiting admin approval
}
```

---

## 1️⃣9️⃣ **app/merchants/product/[id]/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Ajouter au Panier** (Workflow #2)
- ✅ **Avis/Review** (Workflow #14)

### 📚 Imports LIB:
```typescript
import { getProductById, getProductReviews, getRelatedItems } from '@/lib/actions/product_detail';
import { getBusinessStories } from '@/lib/actions/stories';
```

### 🔧 Flux Principal:
```
User opens product page /merchants/product/[id]
    ↓
Load product information (SSR)
    ├─ Product name
    ├─ Product images/gallery
    ├─ Price
    ├─ Description
    ├─ In stock status
    ├─ Stock quantity
    │
    ├─ Display reviews
    │   ├─ Show average rating
    │   ├─ List all reviews
    │   ├─ Show customer names and dates
    │   │
    │   └─ Can leave review (if user)
    │       ├─ Rate product (1-5)
    │       ├─ Write comment
    │       └─ Submit review
    │
    ├─ Display related products
    │   ├─ Call getRelatedItems()
    │   ├─ Show similar products
    │   └─ Quick add to cart buttons
    │
    ├─ Display business stories
    │   ├─ Show seller's latest stories
    │   └─ Click to view full story
    │
    └─ Add to cart action
        ├─ Quantity selector
        ├─ "Add to cart" button
        └─ Update cart store (Zustand)
```

### 📊 Détails:
- **File**: `app/merchants/product/[id]/page.tsx` (SSR)
- **Type**: Server Component
- **Hooks**: `useState`, `useEffect` (for client interactions)
- **Lib Dependencies**: `@/lib/actions/product_detail`, `@/lib/actions/stories`, `@/lib/stores/use-cart-store`
- **Functions Used**:
  - `getProductById()` - Load product
  - `getProductReviews()` - Load reviews
  - `getRelatedItems()` - Get similar products
  - `getBusinessStories()` - Load seller stories

### 🛒 Product Page Layout:
```
[Product Images Carousel]
[Product Info: Name, Price, Stock]
[Description]
[Quantity + Add to Cart Button]
[Reviews section]
[Related Products]
[Seller Stories]
```

---

## 2️⃣0️⃣ **app/merchants/service/[id]/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Ajouter au Panier** (Workflow #2) - For booking
- ✅ **Avis/Review** (Workflow #14)

### 📚 Imports LIB:
```typescript
import { getServiceById, getServiceReviews, getRelatedItems } from '@/lib/actions/service_detail';
import { getBusinessStories } from '@/lib/actions/stories';
```

### 🔧 Flux Principal:
```
User opens service page /merchants/service/[id]
    ↓
Load service information (SSR)
    ├─ Service name
    ├─ Service description
    ├─ Price
    ├─ Duration
    ├─ Availability
    ├─ Professional info
    │
    ├─ Display reviews
    │   ├─ Show average rating
    │   ├─ List all reviews
    │   │
    │   └─ Can leave review
    │       ├─ Rate service (1-5)
    │       ├─ Write comment
    │       └─ Submit review
    │
    ├─ Display related services
    │   ├─ Similar services
    │   └─ Quick book buttons
    │
    ├─ Display business stories
    │   └─ Seller's latest stories
    │
    └─ Book service action
        ├─ Select date
        ├─ Select time slot
        ├─ Number of participants
        ├─ Add special requests
        ├─ "Book now" button
        └─ Create reservation
```

### 📊 Détails:
- **File**: `app/merchants/service/[id]/page.tsx` (SSR)
- **Type**: Server Component
- **Hooks**: `useState`, `useEffect` (for booking form)
- **Lib Dependencies**: `@/lib/actions/service_detail`, `@/lib/actions/stories`, `@/lib/actions/reservation`
- **Functions Used**:
  - `getServiceById()` - Load service
  - `getServiceReviews()` - Load reviews
  - `getRelatedItems()` - Get similar services
  - `getBusinessStories()` - Load stories
  - `createReservation()` - Book service

### 📅 Service Booking Form:
```json
{
  "service_id": "...",
  "date": "2026-06-15",
  "time": "14:00",
  "duration": "60 minutes",
  "participants": 1,
  "special_requests": "...",
  "total_price": 50
}
```

---

## 2️⃣1️⃣ **app/messages/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Support Tickets** (Workflow #16) - Real-time messaging

### 📚 Imports LIB:
```typescript
import { getFriendshipStatus } from '@/lib/actions/friendships';
import { getUserProfile } from '@/lib/actions/users';
import { getPrimaryStoreForOwner, getStoreById } from '@/lib/actions/stores';
import { useMessaging } from '@/lib/hooks/useMessaging';
```

### 🔧 Flux Principal:
```
User opens Messaging page
    ↓
Load conversations list
    ├─ Query all active conversations
    ├─ Display conversation preview
    │   ├─ Contact name/avatar
    │   ├─ Last message preview
    │   ├─ Timestamp
    │   └─ Unread count
    │
    ├─ Click conversation
    │   ├─ Load full message history
    │   ├─ Subscribe to real-time updates (useMessaging)
    │   │
    │   ├─ Display messages
    │   │   ├─ Author avatar
    │   │   ├─ Message content
    │   │   ├─ Timestamp
    │   │   └─ Read status
    │   │
    │   ├─ Type message
    │   ├─ Send message (real-time via Supabase)
    │   │
    │   └─ Receive message
    │       ├─ Auto-scroll to new message
    │       ├─ Mark as read
    │       └─ Notification sound (optional)
    │
    └─ Real-time features
        ├─ "User is typing..." indicator
        ├─ Online/offline status
        └─ Presence indicators
```

### 📊 Détails:
- **File**: `app/messages/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useSearchParams`, `useMessaging` (custom), `useEffect`, `useState`
- **Lib Dependencies**: `@/lib/actions/friendships`, `@/lib/actions/users`, `@/lib/actions/stores`, `@/lib/hooks/useMessaging`, `@/lib/supabase/realtime`
- **Functions Used**:
  - `getFriendshipStatus()` - Check if friends (3 calls)
  - `getUserProfile()` - Get contact info
  - `getPrimaryStoreForOwner()` - Get store info
  - `getStoreById()` - Get store details
  - `useMessaging()` - Real-time messaging hook

### 📡 Real-time Architecture:
```
Supabase Realtime Channel
  ↓
useMessaging hook listens for:
  - New messages
  - Message deletes
  - Typing indicator
  - Online status
  ↓
Auto-updates component state
  ↓
Re-renders with latest messages
```

---

## 2️⃣2️⃣ **app/messages/suggestions/page.tsx**

### 🔗 Workflows Associés:
- (Friend suggestions - Social feature)

### 📚 Imports LIB:
```typescript
import { getFriendSuggestions } from '@/lib/suggestions';
```

### 🔧 Flux Principal:
```
User opens Friend Suggestions
    ↓
Load suggested friends
    ├─ Call getFriendSuggestions()
    ├─ Algorithm considers:
    │   ├─ Common interests
    │   ├─ Common locations
    │   ├─ Mutual friends
    │   └─ Recent activity
    │
    ├─ Display suggestions
    │   ├─ Show suggested user
    │   ├─ Show mutual friends count
    │   ├─ "Add friend" button
    │   └─ "Skip" button
    │
    └─ Can send friend request
        ├─ Click "Add friend"
        ├─ Send friend request
        └─ Wait for acceptance
```

### 📊 Détails:
- **File**: `app/messages/suggestions/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`
- **Lib Dependencies**: `@/lib/suggestions`, `@/lib/actions/friendships`
- **Functions Used**:
  - `getFriendSuggestions()` - Get suggested friends
  - `sendFriendRequest()` - Send request

---

## 2️⃣3️⃣ **app/profile/user/page.tsx**

### 🔗 Workflows Associés:
- (User profile management)

### 📚 Imports LIB:
```typescript
import { 
  getUserProfileData, 
  updateProfile, 
  updateAvatar, 
  deleteAccount, 
  sendPasswordResetEmail,
  toggleSaveAction 
} from '@/lib/actions/profile';
```

### 🔧 Flux Principal:
```
User opens profile page
    ↓
Load user profile (1000+ lines component)
    ├─ User avatar + name
    ├─ Email + phone
    ├─ Address
    ├─ Profile description
    │
    ├─ Tabs: Orders | Reviews | Favorites | Settings
    │
    ├─ ORDERS TAB
    │   ├─ Display user's orders
    │   ├─ Show order status
    │   ├─ Download invoice
    │   └─ Track order
    │
    ├─ REVIEWS TAB
    │   ├─ Show all user's reviews
    │   ├─ Edit review option
    │   └─ Delete review option
    │
    ├─ FAVORITES TAB
    │   ├─ Display saved items
    │   ├─ Display saved services
    │   ├─ Display saved businesses
    │   ├─ Toggle favorite status
    │   └─ Remove from favorites
    │
    ├─ SETTINGS TAB
    │   ├─ Edit profile info
    │   │   ├─ Change name
    │   │   ├─ Change phone
    │   │   ├─ Change address
    │   │   └─ Save changes
    │   │
    │   ├─ Change avatar
    │   │   ├─ Upload new photo
    │   │   ├─ Crop image
    │   │   └─ Save avatar
    │   │
    │   ├─ Change password
    │   │   ├─ Enter current password
    │   │   ├─ Enter new password
    │   │   └─ Confirm new password
    │   │
    │   ├─ Privacy settings
    │   │   ├─ Profile visibility
    │   │   ├─ Who can message
    │   │   └─ Show activity
    │   │
    │   └─ Delete account
    │       ├─ Confirm deletion
    │       ├─ Delete all data
    │       └─ Redirect to home
    │
    └─ Call functions:
        ├─ updateProfile() - Save changes
        ├─ updateAvatar() - Change avatar
        ├─ deleteAccount() - Delete account
        ├─ sendPasswordResetEmail() - Reset password
        └─ toggleSaveAction() - Save/unsave item
```

### 📊 Détails:
- **File**: `app/profile/user/page.tsx` (1000+ lines)
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useRouter`, `useTransition`, `useCallback`
- **Lib Dependencies**: `@/lib/actions/profile`, `@/lib/actions/orders`, `@/lib/actions/reviews`, `@/lib/cloudinary`
- **Functions Used**:
  - `getUserProfileData()` - Load profile
  - `updateProfile()` - Save profile changes
  - `updateAvatar()` - Change avatar
  - `deleteAccount()` - Delete account
  - `sendPasswordResetEmail()` - Reset password
  - `toggleSaveAction()` - Save/unsave

---

## 2️⃣4️⃣ **app/profile/businessOwner/page.tsx**

### 🔗 Workflows Associés:
- (Business owner profile management)

### 📚 Imports LIB:
```typescript
import { getOwnerProfileData, deleteStore, transferStoreOwnership } from '@/lib/actions/profile';
import { sendPasswordResetEmail } from '@/lib/actions/auth';
import { updateProfile, updateAvatar } from '@/lib/actions/users';
```

### 🔧 Flux Principal:
```
Business owner opens profile page
    ↓
Load owner profile data
    ├─ Owner personal info
    ├─ List of owned stores
    ├─ Store statistics
    │
    ├─ MANAGE STORES
    │   ├─ For each store:
    │   │   ├─ Store name + logo
    │   │   ├─ Status (active/pending)
    │   │   ├─ Quick stats
    │   │   ├─ View store button → Dashboard
    │   │   ├─ Delete store button
    │   │   │   ├─ Confirm deletion
    │   │   │   └─ Call deleteStore()
    │   │   │
    │   │   └─ Transfer ownership button
    │   │       ├─ Select new owner
    │   │       ├─ Confirm transfer
    │   │       └─ Call transferStoreOwnership()
    │   │
    │   └─ Add new store button
    │       └─ Redirect to add business page
    │
    ├─ ACCOUNT SETTINGS
    │   ├─ Edit personal info
    │   ├─ Change avatar
    │   ├─ Change password
    │   └─ Delete account
    │
    └─ Call functions:
        ├─ getOwnerProfileData() - Load data
        ├─ deleteStore() - Remove store
        ├─ transferStoreOwnership() - Transfer store
        ├─ updateProfile() - Save changes
        ├─ updateAvatar() - Change avatar
        └─ sendPasswordResetEmail() - Reset password
```

### 📊 Détails:
- **File**: `app/profile/businessOwner/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`, `useRouter`, `useTransition`
- **Lib Dependencies**: `@/lib/actions/profile`, `@/lib/actions/auth`, `@/lib/actions/users`
- **Functions Used**:
  - `getOwnerProfileData()` - Load owner data
  - `deleteStore()` - Remove store
  - `transferStoreOwnership()` - Transfer store
  - `updateProfile()` - Save profile
  - `updateAvatar()` - Change avatar
  - `sendPasswordResetEmail()` - Reset password

---

## 2️⃣5️⃣ **app/profile/cart/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Ajouter au Panier** (Workflow #2)

### 📚 Imports LIB:
```typescript
import { useCartStore } from '@/lib/stores/use-cart-store';
import { createOrder } from '@/lib/actions/orders';
import { cn } from '@/lib/utils';
```

### 🔧 Flux Principal:
```
User opens cart page
    ↓
Load cart from Zustand store
    ├─ Display cart items
    │   ├─ Product image
    │   ├─ Product name
    │   ├─ Price per item
    │   ├─ Quantity
    │   ├─ Item total
    │   ├─ Remove button
    │   └─ Update quantity
    │
    ├─ Cart summary
    │   ├─ Subtotal
    │   ├─ Tax calculation
    │   ├─ Shipping cost
    │   └─ Total amount
    │
    ├─ Promo code
    │   ├─ Enter code
    │   ├─ Apply code
    │   └─ Show discount
    │
    └─ Checkout
        ├─ Click "Proceed to checkout"
        ├─ Verify cart items
        ├─ Enter delivery address
        ├─ Select payment method
        ├─ Call createOrder()
        ├─ Process payment
        └─ "Order created" → Redirect to success page
```

### 📊 Détails:
- **File**: `app/profile/cart/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useRouter`, `useTransition`
- **Lib Dependencies**: `@/lib/stores/use-cart-store`, `@/lib/actions/orders`, `@/lib/utils`
- **Functions Used**:
  - `useCartStore()` - Get cart state (Zustand)
  - `createOrder()` - Create order
  - `removeFromCart()` - Remove item
  - `updateCartItem()` - Update quantity
  - `clearCart()` - Empty cart

### 🛒 Cart Store:
```typescript
// Zustand store structure
{
  items: [
    {
      product_id: "...",
      name: "...",
      price: 100,
      quantity: 2,
      image_url: "..."
    }
  ],
  total: 200,
  count: 2
}
```

---

## 2️⃣6️⃣ **app/profile/user/public/page.tsx**

### 🔗 Workflows Associés:
- (View public user profile)

### 📚 Imports LIB:
```typescript
// Minimal imports - mostly static
import { cn } from '@/lib/utils';
```

### 🔧 Flux Principal:
```
User views public profile
    ↓
Display user's public info
    ├─ Avatar
    ├─ Username
    ├─ Bio
    ├─ Public reviews (as reviewer)
    ├─ Average rating given
    ├─ Member since date
    │
    └─ Options
        ├─ Send message button
        ├─ Add friend button
        └─ View reviews given
```

### 📊 Détails:
- **File**: `app/profile/user/public/page.tsx`
- **Type**: Server Component
- **Lib Dependencies**: Minimal - mostly static rendering

---

## 2️⃣7️⃣ **app/public/user/[id]/page.tsx**

### 🔗 Workflows Associés:
- (View any user's public profile)

### 📚 Imports LIB:
```typescript
import { getPublicUserProfile, sendFriendRequest, getFriendshipStatus, blockUser } from '@/lib/actions/users';
```

### 🔧 Flux Principal:
```
View user profile /public/user/[id]
    ↓
Load public user data
    ├─ User avatar + name
    ├─ User bio + joined date
    ├─ Public reviews
    ├─ Average rating as reviewer
    ├─ Badge/verification status
    │
    ├─ Check friendship status
    │   ├─ If not friend: Show "Add friend" button
    │   │   └─ Click → Send friend request
    │   │
    │   └─ If friend: Show "Message" button
    │       └─ Click → Redirect to messages
    │
    └─ Actions
        ├─ Send friend request
        ├─ Block user
        └─ Report user
```

### 📊 Détails:
- **File**: `app/public/user/[id]/page.tsx`
- **Type**: Server Component
- **Hooks**: `useState`, `useEffect` (for client actions)
- **Lib Dependencies**: `@/lib/actions/users`, `@/lib/actions/friendships`
- **Functions Used**:
  - `getPublicUserProfile()` - Load profile
  - `sendFriendRequest()` - Send request
  - `getFriendshipStatus()` - Check friend status
  - `blockUser()` - Block user

---

## 2️⃣8️⃣ **app/public/business/[id]/page.tsx**

### 🔗 Workflows Associés:
- (View business public profile)

### 📚 Imports LIB:
```typescript
import { getPublicBusinessProfile } from '@/lib/actions/stores';
```

### 🔧 Flux Principal:
```
View business profile /public/business/[id]
    ↓
Load public business data
    ├─ Business name + logo
    ├─ Description
    ├─ Address + phone
    ├─ Opening hours
    ├─ Contact info
    │
    └─ Similar businesses
        └─ Show related stores
```

### 📊 Détails:
- **File**: `app/public/business/[id]/page.tsx`
- **Type**: Server Component
- **Lib Dependencies**: `@/lib/actions/stores`
- **Functions Used**:
  - `getPublicBusinessProfile()` - Load business data

---

## 2️⃣9️⃣ **app/register/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Inscription** (Workflow #8)

### 📚 Imports LIB:
```typescript
// Uses Server Actions directly from @/lib/actions/auth
```

### 🔧 Flux Principal:
```
User opens registration page
    ↓
Display registration form
    ├─ Email input
    │   ├─ Validate email format
    │   ├─ Check if email already registered
    │   └─ If exists: "Email already in use"
    │
    ├─ Password input
    │   ├─ Validate password strength
    │   ├─ Show password requirements
    │   └─ Confirm password match
    │
    ├─ User type selection
    │   ├─ Regular user
    │   └─ Business owner
    │
    ├─ Terms & conditions checkbox
    │   └─ Must be checked
    │
    └─ Submit registration
        ├─ Call registerUser() (server action)
        ├─ Validate email (checkEmailExists)
        ├─ Create account
        ├─ Send verification email
        ├─ "Verification link sent to email"
        └─ Show "Check email" message
```

### 📊 Détails:
- **File**: `app/register/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useRouter`, `useTransition`
- **Lib Dependencies**: `@/lib/actions/auth`, `@/lib/utils`
- **Functions Used**:
  - `checkEmailExists()` - Validate email
  - `registerUser()` - Create account
  - `sendVerificationEmail()` - Send verification link

---

## 3️⃣0️⃣ **app/login/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Connexion** (Workflow #9)

### 📚 Imports LIB:
```typescript
// Uses Server Actions from @/lib/actions/auth
```

### 🔧 Flux Principal:
```
User opens login page
    ↓
Display login method selector
    ├─ METHOD 1: Email + Password
    │   ├─ Enter email
    │   ├─ Enter password
    │   ├─ Remember me (optional)
    │   ├─ Click "Login"
    │   │   ├─ Validate credentials
    │   │   ├─ Call loginWithPassword()
    │   │   ├─ Create session
    │   │   ├─ If credentials wrong: Error message
    │   │   │   ├─ Account not found
    │   │   │   ├─ Password incorrect
    │   │   │   └─ Account not activated
    │   │   │
    │   │   └─ If success: Create session + Redirect to dashboard
    │   │
    │   └─ "Forgot password?" link
    │       ├─ Enter email
    │       ├─ Call sendPasswordResetEmail()
    │       └─ "Reset link sent to email"
    │
    ├─ METHOD 2: Magic Link
    │   ├─ Enter email
    │   ├─ Click "Send magic link"
    │   │   └─ Call sendMagicLink()
    │   │
    │   ├─ "Check email for link"
    │   ├─ User clicks link in email
    │   ├─ Call loginWithMagicLink()
    │   └─ Automatic login + Redirect
    │
    ├─ METHOD 3: OAuth (Google)
    │   ├─ Click "Sign in with Google"
    │   ├─ Popup: Google login
    │   ├─ User grants permission
    │   ├─ Call loginWithGoogle()
    │   ├─ Create or link account
    │   └─ Redirect to dashboard
    │
    └─ "Don't have account?" → Register link
        └─ Redirect to /register
```

### 📊 Détails:
- **File**: `app/login/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useRouter`, `useTransition`, `useEffect`
- **Lib Dependencies**: `@/lib/actions/auth`, `@/lib/utils`, `@/lib/session-provider`
- **Functions Used**:
  - `loginWithPassword()` - Email+password login
  - `sendMagicLink()` - Send magic link
  - `loginWithMagicLink()` - Login via token
  - `loginWithGoogle()` - OAuth flow
  - `createSession()` - Create session

---

## 3️⃣1️⃣ **app/discover/page.tsx**

### 🔗 Workflows Associés:
- (Discovery/Explore feature - No specific workflow)

### 📚 Imports LIB:
```typescript
// Minimal imports
```

### 🔧 Flux Principal:
```
User opens discover page
    ↓
Display featured/trending content
    ├─ Featured stores
    ├─ Trending products
    ├─ Popular services
    ├─ New businesses
    ├─ Sales/promotions
    │
    └─ Browse categories
        ├─ Click category
        └─ View items in category
```

### 📊 Détails:
- **File**: `app/discover/page.tsx`
- **Type**: Server Component
- **Lib Dependencies**: Minimal

---

## 3️⃣2️⃣ **app/shop/page.tsx**

### 🔗 Workflows Associés:
- ✅ **Ajouter au Panier** (Workflow #2)

### 📚 Imports LIB:
```typescript
import { getLatestItems } from '@/lib/actions/items';
```

### 🔧 Flux Principal:
```
User opens shop page
    ↓
Load latest products
    ├─ Display product grid
    ├─ Show product cards
    │   ├─ Image
    │   ├─ Name
    │   ├─ Price
    │   ├─ Rating
    │   ├─ "Quick view" button
    │   └─ "Add to cart" button
    │
    └─ Filtering/sorting
        ├─ Sort by: newest/popular/price
        ├─ Filter by category
        ├─ Filter by price range
        └─ Filter by rating
```

### 📊 Détails:
- **File**: `app/shop/page.tsx`
- **Type**: Client Component ('use client')
- **Hooks**: `useState`, `useEffect`
- **Lib Dependencies**: `@/lib/actions/items`, `@/lib/stores/use-cart-store`
- **Functions Used**:
  - `getLatestItems()` - Load products
  - `addToCart()` - Add item to cart

---

## 3️⃣3️⃣ **app/valider/page.tsx**

### 🔗 Workflows Associés:
- (Order validation/confirmation page)

### 📚 Imports LIB:
```typescript
// Page to validate orders after checkout
```

### 🔧 Flux Principal:
```
After checkout/order creation
    ↓
Redirect to /valider
    ├─ Show order confirmation
    ├─ Display order number
    ├─ Show items purchased
    ├─ Display total amount
    ├─ Show estimated delivery date
    │
    └─ Actions
        ├─ Download invoice
        ├─ Track order
        └─ Continue shopping
```

### 📊 Détails:
- **File**: `app/valider/page.tsx`
- **Type**: Server Component
- **Lib Dependencies**: `@/lib/actions/orders`

---

# 📚 FICHIERS LIB

---

## 🔐 **Authentication & Session**

### **@/lib/actions/auth.ts**

#### 🔗 Workflows Associés:
- ✅ **Inscription** (Workflow #8)
- ✅ **Connexion** (Workflow #9)

#### 📍 Usages:
```
app/auth/update-password/page.tsx
app/register/page.tsx
app/login/page.tsx
app/profile/businessOwner/page.tsx
```

#### 🔧 Fonctions Principales:
```typescript
export async function registerUser(email, password, userType)
export async function loginWithPassword(email, password)
export async function sendMagicLink(email)
export async function loginWithMagicLink(token)
export async function loginWithGoogle(googleToken)
export async function sendVerificationEmail(email)
export async function verifyEmail(token)
export async function sendPasswordResetEmail(email)
export async function updateUserPassword(userId, newPassword)
export async function createSession(userId)
export async function checkEmailExists(email)
export async function updateUserRole(userId, role)
```

---

### **@/lib/session-provider.ts**

#### 🔗 Workflows Associés:
- ✅ **Connexion** (Workflow #9)

#### 📍 Usages:
```
app/layout.tsx (Root provider)
All pages that need auth context
```

#### 🔧 Fonctions Principales:
```typescript
export function SessionProvider({ children })
export function useSession()
export async function getSession()
```

---

## 🛒 **Commerce & Orders**

### **@/lib/actions/items.ts**

#### 🔗 Workflows Associés:
- ✅ **Ajouter au Panier** (Workflow #2)
- ✅ **Créer Produit** (Workflow #4)
- ✅ **Admin Ajouter Produit** (Workflow #12)

#### 📍 Usages:
```
app/dashboard/[id]/products/page.tsx (Admin CRUD)
app/merchants/product/[id]/page.tsx (View product)
app/merchants/business/[id]/page.tsx (List products)
app/search/page.tsx (Search products)
app/shop/page.tsx (Display products)
```

#### 🔧 Fonctions Principales:
```typescript
export async function getAdminItemsByStoreId(storeId)
export async function upsertItem(itemData)
export async function deleteItem(itemId)
export async function getProductById(productId)
export async function getLatestItems()
export async function searchItems(query)
export async function getPublicItemsByStoreId(storeId)
export async function getRelatedItems(itemId, count = 5)
```

---

### **@/lib/stores/use-cart-store.ts** (Zustand)

#### 🔗 Workflows Associés:
- ✅ **Ajouter au Panier** (Workflow #2)

#### 📍 Usages:
```
app/profile/cart/page.tsx (Cart page)
app/merchants/product/[id]/page.tsx (Add to cart)
app/shop/page.tsx (Add to cart)
Components: CartWidget, ProductCard
```

#### 🔧 Fonctions Principales:
```typescript
export function useCartStore() // Zustand hook
  .addToCart(product, quantity)
  .removeFromCart(productId)
  .updateItemQuantity(productId, quantity)
  .clearCart()
  .getCartTotal()
  .getCartCount()
  .getCartItems()
```

---

### **@/lib/actions/orders.ts**

#### 🔗 Workflows Associés:
- ✅ **Ajouter au Panier** (Workflow #2)
- ✅ **Vérification QR Code** (Workflow #7)
- ✅ **Détection Fraude** (Workflow #15)

#### 📍 Usages:
```
app/dashboard/[id]/leads/page.tsx (Fraud detection + accept/reject)
app/dashboard/[id]/qr-verify/[code]/page.tsx (QR verification)
app/dashboard/[id]/transactions/page.tsx (Order management)
app/profile/cart/page.tsx (Create order)
```

#### 🔧 Fonctions Principales:
```typescript
export async function createOrder(orderData)
export async function getOrderByTrackingCode(trackingCode)
export async function updateOrderStatus(orderId, status)
export async function getUserOrders(userId)
export async function getStoreTransactions(storeId)
export async function getOrderById(orderId)
export async function cancelOrder(orderId)
export async function getOrderInvoice(orderId)
```

---

### **@/lib/actions/reservation.ts**

#### 🔗 Workflows Associés:
- ✅ **Ajouter au Panier** (Workflow #2) - For services
- ✅ **Vérification QR Code** (Workflow #7)

#### 📍 Usages:
```
app/merchants/service/[id]/page.tsx (Book service)
app/dashboard/[id]/qr-verify/[code]/page.tsx (QR verification)
app/dashboard/[id]/leads/page.tsx (Fraud detection)
app/dashboard/[id]/transactions/page.tsx (Booking management)
```

#### 🔧 Fonctions Principales:
```typescript
export async function createReservation(reservationData)
export async function getBookingByTrackingCode(trackingCode)
export async function updateBookingStatus(bookingId, status)
export async function getUserBookings(userId)
export async function getStoreBookings(storeId)
export async function cancelBooking(bookingId)
export async function getAvailableTimeSlots(serviceId, date)
```

---

## 🏪 **Stores & Businesses**

### **@/lib/actions/stores.ts**

#### 🔗 Workflows Associés:
- ✅ **Recherche Darija** (Workflow #1)
- ✅ **Ajouter au Panier** (Workflow #2)
- ✅ **Support Tickets** (Workflow #16)

#### 📍 Usages:
```
app/dashboard/[id]/layout.tsx (Get user stores)
app/dashboard/[id]/page.tsx (Dashboard)
app/merchants/business/[id]/page.tsx (View business)
app/messages/page.tsx (Get store info)
app/search/page.tsx (Search stores)
```

#### 🔧 Fonctions Principales:
```typescript
export async function getStoreById(storeId)
export async function getUserStores(userId)
export async function updateStoreProfile(storeId, data)
export async function getBusinessById(storeId)
export async function getPublicBusinessProfile(storeId)
export async function searchStores(query)
export async function getPrimaryStoreForOwner(userId)
export async function getPromotions(storeId)
export async function recordStoreView(storeId)
export async function hasCompletedTransactionWithStore(userId, storeId)
```

---

### **@/lib/actions/addbuss.ts**

#### 🔗 Workflows Associés:
- ✅ **Demande Vendeur** (Workflow #10)

#### 📍 Usages:
```
app/merchants/business/add/page.tsx (Add business)
```

#### 🔧 Fonctions Principales:
```typescript
export async function addBusiness(businessData)
export async function searchUnified(query)
export async function getPendingBusinessRequests()
export async function approveBusinessRequest(requestId)
export async function rejectBusinessRequest(requestId)
```

---

## 🔍 **Search & Discovery**

### **@/lib/actions/search.ts**

#### 🔗 Workflows Associés:
- ✅ **Recherche Darija** (Workflow #1)
- ✅ **Vision (Image Search)** (Workflow #5)
- ✅ **Géolocalisation** (Workflow #6)

#### 📍 Usages:
```
app/search/page.tsx (Main search)
app/search/searchProduct/page.tsx (Product search)
app/search/searchService/page.tsx (Service search)
```

#### 🔧 Fonctions Principales:
```typescript
export async function doGlobalSemanticSearch(query, filters, location)
export async function searchStores(query)
export async function searchItems(query, filters)
export async function searchServicesDirectory(query, filters)
export async function searchByImageTags(tags, filters)
export async function searchNearbyStores(lat, lng, radiusKm, filters)
```

---

### **@/lib/actions/product_detail.ts**

#### 🔗 Workflows Associés:
- ✅ **Ajouter au Panier** (Workflow #2)

#### 📍 Usages:
```
app/merchants/product/[id]/page.tsx (Product details)
```

#### 🔧 Fonctions Principales:
```typescript
export async function getProductById(productId)
export async function getProductReviews(productId)
export async function getRelatedItems(productId)
```

---

### **@/lib/actions/service_detail.ts**

#### 🔗 Workflows Associés:
- ✅ **Ajouter au Panier** (Workflow #2)

#### 📍 Usages:
```
app/merchants/service/[id]/page.tsx (Service details)
```

#### 🔧 Fonctions Principais:
```typescript
export async function getServiceById(serviceId)
export async function getServiceReviews(serviceId)
export async function getRelatedItems(serviceId)
```

---

## 👥 **Users & Profiles**

### **@/lib/actions/users.ts**

#### 🔗 Workflows Associés:
- ✅ **Connexion** (Workflow #9)
- ✅ **Support Tickets** (Workflow #16)

#### 📍 Usages:
```
app/dashboard/[id]/layout.tsx (Get user profile)
app/profile/user/page.tsx (User profile management)
app/profile/businessOwner/page.tsx (Owner profile)
app/messages/page.tsx (Get user info)
app/public/user/[id]/page.tsx (View public profile)
```

#### 🔧 Fonctions Principais:
```typescript
export async function getUserProfile(userId)
export async function getPublicUserProfile(userId)
export async function updateProfile(userId, data)
export async function updateAvatar(userId, avatarUrl)
export async function deleteAccount(userId)
export async function getUserOrders(userId)
export async function getUserBookings(userId)
export async function blockUser(blockedUserId)
```

---

### **@/lib/actions/profile.ts**

#### 🔗 Workflows Associés:
- ✅ **Dashboard Admin** (Workflow #11)

#### 📍 Usages:
```
app/profile/user/page.tsx (User profile)
app/profile/businessOwner/page.tsx (Owner profile)
```

#### 🔧 Fonctions Principais:
```typescript
export async function getUserProfileData(userId)
export async function getOwnerProfileData(userId)
export async function deleteStore(storeId)
export async function transferStoreOwnership(storeId, newOwnerId)
```

---

### **@/lib/actions/friendships.ts**

#### 🔗 Workflows Associés:
- ✅ **Support Tickets** (Workflow #16)

#### 📍 Usages:
```
app/messages/page.tsx (Check friendship)
app/public/user/[id]/page.tsx (Check friendship)
```

#### 🔧 Fonctions Principais:
```typescript
export async function getFriendshipStatus(userId1, userId2)
export async function sendFriendRequest(fromUserId, toUserId)
export async function acceptFriendRequest(requestId)
export async function getFriendSuggestions(userId)
export async function blockUser(blockedUserId)
```

---

## 💬 **Reviews & Comments**

### **@/lib/actions/reviews.ts**

#### 🔗 Workflows Associés:
- ✅ **Avis/Review** (Workflow #14)

#### 📍 Usages:
```
app/dashboard/[id]/intelligence/page.tsx (Manage reviews)
app/dashboard/[id]/social/page.tsx (Moderate reviews)
app/merchants/product/[id]/page.tsx (Display reviews)
app/merchants/business/[id]/page.tsx (Display reviews)
```

#### 🔧 Fonctions Principales:
```typescript
export async function createReview(reviewData)
export async function getReviewsByStoreId(storeId)
export async function getProductReviews(productId)
export async function getServiceReviews(serviceId)
export async function respondToReview(reviewId, response)
export async function deleteReview(reviewId)
export async function updateReviewWithScore(reviewId, sentimentScore)
```

---

### **@/lib/actions/comments.ts**

#### 🔗 Workflows Associés:
- ✅ **Avis/Review** (Workflow #14)

#### 📍 Usages:
```
app/dashboard/[id]/intelligence/page.tsx (Manage comments)
app/dashboard/[id]/social/page.tsx (Moderate comments)
```

#### 🔧 Fonctions Principales:
```typescript
export async function getStoreReelComments(reelId)
export async function postReelComment(commentData)
export async function deleteReelComment(commentId)
```

---

## 📊 **Dashboard & Analytics**

### **@/lib/actions/overviews.ts**

#### 🔗 Workflows Associés:
- ✅ **Dashboard Admin** (Workflow #11)
- ✅ **Recommandation IA** (Workflow #3)

#### 📍 Usages:
```
app/dashboard/[id]/layout.tsx (Sidebar stats)
app/dashboard/[id]/page.tsx (Dashboard overview)
```

#### 🔧 Fonctions Principais:
```typescript
export async function getDashboardOverview(storeId)
export async function getSidebarStats(storeId)
export async function searchDashboard(storeId, query)
export async function getStoreAnalytics(storeId, period)
```

---

### **@/lib/admin/vendor-approvals.ts**

#### 🔗 Workflows Associés:
- ✅ **Demande Vendeur** (Workflow #10)
- ✅ **Dashboard Admin** (Workflow #11)

#### 📍 Usages:
```
app/dashboard/[id]/layout.tsx (Admin notifications)
Admin dashboard (vendor approval page)
```

#### 🔧 Fonctions Principales:
```typescript
export async function getPendingVendorRequests()
export async function getVendorRequestDetails(requestId)
export async function approveVendorRequest(requestId)
export async function rejectVendorRequest(requestId)
```

---

## 🎥 **Media & Content**

### **@/lib/actions/reels.ts**

#### 🔗 Workflows Associés:
- ✅ **Créer Reel** (Workflow #17)

#### 📍 Usages:
```
app/dashboard/[id]/reels/page.tsx (Reel management)
```

#### 🔧 Fonctions Principais:
```typescript
export async function publishReel(reelData)
export async function getBusinessReels(storeId)
export async function deleteReel(reelId)
export async function updateReelStatus(reelId, status)
```

---

### **@/lib/actions/stories.ts**

#### 🔗 Workflows Associés:
- ✅ **Créer Story** (Workflow #18)

#### 📍 Usages:
```
app/dashboard/[id]/stories/page.tsx (Story management)
app/dashboard/[id]/reels/page.tsx (Story management)
app/merchants/business/[id]/page.tsx (Display stories)
```

#### 🔧 Fonctions Principais:
```typescript
export async function publishStory(storyData)
export async function getDashboardStories(storeId)
export async function deleteStory(storyId)
export async function uploadStoryMedia(file)
export async function getBusinessStories(storeId)
```

---

## 🎫 **Support & Messaging**

### **@/lib/actions/support.ts**

#### 🔗 Workflows Associés:
- ✅ **Support Tickets** (Workflow #16)

#### 📍 Usages:
```
app/dashboard/[id]/support/tickets/page.tsx (Ticket management)
```

#### 🔧 Fonctions Principales:
```typescript
export async function createSupportTicket(ticketData)
export async function getStoreTickets(storeId)
export async function getTicketMessages(ticketId)
export async function updateTicket(ticketId, data)
export async function deleteTicket(ticketId)
```

---

### **@/lib/hooks/useMessaging.ts** (Custom Hook)

#### 🔗 Workflows Associés:
- ✅ **Support Tickets** (Workflow #16)

#### 📍 Usages:
```
app/messages/page.tsx (Real-time messaging)
app/dashboard/[id]/support/tickets/page.tsx (Chat)
```

#### 🔧 Fonctions Principales:
```typescript
export function useMessaging(channelId)
  .messages
  .sendMessage(message)
  .subscribe()
  .unsubscribe()
  .markAsRead()
```

---

## 🚨 **Fraud & Security**

### **@/lib/fraud-detection.ts**

#### 🔗 Workflows Associés:
- ✅ **Détection Fraude** (Workflow #15)

#### 📍 Usages:
```
app/dashboard/[id]/leads/page.tsx (Fraud analysis)
```

#### 🔧 Fonctions Principais:
```typescript
export async function analyzeFraud(orderData)
export async function calculateFraudScore(factors)
export async function getFraudRiskLevel(score)
```

---

## 🤖 **AI & Intelligence**

### **@/lib/ai/recommendations.ts**

#### 🔗 Workflows Associés:
- ✅ **Recommandation IA** (Workflow #3)

#### 📍 Usages:
```
app/dashboard/[id]/intelligence/page.tsx (AI recommendations)
app/dashboard/[id]/page.tsx (AI section)
```

#### 🔧 Fonctions Principais:
```typescript
export async function generatePromotionRecommendation(storeId, metrics)
export async function analyzeStoreMetrics(storeId)
export async function suggestPricing(itemData)
```

---

### **@/lib/ai/sentiment-analysis.ts**

#### 🔗 Workflows Associés:
- ✅ **Avis/Review** (Workflow #14)

#### 📍 Usages:
```
app/dashboard/[id]/intelligence/page.tsx (Sentiment trends)
```

#### 🔧 Fonctions Principais:
```typescript
export async function analyzeSentiment(text)
export async function extractScore(analysis)
export async function classifyReview(review)
```

---

### **@/lib/ai/darija-voice.ts**

#### 🔗 Workflows Associés:
- ✅ **Créer Produit** (Workflow #4)

#### 📍 Usages:
```
app/dashboard/[id]/products/page.tsx (Voice input)
```

#### 🔧 Fonctions Principais:
```typescript
export async function transcribeDarija(audioFile)
export async function extractProductInfo(text)
```

---

### **@/lib/vision/image-analyzer.ts**

#### 🔗 Workflows Associés:
- ✅ **Vision (Image Search)** (Workflow #5)

#### 📍 Usages:
```
app/search/page.tsx (Image search)
```

#### 🔧 Fonctions Principais:
```typescript
export async function analyzeImage(imageFile)
export async function generateImageVector(imageTags)
export async function searchByImageTags(tags)
```

---

## 📍 **Location & Mapping**

### **@/lib/location/geolocation.ts**

#### 🔗 Workflows Associés:
- ✅ **Géolocalisation** (Workflow #6)

#### 📍 Usages:
```
app/search/page.tsx (Location-based search)
```

#### 🔧 Fonctions Principais:
```typescript
export function getGeolocation()
export async function reverseGeocode(lat, lng)
export async function searchNearbyStores(lat, lng, radiusKm)
```

---

## 🔑 **QR & Verification**

### **@/lib/qr/qr-validator.ts**

#### 🔗 Workflows Associés:
- ✅ **Vérification QR Code** (Workflow #7)

#### 📍 Usages:
```
app/dashboard/[id]/qr-verify/[code]/page.tsx (QR validation)
```

#### 🔧 Fonctions Principais:
```typescript
export function validateQRCode(code)
export function decodeQRCode(code)
export function validateQRValidity(expiresAt)
```

---

### **@/lib/qr/qr-generator.ts**

#### 🔗 Workflows Associés:
- ✅ **Détection Fraude** (Workflow #15)

#### 📍 Usages:
```
app/dashboard/[id]/leads/page.tsx (Generate QR)
```

#### 🔧 Fonctions Principales:
```typescript
export function generateQRCode(data)
export function generateTrackingCode()
```

---

## 💾 **File Upload & Storage**

### **@/lib/cloudinary.ts**

#### 🔗 Workflows Associés:
- ✅ **Créer Produit** (Workflow #4)
- ✅ **Créer Reel** (Workflow #17)
- ✅ **Créer Story** (Workflow #18)

#### 📍 Usages:
```
app/dashboard/[id]/products/page.tsx (Product images)
app/dashboard/[id]/reels/page.tsx (Video upload)
app/dashboard/[id]/stories/page.tsx (Media upload)
app/merchants/business/add/page.tsx (Logo/cover)
```

#### 🔧 Fonctions Principais:
```typescript
export async function uploadToCloudinary(file)
export async function uploadImage(imageFile)
export async function uploadVideo(videoFile)
export async function uploadWithProgress(file, onProgress)
export async function generateVideoThumbnail(videoUrl)
```

---

### **@/lib/supabase/storage.ts**

#### 🔗 Workflows Associés:
- General file storage

#### 📍 Usages:
```
App pages using file upload
```

#### 🔧 Fonctions Principais:
```typescript
export async function uploadFile(bucket, path, file)
export async function deleteFile(bucket, path)
export async function getFileUrl(bucket, path)
```

---

## 🔄 **Real-time & Supabase**

### **@/lib/supabase/client.ts**

#### 🔗 Workflows Associés:
- Used by ALL workflows

#### 📍 Usages:
```
Every app page using database
```

#### 🔧 Fonctions Principais:
```typescript
export function createClient()
export async function query(table, options)
export function subscribe(table, filters, callback)
export async function insert(table, data)
export async function update(table, id, data)
export async function delete(table, id)
```

---

### **@/lib/suggestions.ts**

#### 🔗 Workflows Associés:
- Friend suggestions

#### 📍 Usages:
```
app/messages/suggestions/page.tsx
```

#### 🔧 Fonctions Principais:
```typescript
export async function getFriendSuggestions(userId)
```

---

### **@/lib/leads.ts**

#### 🔗 Workflows Associés:
- ✅ **Détection Fraude** (Workflow #15)

#### 📍 Usages:
```
app/dashboard/[id]/leads/page.tsx
```

#### 🔧 Fonctions Principais:
```typescript
export async function getLeadActions(storeId)
export async function getLeadDetails(leadId)
```

---

## 🎨 **Utilities & Styling**

### **@/lib/utils/index.ts**

#### 🔗 Workflows Associés:
- Used by all components

#### 📍 Usages:
```
Every file using styling
```

#### 🔧 Fonctions Principais:
```typescript
export function cn(...classes)
export function classNames(obj)
```

---

### **@/lib/utils/avatar.ts**

#### 🔗 Workflows Associés:
- Dashboard layout

#### 📍 Usages:
```
app/dashboard/[id]/layout.tsx
```

#### 🔧 Fonctions Principais:
```typescript
export function getAvatarUrl(userId)
```

---

### **@/lib/dashboard/store-access.ts**

#### 🔗 Workflows Associés:
- Authorization checks

#### 📍 Usages:
```
app/dashboard/[id]/layout.tsx
app/dashboard/[id]/page.tsx
```

#### 🔧 Fonctions Principais:
```typescript
export async function isStoreDashboardLocked(userId, storeId)
```

---

### **@/lib/hooks/useTracking.ts**

#### 🔗 Workflows Associés:
- ✅ **Recherche Darija** (Workflow #1)

#### 📍 Usages:
```
app/search/page.tsx
app/merchants/business/[id]/page.tsx
```

#### 🔧 Fonctions Principales:
```typescript
export function useTracking()
  .trackSearch(query, results)
  .trackStoreView(storeId)
  .trackProductView(productId)
```

---

# 📊 **COMPLETE SUMMARY TABLE**

|Category|Count|Key Files|
|--------|-----|---------|
|App Pages|36|dashboard, merchants, profile, search, auth, messages|
|Lib Modules|33|actions, stores, hooks, utils, ai, qr, location|
|Workflows|18|Search, Cart, Recommendations, Products, etc|
|Lib Functions|85+|All documented above|
|Auth Methods|3|Email/Pass, Magic Link, Google OAuth|
|Real-time|1|Supabase Realtime (Messaging, Comments)|
|AI Features|4|Sentiment, Recommendations, Vision, Voice|
|File Upload|2|Cloudinary (media), Supabase (files)|

---

**Generated**: 2026-06-07
**Version**: 2.0
**Coverage**: 36 App files + 33 Lib modules = 69 files documented
