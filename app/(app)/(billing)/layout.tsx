'use client'

import { usePathname } from "next/navigation";
import { carritoService } from "@/app/api/carritos";
import { readUser } from "@/app/api/server";
import { getUser } from "@/app/api/usuarios";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PerfilLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const [carritos, setCarrito] = useState<Carrito[]>([]);
    const [userData, setUserData] = useState<Usuario | null>(null);

    const steps = [
        { label: "Información de Envío", path: "/shippingInfo", step: 1 },
        { label: "Pagos", path: "/payments", step: 2 },
    ];

    const currentStep = steps.findIndex((step) => pathname.includes(step.path)) + 1;

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const {
                    data: { user },
                } = await readUser();
                if (!user) {
                    throw new Error("Error al obtener el usuario");
                }

                const usuario = await getUser(user.id);
                if (usuario) {
                    setUserData(usuario);
                }
            } catch {
                setUserData(null);
            }
        };

        loadUserData();
    }, []);

    useEffect(() => {
        if (userData?.carrito && userData.carrito.length > 0) {
            const fetchCarrito = async () => {
                try {
                    const carrito_id = userData.carrito[0].id;
                    const data = await carritoService.getCarrito(carrito_id);
                    setCarrito(data);
                } catch (error) {
                    console.error("Error al obtener carrito:", error);
                }
            };

            fetchCarrito();
        }
    }, [userData]);

    const subtotal = carritos.reduce(
        (total, carrito) => total + (carrito.productos?.precio || 0) * carrito.cantidad,
        0
    );
    const isv = subtotal * 0.15;
    const total = subtotal + isv;

    return (
        <>
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-6xl font-bold montserrat">
                        Pasarela de Pagos
                    </h1>
                    <div className="flex items-center my-8">
                        {steps.map((item, index) => (
                            <div key={item.step} className="flex items-center">
                                {/* Indicador del Paso */}
                                <motion.div
                                    initial={{ scale: 0.8, backgroundColor: "#e5e7eb" }}
                                    animate={{
                                        scale: currentStep >= item.step ? 1 : 0.8,
                                        backgroundColor: currentStep >= item.step ? "#1d4ed8" : "#e5e7eb",
                                    }}
                                    transition={{ duration: 0.15 }}
                                    className={`w-12 h-12 flex items-center justify-center rounded-full font-bold shadow-lg transition-all duration-300 ${currentStep >= item.step ? "text-white" : "text-gray-500"
                                        }`}
                                    style={{
                                        border: currentStep >= item.step ? "3px solid #2563eb" : "3px solid #d1d5db",
                                    }}
                                >
                                    {item.step}
                                </motion.div>

                                {index < steps.length - 1 && (
                                    <motion.div
                                        initial={{ width: "20px", backgroundColor: "#e5e7eb" }}
                                        animate={{
                                            width: currentStep > item.step ? "50px" : "20px",
                                            backgroundColor: currentStep > item.step ? "#1d4ed8" : "#e5e7eb",
                                        }}
                                        transition={{ duration: 0.1 }}
                                        className="h-1 mx-2 transition-all"
                                        style={{
                                            borderRadius: "4px",
                                        }}
                                    ></motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="lg:w-2/3">
                            {children}
                        </div>
                        <div className="lg:w-1/3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Resumen de la Orden</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">Lps. {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">ISV</span>
                                        <span className="font-medium">Lps. {isv.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-semibold">Total</span>
                                            <span className="text-lg font-semibold">Lps. {total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
