'use client'

import React, { useState, useEffect } from 'react'
import { Star, Loader2 } from 'lucide-react'
import { ReviewModal } from './ReviewModal'
import { createClient } from '@/lib/supabase/client'

interface LatestStore {
    storeId: number
    storeName: string
    businessId?: string
}

export function NavbarWriteReviewButton() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [latestStore, setLatestStore] = useState<LatestStore | null>(null)
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserAndLastStore = async () => {
            try {
                const supabase = createClient()
                const { data: { user } } = await supabase.auth.getUser()
                
                if (!user) {
                    setLoading(false)
                    return
                }

                setUserId(user.id)
                const role = user.user_metadata?.role || user.user_metadata?.user_type
                setUserRole(role)

                // Get the latest order for this user
                const { data: latestOrder, error: orderError } = await supabase
                    .from('orders')
                    .select('store_id, id, created_at')
                    .eq('customer_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .maybeSingle()

                if (!orderError && latestOrder) {
                    // Get store details
                    const { data: store } = await supabase
                        .from('stores')
                        .select('id, name')
                        .eq('id', latestOrder.store_id)
                        .single()
                    
                    if (store) {
                        setLatestStore({
                            storeId: latestOrder.store_id,
                            storeName: store.name,
                        })
                        setLoading(false)
                        return
                    }
                }

                // Get the latest booking if no order found
                const { data: latestBooking, error: bookingError } = await supabase
                    .from('bookings')
                    .select('store_id, id, created_at')
                    .eq('customer_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .maybeSingle()

                if (!bookingError && latestBooking) {
                    // Get store details
                    const { data: store } = await supabase
                        .from('stores')
                        .select('id, name')
                        .eq('id', latestBooking.store_id)
                        .single()
                    
                    if (store) {
                        setLatestStore({
                            storeId: latestBooking.store_id,
                            storeName: store.name,
                        })
                    }
                }

            } catch (error) {
                console.error('Error fetching user and last store:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserAndLastStore()
    }, [])

    // Hide button if not logged in, not a CLIENT, or no purchase/booking
    if (loading) {
        return (
            <button disabled className="hidden sm:block text-sm px-4 py-2 text-white bg-[#11111198] rounded-xl backdrop-blur-sm transition opacity-50">
                <Loader2 className="w-4 h-4 animate-spin" />
            </button>
        )
    }

    if (!userRole || userRole.toUpperCase() !== 'CLIENT') return null
    if (!latestStore) return null

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="hidden sm:block text-sm px-4 py-2 text-white bg-[#11111198] hover:bg-[#111111d1] shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none rounded-xl backdrop-blur-sm transition"
            >
                write a review
            </button>

            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                businessName={latestStore.storeName}
                storeId={latestStore.storeId}
                businessId={latestStore.businessId}
            />
        </>
    )
}
