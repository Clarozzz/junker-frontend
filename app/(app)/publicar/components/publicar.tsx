'use client'

import { useState, useEffect } from "react"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { X, Upload, DollarSign, Package, Info, Tag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { productosService } from "@/app/api/productos"
import { getCategorias } from "@/app/api/categorias"
import { useToast } from "@/components/ui/toast"

const productSchema = z.object({
  producto: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }).max(100, { message: 'El nombre no puede exceder 100 caracteres' }),
  precio: z.number().min(0.01, { message: 'El precio debe ser mayor a 0' }),
  estado_producto: z.string().min(2, { message: 'Debe seleccionar el estado del producto' }).max(50, { message: 'La condición no puede exceder 50 caracteres' }),
  descripcion: z.string().min(20, { message: 'La descripción debe tener al menos 20 caracteres' }).max(1000, { message: 'La descripción no puede tener mas de 1000 caracteres' }),
  stock: z.number().min(1, { message: 'La cantidad debe ser mayor a 0' }),
  id_categoria: z.string().min(1, { message: 'Debe seleccionar una categoría' })
})

type ProductFormData = z.infer<typeof productSchema>

export default function PublicarClient({id}:{id:string | null}) {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      producto: "",
      precio: 0,
      estado_producto: "",
      descripcion: "",
      id_categoria: "",
      stock: 0
    }
  })

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const data = await getCategorias()
        setCategorias(data)
      } catch (error) {
        console.error("Error al obtener las categorias:", error)
      }
    }

    obtenerCategorias()
  }, [])

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    const remainingSlots = 4 - uploadedImages.length
    const filesToUpload = acceptedFiles.slice(0, remainingSlots)

    if (uploadedImages.length + filesToUpload.length > 4) {
      showToast({
        title: "Error",
        description: "Subir máximo 4 imágenes",
        variant: "destructive",
      })
      return
    }

    setUploadedImages((prev) => [...prev, ...filesToUpload])
    const newPreviewUrls = filesToUpload.map((file) => URL.createObjectURL(file))
    setImageUrls((prev) => [...prev, ...newPreviewUrls])
  }

  const removeImage = (index: number): void => {
    URL.revokeObjectURL(imageUrls[index])
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ProductFormData): Promise<void> => {
    if (uploadedImages.length === 0) {
      showToast({
        title: "Error",
        description: "Por favor, agrega al menos una imagen",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      const cloudinaryUrls = await Promise.all(
        uploadedImages.map((file) => productosService.uploadToCloudinary(file))
      )

      const productoData = {
        nombre: data.producto.trim(),
        descripcion: data.descripcion.trim(),
        precio: data.precio,
        estado_producto: data.estado_producto.trim(),
        imagen_url: cloudinaryUrls,
        id_vendedor: id || "",
        id_categoria: data.id_categoria,
        stock: data.stock
      }

      await productosService.createProducto(productoData)

      showToast({
        title: "Éxito",
        description: "Producto creado con éxito",
        variant: "success",
      })

      reset()
      imageUrls.forEach((url) => URL.revokeObjectURL(url))
      setImageUrls([])
      setUploadedImages([])

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al publicar el producto"
      showToast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: true,
    maxSize: 10000000
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl montserrat font-bold mb-8">Publicar Nuevo Producto</h1>
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="producto" className="text-sm font-medium text-gray-700 flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Nombre del Producto
                </Label>
                <Input
                  id="producto"
                  {...register('producto')}
                  className={`mt-1 ${errors.producto ? 'border-red-500' : ''}`}
                />
                {errors.producto && (
                  <p className="mt-1 text-sm text-red-600">{errors.producto.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="descripcion" className="text-sm font-medium text-gray-700 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Descripción del producto
                </Label>
                <Textarea
                  id="descripcion"
                  {...register('descripcion')}
                  className={`mt-1 ${errors.descripcion ? 'border-red-500' : ''}`}
                  rows={4}
                />
                {errors.descripcion && (
                  <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Imágenes del Producto
                </Label>
                <div
                  {...getRootProps()}
                  className={`mt-2 flex justify-center cursor-pointer hover:bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 transition-colors ${isDragActive ? 'border-blue-400 bg-blue-50' : ''
                    }`}
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer">Sube un archivo</span> o arrastra y suelta
                    </p>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG hasta 10MB (máximo 4 imágenes)</p>
                    <input {...getInputProps()} />
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={url} className="relative h-52 aspect-square">
                        <Image
                          src={url}
                          alt={`Preview ${index + 1}`}
                          fill
                          className=" object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-rose-600 rounded-full p-1 shadow-md"
                          aria-label="Remove image"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="precio" className="text-sm font-medium text-gray-700 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Precio
                  </Label>
                  <Input
                    id="precio"
                    type="number"
                    placeholder="0.00"
                    className={`mt-1 ${errors.precio ? 'border-red-500' : ''}`}
                  />
                  {errors.precio && (
                    <p className="mt-1 text-sm text-red-600">{errors.precio.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="stock" className="text-sm font-medium text-gray-700 flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Cantidad
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    className={`mt-1 ${errors.stock ? 'border-red-500' : ''}`}
                  />
                  {errors.stock && (
                    <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="estado_producto" className="text-sm font-medium text-gray-700 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Estado del Producto
                </Label>
                <Controller
                  name="estado_producto"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`mt-1 ${errors.estado_producto ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nuevo">Nuevo</SelectItem>
                        <SelectItem value="Usado">Usado</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.estado_producto && (
                  <p className="mt-1 text-sm text-red-600">{errors.estado_producto.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="id_categoria" className="text-sm font-medium text-gray-700 flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Categoría
                </Label>
                <Controller
                  name="id_categoria"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`mt-1 ${errors.id_categoria ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.id_categoria && (
                  <p className="mt-1 text-sm text-red-600">{errors.id_categoria.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || !isValid || uploadedImages.length === 0}
                className="w-full bg-green-600 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publicando...
                  </>
                ) : (
                  "Publicar Producto"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}