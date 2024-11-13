"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/context/UserContext";
import React, { useState } from "react";
import Cookies from 'js-cookie';
import { z } from "zod";
import { Calendar, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type DropzoneState, useDropzone } from 'react-dropzone';
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { updateUser, uploadAvatarUser } from "@/app/api/usuarios";

const userSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido: z.string().min(1, "El apellido es obligatorio"),
    genero: z.string().optional(),
    fecha_nacimiento: z.string().optional(),
    direccion: z.string().optional(),
    telefono: z.string().optional(),
    avatar_url: z.string().optional()
});

export default function DatosPersonales() {
    const { userData } = useUser();
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [uLoading, setULoading] = useState(false);

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        isDragActive,
        acceptedFiles
    }: DropzoneState = useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        maxSize: 10000000
    });

    if (error) return <p>{error}</p>;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            setULoading(true);

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
            window.location.reload();
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                err.errors.forEach((error) => {
                    if (error.path[0]) fieldErrors[error.path[0] as string] = error.message;
                });
                setFormErrors(fieldErrors);
            } else {
                setError(`Ocurrió un error: ${err}`);
            }
        } finally {
            setULoading(false);
        }
    };

    const focusedClass = 'border-neutral-500 bg-neutral-500/10 text-neutral-500';
    const acceptClass = 'border-green-500 bg-green-500/10 text-green-500';
    const rejectClass = 'border-red-500 bg-red-500/10 text-red-500';

    const getClassName = () => {
        if (isDragReject) return rejectClass;
        if (isDragAccept) return acceptClass;
        if (isFocused) return focusedClass;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Datos personales</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="col-span-full">
                        <Label htmlFor="cover-photo" className="block">Fotografía de perfil</Label>
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
                                            <div className="mt-4 text-sm text-gray-600">
                                                <p className="pl-1"><span className="text-blue-600">Sube </span>o arrastra y suelta una imagen</p>
                                            </div>
                                            <p className="text-xs text-gray-600">PNG, JPG hasta 10MB</p>
                                        </div>
                                    )}
                                </>
                            )}
                            {acceptedFiles.length > 0 && (
                                <Image
                                    src={URL.createObjectURL(acceptedFiles[0])}
                                    alt={`Imagen de ${userData?.nombre}`}
                                    width={150}
                                    height={150}
                                    className="h-40 w-40 mt-2 rounded-full border-4 border-green-500/50 object-cover"
                                />
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
                            <Input id="direccion" name="direccion" defaultValue={userData?.direccion || ""} className="pl-10" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <Input id="telefono" name="telefono" defaultValue={userData?.telefono} maxLength={8} className="pl-10" />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="bg-custom-blue hover:bg-blue-900 transition-all duration-200"
                        disabled={uLoading}
                    >
                        {uLoading ? (
                            <>
                                <svg className="lucide lucide-loader-circle animate-spin mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25"></circle>
                                    <path d="M2 12a10 10 0 1 1 19.8 1.5" fill="none"></path>
                                </svg>
                                Cargando...
                            </>
                        ) : (
                            "Actualizar Perfil"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
