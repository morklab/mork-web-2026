import React from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: React.ElementType;
  color?: string; // <-- LA ARTILLERÍA PESADA: Nuevo prop para forzar el color
}

export function GlitchText({ children, className = "", as: Component = "span", color }: GlitchTextProps) {
  return (
    <Component
      className={`glitch-text ${color ? "custom-colored-glitch" : ""} ${className}`}
      data-text={children}
      style={{ 
        position: "relative", 
        display: "inline-block",
        // Si nos pasan un color, lo inyectamos como variable CSS nativa
        ...(color ? { "--forced-color": color } as React.CSSProperties : {})
      }}
    >
      {children}
      
      {/* Forzamos a fuego que tanto el texto como sus clones usen esa variable */}
      {color && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .custom-colored-glitch { color: var(--forced-color) !important; }
            .custom-colored-glitch::before { color: var(--forced-color) !important; }
            .custom-colored-glitch::after { color: var(--forced-color) !important; }
          `
        }} />
      )}
    </Component>
  );
}