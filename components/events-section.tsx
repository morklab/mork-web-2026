"use client"

import { useState, useEffect } from "react"
import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"
import clsx from "clsx"
import { X } from "lucide-react" 

export function EventsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedScriptCode, setSelectedScriptCode] = useState<string | null>(null)
  
  const t = useTranslations("Events")

  // Bloquear scroll de la web de fondo cuando el modal está abierto
  useEffect(() => {
    if (selectedScriptCode) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedScriptCode])

  // --- TUS EVENTOS ---
  const events = [
    // EVENTO 1: 14 FEB (BLANCO)
    {
      date: "2026.02.14",
      day: "SAT",
      title: "MANGLES b2b REEKO", 
      subtitle: `${t('night_with')} Lanna Family`, 
      venue: "Wave Club",
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/mork-lab/V4HB"></script>`, 
      hasTicket: true
    },
    // EVENTO 2: 7 DE MARZO (GRIS OSCURO)
    {
      date: "2026.03.07",
      day: "SAT",
      title: "ARTISTA TBA", 
      subtitle: "REVEAL: 20 DE ENERO A LAS 18:00", 
      venue: "Wave Club",
      scriptTag: null, 
      hasTicket: true
    },
    // EVENTO 3: 18 DE ABRIL (GRIS OSCURO)
    {
      date: "2026.04.18",
      day: "SAT",
      title: "ARTISTA TBA", 
      subtitle: "REVEAL: 27 DE ENERO A LAS 18:00", 
      venue: "Wave Club",
      scriptTag: null, 
      hasTicket: true
    },
    // EVENTO 4: 9 DE MAYO (GRIS OSCURO)
    {
      date: "2026.05.09",
      day: "SAT",
      title: "ARTISTA TBA", 
      subtitle: "REVEAL: 3 DE FEBRERO A LAS 18:00", 
      venue: "Wave Club",
      scriptTag: null, 
      hasTicket: true
    }
  ]

  const handleTicketClick = (script: string | null) => {
    if (!script) return;
    setSelectedScriptCode(script)
  }

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
        <div className="mb-16 md:mb-24">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-bold no-glow">{t('subtitle')}</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-foreground">
            <GlitchText>{t('title')}</GlitchText>
          </h2>
        </div>

        {/* Lista de Eventos */}
        <div className="border-t border-border">
          {events.map((event, index) => {
            
            const isHovered = hoveredIndex === index && event.hasTicket;
            const isFirstEvent = index === 0;
            
            // LÓGICA DE COLOR
            let titleColorClass = "!text-zinc-700"; 
            if (isFirstEvent) titleColorClass = "text-foreground"; 
            if (isHovered) titleColorClass = "!text-accent"; 

            return (
              <div key={index} className="border-b border-border">
                <div
                  className={clsx(
                    "group block py-6 md:py-8 transition-colors hover:bg-secondary/30 relative",
                    event.hasTicket ? "cursor-pointer" : "cursor-default"
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => event.hasTicket && handleTicketClick(event.scriptTag)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    
                    {/* FECHA */}
                    <div className="flex items-center gap-4 md:w-48">
                      <span className="text-muted-foreground text-xs tracking-[0.2em] font-mono">{event.date}</span>
                      <span className="text-accent text-xs tracking-[0.2em] font-bold">{event.day}</span>
                    </div>
                    
                    {/* INFO CENTRAL */}
                    <div className="flex-1">
                      <h3
                        className={clsx(
                          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[0.05em] uppercase transition-colors",
                          titleColorClass
                        )}
                      >
                        {isFirstEvent ? (
                          event.title
                        ) : (
                          <GlitchText>{event.title}</GlitchText>
                        )}
                      </h3>
                      <p className="text-muted-foreground text-sm tracking-wider mt-1 uppercase font-bold">
                          {event.subtitle}
                      </p>
                    </div>

                    {/* BOTÓN */}
                    <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 mt-4 md:mt-0">
                      <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase hidden md:block">{event.venue}</span>
                      
                      {event.hasTicket ? (
                          <button 
                          onClick={(e) => {
                              e.stopPropagation(); 
                              handleTicketClick(event.scriptTag);
                          }}
                          className="text-foreground border border-foreground px-6 py-2 text-xs tracking-[0.2em] uppercase group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all min-h-11 flex items-center font-bold"
                          >
                          {t('ticket_btn')}
                          </button>
                      ) : (
                          <span className="text-muted-foreground/50 text-[10px] uppercase tracking-[0.2em] border border-white/10 px-4 py-2 cursor-not-allowed">
                              Coming Soon
                          </span>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* --- TBA SECTION --- */}
        <div className="mt-8 md:mt-12 text-center opacity-60 hover:opacity-100 transition-opacity duration-500">
           <div className="w-[1px] h-8 bg-accent/30 mx-auto mb-6"></div>
           
           <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-zinc-500">
             <GlitchText>{t('tba_title')}</GlitchText>
           </h3>
           
           <p className="text-xs tracking-[0.3em] uppercase text-zinc-600 mt-4 font-mono">
             {t('tba_subtitle')}
           </p>
        </div>
      </div>

      {/* --- MODAL FULL SCREEN --- */}
      {selectedScriptCode && (
        <div className="fixed inset-0 z-[9999] bg-black animate-in fade-in duration-300">
            
            {/* BOTÓN CERRAR (Misma posición que te gustó) */}
            <button 
              onClick={() => setSelectedScriptCode(null)}
              className="fixed top-24 right-6 z-[999999] bg-red-600 text-white p-3 rounded-full border border-white/20 shadow-2xl hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
              aria-label="Cerrar"
            >
              <X className="w-8 h-8 font-bold" /> 
            </button>

            {/* IFRAME */}
            <iframe
            title="Checkout Safe Frame"
            className="w-full h-full border-none block relative z-[9999]"
            srcDoc={`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                    <style>
                    html, body { height: 100%; width: 100%; margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: sans-serif; }
                    body { overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; }
                    
                    /* 🔥 AQUÍ ESTÁ EL CAMBIO: padding-top: 100px 🔥 */
                    .wrapper { 
                        width: 100%; 
                        max-width: 800px; 
                        margin: 0 auto; 
                        padding-top: 100px; /* <--- BAJADO PARA QUE SE VEA LA IMAGEN */
                        padding-bottom: 120px; 
                    }
                    
                    iframe { width: 100% !important; border: none !important; }
                    </style>
                </head>
                <body>
                    <div class="wrapper">${selectedScriptCode}</div>
                </body>
                </html>
            `}
            />
        </div>
      )}

    </section>
  )
}