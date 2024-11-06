"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Car, History, Target, Users } from "lucide-react";
import Image from "next/image";

export default function Nosotros() {
  return (
    <div className="container mx-auto py-10 px-8 md:px-28">
      <h1 className="text-6xl font-bold text-black mb-10">
        Sobre Nosotros
      </h1>

      <div className="space-y-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <History className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Nuestra Historia
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Fundada en 2024, Junker nació de la pasión por los automóviles y
              la necesidad de simplificar la búsqueda de repuestos y accesorios
              para vehiculos en Honduras. Comenzamos como una propuesta de
              proyecto en la universidad, con la visión de revolucionar el
              mercado de repuestos automotrices en línea en nuestro país. Hoy,
              nos enorgullece ser un referente en la industria, conectando a
              muchas personas desde, vendedores indipendientes hasta dueños de
              Yonkers en cualquier lugar.
            </p>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/images/historia2.webp"
              alt="Vintage car workshop"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-24">
          <div className="lg:w-1/2">
            <Image
              src="/images/landing3.webp"
              alt="Modern car parts"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              width={1000}
              height={1000}
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Misión</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              En Junker, nuestra misión es proporcionar a los entusiastas y
              profesionales del automóvil una plataforma confiable y eficiente
              para encontrar y adquirir repuestos y accesorios de calidad. Nos
              esforzamos por simplificar el proceso de compra, ofreciendo:
            </p>
            <ul className="space-y-3">
              {[
                "Una amplia selección de productos de calidad",
                "Precios competitivos y transparentes",
                "Un servicio al cliente excepcional",
                "Información detallada y precisa sobre cada producto",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Car className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Visión</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Aspiramos a ser la plataforma líder a nivel global en la venta de
              repuestos y accesorios para vehículos. Buscamos:
            </p>
            <ul className="space-y-3">
              {[
                "Ser reconocidos por nuestra innovación y calidad",
                "Revolucionar la industria con tecnología de vanguardia",
                "Facilitar el acceso a piezas para todo tipo de vehículos",
                "Mejorar la experiencia de mantenimiento vehicular",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/images/landing21.webp"
              alt="Vision"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-24">
          <div className="lg:w-1/2">
            <Image
              src="/images/landing8.webp"
              alt="Modern car parts"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              width={1000}
              height={1000}
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Nuestro Compromiso
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              En Junker, la calidad es nuestra prioridad. Trabajamos solo con
              proveedores confiables y ofrecemos garantías en todos nuestros
              productos. Nuestro riguroso control de calidad asegura que cada
              pieza cumpla con los más altos estándares de la industria.
            </p>
            <ul className="space-y-3">
              {[
                "Una amplia selección de productos de calidad",
                "Información detallada y precisa sobre cada producto",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Nuestro Equipo
              </h2>
            </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              El corazón de Junker es nuestro equipo diverso y apasionado.
              Contamos con expertos en tecnología, especialistas en automoción y
              profesionales del servicio al cliente, todos unidos por el amor a
              los automóviles y el compromiso con la excelencia.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
