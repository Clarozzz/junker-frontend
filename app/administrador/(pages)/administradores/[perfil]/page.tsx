import PerfilUsuario from "@/app/administrador/components/perfil-usuario"
import { ToastProvider } from "@/components/ui/toast"

export default function PerfilAdministradorAdminPage ({
  params
}: {
  params: { perfil: string }
}) {

  return (
    <>
    <ToastProvider/> 
    <PerfilUsuario params={params} />
    </>
  )
}
