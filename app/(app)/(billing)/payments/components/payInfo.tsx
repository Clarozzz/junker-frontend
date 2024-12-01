
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function FormPasarela() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de pago</CardTitle>
        <CardDescription>
          Agrega la información para proceder con el pago
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido" className="text-sm font-medium text-gray-700">
                  Apellido
                </Label>
                <Input
                  id="apellido"
                  type="text"
                  placeholder="Apellido"
                  name="apellido"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-sm font-medium text-gray-700">
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  type="tel"
                  placeholder="Teléfono"
                  name="telefono"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo-postal" className="text-sm font-medium text-gray-700">
                  Código postal
                </Label>
                <Input
                  id="codigo-postal"
                  type="text"
                  placeholder="Código postal"
                  name="codigo-postal"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            {/* Resto del formulario */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="direccion" className="text-sm font-medium text-gray-700">
                Dirección de entrega
              </Label>
              <Input
                id="direccion"
                type="text"
                placeholder="Dirección"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div>
              <Button asChild className="bg-gray-500 hover:bg-gray-500 hover:brightness-110 transition-all duration-200">
                <Link href="/shippingInfo">
                  <ChevronLeft />
                  Regresar
                </Link>
              </Button>
            </div>
            <div>
              <Button
                asChild
                className="bg-custom-blue hover:bg-blue-900 font-bold shadow-lg transition-all hover:scale-105"
              >
                <Link href="#" className="relative z-10">
                  Finalizar compra
                </Link>
              </Button>


            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
