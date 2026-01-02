import { VisualsSection } from "@/components/visuals-section"
import { HeroSection } from "@/components/hero-section"
import { EventsSection } from "@/components/events-section"
import { ResidentsSection } from "@/components/residents-section"
import { ManifestoSection } from "@/components/manifesto-section"
import { SoundSection } from "@/components/sound-section"
import { ShopSection } from "@/components/shop-section"
import { TeamSection } from "@/components/team-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <EventsSection />
      <ResidentsSection />
      <ManifestoSection />
      <VisualsSection />
      <TeamSection />
      <SoundSection />
      <ShopSection />
      <Footer />
    </main>
  )
}
