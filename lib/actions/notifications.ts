'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface Notification {
  id: number
  user_id: string
  type: 'ORDER_CREATED' | 'ORDER_VALIDATED' | 'ORDER_COMPLETED' | 'ORDER_CANCELLED' | 'BOOKING_CREATED' | 'BOOKING_CONFIRMED' | 'BOOKING_CANCELLED' | 'REVIEW_RECEIVED'
  title: string
  message: string
  data?: {
    order_id?: number
    booking_id?: number
    business_name?: string
    amount?: number
    [key: string]: any
  }
  is_read: boolean
  read_at?: string
  created_at: string
}

// ─── Create Notification ────────────────────────────────────────────────────
export async function createNotification(
  userId: string,
  type: Notification['type'],
  title: string,
  message: string,
  data?: Notification['data']
) {
  const supabase = createClient()

  const { data: notification, error } = await (supabase
    .from('notifications') as any)
    .insert([
      {
        user_id: userId,
        type,
        title,
        message,
        data,
        is_read: false,
      }
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating notification:', error)
    throw error
  }

  revalidatePath('/profile/notifications')
  return notification
}

// ─── Get User Notifications ────────────────────────────────────────────────
export async function getUserNotifications(userId: string, limit = 50) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching notifications:', error)
    return []
  }

  return data || []
}

// ─── Get Unread Count ──────────────────────────────────────────────────────
export async function getUnreadNotificationCount(userId: string) {
  const supabase = createClient()

  const { data, error, count } = await supabase
    .from('notifications')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .eq('is_read', false)

  if (error) {
    console.error('Error fetching unread count:', error)
    return 0
  }

  return count || 0
}

// ─── Mark as Read ──────────────────────────────────────────────────────────
export async function markNotificationAsRead(notificationId: number) {
  const supabase = createClient()

  const { data: notification, error } = await (supabase
    .from('notifications') as any)
    .update({
      is_read: true,
      read_at: new Date().toISOString(),
    })
    .eq('id', notificationId)
    .select()
    .single()

  if (error) {
    console.error('Error marking notification as read:', error)
    throw error
  }

  revalidatePath('/profile/notifications')
  return notification
}

// ─── Mark All as Read ──────────────────────────────────────────────────────
export async function markAllNotificationsAsRead(userId: string) {
  const supabase = createClient()

  const { error } = await (supabase
    .from('notifications') as any)
    .update({
      is_read: true,
      read_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .eq('is_read', false)

  if (error) {
    console.error('Error marking all notifications as read:', error)
    throw error
  }

  revalidatePath('/profile/notifications')
}

// ─── Delete Notification ───────────────────────────────────────────────────
export async function deleteNotification(notificationId: number) {
  const supabase = createClient()

  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId)

  if (error) {
    console.error('Error deleting notification:', error)
    throw error
  }

  revalidatePath('/profile/notifications')
}

// ─── Notification Helpers (for Events) ──────────────────────────────────────

export async function notifyOrderCreated(
  customerId: string,
  businessOwnerId: string,
  orderNumber: string,
  businessName: string,
  amount: number
) {
  // Notify customer
  await createNotification(
    customerId,
    'ORDER_CREATED',
    'Commande créée',
    `Votre commande #${orderNumber} a été créée avec succès. En attente de validation du vendeur.`,
    {
      order_number: orderNumber,
      business_name: businessName,
      amount,
    }
  )

  // Notify business owner
  await createNotification(
    businessOwnerId,
    'ORDER_CREATED',
    'Nouvelle commande',
    `Vous avez reçu une nouvelle commande #${orderNumber} de ${amount} DT. Veuillez la valider.`,
    {
      order_number: orderNumber,
      amount,
    }
  )
}

export async function notifyOrderValidated(
  customerId: string,
  orderNumber: string,
  businessName: string,
  trackingCode: string
) {
  await createNotification(
    customerId,
    'ORDER_VALIDATED',
    'Commande validée',
    `Votre commande #${orderNumber} a été validée par ${businessName}. Code de suivi: ${trackingCode}`,
    {
      order_number: orderNumber,
      business_name: businessName,
      tracking_code: trackingCode,
    }
  )
}

export async function notifyOrderCompleted(
  customerId: string,
  orderNumber: string,
  businessName: string
) {
  await createNotification(
    customerId,
    'ORDER_COMPLETED',
    'Commande livrée',
    `Votre commande #${orderNumber} de ${businessName} a été livrée avec succès!`,
    {
      order_number: orderNumber,
      business_name: businessName,
    }
  )
}

export async function notifyOrderCancelled(
  customerId: string,
  orderNumber: string,
  reason?: string
) {
  await createNotification(
    customerId,
    'ORDER_CANCELLED',
    'Commande annulée',
    `Votre commande #${orderNumber} a été annulée. ${reason ? `Raison: ${reason}` : ''}`,
    {
      order_number: orderNumber,
      reason,
    }
  )
}

export async function notifyBookingCreated(
  customerId: string,
  businessOwnerId: string,
  bookingId: number,
  businessName: string,
  serviceName: string
) {
  // Notify customer
  await createNotification(
    customerId,
    'BOOKING_CREATED',
    'Réservation créée',
    `Votre réservation pour le service "${serviceName}" chez ${businessName} a été créée. En attente de confirmation.`,
    {
      booking_id: bookingId,
      business_name: businessName,
      service_name: serviceName,
    }
  )

  // Notify business owner
  await createNotification(
    businessOwnerId,
    'BOOKING_CREATED',
    'Nouvelle réservation',
    `Vous avez reçu une nouvelle réservation pour "${serviceName}". Veuillez la confirmer.`,
    {
      booking_id: bookingId,
      service_name: serviceName,
    }
  )
}

export async function notifyBookingConfirmed(
  customerId: string,
  businessName: string,
  serviceName: string,
  date: string,
  time: string
) {
  await createNotification(
    customerId,
    'BOOKING_CONFIRMED',
    'Réservation confirmée',
    `Votre réservation pour "${serviceName}" chez ${businessName} est confirmée. Date: ${date} à ${time}`,
    {
      business_name: businessName,
      service_name: serviceName,
      date,
      time,
    }
  )
}
