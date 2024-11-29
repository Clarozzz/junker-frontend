import React, { Suspense } from "react";
import Footer from "@/components/footer";
import ProductosMain from "./components/productos-main";
import { ToastProvider } from "@/components/ui/toast";

export default function Productos() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ToastProvider/> 
      <ProductosMain />
      <Footer />
    </Suspense>
  );
}
