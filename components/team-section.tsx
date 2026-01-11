"use client"

import Image from "next/image"
import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"

export function TeamSection() {
  const t = useTranslations("Team")

  const team = [
    {
      name: "Erick Navas",
      role: t('role_cofounder'),
      image: "/team/structure.jpg"
    },
    {
      name: "Alex Losa",
      role: t('role_cofounder_artist'),
      image: "/team/audio.jpg"
    },
    {
      name: "MZDZ",
      role: t('role_ceo_artist'),
      image: "/team/audio-2.jpg"
    },
    {
      name: "Rut Garau",
      role: t('role_pr'),
      image: "/team/pr.jpg"
    },
    {
      name: "Álvaro Company",
      role: t('role_video'),
      image: "/team/glitch.jpg"
    },
    {
      name: "Ernesto Montero",
      role: t('role_visuals'),
      image: "/team/glitch-2.jpg"
    },
    {
      name: "Carlos Gomez",
      role: t('role_lighting'),
      image: "/team/light.jpg"
    },
  ]

  return (
    <section
      id="team"
      className="relative z-10 min-h-screen bg-background border-t border-white/5 flex flex-col justify-center md:justify-start py-20 md:pt-32 md:pb-32"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">

        {/* CONTENEDOR SUPERIOR */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-10">

          {/* BLOQUE IZQUIERDO: Título y Texto */}
          <div className="max-w-3xl">
            <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4 font-bold">
              {t('subtitle')}
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tight">
              <GlitchText>{t('title')}</GlitchText>
            </h2>
            <div className="w-24 h-px bg-accent mt-6 mb-8" />

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed tracking-wide">
              {t('text')}
            </p>
          </div>

          {/* 🔥 CITA ESCRITORIO (Solo se ve en PC)
              - Color: text-accent (ROJO PURO).
              - Borde: Eliminado (sin border-r).
              - Ancho: Libre para que quepa en una línea.
          */}
          <div className="hidden md:block text-right">
            <p className="text-accent text-xl font-medium italic leading-relaxed tracking-wide latido-mork">
              &quot;{t('quote')}&quot;
            </p>
          </div>

        </div>

        {/* GRID MIEMBROS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {team.map((member) => (
            <div
              key={member.name}
              /* MÓVIL INTACTO: Tus efectos de interacción */
              className="group flex items-center gap-4 p-3 border border-white/5 bg-zinc-900/20
                         hover:border-red-900/40 hover:bg-zinc-900/60
                         active:bg-zinc-900/80 active:border-red-900/60 active:scale-[0.98]
                         transition-all duration-300 cursor-pointer select-none"
            >

              {/* IMAGEN CONCEPTUAL */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border border-white/10 overflow-hidden bg-black">
                <Image
                  src={member.image}
                  alt={member.role}
                  fill
                  className="object-cover grayscale opacity-60
                               group-hover:opacity-100 group-hover:grayscale-0
                               group-active:opacity-100 group-active:grayscale-0
                               transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent group-active:bg-transparent transition-colors duration-300" />
              </div>

              {/* DATOS */}
              <div className="min-w-0 flex-1">
                <h3 className="text-foreground text-sm font-bold uppercase tracking-wider group-hover:text-white group-active:text-white transition-colors truncate">
                  {member.name}
                </h3>

                {/* LÍNEA DECORATIVA */}
                <div className="h-px w-8 bg-white/10 my-2
                                group-hover:w-full group-hover:bg-accent/80
                                group-active:w-full group-active:bg-accent/80
                                transition-all duration-500" />

                <p className="text-accent text-[10px] tracking-[0.1em] uppercase opacity-80 group-hover:opacity-100 group-active:opacity-100 truncate font-mono">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 CITA MÓVIL (Solo se ve en Móvil)
            - Color: text-accent (ROJO PURO).
        */}
        <div className="mt-16 border-t border-border pt-8 block md:hidden">
          <blockquote className="text-center max-w-2xl mx-auto">
            <p className="text-accent text-lg md:text-xl font-medium italic leading-relaxed latido-mork">
              {t('quote')}
            </p>
          </blockquote>
        </div>

      </div>
    </section>
  )
}