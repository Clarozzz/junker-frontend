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

interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  genero: string;
  fecha_nacimiento: string;
  email: string;
  telefono: string;
  direccion: string;
  avatar_url: string;
}