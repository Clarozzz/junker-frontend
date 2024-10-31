"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import Cargando from "@/components/ui/cargando"

interface usuario {
    nombre: string;
    apellido: string;
    genero: string;
    fecha_nacimiento: string;
    email: string;
    telefono: string;
    direccion: string;
    avatar_url: string;
}

const token = Cookies.get('access_token');

export default function Component() {
    const [userData, setUserData] = useState<usuario>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/personas/getUser/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }
                
                const data = await res.json(); // Tipamos la respuesta JSON como User
                console.log(data);
                setUserData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message); // Si el error es una instancia de Error, obtenemos el mensaje
                } else {
                    setError('Error desconocido'); // Manejo genérico de errores no tipados
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <Cargando />;
    if (error) return <p>Error: {error}</p>;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
    }

    return (
        <>
            <h2 className="text-3xl font-bold mb-6">Informacion de la cuenta</h2>
            <form onSubmit={handleSubmit} className="space-y-8 mb-12">

                <h3 className="font-bold text-lg">Informacion general</h3>
                <div className="xl:grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" name="nombre" required value={userData?.nombre} />
                    </div>
                    <div className="space-y-2 mt-4 xl:mt-0">
                        <Label htmlFor="apellido">Apellido</Label>
                        <Input id="apellido" name="apellido" required value={userData?.apellido} />
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
                    <Input type="date" name="fechaNacimiento" value={userData?.fecha_nacimiento} />
                </div>

                <div className="space-y-2 xl:w-1/2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input id="direccion" name="direccion" required value={userData?.direccion} />
                </div>

                <h3 className="font-bold text-lg">Informacion de contacto</h3>

                <div className="xl:grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required value={userData?.email} />
                    </div>

                    <div className="space-y-2 mt-4 xl:mt-0">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input id="telefono" name="telefono" type="tel" required value={userData?.telefono} />
                    </div>
                </div>

                <Button type="submit" className="bg-custom-blue hover:bg-blue-900">Guardar cambios</Button>
            </form>
        </>
    )
}