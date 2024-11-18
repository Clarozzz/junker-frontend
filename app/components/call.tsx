'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import Link from 'next/link'

export default function CallSection() {

  const words = [
    { text: "Los", className: "montserrat text-white" },
    { text: "mejores", className: "montserrat text-white" },
    { text: "repuestos", className: "montserrat text-white" },
    { text: "para", className: "montserrat text-white" },
    { text: "tu", className: "montserrat text-white" },
    { text: "auto", className: "montserrat text-white" },
    { text: "en", className: "montserrat text-white" },
    { text: "Junker", className: "montserrat text-custom-blue2" },
  ]

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      <Image
        src="/images/landing11.webp"
        alt="Background"
        fill
        className='image-cover'
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <p className="text-white dark:text-neutral-200 text-lg lg:text-2xl mb-10 text-center px-10">
          ¡El camino a la excelencia automotriz comienza aquí!
        </p>
        <TypewriterEffect words={words} className="px-4 text-3xl" />

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-6 mt-10 z-20">
              <Button
                className="w-40 h-12 rounded-lg text-md shadow-lg bg-slate-950 hover:bg-slate-800 text-white transition-all duration-200"
                asChild
              >
                <Link href="/productos">
                  Ver tienda
                </Link>
              </Button>
              <Button
                className="w-40 h-12 rounded-lg bg-custom-blue2 text-black text-md shadow-lg hover:bg-custom-blue2 hover:brightness-125 transition-all duration-300"
                asChild
              >
                <Link href="/publicar">
                  Vender
                </Link>
              </Button>
        </div>
      </div>
    </div>
  )
}