"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import clsx from "clsx"
// 1. IMPORTAR COMPONENTE GLITCH 👇
import { GlitchText } from "@/components/ui/glitch-text"

const residents = [
  {
    name: "ALEX LOSA",
    role: "Mørk DJ",
    style: "Techno, Raw, Hypnotic",
    image: "/Foto-Alex-Losa.jpg",
  },
  {
    name: "MZDZ",
    role: "Mørk DJ",
    style: "Techno, Raw, Groove",
    image: "/charly.JPEG",
  },
  {
    name: "BOTET",
    role: "Mørk DJ",
    style: "Techno, Hardgroove",
    image: "/botet.JPEG",
  },
  {
    name: "SELIN KAYA",
    role: "Mørk DJ",
    style: "Techno, Hardgroove",
    image: "/selin.JPEG",
  },
]

export function ResidentsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Usamos la misma lógica táctil que en la otra sección para mejor experiencia móvil
  const isTouchRef = useRef(false)

  return (
    <section id="residents" className="py-20 md:py-32 bg-card border-t border-white/10 overflow-hidden">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-16">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">The Architects</p>
          
          {/* 2. APLICAR GLITCH AQUÍ 👇 */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[0.05em] uppercase text-foreground">
            <GlitchText>RESIDENTS</GlitchText>
          </h2>
        </div>

        {/* RESIDENTS CAROUSEL */}
        <div className="flex overflow-x-auto px-4 md:px-8 gap-6 snap-x snap-mandatory no-scrollbar pb-8">
          {residents.map((resident, index) => {
             const isHovered = hoveredIndex === index;

             return (
              <div
                key={index}
                className={clsx(
                    "group relative flex-shrink-0 snap-center cursor-pointer",
                    "w-64 md:w-80"
                )}
                onTouchStart={() => { isTouchRef.current = true }}
                onMouseEnter={() => { if (!isTouchRef.current) setHoveredIndex(index) }}
                onMouseLeave={() => { if (!isTouchRef.current) setHoveredIndex(null) }}
                onClick={() => setHoveredIndex(index)} 
              >
                {/* Image Container */}
                <div
                  className={clsx(
                    "relative aspect-[2/3] overflow-hidden bg-secondary mb-6 transition-all duration-500",
                    isHovered ? "scale-105" : "scale-100"
                  )}
                  style={{
                    boxShadow: isHovered
                      ? "0 0 0 2px rgba(139, 0, 0, 0.6), 0 0 20px rgba(139, 0, 0, 0.3)"
                      : "none",
                  }}
                >
                  <Image
                    src={resident.image}
                    alt={resident.name}
                    fill
                    className={clsx(
                        "object-cover transition-all duration-500",
                        isHovered ? "grayscale-0 contrast-100" : "grayscale contrast-125"
                    )}
                  />
                  
                  <div
                    className="absolute inset-0 transition-colors duration-500"
                    style={{
                      backgroundColor: isHovered ? "rgba(0,0,0,0)" : "rgba(0, 0, 0, 0.4)",
                    }}
                  />
                </div>

                {/* Info */}
                <div className="px-1">
                  <h3
                    className={clsx(
                        "text-xl md:text-2xl font-black tracking-[0.1em] uppercase transition-colors duration-300",
                        isHovered ? "text-accent" : "text-foreground"
                    )}
                  >
                    {resident.name}
                  </h3>
                  <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2">{resident.role}</p>
                  <p className="text-muted-foreground text-sm tracking-wider mt-1 opacity-70">{resident.style}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}