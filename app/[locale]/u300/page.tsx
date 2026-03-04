"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { X } from "lucide-react"
import clsx from "clsx"

// Tipo para manejar idiomas en los textos
type BilingualText = {
  en: string | React.ReactNode;
  es: string | React.ReactNode;
};

export default function U300Page() {
  const t = useTranslations("U300")
  const locale = useLocale();
  const lang = (locale === 'es' || locale.startsWith('es')) ? 'es' : 'en';

  // --- ESTADO PARA LOS TICKETS (Múltiples eventos) ---
  const [selectedScriptCode, setSelectedScriptCode] = useState<string | null>(null)
  
  // --- LÓGICA DE FECHAS ---
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, [])

  useEffect(() => {
    if (selectedScriptCode) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedScriptCode])

  // --- FUNCIÓN HELPER: SABER SI EL EVENTO YA PASÓ ---
  const isEventPast = (dateStr: string) => {
    if (!today) return false;
    const formattedDate = dateStr.replace(/\./g, '-');
    const eventDate = new Date(formattedDate);
    // Ajustamos horas al final del día
    eventDate.setHours(23, 59, 59); 
    return eventDate < today;
  }

  // --- LISTA DE EVENTOS U300 ---
  const u300Events = [
    // [0] EVENTO PASADO: ADRIANA LOPEZ
    {
      date: "2026.02.28",
      artist: "Adriana Lopez",
      concept: { en: "OPENING U300 - LIMITED CAPACITY", es: "APERTURA U300 - AFORO LIMITADO" },
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/u300/111C"></script>`
    },
    // [1] PRÓXIMO EVENTO: TOMMY FOUR SEVEN
    {
      date: "2026.03.14",
      artist: "TOMMY FOUR SEVEN",
      concept: { en: "ONLY FOR 300 CHOSEN ONES", es: "SOLO PARA 300 ELEGIDOS" },
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/u300/5IQ8"></script>`
    }
  ]

  return (
    <main className="min-h-screen bg-black text-zinc-500 font-mono relative overflow-hidden selection:bg-red-900 selection:text-white pb-32">
      
      {/* --- DEFINICIÓN DEL FILTRO SVG (INVISIBLE) --- */}
      <svg className="hidden">
        <defs>
          <filter id="frequency-wave">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="1" result="warp" />
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="4" in="SourceGraphic" in2="warp" />
          </filter>
        </defs>
      </svg>

      {/* --- ESTILOS CSS GLOBALES --- */}
      <style jsx global>{`
        /* Efecto Texto Líquido */
        @keyframes wave-slow {
            0% { transform: translate(0,0) }
            50% { transform: translate(2px, 3px) }
            100% { transform: translate(0,0) }
        }
        @keyframes vibration-intense {
            0% { transform: translate(0,0) skewX(0deg); }
            20% { transform: translate(-2px, 1px) skewX(2deg); }
            40% { transform: translate(2px, -2px) skewX(-2deg); }
            60% { transform: translate(-1px, 2px) skewX(1deg); }
            80% { transform: translate(1px, -1px) skewX(-1deg); }
            100% { transform: translate(0,0) skewX(0deg); }
        }
        .frequency-text {
           filter: url(#frequency-wave);
           color: white;
           animation: wave-slow 8s ease-in-out infinite;
           transition: all 0.3s ease;
        }
        .group:hover .frequency-text {
            color: #dc2626; 
            text-shadow: 0 0 15px rgba(220, 38, 38, 0.8);
            filter: url(#frequency-wave) blur(0.5px);
            animation: vibration-intense 0.2s infinite linear;
        }

        /* Glitch Global */
        @keyframes global-glitch-skew {
            0% { transform: translate(0,0) skewX(0deg); filter: blur(0px); opacity: 1; }
            92% { transform: translate(0,0) skewX(0deg); filter: blur(0px); opacity: 1; }
            93% { transform: translate(-10px, 5px) skewX(10deg); filter: blur(2px) drop-shadow(5px 0 0 red) drop-shadow(-5px 0 0 blue); opacity: 0.8; }
            94% { transform: translate(10px, -5px) skewX(-10deg); filter: blur(1px) drop-shadow(-5px 0 0 red) drop-shadow(5px 0 0 blue); opacity: 0.9; }
            95% { transform: translate(0,0) skewX(0deg); filter: blur(0px); opacity: 1; }
            98% { transform: translate(5px, 2px) skewX(2deg); filter: blur(0.5px); opacity: 0.95; }
            100% { transform: translate(0,0) skewX(0deg); filter: blur(0px); opacity: 1; }
        }

        @keyframes static-noise-anim {
            0% { background-position: 0 0; opacity: 0.15; }
            50% { background-position: 100px -50px; opacity: 0.25; }
            100% { background-position: -100px 50px; opacity: 0.15; }
        }

        .whole-page-glitch-container {
            animation: global-glitch-skew 6s infinite linear;
            transform-origin: center;
            width: 100%;
            height: 100%;
        }

        .scanlines-overlay {
            background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.8) 51%);
            background-size: 100% 4px;
            pointer-events: none;
        }

        .static-noise-overlay {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            animation: static-noise-anim 0.1s infinite;
            pointer-events: none;
            mix-blend-mode: overlay;
        }
      `}</style>

      {/* --- CAPAS DE FONDO FIJAS --- */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 grayscale"
        style={{ backgroundImage: `url('/gallery-2.jpg')` }}
      />
      <div className="fixed inset-0 z-0 bg-black/50 pointer-events-none" />

      {/* --- CAPAS DE INTERFERENCIA GLOBAL --- */}
      <div className="fixed inset-0 z-[60] scanlines-overlay opacity-30 pointer-events-none"></div>
      <div className="fixed inset-0 z-[61] static-noise-overlay opacity-20 pointer-events-none"></div>

      {/* --- CONTENEDOR PRINCIPAL CON GLITCH --- */}
      <div className="relative z-10 whole-page-glitch-container min-h-screen">

          {/* BOTÓN VOLVER */}
          <div className="fixed top-8 left-8 z-50 mix-blend-difference">
            <Link href="/" className="group cursor-pointer">
              <span className="text-[12px] uppercase tracking-[0.3em] text-red-600 animate-pulse drop-shadow-[0_0_8px_rgba(220,38,38,1)] transition-colors group-hover:text-red-500">
                 ← RETURN TO MØRK
              </span>
            </Link>
          </div>

          {/* CONTENIDO CENTRAL */}
          <div className="flex flex-col items-center justify-start min-h-screen px-6 pt-32 md:pt-40">
            
            {/* LOGO DE FONDO (U300) */}
            <div className="mb-20 mix-blend-overlay opacity-20 select-none pointer-events-none">
                <Image 
                    src="/u300tran.png" 
                    alt="U300 Background"
                    width={500} 
                    height={200}
                    className="object-contain w-[70vw] md:w-[500px]" 
                />
            </div>

            {/* --- LISTA DINÁMICA DE EVENTOS U300 --- */}
            <div className="w-full max-w-5xl border-t border-zinc-800">
                {u300Events.map((event, index) => {
                    const isPast = isEventPast(event.date);
                    const currentConcept = (event.concept as BilingualText)[lang];

                    // CLASES DEL CONTENEDOR PRINCIPAL
                    const containerClasses = clsx(
                        "group block py-12 border-b border-zinc-800 transition-colors relative overflow-hidden px-4",
                        isPast 
                            ? "pointer-events-none select-none" 
                            : "cursor-pointer hover:bg-black/40"
                    );

                    // CLASES DEL CONTENIDO INTERNO (Aquí aplicamos el gris al contenido pasado)
                    const contentClasses = clsx(
                        "flex flex-col lg:flex-row justify-between items-center transition-all",
                        isPast ? "opacity-30 grayscale blur-[1px]" : ""
                    );

                    return (
                        <div key={index} className={containerClasses} onClick={() => !isPast && setSelectedScriptCode(event.scriptTag)}>
                            
                            {/* Barra roja lateral (Solo activa en el hover de los eventos futuros) */}
                            {!isPast && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                            
                            {/* --- SELLO "ARCHIVADO" --- */}
                            {isPast && (
                                <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none overflow-hidden">
                                    <div className="opacity-40 border-[4px] md:border-[6px] border-red-600 px-6 py-2 md:px-8 md:py-4 -rotate-12 backdrop-blur-none">
                                        <span className="text-3xl md:text-6xl font-black text-red-600 tracking-[0.2em] uppercase whitespace-nowrap">
                                            {lang === 'es' ? 'ARCHIVADO' : 'ARCHIVED'}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* --- CONTENIDO DEL EVENTO --- */}
                            <div className={contentClasses}>
                                
                                {/* FECHA */}
                                <div className="flex flex-col gap-1 w-full lg:w-1/4 mb-8 lg:mb-0">
                                    <span className={clsx("text-xs tracking-[0.3em] font-bold", isPast ? "text-zinc-500 line-through" : "text-red-600 animate-pulse")}>
                                        {event.date}
                                    </span>
                                </div>

                                {/* ARTISTA Y CONCEPTO */}
                                <div className="flex flex-1 flex-col items-start lg:items-end justify-center w-full lg:w-auto gap-2">
                                    <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold">
                                        {currentConcept}
                                    </span>
                                    
                                    <span className={clsx("text-4xl md:text-5xl lg:text-6xl uppercase font-black tracking-tighter leading-none text-left lg:text-right", isPast ? "text-zinc-500" : "frequency-text will-change-transform")}>
                                        {event.artist}
                                    </span>
                                </div>

                                {/* BOTÓN TICKETS */}
                                <div className="mt-10 lg:mt-0 lg:ml-12 w-full lg:w-auto transition-all duration-300">
                                    {isPast ? (
                                        <span className="block w-full lg:w-auto text-center text-[10px] uppercase tracking-[0.2em] border border-zinc-800 text-zinc-600 font-bold px-8 py-4">
                                            {lang === 'es' ? 'FINALIZADO' : 'ENDED'}
                                        </span>
                                    ) : (
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setSelectedScriptCode(event.scriptTag); }}
                                            className="block w-full lg:w-auto text-center text-[10px] uppercase tracking-[0.2em] bg-transparent border border-white text-white font-bold px-8 py-4 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all cursor-pointer lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-4 lg:group-hover:translate-x-0"
                                        >
                                            {t('cta')}
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>

            {/* FOOTER */}
            <div className="mt-32 text-center opacity-80 mix-blend-difference">
                 <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 mb-2 font-mono">
                    {t('footer_1')}
                 </p>
                 <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-bold font-mono">
                    {t('footer_2')}
                 </p>
            </div>
          </div>
      </div>

      {/* --- POPUP DEL IFRAME (TICKETS) --- */}
      {selectedScriptCode && (
        <div className="fixed inset-0 z-[9999] bg-black animate-in fade-in duration-300 flex items-start justify-center overflow-y-auto">
            
            <button 
              onClick={() => setSelectedScriptCode(null)}
              className="fixed top-6 right-6 z-[999999] bg-red-600 text-white p-3 rounded-full border border-white/20 shadow-2xl hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
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
                    html, body { 
                        height: auto !important;
                        min-height: auto !important;
                        margin: 0; 
                        padding: 0; 
                        background-color: #000000; 
                        color: #ffffff; 
                        font-family: sans-serif; 
                    }
                    body { overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; }
                    .wrapper { 
                        width: 100%; 
                        max-width: 800px; 
                        margin: 0 auto; 
                        padding-top: 40px;
                        padding-bottom: 80px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        gap: 0;
                        height: auto !important;
                    }
                    .wrapper > * { flex-grow: 0 !important; margin-bottom: 20px; }
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

    </main>
  )
}