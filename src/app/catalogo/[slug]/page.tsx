import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2, Clock3, Download, FileText, PackageCheck, ShieldCheck } from "lucide-react"
import { ProductVisual } from "@/components/product-visual"
import { QuoteForm } from "@/components/quote-form"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

function rows(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value) ? Object.entries(value as Record<string, unknown>) : []
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, documents: { where: { isPublic: true } } },
  })

  if (!product || product.status !== "ACTIVE") notFound()

  const specs = rows(product.techSpecs)
  const dimensions = rows(product.dimensions)

  return <>
    <SiteHeader />
    <main className="bg-white">
      <section className="container-wide py-7 sm:py-10">
        <Button asChild variant="ghost" className="mb-5 -ml-3 text-slate-600"><Link href="/catalogo"><ArrowLeft />Voltar ao catálogo</Link></Button>
        <div className="grid gap-9 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          <ProductVisual name={product.name} sku={product.sku} imageSrc={product.heroImage} priority fit="contain" showSku={false} className="min-h-[390px] rounded-none border-slate-200 bg-white lg:min-h-[530px]" />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-primary">{product.category.name}</p>
            <h1 className="mt-2 text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">{product.name}</h1>
            <div className="mt-4 h-1 w-16 bg-primary" />
            <p className="mt-5 text-base leading-7 text-slate-600">{product.shortDescription}</p>

            <div className="mt-7 grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-3">
              <div className="bg-white p-4"><PackageCheck className="size-5 text-primary" /><p className="mt-3 text-xs text-slate-500">Disponibilidade</p><p className="text-sm font-bold text-slate-900">{product.stockStatus}</p></div>
              <div className="bg-white p-4"><Clock3 className="size-5 text-primary" /><p className="mt-3 text-xs text-slate-500">Prazo estimado</p><p className="text-sm font-bold text-slate-900">{product.leadTimeDays ? `${product.leadTimeDays} dias` : "Consulte"}</p></div>
              <div className="bg-white p-4"><ShieldCheck className="size-5 text-primary" /><p className="mt-3 text-xs text-slate-500">Garantia</p><p className="text-sm font-bold text-slate-900">{product.warrantyMonths ? `${product.warrantyMonths} meses` : "Consulte"}</p></div>
            </div>

            <div className="mt-7 border border-slate-200 bg-[#fafafa] p-6">
              <p className="text-sm text-slate-500">Condição comercial</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-950">{product.priceOnRequest ? "Preço sob consulta" : "Consulte sua tabela"}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">Valores podem variar conforme quantidade, região, frete e condição negociada.</p>
              <Button asChild size="lg" className="mt-5 w-full rounded-none"><a href="#solicitar">Solicitar cotação deste equipamento</a></Button>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_.72fr]">
          <div className="space-y-9">
            <section>
              <h2 className="text-2xl font-normal text-slate-950">Descrição do produto</h2>
              <div className="mt-3 h-1 w-12 bg-primary" />
              <p className="mt-5 whitespace-pre-line leading-8 text-slate-700">{product.description}</p>
            </section>
            <Separator />
            <section>
              <h2 className="text-2xl font-normal text-slate-950">Especificações técnicas</h2>
              <div className="mt-5 overflow-hidden border border-slate-200 bg-white">
                {specs.length > 0 ? specs.map(([key, value], index) => <div key={key} className={`grid grid-cols-[.85fr_1.15fr] gap-4 px-5 py-3.5 text-sm ${index ? "border-t border-slate-200" : ""}`}><span className="font-medium text-slate-500">{key}</span><strong>{String(value)}</strong></div>) : <p className="p-5 text-sm text-slate-500">Especificações sob consulta.</p>}
              </div>
            </section>
            {dimensions.length > 0 ? <><Separator /><section><h2 className="text-2xl font-normal text-slate-950">Dimensões e construção</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{dimensions.map(([key, value]) => <div key={key} className="border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">{key}</p><p className="mt-1 font-bold">{String(value)}</p></div>)}</div></section></> : null}
          </div>

          <aside>
            <Card className="sticky top-28 rounded-none border-slate-200 shadow-sm">
              <CardHeader><CardTitle className="text-xl font-normal">Documentação</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {product.documents.length > 0 ? product.documents.map((document) => <a key={document.id} href={document.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 border border-slate-200 p-3 transition hover:border-primary hover:bg-slate-50"><span className="grid size-9 place-items-center bg-primary/10 text-primary"><FileText className="size-4" /></span><span className="min-w-0 flex-1"><strong className="block truncate text-sm">{document.title}</strong><span className="text-xs text-slate-500">{document.type}{document.version ? ` • ${document.version}` : ""}</span></span><Download className="size-4 text-slate-400" /></a>) : <p className="text-sm text-slate-500">Documentação disponível com o atendimento comercial.</p>}
                <div className="mt-4 bg-sky-50 p-4 text-sm leading-6 text-[var(--brand-navy)]"><CheckCircle2 className="mb-2 size-5 text-primary" />Precisa de memorial, desenho ou documento específico? Informe no orçamento.</div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      <section id="solicitar" className="bg-primary py-14 text-white sm:py-16">
        <div className="container-wide grid gap-9 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-sky-200">Cotação personalizada</p>
            <h2 className="mt-2 text-3xl font-normal">Solicite uma condição para {product.name}</h2>
            <p className="mt-4 leading-7 text-sky-100">Informe seus dados e a quantidade. A solicitação será registrada com o produto e o código corretos.</p>
          </div>
          <div className="bg-white p-6 text-foreground sm:p-8"><QuoteForm productId={product.id} productName={product.name} /></div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>
}
