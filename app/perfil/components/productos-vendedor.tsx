import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { getProductosVendedor } from "@/app/api/usuarios"
import { useUser } from "@/context/UserContext"
import { Button } from "@/components/ui/button"

export default function ProductosVendedor() {
  const { userData } = useUser()
  const [products, setProducts] = useState<ProductosVendedor[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!userData?.vendedores?.[0]?.id) {
        console.error("No se encontró el ID del vendedor.");
        return;
      }

      try {
        const fetchedProducts = await getProductosVendedor(userData.vendedores[0].id);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [userData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Tus productos</CardTitle>
        <h2 className="text-gray-500">Gestiona los productos que tienes actualmente en venta</h2>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-6">
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
                <p className="text-green-700 font-bold !mt-2">Lps.{product.precio.toFixed(2)}</p>
                <Button className="w-full rounded-lg text-md shadow-md bg-slate-950 hover:bg-slate-800 text-white transition-all duration-200">
                  Editar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}