import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { dateBR, money } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function CommissionsPage(){const user=await requireRole(["REPRESENTATIVE"]);const rows=user.representative?await prisma.commission.findMany({where:{representativeId:user.representative.id},include:{order:true},orderBy:{createdAt:"desc"}}):[];return <><PageHeader eyebrow="Financeiro comercial" title="Comissões" description="Previsões, aprovações e pagamentos da sua produção comercial."/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Competência</TableHead><TableHead>Pedido</TableHead><TableHead>Base</TableHead><TableHead>Percentual</TableHead><TableHead>Comissão</TableHead><TableHead>Status</TableHead><TableHead>Pagamento</TableHead></TableRow></TableHeader><TableBody>{rows.map(c=><TableRow key={c.id}><TableCell className="font-semibold">{c.competence}</TableCell><TableCell>{c.order?.number||"—"}</TableCell><TableCell>{money(c.baseAmount)}</TableCell><TableCell>{Number(c.percentage).toFixed(2)}%</TableCell><TableCell className="font-bold">{money(c.amount)}</TableCell><TableCell><StatusBadge status={c.status}/></TableCell><TableCell>{dateBR(c.paidAt)}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card></>}
