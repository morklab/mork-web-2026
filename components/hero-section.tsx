"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
// 1. IMPORTAMOS EL COMPONENTE AQUÍ 👇
import { GlitchText } from "@/components/ui/glitch-text"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const rafId = useRef<number | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    let ticking = false
    let animationFrame: number | null = null

    const updateScrollY = () => {
      const currentScrollY = window.scrollY
      
      // Smooth interpolation for parallax effect
      const targetY = currentScrollY * 0.5
      const currentY = lastScrollY.current
      const diff = targetY - currentY
      
      // Smooth easing with better responsiveness (ease-out)
      if (Math.abs(diff) > 0.1) {
        lastScrollY.current = currentY + diff * 0.15
        setScrollY(lastScrollY.current)
        
        // Continue animation if there's still a difference
        animationFrame = requestAnimationFrame(updateScrollY)
      } else {
        // Snap to target if very close
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
    
    // Initial calculation
    const initialScrollY = window.scrollY
    lastScrollY.current = initialScrollY * 0.5
    setScrollY(lastScrollY.current)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image in black and white */}
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

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        
        {/* 2. AQUÍ APLICAMOS EL GLITCH AL TEXTO SUPERIOR 👇 */}
        <p className="text-muted-foreground text-xs md:text-sm tracking-[0.4em] uppercase mb-6 md:mb-8 font-bold">
          <GlitchText>Underground Electronic Music Culture</GlitchText>
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

        <p className="text-muted-foreground text-sm md:text-base tracking-wider max-w-xl mx-auto mb-10 md:mb-14">
          Mallorca — Where the ego dissolves and only the rhythm remains.
        </p>

        <a
          href="#shop"
          className="inline-block border border-foreground text-foreground px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-all min-h-11"
        >
          SHOP
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-muted-foreground" size={24} />
      </div>

      {/* Side decorative text */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <span className="text-muted-foreground/30 text-xs tracking-[0.5em] uppercase">Est. MMXXIII — Mallorca</span>
      </div>
    </section>
  )
}