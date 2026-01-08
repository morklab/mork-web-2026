"use client"

import { useState, useEffect } from "react"
import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"
import clsx from "clsx"
import { X } from "lucide-react" 

export function EventsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Aquí guardaremos el CÓDIGO HTML del script para inyectarlo
  const [selectedScriptCode, setSelectedScriptCode] = useState<string | null>(null)
  
  const t = useTranslations("Events")

  // Bloquear scroll de la web cuando el modal está abierto
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
      artist: "MANGLES b2b REEKO",
      subtitle: `${t('night_with')} Lanna Family`,
      venue: "Wave Club",
      // Pega aquí EL SCRIPT ENTERO tal cual te lo dan (con <script> y todo)
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/mork-lab/V4HB"></script>`, 
    },
    {
      date: "2025.03.07",
      day: "SAT",
      artist: "SOL ORTEGA",
      subtitle: `${t('night_with')} Sol Ortega`,
      venue: "Wave Club",
      // Si no tienes el script aún, deja null
      scriptTag: null, 
    },
    {
      date: "2025.04.18",
      day: "SAT",
      artist: "FREDDY K",
      subtitle: `${t('night_with')} Freddy K`,
      venue: "Wave Club",
      scriptTag: null, 
    },
    {
      date: "2025.05.9",
      day: "SAT",
      artist: "SETAOC MASS",
      subtitle: `${t('night_with')} Setaoc Mass`,
      venue: "Wave Club",
      scriptTag: null, 
    },
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

      {/* --- MODAL "CÁPSULA SEGURA" --- */}
      {selectedScriptCode && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-0 md:p-4 animate-in fade-in duration-200">
          
          <div className="relative w-full md:max-w-4xl h-full md:h-[90vh] bg-black border border-white/10 md:rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setSelectedScriptCode(null)}
              className="absolute top-4 right-4 z-50 bg-white/10 text-white p-2 rounded-full hover:bg-accent hover:text-black transition-all backdrop-blur-md"
            >
              <X className="w-6 h-6" /> 
            </button>

            {/* AQUÍ ESTÁ EL TRUCO: srcDoc */}
            {/* Creamos un mini-documento HTML limpio donde el script sí funciona */}
            <iframe
              title="Checkout Safe Frame"
              className="w-full h-full border-none bg-black"
              // Usamos srcDoc para crear un HTML al vuelo que contiene solo el script
              srcDoc={`
                <!DOCTYPE html>
                <html lang="es">
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                      body { margin: 0; padding: 0; background-color: #000; color: white; display: flex; justify-content: center; align-items: start; height: 100vh; font-family: sans-serif; }
                      /* Forzamos que el iframe generado por el script ocupe todo */
                      iframe { width: 100% !important; height: 100vh !important; border: none !important; }
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