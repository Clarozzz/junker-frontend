'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CircleCheck } from "lucide-react";
import { getUser, updateDescripcion } from "@/app/api/usuarios";
import { readUser } from "@/app/api/server";

const descripcionSchema = z.object({
    descripcion: z.string().min(1, "Debes incluir una descricpcion!")
})

export default function Descripcion({descripcion}:{descripcion: string}) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);


    const handleDescripcion = async (event: React.FocusEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            setIsLoading(true);
            const res = await readUser()

            if (!res.data.user?.id) {
                throw new Error("Error actualizando el usuario")
            }

            const usuario = await getUser(res.data.user.id)

            const parsedData = descripcionSchema.parse(data);

            const response = await updateDescripcion(usuario.vendedores[0].id, parsedData.descripcion)

            if (response) {
                setMessage("Datos actualizados exitosamente!")
                window.location.reload();
            }
        } catch (error) {
            setError(`${error}`)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Describe quien eres</CardTitle>
                <h2 className="text-gray-500">Escribe algo que agregue valor a tu perfil de vendedor</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleDescripcion} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="telefono">Descripcion</Label>
                        <Textarea
                            id="descripcion"
                            name="descripcion"
                            placeholder="Describe quien eres..."
                            defaultValue={descripcion}
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
                {error && (
                    <Alert variant="destructive" className='mt-4'>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}
                {message && (
                    <Alert className="mt-4 border-green-500 text-green-600">
                        <CircleCheck className="h-4 w-4" color='#22c55e' />
                        <AlertTitle>Hecho</AlertTitle>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}
