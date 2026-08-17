import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { ProductCreateForm } from "@/components/admin/product-create-form"
import { ProductStatusControl } from "@/components/admin/product-status-control"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { money } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminProducts(){await requireRole(["ADMIN"]);const[categories,products]=await Promise.all([prisma.category.findMany({where:{active:true},orderBy:{name:"asc"}}),prisma.product.findMany({include:{category:true,_count:{select:{documents:true,images:true}}},orderBy:{updatedAt:"desc"}})]);return <><PageHeader eyebrow="Catálogo" title="Produtos e SKUs" description="Cadastro técnico, situação comercial, documentação e publicação do catálogo." action={<ProductCreateForm categories={categories.map(c=>({id:c.id,name:c.name}))}/>}/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>SKU / produto</TableHead><TableHead>Categoria</TableHead><TableHead>Status</TableHead><TableHead>Disponibilidade</TableHead><TableHead>Preço base</TableHead><TableHead>Docs</TableHead><TableHead>Catálogo</TableHead></TableRow></TableHeader><TableBody>{products.map(p=><TableRow key={p.id}><TableCell><strong>{p.name}</strong><div className="font-mono text-xs text-muted-foreground">{p.sku}</div></TableCell><TableCell>{p.category.name}</TableCell><TableCell><ProductStatusControl id={p.id} status={p.status} featured={p.featured}/></TableCell><TableCell>{p.stockStatus}{p.leadTimeDays&&<div className="text-xs text-muted-foreground">{p.leadTimeDays} dias</div>}</TableCell><TableCell>{p.priceOnRequest?"Sob consulta":money(p.basePrice)}</TableCell><TableCell>{p._count.documents} doc. • {p._count.images} img.</TableCell><TableCell><Link href={`/catalogo/${p.slug}`} target="_blank" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Abrir <ExternalLink className="size-3.5"/></Link></TableCell></TableRow>)}</TableBody></Table></CardContent></Card></>}
