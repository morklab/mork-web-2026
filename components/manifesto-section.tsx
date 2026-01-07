"use client"

import { GlitchText } from "@/components/ui/glitch-text"
import { useTranslations } from "next-intl"

export function ManifestoSection() {
  const t = useTranslations("Manifesto")

  return (
    <section id="manifesto" className="py-20 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">{t('subtitle')}</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[0.05em] uppercase text-foreground">
            <GlitchText>{t('title')}</GlitchText>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="border-l border-accent pl-6 md:pl-8">
            <p className="text-foreground text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
              {t('p1_1')}
            </p>
            <p className="text-foreground text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide mt-4">
              {t('p1_2')}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed tracking-wide text-pretty">
              {t('p2')}
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed tracking-wide mt-6 text-pretty">
              {t('p3')}
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed tracking-wide mt-6 text-pretty">
              {t('p4')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-32 border-t border-border pt-12">
          <div>
            <p className="text-3xl md:text-4xl font-black text-accent">TECHNO</p>
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2">{t('stat_style')}</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-foreground">+20</p>
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2">{t('stat_artists')}</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-accent">7K+</p>
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2">{t('stat_community')}</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-foreground">2024</p>
            <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase mt-2">{t('stat_founded')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}