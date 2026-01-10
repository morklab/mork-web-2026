"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react" // 👈 Importamos las flechas
import { GlitchText } from "@/components/ui/glitch-text"
import clsx from "clsx"
import { useTranslations } from "next-intl"

export function MediaSection() {
  // AHORA GUARDAMOS EL ÍNDICE (NÚMERO) EN LUGAR DE LA URL
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const t = useTranslations("Media")

  // --- 18 FOTOS CARGADAS ---
  const photos = [
    { id: 1, src: "/gallery-1.jpg", alt: "MØRK Experience 01" },
    { id: 2, src: "/gallery-2.jpg", alt: "MØRK Experience 02" },
    { id: 3, src: "/gallery-3.jpg", alt: "MØRK Experience 03" },
    { id: 4, src: "/gallery-4.jpg", alt: "MØRK Experience 04" },
    { id: 5, src: "/gallery-5.jpg", alt: "MØRK Experience 05" },
    { id: 6, src: "/gallery-6.jpg", alt: "MØRK Experience 06" },
    { id: 7, src: "/gallery-7.jpg", alt: "MØRK Experience 07" },
    { id: 8, src: "/gallery-8.jpg", alt: "MØRK Experience 08" },
    { id: 9, src: "/gallery-9.jpg", alt: "MØRK Experience 09" },
    { id: 10, src: "/gallery-10.jpg", alt: "MØRK Experience 10" },
    { id: 11, src: "/gallery-11.jpg", alt: "MØRK Experience 11" },
    { id: 12, src: "/gallery-12.jpg", alt: "MØRK Experience 12" },
    { id: 13, src: "/gallery-13.jpg", alt: "MØRK Experience 13" },
    { id: 14, src: "/gallery-14.jpg", alt: "MØRK Experience 14" },
    { id: 15, src: "/gallery-15.jpg", alt: "MØRK Experience 15" },
    { id: 16, src: "/gallery-16.jpg", alt: "MØRK Experience 16" },
    { id: 17, src: "/gallery-17.jpg", alt: "MØRK Experience 17" },
    { id: 18, src: "/gallery-18.jpg", alt: "MØRK Experience 18" },
  ]

  // --- FUNCIONES DE NAVEGACIÓN ---
  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % photos.length))
  }, [photos.length])

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + photos.length) % photos.length))
  }, [photos.length])

  // --- ESCUCHAR TECLADO (ESCAPE + FLECHAS) ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null)
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
    }

    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, handleNext, handlePrev])

  return (
    <section id="media" className="py-20 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
      
      {/* --- FONDO TIPO HERO --- */}
      <div className="absolute inset-0 z-0">
          <Image
              src="/FONDO_PARA_ARCHIVE_YN.jpg"
              alt="Archive Background"
              fill
              className="object-cover opacity-90 grayscale" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 z-10" />
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Contenedor principal */}
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* CABECERA */}
        <div className="mb-10 md:mb-16 flex flex-col items-center text-center px-4">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-bold no-glow text-red-600 drop-shadow-lg">
            {t('subtitle')}
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white drop-shadow-lg">
            <GlitchText>{t('title')}</GlitchText>
          </h2>
        </div>

        {/* --- CARRUSEL DE FOTOS --- */}
        <div className="relative w-full mb-8">
            <div className={clsx(
                "flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide items-center w-full",
                "px-6", 
                "md:px-10"
            )}>
                {/* AHORA USAMOS EL INDEX EN EL MAP */}
                {photos.map((photo, index) => (
                    <div 
                        key={photo.id} 
                        className={clsx(
                            "relative flex-shrink-0 snap-center group cursor-pointer overflow-hidden border border-white/10 transition-all duration-500 bg-zinc-900/50 backdrop-blur-sm",
                            "w-[70vw] aspect-[4/3]", 
                            "md:w-[400px]", 
                            "hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                        )}
                        // Al hacer click, guardamos el índice (0, 1, 2...)
                        onClick={() => setSelectedIndex(index)}
                    >
                        <Image 
                            src={photo.src || "/placeholder.svg"} 
                            alt={photo.alt} 
                            fill 
                            className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-95"
                        />
                        
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <Maximize2 className="text-white drop-shadow-lg" size={32} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- MENSAJE DE DISCLAIMER --- */}
        <div className="flex justify-center px-6 text-center relative z-20">
            <p className="text-red-600 text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono max-w-2xl opacity-100 drop-shadow-xl bg-black/40 p-3 backdrop-blur-md rounded border border-red-900/30">
                {t('disclaimer')}
            </p>
        </div>

      </div>

      {/* --- LIGHTBOX (MODAL CON NAVEGACIÓN) --- */}
      {selectedIndex !== null && (
        <div 
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300 select-none"
            onClick={() => setSelectedIndex(null)}
        >
            
            {/* BOTÓN ANTERIOR (Izquierda) */}
            <button
                onClick={handlePrev}
                className="fixed left-2 md:left-8 z-[10000] text-white/50 hover:text-white bg-black/50 hover:bg-red-600/80 p-3 rounded-full transition-all border border-white/10 hover:border-red-500 hover:scale-110"
            >
                <ChevronLeft size={40} />
            </button>

            {/* BOTÓN SIGUIENTE (Derecha) */}
            <button
                onClick={handleNext}
                className="fixed right-2 md:right-8 z-[10000] text-white/50 hover:text-white bg-black/50 hover:bg-red-600/80 p-3 rounded-full transition-all border border-white/10 hover:border-red-500 hover:scale-110"
            >
                <ChevronRight size={40} />
            </button>

            {/* CONTENEDOR DE IMAGEN */}
            <div 
                className="relative max-w-[85vw] max-h-[85vh] w-auto h-auto shadow-2xl overflow-hidden bg-black cursor-default border border-white/10 group" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* BOTÓN CRUZ ROJA (Dentro del contenedor) */}
                <button 
                    className="absolute top-4 right-4 z-50 text-red-600 bg-black/50 hover:bg-red-600 hover:text-white p-2 rounded-full transition-all border border-red-600/30 hover:scale-110 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIndex(null);
                    }}
                >
                    <X size={32} strokeWidth={2.5} />
                </button>

                {/* IMAGEN SELECCIONADA */}
                <Image 
                    src={photos[selectedIndex].src} 
                    alt="Full size" 
                    width={1920} 
                    height={1080}
                    className="object-contain w-auto h-auto max-h-[85vh]"
                />
            </div>
        </div>
      )}

    </section>
  )
}