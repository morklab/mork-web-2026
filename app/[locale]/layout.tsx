import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "../globals.css" // 👈 Ruta corregida para encontrar el CSS fuera
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

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
    icon: '/icon.png',
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050505",
}

// Generamos las rutas estáticas para inglés y español
export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'es'}];
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="bg-background">
      <body className={`${_inter.className} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <div className="grain-overlay" />
          <Navigation />
          <main className="pt-16 md:pt-20 min-h-screen">
            {children}
          </main>
          <SoundPlayer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}