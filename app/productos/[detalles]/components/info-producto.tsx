'use client'
import { useEffect, useState } from "react";
import { getProducto } from "@/app/api/productos";
import DetalleProducto from "./detalle-prod";

export default function InfoProductos({ params }: { params: { detalles: string } }) {
  const { detalles } = params; 
  const [producto, setProducto] = useState<Producto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await getProducto(detalles); 
        setProducto(data);
      } catch (error) {
        setError("Error al obtener los detalles del producto");
        console.error(error);
      }
    };

    fetchProducto();
  }, [detalles]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <DetalleProducto
      id_producto={producto.id}
      titulo={producto.nombre}
      precio={producto.precio}
      descripcion={producto.descripcion}
      categorias={producto.productos_categorias[0]?.categorias.nombre}
      estado={producto.estado_producto}
      vendedor_descripcion={producto.vendedores.descripcion}
      nombre_vendedor={producto.vendedores.usuarios.nombre}
      contacto_vendedor={producto.vendedores.usuarios.email}
      vendedor_calificacion={producto.vendedores.calificacion}
      imagenes={producto.productos_imagenes.map((img, index) => ({
        id: index,
        url: img.url,
        alt: producto.nombre 
      }))}
    />
  );
}
