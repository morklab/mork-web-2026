"use client"

import { useState, useEffect } from "react"
import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations, useLocale } from "next-intl"
import clsx from "clsx"
import { X } from "lucide-react" 

type BilingualText = {
  en: string;
  es: string;
};

// 1. Definimos las fechas aquí arriba para usarlas tanto en la lógica como en el diseño
const REVEAL_DATES: Record<number, number> = {
    1: new Date("2026-01-20T21:00:00").getTime(), // Evento 7 Marzo -> Reveal 20 Ene
    2: new Date("2026-01-27T18:00:00").getTime(), // Evento 18 Abril -> Reveal 27 Ene
    3: new Date("2026-02-03T18:00:00").getTime(), // Evento 9 Mayo -> Reveal 3 Feb
}

export function EventsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedScriptCode, setSelectedScriptCode] = useState<string | null>(null)
  
  // Estado de las cuentas atrás
  const [countdowns, setCountdowns] = useState<Record<number, string>>({})
  // Estado para saber si ya hemos calculado el tiempo inicial (evita el parpadeo)
  const [isCalculated, setIsCalculated] = useState(false)
  
  const t = useTranslations("Events")
  const locale = useLocale();
  const lang = (locale === 'es' || locale.startsWith('es')) ? 'es' : 'en';

  // --- LÓGICA DE TEMPORIZADORES ---
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const newCountdowns: Record<number, string> = {}

      Object.entries(REVEAL_DATES).forEach(([key, targetTime]) => {
          const index = parseInt(key)
          const distance = targetTime - now

          if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
            
            const pad = (n: number) => n.toString().padStart(2, '0')

            // Formato Inteligente
            if (days > 0) {
               newCountdowns[index] = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m`
            } else {
               newCountdowns[index] = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
            }
          }
      })
      
      setCountdowns(newCountdowns)
      setIsCalculated(true) // Marcamos que ya hemos hecho el primer cálculo
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Bloquear scroll
  useEffect(() => {
    if (selectedScriptCode) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedScriptCode])

  // --- EVENTOS ---
  const events = [
    // [0]
    {
      date: "2026.02.14",
      day: "SAT",
      title: { en: "REEKO vs MANGLES", es: "REEKO vs MANGLES" }, 
      subtitle: { en: `${t('night_with')} Lanna Family`, es: `${t('night_with')} Lanna Family` }, 
      venue: "Wave Club",
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/mork-lab/V4HB"></script>`, 
      hasTicket: true
    },
    // [1]
    {
      date: "2026.03.07",
      day: "SAT",
      title: { en: "ARTIST TBA", es: "ARTISTA TBA" }, 
      subtitle: { en: "WILL BE REVEALED ON JANUARY 20 AT 6:00 PM", es: "SE REVELARÁ EL 20 DE ENERO A LAS 18:00" }, 
      venue: "Wave Club",
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/mork-lab/PIDD"></script>`,
      hasTicket: true
    },
    // [2]
    {
      date: "2026.04.18",
      day: "SAT",
      title: { en: "ARTIST TBA", es: "ARTISTA TBA" }, 
      subtitle: { en: "WILL BE REVEALED ON JANUARY 27 AT 6:00 PM", es: "SE REVELARÁ EL 27 DE ENERO A LAS 18:00" }, 
      venue: "Wave Club",
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/mork-lab/1WZ7"></script>`, 
      hasTicket: true
    },
    // [3]
    {
      date: "2026.05.09",
      day: "SAT",
      title: { en: "ARTIST TBA", es: "ARTISTA TBA" }, 
      subtitle: { en: "WILL BE REVEALED ON FEBRUARY 3 AT 6:00 PM", es: "SE REVELARÁ EL 3 DE FEBRERO A LAS 18:00" }, 
      venue: "Wave Club",
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/mork-lab/2AJ1"></script>`, 
      hasTicket: true
    }
  ]

  const handleTicketClick = (script: string | null) => {
    if (!script) return;
    setSelectedScriptCode(script)
  }

  return (
    <section id="events" className="relative py-20 md:py-32 px-4 md:px-8 bg-background overflow-hidden">
      
      {/* Fondo */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/colin-detras.JPEG')`, filter: 'grayscale(100%)', opacity: 0.4 }}
      />
      <div className="absolute right-0 bottom-0 bg-gradient-to-b from-background/70 via-background/80 to-background" style={{ left: "auto", top: "auto" }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-bold no-glow">{t('subtitle')}</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-foreground">
            <GlitchText>{t('title')}</GlitchText>
          </h2>
        </div>

        {/* Lista */}
        <div className="border-t border-border">
          {events.map((event, index) => {
            
            const isHovered = hoveredIndex === index && event.hasTicket;
            const isFirstEvent = index === 0;
            
            const currentTitle = (event.title as BilingualText)[lang];
            let currentSubtitle = (event.subtitle as BilingualText)[lang];

            // --- LÓGICA DE VISUALIZACIÓN ---
            // 1. ¿Es este un evento con cuenta atrás? (Lo miramos en la constante global)
            const isSpecialEvent = REVEAL_DATES.hasOwnProperty(index);
            
            // 2. ¿Tenemos el tiempo calculado?
            const timer = countdowns[index];
            const isCountdownActive = !!timer;

            // 3. PREVENCIÓN DE PARPADEO:
            // Si es un evento especial PERO aún no hemos calculado los tiempos (carga inicial/cambio idioma),
            // forzamos que el texto esté vacío o invisible para no mostrar el gris por defecto.
            let shouldHideText = false;

            if (isSpecialEvent) {
                if (isCountdownActive) {
                    // Ya tenemos tiempo -> Mostramos el rojo
                    const prefix = lang === 'es' ? "SE REVELA EN: " : "REVEAL IN: ";
                    currentSubtitle = `${prefix}${timer}`;
                } else if (!isCalculated) {
                    // Aún estamos cargando -> Ocultamos para que no salga el gris
                    shouldHideText = true;
                }
                // Si isCalculated es true y no hay timer, es que la fecha pasó -> Se muestra el gris normal.
            }

            // Colores
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
                    
                    {/* INFO */}
                    <div className="flex-1">
                      <h3 className={clsx("text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[0.05em] uppercase transition-colors", titleColorClass)}>
                        {isFirstEvent ? currentTitle : <GlitchText>{currentTitle}</GlitchText>}
                      </h3>
                      
                      {/* SUBTÍTULO / CUENTA ATRÁS */}
                      <p className={clsx(
                        "text-sm tracking-wider mt-1 uppercase font-bold tabular-nums transition-all",
                        // Si debemos ocultar (cargando), ponemos invisible
                        shouldHideText && "invisible opacity-0",
                        // Si tenemos cuenta activa, ponemos rojo y pálpito. Si no, gris normal.
                        isCountdownActive 
                          ? "text-red-600 animate-pulse drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                          : "text-muted-foreground"
                      )}>
                          {currentSubtitle}
                      </p>
                    </div>

                    {/* BOTÓN */}
                    <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 mt-4 md:mt-0">
                      <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase hidden md:block">{event.venue}</span>
                      
                      {event.hasTicket ? (
                          <button 
                          onClick={(e) => { e.stopPropagation(); handleTicketClick(event.scriptTag); }}
                          className="text-foreground border border-foreground px-6 py-2 text-xs tracking-[0.2em] uppercase group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all min-h-11 flex items-center font-bold"
                          >
                          {t('ticket_btn')}
                          </button>
                      ) : (
                          <span className="text-muted-foreground/50 text-[10px] uppercase tracking-[0.2em] border border-white/10 px-4 py-2 cursor-not-allowed">
                              {t('coming_soon')}
                          </span>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* TBA Footer */}
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

      {/* MODAL CHECKOUT */}
      {selectedScriptCode && (
        <div className="fixed inset-0 z-[9999] bg-black animate-in fade-in duration-300">
            <button 
              onClick={() => setSelectedScriptCode(null)}
              className="fixed top-24 right-6 z-[999999] bg-red-600 text-white p-3 rounded-full border border-white/20 shadow-2xl hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
            >
              <X className="w-8 h-8 font-bold" /> 
            </button>
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
                    .wrapper { width: 100%; max-width: 800px; margin: 0 auto; padding-top: 100px; padding-bottom: 120px; }
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