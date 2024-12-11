'use client'

import Footer from "@/components/footer";
import { useParams } from "next/navigation";
import Formulario from "./components/formulario";
import { ToastProvider } from '@/components/ui/toast';

export default function EditarProducto() {
    const params = useParams<{ producto: string }>()

    return (
        <>  
            <ToastProvider/>
            <Formulario id={params.producto} />
            <Footer />
        </>
    );
}

