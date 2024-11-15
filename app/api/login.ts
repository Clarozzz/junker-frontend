'use server'

import { createClient } from '@/utils/supabase/server';

export async function signIn(dataForm: { email: string; password: string; }) {
  const supabase = await createClient();

  const {error} = await supabase.auth.signInWithPassword(dataForm)

  if (error) {
    return "Correo o contraseña invalidos"
  }
}

export async function signOut() {
  const supabase = await createClient();
  return await supabase.auth.signOut()
}

export async function readUser() {
  const supabase = await createClient()
  return await supabase.auth.getUser()
}
