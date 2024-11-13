'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { z } from "zod";
import Cookies from "js-cookie";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { updateDescripcion } from "@/app/api/usuarios";

const descripcionSchema = z.object({
    descripcion: z.string().min(1, "Debes incluir una descricpcion!")
})

export default function Descripcion() {
    const [isLoading, setIsLoading] = useState(false)
    const { userData } = useUser();
    const [error, setError] = useState<string | null>(null);

    if (error) {
        return (
            <Alert variant="destructive" className='mt-4'>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>)
    }

    const handleDescripcion = async (event: React.FocusEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            setIsLoading(true);

            const parsedData = descripcionSchema.parse(data);
            const token = Cookies.get('access_token');

            if (!token) throw new Error("No se encontró el token de acceso");
            if (!userData?.id) throw new Error("No se encontró el usuario");

            await updateDescripcion(userData.vendedores[0].id, token, parsedData.descripcion)

        } catch (error) {
            setError(`${error}`)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <h3 className="text-3xl font-semibold">Perfil de vendedor</h3>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleDescripcion} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="telefono">Descripcion</Label>
                        <Textarea
                            id="descripcion"
                            name="descripcion"
                            placeholder="Describe quien eres..."
                            defaultValue={userData?.vendedores[0].descripcion}
                        />
                        <p className="text-sm text-muted-foreground">
                            La descripcion la podrán ver los clientes en tu <span className="text-blue-600">perfil de vendedor</span>
                        </p>
                    </div>
                    <Button
                        type="submit"
                        className="bg-custom-blue hover:bg-blue-900  transition-all duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-loader-circle animate-spin mr-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                                Guardando...
                            </>
                        ) : (
                            "Guardar Descripción"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
