"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Tag } from "lucide-react";
import { asignarRol, getRoles } from "@/app/api/administradores";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { useEffect, useState } from "react";

const validationSchema = z.object({
  id_rol: z.string().min(1, { message: "Debe seleccionar un rol" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export function AdministradorRolEspecializacion({
  usuario,
}: {
  usuario: UsuarioVista;
}) {
  const [roles, setRoles] = useState<Roles[]>([]);
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    // register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      id_rol: "",
    },
  });

  const onSubmit = async (data: ValidationSchema): Promise<void> => {
    try {
      setIsLoading(true);

      const RolData = {
        id_rol: data.id_rol || "",
        id_usuario: usuario.id,
      };

      await asignarRol(RolData);

      showToast({
        title: "Éxito",
        description: "Producto creado con éxito",
        variant: "success",
      });

      reset();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al publicar el producto";
      showToast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error al obtener las categorias:", error);
      }
    };

    obtenerCategorias();
  }, []);

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <div>
            <Label
              htmlFor="id_rol"
              className="text-sm font-medium text-gray-700 flex items-center pb-2"
            >
              <Tag className="w-4 h-4 mr-2" />
              Roles
            </Label>
            <Controller
              name="id_rol"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={`mt-1 ${errors.id_rol ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Seleccionar un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((rol) => (
                      <SelectItem key={rol.id} value={rol.id}>
                        {rol.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.id_rol && (
              <p className="mt-1 text-sm text-red-600">
                {errors.id_rol.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full max-w-64 bg-green-600 hover:bg-green-700 text-white text-lg font-normal py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Asignando...
              </>
            ) : (
              "Asignar Rol"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
