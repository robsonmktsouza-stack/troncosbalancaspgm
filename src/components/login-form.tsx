"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, LockKeyhole, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  async function submit(formData: FormData) {
    setLoading(true); setError("")
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData.entries())) })
    const data = await response.json()
    setLoading(false)
    if (!response.ok) return setError(data.error || "Falha no acesso")
    router.push(data.redirect)
    router.refresh()
  }
  return <form action={submit} className="space-y-4">
    <div className="grid gap-2"><Label htmlFor="email">E-mail</Label><div className="relative"><Mail className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input id="email" name="email" type="email" className="pl-9" placeholder="voce@empresa.com.br" required /></div></div>
    <div className="grid gap-2"><Label htmlFor="password">Senha</Label><div className="relative"><LockKeyhole className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input id="password" name="password" type="password" className="pl-9" required /></div></div>
    {error && <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}
    <Button size="lg" className="w-full" disabled={loading}>{loading && <Loader2 className="animate-spin"/>}{loading ? "Entrando..." : "Entrar no portal"}</Button>
  </form>
}
