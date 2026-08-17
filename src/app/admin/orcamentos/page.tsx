import { QuoteStatusControl } from "@/components/admin/quote-status-control"
import { ConvertQuoteButton } from "@/components/admin/convert-quote-button"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { dateBR, money } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminQuotes(){await requireRole(["ADMIN"]);const quotes=await prisma.quote.findMany({include:{customer:true,representative:{include:{user:true}},items:{include:{product:true}},order:true},orderBy:{createdAt:"desc"}});return <><PageHeader eyebrow="Funil comercial" title="Orçamentos" description="Solicitações do site, propostas da carteira e conversões em pedido."/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Número</TableHead><TableHead>Cliente / prospect</TableHead><TableHead>Produto(s)</TableHead><TableHead>Responsável</TableHead><TableHead>Data</TableHead><TableHead>Situação</TableHead><TableHead className="text-right">Total</TableHead><TableHead>Ação</TableHead></TableRow></TableHeader><TableBody>{quotes.map(q=><TableRow key={q.id}><TableCell><strong>{q.number}</strong>{q.order&&<div className="text-xs text-primary">→ {q.order.number}</div>}</TableCell><TableCell>{q.customer?.tradeName||q.prospectName||"—"}<div className="text-xs text-muted-foreground">{q.prospectPhone||q.customer?.phone||""}</div></TableCell><TableCell className="max-w-[320px] text-sm">{q.items.length?q.items.map(i=>`${Number(i.quantity)}× ${i.product.name}`).join(", "):"Solicitação geral"}</TableCell><TableCell>{q.representative?.user.name||"Central"}</TableCell><TableCell>{dateBR(q.createdAt)}</TableCell><TableCell><QuoteStatusControl id={q.id} status={q.status}/></TableCell><TableCell className="text-right font-semibold">{money(q.total)}</TableCell><TableCell><ConvertQuoteButton id={q.id} enabled={q.status === "APPROVED" && !!q.customerId && !q.order}/></TableCell></TableRow>)}</TableBody></Table></CardContent></Card></>}
