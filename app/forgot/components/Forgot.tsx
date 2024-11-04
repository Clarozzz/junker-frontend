
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Forgot() {
  const [email, setEmail] = useState<string>(''); // Almacena el email del usuario
  const [message, setMessage] = useState<string | null>(null); // Mensaje de éxito
  const [error, setError] = useState<string | null>(null); // Mensaje de error
  const router = useRouter();

  const handleForgotPassword = async () => {
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot`, {
        email,
      });

      setMessage(response.data.message);

      // Después de 3 segundos, redirige a la ruta "/"
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error sending reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <button
          onClick={handleForgotPassword}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Send Reset Email
        </button>

        {message && (
          <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
