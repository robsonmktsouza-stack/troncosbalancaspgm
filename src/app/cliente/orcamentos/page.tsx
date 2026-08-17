import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { dateBR, money } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function CustomerQuotes() { const user=await requireRole(["CUSTOMER"]); const quotes=user.customer ? await prisma.quote.findMany({where:{customerId:user.customer.id},include:{items:{include:{product:true}}},orderBy:{createdAt:"desc"}}):[]; return <><PageHeader eyebrow="Comercial" title="Orçamentos" description="Solicitações, propostas enviadas e histórico de aprovações."/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Número</TableHead><TableHead>Itens</TableHead><TableHead>Emissão</TableHead><TableHead>Validade</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Total</TableHead></TableRow></TableHeader><TableBody>{quotes.map(q=><TableRow key={q.id}><TableCell className="font-bold">{q.number}</TableCell><TableCell>{q.items.length ? q.items.map(i=>i.product.name).join(", ") : "Solicitação geral"}</TableCell><TableCell>{dateBR(q.createdAt)}</TableCell><TableCell>{dateBR(q.validUntil)}</TableCell><TableCell><StatusBadge status={q.status}/></TableCell><TableCell className="text-right font-semibold">{money(q.total)}</TableCell></TableRow>)}{!quotes.length&&<TableRow><TableCell colSpan={6} className="py-12 text-center text-muted-foreground">Nenhum orçamento vinculado à sua conta.</TableCell></TableRow>}</TableBody></Table></CardContent></Card></> }
