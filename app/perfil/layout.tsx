'use client';

import Footer from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readUser } from "../api/server";
import { getUser } from "../api/usuarios";
import { Skeleton } from "@/components/ui/skeleton";

export default function PerfilLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [userData, setUserData] = useState<Usuario | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const { data: { user } } = await readUser()
                if (!user) {
                    throw new Error("Error al obtener el usuario");
                }

                const usuario = await getUser(user.id)
                if (usuario) {
                    setUserData(usuario)
                }
            } catch {
                setUserData(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    const links = [
        { nombre: 'Ajustes de la cuenta', ruta: '/perfil', titulo: 'Ajustes de la cuenta' },
        { nombre: 'Historial de compras', ruta: '/perfil/compras', titulo: 'Historial de compras' },
        { nombre: 'Perfil de vendedor', ruta: '/perfil/vendedor', titulo: 'Perfil de vendedor' },
        { nombre: 'Contraseña y Seguridad', ruta: '/perfil/password', titulo: 'Contraseña y seguridad' }
    ];

    const currentLink = links.find((link) => link.ruta === pathname);
    const titulo = currentLink ? currentLink.titulo : 'Página no encontrada';

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl montserrat font-bold mb-8">{titulo}</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/4 xl:w-1/5">
                        <div className="bg-white px-6 py-8 rounded-xl shadow-md">
                            <div className="flex flex-col items-center">
                                {isLoading ?
                                    <>
                                        <Skeleton className="w-24 h-24 rounded-full" />
                                        <Skeleton className="w-32 h-8 rounded-lg mt-4" />
                                    </> :
                                    <>
                                        <Avatar className="w-24 h-24">
                                            <AvatarImage src={userData?.avatar_url} className="object-cover" />
                                            <AvatarFallback>{userData?.nombre?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <h2 className="mt-4 text-xl font-bold text-center">
                                            {userData?.nombre}
                                        </h2>
                                    </>}
                            </div>
                            <nav className="mt-8 space-y-6 flex flex-col">
                                {links.map((link) => (
                                    <Link
                                        key={link.ruta}
                                        href={link.ruta}
                                        className={`transition-colors text-lg px-3 ${pathname === link.ruta
                                            ? "underline underline-offset-4"
                                            : "hover:text-black hover:underline hover:underline-offset-4 text-gray-500"
                                            }`}
                                    >
                                        {link.nombre}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                    <div className="lg:w-3/4 xl:w-4/5">
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}