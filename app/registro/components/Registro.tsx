
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoJunker from '@/components/logo-junker';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { registro } from '@/app/api/registro';

const Registro = () => {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess('');
  
    if (!accepted) {
      setError('Debes aceptar las políticas de privacidad y los términos de uso para poder registrarte.');
      return;
    }
  
    if (password !== confPass) {
      setError('Las contraseñas no coinciden');
      return;
    }
  
    try {
      await registro({
        email,
        password,
        nombre,
        apellido,
      });
  
      setSuccess('Registro exitoso. ¡Bienvenido!');
      setNombre('');
      setApellido('');
      setEmail('');
      setPassword('');
      setConfPass('');
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error en el registro');
      }
    }
  };
  return (
    <div className="flex h-screen">
      {/* Left side (image) */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center bg-[url('https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/sign-up.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL3NpZ24tdXAud2VicCIsImlhdCI6MTcyOTYyMjMyOSwiZXhwIjoxNzYxMTU4MzI5fQ.XtHA6RHNiC2-EWRdZg3d6T7Aa9-Wrurg5AUFeK0CwOA&t=2024-10-22T18%3A38%3A49.836Z')] bg-slate-500">
      </div>

      {/* Right side (register form) */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <a href="/" className='absolute top-6 right-10'>
          <Button variant={'outline'} size={'icon'} className="rounded-full w-10 h-10">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </a>

        <div className="max-w-md w-full p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-2">
            <LogoJunker className='w-24' />
            <span className="text-6xl font-bold font-sans text-custom-blue montserrat">Junker</span>
          </div>

          {/* Form Title */}
          <h2 className="text-2xl text-center font-bold text-gray-800 mb-2">Regístrate</h2>

          {/* Register Link */}
          <div className="text-center mb-6">
            <span className="text-sm text-gray-600">
              Ya tienes una cuenta?{' '}
              <a href="/login" className="text-custom-blue hover:underline">
                Iniciar Sesión
              </a>
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue"
              />
            </div>
            <div>
              <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Apellido"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue"
              />
            </div>
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
            <div>
              <input
                type="password"
                id="confpassword"
                value={confPass}
                onChange={(e) => setConfPass(e.target.value)}
                placeholder="Confirma la contraseña"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{success}</span>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">
                  Acepto las políticas de privacidad y los términos de uso
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-custom-blue text-white py-2 px-4 rounded-md hover:opacity-90 focus:outline-none"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;