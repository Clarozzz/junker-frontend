'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoJunker from './logo-junker';
// import { ThemeToggle } from '@/components/theme-toggle';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background shadow-md sticky top-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center md:justify-between">
          <div className='flex flex-row items-center justify-center md:justify-start w-full md:w-auto'>
          <Link href="/">      
          <LogoJunker className='w-11'/>
          </Link >
          <Link href="/" className="text-2xl font-bold flex items-center">
            Junker
          </Link>
          
          </div>
          <nav className= "md:flex hidden space-x-4">
            <Link href="/" className="text-center block md:inline-block py-2 hover:text-primary">
              Inicio
            </Link>
            <Link href="/productos" className="text-center block md:inline-block py-2 hover:text-primary">
              Productos
            </Link>
            <Link href="/nosotros" className="text-center block md:inline-block py-2 hover:text-primary">
              Nosotros
            </Link>
            <Link href="/servicios" className="text-center block md:inline-block py-2 hover:text-primary">
              Servicios
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            {/* <ThemeToggle /> */}
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="absolute left-0 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden`}
        >
          <nav className="p-4">
            <ul>
              <li className="mb-4">
                <Link href="/" className="text-lg font-medium">
                  Inicio
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/productos" className="text-lg font-medium">
                  Productos
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/nosotros" className="text-lg font-medium">
                  Sobre Nosotros
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/servicios" className="text-lg font-medium">
                  Servicios
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}>
          </div>
        )}
      </div>
    </header>
  );
}
