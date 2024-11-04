"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, ShoppingCart, Globe, User } from "lucide-react";

const services = [
  {
    title: "Búsqueda Avanzada de Repuestos",
    description:
      "Encuentra fácilmente las piezas exactas para tu vehículo con nuestro sistema de búsqueda inteligente. Utiliza filtros por precio, estado del producto y categoría de producto para obtener resultados precisos.",
    icon: Search,
    image: "/images/carroceria.webp",
    features: ["Filtros avanzados por productos", "Sugerencias inteligentes"],
  },
  {
    title: "Compra Segura",
    description:
      "Disfruta de un proceso de compra simplificado con múltiples opciones de pago y garantía de satisfacción. Nuestra plataforma utiliza encriptación de última generación para proteger tus datos.",
    icon: ShoppingCart,
    image: "/images/pintura.webp",
    features: [
      "Múltiples métodos de pago",
      "Proceso de checkout simplificado",
      "Protección contra fraudes",
    ],
  },
  {
    title: "Soporte Personalizado para Compradores",
    description:
      "Recibe asistencia directa de nuestro equipo de expertos para asegurarte de que encuentres el repuesto adecuado para tu vehículo. Ofrecemos ayuda en tiempo real y asesoramiento personalizado.",
    icon: User,
    image: "/images/landing11.webp",
    features: [
      "Asistencia en tiempo real",
      "Asesoramiento personalizado",
      "Soporte posventa",
    ],
  },
  {
    title: "Única Plataforma en Línea en el País",
    description:
      "Accede a la única plataforma en línea en el país dedicada exclusivamente a la venta de repuestos y accesorios para vehículos. Encuentra lo que necesitas de manera rápida y conveniente desde cualquier lugar.",
    icon: Globe,
    image: "/images/landing37.webp",
    features: [
      "Acceso exclusivo en línea",
      "Comodidad y rapidez",
      "Disponibilidad en todo el país",
    ],
  },
];

export default function Servicios() {
  return (
    <div>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-custom-blue">
          Nuestros Servicios
        </h1>
        <p className="text-xl mb-12 max-w-7xl mx-auto">
          En Junker, nos dedicamos a proporcionar una experiencia completa en la
          compra de repuestos y accesorios para vehículos. Nuestros servicios
          están diseñados para hacer que tu experiencia sea fácil, segura y
          satisfactoria, desde la búsqueda hasta la instalación.
        </p>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col h-full overflow-hidden">
              <Image
                src={service.image}
                alt={`Imagen ilustrativa de ${service.title}`}
                width={700}
                height={500}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {service.description}
                </CardDescription>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div
            className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
            aria-hidden="true"
          >
            <div className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#F3F0CA] to-[#2FA3EB] opacity-30"></div>
          </div>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base/7 font-semibold text-custom-blue">
              Planes
            </h2>
            <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Elige el plan adecuado para ti
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
            Elige un plan que se adapte a tu negocio para obtener mas
            beneficios.
          </p>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
            <div className="rounded-3xl rounded-t-3xl bg-slate-100 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-bl-3xl lg:rounded-tr-none">
              <h3
                id="tier-hobby"
                className="text-base/7 font-semibold text-custom-blue"
              >
                Gratis
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-5xl font-semibold tracking-tight text-gray-900">
                  Lps. 0
                </span>
                <span className="text-base text-gray-500">/mes</span>
              </p>
              <p className="mt-6 text-base/7 text-gray-600">
                El plan perfecto para empezar a vender tus productos.
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10"
              >
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-custom-blue"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
                  </svg>
                  Publica 25 productos
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-custom-blue"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
                  </svg>
                  Marketing
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-custom-blue"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
                  </svg>
                  Analisis avanzado
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-custom-blue"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
                  </svg>
                  Dedicamos soporte personalizado.
                </li>
              </ul>
              {/* <a
                href="#"
                aria-describedby="tier-hobby"
                className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold bg-custom-blue text-slate-50 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customtext-custom-blue sm:mt-10"
              >
                Empieza hoy
              </a> */}
            </div>
            <div className="relative rounded-3xl bg-gray-900 p-8 shadow-2xl ring-1 ring-gray-900/10 sm:p-10">
              <h3
                id="tier-enterprise"
                className="text-base/7 font-semibold text-custom-blue2"
              >
                Premium
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-5xl font-semibold tracking-tight text-white">
                  Lps. 200
                </span>
                <span className="text-base text-gray-400">/mes</span>
              </p>
              <p className="mt-6 text-base/7 text-gray-300">
                Te brindamos soporte y publicidad de tus productos
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10"
              >
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-custom-blue2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
                  </svg>
                  Poductos ilimitados
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-custom-blue2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
                  </svg>
                  Publicidad de tus productos
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-custom-blue2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
                  </svg>
                  Analisis Avanzado
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-custom-blue2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
                  </svg>
                  Dedicamos soporte personalizado.
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-custom-blue2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
                  </svg>
                  Marketing
                </li>
                <li className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-custom-blue2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
                  </svg>
                  Personalizacion de los productos.
                </li>
              </ul>
              <a
                href="#"
                aria-describedby="tier-enterprise"
                className="mt-8 block rounded-md bg-custom-blue2 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custombg-custom-blue2 sm:mt-10"
              >
                Empieza hoy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
