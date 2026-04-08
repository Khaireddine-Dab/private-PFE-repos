'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Bell, CheckCircle2, Clock, AlertCircle, Trash2, MailOpen,
  ShoppingBag, Calendar, Star, ChevronRight, Archive
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getUserNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification, getUnreadNotificationCount } from '@/lib/actions/notifications'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface Notification {
  id: number
  user_id: string
  type: string
  title: string
  message: string
  data?: any
  is_read: boolean
  read_at?: string
  created_at: string
}

const notificationIcons: Record<string, React.ComponentType<any>> = {
  'ORDER_CREATED': ShoppingBag,
  'ORDER_VALIDATED': CheckCircle2,
  'ORDER_COMPLETED': CheckCircle2,
  'ORDER_CANCELLED': AlertCircle,
  'BOOKING_CREATED': Calendar,
  'BOOKING_CONFIRMED': CheckCircle2,
  'BOOKING_CANCELLED': AlertCircle,
  'REVIEW_RECEIVED': Star,
}

const notificationColors: Record<string, string> = {
  'ORDER_CREATED': 'bg-blue-50 border-blue-200 text-blue-700',
  'ORDER_VALIDATED': 'bg-emerald-50 border-emerald-200 text-emerald-700',
  'ORDER_COMPLETED': 'bg-green-50 border-green-200 text-green-700',
  'ORDER_CANCELLED': 'bg-red-50 border-red-200 text-red-700',
  'BOOKING_CREATED': 'bg-purple-50 border-purple-200 text-purple-700',
  'BOOKING_CONFIRMED': 'bg-emerald-50 border-emerald-200 text-emerald-700',
  'BOOKING_CANCELLED': 'bg-amber-50 border-amber-200 text-amber-700',
  'REVIEW_RECEIVED': 'bg-yellow-50 border-yellow-200 text-yellow-700',
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) return `${Math.floor(interval)} ans`
  interval = seconds / 2592000
  if (interval > 1) return `${Math.floor(interval)} mois`
  interval = seconds / 86400
  if (interval > 1) return `${Math.floor(interval)}j`
  interval = seconds / 3600
  if (interval > 1) return `${Math.floor(interval)}h`
  interval = seconds / 60
  if (interval > 1) return `${Math.floor(interval)}min`
  return 'À l\'instant'
}

export default function NotificationsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  useEffect(() => {
    const initUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user: userData } } = await supabase.auth.getUser()
        
        if (!userData) {
          router.push('/login')
          return
        }
        
        setUser(userData)
        await loadNotifications(userData.id)
      } catch (error) {
        console.error('Error initializing user:', error)
        router.push('/login')
      }
    }

    initUser()
  }, [router])

  useEffect(() => {
    if (user) {
      loadNotifications(user.id)
    }
  }, [user, filter])

  const loadNotifications = async (userId: string) => {
    if (!userId) return
    try {
      setLoading(true)
      const data = await getUserNotifications(userId)
      
      // Filter notifications
      const filtered = data.filter((n: Notification) => {
        if (filter === 'unread') return !n.is_read
        if (filter === 'read') return n.is_read
        return true
      })
      
      setNotifications(filtered)
      
      const unread = await getUnreadNotificationCount(userId)
      setUnreadCount(unread)
    } catch (error) {
      console.error('Error loading notifications:', error)
      toast.error('Erreur lors du chargement des notifications')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markNotificationAsRead(notificationId)
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      )
      setUnreadCount(Math.max(0, unreadCount - 1))
      toast.success('Notification marquée comme lue')
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const handleMarkAllAsRead = async () => {
    if (!user) return
    try {
      await markAllNotificationsAsRead(user.id)
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
      setUnreadCount(0)
      toast.success('Toutes les notifications marquées comme lues')
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const handleDelete = async (notificationId: number) => {
    try {
      await deleteNotification(notificationId)
      setNotifications(prev => prev.filter(n => n.id !== notificationId))
      toast.success('Notification supprimée')
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    }
  }

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.is_read
    if (filter === 'read') return n.is_read
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-600">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900">Notifications</h1>
                <p className="text-gray-500 text-sm mt-1">
                  {unreadCount > 0 ? `${unreadCount} non lue(s)` : 'Aucune notification non lue'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllAsRead}
                variant="outline"
                className="gap-2"
              >
                <MailOpen className="w-4 h-4" />
                Marquer tout comme lu
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'unread', 'read'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  filter === f
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'
                }`}
              >
                {f === 'all' ? 'Tous' : f === 'unread' ? 'Non lues' : 'Lues'}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <Bell className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">
              {filter === 'all' ? 'Aucune notification' : `Aucune notification ${filter === 'unread' ? 'non lue' : 'lue'}`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map(notification => {
              const IconComponent = notificationIcons[notification.type] || Bell
              const colorClass = notificationColors[notification.type] || 'bg-gray-50 border-gray-200 text-gray-700'

              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl border ${notification.is_read ? 'border-gray-200' : 'border-indigo-200 bg-indigo-50/30'} p-4 transition-all hover:shadow-md`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Icon */}
                      <div className={`flex-shrink-0 p-2.5 rounded-lg ${colorClass}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-gray-900">
                            {notification.title}
                          </h3>
                          {!notification.is_read && (
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-600 mt-1.5" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {notification.message}
                        </p>

                        {/* Data Tags */}
                        {notification.data && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {notification.data.order_number && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                                <ShoppingBag className="w-3 h-3" />
                                #{notification.data.order_number}
                              </span>
                            )}
                            {notification.data.business_name && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                                {notification.data.business_name}
                              </span>
                            )}
                            {notification.data.amount && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold">
                                {notification.data.amount} DT
                              </span>
                            )}
                          </div>
                        )}

                        {/* Time */}
                        <div className="text-xs text-gray-400">
                          {timeAgo(notification.created_at)}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notification.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                          title="Marquer comme lue"
                        >
                          <MailOpen className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-500 hover:text-red-600"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
