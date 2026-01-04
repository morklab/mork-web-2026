import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// 1. IMPORTAMOS TUS COMPONENTES NUEVOS
import { Navigation } from "@/components/navigation"
import { SoundPlayer } from "@/components/sound-player"

const _inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "MØRK LAB — Underground Techno Mallorca",
  description: "Pure Techno. Pure MØRK. Underground electronic music culture in Mallorca at Wave Club.",
  generator: "v0.app",
  icons: {
    // 👇 AQUÍ ESTÁ EL CAMBIO: Apuntamos directo a tu imagen en public
    icon: '/icon.png',
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050505",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      {/* Añadimos _inter.className para asegurar que la fuente cargue bien */}
      <body className={`${_inter.className} font-sans antialiased`}>
        
        {/* Fondo granulado original */}
        <div className="grain-overlay" />

        {/* 2. TU BARRA DE NAVEGACIÓN (Arriba) */}
        <Navigation />

        {/* 3. CONTENEDOR PRINCIPAL (Con espacio arriba para que el menú no tape nada) */}
        <main className="pt-16 md:pt-20 min-h-screen">
          {children}
        </main>

        {/* 4. TU REPRODUCTOR DE MÚSICA (Abajo) */}
        <SoundPlayer />

        <Analytics />
      </body>
    </html>
  )
}