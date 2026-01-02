"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Play } from "lucide-react"
import clsx from "clsx"
// 1. IMPORTAR EL COMPONENTE GLITCH 👇
import { GlitchText } from "@/components/ui/glitch-text"

export function VisualsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Refs de control de estado
  const isTouchingRef = useRef(false)
  const isClickedRef = useRef(false)
  const clickedIndexRef = useRef<number | null>(null)

  // Refs de elementos y temporizadores
  const scrollTimeoutRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<any[]>([])

  // --- LISTA DE RITUALES ---
  const items = [
    { title: "RITUAL MØRK 001", image: "/event-001.jpg", link: "https://www.instagram.com/reel/C6PEypRtS9M/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 002", image: "/event-002.jpg", link: "https://www.instagram.com/reel/C7EaFgHtLVr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 003", image: "/event-003.jpg", link: "https://www.instagram.com/reel/C8sGa57o33w/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 004", image: "/event-004.jpg", link: "https://www.instagram.com/reel/C95SDHAtYd-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 005", image: "/event-005.jpg", link: "https://www.instagram.com/reel/C_JCBzGN3We/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 006", image: "/event-006.jpg", link: "https://www.instagram.com/reel/DARMtXcMxT_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 007", image: "/event-007.jpg", link: "https://www.instagram.com/reel/C_xvUC2tOF4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 008", image: "/event-008.jpg", link: "https://www.instagram.com/reel/DCXCvBBsHQW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 009", image: "/event-009.jpg", link: "https://www.instagram.com/reel/DDuxcSoiZWY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 010", image: "/event-010.jpg", link: "https://www.instagram.com/reel/DHogvTTRBez/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 011", image: "/event-011.jpg", link: "https://www.instagram.com/reel/DIPKGmtxW60/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 012", image: "/event-012.jpg", link: "https://www.instagram.com/reel/DJUsYo-x-qS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 013", image: "/event-013.jpg", link: "https://www.instagram.com/reel/DKuplyTx1CS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 014", image: "/event-014.jpg", link: "https://www.instagram.com/reel/DMdaGbmxiJd/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 015", image: "/event-015.jpg", link: "https://www.instagram.com/reel/DM-LcHXx4vr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 016", image: "/event-016.jpg", link: "https://www.instagram.com/reel/DOWjj5Ikawq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 017", image: "/event-017.JPEG", link: "https://www.instagram.com/reel/DP6-AOqCLLn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 018", image: "/event-018.JPEG", link: "https://www.instagram.com/reel/DQ7cc2OCBZR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    { title: "RITUAL MØRK 019", image: "/event-019.JPEG", link: "https://www.instagram.com/reel/DSDhLylEQta/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  ]

  // --- CÁLCULO DE POSICIÓN ---
  const calculateCenterItem = () => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerCenter = container.scrollLeft + (container.clientWidth / 2)
    
    let closestIndex = null
    let minDistance = Infinity

    itemsRef.current.forEach((item, index) => {
      if (!item) return
      const el = item as HTMLElement
      const itemCenter = el.offsetLeft + (el.offsetWidth / 2)
      const distance = Math.abs(containerCenter - itemCenter)

      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    setHoveredIndex(closestIndex)
  }

  // --- GESTIÓN DEL SCROLL ---
  const handleScroll = () => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    calculateCenterItem()
    scrollTimeoutRef.current = setTimeout(() => {
       if (!isTouchingRef.current && !isClickedRef.current) {
         setHoveredIndex(null)
       }
    }, 600)
  }

  // --- HANDLER FIN DE TOQUE ---
  const handleTouchEnd = () => {
    isTouchingRef.current = false
    if (!scrollTimeoutRef.current) {
        scrollTimeoutRef.current = setTimeout(() => {
            if (!isClickedRef.current) {
                setHoveredIndex(null)
            }
        }, 600)
    }
  }

  return (
    <section id="visuals" className="py-20 bg-black border-t border-white/10 overflow-hidden">
      <div className="w-full">
        
        {/* CABECERA */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-end mb-2">
          <div>
            <p className="text-accent text-xs tracking-[0.4em] uppercase mb-2">Visual Archive</p>
            
            {/* 2. APLICAR GLITCH AQUÍ 👇 */}
            <h2 className="text-3xl md:text-5xl font-black tracking-[0.05em] uppercase text-white">
              <GlitchText>RITUAL ECHOES</GlitchText> ({items.length})
            </h2>
          </div>
          <Link 
            href="https://www.instagram.com/mork.lab/" 
            target="_blank"
            className="hidden md:flex text-white border border-white/30 px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all items-center gap-2"
          >
            <Instagram size={16} />
            Instagram
          </Link>
        </div>

        {/* CARRUSEL INTERACTIVO */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className={clsx(
              "flex overflow-x-auto pt-8 md:pt-20 pb-8 md:pb-12 gap-6 snap-x snap-mandatory no-scrollbar items-end h-[220px] md:h-[340px]",
              "px-[calc(50%-3.5rem)] md:px-[calc(50%-4rem)]"
          )}
          
          onTouchMove={() => {
            isClickedRef.current = false 
            clickedIndexRef.current = null
            isTouchingRef.current = true 
          }}
          onTouchStart={() => {
            isTouchingRef.current = true
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
          }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {items.map((item, index) => {
            
            const distanceFromHovered = hoveredIndex === null ? 999 : Math.abs(hoveredIndex - index)
            const isSelected = hoveredIndex === index

            // 1. ESCALA Y EFECTOS
            let scaleClass = "scale-100 opacity-50 grayscale blur-[0.5px]" 
            let zIndex = "z-10"

            if (distanceFromHovered === 0) {
              scaleClass = "scale-[1.6] md:scale-[1.8] opacity-100 grayscale-0 blur-0"
              zIndex = "z-50"
            } else if (distanceFromHovered === 1) {
              scaleClass = "scale-[1.15] md:scale-[1.2] opacity-80 grayscale-0 blur-0"
              zIndex = "z-40"
            }
            
            // 2. BORDE Y RESPLANDOR
            let borderClass = "border-white/10"
            let shadowClass = ""
            if (isSelected) {
              borderClass = "border-red-800/60" 
              shadowClass = "shadow-[0_0_40px_-10px_rgba(220,20,60,0.4)]"
            }

            return (
              <Link 
                key={index}
                ref={(el) => { itemsRef.current[index] = el }} 
                href={item.link}
                target="_blank"
                // --- RATÓN (PC) ---
                onMouseEnter={() => { if (!isTouchingRef.current) setHoveredIndex(index) }}
                onMouseLeave={() => { if (!isTouchingRef.current) setHoveredIndex(null) }}

                // --- CLIC INTELIGENTE (TAP) ---
                onClick={(e) => {
                  if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)

                  if (!isClickedRef.current || clickedIndexRef.current !== index) {
                    e.preventDefault() 
                    isClickedRef.current = true
                    clickedIndexRef.current = index
                    setHoveredIndex(index) 
                    isTouchingRef.current = false 
                  } 
                }}

                className={clsx(
                    "relative flex-shrink-0 aspect-square border bg-gray-900 overflow-visible snap-center rounded-lg",
                    "w-28 md:w-32", 
                    "transition-all duration-300 ease-out origin-bottom transform-gpu will-change-transform",
                    scaleClass, borderClass, shadowClass, zIndex
                )}
              >
                <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center rounded-lg">
                    <span className="text-[10px] text-white/20">#{String(index + 1).padStart(3, '0')}</span>
                </div>
                
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width: 768px) 150px, 150px"
                  className="object-cover rounded-lg" 
                />
                
                <div className={clsx("absolute inset-0 flex items-center justify-center transition-opacity duration-300", 
                    distanceFromHovered <= 1 ? "opacity-100" : "opacity-0"
                )}>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                     <Play fill="white" className="text-white ml-1" size={14} />
                  </div>
                </div>

                <div className={clsx("absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 text-center transition-all duration-200", 
                    isSelected ? "opacity-100 visible" : "opacity-0 invisible"
                )}>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-white truncate py-1 px-3 bg-black/90 rounded-full inline-block border border-red-900/40">
                    {item.title}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}