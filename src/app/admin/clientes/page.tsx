import { CustomerCreateForm } from "@/components/admin/customer-create-form"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { money } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminCustomers(){await requireRole(["ADMIN"]);const [rows,reps,tables]=await Promise.all([prisma.customer.findMany({include:{representative:{include:{user:true}},priceTable:true,_count:{select:{quotes:true,orders:true}}},orderBy:{updatedAt:"desc"}}),prisma.representative.findMany({where:{active:true},include:{user:true},orderBy:{code:"asc"}}),prisma.priceTable.findMany({where:{active:true},orderBy:{name:"asc"}})]);return <><PageHeader eyebrow="Cadastros comerciais" title="Clientes" description="Empresas, fazendas, condições, crédito e responsável comercial." action={<CustomerCreateForm representatives={reps.map(r=>({id:r.id,name:`${r.code} • ${r.user.name}`}))} priceTables={tables.map(t=>({id:t.id,name:t.name}))}/>}/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Cliente</TableHead><TableHead>Local</TableHead><TableHead>Status</TableHead><TableHead>Representante</TableHead><TableHead>Tabela</TableHead><TableHead>Limite</TableHead><TableHead>Movimento</TableHead></TableRow></TableHeader><TableBody>{rows.map(c=><TableRow key={c.id}><TableCell><strong>{c.tradeName||c.legalName}</strong><div className="text-xs text-muted-foreground">{c.document} • {c.email}</div></TableCell><TableCell>{c.city}/{c.state}</TableCell><TableCell><StatusBadge status={c.status}/></TableCell><TableCell>{c.representative?.user.name||"Central"}</TableCell><TableCell>{c.priceTable?.name||"Padrão"}</TableCell><TableCell>{c.creditLimit?money(c.creditLimit):"—"}</TableCell><TableCell className="text-xs text-muted-foreground">{c._count.quotes} orç. • {c._count.orders} ped.</TableCell></TableRow>)}</TableBody></Table></CardContent></Card></>}
