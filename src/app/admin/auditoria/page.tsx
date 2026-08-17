import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireRole } from "@/lib/auth"
import { dateTimeBR } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AuditPage(){await requireRole(["ADMIN"]);const logs=await prisma.auditLog.findMany({include:{user:true},orderBy:{createdAt:"desc"},take:200});return <><PageHeader eyebrow="Governança" title="Auditoria" description="Registro das principais ações administrativas e acessos ao portal."/><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Data/hora</TableHead><TableHead>Usuário</TableHead><TableHead>Ação</TableHead><TableHead>Entidade</TableHead><TableHead>Identificador</TableHead></TableRow></TableHeader><TableBody>{logs.map(l=><TableRow key={l.id}><TableCell>{dateTimeBR(l.createdAt)}</TableCell><TableCell>{l.user?.name||"Sistema"}<div className="text-xs text-muted-foreground">{l.user?.email}</div></TableCell><TableCell><span className="rounded-md bg-muted px-2 py-1 font-mono text-xs">{l.action}</span></TableCell><TableCell>{l.entity}</TableCell><TableCell className="max-w-[260px] truncate font-mono text-xs text-muted-foreground">{l.entityId||"—"}</TableCell></TableRow>)}{!logs.length&&<TableRow><TableCell colSpan={5} className="py-10 text-center text-muted-foreground">A auditoria começará a registrar eventos conforme o sistema for utilizado.</TableCell></TableRow>}</TableBody></Table></CardContent></Card></>}
