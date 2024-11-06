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
  vendedores: {
    descripcion: string;
    calificacion: number;
    usuarios: {
      nombre: string;
      apellido: string;
      email: string;
    };
  };
}

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface ProductDetailProps {
  titulo: string;
  precio: number;
  descripcion: string;
  imagenes: ProductImage[];
  categorias: string;
  estado: string;
  vendedor_descripcion: string;
  nombre_vendedor: string;
  contacto_vendedor: string;
  vendedor_calificacion: number;
}

  interface ProductoCreate {
    nombre: string;
    descripcion: string;
    precio: number;
    estado_producto: string;
    imagen_url: string[];
    id_vendedor: string;
    id_categoria: string;
    stock: number;
  }

  interface Producto extends ProductoCreate {
    id: string;
    created_at: string;
  }

  interface ProductoResponse {
    message: string;
  }

  interface Categoria {
    id: string;
    nombre: string;
  }

  interface CategoriaError {
    message: string;
    status?: number;
  }

interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  genero: string;
  fecha_nacimiento: string;
  direccion: string;
  avatar_url: string;
  telefono: string;
  email: string;
}

interface ProductosResponse {
  items: Producto[];
  total: number;
}

interface ProductoVista {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  id_vendedor: string;
  productos_imagenes: { url: string; orden: number }[];
  productos_categorias: { categorias: { nombre: string } }[];
  vendedores: {
    usuarios: { email: string; nombre: string; apellido: string };
  };
}