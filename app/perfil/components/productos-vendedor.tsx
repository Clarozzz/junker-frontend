'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AlertCircle, Loader2, Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getProductosVendedor } from "@/app/api/usuarios"

interface Product {
  id: string
  nombre: string
  imagen: string
}

export default function ProductosVendedor({ id }: { id: string | null }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      try {
        const fetchedProducts = await getProductosVendedor(id, 5, 0)
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [id])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <CardTitle className="text-xl sm:text-2xl font-bold">Tus productos</CardTitle>
          <p className="text-sm sm:text-base text-muted-foreground">Gestiona los productos que tienes actualmente en venta</p>
        </div>
        <Button asChild className="shadow-md bg-green-600 hover:bg-green-700 text-white transition-all duration-200 w-full sm:w-auto">
          <Link href="/publicar">
            <span className="mr-2">Agregar producto</span>
            <Plus className="inline-block" />
            <span className="sr-only">Agregar nuevo producto</span>
          </Link>
        </Button>
      </div>
      {loading ? (
        <LoadingState />
      ) : products.length > 0 ? (
        <ProductTable products={products} />
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
      <Loader2 className="h-12 w-12 animate-spin" />
      <p className="mt-4 text-lg font-semibold">Cargando...</p>
    </div>
  )
}

function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="space-y-6">
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen principal</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.imagen}
                    alt={product.nombre}
                    width={100}
                    height={100}
                    className="object-cover rounded-md h-24 w-24"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.nombre}</TableCell>
                <TableCell className="text-right">
                  <Button className="primary">Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Button asChild className="shadow-md bg-custom-blue hover:bg-blue-900 text-white transition-all duration-200">
          <Link href="/vendedor/productos">Ver más productos</Link>
        </Button>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-48 space-y-4">
      <AlertCircle className="h-12 w-12 text-yellow-500" />
      <p className="text-xl font-semibold text-muted-foreground">No tienes productos en venta</p>
      <Button asChild className="bg-green-600 hover:bg-green-700">
        <Link href="/publicar">
          <Plus className="mr-2 h-4 w-4" />
          Agregar producto
        </Link>
      </Button>
    </div>
  )
}