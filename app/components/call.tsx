'use client'

import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function CallSection() {
  const words = [
    {
      text: "Los",
    },
    {
      text: "mejores",
    },
    {
      text: "repuestos",
    },
    {
        text: "para",
    },
    {
        text: "tu",
    },
    {
        text: "auto",
    },
    {
        text: "en",
    },
    {
      text: "Junker.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[30rem] my-2 bg-slate-100">
      <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
      ¡El camino a la excelencia automotriz comienza aquí!
      </p>
      <TypewriterEffect words={words} className="" />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Button 
        className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
        onClick={() => window.location.href='/login'}
        >
          Iniciar Sesión
        </Button>
        <Button 
        className="w-40 h-10 rounded-xl bg-white text-black border hover:bg-slate-100 border-black  text-sm"
        onClick={() => window.location.href='/registro'}
        >
          Registrarse
        </Button>
      </div>
    </div>
  );
}
