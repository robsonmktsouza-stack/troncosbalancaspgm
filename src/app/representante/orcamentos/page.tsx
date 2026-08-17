import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { dateBR, money } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function RepQuotes(){const user=await requireRole(["REPRESENTATIVE"]);const quotes=user.representative?await prisma.quote.findMany({where:{representativeId:user.representative.id},include:{customer:true,items:{include:{product:true}}},orderBy:{createdAt:"desc"}}):[];return <><PageHeader eyebrow="Propostas" title="Orçamentos" description="Solicitações públicas e propostas vinculadas à sua carteira."/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Número</TableHead><TableHead>Cliente / prospect</TableHead><TableHead>Itens</TableHead><TableHead>Status</TableHead><TableHead>Data</TableHead><TableHead className="text-right">Total</TableHead></TableRow></TableHeader><TableBody>{quotes.map(q=><TableRow key={q.id}><TableCell className="font-bold">{q.number}</TableCell><TableCell>{q.customer?.tradeName||q.prospectName||"—"}<div className="text-xs text-muted-foreground">{q.prospectCity&&`${q.prospectCity}/${q.prospectState}`}</div></TableCell><TableCell>{q.items.length||"—"}</TableCell><TableCell><StatusBadge status={q.status}/></TableCell><TableCell>{dateBR(q.createdAt)}</TableCell><TableCell className="text-right font-semibold">{money(q.total)}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card></>}
