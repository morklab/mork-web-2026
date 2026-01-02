import Image from "next/image"
import { Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-16 md:py-24 px-4 md:px-8 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Info */}
          <div>
            <Image src="/GALLETA_ROJA.PNG" alt="MØRK Lab" width={60} height={60} className="mb-6" />
            <p className="text-muted-foreground text-sm tracking-wider leading-relaxed">
              Underground electronic music culture in Mallorca. Pure techno, pure experience.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-foreground text-xs tracking-[0.3em] uppercase mb-6">Navigation</p>
            <div className="flex flex-col gap-3">
              <a href="#events" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                Events
              </a>
              <a href="#residents" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                Residents
              </a>
              <a href="#manifesto" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                Manifesto
              </a>
              <a href="#sound" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                Sound
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-foreground text-xs tracking-[0.3em] uppercase mb-6">Connect</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/mork.lab/"
                target="_blank"
                className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-accent transition-colors"
                rel="noreferrer"
              >
                <Instagram size={16} />
                @morklab
              </a>
              <a
                href="mailto:info@mork.es"
                className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-accent transition-colors"
              >
                <Mail size={16} />
                info@mork.es
              </a>
            </div>
            <div className="mt-6">
              <p className="text-muted-foreground text-xs tracking-wider">Palma de Mallorca, Spain</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs tracking-wider">© 2025 MØRK Lab. All rights reserved.</p>
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">Pure Techno. Pure MØRK.</p>
        </div>
      </div>
    </footer>
  )
}
