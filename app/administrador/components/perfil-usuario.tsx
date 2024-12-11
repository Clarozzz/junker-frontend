"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import {
  AlertCircle,
  Calendar,
  CircleCheck,
  MapPin,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type DropzoneState, useDropzone } from "react-dropzone";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { getUser, updateUser, uploadAvatarUser } from "@/app/api/usuarios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { readUser } from "@/app/api/server";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const userSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  genero: z.string().optional(),
  fecha_nacimiento: z.string().optional(),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  avatar_url: z.string().optional(),
});

export default function PerfilUsuario({
  params,
}: {
  params: { perfil: string };
}) {
  const { perfil } = params;
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [uLoading, setULoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const pathname = usePathname();
  const [userData, setUserData] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const {
          data: { user },
        } = await readUser();
        if (!user) {
          throw new Error("Error al obtener el usuario");
        }

        const usuario = await getUser(perfil);
        if (usuario) {
          setUserData(usuario);
        }
      } catch {
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [perfil]);

  const links = [
    {
      nombre: "Ajustes de la cuenta",
      ruta: "/administrador/administradores/perfil",
      titulo: "Ajustes de la cuenta",
    },
    {
      nombre: "Historial de compras",
      ruta: "/perfil/compras",
      titulo: "Historial de compras",
    },
    {
      nombre: "Perfil de vendedor",
      ruta: "/perfil/vendedor",
      titulo: "Perfil de vendedor",
    },
    {
      nombre: "Contraseña y Seguridad",
      ruta: "/perfil/password",
      titulo: "Contraseña y seguridad",
    },
  ];

  const currentLink = links.find((link) => link.ruta === pathname);
  const titulo = currentLink ? currentLink.titulo : "Página no encontrada";

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
    acceptedFiles,
  }: DropzoneState = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    maxSize: 10000000,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const datos = Object.fromEntries(formData.entries());

    try {
      setULoading(true);
      const res = await readUser();

      if (!res.data.user?.id) {
        throw new Error("Error actualizando el usuario");
      }

      let avatarUrl = "";
      if (acceptedFiles.length > 0) {
        avatarUrl = await uploadAvatarUser({ file: acceptedFiles[0] });
      }

      if (avatarUrl) {
        datos.avatar_url = avatarUrl;
      }

      const parsedData = userSchema.parse(datos);

      const response = await updateUser(res.data.user?.id, parsedData);

      if (response) {
        setMessage("Datos actualizados exitosamente!");
        window.location.reload();
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0])
            fieldErrors[error.path[0] as string] = error.message;
        });
        setFormErrors(fieldErrors);
      } else {
        setError(`Ocurrió un error: ${err}`);
      }
    } finally {
      setULoading(false);
    }
  };

  const focusedClass = "border-neutral-500 bg-neutral-500/10 text-neutral-500";
  const acceptClass = "border-green-500 bg-green-500/10 text-green-500";
  const rejectClass = "border-red-500 bg-red-500/10 text-red-500";

  const getClassName = () => {
    if (isDragReject) return rejectClass;
    if (isDragAccept) return acceptClass;
    if (isFocused) return focusedClass;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl montserrat font-bold mb-8">
          {titulo}
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4 xl:w-1/5">
            <div className="bg-white px-6 py-8 rounded-xl shadow-md">
              <div className="flex flex-col items-center">
                {isLoading ? (
                  <>
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <Skeleton className="w-32 h-8 rounded-lg mt-4" />
                  </>
                ) : (
                  <>
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={userData?.avatar_url}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {userData?.nombre?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="mt-4 text-xl font-bold text-center">
                      {userData?.nombre}
                    </h2>
                  </>
                )}
              </div>
              <nav className="mt-8 space-y-6 flex flex-col">
                {links.map((link) => (
                  <Link
                    key={link.ruta}
                    href={link.ruta}
                    className={`transition-colors text-lg px-3 ${
                      pathname === link.ruta
                        ? "underline underline-offset-4"
                        : "hover:text-black hover:underline hover:underline-offset-4 text-gray-500"
                    }`}
                  >
                    {link.nombre}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="lg:w-3/4 xl:w-4/5">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Datos personales
                  </CardTitle>
                  <h2 className="text-gray-500">
                    Actualiza tus datos personales
                  </h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="col-span-full">
                      <Label htmlFor="cover-photo" className="block">
                        Fotografía de perfil
                      </Label>
                      <div
                        {...getRootProps()}
                        className={`mt-4 flex text-gray-600 flex-col justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 transition-colors duration-200 ${getClassName()} cursor-pointer hover:bg-slate-100`}
                      >
                        <input name="file" {...getInputProps()} />
                        {acceptedFiles.length > 0 ? (
                          <p>Imagen seleccionada: {acceptedFiles[0].name}</p>
                        ) : (
                          <>
                            {isDragAccept && <p>Suelta la imagen</p>}
                            {isDragReject && <p>Solo se permiten imágenes</p>}
                            {!isDragActive && (
                              <div className="text-center">
                                <PhotoIcon
                                  className="mx-auto h-12 w-12 text-neutral-400"
                                  aria-hidden="true"
                                />
                                <div className="mt-4 text-sm text-gray-600">
                                  <p className="pl-1">
                                    <span className="text-blue-600">Sube </span>
                                    o arrastra y suelta una imagen
                                  </p>
                                </div>
                                <p className="text-xs text-gray-600">
                                  PNG, JPG hasta 10MB
                                </p>
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
                        <Input
                          id="nombre"
                          name="nombre"
                          defaultValue={userData?.nombre}
                        />
                        {formErrors.nombre && (
                          <p className="text-red-500 text-sm">
                            {formErrors.nombre}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido">Apellido</Label>
                        <Input
                          id="apellido"
                          name="apellido"
                          defaultValue={userData?.apellido}
                        />
                        {formErrors.apellido && (
                          <p className="text-red-500 text-sm">
                            {formErrors.apellido}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="genero">Género</Label>
                      <Select
                        name="genero"
                        defaultValue={userData?.genero || undefined}
                      >
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
                      <Label htmlFor="fecha_nacimiento">
                        Fecha de Nacimiento
                      </Label>
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
                      className="bg-custom-blue hover:bg-blue-900 transition-all duration-200"
                      disabled={uLoading}
                    >
                      {uLoading ? (
                        <>
                          <svg
                            className="lucide lucide-loader-circle animate-spin mr-2"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeOpacity="0.25"
                            ></circle>
                            <path
                              d="M2 12a10 10 0 1 1 19.8 1.5"
                              fill="none"
                            ></path>
                          </svg>
                          Cargando...
                        </>
                      ) : (
                        "Actualizar Perfil"
                      )}
                    </Button>
                  </form>
                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {message && (
                    <Alert className="mt-4 border-green-500 text-green-600">
                      <CircleCheck className="h-4 w-4" color="#22c55e" />
                      <AlertTitle>Hecho</AlertTitle>
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
