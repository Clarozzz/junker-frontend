import Link from "next/link";

export default function Page() {
  
  return (
    <>
      <ul>
        <li>
          <Link href='#'>Iniciar sesion</Link>
        </li>
        <li>
          <Link href='#'>Publicar producto</Link>
        </li>
        <li>
          <Link href='/perfil'>Ver mi perfil</Link>
        </li>
      </ul>
    </>
  );
}