import { Suspense } from 'react'
import { ToastProvider } from '@/components/ui/toast'
import DataTableAdmin from './components/tabla-users-admin'

export default function AdministradorPageAdmin() {
  return (
    <main className="w-full px-8 py-2">
      <div>
        <Suspense fallback={<div>Cargando usuarios...</div>}>
          <ToastProvider/> 
          <DataTableAdmin />
        </Suspense>
      </div>
    </main>
  )
}