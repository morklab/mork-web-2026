import React from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: React.ElementType;
}

export function GlitchText({ children, className = "", as: Component = "span" }: GlitchTextProps) {
  return (
    <Component
      className={`glitch ${className}`}
      data-text={children}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
    </Component>
  );
}