import axios from "axios";

export const getProductos = async (): Promise<Producto[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error("Error en getProductos:", error);
    throw error; 
  }
};


export const getProducto = async (product_id: string): Promise<Producto> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productos/${product_id}`);
    return response.data;
  } catch (error) {
    console.error("Error en getProducto:", error);
    throw error; 
  }
};


class ProductosService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
  }

  async createProducto(productoData: ProductoCreate): Promise<ProductoResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/productos`, productoData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear el producto:", error);
      throw error;
    }
  }

  async uploadToCloudinary(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? ""
      );
      formData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? ""
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Error al subir las imagenes a cloudinary:", error);
      throw error;
    }
  }
}


export const productosService = new ProductosService();
