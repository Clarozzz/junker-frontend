// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // Verifica si la ruta es la del login
  if (url.pathname === '/api/login') {
    
    const body = await req.json();
    
    // Realiza la solicitud al backend
    const response = await fetch('http://127.0.0.1:8000/auth/login', { // Ajusta la URL según tu backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Verifica la respuesta del backend
    if (response.ok) {
      const data = await response.json();
      console.log('Login exitoso:', data.access_token);
      return NextResponse.json(data.access_token); // Retorna la respuesta del backend
    } else {
      const errorData = await response.json();
      console.error('Error en el login:', errorData);
      return NextResponse.json({ error: errorData.message }, { status: 400 });
    }
  }

  return NextResponse.next();
}
