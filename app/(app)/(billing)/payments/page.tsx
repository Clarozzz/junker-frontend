'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CheckoutPage from "./components/checkout-page";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { readUser } from "@/app/api/server";
import { getUser } from "@/app/api/usuarios";
import { carritoService } from "@/app/api/carritos";
import Cargando from "@/components/ui/cargando";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Page() {
  const [carritos, setCarrito] = useState<Carrito[]>([]);
  const [userData, setUserData] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);

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

  useEffect(() => {
    if (carritos.length > 0) {
      const subtotal = carritos.reduce(
        (total, carrito) => total + (carrito.productos?.precio || 0) * carrito.cantidad,
        0
      );
      const isv = subtotal * 0.15;
      const totalAmount = subtotal + isv;

      setAmount(totalAmount);
      setIsLoading(false); // Marcar como cargado
    }
  }, [carritos]);

  if (isLoading) {
    return <Cargando />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de pago</CardTitle>
        <CardDescription>
          Agrega la información para proceder con el pago
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "hnl"
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </CardContent>
    </Card>
  );
}
