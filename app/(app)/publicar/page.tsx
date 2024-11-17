import React from 'react'
import PublicarClient from './components/publicar'
import Footer from "@/components/footer";
import { ToastProvider } from '@/components/ui/toast';
// import Nuevo from './components/nuevo'

export default function PagePublicar() {
  return (
    <> 
      <ToastProvider/>  
      <PublicarClient />
      <Footer />
    </>
  )
}
