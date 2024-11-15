'use server'

import { createClient } from "@/utils/supabase/server";
import { registerUser } from "./usuarios";

interface RegisterData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

export const registro = async (userData: RegisterData) => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password
  })

  if (error) {
    return "Ocurrio un error durante el registro"
  }

  if (!data) {
    return "No fue posible registrar el usuario"
  }

  if (data.user) {
    try {
      await registerUser({
        id: data.user.id,
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email
      });
      return "Registro exitoso!";
    } catch (err) {
      return `Ocurrio un error ${err}`;
    }
  }

  return "Ocurrió un error inesperado";
};