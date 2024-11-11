import axios from "axios";

class CarritoService {
    private baseURL: string;
  
    constructor() {
      this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
    }
  
      async getCarrito(): Promise<Carrito[]> {
        try {
          const response = await axios.get(`${this.baseURL}/carrito`);
          return response.data;
        } catch (error) {
          console.error("Error al obtener los detalles del carrito:", error);
          throw error; 
        }
      };
  }
  
  
  export const carritoService = new CarritoService();
  