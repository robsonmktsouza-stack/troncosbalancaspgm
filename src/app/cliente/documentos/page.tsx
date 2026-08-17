import { Download, FileText } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { requireRole } from "@/lib/auth"
import { dateBR } from "@/lib/format"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function CustomerDocuments(){const user=await requireRole(["CUSTOMER"]);const docs=user.customer?await prisma.customerDocument.findMany({where:{customerId:user.customer.id},orderBy:{createdAt:"desc"}}):[];return <><PageHeader eyebrow="Central documental" title="Documentos" description="Manuais, certificados, arquivos comerciais e documentos vinculados à sua empresa."/><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{docs.map(doc=><a href={doc.url} target="_blank" key={doc.id}><Card className="h-full transition hover:border-primary/40 hover:shadow-md"><CardContent className="flex items-start gap-4 p-5"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><FileText/></div><div className="min-w-0 flex-1"><h2 className="truncate font-bold">{doc.title}</h2><p className="mt-1 text-xs text-muted-foreground">{doc.type} • {dateBR(doc.issuedAt||doc.createdAt)}</p></div><Download className="size-4 text-muted-foreground"/></CardContent></Card></a>)}{!docs.length&&<Card className="md:col-span-2"><CardContent className="p-10 text-center text-muted-foreground">Ainda não há documentos vinculados à sua empresa.</CardContent></Card>}</div></>}
