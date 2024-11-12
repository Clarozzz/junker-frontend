"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, HandCoins, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@/context/UserContext";
import Cookies from "js-cookie";

interface DropdownMenuProps {
    userName: string;
    avatarUrl: string;
}

export default function DropdownMenu({ userName, avatarUrl }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const { setUserData } = useUser();

    const isLandingPage = pathname === "/";

    const handleLogout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        setUserData(null);
        window.location.href = "/";
    };

    const handleToggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!isLandingPage) return;

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 1);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLandingPage]);

    const getTextColor = () => {
        if (isScrolled || !isLandingPage) return "text-gray-900";
        return "text-white";
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={handleToggle}
                className="flex items-center space-x-2 cursor-pointer focus:outline-none"
            >
                <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={avatarUrl} className="image-cover" />
                        <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className={getTextColor()}>{userName}</span>
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
                        className="absolute right-0 mt-2 w-[150] p-1 bg-white rounded-lg shadow-2xl ring-1 ring-gray-200 focus:outline-none z-20"
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
                                setIsOpen(false);
                                handleLogout();
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
    );
}
