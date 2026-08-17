import Link from "next/link"
import { LayoutGrid, MessageCircle, Phone, Search, UserRound } from "lucide-react"
import { BrandMark } from "@/components/brand-mark"
import { MobileSiteNav } from "@/components/mobile-site-nav"
import { getCurrentUser, roleHome } from "@/lib/auth"

const nav = [
  ["Produtos", "/catalogo"],
  ["A PGM", "/empresa"],
  ["Representantes", "/representantes"],
  ["Contato", "/contato"],
]

export async function SiteHeader() {
  const user = await getCurrentUser()
  return <header className="relative z-40 border-b border-slate-200 bg-white shadow-sm">
    <div className="container-wide flex min-h-[92px] items-center justify-between gap-5 py-3">
      <BrandMark />
      <form action="/catalogo" className="hidden h-11 w-full max-w-md items-center border border-slate-300 bg-white md:flex">
        <input type="search" name="q" aria-label="Buscar produtos" placeholder="Nome do produto" className="h-full min-w-0 flex-1 border-0 px-4 text-sm outline-none placeholder:text-slate-400" />
        <button type="submit" aria-label="Buscar" className="grid h-full w-12 place-items-center bg-primary text-white transition hover:bg-blue-800"><Search className="size-5" /></button>
      </form>
      <div className="flex items-center gap-1 sm:gap-2">
        <a href="tel:+5591993428963" aria-label="Ligar para a PGM" className="hidden size-10 place-items-center text-primary transition hover:bg-sky-50 sm:grid"><Phone className="size-5" /></a>
        <a href="https://wa.me/5591993428963" target="_blank" rel="noreferrer" aria-label="Atendimento pelo WhatsApp" className="hidden size-10 place-items-center text-primary transition hover:bg-sky-50 sm:grid"><MessageCircle className="size-5" /></a>
        <Link href={user ? roleHome(user.role) : "/login"} aria-label={user ? "Acessar minha área" : "Entrar no portal"} className="grid size-10 place-items-center text-primary transition hover:bg-sky-50"><UserRound className="size-5" /></Link>
        <MobileSiteNav />
      </div>
    </div>
    <div className="container-wide pb-3 md:hidden"><form action="/catalogo" className="flex h-10 border border-slate-300"><input type="search" name="q" aria-label="Buscar produtos" placeholder="Buscar no catálogo" className="min-w-0 flex-1 px-3 text-sm outline-none"/><button type="submit" aria-label="Buscar" className="grid w-11 place-items-center bg-primary text-white"><Search className="size-4"/></button></form></div>
    <div className="border-t border-slate-200">
      <div className="container-wide hidden min-h-12 items-stretch lg:flex">
        <Link href="/catalogo" className="flex min-w-[225px] items-center justify-center gap-2 bg-primary px-5 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-blue-800"><LayoutGrid className="size-4"/>Todas as categorias</Link>
        <nav className="flex flex-1 items-stretch justify-around">{nav.map(([label, href]) => <Link key={href} href={href} className="flex items-center px-5 text-xs font-extrabold uppercase tracking-wide text-slate-700 transition-colors hover:text-primary">{label}</Link>)}<Link href="/catalogo#orcamento" className="flex items-center px-5 text-xs font-extrabold uppercase tracking-wide text-slate-700 transition-colors hover:text-primary">Orçamento</Link></nav>
      </div>
    </div>
  </header>
}
