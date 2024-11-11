"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/context/UserContext";
import Cargando from "@/components/ui/cargando";
import { useState } from "react";
import Cookies from 'js-cookie';
import { updateEmail, updateUser, uploadAvatarUser } from "../api/usuarios";
import { z } from "zod";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Calendar, CircleCheck, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type DropzoneState, useDropzone } from 'react-dropzone'
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";


const userSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().min(1, "El apellido es obligatorio"),
    genero: z.string().optional(),
    fecha_nacimiento: z.string().optional(),
    direccion: z.string().optional(),
    telefono: z.string().optional(),
    avatar_url: z.string().optional()
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
    const [uLoading, setULoading] = useState(false)

    const onDrop = async (acceptedFiles: File[]) => {
        // Verifica que se haya seleccionado al menos un archivo
        console.log('Archivo seleccionado: ', acceptedFiles[0])
    }

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        isDragActive,
        acceptedFiles
    }: DropzoneState = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        multiple: false,
        maxSize: 10000000
    })

    if (!userData) return <Cargando />;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            setULoading(true)

            let avatar_url = '';
            if (acceptedFiles.length > 0) {
                avatar_url = await uploadAvatarUser({ file: acceptedFiles[0] });
            }

            if (avatar_url) {
                data.avatar_url = avatar_url;
            }

            const parsedData = userSchema.parse(data);

            const token = Cookies.get('access_token');

            if (!token) throw new Error("No se encontró el token de acceso");
            if (!userData?.id) throw new Error("No se encontró el usuario");

            await updateUser(userData.id, token, parsedData);
            // window.location.reload();
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
        } finally {
            setULoading(false)
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

    // Define tus clases de CSS
    const focusedClass = 'border-neutral-500 bg-neutral-500/10 text-neutral-500'
    const acceptClass = 'border-green-500 bg-green-500/10 text-green-500'
    const rejectClass = 'border-red-500 bg-red-500/10 text-red-500'

    // Utiliza una función para determinar qué clase aplicar
    const getClassName = () => {
        if (isDragReject) return rejectClass
        if (isDragAccept) return acceptClass
        if (isFocused) return focusedClass
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Ajustes de la cuenta</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3 className="text-xl font-semibold mb-4">Información de la cuenta</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-grow">
                                <Label>Correo</Label>
                                <div className="flex items-center mt-1">
                                    <div className="relative flex-grow">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                        <Input disabled defaultValue={userData?.email} className="pl-10" />
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


            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Datos personales</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="col-span-full">
                            <Label
                                htmlFor="cover-photo"
                                className="block font-medium dark:text-white text-gray-900"
                            >
                                Fotografia de perfil
                            </Label>

                            {/* Dropzone necesario para realizar el Drag and drop */}
                            <div
                                {...getRootProps()}
                                className={`mt-4 flex text-gray-600 flex-col justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 transition-colors duration-200 ${getClassName()} cursor-pointer hover:bg-slate-100`}
                            >
                                <input name='file' {...getInputProps()} />
                                {acceptedFiles.length > 0 ? (
                                    <p>Imagen seleccionada: {acceptedFiles[0].name}</p>
                                ) : (
                                    <>
                                        {isDragAccept && <p>Suelta la imagen</p>}
                                        {isDragReject && <p>Solo se permiten imágenes</p>}
                                        {!isDragActive && (
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-neutral-400" aria-hidden="true" />
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <p className="pl-1"><span className="text-blue-600">Sube </span>o arrastra y suelta una imagen</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG hasta 10MB</p>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Muestra la vista previa de la imagen seleccionada */}
                                {acceptedFiles.length > 0 && (
                                    <div className="flex justify-center">
                                        <Image
                                            src={URL.createObjectURL(acceptedFiles[0])}
                                            alt={`Imagen de ${userData.nombre}`}
                                            width={150}
                                            height={150}
                                            className="h-40 w-40 mt-2 mx-auto rounded-full aspect-square object-cover border-4 border-green-500/50" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-4 xl:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input id="nombre" name="nombre" defaultValue={userData?.nombre} />
                                {formErrors.nombre && <p className="text-red-500 text-sm">{formErrors.nombre}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="apellido">Apellido</Label>
                                <Input id="apellido" name="apellido" defaultValue={userData?.apellido} />
                                {formErrors.apellido && <p className="text-red-500 text-sm">{formErrors.apellido}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
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

                        <div className="space-y-2">
                            <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <Input
                                    id="fecha_nacimiento"
                                    name="fecha_nacimiento"
                                    type="date"
                                    defaultValue={userData?.fecha_nacimiento || ""}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="direccion">Dirección</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <Input
                                    id="direccion"
                                    name="direccion"
                                    defaultValue={userData?.direccion || ""}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <Input
                                    id="telefono"
                                    name="telefono"
                                    defaultValue={userData?.telefono}
                                    maxLength={8}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="bg-custom-blue hover:bg-blue-900  transition-all duration-200"
                            disabled={uLoading}
                        >
                            {uLoading ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-loader-circle animate-spin mr-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                                    Guardando...
                                </>
                            ) : (
                                "Guardar Cambios"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
