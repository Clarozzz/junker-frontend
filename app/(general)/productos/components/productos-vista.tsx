'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image"
import { getProductos } from "@/app/api/productos";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  fecha_publicacion: string; 
  estado_producto: string;
  disponibilidad: string;
  productos_imagenes: { url: string }[];
  productos_categorias: { categorias: { nombre: string } }[]; 
}

export default function ProductosVista() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  return (  
      <div id="contenedor filtro y card" className="flex flex-row">
        <div id="tarjetas" className="flex flex-col w-full justify-center items-center">
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center montserrat text-custom-blue mb-10">
                Nuestros Productos Destacados
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                {productos.map((product) => (
                  <motion.div key={product.id} whileHover={{ scale: 1.05 }}>
                    <Card>
                      <CardContent className="p-4">
                        <Image
                          src={product.productos_imagenes[0]?.url}
                          alt={product.nombre}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover mb-4 rounded"
                        />
                        <h3 className="text-lg font-semibold">{product.nombre}</h3>
                        <p className="text-gray-600">Lps. {product.precio.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Categoría: {product.productos_categorias[0]?.categorias.nombre}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-custom-blue text-white hover:bg-blue-900 hover:text-white">Agregar al Carrito</Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
  );
}
