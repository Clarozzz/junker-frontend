
"use client"

import { useState } from 'react';
// import Image from 'next/image';
import Cookies from 'js-cookie';
import LogoJunker from '@/components/logo-junker';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el inicio de sesión');
      }
  
      const data = await response.json();
  
        // * Guardar el access_token en las cookies
        if (rememberMe) {
          Cookies.set("access_token", data.access_token, { expires: 7 }); 
        } else {
          Cookies.set("access_token", data.access_token);
        }

      // * Redirige al usuario a la página principal o a donde desees
      window.location.href = '/'; 
    } catch (err) {
      setError((err as Error).message);
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Left side (image) */}
      <div className="hidden md:flex w-1/2 bg-cover bg-gray-900 bg-opacity-50 bg-center bg-[url('https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/pexels-alex-chistol-1715967-3283098.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL3BleGVscy1hbGV4LWNoaXN0b2wtMTcxNTk2Ny0zMjgzMDk4LndlYnAiLCJpYXQiOjE3Mjk1NzYxODYsImV4cCI6MTc2MTExMjE4Nn0.slzOjZtcYjljd-TQ6VqmrwJTaJMMrr67yqNWB-BN7bU&t=2024-10-22T05%3A49%3A46.956Z')]">
        {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div> */}
      </div>

      {/* Right side (login form) */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <div className="max-w-md w-full p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
          {/* <Image src="/path-to-your-logo.png" alt="Logo" className="h-12 mr-3" width={48} height={48} /> */}
            <LogoJunker className='w-24'/>
            <span className="text-6xl font-bold text-custom-blue font-inter montserrat">Junker</span>
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
                <span className="ml-2 text-sm text-gray-600">Remember Me</span>
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
