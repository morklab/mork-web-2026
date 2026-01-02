"use client"

import Image from "next/image"
// 1. IMPORTAMOS EL COMPONENTE GLITCH 👇
import { GlitchText } from "@/components/ui/glitch-text"

const team = [
  {
    name: "Erick Navas",
    role: "Co-founder",
    image: "/erick-playa.JPG",
  },
  {
    name: "Alex Losa",
    role: "Co-founder, Artist",
    image: "/images/a7e5bc93-3225-4e20-b1c1.jpeg",
  },
  {
    name: "MZDZ",
    role: "CEO, Artist",
    image: "/male-dj-portrait-moody-dark-techno-style.jpg",
  },
  {
    name: "Rut Garau",
    role: "Directora RRPP",
    image: "/female-professional-portrait-dark-elegant.jpg",
  },
  {
    name: "Álvaro Company",
    role: "Director de Video",
    image: "/male-videographer-portrait-dark-cinematic.jpg",
  },
  {
    name: "Ernesto Montero",
    role: "Director de Fotografía",
    image: "/male-photographer-portrait-dark-artistic.jpg",
  },
  {
    name: "Carlitos",
    role: "Jefe de Iluminación",
    image: "/male-lighting-technician-portrait-dark-stage.jpg",
  },
]

export function TeamSection() {
  return (
    <section id="team" className="py-20 md:py-32 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">La Familia</p>
          
          {/* 2. APLICAMOS EL GLITCH AQUÍ 👇 */}
          <h2 className="text-4xl md:text-6xl font-bold text-foreground uppercase tracking-tight">
            <GlitchText>The Team</GlitchText>
          </h2>
          
          <div className="w-24 h-px bg-accent mt-6" />
        </div>

        {/* Philosophy */}
        <div className="mb-12 max-w-3xl">
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Somos una familia que cree en el proyecto desde el principio. Respetamos el techno y la cultura de club como forma de vida. Unidos por la misma pasión, trabajamos para crear experiencias que trasciendan lo ordinario.
          </p>
        </div>

        {/* GRID COMPACTO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {team.map((member) => (
            <div 
              key={member.name} 
              className="group flex items-center gap-4 p-3 border border-white/5 bg-zinc-900/20 hover:border-red-900/40 hover:bg-zinc-900/60 transition-all duration-300"
            >
              <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                 <span className="text-[10px] font-black text-white/20 tracking-tighter group-hover:text-red-600/50 transition-colors">
                    MØRK
                 </span>
              </div>

              <div className="min-w-0">
                <h3 className="text-foreground text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors truncate">
                  {member.name}
                </h3>
                <div className="h-px w-8 bg-white/10 my-1 group-hover:w-full group-hover:bg-red-900/50 transition-all duration-500" />
                <p className="text-accent text-[10px] tracking-[0.15em] uppercase opacity-70 group-hover:opacity-100 truncate">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 border-t border-border pt-8">
          <blockquote className="text-center max-w-2xl mx-auto">
            <p className="text-foreground text-lg md:text-xl font-light italic leading-relaxed opacity-80">
              "Excellence is in the invisible."
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}