"use client"

import { useState, useRef, useEffect } from "react"
import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"
import { X, Loader2 } from "lucide-react"
import clsx from "clsx"

// 👇 1. WIDGET FOURVENUES MEJORADO (Anti-bloqueo y sin doble carga)
function FourVenuesWidget({ scriptSrc }: { scriptSrc: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptInserted = useRef(false) // Control para evitar doble ejecución

  useEffect(() => {
    // Si no hay contenedor o ya insertamos el script, paramos.
    if (!containerRef.current || scriptInserted.current) return

    scriptInserted.current = true
    
    // Limpiamos contenedor por seguridad
    containerRef.current.innerHTML = ""

    // Creamos el script
    const script = document.createElement("script")
    script.src = scriptSrc
    script.async = true
    script.type = "text/javascript"

    // Manejo básico de errores (útil para debug)
    script.onerror = () => {
      console.error("FourVenues script failed to load.")
      if (containerRef.current) {
         containerRef.current.innerHTML = "<div class='p-8 text-red-600 text-center text-xs uppercase tracking-widest'>Error loading tickets.<br/>Please check your internet or disable AdBlock.</div>"
      }
    }

    containerRef.current.appendChild(script)

  }, [scriptSrc])

  return (
    // Fondo blanco para asegurar que el iframe de entradas se lea bien
    <div className="bg-white text-black w-full mt-6 mb-8 rounded-sm relative min-h-[600px] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-500">
      
      {/* Contenedor donde el script inyectará el iframe */}
      <div ref={containerRef} className="relative z-20" />

      {/* Cargador visual que queda DEBAJO (z-10) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 opacity-60">
        <Loader2 className="animate-spin w-8 h-8 text-black mb-2" />
        <span className="text-[10px] uppercase tracking-widest text-black font-bold">Loading Tickets...</span>
      </div>
    </div>
  )
}

export function EventsSection() {
  // Estado para controlar qué evento está desplegado
  const [activeEventIndex, setActiveEventIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const t = useTranslations("Events")

  // 👇 2. DATOS DE EVENTOS
  const events = [
    {
      date: "2026.02.14",
      day: "SAT",
      artist: "MANGLES b2b REEKO",
      subtitle: `${t('night_with')} Lanna Family`,
      venue: "Wave Club",
      ticketUrl: "#", 
      // 👇 TU SCRIPT REAL AQUÍ:
      fvScript: "https://www.fourvenues.com/assets/iframe/mork-lab/V4HB"
    },
    {
      date: "2025.03.07",
      day: "SAT",
      artist: "SOL ORTEGA",
      subtitle: `${t('night_with')} Sol Ortega`,
      venue: "Wave Club",
      ticketUrl: "#",
      fvScript: "" // Vacío por ahora
    },
    {
      date: "2025.04.18",
      day: "SAT",
      artist: "FREDDY K",
      subtitle: `${t('night_with')} Freddy K`,
      venue: "Wave Club",
      ticketUrl: "#",
      fvScript: ""
    },
    {
      date: "2025.05.9",
      day: "SAT",
      artist: "SETAOC MASS",
      subtitle: `${t('night_with')} Setaoc Mass`,
      venue: "Wave Club",
      ticketUrl: "#",
      fvScript: ""
    },
  ]

  // Función toggle (abrir/cerrar)
  const toggleTickets = (index: number) => {
    if (activeEventIndex === index) {
      setActiveEventIndex(null)
    } else {
      setActiveEventIndex(index)
    }
  }

  return (
    <section id="events" className="relative py-20 md:py-32 px-4 md:px-8 bg-background overflow-hidden">
      
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/colin-detras.JPEG')`, // Asegúrate que esta imagen existe en public
          filter: 'grayscale(100%)',
          opacity: 0.4,
        }}
      />
      <div
        className="absolute right-0 bottom-0 bg-gradient-to-b from-background/70 via-background/80 to-background"
        style={{ left: "auto", top: "auto" }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* CABECERA SECCIÓN */}
        <div className="mb-16 md:mb-24">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-bold no-glow">{t('subtitle')}</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-foreground">
            <GlitchText>{t('title')}</GlitchText>
          </h2>
        </div>

        {/* LISTA DE EVENTOS */}
        <div className="border-t border-border">
          {events.map((event, index) => {
             const isOpen = activeEventIndex === index;

             return (
              <div key={index} className="flex flex-col border-b border-border">
                
                {/* FILA DEL EVENTO */}
                <div
                  className="group py-6 md:py-8 transition-colors hover:bg-secondary/30 relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    
                    {/* FECHA */}
                    <div className="flex items-center gap-4 md:w-48">
                      <span className="text-muted-foreground text-xs tracking-[0.2em] font-mono">{event.date}</span>
                      <span className="text-accent text-xs tracking-[0.2em] font-bold">{event.day}</span>
                    </div>

                    {/* ARTISTA & INFO */}
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

                    {/* LUGAR & BOTÓN */}
                    <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 mt-4 md:mt-0">
                      <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase hidden md:block">{event.venue}</span>
                      
                      {event.fvScript ? (
                        <button 
                          onClick={() => toggleTickets(index)}
                          className={clsx(
                            "px-6 py-2 text-xs tracking-[0.2em] uppercase border transition-all min-h-11 flex items-center justify-center min-w-[140px] font-bold",
                            isOpen 
                              ? "bg-white text-black border-white" 
                              : "text-foreground border-foreground group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground"
                          )}
                        >
                          {isOpen ? <X size={18} /> : t('ticket_btn')}
                        </button>
                      ) : (
                        <span className="text-muted-foreground border border-muted-foreground/30 px-6 py-2 text-xs tracking-[0.2em] uppercase cursor-not-allowed min-h-11 flex items-center opacity-50">
                          SOON
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 👇 WIDGET DESPLEGABLE (CONTROLADO) */}
                {isOpen && event.fvScript && (
                  <div className="w-full max-w-5xl mx-auto px-4">
                    <FourVenuesWidget scriptSrc={event.fvScript} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* VER TODOS */}
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