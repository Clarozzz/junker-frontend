"use client";

import { favoritoService } from "@/app/api/favorito";
import { readUser } from "@/app/api/server";
import { getUser } from "@/app/api/usuarios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ListaFavoritos() {
  const [favoritos, setFavorito] = useState<Favorito[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<Usuario | null>(null);

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

  useEffect(() => {
    if (userData?.id && userData.id.length > 0) {
      const fetchfavoritos = async () => {
        try {
          // const carrito_id = userData.carrito[0].id;
          const data = await favoritoService.getFavorito(userData.id);
          setFavorito(data);
        } catch (error) {
          console.error("Error al obtener carrito:", error);
        }
      };

      fetchfavoritos();
    }
  }, [userData]);


  const formatCurrency = (value: number): string =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const handleEliminarProducto = async (usuario_id: string, producto_id: string) => {
    try {
      await favoritoService.eliminarProductoDeFavoritos(usuario_id, producto_id);
      // Actualizar el carrito en el frontend después de eliminar el producto
      setFavorito((prevFavoritos) =>
        prevFavoritos.filter((favorito) =>
          favorito.productos.id !== producto_id
        )
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="pt-10 px-16">
        <h2
          className="text-3xl  md:text-4xl font-bold montserrat text-custom-blue"
          id="slide-over-title"
        >
          Tus productos favoritos
        </h2>
      </div>
      <div className="min-h-screen flex flex-col sm:flex-col md:flex-row md:justify-between lg:flex-row xl:flex-row">
        <div className="lg:w-2/3 pl-10 pr-4 py-10">
          {/* {!error ? (
            <p>{error}</p>
          ) : ( */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm px-4 py-6 sm:px-6">
            <div className="flex flex-col gap-6 mt-8">
              {favoritos.map((favorito) => (
                <motion.div key={favorito.id_usuario} className="cursor-pointer">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <div>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={favorito.productos?.vendedores?.usuarios?.avatar_url} className="image-cover" />
                          <AvatarFallback>
                            {favorito.productos?.vendedores?.usuarios?.nombre.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-900">
                          {`${favorito.productos?.vendedores?.usuarios?.nombre || ''} ${favorito.productos?.vendedores?.usuarios?.apellido || ''}`}
                        </span>
                        <span className="text-gray-600 text-xs">
                          {favorito.productos?.vendedores?.calificacion || ''}
                          % Comentarios positivos
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between flex-col sm:flex-row md:flex-col lg:flex-row xl:flex-row 2xl:flex-row">
                      <div className="-my-6 divide-y divide-gray-200">
                        <div className="flex py-6">
                          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <Image
                              src={
                                favorito.productos.productos_imagenes_filtradas[0]?.url ||
                                "/default-image.jpg"
                              }
                              alt={favorito.productos.nombre}
                              className="h-full w-full object-cover object-center"
                              width={500}
                              height={500}
                            />
                          </div>
                          <div className="ml-4 flex flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{favorito.productos?.nombre}</a>
                              </h3>
                            </div>
                            <div>
                              <p>{favorito.productos?.estado_producto}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between py-4 sm:py-4 lg:py-0 lg:w-96">
                        <div className="flex flex-row">
                          <div className="pr-2 pt-2">
                            <p>Cant.</p>
                          </div>
                        </div>
                        <div className="min-w-36">
                          <p className="ml-4">
                            Lps.{" "}
                            {formatCurrency(
                              favorito.productos?.precio 
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-end justify-end text-sm pt-4">
                      <div className="flex px-3">
                        <button
                          type="button"
                          className="font-medium text-custom-blue hover:text-blue-800"
                        >
                          Comprar ahora
                        </button>
                      </div>
                      <div className="flex px-3">
                        <button
                          type="button"
                          onClick={() => handleEliminarProducto(favorito.id_usuario, favorito.productos.id)}
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr className="bg-gray-950 my-4" />
                </motion.div>
              ))}
            </div>
          </div>
          {/* )}   */}
        </div>
      </div>
    </div>
  );
}
