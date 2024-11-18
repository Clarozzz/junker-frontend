import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function FormPagosClient() {
  return (
    <>
      <AccordionItem value="item-1">
        <AccordionTrigger>Informacion Personal</AccordionTrigger>
        <AccordionContent className="border border-spacing-1 rounded-lg">
          <div className="w-full px-10 pt-2">
            <form className="space-y-4" action="">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
                  <div className="">
                    <Label
                      htmlFor="Nombre"
                      className="block font-medium text-gray-900 py-3"
                    >
                      Nombre completo
                    </Label>
                    <Input
                      className=""
                      type="text"
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <Label className="block font-medium text-gray-900 py-3">
                      Apellidos
                    </Label>
                    <Input
                      className=""
                      type="text"
                      placeholder="Apellidos"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
                  <div className="">
                    <Label
                      htmlFor="Nombre"
                      className="block font-medium text-gray-900 pb-3"
                    >
                      Correo electronico
                    </Label>
                    <Input
                      className=""
                      type="text"
                      placeholder="Correo"
                    />
                  </div>
                  <div>
                    <Label className="block font-medium text-gray-900 pb-3">
                      Teléfono
                    </Label>
                    <Input
                      className=""
                      type="text"
                      placeholder="Teléfono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
                  <div className="">
                    <Label
                      htmlFor="Nombre"
                      className="block font-medium text-gray-900 pb-3"
                    >
                      Direccion
                    </Label>
                    <Input
                      className=""
                      type="text"
                      placeholder="Dirección"
                    />
                  </div>
                  <div>
                    <Label className="block font-medium text-gray-900 pb-3">
                      codigo postal
                    </Label>
                    <Input
                      className=""
                      type="text"
                      placeholder="Código"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
