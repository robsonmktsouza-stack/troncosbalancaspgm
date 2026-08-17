import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { dateBR, money } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function CustomerOrders(){const user=await requireRole(["CUSTOMER"]);const orders=user.customer?await prisma.order.findMany({where:{customerId:user.customer.id},include:{items:{include:{product:true}}},orderBy:{createdAt:"desc"}}):[];return <><PageHeader eyebrow="Compras" title="Pedidos" description="Acompanhe confirmação, produção, expedição e entrega."/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Pedido</TableHead><TableHead>Produtos</TableHead><TableHead>Data</TableHead><TableHead>Entrega prevista</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Total</TableHead></TableRow></TableHeader><TableBody>{orders.map(o=><TableRow key={o.id}><TableCell><strong>{o.number}</strong>{o.trackingCode&&<div className="text-xs text-primary">Rastreio: {o.trackingCode}</div>}</TableCell><TableCell className="max-w-sm">{o.items.map(i=>`${Number(i.quantity)}× ${i.product.name}`).join(", ")}</TableCell><TableCell>{dateBR(o.createdAt)}</TableCell><TableCell>{dateBR(o.deliveryForecast)}</TableCell><TableCell><StatusBadge status={o.status}/></TableCell><TableCell className="text-right font-semibold">{money(o.total)}</TableCell></TableRow>)}{!orders.length&&<TableRow><TableCell colSpan={6} className="py-12 text-center text-muted-foreground">Nenhum pedido registrado.</TableCell></TableRow>}</TableBody></Table></CardContent></Card></>}
