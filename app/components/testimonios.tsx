'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const people = [
  {
    name: 'Natalia Velazquez',
    testimonial: 'Las mejores piezas a precios justos. Mi auto ahora funciona de maravilla gracias a ellos.',
    imageUrl:
      'https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/marketing.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL21hcmtldGluZy53ZWJwIiwiaWF0IjoxNzI5NjM1NTkxLCJleHAiOjE3NjExNzE1OTF9.SS1CzB7ZetwfB4IO33FI7PpYF_al3laGqSYGENvnVsM&t=2024-10-22T22%3A19%3A33.013Z'
  },
  {
    name: 'Miguel Rodriguez',
    testimonial: 'Piezas originales a precios accesibles, ¡una combinación perfecta!',
    imageUrl:
      'https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/mecanico.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL21lY2FuaWNvLndlYnAiLCJpYXQiOjE3Mjk2MzU1MjMsImV4cCI6MTc2MTE3MTUyM30.N-ZB0FFWeoUb-Da6PfyY_RAXrF8ufqt0M-KtI57ULwI&t=2024-10-22T22%3A18%3A24.712Z'
  },
  {
    name: 'Daniel Fernandez',
    testimonial: 'Recomiendo esta página a todos. Repuestos de calidad y precios accesibles.',
    imageUrl:
      'https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/vendedor.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL3ZlbmRlZG9yLndlYnAiLCJpYXQiOjE3Mjk2MzU1NjUsImV4cCI6MTc2MTE3MTU2NX0.7OSTCAuC0tz9wsEXHHaV0je6GVNqacVtW8WB0bDRCl0&t=2024-10-22T22%3A19%3A06.691Z'
  },
  {
    name: 'Erick Marin',
    testimonial: 'El mejor lugar para encontrar autopartes difíciles de hallar. ¡Muy satisfecho!',
    imageUrl:
      'https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/vendedor.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL3ZlbmRlZG9yLndlYnAiLCJpYXQiOjE3Mjk2MzU1NjUsImV4cCI6MTc2MTE3MTU2NX0.7OSTCAuC0tz9wsEXHHaV0je6GVNqacVtW8WB0bDRCl0&t=2024-10-22T22%3A19%3A06.691Z'
  }
]

export default function Testimonios() {
  return (
    <>
      <div className="w-full mx-auto lg:px-28 2xl:px-56 px-6 py-14 lg:py-24 2xl:py-32 text-custom-beige" 
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/images/landing4.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
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
                  <Avatar className="w-24 h-24 shadow-lg border-2 border-custom-beige">
                    <AvatarImage src={person.imageUrl} className="image-cover" />
                    <AvatarFallback className="text-3xl font-semibold">CN</AvatarFallback>
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
    </>
  )
}
