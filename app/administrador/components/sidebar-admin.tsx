"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import LogoJunker from "@/components/logo-junker";

export default function SidebarAdministrador({userData }:{userData: Usuario | null }) {
  const links = [
    {
      label: "Clientes",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Administradores",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Productos",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Cerrar Sesión",
      href: "#",
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
                label: userData ? `${userData.nombre} ${userData.apellido}` : "Usuario desconocido",
                href: "#",
                icon: userData?.avatar_url ? (
                  <Image
                    src={userData.avatar_url}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ) : (
                  <div className="h-7 w-7 flex-shrink-0 rounded-full bg-neutral-300 flex items-center justify-center text-xs font-bold text-neutral-700">
                    {userData?.nombre?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
  );
}


