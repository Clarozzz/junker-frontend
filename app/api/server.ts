'use server'

import { createClient } from "@/utils/supabase/server"

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