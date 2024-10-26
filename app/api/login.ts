/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import axios from 'axios';
import Cookies from 'js-cookie';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}


export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`, 
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    
    // * Guardar el access_token en las cookies
    Cookies.set('access_token', access_token, { expires: 7 }); // expira en 7 días
    // *  También puedes guardar el refresh_token si lo deseas
    Cookies.set('refresh_token', refresh_token, { expires: 7 });

    return { access_token, refresh_token };
    
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Error en la autenticación';
    throw new Error(errorMessage);
  }
};

// API Route para manejar la solicitud POST
export async function POST(req: Request): Promise<NextResponse> {
  const { email, password } = await req.json();

  try {
    const loginResponse = await login(email, password); // Llama a la función login
    return NextResponse.json(loginResponse);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
