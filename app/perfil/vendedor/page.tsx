'use client'

import React from 'react'
import Descripcion from '../components/descripcion'
import { useUser } from '@/context/UserContext';
import Cargando from '@/components/ui/cargando';

export default function Vendedor() {
  const { loading } = useUser();
    
  if (loading) return <Cargando />;
  return (
    <div className='space-y-8'>
      <Descripcion />
    </div>
  )
}
