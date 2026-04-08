'use client';

import { useEffect, useRef } from 'react';

/**
 * components/StoreLocationMap.tsx
 * A Google Maps display supporting both Leaflet (fallback) and native Iframe Embed.
 */

interface StoreLocationMapProps {
  lat: number;
  lng: number;
  businessName: string;
  address?: string;
  googleMapsUrl?: string;
  placeId?: string;
}

export default function StoreLocationMap({
  lat,
  lng,
  businessName,
  address,
  googleMapsUrl,
  placeId,
}: StoreLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Deriving useIframe directly to avoid double-initialization logic
  const useIframe = !!(googleMapsUrl || placeId);

  useEffect(() => {
    // Only initialize Leaflet if not using iframe and on client
    if (useIframe || typeof window === 'undefined' || !mapRef.current) return;

    let mounted = true;
    const initMap = async () => {
      const L = (await import('leaflet')).default;

      // Ensure style is loaded
      if (typeof document !== 'undefined' && !document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!mounted || !mapRef.current) return;
      
      // Cleanup previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = L.map(mapRef.current, { 
        attributionControl: false,
        zoomControl: false 
      }).setView([lat, lng], 15);

      // NO-API METHOD: Google Maps Hybrid or Road tiles
      L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 20
      }).addTo(map);

      // Custom marker
      L.marker([lat, lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: '<div style="width: 24px; height: 24px; background: #ef4444; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })
      }).addTo(map);

      mapInstanceRef.current = map;

      // Force recalculate after short delay to fix initialization glitches
      setTimeout(() => {
        if (mounted && map) map.invalidateSize();
      }, 100);
    };

    initMap();

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, useIframe]);

  if (useIframe) {
    // Construct Google Maps Embed URL (No API Key Required)
    // Preference: Place ID > Coordinates
    const embedUrl = placeId 
      ? `https://maps.google.com/maps?q=place_id:${placeId}&t=m&z=15&output=embed`
      : `https://maps.google.com/maps?q=${lat},${lng}&t=m&z=15&output=embed`;

    return (
      <div className="w-full h-full min-h-[inherit] bg-stone-50 overflow-hidden relative border rounded-xl shadow-inner">
        <iframe
          title={`Map for ${businessName}`}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0, display: 'block' }}
          src={embedUrl}
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[inherit] bg-stone-50 overflow-hidden relative border rounded-xl shadow-inner">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
