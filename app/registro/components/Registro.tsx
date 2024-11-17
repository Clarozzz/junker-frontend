'use client'

import { useState } from 'react';
import LogoJunker from '@/components/logo-junker';
import { Button } from '@/components/ui/button';
import { AlertCircle, CircleCheck, X } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { z } from 'zod';
import { registro } from '@/app/api/server';

const registroSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  apellido: z.string().min(1, 'El apellido es obligatorio'),
  email: z.string().email('El correo electrónico no es válido'),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/, "Mínimo 6 caracteres, una letra mayúscula, una letra minúscula, y un número"),
  confPass: z.string().min(6, ''),
  accepted: z.boolean().refine(val => val === true, 'Debes aceptar las políticas de privacidad y los términos de uso'),
}).refine(data => data.password === data.confPass, {
  message: 'Las contraseñas no coinciden',
  path: ['confPass'],
});

const Registro = () => {

  const [success, setSuccess] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const accepted = data.accepted === 'on';
    const modifiedData = { ...data, accepted };

    try {
      setLoading(true);
      setFormErrors({});
      const parsedData = registroSchema.parse(modifiedData);

      // Enviar la solicitud de registro
      const res = await registro({
        email: parsedData.email,
        password: parsedData.password,
        nombre: parsedData.nombre,
        apellido: parsedData.apellido,
      });

      if (res) {
        setSuccess("Registro exitoso!")
        window.location.href = '/'
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) fieldErrors[error.path[0] as string] = error.message;
        });
        setFormErrors(fieldErrors);
      } else {
        setError(`Ocurrió un error: ${err}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side (image) */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center bg-[url('https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/sign-up.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL3NpZ24tdXAud2VicCIsImlhdCI6MTcyOTYyMjMyOSwiZXhwIjoxNzYxMTU4MzI5fQ.XtHA6RHNiC2-EWRdZg3d6T7Aa9-Wrurg5AUFeK0CwOA&t=2024-10-22T18%3A38%3A49.836Z')] bg-slate-500"></div>

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
              <Link href="/login" className="text-custom-blue hover:underline">
                Iniciar Sesión
              </Link>
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                id="nombre"
                name='nombre'
                placeholder="Nombre"
              />
              {formErrors.nombre && <p className="text-red-500 text-sm">{formErrors.nombre}</p>}
            </div>
            <div>
              <Input
                type="text"
                id="apellido"
                name='apellido'
                placeholder="Apellido"
              />
              {formErrors.apellido && <p className="text-red-500 text-sm">{formErrors.apellido}</p>}
            </div>
            <div>
              <Input
                type="email"
                id="email"
                name='email'
                placeholder="Correo electrónico"
              />
              {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
            </div>
            <div>
              <Input
                type="password"
                id="password"
                name='password'
                placeholder="Contraseña"
              />
              {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
            </div>
            <div>
              <Input
                type="password"
                id="confPass"
                name='confPass'
                placeholder="Confirma la contraseña"
              />
              {formErrors.confPass && <p className="text-red-500 text-sm">{formErrors.confPass}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <label className="inline-flex items-center">
                <Checkbox
                  name="accepted"
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-primary-foreground"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Acepto las políticas de privacidad y los términos de uso
                </span>
              </label>
            </div>
            {formErrors.accepted && <p className="text-red-500 text-sm">{formErrors.accepted}</p>}


            {error && (
              <Alert variant="destructive" className='mt-4'>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mt-4 border-green-500 text-green-600">
                <CircleCheck className="h-4 w-4" color='#22c55e' />
                <AlertTitle>Hecho</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-custom-blue hover:bg-blue-900 transition-all duration-200 w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="lucide lucide-loader-circle animate-spin mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25"></circle>
                    <path d="M2 12a10 10 0 1 1 19.8 1.5" fill="none"></path>
                  </svg>
                  Cargando...
                </>
              ) : (
                "Registrarme"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
