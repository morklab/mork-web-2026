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

  // Bloquear scroll de la web de fondo, pero permitirlo en el modal
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
    {
      date: "2026.02.14",
      day: "SAT",
      artist: "REEKO b2b MANGLES",
      subtitle: `${t('night_with')} Lanna Family`,
      venue: "Wave Club",
      // Script oficial de Fourvenues
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/mork-lab/V4HB"></script>`, 
    },
    // Eventos ocultos...
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
          {events.map((event, index) => (
            <div key={index} className="border-b border-border">
              <div
                className="group block py-6 md:py-8 transition-colors hover:bg-secondary/30 relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleTicketClick(event.scriptTag)}
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
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleTicketClick(event.scriptTag);
                      }}
                      className="text-foreground border border-foreground px-6 py-2 text-xs tracking-[0.2em] uppercase group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all min-h-11 flex items-center font-bold"
                    >
                      {t('ticket_btn')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

      {/* --- MODAL NEGRO PURO (SCROLLABLE) --- */}
      {selectedScriptCode && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-0 md:p-4 animate-in fade-in duration-300">
          
          <div 
            // CAMBIO IMPORTANTE: 'overflow-y-auto' en lugar de 'overflow-hidden'
            // Esto permite que si la descripción es larga, puedas bajar con el dedo/ratón
            className="relative w-full md:max-w-4xl h-full md:h-[90vh] flex flex-col overflow-y-auto md:rounded-lg"
            style={{ 
              backgroundColor: '#000000', 
              border: 'none', 
              boxShadow: 'none'
            }}
          >
            
            {/* BOTÓN CERRAR (Fixed para que no desaparezca al hacer scroll, o absolute si prefieres que se mueva) */}
            {/* Al ponerlo absolute dentro de un contenedor con scroll, se moverá con el contenido. 
                Si la descripción es muy larga, estará arriba del todo. */}
            <button 
              onClick={() => setSelectedScriptCode(null)}
              className="absolute top-4 right-4 z-[60] bg-black/50 text-white p-2 rounded-full hover:bg-zinc-800 transition-all border border-white/10"
            >
              <X className="w-6 h-6" /> 
            </button>

            {/* CÁPSULA FOURVENUES */}
            <iframe
              title="Checkout Safe Frame"
              className="w-full border-none flex-1"
              // Ajustamos estilos internos para permitir crecimiento
              srcDoc={`
                <!DOCTYPE html>
                <html lang="es">
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                      body { 
                        margin: 0; 
                        padding: 0;
                        background-color: #000000; 
                        color: #ffffff; 
                        display: block; /* Cambio a block para flujo natural */
                        min-height: 100vh; 
                        font-family: sans-serif;
                      }
                      /* El iframe debe poder crecer lo que necesite (height: auto) */
                      iframe { width: 100% !important; height: auto !important; min-height: 100vh !important; border: none !important; display: block; }
                    </style>
                  </head>
                  <body>
                    ${selectedScriptCode}
                  </body>
                </html>
              `}
            />
          </div>
        </div>
      )}

    </section>
  )
}