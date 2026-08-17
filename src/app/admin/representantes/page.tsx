import { RepresentativeCreateForm } from "@/components/admin/representative-create-form"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { money } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminReps(){await requireRole(["ADMIN"]);const rows=await prisma.representative.findMany({include:{user:true,_count:{select:{customers:true,leads:true,quotes:true}},commissions:true},orderBy:{code:"asc"}});return <><PageHeader eyebrow="Força de vendas" title="Representantes" description="Territórios, carteira, produção comercial e comissão padrão." action={<RepresentativeCreateForm/>}/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Código / nome</TableHead><TableHead>Região</TableHead><TableHead>UFs</TableHead><TableHead>Comissão</TableHead><TableHead>Carteira</TableHead><TableHead>Pipeline</TableHead><TableHead>Comissões abertas</TableHead></TableRow></TableHeader><TableBody>{rows.map(r=>{const open=r.commissions.filter(c=>c.status!=="PAID").reduce((a,c)=>a+Number(c.amount),0);return <TableRow key={r.id}><TableCell><strong>{r.code} • {r.user.name}</strong><div className="text-xs text-muted-foreground">{r.user.email}</div></TableCell><TableCell>{r.region}</TableCell><TableCell>{r.states.join(", ")}</TableCell><TableCell>{Number(r.commissionRate).toFixed(2)}%</TableCell><TableCell>{r._count.customers} clientes</TableCell><TableCell>{r._count.leads} leads • {r._count.quotes} orç.</TableCell><TableCell className="font-semibold">{money(open)}</TableCell></TableRow>})}</TableBody></Table></CardContent></Card></>}
