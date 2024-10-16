"use client"
// pages/personas.tsx
import { useState, useEffect } from 'react';

// Definir el tipo de Persona
interface Persona {
  id: number;
  nombres: string;
  apellidos: string;
  genero: string;
}

export default function PersonasPage() {
  // Definir el estado de personas con el tipo correcto
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    // Realizar fetch a la API de FastAPI
    const fetchPersonas = async () => {
      const res = await fetch('http://localhost:8000/personas');
      const data: Persona[] = await res.json();
      setPersonas(data);
    };

    fetchPersonas();
  }, []); // El array vacío asegura que el fetch solo ocurra al cargar la página

  return (
    <div>
      <h1>Lista de Personas</h1>
      <ul>
        {personas.map((persona) => (
          <li key={persona.id}>{persona.nombres} {persona.apellidos} {persona.genero}</li>
        ))}
      </ul>
    </div>
  );
}