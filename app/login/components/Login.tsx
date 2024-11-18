
"use client";

import { useState } from 'react';
import LogoJunker from '@/components/logo-junker';
import { Button } from '@/components/ui/button';
import { AlertCircle, X } from "lucide-react";
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { signIn } from '@/app/api/server';

const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1)
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const datos = Object.fromEntries(formData.entries());

    try {
      setIsLoading(true);
      const parsedData = loginSchema.parse(datos);
      
      await signIn(parsedData);
    } catch (err) {
      if (err) {
        setError(`Correo o contraseña incorrectos`);
      }
    } finally {
      setIsLoading(false);
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
              <Link href="/registro" className="text-custom-blue hover:underline">
                Regístrate
              </Link>
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
            </div>

            {error && (
              <Alert variant="destructive" className='mt-4'>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <Checkbox
                  className='data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-primary-foreground'
                  checked={rememberMe}
                  onCheckedChange={() => setRememberMe(true)}
                />
                <span className="ml-2 text-sm text-gray-600">Recordarme</span>
              </label>

              {/* Forgot Password */}
              <Link href="/forgot" className="text-sm text-custom-blue hover:underline">
                ¿Has olvidado la contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-custom-blue hover:bg-blue-900  transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-loader-circle animate-spin mr-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                  Iniciando Sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;