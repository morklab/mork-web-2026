"use client"

import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  // Función para cambiar el idioma
  const switchLocale = (newLocale: string) => {
    if (!pathname) return
    
    // Dividimos la ruta actual (ej: /en/about -> ["", "en", "about"])
    const segments = pathname.split('/')
    
    // Cambiamos el segundo trozo (el idioma)
    segments[1] = newLocale
    
    // Reconstruimos la ruta y navegamos
    const newPath = segments.join('/')
    router.push(newPath)
  }

  // Detectamos el idioma actual mirando la URL
  const currentLocale = pathname?.split('/')[1] || 'en'

  return (
    <div className="flex items-center gap-3 ml-4">
      {/* Botón Español */}
      <button
        onClick={() => switchLocale('es')}
        className={`text-xl transition-all hover:scale-125 ${
          currentLocale === 'es' ? "opacity-100 scale-110 grayscale-0" : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
        }`}
        aria-label="Cambiar a Español"
      >
        🇪🇸
      </button>

      {/* Separador sutil */}
      <span className="text-white/20">|</span>

      {/* Botón Inglés */}
      <button
        onClick={() => switchLocale('en')}
        className={`text-xl transition-all hover:scale-125 ${
          currentLocale === 'en' ? "opacity-100 scale-110 grayscale-0" : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
        }`}
        aria-label="Switch to English"
      >
        🇬🇧
      </button>
    </div>
  )
}