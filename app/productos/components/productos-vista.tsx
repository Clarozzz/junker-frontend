
// * v2 test

'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getProductos } from "@/app/api/productos";
import { usePathname, useRouter } from "next/navigation";
import Cargando from "@/components/ui/cargando";

// Tipo para el producto, si no lo tienes definido puedes adaptarlo.

interface ProductosVistaProps {
  categoria: string | null; // Recibe la categoría como prop
}

export default function ProductosVista({ categoria }: ProductosVistaProps) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosSeleccion, setproductosSeleccion] = useState<Producto | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8); // Valor inicial de 4 elementos por página
  const [totalItems, setTotalItems] = useState<number>(0);

  const handleCardClick = (product: Producto) => {
    setproductosSeleccion(product);
    startTransition(() => {
      router.push(`${pathname}/${product.id}`);
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProductos(page, itemsPerPage, categoria);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); 
    fetchProductos(1, value, categoria); 
  };

  const fetchProductos = async (page: number, limit: number, categoria: string | null) => {
    try {
      const data: ProductosResponse = await getProductos(page, limit, categoria);
      // Filtramos los productos para excluir aquellos con categoría null
      const filteredProducts = data.items.filter(product => 
        product.productos_categorias && product.productos_categorias[0]?.categorias !== null
      );
      setProductos(filteredProducts); // Asignamos los productos filtrados
      setTotalItems(filteredProducts.length); // Actualizamos el total de productos filtrados
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos(currentPage, itemsPerPage, categoria);
  }, [currentPage, itemsPerPage, categoria]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div id="contenedor filtro y card" className="flex flex-row">
      {isPending && <Cargando />}
      <div id="tarjetas" className="flex flex-col w-full justify-center items-center">
        <section className="py-14 bg-background">
          <div className="container mx-auto">
            {/* Aquí removemos el selector de categoría ya que viene de SidebarProductos */}

            {/* Selector de cantidad de elementos por página */}
            <div className="mb-4 flex justify-end items-center">
              <label htmlFor="items-per-page" className="mr-2">Elementos por página:</label>
              <select
                id="items-per-page"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
                className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
              </select>
            </div>

            {/* Mostrar los productos */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
              {productos.map((product) => (
                <motion.div key={product.id} onClick={() => { handleCardClick(product) }} className="cursor-pointer">
                  <Card>
                    <CardContent className="p-4">
                      <Image
                        src={product.productos_imagenes[0]?.url || "/default-image.jpg"} // Imagen por defecto si no existe
                        alt={product.nombre}
                        width={400}
                        height={400}
                        className="w-52 h-52 mb-4 rounded object-cover object-center"
                      />
                      <h3 className="text-lg font-semibold truncate max-w-40">{product.nombre}</h3>
                      <p className="text-gray-600">Lps. {product.precio.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">
                        Categoría: {product.productos_categorias?.[0]?.categorias?.nombre || "Categoría no disponible"}
                      </p>
                      <p className="text-sm text-gray-500">Vendedor: {product.vendedores?.usuarios?.nombre || "Vendedor no disponible"}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => { handleCardClick(product) }}
                        className={`w-full bg-custom-blue text-white hover:bg-blue-900 hover:text-white ${
                          productosSeleccion?.id === product.id ? 'ring-2 ring-ring ring-sec ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' : ''
                        }`}
                      >
                        <p className="truncate max-w-32">Ver más detalles</p>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-6 gap-2">
              {currentPage > 1 && (
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-2 leading-tight border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Anterior
                </Button>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 leading-tight border border-gray-300 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                >
                  {page}
                </Button>
              ))}
              {currentPage < totalPages && (
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-2 leading-tight border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Siguiente
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


