"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const options=["REQUESTED","IN_ANALYSIS","SENT","APPROVED","REJECTED","EXPIRED"]
const labels:Record<string,string>={REQUESTED:"Solicitado",IN_ANALYSIS:"Em análise",SENT:"Enviado",APPROVED:"Aprovado",REJECTED:"Recusado",EXPIRED:"Expirado"}
export function QuoteStatusControl({id,status}:{id:string;status:string}){const router=useRouter();const[busy,setBusy]=useState(false);async function change(next:string){setBusy(true);await fetch(`/api/admin/quotes/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:next})});setBusy(false);router.refresh()}return <div className="flex items-center gap-2">{busy&&<Loader2 className="size-4 animate-spin text-muted-foreground"/>}<select disabled={busy||status==="CONVERTED"} value={status==="CONVERTED"?"CONVERTED":status} onChange={e=>change(e.target.value)} className="h-9 rounded-lg border bg-white px-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-ring">{status==="CONVERTED"&&<option value="CONVERTED">Convertido</option>}{options.map(o=><option key={o} value={o}>{labels[o]}</option>)}</select></div>}
