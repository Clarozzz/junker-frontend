/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import axios from 'axios';

// Interface para el registro
interface RegisterData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

// Interface para la respuesta
interface RegisterResponse {
  message: string;
  // Añade aquí otros campos que devuelva tu API
}

// Función principal de registro
export const registro = async (userData: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
    
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || 'Error en el registro';
    throw new Error(errorMessage);
  }
};

// API Route para manejar la solicitud POST
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const userData = await req.json();
    const registerResponse = await registro(userData);
    return NextResponse.json(registerResponse);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}