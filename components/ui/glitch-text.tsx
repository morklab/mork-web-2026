import React from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: React.ElementType;
}

export function GlitchText({ children, className = "", as: Component = "span" }: GlitchTextProps) {
  return (
    <Component
      /* 👇 CORREGIDO: Ahora usamos "glitch-text" para que el CSS lo reconozca */
      className={`glitch-text ${className}`}
      data-text={children}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
    </Component>
  );
}