
"use client";

import React, { useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MIN_PRICE = 0;
const MAX_PRICE = 1000000000;

interface FilterState {
  precio_min: number | null;
  precio_max: number | null;
  categoria: string | null;
  estado: string | null;
}

interface SidebarProductosProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function SidebarProductos({ onFilterChange }: SidebarProductosProps) {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    precio_min: null,
    precio_max: null,
    categoria: null,
    estado: null,
  });

  const [priceError, setPriceError] = useState<string | null>(null); // Estado para el error

  const updateFilters = (updatedValues: Partial<FilterState>) => {
    const newFilters = { ...selectedFilters, ...updatedValues };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (key: "precio_min" | "precio_max", value: string) => {
    const numericValue: number | null = value === "" ? null : Number(value);

    // No interferir con la entrada del usuario, solo mostrar un mensaje de error si es necesario
    if (numericValue !== null) {
      // Validación: si se trata de precio_min y es mayor que precio_max, mostramos un error
      if (key === "precio_min" && selectedFilters.precio_max !== null && numericValue >= selectedFilters.precio_max) {
        setPriceError("El precio mínimo debe ser menor que el precio máximo.");
      } else if (key === "precio_max" && selectedFilters.precio_min !== null && numericValue <= selectedFilters.precio_min) {
        setPriceError("El precio máximo debe ser mayor que el precio mínimo.");
      } else {
        // Si la entrada es válida, se limpia el mensaje de error
        setPriceError(null);
      }
    }

    // Actualizamos los filtros sin interferir con la entrada del usuario
    updateFilters({ [key]: numericValue });
  };

  const handleRadioToggle = (key: "categoria" | "estado", value: string) => {
    const newValue = selectedFilters[key] === value ? null : value;
    updateFilters({ [key]: newValue } as Partial<FilterState>);
  };

  const handleClearFilters = () => {
    setPriceError(null); // Limpiar mensaje de error al vaciar los filtros
    updateFilters({
      precio_min: null,
      precio_max: null,
      categoria: null,
      estado: null,
    });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {/* Filtro por precio */}
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg font-medium text-gray-700">
          Precio
        </AccordionTrigger>
        <AccordionContent>
          <div className="px-4 py-2">
            <label className="block text-gray-600 text-sm mb-2">
              Rango de precio
            </label>
            <div className="flex flex-col gap-2">
              <div>
                <label
                  htmlFor="precio_min"
                  className="text-sm text-gray-500 block"
                >
                  Precio mínimo
                </label>
                <input
                  id="precio_min"
                  type="number"
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  value={selectedFilters.precio_min ?? ""}
                  onChange={(e) =>
                    handlePriceChange("precio_min", e.target.value)
                  }
                  placeholder="Mínimo"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="precio_max"
                  className="text-sm text-gray-500 block"
                >
                  Precio máximo
                </label>
                <input
                  id="precio_max"
                  type="number"
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  value={selectedFilters.precio_max ?? ""}
                  onChange={(e) =>
                    handlePriceChange("precio_max", e.target.value)
                  }
                  placeholder="Máximo"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              {/* Mostrar mensaje de error si lo hay */}
              {priceError && (
                <div className="text-red-500 text-sm mt-2">{priceError}</div>
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Filtro por categoría */}
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-lg font-medium text-gray-700">
          Categoría
        </AccordionTrigger>
        <AccordionContent>
          {[
            "Ruedas",
            "Motor y Transmision",
            "Llaves",
            "Iluminacion",
            "Accesorios Internos",
            "Frenos y Discos",
            "Carroceria",
          ].map((category) => (
            <div key={category} className="flex items-center pl-2 pt-1">
              <input
                title="Categoría"
                type="radio"
                name="categoria"
                checked={selectedFilters.categoria === category}
                onChange={() => handleRadioToggle("categoria", category)}
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label className="ml-3 text-sm text-gray-600">{category}</label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* Filtro por estado */}
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-lg font-medium text-gray-700">
          Estado
        </AccordionTrigger>
        <AccordionContent>
          {["Nuevo", "Usado"].map((estado) => (
            <div key={estado} className="flex items-center pl-2 pt-1">
              <input
                title="Estado"
                type="radio"
                name="estado"
                checked={selectedFilters.estado === estado}
                onChange={() => handleRadioToggle("estado", estado)}
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label className="ml-3 text-sm text-gray-600">{estado}</label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* Botón para vaciar los filtros */}
      <div className="mt-4">
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-lg w-full transition-colors duration-200"
        >
          Vaciar filtros
        </button>
      </div>
    </div>
  );
}
