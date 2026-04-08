// ─── Types ────────────────────────────────────────────────────────────────────
export interface GeoPoint {
  lat: number
  lng: number
}

// ─── Haversine distance (km) ──────────────────────────────────────────────────
export function haversineKm(a: GeoPoint, b: GeoPoint): number {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
}
export function extractCity(query: string): string | null {
  // Simple heuristic: match known Tunisian city names (case‑insensitive)
  const cities = ['Tunis','Sfax','Sousse','Kairouan','Gabès','Bizerte','Nabeul','Gabes','Gabes'];
  const lower = query.toLowerCase();
  for (const city of cities) {
    if (lower.includes(city.toLowerCase())) {
      // Return the city name in proper case (first letter uppercase)
      return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    }
  }
  return null;
}
