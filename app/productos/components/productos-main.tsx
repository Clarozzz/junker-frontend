"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
} from "@/components/ui/accordion";
import ProductosVista from "./productos-vista";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import Image from "next/image";
import SidebarProductos from "./sidebar-productos";

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
    <div>
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-12 md:px-12 lg:px-12 xl:px-12 mt-4">
        <div className="relative w-full h-[200px] md:h-[300px] xl:h-[400px]">
          <Image
            src="/images/landing24.webp"
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
        {/* SidebarProductos*/}
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
                    <SidebarProductos />
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
        {/* FinSidebarProductos*/}
        <main className="mx-auto max-w-screen-2xl px-4 sm:px-12 md:px-12 lg:px-12 xl:px-12">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-14 mr-10 sm:mr-10">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
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
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row lg:gap-x-8 gap-y-10">
              <div className="lg:w-1/6">
                <form className="hidden lg:block pt-14">
                  <h3 className="sr-only">Categories</h3>
                  <Accordion type="multiple" className="w-full">
                    <SidebarProductos/>
                  </Accordion>
                </form>
              </div>
              <div className="lg:w-5/6">
                <ProductosVista />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
