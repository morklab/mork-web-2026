"use client"

import { useState } from "react"
// 1. IMPORTAMOS EL EFECTO AQUÍ 👇
import { GlitchText } from "@/components/ui/glitch-text"

const events = [
  {
    date: "2026.02.14",
    day: "SAT",
    artist: "MANGLES b2b REEKO",
    subtitle: "A Night With Lanna Family",
    venue: "Wave Club",
    ticketUrl: "#",
  },
  {
    date: "2025.03.07",
    day: "SAT",
    artist: "SOL ORTEGA",
    subtitle: "A night with Sol Ortega",
    venue: "Wave Club",
    ticketUrl: "#",
  },
  {
    date: "2025.04.18",
    day: "SAT",
    artist: "FREDDY K",
    subtitle: "A night with Freddy K",
    venue: "Wave Club",
    ticketUrl: "#",
  },
  {
    date: "2025.05.9",
    day: "SAT",
    artist: "SETAOC MASS",
    subtitle: "A night with Setaoc Mass",
    venue: "Wave Club",
    ticketUrl: "#",
  },
]

export function EventsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="events" className="relative py-20 md:py-32 px-4 md:px-8 bg-background overflow-hidden">
      {/* Background image in black and white */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/colin-detras.JPEG')`,
          filter: 'grayscale(100%)',
          opacity: 0.4,
        }}
      />
      <div
        className="absolute right-0 bottom-0 bg-gradient-to-b from-background/70 via-background/80 to-background"
        style={{ left: "auto", top: "auto" }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">Upcoming</p>
          
          {/* 2. AQUÍ APLICAMOS EL GLITCH 👇 */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[0.05em] uppercase text-foreground">
            <GlitchText>THE LINEUP</GlitchText>
          </h2>
        </div>

        {/* Events List */}
        <div className="border-t border-border">
          {events.map((event, index) => (
            <a
              key={index}
              href={event.ticketUrl}
              className="group block border-b border-border py-6 md:py-8 transition-colors hover:bg-secondary/30"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Date */}
                <div className="flex items-center gap-4 md:w-48">
                  <span className="text-muted-foreground text-xs tracking-[0.2em] font-mono">{event.date}</span>
                  <span className="text-accent text-xs tracking-[0.2em]">{event.day}</span>
                </div>

                {/* Artist Name */}
                <div className="flex-1">
                  <h3
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[0.05em] uppercase transition-colors ${
                      hoveredIndex === index ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {event.artist}
                  </h3>
                  <p className="text-muted-foreground text-sm tracking-wider mt-1">{event.subtitle}</p>
                </div>

                {/* Venue & Ticket */}
                <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8">
                  <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">{event.venue}</span>
                  <span className="text-foreground border border-foreground px-4 py-2 text-xs tracking-[0.2em] uppercase group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all min-h-11 flex items-center">
                    Tickets
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <a
            href="#tickets"
            className="text-muted-foreground text-xs tracking-[0.3em] uppercase hover:text-accent transition-colors"
          >
            View All Events →
          </a>
        </div>
      </div>
    </section>
  )
}