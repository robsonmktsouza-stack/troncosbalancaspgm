import { MapPin, PhoneCall, Users } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function RepresentativesPage() {
  const reps = await prisma.representative.findMany({ where: { active: true }, include: { user: true }, orderBy: { code: "asc" } })
  return <><SiteHeader/><main><section className="relative overflow-hidden border-b border-sky-200 bg-white py-16"><div className="catalog-dots absolute right-10 top-0 h-44 w-52 opacity-30"/><div className="container-wide relative"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-primary">Rede comercial</p><h1 className="font-display mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Encontre seu representante PGM</h1><div className="brand-rule mt-4"/><p className="mt-5 max-w-2xl text-slate-600">Atendimento por território para especificação, cotação e acompanhamento do pedido.</p></div></section><section className="container-wide py-12"><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{reps.map(rep => <Card key={rep.id} className="border-sky-200"><CardContent className="p-6"><div className="flex items-start justify-between"><div className="grid size-11 place-items-center bg-sky-100 text-primary"><Users/></div><span className="bg-muted px-3 py-1 font-mono text-xs">{rep.code}</span></div><h2 className="font-display mt-5 text-xl font-bold text-slate-950">{rep.user.name}</h2><p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-primary"/>{rep.region} • {rep.states.join(" / ")}</p><p className="mt-4 flex items-center gap-2 border-t border-sky-100 pt-4 text-sm"><PhoneCall className="size-4 text-primary"/>{rep.user.phone || "Contato pelo atendimento central"}</p></CardContent></Card>)}</div>{!reps.length && <div className="border border-sky-200 bg-white p-10 text-center"><h2 className="font-display text-xl font-bold">Consulte nossa equipe comercial</h2><p className="mt-2 text-muted-foreground">A rede de representantes será exibida conforme os territórios forem cadastrados.</p></div>}</section></main><SiteFooter/></>
}
