import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductosSeccion() {
  const cards = [
    { title: "Rines", image: "/images/rines.webp" },
    { title: "Faros", image: "/images/faros.webp" },
    { title: "Retrovisores", image: "/images/retrovisores.webp" },
    { title: "Asientos", image: "/images/asientos2.webp" },
    { title: "Aceite", image: "/images/aceite.webp" },
    { title: "Pintura", image: "/images/pintura.webp" },
  ]

  return (
    <div className="w-full mx-auto lg:px-28 2xl:px-56 px-6 bg-custom-blue py-16 text-custom-beige">
      <div className="grid space-y-4 mb-16">
        <h1 className="text-5xl montserrat font-bold">
          Productos
        </h1>
        <h2 className="text-2xl">
          Explora algunos de nuestros productos
        </h2>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="ml-2 md:-ml-4">
          {cards.map((card, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="h-full">
                <Card className="overflow-hidden h-full border-0">
                  <CardContent className="p-0 relative aspect-[3/4]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent flex items-end">
                      <h3 className="text-white text-lg font-bold p-2">{card.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 h-full bg-transparent hover:bg-black/10 hover:text-custom-beige rounded-lg w-12 hidden md:flex" variant={"ghost"} />
        <CarouselNext className="absolute right-0 h-full bg-transparent hover:bg-black/10 hover:text-custom-beige rounded-lg w-12 hidden md:flex" variant={"ghost"} />
      </Carousel>

      <div className="text-center">
        <Link href='/productos'>
          <Button className="mt-16 w-40 h-12 bg-custom-beige text-custom-blue hover:bg-custom-blue hover:text-custom-beige hover:border-custom-beige hover:border">
            Ver productos
          </Button>
        </Link>
      </div>
    </div>
  )
}