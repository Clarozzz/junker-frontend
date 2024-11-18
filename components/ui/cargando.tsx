"use client";

import React from "react";
import LogoJunker from "../logo-junker";

export default function Cargando() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="animate-spin">
          <LogoJunker className="h-20 w-20 " />
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Cargando...</p>
      </div>
    </div>
  );
}
