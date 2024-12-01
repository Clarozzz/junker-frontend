'use client';

// import type { Metadata } from 'next'
import SidebarAdministrador from './components/sidebar-admin'
import { getUser } from '../api/usuarios';
import { useEffect, useState } from 'react';
import { readUser } from '../api/server';
import { cn } from '@/lib/utils';

// export const metadata: Metadata = {
//   title: 'Administrador',
//   description: 'Pagina principal del administrador'
// }

export default function AdministradorLayout ({
  children
}: {
  children: React.ReactNode
}) {
    // const pathname = usePathname();
    const [userData, setUserData] = useState<Usuario | null>(null);
    // const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const loadUserData = async () => {
          try {
            const {
              data: { user },
            } = await readUser();
            if (!user) {
              throw new Error("Error al obtener el usuario");
            }
    
            const usuario = await getUser(user.id);
            if (usuario) {
              setUserData(usuario);
            }
          } catch {
            setUserData(null);
          }
        };
    
        loadUserData();
      }, []);

  return (  
    <div
      className={cn(
        "min-h-screen rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
      )}
    >
        <SidebarAdministrador userData={userData} /> 
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
            {children}
            </div>
        </div>
    </div>    
  )
}
