"use client";
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function SidebarProductos() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div className="relative z-40 lg:hidden">
        <>
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          
            <div
              className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
            >
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
      <Button
              variant="ghost"
              size="icon"
              className="absolute right-0  md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
    </div>
  );
}