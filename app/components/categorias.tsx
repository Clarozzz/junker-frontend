'use client'

import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { useState } from "react"

export default function Categorias() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const items = [
    { title: "Accesorios internos", image: "/images/accesorios.webp" },
    { title: "Motor y transmisión", image: "/images/motores.webp" },
    { title: "Frenos y discos", image: "/images/discos.webp" },
    { title: "Ruedas", image: "/images/ruedas2.webp" },
    { title: "Carrocería", image: "/images/carroceria.webp" },
  ]

  return (
    <div className="w-full mx-auto lg:px-28 2xl:px-56 px-6 bg-custom-beige py-12 text-custom-blue">
      <div className="grid space-y-4 mb-12">
        <h1 className="text-5xl montserrat font-bold">
          Categorías
        </h1>
        <h2 className="text-2xl">
          Explora produtos por categorías
        </h2>
      </div>
      <div className="md:flex gap-4">
        {items.map((item, index) => (
          <Card
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative h-[600px] transition-all duration-300 ease-in-out ${hoveredIndex === index ? 'w-3/5' : 'w-1/5'} cursor-pointer group overflow-hidden`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="transition-transform duration-300 group-hover:scale-110 image-cover"
            />

            <div className="absolute inset-0 bg-black/50 opacity-100 group-hover:opacity-50 transition-opacity duration-300"></div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}