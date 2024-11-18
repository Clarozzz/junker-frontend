"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { Accordion } from "@/components/ui/accordion";
import ProductosVista from "./productos-vista";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import Image from "next/image";
import SidebarProductos from "./sidebar-productos";
import { SearchInput } from "@/components/ui/search-input";

export default function ProductosMain() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    precio_min: 0,
    precio_max: 0,
    categoria: null,
    estado: null,
    searchQuery: '',
    ordenPrecio: null, // Nuevo estado para el orden
  });

  const placeholders = [
    "Buscar por categorias",
    "Buscar por nombre",
    "Estado del producto",
  ];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: e.target.value,
    }));
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };  

  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  const handleFilterChange = (newFilters: Omit<FilterState, 'searchQuery'>) => {
    setFilters({
      ...newFilters,
      precio_min: Number(newFilters.precio_min),
      precio_max: Number(newFilters.precio_max),
    }); // Actualiza el estado con los nuevos filtros
  };


 
  const handleSortChange = (sortOption: string) => {
    setFilters((prev) => ({
      ...prev,
      ordenPrecio: sortOption === "lowToHigh" ? true : sortOption === "highToLow" ? false : null,
    }));
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-12 md:px-12 lg:px-12 xl:px-12 mt-4">
        <div className="relative w-full h-[200px] md:h-[300px] xl:h-[400px]">
          <Image
            src="/images/landing7.webp"
            alt="foto"
            fill
            className="object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl" />
          <div className="absolute inset-0 flex justify-center items-center text-white text-4xl montserrat font-bold px-6">
            Encuentra las autopartes que necesitas
          </div>
        </div>
      </div>

      <div>
        <div className="relative z-40 lg:hidden">
          <>
            <div
              className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              } lg:hidden`}
            >
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filtro</h2>
                </div>
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categorías</h3>
                  <Accordion type="multiple" className="w-full py-6 px-4">

                    <SidebarProductos onFilterChange={handleFilterChange} />
                  </Accordion>
                </form>
              </div>
            </div>
            {isMenuOpen && (
              <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={() => setIsMenuOpen(false)}
              ></div>
            )}
          </>
        </div>

        <main className="mx-auto max-w-screen-2xl px-4 sm:px-12 md:px-12 lg:px-12 xl:px-12">
          <div className="pt-4">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              Productos
            </h1>
          </div>
          <div className="flex items-baseline justify-between border-b lg:pl-80 border-gray-200 pb-6 pt-6 mr-10 sm:mr-10">
            <div>
              <Suspense fallback={<div>Cargando búsqueda...</div>}>
                <SearchInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                  debounce={300}
                />
              </Suspense>
            </div>
            <div className="flex items-center">
              <div className="relative inline-block text-left" ref={menuRef}>
                <div>
                  <button
                    type="button"
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    id="menu-button"
                    aria-haspopup="true"
                    onClick={toggleMenu}
                  >
                    Filtrar
                    <svg
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                    </svg>
                  </button>
                </div>

                {isOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-500"
                        role="menuitem"
                        onClick={() => handleSortChange("lowToHigh")}
                      >
                        Precio: más bajo primero
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-500"
                        role="menuitem"
                        onClick={() => handleSortChange("highToLow")}
                      >
                        Precio: más alto primero
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row lg:gap-x-8 gap-y-10">
              <div className="lg:w-1/6">
                <form className="hidden lg:block pt-14">
                  <h3 className="sr-only">Categorias</h3>
                  <Accordion type="multiple" className="w-full">
                    <SidebarProductos onFilterChange={handleFilterChange} />
                  </Accordion>
                </form>
              </div>
              <div className="lg:w-5/6">
                <ProductosVista
                  categoria={filters.categoria}
                  precio_min={filters.precio_min}
                  precio_max={filters.precio_max}
                  estado={filters.estado}
                  searchQuery={filters.searchQuery}
                  ordenPrecio={filters.ordenPrecio} 
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
