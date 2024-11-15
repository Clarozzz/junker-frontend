
import Link from "next/link";

export default function EmailUpdated() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center space-y-4 bg-gray-100 text-center px-3">
        <div className="text-4xl font-semibold text-green-500">
          ¡Correo Actualizado!✅
        </div>
        <p className="text-xl text-gray-700">
          Tu correo ha sido actualizado exitosamente.
        </p>
        <div className="text-md text-gray-500">
          Puedes cerrar esta ventana o {' '}            
          <Link href="/" className="text-custom-blue2 font-bold hover:underline hover:underline-offset-2">Ir a inicio</Link>.
        </div>
      </div>
    </>
  )
}
