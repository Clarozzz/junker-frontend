'use client';

import Footer from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cargando from "@/components/ui/cargando";
import { useUser } from "@/context/UserContext";

export default function PerfilLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { userData, loading } = useUser();

    const links = [
        { nombre: 'Ajustes de la cuenta', ruta: '/perfil', titulo: 'Mi cuenta' },
        { nombre: 'Historial de compras', ruta: '/perfil/compras', titulo: 'Mis compras' },
        { nombre: 'Perfil de vendedor', ruta: '/perfil/vendedor', titulo: 'Mis productos' },
        { nombre: 'Contraseña y Seguridad', ruta: '/perfil/password', titulo: 'Gestiona tu contraseña' }
    ];

    const currentLink = links.find((link) => link.ruta === pathname);
    const titulo = currentLink ? currentLink.titulo : 'Página no encontrada';

    if (loading) return <Cargando />;

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="px-6 lg:px-40 2xl:px-72">
                <h1 className="pt-8 text-6xl montserrat font-bold">{titulo}</h1>
                <div className="lg:flex justify-between gap-20 my-8">
                    <div className="xl:w-1/4 lg:w-1/2">
                        <div className="bg-white px-6 py-10 rounded-xl shadow-md">
                            <div className="flex justify-center">
                                <div>
                                    <Avatar className="w-24 h-24">
                                        <AvatarImage src={userData?.avatar_url} className="image-cover" />
                                        <AvatarFallback>{userData?.nombre?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="mt-4 text-xl font-bold text-center">
                                        {userData?.nombre}
                                    </h2>
                                </div>
                            </div>
                            <div className="mt-8 space-y-6 flex flex-col">
                                {links.map((link) => (
                                    <Link
                                        key={link.ruta}
                                        href={link.ruta}
                                        className={`transition-colors ${pathname === link.ruta ? 'text-black underline underline-offset-8' : 'text-slate-500 hover:text-black hover:underline hover:underline-offset-8'}`}
                                    >
                                        {link.nombre}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-3/4 mt-10 lg:mt-0 lg:w-1/2 bg-white p-8 rounded-xl shadow-md">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}