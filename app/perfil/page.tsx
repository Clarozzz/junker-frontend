'use client'

import DatosPersonales from "./components/datos-personales";
import InfoCuenta from "./components/info-cuenta";
import { useEffect, useState } from "react";
import { readUser } from "../api/server";
import { getUser } from "../api/usuarios";
import Cargando from "@/components/ui/cargando";

export default function Component() {
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
        <div className="space-y-8">
            <InfoCuenta email={userData?.email || ''} />
            <DatosPersonales userData={userData} />
        </div>
    );
}
