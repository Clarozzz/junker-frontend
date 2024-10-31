"use client";

import React from "react";
import LogoJunker from "../logo-junker";

export default function Cargando() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white/50 dark:bg-black/50 z-50 flex items-center  justify-center">
      <div className="flex flex-col justify-center items-center animate-spin animate-infinite">
        <div role="status">
          <LogoJunker className="h-20 w-20 " />
        </div>
      </div>
      <p className="montserrat font-medium text-custom-blue ml-4 text-xl">Cargando...</p>
    </div>
  );
}
