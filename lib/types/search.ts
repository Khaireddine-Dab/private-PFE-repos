import type { Database } from '@/types/supabase'

type Item = Database['public']['Tables']['items']['Row']

/** Résultat item enrichi pour les pages de recherche (client-safe, pas de 'use server'). */
export interface SearchResultItem extends Item {
  stores?: {
    id: number
    name: string
    logo_url?: string
    status?: string
    category?: string
    [key: string]: any
  }
  is_nearby?: boolean
  distance?: number
  [key: string]: any
}
