"use client"

import { useState, useEffect, useRef } from "react"
import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"
import clsx from "clsx"

export function EventsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const fourvenuesRef = useRef<HTMLDivElement>(null)
  
  const t = useTranslations("Events")

  // Efecto para inyectar el script de Fourvenues
  useEffect(() => {
    if (fourvenuesRef.current) {
      // Evitamos duplicados si el script ya existe
      const existingScript = fourvenuesRef.current.querySelector('script[src="https://www.fourvenues.com/assets/iframe/mork-lab/V4HB"]')
      
      if (!existingScript) {
        const script = document.createElement("script")
        script.src = "https://www.fourvenues.com/assets/iframe/mork-lab/V4HB"
        script.async = true
        fourvenuesRef.current.appendChild(script)
      }
    }
  }, [])

  // Datos manuales (comentados temporalmente para probar el widget)
  const events = [
    {
      date: "2026.02.14",
      day: "SAT",
      artist: "MANGLES b2b REEKO",
      subtitle: `${t('night_with')} Lanna Family`,
      venue: "Wave Club",
      ticketUrl: "#",
    },
    // ... otros eventos
  ]

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

        {/* --- CONTENEDOR DEL WIDGET DE FOURVENUES --- */}
        {/* El sistema de Fourvenues se pintará aquí dentro */}
        <div 
          ref={fourvenuesRef} 
          className="w-full min-h-[600px] flex justify-center items-start"
        >
          {/* El script generará un iframe aquí */}
        </div>

        {/* Lista Manual (COMENTADA) 
            Si el widget no te gusta, descomentamos esto y ocultamos el div de arriba.
        */}
        {/* <div className="border-t border-border">
          {events.map((event, index) => (
            <div key={index} className="border-b border-border">
              <a
                href={event.ticketUrl}
                className="group block py-6 md:py-8 transition-colors hover:bg-secondary/30 relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-4 md:w-48">
                    <span className="text-muted-foreground text-xs tracking-[0.2em] font-mono">{event.date}</span>
                    <span className="text-accent text-xs tracking-[0.2em] font-bold">{event.day}</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={clsx(
                        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[0.05em] uppercase transition-colors",
                        hoveredIndex === index ? "text-accent" : "text-foreground"
                      )}
                    >
                      {event.artist}
                    </h3>
                    <p className="text-muted-foreground text-sm tracking-wider mt-1 uppercase">{event.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 mt-4 md:mt-0">
                    <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase hidden md:block">{event.venue}</span>
                    <span className="text-foreground border border-foreground px-6 py-2 text-xs tracking-[0.2em] uppercase group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all min-h-11 flex items-center font-bold">
                      {t('ticket_btn')}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div> 
        */}

        {/* Link externo (Opcional, por si acaso) */}
        <div className="mt-16 text-center">
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