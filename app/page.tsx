import Footer from "@/components/footer";
import Testimonios from "./components/testimonios";
// import ProductosSeccion from "./components/productos-seccion";
import Navbar from "@/components/navbar";
import CallSection from "./components/call";

export default function Page() {
  
  return (
    <>
      <Navbar />
      <CallSection/>
      {/* <ProductosSeccion/> */}
      <Testimonios/>
      <Footer />
    </>
  );
}