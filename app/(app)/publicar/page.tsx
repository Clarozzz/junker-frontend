import React from 'react'
import PublicarClient from './components/publicar'
import Navbar from '@/components/navbar'
import Footer from "@/components/footer";
import { ToastProvider } from '@/components/ui/toast';
// import Nuevo from './components/nuevo'

export default function PagePublicar() {
  return (
    <>
       
      <Navbar />
      <ToastProvider/>  
      <PublicarClient />
      {/* <Nuevo/> */}
      <Footer />
    </>
  )
}
