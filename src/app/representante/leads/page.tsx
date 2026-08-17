import { LeadCreateForm } from "@/components/representative/lead-create-form"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { dateBR, money } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function LeadsPage(){const user=await requireRole(["REPRESENTATIVE"]);const leads=user.representative?await prisma.lead.findMany({where:{representativeId:user.representative.id},orderBy:[{nextActionAt:"asc"},{updatedAt:"desc"}]}):[];return <><PageHeader eyebrow="CRM territorial" title="Leads" description="Prospecção, estágio comercial, potencial e próxima ação da carteira." action={<LeadCreateForm/>}/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Empresa</TableHead><TableHead>Contato</TableHead><TableHead>Local</TableHead><TableHead>Status</TableHead><TableHead>Potencial</TableHead><TableHead>Próxima ação</TableHead></TableRow></TableHeader><TableBody>{leads.map(l=><TableRow key={l.id}><TableCell><strong>{l.companyName}</strong><div className="text-xs text-muted-foreground">{l.source||"Origem não informada"}</div></TableCell><TableCell>{l.contactName}<div className="text-xs text-muted-foreground">{l.phone}</div></TableCell><TableCell>{l.city}/{l.state}</TableCell><TableCell><StatusBadge status={l.status}/></TableCell><TableCell className="font-semibold">{money(l.valueEstimate)}</TableCell><TableCell>{dateBR(l.nextActionAt)}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card></>}
