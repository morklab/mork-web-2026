"use client"

import Image from "next/image"
import { Instagram, Mail } from "lucide-react"
import { useTranslations } from "next-intl"

export function Footer() {
  // 1. Activamos los diccionarios
  const t = useTranslations("Footer")
  const tNav = useTranslations("Navigation")

  return (
    <footer className="py-16 md:py-24 px-4 md:px-8 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Info */}
          <div>
            <Image src="/GALLETA_ROJA.PNG" alt="MØRK Lab" width={60} height={60} className="mb-6" />
            <p className="text-muted-foreground text-sm tracking-wider leading-relaxed">
              {t('text')}
            </p>
          </div>

          {/* Links de Navegación */}
          <div>
            <p className="text-foreground text-xs tracking-[0.3em] uppercase mb-6">{t('col_nav')}</p>
            <div className="flex flex-col gap-3">
              <a href="#events" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                {tNav('events')}
              </a>
              {/* He actualizado el href a #core-artists para que coincida con tu sección de Artistas */}
              <a href="#core-artists" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                {tNav('artists')}
              </a>
              <a href="#manifesto" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                {tNav('manifesto')}
              </a>
              <a href="#sound" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                {tNav('sound')}
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-foreground text-xs tracking-[0.3em] uppercase mb-6">{t('col_connect')}</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/mork.lab/"
                target="_blank"
                className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-accent transition-colors"
                rel="noreferrer"
              >
                <Instagram size={16} />
                @mork.lab
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

        {/* Bottom / Copyright */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs tracking-wider">
            © 2025 MØRK Lab. {t('rights')}
          </p>
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
            {t('pure_mork')}
          </p>
        </div>
      </div>
    </footer>
  )
}