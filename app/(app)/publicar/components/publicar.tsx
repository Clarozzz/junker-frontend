'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { type DropzoneState, useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import Image from "next/image"
import { productosService } from "@/app/api/productos"
import { useToast } from "@/components/ui/toast"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCategorias } from "@/app/api/categorias";


const productSchema = z.object({
  producto: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(100, { message: 'El nombre no puede exceder 100 caracteres' }),
  precio: z
    .number()
    .min(0.01, { message: 'El precio debe ser mayor a 0' }),
  estado_producto: z
    .string()
    .min(2, { message: 'Debe seleccionar el estado del producto' })
    .max(50, { message: 'La condición no puede exceder 50 caracteres' }),
  descripcion: z
    .string()
    .min(20, { message: 'La descripción debe tener al menos 20 caracteres' })
    .max(1000, { message: 'La descripción no puede tener mas de 1000 caracteres' }),
  stock: z
    .number()
    .min(1, { message: 'La cantidad debe ser mayor a 0' }),  
    id_categoria: z
    .string()
    .min(1, { message: 'Debe seleccionar una categoría' })
})

type ProductFormData = z.infer<typeof productSchema>

export default function PublicarClient() {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
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
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener las categorias:", error);
      }
    };

    obtenerCategorias();
  }, []);
  
  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    const remainingSlots = 4 - uploadedImages.length
    const filesToUpload = acceptedFiles.slice(0, remainingSlots)

    if (uploadedImages.length + filesToUpload.length > 4) {
      showToast({
        title: "Error",
        description: "Subir maximo 4 imagenes",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      setUploadedImages((prev) => [...prev, ...filesToUpload])
      
      const newPreviewUrls = filesToUpload.map((file) => URL.createObjectURL(file))
      setImageUrls((prev) => [...prev, ...newPreviewUrls])

      showToast({
        title: "Success",
        description: "Imagen agregada correctamente",
        variant: "success",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "error al subir las imagenes"
      showToast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
        id_vendedor: "129911de-148f-424f-8cf6-03145be2c694",
        id_categoria: data.id_categoria,
        stock: data.stock
      }

      await productosService.createProducto(productoData)

      showToast({
        title: "Success",
        description: "Producto creado con exito",
        variant: "success",
      })

      // Resetear formulario y las imagenes
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

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  }: DropzoneState = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
    maxSize: 10_000_000,
  });

  const getDropzoneClassName = (): string => {
    const baseClasses = "mt-4 flex dark:text-gray-400 text-gray-600 flex-col justify-center items-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-100/25 px-6 py-10 transition-colors duration-500"
    
    if (isDragReject) {
      return `${baseClasses} border-red-500 bg-red-500/10 text-red-500`
    }
    if (isDragAccept) {
      return `${baseClasses} border-green-500 bg-green-500/10 text-green-500`
    }
    if (isFocused) {
      return `${baseClasses} border-neutral-500 bg-neutral-500/10 text-neutral-500`
    }
    return baseClasses
  }

  return (
    <>
      <div className="min-h-screen xl:mx-36 2xl:mx-44 flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
        <div className=" mt-6 flex flex-col w-full md:w-1/2 justify-center items-center">
          <div>
            <h2 className="text-2xl text-center font-bold text-gray-800 mb-2">
              Subir Imagenes
            </h2>
            <Label
              htmlFor="cover-photo"
              className="block font-medium dark:text-white text-gray-900"
            >
              Arrastra y suelta tus imagenes aqui como (maximo 4)
            </Label>
          </div>
          <div
            {...getRootProps()}
            className={getDropzoneClassName()}
          >
            <input name="file" {...getInputProps()} />
            {uploadedImages.length === 0 ? (
              <>
                {isDragAccept && <p>Arrastra tus imagenes aquí</p>}
                {isDragReject && <p>Solo puede subir imagenes</p>}
                {!isDragActive && (
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-neutral-400 dark:text-neutral-600"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md  font-semibold text-custom-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-custom-blue focus-within:ring-offset-2 hover:text-custom-blue"
                      >
                        <span>Subir un archivo</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG hasta 10MB (maximo 4 imagenes)
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p>
                Arrastra mas imagenes o dale click ({4 - uploadedImages.length}{" "}
                restantes)
              </p>
            )}
          </div>

          {/* Vista previa de las imagenes*/}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {imageUrls.map((url, index) => (
              <div key={url} className="relative">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  width={160}
                  height={160}
                  className="h-40 w-40 object-cover rounded-lg border-2 border-blue-500/50"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  aria-label="Remove image"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full md:w-1/2 justify-center items-center">
          <div className="max-w-md w-full p-8">
            <h2 className="text-2xl text-center font-bold text-gray-800 mb-2">
              Publicar Producto
            </h2>

            <div className="text-center mb-6">
              <span className="text-sm text-gray-600">
                Agrega los detalles del producto{" "}
              </span>
            </div>

            {/* Formulario */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label
                  htmlFor="cover-photo"
                  className="block font-mediumtext-gray-900"
                >
                  Nombre del Producto
                </Label>
                <Input
                  type="text"
                  id="producto"
                  placeholder="Nombre del producto"
                  {...register('producto')}
                  className={`mt-1 block w-full ${errors.producto ? 'border-red-500' : ''}`}
                />
                {errors.producto && (
                  <p className="text-red-500 text-sm mt-1">{errors.producto.message}</p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="cover-photo"
                  className="block font-mediumtext-gray-900"
                >
                  Precio
                </Label>
                <Input
                  type="number"
                  id="precio"
                  placeholder="Precio"
                  {...register('precio', { valueAsNumber: true })}
                  min="0"
                  step="0.01"
                  className={`mt-1 block w-full ${errors.precio ? 'border-red-500' : ''}`}
                />
                {errors.precio && (
                  <p className="text-red-500 text-sm mt-1">{errors.precio.message}</p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="cover-photo"
                  className="block font-mediumtext-gray-900"
                >
                  Cantidad
                </Label>
                <Input
                  type="text"
                  id="stock"
                  placeholder="Cantidad"
                  {...register('stock', { valueAsNumber: true })}
                  min="0"
                  step="0.01"
                  className={`mt-1 block w-full ${errors.stock ? 'border-red-500' : ''}`}
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
                )}
              </div>      
              <div>
              <Controller
                name="estado_producto"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className={`w-full ${errors.estado_producto ? 'border-red-500' : ''} focus:ring-custom-blue`}>
                      <SelectValue placeholder="Estado del producto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nuevo">Nuevo</SelectItem>
                      <SelectItem value="Usado">Usado</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.estado_producto && (
                <p className="text-red-500 text-sm mt-1">{errors.estado_producto.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="id_categoria"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full focus:ring-custom-blue">
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorías</SelectLabel>
                        {categorias.map((categoria) => (
                          <SelectItem 
                            key={categoria.id} 
                            value={categoria.id}
                          >
                            {categoria.nombre}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.id_categoria && (
                <p className="text-red-500 text-sm mt-1">{errors.id_categoria.message}</p>
              )}
            </div>
              <div>
                <textarea
                  id="descripcion"
                  placeholder="Descripcion"
                  {...register('descripcion')}
                  className={`mt-1 block w-full min-h-40 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-blue ${
                    errors.descripcion ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.descripcion && (
                  <p className="text-red-500 text-sm mt-1">{errors.descripcion.message}</p>
                )}
              </div>    
              {/* <Button
                type="submit"
                // disabled={isLoading || uploadedImages.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? "Publicando..." : "Publicar"}
              </Button> */}
              <Button
                type="submit"
                disabled={isLoading || uploadedImages.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-50 mr-2"></span>
                    Publicando...
                  </>
                ) : (
                  "Publicar"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
