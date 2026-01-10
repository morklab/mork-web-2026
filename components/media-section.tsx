"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Maximize2 } from "lucide-react"
import { GlitchText } from "@/components/ui/glitch-text"
import clsx from "clsx"
import { useTranslations } from "next-intl"

export function MediaSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
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

  return (
    <section id="media" className="py-20 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
      
      {/* --- FONDO TIPO HERO --- */}
      <div className="absolute inset-0 z-0">
          <Image
              src="/FONDO_PARA_ARCHIVE_YN.jpg"
              alt="Archive Background"
              fill
              // CAMBIO 1: Quitamos blur-sm y subimos opacidad a 90%
              className="object-cover opacity-90 grayscale" 
          />
          {/* CAMBIO 2: Overlay mucho más suave en el centro (via-black/20) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 z-10" />
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Contenedor principal con z-10 para estar sobre el fondo */}
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
                {photos.map((photo) => (
                    <div 
                        key={photo.id} 
                        className={clsx(
                            "relative flex-shrink-0 snap-center group cursor-pointer overflow-hidden border border-white/10 transition-all duration-500 bg-zinc-900/50 backdrop-blur-sm", // Menos opacidad en el fondo de la tarjeta
                            "w-[70vw] aspect-[4/3]", 
                            "md:w-[400px]", 
                            "hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                        )}
                        onClick={() => setSelectedImage(photo.src)}
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

      {/* --- LIGHTBOX (MODAL) --- */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
        >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-[110]">
                <X size={32} />
            </button>
            
            <div className="relative w-full max-w-7xl h-[80vh] border border-white/10 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <Image 
                    src={selectedImage} 
                    alt="Full size" 
                    fill 
                    className="object-contain bg-black"
                />
            </div>
        </div>
      )}

    </section>
  )
}