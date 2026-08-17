import Link from "next/link"
import { Mail, Phone, UserRound } from "lucide-react"
import { BrandMark } from "@/components/brand-mark"
import { MobileSiteNav } from "@/components/mobile-site-nav"
import { Button } from "@/components/ui/button"
import { getCurrentUser, roleHome } from "@/lib/auth"

const nav = [
  ["Produtos", "/catalogo"],
  ["A PGM", "/empresa"],
  ["Representantes", "/representantes"],
  ["Contato", "/contato"],
]

export async function SiteHeader() {
  const user = await getCurrentUser()
  return <>
    <div className="border-b border-sky-200 bg-white text-[var(--brand-navy)]">
      <div className="container-wide flex min-h-10 items-center justify-between gap-4 py-2 text-xs font-medium">
        <a href="mailto:ozielvasconscelos2014@gmail.com" className="hidden items-center gap-2 hover:text-primary md:flex"><Mail className="size-4" /> ozielvasconscelos2014@gmail.com</a>
        <span className="font-semibold uppercase tracking-[.13em]">Direto da fábrica em Paragominas-PA</span>
        <a href="tel:+5591993428963" className="flex items-center gap-2 whitespace-nowrap font-bold hover:text-primary"><Phone className="size-4" /> (91) 99342-8963</a>
      </div>
    </div>
    <header className="sticky top-0 z-40 border-b-4 border-primary bg-white/95 backdrop-blur">
      <div className="container-wide flex h-[82px] items-center justify-between gap-4">
        <BrandMark />
        <nav className="hidden items-center gap-7 lg:flex">{nav.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-slate-700 transition-colors hover:text-primary">{label}</Link>)}</nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden sm:inline-flex"><Link href={user ? roleHome(user.role) : "/login"}><UserRound />{user ? "Minha área" : "Entrar"}</Link></Button>
          <Button asChild className="hidden md:inline-flex"><Link href="/catalogo#orcamento">Solicitar orçamento</Link></Button>
          <MobileSiteNav/>
        </div>
      </div>
    </header>
  </>
}
