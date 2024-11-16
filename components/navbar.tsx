'use client'

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, User, HandCoins, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import LogoJunker from "./logo-junker"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { AnimatePresence, motion } from "framer-motion"
import { signOut } from "@/app/api/login"

const pages = [
  { ruta: "Inicio", href: "/", current: true },
  { ruta: "Productos", href: "/productos", current: false },
  { ruta: "Nosotros", href: "/nosotros", current: false },
  { ruta: "Servicios", href: "/servicios", current: false },
]

export default function Navbar({ userData }: { userData: Usuario | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()

  const isLandingPage = pathname === "/"
  const hiddenRoutes = ["/login", "/registro", "/forgot", "/reset", "/emailUpdated"];
  const isHidden = hiddenRoutes.includes(pathname);

  const handleToggle = (event: React.MouseEvent) => {
    event?.stopPropagation()
    setIsOpen(prev => !prev)
  }

  useEffect(() => {
    if (!isLandingPage) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isLandingPage])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => { document.removeEventListener("click", handleClickOutside) }
  }, [isOpen])

  const getTextColor = () => {
    if (isScrolled || !isLandingPage) return "text-gray-900"
    return "text-white"
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = "/"
  }

  return (
    <header
      className={`${isLandingPage
        ? "bg-transparent fixed transition-colors duration-300 w-full"
        : "bg-background shadow-md sticky"
        } top-0 z-20 ${isScrolled ? "bg-white shadow-md text-gray-900" : ""} ${isHidden ? "hidden" : ""}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mx-4 md:justify-between w-full md:w-auto">
          <div className="flex flex-row items-center md:justify-start sm:justify-start lg:justify-center xl:justify-center px-6 sm:px-2 w-full md:w-auto">
            <Link href="/">
              <LogoJunker className="w-11" />
            </Link>
            <Link
              href="/"
              className={`text-2xl hidden lg:inline-block font-bold items-center montserrat ${getTextColor()}`}
            >
              Junker
            </Link>
          </div>
          <nav className="md:flex hidden space-x-8">
            {pages.map((vista) => (
              <Link
                key={vista.ruta}
                href={vista.href}
                className={`text-center block md:inline-block py-2 transition-colors hover:text-primary ${pathname === vista.href
                  ? 'bg-gray-200/75 w-24 rounded-full text-gray-900'
                  : `hover:bg-gray-200/75 w-24 rounded-full ${getTextColor()} hover:text-gray-900`
                  }`}
                aria-current={pathname === vista.href ? "page" : undefined}
              >
                {vista.ruta}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4 pr-6">
            <Button variant="ghost" size="icon" className="group hover:text-custom-blue">
              <ShoppingCart className={`h-5 w-5 ${getTextColor()} group-hover:text-custom-blue transition-colors`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 md:hidden group hover:text-custom-blue"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className={`h-5 w-5 ${getTextColor()} group-hover:text-custom-blue transition-colors`} />
            </Button>
            {!userData ? (
              <Button asChild variant={"link"} className="text-md">
                <Link href="/login" className={`${getTextColor()}`}>
                  Iniciar Sesión
                </Link>
              </Button>
            ) : (
              <div className="relative inline-block text-left">
                <button
                  onClick={handleToggle}
                  className="flex items-center space-x-2 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={userData.avatar_url} className="image-cover" />
                      <AvatarFallback>
                        {userData.nombre.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className={getTextColor()}>{userData.nombre}</span>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-max p-1 bg-white rounded-lg shadow-2xl ring-1 ring-gray-200 focus:outline-none z-20"
                    >
                      <Link
                        href="/perfil"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center px-2 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-all duration-150 ease-in-out"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Perfil
                      </Link>
                      <Link
                        href="/publicar"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center px-2 py-2 text-sm text-green-600 hover:bg-gray-100 rounded-md transition-all duration-150 ease-in-out"
                      >
                        <HandCoins className="mr-2 h-4 w-4 text-green-500" />
                        Vender
                      </Link>
                      <button
                        onClick={() => {
                          setIsOpen(false)
                          handleLogout()
                        }}
                        className="flex items-center w-full px-2 py-2 text-sm hover:bg-gray-100 rounded-md transition-all duration-150 ease-in-out"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden`}
        >
          <nav className="p-4">
            <div
              className="flex justify-end mb-4 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-8 w-8" />
              <span className="sr-only">Close</span>
            </div>
            <div className="space-y-2">
              {pages.map((vista) => (
                <Link
                  key={vista.ruta}
                  href={vista.href}
                  className={`text-left pl-3 rounded-md block md:inline-block py-2 transition-colors ${pathname === vista.href
                    ? 'bg-gray-200/75 w-full text-gray-900 border-l-4 border-custom-blue2'
                    : `hover:bg-gray-200/75 w-full hover:text-gray-900`
                    }`}
                  aria-current={pathname === vista.href ? "page" : undefined}
                >
                  {vista.ruta}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </div>
    </header>
  )
}