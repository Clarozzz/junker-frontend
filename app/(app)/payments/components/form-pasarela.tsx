import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import React from "react";
  
  export default function FormPasarela() {
    return (
      <>
        <AccordionItem value="item-2">
          <AccordionTrigger>Información de pago</AccordionTrigger>
          <AccordionContent className="border border-spacing-1 rounded-lg">
            <div className="w-full px-10 pt-2">
              <form className="space-y-4" action="">
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6 w-full">
                    <div className=" max-w-xl">
                      <Label
                        htmlFor="Numero de Tarjeta"
                        className="block font-medium text-gray-900 py-3"
                      >
                        Número de Tarjeta
                      </Label>
                      <Input
                        className=""
                        type="text"
                        placeholder="Nombre completo"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6 w-full">
                    <div className="max-w-xl">
                      <Label
                        htmlFor="Nombre"
                        className="block font-medium text-gray-900 pb-3"
                      >
                        Nombre del titular de la tarjeta
                      </Label>
                      <Input
                        className=""
                        type="text"
                        placeholder="Nombre completo"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
                    <div className="">
                      <Label
                        htmlFor="Fecha de vencimiento"
                        className="block font-medium text-gray-900 pb-3"
                      >
                        Fecha de vencimiento
                      </Label>
                      <Input
                        className=""
                        type="text"
                        placeholder="Fecha de vencimiento"
                      />
                    </div>
                    <div>
                      <Label className="block font-medium text-gray-900 pb-3">
                        CVC
                      </Label>
                      <Input
                        className=""
                        type="text"
                        placeholder="Código de seguridad"
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
  