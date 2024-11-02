'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Cargando from "@/components/ui/cargando";
import { getUser } from "../api/usuarios";
import { UserProvider } from "@/context/UserContext";

export default function PerfilLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [userData, setUserData] = useState<Usuario>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const links = [
        { nombre: 'Información de la cuenta', ruta: '/perfil', titulo: 'Mi cuenta' },
        { nombre: 'Historial de compras', ruta: '/perfil/compras', titulo: 'Mis compras' },
        { nombre: 'Productos en venta', ruta: '/perfil/productos', titulo: 'Mis productos' },
        { nombre: 'Contraseña y Seguridad', ruta: '/perfil/password', titulo: 'Gestiona tu contraseña'}
    ];

    const currentLink = links.find((link) => link.ruta === pathname);
    const titulo = currentLink ? currentLink.titulo : 'Página no encontrada';

    useEffect(() => {
        const token = Cookies.get('access_token') || '';
        const loadUserData = async () => {
            try {
                const data = await getUser(token);
                setUserData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Error desconocido');
                }
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    if (loading) return <Cargando />;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Navbar />
            <UserProvider userData={userData} loading={loading}>
                <div className="px-6 lg:px-40 2xl:px-72">
                    <h1 className="mt-12 text-6xl montserrat font-bold">{titulo}</h1>
                    <div className="lg:flex justify-between gap-20 mt-12">
                        <div className="xl:w-1/4 lg:w-1/2">
                            <div className="bg-slate-100 px-6 py-10 rounded-lg">
                                <div className="flex justify-center">
                                    <div>
                                        <Avatar className="w-24 h-24">
                                            <AvatarImage src={userData?.avatar_url} className="image-cover" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <h2 className="mt-4 text-xl font-bold text-center">
                                            {userData?.nombre}
                                        </h2>
                                    </div>
                                </div>
                                <ul className="mt-8">
                                    {links.map((link) => (
                                        <li key={link.ruta} className={`my-6 transition-colors ${pathname === link.ruta ? 'text-black underline underline-offset-8' : 'text-slate-500 hover:text-black hover:underline hover:underline-offset-8'}`}>
                                            <Link href={link.ruta}>{link.nombre}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="xl:w-3/4 mt-10 lg:mt-0 lg:w-1/2">
                            {children}
                        </div>
                    </div>
                </div>
            </UserProvider>
            <Footer />
        </>
    );
}
