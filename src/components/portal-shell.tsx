"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import { LogOut, Menu, PanelLeftClose } from "lucide-react"
import { useState } from "react"
import { BrandMark } from "@/components/brand-mark"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Item = { label: string; href: string; icon: LucideIcon }

export function PortalShell({ title, subtitle, userName, items, children }: { title: string; subtitle: string; userName: string; items: Item[]; children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  async function logout() { await fetch("/api/auth/logout", { method: "POST" }); router.push("/"); router.refresh() }
  return <div className="min-h-screen bg-slate-50">
    <aside className={cn("fixed inset-y-0 left-0 z-50 w-72 border-r bg-white transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-20 items-center justify-between border-b px-5"><BrandMark /><Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setOpen(false)}><PanelLeftClose /></Button></div>
      <div className="border-b px-5 py-4"><p className="text-xs font-bold uppercase tracking-wider text-primary">{title}</p><p className="mt-1 text-sm font-semibold">{userName}</p><p className="text-xs text-muted-foreground">{subtitle}</p></div>
      <nav className="space-y-1 p-3">{items.map(item => { const active = pathname === item.href || (item.href !== "/admin" && item.href !== "/cliente" && item.href !== "/representante" && pathname.startsWith(item.href)); const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-primary text-primary-foreground" : "text-slate-600 hover:bg-muted hover:text-slate-950")}><Icon className="size-4" />{item.label}</Link> })}</nav>
      <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-3"><Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={logout}><LogOut />Sair</Button></div>
    </aside>
    <div className="lg:pl-72"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/95 px-4 backdrop-blur md:px-7"><Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setOpen(true)}><Menu /></Button><div className="ml-auto flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-semibold">{userName}</p><p className="text-xs text-muted-foreground">{title}</p></div><div className="grid size-9 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">{userName.slice(0, 2).toUpperCase()}</div></div></header><main className="p-4 md:p-7 lg:p-8">{children}</main></div>
  </div>
}
