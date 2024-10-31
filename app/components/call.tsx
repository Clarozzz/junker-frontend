'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function CallSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('access_token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const words = [
    { text: "Los", className: "montserrat text-white" },
    { text: "mejores", className: "montserrat text-white" },
    { text: "repuestos", className: "montserrat text-white" },
    { text: "para", className: "montserrat text-white" },
    { text: "tu", className: "montserrat text-white" },
    { text: "auto", className: "montserrat text-white" },
    { text: "en", className: "montserrat text-white" },
    { text: "Junker", className: "montserrat text-custom-blue2" },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-[54rem] md:h-[54.5rem] overflow-hidden">
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

        {!loading && (
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-6 mt-10 z-20">
            {!isAuthenticated ? (
              <>
                <Button
                  className="w-40 h-12 rounded-xl bg-blue-900 text-white text-md shadow-lg hover:bg-blue-900 hover:brightness-125 transition-all duration-300"
                  onClick={() => window.location.href = '/login'}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  className="w-40 h-12 rounded-xl bg-custom-beige text-black text-md shadow-lg hover:bg-custom-beige hover:brightness-125 transition-all duration-300"
                  onClick={() => window.location.href = '/registro'}
                >
                  Registrarse
                </Button>
              </>
            ) : (
              <Button
                className="w-40 h-12 rounded-xl bg-custom-beige text-black text-md shadow-lg hover:bg-custom-beige hover:brightness-125 transition-all duration-300"
                onClick={() => window.location.href = '/productos'}
                >
                Ver productos
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
