'use client'
import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductosVista from "./productos-vista";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function ProductosMain() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null); // Referencia al menú

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false); // Cierra el menú si se hace clic fuera
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu); // Limpia el evento al desmontar
    };
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div id="imagen" className="">
        <h2>imagen</h2>
      </div>

      <div>
        {/* SidebarProductos*/}
        <div className="relative z-40 lg:hidden">
          <>
            <div
              className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              } md:hidden`}
            >
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filtro</h2>
                </div>

                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categorías</h3>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full py-6 px-4"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Precio</AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-6 px-2" id="filter-section-0">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <input
                                id="filter-precio-0"
                                name="precio[]"
                                value="Lps. 0 - Lps. 500"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-precio-0"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Lps. 0 - Lps. 500
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-precio-1"
                                name="precio[]"
                                value="Lps. 501 - Lps. 1000"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-precio-1"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Lps. 501 - Lps. 1000
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-precio-2"
                                name="precio[]"
                                value="Lps. 1001 - Lps. 2000"
                                type="checkbox"
                                checked
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-precio-2"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Lps. 1001 - Lps. 2000
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-precio-3"
                                name="precio[]"
                                value="Lps. 2001 - Lps. 3000"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-precio-3"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Lps. 2001 - Lps. 3000
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-precio-4"
                                name="precio[]"
                                value="Lps. 5001 - Lps. 8000"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-precio-4"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Lps. 5001 - Lps. 8000
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-precio-5"
                                name="precio[]"
                                value="Lps. 8001 - mas"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-precio-5"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Lps. 8001 - mas
                              </label>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Categoria</AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-6 px-2" id="filter-section-1">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <input
                                id="filter-category-0"
                                name="category[]"
                                value="Neumaticos y Llantas"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-category-0"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Neumaticos y Llantas
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-category-1"
                                name="category[]"
                                value="Motor y Transmision"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-category-1"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Motor y Transmision
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-category-2"
                                name="category[]"
                                value="Llaves"
                                type="checkbox"
                                checked
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-category-2"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Llaves
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-category-3"
                                name="category[]"
                                value="Iluminacion"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-category-3"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Iluminacion
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-category-4"
                                name="category[]"
                                value="Accesorios Internos"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-category-4"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Accesorios Internos
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-category-5"
                                name="category[]"
                                value="Frenos y Discos"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-category-5"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Frenos y Discos
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-category-6"
                                name="category[]"
                                value="Carroceria"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-category-6"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Carroceria
                              </label>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Estado</AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-6 px-2" id="filter-section-2">
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <input
                                id="filter-size-0"
                                name="estado[]"
                                value="nuevo"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-size-0"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Nuevo
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="filter-size-1"
                                name="estado[]"
                                value="usado"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="filter-size-1"
                                className="ml-3 text-sm text-gray-600"
                              >
                                Usado
                              </label>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
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

        <main className="mx-auto max-w-screen-2xl px-2 sm:px-4 lg:px-6">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-14 mr-10 sm:mr-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Productos
            </h1>
            <div className="flex items-center">
              <div className="relative inline-block text-left" ref={menuRef}>
                <div>
                  <button
                    type="button"
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    id="menu-button"
                    aria-expanded={isOpen}
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
                        className="block px-4 py-2 text-sm font-medium text-gray-900"
                        role="menuitem"
                        id="menu-item-0"
                      >
                        Nuevo
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-500"
                        role="menuitem"
                        id="menu-item-1"
                      >
                        Usado
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-500"
                        role="menuitem"
                        id="menu-item-2"
                      >
                        Precio: más bajo primero
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-500"
                        role="menuitem"
                        id="menu-item-3"
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
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                <Accordion type="single" collapsible className="w-full py-6">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Precio</AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-6 px-2" id="filter-section-0">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              id="filter-precio-0"
                              name="precio[]"
                              value="Lps. 0 - Lps. 500"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-precio-0"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Lps. 0 - Lps. 500
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-precio-1"
                              name="precio[]"
                              value="Lps. 501 - Lps. 1000"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-precio-1"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Lps. 501 - Lps. 1000
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-precio-2"
                              name="precio[]"
                              value="Lps. 1001 - Lps. 2000"
                              type="checkbox"
                              checked
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-precio-2"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Lps. 1001 - Lps. 2000
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-precio-3"
                              name="precio[]"
                              value="Lps. 2001 - Lps. 3000"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-precio-3"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Lps. 2001 - Lps. 3000
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-precio-4"
                              name="precio[]"
                              value="Lps. 5001 - Lps. 8000"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-precio-4"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Lps. 5001 - Lps. 8000
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-precio-5"
                              name="precio[]"
                              value="Lps. 8001 - mas"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-precio-5"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Lps. 8001 - mas
                            </label>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Categoria</AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-6 px-2" id="filter-section-1">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              id="filter-category-0"
                              name="category[]"
                              value="Neumaticos y Llantas"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-0"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Neumaticos y Llantas
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-1"
                              name="category[]"
                              value="Motor y Transmision"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-1"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Motor y Transmision
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-2"
                              name="category[]"
                              value="Llaves"
                              type="checkbox"
                              checked
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-2"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Llaves
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-3"
                              name="category[]"
                              value="Iluminacion"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-3"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Iluminacion
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-4"
                              name="category[]"
                              value="Accesorios Internos"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-4"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Accesorios Internos
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-5"
                              name="category[]"
                              value="Frenos y Discos"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-5"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Frenos y Discos
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-6"
                              name="category[]"
                              value="Carroceria"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-6"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Carroceria
                            </label>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Estado</AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-6 px-2" id="filter-section-2">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              id="filter-size-0"
                              name="estado[]"
                              value="nuevo"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-size-0"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Nuevo
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-size-1"
                              name="estado[]"
                              value="usado"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-custom-blue focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-size-1"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Usado
                            </label>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </form>

              <div className="lg:col-span-3">
                <ProductosVista />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
