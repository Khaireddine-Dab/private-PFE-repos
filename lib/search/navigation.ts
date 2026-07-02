/**
 * Helpers pour la navigation depuis les résultats de recherche sémantique/hybride.
 */

export interface SearchResultNav {
  id?: number | string
  name?: string
  title?: string
  result_type?: 'STORE' | 'ITEM' | 'REEL' | 'BUSINESS_DIR' | 'SERVICE_DIR'
  item_type?: string
  category?: string
  location_city?: string
  city?: string
  store_id?: number | string
  distance?: number
  distance_km?: number
  metadata?: Record<string, any>
}

export function isServiceItem(result: SearchResultNav): boolean {
  const type = (result.item_type ?? result.category ?? '').toUpperCase()
  return type === 'SERVICE' || result.result_type === 'SERVICE_DIR'
}

export function getSearchResultHref(result: SearchResultNav): string {
  const id = result.id
  if (id == null) return '/search'

  switch (result.result_type) {
    case 'STORE':
      return `/merchants/business/${id}`

    case 'ITEM': {
      return isServiceItem(result)
        ? `/merchants/service/${id}`
        : `/merchants/product/${id}`
    }

    case 'SERVICE_DIR':
      return `/merchants/service/${id}`

    case 'REEL': {
      const storeId = result.metadata?.store_id ?? result.store_id
      if (storeId) return `/merchants/business/${storeId}`
      return `/reels/${id}`
    }

    case 'BUSINESS_DIR':
      return `/search?query=${encodeURIComponent(result.name ?? result.title ?? '')}`

    default: {
      if (result.item_type) {
        return isServiceItem(result)
          ? `/merchants/service/${id}`
          : `/merchants/product/${id}`
      }
      return `/merchants/business/${id}`
    }
  }
}

export function getSearchResultBadge(result: SearchResultNav): string {
  switch (result.result_type) {
    case 'STORE':        return 'Boutique'
    case 'ITEM':         return isServiceItem(result) ? 'Service' : 'Produit'
    case 'SERVICE_DIR':  return 'Service'
    case 'REEL':         return 'Reel'
    case 'BUSINESS_DIR': return 'Annuaire'
    default:             return result.item_type ? (isServiceItem(result) ? 'Service' : 'Produit') : 'Boutique'
  }
}

export function formatSearchResultLocation(result: SearchResultNav): string {
  const city = result.location_city ?? result.city ?? result.metadata?.store_city
  const dist = result.distance ?? result.distance_km

  const parts: string[] = []
  if (city) parts.push(city)
  if (dist != null && isFinite(dist)) {
    parts.push(dist < 1 ? '< 1 km' : `${dist.toFixed(1)} km`)
  }
  return parts.join(' • ')
}
