'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OffersCarouselDemo from '@/components/OffersCarouselDemoBusiness';
import Offers from '@/components/Offers';
import { LogoCarouselDemo } from "@/components/ui/testimonials";
import { FloatingAiAssistant } from "@/components/ui/glowing-ai-chat-assistant";
import ShortAdsSection from '@/components/ShortAdsSection';

const BackgroundScene = dynamic(
  () => import('@/components/BackgroundScene'),
  { ssr: false }
);



export default function Home() {
  const [isFiltering, setIsFiltering] = useState(false);
  const handleFilterSelect = (item: any) => {
    if (!item) return;
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 350);
  };

  return (
    <main className="relative min-h-screen">
      <BackgroundScene />

      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />

        {/* Spacer to prevent content overlay from fixed Navbar */}
        <div className="h-24 md:h-28" />

        {/* Smart Strip — between shorts and offers for max attention */}


        <div className={`transition-all duration-300 ${isFiltering ? 'opacity-40 blur-[2px] scale-[0.98]' : 'opacity-100 blur-0 scale-100'}`}>
  <div className="ml-4 md:ml-6 lg:ml-8">
    <ShortAdsSection />
  </div>
          <Offers />
          <OffersCarouselDemo />
        
        {/*   <Hero />   
        <Sponsors />
        
        <TrendingArtists />
        <CommerceHero />
         */}
        <LogoCarouselDemo /> 

        <Footer />
        </div>
      </div>

      <FloatingAiAssistant />
    </main>
  );
}