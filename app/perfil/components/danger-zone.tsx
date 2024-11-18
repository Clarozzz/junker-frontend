import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DangerZone() {
    return (
        <Card className="border-red-500">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-red-600 mb-4">Zona de Peligro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-4">
                    <h4 className="font-semibold mb-2">Eliminar cuenta</h4>
                    <p className="text-sm text-gray-600 mb-2">Haz clic en SOLICITUD PARA BORRAR LA CUENTA para iniciar el proceso de eliminación permanente de tu cuenta, incluida toda tu información personal, las compras realizadas y productos que tengas en venta.</p>
                    <Button
                        className="h-12 font bold bg-red-600 hover:bg-red-600 hover:brightness-110 transition-all duration-200"
                    >
                        SOLICITUD PARA BORRAR TU CUENTA
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
