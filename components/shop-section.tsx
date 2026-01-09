"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ShoppingBag, X, Plus, Minus, MessageCircle, Mail } from "lucide-react"
import { GlitchText } from "@/components/ui/glitch-text"
import clsx from "clsx"
import { useTranslations } from "next-intl"

// --- INTERFACES ---
interface Product {
  id: string
  name: string
  category: "apparel" | "accessories"
  price: number
  image: string
  description: string
  sizes?: string[]
  colors?: string[]
  soldOut?: boolean
}

interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export function ShopSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "apparel" | "accessories">("all")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")

  // --- LOGICA DE CARRUSEL TIPO 'RITUAL ECHOES' ---
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const isTouchingRef = useRef(false)
  const scrollTimeoutRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<any[]>([])

  const t = useTranslations("Shop")
  const genericDesc = "Limited edition item. Official MØRK merchandising designed in Mallorca."

  // --- DATOS PRODUCTOS ---
  const products: Product[] = [
    // ... (Tus productos intactos)
    { id: "tee-01", name: "T-Shirt Ritual 01", category: "apparel", price: 35, image: "/tshirt-1.jpg", description: genericDesc, sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: "tee-02", name: "T-Shirt Ritual 02", category: "apparel", price: 35, image: "/tshirt-2.jpg", description: genericDesc, sizes: ["S", "M", "L", "XL"] },
    { id: "tee-03", name: "T-Shirt Ritual 03", category: "apparel", price: 35, image: "/tshirt-3.jpg", description: genericDesc, sizes: ["S", "M", "L", "XL"] },
    { id: "tee-04", name: "T-Shirt Ritual 04", category: "apparel", price: 35, image: "/tshirt-4.jpg", description: genericDesc, sizes: ["S", "M", "L", "XL"] },
    { id: "tee-05", name: "T-Shirt Ritual 05", category: "apparel", price: 35, image: "/tshirt-5.jpg", description: genericDesc, sizes: ["S", "M", "L", "XL"] },
    { id: "tee-06", name: "T-Shirt Ritual 06", category: "apparel", price: 35, image: "/tshirt-6.jpg", description: genericDesc, sizes: ["S", "M", "L", "XL"] },
    { id: "tee-07", name: "T-Shirt Ritual 07", category: "apparel", price: 35, image: "/tshirt-7.jpg", description: genericDesc, sizes: ["S", "M", "L", "XL"] },
    { id: "tee-08", name: "T-Shirt Ritual 08", category: "apparel", price: 35, image: "/tshirt-8.jpg", description: genericDesc, sizes: ["S", "M", "L", "XL"] },
    { id: "tee-09", name: "T-Shirt Ritual 09", category: "apparel", price: 35, image: "/tshirt-9.jpg", description: genericDesc, sizes: ["S", "M", "L", "XL", "XXL"] },
    { id: "key-01", name: "Keychain Limited", category: "accessories", price: 12, image: "/bicolor.png", description: "Premium metal keychain.", colors: ["Black&RED"] },
    { id: "key-02", name: "Keychain Black", category: "accessories", price: 12, image: "/negro.png", description: "Industrial rubber keychain.", colors: ["BLACK"] },
    { id: "key-03", name: "Keychain Red", category: "accessories", price: 12, image: "/rojo.png", description: "Full neck lanyard.", colors: ["RED"] }
  ]

  const tabs = [
    { id: "all", label: t("cat_all") },
    { id: "apparel", label: t("cat_apparel") },
    { id: "accessories", label: t("cat_accessories") },
  ] as const

  const filteredProducts = products.filter((p) => activeCategory === "all" || p.category === activeCategory)

  // --- CALCULO AUTOMATICO DEL CENTRO (Móvil) ---
  const calculateCenterItem = () => {
    if (!containerRef.current) return
    const container = containerRef.current
    const containerCenter = container.scrollLeft + (container.clientWidth / 2)
    let closestIndex = null
    let minDistance = Infinity
    
    // Solo iteramos sobre los visibles (filteredProducts)
    // NOTA: itemsRef debe limpiarse o gestionarse con cuidado al filtrar
    filteredProducts.forEach((_, index) => {
        const el = itemsRef.current[index]
        if (!el) return
        const itemCenter = el.offsetLeft + (el.offsetWidth / 2)
        const distance = Math.abs(containerCenter - itemCenter)
        if (distance < minDistance) {
            minDistance = distance
            closestIndex = index
        }
    })
    setHoveredIndex(closestIndex)
  }

  const handleScroll = () => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    calculateCenterItem()
    scrollTimeoutRef.current = setTimeout(() => {
       if (!isTouchingRef.current) {
         // Opcional: Centrar en desktop si quieres, o dejarlo libre
       }
    }, 100)
  }

  // --- LÓGICA CARRITO ---
  const addToCart = (product: Product, size?: string, color?: string) => {
    if (product.soldOut) return
    const existingItem = cart.find((item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color)
    if (existingItem) {
      setCart(cart.map((item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: size, selectedColor: color }])
    }
    setSelectedProduct(null); setSelectedSize(""); setSelectedColor(""); setIsCartOpen(true)
  }

  const removeFromCart = (id: string, size?: string, color?: string) => {
    setCart(cart.filter((item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)))
  }

  const updateQuantity = (id: string, size: string | undefined, color: string | undefined, delta: number) => {
    setCart(cart.map((item) => {
          if (item.id === id && item.selectedSize === size && item.selectedColor === color) {
            const newQuantity = item.quantity + delta
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
          }
          return item
        }).filter((item) => item.quantity > 0))
  }

  const handleCheckoutWhatsApp = () => {
    let message = `Hola MØRK, me gustaría confirmar el siguiente pedido:\n\n`;
    cart.forEach(item => {
        message += `▪️ ${item.quantity}x ${item.name}`;
        if (item.selectedSize) message += ` [Talla: ${item.selectedSize}]`;
        if (item.selectedColor) message += ` [Color: ${item.selectedColor}]`;
        message += ` - ${item.price * item.quantity}€\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `\nTotal Estimado: ${total}€\n\nQuedo a la espera de las instrucciones de pago.`;
    window.open(`https://wa.me/34676182044?text=${encodeURIComponent(message)}`, '_blank');
  }

  const handleCheckoutEmail = () => {
    let message = `Hola MØRK, me gustaría confirmar el siguiente pedido:\n\n`;
    cart.forEach(item => {
        message += `▪️ ${item.quantity}x ${item.name}`;
        if (item.selectedSize) message += ` [Talla: ${item.selectedSize}]`;
        if (item.selectedColor) message += ` [Color: ${item.selectedColor}]`;
        message += ` - ${item.price * item.quantity}€\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `\nTotal Estimado: ${total}€\n\nQuedo a la espera de las instrucciones de pago.`;
    window.location.href = `mailto:info@mork.com?subject=${encodeURIComponent("NUEVO PEDIDO MØRK WEB")}&body=${encodeURIComponent(message)}`;
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <section id="shop" className="py-20 md:py-32 px-0 md:px-8 bg-black border-t border-white/5 relative overflow-hidden">
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-[1400px] mx-auto">
        
        {/* CABECERA */}
        <div className="mb-10 md:mb-16 flex flex-col items-center text-center px-4">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-bold no-glow">{t('subtitle')}</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
            <GlitchText>{t('title')}</GlitchText>
          </h2>
        </div>

        {/* FILTROS */}
        <div className="flex justify-center mb-8 md:mb-12 space-x-6 md:space-x-12 border-b border-white/10 pb-4 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveCategory(tab.id); setHoveredIndex(null); }} // Reset al cambiar filtro
              className={clsx(
                "text-[10px] md:text-sm tracking-[0.2em] uppercase transition-all duration-300 pb-4 relative whitespace-nowrap",
                activeCategory === tab.id 
                  ? "text-accent font-bold" 
                  : "text-muted-foreground hover:text-white"
              )}
            >
              {tab.label}
              {activeCategory === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              )}
            </button>
          ))}
        </div>

        {/* --- DOCK DE PRODUCTOS (LÓGICA AUTOMÁTICA) --- */}
        <div className="relative w-full flex flex-col items-center justify-center">
            
            <div 
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto gap-2 md:gap-4 px-[calc(50%-4rem)] pt-32 pb-12 snap-x snap-mandatory scrollbar-hide items-end w-full md:w-auto md:justify-center"
                onTouchStart={() => { isTouchingRef.current = true }}
                onTouchEnd={() => { isTouchingRef.current = false; handleScroll(); }}
            >
                {filteredProducts.map((product, index) => {
                    
                    // Lógica de distancia para Zoom (Igual que en Ritual Echoes)
                    const distanceFromHovered = hoveredIndex === null ? 999 : Math.abs(hoveredIndex - index)
                    const isSelected = hoveredIndex === index
                    
                    // Clases dinámicas según la distancia al centro/cursor
                    let scaleClass = "scale-75 opacity-60 grayscale brightness-[0.5] blur-[0.5px] z-10" 
                    let widthClass = "w-20 md:w-32"

                    if (distanceFromHovered === 0) {
                        scaleClass = "scale-[1.6] md:scale-[1.75] opacity-100 grayscale-0 brightness-100 blur-0 z-50 mx-4"
                    } else if (distanceFromHovered === 1) {
                        scaleClass = "scale-[1.1] md:scale-[1.2] opacity-80 grayscale-0 brightness-90 blur-0 z-40 mx-2"
                    }

                    return (
                        <div 
                            key={product.id} 
                            ref={(el) => { itemsRef.current[index] = el }}
                            className={clsx(
                                "group cursor-pointer flex-shrink-0 snap-center relative transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform origin-bottom",
                                widthClass,
                                scaleClass
                            )}
                            // En Desktop usamos hover, en Móvil usamos el cálculo automático
                            onMouseEnter={() => { if (!isTouchingRef.current) setHoveredIndex(index) }}
                            onMouseLeave={() => { if (!isTouchingRef.current) setHoveredIndex(null) }}
                            onClick={() => !product.soldOut && setSelectedProduct(product)}
                        >
                        
                            {/* Imagen */}
                            <div className={clsx(
                                "relative aspect-[3/4] bg-zinc-900 border border-white/10 overflow-hidden mb-1 transition-all duration-300 w-full shadow-lg rounded-sm",
                                isSelected ? "border-accent shadow-[0_0_30px_rgba(255,0,0,0.6)]" : "",
                                product.soldOut ? "opacity-50" : ""
                            )}>
                                <Image 
                                src={product.image || "/placeholder.svg"} 
                                alt={product.name} 
                                fill 
                                className="object-cover" 
                                />
                                
                                {product.soldOut && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                                    <span className="text-red-600 text-[8px] md:text-[10px] tracking-widest uppercase font-bold border border-red-600 px-1">Sold</span>
                                </div>
                                )}
                            </div>
                            
                            {/* Texto: Solo visible si está seleccionado/centrado */}
                            <div className={clsx(
                                "text-center transition-opacity duration-200 absolute -bottom-20 left-1/2 -translate-x-1/2 w-[200px] pointer-events-none",
                                isSelected ? "opacity-100 visible" : "opacity-0 invisible"
                            )}>
                                <div className="bg-black/90 backdrop-blur-md border border-white/10 p-2 rounded flex flex-col items-center shadow-xl">
                                    <h3 className="text-[6px] md:text-[8px] font-bold uppercase text-white mb-1 tracking-wider">
                                        {product.name}
                                    </h3>
                                    <p className="text-[4px] md:text-[5px] text-gray-400 uppercase tracking-wide leading-tight mb-1 max-w-[90%]">
                                        {product.description}
                                    </p>
                                    <p className="text-accent font-mono text-[6px] md:text-[8px] font-bold border-t border-white/10 pt-1 w-full mt-1">
                                        {product.price}€
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* --- TEXTO INFERIOR (Subido para estar más cerca) --- */}
            <div className="mt-8 mb-20 text-center px-4">
                <p className="text-red-600 font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-sm font-bold drop-shadow-[0_0_15px_rgba(220,38,38,0.9)] animate-pulse">
                    Designed for the Technø minds
                </p>
            </div>

        </div>

        {/* BOTÓN FLOTANTE CARRITO */}
        <button 
          onClick={() => setIsCartOpen(true)} 
          className={clsx(
            "fixed bottom-6 right-6 p-4 flex items-center gap-3 transition-all z-40 min-h-11 shadow-2xl rounded-full border border-white/10", 
            cartCount > 0 ? "bg-accent text-white hover:bg-red-600" : "bg-black text-white hover:bg-zinc-900"
          )}
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="text-sm font-mono font-bold pl-2 border-l border-white/20">{cartCount}</span>}
        </button>
      </div>

      {/* MODAL PRODUCTO (Detalle) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto grid md:grid-cols-2 relative">
            <div className="relative aspect-square md:aspect-auto md:h-full bg-zinc-900">
              <Image src={selectedProduct.image || "/placeholder.svg"} alt={selectedProduct.name} fill className="object-cover" />
            </div>
            <div className="p-6 md:p-10 flex flex-col h-full relative">
               <button onClick={() => { setSelectedProduct(null); setSelectedSize(""); setSelectedColor("") }} className="absolute top-4 right-4 text-white/50 hover:text-white p-2 z-10">
                <X size={24} />
              </button>
              
              <div className="mb-auto mt-8 md:mt-0">
                <p className="text-accent text-xs tracking-[0.2em] uppercase mb-2">
                  {selectedProduct.category === 'apparel' ? t('cat_apparel') : t('cat_accessories')}
                </p>
                <h3 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-white mb-4">
                  {selectedProduct.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>
                <p className="text-3xl font-mono text-white mb-8">
                  {selectedProduct.price}€
                </p>
                
                {selectedProduct.sizes && (
                  <div className="space-y-3 mb-6">
                    <p className="text-xs tracking-[0.2em] uppercase text-gray-500">Select Size</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button key={size} onClick={() => setSelectedSize(size)} className={clsx("px-4 py-2 md:px-6 md:py-3 border text-xs tracking-wider uppercase transition-all", selectedSize === size ? "border-white bg-white text-black font-bold" : "border-white/20 text-gray-400 hover:border-white hover:text-white")}>{size}</button>
                      ))}
                    </div>
                  </div>
                )}
                {selectedProduct.colors && (
                  <div className="space-y-3 mb-8">
                    <p className="text-xs tracking-[0.2em] uppercase text-gray-500">Select Color</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((color) => (
                        <button key={color} onClick={() => setSelectedColor(color)} className={clsx("px-4 py-2 md:px-6 md:py-3 border text-xs tracking-wider uppercase transition-all", selectedColor === color ? "border-white bg-white text-black font-bold" : "border-white/20 text-gray-400 hover:border-white hover:text-white")}>{color}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={() => addToCart(selectedProduct, selectedSize || undefined, selectedColor || undefined)} 
                disabled={(selectedProduct.sizes && !selectedSize) || (selectedProduct.colors && !selectedColor)} 
                className="w-full bg-accent text-white py-4 text-sm tracking-[0.2em] uppercase font-bold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-800 flex items-center justify-center gap-3 mt-4"
              >
                <Plus size={18} />
                {t('btn_buy')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR CARRITO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-zinc-950 border-l border-white/10 flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-lg font-black tracking-[0.2em] uppercase text-white">Your Cart</h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <ShoppingBag size={48} className="mb-4 opacity-20" />
                <p className="text-sm tracking-wide uppercase">Empty Cart</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cart.map((item, idx) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${idx}`} className="flex gap-4 pb-6 border-b border-white/5 last:border-0">
                      <div className="relative w-20 h-24 bg-zinc-900 flex-shrink-0 border border-white/5">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                            <h4 className="text-sm font-bold uppercase truncate text-white">{item.name}</h4>
                            <div className="flex gap-3 mt-1">
                                {item.selectedSize && <p className="text-gray-500 text-[10px] uppercase border border-white/10 px-1">{item.selectedSize}</p>}
                                {item.selectedColor && <p className="text-gray-500 text-[10px] uppercase border border-white/10 px-1">{item.selectedColor}</p>}
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-sm font-mono text-white">{item.price}€</p>
                            <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 px-2 py-1">
                                <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)} className="text-gray-400 hover:text-white"><Minus size={12} /></button>
                                <span className="text-xs font-mono w-4 text-center text-white">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)} className="text-gray-400 hover:text-white"><Plus size={12} /></button>
                            </div>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)} className="text-gray-600 hover:text-red-500 self-start"><X size={16} /></button>
                    </div>
                  ))}
                </div>
                
                {/* FOOTER: BOTONES DE ACCIÓN */}
                <div className="p-6 border-t border-white/10 space-y-3 bg-zinc-900/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm uppercase tracking-wide">Total</span>
                    <span className="text-2xl font-mono text-white">{cartTotal}€</span>
                  </div>
                  
                  <button onClick={handleCheckoutWhatsApp} className="w-full bg-green-600 text-white py-3 text-xs md:text-sm tracking-[0.2em] uppercase font-bold hover:bg-green-500 transition-colors flex items-center justify-center gap-2">
                    <MessageCircle size={16} />
                    WhatsApp
                  </button>

                  <button onClick={handleCheckoutEmail} className="w-full bg-red-900 text-white py-3 text-xs md:text-sm tracking-[0.2em] uppercase font-bold hover:bg-red-800 transition-colors flex items-center justify-center gap-2">
                    <Mail size={16} />
                    Email Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}