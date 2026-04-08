'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * lib/actions/serpapi.ts
 * Fetches precise GPS coordinates from Google Maps via SerpApi.
 */

export async function getPlaceCoordinates(name: string, location: string) {
    const apiKey = process.env.SERPAPI_API_KEY;
    if (!apiKey) {
        console.warn('SerpApi: Missing API key in environment.');
        return null;
    }

    // Set a timeout for the fetch call (8 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const query = encodeURIComponent(`${name} ${location}`);
        const url = `https://serpapi.com/search.json?engine=google_maps&q=${query}&api_key=${apiKey}&type=search`;

        const response = await fetch(url, { 
            next: { revalidate: 86400 },
            signal: controller.signal 
        });
        const data = await response.json();

        // 1. Check place_results (if direct hit)
        if (data.place_results?.gps_coordinates) {
            return {
                lat: data.place_results.gps_coordinates.latitude,
                lng: data.place_results.gps_coordinates.longitude,
            };
        }

        // 2. Check local_results (list results) - pick first match
        if (data.local_results?.[0]?.gps_coordinates) {
            return {
                lat: data.local_results[0].gps_coordinates.latitude,
                lng: data.local_results[0].gps_coordinates.longitude,
            };
        }

        return null;
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.warn('SerpApi: Request timed out');
        } else {
            console.error('SerpApi getPlaceCoordinates error:', error);
        }
        return null;
    } finally {
        clearTimeout(timeoutId);
    }
}

/**
 * Persist coordinates to the appropriate table
 */
export async function persistLocation(
    type: 'STORE' | 'SERVICE' | 'DIRECTORY',
    id: number | string,
    lat: number,
    lng: number
) {
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    if (isNaN(numericId)) return { success: false, error: 'Invalid ID' };

    try {
        const supabase = createClient();
        console.log(`[SerpApi] Persisting location for ${type} ID ${numericId}: ${lat}, ${lng}`);

        let table = '';
        let idColumn = 'id';

        switch (type) {
            case 'STORE':
                table = 'stores';
                break;
            case 'SERVICE':
                table = 'service_directory';
                idColumn = 'service_id';
                break;
            case 'DIRECTORY':
                table = 'business_directory_tunisia';
                break;
            default:
                return { success: false, error: 'Unknown type' };
        }

        // Removed updated_at as it's not present in all tables (e.g. business_directory_tunisia)
        const { error } = await (supabase
            .from(table as any)
            .update({
                latitude: lat,
                longitude: lng
            } as never) as any)
            .eq(idColumn, numericId);

        if (error) {
            console.error(`[SerpApi] Error persisting to ${table}:`, error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err: any) {
        console.error('[SerpApi] Panic during persistLocation:', err);
        return { success: false, error: err.message };
    }
}