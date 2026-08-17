import Link from "next/link"
import { Search, SlidersHorizontal } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { QuoteForm } from "@/components/quote-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"


export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ categoria?: string; q?: string }> }) {
  const params = await searchParams
  const [categories, products] = await Promise.all([
    prisma.category.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({
      where: {
        status: "ACTIVE",
        ...(params.categoria ? { category: { slug: params.categoria } } : {}),
        ...(params.q ? { OR: [{ name: { contains: params.q, mode: "insensitive" } }, { sku: { contains: params.q, mode: "insensitive" } }, { shortDescription: { contains: params.q, mode: "insensitive" } }] } : {}),
      }, include: { category: true }, orderBy: [{ featured: "desc" }, { name: "asc" }],
    }),
  ])
  return <><SiteHeader /><main><section className="relative overflow-hidden border-b border-sky-200 bg-white py-16"><div className="catalog-dots absolute right-8 top-0 h-40 w-48 opacity-30"/><div className="container-wide relative"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-primary">Catálogo técnico</p><h1 className="font-display mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Equipamentos PGM</h1><div className="brand-rule mt-4"/><p className="mt-5 max-w-2xl text-slate-600">Encontre por categoria, nome ou código. Cada produto reúne fotos reais, especificações e solicitação de orçamento.</p></div></section>
  <section className="container-wide py-10"><form className="flex flex-col gap-3 border border-sky-200 bg-white p-3 shadow-sm md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input name="q" defaultValue={params.q} placeholder="Buscar por nome, código ou aplicação..." className="pl-9" /></div>{params.categoria && <input type="hidden" name="categoria" value={params.categoria}/>}<Button><SlidersHorizontal/>Buscar</Button></form>
  <div className="mt-6 flex flex-wrap gap-2"><Link href="/catalogo" className={cn("rounded-sm border px-4 py-2 text-sm font-semibold", !params.categoria ? "border-primary bg-primary text-white" : "border-sky-200 bg-white hover:border-primary/40")}>Todos</Link>{categories.map(c => <Link key={c.id} href={`/catalogo?categoria=${c.slug}`} className={cn("rounded-sm border px-4 py-2 text-sm font-semibold", params.categoria === c.slug ? "border-primary bg-primary text-white" : "border-sky-200 bg-white hover:border-primary/40")}>{c.name}</Link>)}</div>
  <div className="mt-5 flex items-center justify-between"><p className="text-sm text-muted-foreground"><strong className="text-foreground">{products.length}</strong> produtos encontrados</p>{(params.q || params.categoria) && <Button asChild variant="ghost" size="sm"><Link href="/catalogo">Limpar filtros</Link></Button>}</div>
  {products.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map(p => <ProductCard key={p.id} product={p}/>)}</div> : <Card className="mt-6"><CardContent className="p-10 text-center"><h2 className="text-xl font-bold">Nenhum produto encontrado</h2><p className="mt-2 text-muted-foreground">Tente remover filtros ou pesquisar outro termo.</p></CardContent></Card>}
  </section>
  <section id="orcamento" className="border-y border-sky-200 bg-sky-50 py-16"><div className="container-wide grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-primary">Atendimento comercial</p><h2 className="font-display mt-2 text-3xl font-black tracking-tight text-slate-950">Não sabe qual equipamento atende melhor?</h2><div className="brand-rule-sky mt-4"/><p className="mt-5 leading-7 text-slate-600">Conte como é a estrutura da fazenda. A solicitação entra diretamente no funil comercial e segue para o atendimento da sua região.</p></div><Card className="border-sky-200"><CardContent className="p-6 sm:p-8"><QuoteForm /></CardContent></Card></div></section></main><SiteFooter/></>
}
