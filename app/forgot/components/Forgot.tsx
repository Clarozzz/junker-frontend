'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CircleCheck } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword = async () => {
    setError(null)
    setMessage(null)
    setIsLoading(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot`, { email })
      setMessage(response.data.message)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.detail || "Error sending reset email")
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className='text-3xl'>Restablecer contraseña</CardTitle>
          <CardDescription>
            Ingresa tu email para recibir instrucciones de restablecimiento.
            <br />
            Puedes solicitar un nuevo correo cada:
            <span className='text-custom-blue2 font-bold'> 60 segundos</span></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className='w-full'>
            <Button
              className="w-full bg-custom-blue hover:bg-blue-900  transition-all duration-200"
              onClick={handleForgotPassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-loader-circle animate-spin mr-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                  Enviando...
                </>
              ) : (
                "Enviar correo de reestablecimiento"
              )}
            </Button>
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
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}