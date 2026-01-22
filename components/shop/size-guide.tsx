"use client"

import { useState } from "react"
import { X, Ruler, ShoppingBag, Plus } from "lucide-react" 
import { useLocale } from "next-intl"

interface SizeGuideProps {
  onSelectSize?: (size: string) => void;
}

export function SizeGuide({ onSelectSize }: SizeGuideProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const locale = useLocale()
  const isEs = locale.startsWith('es')
  
  const t = {
    btn: isEs ? "Guía de Tallas" : "Size Guide",
    title: isEs ? "Guía de Tallas" : "Size Guide",
    col_size: isEs ? "Talla" : "Size",
    col_width: isEs ? "Ancho (A)" : "Width (A)",
    col_length: isEs ? "Largo (B)" : "Length (B)",
    hint: isEs ? "Haz clic en una fila para añadir al carrito" : "Click on a row to add to cart"
  }

  const sizes = [
    { label: "XS",  width: "53 cm", length: "72 cm" },
    { label: "S",   width: "56 cm", length: "74 cm" },
    { label: "M",   width: "59 cm", length: "76 cm" },
    { label: "L",   width: "62 cm", length: "78 cm" },
    { label: "XL",  width: "65 cm", length: "80 cm" },
    { label: "2XL", width: "68 cm", length: "82 cm" },
  ]

  const handleRowClick = (sizeLabel: string) => {
    if (onSelectSize) {
      onSelectSize(sizeLabel)
      setIsOpen(false)
    }
  }

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsOpen(false)
  }

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-widest font-bold mt-4 border-b border-transparent hover:border-red-600 pb-0.5 w-fit"
      >
        <Ruler className="w-3 h-3 group-hover:text-red-600 transition-colors" />
        {t.btn}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
            onClick={handleClose}
          />

          <div className="relative bg-zinc-950 border border-zinc-800 p-6 max-w-sm w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in duration-200 rounded-lg">
            
            <button 
              type="button"
              onClick={handleClose}
              className="absolute -top-3 -right-3 md:top-3 md:right-3 bg-zinc-800 text-white hover:bg-red-600 hover:text-white p-2 rounded-full shadow-lg transition-all z-50 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-center text-white drop-shadow-lg">
              {t.title}
            </h3>
            
            <p className="text-[9px] text-zinc-500 text-center mb-6 uppercase tracking-wider flex items-center justify-center gap-1">
               <ShoppingBag size={10} /> {t.hint}
            </p>

            {/* DIAGRAMA AJUSTADO: Flechas cortas y letras dentro */}
            <div className="flex justify-center mb-8">
               <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible">
                     {/* Camiseta Contorno */}
                     <path 
                        d="M25 20 L10 35 L18 43 L28 35 V85 H72 V35 L82 43 L90 35 L75 20 H60 L50 28 L40 20 Z" 
                        stroke="#e4e4e7" 
                        strokeWidth="2"
                        strokeLinejoin="round"
                        fill="none" 
                     />
                     
                     {/* --- FLECHA A (ANCHO) --- */}
                     {/* Horizontal: Más corta, centrada dentro del pecho (x=30 a x=70) */}
                     <path d="M30 42 H70" stroke="#dc2626" strokeWidth="1.5" />
                     {/* Puntas */}
                     <path d="M30 42 L34 39 M30 42 L34 45" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
                     <path d="M70 42 L66 39 M70 42 L66 45" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
                     
                     {/* Letra A: DENTRO, bajo la flecha derecha */}
                     <text x="62" y="58" className="text-[14px] fill-red-600 font-bold font-mono">A</text>


                     {/* --- FLECHA B (LARGO) --- */}
                     {/* Vertical: Más corta, desde cuello hasta casi el fondo (y=30 a y=82) */}
                     <path d="M45 28 V82" stroke="#dc2626" strokeWidth="1.5" />
                     {/* Puntas */}
                     <path d="M45 28 L42 32 M45 28 L48 32" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
                     <path d="M45 82 L42 78 M45 82 L48 78" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />

                     {/* Letra B: DENTRO, esquina inferior izquierda */}
                     <text x="32" y="78" className="text-[14px] fill-red-600 font-bold font-mono">B</text>
                  </svg>
               </div>
            </div>

            {/* TABLA INTERACTIVA */}
            <div className="overflow-hidden border border-zinc-800 rounded-md bg-zinc-900/30">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900 text-zinc-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4 font-bold border-b border-zinc-800 text-center">{t.col_size}</th>
                    <th className="py-3 px-4 font-normal border-b border-zinc-800 text-center text-red-500">{t.col_width}</th>
                    <th className="py-3 px-4 font-normal border-b border-zinc-800 text-center text-red-500">{t.col_length}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {sizes.map((size, i) => (
                    <tr 
                      key={i} 
                      onClick={() => handleRowClick(size.label)}
                      className="group/row hover:bg-red-900/20 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 font-black text-white text-center group-hover/row:text-red-500 transition-colors flex items-center justify-center gap-2">
                        {size.label}
                        <Plus size={10} className="opacity-0 group-hover/row:opacity-100 transition-opacity text-red-500" />
                      </td>
                      <td className="py-3 px-4 text-center group-hover/row:text-white">{size.width}</td>
                      <td className="py-3 px-4 text-center group-hover/row:text-white">{size.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}
    </>
  )
}