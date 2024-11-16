'use client'

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import Cargando from '@/components/ui/cargando';
import { useUser } from '@/context/UserContext';
import React from 'react'

export default function Compras() {
  const { loading } = useUser();

  if (loading) return <Cargando />;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">Transacciones pasadas</CardTitle>
        <h2 className="text-gray-500">Revisa tu historial de compras</h2>
      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  )
}
