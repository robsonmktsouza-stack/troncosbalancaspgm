"use client"
import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SettingsForm({initial}:{initial:{companyName:string;email:string;phone:string;whatsapp:string}}){const[busy,setBusy]=useState(false);const[saved,setSaved]=useState(false);async function submit(fd:FormData){setBusy(true);setSaved(false);await fetch("/api/admin/settings",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(fd.entries()))});setBusy(false);setSaved(true)}return <form action={submit} className="grid gap-5 md:grid-cols-2"><div className="grid gap-2 md:col-span-2"><Label>Nome comercial</Label><Input name="companyName" defaultValue={initial.companyName}/></div><div className="grid gap-2"><Label>E-mail comercial</Label><Input name="email" type="email" defaultValue={initial.email}/></div><div className="grid gap-2"><Label>Telefone</Label><Input name="phone" defaultValue={initial.phone}/></div><div className="grid gap-2"><Label>WhatsApp</Label><Input name="whatsapp" defaultValue={initial.whatsapp}/></div><div className="md:col-span-2 flex items-center gap-3"><Button disabled={busy}>{busy?<Loader2 className="animate-spin"/>:<Check/>}Salvar configurações</Button>{saved&&<span className="text-sm font-medium text-emerald-700">Configurações salvas.</span>}</div></form>}
