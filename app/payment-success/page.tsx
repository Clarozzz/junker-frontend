'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FaCheckCircle } from "react-icons/fa"

export default function PaymentSuccess() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-background to-primary/10" />

            <Card className="w-full max-w-md relative z-10">
                <CardHeader>
                    <CardTitle className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <FaCheckCircle className="mx-auto text-green-500" size={100} />
                        </motion.div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1 className="text-2xl font-bold text-center mb-4">
                            ¡Muchas gracias por tu compra!
                        </h1>
                        <p className="text-center text-muted-foreground">
                            Tu pago ha sido procesado exitosamente.
                        </p>
                    </motion.div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                        <Link href="/productos">
                            Seguir comprando
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

