"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowRightLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ConvertQuoteButton({id,enabled}:{id:string;enabled:boolean}){const router=useRouter();const[busy,setBusy]=useState(false);const[error,setError]=useState("");if(!enabled)return null;async function run(){setBusy(true);setError("");const r=await fetch(`/api/admin/quotes/${id}/convert`,{method:"POST"});const data=await r.json();setBusy(false);if(!r.ok)return setError(data.error||"Falha");router.refresh()}return <div><Button size="sm" variant="outline" disabled={busy} onClick={run}>{busy?<Loader2 className="animate-spin"/>:<ArrowRightLeft/>}Gerar pedido</Button>{error&&<p className="mt-1 text-[11px] text-destructive">{error}</p>}</div>}
