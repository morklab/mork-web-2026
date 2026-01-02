"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/GALLETA_ROJA.PNG"
              alt="MØRK Lab"
              width={40}
              height={40}
              className="rounded"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#events"
              className="text-muted-foreground hover:text-accent text-xs tracking-[0.2em] uppercase transition-colors"
            >
              Events
            </Link>
            <Link
              href="#residents"
              className="text-muted-foreground hover:text-accent text-xs tracking-[0.2em] uppercase transition-colors"
            >
              Residents
            </Link>
            <Link
              href="#manifesto"
              className="text-muted-foreground hover:text-accent text-xs tracking-[0.2em] uppercase transition-colors"
            >
              Manifesto
             </Link>
             <Link
              href="#visuals"
             className="text-muted-foreground hover:text-accent text-xs tracking-[0.2em] uppercase transition-colors"
           >
              RITUAL ECHOES
            </Link>
            <Link
              href="#team"
              className="text-muted-foreground hover:text-accent text-xs tracking-[0.2em] uppercase transition-colors"
            >
              Team
            </Link>
            <Link
              href="#sound"
              className="text-muted-foreground hover:text-accent text-xs tracking-[0.2em] uppercase transition-colors"
            >
              Sound
            </Link>
            <Link
              href="#shop"
              className="text-muted-foreground hover:text-accent text-xs tracking-[0.2em] uppercase transition-colors"
            >
              Shop
            </Link>
            <Link
              href="https://www.instagram.com/mork.lab/"
              target="_blank"
              className="text-foreground border border-foreground px-4 py-2 text-xs tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all"
            >
              Follow
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2 min-h-11 min-w-11 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-6 flex flex-col gap-4">
            <Link
              href="#events"
              onClick={() => setIsOpen(false)}
              className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border"
            >
              Events
            </Link>
            <Link
              href="#residents"
              onClick={() => setIsOpen(false)}
              className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border"
            >
              Residents
            </Link>
            <Link
              href="#manifesto"
              onClick={() => setIsOpen(false)}
              className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border"
            >
              Manifesto
            </Link>
            <Link
              href="#visuals"
              onClick={() => setIsOpen(false)}
              className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border"
            >
              Visuals
            </Link>
            <Link
              href="#team"
              onClick={() => setIsOpen(false)}
              className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border"
            >
              Team
            </Link>
            <Link
              href="#sound"
              onClick={() => setIsOpen(false)}
              className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border"
            >
              Sound
            </Link>
            <Link
              href="#shop"
              onClick={() => setIsOpen(false)}
              className="text-foreground text-lg tracking-[0.2em] uppercase py-3 border-b border-border"
            >
              Shop
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="text-foreground border border-foreground px-4 py-3 text-lg tracking-[0.2em] uppercase text-center mt-4 hover:bg-foreground hover:text-background transition-all"
            >
              Follow Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
