"use client"

import { useState, useEffect, useRef } from "react"
import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"
import clsx from "clsx"
import { X } from "lucide-react" 

// --- COMPONENTE AUXILIAR PARA CARGAR EL SCRIPT DE FOURVENUES ---
// Este componente se encarga de inyectar el script oficial dentro del modal
const FourvenuesWidget = ({ scriptUrl }: { scriptUrl: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Limpiamos por si acaso
      containerRef.current.innerHTML = "";
      
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      // Esto asegura que el script sepa dónde pintarse
      containerRef.current.appendChild(script);
    }
  }, [scriptUrl]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export function EventsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Ahora guardamos la URL DEL SCRIPT (no la del iframe)
  const [selectedScriptUrl, setSelectedScriptUrl] = useState<string | null>(null)
  
  const t = useTranslations("Events")

  // Bloquear scroll
  useEffect(() => {
    if (selectedScriptUrl) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedScriptUrl])

  // --- TUS EVENTOS ---
  const events = [
    {
      date: "2026.02.14",
      day: "SAT",
      artist: "MANGLES b2b REEKO",
      subtitle: `${t('night_with')} Lanna Family`,
      venue: "Wave Club",
      // PON AQUÍ EL ENLACE DEL SCRIPT COMPLETO que te da Fourvenues
      // (El que termina en .js o no tiene extensión pero es del script tag)
      ticketUrl: "https://www.fourvenues.com/assets/iframe/mork-lab/V4HB", 
    },
    {
      date: "2025.03.07",
      day: "SAT",
      artist: "SOL ORTEGA",
      subtitle: `${t('night_with')} Sol Ortega`,
      venue: "Wave Club",
      ticketUrl: "#", 
    },
    {
      date: "2025.04.18",
      day: "SAT",
      artist: "FREDDY K",
      subtitle: `${t('night_with')} Freddy K`,
      venue: "Wave Club",
      ticketUrl: "#", 
    },
    {
      date: "2025.05.9",
      day: "SAT",
      artist: "SETAOC MASS",
      subtitle: `${t('night_with')} Setaoc Mass`,
      venue: "Wave Club",
      ticketUrl: "#", 
    },
  ]

  const handleTicketClick = (url: string) => {
    if (url === "#" || !url) return;
    setSelectedScriptUrl(url)
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
                onClick={() => handleTicketClick(event.ticketUrl)}
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
                        handleTicketClick(event.ticketUrl);
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

      {/* --- MODAL CON SCRIPT OFICIAL --- */}
      {selectedScriptUrl && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-0 md:p-4 animate-in fade-in duration-200">
          
          <div className="relative w-full md:max-w-4xl h-full md:h-[90vh] bg-black border border-white/10 md:rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelectedScriptUrl(null)}
              className="absolute top-4 right-4 z-50 bg-white/10 text-white p-2 rounded-full hover:bg-accent hover:text-black transition-all backdrop-blur-md"
            >
              <X className="w-6 h-6" /> 
            </button>

            {/* Aquí inyectamos el SCRIPT, no un iframe manual */}
            <div className="flex-1 w-full h-full bg-black relative p-4 overflow-y-auto"> 
               <FourvenuesWidget scriptUrl={selectedScriptUrl} />
            </div>
          </div>
        </div>
      )}

    </section>
  )
}