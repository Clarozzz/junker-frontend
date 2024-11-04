
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const ResetPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Obtener tokens directamente desde el hash en la URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');

    if (accessToken && refreshToken) {
      // console.log("Tokens obtenidos:", { accessToken, refreshToken });
      Cookies.set('access_token', accessToken, { expires: 7 });
      Cookies.set('refresh_token', refreshToken, { expires: 7 });
    } else {
      console.warn("No se encontraron tokens en el hash de la URL");
    }
  }, []);

  const handlePasswordReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    // Obtener tokens de las cookies
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if (!accessToken || !refreshToken) {
      setError("Tokens de autenticación no encontrados. Por favor, intente el enlace de restablecimiento de contraseña de nuevo.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/new-reset`, {
        new_password: newPassword,
        access_token: accessToken,
        refresh_token: refreshToken
      });

      setMessage(response.data.message);
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error al actualizar la contraseña");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Restablecer Contraseña</h2>

        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nueva Contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingrese su nueva contraseña"
              minLength={8}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Actualizar Contraseña
          </button>
        </form>

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
};

export default ResetPassword;

