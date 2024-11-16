import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductosVendedor() {
  const products: Product[] = [
    { id: 1, name: "Classic T-Shirt", price: 19.99, image: "/images/ruedas2.webp" },
    { id: 2, name: "Denim Jeans", price: 49.99, image: "/images/ruedas2.webp" },
    { id: 3, name: "Sneakers", price: 79.99, image: "/images/ruedas2.webp" },
    { id: 4, name: "Wristwatch", price: 129.99, image: "/images/ruedas2.webp" },
    { id: 5, name: "Sunglasses", price: 39.99, image: "/images/ruedas2.webp" },
    { id: 6, name: "Backpack", price: 59.99, image: "/images/ruedas2.webp" },
    { id: 7, name: "Hoodie", price: 44.99, image: "/images/ruedas2.webp" },
    { id: 8, name: "Wireless Earbuds", price: 89.99, image: "/images/ruedas2.webp" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Tus productos</CardTitle>
        <h2 className="text-gray-500">Gestiona los productos que tienes actualmente en venta</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-green-700 font-bold mb-4">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}