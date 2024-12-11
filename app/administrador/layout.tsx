import { cn } from '@/lib/utils';
import { getPermissionsAndUser } from '../api/administradores';
import Permissions from '@/components/ui/permissions';
import SidebarAdministrador from '@/components/sidebar-admin';

export default async function AdministradorLayout ({
  children
}: {
  children: React.ReactNode
}) {

  const { permissions, message, errorCode, usuario } =
    await getPermissionsAndUser({
      rolNecesario: 'administrador'
    })

  if (!permissions) {
    return <Permissions message={message} errorCode={errorCode} />
  }

  return (  
    <div
      className={cn(
        "min-h-screen rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
      )}
    >
        <SidebarAdministrador userData={usuario ?? null}/> 
        <div className="flex flex-1">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
            {children}
            </div>
        </div>
    </div>    
  )
}
