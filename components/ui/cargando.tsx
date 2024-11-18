"use client";

import { Loader2 } from "lucide-react";
import React from "react";

export default function Cargando() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center text-gray-600">
        <div className="animate-spin">
          <Loader2 size={80} />
        </div>
        <p className="mt-4 text-lg font-semibold montserrat">Cargando...</p>
      </div>
    </div>
  );
}
