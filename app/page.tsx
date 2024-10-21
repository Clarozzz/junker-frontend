import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Page() {
  
  return (
    <>
      <Navbar />
      <ul>
        <li>
          <Link href='/login'>Iniciar sesion</Link>
        </li>
        <li>
          <Link href='/registro'>Registrarse</Link>
        </li>
        <li>
          <Link href='/publicar'>Publicar producto</Link>
        </li>
        <li>
          <Link href='/perfil'>Ver mi perfil</Link>
        </li>
      </ul>
      <Footer />
    </>
  );
}