'use server'

import { createClient } from '@/lib/supabase/server'

export type Transaction = {
  id: string;
  type: 'order' | 'booking';
  reference: string;
  customer_name: string;
  amount: number;
  status: string;
  created_at: string;
  details?: string;
  is_business_owner?: boolean;
};

export async function getStoreTransactions(storeId: number): Promise<Transaction[]> {
  const supabase = createClient();

  // 1. Fetch Orders (Products)
  const { data: ordersData, error: ordersError } = await supabase
    .from('orders')
    .select('id, order_number, customer_name, customer_id, total_price, status, created_at')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });

  const orders = ordersData as any[] | null;

  if (ordersError) {
    console.error('Error fetching orders:', ordersError);
  }

  // 2. Fetch Bookings (Services)
  const { data: bookingsData, error: bookingsError } = await supabase
    .from('bookings')
    .select('id, booking_number, customer_name, customer_id, price, status, created_at')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false });

  const bookings = bookingsData as any[] | null;

  if (bookingsError) {
    console.error('Error fetching bookings:', bookingsError);
  }

  // 2.5 Determine if customers are business owners
  const customerIds = Array.from(new Set([
    ...(orders || []).map(o => o.customer_id),
    ...(bookings || []).map(b => b.customer_id)
  ].filter(Boolean)));

  const businessOwnerIds = new Set<string>();
  if (customerIds.length > 0) {
    const { data: storesRaw } = await supabase
      .from('stores')
      .select('owner_id')
      .in('owner_id', customerIds);
    const storesObj = storesRaw as any[] | null;
    if (storesObj) {
      storesObj.forEach(s => {
        if (s.owner_id) businessOwnerIds.add(s.owner_id);
      });
    }
  }

  // 3. Format and Merge
  const formattedOrders = (orders || []).map(o => ({
    id: `ORD-${o.id}`,
    type: 'order' as const,
    reference: o.order_number,
    customer_name: o.customer_name,
    amount: o.total_price,
    status: o.status.toLowerCase(),
    created_at: o.created_at || new Date().toISOString(),
    details: 'Vente de produit(s)',
    is_business_owner: o.customer_id ? businessOwnerIds.has(o.customer_id) : false,
  }));

  const formattedBookings = (bookings || []).map(b => ({
    id: `BOK-${b.id}`,
    type: 'booking' as const,
    reference: b.booking_number,
    customer_name: b.customer_name,
    amount: b.price,
    status: b.status.toLowerCase(),
    created_at: b.created_at || new Date().toISOString(),
    details: 'Réservation de service',
    is_business_owner: b.customer_id ? businessOwnerIds.has(b.customer_id) : false,
  }));

  // 4. Sort by Date
  return [...formattedOrders, ...formattedBookings].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export type PersonalTransaction = {
  id: string;
  type: 'order' | 'booking';
  reference: string;
  store_name: string;
  amount: number;
  status: string;
  created_at: string;
  details?: string;
};

export async function getOwnerPersonalTransactions(userId: string): Promise<PersonalTransaction[]> {
  const supabase = createClient();

  const [{ data: ordersRaw }, { data: bookingsRaw }] = await Promise.all([
    supabase
      .from('orders')
      .select('id, order_number, total_price, status, created_at, store_id')
      .eq('customer_id', userId)
      .order('created_at', { ascending: false }),
    supabase
      .from('bookings')
      .select('id, booking_number, price, status, created_at, store_id')
      .eq('customer_id', userId)
      .order('created_at', { ascending: false }),
  ]);

  const orders = ordersRaw as any[] | null;
  const bookings = bookingsRaw as any[] | null;

  // Gather store IDs to fetch store names
  const storeIds = Array.from(new Set([
    ...(orders || []).map(o => o.store_id),
    ...(bookings || []).map(b => b.store_id),
  ].filter(Boolean)));

  const storeNameMap: Record<number, string> = {};
  if (storeIds.length > 0) {
    const { data: storesRaw } = await supabase
      .from('stores')
      .select('id, name')
      .in('id', storeIds);
    const stores = storesRaw as any[] | null;
    if (stores) {
      stores.forEach(s => { storeNameMap[s.id] = s.name; });
    }
  }

  const formattedOrders: PersonalTransaction[] = (orders || []).map(o => ({
    id: `ORD-${o.id}`,
    type: 'order',
    reference: o.order_number,
    store_name: storeNameMap[o.store_id] || 'Boutique inconnue',
    amount: o.total_price,
    status: o.status.toLowerCase(),
    created_at: o.created_at || new Date().toISOString(),
    details: 'Commande produit',
  }));

  const formattedBookings: PersonalTransaction[] = (bookings || []).map(b => ({
    id: `BOK-${b.id}`,
    type: 'booking',
    reference: b.booking_number,
    store_name: storeNameMap[b.store_id] || 'Boutique inconnue',
    amount: b.price,
    status: b.status.toLowerCase(),
    created_at: b.created_at || new Date().toISOString(),
    details: 'Réservation service',
  }));

  return [...formattedOrders, ...formattedBookings].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getFinancialSummary(storeId: number) {
  const supabase = createClient();

  const [ordersResponse, bookingsResponse] = await Promise.all([
    supabase.from('orders').select('total_price').eq('store_id', storeId).eq('status', 'COMPLETED'),
    supabase.from('bookings').select('price').eq('store_id', storeId).eq('status', 'COMPLETED'),
  ]);

  const ordersData = ordersResponse.data as any[] | null;
  const bookingsData = bookingsResponse.data as any[] | null;

  const totalOrders = (ordersData || []).reduce((sum, o) => sum + o.total_price, 0);
  const totalBookings = (bookingsData || []).reduce((sum, b) => sum + b.price, 0);

  return {
    totalRevenue: totalOrders + totalBookings,
    ordersRevenue: totalOrders,
    bookingsRevenue: totalBookings,
    totalTransactions: (ordersData?.length || 0) + (bookingsData?.length || 0),
  };
}
