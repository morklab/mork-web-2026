"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "next-intl"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("Navigation")

  // ESTILOS:
  // 1. text-xs (12px): Tamaño legible, no diminuto.
  // 2. whitespace-nowrap: Prohibido partir líneas.
  // 3. tracking: Un poco más ajustado en portátiles para que quepa todo.
  const linkStyles = "text-muted-foreground hover:text-accent text-xs tracking-[0.15em] lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap"

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* IZQUIERDA: LOGO */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/GALLETA_ROJA.PNG"
              alt="MØRK Lab"
              width={40}
              height={40}
              className="rounded"
            />
          </Link>

          {/* CENTRO: ENLACES (Escritorio) */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 mx-4">
            <Link href="#events" className={linkStyles}>
              {t('events')} 
            </Link>
            <Link href="#core-artists" className={linkStyles}>
              {t('artists')}
            </Link>
            <Link href="#manifesto" className={linkStyles}>
              {t('manifesto')}
             </Link>
             <Link href="#visuals" className={linkStyles}>
              {t('visuals')}
            </Link>
            
            {/* --- NUEVO ENLACE MEDIA --- */}
            <Link href="#media" className={linkStyles}>
              {t('media')}
            </Link>
            {/* -------------------------- */}

            <Link href="#team" className={linkStyles}>
              {t('team')}
            </Link>
            <Link href="#sound" className={linkStyles}>
              {t('sound')}
            </Link>
            <Link href="#shop" className={linkStyles}>
              {t('shop')}
            </Link>
          </div>

          {/* DERECHA: BANDERAS Y SEGUIR */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:block">
                <LanguageSwitcher />
            </div>

            <Link 
              href="https://www.instagram.com/mork.lab/" 
              target="_blank" 
              className="hidden md:block text-foreground border border-foreground px-4 py-2 text-xs tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all whitespace-nowrap"
            >
              {t('follow')}
            </Link>

            {/* BOTÓN MÓVIL (Hamburguesa) */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground p-2 min-h-11 min-w-11 flex items-center justify-center">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL (Desplegable) */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border h-screen">
          <div className="px-4 py-6 flex flex-col gap-4">
            <Link href="#events" onClick={() => setIsOpen(false)} className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border">
              {t('events')}
            </Link>
            <Link href="#core-artists" onClick={() => setIsOpen(false)} className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border">
              {t('artists')}
            </Link>
            <Link href="#manifesto" onClick={() => setIsOpen(false)} className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border">
              {t('manifesto')}
            </Link>
            <Link href="#visuals" onClick={() => setIsOpen(false)} className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border">
              {t('visuals')}
            </Link>

            {/* --- NUEVO ENLACE MEDIA (MÓVIL) --- */}
            <Link href="#media" onClick={() => setIsOpen(false)} className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border">
              {t('media')}
            </Link>
            {/* ---------------------------------- */}

            <Link href="#team" onClick={() => setIsOpen(false)} className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border">
              {t('team')}
            </Link>
            <Link href="#sound" onClick={() => setIsOpen(false)} className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border">
              {t('sound')}
            </Link>
            <Link href="#shop" onClick={() => setIsOpen(false)} className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border">
              {t('shop')}
            </Link>
            
            <div className="flex justify-center py-4">
                <LanguageSwitcher />
            </div>

            <Link href="https://instagram.com" target="_blank" className="text-foreground border border-foreground px-4 py-3 text-lg tracking-[0.2em] uppercase text-center mt-2 hover:bg-foreground hover:text-background transition-all">
              {t('follow')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}