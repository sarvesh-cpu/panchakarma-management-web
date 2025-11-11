"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf } from "lucide-react"

export function PatientLoginForm() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fillDemoCredentials = () => {
    setEmail("rajesh.patient@panchakarma.com")
    setPassword("Password123")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup"
      const payload = isLogin ? { email, password } : { name, email, password, role: "patient" }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Authentication failed")
        return
      }

      sessionStorage.setItem("user", JSON.stringify(data.user))
      sessionStorage.setItem("user_id", data.user.id)

      router.push("/patient/dashboard")
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{isLogin ? "Patient Login" : "Patient Signup"}</CardTitle>
          <CardDescription>{isLogin ? "Access your therapy dashboard" : "Create your patient account"}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>
          )}

          {isLogin && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
              <p className="font-semibold text-blue-900 mb-2">Demo Credentials:</p>
              <p className="text-blue-800">Email: rajesh.patient@panchakarma.com</p>
              <p className="text-blue-800">Password: Password123</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fillDemoCredentials}
                className="mt-2 w-full bg-transparent"
              >
                Use Demo Account
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full btn-gradient text-white" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                className="p-0 ml-1 text-primary"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError("")
                }}
              >
                {isLogin ? "Sign up" : "Login"}
              </Button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
