import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { QuoteForm } from "@/components/quote-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function ContactPage() {
  const setting = await prisma.companySetting.findUnique({ where: { key: "company" } })
  const value = (setting?.value || {}) as Record<string, unknown>
  const phone = String(value.phone || "(91) 99342-8963")
  const email = String(value.email || "ozielvasconscelos2014@gmail.com")
  const city = String(value.city || "Paragominas")
  const state = String(value.state || "PA")

  return <><SiteHeader/><main>
    <section className="relative overflow-hidden border-b border-sky-200 bg-white py-16"><div className="catalog-dots absolute right-10 top-0 h-44 w-52 opacity-30"/><div className="container-wide relative"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-primary">Contato direto</p><h1 className="font-display mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Converse com a fábrica</h1><div className="brand-rule mt-4"/><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Conte o que sua propriedade precisa e receba orientação para escolher o equipamento adequado.</p></div></section>
    <section className="container-wide grid gap-12 py-14 lg:grid-cols-[.72fr_1.28fr]"><div><h2 className="font-display text-2xl font-bold text-slate-950">Canais de atendimento</h2><div className="mt-6 grid gap-3 text-sm"><a href="tel:+5591993428963" className="flex items-center gap-4 border border-sky-200 bg-white p-4 font-semibold"><span className="grid size-10 place-items-center bg-sky-100 text-primary"><Phone className="size-5"/></span>{phone}</a><a href="tel:+5591992154103" className="flex items-center gap-4 border border-sky-200 bg-white p-4 font-semibold"><span className="grid size-10 place-items-center bg-sky-100 text-primary"><Phone className="size-5"/></span>(91) 99215-4103</a><a href={`mailto:${email}`} className="flex items-center gap-4 break-all border border-sky-200 bg-white p-4 font-semibold"><span className="grid size-10 shrink-0 place-items-center bg-sky-100 text-primary"><Mail className="size-5"/></span>{email}</a><div className="flex items-center gap-4 border border-sky-200 bg-white p-4 font-semibold"><span className="grid size-10 place-items-center bg-sky-100 text-primary"><MapPin className="size-5"/></span>{city}/{state}</div></div><Button asChild size="lg" className="mt-6 w-full"><a href="https://wa.me/5591993428963" target="_blank" rel="noreferrer"><MessageCircle/>Chamar no WhatsApp</a></Button><p className="mt-5 border-l-4 border-[var(--brand-sky)] pl-4 text-sm leading-6 text-slate-600">Atendimento para conhecer equipamentos, solicitar orçamento e tirar dúvidas sobre aplicação, entrega e configuração.</p></div><Card className="border-sky-200"><CardContent className="p-6 sm:p-8"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-primary">Solicitação comercial</p><h2 className="font-display mb-6 mt-2 text-2xl font-bold text-slate-950">Envie os dados da sua necessidade</h2><QuoteForm/></CardContent></Card></section>
  </main><SiteFooter/></>
}
