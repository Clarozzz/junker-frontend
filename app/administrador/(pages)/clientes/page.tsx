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

import { useState } from 'react'
import { ToastProvider } from '@/components/ui/toast'
import DataTableClientes from '../../components/tabla-users-data'

function AdministradorPageTableContent() {
  const [filters, setFilters] = useState({
    nombre: null,
    apellido: null,
    email: null,
    rol: null,
    searchQuery: '',
    ordenNombre: null
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
    // Implement search logic if needed
  };

  const placeholders = [
    "Buscar por apellido",
    "Buscar por nombre",
    "Buscar por correo",
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
          <DataTableClientes 
            nombre={filters.nombre}
            apellido={filters.apellido}
            email={filters.email}
            rol={filters.rol}
            searchQuery={filters.searchQuery}
            ordenNombre={filters.ordenNombre} 
          />
        </Suspense>
        </div>
      </div>
    </>
  );
}