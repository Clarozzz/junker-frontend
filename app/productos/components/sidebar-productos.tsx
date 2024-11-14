
"use client";
import React, { useState } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SidebarProductosProps {
  onFilterChange: (filters: { precio: string; categoria: string; estado: string }) => void;
}

export default function SidebarProductos({ onFilterChange }: SidebarProductosProps) {
  const [selectedFilters, setSelectedFilters] = useState({
    precio: "",
    categoria: "",
    estado: "",
  });

  interface Filters {
    precio: string;
    categoria: string;
    estado: string;
  }

  const handleFilterChange = (type: keyof Filters, value: string) => {
    const newFilters = { ...selectedFilters, [type]: value };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters); // Enviar los filtros seleccionados al componente padre
  };

  return (
    <>
      <AccordionItem value="item-1">
        <AccordionTrigger>Precio</AccordionTrigger>
        <AccordionContent>
          {["Lps. 500", "Lps. 1000", "Lps. 2000", "Lps. 3000", "Lps. 8000", "Lps. 8001 - mas"].map((range, index) => (
            <div key={index} className="flex items-center pl-2 pt-1">
              <input
                id={`filter-precio-${index}`}
                name="precio"
                value={range}
                type="radio"
                checked={selectedFilters.precio === range}
                onChange={() => handleFilterChange("precio", range)}
                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
              />
              <label htmlFor={`filter-precio-${index}`} className="ml-3 text-sm text-gray-600">
                {range}
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Categoría</AccordionTrigger>
        <AccordionContent>
          {["Ruedas", "Motor y Transmision", "Llaves", "Iluminacion", "Accesorios Internos", "Frenos y Discos", "Carroceria"].map((category, index) => (
            <div key={index} className="flex items-center pl-2 pt-1">
              <input
                id={`filter-categoria-${index}`}
                name="categoria"
                value={category}
                type="radio"
                checked={selectedFilters.categoria === category}
                onChange={() => handleFilterChange("categoria", category)}
                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
              />
              <label htmlFor={`filter-categoria-${index}`} className="ml-3 text-sm text-gray-600">
                {category}
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Estado</AccordionTrigger>
        <AccordionContent>
          {["Nuevo", "Usado"].map((estado, index) => (
            <div key={index} className="flex items-center pl-2 pt-1">
              <input
                id={`filter-estado-${index}`}
                name="estado"
                value={estado}
                type="radio"
                checked={selectedFilters.estado === estado}
                onChange={() => handleFilterChange("estado", estado)}
                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
              />
              <label htmlFor={`filter-estado-${index}`} className="ml-3 text-sm text-gray-600">
                {estado}
              </label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
