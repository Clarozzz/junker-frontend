'use client'

import { readUser } from "@/app/api/server";
import { getUser } from "@/app/api/usuarios";
import Footer from "@/components/footer";
import Cargando from "@/components/ui/cargando";
import { useEffect, useState } from "react";
import TablaProductos from "./components/tabla-productos";

export default function VendedorProductos() {
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

    if (isLoading) return <Cargando />


    return (
        <>
            <TablaProductos id={userData?.vendedores[0].id || null} />
            <Footer />
        </>
    )
}
