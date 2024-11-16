'use client'

import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter()

    const regresar = () => {
        router.push('/')
    }

    return (
        <>
            <div className="relative" style={{ height: "calc(100vh - 74.42px)" }}>
                <Image
                    src="/images/landing24.webp"
                    alt="Hubo un problema"
                    fill
                    className="image-cover"
                />

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="absolute inset-0 flex justify-center items-center text-white">
                    <div className="space-y-4 text-center">
                        <h1 className="text-5xl montserrat font-bold">
                            404
                        </h1>
                        <h3 className="text-center text-lg">
                            Pagina no encontrada
                        </h3>
                        <Button onClick={regresar} className="bg-custom-beige text-black hover:brightness-110 hover:bg-custom-beige ">
                            Ir a inicio<span className="ml-2"><Undo2 /></span>           
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
