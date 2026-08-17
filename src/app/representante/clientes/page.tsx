import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { money } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function RepCustomers(){const user=await requireRole(["REPRESENTATIVE"]);const customers=user.representative?await prisma.customer.findMany({where:{representativeId:user.representative.id},include:{priceTable:true,_count:{select:{orders:true,quotes:true}}},orderBy:{tradeName:"asc"}}):[];return <><PageHeader eyebrow="Carteira" title="Clientes" description="Visão comercial dos clientes vinculados ao seu território."/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Cliente</TableHead><TableHead>Local</TableHead><TableHead>Status</TableHead><TableHead>Tabela</TableHead><TableHead>Limite</TableHead><TableHead>Histórico</TableHead></TableRow></TableHeader><TableBody>{customers.map(c=><TableRow key={c.id}><TableCell><strong>{c.tradeName||c.legalName}</strong><div className="text-xs text-muted-foreground">{c.document}</div></TableCell><TableCell>{c.city}/{c.state}</TableCell><TableCell><StatusBadge status={c.status}/></TableCell><TableCell>{c.priceTable?.name||"Padrão"}</TableCell><TableCell>{c.creditLimit?money(c.creditLimit):"—"}</TableCell><TableCell className="text-xs text-muted-foreground">{c._count.quotes} orç. • {c._count.orders} ped.</TableCell></TableRow>)}</TableBody></Table></CardContent></Card></>}
