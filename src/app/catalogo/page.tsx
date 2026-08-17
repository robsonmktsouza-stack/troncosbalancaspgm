import Link from "next/link"
import { Search, SlidersHorizontal } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { QuoteForm } from "@/components/quote-form"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
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
        ...(params.q ? {
          OR: [
            { name: { contains: params.q, mode: "insensitive" } },
            { sku: { contains: params.q, mode: "insensitive" } },
            { shortDescription: { contains: params.q, mode: "insensitive" } },
          ],
        } : {}),
      },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { name: "asc" }],
    }),
  ])

  const hasFilters = Boolean(params.q || params.categoria)

  return <>
    <SiteHeader />
    <main className="bg-white">
      <section className="border-b border-slate-200 py-10 sm:py-14">
        <div className="container-wide text-center">
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-primary">Linha completa PGM</p>
          <h1 className="mt-2 text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">Catálogo de produtos</h1>
          <div className="mx-auto mt-4 h-1 w-16 bg-primary" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">Encontre equipamentos para contenção, manejo e pesagem. Consulte as especificações e solicite atendimento direto da fábrica.</p>
        </div>
      </section>

      <section className="container-wide py-9 sm:py-12">
        <form className="mx-auto flex max-w-4xl flex-col gap-2 bg-[#f7f7f7] p-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input name="q" defaultValue={params.q} placeholder="Buscar por nome, código ou aplicação..." className="h-11 rounded-none border-slate-300 bg-white pl-9" />
          </div>
          {params.categoria ? <input type="hidden" name="categoria" value={params.categoria} /> : null}
          <Button className="h-11 rounded-none px-7"><SlidersHorizontal />Buscar</Button>
        </form>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <Link href="/catalogo" className={cn("rounded-full border px-5 py-2 text-xs font-bold transition", !params.categoria ? "border-primary bg-primary text-white" : "border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary")}>Todos</Link>
          {categories.map((category) => <Link key={category.id} href={`/catalogo?categoria=${category.slug}`} className={cn("rounded-full border px-5 py-2 text-xs font-bold transition", params.categoria === category.slug ? "border-primary bg-primary text-white" : "border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary")}>{category.name}</Link>)}
        </div>

        <div className="mt-9 flex items-center justify-between border-b border-slate-200 pb-3">
          <p className="text-sm text-slate-500"><strong className="text-slate-950">{products.length}</strong> produtos encontrados</p>
          {hasFilters ? <Button asChild variant="ghost" size="sm"><Link href="/catalogo">Limpar filtros</Link></Button> : null}
        </div>

        {products.length > 0 ? <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <Card className="mt-7 rounded-none border-slate-200 shadow-none"><CardContent className="p-12 text-center"><h2 className="text-xl font-bold">Nenhum produto encontrado</h2><p className="mt-2 text-slate-500">Tente remover os filtros ou pesquisar outro termo.</p></CardContent></Card>}
      </section>

      <section id="orcamento" className="border-y border-slate-200 bg-[#fafafa] py-14 sm:py-16">
        <div className="container-wide grid gap-9 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-primary">Atendimento comercial</p>
            <h2 className="mt-2 text-3xl font-normal tracking-tight text-slate-950">Precisa de ajuda para escolher?</h2>
            <div className="mt-4 h-1 w-16 bg-primary" />
            <p className="mt-5 max-w-lg leading-7 text-slate-600">Conte como é a estrutura da fazenda. Nossa equipe orienta a escolha do equipamento e prepara uma condição adequada à sua região.</p>
          </div>
          <Card className="rounded-none border-slate-200 bg-white shadow-sm"><CardContent className="p-6 sm:p-8"><QuoteForm /></CardContent></Card>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>
}
