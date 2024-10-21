
"use client"; // Indica que este es un Client Component

import { useState } from 'react';
// import Image from 'next/image'; 
import { useRouter } from 'next/navigation'; // Importa el hook useRouter para redireccionar
import LogoJunker from '@/components/logo-junker';

const Registro = () => {
  const router = useRouter(); // Inicializa el router
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [genero, setGenero] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifica si el checkbox no está marcado y muestra un error
    if (!accepted) {
      setError('Debes aceptar las políticas de privacidad y los términos de uso para poder registrarte.');
      return;
    }

    // Verifica que el campo de género no esté vacío
    if (!genero) {
      setError('Debes seleccionar un género.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          nombre,
          apellido,
          telefono,
          genero,
          fecha_nacimiento,
          direccion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error en el registro');
      }

      setSuccess('Registro exitoso. ¡Bienvenido!');
      setError('');

      // Limpiar el formulario
      setNombre('');
      setApellido('');
      setEmail('');
      setTelefono('');
      setPassword('');
      setGenero('');
      setFechaNacimiento('');
      setDireccion('');
      setAccepted(false);

      // Redirigir a la página principal
      router.push('/'); // Redirige a la raíz
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error desconocido');
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side (image) */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center bg-[url('/path-to-your-image.jpg')] bg-slate-500">
      </div>

      {/* Right side (register form) */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <div className="max-w-md w-full p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-2">
            <LogoJunker />
            <span className="text-6xl font-bold font-sans text-custom-blue">Junker</span>
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
                type="tel"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Teléfono (opcional)"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue"
              />
            </div>

            {/* Nuevo select de género */}
            <div>
              <select
              title='Género'
                id="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
            
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue text-gray-400"
              >
                <option value="" disabled>
                  Selecciona tu género
                </option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="X">Otro</option>
              </select>
            </div>

            {/* Input para la fecha de nacimiento */}
            <div>
              <input 
                title='Fecha de Nacimiento'
                type="date"
                id="fechaNacimiento"
                value={fecha_nacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue text-gray-400"
              />
            </div>

            {/* Input para la dirección */}
            <div>
              <input
                type="text"
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Dirección"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue"
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">Acepto las políticas de privacidad y los términos de uso</span>
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
