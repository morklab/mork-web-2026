"use client"

import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"

export function EventsSection() {
  const t = useTranslations("Events")

  return (
    <section id="events" className="relative py-20 md:py-32 px-4 md:px-8 bg-background overflow-hidden">
      
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/colin-detras.JPEG')`,
          filter: 'grayscale(100%)',
          opacity: 0.4,
        }}
      />
      <div
        className="absolute right-0 bottom-0 bg-gradient-to-b from-background/70 via-background/80 to-background"
        style={{ left: "auto", top: "auto" }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Cabecera */}
        <div className="mb-16 md:mb-24">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-bold no-glow">{t('subtitle')}</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-foreground">
            <GlitchText>{t('title')}</GlitchText>
          </h2>
        </div>

        {/* --- WIDGET DE FOURVENUES (SOLUCIÓN IFRAME) --- */}
        <div className="w-full flex justify-center">
          <iframe
            title="Fourvenues Widget"
            className="w-full border-none"
            // Altura inicial de 800px para que quepan los eventos. 
            // Si ves que se corta, sube este número a 1000px o 1200px.
            style={{ height: '800px', backgroundColor: 'transparent' }} 
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <base target="_parent">
                  <style>
                    body { margin: 0; padding: 0; background-color: transparent; }
                  </style>
                </head>
                <body>
                  <script src="https://www.fourvenues.com/assets/iframe/mork-lab/V4HB"></script>
                </body>
              </html>
            `}
          />
        </div>

        {/* Link externo de respaldo */}
        <div className="mt-8 text-center">
          <a
            href="https://www.fourvenues.com/mork-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground text-xs tracking-[0.3em] uppercase hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-1"
          >
            {t('view_all')}
          </a>
        </div>
      </div>
    </section>
  )
}