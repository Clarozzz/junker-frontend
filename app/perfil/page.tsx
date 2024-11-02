"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/context/UserContext";
import Cargando from "@/components/ui/cargando";
import { useState } from "react";
import Cookies from 'js-cookie';
import { updateUser } from "../api/usuarios";

export default function Component() {
    const { userData, loading } = useUser();
    const [error, setError] = useState<string | null>(null);

    if (loading) return <Cargando />;
    if (error) return <p>Error: {error}</p>;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        try {
            const token = Cookies.get('access_token');

            if (!token) {
                throw new Error("No se encontró el token de acceso");
            }

            if (!userData?.id) {
                throw new Error("No se encontró el usuario");
            }

            const updatedUser = await updateUser(userData?.id, token, data);
            console.log('Usuario actualizado:', updatedUser);
            window.location.reload();
        } catch (error) {
            setError(`Error al actualizar el usuario: ${error}`);
        }
    };

    return (
        <>
            <h2 className="text-3xl font-bold mb-6">Informacion de la cuenta</h2>
            <form onSubmit={handleSubmit} className="space-y-8 mb-12">

                <h3 className="font-bold text-lg">Informacion general</h3>
                <div className="xl:grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" name="nombre" required defaultValue={userData?.nombre} />
                    </div>
                    <div className="space-y-2 mt-4 xl:mt-0">
                        <Label htmlFor="apellido">Apellido</Label>
                        <Input id="apellido" name="apellido" required defaultValue={userData?.apellido} />
                    </div>
                </div>

                <div className="space-y-2 xl:w-1/2">
                    <Label htmlFor="genero">Género</Label>
                    <Select name="genero" defaultValue={userData?.genero}>
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
                        value={userData?.fecha_nacimiento}
                    />
                </div>

                <div className="space-y-2 xl:w-1/2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input id="direccion" name="direccion" defaultValue={userData?.direccion} />
                </div>

                <h3 className="font-bold text-lg">Informacion de contacto</h3>

                <div className="xl:grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required defaultValue={userData?.email} />
                    </div>

                    <div className="space-y-2 mt-4 xl:mt-0">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input id="telefono" name="telefono" type="tel" defaultValue={userData?.telefono} />
                    </div>
                </div>

                <Button type="submit" className="bg-custom-blue hover:bg-blue-900">Guardar cambios</Button>
            </form>
        </>
    );
}
