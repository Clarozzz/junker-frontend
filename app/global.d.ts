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
  id_producto: string;
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
  vendedores: {
    id: string
    descripcion: string
  }[];
  carrito: {
    id: string
  }[];
}

interface ProductosResponse {
  items: ProductoVista[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

interface ProductoVista {
  id: string;
  nombre: string;
  precio: number;
  estado_producto: string;
  categoria: string;
  imagen_url: string;
}

interface ProductosVistaProps {
  categoria: string | null;
  precio_min: number ;
  precio_max: number ;
  estado: string | null;
  searchQuery?: string;
  ordenPrecio?: boolean | null;
}



// interface SidebarProductosProps {
//   onFilterChange: (filters: { 
//     precio_min: number; 
//     precio_max: number; 
//     categoria: string; 
//     estado: string; 
//   }) => void;
// }

interface SidebarProductosProps {
  onFilterChange: (filters: Partial<{
    precio_min: number;
    precio_max: number;
    categoria: string;
    estado: string;
    searchQuery: string;
  }>) => void;
}


interface FilterState {
  precio_min: number;
  precio_max: number ;
  categoria: string | null;
  estado: string | null;
  searchQuery?: string;
  ordenPrecio?: boolean | null;
}


interface UpdatePassword {
  password: string;
  newPassword: string;
  confirmPass: string;
}

interface ProductosVendedor {
  id: string;
  nombre: string;
  imagen: string;
}

interface UserAvatarName {
  nombre: string;
  avatar_url: string;
}
interface ProductoXCarrito {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  estado_producto: string;
  stock: number;
  productos_imagenes: { url: string }[];
  vendedores: {
    calificacion: number;
    usuarios: {
      nombre: string;
      apellido: string;
    };
  };
}

interface Carrito {
  id: string; 
  productos: ProductoXCarrito; 
  cantidad: number;
  id_carrito: string;
}

interface CarritoCreate {
  id_carrito: string;
  id_producto: string;
  cantidad: number;
}

interface CarritoResponse {
  message: string;
}
