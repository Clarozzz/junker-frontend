"use client";

import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { carritoService } from "@/app/api/carritos";
import { useToast } from "@/components/ui/toast";
import { Lens } from "@/components/ui/lens";
import { motion } from "framer-motion";

// const defaultImage = {
//   id: 'default',
//   url: '/api/placeholder/400/400',
//   alt: 'Product image'
// };

export default function DetalleProducto({
  id_producto,
  titulo,
  precio,
  descripcion,
  imagenes,
  categorias,
  estado,
  vendedor_descripcion,
  nombre_vendedor,
  contacto_vendedor,
  vendedor_calificacion,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(imagenes[0]);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useUser();
  const { showToast } = useToast();
  const [hovering, setHovering] = useState(false);

  const handleAgregarCarrito = async () => {
    if (!userData?.id) {
      showToast({
        title: "Acceso Denegado",
        description: "Debes iniciar sesión para agregar productos al carrito",
        variant: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const carritoData = {
        id_carrito: "e0273ae4-3fab-4653-a616-5d2190d7d05d",
        id_producto: id_producto,
        cantidad: 1,
      };

      await carritoService.agregarCarrito(carritoData);
      showToast({
        title: "¡Éxito!",
        description: "Producto agregado al carrito correctamente",
        variant: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        description: "No se pudo agregar el producto al carrito",
        variant: "error",
      });
      console.error("Error al agregar al carrito:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Seccionde las imagenes */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative z-10">
            <Lens hovering={hovering} setHovering={setHovering}>
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={1500}
                height={1500}
                className="h-full w-full object-cover object-center"
              />
            </Lens>
            <motion.div
            animate={{
              filter: hovering ? "blur(2px)" : "blur(0px)",
            }}
            className="py-4 relative z-20"
          >
          </motion.div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {imagenes.map((image) => (
              <button
              title="Seleccionar imagen"  
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={cn(
                  "aspect-square overflow-hidden rounded-lg bg-gray-100",
                  selectedImage.id === image.id && "ring-2 ring-primary"
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {titulo}
            </h1>
            <p className="mt-4 text-4xl tracking-tight text-primary">
              Lps. {precio.toFixed(2)}
            </p>
          </div>

          <div className="prose prose-sm text-gray-600">
            <h1 className="text-lg font-semibold tracking-tight text-gray-800 sm:text-xl pb-2">
              Descripción
            </h1>
            <p>{descripcion}</p>
          </div>
          <div className="prose prose-sm text-gray-600">
            <p> Estado: {estado}</p>
          </div>
          <div className="prose prose-sm text-gray-600">
            <p> Categorias: {categorias}</p>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button
              type="submit"
              onClick={handleAgregarCarrito}
              disabled={isLoading}
              className="flex-1 bg-custom-blue text-white hover:bg-blue-900 space-x-2 transition-all duration-200"
            >
              {" "}
              <div className="pr-2">
                <ShoppingCart className="h-5 w-5" />
              </div>
              {/* <span>{isLoading ? "Agregando..." : "Agregar al carrito"}</span> */}
              {isLoading ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-loader-circle animate-spin mr-2"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Agregando...
                </>
              ) : (
                "Agregar al carrito"
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1 space-x-2 bg-custom-beige text-black hover:bg-orange-100"
              onClick={() => setIsWishlist(!isWishlist)}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isWishlist && "fill-current text-red-500"
                )}
              />
              <span>Agregar a favoritos</span>
            </Button>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-sm font-medium text-gray-900">
              Detalles del Vendedor
            </h3>
            <div className="mt-4 prose prose-sm text-gray-500">
              <ul className="list-disc pl-5 space-y-2">
                <li>Nombre: {nombre_vendedor}</li>
                <li>Contacto: {contacto_vendedor} </li>
                <li>Descripcion: {vendedor_descripcion}</li>
                <li>Calificación: {vendedor_calificacion} %</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
