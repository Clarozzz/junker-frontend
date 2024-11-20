

export default function Formulario({ id }: { id: string }) {
    return (
        <div className="bg-gray-100 py-8 min-h-[calc(100vh-74.42px)]">
            <h1>Editar Producto</h1>
            <p className="text-black">ID del producto: {id}</p>
        </div>
    )
}
