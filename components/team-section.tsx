"use client"

import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"

export function TeamSection() {
  const t = useTranslations("Team")

  // Quitamos la propiedad 'image' porque no la vamos a usar
  const team = [
    { name: "Erick Navas", role: t('role_cofounder') },
    { name: "Alex Losa", role: t('role_cofounder_artist') },
    { name: "MZDZ", role: t('role_ceo_artist') },
    { name: "Rut Garau", role: t('role_pr') },
    { name: "Álvaro Company", role: t('role_video') },
    { name: "Ernesto Montero", role: t('role_visuals') },
    { name: "Carlos Gomez", role: t('role_lighting') },
  ]

  return (
    <section id="team" className="py-20 md:py-32 bg-background border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* CABECERA */}
        <div className="mb-12 md:mb-16">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4 font-bold">
            {t('subtitle')}
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tight">
            <GlitchText>{t('title')}</GlitchText>
          </h2>
          <div className="w-24 h-px bg-accent mt-6" />
        </div>

        {/* TEXTO */}
        <div className="mb-12 max-w-3xl">
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed tracking-wide">
            {t('text')}
          </p>
        </div>

        {/* GRID MIEMBROS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {team.map((member) => (
            <div key={member.name} className="group flex items-center gap-4 p-3 border border-white/5 bg-zinc-900/20 hover:border-red-900/40 hover:bg-zinc-900/60 transition-all duration-300">
              
              {/* CUADRADO NEGRO LOGO MØRK (Sin foto) */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-black border border-white/10 flex items-center justify-center overflow-hidden transition-colors duration-300 group-hover:border-accent/30">
                 <span className="text-[10px] font-black text-white/20 tracking-tighter group-hover:text-accent transition-colors duration-300">
                    MØRK
                 </span>
              </div>

              {/* DATOS */}
              <div className="min-w-0 flex-1">
                <h3 className="text-foreground text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors truncate">
                  {member.name}
                </h3>
                
                {/* Línea decorativa */}
                <div className="h-px w-8 bg-white/10 my-1 group-hover:w-full group-hover:bg-accent/80 transition-all duration-500" />
                
                <p className="text-accent text-[10px] tracking-[0.1em] uppercase opacity-80 group-hover:opacity-100 truncate font-mono">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CITA */}
        <div className="mt-16 border-t border-border pt-8">
          <blockquote className="text-center max-w-2xl mx-auto">
            <p className="text-foreground/80 text-lg md:text-xl font-light italic leading-relaxed">
              {t('quote')}
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}