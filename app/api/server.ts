'use server'

import { createClient } from "@/utils/supabase/server"
import { registerUser } from "./usuarios"

export const updateEmail = async (newEmail: string) => {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.updateUser({
        email: newEmail
    })

    if (error) {
        throw new Error(`${error}`)
    }

    if (!data) {
        throw new Error("Error actualizando el correo")
    }

    return { data, error }
}

export const verifyPass = async (id: string, updatePass: UpdatePassword) => {
    const supabase = await createClient()

    const { data, error } = await supabase.rpc("verify_user_password", {
        "user_id": id,
        "password": updatePass.password
    })

    if (error) {
        throw new Error(`${error}`)
    }

    if (!data) {
        throw new Error("Contraseña actual incorrecta")
    }

    if (updatePass.password == updatePass.newPassword) {
        throw new Error("La nueva contraseña debe ser diferente de la actual")
    }

    return await updatePassword(updatePass)
}

export const updatePassword = async (updatePass: UpdatePassword) => {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.updateUser({
        password: updatePass.newPassword
    })

    if (error) {
        throw new Error(`${error}`)
    }

    if (!data) {
        throw new Error("Ocurrio un error")
    }

    return data
}

export async function signIn(dataForm: { email: string; password: string; }) {
    const supabase = await createClient();
  
    const {data, error} = await supabase.auth.signInWithPassword(dataForm)
  
    if (error) {
        throw new Error(`${error}`)
    }

    if (!data) {
        throw new Error("Ocurrio un error")
    }

    return {data, error}
  }
  
  export async function signOut() {
    const supabase = await createClient();
    return await supabase.auth.signOut()
  }
  
  export async function readUser() {
    const supabase = await createClient()
    return await supabase.auth.getUser()
  }
  
  export async function readSession() {
    const supabase = await createClient()
    return await supabase.auth.getSession()
  }

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