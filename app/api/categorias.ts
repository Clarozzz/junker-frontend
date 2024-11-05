import axios from "axios";


export const getCategorias = async (): Promise<Categoria[]> => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error("Error en getCategorias:", error);
      throw error; 
    }
  };