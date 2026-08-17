"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
const options=["PENDING","CONFIRMED","IN_PRODUCTION","READY_TO_SHIP","SHIPPED","DELIVERED","CANCELLED"]
const labels:Record<string,string>={PENDING:"Pendente",CONFIRMED:"Confirmado",IN_PRODUCTION:"Em produção",READY_TO_SHIP:"Pronto p/ expedição",SHIPPED:"Enviado",DELIVERED:"Entregue",CANCELLED:"Cancelado"}
export function OrderStatusControl({id,status}:{id:string;status:string}){const router=useRouter();const[busy,setBusy]=useState(false);async function change(next:string){setBusy(true);await fetch(`/api/admin/orders/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:next})});setBusy(false);router.refresh()}return <div className="flex items-center gap-2">{busy&&<Loader2 className="size-4 animate-spin"/>}<select disabled={busy} value={status} onChange={e=>change(e.target.value)} className="h-9 rounded-lg border bg-white px-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-ring">{options.map(o=><option key={o} value={o}>{labels[o]}</option>)}</select></div>}
