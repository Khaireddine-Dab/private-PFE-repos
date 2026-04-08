'use server'

import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/supabase'
import { translateDarijaForSearch } from '@/lib/darija-dictionary'

export type SearchResultItem = {
    id: any;
    name: string;
    description: string | null;
    rating_average: number | null;
    total_reviews: number | null;
    item_type: 'PRODUCT' | 'SERVICE';
    main_image?: string | null;
    price?: number | null;
    store_id?: number | null;
    owner_id?: string;
    isRealItem?: boolean;
    id_business?: number | string | null;
    latitude?: number | null;
    longitude?: number | null;
    city?: string | null;
    slug?: string | null;
    created_at?: string | null;
    stores?: {
        id: number
        name: string
        rating_average: number | null
        total_reviews: number | null
        owner_id?: string
    }
} & any;

export async function searchItems(query?: string, category?: string) {
    const supabase = createClient()

    try {
        let request = supabase
            .from('items')
            .select(`
          *,
          stores (
            id,
            name,
            slug,
            rating_average,
            total_reviews,
            owner_id
          )
        `)
            .eq('status', 'AVAILABLE')
            .not('store_id', 'is', null) // Filter for items linked to a store

        if (query) {
            const translatedQuery = translateDarijaForSearch(query);
            const noiseWords = new Set(['je', 'tu', 'il', 'elle', 'un', 'une', 'des', 'le', 'la', 'les', 'de', 'du', 'au', 'aux', 'mon', 'ma', 'mes', 'pour', 'trouver', 'veux', 'où', 'a', 'à', 'est', 'sont', 'y', 'dans', 'avec', 'et', 'ou', 'moi', 'toi']);
            
            let targetString = translatedQuery !== query ? translatedQuery : query;
            let keywords = targetString.toLowerCase().split(/\s+/).filter(w => w.length > 2 && !noiseWords.has(w));
            
            if (keywords.length === 0) keywords = [query.toLowerCase()];

            keywords.forEach(keyword => {
                request = request.or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`);
            });
        }

        const { data, error } = await request.order('created_at', { ascending: false })

        if (error) {
            console.error('Error searching items:', error)
            return { data: [], error: error.message }
        }

        return { data: (data ?? []).map((item: any) => ({ ...item, isRealItem: true })) as any[], error: null }
    } catch (err: any) {
        console.error('Network panic in searchItems:', err);
        return { data: [], error: err.message || 'Connection failed' };
    }
}
