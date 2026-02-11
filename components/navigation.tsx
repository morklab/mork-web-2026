"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" 
import { useRouter, usePathname } from "next/navigation" 
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations, useLocale } from "next-intl" 

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const t = useTranslations("Navigation")
  const router = useRouter()
  const pathname = usePathname() 
  const locale = useLocale() 

  useEffect(() => {
    setIsTransitioning(false)
    setIsOpen(false)
  }, [pathname])

  if (pathname && pathname.includes('/u300')) {
    return null
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (typeof window !== 'undefined') {
        window.history.pushState(null, '', window.location.pathname)
    }
    setIsOpen(false)
  }

  const enterU300 = (e: React.MouseEvent) => {
    e.preventDefault() 
    setIsTransitioning(true)
    setIsOpen(false)
    setTimeout(() => {
        router.push(`/${locale}/u300`)
    }, 1200) 
  }

  const linkStyles = "text-muted-foreground hover:text-accent text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap"

  return (
    <>
      <style jsx global>{`
        /* --- EFECTO LOGO U300 (VIBRACIÓN Y RESPLANDOR ROJO) --- */
        
        /* 1. Latido Rojo Base (Usando drop-shadow) */
        @keyframes u300-image-pulse {
            0%, 100% { filter: drop-shadow(0 0 2px rgba(185, 28, 28, 0.5)) brightness(1); }
            50% { filter: drop-shadow(0 0 8px rgba(255, 0, 0, 0.9)) brightness(1.2); }
        }

        /* 2. Vibración Rápida (Twitch) */
        @keyframes u300-image-twitch {
            0% { transform: translate(0,0); }
            90% { transform: translate(0,0); }
            92% { transform: translate(-2px, 1px); }
            94% { transform: translate(2px, -1px); }
            96% { transform: translate(-1px, 0); }
            98% { transform: translate(1px, 2px); }
            100% { transform: translate(0,0); }
        }

        /* ESTILO DEL CONTENEDOR DEL LOGO */
        .u300-logo-wrapper {
            position: relative;
            display: inline-block;
            background: transparent !important;
            /* Aplicamos las animaciones al contenedor de la imagen */
            animation: u300-image-pulse 2s infinite ease-in-out, u300-image-twitch 3s infinite linear;
            transition: all 0.2s ease;
            line-height: 0;
        }

        /* HOVER: Se vuelve ROJO INTENSO (Corregido) */
        .u300-logo-wrapper:hover {
            animation: none; /* Paramos el latido */
            /* Usamos solo sombras rojas intensas y un poco de brillo */
            filter: drop-shadow(0 0 10px #dc2626) drop-shadow(0 0 25px #ff0000) brightness(1.2);
            transform: scale(1.05);
        }

        /* BLACKOUT TRANSITION */
        @keyframes power-off {
            0% { opacity: 0; filter: brightness(2); }
            5% { opacity: 1; background: #dc2626; } 
            10% { background: black; } 
            100% { opacity: 1; background: black; }
        }
        .transition-overlay { animation: power-off 0.4s forwards; }
      `}</style>

      {isTransitioning && (
        <div className="fixed inset-0 z-[99999] bg-black transition-overlay flex items-center justify-center pointer-events-none">
            <span className="text-red-600 font-mono text-xs tracking-[0.5em] animate-pulse">INITIALIZING U300...</span>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            <button onClick={scrollToTop} className="flex items-center shrink-0 hover:opacity-80 transition-opacity cursor-pointer">
              <Image src="/GALLETA_ROJA.PNG" alt="MØRK Lab" width={40} height={40} className="rounded" />
            </button>

            <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 mx-4">
              <Link href="#events" className={linkStyles}>{t('events')}</Link>
              <Link href="#core-artists" className={linkStyles}>{t('artists')}</Link>
              <Link href="#manifesto" className={linkStyles}>{t('manifesto')}</Link>
              <Link href="#visuals" className={linkStyles}>{t('visuals')}</Link>
              <Link href="#media" className={linkStyles}>{t('media')}</Link>
              <Link href="#team" className={linkStyles}>{t('team')}</Link>
              <Link href="#sound" className={linkStyles}>{t('sound')}</Link>
              <Link href="#shop" className={linkStyles}>{t('shop')}</Link>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              
              {/* BOTÓN U300 (DESKTOP) - LOGO PEQUEÑO */}
              <a 
                href="/u300" 
                onClick={enterU300} 
                className="hidden md:inline-block u300-logo-wrapper cursor-pointer"
              >
                <Image 
                    src="/u300tran.png" 
                    alt="U300"
                    width={55} 
                    height={24} 
                    className="object-contain"
                />
              </a>

              <div className="hidden md:block transform scale-75 origin-right opacity-80 hover:opacity-100 transition-opacity">
                  <LanguageSwitcher />
              </div>

              <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground p-2 flex items-center justify-center">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* MENÚ MÓVIL */}
        {isOpen && (
          <div className="md:hidden bg-background border-t border-border h-screen">
            <div className="px-4 py-6 flex flex-col gap-4">
              <Link href="#events" onClick={() => setIsOpen(false)} className="text-foreground text-lg uppercase py-3 border-b border-border">{t('events')}</Link>
              
              <div className="flex justify-center py-4 transform scale-75"><LanguageSwitcher /></div>
              
              {/* BOTÓN U300 (MÓVIL) - LOGO PEQUEÑO */}
              <div className="flex justify-center mt-6">
                <a 
                    href="/u300" 
                    onClick={enterU300} 
                    className="u300-logo-wrapper cursor-pointer"
                >
                  <Image 
                      src="/u300tran.png" 
                      alt="U300"
                      width={80} 
                      height={35} 
                      className="object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}