'use client'

import React, { useEffect, useState } from 'react'
import Descripcion from '../components/descripcion'
import ProductosVendedor from '../components/productos-vendedor';
import { readUser } from '@/app/api/server';
import { getUser } from '@/app/api/usuarios';
import Cargando from '@/components/ui/cargando';

export default function Vendedor() {
  const [userData, setUserData] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await readUser()
        if (!user) {
          throw new Error("Error al obtener el usuario");
        }

        const usuario = await getUser(user.id)
        if (usuario) {
          setUserData(usuario)
        }
      } catch {
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (isLoading) return <Cargando />

  return (
    <div className='space-y-8'>
      <Descripcion descripcion={userData?.vendedores[0].descripcion || ''} />
      <ProductosVendedor id={userData?.vendedores[0].id || null} />
    </div>
  )
}
