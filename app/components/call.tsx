'use client'

import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function CallSection() {
  const words = [
    {
      text: "Los",
      className: "montserrat text-white"
    },
    {
      text: "mejores",
      className: "montserrat text-white"
    },
    {
      text: "repuestos",
      className: "montserrat text-white"
    },
    {
      text: "para",
      className: "montserrat text-white"
    },
    {
      text: "tu",
      className: "montserrat text-white"
    },
    {
      text: "auto",
      className: "montserrat text-white"
    },
    {
      text: "en",
      className: "montserrat text-white"
    },
    {
      text: "Junker",
      className: "montserrat text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="relative flex flex-col items-center justify-center h-[45rem] bg-slate-100"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/landing11.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <p className="text-white dark:text-neutral-200 text-2xl mb-10">
        ¡El camino a la excelencia automotriz comienza aquí!
      </p>
      <TypewriterEffect words={words} className="" />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-6 mt-10">
        <Button
          className="w-40 h-12 rounded-xl bg-blue-900 text-white text-md shadow-lg hover:bg-blue-700"
          onClick={() => window.location.href = '/login'}
        >
          Iniciar Sesión
        </Button>
        <Button
          className="w-40 h-12 rounded-xl bg-custom-beige text-black text-md shadow-lg hover:bg-orange-200"
          onClick={() => window.location.href = '/registro'}
        >
          Registrarse
        </Button>
      </div>
    </div>
  );
}
