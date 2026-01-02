"use client"

// 1. IMPORTAR EL COMPONENTE GLITCH 👇
import { GlitchText } from "@/components/ui/glitch-text"

export function ManifestoSection() {
  return (
    <section id="manifesto" className="py-20 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">Our Philosophy</p>
          
          {/* 2. APLICAR EL GLITCH AQUÍ 👇 */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[0.05em] uppercase text-foreground">
            <GlitchText>THE MANIFESTO</GlitchText>
          </h2>
        </div>

        {/* Manifesto Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="border-l border-accent pl-6 md:pl-8">
            <p className="text-foreground text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
              MØRK is not just a party.
            </p>
            <p className="text-foreground text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide mt-4">
              It is a commitment to sound.
            </p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed tracking-wide text-pretty">
              A safe space where the ego dissolves and only the rhythm remains. We curate nights for the educated ear.
              Every beat, every light, every moment is crafted with intention.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed tracking-wide mt-6 text-pretty">
              We believe in the power of underground culture. In the darkness, we find unity. In the repetition, we find
              transcendence. In the bass, we find ourselves.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed tracking-wide mt-6 text-pretty">
              This is not entertainment. This is ritual.
            </p>
          </div>
        </div>

        {/* Stats/Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-32 border-t border-border pt-12">
          <div>
            <p className="text-3xl md:text-4xl font-black text-accent">TECHNO</p>
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2">Style</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-foreground">+20</p>
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2">International Artists</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-accent">7K+</p>
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2">Community</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-foreground">2024</p>
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2">Founded</p>
          </div>
        </div>
      </div>
    </section>
  )
}