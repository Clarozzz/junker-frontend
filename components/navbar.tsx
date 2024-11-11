"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, User, HandCoins, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoJunker from "./logo-junker";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";

const pages = [
  { ruta: "Inicio", href: "/", current: true },
  { ruta: "Productos", href: "/productos", current: false },
  { ruta: "Nosotros", href: "/nosotros", current: false },
  { ruta: "Servicios", href: "/servicios", current: false },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { userData, setUserData } = useUser();

  const isLandingPage = pathname === "/";
  const isLogin = pathname === "/login";
  const isRegistro = pathname === "/registro";

  useEffect(() => {
    if (!isLandingPage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLandingPage]);

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setUserData(null);
    window.location.href = "/";
  };

  // Función para determinar el color de texto según la ruta actual
  const getTextColor = () => {
    if (isScrolled || !isLandingPage) return "text-gray-900"; // color cuando se hace scroll o no estamos en la landing page
    return "text-white"; // color por defecto en la landing page
  };

  return (
    <header
      className={`${isLandingPage
        ? "bg-transparent absolute transition-colors duration-300 w-full"
        : "bg-background shadow-md sticky"
        } top-0 z-20 ${isScrolled ? "bg-white shadow-md text-gray-900" : ""} ${isLogin || isRegistro ? "hidden" : ""}`}
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
              <Link href="/login" className={`hover:underline underline-offset-4 cursor-pointer ${getTextColor()}`}>
                Iniciar Sesión
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={userData?.avatar_url} className="image-cover" />
                      <AvatarFallback>{userData?.nombre?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className={getTextColor()}>{userData.nombre}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="cursor-pointer">
                  <DropdownMenuItem onClick={() => router.push("/perfil")} className="cursor-pointer">
                    <User />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/publicar")} className="cursor-pointer text-green-700">
                    <HandCoins />
                    Vender
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
  );
}
