"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export function ProductStatusControl({id,status,featured}:{id:string;status:string;featured:boolean}){const router=useRouter();const[busy,setBusy]=useState(false);async function patch(data:Record<string,unknown>){setBusy(true);await fetch(`/api/admin/products/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});setBusy(false);router.refresh()}return <div className="flex flex-col gap-1.5">{busy&&<Loader2 className="size-3.5 animate-spin text-muted-foreground"/>}<select value={status} disabled={busy} onChange={e=>patch({status:e.target.value})} className="h-8 rounded-md border bg-white px-2 text-xs font-semibold"><option value="ACTIVE">Ativo</option><option value="DRAFT">Rascunho</option><option value="INACTIVE">Inativo</option></select><label className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><input type="checkbox" checked={featured} disabled={busy} onChange={e=>patch({featured:e.target.checked})}/> Destaque</label></div>}
