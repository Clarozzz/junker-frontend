"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Component() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
    }

    return (
        <>
            <h2 className="text-3xl font-bold mb-6">Informacion de la cuenta</h2>
            <form onSubmit={handleSubmit} className="space-y-8 mb-16">

                <h3 className="font-bold text-lg">Informacion general</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" name="nombre" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="apellido">Apellido</Label>
                        <Input id="apellido" name="apellido" required />
                    </div>
                </div>

                <div className="space-y-2 w-1/2">
                    <Label htmlFor="genero">Género</Label>
                    <Select name="genero" defaultValue="masculino">
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

                <div className="space-y-2 w-1/2">
                    <Label>Fecha de Nacimiento</Label>
                    <Input type="date" name="fechaNacimiento" />
                </div>

                <div className="space-y-2 w-1/2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input id="direccion" name="direccion" required />
                </div>

                <h3 className="font-bold text-lg">Informacion de contacto</h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input id="telefono" name="telefono" type="tel" required />
                    </div>
                </div>

                <Button type="submit" className="bg-custom-blue hover:bg-blue-900 w-1/4">Guardar cambios</Button>
            </form>
        </>
    )
}