"use client"

import { useState } from "react"
import { Play, X, Radio } from "lucide-react"
import { GlitchText } from "@/components/ui/glitch-text"
import clsx from "clsx"
import { useTranslations } from "next-intl"

const podcasts = [
  {
    number: "001",
    title: "MØRK SERIES 001",
    artist: "MZDZ",
    description: "Groove textures. Recorded live at Wave Club.",
    duration: "1:50:49",
    url: "https://www.mixcloud.com/M%C3%B8rk_lab/m%C3%B8rk-podcast-001-mzdz/", 
  },
  {
    number: "002",
    title: "MØRK SERIES 002",
    artist: "ALEX LOSA",
    description: "Hypnotic layers and deep atmospheres.",
    duration: "1:15:43",
    url: "https://www.mixcloud.com/M%C3%B8rk_lab/alex-losa-warm-up-m%C3%B8rk-07jun25/", 
  },
]

export function SoundSection() {
  const [activeTrack, setActiveTrack] = useState<number | null>(null)
  
  // Conectamos con las traducciones "Sound"
  const t = useTranslations("Sound")

  const toggleTrack = (index: number) => {
    if (activeTrack === index) {
      setActiveTrack(null)
    } else {
      setActiveTrack(index)
    }
  }

  return (
    <section id="sound" className="py-20 md:py-32 px-4 md:px-8 bg-card border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 md:mb-24">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-bold no-glow">
            {t('subtitle')}
          </p>
          {/* 🔥 TÍTULO UNIFICADO: Igual que en Manifiesto y Eventos */}
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-foreground">
            <GlitchText>{t('title')}</GlitchText>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base tracking-wider mt-6 max-w-xl">
            {t('text')}
          </p>
        </div>

        {/* LISTA DE PODCASTS */}
        <div className="border-t border-border">
          {podcasts.map((podcast, index) => {
            const isActive = activeTrack === index;

            return (
              <div key={index} className="border-b border-border bg-card">
                
                {/* FILA CLICKABLE */}
                <div 
                  onClick={() => toggleTrack(index)}
                  className={clsx(
                    "group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-6 md:py-8 cursor-pointer transition-all duration-300",
                    isActive ? "bg-zinc-900/50" : "hover:bg-zinc-900/30"
                  )}
                >
                  {/* BOTÓN PLAY / CERRAR */}
                  <div className="flex items-center gap-4">
                    <div className={clsx(
                        "w-12 h-12 md:w-16 md:h-16 border flex items-center justify-center transition-all duration-300 min-h-11 min-w-11",
                        isActive ? "bg-accent border-accent" : "border-foreground/30 group-hover:border-accent"
                    )}>
                      {isActive ? (
                        <X className="text-white w-5 h-5" />
                      ) : (
                        <Play className="text-foreground w-4 h-4 md:w-5 md:h-5 ml-1 group-hover:text-accent transition-colors" fill="currentColor" />
                      )}
                    </div>
                    
                    <span className="text-muted-foreground/50 text-xs tracking-[0.2em] font-mono">
                      #{podcast.number}
                    </span>
                  </div>

                  {/* INFO */}
                  <div className="flex-1 pl-16 md:pl-0 mt-[-2rem] md:mt-0">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-1">
                        <h3 className={clsx(
                            "text-lg md:text-xl font-black tracking-[0.05em] uppercase truncate transition-colors",
                            isActive ? "text-accent" : "text-foreground group-hover:text-white"
                        )}>
                        {podcast.title}
                        </h3>
                        <span className="hidden md:inline text-muted-foreground text-xs">—</span>
                        <p className="text-white text-xs md:text-sm font-bold tracking-[0.15em] uppercase">
                            {podcast.artist}
                        </p>
                    </div>
                    <p className="text-muted-foreground text-xs tracking-wide truncate max-w-md">
                        {podcast.description}
                    </p>
                  </div>

                  {/* DURACIÓN */}
                  <div className="flex items-center justify-end gap-6 pl-16 md:pl-0">
                    <span className="text-muted-foreground text-xs tracking-[0.2em] font-mono">
                        {podcast.duration}
                    </span>
                  </div>
                </div>

                {/* REPRODUCTOR EMBEBIDO */}
                {isActive && (
                  <div className="w-full bg-black border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
                    <iframe
                      width="100%"
                      height="60" 
                      src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=0&feed=${encodeURIComponent(podcast.url)}`}
                      frameBorder="0"
                      allow="autoplay"
                      className="block"
                    ></iframe>
                  </div>
                )}

              </div>
            )
          })}
        </div>

        {/* LINKS EXTERNOS */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.mixcloud.com/Mørk_lab/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-white/20 text-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all min-h-11 group"
          >
            <Radio size={16} className="group-hover:text-red-600 transition-colors" />
            {t('btn_mixcloud')}
          </a>
        </div>
      </div>
    </section>
  )
}