"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/context/UserContext";
import Cargando from "@/components/ui/cargando";
import { useState } from "react";
import Cookies from 'js-cookie';
import { updateEmail, updateUser } from "../api/usuarios";
import { z } from "zod";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CircleCheck } from "lucide-react";

const userSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().min(1, "El apellido es obligatorio"),
    genero: z.string().optional(),
    fecha_nacimiento: z.string().optional(),
    direccion: z.string().optional(),
    telefono: z.string().optional(),
});

const emailSchema = z.object({
    email: z.string().min(1, "El correo electrónico es obligatorio").email("Formato de correo electrónico no válido"),
    emailConfirm: z.string().min(1, "El correo electrónico es obligatorio").email("Formato de correo electrónico no válido")
}).refine((data) => data.email === data.emailConfirm, {
    message: "Los correos no coinciden",
    path: ["emailConfirm"]
});

export default function Component() {
    const { userData } = useUser();
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [emailErrors, setEmailErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)


    if (!userData) return <Cargando />;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const parsedData = userSchema.parse(data);
            const token = Cookies.get('access_token');

            if (!token) throw new Error("No se encontró el token de acceso");
            if (!userData?.id) throw new Error("No se encontró el usuario");

            await updateUser(userData.id, token, parsedData);
            window.location.reload();
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                err.errors.forEach((error) => {
                    if (error.path[0]) fieldErrors[error.path[0] as string] = error.message;
                });
                setFormErrors(fieldErrors);
            } else {
                setError(`Error al actualizar el usuario: ${err}`);
            }
        }
    };

    const handleEmail = async (event: React.FocusEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        setEmailErrors({});
        setError(null)
        setMessage(null)

        try {
            setIsLoading(true)

            const parsedData = emailSchema.parse(data);
            const token = Cookies.get('access_token');

            setEmailErrors({});

            if (!token) throw new Error("No se encontró el token de acceso");
            if (!userData?.id) throw new Error("No se encontró el usuario");

            // Aquí puedes agregar la lógica para actualizar el correo si es necesario.
            const response = await updateEmail(userData.id, token, parsedData.email)

            if (response) {
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
        <>
            <h2 className="text-3xl mb-6">Ajustes de la cuenta</h2>

            <h3 className="font-bold text-lg">Información de la cuenta</h3>

            <div className="xl:grid grid-cols-2 gap-4 my-6">
                <div className="space-y-2">
                    <Label>Correo</Label>
                    <div className="flex items-center">
                        <Input disabled defaultValue={userData?.email} className="flex-grow" />
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

            <form onSubmit={handleSubmit} className="space-y-6 mb-12">
                <h3 className="font-bold text-lg">Datos personales</h3>
                <div className="xl:grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input
                            id="nombre"
                            name="nombre"
                            defaultValue={userData?.nombre}
                            className="flex-grow"
                        />
                        {formErrors.nombre && <p className="text-red-500">{formErrors.nombre}</p>}
                    </div>
                    <div className="space-y-2 mt-4 xl:mt-0">
                        <Label htmlFor="apellido">Apellido</Label>
                        <Input
                            id="apellido"
                            name="apellido"
                            defaultValue={userData?.apellido}
                            className="flex-grow"
                        />
                        {formErrors.apellido && <p className="text-red-500">{formErrors.apellido}</p>}
                    </div>
                </div>

                <div className="space-y-2 xl:w-1/2">
                    <Label htmlFor="genero">Género</Label>
                    <Select name="genero" defaultValue={userData?.genero || undefined}>
                        <SelectTrigger id="genero">
                            <SelectValue placeholder="Selecciona tu género" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="femenino">Femenino</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2 xl:w-1/2">
                    <Label>Fecha de Nacimiento</Label>
                    <Input
                        type="date"
                        name="fecha_nacimiento"
                        defaultValue={userData?.fecha_nacimiento || ""}
                    />
                </div>

                <div className="space-y-2 xl:w-1/2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                        id="direccion"
                        name="direccion"
                        defaultValue={userData?.direccion || ""}
                    />
                </div>

                <div className="space-y-2 xl:w-1/2">
                    <Label>Teléfono</Label>
                    <Input id="telefono" name="telefono" defaultValue={userData?.telefono} maxLength={8} />
                </div>

                <Button type="submit" className="bg-custom-blue hover:bg-blue-900">
                    Guardar cambios
                </Button>
            </form>
        </>
    );
}
