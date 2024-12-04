'use client'

import { Suspense } from 'react'
import { SearchInput } from '@/components/ui/search-input'


export default function AdministradorPageTable() {
  return (
    <main className="w-full px-8 py-2">
      <div className="">
          <AdministradorPageTableContent />
      </div>
    </main>
  )
}

// This component will be a client component
import { useState } from 'react'
import { ToastProvider } from '@/components/ui/toast'
import DataTableProductos from '../../components/tabla-productos'

function AdministradorPageTableContent() {
  const [filters, setFilters] = useState({
    categoria: null,
    precio_min: 0,
    precio_max: 0,
    estado: null,
    searchQuery: '',
    ordenPrecio: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const placeholders = [
    "Buscar por categoria",
    "Buscar por nombre",
  ];

  return (
    <>
      <div className='fex flex-row'>      
        <div className='flex items-start justify-start'>
          <SearchInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
            debounce={300}
          />
        </div>   
        <div>
        <Suspense fallback={<div>Cargando usuarios...</div>}>
        <ToastProvider/> 
          <DataTableProductos 
            categoria={filters.categoria}
            precio_min={filters.precio_min}
            precio_max={filters.precio_max}
            estado={filters.estado}
            searchQuery={filters.searchQuery}
            ordenPrecio={filters.ordenPrecio} 
          />
        </Suspense>
        </div>
      </div>
    </>
  );
}