'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoJunker from './logo-junker';
// import { ThemeToggle } from '@/components/theme-toggle';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className='flex flex-row'>
          <LogoJunker className='w-11'/>
          <Link href="/" className="text-2xl font-bold flex items-center">
            Junker
          </Link>
          </div>
          <nav className={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <Link href="/" className="block md:inline-block py-2 hover:text-primary">
              Inicio
            </Link>
            <Link href="/productos" className="block md:inline-block py-2 hover:text-primary">
              Productos
            </Link>
            <Link href="/nosotros" className="block md:inline-block py-2 hover:text-primary">
              Sobre Nosotros
            </Link>
            <Link href="/servicios" className="block md:inline-block py-2 hover:text-primary">
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
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
