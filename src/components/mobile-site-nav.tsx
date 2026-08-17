"use client"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function MobileSiteNav(){const[open,setOpen]=useState(false);return <div className="lg:hidden"><Button variant="ghost" size="icon" aria-label="Abrir menu" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</Button>{open&&<div className="absolute left-0 right-0 top-full border-b-4 border-primary bg-white p-4 shadow-xl"><nav className="container-wide grid gap-1">{[["Produtos","/catalogo"],["A PGM","/empresa"],["Representantes","/representantes"],["Contato","/contato"],["Entrar no portal","/login"]].map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)} className="rounded-sm px-4 py-3 text-base font-semibold hover:bg-muted">{label}</Link>)}<Link href="/catalogo#orcamento" onClick={()=>setOpen(false)} className="mt-2 bg-primary px-4 py-3 text-center font-bold text-white">Solicitar orçamento</Link></nav></div>}</div>}
