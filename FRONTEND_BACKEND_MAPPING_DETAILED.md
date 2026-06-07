# Rapport: Frontend Fichiers + Backend Logiques (Ligne par Ligne)
Généré: 06/06/2026 22:48:47

Ce rapport analyse chaque fichier frontend (app + components) et identifie les logiques backend appliquées.

## 🎨 APP FILES (25 fichiers)


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/auth/update-password/page.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState, useTransition } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useRouter } from 'next/navigation';
```
**Line 5**: Import Backend Logic
```typescript
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
```
**Line 6**: Import Backend Logic
```typescript
import { updateUserPassword } from '@/lib/actions/auth';
```
→ **Backend**: @/lib/actions/auth

**Line 7**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 9**: Component/Function Definition
```typescript
export default function UpdatePasswordPage() {
```

**Line 10**: Hook Usage
```typescript
  const router = useRouter();
```
→ **Hook**: useRouter(

**Line 10**: Component/Function Definition
```typescript
  const router = useRouter();
```

**Line 11**: Hook Usage
```typescript
  const [isPending, startTransition] = useTransition();
```
→ **Hook**: useTransition(

**Line 12**: State Management
```typescript
  const [showPassword, setShowPassword] = useState(false);
```

**Line 12**: Hook Usage
```typescript
  const [showPassword, setShowPassword] = useState(false);
```
→ **Hook**: useState(

**Line 13**: State Management
```typescript
  const [formData, setFormData] = useState({
```

**Line 13**: Hook Usage
```typescript
  const [formData, setFormData] = useState({
```
→ **Hook**: useState(

**Line 17**: State Management
```typescript
  const [success, setSuccess] = useState(false);
```

**Line 17**: Hook Usage
```typescript
  const [success, setSuccess] = useState(false);
```
→ **Hook**: useState(

**Line 19**: Component/Function Definition
```typescript
  const handleSubmit = (e: React.FormEvent) => {
```

**Line 30**: Backend Call/Async Logic
```typescript
    startTransition(async () => {
```
→ **Type**: Async Operation

**Line 31**: Backend Call/Async Logic
```typescript
      const result = await updateUserPassword(formData.password);
```
→ **Type**: Async Operation

**Line 31**: Component/Function Definition
```typescript
      const result = await updateUserPassword(formData.password);
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/intelligence/page.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState, useEffect } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useParams } from 'next/navigation';
```
**Line 25**: Import Backend Logic
```typescript
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
```
**Line 26**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 27**: Import Backend Logic
```typescript
import { Progress } from '@/components/ui/progress';
```
**Line 28**: Import Backend Logic
```typescript
import { Badge } from '@/components/ui/badge';
```
**Line 29**: Import Backend Logic
```typescript
import { Textarea } from '@/components/ui/textarea';
```
**Line 30**: Import Backend Logic
```typescript
import { Label } from '@/components/ui/label';
```
**Line 31**: Import Backend Logic
```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
```
**Line 52**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 53**: Import Backend Logic
```typescript
import { getReviewsByStoreId, respondToReview } from '@/lib/actions/reviews';
```
→ **Backend**: @/lib/actions/reviews

**Line 54**: Import Backend Logic
```typescript
import { getStoreReelComments, postReelComment, deleteReelComment } from '@/lib/actions/comments';
```
→ **Backend**: @/lib/actions/comments

**Line 55**: Import Backend Logic
```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
```
**Line 56**: Import Backend Logic
```typescript
import { cn } from '@/lib/utils';
```
→ **Backend**: @/lib/utils

**Line 57**: Import Backend Logic
```typescript
import { format } from 'date-fns';
```
**Line 58**: Import Backend Logic
```typescript
import { fr } from 'date-fns/locale';
```
**Line 59**: Import Backend Logic
```typescript
import AIAdvisorSection from '@/components/dashboard/AIAdvisorSection';
```
**Line 61**: Component/Function Definition
```typescript
export default function IntelligencePage() {
```

**Line 62**: Hook Usage
```typescript
  const params = useParams();
```
→ **Hook**: useParams(

**Line 62**: Component/Function Definition
```typescript
  const params = useParams();
```

**Line 63**: Component/Function Definition
```typescript
  const id = params.id as string;
```

**Line 64**: Component/Function Definition
```typescript
  const storeId = Number(id);
```

**Line 68**: State Management
```typescript
  const [isIntelLoading, setIsIntelLoading] = useState(true);
```

**Line 68**: Hook Usage
```typescript
  const [isIntelLoading, setIsIntelLoading] = useState(true);
```
→ **Hook**: useState(

**Line 71**: State Management
```typescript
  const [activeTab, setActiveTab] = useState('analyses');
```

**Line 71**: Hook Usage
```typescript
  const [activeTab, setActiveTab] = useState('analyses');
```
→ **Hook**: useState(

**Line 74**: State Management
```typescript
  const [isLoadingInteractions, setIsLoadingInteractions] = useState(true);
```

**Line 74**: Hook Usage
```typescript
  const [isLoadingInteractions, setIsLoadingInteractions] = useState(true);
```
→ **Hook**: useState(

**Line 78**: State Management
```typescript
  const [replyContent, setReplyContent] = useState('');
```

**Line 78**: Hook Usage
```typescript
  const [replyContent, setReplyContent] = useState('');
```
→ **Hook**: useState(

**Line 79**: State Management
```typescript
  const [isSubmitting, setIsSubmitting] = useState(false);
```

**Line 79**: Hook Usage
```typescript
  const [isSubmitting, setIsSubmitting] = useState(false);
```
→ **Hook**: useState(

**Line 81**: Backend Call/Async Logic
```typescript
  const fetchIntelligence = async () => {
```
→ **Type**: Async Operation

**Line 81**: Component/Function Definition
```typescript
  const fetchIntelligence = async () => {
```

**Line 84**: Backend Call/Async Logic
```typescript
      const response = await fetch(`/api/dashboard/${id}/intelligence`);
```
→ **Type**: Async Operation

**Line 84**: API Route
```typescript
      const response = await fetch(`/api/dashboard/${id}/intelligence`);
```
→ **Type**: API Call

**Line 84**: Component/Function Definition
```typescript
      const response = await fetch(`/api/dashboard/${id}/intelligence`);
```

**Line 85**: Backend Call/Async Logic
```typescript
      const result = await response.json();
```
→ **Type**: Async Operation

**Line 85**: Component/Function Definition
```typescript
      const result = await response.json();
```

**Line 99**: Backend Call/Async Logic
```typescript
  const fetchInteractions = async (aiResults?: any[]) => {
```
→ **Type**: Async Operation

**Line 99**: Component/Function Definition
```typescript
  const fetchInteractions = async (aiResults?: any[]) => {
```

**Line 102**: Backend Call/Async Logic
```typescript
      const [revs, comms] = await Promise.all([
```
→ **Type**: Async Operation

**Line 108**: Component/Function Definition
```typescript
      const enrichedRevs = revs.map((r: any) => {
```

**Line 109**: Component/Function Definition
```typescript
        const ai = aiResults?.find((a: any) => a.originalComment === r.comment);
```

**Line 113**: Component/Function Definition
```typescript
      const enrichedComms = comms.map((c: any) => {
```

**Line 114**: Component/Function Definition
```typescript
        const ai = aiResults?.find((a: any) => a.originalComment === c.content);
```

**Line 127**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 139**: Backend Call/Async Logic
```typescript
  const handleReviewResponse = async (reviewId: number) => {
```
→ **Type**: Async Operation

**Line 139**: Component/Function Definition
```typescript
  const handleReviewResponse = async (reviewId: number) => {
```

**Line 143**: Backend Call/Async Logic
```typescript
      const res = await respondToReview(reviewId, replyContent);
```
→ **Type**: Async Operation

**Line 143**: Component/Function Definition
```typescript
      const res = await respondToReview(reviewId, replyContent);
```

**Line 159**: Backend Call/Async Logic
```typescript
  const handleReelReply = async (reelId: number, parentCommentId: number) => {
```
→ **Type**: Async Operation

**Line 159**: Component/Function Definition
```typescript
  const handleReelReply = async (reelId: number, parentCommentId: number) => {
```

**Line 164**: Backend Call/Async Logic
```typescript
      const res = await postReelComment({ 
```
→ **Type**: Async Operation

**Line 164**: Component/Function Definition
```typescript
      const res = await postReelComment({ 
```

**Line 183**: Backend Call/Async Logic
```typescript
  const handleDeleteComment = async (id: number) => {
```
→ **Type**: Async Operation

**Line 183**: Component/Function Definition
```typescript
  const handleDeleteComment = async (id: number) => {
```

**Line 186**: Backend Call/Async Logic
```typescript
      const res = await deleteReelComment(id);
```
→ **Type**: Async Operation

**Line 186**: Component/Function Definition
```typescript
      const res = await deleteReelComment(id);
```

**Line 196**: Component/Function Definition
```typescript
  const getReelThumbnail = (mediaPath: string) => {
```

**Line 200**: Component/Function Definition
```typescript
        const urls = JSON.parse(mediaPath);
```

**Line 210**: Component/Function Definition
```typescript
  const aggregate = intelData?.aggregate;
```

**Line 211**: Component/Function Definition
```typescript
  const globalRecommendations = intelData?.globalRecommendations;
```

**Line 212**: Component/Function Definition
```typescript
  const results = intelData?.results;
```

**Line 214**: Component/Function Definition
```typescript
  const sentimentData = aggregate ? [
```

**Line 220**: Component/Function Definition
```typescript
  const totalResults = results?.length || 1;
```

**Line 223**: Component/Function Definition
```typescript
  const avgRating = reviews.length > 0
```

**Line 226**: Component/Function Definition
```typescript
  const unrepliedCount = reviews.filter(r => !r.vendor_response).length;
```

**Line 228**: Component/Function Definition
```typescript
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/layout.tsx

**Line 4**: Import Backend Logic
```typescript
import React, { useState, useEffect } from 'react';
```
**Line 5**: Import Backend Logic
```typescript
import { motion, AnimatePresence } from 'framer-motion';
```
**Line 7**: Import Backend Logic
```typescript
import { useParams, usePathname, useRouter } from 'next/navigation';
```
**Line 8**: Import Backend Logic
```typescript
import { Plus, LayoutDashboard, Briefcase, Package, Bell, Zap, Settings, Menu, ChevronDown, LogOut, Home, Search, MessageCircle, Video, LifeBuoy, HelpCircle, Mail, CreditCard, MessageSquare, Sparkles } from 'lucide-react';
```
**Line 9**: Import Backend Logic
```typescript
import Link from 'next/link';
```
**Line 10**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 11**: Import Backend Logic
```typescript
import { Input } from '@/components/ui/input';
```
**Line 12**: Import Backend Logic
```typescript
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
```
**Line 13**: Import Backend Logic
```typescript
import { UserDropdown } from '@/components/ui/user-dropdown';
```
**Line 14**: Import Backend Logic
```typescript
import { cn } from '@/lib/utils';
```
→ **Backend**: @/lib/utils

**Line 16**: Import Backend Logic
```typescript
import AIAgent from '@/components/ai-agent/AIAgent';
```
**Line 17**: Import Backend Logic
```typescript
import { getSidebarStats } from '@/lib/actions/overviews';
```
→ **Backend**: @/lib/actions/overviews

**Line 18**: Import Backend Logic
```typescript
import { createClient } from '@/lib/supabase/client';
```
→ **Backend**: @/lib/supabase/client

**Line 19**: Import Backend Logic
```typescript
import { getUserProfile } from '@/lib/actions/users';
```
→ **Backend**: @/lib/actions/users

**Line 20**: Import Backend Logic
```typescript
import { getUserStores } from '@/lib/actions/stores';
```
→ **Backend**: @/lib/actions/stores

**Line 21**: Import Backend Logic
```typescript
import { searchDashboard } from '@/lib/actions/overviews';
```
→ **Backend**: @/lib/actions/overviews

**Line 22**: Import Backend Logic
```typescript
import { UploadProvider } from '@/lib/context/UploadContext';
```
→ **Backend**: @/lib/context/UploadContext

**Line 23**: Import Backend Logic
```typescript
import UploadProgressManager from '@/components/dashboard/UploadProgressManager';
```
**Line 24**: Import Backend Logic
```typescript
import { getAvatarUrl } from '@/lib/utils/avatar';
```
→ **Backend**: @/lib/utils/avatar

**Line 25**: Import Backend Logic
```typescript
import { isStoreDashboardLocked } from '@/lib/dashboard/store-access';
```
→ **Backend**: @/lib/dashboard/store-access

**Line 34**: Component/Function Definition
```typescript
export default function DashboardLayout({
```

**Line 39**: Hook Usage
```typescript
  const pathname = usePathname();
```
→ **Hook**: usePathname(

**Line 39**: Component/Function Definition
```typescript
  const pathname = usePathname();
```

**Line 40**: Hook Usage
```typescript
  const params = useParams();
```
→ **Hook**: useParams(

**Line 40**: Component/Function Definition
```typescript
  const params = useParams();
```

**Line 41**: Component/Function Definition
```typescript
  const id = params.id as string;
```

**Line 42**: State Management
```typescript
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```

**Line 42**: Hook Usage
```typescript
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```
→ **Hook**: useState(

**Line 43**: State Management
```typescript
  const [sidebarOpen, setSidebarOpen] = useState(true);
```

**Line 43**: Hook Usage
```typescript
  const [sidebarOpen, setSidebarOpen] = useState(true);
```
→ **Hook**: useState(

**Line 44**: Hook Usage
```typescript
  const router = useRouter();
```
→ **Hook**: useRouter(

**Line 44**: Component/Function Definition
```typescript
  const router = useRouter();
```

**Line 55**: State Management
```typescript
  const [stats, setStats] = useState({ reviews: 0, leads: 0 });
```

**Line 55**: Hook Usage
```typescript
  const [stats, setStats] = useState({ reviews: 0, leads: 0 });
```
→ **Hook**: useState(

**Line 59**: State Management
```typescript
  const [dashboardSearchQuery, setDashboardSearchQuery] = useState('');
```

**Line 59**: Hook Usage
```typescript
  const [dashboardSearchQuery, setDashboardSearchQuery] = useState('');
```
→ **Hook**: useState(

**Line 66**: State Management
```typescript
  const [isSearching, setIsSearching] = useState(false);
```

**Line 66**: Hook Usage
```typescript
  const [isSearching, setIsSearching] = useState(false);
```
→ **Hook**: useState(

**Line 69**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 70**: Backend Call/Async Logic
```typescript
    const handler = setTimeout(async () => {
```
→ **Type**: Async Operation

**Line 70**: Component/Function Definition
```typescript
    const handler = setTimeout(async () => {
```

**Line 71**: Component/Function Definition
```typescript
      const locked = currentBusiness && isStoreDashboardLocked(currentBusiness.status);
```

**Line 77**: Component/Function Definition
```typescript
      const storeId = currentBusiness?.id || Number(id);
```

**Line 81**: Backend Call/Async Logic
```typescript
          const results = await searchDashboard(storeId, dashboardSearchQuery);
```
→ **Type**: Async Operation

**Line 81**: Component/Function Definition
```typescript
          const results = await searchDashboard(storeId, dashboardSearchQuery);
```

**Line 84**: Component/Function Definition
```typescript
          const lowQuery = dashboardSearchQuery.toLowerCase();
```

**Line 118**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 119**: Component/Function Definition
```typescript
    const saved = localStorage.getItem(`dashboard_seen_${id}`);
```

**Line 129**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 131**: Component/Function Definition
```typescript
      const supabase = createClient();
```

**Line 132**: Backend Call/Async Logic
```typescript
      const { data: { user: authUser } } = await supabase.auth.getUser();
```
→ **Type**: Async Operation

**Line 136**: Backend Call/Async Logic
```typescript
        const { data: profile } = await getUserProfile(authUser.id);
```
→ **Type**: Async Operation

**Line 148**: Backend Call/Async Logic
```typescript
        const { data: stores } = await getUserStores(authUser.id);
```
→ **Type**: Async Operation

**Line 150**: Component/Function Definition
```typescript
          const bizList = stores.map((s: any) => ({
```

**Line 158**: Component/Function Definition
```typescript
          const active = bizList.find(b => b.id === Number(id));
```

**Line 167**: Component/Function Definition
```typescript
    const supabase = createClient();
```

**Line 178**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 179**: Component/Function Definition
```typescript
    const active = businesses.find(b => b.id === Number(id));
```

**Line 183**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 184**: Component/Function Definition
```typescript
    const store = businesses.find(b => b.id === Number(id));
```

**Line 185**: Component/Function Definition
```typescript
    const locked = store ? isStoreDashboardLocked(store.status) : false;
```

**Line 199**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 202**: Component/Function Definition
```typescript
    const base = `/dashboard/${id}`;
```

**Line 227**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 228**: Component/Function Definition
```typescript
    const currentNavItem = navItems.find(item => item.href === pathname);
```

**Line 230**: Component/Function Definition
```typescript
      const category = pathname.split('/').pop() || '';
```

**Line 231**: Component/Function Definition
```typescript
      const isReviewPage = category === 'reviews' || category === 'intelligence';
```

**Line 232**: Component/Function Definition
```typescript
      const currentCount = isReviewPage ? stats.reviews : stats.leads;
```

**Line 235**: Component/Function Definition
```typescript
        const updated = { ...lastSeenCounts, [pathname]: currentCount };
```

**Line 242**: Component/Function Definition
```typescript
  const isActive = (href: string) => {
```

**Line 249**: Component/Function Definition
```typescript
  const overviewPath = `/dashboard/${id}`;
```

**Line 250**: Component/Function Definition
```typescript
  const dashboardLocked = currentBusiness ? isStoreDashboardLocked(currentBusiness.status) : false;
```

**Line 284**: Component/Function Definition
```typescript
              const navLocked = dashboardLocked && item.href !== overviewPath;
```

**Line 285**: Component/Function Definition
```typescript
              const button = (
```

**Line 357**: Component/Function Definition
```typescript
                  const parts = pathname.split('/').filter(Boolean);
```

**Line 358**: Component/Function Definition
```typescript
                  const last = parts[parts.length - 1] || 'Overview';
```

**Line 569**: Component/Function Definition
```typescript
                      const unreadLeads = Math.max(0, stats.leads - (lastSeenCounts[`/dashboard/${id}/leads`] || 0));
```

**Line 570**: Component/Function Definition
```typescript
                      const unreadReviews = Math.max(0, stats.reviews - (lastSeenCounts[`/dashboard/${id}/intelligence`] || 0));
```

**Line 571**: Component/Function Definition
```typescript
                      const totalNotifications = unreadLeads + unreadReviews;
```

**Line 590**: Component/Function Definition
```typescript
                      const unreadLeads = Math.max(0, stats.leads - (lastSeenCounts[`/dashboard/${id}/leads`] || 0));
```

**Line 591**: Component/Function Definition
```typescript
                      const unreadReviews = Math.max(0, stats.reviews - (lastSeenCounts[`/dashboard/${id}/intelligence`] || 0));
```

**Line 670**: Component/Function Definition
```typescript
                    const supabase = createClient();
```

**Line 672**: API Route
```typescript
                      fetch('/api/auth/logout', { method: 'POST' }).then(() => {
```
→ **Type**: API Call

**Line 715**: Component/Function Definition
```typescript
                  const navLocked = dashboardLocked && item.href !== overviewPath;
```

**Line 716**: Component/Function Definition
```typescript
                  const row = (
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/leads/page.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState, useEffect, useMemo } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useParams } from 'next/navigation';
```
**Line 5**: Import Backend Logic
```typescript
import { getLeadActions, updateOrderStatus } from '@/lib/actions/leads';
```
→ **Backend**: @/lib/actions/leads

**Line 6**: Import Backend Logic
```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
```
**Line 18**: Import Backend Logic
```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
```
**Line 19**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 20**: Import Backend Logic
```typescript
import { updateBookingStatus } from '@/lib/actions/reservation';
```
→ **Backend**: @/lib/actions/reservation

**Line 21**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 22**: Import Backend Logic
```typescript
import { blockUser } from '@/lib/actions/friendships';
```
→ **Backend**: @/lib/actions/friendships

**Line 26**: Component/Function Definition
```typescript
export default function LeadsPage() {
```

**Line 27**: Hook Usage
```typescript
  const params = useParams();
```
→ **Hook**: useParams(

**Line 27**: Component/Function Definition
```typescript
  const params = useParams();
```

**Line 28**: Component/Function Definition
```typescript
  const storeId = Number(params.id);
```

**Line 31**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(true);
```

**Line 31**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(true);
```
→ **Hook**: useState(

**Line 36**: Component/Function Definition
```typescript
  const fetchData = () => {
```

**Line 45**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 49**: Backend Call/Async Logic
```typescript
  const handleStatusUpdate = async (leadId: number, type: 'order' | 'booking', newStatus: string) => {
```
→ **Type**: Async Operation

**Line 49**: Component/Function Definition
```typescript
  const handleStatusUpdate = async (leadId: number, type: 'order' | 'booking', newStatus: string) => {
```

**Line 51**: Component/Function Definition
```typescript
    const key = `${type}-${leadId}`;
```

**Line 56**: Backend Call/Async Logic
```typescript
        await updateBookingStatus(leadId, newStatus as any);
```
→ **Type**: Async Operation

**Line 59**: Backend Call/Async Logic
```typescript
        await updateOrderStatus(leadId, newStatus as any);
```
→ **Type**: Async Operation

**Line 79**: Backend Call/Async Logic
```typescript
  const handleBlockCustomer = async (customerId: string, leadId: number, type: 'order' | 'booking') => {
```
→ **Type**: Async Operation

**Line 79**: Component/Function Definition
```typescript
  const handleBlockCustomer = async (customerId: string, leadId: number, type: 'order' | 'booking') => {
```

**Line 88**: Backend Call/Async Logic
```typescript
        const { error } = await blockUser(customerId);
```
→ **Type**: Async Operation

**Line 93**: Backend Call/Async Logic
```typescript
          await updateBookingStatus(leadId, 'CANCELLED');
```
→ **Type**: Async Operation

**Line 95**: Backend Call/Async Logic
```typescript
          await updateOrderStatus(leadId, 'CANCELLED');
```
→ **Type**: Async Operation

**Line 108**: Hook Usage
```typescript
  const allLeads = useMemo(() => {
```
→ **Hook**: useMemo(

**Line 108**: Component/Function Definition
```typescript
  const allLeads = useMemo(() => {
```

**Line 109**: Component/Function Definition
```typescript
    const combined = [
```

**Line 122**: Component/Function Definition
```typescript
      const dateA = new Date(a.created_at).getTime();
```

**Line 123**: Component/Function Definition
```typescript
      const dateB = new Date(b.created_at).getTime();
```

**Line 130**: Component/Function Definition
```typescript
  const pendingOrders = leads.orders.filter(o => o.status === 'PENDING').length;
```

**Line 131**: Component/Function Definition
```typescript
  const pendingBookings = leads.bookings.filter(b => b.status === 'PENDING').length;
```

**Line 132**: Component/Function Definition
```typescript
  const ordersCount = pendingOrders;
```

**Line 133**: Component/Function Definition
```typescript
  const bookingsCount = pendingBookings;
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/page.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useEffect, useState } from 'react';
```
**Line 5**: Import Backend Logic
```typescript
import { TrendingUp, Eye, Phone, MapPin, ShoppingCart, DollarSign, CreditCard, ShieldAlert, Clock } from 'lucide-react';
```
**Line 6**: Import Backend Logic
```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
```
**Line 7**: Import Backend Logic
```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
```
**Line 20**: Import Backend Logic
```typescript
import { useParams } from 'next/navigation';
```
**Line 21**: Import Backend Logic
```typescript
import { getDashboardOverview } from '@/lib/actions/overviews';
```
→ **Backend**: @/lib/actions/overviews

**Line 22**: Import Backend Logic
```typescript
import { motion } from 'framer-motion';
```
**Line 23**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 24**: Import Backend Logic
```typescript
import { Badge } from '@/components/ui/badge';
```
**Line 25**: Import Backend Logic
```typescript
import AccountSection from '@/components/dashboard/AccountSection';
```
**Line 26**: Import Backend Logic
```typescript
import { isStoreDashboardLocked } from '@/lib/dashboard/store-access';
```
→ **Backend**: @/lib/dashboard/store-access

**Line 27**: Import Backend Logic
```typescript
import { cn } from '@/lib/utils';
```
→ **Backend**: @/lib/utils

**Line 37**: Component/Function Definition
```typescript
function StatCard({ label, value, icon, trend, color = 'blue' }: StatCardProps) {
```

**Line 38**: Component/Function Definition
```typescript
  const colorClasses = {
```

**Line 81**: Component/Function Definition
```typescript
export default function DashboardPage() {
```

**Line 82**: Hook Usage
```typescript
  const params = useParams();
```
→ **Hook**: useParams(

**Line 82**: Component/Function Definition
```typescript
  const params = useParams();
```

**Line 83**: Component/Function Definition
```typescript
  const storeId = Number(params.id);
```

**Line 86**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(true);
```

**Line 86**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(true);
```
→ **Hook**: useState(

**Line 88**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 92**: Backend Call/Async Logic
```typescript
        const stats = await getDashboardOverview(storeId);
```
→ **Type**: Async Operation

**Line 92**: Component/Function Definition
```typescript
        const stats = await getDashboardOverview(storeId);
```

**Line 100**: Component/Function Definition
```typescript
  function formatTimeAgo(timestamp: string | number) {
```

**Line 101**: Component/Function Definition
```typescript
    const then = typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime();
```

**Line 102**: Component/Function Definition
```typescript
    const deltaMs = Date.now() - then;
```

**Line 105**: Component/Function Definition
```typescript
    const seconds = Math.floor(deltaMs / 1000);
```

**Line 108**: Component/Function Definition
```typescript
    const minutes = Math.floor(seconds / 60);
```

**Line 111**: Component/Function Definition
```typescript
    const hours = Math.floor(minutes / 60);
```

**Line 114**: Component/Function Definition
```typescript
    const days = Math.floor(hours / 24);
```

**Line 125**: Component/Function Definition
```typescript
    const isPending = (data.status || '').toUpperCase() === 'PENDING';
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/products/page.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useEffect, useState } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { getAdminItemsByStoreId, upsertItem, deleteItem } from '@/lib/actions/items';
```
→ **Backend**: @/lib/actions/items

**Line 5**: Import Backend Logic
```typescript
import type { Item } from '@/lib/actions/items';
```
→ **Backend**: @/lib/actions/items

**Line 6**: Import Backend Logic
```typescript
import { getStoreByAnyId } from '@/lib/actions/stores';
```
→ **Backend**: @/lib/actions/stores

**Line 7**: Import Backend Logic
```typescript
import { getPromotions } from '@/lib/actions/promotions';
```
→ **Backend**: @/lib/actions/promotions

**Line 8**: Import Backend Logic
```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
```
**Line 9**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 10**: Import Backend Logic
```typescript
import { Input } from '@/components/ui/input';
```
**Line 11**: Import Backend Logic
```typescript
import { Textarea } from '@/components/ui/textarea';
```
**Line 12**: Import Backend Logic
```typescript
import { Label } from '@/components/ui/label';
```
**Line 13**: Import Backend Logic
```typescript
import { useParams } from 'next/navigation';
```
**Line 14**: Import Backend Logic
```typescript
import { uploadToCloudinary, uploadMultipleToCloudinary } from '@/lib/cloudinary';
```
→ **Backend**: @/lib/cloudinary

**Line 23**: Import Backend Logic
```typescript
import { Plus, Edit, Trash2, Upload, Eye, EyeOff, Package, Loader2, Sparkles, Zap, Tag } from 'lucide-react';
```
**Line 24**: Import Backend Logic
```typescript
import DarijaAIPanel from '@/components/dashboard/DarijaAIPanel';
```
**Line 25**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 33**: Import Backend Logic
```typescript
import { Badge } from '@/components/ui/badge';
```
**Line 52**: Component/Function Definition
```typescript
const productCategories = [
```

**Line 70**: Import Backend Logic
```typescript
import PromotionsSection from '@/components/dashboard/PromotionsSection';
```
**Line 72**: Component/Function Definition
```typescript
export default function ProductsPage() {
```

**Line 73**: Hook Usage
```typescript
  const params = useParams();
```
→ **Hook**: useParams(

**Line 73**: Component/Function Definition
```typescript
  const params = useParams();
```

**Line 74**: Component/Function Definition
```typescript
  const storeId = parseInt(params.id as string);
```

**Line 76**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(true);
```

**Line 76**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(true);
```
→ **Hook**: useState(

**Line 77**: State Management
```typescript
  const [isOpen, setIsOpen] = useState(false);
```

**Line 77**: Hook Usage
```typescript
  const [isOpen, setIsOpen] = useState(false);
```
→ **Hook**: useState(

**Line 80**: State Management
```typescript
  const [isAIOpen, setIsAIOpen] = useState(false);
```

**Line 80**: Hook Usage
```typescript
  const [isAIOpen, setIsAIOpen] = useState(false);
```
→ **Hook**: useState(

**Line 84**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 88**: Backend Call/Async Logic
```typescript
        const { data: store, error: storeError } = await getStoreByAnyId(storeId) as any;
```
→ **Type**: Async Operation

**Line 94**: Component/Function Definition
```typescript
        const actualId = store.id;
```

**Line 98**: Backend Call/Async Logic
```typescript
        const [itemsData, promosData] = await Promise.all([
```
→ **Type**: Async Operation

**Line 111**: Backend Call/Async Logic
```typescript
  const handleAddProduct = async (productData: EditingProduct) => {
```
→ **Type**: Async Operation

**Line 111**: Component/Function Definition
```typescript
  const handleAddProduct = async (productData: EditingProduct) => {
```

**Line 120**: Component/Function Definition
```typescript
    const effectiveId = resolvedStoreId;
```

**Line 121**: Component/Function Definition
```typescript
    const cloudinaryFolder = `products/${effectiveId}`;
```

**Line 127**: Backend Call/Async Logic
```typescript
      const url = await uploadToCloudinary(productData.imageFile, cloudinaryFolder);
```
→ **Type**: Async Operation

**Line 127**: Component/Function Definition
```typescript
      const url = await uploadToCloudinary(productData.imageFile, cloudinaryFolder);
```

**Line 136**: Component/Function Definition
```typescript
    const existingGallery = [...(productData.galleryUrls || [])];
```

**Line 139**: Backend Call/Async Logic
```typescript
      const newUrls = await uploadMultipleToCloudinary(productData.galleryFiles, cloudinaryFolder);
```
→ **Type**: Async Operation

**Line 139**: Component/Function Definition
```typescript
      const newUrls = await uploadMultipleToCloudinary(productData.galleryFiles, cloudinaryFolder);
```

**Line 147**: Component/Function Definition
```typescript
    const videoUrls = [...(productData.videoUrls || [])];
```

**Line 150**: Backend Call/Async Logic
```typescript
      const newVideoUrls = await uploadMultipleToCloudinary(productData.videoFiles, cloudinaryFolder);
```
→ **Type**: Async Operation

**Line 150**: Component/Function Definition
```typescript
      const newVideoUrls = await uploadMultipleToCloudinary(productData.videoFiles, cloudinaryFolder);
```

**Line 179**: Backend Call/Async Logic
```typescript
    const { data, error } = await upsertItem(itemData);
```
→ **Type**: Async Operation

**Line 195**: Component/Function Definition
```typescript
  const handleEdit = (item: Item) => {
```

**Line 200**: Component/Function Definition
```typescript
    const extraImages = ((item as any).metadata)?.extra_images || [];
```

**Line 219**: Backend Call/Async Logic
```typescript
  const handleDelete = async (id: number) => {
```
→ **Type**: Async Operation

**Line 219**: Component/Function Definition
```typescript
  const handleDelete = async (id: number) => {
```

**Line 221**: Backend Call/Async Logic
```typescript
    const { success, error } = await deleteItem(id, resolvedStoreId);
```
→ **Type**: Async Operation

**Line 230**: Backend Call/Async Logic
```typescript
  const handleToggleAvailability = async (item: Item) => {
```
→ **Type**: Async Operation

**Line 230**: Component/Function Definition
```typescript
  const handleToggleAvailability = async (item: Item) => {
```

**Line 233**: Component/Function Definition
```typescript
    const newStatus = item.status === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE';
```

**Line 235**: Backend Call/Async Logic
```typescript
      const { error } = await upsertItem({
```
→ **Type**: Async Operation

**Line 248**: Component/Function Definition
```typescript
  const handleDialogChange = (open: boolean) => {
```

**Line 338**: Component/Function Definition
```typescript
            const activePromo = promotions.find(p => {
```

**Line 339**: Component/Function Definition
```typescript
              const now = new Date();
```

**Line 340**: Component/Function Definition
```typescript
              const isValid = p.active && new Date(p.valid_from) <= now && new Date(p.valid_until) >= now;
```

**Line 471**: Component/Function Definition
```typescript
function ProductForm({ product, onSave, onClose }: ProductFormProps) {
```

**Line 472**: State Management
```typescript
  const [isSaving, setIsSaving] = useState(false);
```

**Line 472**: Hook Usage
```typescript
  const [isSaving, setIsSaving] = useState(false);
```
→ **Hook**: useState(

**Line 485**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 504**: Component/Function Definition
```typescript
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
```

**Line 512**: Component/Function Definition
```typescript
  const handleCategoryChange = (value: string) => {
```

**Line 516**: Component/Function Definition
```typescript
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 517**: Component/Function Definition
```typescript
    const file = e.target.files?.[0];
```

**Line 519**: Component/Function Definition
```typescript
      const reader = new FileReader();
```

**Line 531**: Component/Function Definition
```typescript
  const handleRemoveImage = () => {
```

**Line 539**: Component/Function Definition
```typescript
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 540**: Component/Function Definition
```typescript
    const files = Array.from(e.target.files || []);
```

**Line 549**: Component/Function Definition
```typescript
  const handleRemoveGalleryImage = (index: number, isExisting: boolean) => {
```

**Line 552**: Component/Function Definition
```typescript
        const galleryUrls = [...(prev.galleryUrls || [])];
```

**Line 556**: Component/Function Definition
```typescript
        const galleryFiles = [...(prev.galleryFiles || [])];
```

**Line 563**: Component/Function Definition
```typescript
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 564**: Component/Function Definition
```typescript
    const files = Array.from(e.target.files || []);
```

**Line 573**: Component/Function Definition
```typescript
  const handleRemoveVideo = (index: number, isExisting: boolean) => {
```

**Line 576**: Component/Function Definition
```typescript
        const videoUrls = [...(prev.videoUrls || [])];
```

**Line 580**: Component/Function Definition
```typescript
        const videoFiles = [...(prev.videoFiles || [])];
```

**Line 587**: Backend Call/Async Logic
```typescript
  const handleSubmit = async () => {
```
→ **Type**: Async Operation

**Line 587**: Component/Function Definition
```typescript
  const handleSubmit = async () => {
```

**Line 590**: Backend Call/Async Logic
```typescript
      await onSave(formData);
```
→ **Type**: Async Operation


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/profile/page.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState, useEffect } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useParams } from 'next/navigation';
```
**Line 5**: Import Backend Logic
```typescript
import { BusinessProfile } from '@/types';
```
**Line 6**: Import Backend Logic
```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
```
**Line 7**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 8**: Import Backend Logic
```typescript
import { Input } from '@/components/ui/input';
```
**Line 9**: Import Backend Logic
```typescript
import { Textarea } from '@/components/ui/textarea';
```
**Line 17**: Import Backend Logic
```typescript
import { Label } from '@/components/ui/label';
```
**Line 18**: Import Backend Logic
```typescript
import { Clock, Upload, X, Loader2 } from 'lucide-react';
```
**Line 19**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 20**: Import Backend Logic
```typescript
import { getStoreById, updateStoreProfile, getStoreByAnyId } from '@/lib/actions/stores';
```
→ **Backend**: @/lib/actions/stores

**Line 21**: Import Backend Logic
```typescript
import { uploadFile } from '@/lib/supabase/storage';
```
→ **Backend**: @/lib/supabase/storage

**Line 33**: Component/Function Definition
```typescript
export default function ProfilePage() {
```

**Line 34**: Hook Usage
```typescript
  const { id } = useParams();
```
→ **Hook**: useParams(

**Line 35**: Component/Function Definition
```typescript
  const storeId = parseInt(id as string);
```

**Line 38**: State Management
```typescript
  const [loading, setLoading] = useState(true);
```

**Line 38**: Hook Usage
```typescript
  const [loading, setLoading] = useState(true);
```
→ **Hook**: useState(

**Line 39**: State Management
```typescript
  const [isSaving, setIsSaving] = useState(false);
```

**Line 39**: Hook Usage
```typescript
  const [isSaving, setIsSaving] = useState(false);
```
→ **Hook**: useState(

**Line 43**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 44**: Backend Call/Async Logic
```typescript
    const fetchStore = async () => {
```
→ **Type**: Async Operation

**Line 44**: Component/Function Definition
```typescript
    const fetchStore = async () => {
```

**Line 48**: Backend Call/Async Logic
```typescript
      const { data: store, error: resolveError } = await getStoreByAnyId(storeId) as any;
```
→ **Type**: Async Operation

**Line 57**: Component/Function Definition
```typescript
      const data = store as any; // Use casting to avoid union type lint issues
```

**Line 92**: Component/Function Definition
```typescript
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
```

**Line 97**: Component/Function Definition
```typescript
  const handleCategoryChange = (value: string) => {
```

**Line 101**: Component/Function Definition
```typescript
  const handleHourChange = (day: keyof BusinessProfile['workingHours'], field: 'open' | 'close', value: string) => {
```

**Line 118**: Component/Function Definition
```typescript
  const handleClosed = (day: keyof BusinessProfile['workingHours'], closed: boolean) => {
```

**Line 135**: Backend Call/Async Logic
```typescript
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
```
→ **Type**: Async Operation

**Line 135**: Component/Function Definition
```typescript
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 136**: Component/Function Definition
```typescript
    const file = e.target.files?.[0];
```

**Line 144**: Backend Call/Async Logic
```typescript
    const { url, error } = await uploadFile('STORES', `${resolvedStoreId}/logo-${Date.now()}`, file);
```
→ **Type**: Async Operation

**Line 157**: Backend Call/Async Logic
```typescript
  const handleAddGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
```
→ **Type**: Async Operation

**Line 157**: Component/Function Definition
```typescript
  const handleAddGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 158**: Component/Function Definition
```typescript
    const files = e.target.files;
```

**Line 166**: Component/Function Definition
```typescript
    const effectiveId = resolvedStoreId;
```

**Line 169**: Component/Function Definition
```typescript
    const fileArray = Array.from(files);
```

**Line 172**: Component/Function Definition
```typescript
    const toastId = toast.loading(`Uploading ${fileArray.length} files...`);
```

**Line 175**: Backend Call/Async Logic
```typescript
      const uploadPromises = fileArray.map(async (file) => {
```
→ **Type**: Async Operation

**Line 175**: Component/Function Definition
```typescript
      const uploadPromises = fileArray.map(async (file) => {
```

**Line 176**: Component/Function Definition
```typescript
        const fileName = `${effectiveId}/gallery-${Date.now()}-${file.name}`;
```

**Line 177**: Backend Call/Async Logic
```typescript
        const { url, error } = await uploadFile('STORES', fileName, file);
```
→ **Type**: Async Operation

**Line 182**: Backend Call/Async Logic
```typescript
      const uploadedUrls = await Promise.all(uploadPromises);
```
→ **Type**: Async Operation

**Line 182**: Component/Function Definition
```typescript
      const uploadedUrls = await Promise.all(uploadPromises);
```

**Line 183**: Component/Function Definition
```typescript
      const validUrls = uploadedUrls.filter((url): url is string => !!url);
```

**Line 195**: Component/Function Definition
```typescript
  const handleRemoveGalleryImage = (index: number) => {
```

**Line 199**: Backend Call/Async Logic
```typescript
  const handleSave = async () => {
```
→ **Type**: Async Operation

**Line 199**: Component/Function Definition
```typescript
  const handleSave = async () => {
```

**Line 207**: Backend Call/Async Logic
```typescript
    const result = await updateStoreProfile(resolvedStoreId, {
```
→ **Type**: Async Operation

**Line 207**: Component/Function Definition
```typescript
    const result = await updateStoreProfile(resolvedStoreId, {
```

**Line 430**: Component/Function Definition
```typescript
              const isVideo = url.match(/\.(mp4|webm|ogg|mov)$|^data:video\//i);
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/reels/page.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState, useEffect, useRef } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useParams, useRouter } from 'next/navigation';
```
**Line 10**: Import Backend Logic
```typescript
import { useUpload } from '@/lib/context/UploadContext';
```
→ **Backend**: @/lib/context/UploadContext

**Line 16**: Import Backend Logic
```typescript
import { Card } from '@/components/ui/card';
```
**Line 17**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 18**: Import Backend Logic
```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
```
**Line 41**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 48**: Import Backend Logic
```typescript
import { Input } from '@/components/ui/input';
```
**Line 49**: Import Backend Logic
```typescript
import { Label } from '@/components/ui/label';
```
**Line 50**: Import Backend Logic
```typescript
import { Badge } from '@/components/ui/badge';
```
**Line 51**: Import Backend Logic
```typescript
import { cn } from '@/lib/utils';
```
→ **Backend**: @/lib/utils

**Line 52**: Import Backend Logic
```typescript
import { Toaster } from '@/components/ui/sonner';
```
**Line 53**: Import Backend Logic
```typescript
import AIAgent from '@/components/ai-agent/AIAgent';
```
**Line 60**: Component/Function Definition
```typescript
const filters = [
```

**Line 68**: Component/Function Definition
```typescript
export default function MediaManagementPage() {
```

**Line 69**: Hook Usage
```typescript
  const { id } = useParams();
```
→ **Hook**: useParams(

**Line 70**: Component/Function Definition
```typescript
  const storeId = parseInt(id as string);
```

**Line 71**: Hook Usage
```typescript
  const router = useRouter();
```
→ **Hook**: useRouter(

**Line 71**: Component/Function Definition
```typescript
  const router = useRouter();
```

**Line 73**: State Management
```typescript
  const [activeTab, setActiveTab] = useState('reels');
```

**Line 73**: Hook Usage
```typescript
  const [activeTab, setActiveTab] = useState('reels');
```
→ **Hook**: useState(

**Line 76**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(true);
```

**Line 76**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(true);
```
→ **Hook**: useState(

**Line 77**: State Management
```typescript
  const [isUploading, setIsUploading] = useState(false);
```

**Line 77**: Hook Usage
```typescript
  const [isUploading, setIsUploading] = useState(false);
```
→ **Hook**: useState(

**Line 79**: State Management
```typescript
  const [isDialogOpen, setIsDialogOpen] = useState(false);
```

**Line 79**: Hook Usage
```typescript
  const [isDialogOpen, setIsDialogOpen] = useState(false);
```
→ **Hook**: useState(

**Line 82**: State Management
```typescript
  const [title, setTitle] = useState('');
```

**Line 82**: Hook Usage
```typescript
  const [title, setTitle] = useState('');
```
→ **Hook**: useState(

**Line 83**: State Management
```typescript
  const [price, setPrice] = useState('');
```

**Line 83**: Hook Usage
```typescript
  const [price, setPrice] = useState('');
```
→ **Hook**: useState(

**Line 84**: State Management
```typescript
  const [category, setCategory] = useState('');
```

**Line 84**: Hook Usage
```typescript
  const [category, setCategory] = useState('');
```
→ **Hook**: useState(

**Line 85**: State Management
```typescript
  const [selectedFilter, setSelectedFilter] = useState('none');
```

**Line 85**: Hook Usage
```typescript
  const [selectedFilter, setSelectedFilter] = useState('none');
```
→ **Hook**: useState(

**Line 86**: State Management
```typescript
  const [thumbnailUrl, setThumbnailUrl] = useState('');
```

**Line 86**: Hook Usage
```typescript
  const [thumbnailUrl, setThumbnailUrl] = useState('');
```
→ **Hook**: useState(

**Line 88**: Component/Function Definition
```typescript
  const fileInputRef = useRef<HTMLInputElement>(null);
```

**Line 94**: State Management
```typescript
  const [isRecording, setIsRecording] = useState(false);
```

**Line 94**: Hook Usage
```typescript
  const [isRecording, setIsRecording] = useState(false);
```
→ **Hook**: useState(

**Line 95**: State Management
```typescript
  const [recordingTime, setRecordingTime] = useState(0);
```

**Line 95**: Hook Usage
```typescript
  const [recordingTime, setRecordingTime] = useState(0);
```
→ **Hook**: useState(

**Line 98**: Component/Function Definition
```typescript
  const videoRef = useRef<HTMLVideoElement>(null);
```

**Line 99**: Component/Function Definition
```typescript
  const chunksRef = useRef<Blob[]>([]);
```

**Line 100**: Component/Function Definition
```typescript
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
```

**Line 105**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 109**: Backend Call/Async Logic
```typescript
  const fetchData = async () => {
```
→ **Type**: Async Operation

**Line 109**: Component/Function Definition
```typescript
  const fetchData = async () => {
```

**Line 112**: Backend Call/Async Logic
```typescript
      const [r, s] = await Promise.all([
```
→ **Type**: Async Operation

**Line 126**: Component/Function Definition
```typescript
  const resetForm = () => {
```

**Line 138**: Hook Usage
```typescript
  const { startUpload } = useUpload();
```
→ **Hook**: useUpload(

**Line 140**: Backend Call/Async Logic
```typescript
  const handlePublish = async () => {
```
→ **Type**: Async Operation

**Line 140**: Component/Function Definition
```typescript
  const handlePublish = async () => {
```

**Line 143**: Component/Function Definition
```typescript
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
```

**Line 151**: Backend Call/Async Logic
```typescript
      onSuccess: async (result) => {
```
→ **Type**: Async Operation

**Line 153**: Backend Call/Async Logic
```typescript
          await publishReel({
```
→ **Type**: Async Operation

**Line 164**: Backend Call/Async Logic
```typescript
          await publishStory({
```
→ **Type**: Async Operation

**Line 177**: Backend Call/Async Logic
```typescript
  const handleDelete = async (reelId: number) => {
```
→ **Type**: Async Operation

**Line 177**: Component/Function Definition
```typescript
  const handleDelete = async (reelId: number) => {
```

**Line 181**: Backend Call/Async Logic
```typescript
      await deleteReel(reelId);
```
→ **Type**: Async Operation

**Line 191**: Backend Call/Async Logic
```typescript
  const handleDeleteStory = async (storyId: number) => {
```
→ **Type**: Async Operation

**Line 191**: Component/Function Definition
```typescript
  const handleDeleteStory = async (storyId: number) => {
```

**Line 194**: Backend Call/Async Logic
```typescript
      await deleteStory(storyId);
```
→ **Type**: Async Operation

**Line 203**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 209**: Backend Call/Async Logic
```typescript
  const startCamera = async () => {
```
→ **Type**: Async Operation

**Line 209**: Component/Function Definition
```typescript
  const startCamera = async () => {
```

**Line 211**: Backend Call/Async Logic
```typescript
      const s = await navigator.mediaDevices.getUserMedia({ 
```
→ **Type**: Async Operation

**Line 211**: Component/Function Definition
```typescript
      const s = await navigator.mediaDevices.getUserMedia({ 
```

**Line 221**: Component/Function Definition
```typescript
  const stopCamera = () => {
```

**Line 226**: Component/Function Definition
```typescript
  const startRecording = () => {
```

**Line 229**: Component/Function Definition
```typescript
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
```

**Line 232**: Component/Function Definition
```typescript
      const b = new Blob(chunksRef.current, { type: 'video/webm' });
```

**Line 233**: Component/Function Definition
```typescript
      const f = new File([b], 'capture.webm', { type: 'video/webm' });
```

**Line 254**: Component/Function Definition
```typescript
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 255**: Component/Function Definition
```typescript
    const file = e.target.files?.[0];
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/social/page.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState, useEffect } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useParams } from 'next/navigation';
```
**Line 5**: Import Backend Logic
```typescript
import { getReviewsByStoreId, respondToReview } from '@/lib/actions/reviews';
```
→ **Backend**: @/lib/actions/reviews

**Line 6**: Import Backend Logic
```typescript
import { getStoreReelComments, postReelComment, deleteReelComment } from '@/lib/actions/comments';
```
→ **Backend**: @/lib/actions/comments

**Line 7**: Import Backend Logic
```typescript
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
```
**Line 8**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 9**: Import Backend Logic
```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
```
**Line 24**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 25**: Import Backend Logic
```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
```
**Line 26**: Import Backend Logic
```typescript
import { Badge } from '@/components/ui/badge';
```
**Line 27**: Import Backend Logic
```typescript
import { Textarea } from '@/components/ui/textarea';
```
**Line 28**: Import Backend Logic
```typescript
import { format } from 'date-fns';
```
**Line 29**: Import Backend Logic
```typescript
import { fr } from 'date-fns/locale';
```
**Line 31**: Component/Function Definition
```typescript
export default function SocialManagementPage() {
```

**Line 32**: Hook Usage
```typescript
  const { id } = useParams();
```
→ **Hook**: useParams(

**Line 33**: Component/Function Definition
```typescript
  const storeId = parseInt(id as string);
```

**Line 35**: State Management
```typescript
  const [activeTab, setActiveTab] = useState('reviews');
```

**Line 35**: Hook Usage
```typescript
  const [activeTab, setActiveTab] = useState('reviews');
```
→ **Hook**: useState(

**Line 38**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(true);
```

**Line 38**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(true);
```
→ **Hook**: useState(

**Line 42**: State Management
```typescript
  const [replyContent, setReplyContent] = useState('');
```

**Line 42**: Hook Usage
```typescript
  const [replyContent, setReplyContent] = useState('');
```
→ **Hook**: useState(

**Line 43**: State Management
```typescript
  const [isSubmitting, setIsSubmitting] = useState(false);
```

**Line 43**: Hook Usage
```typescript
  const [isSubmitting, setIsSubmitting] = useState(false);
```
→ **Hook**: useState(

**Line 45**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 49**: Backend Call/Async Logic
```typescript
  const fetchData = async () => {
```
→ **Type**: Async Operation

**Line 49**: Component/Function Definition
```typescript
  const fetchData = async () => {
```

**Line 52**: Backend Call/Async Logic
```typescript
      const [revs, comms] = await Promise.all([
```
→ **Type**: Async Operation

**Line 66**: Backend Call/Async Logic
```typescript
  const handleReviewResponse = async (reviewId: number) => {
```
→ **Type**: Async Operation

**Line 66**: Component/Function Definition
```typescript
  const handleReviewResponse = async (reviewId: number) => {
```

**Line 70**: Backend Call/Async Logic
```typescript
      const res = await respondToReview(reviewId, replyContent);
```
→ **Type**: Async Operation

**Line 70**: Component/Function Definition
```typescript
      const res = await respondToReview(reviewId, replyContent);
```

**Line 86**: Backend Call/Async Logic
```typescript
  const handleReelReply = async (reelId: number, parentCommentId: number) => {
```
→ **Type**: Async Operation

**Line 86**: Component/Function Definition
```typescript
  const handleReelReply = async (reelId: number, parentCommentId: number) => {
```

**Line 91**: Backend Call/Async Logic
```typescript
      const res = await postReelComment({ 
```
→ **Type**: Async Operation

**Line 91**: Component/Function Definition
```typescript
      const res = await postReelComment({ 
```

**Line 110**: Backend Call/Async Logic
```typescript
  const handleDeleteComment = async (id: number) => {
```
→ **Type**: Async Operation

**Line 110**: Component/Function Definition
```typescript
  const handleDeleteComment = async (id: number) => {
```

**Line 113**: Backend Call/Async Logic
```typescript
      const res = await deleteReelComment(id);
```
→ **Type**: Async Operation

**Line 113**: Component/Function Definition
```typescript
      const res = await deleteReelComment(id);
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/stories/page.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState, useEffect } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useParams } from 'next/navigation';
```
**Line 16**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 23**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 24**: Import Backend Logic
```typescript
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
```
**Line 25**: Import Backend Logic
```typescript
import { Badge } from '@/components/ui/badge';
```
**Line 26**: Import Backend Logic
```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
```
**Line 27**: Import Backend Logic
```typescript
import CameraCapture from '@/components/CameraCapture';
```
**Line 36**: Import Backend Logic
```typescript
import { Input } from '@/components/ui/input';
```
**Line 37**: Import Backend Logic
```typescript
import { Label } from '@/components/ui/label';
```
**Line 39**: Component/Function Definition
```typescript
export default function StoriesDashboardPage() {
```

**Line 40**: Hook Usage
```typescript
  const params = useParams();
```
→ **Hook**: useParams(

**Line 40**: Component/Function Definition
```typescript
  const params = useParams();
```

**Line 41**: Component/Function Definition
```typescript
  const storeId = Number(params.id);
```

**Line 44**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(true);
```

**Line 44**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(true);
```
→ **Hook**: useState(

**Line 45**: State Management
```typescript
  const [showCamera, setShowCamera] = useState(false);
```

**Line 45**: Hook Usage
```typescript
  const [showCamera, setShowCamera] = useState(false);
```
→ **Hook**: useState(

**Line 46**: State Management
```typescript
  const [isPublishing, setIsPublishing] = useState(false);
```

**Line 46**: Hook Usage
```typescript
  const [isPublishing, setIsPublishing] = useState(false);
```
→ **Hook**: useState(

**Line 51**: State Management
```typescript
  const [caption, setCaption] = useState('');
```

**Line 51**: Hook Usage
```typescript
  const [caption, setCaption] = useState('');
```
→ **Hook**: useState(

**Line 52**: State Management
```typescript
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
```

**Line 52**: Hook Usage
```typescript
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
```
→ **Hook**: useState(

**Line 54**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 61**: Backend Call/Async Logic
```typescript
      const data = await getDashboardStories(storeId);
```
→ **Type**: Async Operation

**Line 61**: Component/Function Definition
```typescript
      const data = await getDashboardStories(storeId);
```

**Line 70**: Backend Call/Async Logic
```typescript
  const handleDelete = async (id: number) => {
```
→ **Type**: Async Operation

**Line 70**: Component/Function Definition
```typescript
  const handleDelete = async (id: number) => {
```

**Line 74**: Backend Call/Async Logic
```typescript
      const res = await deleteStory(id);
```
→ **Type**: Async Operation

**Line 74**: Component/Function Definition
```typescript
      const res = await deleteStory(id);
```

**Line 86**: Component/Function Definition
```typescript
  const handleCapture = (file: File) => {
```

**Line 93**: Backend Call/Async Logic
```typescript
  const handlePublish = async () => {
```
→ **Type**: Async Operation

**Line 93**: Component/Function Definition
```typescript
  const handlePublish = async () => {
```

**Line 98**: Component/Function Definition
```typescript
      const formData = new FormData();
```

**Line 101**: Backend Call/Async Logic
```typescript
      const url = await uploadStoryMedia(formData);
```
→ **Type**: Async Operation

**Line 101**: Component/Function Definition
```typescript
      const url = await uploadStoryMedia(formData);
```

**Line 104**: Component/Function Definition
```typescript
      const isVideo = selectedFile.type.startsWith('video/');
```

**Line 105**: Backend Call/Async Logic
```typescript
      const result = await publishStory({
```
→ **Type**: Async Operation

**Line 105**: Component/Function Definition
```typescript
      const result = await publishStory({
```

**Line 129**: Component/Function Definition
```typescript
  const isExpired = (expiresAt: string) => new Date(expiresAt) < new Date();
```

**Line 174**: Component/Function Definition
```typescript
            const expired = isExpired(story.expires_at);
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/support/tickets/page.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState, useEffect } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useParams } from 'next/navigation';
```
**Line 5**: Import Backend Logic
```typescript
import { Search, Plus, Phone, User, MoreVertical, Trash2, Edit, MessageSquare } from 'lucide-react';
```
**Line 6**: Import Backend Logic
```typescript
import { cn } from '@/lib/utils';
```
→ **Backend**: @/lib/utils

**Line 7**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 8**: Import Backend Logic
```typescript
import { Input } from '@/components/ui/input';
```
**Line 9**: Import Backend Logic
```typescript
import { Card } from '@/components/ui/card';
```
**Line 10**: Import Backend Logic
```typescript
import { Badge } from '@/components/ui/badge';
```
**Line 20**: Import Backend Logic
```typescript
import { Label } from '@/components/ui/label';
```
**Line 21**: Import Backend Logic
```typescript
import { Textarea } from '@/components/ui/textarea';
```
**Line 30**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 31**: Import Backend Logic
```typescript
import { Loader2 } from 'lucide-react';
```
**Line 32**: Import Backend Logic
```typescript
import { format } from 'date-fns';
```
**Line 33**: Import Backend Logic
```typescript
import { fr } from 'date-fns/locale';
```
**Line 34**: Import Backend Logic
```typescript
import SupportMessagesSection from '@/components/dashboard/SupportMessagesSection';
```
**Line 59**: Component/Function Definition
```typescript
export default function TicketsPage() {
```

**Line 60**: Hook Usage
```typescript
  const params = useParams();
```
→ **Hook**: useParams(

**Line 60**: Component/Function Definition
```typescript
  const params = useParams();
```

**Line 61**: Component/Function Definition
```typescript
  const storeId = Number(params.id);
```

**Line 64**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(true);
```

**Line 64**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(true);
```
→ **Hook**: useState(

**Line 65**: State Management
```typescript
  const [searchQuery, setSearchQuery] = useState('');
```

**Line 65**: Hook Usage
```typescript
  const [searchQuery, setSearchQuery] = useState('');
```
→ **Hook**: useState(

**Line 69**: State Management
```typescript
  const [isDialogOpen, setIsDialogOpen] = useState(false);
```

**Line 69**: Hook Usage
```typescript
  const [isDialogOpen, setIsDialogOpen] = useState(false);
```
→ **Hook**: useState(

**Line 70**: State Management
```typescript
  const [isCreating, setIsCreating] = useState(false);
```

**Line 70**: Hook Usage
```typescript
  const [isCreating, setIsCreating] = useState(false);
```
→ **Hook**: useState(

**Line 84**: State Management
```typescript
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
```

**Line 84**: Hook Usage
```typescript
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
```
→ **Hook**: useState(

**Line 86**: State Management
```typescript
  const [isUpdating, setIsUpdating] = useState(false);
```

**Line 86**: Hook Usage
```typescript
  const [isUpdating, setIsUpdating] = useState(false);
```
→ **Hook**: useState(

**Line 96**: State Management
```typescript
  const [editingDescriptionPreview, setEditingDescriptionPreview] = useState('');
```

**Line 96**: Hook Usage
```typescript
  const [editingDescriptionPreview, setEditingDescriptionPreview] = useState('');
```
→ **Hook**: useState(

**Line 97**: State Management
```typescript
  const [isLoadingEditDescription, setIsLoadingEditDescription] = useState(false);
```

**Line 97**: Hook Usage
```typescript
  const [isLoadingEditDescription, setIsLoadingEditDescription] = useState(false);
```
→ **Hook**: useState(

**Line 99**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 103**: Backend Call/Async Logic
```typescript
        const data = await getStoreTickets(storeId);
```
→ **Type**: Async Operation

**Line 103**: Component/Function Definition
```typescript
        const data = await getStoreTickets(storeId);
```

**Line 111**: Backend Call/Async Logic
```typescript
  const handleCreateTicket = async () => {
```
→ **Type**: Async Operation

**Line 111**: Component/Function Definition
```typescript
  const handleCreateTicket = async () => {
```

**Line 117**: Backend Call/Async Logic
```typescript
    const result = await createSupportTicket({
```
→ **Type**: Async Operation

**Line 117**: Component/Function Definition
```typescript
    const result = await createSupportTicket({
```

**Line 132**: Backend Call/Async Logic
```typescript
  const handleDeleteTicket = async (ticketId: string) => {
```
→ **Type**: Async Operation

**Line 132**: Component/Function Definition
```typescript
  const handleDeleteTicket = async (ticketId: string) => {
```

**Line 135**: Backend Call/Async Logic
```typescript
      const result = await deleteTicket(ticketId);
```
→ **Type**: Async Operation

**Line 135**: Component/Function Definition
```typescript
      const result = await deleteTicket(ticketId);
```

**Line 149**: Backend Call/Async Logic
```typescript
  const handleModifyTicket = async (ticketId: string) => {
```
→ **Type**: Async Operation

**Line 149**: Component/Function Definition
```typescript
  const handleModifyTicket = async (ticketId: string) => {
```

**Line 150**: Component/Function Definition
```typescript
    const ticket = tickets.find(t => t.id === ticketId);
```

**Line 163**: Component/Function Definition
```typescript
    const fromRow = ticket.description?.trim();
```

**Line 167**: Backend Call/Async Logic
```typescript
        const msgs = await getTicketMessages(ticketId);
```
→ **Type**: Async Operation

**Line 167**: Component/Function Definition
```typescript
        const msgs = await getTicketMessages(ticketId);
```

**Line 168**: Component/Function Definition
```typescript
        const first = msgs[0] as { content?: string } | undefined;
```

**Line 180**: Backend Call/Async Logic
```typescript
  const handleUpdateTicket = async () => {
```
→ **Type**: Async Operation

**Line 180**: Component/Function Definition
```typescript
  const handleUpdateTicket = async () => {
```

**Line 185**: Component/Function Definition
```typescript
    const ticketBeingEdited = tickets.find(t => t.id === editingTicketId);
```

**Line 192**: Backend Call/Async Logic
```typescript
      const result = await updateTicket(editingTicketId, {
```
→ **Type**: Async Operation

**Line 192**: Component/Function Definition
```typescript
      const result = await updateTicket(editingTicketId, {
```

**Line 216**: Component/Function Definition
```typescript
  const filteredTickets = tickets.filter(ticket => {
```

**Line 217**: Component/Function Definition
```typescript
    const searchLower = searchQuery.toLowerCase();
```

**Line 218**: Component/Function Definition
```typescript
    const matchesSearch = 
```

**Line 224**: Component/Function Definition
```typescript
    const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
```

**Line 225**: Component/Function Definition
```typescript
    const matchesStatus = !statusFilter || ticket.status === statusFilter;
```

**Line 229**: Component/Function Definition
```typescript
  const openTicketsCount = tickets.filter(t => t.status === 'open').length;
```

**Line 230**: Component/Function Definition
```typescript
  const inProgressCount = tickets.filter(t => t.status === 'in_progress').length;
```

**Line 231**: Component/Function Definition
```typescript
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/[id]/transactions/page.tsx

**Line 3**: Import Backend Logic
```typescript
import React from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { getStoreTransactions, Transaction } from '@/lib/actions/transactions';
```
→ **Backend**: @/lib/actions/transactions

**Line 5**: Import Backend Logic
```typescript
import { useParams } from 'next/navigation';
```
**Line 12**: Import Backend Logic
```typescript
import { format } from 'date-fns';
```
**Line 13**: Import Backend Logic
```typescript
import { fr } from 'date-fns/locale';
```
**Line 14**: Import Backend Logic
```typescript
import QRCode from 'qrcode';
```
**Line 15**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 16**: Import Backend Logic
```typescript
import { Input } from '@/components/ui/input';
```
**Line 17**: Import Backend Logic
```typescript
import { Badge } from '@/components/ui/badge';
```
**Line 18**: Import Backend Logic
```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
```
**Line 19**: Import Backend Logic
```typescript
import { Scanner } from '@yudiel/react-qr-scanner';
```
**Line 20**: Import Backend Logic
```typescript
import { updateBookingStatus } from '@/lib/actions/reservation';
```
→ **Backend**: @/lib/actions/reservation

**Line 21**: Import Backend Logic
```typescript
import { updateOrderStatus } from '@/lib/actions/leads';
```
→ **Backend**: @/lib/actions/leads

**Line 22**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 23**: Import Backend Logic
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
```
**Line 24**: Import Backend Logic
```typescript
import { getUserOrders } from '@/lib/actions/orders';
```
→ **Backend**: @/lib/actions/orders

**Line 25**: Import Backend Logic
```typescript
import { getUserBookings } from '@/lib/actions/reservation';
```
→ **Backend**: @/lib/actions/reservation

**Line 26**: Import Backend Logic
```typescript
import { createClient } from '@/lib/supabase/client';
```
→ **Backend**: @/lib/supabase/client

**Line 37**: Component/Function Definition
```typescript
const PAGE_SIZE = 10;
```

**Line 40**: Component/Function Definition
```typescript
function FilterSelect({ label, children, ...props }: SelectProps) {
```

**Line 54**: Component/Function Definition
```typescript
export default function TransactionsPage() {
```

**Line 55**: Hook Usage
```typescript
  const { id } = useParams();
```
→ **Hook**: useParams(

**Line 56**: Component/Function Definition
```typescript
  const storeId = Number(id);
```

**Line 59**: State Management
```typescript
  const [isLoading, setIsLoading] = React.useState(true);
```

**Line 59**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = React.useState(true);
```
→ **Hook**: useState(

**Line 60**: State Management
```typescript
  const [searchQuery, setSearchQuery] = React.useState('');
```

**Line 60**: Hook Usage
```typescript
  const [searchQuery, setSearchQuery] = React.useState('');
```
→ **Hook**: useState(

**Line 61**: State Management
```typescript
  const [statusFilter, setStatusFilter] = React.useState('');
```

**Line 61**: Hook Usage
```typescript
  const [statusFilter, setStatusFilter] = React.useState('');
```
→ **Hook**: useState(

**Line 62**: State Management
```typescript
  const [typeFilter, setTypeFilter] = React.useState('');
```

**Line 62**: Hook Usage
```typescript
  const [typeFilter, setTypeFilter] = React.useState('');
```
→ **Hook**: useState(

**Line 63**: State Management
```typescript
  const [startDate, setStartDate] = React.useState('');
```

**Line 63**: Hook Usage
```typescript
  const [startDate, setStartDate] = React.useState('');
```
→ **Hook**: useState(

**Line 64**: State Management
```typescript
  const [endDate, setEndDate] = React.useState('');
```

**Line 64**: Hook Usage
```typescript
  const [endDate, setEndDate] = React.useState('');
```
→ **Hook**: useState(

**Line 65**: State Management
```typescript
  const [page, setPage] = React.useState(1);
```

**Line 65**: Hook Usage
```typescript
  const [page, setPage] = React.useState(1);
```
→ **Hook**: useState(

**Line 73**: State Management
```typescript
  const [isScannerOpen, setIsScannerOpen] = React.useState(false);
```

**Line 73**: Hook Usage
```typescript
  const [isScannerOpen, setIsScannerOpen] = React.useState(false);
```
→ **Hook**: useState(

**Line 74**: State Management
```typescript
  const [isUpdating, setIsUpdating] = React.useState(false);
```

**Line 74**: Hook Usage
```typescript
  const [isUpdating, setIsUpdating] = React.useState(false);
```
→ **Hook**: useState(

**Line 75**: State Management
```typescript
  const [showSuccessAnimation, setShowSuccessAnimation] = React.useState(false);
```

**Line 75**: Hook Usage
```typescript
  const [showSuccessAnimation, setShowSuccessAnimation] = React.useState(false);
```
→ **Hook**: useState(

**Line 76**: Hook Usage
```typescript
  const isScanningRef = React.useRef(false);
```
→ **Hook**: useRef(

**Line 76**: Component/Function Definition
```typescript
  const isScanningRef = React.useRef(false);
```

**Line 78**: Hook Usage
```typescript
  const playBeep = React.useCallback(() => {
```
→ **Hook**: useCallback(

**Line 78**: Component/Function Definition
```typescript
  const playBeep = React.useCallback(() => {
```

**Line 80**: Component/Function Definition
```typescript
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
```

**Line 81**: Component/Function Definition
```typescript
      const oscillator = audioCtx.createOscillator();
```

**Line 82**: Component/Function Definition
```typescript
      const gainNode = audioCtx.createGain();
```

**Line 95**: Backend Call/Async Logic
```typescript
  const handleStatusUpdate = async (newStatus: 'completed' | 'cancelled' | 'failed') => {
```
→ **Type**: Async Operation

**Line 95**: Component/Function Definition
```typescript
  const handleStatusUpdate = async (newStatus: 'completed' | 'cancelled' | 'failed') => {
```

**Line 99**: Component/Function Definition
```typescript
      const isBooking = selectedTxn.type === 'booking';
```

**Line 100**: Component/Function Definition
```typescript
      const actualStatus = newStatus === 'failed' ? 'CANCELLED' : newStatus.toUpperCase();
```

**Line 102**: Component/Function Definition
```typescript
      const realId = selectedTxn.original_id;
```

**Line 106**: Backend Call/Async Logic
```typescript
        await updateBookingStatus(realId, actualStatus as any);
```
→ **Type**: Async Operation

**Line 108**: Backend Call/Async Logic
```typescript
        await updateOrderStatus(realId, actualStatus as any);
```
→ **Type**: Async Operation

**Line 138**: Component/Function Definition
```typescript
  const onScan = (result: any) => {
```

**Line 141**: Component/Function Definition
```typescript
    const code = result?.[0]?.rawValue || result?.rawValue || result;
```

**Line 143**: Component/Function Definition
```typescript
      const tokenToMatch = selectedTxn.qr_code_token || selectedTxn.reference;
```

**Line 157**: Hook Usage
```typescript
  React.useEffect(() => {
```
→ **Hook**: useEffect(

**Line 160**: Component/Function Definition
```typescript
      const supabase = createClient();
```

**Line 161**: Backend Call/Async Logic
```typescript
      const { data: { user } } = await supabase.auth.getUser();
```
→ **Type**: Async Operation

**Line 165**: Backend Call/Async Logic
```typescript
        const data = await getStoreTransactions(storeId);
```
→ **Type**: Async Operation

**Line 165**: Component/Function Definition
```typescript
        const data = await getStoreTransactions(storeId);
```

**Line 170**: Backend Call/Async Logic
```typescript
        const [orders, bookings] = await Promise.all([
```
→ **Type**: Async Operation

**Line 183**: Hook Usage
```typescript
  React.useEffect(() => {
```
→ **Hook**: useEffect(

**Line 185**: Component/Function Definition
```typescript
      const ref = selectedPersonalTxn.order_number || selectedPersonalTxn.booking_number || selectedPersonalTxn.id;
```

**Line 198**: Hook Usage
```typescript
  const filteredTransactions = React.useMemo(() => {
```
→ **Hook**: useMemo(

**Line 198**: Component/Function Definition
```typescript
  const filteredTransactions = React.useMemo(() => {
```

**Line 200**: Component/Function Definition
```typescript
      const q = searchQuery.toLowerCase();
```

**Line 201**: Component/Function Definition
```typescript
      const matchesSearch =
```

**Line 207**: Component/Function Definition
```typescript
      const matchesStatus = !statusFilter || txn.status === statusFilter;
```

**Line 208**: Component/Function Definition
```typescript
      const matchesType = !typeFilter || txn.type === typeFilter;
```

**Line 210**: Component/Function Definition
```typescript
      const transDate = new Date(txn.created_at);
```

**Line 211**: Component/Function Definition
```typescript
      const start = startDate ? new Date(startDate) : null;
```

**Line 212**: Component/Function Definition
```typescript
      const end = endDate ? new Date(endDate + 'T23:59:59') : null;
```

**Line 213**: Component/Function Definition
```typescript
      const inDateRange = (!start || transDate >= start) && (!end || transDate <= end);
```

**Line 219**: Component/Function Definition
```typescript
  const totalPages = Math.ceil(filteredTransactions.length / PAGE_SIZE) || 1;
```

**Line 220**: Component/Function Definition
```typescript
  const paginated = filteredTransactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
```

**Line 222**: Component/Function Definition
```typescript
  const completedRevenue = filteredTransactions.filter(t => t.status === 'completed').reduce((s, t) => s + t.amount, 0);
```

**Line 223**: Component/Function Definition
```typescript
  const pendingRevenue = filteredTransactions.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0);
```

**Line 224**: Component/Function Definition
```typescript
  const totalCommission = completedRevenue * 0.10;
```

**Line 225**: Component/Function Definition
```typescript
  const hasActiveFilters = statusFilter || typeFilter || startDate || endDate || searchQuery;
```

**Line 226**: Component/Function Definition
```typescript
  const clearFilters = () => {
```

**Line 231**: Hook Usage
```typescript
  const personalTransactions = React.useMemo(() => {
```
→ **Hook**: useMemo(

**Line 231**: Component/Function Definition
```typescript
  const personalTransactions = React.useMemo(() => {
```

**Line 232**: Component/Function Definition
```typescript
    const combined = [
```

**Line 560**: Component/Function Definition
```typescript
                      const msg = error?.message || error?.name || String(error);
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/dashboard/qr-verify/[code]/page.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useEffect, useState } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useParams, useRouter } from 'next/navigation';
```
**Line 5**: Import Backend Logic
```typescript
import { getOrderByTrackingCode, updateOrderStatus } from '@/lib/actions/orders';
```
→ **Backend**: @/lib/actions/orders

**Line 6**: Import Backend Logic
```typescript
import { getBookingByTrackingCode, updateBookingStatus } from '@/lib/actions/reservation';
```
→ **Backend**: @/lib/actions/reservation

**Line 7**: Import Backend Logic
```typescript
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
```
**Line 8**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 9**: Import Backend Logic
```typescript
import { CheckCircle, XCircle, Loader2, ShoppingBag, Calendar, User, Store } from 'lucide-react';
```
**Line 10**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 12**: Component/Function Definition
```typescript
export default function QRVerifyPage() {
```

**Line 13**: Hook Usage
```typescript
  const { code } = useParams();
```
→ **Hook**: useParams(

**Line 14**: Hook Usage
```typescript
  const router = useRouter();
```
→ **Hook**: useRouter(

**Line 14**: Component/Function Definition
```typescript
  const router = useRouter();
```

**Line 15**: State Management
```typescript
  const [loading, setLoading] = useState(true);
```

**Line 15**: Hook Usage
```typescript
  const [loading, setLoading] = useState(true);
```
→ **Hook**: useState(

**Line 19**: State Management
```typescript
  const [updating, setUpdating] = useState(false);
```

**Line 19**: Hook Usage
```typescript
  const [updating, setUpdating] = useState(false);
```
→ **Hook**: useState(

**Line 21**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 30**: Backend Call/Async Logic
```typescript
          const order = await getOrderByTrackingCode(code as string);
```
→ **Type**: Async Operation

**Line 30**: Component/Function Definition
```typescript
          const order = await getOrderByTrackingCode(code as string);
```

**Line 43**: Backend Call/Async Logic
```typescript
          const booking = await getBookingByTrackingCode(code as string);
```
→ **Type**: Async Operation

**Line 43**: Component/Function Definition
```typescript
          const booking = await getBookingByTrackingCode(code as string);
```

**Line 64**: Backend Call/Async Logic
```typescript
  const handleComplete = async () => {
```
→ **Type**: Async Operation

**Line 64**: Component/Function Definition
```typescript
  const handleComplete = async () => {
```

**Line 69**: Backend Call/Async Logic
```typescript
        await updateOrderStatus(data.id, 'COMPLETED');
```
→ **Type**: Async Operation

**Line 72**: Backend Call/Async Logic
```typescript
        await updateBookingStatus(data.id, 'COMPLETED');
```
→ **Type**: Async Operation


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/discover/page.tsx

**Line 1**: Import Backend Logic
```typescript
import { DiscoverFeed } from '@/components/discover/discover-feed'
```
**Line 2**: Import Backend Logic
```typescript
import { Suspense } from 'react'
```
**Line 4**: Component/Function Definition
```typescript
export default function DiscoverPage() {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/layout.tsx

**Line 1**: Import Backend Logic
```typescript
import type { Metadata } from "next";
```
**Line 2**: Import Backend Logic
```typescript
import { SessionProvider } from '@/components/session-provider'
```
**Line 5**: Import Backend Logic
```typescript
import { Toaster } from "sonner";
```
**Line 12**: Import Backend Logic
```typescript
import dynamic from 'next/dynamic';
```
**Line 14**: Component/Function Definition
```typescript
const GlobalActionDrawer = dynamic(() => import('@/components/GlobalActionDrawer'), {
```

**Line 18**: Component/Function Definition
```typescript
const MessageBubble = dynamic(() => import('@/components/messaging/MessageBubble').then(mod => mod.MessageBubble), {
```

**Line 22**: Component/Function Definition
```typescript
const ChatHeads = dynamic(() => import('@/components/messaging/ChatHeads').then(mod => mod.ChatHeads), {
```

**Line 26**: Import Backend Logic
```typescript
import { AINotificationTrigger } from '@/components/notifications/AINotificationTrigger';
```
**Line 28**: Component/Function Definition
```typescript
export default function RootLayout({
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/login/page.tsx

**Line 3**: Import Backend Logic
```typescript
import { Suspense } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { AuthCard } from '@/components/AuthCard';
```
**Line 6**: Component/Function Definition
```typescript
export default function LoginPage() {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/merchants/business/[id]/page.tsx

**Line 1**: Import Backend Logic
```typescript
import { getBusinessById } from '@/lib/actions/business';
```
→ **Backend**: @/lib/actions/business

**Line 2**: Import Backend Logic
```typescript
import { Business } from '@/types/business';
```
**Line 3**: Import Backend Logic
```typescript
import { getReviewsByStoreId } from '@/lib/actions/reviews';
```
→ **Backend**: @/lib/actions/reviews

**Line 4**: Import Backend Logic
```typescript
import { getPublicItemsByStoreId } from '@/lib/actions/items';
```
→ **Backend**: @/lib/actions/items

**Line 5**: Import Backend Logic
```typescript
import { getBusinessStories } from '@/lib/actions/stories';
```
→ **Backend**: @/lib/actions/stories

**Line 6**: Import Backend Logic
```typescript
import { getPromotions } from '@/lib/actions/promotions';
```
→ **Backend**: @/lib/actions/promotions

**Line 7**: Import Backend Logic
```typescript
import { recordStoreView } from '@/lib/actions/reels';
```
→ **Backend**: @/lib/actions/reels

**Line 8**: Import Backend Logic
```typescript
import { hasCompletedTransactionWithStore } from '@/lib/actions/transactions';
```
→ **Backend**: @/lib/actions/transactions

**Line 9**: Import Backend Logic
```typescript
import { createClient } from '@/lib/supabase/server';
```
→ **Backend**: @/lib/supabase/server

**Line 10**: Import Backend Logic
```typescript
import { Star, MapPin, Phone, Globe, Clock, Bookmark, Camera, Package, AlertCircle } from 'lucide-react';
```
**Line 11**: Import Backend Logic
```typescript
import Navbar from '@/components/Navbar';
```
**Line 12**: Import Backend Logic
```typescript
import Footer from '@/components/Footer';
```
**Line 13**: Import Backend Logic
```typescript
import BusinessImageGallery from '@/components/BusinessImageGallery';
```
**Line 14**: Import Backend Logic
```typescript
import { BusinessStories } from '@/components/BusinessStories';
```
**Line 15**: Import Backend Logic
```typescript
import { BusinessItemsList } from '@/components/BusinessItemsList';
```
**Line 16**: Import Backend Logic
```typescript
import PromotionBanner from '@/components/PromotionBanner';
```
**Line 17**: Import Backend Logic
```typescript
import { notFound } from 'next/navigation';
```
**Line 18**: Import Backend Logic
```typescript
import { WriteReviewButton } from '@/components/WriteReviewButton';
```
**Line 19**: Import Backend Logic
```typescript
import { ShareBusinessButton } from '@/components/ShareBusinessButton';
```
**Line 20**: Import Backend Logic
```typescript
import { Item } from '@/lib/actions/items';
```
→ **Backend**: @/lib/actions/items

**Line 21**: Import Backend Logic
```typescript
import { BusinessReservationSidebar } from '@/components/BusinessReservationSidebar';
```
**Line 22**: Import Backend Logic
```typescript
import FavoriteButton from '@/components/FavoriteButton';
```
**Line 23**: Import Backend Logic
```typescript
import FollowButton from '@/components/FollowButton';
```
**Line 24**: Import Backend Logic
```typescript
import StoreAnalyticsTracker from '@/components/StoreAnalyticsTracker';
```
**Line 25**: Import Backend Logic
```typescript
import BusinessGallerySection from '@/components/BusinessGallerySection';
```
**Line 44**: Component/Function Definition
```typescript
  const businessId = params.id;
```

**Line 45**: Backend Call/Async Logic
```typescript
  const business = await getBusinessById(businessId);
```
→ **Type**: Async Operation

**Line 45**: Component/Function Definition
```typescript
  const business = await getBusinessById(businessId);
```

**Line 51**: Component/Function Definition
```typescript
  const supabase = createClient();
```

**Line 52**: Backend Call/Async Logic
```typescript
  const userResponse = await supabase.auth.getUser();
```
→ **Type**: Async Operation

**Line 52**: Component/Function Definition
```typescript
  const userResponse = await supabase.auth.getUser();
```

**Line 53**: Component/Function Definition
```typescript
  const user = userResponse.data.user;
```

**Line 56**: Component/Function Definition
```typescript
  const isOwner = !!user && user.id === (business as any)['owner_id'];
```

**Line 58**: Component/Function Definition
```typescript
  const storeId = business.store_id;
```

**Line 64**: Backend Call/Async Logic
```typescript
  const items = storeId ? await getPublicItemsByStoreId(storeId) : [];
```
→ **Type**: Async Operation

**Line 64**: Component/Function Definition
```typescript
  const items = storeId ? await getPublicItemsByStoreId(storeId) : [];
```

**Line 65**: Backend Call/Async Logic
```typescript
  const reviews = storeId ? await getReviewsByStoreId(storeId) : [];
```
→ **Type**: Async Operation

**Line 65**: Component/Function Definition
```typescript
  const reviews = storeId ? await getReviewsByStoreId(storeId) : [];
```

**Line 66**: Backend Call/Async Logic
```typescript
  const stories = storeId ? await getBusinessStories(storeId) : [];
```
→ **Type**: Async Operation

**Line 66**: Component/Function Definition
```typescript
  const stories = storeId ? await getBusinessStories(storeId) : [];
```

**Line 67**: Backend Call/Async Logic
```typescript
  const allPromotions = storeId ? await getPromotions(storeId) : [] as Promotion[];
```
→ **Type**: Async Operation

**Line 67**: Component/Function Definition
```typescript
  const allPromotions = storeId ? await getPromotions(storeId) : [] as Promotion[];
```

**Line 70**: Backend Call/Async Logic
```typescript
  const canAddStory = storeId ? (isOwner || await hasCompletedTransactionWithStore(storeId)) : false;
```
→ **Type**: Async Operation

**Line 70**: Component/Function Definition
```typescript
  const canAddStory = storeId ? (isOwner || await hasCompletedTransactionWithStore(storeId)) : false;
```

**Line 73**: Component/Function Definition
```typescript
  const activePromos = allPromotions.filter((p: Promotion) => {
```

**Line 74**: Component/Function Definition
```typescript
    const now = new Date();
```

**Line 78**: Component/Function Definition
```typescript
  const hasProducts = items.some((i: Item) => i.item_type === 'PRODUCT');
```

**Line 80**: Component/Function Definition
```typescript
  const isVerified = business.id_business !== null || business.status === 'PUBLISHED';
```

**Line 83**: Component/Function Definition
```typescript
  const allMedia = [
```

**Line 89**: Component/Function Definition
```typescript
  const defaultHero = business.category?.toLowerCase().includes('plomb')
```

**Line 95**: Component/Function Definition
```typescript
  const images = allMedia.length > 0
```

**Line 161**: Component/Function Definition
```typescript
                      const now = new Date();
```

**Line 162**: Component/Function Definition
```typescript
                      const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
```

**Line 163**: Component/Function Definition
```typescript
                      const todayHours = (business.workingHours as Record<string, any>)[dayName];
```

**Line 169**: Component/Function Definition
```typescript
                      const currentTime = now.getHours() * 60 + now.getMinutes();
```

**Line 172**: Component/Function Definition
```typescript
                      const openTime = openH * 60 + openM;
```

**Line 173**: Component/Function Definition
```typescript
                      const closeTime = closeH * 60 + closeM;
```

**Line 175**: Component/Function Definition
```typescript
                      const isOpen = currentTime >= openTime && currentTime < closeTime;
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/merchants/business/add/page.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState, useTransition, useEffect } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useRouter } from 'next/navigation';
```
**Line 9**: Import Backend Logic
```typescript
import { addBusiness, searchUnified } from '@/lib/actions/addbuss';
```
→ **Backend**: @/lib/actions/addbuss

**Line 10**: Import Backend Logic
```typescript
import type { UnifiedSearchResult } from '@/lib/actions/addbuss';
```
→ **Backend**: @/lib/actions/addbuss

**Line 11**: Import Backend Logic
```typescript
import type { PlaceResult } from '@/app/api/places/search/route';
```
**Line 11**: API Route
```typescript
import type { PlaceResult } from '@/app/api/places/search/route';
```
→ **Type**: API Call

**Line 12**: Import Backend Logic
```typescript
import { createClient } from '@/lib/supabase/client';
```
→ **Backend**: @/lib/supabase/client

**Line 13**: Import Backend Logic
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
```
**Line 14**: Import Backend Logic
```typescript
import MapPicker from '@/components/ui/MapPicker';
```
**Line 16**: Component/Function Definition
```typescript
export default function AddBusinessPage() {
```

**Line 17**: Hook Usage
```typescript
  const router = useRouter();
```
→ **Hook**: useRouter(

**Line 17**: Component/Function Definition
```typescript
  const router = useRouter();
```

**Line 18**: Hook Usage
```typescript
  const [isPending, startTransition] = useTransition();
```
→ **Hook**: useTransition(

**Line 20**: State Management
```typescript
  const [isMapOpen, setIsMapOpen] = useState(false);
```

**Line 20**: Hook Usage
```typescript
  const [isMapOpen, setIsMapOpen] = useState(false);
```
→ **Hook**: useState(

**Line 26**: State Management
```typescript
  const [isCreateMode, setIsCreateMode] = useState(true);
```

**Line 26**: Hook Usage
```typescript
  const [isCreateMode, setIsCreateMode] = useState(true);
```
→ **Hook**: useState(

**Line 29**: State Management
```typescript
  const [isSearching, setIsSearching] = useState(false);
```

**Line 29**: Hook Usage
```typescript
  const [isSearching, setIsSearching] = useState(false);
```
→ **Hook**: useState(

**Line 30**: State Management
```typescript
  const [showSuggestions, setShowSuggestions] = useState(false);
```

**Line 30**: Hook Usage
```typescript
  const [showSuggestions, setShowSuggestions] = useState(false);
```
→ **Hook**: useState(

**Line 43**: State Management
```typescript
  const [formData, setFormData] = useState({
```

**Line 43**: Hook Usage
```typescript
  const [formData, setFormData] = useState({
```
→ **Hook**: useState(

**Line 62**: State Management
```typescript
  const [logoPreview, setLogoPreview] = useState('');
```

**Line 62**: Hook Usage
```typescript
  const [logoPreview, setLogoPreview] = useState('');
```
→ **Hook**: useState(

**Line 63**: State Management
```typescript
  const [justificatifName, setJustificatifName] = useState('');
```

**Line 63**: Hook Usage
```typescript
  const [justificatifName, setJustificatifName] = useState('');
```
→ **Hook**: useState(

**Line 64**: State Management
```typescript
  const [characterCount, setCharacterCount] = useState(0);
```

**Line 64**: Hook Usage
```typescript
  const [characterCount, setCharacterCount] = useState(0);
```
→ **Hook**: useState(

**Line 67**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 68**: Backend Call/Async Logic
```typescript
    const debounce = setTimeout(async () => {
```
→ **Type**: Async Operation

**Line 68**: Component/Function Definition
```typescript
    const debounce = setTimeout(async () => {
```

**Line 79**: Backend Call/Async Logic
```typescript
        const [dbRes, gmRes] = await Promise.all([
```
→ **Type**: Async Operation

**Line 81**: API Route
```typescript
          fetch(`/api/places/search?q=${encodeURIComponent(formData.companyName)}&country=TN`)
```
→ **Type**: API Call

**Line 102**: Component/Function Definition
```typescript
  const handleSelectDbResult = (result: UnifiedSearchResult) => {
```

**Line 119**: Component/Function Definition
```typescript
  const handleSelectGmResult = (place: PlaceResult) => {
```

**Line 124**: Component/Function Definition
```typescript
    const addressParts = place.formatted_address.split(',').map(s => s.trim());
```

**Line 125**: Component/Function Definition
```typescript
    const possibleCity = addressParts.length >= 2 ? addressParts[addressParts.length - 2] : '';
```

**Line 142**: Component/Function Definition
```typescript
  const handleCreateMode = () => {
```

**Line 148**: Component/Function Definition
```typescript
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 149**: Component/Function Definition
```typescript
    const file = e.target.files?.[0];
```

**Line 152**: Component/Function Definition
```typescript
      const reader = new FileReader();
```

**Line 158**: Component/Function Definition
```typescript
  const handleJustificatifUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 159**: Component/Function Definition
```typescript
    const file = e.target.files?.[0];
```

**Line 166**: Component/Function Definition
```typescript
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
```

**Line 167**: Component/Function Definition
```typescript
    const text = e.target.value;
```

**Line 172**: Component/Function Definition
```typescript
  const handleSubmit = (e: React.FormEvent) => {
```

**Line 176**: Backend Call/Async Logic
```typescript
    startTransition(async () => {
```
→ **Type**: Async Operation

**Line 177**: Component/Function Definition
```typescript
      const fd = new FormData();
```

**Line 198**: Backend Call/Async Logic
```typescript
      const result = await addBusiness(fd);
```
→ **Type**: Async Operation

**Line 198**: Component/Function Definition
```typescript
      const result = await addBusiness(fd);
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/merchants/product/[id]/page.tsx

**Line 1**: Import Backend Logic
```typescript
import { notFound } from 'next/navigation';
```
**Line 2**: Import Backend Logic
```typescript
import Navbar from '@/components/Navbar';
```
**Line 3**: Import Backend Logic
```typescript
import Footer from '@/components/Footer';
```
**Line 4**: Import Backend Logic
```typescript
import { getProductById, getProductReviews, getRelatedItems } from '@/lib/actions/product_detail';
```
→ **Backend**: @/lib/actions/product_detail

**Line 5**: Import Backend Logic
```typescript
import { getBusinessStories } from '@/lib/actions/stories';
```
→ **Backend**: @/lib/actions/stories

**Line 6**: Import Backend Logic
```typescript
import { BusinessStories } from '@/components/BusinessStories';
```
**Line 7**: Import Backend Logic
```typescript
import ProductOrderCard from '@/components/ProductOrderCard';
```
**Line 12**: Import Backend Logic
```typescript
import Link from 'next/link';
```
**Line 13**: Import Backend Logic
```typescript
import { WriteReviewButton } from '@/components/WriteReviewButton';
```
**Line 16**: Component/Function Definition
```typescript
function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
```

**Line 17**: Component/Function Definition
```typescript
  const cls = size === 'md' ? 'w-5 h-5' : 'w-3.5 h-3.5';
```

**Line 27**: Component/Function Definition
```typescript
function getInitials(name?: string | null) {
```

**Line 32**: Component/Function Definition
```typescript
function formatDate(dateStr: string) {
```

**Line 55**: Component/Function Definition
```typescript
  const id = parseInt(params.id);
```

**Line 58**: Backend Call/Async Logic
```typescript
  const [product, reviews] = await Promise.all([
```
→ **Type**: Async Operation

**Line 65**: Backend Call/Async Logic
```typescript
  const stories = await getBusinessStories(product.store.id);
```
→ **Type**: Async Operation

**Line 65**: Component/Function Definition
```typescript
  const stories = await getBusinessStories(product.store.id);
```

**Line 67**: Backend Call/Async Logic
```typescript
  const related    = await getRelatedItems(product.store.id, id);
```
→ **Type**: Async Operation

**Line 67**: Component/Function Definition
```typescript
  const related    = await getRelatedItems(product.store.id, id);
```

**Line 68**: Component/Function Definition
```typescript
  const images     = [product.main_image, product.image_2, product.image_3].filter(Boolean) as string[];
```

**Line 69**: Component/Function Definition
```typescript
  const heroImage  = images[0] ?? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=500&fit=crop';
```

**Line 70**: Component/Function Definition
```typescript
  const catColor   = categoryColors[product.store.category] ?? categoryColors.OTHER;
```

**Line 71**: Component/Function Definition
```typescript
  const isVerified = !!product.store.verified_at;
```

**Line 72**: Component/Function Definition
```typescript
  const statusInfo = statusConfig[product.status] ?? statusConfig.AVAILABLE;
```

**Line 74**: Component/Function Definition
```typescript
  const avgRating = reviews.length
```

**Line 252**: Component/Function Definition
```typescript
                        const count = reviews.filter(r => r.rating === star).length;
```

**Line 253**: Component/Function Definition
```typescript
                        const pct   = (count / reviews.length) * 100;
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/merchants/service/[id]/page.tsx

**Line 1**: Import Backend Logic
```typescript
import { notFound } from 'next/navigation';
```
**Line 2**: Import Backend Logic
```typescript
import Navbar from '@/components/Navbar';
```
**Line 3**: Import Backend Logic
```typescript
import Footer from '@/components/Footer';
```
**Line 4**: Import Backend Logic
```typescript
import { getServiceById, getServiceReviews, getRelatedItems } from '@/lib/actions/service_detail';
```
→ **Backend**: @/lib/actions/service_detail

**Line 5**: Import Backend Logic
```typescript
import { getBusinessStories } from '@/lib/actions/stories';
```
→ **Backend**: @/lib/actions/stories

**Line 6**: Import Backend Logic
```typescript
import { BusinessStories } from '@/components/BusinessStories';
```
**Line 7**: Import Backend Logic
```typescript
import ServiceBookingCard from '@/components/ServiceBookingCard';
```
**Line 12**: Import Backend Logic
```typescript
import Link from 'next/link';
```
**Line 13**: Import Backend Logic
```typescript
import { WriteReviewButton } from '@/components/WriteReviewButton';
```
**Line 20**: Component/Function Definition
```typescript
function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
```

**Line 21**: Component/Function Definition
```typescript
  const cls = size === 'md' ? 'w-5 h-5' : 'w-3.5 h-3.5';
```

**Line 31**: Component/Function Definition
```typescript
function getInitials(name?: string | null) {
```

**Line 36**: Component/Function Definition
```typescript
function formatDuration(minutes: number) {
```

**Line 38**: Component/Function Definition
```typescript
  const h = Math.floor(minutes / 60);
```

**Line 39**: Component/Function Definition
```typescript
  const m = minutes % 60;
```

**Line 43**: Component/Function Definition
```typescript
function formatDate(dateStr: string) {
```

**Line 60**: Component/Function Definition
```typescript
  const identifier = params.id; // Could be a numeric ID or a string slug
```

**Line 62**: Backend Call/Async Logic
```typescript
  const service = await getServiceById(identifier);
```
→ **Type**: Async Operation

**Line 62**: Component/Function Definition
```typescript
  const service = await getServiceById(identifier);
```

**Line 66**: Backend Call/Async Logic
```typescript
  const reviews = await getServiceReviews(service.id);
```
→ **Type**: Async Operation

**Line 66**: Component/Function Definition
```typescript
  const reviews = await getServiceReviews(service.id);
```

**Line 68**: Backend Call/Async Logic
```typescript
  const stories = await getBusinessStories(service.store.id);
```
→ **Type**: Async Operation

**Line 68**: Component/Function Definition
```typescript
  const stories = await getBusinessStories(service.store.id);
```

**Line 70**: Backend Call/Async Logic
```typescript
  const related    = await getRelatedItems(service.store.id, service.id);
```
→ **Type**: Async Operation

**Line 70**: Component/Function Definition
```typescript
  const related    = await getRelatedItems(service.store.id, service.id);
```

**Line 71**: Component/Function Definition
```typescript
  const images     = [service.main_image, service.image_2, service.image_3].filter(Boolean) as string[];
```

**Line 72**: Component/Function Definition
```typescript
  const heroImage  = images[0] ?? 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=500&fit=crop';
```

**Line 73**: Component/Function Definition
```typescript
  const catColor   = categoryColors[service.store.category] ?? categoryColors.OTHER;
```

**Line 74**: Component/Function Definition
```typescript
  const isVerified = !!service.store.verified_at;
```

**Line 75**: Component/Function Definition
```typescript
  const avgRating  = reviews.length
```

**Line 262**: Component/Function Definition
```typescript
                        const count = reviews.filter(r => r.rating === star).length;
```

**Line 263**: Component/Function Definition
```typescript
                        const pct   = (count / reviews.length) * 100;
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/messages/page.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState, useEffect, Suspense } from "react";
```
**Line 4**: Import Backend Logic
```typescript
import { useSearchParams } from "next/navigation";
```
**Line 5**: Import Backend Logic
```typescript
import { ConversationSidebar } from "@/components/messaging/ConversationSidebar";
```
**Line 6**: Import Backend Logic
```typescript
import { ChatWindow } from "@/components/messaging/ChatWindow";
```
**Line 7**: Import Backend Logic
```typescript
import { useMessaging } from "@/hooks/useMessaging";
```
**Line 8**: Import Backend Logic
```typescript
import Navbar from "@/components/Navbar";
```
**Line 9**: Import Backend Logic
```typescript
import { getFriendshipStatus } from "@/lib/actions/friendships";
```
→ **Backend**: @/lib/actions/friendships

**Line 10**: Import Backend Logic
```typescript
import { CallOverlay } from "@/components/messaging/CallOverlay";
```
**Line 11**: Import Backend Logic
```typescript
import { getUserProfile } from "@/lib/actions/users";
```
→ **Backend**: @/lib/actions/users

**Line 12**: Import Backend Logic
```typescript
import { getPrimaryStoreForOwner, getStoreById } from "@/lib/actions/stores";
```
→ **Backend**: @/lib/actions/stores

**Line 14**: Component/Function Definition
```typescript
function MessagesContent() {
```

**Line 15**: Hook Usage
```typescript
  const searchParams = useSearchParams();
```
→ **Hook**: useSearchParams(

**Line 15**: Component/Function Definition
```typescript
  const searchParams = useSearchParams();
```

**Line 16**: Component/Function Definition
```typescript
  const partnerIdFromUrl = searchParams.get('partnerId');
```

**Line 29**: Hook Usage
```typescript
  } = useMessaging();
```
→ **Hook**: useMessaging(

**Line 34**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 36**: Backend Call/Async Logic
```typescript
      const fetchStatus = async () => {
```
→ **Type**: Async Operation

**Line 36**: Component/Function Definition
```typescript
      const fetchStatus = async () => {
```

**Line 37**: Backend Call/Async Logic
```typescript
        const res = await getFriendshipStatus(activePartnerId);
```
→ **Type**: Async Operation

**Line 37**: Component/Function Definition
```typescript
        const res = await getFriendshipStatus(activePartnerId);
```

**Line 49**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 50**: Component/Function Definition
```typescript
    const storeIdFromUrl = searchParams.get('storeId');
```

**Line 56**: Component/Function Definition
```typescript
      const existing = conversations.find(c => c.user_id === partnerIdFromUrl);
```

**Line 58**: Backend Call/Async Logic
```typescript
        const fetchPartnerDetails = async () => {
```
→ **Type**: Async Operation

**Line 58**: Component/Function Definition
```typescript
        const fetchPartnerDetails = async () => {
```

**Line 59**: Backend Call/Async Logic
```typescript
          const [profileRes, storeRes] = await Promise.all([
```
→ **Type**: Async Operation

**Line 77**: Backend Call/Async Logic
```typescript
      const fetchStoreOwner = async () => {
```
→ **Type**: Async Operation

**Line 77**: Component/Function Definition
```typescript
      const fetchStoreOwner = async () => {
```

**Line 78**: Backend Call/Async Logic
```typescript
        const { data: store } = await getStoreById(Number(storeIdFromUrl));
```
→ **Type**: Async Operation

**Line 93**: Component/Function Definition
```typescript
  const handleSelectPartner = (id: string, partnerData?: any) => {
```

**Line 108**: Component/Function Definition
```typescript
  const activePartner = conversations.find((c) => c.user_id === activePartnerId)
```

**Line 133**: Backend Call/Async Logic
```typescript
              onFriendshipUpdate={async () => {
```
→ **Type**: Async Operation

**Line 135**: Backend Call/Async Logic
```typescript
                  const res = await getFriendshipStatus(activePartnerId);
```
→ **Type**: Async Operation

**Line 135**: Component/Function Definition
```typescript
                  const res = await getFriendshipStatus(activePartnerId);
```

**Line 158**: Backend Call/Async Logic
```typescript
                  onFriendshipUpdate={async () => {
```
→ **Type**: Async Operation

**Line 160**: Backend Call/Async Logic
```typescript
                      const res = await getFriendshipStatus(activePartnerId);
```
→ **Type**: Async Operation

**Line 160**: Component/Function Definition
```typescript
                      const res = await getFriendshipStatus(activePartnerId);
```

**Line 175**: Component/Function Definition
```typescript
export default function MessagesPage() {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/messages/suggestions/page.tsx

**Line 1**: Import Backend Logic
```typescript
import { getFriendSuggestions } from '@/lib/suggestions';
```
→ **Backend**: @/lib/suggestions

**Line 2**: Import Backend Logic
```typescript
import { Button } from "@/components/ui/button";
```
**Line 3**: Import Backend Logic
```typescript
import { ArrowLeft, Users } from "lucide-react";
```
**Line 4**: Import Backend Logic
```typescript
import Link from "next/link";
```
**Line 5**: Import Backend Logic
```typescript
import Navbar from "@/components/Navbar";
```
**Line 6**: Import Backend Logic
```typescript
import { SuggestionCard } from "@/components/messaging/SuggestionCard";
```
**Line 11**: Backend Call/Async Logic
```typescript
  const suggestions = await getFriendSuggestions();
```
→ **Type**: Async Operation

**Line 11**: Component/Function Definition
```typescript
  const suggestions = await getFriendSuggestions();
```

**Line 61**: Component/Function Definition
```typescript
              const incoming = suggestions.filter(u => u.friendship?.status === 'PENDING' && u.friendship?.direction === 'RECEIVED');
```

**Line 62**: Component/Function Definition
```typescript
              const sent = suggestions.filter(u => u.friendship?.status === 'PENDING' && u.friendship?.direction === 'SENT');
```

**Line 63**: Component/Function Definition
```typescript
              const others = suggestions.filter(u => !(u.friendship?.status === 'PENDING'));
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/page.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState } from 'react';
```
**Line 5**: Import Backend Logic
```typescript
import dynamic from 'next/dynamic';
```
**Line 6**: Import Backend Logic
```typescript
import Navbar from '@/components/Navbar';
```
**Line 7**: Import Backend Logic
```typescript
import Footer from '@/components/Footer';
```
**Line 8**: Import Backend Logic
```typescript
import OffersCarouselDemo from '@/components/OffersCarouselDemoBusiness';
```
**Line 9**: Import Backend Logic
```typescript
import Offers from '@/components/Offers';
```
**Line 10**: Import Backend Logic
```typescript
import { LogoCarouselDemo } from "@/components/ui/testimonials";
```
**Line 11**: Import Backend Logic
```typescript
import { FloatingAiAssistant } from "@/components/ui/glowing-ai-chat-assistant";
```
**Line 12**: Import Backend Logic
```typescript
import ShortAdsSection from '@/components/ShortAdsSection';
```
**Line 14**: Component/Function Definition
```typescript
const BackgroundScene = dynamic(
```

**Line 20**: Component/Function Definition
```typescript
export default function Home() {
```

**Line 21**: State Management
```typescript
  const [isFiltering, setIsFiltering] = useState(false);
```

**Line 21**: Hook Usage
```typescript
  const [isFiltering, setIsFiltering] = useState(false);
```
→ **Hook**: useState(

**Line 22**: Component/Function Definition
```typescript
  const handleFilterSelect = (item: any) => {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/profile/businessOwner/page.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState, useEffect, Suspense } from 'react';
```
**Line 12**: Import Backend Logic
```typescript
import { Card } from '@/components/ui/card';
```
**Line 13**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 14**: Import Backend Logic
```typescript
import { Input } from '@/components/ui/input';
```
**Line 15**: Import Backend Logic
```typescript
import { Label } from '@/components/ui/label';
```
**Line 16**: Import Backend Logic
```typescript
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
```
**Line 17**: Import Backend Logic
```typescript
import { cn } from '@/lib/utils';
```
→ **Backend**: @/lib/utils

**Line 18**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 19**: Import Backend Logic
```typescript
import Link from 'next/link';
```
**Line 20**: Import Backend Logic
```typescript
import { useSearchParams, useRouter } from 'next/navigation';
```
**Line 21**: Import Backend Logic
```typescript
import { useRef } from 'react';
```
**Line 22**: Import Backend Logic
```typescript
import { getOwnerProfileData } from '@/lib/actions/profile';
```
→ **Backend**: @/lib/actions/profile

**Line 23**: Import Backend Logic
```typescript
import { deleteStore, transferStoreOwnership } from '@/lib/actions/stores';
```
→ **Backend**: @/lib/actions/stores

**Line 24**: Import Backend Logic
```typescript
import { sendPasswordResetEmail } from '@/lib/actions/auth';
```
→ **Backend**: @/lib/actions/auth

**Line 25**: Import Backend Logic
```typescript
import { updateProfile, updateAvatar } from '@/lib/actions/users';
```
→ **Backend**: @/lib/actions/users

**Line 26**: Import Backend Logic
```typescript
import Navbar from '@/components/Navbar';
```
**Line 27**: Import Backend Logic
```typescript
import Footer from '@/components/Footer';
```
**Line 42**: Component/Function Definition
```typescript
const A = {
```

**Line 59**: Component/Function Definition
```typescript
function StarRow({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
```

**Line 60**: Component/Function Definition
```typescript
  const px = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
```

**Line 71**: Component/Function Definition
```typescript
function Pill({ children, color = 'default', className }: { children: React.ReactNode; color?: 'green'|'orange'|'blue'|'red'|'amber'|'default'; className?: string }) {
```

**Line 72**: Component/Function Definition
```typescript
  const map = {
```

**Line 88**: Component/Function Definition
```typescript
function MetricCard({ icon: Icon, label, value, change, trend, period }: {
```

**Line 92**: Component/Function Definition
```typescript
  const isUp = trend === 'up';
```

**Line 127**: Component/Function Definition
```typescript
function SectionHeading({ icon: Icon, children, action }: {
```

**Line 144**: Component/Function Definition
```typescript
function ProCard({ children, className }: { children: React.ReactNode; className?: string }) {
```

**Line 153**: Component/Function Definition
```typescript
function BarChart({ data, months, color }: { data: number[]; months: string[]; color: string }) {
```

**Line 154**: Component/Function Definition
```typescript
  const max = Math.max(...data, 1);
```

**Line 158**: Component/Function Definition
```typescript
        const pct = Math.max((v / max) * 100, v > 0 ? 8 : 2);
```

**Line 175**: Component/Function Definition
```typescript
function Toggle({ enabled, onChange, loading }: { enabled: boolean, onChange: () => void, loading?: boolean }) {
```

**Line 198**: Component/Function Definition
```typescript
function formatDuration(seconds: number) {
```

**Line 201**: Component/Function Definition
```typescript
  const mins = Math.floor(seconds / 60);
```

**Line 202**: Component/Function Definition
```typescript
  const secs = seconds % 60;
```

**Line 210**: Component/Function Definition
```typescript
function BusinessOwnerContent() {
```

**Line 211**: Hook Usage
```typescript
  const router = useRouter();
```
→ **Hook**: useRouter(

**Line 211**: Component/Function Definition
```typescript
  const router = useRouter();
```

**Line 214**: State Management
```typescript
  const [replyText, setReplyText] = useState('');
```

**Line 214**: Hook Usage
```typescript
  const [replyText, setReplyText] = useState('');
```
→ **Hook**: useState(

**Line 215**: State Management
```typescript
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
```

**Line 215**: Hook Usage
```typescript
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
```
→ **Hook**: useState(

**Line 216**: State Management
```typescript
  const [isChangingPassword, setIsChangingPassword] = useState(false);
```

**Line 216**: Hook Usage
```typescript
  const [isChangingPassword, setIsChangingPassword] = useState(false);
```
→ **Hook**: useState(

**Line 217**: State Management
```typescript
  const [editingHours, setEditingHours] = useState(false);
```

**Line 217**: Hook Usage
```typescript
  const [editingHours, setEditingHours] = useState(false);
```
→ **Hook**: useState(

**Line 219**: State Management
```typescript
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
```

**Line 219**: Hook Usage
```typescript
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
```
→ **Hook**: useState(

**Line 220**: State Management
```typescript
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
```

**Line 220**: Hook Usage
```typescript
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
```
→ **Hook**: useState(

**Line 221**: State Management
```typescript
  const [transferOwnerEmail, setTransferOwnerEmail] = useState('');
```

**Line 221**: Hook Usage
```typescript
  const [transferOwnerEmail, setTransferOwnerEmail] = useState('');
```
→ **Hook**: useState(

**Line 222**: State Management
```typescript
  const [isTransferring, setIsTransferring] = useState(false);
```

**Line 222**: Hook Usage
```typescript
  const [isTransferring, setIsTransferring] = useState(false);
```
→ **Hook**: useState(

**Line 223**: Component/Function Definition
```typescript
  const fileInputRef = useRef<HTMLInputElement>(null);
```

**Line 225**: Hook Usage
```typescript
  const searchParams = useSearchParams();
```
→ **Hook**: useSearchParams(

**Line 225**: Component/Function Definition
```typescript
  const searchParams = useSearchParams();
```

**Line 226**: Component/Function Definition
```typescript
  const businessIdParam = searchParams.get('id');
```

**Line 228**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(true);
```

**Line 228**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(true);
```
→ **Hook**: useState(

**Line 231**: State Management
```typescript
  const [twoFactor, setTwoFactor] = useState(false);
```

**Line 231**: Hook Usage
```typescript
  const [twoFactor, setTwoFactor] = useState(false);
```
→ **Hook**: useState(

**Line 232**: State Management
```typescript
  const [emailNotif, setEmailNotif] = useState(true);
```

**Line 232**: Hook Usage
```typescript
  const [emailNotif, setEmailNotif] = useState(true);
```
→ **Hook**: useState(

**Line 233**: State Management
```typescript
  const [loginAlert, setLoginAlert] = useState(true);
```

**Line 233**: Hook Usage
```typescript
  const [loginAlert, setLoginAlert] = useState(true);
```
→ **Hook**: useState(

**Line 235**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 238**: Backend Call/Async Logic
```typescript
        const data = await getOwnerProfileData(businessIdParam || undefined);
```
→ **Type**: Async Operation

**Line 238**: Component/Function Definition
```typescript
        const data = await getOwnerProfileData(businessIdParam || undefined);
```

**Line 239**: Component/Function Definition
```typescript
        const role = data?.user?.profile?.role?.toLowerCase();
```

**Line 240**: Component/Function Definition
```typescript
        const isBusinessRole = role === 'pro' || role === 'admin' || role === 'business_owner';
```

**Line 273**: Backend Call/Async Logic
```typescript
  const handlePasswordReset = async () => {
```
→ **Type**: Async Operation

**Line 273**: Component/Function Definition
```typescript
  const handlePasswordReset = async () => {
```

**Line 276**: Backend Call/Async Logic
```typescript
      const result = await sendPasswordResetEmail(user.email);
```
→ **Type**: Async Operation

**Line 276**: Component/Function Definition
```typescript
      const result = await sendPasswordResetEmail(user.email);
```

**Line 285**: Backend Call/Async Logic
```typescript
  const handleTogglePreference = async (key: string, currentValue: boolean, setter: (v: boolean) => void) => {
```
→ **Type**: Async Operation

**Line 285**: Component/Function Definition
```typescript
  const handleTogglePreference = async (key: string, currentValue: boolean, setter: (v: boolean) => void) => {
```

**Line 294**: Backend Call/Async Logic
```typescript
      const result = await updateProfile(user.id, {
```
→ **Type**: Async Operation

**Line 294**: Component/Function Definition
```typescript
      const result = await updateProfile(user.id, {
```

**Line 311**: Backend Call/Async Logic
```typescript
  const handleAvatarUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
```
→ **Type**: Async Operation

**Line 311**: Component/Function Definition
```typescript
  const handleAvatarUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 312**: Component/Function Definition
```typescript
    const file = e.target.files?.[0];
```

**Line 317**: Component/Function Definition
```typescript
      const formData = new FormData();
```

**Line 319**: Backend Call/Async Logic
```typescript
      const { error } = await updateAvatar(formData);
```
→ **Type**: Async Operation

**Line 324**: Backend Call/Async Logic
```typescript
      const data = await getOwnerProfileData(businessIdParam || undefined);
```
→ **Type**: Async Operation

**Line 324**: Component/Function Definition
```typescript
      const data = await getOwnerProfileData(businessIdParam || undefined);
```

**Line 336**: Component/Function Definition
```typescript
  const owner = {
```

**Line 347**: Component/Function Definition
```typescript
  const business = store ? {
```

**Line 370**: Backend Call/Async Logic
```typescript
  const handleDeleteStore = async () => {
```
→ **Type**: Async Operation

**Line 370**: Component/Function Definition
```typescript
  const handleDeleteStore = async () => {
```

**Line 371**: Component/Function Definition
```typescript
    const storeId = store?.id;
```

**Line 377**: Backend Call/Async Logic
```typescript
      const { success, error } = await deleteStore(Number(storeId));
```
→ **Type**: Async Operation

**Line 389**: Backend Call/Async Logic
```typescript
  const handleTransferOwnership = async () => {
```
→ **Type**: Async Operation

**Line 389**: Component/Function Definition
```typescript
  const handleTransferOwnership = async () => {
```

**Line 390**: Component/Function Definition
```typescript
    const storeId = store?.id;
```

**Line 395**: Component/Function Definition
```typescript
    const email = transferOwnerEmail.trim();
```

**Line 402**: Backend Call/Async Logic
```typescript
      const { success, error } = await transferStoreOwnership(Number(storeId), email);
```
→ **Type**: Async Operation

**Line 407**: Backend Call/Async Logic
```typescript
        const data = await getOwnerProfileData(businessIdParam || undefined);
```
→ **Type**: Async Operation

**Line 407**: Component/Function Definition
```typescript
        const data = await getOwnerProfileData(businessIdParam || undefined);
```

**Line 420**: Component/Function Definition
```typescript
  const metrics = [
```

**Line 428**: Component/Function Definition
```typescript
  const chartData   = [0,0,0,0,0,0,0,0,0,0,0, rawMetrics.totalViews    || 1];
```

**Line 429**: Component/Function Definition
```typescript
  const bookingData = [0,0,0,0,0,0,0,0,0,0,0, rawMetrics.bookingsCount || 1];
```

**Line 430**: Component/Function Definition
```typescript
  const months      = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
```

**Line 432**: Component/Function Definition
```typescript
  const reviews = recentReviews.map((r: any) => ({
```

**Line 644**: Component/Function Definition
```typescript
              const selected = store?.id === s.id;
```

**Line 674**: Component/Function Definition
```typescript
          const isActive = activeTab === tab.id;
```

**Line 836**: Component/Function Definition
```typescript
                  const count = recentReviews.filter((r: any) => stars.includes(r.rating)).length;
```

**Line 837**: Component/Function Definition
```typescript
                  const pct = Math.round((count / recentReviews.length) * 100);
```

**Line 966**: Component/Function Definition
```typescript
                  const displayHours = typeof hours === 'object' && hours !== null
```

**Line 1191**: Component/Function Definition
```typescript
export default function BusinessOwnerProfile() {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/app/profile/cart/page.tsx

**Line 1**: Import Backend Logic
```typescript
import CartView from '@/components/profile/cart';
```
**Line 2**: Import Backend Logic
```typescript
import Navbar from '@/components/Navbar';
```
**Line 4**: Component/Function Definition
```typescript
export default function CartPage() {
```



---

## 🧩 COMPONENTS FILES

25 fichiers components analysés


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/AuthCard.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState, useTransition, useCallback } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useRouter, useSearchParams } from 'next/navigation';
```
**Line 24**: Component/Function Definition
```typescript
function getPasswordStrength(pw: string): number {
```

**Line 35**: Component/Function Definition
```typescript
const STRENGTH_LABELS = ['', 'Too short', 'Weak', 'Fair', 'Strong'];
```

**Line 36**: Component/Function Definition
```typescript
const STRENGTH_COLORS = [
```

**Line 43**: Component/Function Definition
```typescript
const STRENGTH_TEXT = [
```

**Line 55**: Component/Function Definition
```typescript
function emptyLoginState() {
```

**Line 58**: Component/Function Definition
```typescript
function emptySignUpState() {
```

**Line 66**: Component/Function Definition
```typescript
export function AuthCard({ defaultFlipped = false }: AuthCardProps) {
```

**Line 67**: Hook Usage
```typescript
  const router = useRouter();
```
→ **Hook**: useRouter(

**Line 67**: Component/Function Definition
```typescript
  const router = useRouter();
```

**Line 68**: Hook Usage
```typescript
  const searchParams = useSearchParams();
```
→ **Hook**: useSearchParams(

**Line 68**: Component/Function Definition
```typescript
  const searchParams = useSearchParams();
```

**Line 69**: Component/Function Definition
```typescript
  const redirectTo = searchParams.get('redirectTo') || undefined;
```

**Line 72**: State Management
```typescript
  const [isFlipped, setIsFlipped] = useState(defaultFlipped);
```

**Line 72**: Hook Usage
```typescript
  const [isFlipped, setIsFlipped] = useState(defaultFlipped);
```
→ **Hook**: useState(

**Line 79**: State Management
```typescript
  const [showPassword, setShowPassword] = useState(false);
```

**Line 79**: Hook Usage
```typescript
  const [showPassword, setShowPassword] = useState(false);
```
→ **Hook**: useState(

**Line 80**: State Management
```typescript
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
```

**Line 80**: Hook Usage
```typescript
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
```
→ **Hook**: useState(

**Line 83**: State Management
```typescript
  const [loginMagicSent, setLoginMagicSent] = useState(false);
```

**Line 83**: Hook Usage
```typescript
  const [loginMagicSent, setLoginMagicSent] = useState(false);
```
→ **Hook**: useState(

**Line 84**: State Management
```typescript
  const [signupMagicSent, setSignupMagicSent] = useState(false);
```

**Line 84**: Hook Usage
```typescript
  const [signupMagicSent, setSignupMagicSent] = useState(false);
```
→ **Hook**: useState(

**Line 92**: State Management
```typescript
  const [forgotSent, setForgotSent] = useState(false);
```

**Line 92**: Hook Usage
```typescript
  const [forgotSent, setForgotSent] = useState(false);
```
→ **Hook**: useState(

**Line 95**: Hook Usage
```typescript
  const [isPendingLogin, startLoginTransition] = useTransition();
```
→ **Hook**: useTransition(

**Line 96**: Hook Usage
```typescript
  const [isPendingSignUp, startSignUpTransition] = useTransition();
```
→ **Hook**: useTransition(

**Line 97**: Hook Usage
```typescript
  const [isPendingLoginMagic, startLoginMagicTransition] = useTransition();
```
→ **Hook**: useTransition(

**Line 98**: Hook Usage
```typescript
  const [isPendingSignupMagic, startSignupMagicTransition] = useTransition();
```
→ **Hook**: useTransition(

**Line 101**: State Management
```typescript
  const [loginData, setLoginData] = useState(emptyLoginState);
```

**Line 101**: Hook Usage
```typescript
  const [loginData, setLoginData] = useState(emptyLoginState);
```
→ **Hook**: useState(

**Line 102**: State Management
```typescript
  const [signUpData, setSignUpData] = useState(emptySignUpState);
```

**Line 102**: Hook Usage
```typescript
  const [signUpData, setSignUpData] = useState(emptySignUpState);
```
→ **Hook**: useState(

**Line 108**: Hook Usage
```typescript
  const flipToSignup = useCallback(() => {
```
→ **Hook**: useCallback(

**Line 108**: Component/Function Definition
```typescript
  const flipToSignup = useCallback(() => {
```

**Line 115**: Hook Usage
```typescript
  const flipToLogin = useCallback(() => {
```
→ **Hook**: useCallback(

**Line 115**: Component/Function Definition
```typescript
  const flipToLogin = useCallback(() => {
```

**Line 126**: Component/Function Definition
```typescript
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 131**: Component/Function Definition
```typescript
  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 137**: Component/Function Definition
```typescript
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
```

**Line 147**: Backend Call/Async Logic
```typescript
    startLoginTransition(async () => {
```
→ **Type**: Async Operation

**Line 149**: Backend Call/Async Logic
```typescript
        const res = await fetch('/api/auth/login', {
```
→ **Type**: Async Operation

**Line 149**: API Route
```typescript
        const res = await fetch('/api/auth/login', {
```
→ **Type**: API Call

**Line 149**: Component/Function Definition
```typescript
        const res = await fetch('/api/auth/login', {
```

**Line 157**: Backend Call/Async Logic
```typescript
        const result = await res.json();
```
→ **Type**: Async Operation

**Line 157**: Component/Function Definition
```typescript
        const result = await res.json();
```

**Line 177**: Component/Function Definition
```typescript
  const handleForgotPassword = () => {
```

**Line 182**: Backend Call/Async Logic
```typescript
    startLoginMagicTransition(async () => {
```
→ **Type**: Async Operation

**Line 184**: Backend Call/Async Logic
```typescript
        const res = await fetch('/api/auth/magic-link', {
```
→ **Type**: Async Operation

**Line 184**: API Route
```typescript
        const res = await fetch('/api/auth/magic-link', {
```
→ **Type**: API Call

**Line 184**: Component/Function Definition
```typescript
        const res = await fetch('/api/auth/magic-link', {
```

**Line 189**: Backend Call/Async Logic
```typescript
        const result = await res.json();
```
→ **Type**: Async Operation

**Line 189**: Component/Function Definition
```typescript
        const result = await res.json();
```

**Line 204**: Component/Function Definition
```typescript
  const handleLoginMagic = (e: React.FormEvent<HTMLFormElement>) => {
```

**Line 207**: Backend Call/Async Logic
```typescript
    startLoginMagicTransition(async () => {
```
→ **Type**: Async Operation

**Line 209**: Backend Call/Async Logic
```typescript
        const res = await fetch('/api/auth/magic-link', {
```
→ **Type**: Async Operation

**Line 209**: API Route
```typescript
        const res = await fetch('/api/auth/magic-link', {
```
→ **Type**: API Call

**Line 209**: Component/Function Definition
```typescript
        const res = await fetch('/api/auth/magic-link', {
```

**Line 214**: Backend Call/Async Logic
```typescript
        const result = await res.json();
```
→ **Type**: Async Operation

**Line 214**: Component/Function Definition
```typescript
        const result = await res.json();
```

**Line 225**: Component/Function Definition
```typescript
  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
```

**Line 240**: Backend Call/Async Logic
```typescript
    startSignUpTransition(async () => {
```
→ **Type**: Async Operation

**Line 242**: Backend Call/Async Logic
```typescript
        const res = await fetch('/api/auth/signup', {
```
→ **Type**: Async Operation

**Line 242**: API Route
```typescript
        const res = await fetch('/api/auth/signup', {
```
→ **Type**: API Call

**Line 242**: Component/Function Definition
```typescript
        const res = await fetch('/api/auth/signup', {
```

**Line 251**: Backend Call/Async Logic
```typescript
        const result = await res.json();
```
→ **Type**: Async Operation

**Line 251**: Component/Function Definition
```typescript
        const result = await res.json();
```

**Line 269**: Component/Function Definition
```typescript
  const handleSignupMagic = (e: React.FormEvent<HTMLFormElement>) => {
```

**Line 272**: Backend Call/Async Logic
```typescript
    startSignupMagicTransition(async () => {
```
→ **Type**: Async Operation

**Line 274**: Backend Call/Async Logic
```typescript
        const res = await fetch('/api/auth/magic-link', {
```
→ **Type**: Async Operation

**Line 274**: API Route
```typescript
        const res = await fetch('/api/auth/magic-link', {
```
→ **Type**: API Call

**Line 274**: Component/Function Definition
```typescript
        const res = await fetch('/api/auth/magic-link', {
```

**Line 282**: Backend Call/Async Logic
```typescript
        const result = await res.json();
```
→ **Type**: Async Operation

**Line 282**: Component/Function Definition
```typescript
        const result = await res.json();
```

**Line 296**: Component/Function Definition
```typescript
  const pwStrength = getPasswordStrength(signUpData.password);
```

**Line 785**: Component/Function Definition
```typescript
                      const inp = document.getElementById('confirm-pw-input') as HTMLInputElement;
```

**Line 858**: Component/Function Definition
```typescript
                          const isCorrect = typedChar === signUpData.password[i];
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/BackgroundScene.tsx

**Line 3**: Component/Function Definition
```typescript
export default function BackgroundScene() {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/BusinessCommandSidebar.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState, useEffect } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { ShoppingBag, X, Plus } from 'lucide-react';
```
**Line 5**: Import Backend Logic
```typescript
import { Item } from '@/lib/actions/items';
```
→ **Backend**: @/lib/actions/items

**Line 6**: Import Backend Logic
```typescript
import { useActionDrawer } from '@/hooks/useActionDrawer';
```
**Line 16**: Component/Function Definition
```typescript
export default function BusinessCommandSidebar({
```

**Line 23**: State Management
```typescript
  const [showCommand, setShowCommand] = useState(false);
```

**Line 23**: Hook Usage
```typescript
  const [showCommand, setShowCommand] = useState(false);
```
→ **Hook**: useState(

**Line 24**: Hook Usage
```typescript
  const { openDrawer } = useActionDrawer();
```
→ **Hook**: useActionDrawer(

**Line 27**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 28**: Component/Function Definition
```typescript
    const handleOpenCommand = (event: Event) => {
```

**Line 29**: Component/Function Definition
```typescript
      const customEvent = event as CustomEvent;
```

**Line 33**: Component/Function Definition
```typescript
        const productElement = document.querySelector(`[data-product-id="${customEvent.detail.item?.id}"]`);
```

**Line 46**: Component/Function Definition
```typescript
  const products = items.filter(i => i.item_type === 'PRODUCT');
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/BusinessGallerySection.tsx

**Line 3**: Import Backend Logic
```typescript
import React from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { Camera, Maximize2 } from 'lucide-react';
```
**Line 16**: Component/Function Definition
```typescript
export default function BusinessGallerySection({ images, businessName }: BusinessGallerySectionProps) {
```

**Line 31**: Component/Function Definition
```typescript
          const isVideo = url.match(/\.(mp4|webm|ogg|mov)$|^data:video\//i);
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/BusinessImageGallery.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { Camera } from 'lucide-react';
```
**Line 11**: Component/Function Definition
```typescript
export default function BusinessImageGallery({ images, businessName }: BusinessImageGalleryProps) {
```

**Line 15**: Component/Function Definition
```typescript
                const isVideo = url.match(/\.(mp4|webm|ogg|mov)$|^data:video\//i);
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/BusinessItemsList.tsx

**Line 3**: Import Backend Logic
```typescript
import { useRouter } from 'next/navigation';
```
**Line 4**: Import Backend Logic
```typescript
import { Item } from '@/lib/actions/items';
```
→ **Backend**: @/lib/actions/items

**Line 5**: Import Backend Logic
```typescript
import { ServiceCard } from './ServiceCard';
```
**Line 6**: Import Backend Logic
```typescript
import { ProductCard } from './ProductCard';
```
**Line 7**: Import Backend Logic
```typescript
import { Package } from 'lucide-react';
```
**Line 34**: Component/Function Definition
```typescript
export function BusinessItemsList({ items, businessName, businessId, activePromos, isLinkedToStore, isOwner = false }: Props) {
```

**Line 35**: Hook Usage
```typescript
    const router = useRouter();
```
→ **Hook**: useRouter(

**Line 35**: Component/Function Definition
```typescript
    const router = useRouter();
```

**Line 52**: Component/Function Definition
```typescript
                const itemPromo = activePromos.find((p: Promotion) =>
```

**Line 56**: Component/Function Definition
```typescript
                const promoProps = itemPromo ? {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/BusinessReservationSidebar.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState, useEffect } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useRouter } from 'next/navigation';
```
**Line 5**: Import Backend Logic
```typescript
import Link from 'next/link';
```
**Line 6**: Import Backend Logic
```typescript
import { Phone, Globe, MapPin, Clock, MessageCircle, X, Loader2 } from 'lucide-react';
```
**Line 7**: Import Backend Logic
```typescript
import { ReservationCard } from '@/components/reservation/reservation-card';
```
**Line 8**: Import Backend Logic
```typescript
import { logStoreAnalyticsEvent } from '@/lib/actions/user-activity';
```
→ **Backend**: @/lib/actions/user-activity

**Line 9**: Import Backend Logic
```typescript
import { ReservationConfirmationModal } from '@/components/reservation/reservation-confirmation-modal';
```
**Line 10**: Import Backend Logic
```typescript
import { ReservationData } from '@/components/reservation/types';
```
**Line 11**: Import Backend Logic
```typescript
import { Item } from '@/lib/actions/items';
```
→ **Backend**: @/lib/actions/items

**Line 12**: Import Backend Logic
```typescript
import BusinessCommandSidebar from './BusinessCommandSidebar';
```
**Line 13**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 14**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 39**: Component/Function Definition
```typescript
export function BusinessReservationSidebar({
```

**Line 55**: State Management
```typescript
  const [showReservation, setShowReservation] = useState(false);
```

**Line 55**: Hook Usage
```typescript
  const [showReservation, setShowReservation] = useState(false);
```
→ **Hook**: useState(

**Line 57**: Hook Usage
```typescript
  const router = useRouter();
```
→ **Hook**: useRouter(

**Line 57**: Component/Function Definition
```typescript
  const router = useRouter();
```

**Line 59**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 60**: Component/Function Definition
```typescript
    const handleHashChange = () => {
```

**Line 75**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 76**: Component/Function Definition
```typescript
    const handleOpenReservation = () => {
```

**Line 152**: Component/Function Definition
```typescript
                      const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() === day;
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/BusinessStories.tsx

**Line 3**: Import Backend Logic
```typescript
import { getBusinessStories } from '@/lib/actions/stories';
```
→ **Backend**: @/lib/actions/stories

**Line 4**: Import Backend Logic
```typescript
import { useEffect } from 'react';
```
**Line 6**: Import Backend Logic
```typescript
import React, { useRef, useState } from 'react';
```
**Line 7**: Import Backend Logic
```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
```
**Line 31**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 32**: Import Backend Logic
```typescript
import { uploadStoryMedia, publishStory, recordStoryView } from '@/lib/actions/stories';
```
→ **Backend**: @/lib/actions/stories

**Line 33**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 34**: Import Backend Logic
```typescript
import { Input } from '@/components/ui/input';
```
**Line 35**: Import Backend Logic
```typescript
import { Label } from '@/components/ui/label';
```
**Line 36**: Import Backend Logic
```typescript
import CameraCapture from '@/components/CameraCapture';
```
**Line 64**: Component/Function Definition
```typescript
const ACCENT_COLORS = [
```

**Line 70**: Component/Function Definition
```typescript
function StoryItem({ story, accentColor }: { story: RealStory; accentColor: string }) {
```

**Line 71**: Component/Function Definition
```typescript
  const isBusinessOwner = story.author_id === story.stores?.owner_id;
```

**Line 72**: Component/Function Definition
```typescript
  const authorName = isBusinessOwner ? 'Propriétaire' : (story.author?.full_name || 'Client');
```

**Line 73**: Component/Function Definition
```typescript
  const avatarUrl = isBusinessOwner ? (story.stores?.logo_url || story.author?.avatar_url) : story.author?.avatar_url;
```

**Line 75**: Backend Call/Async Logic
```typescript
  const handleOpen = async () => {
```
→ **Type**: Async Operation

**Line 75**: Component/Function Definition
```typescript
  const handleOpen = async () => {
```

**Line 76**: Backend Call/Async Logic
```typescript
    try { await recordStoryView(story.id); } catch { }
```
→ **Type**: Async Operation

**Line 157**: Component/Function Definition
```typescript
function AddStoryButton({ storeId, isOwner, onAdded }: { storeId: number; isOwner: boolean; onAdded: (story: RealStory) => void }) {
```

**Line 158**: Component/Function Definition
```typescript
  const fileRef = useRef<HTMLInputElement>(null);
```

**Line 159**: State Management
```typescript
  const [isUploading, setIsUploading] = useState(false);
```

**Line 159**: Hook Usage
```typescript
  const [isUploading, setIsUploading] = useState(false);
```
→ **Hook**: useState(

**Line 160**: State Management
```typescript
  const [isDialogOpen, setIsDialogOpen] = useState(false);
```

**Line 160**: Hook Usage
```typescript
  const [isDialogOpen, setIsDialogOpen] = useState(false);
```
→ **Hook**: useState(

**Line 163**: State Management
```typescript
  const [caption, setCaption] = useState('');
```

**Line 163**: Hook Usage
```typescript
  const [caption, setCaption] = useState('');
```
→ **Hook**: useState(

**Line 164**: State Management
```typescript
  const [showCamera, setShowCamera] = useState(false);
```

**Line 164**: Hook Usage
```typescript
  const [showCamera, setShowCamera] = useState(false);
```
→ **Hook**: useState(

**Line 166**: Component/Function Definition
```typescript
  const resetState = () => {
```

**Line 174**: Component/Function Definition
```typescript
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 175**: Component/Function Definition
```typescript
    const file = e.target.files?.[0];
```

**Line 192**: Component/Function Definition
```typescript
  const handleCameraCapture = (file: File) => {
```

**Line 199**: Backend Call/Async Logic
```typescript
  const handlePublish = async () => {
```
→ **Type**: Async Operation

**Line 199**: Component/Function Definition
```typescript
  const handlePublish = async () => {
```

**Line 204**: Component/Function Definition
```typescript
      const formData = new FormData();
```

**Line 207**: Backend Call/Async Logic
```typescript
      const uploadResult = await uploadStoryMedia(formData);
```
→ **Type**: Async Operation

**Line 207**: Component/Function Definition
```typescript
      const uploadResult = await uploadStoryMedia(formData);
```

**Line 215**: Component/Function Definition
```typescript
      const isVideo = selectedFile.type.startsWith('video/');
```

**Line 216**: Backend Call/Async Logic
```typescript
      const result = await publishStory({
```
→ **Type**: Async Operation

**Line 216**: Component/Function Definition
```typescript
      const result = await publishStory({
```

**Line 366**: Component/Function Definition
```typescript
function timeAgo(dateStr: string) {
```

**Line 367**: Component/Function Definition
```typescript
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000 / 3600;
```

**Line 375**: Component/Function Definition
```typescript
export function BusinessStoriesDialog({ 
```

**Line 387**: State Management
```typescript
  const [loading, setLoading] = useState(true);
```

**Line 387**: Hook Usage
```typescript
  const [loading, setLoading] = useState(true);
```
→ **Hook**: useState(

**Line 389**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 411**: Component/Function Definition
```typescript
              const isBusinessOwner = story.author_id === story.stores?.owner_id;
```

**Line 412**: Component/Function Definition
```typescript
              const authorName = isBusinessOwner ? 'Propriétaire' : (story.author?.full_name || 'Client');
```

**Line 413**: Component/Function Definition
```typescript
              const avatarUrl = isBusinessOwner ? (story.stores?.logo_url || story.author?.avatar_url) : story.author?.avatar_url;
```

**Line 414**: Component/Function Definition
```typescript
              const accentColor = ACCENT_COLORS[i % ACCENT_COLORS.length];
```

**Line 471**: Component/Function Definition
```typescript
export function BusinessStories({ storeId, initialStories = [], canAddStory = false, isOwner = false }: BusinessStoriesProps & { isOwner?: boolean }) {
```

**Line 474**: Component/Function Definition
```typescript
  const handleAdded = (newStory: RealStory) => {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/CameraCapture.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useRef, useState, useEffect } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { Camera, X, RefreshCw, StopCircle, Check, Loader2, Sparkles } from 'lucide-react';
```
**Line 5**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 6**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 13**: Component/Function Definition
```typescript
const FILTERS = [
```

**Line 23**: Component/Function Definition
```typescript
export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
```

**Line 24**: Component/Function Definition
```typescript
  const videoRef = useRef<HTMLVideoElement>(null);
```

**Line 25**: Component/Function Definition
```typescript
  const canvasRef = useRef<HTMLCanvasElement>(null);
```

**Line 26**: Component/Function Definition
```typescript
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
```

**Line 27**: Component/Function Definition
```typescript
  const requestRef = useRef<number>();
```

**Line 30**: State Management
```typescript
  const [isRecording, setIsRecording] = useState(false);
```

**Line 30**: Hook Usage
```typescript
  const [isRecording, setIsRecording] = useState(false);
```
→ **Hook**: useState(

**Line 35**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(true);
```

**Line 35**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(true);
```
→ **Hook**: useState(

**Line 36**: State Management
```typescript
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
```

**Line 36**: Hook Usage
```typescript
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
```
→ **Hook**: useState(

**Line 38**: Backend Call/Async Logic
```typescript
  const startCamera = async () => {
```
→ **Type**: Async Operation

**Line 38**: Component/Function Definition
```typescript
  const startCamera = async () => {
```

**Line 45**: Backend Call/Async Logic
```typescript
      const newStream = await navigator.mediaDevices.getUserMedia({
```
→ **Type**: Async Operation

**Line 45**: Component/Function Definition
```typescript
      const newStream = await navigator.mediaDevices.getUserMedia({
```

**Line 66**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 75**: Component/Function Definition
```typescript
  const drawToCanvas = () => {
```

**Line 77**: Component/Function Definition
```typescript
    const ctx = canvasRef.current.getContext('2d');
```

**Line 105**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 114**: Component/Function Definition
```typescript
  const switchCamera = () => {
```

**Line 118**: Component/Function Definition
```typescript
  const takePhoto = () => {
```

**Line 128**: Component/Function Definition
```typescript
  const startRecording = () => {
```

**Line 131**: Component/Function Definition
```typescript
    const canvasStream = canvasRef.current.captureStream(30);
```

**Line 133**: Component/Function Definition
```typescript
    const audioTrack = stream.getAudioTracks()[0];
```

**Line 137**: Component/Function Definition
```typescript
    const recorder = new MediaRecorder(canvasStream, { mimeType: 'video/webm;codecs=vp9' });
```

**Line 145**: Component/Function Definition
```typescript
      const blob = new Blob(chunks, { type: 'video/webm' });
```

**Line 154**: Component/Function Definition
```typescript
  const stopRecording = () => {
```

**Line 161**: Component/Function Definition
```typescript
  const handleConfirm = () => {
```

**Line 163**: Component/Function Definition
```typescript
      const extension = mode === 'photo' ? 'jpg' : 'webm';
```

**Line 164**: Component/Function Definition
```typescript
      const file = new File([capturedBlob], `story-${Date.now()}.${extension}`, {
```

**Line 171**: Component/Function Definition
```typescript
  const handleReset = () => {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/FavoriteButton.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState, useEffect } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { Bookmark, Loader2 } from 'lucide-react';
```
**Line 5**: Import Backend Logic
```typescript
import { toggleSaveAction, isStoreSaved } from '@/lib/actions/favorites';
```
→ **Backend**: @/lib/actions/favorites

**Line 6**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 7**: Import Backend Logic
```typescript
import { motion, AnimatePresence } from 'framer-motion';
```
**Line 14**: Component/Function Definition
```typescript
export default function FavoriteButton({ storeId, initialIsSaved = false }: FavoriteButtonProps) {
```

**Line 15**: State Management
```typescript
  const [isSaved, setIsSaved] = useState(initialIsSaved);
```

**Line 15**: Hook Usage
```typescript
  const [isSaved, setIsSaved] = useState(initialIsSaved);
```
→ **Hook**: useState(

**Line 16**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(false);
```

**Line 16**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(false);
```
→ **Hook**: useState(

**Line 17**: State Management
```typescript
  const [isChecking, setIsChecking] = useState(!initialIsSaved);
```

**Line 17**: Hook Usage
```typescript
  const [isChecking, setIsChecking] = useState(!initialIsSaved);
```
→ **Hook**: useState(

**Line 20**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 22**: Backend Call/Async Logic
```typescript
      const checkStatus = async () => {
```
→ **Type**: Async Operation

**Line 22**: Component/Function Definition
```typescript
      const checkStatus = async () => {
```

**Line 24**: Backend Call/Async Logic
```typescript
          const status = await isStoreSaved(storeId);
```
→ **Type**: Async Operation

**Line 24**: Component/Function Definition
```typescript
          const status = await isStoreSaved(storeId);
```

**Line 38**: Backend Call/Async Logic
```typescript
  const handleToggle = async (e: React.MouseEvent) => {
```
→ **Type**: Async Operation

**Line 38**: Component/Function Definition
```typescript
  const handleToggle = async (e: React.MouseEvent) => {
```

**Line 44**: Component/Function Definition
```typescript
    const previousState = isSaved;
```

**Line 48**: Backend Call/Async Logic
```typescript
      const result = await toggleSaveAction(storeId);
```
→ **Type**: Async Operation

**Line 48**: Component/Function Definition
```typescript
      const result = await toggleSaveAction(storeId);
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/FollowButton.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState, useEffect } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { UserPlus, UserMinus, Loader2, Bell } from 'lucide-react';
```
**Line 5**: Import Backend Logic
```typescript
import { toggleFollowStore, isFollowingStore } from '@/lib/actions/store-follows';
```
→ **Backend**: @/lib/actions/store-follows

**Line 6**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 7**: Import Backend Logic
```typescript
import { motion, AnimatePresence } from 'framer-motion';
```
**Line 14**: Component/Function Definition
```typescript
export default function FollowButton({ storeId, initialIsFollowing = false }: FollowButtonProps) {
```

**Line 15**: State Management
```typescript
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
```

**Line 15**: Hook Usage
```typescript
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
```
→ **Hook**: useState(

**Line 16**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(false);
```

**Line 16**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(false);
```
→ **Hook**: useState(

**Line 17**: State Management
```typescript
  const [isChecking, setIsChecking] = useState(!initialIsFollowing);
```

**Line 17**: Hook Usage
```typescript
  const [isChecking, setIsChecking] = useState(!initialIsFollowing);
```
→ **Hook**: useState(

**Line 20**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 22**: Backend Call/Async Logic
```typescript
      const checkStatus = async () => {
```
→ **Type**: Async Operation

**Line 22**: Component/Function Definition
```typescript
      const checkStatus = async () => {
```

**Line 24**: Backend Call/Async Logic
```typescript
          const status = await isFollowingStore(storeId);
```
→ **Type**: Async Operation

**Line 24**: Component/Function Definition
```typescript
          const status = await isFollowingStore(storeId);
```

**Line 38**: Backend Call/Async Logic
```typescript
  const handleToggle = async (e: React.MouseEvent) => {
```
→ **Type**: Async Operation

**Line 38**: Component/Function Definition
```typescript
  const handleToggle = async (e: React.MouseEvent) => {
```

**Line 44**: Component/Function Definition
```typescript
    const previousState = isFollowing;
```

**Line 48**: Backend Call/Async Logic
```typescript
      const result = await toggleFollowStore(storeId);
```
→ **Type**: Async Operation

**Line 48**: Component/Function Definition
```typescript
      const result = await toggleFollowStore(storeId);
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/Footer.tsx

**Line 3**: Import Backend Logic
```typescript
import { useRef, useState, useEffect } from 'react';
```
**Line 5**: Component/Function Definition
```typescript
export default function Footer() {
```

**Line 6**: Component/Function Definition
```typescript
  const footerRef = useRef<HTMLElement>(null);
```

**Line 7**: State Management
```typescript
  const [hidden, setHidden] = useState(false);
```

**Line 7**: Hook Usage
```typescript
  const [hidden, setHidden] = useState(false);
```
→ **Hook**: useState(

**Line 8**: Component/Function Definition
```typescript
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
```

**Line 10**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 11**: Component/Function Definition
```typescript
    const handleScroll = () => {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/GlobalActionDrawer.tsx

**Line 3**: Import Backend Logic
```typescript
import { useEffect, useState } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { motion, AnimatePresence } from 'framer-motion';
```
**Line 5**: Import Backend Logic
```typescript
import { X, CalendarCheck, ShoppingCart } from 'lucide-react';
```
**Line 6**: Import Backend Logic
```typescript
import { useActionDrawer } from '@/hooks/useActionDrawer';
```
**Line 7**: Import Backend Logic
```typescript
import { ReservationDrawerContent } from './reservation/ReservationDrawerContent';
```
**Line 8**: Import Backend Logic
```typescript
import { CheckoutDrawerContent } from './checkout/CheckoutDrawerContent';
```
**Line 10**: Component/Function Definition
```typescript
export default function GlobalActionDrawer() {
```

**Line 11**: Hook Usage
```typescript
  const { isOpen, mode, data, closeDrawer } = useActionDrawer();
```
→ **Hook**: useActionDrawer(

**Line 12**: State Management
```typescript
  const [mounted, setMounted] = useState(false);
```

**Line 12**: Hook Usage
```typescript
  const [mounted, setMounted] = useState(false);
```
→ **Hook**: useState(

**Line 14**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/Hero.tsx

**Line 3**: Import Backend Logic
```typescript
import { useEffect, useRef, useState } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import gsap from 'gsap';
```
**Line 5**: Import Backend Logic
```typescript
import { MoveRight, RocketIcon, Play, Pause, Volume2, VolumeX } from 'lucide-react';
```
**Line 6**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button';
```
**Line 7**: Import Backend Logic
```typescript
import { Badge } from '@/components/ui/badge';
```
**Line 8**: Import Backend Logic
```typescript
import Link from 'next/link';
```
**Line 10**: Component/Function Definition
```typescript
export default function Hero() {
```

**Line 11**: Component/Function Definition
```typescript
  const heroRef = useRef<HTMLDivElement>(null);
```

**Line 12**: Component/Function Definition
```typescript
  const titleRef = useRef<HTMLHeadingElement>(null);
```

**Line 13**: Component/Function Definition
```typescript
  const subtitleRef = useRef<HTMLParagraphElement>(null);
```

**Line 14**: Component/Function Definition
```typescript
  const ctaRef = useRef<HTMLDivElement>(null);
```

**Line 15**: Component/Function Definition
```typescript
  const videoWrapRef = useRef<HTMLDivElement>(null);
```

**Line 16**: Component/Function Definition
```typescript
  const videoElRef = useRef<HTMLVideoElement>(null);
```

**Line 18**: State Management
```typescript
  const [isPlaying, setIsPlaying] = useState(false);
```

**Line 18**: Hook Usage
```typescript
  const [isPlaying, setIsPlaying] = useState(false);
```
→ **Hook**: useState(

**Line 19**: State Management
```typescript
  const [isMuted, setIsMuted] = useState(true);
```

**Line 19**: Hook Usage
```typescript
  const [isMuted, setIsMuted] = useState(true);
```
→ **Hook**: useState(

**Line 22**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 23**: Component/Function Definition
```typescript
    const ctx = gsap.context(() => {
```

**Line 34**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 35**: Component/Function Definition
```typescript
    const video = videoElRef.current;
```

**Line 40**: Backend Call/Async Logic
```typescript
    const attemptPlay = async () => {
```
→ **Type**: Async Operation

**Line 40**: Component/Function Definition
```typescript
    const attemptPlay = async () => {
```

**Line 44**: Backend Call/Async Logic
```typescript
        await video.play();
```
→ **Type**: Async Operation

**Line 51**: Backend Call/Async Logic
```typescript
        const handleForcePlay = async () => {
```
→ **Type**: Async Operation

**Line 51**: Component/Function Definition
```typescript
        const handleForcePlay = async () => {
```

**Line 53**: Backend Call/Async Logic
```typescript
            await video.play();
```
→ **Type**: Async Operation

**Line 73**: Component/Function Definition
```typescript
  const togglePlay = () => {
```

**Line 84**: Component/Function Definition
```typescript
  const toggleMute = () => {
```

**Line 86**: Component/Function Definition
```typescript
    const newMuted = !isMuted;
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/LoginForm.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { Eye, EyeOff, Mail, Info, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
```
**Line 5**: Import Backend Logic
```typescript
import Link from 'next/link';
```
**Line 9**: Component/Function Definition
```typescript
export function LoginForm() {
```

**Line 11**: State Management
```typescript
  const [showPassword, setShowPassword] = useState(false);
```

**Line 11**: Hook Usage
```typescript
  const [showPassword, setShowPassword] = useState(false);
```
→ **Hook**: useState(

**Line 12**: State Management
```typescript
  const [magicSent, setMagicSent] = useState(false);
```

**Line 12**: Hook Usage
```typescript
  const [magicSent, setMagicSent] = useState(false);
```
→ **Hook**: useState(

**Line 13**: State Management
```typescript
  const [magicLoading, setMagicLoading] = useState(false);
```

**Line 13**: Hook Usage
```typescript
  const [magicLoading, setMagicLoading] = useState(false);
```
→ **Hook**: useState(

**Line 14**: State Management
```typescript
  const [loginData, setLoginData] = useState({ email: '', password: '' });
```

**Line 14**: Hook Usage
```typescript
  const [loginData, setLoginData] = useState({ email: '', password: '' });
```
→ **Hook**: useState(

**Line 16**: Component/Function Definition
```typescript
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 21**: Backend Call/Async Logic
```typescript
  const handleMagicLink = async (e: React.FormEvent) => {
```
→ **Type**: Async Operation

**Line 21**: Component/Function Definition
```typescript
  const handleMagicLink = async (e: React.FormEvent) => {
```

**Line 24**: Backend Call/Async Logic
```typescript
    await new Promise((r) => setTimeout(r, 1500));
```
→ **Type**: Async Operation

**Line 30**: Component/Function Definition
```typescript
  const handlePasswordLogin = (e: React.FormEvent) => {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/Navbar.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState, useEffect, useRef, useCallback } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { useRouter, usePathname } from 'next/navigation';
```
**Line 10**: Import Backend Logic
```typescript
import { createClient } from '@/lib/supabase/client';
```
→ **Backend**: @/lib/supabase/client

**Line 11**: Import Backend Logic
```typescript
import { signOut } from '@/lib/supabase/auth';
```
→ **Backend**: @/lib/supabase/auth

**Line 12**: Import Backend Logic
```typescript
import Link from 'next/link';
```
**Line 13**: Import Backend Logic
```typescript
import { NotificationPopover } from '@/components/ui/notification-popover';
```
**Line 14**: Import Backend Logic
```typescript
import type { Notification } from '@/components/ui/notification-popover';import { UserDropdown } from '@/components/ui/user-dropdown';
```
**Line 15**: Import Backend Logic
```typescript
import { useState as useMotionState } from 'react';
```
**Line 16**: Import Backend Logic
```typescript
import { Menu, MenuItem, HoveredLink, ProductItem } from '@/components/ui/navbar-menu';
```
**Line 17**: Import Backend Logic
```typescript
import { useVoiceSearch } from '@/hooks/useVoiceSearch';
```
**Line 18**: Import Backend Logic
```typescript
import { useSmartSearch } from '@/hooks/useSmartSearch';
```
**Line 19**: Import Backend Logic
```typescript
import { useSavesStore } from '@/lib/store/use-saves-store';
```
→ **Backend**: @/lib/store/use-saves-store

**Line 20**: Import Backend Logic
```typescript
import { useMessaging } from '@/hooks/useMessaging';
```
**Line 21**: Import Backend Logic
```typescript
import { NavbarWriteReviewButton } from '@/components/NavbarWriteReviewButton';
```
**Line 22**: Import Backend Logic
```typescript
import { useCartStore } from '@/lib/store/use-cart-store';
```
→ **Backend**: @/lib/store/use-cart-store

**Line 23**: Import Backend Logic
```typescript
import { useNotifications } from '@/hooks/useNotifications';
```
**Line 24**: Import Backend Logic
```typescript
import { toast } from 'sonner';
```
**Line 27**: Component/Function Definition
```typescript
const categoryMenuItems = [
```

**Line 141**: Component/Function Definition
```typescript
function ImageSearchModal({ onClose, onSearch }: {
```

**Line 145**: State Management
```typescript
  const [isDragging, setIsDragging] = useState(false);
```

**Line 145**: Hook Usage
```typescript
  const [isDragging, setIsDragging] = useState(false);
```
→ **Hook**: useState(

**Line 148**: State Management
```typescript
  const [isAnalyzing, setIsAnalyzing] = useState(false);
```

**Line 148**: Hook Usage
```typescript
  const [isAnalyzing, setIsAnalyzing] = useState(false);
```
→ **Hook**: useState(

**Line 151**: Component/Function Definition
```typescript
  const fileInputRef = useRef<HTMLInputElement>(null);
```

**Line 154**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 155**: Component/Function Definition
```typescript
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
```

**Line 160**: Hook Usage
```typescript
  const processFile = useCallback((file: File) => {
```
→ **Hook**: useCallback(

**Line 160**: Component/Function Definition
```typescript
  const processFile = useCallback((file: File) => {
```

**Line 173**: Component/Function Definition
```typescript
    const reader = new FileReader();
```

**Line 178**: Hook Usage
```typescript
  const handleDrop = useCallback((e: React.DragEvent) => {
```
→ **Hook**: useCallback(

**Line 178**: Component/Function Definition
```typescript
  const handleDrop = useCallback((e: React.DragEvent) => {
```

**Line 181**: Component/Function Definition
```typescript
    const file = e.dataTransfer.files[0];
```

**Line 185**: Component/Function Definition
```typescript
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
```

**Line 186**: Component/Function Definition
```typescript
    const file = e.target.files?.[0];
```

**Line 191**: Backend Call/Async Logic
```typescript
  const handleAnalyze = async () => {
```
→ **Type**: Async Operation

**Line 191**: Component/Function Definition
```typescript
  const handleAnalyze = async () => {
```

**Line 198**: Backend Call/Async Logic
```typescript
      const res = await fetch('/api/image-search', {
```
→ **Type**: Async Operation

**Line 198**: API Route
```typescript
      const res = await fetch('/api/image-search', {
```
→ **Type**: API Call

**Line 198**: Component/Function Definition
```typescript
      const res = await fetch('/api/image-search', {
```

**Line 205**: Backend Call/Async Logic
```typescript
      const data = await res.json();
```
→ **Type**: Async Operation

**Line 205**: Component/Function Definition
```typescript
      const data = await res.json();
```

**Line 214**: Component/Function Definition
```typescript
  const handleSearch = () => {
```

**Line 362**: Component/Function Definition
```typescript
function CategoryFloatingMenu({ searchQuery, locationQuery }: { searchQuery: string, locationQuery: string }) {
```

**Line 365**: Component/Function Definition
```typescript
  const getCombinedHref = (baseHref: string) => {
```

**Line 367**: Component/Function Definition
```typescript
    const params = new URLSearchParams(query);
```

**Line 609**: Component/Function Definition
```typescript
export default function Navbar() {
```

**Line 610**: Hook Usage
```typescript
  const { totalUnreadCount: messageUnreadCount } = useMessaging();
```
→ **Hook**: useMessaging(

**Line 611**: Hook Usage
```typescript
  const router = useRouter();
```
→ **Hook**: useRouter(

**Line 611**: Component/Function Definition
```typescript
  const router = useRouter();
```

**Line 612**: Hook Usage
```typescript
  const pathname = usePathname();
```
→ **Hook**: usePathname(

**Line 612**: Component/Function Definition
```typescript
  const pathname = usePathname();
```

**Line 613**: Component/Function Definition
```typescript
  const isHome = pathname === '/';
```

**Line 614**: State Management
```typescript
  const [searchQuery, setSearchQuery] = useState('');
```

**Line 614**: Hook Usage
```typescript
  const [searchQuery, setSearchQuery] = useState('');
```
→ **Hook**: useState(

**Line 615**: State Management
```typescript
  const [locationQuery, setLocationQuery] = useState('');
```

**Line 615**: Hook Usage
```typescript
  const [locationQuery, setLocationQuery] = useState('');
```
→ **Hook**: useState(

**Line 619**: State Management
```typescript
  const [profileOpen, setProfileOpen] = useState(false);
```

**Line 619**: Hook Usage
```typescript
  const [profileOpen, setProfileOpen] = useState(false);
```
→ **Hook**: useState(

**Line 620**: Hook Usage
```typescript
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
```
→ **Hook**: useNotifications(

**Line 621**: State Management
```typescript
  const [imageSearchOpen, setImageSearchOpen] = useState(false);
```

**Line 621**: Hook Usage
```typescript
  const [imageSearchOpen, setImageSearchOpen] = useState(false);
```
→ **Hook**: useState(

**Line 626**: Component/Function Definition
```typescript
  const profileRef = useRef<HTMLDivElement>(null);
```

**Line 628**: Hook Usage
```typescript
  const { isListening, transcript, isSupported, startListening, stopListening, resetTranscript } = useVoiceSearch({
```
→ **Hook**: useVoiceSearch(

**Line 634**: Hook Usage
```typescript
  const { search: doSmartSearch, results: searchResults, isLoading: isSearchLoading } = useSmartSearch();
```
→ **Hook**: useSmartSearch(

**Line 635**: State Management
```typescript
  const [debouncedQuery, setDebouncedQuery] = useState('');
```

**Line 635**: Hook Usage
```typescript
  const [debouncedQuery, setDebouncedQuery] = useState('');
```
→ **Hook**: useState(

**Line 636**: State Management
```typescript
  const [showDropdown, setShowDropdown] = useState(false);
```

**Line 636**: Hook Usage
```typescript
  const [showDropdown, setShowDropdown] = useState(false);
```
→ **Hook**: useState(

**Line 639**: State Management
```typescript
  const [debouncedLocQuery, setDebouncedLocQuery] = useState('');
```

**Line 639**: Hook Usage
```typescript
  const [debouncedLocQuery, setDebouncedLocQuery] = useState('');
```
→ **Hook**: useState(

**Line 641**: State Management
```typescript
  const [showLocDropdown, setShowLocDropdown] = useState(false);
```

**Line 641**: Hook Usage
```typescript
  const [showLocDropdown, setShowLocDropdown] = useState(false);
```
→ **Hook**: useState(

**Line 642**: State Management
```typescript
  const [isLocLoading, setIsLocLoading] = useState(false);
```

**Line 642**: Hook Usage
```typescript
  const [isLocLoading, setIsLocLoading] = useState(false);
```
→ **Hook**: useState(

**Line 643**: Hook Usage
```typescript
  const saveCount = useSavesStore((state) => state.saveCount);
```
→ **Hook**: useSavesStore(

**Line 643**: Component/Function Definition
```typescript
  const saveCount = useSavesStore((state) => state.saveCount);
```

**Line 644**: Hook Usage
```typescript
  const cartItemCount = useCartStore((state) => state.getTotalItems());
```
→ **Hook**: useCartStore(

**Line 644**: Component/Function Definition
```typescript
  const cartItemCount = useCartStore((state) => state.getTotalItems());
```

**Line 646**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 647**: Component/Function Definition
```typescript
    const handler = setTimeout(() => {
```

**Line 653**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 667**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 668**: Component/Function Definition
```typescript
    const handler = setTimeout(() => {
```

**Line 675**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 676**: Backend Call/Async Logic
```typescript
    const fetchLocations = async () => {
```
→ **Type**: Async Operation

**Line 676**: Component/Function Definition
```typescript
    const fetchLocations = async () => {
```

**Line 681**: Backend Call/Async Logic
```typescript
          const res = await fetch(`/api/geo/autocomplete?text=${encodeURIComponent(debouncedLocQuery)}`);
```
→ **Type**: Async Operation

**Line 681**: API Route
```typescript
          const res = await fetch(`/api/geo/autocomplete?text=${encodeURIComponent(debouncedLocQuery)}`);
```
→ **Type**: API Call

**Line 681**: Component/Function Definition
```typescript
          const res = await fetch(`/api/geo/autocomplete?text=${encodeURIComponent(debouncedLocQuery)}`);
```

**Line 683**: Backend Call/Async Logic
```typescript
            const data = await res.json();
```
→ **Type**: Async Operation

**Line 683**: Component/Function Definition
```typescript
            const data = await res.json();
```

**Line 699**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 704**: State Management
```typescript
  const [isLocating, setIsLocating] = useState(false);
```

**Line 704**: Hook Usage
```typescript
  const [isLocating, setIsLocating] = useState(false);
```
→ **Hook**: useState(

**Line 705**: State Management
```typescript
  const [hidden, setHidden] = useState(false);
```

**Line 705**: Hook Usage
```typescript
  const [hidden, setHidden] = useState(false);
```
→ **Hook**: useState(

**Line 706**: Hook Usage
```typescript
  const lastScrollY = useRef(0);
```
→ **Hook**: useRef(

**Line 706**: Component/Function Definition
```typescript
  const lastScrollY = useRef(0);
```

**Line 707**: Component/Function Definition
```typescript
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
```

**Line 709**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 710**: Component/Function Definition
```typescript
    const handleScroll = () => {
```

**Line 711**: Component/Function Definition
```typescript
      const currentY = window.scrollY;
```

**Line 733**: State Management
```typescript
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
```

**Line 733**: Hook Usage
```typescript
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
```
→ **Hook**: useState(

**Line 734**: State Management
```typescript
  const [isTyping, setIsTyping] = useState(true);
```

**Line 734**: Hook Usage
```typescript
  const [isTyping, setIsTyping] = useState(true);
```
→ **Hook**: useState(

**Line 735**: State Management
```typescript
  const [displayText, setDisplayText] = useState('');
```

**Line 735**: Hook Usage
```typescript
  const [displayText, setDisplayText] = useState('');
```
→ **Hook**: useState(

**Line 737**: Component/Function Definition
```typescript
  const typingSpeed = 100;
```

**Line 738**: Component/Function Definition
```typescript
  const pauseDuration = 5000;
```

**Line 740**: Component/Function Definition
```typescript
  const searchSuggestions = [
```

**Line 752**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 754**: Component/Function Definition
```typescript
    const currentSuggestion = searchSuggestions[placeholderIndex];
```

**Line 778**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 779**: Component/Function Definition
```typescript
    const supabase = createClient();
```

**Line 780**: Backend Call/Async Logic
```typescript
    const fetchUserData = async (userId: string) => {
```
→ **Type**: Async Operation

**Line 780**: Component/Function Definition
```typescript
    const fetchUserData = async (userId: string) => {
```

**Line 842**: Component/Function Definition
```typescript
  const handleVoiceSearch = () => {
```

**Line 858**: Component/Function Definition
```typescript
  const handleNearMe = () => {
```

**Line 865**: Backend Call/Async Logic
```typescript
      async (pos) => {
```
→ **Type**: Async Operation

**Line 868**: Backend Call/Async Logic
```typescript
          const res = await fetch(
```
→ **Type**: Async Operation

**Line 868**: API Route
```typescript
          const res = await fetch(
```
→ **Type**: API Call

**Line 868**: Component/Function Definition
```typescript
          const res = await fetch(
```

**Line 872**: Backend Call/Async Logic
```typescript
          const data = await res.json();
```
→ **Type**: Async Operation

**Line 872**: Component/Function Definition
```typescript
          const data = await res.json();
```

**Line 873**: Component/Function Definition
```typescript
          const city =
```

**Line 893**: Component/Function Definition
```typescript
  const handleSearch = (e: React.FormEvent) => {
```

**Line 895**: Component/Function Definition
```typescript
    const params = new URLSearchParams();
```

**Line 903**: Component/Function Definition
```typescript
  const handleImageSearch = (query: string, imageUrl?: string) => {
```

**Line 904**: Component/Function Definition
```typescript
    const params = new URLSearchParams();
```

**Line 910**: Backend Call/Async Logic
```typescript
  const handleSignOut = async () => {
```
→ **Type**: Async Operation

**Line 910**: Component/Function Definition
```typescript
  const handleSignOut = async () => {
```

**Line 911**: Component/Function Definition
```typescript
    const supabase = createClient();
```

**Line 912**: Backend Call/Async Logic
```typescript
    await supabase.auth.signOut();
```
→ **Type**: Async Operation

**Line 913**: Backend Call/Async Logic
```typescript
    await fetch('/api/auth/logout', { method: 'POST' });
```
→ **Type**: Async Operation

**Line 913**: API Route
```typescript
    await fetch('/api/auth/logout', { method: 'POST' });
```
→ **Type**: API Call

**Line 999**: Component/Function Definition
```typescript
                                  const sId = res.metadata?.store_id || res.store_id;
```

**Line 1080**: Component/Function Definition
```typescript
                            const name = feat.properties.city || feat.properties.name || feat.properties.county;
```

**Line 1081**: Component/Function Definition
```typescript
                            const state = feat.properties.state;
```

**Line 1083**: Component/Function Definition
```typescript
                            const fullAddr = `${name}${state ? `, ${state}` : ''}`;
```

**Line 1134**: Component/Function Definition
```typescript
                    const effectiveRole = userRole?.toLowerCase() || user.user_metadata?.role?.toLowerCase();
```

**Line 1232**: Component/Function Definition
```typescript
                      const currentRole = userRole?.toLowerCase() || user.user_metadata?.role?.toLowerCase();
```

**Line 1290**: Component/Function Definition
```typescript
              const Icon = cat.icon;
```

**Line 1292**: Component/Function Definition
```typescript
              const params = new URLSearchParams(query);
```

**Line 1295**: Component/Function Definition
```typescript
              const combinedHref = `${path}?${params.toString()}`;
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/NavbarWriteReviewButton.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState, useEffect } from 'react'
```
**Line 4**: Import Backend Logic
```typescript
import { Star, Loader2 } from 'lucide-react'
```
**Line 5**: Import Backend Logic
```typescript
import { ReviewModal } from './ReviewModal'
```
**Line 6**: Import Backend Logic
```typescript
import { createClient } from '@/lib/supabase/client'
```
→ **Backend**: @/lib/supabase/client

**Line 14**: Component/Function Definition
```typescript
export function NavbarWriteReviewButton() {
```

**Line 15**: State Management
```typescript
    const [isModalOpen, setIsModalOpen] = useState(false)
```

**Line 15**: Hook Usage
```typescript
    const [isModalOpen, setIsModalOpen] = useState(false)
```
→ **Hook**: useState(

**Line 18**: State Management
```typescript
    const [loading, setLoading] = useState(true)
```

**Line 18**: Hook Usage
```typescript
    const [loading, setLoading] = useState(true)
```
→ **Hook**: useState(

**Line 21**: Hook Usage
```typescript
    useEffect(() => {
```
→ **Hook**: useEffect(

**Line 22**: Backend Call/Async Logic
```typescript
        const fetchUserAndLastStore = async () => {
```
→ **Type**: Async Operation

**Line 22**: Component/Function Definition
```typescript
        const fetchUserAndLastStore = async () => {
```

**Line 24**: Component/Function Definition
```typescript
                const supabase = createClient()
```

**Line 25**: Backend Call/Async Logic
```typescript
                const { data: { user } } = await supabase.auth.getUser()
```
→ **Type**: Async Operation

**Line 33**: Component/Function Definition
```typescript
                const role = user.user_metadata?.role || user.user_metadata?.user_type
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/Offers.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState, useEffect } from "react";
```
**Line 4**: Import Backend Logic
```typescript
import { OfferCarousel, type Offer } from "@/components/ui/offer-carousel-products";
```
**Line 5**: Import Backend Logic
```typescript
import { hasUserInteractions } from "@/lib/actions/user-activity";
```
→ **Backend**: @/lib/actions/user-activity

**Line 6**: Import Backend Logic
```typescript
import { getLatestItems } from "@/lib/actions/items";
```
→ **Backend**: @/lib/actions/items

**Line 8**: Hook Usage
```typescript
export default function OfferCarouselDemo() {
```
→ **Hook**: uselDemo(

**Line 8**: Component/Function Definition
```typescript
export default function OfferCarouselDemo() {
```

**Line 9**: State Management
```typescript
  const [hasInteractions, setHasInteractions] = useState(false);
```

**Line 9**: Hook Usage
```typescript
  const [hasInteractions, setHasInteractions] = useState(false);
```
→ **Hook**: useState(

**Line 11**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(true);
```

**Line 11**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(true);
```
→ **Hook**: useState(

**Line 14**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 20**: Backend Call/Async Logic
```typescript
        const [interactions, items] = await Promise.all([
```
→ **Type**: Async Operation

**Line 56**: Component/Function Definition
```typescript
  const title = hasInteractions 
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/OffersCarouselDemoBusiness.tsx

**Line 3**: Import Backend Logic
```typescript
import * as React from "react";
```
**Line 4**: Import Backend Logic
```typescript
import { useEffect, useState } from "react";
```
**Line 5**: Import Backend Logic
```typescript
import { Gift } from "lucide-react";
```
**Line 6**: Import Backend Logic
```typescript
import { OffersCarousel, type CarouselItem } from "@/components/ui/offers-carousel-business";
```
**Line 7**: Import Backend Logic
```typescript
import { getAllActivePromotions } from "@/lib/actions/promotions";
```
→ **Backend**: @/lib/actions/promotions

**Line 9**: Component/Function Definition
```typescript
const OffersCarouselDemo = () => {
```

**Line 11**: State Management
```typescript
  const [isLoading, setIsLoading] = useState(true);
```

**Line 11**: Hook Usage
```typescript
  const [isLoading, setIsLoading] = useState(true);
```
→ **Hook**: useState(

**Line 14**: Hook Usage
```typescript
  useEffect(() => {
```
→ **Hook**: useEffect(

**Line 18**: Backend Call/Async Logic
```typescript
        const promotions = await getAllActivePromotions(5);
```
→ **Type**: Async Operation

**Line 18**: Component/Function Definition
```typescript
        const promotions = await getAllActivePromotions(5);
```

**Line 22**: Component/Function Definition
```typescript
          const originalPrice = promo.originale_price || 100;
```

**Line 23**: Component/Function Definition
```typescript
          const discountedPrice = promo.new_price || (originalPrice * (1 - (promo.discount_percent || 10) / 100));
```

**Line 24**: Component/Function Definition
```typescript
          const discountPercent = promo.discount_percent || Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/ProductCard.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { Item } from '@/lib/actions/items';
```
→ **Backend**: @/lib/actions/items

**Line 5**: Import Backend Logic
```typescript
import { Star, Package, ShoppingCart, Scale, Heart, Zap, Calendar, ShoppingBag } from 'lucide-react';
```
**Line 6**: Import Backend Logic
```typescript
import { useActionDrawer } from '@/hooks/useActionDrawer';
```
**Line 7**: Import Backend Logic
```typescript
import { useCartStore } from '@/lib/store/use-cart-store';
```
→ **Backend**: @/lib/store/use-cart-store

**Line 8**: Import Backend Logic
```typescript
import { useTracking } from '@/hooks/useTracking';
```
**Line 48**: Component/Function Definition
```typescript
function Stars({ n }: { n: number }) {
```

**Line 61**: Component/Function Definition
```typescript
export function ProductCard({ item, businessName, compared, promotion, onCompare, onViewDetails, onBuy, hideBuyButton, isOwner = false }: ProductCardProps) {
```

**Line 62**: Hook Usage
```typescript
    const { openDrawer } = useActionDrawer();
```
→ **Hook**: useActionDrawer(

**Line 63**: State Management
```typescript
    const [isWished, setIsWished] = useState(false);
```

**Line 63**: Hook Usage
```typescript
    const [isWished, setIsWished] = useState(false);
```
→ **Hook**: useState(

**Line 64**: Hook Usage
```typescript
    const addItem = useCartStore((state) => state.addItem);
```
→ **Hook**: useCartStore(

**Line 64**: Component/Function Definition
```typescript
    const addItem = useCartStore((state) => state.addItem);
```

**Line 65**: Hook Usage
```typescript
    const { trackLike, trackUnlike, trackClick, trackBookingStart } = useTracking();
```
→ **Hook**: useTracking(

**Line 67**: Component/Function Definition
```typescript
    const bName = businessName || (item as any).stores?.name || 'Commerce';
```

**Line 68**: Component/Function Definition
```typescript
    const merchantId = item.store_id?.toString();
```

**Line 70**: Component/Function Definition
```typescript
    const handleAddToCart = (e: React.MouseEvent) => {
```

**Line 72**: Component/Function Definition
```typescript
        const bName = businessName || (item as any).stores?.name || 'Commerce';
```

**Line 73**: Component/Function Definition
```typescript
        const hasDiscount = !!promotion?.discount_percent;
```

**Line 74**: Component/Function Definition
```typescript
        const discountedPrice = hasDiscount
```

**Line 94**: Component/Function Definition
```typescript
    const handleOpenBuy = () => {
```

**Line 101**: Component/Function Definition
```typescript
            const commandSidebar = document.getElementById('command-sidebar');
```

**Line 115**: Component/Function Definition
```typescript
    const typeKey = item.item_type === 'SERVICE' ? 'services' : 'other';
```

**Line 116**: Component/Function Definition
```typescript
    const style = categoryStyles[typeKey] || categoryStyles.other;
```

**Line 118**: Component/Function Definition
```typescript
    const hasDiscount = !!promotion?.discount_percent;
```

**Line 119**: Component/Function Definition
```typescript
    const discountedPrice = hasDiscount
```

**Line 154**: Component/Function Definition
```typescript
                        const nowWished = !isWished;
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/ProductOrderCard.tsx

**Line 3**: Import Backend Logic
```typescript
import { useState } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { Phone, ShoppingCart, CheckCircle, Shield, AlertCircle, Package, Minus, Plus, BadgeCheck } from 'lucide-react';
```
**Line 5**: Import Backend Logic
```typescript
import { useActionDrawer } from '@/hooks/useActionDrawer';
```
**Line 6**: Import Backend Logic
```typescript
import Link from 'next/link';
```
**Line 34**: Component/Function Definition
```typescript
export default function ProductOrderCard({
```

**Line 38**: Hook Usage
```typescript
  const { openDrawer } = useActionDrawer();
```
→ **Hook**: useActionDrawer(

**Line 39**: State Management
```typescript
  const [quantity,  setQuantity]  = useState(1);
```

**Line 39**: Hook Usage
```typescript
  const [quantity,  setQuantity]  = useState(1);
```
→ **Hook**: useState(

**Line 41**: Component/Function Definition
```typescript
  const isAvailable    = status === 'AVAILABLE';
```

**Line 42**: Component/Function Definition
```typescript
  const isOnDemand     = status === 'ON_DEMAND';
```

**Line 43**: Component/Function Definition
```typescript
  const canOrder       = isAvailable || isOnDemand;
```

**Line 44**: Component/Function Definition
```typescript
  const statusInfo     = STATUS_LABELS[status] ?? STATUS_LABELS.AVAILABLE;
```

**Line 45**: Component/Function Definition
```typescript
  const totalPrice     = (price * quantity).toFixed(3);
```

**Line 47**: Component/Function Definition
```typescript
  const handleCommandClick = () => {
```

**Line 49**: Component/Function Definition
```typescript
    const item = {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/PromotionBanner.tsx

**Line 3**: Import Backend Logic
```typescript
import React from 'react'
```
**Line 4**: Import Backend Logic
```typescript
import { Zap, Timer, X } from 'lucide-react'
```
**Line 5**: Import Backend Logic
```typescript
import { motion, AnimatePresence } from 'framer-motion'
```
**Line 19**: Component/Function Definition
```typescript
export default function PromotionBanner({ promotions }: PromotionBannerProps) {
```

**Line 20**: State Management
```typescript
    const [isVisible, setIsVisible] = React.useState(true)
```

**Line 20**: Hook Usage
```typescript
    const [isVisible, setIsVisible] = React.useState(true)
```
→ **Hook**: useState(

**Line 25**: Component/Function Definition
```typescript
    const promo = promotions[0]
```

**Line 26**: Component/Function Definition
```typescript
    const daysLeft = Math.ceil((new Date(promo.valid_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/ReviewModal.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState } from 'react'
```
**Line 12**: Import Backend Logic
```typescript
import { Button } from '@/components/ui/button'
```
**Line 13**: Import Backend Logic
```typescript
import { Textarea } from '@/components/ui/textarea'
```
**Line 14**: Import Backend Logic
```typescript
import { Label } from '@/components/ui/label'
```
**Line 15**: Import Backend Logic
```typescript
import { Star, Loader2 } from 'lucide-react'
```
**Line 16**: Import Backend Logic
```typescript
import { toast } from 'sonner'
```
**Line 17**: Import Backend Logic
```typescript
import { submitReview } from '@/lib/actions/reviews'
```
→ **Backend**: @/lib/actions/reviews

**Line 28**: Component/Function Definition
```typescript
export function ReviewModal({ isOpen, onClose, businessName, storeId, businessId, itemId }: ReviewModalProps) {
```

**Line 29**: State Management
```typescript
    const [rating, setRating] = useState(0)
```

**Line 29**: Hook Usage
```typescript
    const [rating, setRating] = useState(0)
```
→ **Hook**: useState(

**Line 30**: State Management
```typescript
    const [hover, setHover] = useState(0)
```

**Line 30**: Hook Usage
```typescript
    const [hover, setHover] = useState(0)
```
→ **Hook**: useState(

**Line 31**: State Management
```typescript
    const [comment, setComment] = useState('')
```

**Line 31**: Hook Usage
```typescript
    const [comment, setComment] = useState('')
```
→ **Hook**: useState(

**Line 32**: State Management
```typescript
    const [isSubmitting, setIsSubmitting] = useState(false)
```

**Line 32**: Hook Usage
```typescript
    const [isSubmitting, setIsSubmitting] = useState(false)
```
→ **Hook**: useState(

**Line 34**: Backend Call/Async Logic
```typescript
    const handleSubmit = async () => {
```
→ **Type**: Async Operation

**Line 34**: Component/Function Definition
```typescript
    const handleSubmit = async () => {
```

**Line 46**: Backend Call/Async Logic
```typescript
            const result = await submitReview({
```
→ **Type**: Async Operation

**Line 46**: Component/Function Definition
```typescript
            const result = await submitReview({
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/ServiceBookingCard.tsx

**Line 3**: Import Backend Logic
```typescript
import { Phone, Clock, Shield, AlertCircle, MessageCircle } from 'lucide-react';
```
**Line 4**: Import Backend Logic
```typescript
import Link from 'next/link';
```
**Line 5**: Import Backend Logic
```typescript
import { useActionDrawer } from '@/hooks/useActionDrawer';
```
**Line 30**: Component/Function Definition
```typescript
export default function ServiceBookingCard({
```

**Line 45**: Hook Usage
```typescript
  const { openDrawer } = useActionDrawer();
```
→ **Hook**: useActionDrawer(

**Line 47**: Component/Function Definition
```typescript
  const handleReservationClick = () => {
```


## 📄 c:/Users/INFOKOM/Desktop/private-PFE-repos/components/ServiceCard.tsx

**Line 3**: Import Backend Logic
```typescript
import React, { useState } from 'react';
```
**Line 4**: Import Backend Logic
```typescript
import { Item } from '@/lib/actions/items';
```
→ **Backend**: @/lib/actions/items

**Line 5**: Import Backend Logic
```typescript
import { Star, Calendar, Clock, Award, ShieldCheck, Heart, ArrowRight, Zap, Package, ShoppingCart, Scale, ShoppingBag } from 'lucide-react';
```
**Line 6**: Import Backend Logic
```typescript
import { useActionDrawer } from '@/hooks/useActionDrawer';
```
**Line 7**: Import Backend Logic
```typescript
import { useCartStore } from '@/lib/store/use-cart-store';
```
→ **Backend**: @/lib/store/use-cart-store

**Line 22**: Component/Function Definition
```typescript
function Stars({ n }: { n: number }) {
```

**Line 35**: Component/Function Definition
```typescript
export function ServiceCard({ item, businessName, promotion, onBook, onViewDetails, hideBooking, hidePricing }: ServiceCardProps) {
```

**Line 36**: Hook Usage
```typescript
    const { openDrawer } = useActionDrawer();
```
→ **Hook**: useActionDrawer(

**Line 37**: Hook Usage
```typescript
    const addItem = useCartStore((state) => state.addItem);
```
→ **Hook**: useCartStore(

**Line 37**: Component/Function Definition
```typescript
    const addItem = useCartStore((state) => state.addItem);
```

**Line 38**: State Management
```typescript
    const [isWished, setIsWished] = useState(false);
```

**Line 38**: Hook Usage
```typescript
    const [isWished, setIsWished] = useState(false);
```
→ **Hook**: useState(

**Line 40**: Component/Function Definition
```typescript
    const bName = businessName || (item as any).stores?.name || item.name;
```

**Line 42**: Component/Function Definition
```typescript
    const handleOpenBooking = () => {
```

**Line 47**: Component/Function Definition
```typescript
            const reservationSidebar = document.getElementById('reservation-sidebar');
```

**Line 54**: Component/Function Definition
```typescript
                const itemData = item as any;
```

**Line 71**: Component/Function Definition
```typescript
    const hasDiscount = !!promotion?.discount_percent;
```

**Line 72**: Component/Function Definition
```typescript
    const price = item.price || 0;
```

**Line 73**: Component/Function Definition
```typescript
    const discountedPrice = hasDiscount
```

**Line 77**: Component/Function Definition
```typescript
    const handleAddToCart = (e: React.MouseEvent) => {
```

