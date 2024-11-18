import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { getProductosVendedor } from "@/app/api/usuarios"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from 'lucide-react'
import Link from "next/link"

export default function ProductosVendedor({ id }: { id: string | null }) {
  const [products, setProducts] = useState<ProductosVendedor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const fetchedProducts = await getProductosVendedor(id);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div>
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold">Tus productos</CardTitle>
        <h2 className="text-gray-500">Gestiona los productos que tienes actualmente en venta</h2>
      </CardHeader>
      <CardContent className="!mt-0 p-0">
        {loading ? (
          <div className="flex flex-col items-center text-gray-600 h-48">
            <div className="animate-spin">
              <Loader2 size={80} />
            </div>
            <p className="mt-4 text-lg font-semibold montserrat">Cargando...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 xl:gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader className="pt-0 px-0">
                  <Image
                    src={product.imagen}
                    alt={product.nombre}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <div className="px-6 pb-6 space-y-4">
                  <h2 className="text-lg truncate">{product.nombre}</h2>
                  <Button className="w-full rounded-lg text-md shadow-md bg-slate-950 hover:bg-slate-800 text-white transition-all duration-200">
                    Editar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 space-y-4">
            <AlertCircle className="w-12 h-12 text-custom-orange" />
            <p className="text-xl font-semibold text-gray-600">No tienes productos en venta</p>
            <Button asChild className="rounded-lg shadow-md bg-custom-blue hover:bg-blue-900 text-white transition-all duration-200">
              <Link href="/publicar">
                Agregar producto
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </div>
  )
}