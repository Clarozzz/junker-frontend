import axios from "axios";

class CarritoService {
    private baseURL: string;
  
    constructor() {
      this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
    }
  
      async getCarrito(carrito_id: string): Promise<Carrito[]> {
        try {
          const response = await axios.get(`${this.baseURL}/carrito/${carrito_id}`);
          return response.data;
        } catch (error) {
          console.error("Error al obtener los detalles del carrito:", error);
          throw error; 
        }
      }

      async agregarCarrito(carritoData: CarritoCreate): Promise<CarritoResponse> {
        try {
          const response = await axios.post(`${this.baseURL}/carrito`, carritoData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          console.error("Error al agregar producto al carrito:", error);
          throw error;
        }
      }

      async getProductStock(productId: string): Promise<ProductStock> {
        try {
          const response = await axios.get(`${this.baseURL}/productos/${productId}/stock`);
          return response.data;
        } catch (error) {
          console.error("Error al obtener el stock del producto:", error);
          throw error;
        }
      }

      async actualizarCantidad(carritoId: string, productoId: string, cantidad: number): Promise<CarritoResponse> {
        try {
          const response = await axios.patch(`${this.baseURL}/carrito/cantidad`, {
            id_carrito: carritoId,
            id_producto: productoId,
            cantidad
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          console.error("Error al actualizar la cantidad:", error);
          throw error;
        }
      }
  }
  
  
  export const carritoService = new CarritoService();
  