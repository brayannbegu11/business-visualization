"use client"
import { Button} from '@/components/ui/button';
import { Label} from '@/components/ui/label';
import { Input} from '@/components/ui/input';
import { Card} from '@/components/ui/card';
import Link from "next/link";
import { useState } from 'react';
import { login } from '@/services/auth.service';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            await login({email, password})
            console.log('Login exitoso')
        } catch (error) {
            console.log('handleLogin',error)
        }

    }
    return (
      <div className="flex min-h-screen">
        <div className="hidden md:flex w-1/2 bg-cover bg-center" 
             style={{ backgroundImage: "url(https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}>
          <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 text-white w-full h-full">
            <h1 className="text-4xl font-bold">Bienvenido de vuelta</h1>
            <p className="mt-4 text-lg text-center">
              Ingresa a tu cuenta y gestiona tus negocios con facilidad.
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center w-full md:w-1/2 p-6 bg-gray-50">
          <Card className="w-full max-w-md p-8">
            <h2 className="mb-6 text-3xl font-semibold text-primary text-center">
              Iniciar Sesión
            </h2>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="Correo Electrónico" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value) }
                  required 
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value) }

                  required
                  className="mt-2"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full mt-4 bg-primary hover:bg-opacity-80 text-white"
              >
                Iniciar Sesión
              </Button>
              
              <p className="mt-4 text-sm text-center">
                ¿No tienes una cuenta?{" "}
                <Link href="/auth/signup" className="text-danger underline">
                  Regístrate aquí
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </div>
    );
  }