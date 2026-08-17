"use client"

import { useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function QuoteForm({ productId, productName }: { productId?: string; productName?: string }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit(formData: FormData) {
    setLoading(true); setError(null)
    const payload = Object.fromEntries(formData.entries())
    const response = await fetch("/api/quotes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, productId }) })
    const data = await response.json()
    setLoading(false)
    if (!response.ok) return setError(data.error || "Não foi possível enviar sua solicitação.")
    setSuccess(data.number)
  }

  if (success) return <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6"><CheckCircle2 className="size-8 text-emerald-600" /><h3 className="mt-3 text-lg font-bold">Solicitação recebida</h3><p className="mt-1 text-sm text-emerald-900">Seu orçamento <strong>{success}</strong> foi criado. Nossa equipe comercial seguirá com a análise.</p></div>

  return <form action={submit} className="grid gap-4">
    {productName && <div className="rounded-lg bg-muted p-3 text-sm"><span className="text-muted-foreground">Produto:</span> <strong>{productName}</strong></div>}
    <div className="grid gap-4 sm:grid-cols-2"><div className="grid gap-2"><Label htmlFor="name">Nome / responsável</Label><Input id="name" name="name" required /></div><div className="grid gap-2"><Label htmlFor="company">Empresa / fazenda</Label><Input id="company" name="company" required /></div></div>
    <div className="grid gap-4 sm:grid-cols-2"><div className="grid gap-2"><Label htmlFor="document">CNPJ / CPF</Label><Input id="document" name="document" /></div><div className="grid gap-2"><Label htmlFor="phone">WhatsApp</Label><Input id="phone" name="phone" required /></div></div>
    <div className="grid gap-4 sm:grid-cols-2"><div className="grid gap-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" name="email" required /></div><div className="grid grid-cols-2 gap-2"><div className="grid gap-2"><Label htmlFor="city">Cidade</Label><Input id="city" name="city" required /></div><div className="grid gap-2"><Label htmlFor="state">UF</Label><Input id="state" name="state" maxLength={2} required /></div></div></div>
    <div className="grid gap-2"><Label htmlFor="quantity">Quantidade</Label><Input id="quantity" name="quantity" type="number" min="1" step="1" defaultValue="1" /></div>
    <div className="grid gap-2"><Label htmlFor="notes">Necessidade / observações</Label><Textarea id="notes" name="notes" placeholder="Conte um pouco sobre a estrutura, prazo, município de entrega ou equipamentos de interesse." /></div>
    {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    <Button size="lg" disabled={loading}>{loading && <Loader2 className="animate-spin" />}{loading ? "Enviando..." : "Solicitar orçamento"}</Button>
    <p className="text-xs text-muted-foreground">Ao enviar, você autoriza contato comercial da PGM sobre esta solicitação.</p>
  </form>
}
