import axios from "axios";

export const getProductos = async (): Promise<Producto[]> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productos`);
  return response.data;
};

// export const getProducto = async (product_id: string): Promise<Producto> => {
//   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productos/${product_id}`);
//   return response.data;
// };

export const getProducto = async (product_id: string): Promise<Producto> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productos/${product_id}`);
    return response.data;
  } catch (error) {
    console.error("Error en getProducto:", error);
    throw error; 
  }
};
