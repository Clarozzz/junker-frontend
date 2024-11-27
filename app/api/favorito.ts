import axios from "axios";

class FavoritoService {
    private baseURL: string;
  
    constructor() {
      this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
    }
  
      async getFavorito(usuario_id: string): Promise<Favorito[]> {
        try {
          const response = await axios.get(`${this.baseURL}/favorito/${usuario_id}`);
          return response.data;
        } catch (error) {
          console.error("Error al obtener los detalles de los favoritos:", error);
          throw error; 
        }
      }

      async agregarFavoritos(favoritoData: FavoritoCreate): Promise<FavoritoResponse> {
        try {
          const response = await axios.post(`${this.baseURL}/favorito`, favoritoData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          console.error("Error al agregar producto a la lista de deseos:", error);
          throw error;
        }
      }

      async eliminarProductoDeFavoritos(usuario_id: string, producto_id: string): Promise<void> {
        try {
            const response = await axios.delete(`${this.baseURL}/usuario/${usuario_id}/producto/${producto_id}`);
            
            if (response.status !== 200) {
              throw new Error('No se pudo eliminar el producto');
            }

            console.log(response.data.message);
        } catch (error) {
            console.error("Error al eliminar el producto de los favoritos:", error);
            throw error;
        }
    }
  }
  
  
  export const favoritoService = new FavoritoService();
  