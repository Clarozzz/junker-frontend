import React, { Suspense } from "react";
import Footer from "@/components/footer";
import ProductosMain from "./components/productos-main";

export default function Productos() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductosMain />
      <Footer />
    </Suspense>
  );
}
