// import DetalleProducto from './components/detalle-prod';
import Footer from '@/components/footer';
import InfoProductos from './components/info-producto';
import { ToastProvider } from '@/components/ui/toast';

// const sampleProduct = {
//   titulo: "Premium Wireless Headphones",
//   precio: 299.99,
//   descripcion: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for extended listening sessions.",
//   imagenes: [
//     {
//       id: 1,
//       url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
//       alt: "Premium wireless headphones - Main view"
//     },
//     {
//       id: 2,
//       url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
//       alt: "Premium wireless headphones - Side view"
//     },
//     {
//       id: 3,
//       url: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80",
//       alt: "Premium wireless headphones - Detail view"
//     },
//     {
//       id: 4,
//       url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
//       alt: "Premium wireless headphones - Lifestyle"
//     }
//   ]
// };

export default function PageDetalles ( { params }: { params: { detalles: string } } ) {


  return (
    <>
    <ToastProvider/> 
    <main className="min-h-screen bg-background py-4"> 
      {/* <DetalleProducto {...sampleProduct} /> */}
      <InfoProductos params={params} />
    </main>
    <Footer/>
    </>
  )
}
