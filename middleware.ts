'use Client'

import { NextResponse, type NextRequest } from 'next/server';
import axios from 'axios';

const publicRoutes = ['/', '/login', '/registro', '/reset', '/forgot', '/nosotros', '/servicios', '/politicas', '/productos', '/terminos'];

const isPublicRoute = (path: string) => publicRoutes.includes(path);

async function refreshAccessToken(refresh_token: string) {
  try {
    const refreshResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/auth/refresh`, {
      refresh_token,
    });
    const { access_token: newAccessToken, refresh_token: newRefreshToken } = refreshResponse.data;

    const response = NextResponse.next();
    // Actualizar cookies con el nuevo access_token y refresh_token
    response.cookies.set('access_token', newAccessToken, { path: '/', httpOnly: true });
    response.cookies.set('refresh_token', newRefreshToken, { path: '/', httpOnly: true });

    return { response, accessToken: newAccessToken };
  } catch {
    console.error('Error al refrescar el token');
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (isPublicRoute(path)) {
    return NextResponse.next();
  }

  try {
    const access_token = request.cookies.get('access_token')?.value;
    const refresh_token = request.cookies.get('refresh_token')?.value;

    if (!access_token && !refresh_token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Intentar verificar el token de acceso
    let verifyResponse;
    try {
      verifyResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/verify`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch  {
      if (!refresh_token) {
        throw new Error('No hay token de refresco disponible');
      }

      // Intentar refrescar el token de acceso si ha expirado
      const refreshResult = await refreshAccessToken(refresh_token);

      if (!refreshResult) {
        throw new Error('Error al refrescar el token');
      }

      // Reintentar la verificación con el nuevo access_token
      verifyResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/verify`, {
        headers: {
          'Authorization': `Bearer ${refreshResult.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    }

    if (verifyResponse.status === 200) {
      return NextResponse.next();
    } else {
      throw new Error('Token inválido');
    }
  } catch (error) {
    console.error('Error en verificación de token:', error);

    const redirectResponse = NextResponse.redirect(new URL('/', request.url));
    redirectResponse.cookies.set('access_token', '', { path: '/', expires: new Date(0) });
    redirectResponse.cookies.set('refresh_token', '', { path: '/', expires: new Date(0) });

    return redirectResponse;
  }
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|images|productos).*)',
};
