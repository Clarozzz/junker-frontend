"use client";

import React from "react";
import LogoJunker from "../logo-junker";

export default function Cargando() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white/50 dark:bg-black/50 z-50 flex items-center  justify-center">
      <div className="flex flex-col justify-center items-center animate-spin animate-infinite">
        <div role="status">
          <LogoJunker className="h-16 w-16 " />
        </div>
      </div>
    </div>
  );
}
