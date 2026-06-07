'use client';

import { useState, useEffect } from "react";
import { OfferCarousel, type Offer } from "@/components/ui/offer-carousel-products";
import { hasUserInteractions } from "@/lib/actions/user-activity";
import { getLatestItems } from "@/lib/actions/items";

export default function OfferCarouselDemo() {
  const [hasInteractions, setHasInteractions] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        
        // Fetch user interactions and products in parallel
        const [interactions, items] = await Promise.all([
          hasUserInteractions(),
          getLatestItems(10)
        ]);
        
        setHasInteractions(interactions);

        // Map products to Offer format
        const mappedOffers: Offer[] = items.slice(0, 5).map((items: any, index) => ({
          id: items.id,
          imageSrc: items.main_image || "https://images.unsplash.com/photo-1578926314433-ed0e0e26f2dc?q=80&w=1966&auto=format&fit=crop",
          imageAlt: items.name,
          tag: "Offer",
          catégorie: items.category,
          title: items.name,
          description: items.description || `৳${items.price}`,
          brandLogoSrc: items.stores?.logo_url,
          brandName: items.stores?.name || "Shop",
          href: items.item_type === 'SERVICE' ? `/merchants/service/${items.id}` : `/merchants/product/${items.id}`,
          storeId: items.store_id,
        }));

        setOffers(mappedOffers);
        setError(null);
      } catch (err) {
        console.error('Failed to load offers:', err);
        setError('Failed to load offers');
        setOffers([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const title = hasInteractions 
    ? "On commence à vous connaître ❤️" 
    : "Populaire près de vous 📍🗺️";

  return (
    <div className="w-full min-h-[500px] bg-[#F9F8F6] flex flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 text-[#111111]">{title}</h2>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Chargement des offres...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <OfferCarousel offers={offers} />
        )}
      </div>
    </div>
  ); 
}