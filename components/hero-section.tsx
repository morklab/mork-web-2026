"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { GlitchText } from "@/components/ui/glitch-text"
// 👇 1. Importamos la herramienta de traducción
import { useTranslations } from "next-intl"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const rafId = useRef<number | null>(null)
  const lastScrollY = useRef(0)
  
  // 👇 2. Conectamos con la sección "Hero" del JSON
  const t = useTranslations("Hero")

  useEffect(() => {
    let ticking = false
    let animationFrame: number | null = null

    const updateScrollY = () => {
      const currentScrollY = window.scrollY
      const targetY = currentScrollY * 0.5
      const currentY = lastScrollY.current
      const diff = targetY - currentY
      
      if (Math.abs(diff) > 0.1) {
        lastScrollY.current = currentY + diff * 0.15
        setScrollY(lastScrollY.current)
        animationFrame = requestAnimationFrame(updateScrollY)
      } else {
        lastScrollY.current = targetY
        setScrollY(targetY)
        ticking = false
      }
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        rafId.current = requestAnimationFrame(() => {
          updateScrollY()
          ticking = false
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    const initialScrollY = window.scrollY
    lastScrollY.current = initialScrollY * 0.5
    setScrollY(lastScrollY.current)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
      if (animationFrame !== null) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/publico-colin.JPEG')`,
          transform: `translate3d(0, ${scrollY}px, 0)`,
          filter: 'grayscale(100%)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />
      <div
        className="absolute right-0 bottom-0 bg-gradient-to-b from-background/70 via-background/80 to-background"
        style={{ left: "auto", top: "auto" }}
      />

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        
        {/* 👇 TEXTO SUPERIOR (Subtitle) */}
        <p className="text-muted-foreground text-xs md:text-sm tracking-[0.4em] uppercase mb-6 md:mb-8 font-bold">
          <GlitchText>{t('subtitle')}</GlitchText>
        </p>

        <div className="mb-6 md:mb-8">
          <Image
            src="/LOGO_MORK_RED.PNG"
            alt="MØRK Lab"
            width={500}
            height={500}
            className="rounded mx-auto w-80 sm:w-96 md:w-[450px] lg:w-[500px]"
            priority
          />
        </div>

        {/* 👇 TEXTO POÉTICO (Text) */}
        <p className="text-muted-foreground text-sm md:text-base tracking-wider max-w-xl mx-auto mb-10 md:mb-14">
          {t('text')}
        </p>

        {/* 👇 BOTÓN (CTA) */}
        <a
          href="#shop"
          className="inline-block border border-foreground text-foreground px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-all min-h-11"
        >
          {t('cta')}
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-muted-foreground" size={24} />
      </div>

      {/* 👇 FECHA LATERAL (Est) */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <span className="text-muted-foreground/30 text-xs tracking-[0.5em] uppercase">
          {t('est')}
        </span>
      </div>
    </section>
  )
}