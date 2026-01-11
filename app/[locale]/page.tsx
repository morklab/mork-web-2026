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
      
      {/* 1. HERO: 
          Aquí podemos dejar sticky también en móvil porque el Hero suele ocupar 
          exactamente el 100vh, así que no da problemas de corte. 
          Pero si quieres asegurar, ponle 'lg:' también. 
          De momento lo dejo como estaba para el efecto visual inicial. */}
      <div className="sticky top-0 z-0">
        <HeroSection />
      </div>
      
      {/* 2. EVENTOS: Ya es relative, funciona bien. */}
      <div className="relative z-10 bg-black">
        <EventsSection />
      </div>

      {/* A PARTIR DE AQUÍ: CORRECCIÓN RESPONSIVE
          Cambiamos "sticky top-0" por "relative lg:sticky lg:top-0"
          Esto significa: "Normal en móvil, Pegajoso en PC". */}
      
      {/* 3. CORE ARTISTS */}
      <div className="relative lg:sticky lg:top-0 z-0 bg-black">
        <ResidentsSection />
      </div>

      {/* 4. MANIFIESTO (Este daba mucho problema por la altura del texto) */}
      <div className="relative lg:sticky lg:top-0 z-0 bg-black">
        <ManifestoSection />
      </div>
      
      {/* 5. ECOS RITUALES */}
      <div className="relative lg:sticky lg:top-0 z-0 bg-black">
        <VisualsSection />
      </div>
      
      {/* 6. ARCHIVE / MEDIA */}
      <div className="relative lg:sticky lg:top-0 z-0 bg-black">
        <MediaSection />
      </div>
      
      {/* 7. EQUIPO (Este daba problema por la altura de las fotos) */}
      <div className="relative lg:sticky lg:top-0 z-0 bg-black">
        <TeamSection />
      </div>
      
      {/* 8. SONIDO */}
      <div className="relative lg:sticky lg:top-0 z-0 bg-black">
        <SoundSection />
      </div>

      {/* 9. TIENDA + FOOTER */}
      <div className="relative z-20 bg-black">
        <ShopSection />
        <Footer />
      </div>

    </main>
  )
}