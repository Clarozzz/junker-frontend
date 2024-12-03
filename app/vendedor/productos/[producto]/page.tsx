'use client'

import Footer from "@/components/footer";
import { useParams } from "next/navigation";
import Formulario from "./components/formulario";

export default function EditarProducto() {
    const params = useParams<{ producto: string }>()

    return (
        <>
            <Formulario id={params.producto} />
            <Footer />
        </>
    );
}

