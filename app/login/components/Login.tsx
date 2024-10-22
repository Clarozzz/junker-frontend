
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
  
      // Guardar el access_token en las cookies
      Cookies.set('access_token', data.access_token, { expires: 7 }); // expira en 7 días 
      // Redirige al usuario a la página principal o a donde desees
      window.location.href = '/'; // Cambia a la ruta deseada
    } catch (err) {
      setError((err as Error).message);
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Left side (image) */}
      <div className="hidden md:flex w-1/2 bg-cover bg-gray-900 bg-opacity-50 bg-center bg-[url('https://wswsmaiixknecwdbruig.supabase.co/storage/v1/object/sign/web/login.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWIvbG9naW4ud2VicCIsImlhdCI6MTcyOTQ5OTk3MSwiZXhwIjoxNzYxMDM1OTcxfQ.jDwFAyqOrM3lpjo-w74Iz1jFnPnVXD3jao9ZY7wLIJA&t=2024-10-21T08%3A39%3A15.476Z')]">
        {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div> */}
      </div>

      {/* Right side (login form) */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <div className="max-w-md w-full p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
          {/* <Image src="/path-to-your-logo.png" alt="Logo" className="h-12 mr-3" width={48} height={48} /> */}
            <LogoJunker className='w-24'/>
            <span className="text-6xl font-bold text-custom-blue font-inter">Junker</span>
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


{/* <div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"><img class="absolute inset-0 object-cover w-full h-full " src="https://wswsmaiixknecwdbruig.supabase.co/storage/v1/object/sign/web/login.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWIvbG9naW4ud2VicCIsImlhdCI6MTcyOTQ5OTk3MSwiZXhwIjoxNzYxMDM1OTcxfQ.jDwFAyqOrM3lpjo-w74Iz1jFnPnVXD3jao9ZY7wLIJA&amp;t=2024-10-21T08%3A39%3A15.476Z" alt=""><div class="absolute inset-0 bg-gray-900 bg-opacity-50"></div><div><a class="relative z-20 inline-flex gap-2 items-center text-lg font-medium max-w-1/4" href="/"><div class="w-8"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 201" fill="none"><path d="M162.495 38.2742H37.6011V163.168H162.495V38.2742Z" fill="white"></path><mask id="mask0_1714_14" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="201" style="mask-type: luminance;"><path d="M199.796 0.789307H0V200.622H199.796V0.789307Z" fill="white"></path></mask><g mask="url(#mask0_1714_14)"><mask id="mask1_1714_14" maskUnits="userSpaceOnUse" x="0" y="1" width="199" height="200" style="mask-type: luminance;"><path d="M80.6347 46.6985V81.6379H45.6969C41.8586 81.6379 38.7173 84.7776 38.7173 88.6159V112.386C38.7173 116.224 41.8586 119.364 45.6969 119.364H80.6347V154.303C80.6347 158.141 83.776 161.281 87.6143 161.281H111.383C115.221 161.281 118.362 158.141 118.362 154.303V119.364H153.302C157.141 119.364 160.281 116.224 160.281 112.386V88.6159C160.281 84.7776 157.141 81.6379 153.302 81.6379H118.362V46.6985C118.362 42.8601 115.221 39.7204 111.383 39.7204H87.6143C83.776 39.7204 80.6347 42.8601 80.6347 46.6985ZM11.8443 0.999996H99.5C154.225 0.999996 199 45.7755 199 100.502V188.156C199 194.671 193.669 200.002 187.154 200.002H99.5C44.7739 200.002 0 155.226 0 100.502V12.8459C0 6.33099 5.3294 0.999996 11.8443 0.999996Z" fill="white"></path></mask><g mask="url(#mask1_1714_14)"><path d="M199 0.999996H0V200H199V0.999996Z" fill="url(#paint0_linear_1714_14)"></path></g></g><defs><linearGradient id="paint0_linear_1714_14" x1="218.9" y1="237.81" x2="-9.95" y2="-24.87" gradientUnits="userSpaceOnUse"><stop stop-color="#1FA2FF"></stop><stop offset="0.5" stop-color="#12D8FA"></stop><stop offset="1" stop-color="#A6FFCB"></stop></linearGradient></defs></svg></div>Saim Cis</a></div><div class="relative z-20 mt-auto"><blockquote class="space-y-2"><p class="text-lg text-justify">En Saim CIS, nos dedicamos a brindar atención médica de alta calidad y accesible a todos los habitantes de Honduras. Nuestra misión es mejorar la salud y el bienestar de nuestra comunidad a través de servicios médicos integrales, educación para la salud y programas de prevención. Creemos en un enfoque holístico para el cuidado de la salud, donde cada individuo reciba la atención personalizada que merece. Trabajamos incansablemente para asegurar que todos tengan acceso a los servicios médicos necesarios para una vida plena y saludable. ¡Únete a nosotros en nuestro compromiso de construir un futuro más saludable para todos!</p><footer class="text-sm">SAIM CIS</footer></blockquote></div></div> */}