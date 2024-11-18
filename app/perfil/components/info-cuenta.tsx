'use client'

import { updateEmail } from "@/app/api/server";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CircleCheck, Mail } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const emailSchema = z.object({
    email: z.string().min(1, "El correo electrónico es obligatorio").email("Formato de correo electrónico no válido"),
    emailConfirm: z.string().min(1, "El correo electrónico es obligatorio").email("Formato de correo electrónico no válido")
}).refine((data) => data.email === data.emailConfirm, {
    message: "Los correos no coinciden",
    path: ["emailConfirm"]
});

export default function InfoCuenta({ email }: { email: string }) {
    const [emailErrors, setEmailErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    const handleEmail = async (event: React.FocusEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const datos = Object.fromEntries(formData.entries());

        try {
            setIsLoading(true)

            const parsedData = emailSchema.parse(datos);

            const { data, error } = await updateEmail(parsedData.email)

            if (error) {
                setError(error)
            }

            if (data) {
                setMessage("Correo enviado!")
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                const emailErrors: Record<string, string> = {};
                err.errors.forEach((error) => {
                    if (error.path[0]) emailErrors[error.path[0] as string] = error.message;
                });
                setEmailErrors(emailErrors);
            } else {
                setError(`${err}`);
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Información de la cuenta</CardTitle>
                <h2 className="text-gray-500">Actualiza los datos principales de tu cuenta</h2>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-grow">
                            <Label>Correo</Label>
                            <div className="flex items-center mt-1">
                                <div className="relative flex-grow">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                    <Input disabled defaultValue={email} className="pl-10" />
                                </div>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button className="ml-2 px-4 bg-custom-blue text-white rounded hover:bg-blue-900">
                                            Editar
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="p-10">
                                        <DialogHeader>
                                            <DialogTitle className="text-4xl montserrat">Añade tu nueva dirección de correo electrónico</DialogTitle>
                                            <DialogDescription className="py-4 text-base">
                                                Ten en cuenta que al cambiar tu correo electrónico se te enviara un <span className="text-custom-blue2">correo de verificación</span> para que puedas validar el cambio
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleEmail} className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Nueva direccion de correo electrónico</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                />
                                                {emailErrors.email && <p className="text-red-500">{emailErrors.email}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Confirmar correo electrónico</Label>
                                                <Input
                                                    id="emailConfirm"
                                                    name="emailConfirm"
                                                />
                                                {emailErrors.emailConfirm && <p className="text-red-500">{emailErrors.emailConfirm}</p>}
                                            </div>
                                            <div className="flex justify-between">
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
                                                        "Guardar Cambios"
                                                    )}
                                                </Button>
                                                <DialogClose>
                                                    <Button type="button" className="bg-gray-500 hover:bg-gray-500 hover:brightness-110 transition-all duration-200">
                                                        Cancelar
                                                    </Button>
                                                </DialogClose>
                                            </div>
                                        </form>
                                        {message && (
                                            <Alert className="mt-4 border-green-500 text-green-600">
                                                <CircleCheck className="h-4 w-4" color='#22c55e' />
                                                <AlertTitle>Hecho</AlertTitle>
                                                <AlertDescription>{message}</AlertDescription>
                                            </Alert>
                                        )}
                                        {error && (
                                            <Alert variant="destructive" className='mt-4'>
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertTitle>Error</AlertTitle>
                                                <AlertDescription>
                                                    {error}
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

    )
}
