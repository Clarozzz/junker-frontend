// pages/api/login.ts
// api/login.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Llama a tu backend
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  // Procesa la respuesta del backend
  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json({ message: errorData.message || 'Error en la autenticación' }, { status: response.status });
  }

  const data = await response.json();

  // Retorna el token al frontend
  return NextResponse.json(data.access_token);
}

