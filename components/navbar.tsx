"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { ShoppingCart, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoJunker from "./logo-junker";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/app/api/usuarios";
import Cargando from "./ui/cargando";

const pages = [
  { ruta: "Inicio", href: "/", current: true },
  { ruta: "Productos", href: "/productos", current: false },
  { ruta: "Nosotros", href: "/nosotros", current: false },
  { ruta: "Servicios", href: "/servicios", current: false },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [userData, setUserData] = useState<Usuario>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("access_token") || "";
    const loadUserData = async () => {
      try {
        const data = await getUser(token);
        setUserData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) return <Cargando />;
  if (error) return <p>Error: {error}</p>;

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <header className="bg-background shadow-md top-0 sticky z-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mx-4 md:justify-between w-full md:w-auto">
          <div className="flex flex-row items-center md:justify-start sm:justify-start lg:justify-center xl:justify-center px-6 sm:px-2 w-full md:w-auto">
            <Link href="/">
              <LogoJunker className="w-11" />
            </Link>
            <Link
              href="/"
              className="text-2xl hidden lg:inline-block text-custom-blue font-bold items-center montserrat"
            >
              Junker
            </Link>
          </div>
          <nav className="md:flex hidden space-x-8">
            {pages.map((vista) => (
              <Link
                // className="text-center block md:inline-block py-2 hover:text-primary"
                key={vista.ruta}
                href={vista.href}
                className={`text-center block md:inline-block py-2 transition-colors hover:text-primary ${
                  pathname === vista.href
                    ? 'bg-gray-200/75 w-24 rounded-full text-gray-900'
                    : 'text-gray-900 hover:bg-gray-200/75 w-24 rounded-full hover:text-gray-900'
                }`}
                aria-current={pathname === vista.href ? "page" : undefined}
              >
                {vista.ruta}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4 pr-6">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            {/* <ThemeToggle /> */}
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {userData?.avatar_url ? (
                      <Avatar className="w-8 h-8 cursor-pointer hover:cursor-pointer">
                        <AvatarImage
                          src={userData?.avatar_url}
                          alt={userData?.nombre}
                          className="image-cover"
                        />
                        <AvatarFallback>Usuario</AvatarFallback>
                      </Avatar>
                    ) : (
                      <span className="h-8 w-8 rounded-full flex justify-center items-center border-gray-300 border hover:cursor-pointer cursor-pointer border-spacing-1">
                        {(userData?.nombre?.charAt(0) ?? "").toUpperCase() +
                          (userData?.apellido?.charAt(0) ?? "").toUpperCase()}
                      </span>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="cursor-pointer">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/perfil")}
                      className="cursor-pointer">
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push("/publicar")}
                    >
                      Publicar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>   
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <p className="hover:underline underline-offset-4 cursor-pointer">
                      Login
                    </p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleLogin}>
                      Iniciar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <nav className="p-4">
            <div
              className="flex justify-end mb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-8 w-8" />
              <span className="sr-only">Close</span>
            </div>
              <div className="space-y-2">
                {pages.map((vista) => (
                  <Link
                    // className="text-center block md:inline-block py-2 hover:text-primary"
                    key={vista.ruta}
                    href={vista.href}
                    className={`text-left pl-3 block md:inline-block py-2 transition-colors hover:text-primary ${
                      pathname === vista.href
                        ? 'bg-gray-200/75 w-full text-gray-900'
                        : 'text-gray-900 hover:bg-gradient-to-r hover:from-gray-200 hover:via-gray-100 hover:to-white w-full hover:text-gray-900'
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
