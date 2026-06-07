'use client'

import React, { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { ReviewModal } from './ReviewModal'
import { createClient } from '@/lib/supabase/client'
// We removed the toast explicitly since it's no longer disabled

interface WriteReviewButtonProps {
    businessName: string
    storeId: number | undefined | null
    businessId?: string
    itemId?: number
    isOwner?: boolean
}

export function WriteReviewButton({ businessName, storeId, businessId, itemId, isOwner = false }: WriteReviewButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [hasLatestPurchase, setHasLatestPurchase] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUserAndPurchase = async () => {
            try {
                const supabase = createClient()
                const { data: { user } } = await supabase.auth.getUser()
                
                if (!user) {
                    setLoading(false)
                    return
                }

                // Get user role from metadata or database
                const role = user.user_metadata?.role || user.user_metadata?.user_type
                setUserRole(role)

                // Check if user has made the latest purchase/booking for this item/service
                const userId = user.id

                // Check Orders for products
                if (itemId) {
                    const { data: latestOrder, error: orderError } = await supabase
                        .from('orders')
                        .select('id, created_at')
                        .eq('customer_id', userId)
                        .eq('item_id', itemId)
                        .order('created_at', { ascending: false })
                        .limit(1)
                        .maybeSingle()

                    if (!orderError && latestOrder) {
                        setHasLatestPurchase(true)
                        setLoading(false)
                        return
                    }
                }

                // Check Bookings for services
                if (itemId) {
                    const { data: latestBooking, error: bookingError } = await supabase
                        .from('bookings')
                        .select('id, created_at')
                        .eq('customer_id', userId)
                        .eq('item_id', itemId)
                        .order('created_at', { ascending: false })
                        .limit(1)
                        .maybeSingle()

                    if (!bookingError && latestBooking) {
                        setHasLatestPurchase(true)
                        setLoading(false)
                        return
                    }
                }

                // Check for store-level orders if no itemId
                if (storeId && !itemId) {
                    const { data: latestStoreOrder, error: storeOrderError } = await supabase
                        .from('orders')
                        .select('id, created_at')
                        .eq('customer_id', userId)
                        .eq('store_id', storeId)
                        .order('created_at', { ascending: false })
                        .limit(1)
                        .maybeSingle()

                    if (!storeOrderError && latestStoreOrder) {
                        setHasLatestPurchase(true)
                    }
                }

            } catch (error) {
                console.error('Error checking user and purchase:', error)
            } finally {
                setLoading(false)
            }
        }

        checkUserAndPurchase()
    }, [itemId, storeId])

    // Hide button if not a CLIENT, if isOwner, or if no purchase
    if (isOwner || loading) return null
    if (userRole && userRole.toUpperCase() !== 'CLIENT') return null
    if (!hasLatestPurchase) return null

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
                <Star className="w-4 h-4" />
                Écrire un avis
            </button>

            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                businessName={businessName}
                storeId={storeId}
                businessId={businessId}
                itemId={itemId}
            />
        </>
    )
}
