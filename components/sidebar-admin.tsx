'use client'

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import LogoJunker from "@/components/logo-junker";
import { signOut } from "@/app/api/server"; 
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";


export default function SidebarAdministrador({ userData }: { userData: { nombre: string, avatar_url: string, apellido: string} | null }) {

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";  // Redirect to login after logout
  };

  const links = [
    {
      label: "Inicio",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Clientes",
      href: "/administrador/clientes",
      icon: (
        <User className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Administradores",
      href: "/administrador/administradores",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Productos",
      href: "/administrador/productos",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Cerrar Sesión",
      href: "/",
      onClick: handleLogout,
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? 
              <div className="flex items-center flex-row gap-1">
                <LogoJunker className="w-7" />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-semibold text-black montserrat dark:text-white whitespace-pre"
                >
                  Junker
                </motion.span> 
              </div>
            : <LogoJunker className="w-7" /> }
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: userData
                  ? `${userData.nombre} ${userData.apellido}`
                  : "Usuario desconocido",
                href: "#",
                icon: userData?.avatar_url ? (
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar className="w-7 h-7">
                      <AvatarImage
                        src={userData.avatar_url}
                        alt="Avatar"
                        className="image-cover"
                      />
                      <AvatarFallback>
                        {userData?.nombre?.slice(0, 2).toUpperCase() || "?"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="h-7 w-7 flex items-center justify-center rounded-full bg-neutral-300 text-neutral-700">
                    ?
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
  );
}


