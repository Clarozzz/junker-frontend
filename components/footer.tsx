'use client'

import Link from 'next/link'
import LogoJunker from './logo-junker'
import { PhoneIcon } from 'lucide-react'
import { EnvelopeOpenIcon } from '@radix-ui/react-icons'

export default function Footer () {
  return (
    <>
      <footer className="bg-custom-beige dark:bg-gray-900" id="footer">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-5">
            <div className="sm:col-span-2">
              <div className="flex flex-row mx-auto">
                <Link href="/">
                <LogoJunker className='w-20'/></Link>
                <span className="flex text-6xl font-bold montserrat text-custom-blue items-center">Junker</span>              
              </div>
              <h1 className="max-w-lg text-xl mt-3 font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
              Bienvenido a nuestra pagina de venta de autopartes.
              </h1>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                Más Información
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <Link
                  href="/nosotros"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-custom-blue-var-400 hover:underline hover:text-custom-blue"
                >
                  Nosotros
                </Link>
                <Link
                  href="/productos"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-custom-blue-var-400 hover:underline hover:text-custom-blue"
                >
                  Productos
                </Link>
                <Link
                  href="/servicios"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-custom-blue-var-400 hover:underline hover:text-custom-blue"
                >
                  Servicios
                </Link>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                Leyes
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <Link
                  href="/terminos"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-custom-blue-var-400 hover:underline hover:text-custom-blue"
                >
                  Términos y Condiciones
                </Link>
                <Link
                  href="/politicas"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-custom-blue-var-400 hover:underline hover:text-custom-blue"
                >
                  Politicas de privacidad
                </Link>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                Contáctenos
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <div className='flex flex-row'>
                  <div className='flex items-center'>
                    <PhoneIcon className="h-5 w-5"/>
                  </div>
                  <div>
                  <p
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-custom-blue-var-400 hover:text-custom-blue ml-2 cursor-default"
                  >
                  Teléfono: +504-0000-0000
                </p>
                  </div>
                </div>
                <div className='flex flex-row'>
                  <div>
                  <EnvelopeOpenIcon className='h-5 w-5'/>
                  </div>
                  <div>
                  <p
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-custom-blue-var-400 hover:text-custom-blue ml-2 cursor-default"
                  >
                  Correo: junkerhn@gmail.com
                </p>
                  </div>
                </div>
                <div className='flex flex-row'>
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                    <path d="M52.708,20.849C52.708,8.185,44.584,0,32,0S11.292,8.185,11.292,20.849c0,10.556,16.311,31.747,18.175,34.118l2.278,2.928c-9.542,0.025-17.237,1.38-17.237,3.051c0,1.686,7.836,3.053,17.502,3.053s17.502-1.367,17.502-3.053c0-1.672-7.704-3.028-17.255-3.051l2.292-2.928C36.396,52.581,52.708,31.39,52.708,20.849z M25.294,20.835c0-3.604,3.002-6.526,6.706-6.526c3.704,0,6.706,2.922,6.706,6.526S35.704,27.361,32,27.361C28.296,27.361,25.294,24.439,25.294,20.835z"/>
                  </svg>
                  </div>
                  <div>
                  <p
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-custom-blue-var-400 hover:text-custom-blue cursor-default"
                  >
                  Dirección: UNAH.
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />

          <div className="flex items-center mx-12 justify-between">
              <div>
                <p>Junker 2024. Todos los derechos reservados</p>
              </div>

            <div className="flex -mx-2">
              <a
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-custom-blue dark:hover:text-custom-blue-var-400"
                aria-label="Reddit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 50 50"><path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"/></svg>
              </a>

              <a
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-custom-blue dark:hover:text-custom-blue-var-400"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z"></path>
                </svg>
              </a>

              <a
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-custom-blue dark:hover:text-custom-blue-var-400"
                aria-label="Github"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 1200 1227"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
