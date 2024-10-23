import Navbar from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
    return (
        <>
            <Navbar />
            <div className="px-80">
                <h1 className="mt-16 text-6xl montserrat font-bold">Mi cuenta</h1>
                <div className="flex justify-between gap-20 mt-16">
                    <div className="w-1/4 bg-slate-300 rounded px-6 py-10">
                        <div className="flex justify-center">
                            <div>
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h2 className="mt-4 text-xl font-bold text-center">
                                    Anthony
                                </h2>
                            </div>
                        </div>
                        <ul className="mt-8">
                            <li>
                                Informacion de la cuenta
                            </li>
                            <li>
                                Historial de compras
                            </li>
                            <li>
                                Productos en venta
                            </li>
                        </ul>
                    </div>
                    <div className="w-3/4">
                        <h2 className="font-bold">Informacion de la cuenta</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
