'use client'

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function PerfilLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const pathname = usePathname();

    const links = [
        {
            nombre: 'Información de la cuenta',
            ruta: '/perfil',
            titulo: 'Mi cuenta'
        },
        {
            nombre: 'Historial de compras',
            ruta: '/perfil/compras',
            titulo: 'Mis compras'
        },
        {
            nombre: 'Productos en venta',
            ruta: '/perfil/productos',
            titulo: 'Mis productos'
        }
    ]

    const currentLink = links.find(link => link.ruta === pathname);
    const titulo = currentLink ? currentLink.titulo : 'Página no encontrada';

    return (
        <>
            <Navbar />
            <div className="px-80">
                <h1 className="mt-16 text-6xl montserrat font-bold">{titulo}</h1>
                <div className="flex justify-between gap-20 mt-16">
                    <div className="w-1/4">
                        <div className="bg-slate-100 px-6 py-10 rounded-lg">
                            <div className="flex justify-center">
                                <div>
                                    <Avatar className="w-24 h-24">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <h2 className="mt-4 text-xl font-bold text-center">
                                        Anthony
                                    </h2>
                                </div>
                            </div>
                            <ul className="mt-8">
                                {links.map((link) => (
                                    <li key={link.ruta} className={`my-6 transition-colors ${pathname === link.ruta ? 'text-black underline underline-offset-8' : 'text-slate-500 hover:text-black hover:underline hover:underline-offset-8'}`}>
                                        <Link href={link.ruta}>
                                            {link.nombre}
                                        </Link>                           
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-3/4">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
  }