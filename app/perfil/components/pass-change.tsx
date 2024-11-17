'use client'

import { verifyPass } from "@/app/api/server";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Cargando from "@/components/ui/cargando";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { Label } from "@radix-ui/react-label";
import { CircleCheck, AlertCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const passSchema = z.object({
    password: z.string().min(1, "Contraseña incorrecta"),
    newPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/, "Mínimo 6 caracteres, una letra mayúscula, una letra minúscula, y un número"),
    confirmPass: z.string().min(1, "")
}).refine((data) => data.newPassword === data.confirmPass, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPass"]
});

export default function PassChange() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [passErrors, setPassErrors] = useState<Record<string, string>>({});
    const { userData, loading } = useUser();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handlePass = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = { password, newPassword, confirmPass };

        try {
            setIsLoading(true);
            setError(null);
            setSuccessMessage(null);
            setPassErrors({});

            const parsedData = passSchema.parse(formData);

            if (!userData?.id) throw new Error("No se encontró el usuario");

            const res = await verifyPass(userData.id, parsedData);
            if (res) {
                setSuccessMessage("Contraseña cambiada correctamente.");
                setPassword("");
                setNewPassword("");
                setConfirmPass("");
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                const passErrors: Record<string, string> = {};
                err.errors.forEach((error) => {
                    if (error.path[0]) passErrors[error.path[0] as string] = error.message;
                });
                setPassErrors(passErrors);
            } else {
                setError(`${err}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    if (loading) return <Cargando />;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-semibold">Actualiza tu contraseña</CardTitle>
                <h2 className="text-gray-500">Cambia tu contraseña por una nueva</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePass} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña actual</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Introduce tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passErrors.password && <p className="text-red-500">{passErrors.password}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">Nueva contraseña</Label>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="Introduce tu nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {passErrors.newPassword && <p className="text-red-500">{passErrors.newPassword}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPass">Repetir nueva contraseña</Label>
                        <Input
                            id="confirmPass"
                            name="confirmPass"
                            type="password"
                            placeholder="Repite tu nueva contraseña"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                        {passErrors.confirmPass && <p className="text-red-500">{passErrors.confirmPass}</p>}
                    </div>
                    <Button
                        type="submit"
                        className="bg-custom-blue hover:bg-blue-900 transition-all duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-circle animate-spin mr-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                                Verificando...
                            </>
                        ) : (
                            "Cambiar contraseña"
                        )}
                    </Button>
                </form>
                {successMessage && (
                    <Alert className="mt-4 border-green-500 text-green-600">
                        <CircleCheck className="h-4 w-4" color='#22c55e' />
                        <AlertTitle>Hecho</AlertTitle>
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                )}
                {error && (
                    <Alert variant="destructive" className='mt-4'>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}
