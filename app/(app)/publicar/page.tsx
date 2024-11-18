'use client'

import React, { useEffect, useState } from 'react'
import PublicarClient from './components/publicar'
import Footer from "@/components/footer";
import { ToastProvider } from '@/components/ui/toast';
import { readUser } from '@/app/api/server';
import { getUser } from '@/app/api/usuarios';
// import Nuevo from './components/nuevo'

export default function PagePublicar() {
  const [userData, setUserData] = useState<Usuario | null>(null);

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
          }
      };

      loadUserData();
  }, []);
  return (
    <> 
      <ToastProvider/>  
      <PublicarClient id={userData?.vendedores[0].id || ''} />
      <Footer />
    </>
  )
}
