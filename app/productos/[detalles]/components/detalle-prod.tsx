"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { carritoService } from "@/app/api/carritos";
import { useToast } from "@/components/ui/toast";
import { Lens } from "@/components/ui/lens";
import { motion } from "framer-motion";
import { getUser } from "@/app/api/usuarios";
import { readUser } from "@/app/api/server";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { favoritoService } from "@/app/api/favorito";

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
  stock,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(imagenes[0]);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const [hovering, setHovering] = useState(false);
  const [userData, setUserData] = useState<Usuario | null>(null);
  // const [quantity, setQuantity] = useState(1);
  const { control, watch } = useForm({
    defaultValues: {
      cantidad: "1", // Valor predeterminado para el Select
    },
  });

  const selectedQuantity = watch("cantidad");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const {
          data: { user },
        } = await readUser();
        if (!user) {
          throw new Error("Error al obtener el usuario");
        }

        const usuario = await getUser(user.id);
        if (usuario) {
          setUserData(usuario);
        }
      } catch {
        setUserData(null);
      }
    };

    loadUserData();
  }, []);

  // const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = parseInt(e.target.value);
  //   if (!isNaN(value) && value > 0 && value <= stock) {
  //     setQuantity(value);
  //   }
  // };

  const handleAgregarCarrito = async () => {
    if (!userData?.id) {
      showToast({
        title: "Acceso Denegado",
        description: "Debes iniciar sesión para agregar productos al carrito",
        variant: "error",
      });
      return;
    }

    // if (quantity + productStock.currentCartQuantity > productStock.stock) {
    //   showToast({
    //     title: "Error",
    //     description: `Solo hay ${productStock.stock} unidades disponibles`,
    //     variant: "error",
    //   });
    //   return;
    // }

    setIsLoading(true);
    try {
      const carritoData = {
        id_carrito: userData?.carrito[0]?.id || "",
        id_producto: id_producto,
        cantidad: parseInt(selectedQuantity),
      };

      await carritoService.agregarCarrito(carritoData);

      // setProductStock(prev => ({
      //   ...prev,
      //   currentCartQuantity: prev.currentCartQuantity + quantity
      // }));

      showToast({
        title: "¡Éxito!",
        description: "Producto agregado al carrito correctamente",
        variant: "success",
      });

      // Resetear la cantidad a 1 después de agregar al carrito
      // setQuantity(1);
    } catch (error) {
      showToast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "No se pudo agregar el producto al carrito",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgregarfavorito = async () => {
    if (!userData?.id) {
      showToast({
        title: "Acceso Denegado",
        description: "Debes iniciar sesión para agregar productos a favoritos",
        variant: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const favoritodata = {
        id_usuario: userData?.id || "",
        id_producto: id_producto,
      };

      await favoritoService.agregarFavoritos(favoritodata);

      showToast({
        title: "¡Éxito!",
        description: "Producto agregado a tus favoritos correctamente",
        variant: "success",
      });

    } catch (error) {
      showToast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "No se pudo agregar el producto a favoritos",
        variant: "error",
      });
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
            ></motion.div>
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

          <div className="flex items-center space-x-4">
            <Controller
              name={"cantidad"} // Identifica cada producto por su ID.
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="max-w-40 focus:ring-custom-blue">
                    <SelectValue placeholder="Cantidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Cantidad</SelectLabel>
                      {Array.from({ length: stock }, (_, i) => i + 1).map(
                        (qty) => (
                          <SelectItem key={qty} value={qty.toString()}>
                            {qty}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <span className="text-sm text-gray-500">
              Productos disponibles: {stock}
            </span>
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
              type="submit"
              className="flex-1 space-x-2 bg-custom-beige text-black hover:bg-orange-100"
              onClick={async () => {
                setIsWishlist((prev) => !prev); // Cambia el estado del wishlist
                await handleAgregarfavorito(); // Llama a la función para agregar a favoritos
              }}
              disabled={isLoading}
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
