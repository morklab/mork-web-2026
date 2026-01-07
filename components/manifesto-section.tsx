"use client"

import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"

export function ManifestoSection() {
  const t = useTranslations("Manifesto")

  // Separamos el punto 1 para usarlo como TITULO PRINCIPAL de la izquierda
  const mainTitle = {
    title: t('m1_t'), // "MØRK NO ES SOLO UNA FIESTA"
    desc: t('m1_d')   // "Es una declaración..."
  }

  // El resto de puntos (del 2 al 5) van debajo como lista
  const manifestoPoints = [2, 3, 4, 5].map((num) => ({
    id: `m${num}`,
    title: t(`m${num}_t`),
    desc: t(`m${num}_d`),
  }))

  // Las reglas de la derecha
  const rules = [1, 2, 3, 4, 5, 6].map((num) => ({
    id: `0${num}`,
    title: t(`r${num}_t`),
    desc: t(`r${num}_d`),
  }))

  // 🔥 ESTILO COMPARTIDO PARA LOS DOS TÍTULOS (ROJO, GRANDE, SIN NEÓN)
  const headerStyle = "text-xl md:text-2xl font-black uppercase tracking-widest text-accent mb-6 no-glow"

  return (
    <section id="manifesto" className="py-20 md:py-24 px-4 bg-black relative overflow-hidden">
      
      {/* Fondo decorativo */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent opacity-10 pointer-events-none" />

      {/* Contenedor principal */}
      <div className="max-w-5xl mx-auto relative z-10 border-x border-white/5 px-6 md:px-12 bg-black/50">
        
        {/* CABECERA DE LA SECCIÓN */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <p className="text-accent text-[10px] tracking-[0.4em] uppercase mb-2 font-bold no-glow" style={{ textShadow: 'none' }}>
            {t('subtitle')}
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
            <GlitchText>{t('title')}</GlitchText>
          </h2>
        </div>

        {/* GRID DE 2 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start pb-12">
          
          {/* === COLUMNA IZQUIERDA: FILOSOFÍA === */}
          <div className="space-y-8">
            
            {/* 1. EL TÍTULO GEMELO IZQUIERDO */}
            <div>
              <h3 className={headerStyle} style={{ textShadow: 'none' }}>
                {mainTitle.title}
              </h3>
              <p className="text-white font-medium text-sm md:text-base leading-relaxed opacity-90 border-l-2 border-accent pl-4">
                {mainTitle.desc}
              </p>
            </div>
            
            {/* 2. EL RESTO DE PUNTOS (Lista) */}
            <div className="space-y-6 pt-2">
              {manifestoPoints.map((point, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <h4 className="uppercase tracking-wide text-xs md:text-sm font-bold text-white m-0">
                    {point.title}
                  </h4>
                  <p className="text-zinc-500 text-[11px] md:text-xs leading-relaxed text-justify">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* === COLUMNA DERECHA: CÓDIGO === */}
          <div className="md:pl-8 md:border-l border-white/10">
            
            {/* 1. EL TÍTULO GEMELO DERECHO */}
            <h3 className={headerStyle} style={{ textShadow: 'none' }}>
              {t('code_title')}
            </h3>

            {/* 2. LISTA DE NORMAS */}
            <div className="space-y-5">
              {rules.map((rule) => (
                <div key={rule.id} className="flex items-start gap-4">
                  <span className="text-accent font-mono text-xs font-bold pt-1 opacity-70 no-glow shrink-0" style={{ textShadow: 'none' }}>
                    [{rule.id}]
                  </span>
                  <div>
                    <h4 className="text-white font-bold uppercase text-xs md:text-sm mb-1 tracking-wider">
                      {rule.title}
                    </h4>
                    <p className="text-zinc-500 text-[11px] md:text-xs leading-normal">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}