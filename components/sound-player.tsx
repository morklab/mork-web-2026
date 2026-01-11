"use client"

import { useState, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function SoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    // 🔥 CAMBIO VITAL: z-[100] para que NUNCA se oculte bajo las cartas
    <div className="fixed bottom-8 left-8 z-[100]">
      {/* 1. EL REPRODUCTOR INVISIBLE */}
      <audio 
        ref={audioRef} 
        src="/ambient2.mp3" 
        loop 
      />

      {/* 2. EL BOTÓN VISIBLE */}
      <button
        onClick={togglePlay}
        className="bg-black text-white border border-white/20 rounded-full p-3 shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? (
          <Volume2 size={24} />
        ) : (
          <VolumeX size={24} />
        )}
      </button>
    </div>
  )
}