"use client"

import { usePathname, useRouter } from "next/navigation"

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  // Función para cambiar el idioma manteniendo la posición
  const switchLocale = (newLocale: string) => {
    if (!pathname) return
    
    // 1. Dividimos la ruta actual
    const segments = pathname.split('/')
    
    // 2. Cambiamos el idioma (segundo segmento)
    segments[1] = newLocale
    
    // 3. Reconstruimos la ruta base
    const newPath = segments.join('/')

    // 4. TRUCO: Capturamos el #hash actual (ej: #media) para no perder la sección
    // Usamos window.location.hash solo si estamos en el cliente (navegador)
    const hash = typeof window !== 'undefined' ? window.location.hash : ''

    // 5. NAVEGACIÓN SUAVE:
    // - Usamos 'replace' en vez de 'push' para no llenar el historial de cambios de idioma
    // - { scroll: false } es la magia que evita que la web salte hacia arriba
    router.replace(`${newPath}${hash}`, { scroll: false })
  }

  // Detectamos el idioma actual mirando la URL
  const currentLocale = pathname?.split('/')[1] || 'en'

  return (
    <div className="flex items-center gap-3 ml-4">
      {/* Botón Español */}
      <button
        onClick={() => switchLocale('es')}
        className={`text-xl transition-all duration-300 hover:scale-125 ${
          currentLocale === 'es' 
            ? "opacity-100 scale-110 grayscale-0 shadow-[0_0_10px_rgba(255,255,255,0.3)] rounded-full" 
            : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
        }`}
        aria-label="Cambiar a Español"
      >
        🇪🇸
      </button>

      {/* Separador sutil */}
      <span className="text-white/20 font-thin">|</span>

      {/* Botón Inglés */}
      <button
        onClick={() => switchLocale('en')}
        className={`text-xl transition-all duration-300 hover:scale-125 ${
          currentLocale === 'en' 
            ? "opacity-100 scale-110 grayscale-0 shadow-[0_0_10px_rgba(255,255,255,0.3)] rounded-full" 
            : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
        }`}
        aria-label="Switch to English"
      >
        🇬🇧
      </button>
    </div>
  )
}