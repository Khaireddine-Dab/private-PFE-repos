'use server';

import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';
import { revalidatePath } from 'next/cache';
import { notifyBookingCreated, notifyBookingConfirmed } from './notifications';

export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
export type BookingRow = Database['public']['Tables']['bookings']['Row'];

/**
 * Create a new booking
 */
export async function createBooking(data: Omit<BookingInsert, 'booking_number' | 'status' | 'customer_id'>) {
  const supabase = createClient();
  
  // Get current session
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('Vous devez être connecté pour réserver.');
  }

  // Fetch store info for notifications
  const { data: store, error: storeError } = await (supabase
    .from('stores') as any)
    .select('id, name, owner_id')
    .eq('id', data.store_id)
    .single();

  if (storeError || !store) {
    console.error('Error fetching store:', storeError);
    throw new Error('la boutique n\'a pas été trouvée');
  }

  // Fetch item/service name if item_id is provided
  let itemName = 'Service';
  if ((data as any).item_id) {
    const { data: item } = await (supabase
      .from('items') as any)
      .select('name')
      .eq('id', (data as any).item_id)
      .single();
    
    if (item) {
      itemName = item.name;
    }
  }

  // Generate a unique booking number: BK-XXXXXX-XXXX
  const bookingNumber = `BK-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const { data: booking, error } = await (supabase
    .from('bookings') as any)
    .insert({
      ...data,
      customer_id: user.id,
      booking_number: bookingNumber,
      status: 'PENDING',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    throw new Error(`Erreur lors de la réservation : ${error.message}`);
  }

  // Send notifications to customer and business owner
  try {
    await notifyBookingCreated(
      user.id,
      store.owner_id,
      booking.id,
      store.name,
      itemName
    );
  } catch (notifError) {
    console.error('Error sending booking notification:', notifError);
    // Don't fail the booking creation if notifications fail
  }

  revalidatePath(`/merchants/business/${data.store_id}`);
  return { success: true, booking };
}

/**
 * Get all bookings for a specific store/business
 */
export async function getBusinessBookings(storeId: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('store_id', storeId)
    .order('booking_date', { ascending: false });

  if (error) {
    console.error('Error fetching business bookings:', error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Get all bookings for a specific customer
 */
export async function getUserBookings(customerId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      stores (
        name,
        logo_url
      ),
      items (
        name,
        main_image
      )
    `)
    .eq('customer_id', customerId)
    .order('booking_date', { ascending: false });

  if (error) {
    console.error('Error fetching user bookings:', error);
    throw new Error(error.message);
  }

  return data as any[];
}

/**
 * Update the status of a booking
 */
export async function updateBookingStatus(
  bookingId: number, 
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
) {
  const supabase = createClient();

  const updateData: any = { status, updated_at: new Date().toISOString() };
  
  if (status === 'CONFIRMED') updateData.confirmed_at = new Date().toISOString();
  if (status === 'COMPLETED') updateData.completed_at = new Date().toISOString();

  const { data, error } = await (supabase
    .from('bookings') as any)
    .update({ 
      ...updateData,
      status: status
    })
    .eq('id', bookingId)
    .select(
      `
        *,
        stores (name),
        items (name)
      `
    )
    .single();

  if (error) {
    console.error('Error updating booking status:', error);
    throw new Error(error.message);
  }

  // Send notification when booking is confirmed
  if (status === 'CONFIRMED') {
    try {
      const storeName = (data as any).stores?.name || 'Boutique';
      const serviceName = (data as any).items?.name || 'Service';
      
      await notifyBookingConfirmed(
        data.customer_id,
        storeName,
        serviceName,
        data.booking_date,
        data.start_time
      );
    } catch (notifError) {
      console.error('Error sending booking confirmation notification:', notifError);
      // Don't fail the status update if notifications fail
    }
  }

  revalidatePath(`/dashboard/${data.store_id}/leads`);
  revalidatePath(`/profile/user`); // Also update customer view
  return data;
}

/**
 * Get all bookings for a specific store on a specific date
 */
export async function getStoreBookingsByDate(storeId: number, date: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('bookings')
    .select('start_time, end_time, status')
    .eq('store_id', storeId)
    .eq('booking_date', date)
    .neq('status', 'CANCELLED');

  if (error) {
    console.error('Error fetching bookings by date:', error);
    return [];
  }

  return data || [];
}
