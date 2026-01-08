"use client"

import { useState } from "react"
import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"
import { X, Loader2 } from "lucide-react"
import clsx from "clsx"

// 👇 1. WIDGET "SANDBOX": Crea un entorno seguro para que el script funcione
function FourVenuesSandbox({ scriptSrc }: { scriptSrc: string }) {
  // Creamos un mini-HTML que solo contiene el script.
  // Así el script se ejecuta felizmente sin pelearse con React.
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: transparent; }
          /* Forzamos que lo que genere el script ocupe todo */
          iframe { width: 100% !important; height: 100% !important; border: none !important; }
        </style>
      </head>
      <body>
        <script src="${scriptSrc}"></script>
      </body>
    </html>
  `;

  return (
    <div className="bg-white w-full mt-6 mb-8 rounded-sm relative min-h-[600px] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-500 overflow-hidden">
      
      {/* IFRAME CON HTML INYECTADO (srcDoc) */}
      <iframe 
        srcDoc={htmlContent}
        width="100%" 
        height="100%" 
        className="relative z-20 w-full h-full min-h-[600px] border-none"
        allow="payment; clipboard-read; clipboard-write" // Permisos vitales
      />

      {/* Loader de fondo (visible mientras el script carga su contenido) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 opacity-60 bg-white pointer-events-none">
        <Loader2 className="animate-spin w-8 h-8 text-black mb-2" />
        <span className="text-[10px] uppercase tracking-widest text-black font-bold">Loading Tickets...</span>
      </div>
    </div>
  )
}

export function EventsSection() {
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
      // 👇 TU SCRIPT EXACTO (Solo la URL del src)
      fvScript: "https://www.fourvenues.com/assets/iframe/mork-lab/V4HB"
    },
    {
      date: "2025.03.07",
      day: "SAT",
      artist: "SOL ORTEGA",
      subtitle: `${t('night_with')} Sol Ortega`,
      venue: "Wave Club",
      ticketUrl: "#",
      fvScript: "" 
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

  const toggleTickets = (index: number) => {
    if (activeEventIndex === index) {
      setActiveEventIndex(null)
    } else {
      setActiveEventIndex(index)
    }
  }

  return (
    <section id="events" className="relative py-20 md:py-32 px-4 md:px-8 bg-background overflow-hidden">
      
      {/* Background */}
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

        <div className="border-t border-border">
          {events.map((event, index) => {
             const isOpen = activeEventIndex === index;

             return (
              <div key={index} className="flex flex-col border-b border-border">
                
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

                    {/* ARTISTA */}
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

                    {/* BOTÓN */}
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

                {/* 👇 AQUÍ USAMOS EL COMPONENTE SANDBOX */}
                {isOpen && event.fvScript && (
                  <div className="w-full max-w-5xl mx-auto px-4">
                    <FourVenuesSandbox scriptSrc={event.fvScript} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

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