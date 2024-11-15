'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CircleCheck } from 'lucide-react'

export default function ResetPassword() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = hashParams.get('access_token')
    const refreshToken = hashParams.get('refresh_token')

    if (accessToken && refreshToken) {
      Cookies.set('access_token', accessToken, { expires: 7 })
      Cookies.set('refresh_token', refreshToken, { expires: 7 })
    } else {
      console.warn("No se encontraron tokens en el hash de la URL")
    }
  }, [])

  const handlePasswordReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setIsLoading(true)

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    if (!accessToken || !refreshToken) {
      setError("Tokens de autenticación no encontrados. Por favor, intente el enlace de restablecimiento de contraseña de nuevo.")
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/new-reset`, {
        new_password: newPassword,
        access_token: accessToken,
        refresh_token: refreshToken
      })

      setMessage(response.data.message)
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.detail || "Error al actualizar la contraseña")
      } else {
        setError("Ocurrió un error inesperado")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className='text-3xl'>Restablecer Contraseña</CardTitle>
          <CardDescription>Ingresa tu nueva contraseña para actualizar tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent className='pb-0'>
          <form onSubmit={handlePasswordReset}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Ingrese su nueva contraseña"
                  minLength={8}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full mt-4 bg-custom-blue hover:bg-blue-900  transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-loader-circle animate-spin mr-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                  Actualizando...
                </>
              ) : (
                "Actualizar contraseña"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {message && (
              <Alert className="mt-4 border-green-500 text-green-600">
                <CircleCheck className="h-4 w-4" color='#22c55e' />
                <AlertTitle>Hecho</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive" className='mt-4'>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
        </CardFooter>
      </Card>
    </div>
  )
}