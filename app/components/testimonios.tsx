'use client'

import Image from 'next/image'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const people = [
  {
    name: 'Natalia Velazquez',
    testimonial: 'Las mejores piezas a precios justos. Mi auto ahora funciona de maravilla gracias a ellos.',
    imageUrl: '/images/cliente1.webp'
  },
  {
    name: 'Miguel Rodriguez',
    testimonial: 'Piezas originales a precios accesibles, ¡una combinación perfecta!',
    imageUrl: '/images/cliente5.webp'
  },
  {
    name: 'Daniel Fernandez',
    testimonial: 'Recomiendo esta página a todos. Repuestos de calidad y precios accesibles.',
    imageUrl: '/images/cliente3.webp'
  },
  {
    name: 'Erick Marin',
    testimonial: 'El mejor lugar para encontrar autopartes difíciles de hallar. ¡Muy satisfecho!',
    imageUrl: '/images/cliente2.webp'
  }
]

export default function Testimonios() {
  return (
    <div className="relative w-full mx-auto lg:px-28 2xl:px-56 px-6 py-14 lg:py-24 2xl:py-32 text-custom-beige">
      <Image
        src="/images/landing37.webp"
        alt="Fondo de testimonios de clientes"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10">
        <div className="grid space-y-4 mb-12">
          <h1 className="text-5xl montserrat font-bold">
            Testimonios
          </h1>
          <h2 className="text-2xl">
            Conoce las experiencias de nuestros clientes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {people.map((person, index) => (
            <Card key={index} className="h-[450px] p-6 rounded-lg flex flex-col justify-between glass text-white border-none">
              <CardHeader>
                <div className="flex justify-center">
                  <Avatar className="w-24 h-24 shadow-lg border-2 border-custom-beige relative">
                    <Image
                      src={person.imageUrl}
                      alt=""
                      fill
                      className="object-cover rounded-full"
                      sizes="(max-width: 96px) 100vw, 96px"
                    />
                    <AvatarFallback className="text-3xl font-semibold text-custom-blue">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-lg text-center italic leading-relaxed">
                  {`"${person.testimonial}"`}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <h2 className="text-center mt-4 text-custom-beige font-bold text-xl">
                  {person.name}
                </h2>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}