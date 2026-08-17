import { OrderStatusControl } from "@/components/admin/order-status-control"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { dateBR, money } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminOrders(){await requireRole(["ADMIN"]);const orders=await prisma.order.findMany({include:{customer:true,representative:{include:{user:true}},items:{include:{product:true}}},orderBy:{createdAt:"desc"}});return <><PageHeader eyebrow="Operação" title="Pedidos, produção e expedição" description="Fluxo do pedido confirmado até a entrega ao cliente."/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Pedido</TableHead><TableHead>Cliente</TableHead><TableHead>Produto(s)</TableHead><TableHead>Representante</TableHead><TableHead>Previsão</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Total</TableHead></TableRow></TableHeader><TableBody>{orders.map(o=><TableRow key={o.id}><TableCell><strong>{o.number}</strong><div className="text-xs text-muted-foreground">{dateBR(o.createdAt)}</div>{o.trackingCode&&<div className="text-xs text-primary">Rastreio: {o.trackingCode}</div>}</TableCell><TableCell>{o.customer.tradeName||o.customer.legalName}<div className="text-xs text-muted-foreground">{o.customer.city}/{o.customer.state}</div></TableCell><TableCell className="max-w-[320px] text-sm">{o.items.map(i=>`${Number(i.quantity)}× ${i.product.name}`).join(", ")}</TableCell><TableCell>{o.representative?.user.name||"Central"}</TableCell><TableCell>{dateBR(o.deliveryForecast)}</TableCell><TableCell><OrderStatusControl id={o.id} status={o.status}/></TableCell><TableCell className="text-right font-semibold">{money(o.total)}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card></>}
