// 'use client'

// import Footer from "@/components/footer";
// import Testimonios from "./components/testimonios";
// import ProductosSeccion from "./components/productos-seccion";
// import CallSection from "./components/call";
// import Categorias from "./components/categorias";

// export default function Page() {

//   return (
//     <>
//       <CallSection />
//       <ProductosSeccion />

//       <Categorias />

//       <Testimonios />

//       <Footer />
//     </>
//   );
// }

'use client';

import { useEffect } from "react";
import Footer from "@/components/footer";
import Testimonios from "./components/testimonios";
import ProductosSeccion from "./components/productos-seccion";
import CallSection from "./components/call";
import Categorias from "./components/categorias";

export default function Page() {
  useEffect(() => {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/keep-alive`;

    const keepAlive = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          console.log("Servicio FastAPI activo");
        } else {
          console.error("Error al llamar al servicio:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la conexión:", error);
      }
    };

    const interval = setInterval(keepAlive, 60000);
    keepAlive();
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CallSection />
      <ProductosSeccion />
      <Categorias />
      <Testimonios />
      <Footer />
    </>
  );
}

