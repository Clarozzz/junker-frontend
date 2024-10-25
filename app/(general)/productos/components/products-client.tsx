'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

// const Productos = [
//   {
//     id: 1,
//     name: "Filtro de Aceite",
//     description: "Filtro de alta calidad para motores",
//     price: 15.99,
//     image_url: "https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/Designer.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL0Rlc2lnbmVyLndlYnAiLCJpYXQiOjE3Mjk1NzI3MjMsImV4cCI6MTc2MTEwODcyM30.H_cyhDWYwuS06OgWd1DRFwyBtMBlhYpvr9V-xLi6NVg&t=2024-10-22T04%3A51%3A44.718Z",
//   },
//   {
//     id: 2,
//     name: "Pastillas de Freno",
//     description: "Set de pastillas de freno duraderas",
//     price: 45.99,
//     image_url: "https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/disco.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL2Rpc2NvLndlYnAiLCJpYXQiOjE3Mjk2MzA2MTMsImV4cCI6MTc2MTE2NjYxM30.zx1-Gn1CwhqzC96Ih9pS1mGp4Szu4MtqIBplJEAOqhI&t=2024-10-22T20%3A56%3A34.413Z",
//   },
//   {
//     id: 3,
//     name: "Batería de Auto",
//     description: "Batería de larga duración",
//     price: 89.99,
//     image_url: "https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/bateria.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL2JhdGVyaWEud2VicCIsImlhdCI6MTcyOTYzMDY0NSwiZXhwIjoxNzYxMTY2NjQ1fQ.N1mOmfuRzFcqT4NH7crSIF8a1W3f4olcBLjGSYlOnQU&t=2024-10-22T20%3A57%3A06.702Z",
//   },
//   {
//     id: 4,
//     name: "Amortiguador",
//     description: "Amortiguadores de alta calidad",
//     price: 110.99,
//     image_url: "https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/amortiguador.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL2Ftb3J0aWd1YWRvci53ZWJwIiwiaWF0IjoxNzI5NjMwODQ0LCJleHAiOjE3NjExNjY4NDR9.xrd7Tuv1cgd_D6kvtsYmDliTpp5gcj9YV3kkx5qeGIs&t=2024-10-22T21%3A00%3A26.133Z",
//   }
// ];

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  productos_imagenes: { url: string }[];
  categorias: { nombre: string };
}

export default function ProductosClient() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos`); 
        const data = await response.json();
        setProductos(data); 
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos(); 
  }, []); 

  return (
    <div>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center montserrat text-custom-blue mb-10">
            Nuestros Productos Destacados
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {productos.map((product) => (
              <motion.div key={product.id} whileHover={{ scale: 1.05 }}>
                <Card>
                  <CardContent className="p-4">
                    <img
                      src={product.productos_imagenes[0]?.url}
                      alt={product.nombre}
                      className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="text-lg font-semibold">{product.nombre}</h3>
                    <p className="text-gray-600">Lps. {product.precio.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Categoría: {product.categorias.nombre}</p>
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
  );
}
