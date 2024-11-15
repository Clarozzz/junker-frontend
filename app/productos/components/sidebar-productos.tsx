
"use client";

import React, { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

interface SidebarProductosProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function SidebarProductos({ onFilterChange }: SidebarProductosProps) {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    precio_min: MIN_PRICE,
    precio_max: MAX_PRICE,
    categoria: null,
    estado: null,
  });

  const updateFilters = (updatedValues: Partial<FilterState>) => {
    const newFilters = { ...selectedFilters, ...updatedValues };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters); // Propagar el cambio al componente padre
  };

  const handleRangeChange = (key: "precio_min" | "precio_max", value: number) => {
    const updatedValue =
      key === "precio_min"
        ? Math.min(value, selectedFilters.precio_max - 100)
        : Math.max(value, selectedFilters.precio_min + 100);
    updateFilters({ [key]: updatedValue } as Partial<FilterState>);
  };

  const handleRadioToggle = (key: "categoria" | "estado", value: string) => {
    const newValue = selectedFilters[key] === value ? null : value;
    updateFilters({ [key]: newValue } as Partial<FilterState>);
  };

  const handleClearFilters = () => {
    updateFilters({
      precio_min: MIN_PRICE,
      precio_max: MAX_PRICE,
      categoria: null,
      estado: null,
    });
  };

  return (
    <div>
      {/* Filtro por precio */}
      <AccordionItem value="item-1">
        <AccordionTrigger>Precio</AccordionTrigger>
        <AccordionContent>
          <div className="px-4 py-2">
            <label className="block text-gray-600 text-sm mb-2">Rango de precio</label>
            <div className="flex justify-between text-xs mb-2">
              <span>Lps. {selectedFilters.precio_min}</span>
              <span>Lps. {selectedFilters.precio_max}</span>
            </div>
            <input
              title="Precio mínimo"
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={100}
              value={selectedFilters.precio_min}
              onChange={(e) => handleRangeChange("precio_min", Number(e.target.value))}
              className="w-full"
            />
            <input
              title="Precio máximo"
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={100}
              value={selectedFilters.precio_max}
              onChange={(e) => handleRangeChange("precio_max", Number(e.target.value))}
              className="w-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Filtro por categoría */}
      <AccordionItem value="item-2">
        <AccordionTrigger>Categoría</AccordionTrigger>
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
        <AccordionTrigger>Estado</AccordionTrigger>
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
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg w-full"
        >
          Vaciar filtros
        </button>
      </div>
    </div>
  );
}

