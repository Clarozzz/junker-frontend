import axios from "axios";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  fecha_publicacion: string; 
  estado_producto: string;
  disponibilidad: string;
  productos_imagenes: { url: string }[];
  productos_categorias: { categorias: { nombre: string } }[]; 
}
  
export const getProductos = async (): Promise<Producto[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productos`);
  return response.data;
};
