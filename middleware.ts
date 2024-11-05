
import { NextResponse, type NextRequest } from 'next/server';
import axios from 'axios';

//  Rutas públicas que no requieren autenticación
const publicRoutes = ['/', '/login', '/register,', '/reset', '/forgot', '/nosotros', '/servicios', '/politicas', '/productos', '/terminos'];

const isPublicRoute = (path: string) => {
  const isPublic = publicRoutes.includes(path);
  return isPublic;
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Verificar si la ruta es pública
  if (isPublicRoute(path)) {
    return NextResponse.next();
  }

  try {
    const access_token = request.cookies.get('access_token')?.value;

    if (!access_token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verificar token usando axios
    const verifyResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/verify`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    if (verifyResponse.status === 200) {
      return NextResponse.next();
    } else {
      throw new Error('Token inválido');
    }

  } catch (error) {
    console.error('Error en verificación de token:', error);

    // Redirigir al login si el token es inválido o hay un error
    const redirectResponse = NextResponse.redirect(new URL('/', request.url));

    // Limpiar cookies manteniendo las opciones originales
    redirectResponse.cookies.set({
      name: 'access_token',
      value: '',
      path: '/',
      expires: new Date(0)
    });
    
    redirectResponse.cookies.set({
      name: 'refresh_token',
      value: '',
      path: '/',
      expires: new Date(0)
    });

    return redirectResponse;
  }
}

export const config = {
  matcher: [
    // ! Definocion de todas las rutas como privadas
    '/((?!_next/static|_next/image|favicon.ico|images).*)'
  ]
};
