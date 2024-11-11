"use client";

import { carritoService } from "@/app/api/carritos";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function CarritoCLient() {
  const [carritos, setCarrito] = useState<Carrito[]>([]);
  const { control } = useForm();
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const data = await carritoService.getCarrito();
        setCarrito(data);
      } catch (error) {
        // setError("Error al obtener los detalles del carrito");
        console.error("Error al obtener carrito:", error);
      }
    };

    fetchCarrito();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="pt-10 px-10">
        <h2 className="text-2xl font-bold text-gray-900" id="slide-over-title">
          Carrito de compras
        </h2>
      </div>
      <div className="min-h-screen flex flex-col sm:flex-col md:flex-row md:justify-between lg:flex-row xl:flex-row">
        <div className="lg:w-2/3 pl-10 pr-4 py-10">
          {/* {!error ? (
            <p>{error}</p>
          ) : ( */}
          <div className="px-4 py-6 sm:px-6">
            <div className="flex flex-col">
              <div className="ml-3 flex items-center">
                <button
                  type="button"
                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close panel</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-8">
              {carritos.map((carrito) => (
                <motion.div key={carrito.id} className="cursor-pointer">
                  <div className="flex justify-between">
                    <div className="-my-6 divide-y divide-gray-200">
                      <div className="flex py-6">
                        <div className="h-48 w-48 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={
                              carrito.productos.productos_imagenes[0]?.url ||
                              "/default-image.jpg"
                            }
                            alt={carrito.productos.nombre}
                            className="h-full w-full object-cover object-center"
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className="ml-4 flex flex-col">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#">{carrito.productos.nombre}</a>
                            </h3>
                          </div>
                          <div>
                            <p>{carrito.productos.estado_producto}</p>
                          </div>
                          <div className="max-w-28 truncate">
                            <p>{carrito.productos.descripcion}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between lg:w-96">
                      <div className="flex flex-row">
                        <div className="pr-2 pt-2">
                          <p>Cant.</p>
                        </div>
                        <div>
                          <Controller
                            name="id_carrito"
                            control={control}
                            render={({ field }) => (
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full focus:ring-custom-blue">
                                  <SelectValue placeholder="Cantidad" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Cantidad</SelectLabel>
                                    {carritos.map((carr) => (
                                      <SelectItem key={carr.id} value={carr.id}>
                                        {carr.productos.stock}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      </div>
                      <div className="min-w-36">
                        <p className="ml-4">
                          Lps. {carrito.productos?.precio.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-end justify-end text-sm">
                      <div className="flex px-3">
                          <button
                            type="button"
                            className="font-medium text-custom-blue hover:text-blue-800"
                          >
                            Comprar ahora
                          </button>
                        </div>
                      <div className="flex px-3">
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr className="bg-gray-950 my-4" />
                </motion.div>
              ))}
            </div>
          </div>
          {/* )}   */}
        </div>

        <div className="bg-slate-100 bg-opacity-75 grid grid-cols-1 items-start lg:w-1/3">
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
                <p>Lps. 262.00</p>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-custom-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-800"
              >
                Comprar ahora
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                o
                <button
                  type="button"
                  className="font-medium text-custom-blue hover:text-blue-800 pl-3"
                >
                  Continuar comprando
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
