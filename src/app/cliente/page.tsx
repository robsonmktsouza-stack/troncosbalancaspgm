import Link from "next/link"
import { FileText, PackageCheck, ReceiptText, WalletCards } from "lucide-react"
import { requireRole } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import { dateBR, money } from "@/lib/format"

export const dynamic = "force-dynamic"

export default async function CustomerDashboard() {
  const user = await requireRole(["CUSTOMER"])
  if (!user.customer) return <PageHeader title="Conta sem empresa vinculada" description="Solicite à equipe administrativa o vínculo desta conta."/>
  const customerId = user.customer.id
  const [quotes, orders, docs] = await Promise.all([
    prisma.quote.findMany({ where: { customerId }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.order.findMany({ where: { customerId }, include: { items: true }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.customerDocument.count({ where: { customerId } }),
  ])
  const openQuotes = quotes.filter(q => !["REJECTED","EXPIRED","CONVERTED"].includes(q.status)).length
  const openOrders = orders.filter(o => !["DELIVERED","CANCELLED"].includes(o.status)).length
  const inOrders = orders.reduce((a,o) => a + Number(o.total), 0)
  return <><PageHeader eyebrow="Portal do cliente" title={`Olá, ${user.name.split(" ")[0]}`} description="Acompanhe o relacionamento comercial da sua empresa com a PGM."/><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Orçamentos abertos" value={String(openQuotes)} icon={ReceiptText}/><StatCard label="Pedidos em andamento" value={String(openOrders)} icon={PackageCheck}/><StatCard label="Volume recente" value={money(inOrders)} icon={WalletCards}/><StatCard label="Documentos" value={String(docs)} icon={FileText}/></div><div className="mt-7 grid gap-6 xl:grid-cols-2"><Card><CardHeader className="flex-row items-center justify-between"><CardTitle>Últimos orçamentos</CardTitle><Link href="/cliente/orcamentos" className="text-sm font-semibold text-primary">Ver todos</Link></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Número</TableHead><TableHead>Status</TableHead><TableHead>Total</TableHead></TableRow></TableHeader><TableBody>{quotes.map(q => <TableRow key={q.id}><TableCell><strong>{q.number}</strong><div className="text-xs text-muted-foreground">{dateBR(q.createdAt)}</div></TableCell><TableCell><StatusBadge status={q.status}/></TableCell><TableCell className="font-semibold">{money(q.total)}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card><Card><CardHeader className="flex-row items-center justify-between"><CardTitle>Últimos pedidos</CardTitle><Link href="/cliente/pedidos" className="text-sm font-semibold text-primary">Ver todos</Link></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Pedido</TableHead><TableHead>Status</TableHead><TableHead>Total</TableHead></TableRow></TableHeader><TableBody>{orders.map(o => <TableRow key={o.id}><TableCell><strong>{o.number}</strong><div className="text-xs text-muted-foreground">{dateBR(o.createdAt)}</div></TableCell><TableCell><StatusBadge status={o.status}/></TableCell><TableCell className="font-semibold">{money(o.total)}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card></div></>
}
