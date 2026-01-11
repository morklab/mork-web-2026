import { HeroSection } from "@/components/hero-section"
import { EventsSection } from "@/components/events-section"
import { ResidentsSection } from "@/components/residents-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { VisualsSection } from "@/components/visuals-section"
import { MediaSection } from "@/components/media-section"
import { TeamSection } from "@/components/team-section"
import { SoundSection } from "@/components/sound-section"
import { ShopSection } from "@/components/shop-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-black selection:bg-red-600 selection:text-white min-h-screen">
      
      {/* 1. HERO: Sticky base (z-0) */}
      <div className="sticky top-0 z-0">
        <HeroSection />
      </div>
      
      {/* 2. EVENTOS: Sube a z-10 para tapar al Hero */}
      <div className="relative z-10 bg-black">
        <EventsSection />
      </div>

      {/* --- ZONA DE EFECTO STACKING (Cartas) --- 
          Fíjate que ahora el Z-INDEX sube progresivamente.
          z-20, z-30, z-40... Esto es OBLIGATORIO para el efecto.
      */}
      
      {/* 3. CORE ARTISTS (z-20) */}
      <div className="relative lg:sticky lg:top-0 z-20 bg-black">
        <ResidentsSection />
      </div>

      {/* 4. MANIFIESTO (z-30) */}
      <div className="relative lg:sticky lg:top-0 z-30 bg-black">
        <ManifestoSection />
      </div>
      
      {/* 5. ECOS RITUALES (z-40) */}
      <div className="relative lg:sticky lg:top-0 z-40 bg-black">
        <VisualsSection />
      </div>
      
      {/* 6. ARCHIVE / MEDIA (z-50) */}
      <div className="relative lg:sticky lg:top-0 z-50 bg-black">
        <MediaSection />
      </div>
      
      {/* 7. EQUIPO (z-60) */}
      <div className="relative lg:sticky lg:top-0 z-60 bg-black">
        <TeamSection />
      </div>
      
      {/* 8. SONIDO (z-70) */}
      <div className="relative lg:sticky lg:top-0 z-70 bg-black">
        <SoundSection />
      </div>

      {/* 9. TIENDA + FOOTER (z-80) - Tapa todo el stack anterior */}
      <div className="relative z-80 bg-black">
        <ShopSection />
        <Footer />
      </div>

    </main>
  )
}