"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import { X, Play, Instagram } from "lucide-react" 
import clsx from "clsx"
import { GlitchText } from "@/components/ui/glitch-text" 

// Tipo para manejar idiomas en los textos
type BilingualText = {
  en: string | React.ReactNode;
  es: string | React.ReactNode;
};

export default function U300Page() {
  const t = useTranslations("U300")
  const locale = useLocale();
  const lang = (locale === 'es' || locale.startsWith('es')) ? 'es' : 'en';

  // --- ESTADOS ---
  const [selectedScriptCode, setSelectedScriptCode] = useState<string | null>(null)
  const [showPastEvents, setShowPastEvents] = useState(false)
  const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(null)
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

  // --- LÓGICA DE FECHAS MEJORADA (Acepta YYYY.MM.DD y DD.MM.YYYY) ---
  const isEventPast = (dateStr: string) => {
    if (!today) return false;
    const normalizedDate = dateStr.replace(/-/g, '.');
    const parts = normalizedDate.split('.');
    
    if (parts.length === 3) {
      let eventDate;
      if (parts[0].length === 4) {
         // Formato antiguo: 2026.05.23
         eventDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      } else {
         // Formato nuevo: 23.05.2026
         eventDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      }
      eventDate.setHours(23, 59, 59); 
      return eventDate < today;
    }
    return false;
  }

  // --- LISTA DE EVENTOS U300 ---
  const u300Events = [
    {
      date: "2026.02.28",
      artist: "Adriana Lopez",
      concept: { en: "OPENING U300 - LIMITED CAPACITY", es: "APERTURA U300 - AFORO LIMITADO" },
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/u300/111C"></script>`,
      media: {
        aftermovie: "https://www.instagram.com/reel/DVb5oQ8DRe0/?igsh=MTNicXhzcnh0Zmcy",
        flyer: "/u300-flyer-001.jpg",
        igCarousel: "https://www.instagram.com/p/DVX1n5QDRmC/?igsh=OWdrZm9udWFoZ3Ri" 
      }
    },
    {
      date: "2026.03.14",
      artist: "TOMMY FOUR SEVEN",
      concept: { en: "ONLY FOR 300 CHOSEN ONES", es: "SOLO PARA 300 ELEGIDOS" },
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/u300/5IQ8"></script>`,
      media: {
        aftermovie: "https://www.instagram.com/reel/DWBkieHDVcw/?igsh=MW91N2thZWtua3M0cA==",
        flyer: "/u300-flyer-002.jpg",
        igCarousel: "https://www.instagram.com/u300palma?igsh=ajAzM240ZGk4Yjhp" 
      }
    },
    {
      date: "2026.03.28",
      artist: "Ø[Pase]",
      concept: { en: "ONLY FOR 300 CHOSEN ONES", es: "SOLO PARA 300 ELEGIDOS" },
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/u300/RLRN"></script>`,
      media: {
        aftermovie: "https://www.instagram.com/reel/DWju6dljTAh/?igsh=MXFvYzY2N3Y1MW5ubA==",
        flyer: "/u300-flyer-003.jpg",
        igCarousel: "https://www.instagram.com/u300palma?igsh=ajAzM240ZGk4Yjhp" 
      }
    },
    {
      date: "2026.04.11",
      artist: "MARCAL",
      concept: { en: "ONLY FOR 300 CHOSEN ONES", es: "SOLO PARA 300 ELEGIDOS" },
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/u300/2QUN"></script>`,
      media: {
        aftermovie: "https://www.instagram.com/reel/DXH2_d-DcB9/?igsh=MXJ4NW5lMTc1Y3Q5OQ==",
        flyer: "/u300-flyer-004.jpg",
        igCarousel: "https://www.instagram.com/u300palma?igsh=ajAzM240ZGk4Yjhp" 
      }
    },
    {
      date: "2026.05.02",
      artist: "PHARA",
      concept: { en: "ONLY FOR 300 CHOSEN ONES", es: "SOLO PARA 300 ELEGIDOS" },
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/u300/QJSF"></script>`,
      media: {
        aftermovie: "https://www.instagram.com/reel/DX9-WioNaDX/?igsh=c2VyNzBxbG9pMHVm",
        flyer: "/u300-flyer-005.jpg",
        igCarousel: "https://www.instagram.com/u300palma?igsh=ajAzM240ZGk4Yjhp" 
      }
    },
    {
      date: "2026.05.23",
      artist: "NASTIA REIGEL",
      concept: { en: "ONLY FOR 300 CHOSEN ONES", es: "SOLO PARA 300 ELEGIDOS" },
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/u300/LB4F"></script>`,
      media: {
        aftermovie: "https://www.instagram.com/mork.lab/", 
        flyer: "/u300-flyer-006.jpg",
        igCarousel: "https://www.instagram.com/u300palma?igsh=ajAzM240ZGk4Yjhp" 
      }
    },
    {
      date: "13.06.2026", // NUEVO FORMATO DE FECHA
      artist: "CONCEPTUAL",
      concept: { en: "ONLY FOR 300 CHOSEN ONES", es: "SOLO PARA 300 ELEGIDOS" },
      scriptTag: `<script src="https://www.fourvenues.com/assets/iframe/u300/WYQK"></script>`, // YA CON TU ID REAL
      media: {
        aftermovie: "https://www.instagram.com/u300palma/",
        flyer: "/u300-flyer-007.jpg",
        igCarousel: "https://www.instagram.com/u300palma?igsh=ajAzM240ZGk4Yjhp" 
      }
    }
  ]

  const upcomingEvents = u300Events.map((e, i) => ({...e, originalIndex: i})).filter(e => !isEventPast(e.date));
  const pastEvents = u300Events.map((e, i) => ({...e, originalIndex: i})).filter(e => isEventPast(e.date));

  const marqueeText = lang === 'es' 
    ? "// TRANSMISIÓN ENTRANTE // DISEÑANDO LOS PRÓXIMOS RITUALES // NUEVAS FECHAS TBA "
    : "// INCOMING TRANSMISSION // DESIGNING THE NEXT RITUALS // NEW DATES TBA ";
  const repeatedMarqueeText = Array(6).fill(marqueeText).join("\u00A0\u00A0\u00A0");

  return (
    <main className="min-h-screen bg-black text-zinc-500 font-mono relative overflow-hidden selection:bg-red-900 selection:text-white pb-32">
      
      <svg className="hidden">
        <defs>
          <filter id="frequency-wave">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="1" result="warp" />
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="4" in="SourceGraphic" in2="warp" />
          </filter>
          <filter id="marquee-glitch">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.1" numOctaves="1" result="warp" />
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceGraphic" in2="warp" />
          </filter>
        </defs>
      </svg>

      <style jsx global>{`
        @keyframes wave-slow { 0% { transform: translate(0,0) } 50% { transform: translate(2px, 3px) } 100% { transform: translate(0,0) } }
        @keyframes vibration-intense { 0% { transform: translate(0,0) skewX(0deg); } 20% { transform: translate(-2px, 1px) skewX(2deg); } 40% { transform: translate(2px, -2px) skewX(-2deg); } 60% { transform: translate(-1px, 2px) skewX(1deg); } 80% { transform: translate(1px, -1px) skewX(-1deg); } 100% { transform: translate(0,0) skewX(0deg); } }
        .frequency-text { filter: url(#frequency-wave); color: white; animation: wave-slow 8s ease-in-out infinite; transition: all 0.3s ease; }
        .group:hover .frequency-text { color: #dc2626; text-shadow: 0 0 15px rgba(220, 38, 38, 0.8); filter: url(#frequency-wave) blur(0.5px); animation: vibration-intense 0.2s infinite linear; }
        @keyframes global-glitch-skew { 0% { transform: translate(0,0) skewX(0deg); filter: blur(0px); opacity: 1; } 92% { transform: translate(0,0) skewX(0deg); filter: blur(0px); opacity: 1; } 93% { transform: translate(-10px, 5px) skewX(10deg); filter: blur(2px) drop-shadow(5px 0 0 red) drop-shadow(-5px 0 0 blue); opacity: 0.8; } 94% { transform: translate(10px, -5px) skewX(-10deg); filter: blur(1px) drop-shadow(-5px 0 0 red) drop-shadow(5px 0 0 blue); opacity: 0.9; } 95% { transform: translate(0,0) skewX(0deg); filter: blur(0px); opacity: 1; } 98% { transform: translate(5px, 2px) skewX(2deg); filter: blur(0.5px); opacity: 0.95; } 100% { transform: translate(0,0) skewX(0deg); filter: blur(0px); opacity: 1; } }
        @keyframes static-noise-anim { 0% { background-position: 0 0; opacity: 0.15; } 50% { background-position: 100px -50px; opacity: 0.25; } 100% { background-position: -100px 50px; opacity: 0.15; } }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: inline-block; animation: marquee 120s linear infinite; will-change: transform; }
        .whole-page-glitch-container { animation: global-glitch-skew 6s infinite linear; transform-origin: center; width: 100%; height: 100%; }
        .scanlines-overlay { background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.8) 51%); background-size: 100% 4px; pointer-events: none; }
        .static-noise-overlay { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); animation: static-noise-anim 0.1s infinite; pointer-events: none; mix-blend-mode: overlay; }
      `}</style>

      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 grayscale" style={{ backgroundImage: `url('/gallery-2.jpg')` }} />
      <div className="fixed inset-0 z-0 bg-black/50 pointer-events-none" />
      <div className="fixed inset-0 z-[60] scanlines-overlay opacity-30 pointer-events-none"></div>
      <div className="fixed inset-0 z-[61] static-noise-overlay opacity-20 pointer-events-none"></div>

      <div className="relative z-10 whole-page-glitch-container min-h-screen">
          <div className="fixed top-8 left-8 z-50 mix-blend-difference">
            <Link href="/" className="group cursor-pointer">
              <span className="text-[12px] uppercase tracking-[0.3em] text-red-600 animate-pulse drop-shadow-[0_0_8px_rgba(220,38,38,1)] transition-colors group-hover:text-red-500">
                 ← RETURN TO MØRK
              </span>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-start min-h-screen px-6 pt-24 md:pt-30">
            <div className="mb-8 mix-blend-overlay opacity-20 select-none pointer-events-none">
                <Image src="/u300tran.png" alt="U300 Background" width={350} height={140} className="object-contain w-[50vw] md:w-[350px]" />
            </div>

            {upcomingEvents.length > 0 && (
                <div className="w-full max-w-5xl border-t border-zinc-800">
                    {upcomingEvents.map((event) => {
                        const currentConcept = (event.concept as BilingualText)[lang];
                        return (
                            <div key={event.originalIndex} className="group block py-12 border-b border-zinc-800 transition-colors relative overflow-hidden px-4 cursor-pointer hover:bg-black/40" onClick={() => setSelectedScriptCode(event.scriptTag)}>
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex flex-col lg:flex-row justify-between items-center transition-all">
                                    <div className="flex flex-col gap-1 w-full lg:w-1/4 mb-8 lg:mb-0">
                                        <span className="text-xs tracking-[0.3em] font-bold text-red-600 animate-pulse">{event.date}</span>
                                    </div>
                                    <div className="flex flex-1 flex-col items-start lg:items-end justify-center w-full lg:w-auto gap-2">
                                        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold">{currentConcept}</span>
                                        <span className="text-4xl md:text-5xl lg:text-6xl uppercase font-black tracking-tighter leading-none text-left lg:text-right frequency-text will-change-transform">{event.artist}</span>
                                    </div>
                                    <div className="mt-10 lg:mt-0 lg:ml-12 w-full lg:w-auto transition-all duration-300">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setSelectedScriptCode(event.scriptTag); }}
                                            className="block w-full lg:w-auto text-center text-[10px] uppercase tracking-[0.2em] bg-transparent border border-white text-white font-bold px-8 py-4 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all cursor-pointer lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-4 lg:group-hover:translate-x-0"
                                        >
                                            {t('cta')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            <div className="w-full max-w-5xl mt-6 md:mt-8 mb-10 md:mb-14 text-center opacity-60 hover:opacity-100 transition-opacity duration-500">
                <div className="w-[1px] h-8 bg-red-600/50 mx-auto mb-6"></div>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-zinc-500">
                    <GlitchText>NEXT DATES TBA</GlitchText>
                </h3>
                <p className="text-xs tracking-[0.3em] uppercase text-zinc-600 mt-4 font-mono">U300 SERIES 2026</p>
            </div>

            <div className="relative w-full max-w-5xl border-y border-zinc-900 py-3 md:py-4 mb-16 overflow-hidden select-none group bg-black/40 backdrop-blur-sm">
                <div className="animate-marquee whitespace-nowrap flex items-center font-mono font-bold text-xs md:text-sm tracking-[0.3em] uppercase opacity-70 text-zinc-500 transition-all duration-300 group-hover:text-red-600 group-hover:opacity-100" style={{ filter: 'url(#marquee-glitch)' }}>
                    <span className="mx-4">{repeatedMarqueeText}</span>
                    <span className="mx-4">{repeatedMarqueeText}</span>
                </div>
            </div>

            {pastEvents.length > 0 && (
                <div className="w-full max-w-5xl border border-zinc-900/50 bg-black/10 transition-all duration-300">
                    <button onClick={() => setShowPastEvents(!showPastEvents)} className="w-full flex items-center justify-between py-5 px-4 md:py-6 md:px-8 cursor-pointer group hover:bg-black/40 transition-colors">
                        <div className="flex flex-col items-start gap-1">
                            <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold"><GlitchText color="#dc2626">{lang === 'es' ? 'ARCHIVO' : 'ARCHIVE'}</GlitchText></span>
                            <span className="font-black text-xl md:text-3xl uppercase tracking-tighter"><GlitchText color="#dc2626">{lang === 'es' ? 'Eventos Pasados' : 'Past Events'}</GlitchText></span>
                        </div>
                        <span className="text-zinc-600 text-3xl md:text-4xl font-light group-hover:text-red-600 transition-colors">{showPastEvents ? '−' : '+'}</span>
                    </button>

                    {showPastEvents && (
                        <div className="border-t border-zinc-900/50 px-4 md:px-8 pb-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            {pastEvents.map((event) => {
                                const currentConcept = (event.concept as BilingualText)[lang];
                                const isExpanded = expandedEventIndex === event.originalIndex;

                                return (
                                    <div key={event.originalIndex} className="group block py-12 relative border-b border-zinc-900/50 last:border-0 cursor-pointer" onClick={() => setExpandedEventIndex(isExpanded ? null : event.originalIndex)}>
                                        <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none">
                                            <div className="opacity-20 group-hover:opacity-10 transition-opacity border-[4px] md:border-[6px] border-red-600 px-6 py-2 md:px-8 md:py-4 -rotate-12">
                                                <span className="text-3xl md:text-6xl font-black text-red-600 tracking-[0.2em] uppercase whitespace-nowrap">{lang === 'es' ? 'ARCHIVADO' : 'ARCHIVED'}</span>
                                            </div>
                                        </div>

                                        <div className={clsx("flex flex-col lg:flex-row justify-between items-center transition-all duration-500 relative z-10", isExpanded ? "opacity-100 grayscale-0 blur-0" : "opacity-40 grayscale blur-[1px] group-hover:opacity-100 group-hover:grayscale-0 group-hover:blur-0")}>
                                            <div className="flex flex-col gap-1 w-full lg:w-1/4 mb-8 lg:mb-0">
                                                <span className="text-xs tracking-[0.3em] font-bold text-zinc-500 line-through decoration-zinc-500/50 group-hover:text-red-600 transition-colors">{event.date}</span>
                                            </div>
                                            <div className="flex flex-1 flex-col items-start lg:items-end justify-center w-full lg:w-auto gap-2">
                                                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-zinc-500 font-bold">{currentConcept}</span>
                                                <span className="text-4xl md:text-5xl lg:text-6xl uppercase font-black tracking-tighter leading-none text-left lg:text-right text-zinc-600 group-hover:text-zinc-300 transition-colors">{event.artist}</span>
                                            </div>
                                            <div className="mt-10 lg:mt-0 lg:ml-12 w-full lg:w-auto flex flex-col items-center gap-2 transition-all duration-300">
                                                <span className="block w-full lg:w-auto text-center text-[10px] uppercase tracking-[0.2em] border border-zinc-800 text-zinc-500 font-bold px-8 py-4 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                                                    {isExpanded ? (lang === 'es' ? 'CERRAR DATOS' : 'CLOSE DATA') : (lang === 'es' ? 'VER DATOS' : 'VIEW DATA')}
                                                </span>
                                            </div>
                                        </div>

                                        {isExpanded && event.media && (
                                            <div className="mt-8 pt-8 border-t border-red-900/30 animate-in slide-in-from-top-4 fade-in duration-500 relative z-20 cursor-default" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex gap-8 items-center justify-center md:justify-start">
                                                    <Link href={event.media.aftermovie} target="_blank" className="flex items-center gap-2 text-red-600 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                                                        <Play size={14} fill="currentColor" /> AFTERMOVIE
                                                    </Link>
                                                    <span className="text-zinc-800">|</span>
                                                    <Link href={event.media.igCarousel || "#"} target="_blank" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                                                        <Instagram size={14} /> VIEW ON IG
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}

            <div className="mt-32 text-center opacity-80 mix-blend-difference w-full">
                 <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 mb-2 font-mono">{t('footer_1')}</p>
                 <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 font-bold font-mono">{t('footer_2')}</p>
            </div>
          </div>
      </div>

      {selectedScriptCode && (
        <div className="fixed inset-0 z-[9999] bg-black animate-in fade-in duration-300 flex items-start justify-center overflow-y-auto">
            <button onClick={() => setSelectedScriptCode(null)} className="fixed top-6 right-6 z-[999999] bg-red-600 text-white p-3 rounded-full border border-white/20 shadow-2xl hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"><X className="w-8 h-8 font-bold" /></button>
            <iframe title="Checkout Safe Frame" className="w-full h-full border-none block relative z-[9999]" srcDoc={`<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><style>html, body { height: 100%; width: 100%; margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: sans-serif; } body { overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; } .wrapper { width: 100%; max-width: 800px; margin: 0 auto; padding-top: 100px; padding-bottom: 120px; } iframe { width: 100% !important; border: none !important; }</style></head><body><div class="wrapper">${selectedScriptCode}</div></body></html>`} />
        </div>
      )}
    </main>
  )
}