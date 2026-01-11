"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"

// 👇 FECHA DE LANZAMIENTO: 12 de Enero de 2026 a las 18:00:00
const LAUNCH_DATE = "2026-01-12T18:00:00" 

export function EventsSection() {
  const t = useTranslations("Events")
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [isLocked, setIsLocked] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const calculateTimeLeft = () => {
      const difference = +new Date(LAUNCH_DATE) - +new Date()
      
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60))),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      } else {
        setIsLocked(false)
        return { hours: 0, minutes: 0, seconds: 0 }
      }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (num: number) => String(num).padStart(2, '0')

  // --- CSS MANUAL: COLOR OSCURO + MALA SEÑAL ---
  const glitchStyle = `
    @keyframes signal-noise {
      0% { transform: translate(0); }
      2% { transform: translate(-2px, 1px); }
      4% { transform: translate(2px, -1px); }
      6% { transform: translate(0); }
      90% { transform: translate(0); }
      92% { transform: translate(2px, 0); }
      94% { transform: translate(-2px, 0); }
      96% { transform: translate(0); }
      100% { transform: translate(0); }
    }
    .bad-signal {
      display: inline-block;
      position: relative;
      /* 👇 AQUÍ CAMBIAMOS EL COLOR A UNO MÁS OSCURO/MATE */
      color: #b91c1c; 
      animation: signal-noise 3s infinite linear;
    }
    .bad-signal::before, .bad-signal::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      /* 👇 MISMO COLOR OSCURO PARA LAS CAPAS DE RUIDO */
      color: #b91c1c; 
      opacity: 0.7;
    }
    .bad-signal::before {
      animation: signal-noise 4s infinite linear reverse;
      clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
      transform: translate(-2px, 0);
    }
    .bad-signal::after {
      animation: signal-noise 2s infinite linear;
      clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
      transform: translate(2px, 0);
    }
  `

  return (
    <section id="events" className="relative bg-black py-20 md:py-32 border-t border-white/10 min-h-[60vh] flex flex-col justify-center overflow-hidden">
      
      {/* Estilos inyectados */}
      <style>{glitchStyle}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
        
        {/* CABECERA */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 border-b border-white/10 pb-8">
          <div>
            <p className="text-zinc-500 text-xs tracking-[0.4em] uppercase mb-4 font-bold no-glow">
              {t('subtitle')}
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
              <GlitchText>{t('title')}</GlitchText>
            </h2>
          </div>
          <div className="hidden md:block">
             <p className="text-zinc-600 font-mono text-xs tracking-widest uppercase text-right">
                {isLocked ? t('status_locked') : t('tba_subtitle')}
             </p>
          </div>
        </div>

        {/* --- CONTENIDO DINÁMICO --- */}
        {isLocked ? (
          
          /* 🔒 MODO BLOQUEADO (CUENTA ATRÁS) */
          <div className="flex flex-col items-center justify-center py-10 md:py-20 animate-in fade-in zoom-in duration-1000">
            
            <p className="text-white/30 text-xs md:text-sm tracking-[0.5em] uppercase mb-6 font-bold">
              {t('countdown_label')}
            </p>

            {/* AQUÍ ESTÁ LA CLAVE:
               1. 'animate-pulse' en el DIV (para que lata despacio).
               2. 'bad-signal' en el H3 (para que tenga distorsión rápida).
            */}
            <div className="relative group animate-pulse">
              {isMounted ? (
                 <h3 
                   className="text-6xl md:text-9xl font-black tracking-tighter tabular-nums scale-y-110 bad-signal"
                   data-text={`${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`}
                 >
                   {`${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`}
                 </h3>
              ) : (
                 <h3 className="text-6xl md:text-9xl font-black text-red-700 tracking-tighter">
                   00:00:00
                 </h3>
              )}
            </div>

            <div className="mt-8 md:mt-12 max-w-md text-center">
               <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-4" />
               <p className="text-zinc-600 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] blink-effect">
                 {t('access_restricted')}
               </p>
            </div>
          </div>

        ) : (

          /* 🔓 MODO DESBLOQUEADO (TUS EVENTOS) */
          <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-bottom-10 fade-in duration-700">
            
            {/* EVENTO 1 */}
            <Link 
              href="/tickets/lanna"
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 border border-white/5 bg-zinc-900/20 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
                <span className="text-4xl md:text-5xl font-black text-white/20 group-hover:text-white transition-all duration-300 w-16">
                  01
                </span>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-red-500 border border-red-900/30 px-2 py-0.5 uppercase tracking-wider">
                        12 JAN
                      </span>
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold text-white uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {t('event1_title')}
                  </h3>
                  <p className="text-zinc-500 text-xs md:text-sm tracking-widest uppercase mt-1">
                    {t('event1_desc')}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-white border border-white/20 px-4 py-2 mt-4 md:mt-0 group-hover:bg-white group-hover:text-black transition-colors uppercase">
                 {t('ticket_btn')}
              </span>
            </Link>

             {/* INFO GENÉRICA TBA */}
             <div className="mt-8 text-center border-t border-white/5 pt-8">
                <p className="text-zinc-600 text-xs tracking-widest uppercase">{t('tba_title')}</p>
             </div>

          </div>
        )}

      </div>
    </section>
  )
}