"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

const sampleProducts = [
  {
    id: 1,
    name: "Filtro de Aceite",
    description: "Filtro de alta calidad para motores",
    price: 15.99,
    image_url: "",
  },
  {
    id: 2,
    name: "Pastillas de Freno",
    description: "Set de pastillas de freno duraderas",
    price: 45.99,
    image_url: "",
  },
  {
    id: 3,
    name: "Batería de Auto",
    description: "Batería de larga duración",
    price: 89.99,
    image_url: "",
  },
];

export default function ProductosSeccion() {
  return (
    <div>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Nuestros Productos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <motion.div key={product.id} whileHover={{ scale: 1.05 }}>
                <Card>
                  <CardContent className="p-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Agregar al Carrito</Button>
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
