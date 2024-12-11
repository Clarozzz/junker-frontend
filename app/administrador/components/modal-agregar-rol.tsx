'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { UserIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/button'
import { AdministradorRolEspecializacion } from './form-roles'

export default function ModalAgregarRolEspecializacion ({ usuario }: { usuario: UsuarioVista }) {

    
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='justify-start font-normal  '>
          <UserIcon className='h-4 w-4 mr-1' />
          Asignar Rol
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar Rol</DialogTitle>
          <DialogDescription>Agregar un rol a <strong>{usuario?.nombre} {usuario?.apellido}</strong></DialogDescription>
        </DialogHeader>
        <AdministradorRolEspecializacion usuario={usuario} />
      </DialogContent>
    </Dialog>
  )
}
