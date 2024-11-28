"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getProductos } from "@/app/api/productos";
import { usePathname, useRouter } from "next/navigation";
import Cargando from "@/components/ui/cargando";
import { Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { getUser } from "@/app/api/usuarios";
import { readUser } from "@/app/api/server";
import { favoritoService } from "@/app/api/favorito";
import { carritoService } from "@/app/api/carritos";

export default function ProductosVista({
  categoria,
  precio_min,
  precio_max,
  estado,
  searchQuery = "",
  ordenPrecio,
}: ProductosVistaProps) {
  const [productos, setProductos] = useState<ProductoVista[]>([]);
  const [productosSeleccion, setproductosSeleccion] =
    useState<ProductoVista | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [totalItems, setTotalItems] = useState<number>(0);
  // const [isWishlist, setIsWishlist] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useState<{[key: string]: boolean}>({});
  const [userData, setUserData] = useState<Usuario | null>(null);
  const [loadingProducto, setLoadingProducto] = useState<string | null>(null);
  const { showToast } = useToast();

  // Controla los productos mostrados (buscados o no)
  const [filteredProductos, setFilteredProductos] = useState<ProductoVista[]>(
    []
  );

  const handleAgregarFavoritos = async (productId: string) => {
    if (!userData?.id) {
      showToast({
        title: "Iniciar sesión",
        description: "Debes iniciar sesión para agregar a favoritos",
        variant: "destructive"
      });
      return;
    }

    try {
      // Comprobar el estado actual en que esta el producto en los favoritos
      const EstaEnFavorito = favoriteStatus[productId];

      if (EstaEnFavorito) {
        // Eliminar el producto de los favoritos
        await favoritoService.eliminarProductoDeFavoritos(userData?.id, productId);
        
        // Actualizar el estado de los productos
        setFavoriteStatus(prev => ({
          ...prev,
          [productId]: false
        }));

        showToast({
          title: "Favoritos",
          description: "Producto eliminado de favoritos",
          variant: "success"
        });
      } else {
        // Agregar a los favoritos
        await favoritoService.agregarFavoritos({
          id_usuario: userData?.id,
          id_producto: productId
        });

        // Actualizar el estado de los favoritos
        setFavoriteStatus(prev => ({
          ...prev,
          [productId]: true
        }));

        showToast({
          title: "Favoritos",
          description: "Producto agregado a favoritos",
          variant: "success"
        });
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      
      showToast({
        title: "Error",
        description: "No se pudo modificar favoritos",
        variant: "destructive"
      });
    }
  };

  const handleAgregarCarrito = async (producto_id: string) => {
    if (!userData?.id) {
      showToast({
        title: "Acceso Denegado",
        description: "Debes iniciar sesión para agregar productos al carrito",
        variant: "error",
      });
      return;
    }
    
    setLoadingProducto(producto_id);
    try {

      const carrito = await carritoService.getCarrito(userData?.carrito[0]?.id || "");
      const productoExisteEnCarrito = carrito.some(item => item.id_producto === producto_id);

      if (productoExisteEnCarrito) {
        showToast({
          title: "Producto Existente",
          description: "El producto ya está en el carrito",
          variant: "error"
        });
      } else {
        const carritoData = {
          id_carrito: userData?.carrito[0]?.id || "",
          id_producto: producto_id,
          cantidad: 1,
        };
  
        await carritoService.agregarCarrito(carritoData);
  
        showToast({
          title: "¡Éxito!",
          description: "Producto agregado al carrito correctamente",
          variant: "success",
        });
  
      }
    } catch (error) {
      showToast({
        title: "Error",
        description: error instanceof Error
          ? error.message
          : "No se pudo agregar el producto al carrito",
        variant: "error",
      });
    } finally {
      setLoadingProducto(null);
    }
  };

  const handleCardClick = (product: ProductoVista) => {
    setproductosSeleccion(product);
    startTransition(() => {
      router.push(`${pathname}/${product.id}`);
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProductos(
      page,
      itemsPerPage,
      categoria,
      precio_min,
      precio_max,
      estado,
      searchQuery,
      ordenPrecio
    );
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    fetchProductos(
      1,
      value,
      categoria,
      precio_min,
      precio_max,
      estado,
      searchQuery,
      ordenPrecio
    );
  };

  const fetchProductos = async (
    page: number,
    limit: number,
    categoria: string | null,
    precio_min: number | null,
    precio_max: number | null,
    estado: string | null,
    search_query: string | null = "",
    sort_asc: boolean | null = null
  ) => {
    try {
      const data: ProductosResponse = await getProductos(
        page,
        limit,
        categoria,
        precio_min,
        precio_max,
        estado,
        search_query || "",
        sort_asc
      );

      if (data && data.items) {
        setProductos(data.items);
        setTotalItems(data.total);
        setFilteredProductos(data.items); // Inicializa con productos paginados
      } else {
        console.error(
          "No se recibieron productos o hay un error en la estructura de datos."
        );
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos(
      currentPage,
      itemsPerPage,
      categoria,
      precio_min,
      precio_max,
      estado,
      searchQuery,
      ordenPrecio
    );
  }, [
    currentPage,
    itemsPerPage,
    categoria,
    precio_min,
    precio_max,
    estado,
    searchQuery,
    ordenPrecio,
  ]);

  useEffect(() => {
    // Reinicia a la página 1 y actualiza los productos cuando cambian los filtros o la búsqueda
    setCurrentPage(1);
    fetchProductos(
      1,
      itemsPerPage,
      categoria,
      precio_min,
      precio_max,
      estado,
      searchQuery,
      ordenPrecio
    );
  }, [
    categoria,
    precio_min,
    precio_max,
    estado,
    searchQuery,
    itemsPerPage,
    ordenPrecio,
  ]);

  // Aplica búsqueda localmente sobre los productos ya cargados
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProductos(productos);
    } else {
      const filtered = productos.filter(
        (product) =>
          product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.estado_producto &&
            product.estado_producto
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (product.categoria &&
            product.categoria.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProductos(filtered);
    }
  }, [searchQuery, productos]);

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
    const loadFavoriteStatus = async () => {
      if (!userData?.id) return;

      try {
        // Fetch user's current favorites
        const favoritos = await favoritoService.getFavorito(userData?.id);
        
        // Create a map of favorite product IDs
        const favoritosMap = favoritos.reduce((acc, fav) => {
          acc[fav.id_producto] = true;
          return acc;
        }, {} as {[key: string]: boolean});

        setFavoriteStatus(favoritosMap);
      } catch (error) {
        console.error("Error al cambiar el estado de los favoritos:", error);
      }
    };

    loadFavoriteStatus();
  }, [userData]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const formatCurrency = (value: number): string =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div id="contenedor filtro y card" className="flex flex-row">
      {isPending && <Cargando />}
      <div
        id="tarjetas"
        className="flex flex-col w-full justify-center items-center"
      >
        <section className="py-14 bg-background">
          <div className="container mx-auto">
            {filteredProductos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                {filteredProductos.map((product) => (
                  <motion.div
                    key={product.id}
                    className="cursor-pointer"
                  >
                    <Card>
                      <CardContent
                      onClick={() => handleCardClick(product)}
                      className="p-4">
                        <Image
                          src={product.imagen_url || "/default-image.jpg"}
                          alt={product.nombre}
                          width={400}
                          height={400}
                          className="w-52 h-52 mb-4 rounded object-cover object-center"
                        />
                        <h3 className="text-lg font-semibold truncate max-w-40">
                          {product.nombre}
                        </h3>
                        <p className="text-gray-600">
                          Lps.{" "}
                          {formatCurrency(
                            product.precio
                            )}
                        </p>
                      </CardContent>
                      <div>
                        <div className="flex justify-center p-6 pt-0 gap-3">
                          <div className="">
                            <Button
                              onClick={() => handleAgregarCarrito(product.id)}
                              disabled={loadingProducto === product.id}
                              className={` w-28 bg-custom-blue text-white hover:bg-blue-900 hover:text-white ${
                                productosSeleccion?.id === product.id
                                  ? "ring-2 ring-ring ring-sec ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
                                  : ""
                              }`}
                            >
                              <ShoppingCart/>
                            </Button>
                          </div>
                          <div className="">
                            <Button
                              type="submit"
                              variant="outline"
                              className={`space-x-2 bg-custom-beige text-black hover:bg-orange-100 ${
                                productosSeleccion?.id === product.id
                                  ? "ring-2 ring-ring ring-sec ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
                                  : ""
                              }`}
                              onClick={() => handleAgregarFavoritos(product.id)}
                            >
                              <Heart
                                className={cn(
                                  "h-4 w-4",
                                  favoriteStatus[product.id] && "fill-current text-red-500"
                                )}
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center min-h-96">
                <p className="text-3xl text-center font-semibold text-gray-600">
                  No se encontraron productos.
                </p>
              </div>
            )}

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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 leading-tight border border-gray-300 ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {page}
                  </Button>
                )
              )}
              {currentPage < totalPages && (
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-2 leading-tight border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Siguiente
                </Button>
              )}
            </div>
            {/* Selector de cantidad de elementos por página */}
            <div className="mb-4 px-6 flex justify-end items-center">
              <label htmlFor="items-per-page" className="mr-2">
                Elementos por página:
              </label>
              <select
                id="items-per-page"
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(parseInt(e.target.value))
                }
                className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
