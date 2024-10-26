
"use client";

import { useState } from 'react';
import Cookies from 'js-cookie';
import LogoJunker from '@/components/logo-junker';
import { Button } from '@/components/ui/button';
import { X } from "lucide-react";
import { login } from '@/app/api/login'; // Importamos la función login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const { access_token, refresh_token } = await login(email, password);
      
      // *  Configurar las cookies con la duración según rememberMe
      const expiryDays = rememberMe ? 7 : 1;
      Cookies.set('access_token', access_token, { expires: expiryDays });
      Cookies.set('refresh_token', refresh_token, { expires: expiryDays });

      window.location.href = '/'; 
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side (image) */}
      <div className="hidden md:flex w-1/2 bg-cover bg-gray-900 bg-opacity-50 bg-center bg-[url('https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/sign-in.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL3NpZ24taW4ud2VicCIsImlhdCI6MTcyOTYyMjI3OSwiZXhwIjoxNzYxMTU4Mjc5fQ.9sudVwNSmAK3Uv7xY6fFOrqk-gW3KoexJGh-yHgD0Vg&t=2024-10-22T18%3A37%3A59.695Z')]">
      </div>

      {/* Right side (login form) */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white relative">
        <a href="/" className='absolute top-6 right-10'>
          <Button variant={'outline'} size={'icon'} className="rounded-full w-10 h-10">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </a>

        <div className="max-w-md w-full p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <LogoJunker className="w-24" />
            <span className="text-6xl font-bold text-custom-blue font-inter montserrat">
              Junker
            </span>
          </div>

          {/* Form Title */}
          <h2 className="text-2xl text-center font-bold text-gray-800 mb-2">Iniciar sesión</h2>

          {/* Register Link */}
          <div className="text-center mb-6">
            <span className="text-sm text-gray-600">
              ¿Aún no tienes cuenta?{' '}
              <a href="/registro" className="text-custom-blue hover:underline">
                Regístrate
              </a>
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue"
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue"
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">Recordarme</span>
              </label>

              {/* Forgot Password */}
              <a href="/forgot-password" className="text-sm text-custom-blue hover:underline">
                ¿Has olvidado la contraseña?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-custom-blue text-white py-2 px-4 rounded-md hover:opacity-90 focus:outline-none"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;