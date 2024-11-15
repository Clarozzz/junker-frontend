'use client'

import Cargando from '@/components/ui/cargando';
import { useUser } from '@/context/UserContext';
import React from 'react'

export default function Compras() {
  const { loading } = useUser();
    
  if (loading) return <Cargando />;
  return (
    <div>page</div>
  )
}
