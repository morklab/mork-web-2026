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
    <main className="bg-black selection:bg-red-600 selection:text-white">
      
      {/* 1. HERO: Se queda pegado al fondo */}
      <div className="sticky top-0 z-0">
        <HeroSection />
      </div>
      
      {/* 2. EVENTOS: Es una lista larga, así que pasa por encima (tapa al Hero) */}
      <div className="relative z-10 bg-black">
        <EventsSection />
      </div>

      {/* A PARTIR DE AQUÍ: EFECTO DE APILAMIENTO (CARTA SOBRE CARTA) */}
      
      {/* 3. CORE ARTISTS */}
      <div className="sticky top-0 z-0 bg-black">
        <ResidentsSection />
      </div>

      {/* 4. MANIFIESTO (Tapa a Artists) */}
      <div className="sticky top-0 z-0 bg-black">
        <ManifestoSection />
      </div>
      
      {/* 5. ECOS RITUALES (Tapa a Manifiesto) */}
      <div className="sticky top-0 z-0 bg-black">
        <VisualsSection />
      </div>
      
      {/* 6. ARCHIVE / MEDIA (Tapa a Ecos) */}
      <div className="sticky top-0 z-0 bg-black">
        <MediaSection />
      </div>
      
      {/* 7. EQUIPO (Tapa a Archive) */}
      <div className="sticky top-0 z-0 bg-black">
        <TeamSection />
      </div>
      
      {/* 8. SONIDO (Tapa a Equipo) */}
      <div className="sticky top-0 z-0 bg-black">
        <SoundSection />
      </div>

      {/* 9. TIENDA + FOOTER:
          Al ser el final y tener mucho contenido, usamos relative y z-20 
          para asegurar que tapen todo lo anterior y cierren la web. */}
      <div className="relative z-20 bg-black">
        <ShopSection />
        <Footer />
      </div>

    </main>
  )
}