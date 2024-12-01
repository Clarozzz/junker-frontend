"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Trash2, Heart } from 'lucide-react'
import { favoritoService } from "@/app/api/favorito"
import { readUser } from "@/app/api/server"
import { getUser } from "@/app/api/usuarios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export default function ListaFavoritos() {
  const [favoritos, setFavorito] = useState<Favorito[]>([])
  const [userData, setUserData] = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const {
          data: { user },
        } = await readUser()
        if (!user) {
          throw new Error("Error al obtener el usuario")
        }

        const usuario = await getUser(user.id)
        if (usuario) {
          setUserData(usuario)
        }
      } catch {
        setUserData(null)
      }
    }

    loadUserData()
  }, [])

  useEffect(() => {
    if (userData?.id && userData.id.length > 0) {
      const fetchfavoritos = async () => {
        setIsLoading(true)
        try {
          const data = await favoritoService.getFavorito(userData.id)
          setFavorito(data)
        } catch (error) {
          console.error("Error al obtener favoritos:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchfavoritos()
    }
  }, [userData])

  const formatCurrency = (value: number): string =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const handleEliminarProducto = async (usuario_id: string, producto_id: string) => {
    try {
      await favoritoService.eliminarProductoDeFavoritos(usuario_id, producto_id)
      setFavorito((prevFavoritos) =>
        prevFavoritos.filter((favorito) => favorito.productos.id !== producto_id)
      )
    } catch (error) {
      console.error("Error al eliminar el producto:", error)
    }
  }

  return (
    <div className="bg-gray-100 py-8 min-h-[calc(100vh-74.42px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl montserrat font-bold text-center sm:text-left">
            Tus productos favoritos
          </h1>
          <Button asChild className="shadow-md bg-custom-blue hover:bg-blue-900 text-white transition-all duration-200 w-full sm:w-auto">
            <Link href="/productos">
              <ShoppingBag className="mr-2" />
              Explorar tienda
            </Link>
          </Button>
        </div>
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-4 sm:p-6">
            {isLoading ? (
              <div className="space-y-8">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <Skeleton className="w-full sm:w-64 h-64 rounded-lg" />
                    <div className="flex-grow space-y-4 w-full">
                      <Skeleton className="h-10 w-40" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-8 w-32" />
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <Skeleton className="h-10 w-full sm:w-32" />
                        <Skeleton className="h-10 w-full sm:w-32" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : favoritos.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-xl mb-6">No tienes productos favoritos aún.</p>
                <Button asChild className="shadow-md bg-custom-blue hover:bg-blue-900 text-white transition-all duration-200">
                  <Link href="/productos">
                    Explorar tienda
                    <ShoppingBag className="ml-2" />
                  </Link>
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                {favoritos.map((favorito) => (
                  <motion.div
                    key={favorito.id_usuario}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8 last:mb-0"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <Link href={`/productos/${favorito.productos.id}`} className="block w-full sm:w-64 h-64 relative rounded-lg overflow-hidden shadow-md group">
                        <Image
                          src={
                            favorito.productos.productos_imagenes_filtradas[0]?.url ||
                            "/default-image.jpg"
                          }
                          alt={favorito.productos.nombre}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">Ver detalles</span>
                        </div>
                      </Link>
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={favorito.productos?.vendedores?.usuarios?.avatar_url}
                                  alt={favorito.productos?.vendedores?.usuarios?.nombre}
                                />
                                <AvatarFallback className="bg-custom-blue text-white">
                                  {favorito.productos?.vendedores?.usuarios?.nombre
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {`${favorito.productos?.vendedores?.usuarios?.nombre || ''} ${favorito.productos?.vendedores?.usuarios?.apellido || ''
                                    }`}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {favorito.productos?.vendedores?.calificacion || ''}% Comentarios
                                  positivos
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="secondary"
                              onClick={() =>
                                handleEliminarProducto(favorito.id_usuario, favorito.productos.id)
                              }
                            >
                              <Trash2 className="w-5 h-5 text-rose-500" />
                            </Button>
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-900">
                            <Link href={`/productos/${favorito.productos.id}`} className="hover:text-custom-blue hover:underline transition-colors">
                              {favorito.productos?.nombre}
                            </Link>
                          </h3>
                          <p className="text-gray-600 line-clamp-2">{favorito.productos?.descripcion}</p>
                          <Badge
                            className={
                              favorito.productos?.estado_producto === "Nuevo"
                                ? "bg-green-400/40 text-black"
                                : "bg-gray-600/50"
                            }
                          >
                            {favorito.productos?.estado_producto}
                          </Badge>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <p className="text-2xl font-bold">
                            Lps. {formatCurrency(favorito.productos?.precio)}
                          </p>
                          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4">
                            <Button asChild variant="default" className="bg-custom-blue hover:bg-blue-900 text-white transition-all duration-200 w-full sm:w-auto">
                              <Link href={`/productos/${favorito.productos.id}`}>
                                Comprar ahora
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-8" />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

