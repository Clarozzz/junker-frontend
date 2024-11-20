"use client";

import { carritoService } from "@/app/api/carritos";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FormPagosClient from "./form-pago-client";
import FormPasarela from "./form-pasarela";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { readUser } from "@/app/api/server";
import { getUser } from "@/app/api/usuarios";

export default function PasarelaPago() {
  const [carritos, setCarrito] = useState<Carrito[]>([]);
  const [userData, setUserData] = useState<Usuario | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const {
          data: { user },
        } = await readUser();
        if (!user) {
          throw new Error("Error al obtener el usuario");
        }

        const usuario = await getUser(user.id);
        if (usuario) {
          setUserData(usuario);
        }
      } catch {
        setUserData(null);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    if (userData?.carrito && userData.carrito.length > 0) {
      const fetchCarrito = async () => {
        try {
          const carrito_id = userData.carrito[0].id;
          const data = await carritoService.getCarrito(carrito_id);
          setCarrito(data);
        } catch (error) {
          console.error("Error al obtener carrito:", error);
        }
      };

      fetchCarrito();
    }
  }, [userData]);

  return (
    <div className="flex flex-col">
      <div className="pt-10 lg:px-16">
        <h2
          className="text-3xl  md:text-4xl font-bold montserrat text-custom-blue"
          id="slide-over-title"
        >Pasarela de Pagos
        </h2>
      </div>
      <div className="min-h-screen flex flex-col sm:flex-col md:flex-row md:justify-between lg:flex-row xl:flex-row">
        <div className="lg:w-9/12 md:w-full pt-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <Accordion type="multiple" className="md:min-w-72">
            <FormPagosClient />
            <FormPasarela/>
            <AccordionItem value="item-3">
              <AccordionTrigger>Mas Opciones</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="bg-slate-100 bg-opacity-75 grid grid-cols-1 items-start min-w-96 lg:w-1/4">
          <div className="flex flex-col border-t border-gray-200 px-16 py-10">
            <div className="flex justify-between py-4 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>
                Lps.{" "}
                {carritos.reduce(
                  (total, carrito) =>
                    total + carrito.productos?.precio * carrito.cantidad,
                  0
                )}
              </p>
            </div>
            <hr className="bg-gray-800" />
            <div className="flex justify-between text-base py-4 font-medium text-gray-900">
              <p>ISV</p>
              <p>Lps. 262.00</p>
            </div>
            <div className="flex justify-between montserrat py-4 text-lg font-bold text-gray-900">
              <div>
                <p>Total</p>
              </div>
              <div>
                <p>Lps. 222.22</p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button
                type="submit"

                className="flex items-center justify-center rounded-md border border-transparent bg-custom-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-800"
              >
                Proceder al pago
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                o
                <Link
                  href={"/productos"}
                  className="font-medium text-custom-blue hover:text-blue-800 pl-3"
                >
                  Continuar comprando
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
