"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Cargando from "@/components/ui/cargando";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_STRIPE_RETURN_URL}/payment-success`,
      },
    });

    if (error) {

      setErrorMessage(error.message);
    } else {

    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <Cargando />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-4 bg-black hover:bg-slate-800 transition-all mt-4 rounded-md text-xl font-medium"
      >
        {!loading ? `Pagar Lps. ${amount}` : "Procesando..."}
      </button>
    </form>
  );
};

export default CheckoutPage;