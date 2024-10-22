'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { type DropzoneState, useDropzone } from "react-dropzone";
import { useRef } from "react";

export default function PublicarClient() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
  
  };
  const onDrop = async (acceptedFiles: File[]) => {
    // Verifica que se haya seleccionado al menos un archivo
    console.log("Archivo seleccionado: ", acceptedFiles[0]);
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
    acceptedFiles,
  }: DropzoneState = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
    maxSize: 10000000,
  });

  const focusedClass =
    "border-neutral-500 bg-neutral-500/10 text-neutral-500 dark:border-neutral-500 dark:bg-neutral-500/10 dark:text-neutral-500";
  const acceptClass =
    "border-green-500 bg-green-500/10 text-green-500 dark:border-green-500 dark:bg-green-500/10 dark:text-green-500";
  const rejectClass =
    "border-red-500 bg-red-500/10 text-red-500 dark:border-red-500 dark:bg-red-500/10 dark:text-red-500";

  // Utiliza una función para determinar qué clase aplicar
  const getClassName = () => {
    if (isDragReject) return rejectClass;
    if (isDragAccept) return acceptClass;
    if (isFocused) return focusedClass;
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
        <div className="flex flex-col w-full md:w-1/2 justify-center items-center">
          <div>
            <h2 className="text-2xl text-center font-bold text-gray-800 mb-2">
              Subir Imagenes
            </h2>
            <Label
              htmlFor="cover-photo"
              className="block font-medium dark:text-white text-gray-900"
            >
              Arrastra y suelta tus imagenes aqui
            </Label>
          </div>
          <div
            {...getRootProps()}
            className={`mt-4 flex dark:text-gray-400 text-gray-600 flex-col justify-center items-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-100/25 px-6 py-10 transition-colors duration-500 ${getClassName()}`}
          >
            <input name="file" {...getInputProps()} />
            {acceptedFiles.length > 0 ? (
              <p>Imagen seleccionada: {acceptedFiles[0].name}</p>
            ) : (
              <>
                {isDragAccept && <p>Suelta la imagen</p>}
                {isDragReject && <p>Solo se permiten imágenes</p>}
                {!isDragActive && (
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-neutral-400 dark:text-neutral-600"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md  font-semibold text-sec focus-within:outline-none focus-within:ring-2 focus-within:ring-sec focus-within:ring-offset-2 hover:text-sec"
                      >
                        <span>Subir un archivo</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG hasta 10MB
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Muestra la vista previa de la imagen seleccionada */}
            {acceptedFiles.length > 0 && (
              <div className="flex justify-center">
                <img
                  src={URL.createObjectURL(acceptedFiles[0])}
                  alt=""
                  className="h-40 w-40 mt-2 mx-auto rounded-full aspect-square object-cover border-4 border-blue-500/50"
                />
              </div>
            )}
          </div>
          <div className="mt-4">
            <Button
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              variant="outline"
              className="w-full bg-custom-blue text-white hover:text-white my-6 px-4 rounded-md hover:bg-blue-900 focus:outline-none"
            >
              Subir Imagen
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              className="hidden"
            />
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

            {/* Form */}
            <form className="space-y-4">
              <div>
                <Input
                  type="text"
                  id="producto"
                  placeholder="Nombre del producto"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue"
                />
              </div>
              <div>
                <Input
                  type="text"
                  id="descripcion"
                  placeholder="Descripcion"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue"
                />
              </div>
              <div>
                <Input
                  type="text"
                  id="precio"
                  placeholder="Precio"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-blue focus:border-custom-blue"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none"
              >
                Publicar
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
