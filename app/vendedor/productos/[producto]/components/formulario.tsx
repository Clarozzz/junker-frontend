
//  Test area

'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { X, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'
import { useEffect, useState } from 'react'
import { productosService } from '@/app/api/productos'
import { getProducto } from "@/app/api/productos"

const productSchema = z.object({
  nombre: z.string().trim().min(1, { message: 'El nombre es obligatorio' }).max(100, { message: 'Máximo 100 caracteres' }),
  descripcion: z.string().trim().min(1, { message: 'La descripción es obligatoria' }).max(1000, { message: 'Máximo 1000 caracteres' }),
  precio: z.number().positive({ message: 'Debe ser un número positivo' }),
  estado_producto: z.enum(['Nuevo', 'Usado', 'Reacondicionado'], { errorMap: () => ({ message: 'Seleccione un estado válido' }) }),
  stock: z.number().positive({ message: 'Debe ser un número mayor a 0' }),
  imagen_url: z.array(z.string().url()).optional(),
  id_vendedor: z.string().min(1, { message: 'El ID del vendedor es obligatorio' }),
  id_categoria: z.string().min(1, { message: 'Debe seleccionar una categoría' })
})

type ProductFormData = z.infer<typeof productSchema>

export default function Formulario({ id }: { id: string }) {
  const { showToast } = useToast()
  const [initialProduct, setInitialProduct] = useState<Producto>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  // Renderizado de los productos
  useEffect(() => {
    if (initialProduct) return;
    
    const fetchProduct = async () => {
      try {
        const producto = await getProducto(id);
        setInitialProduct(producto);

        reset({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          estado_producto: producto.estado_producto as "Nuevo" | "Usado" | "Reacondicionado",
          stock: producto.stock,
          imagen_url: producto.productos_imagenes.map((img: { url: string }) => img.url),
          id_vendedor: producto.id_vendedor,
          id_categoria: producto.productos_categorias[0]?.categorias?.nombre,
        });
      } catch  {
        showToast({
          title: 'Error',
          description: 'No se pudo obtener el producto',
          variant: 'destructive',
        });
      }
    };

    fetchProduct();
  }, [id, initialProduct, reset, showToast]);

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    try {
      const cloudinaryUrls = await Promise.all(
        acceptedFiles.map((file) => productosService.uploadToCloudinary(file))
      )
      reset((prevValues) => ({
        ...prevValues,
        imagen_url: [...(prevValues.imagen_url || []), ...cloudinaryUrls],
      }))
    } catch {
      showToast({
        title: 'Error',
        description: 'No se pudo cargar la imagen',
        variant: 'destructive',
      })
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
    maxSize: 10000000, // 10MB
    onDropRejected: (fileRejections) => {
      fileRejections.forEach(({ errors }) =>
        errors.forEach((error) =>
          showToast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          })
        )
      )
    },
  })

  const onSubmit = async (data: ProductFormData): Promise<void> => {
    try {
      setIsLoading(true)
      
      if (!data.imagen_url || data.imagen_url.length === 0) {
        showToast({
          title: "Error",
          description: "Debe cargar al menos una imagen",
          variant: "destructive",
        })
        return
      }

      if (data.imagen_url.length > 4) {
        showToast({
          title: "Error",
          description: "Máximo 4 imágenes permitidas",
          variant: "destructive",
        })
        return
      }

      const payload = {
        id: id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        estado_producto: data.estado_producto,
        stock: data.stock,
        imagen_url: data.imagen_url || [],
        id_vendedor: data.id_vendedor,
      }

      await productosService.editProduct(payload)
      
      // Refrescar solo la información de las imágenes
      const updatedProduct = await getProducto(id);
      
      // Actualizar solo las imágenes
      setInitialProduct(prevProduct => prevProduct ? {
        ...prevProduct,
        productos_imagenes: updatedProduct.productos_imagenes
      } : prevProduct);

      showToast({
        title: "Éxito",
        description: "Producto actualizado correctamente",
        variant: "success",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el producto'
      showToast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 lg:flex lg:space-x-8">
      {/* Image Gallery Section */}
      <div className="lg:w-1/3 mb-6 lg:mb-0">
        <h2 className="text-xl font-semibold mb-4">Imágenes del Producto</h2>
        {initialProduct && (
          <div className="grid grid-cols-2 gap-4">
            {initialProduct.productos_imagenes.map((img: { url: string }, index: number) => (
              <div key={index} className="relative">
                <Image 
                  src={img.url} 
                  alt={`Imagen ${index + 1}`} 
                  width={200} 
                  height={200} 
                  className="rounded-lg object-cover w-full h-40"
                />
              </div>
            ))}
          </div>
        )}
      </div>

        {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="lg:w-2/3 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nombre">Nombre del Producto</Label>
            <Input 
              id="nombre" 
              {...register('nombre')} 
              className="w-full"
            />
            {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>}
          </div>

          <div>
            <Label htmlFor="precio">Precio</Label>
            <Input 
              id="precio" 
              type="number" 
              {...register('precio', { valueAsNumber: true })} 
              className="w-full"
            />
            {errors.precio && <p className="text-red-600 text-sm mt-1">{errors.precio.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="descripcion">Descripción</Label>
          <Textarea 
            id="descripcion" 
            {...register('descripcion')} 
            className="w-full"
          />
          {errors.descripcion && <p className="text-red-600 text-sm mt-1">{errors.descripcion.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid md:grid-cols-2 gap-4">
  <div>
    <Label htmlFor="estado_producto">Estado del Producto</Label>
    <Controller
      name="estado_producto"
      control={control}
      defaultValue={initialProduct?.estado_producto as "Nuevo" | "Usado" | undefined} // Valor inicial
      render={({ field }) => (
        <Select 
          onValueChange={field.onChange} 
          value={field.value || ''} // Establecer valor inicial
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nuevo">Nuevo</SelectItem>
            <SelectItem value="Usado">Usado</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
    {errors.estado_producto && <p className="text-red-600 text-sm mt-1">{errors.estado_producto.message}</p>}
  </div>
</div>


          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input 
              id="stock" 
              type="number" 
              {...register('stock', { valueAsNumber: true })} 
              className="w-full"
            />
            {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>}
          </div>
        </div>

        <div>
          <Label>Cargar Imágenes Adicionales</Label>
          <div 
            {...getRootProps()} 
            className="border-dashed border-2 border-gray-300 p-4 text-center rounded-lg hover:bg-gray-50 transition"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-600">Suelta tus imágenes aquí...</p>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-gray-600">Arrastra o selecciona tus imágenes</p>
              </div>
            )}
          </div>
        </div>

        {/* Newly uploaded images */}
        {control._formValues.imagen_url && control._formValues.imagen_url.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {control._formValues.imagen_url.map((url: string, index: number) => (
              <div key={index} className="relative">
                <Image 
                  src={url} 
                  alt={`Imagen ${index + 1}`} 
                  width={150} 
                  height={150} 
                  className="rounded-lg object-cover w-full h-24"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 bg-white/50 rounded-full"
                  onClick={() =>
                    reset((prevValues: ProductFormData) => ({
                      ...prevValues,
                      imagen_url: prevValues.imagen_url?.filter((_: string, i: number) => i !== index),
                    }))
                  }
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
           <Button
            type="submit"
            disabled={isLoading  || control._formValues.imagen_url > 4 }  
            className="w-full max-w-64 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
