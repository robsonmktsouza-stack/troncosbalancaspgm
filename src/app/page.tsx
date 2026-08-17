import Image from "next/image"
import Link from "next/link"
import { FileText, MessageCircle, ShieldCheck, Truck, UserRound, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { HomeHeroSlider } from "@/components/home-hero-slider"
import { HomeMotion } from "@/components/home-motion"
import { ProductCard } from "@/components/product-card"
import { ScrollProductJourney } from "@/components/scroll-product-journey"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

const categoryImages: Record<string, string> = {
  "troncos-de-contencao": "/images/products/tronco-americano-contencao.webp",
  "balancas-pecuarias": "/images/products/balanca-mecanica-1500.webp",
  "bretes-e-corredores": "/images/products/gradil-balanca-eletronica.webp",
  "porteiras-e-acessorios": "/images/products/porteira-tubular.webp",
  "pecas-e-eletronica": "/images/products/indicador-eletronico.webp",
}

const infoCards: Array<{ icon: LucideIcon; title: string; text: string; href: string }> = [
  { icon: ShieldCheck, title: "Equipamentos reforçados", text: "Conheça os materiais, acabamentos e soluções pensadas para dar mais segurança ao manejo.", href: "/empresa" },
  { icon: FileText, title: "Catálogo técnico", text: "Consulte fotos reais, especificações e detalhes dos produtos fabricados pela PGM.", href: "/catalogo" },
  { icon: MessageCircle, title: "Atendimento da fábrica", text: "Converse com a equipe, explique sua estrutura e solicite uma orientação comercial.", href: "/contato" },
]

const serviceHighlights: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Wrench, title: "Fabricação própria", text: "Controle em cada etapa" },
  { icon: ShieldCheck, title: "Manejo seguro", text: "Estruturas firmes e confiáveis" },
  { icon: Truck, title: "Atendimento direto", text: "Paragominas e região" },
]

type ShowcaseProduct = {
  id: string
  name: string
  slug: string
  sku: string
  shortDescription: string
  stockStatus: string
  heroImage: string | null
  category: { name: string }
}

function ProductShowcase({ title, products }: { title: string; products: ShowcaseProduct[] }) {
  if (products.length === 0) return null
  return <section className="container-wide py-12 sm:py-16">
    <div data-reveal><h2 className="text-center text-2xl font-normal tracking-tight text-slate-950 sm:text-3xl">{title}</h2><div className="mx-auto mt-3 h-1 w-16 bg-primary" /></div>
    <div className="motion-stagger mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <div key={product.id} data-reveal className="h-full"><ProductCard product={product} /></div>)}</div>
  </section>
}

export default async function Home() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ where: { status: "ACTIVE" }, include: { category: true }, orderBy: [{ featured: "desc" }, { name: "asc" }], take: 8 }),
    prisma.category.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, take: 5 }),
  ])

  const featured = products.slice(0, 4)
  const moreProducts = products.slice(4, 8)

  return <><SiteHeader /><main className="bg-white">
    <HomeMotion />
    <section className="container-wide pt-3 sm:pt-4"><HomeHeroSlider /></section>

    <section className="container-wide border-b border-slate-200 py-7">
      <div data-reveal className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-8">
        <p className="text-lg font-extrabold text-slate-950 sm:text-xl">Deseja atendimento e condições direto da fábrica?</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/login" className="inline-flex min-h-10 min-w-44 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-blue-800"><UserRound className="size-4" />Entrar no portal</Link>
          <Link href="/contato" className="inline-flex min-h-10 min-w-44 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-blue-800">Solicitar cadastro</Link>
        </div>
      </div>
    </section>

    <section className="container-wide py-11">
      <p data-reveal className="text-center text-xs font-extrabold uppercase tracking-[.18em] text-slate-400">Categorias de produtos</p>
      <div className="motion-stagger mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{categories.map((category) => <Link data-reveal key={category.id} href={`/catalogo?categoria=${category.slug}`} className="group flex min-h-40 flex-col items-center justify-end px-2 py-3 text-center">
        <div className="relative h-24 w-full"><Image src={categoryImages[category.slug] ?? "/images/products/tronco-americano-contencao.webp"} alt={category.name} fill sizes="(max-width: 640px) 50vw, 220px" className="object-contain transition duration-300 group-hover:scale-105" /></div>
        <h2 className="mt-3 max-w-40 text-xs font-extrabold leading-4 text-slate-800 transition group-hover:text-primary">{category.name}</h2>
      </Link>)}</div>
    </section>

    <ScrollProductJourney />

    <ProductShowcase title="Conheça nossos destaques" products={featured} />

    <section className="container-wide pb-4">
      <div className="relative min-h-[280px] overflow-hidden bg-slate-950">
        <Image src="/images/campo-gado.webp" alt="Soluções PGM para manejo pecuário" fill sizes="(max-width: 1180px) 100vw, 1180px" className="pgm-parallax-image object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent" />
        <div data-reveal="left" className="relative z-10 flex min-h-[280px] max-w-2xl flex-col items-start justify-center px-8 py-10 text-white sm:px-14">
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-sky-300">Fabricação própria em Paragominas-PA</p>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Força, segurança e praticidade para o seu curral.</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200">Equipamentos feitos para o trabalho pesado, com configuração adequada à realidade de cada propriedade.</p>
          <Link href="/empresa" className="mt-6 bg-primary px-7 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-blue-700">Conheça a PGM</Link>
        </div>
      </div>
    </section>

    <ProductShowcase title="Mais soluções para sua propriedade" products={moreProducts} />

    <section className="border-t border-slate-200 bg-[#fafafa] py-14">
      <div className="container-wide">
        <h2 data-reveal className="text-center text-2xl font-normal text-slate-950 sm:text-3xl">Conheça e tire suas dúvidas</h2>
        <div className="motion-stagger mt-9 grid gap-5 md:grid-cols-3">{infoCards.map(({ icon: Icon, title, text, href }) => <Link data-reveal key={title} href={href} className="group border border-slate-200 bg-white p-7 transition hover:border-primary/30 hover:shadow-md"><Icon className="size-8 text-primary" /><h3 className="mt-5 text-lg font-extrabold text-slate-950 group-hover:text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p><span className="mt-5 inline-block text-sm font-medium text-primary">Saiba mais</span></Link>)}</div>
        <div data-reveal className="mt-10 grid gap-px bg-slate-200 sm:grid-cols-3">{serviceHighlights.map(({ icon: Icon, title, text }) => <div key={title} className="flex items-center gap-4 bg-white px-6 py-5"><Icon className="size-7 shrink-0 text-primary" /><div><strong className="block text-sm text-slate-950">{title}</strong><span className="text-xs text-slate-500">{text}</span></div></div>)}</div>
      </div>
    </section>
  </main>
  <a href="https://wa.me/5591993428963" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-500 px-5 text-sm font-bold text-white shadow-[0_6px_24px_rgba(16,185,129,.35)] transition hover:-translate-y-0.5 hover:bg-emerald-600"><MessageCircle className="size-5"/>Atendimento</a>
  <SiteFooter /></>
}
