'use client'

import Cargando from "@/components/ui/cargando";
import DatosPersonales from "./components/datos-personales";
import { useUser } from "@/context/UserContext";
import InfoCuenta from "./components/info-cuenta";

export default function Component() {
    const { loading } = useUser();
    
    if (loading) return <Cargando />;

    return (
        <div className="space-y-8">
            <InfoCuenta />
            <DatosPersonales />
        </div>
    );
}
