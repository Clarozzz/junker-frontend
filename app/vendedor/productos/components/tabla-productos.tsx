'use client'

import { getProductosVendedor } from "@/app/api/usuarios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function TablaProductos({ id }: { id: string | null }) {
    const [products, setProducts] = useState<ProductosVendedor[]>([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 5;

    const fetchProducts = useCallback(async () => {
        if (!id || !hasMore || loading) return;

        setLoading(true);
        try {
            const fetchedProducts = await getProductosVendedor(id, limit, offset);

            // Si el backend retorna una lista vacía, hasMore debe ser false
            if (fetchedProducts.length === 0) {
                setHasMore(false);
            } else {
                setProducts(prevProducts => [...prevProducts, ...fetchedProducts]);
                setOffset(prevOffset => prevOffset + limit);
                setHasMore(fetchedProducts.length === limit); // Esto controla si aún hay más productos
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, [id, hasMore, loading, offset]);

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    const loadMore = () => {
        if (!loading && hasMore) {
            fetchProducts();
        }
    };

    const router = useRouter();
    const handleRedirect = (id: string) => {
        router.push(`/vendedor/productos/${id}`); // Redirige a la ruta dinámica
    };

    return (
        <div className="bg-gray-100 py-8 min-h-[calc(100vh-74.42px)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl montserrat font-bold mb-8">Mis productos</h1>
                <Card>
                    <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div>
                            <CardTitle className="text-xl sm:text-2xl font-bold">Tus productos</CardTitle>
                            <p className="text-sm sm:text-base text-gray-500">Gestiona los productos que tienes actualmente en venta</p>
                        </div>
                        <Button asChild className="shadow-md bg-green-600 hover:bg-green-700 text-white transition-all duration-200 w-full sm:w-auto">
                            <Link href="/publicar">
                                <span className="mr-2">Agregar producto</span>
                                <Plus className="inline-block" />
                                <span className="sr-only">Agregar nuevo producto</span>
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {products.length > 0 ? (
                            <>
                                <div className="overflow-x-auto -mx-4 sm:mx-0">
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
                                                    <TableCell className="p-2 sm:p-4">
                                                        <Image
                                                            src={product.imagen}
                                                            alt={`Imagen de ${product.nombre}`}
                                                            width={100}
                                                            height={100}
                                                            className="object-cover rounded-md h-16 w-16 sm:h-24 sm:w-24"
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">{product.nombre}</TableCell>

                                                    <TableCell className="text-right" >
                                                        <Button  className="rounded-md text-xs sm:text-sm font-medium shadow-md bg-slate-950 hover:bg-slate-800 text-white transition-all duration-200"   onClick={() => handleRedirect(product.id)}>
                                                            Editar
                                                            <span className="sr-only">Editar {product.nombre}</span>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                {hasMore && products.length > 0 && (
                                    <div className="flex justify-center mt-6 sm:mt-8">
                                        <Button
                                            onClick={loadMore}
                                            className="shadow-md bg-custom-blue hover:bg-blue-900 text-white transition-all duration-200"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Cargando...
                                                </>
                                            ) : (
                                                "Cargar más"
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : loading ? (
                            <div className="flex flex-col items-center text-gray-600 h-48">
                                <Loader2 size={80} className="animate-spin" />
                                <p className="mt-4 text-lg font-semibold montserrat">Cargando...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-48 space-y-4">
                                <AlertCircle className="w-12 h-12 text-custom-orange" aria-hidden="true" />
                                <p className="text-xl font-semibold text-gray-600 text-center">No tienes productos en venta</p>
                                <Button asChild className="shadow-md bg-green-600 hover:bg-green-700 text-white transition-all duration-200">
                                    <Link href="/publicar">
                                        Agregar producto
                                        <Plus className="ml-2" aria-hidden="true" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}