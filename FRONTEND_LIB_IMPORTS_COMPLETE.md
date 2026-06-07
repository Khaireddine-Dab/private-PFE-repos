# 📋 Rapport Complet: Fichiers Frontend (.tsx) + Imports LIB + Fonctions

Généré: 07/06/2026 16:36:41

## 📊 Index

- **Total .tsx files**: 36
- **Files with lib imports**: 28
- **Total lib import statements**: 81
- **Unique lib modules**: 33
- **Unique functions imported**: 85

---

## 📁 FICHIERS DÉTAILLÉS

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/auth/update-password/page.tsx

#### 📚 Imports LIB (1)

**Module**: `@/lib/actions/auth`
**Imports**: `updateUserPassword`

#### 🔧 Fonctions Utilisées (1)

- **updateUserPassword** (from @/lib/actions/auth) - Called 1 time(s)

#### 🪝 Hooks Utilisées (3)

- `useRouter()`
- `useTransition()`
- `useState()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/intelligence/page.tsx

#### 📚 Imports LIB (3)

**Module**: `@/lib/actions/reviews`
**Imports**: `getReviewsByStoreId`, `respondToReview`

**Module**: `@/lib/actions/comments`
**Imports**: `getStoreReelComments`, `postReelComment`, `deleteReelComment`

**Module**: `@/lib/utils`
**Imports**: `cn`

#### 🔧 Fonctions Utilisées (6)

- **getReviewsByStoreId** (from @/lib/actions/reviews) - Called 1 time(s)
- **respondToReview** (from @/lib/actions/reviews) - Called 1 time(s)
- **getStoreReelComments** (from @/lib/actions/comments) - Called 1 time(s)
- **postReelComment** (from @/lib/actions/comments) - Called 1 time(s)
- **deleteReelComment** (from @/lib/actions/comments) - Called 1 time(s)
- **cn** (from @/lib/utils) - Called 2 time(s)

#### 🪝 Hooks Utilisées (3)

- `useParams()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/layout.tsx

#### 📚 Imports LIB (9)

**Module**: `@/lib/utils`
**Imports**: `cn`

**Module**: `@/lib/actions/overviews`
**Imports**: `getSidebarStats`

**Module**: `@/lib/supabase/client`
**Imports**: `createClient`

**Module**: `@/lib/actions/users`
**Imports**: `getUserProfile`

**Module**: `@/lib/actions/stores`
**Imports**: `getUserStores`

**Module**: `@/lib/actions/overviews`
**Imports**: `searchDashboard`

**Module**: `@/lib/context/UploadContext`
**Imports**: `UploadProvider`

**Module**: `@/lib/utils/avatar`
**Imports**: `getAvatarUrl`

**Module**: `@/lib/dashboard/store-access`
**Imports**: `isStoreDashboardLocked`

#### 🔧 Fonctions Utilisées (8)

- **cn** (from @/lib/utils) - Called 8 time(s)
- **getSidebarStats** (from @/lib/actions/overviews) - Called 1 time(s)
- **createClient** (from @/lib/supabase/client) - Called 3 time(s)
- **getUserProfile** (from @/lib/actions/users) - Called 1 time(s)
- **getUserStores** (from @/lib/actions/stores) - Called 1 time(s)
- **searchDashboard** (from @/lib/actions/overviews) - Called 1 time(s)
- **getAvatarUrl** (from @/lib/utils/avatar) - Called 1 time(s)
- **isStoreDashboardLocked** (from @/lib/dashboard/store-access) - Called 4 time(s)

#### 🪝 Hooks Utilisées (5)

- `usePathname()`
- `useParams()`
- `useState()`
- `useRouter()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/leads/page.tsx

#### 📚 Imports LIB (3)

**Module**: `@/lib/actions/leads`
**Imports**: `getLeadActions`, `updateOrderStatus`

**Module**: `@/lib/actions/reservation`
**Imports**: `updateBookingStatus`

**Module**: `@/lib/actions/friendships`
**Imports**: `blockUser`

#### 🔧 Fonctions Utilisées (4)

- **getLeadActions** (from @/lib/actions/leads) - Called 1 time(s)
- **updateOrderStatus** (from @/lib/actions/leads) - Called 2 time(s)
- **updateBookingStatus** (from @/lib/actions/reservation) - Called 2 time(s)
- **blockUser** (from @/lib/actions/friendships) - Called 1 time(s)

#### 🪝 Hooks Utilisées (4)

- `useParams()`
- `useState()`
- `useEffect()`
- `useMemo()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/page.tsx

#### 📚 Imports LIB (3)

**Module**: `@/lib/actions/overviews`
**Imports**: `getDashboardOverview`

**Module**: `@/lib/dashboard/store-access`
**Imports**: `isStoreDashboardLocked`

**Module**: `@/lib/utils`
**Imports**: `cn`

#### 🔧 Fonctions Utilisées (3)

- **getDashboardOverview** (from @/lib/actions/overviews) - Called 1 time(s)
- **isStoreDashboardLocked** (from @/lib/dashboard/store-access) - Called 1 time(s)
- **cn** (from @/lib/utils) - Called 2 time(s)

#### 🪝 Hooks Utilisées (3)

- `useParams()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/products/page.tsx

#### 📚 Imports LIB (4)

**Module**: `@/lib/actions/items`
**Imports**: `getAdminItemsByStoreId`, `upsertItem`, `deleteItem`

**Module**: `@/lib/actions/stores`
**Imports**: `getStoreByAnyId`

**Module**: `@/lib/actions/promotions`
**Imports**: `getPromotions`

**Module**: `@/lib/cloudinary`
**Imports**: `uploadToCloudinary`, `uploadMultipleToCloudinary`

#### 🔧 Fonctions Utilisées (7)

- **getAdminItemsByStoreId** (from @/lib/actions/items) - Called 1 time(s)
- **upsertItem** (from @/lib/actions/items) - Called 2 time(s)
- **deleteItem** (from @/lib/actions/items) - Called 1 time(s)
- **getStoreByAnyId** (from @/lib/actions/stores) - Called 1 time(s)
- **getPromotions** (from @/lib/actions/promotions) - Called 1 time(s)
- **uploadToCloudinary** (from @/lib/cloudinary) - Called 1 time(s)
- **uploadMultipleToCloudinary** (from @/lib/cloudinary) - Called 2 time(s)

#### 🪝 Hooks Utilisées (3)

- `useParams()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/profile/page.tsx

#### 📚 Imports LIB (2)

**Module**: `@/lib/actions/stores`
**Imports**: `getStoreById`, `updateStoreProfile`, `getStoreByAnyId`

**Module**: `@/lib/supabase/storage`
**Imports**: `uploadFile`

#### 🔧 Fonctions Utilisées (3)

- **updateStoreProfile** (from @/lib/actions/stores) - Called 1 time(s)
- **getStoreByAnyId** (from @/lib/actions/stores) - Called 1 time(s)
- **uploadFile** (from @/lib/supabase/storage) - Called 2 time(s)

#### 🪝 Hooks Utilisées (3)

- `useParams()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/reels/page.tsx

#### 📚 Imports LIB (4)

**Module**: `@/lib/actions/reels`
**Imports**: `getBusinessReels`, `deleteReel`, `publishReel`

**Module**: `@/lib/context/UploadContext`
**Imports**: `useUpload`

**Module**: `@/lib/actions/stories`
**Imports**: `getDashboardStories`, `deleteStory`, `publishStory`

**Module**: `@/lib/utils`
**Imports**: `cn`

#### 🔧 Fonctions Utilisées (8)

- **getBusinessReels** (from @/lib/actions/reels) - Called 1 time(s)
- **deleteReel** (from @/lib/actions/reels) - Called 1 time(s)
- **publishReel** (from @/lib/actions/reels) - Called 1 time(s)
- **useUpload** (from @/lib/context/UploadContext) - Called 1 time(s)
- **getDashboardStories** (from @/lib/actions/stories) - Called 1 time(s)
- **deleteStory** (from @/lib/actions/stories) - Called 1 time(s)
- **publishStory** (from @/lib/actions/stories) - Called 1 time(s)
- **cn** (from @/lib/utils) - Called 4 time(s)

#### 🪝 Hooks Utilisées (5)

- `useParams()`
- `useRouter()`
- `useState()`
- `useEffect()`
- `useUpload()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/social/page.tsx

#### 📚 Imports LIB (2)

**Module**: `@/lib/actions/reviews`
**Imports**: `getReviewsByStoreId`, `respondToReview`

**Module**: `@/lib/actions/comments`
**Imports**: `getStoreReelComments`, `postReelComment`, `deleteReelComment`

#### 🔧 Fonctions Utilisées (5)

- **getReviewsByStoreId** (from @/lib/actions/reviews) - Called 1 time(s)
- **respondToReview** (from @/lib/actions/reviews) - Called 1 time(s)
- **getStoreReelComments** (from @/lib/actions/comments) - Called 1 time(s)
- **postReelComment** (from @/lib/actions/comments) - Called 1 time(s)
- **deleteReelComment** (from @/lib/actions/comments) - Called 1 time(s)

#### 🪝 Hooks Utilisées (3)

- `useParams()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/stories/page.tsx

#### 📚 Imports LIB (1)

**Module**: `@/lib/actions/stories`
**Imports**: `getDashboardStories`, `deleteStory`, `uploadStoryMedia`, `publishStory`

#### 🔧 Fonctions Utilisées (4)

- **getDashboardStories** (from @/lib/actions/stories) - Called 1 time(s)
- **deleteStory** (from @/lib/actions/stories) - Called 1 time(s)
- **uploadStoryMedia** (from @/lib/actions/stories) - Called 1 time(s)
- **publishStory** (from @/lib/actions/stories) - Called 1 time(s)

#### 🪝 Hooks Utilisées (3)

- `useParams()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/support/tickets/page.tsx

#### 📚 Imports LIB (2)

**Module**: `@/lib/utils`
**Imports**: `cn`

**Module**: `@/lib/actions/support`
**Imports**: `createSupportTicket`, `deleteTicket`, `updateTicket`, `getStoreTickets`, `getTicketMessages`, `SupportTicket`

#### 🔧 Fonctions Utilisées (7)

- **cn** (from @/lib/utils) - Called 4 time(s)
- **createSupportTicket** (from @/lib/actions/support) - Called 1 time(s)
- **deleteTicket** (from @/lib/actions/support) - Called 1 time(s)
- **updateTicket** (from @/lib/actions/support) - Called 1 time(s)
- **getStoreTickets** (from @/lib/actions/support) - Called 1 time(s)
- **getTicketMessages** (from @/lib/actions/support) - Called 1 time(s)
- **SupportTicket** (from @/lib/actions/support) - Called 1 time(s)

#### 🪝 Hooks Utilisées (3)

- `useParams()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/transactions/page.tsx

#### 📚 Imports LIB (6)

**Module**: `@/lib/actions/transactions`
**Imports**: `getStoreTransactions`, `Transaction`

**Module**: `@/lib/actions/reservation`
**Imports**: `updateBookingStatus`

**Module**: `@/lib/actions/leads`
**Imports**: `updateOrderStatus`

**Module**: `@/lib/actions/orders`
**Imports**: `getUserOrders`

**Module**: `@/lib/actions/reservation`
**Imports**: `getUserBookings`

**Module**: `@/lib/supabase/client`
**Imports**: `createClient`

#### 🔧 Fonctions Utilisées (6)

- **getStoreTransactions** (from @/lib/actions/transactions) - Called 1 time(s)
- **updateBookingStatus** (from @/lib/actions/reservation) - Called 1 time(s)
- **updateOrderStatus** (from @/lib/actions/leads) - Called 1 time(s)
- **getUserOrders** (from @/lib/actions/orders) - Called 1 time(s)
- **getUserBookings** (from @/lib/actions/reservation) - Called 1 time(s)
- **createClient** (from @/lib/supabase/client) - Called 1 time(s)

#### 🪝 Hooks Utilisées (6)

- `useParams()`
- `useState()`
- `useRef()`
- `useCallback()`
- `useEffect()`
- `useMemo()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/qr-verify/[code]/page.tsx

#### 📚 Imports LIB (2)

**Module**: `@/lib/actions/orders`
**Imports**: `getOrderByTrackingCode`, `updateOrderStatus`

**Module**: `@/lib/actions/reservation`
**Imports**: `getBookingByTrackingCode`, `updateBookingStatus`

#### 🔧 Fonctions Utilisées (4)

- **getOrderByTrackingCode** (from @/lib/actions/orders) - Called 1 time(s)
- **updateOrderStatus** (from @/lib/actions/orders) - Called 1 time(s)
- **getBookingByTrackingCode** (from @/lib/actions/reservation) - Called 1 time(s)
- **updateBookingStatus** (from @/lib/actions/reservation) - Called 1 time(s)

#### 🪝 Hooks Utilisées (4)

- `useParams()`
- `useRouter()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/discover/page.tsx

**Status**: Aucun import de lib/

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/layout.tsx

**Status**: Aucun import de lib/

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/login/page.tsx

**Status**: Aucun import de lib/

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/merchants/business/[id]/page.tsx

#### 📚 Imports LIB (9)

**Module**: `@/lib/actions/business`
**Imports**: `getBusinessById`

**Module**: `@/lib/actions/reviews`
**Imports**: `getReviewsByStoreId`

**Module**: `@/lib/actions/items`
**Imports**: `getPublicItemsByStoreId`

**Module**: `@/lib/actions/stories`
**Imports**: `getBusinessStories`

**Module**: `@/lib/actions/promotions`
**Imports**: `getPromotions`

**Module**: `@/lib/actions/reels`
**Imports**: `recordStoreView`

**Module**: `@/lib/actions/transactions`
**Imports**: `hasCompletedTransactionWithStore`

**Module**: `@/lib/supabase/server`
**Imports**: `createClient`

**Module**: `@/lib/actions/items`
**Imports**: `Item`

#### 🔧 Fonctions Utilisées (8)

- **getBusinessById** (from @/lib/actions/business) - Called 1 time(s)
- **getReviewsByStoreId** (from @/lib/actions/reviews) - Called 1 time(s)
- **getPublicItemsByStoreId** (from @/lib/actions/items) - Called 1 time(s)
- **getBusinessStories** (from @/lib/actions/stories) - Called 1 time(s)
- **getPromotions** (from @/lib/actions/promotions) - Called 1 time(s)
- **recordStoreView** (from @/lib/actions/reels) - Called 1 time(s)
- **hasCompletedTransactionWithStore** (from @/lib/actions/transactions) - Called 1 time(s)
- **createClient** (from @/lib/supabase/server) - Called 1 time(s)

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/merchants/business/add/page.tsx

#### 📚 Imports LIB (2)

**Module**: `@/lib/actions/addbuss`
**Imports**: `addBusiness`, `searchUnified`

**Module**: `@/lib/supabase/client`
**Imports**: `createClient`

#### 🔧 Fonctions Utilisées (2)

- **addBusiness** (from @/lib/actions/addbuss) - Called 1 time(s)
- **searchUnified** (from @/lib/actions/addbuss) - Called 1 time(s)

#### 🪝 Hooks Utilisées (4)

- `useRouter()`
- `useTransition()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/merchants/product/[id]/page.tsx

#### 📚 Imports LIB (2)

**Module**: `@/lib/actions/product_detail`
**Imports**: `getProductById`, `getProductReviews`, `getRelatedItems`

**Module**: `@/lib/actions/stories`
**Imports**: `getBusinessStories`

#### 🔧 Fonctions Utilisées (4)

- **getProductById** (from @/lib/actions/product_detail) - Called 1 time(s)
- **getProductReviews** (from @/lib/actions/product_detail) - Called 1 time(s)
- **getRelatedItems** (from @/lib/actions/product_detail) - Called 1 time(s)
- **getBusinessStories** (from @/lib/actions/stories) - Called 1 time(s)

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/merchants/service/[id]/page.tsx

#### 📚 Imports LIB (2)

**Module**: `@/lib/actions/service_detail`
**Imports**: `getServiceById`, `getServiceReviews`, `getRelatedItems`

**Module**: `@/lib/actions/stories`
**Imports**: `getBusinessStories`

#### 🔧 Fonctions Utilisées (4)

- **getServiceById** (from @/lib/actions/service_detail) - Called 1 time(s)
- **getServiceReviews** (from @/lib/actions/service_detail) - Called 1 time(s)
- **getRelatedItems** (from @/lib/actions/service_detail) - Called 1 time(s)
- **getBusinessStories** (from @/lib/actions/stories) - Called 1 time(s)

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/messages/page.tsx

#### 📚 Imports LIB (3)

**Module**: `@/lib/actions/friendships`
**Imports**: `getFriendshipStatus`

**Module**: `@/lib/actions/users`
**Imports**: `getUserProfile`

**Module**: `@/lib/actions/stores`
**Imports**: `getPrimaryStoreForOwner`, `getStoreById`

#### 🔧 Fonctions Utilisées (4)

- **getFriendshipStatus** (from @/lib/actions/friendships) - Called 3 time(s)
- **getUserProfile** (from @/lib/actions/users) - Called 1 time(s)
- **getPrimaryStoreForOwner** (from @/lib/actions/stores) - Called 1 time(s)
- **getStoreById** (from @/lib/actions/stores) - Called 1 time(s)

#### 🪝 Hooks Utilisées (3)

- `useSearchParams()`
- `useMessaging()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/messages/suggestions/page.tsx

#### 📚 Imports LIB (1)

**Module**: `@/lib/suggestions`
**Imports**: `getFriendSuggestions`

#### 🔧 Fonctions Utilisées (1)

- **getFriendSuggestions** (from @/lib/suggestions) - Called 1 time(s)

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/page.tsx

**Status**: Aucun import de lib/

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/profile/businessOwner/page.tsx

#### 📚 Imports LIB (5)

**Module**: `@/lib/utils`
**Imports**: `cn`

**Module**: `@/lib/actions/profile`
**Imports**: `getOwnerProfileData`

**Module**: `@/lib/actions/stores`
**Imports**: `deleteStore`, `transferStoreOwnership`

**Module**: `@/lib/actions/auth`
**Imports**: `sendPasswordResetEmail`

**Module**: `@/lib/actions/users`
**Imports**: `updateProfile`, `updateAvatar`

#### 🔧 Fonctions Utilisées (7)

- **cn** (from @/lib/utils) - Called 8 time(s)
- **getOwnerProfileData** (from @/lib/actions/profile) - Called 3 time(s)
- **deleteStore** (from @/lib/actions/stores) - Called 1 time(s)
- **transferStoreOwnership** (from @/lib/actions/stores) - Called 1 time(s)
- **sendPasswordResetEmail** (from @/lib/actions/auth) - Called 1 time(s)
- **updateProfile** (from @/lib/actions/users) - Called 1 time(s)
- **updateAvatar** (from @/lib/actions/users) - Called 1 time(s)

#### 🪝 Hooks Utilisées (4)

- `useRouter()`
- `useState()`
- `useSearchParams()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/profile/cart/page.tsx

**Status**: Aucun import de lib/

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/profile/user/page.tsx

#### 📚 Imports LIB (4)

**Module**: `@/lib/actions/profile`
**Imports**: `getUserProfileData`

**Module**: `@/lib/actions/users`
**Imports**: `updateProfile`, `updateAvatar`, `deleteAccount`

**Module**: `@/lib/actions/auth`
**Imports**: `sendPasswordResetEmail`

**Module**: `@/lib/actions/favorites`
**Imports**: `toggleSaveAction`

#### 🔧 Fonctions Utilisées (6)

- **getUserProfileData** (from @/lib/actions/profile) - Called 1 time(s)
- **updateProfile** (from @/lib/actions/users) - Called 1 time(s)
- **updateAvatar** (from @/lib/actions/users) - Called 1 time(s)
- **deleteAccount** (from @/lib/actions/users) - Called 1 time(s)
- **sendPasswordResetEmail** (from @/lib/actions/auth) - Called 1 time(s)
- **toggleSaveAction** (from @/lib/actions/favorites) - Called 1 time(s)

#### 🪝 Hooks Utilisées (4)

- `useState()`
- `useEffect()`
- `useRouter()`
- `useSearchParams()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/profile/user/public/page.tsx

**Status**: Aucun import de lib/

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/public/business/[id]/page.tsx

#### 📚 Imports LIB (1)

**Module**: `@/lib/actions/public-profile`
**Imports**: `getPublicBusinessProfile`

#### 🔧 Fonctions Utilisées (1)

- **getPublicBusinessProfile** (from @/lib/actions/public-profile) - Called 1 time(s)

#### 🪝 Hooks Utilisées (4)

- `useParams()`
- `useRouter()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/public/user/[id]/page.tsx

#### 📚 Imports LIB (3)

**Module**: `@/lib/actions/public-profile`
**Imports**: `getPublicUserProfile`

**Module**: `@/lib/actions/friendships`
**Imports**: `getFriendshipStatus`, `sendFriendRequest`, `acceptFriendRequest`, `blockUser`, `unblockUser`

**Module**: `@/lib/utils`
**Imports**: `cn`

#### 🔧 Fonctions Utilisées (7)

- **getPublicUserProfile** (from @/lib/actions/public-profile) - Called 1 time(s)
- **getFriendshipStatus** (from @/lib/actions/friendships) - Called 2 time(s)
- **sendFriendRequest** (from @/lib/actions/friendships) - Called 1 time(s)
- **acceptFriendRequest** (from @/lib/actions/friendships) - Called 1 time(s)
- **blockUser** (from @/lib/actions/friendships) - Called 2 time(s)
- **unblockUser** (from @/lib/actions/friendships) - Called 1 time(s)
- **cn** (from @/lib/utils) - Called 2 time(s)

#### 🪝 Hooks Utilisées (4)

- `useState()`
- `useRouter()`
- `useEffect()`
- `useParams()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/register/page.tsx

**Status**: Aucun import de lib/

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/search/page.tsx

#### 📚 Imports LIB (1)

**Module**: `@/lib/actions/search`
**Imports**: `searchStores`, `searchItems`, `SearchResultItem`, `searchServicesDirectory`

#### 🪝 Hooks Utilisées (5)

- `useRouter()`
- `useSearchParams()`
- `useState()`
- `useTracking()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/search/searchProduct/page.tsx

#### 📚 Imports LIB (1)

**Module**: `@/lib/actions/search`
**Imports**: `searchItems`, `SearchResultItem`

#### 🔧 Fonctions Utilisées (1)

- **searchItems** (from @/lib/actions/search) - Called 1 time(s)

#### 🪝 Hooks Utilisées (4)

- `useRouter()`
- `useSearchParams()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/search/searchService/page.tsx

#### 📚 Imports LIB (1)

**Module**: `@/lib/actions/search`
**Imports**: `searchServicesDirectory`

#### 🔧 Fonctions Utilisées (1)

- **searchServicesDirectory** (from @/lib/actions/search) - Called 1 time(s)

#### 🪝 Hooks Utilisées (4)

- `useRouter()`
- `useSearchParams()`
- `useState()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/shop/page.tsx

#### 📚 Imports LIB (1)

**Module**: `@/lib/actions/items`
**Imports**: `getLatestItems`

#### 🔧 Fonctions Utilisées (1)

- **getLatestItems** (from @/lib/actions/items) - Called 1 time(s)

#### 🪝 Hooks Utilisées (3)

- `useState()`
- `useRouter()`
- `useEffect()`

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/test-ranking/page.tsx

**Status**: Aucun import de lib/

### 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/valider/page.tsx

#### 📚 Imports LIB (3)

**Module**: `@/lib/supabase/client`
**Imports**: `createClient`

**Module**: `@/lib/actions/reservation`
**Imports**: `updateBookingStatus`

**Module**: `@/lib/actions/leads`
**Imports**: `updateOrderStatus`

#### 🔧 Fonctions Utilisées (3)

- **createClient** (from @/lib/supabase/client) - Called 1 time(s)
- **updateBookingStatus** (from @/lib/actions/reservation) - Called 1 time(s)
- **updateOrderStatus** (from @/lib/actions/leads) - Called 1 time(s)

#### 🪝 Hooks Utilisées (4)

- `useSearchParams()`
- `useRouter()`
- `useState()`
- `useEffect()`


---

## 📊 STATISTIQUES GLOBALES

### Top 15 Fonctions Importées les Plus Utilisées

1. **cn** - Utilisée dans 7 fichier(s)
2. **createClient** - Utilisée dans 5 fichier(s)
3. **updateOrderStatus** - Utilisée dans 4 fichier(s)
4. **updateBookingStatus** - Utilisée dans 4 fichier(s)
5. **getReviewsByStoreId** - Utilisée dans 3 fichier(s)
6. **getBusinessStories** - Utilisée dans 3 fichier(s)
7. **respondToReview** - Utilisée dans 2 fichier(s)
8. **getStoreReelComments** - Utilisée dans 2 fichier(s)
9. **postReelComment** - Utilisée dans 2 fichier(s)
10. **deleteReelComment** - Utilisée dans 2 fichier(s)
11. **getUserProfile** - Utilisée dans 2 fichier(s)
12. **isStoreDashboardLocked** - Utilisée dans 2 fichier(s)
13. **blockUser** - Utilisée dans 2 fichier(s)
14. **getStoreByAnyId** - Utilisée dans 2 fichier(s)
15. **getPromotions** - Utilisée dans 2 fichier(s)

### Modules LIB les Plus Importés

- `@/lib/actions/addbuss`
- `@/lib/actions/auth`
- `@/lib/actions/business`
- `@/lib/actions/comments`
- `@/lib/actions/favorites`
- `@/lib/actions/friendships`
- `@/lib/actions/items`
- `@/lib/actions/leads`
- `@/lib/actions/orders`
- `@/lib/actions/overviews`
- `@/lib/actions/product_detail`
- `@/lib/actions/profile`
- `@/lib/actions/promotions`
- `@/lib/actions/public-profile`
- `@/lib/actions/reels`
- `@/lib/actions/reservation`
- `@/lib/actions/reviews`
- `@/lib/actions/search`
- `@/lib/actions/service_detail`
- `@/lib/actions/stores`
- `@/lib/actions/stories`
- `@/lib/actions/support`
- `@/lib/actions/transactions`
- `@/lib/actions/users`
- `@/lib/cloudinary`
- `@/lib/context/UploadContext`
- `@/lib/dashboard/store-access`
- `@/lib/suggestions`
- `@/lib/supabase/client`
- `@/lib/supabase/server`
- `@/lib/supabase/storage`
- `@/lib/utils`
- `@/lib/utils/avatar`
