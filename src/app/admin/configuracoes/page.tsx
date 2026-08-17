import { SettingsForm } from "@/components/admin/settings-form"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireRole } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function SettingsPage(){await requireRole(["ADMIN"]);const setting=await prisma.companySetting.findUnique({where:{key:"company"}});const v=(setting?.value||{}) as Record<string,unknown>;const initial={companyName:String(v.companyName||"PGM Troncos & Balanças"),email:String(v.email||"comercial@pgm.local"),phone:String(v.phone||""),whatsapp:String(v.whatsapp||"")};return <><PageHeader eyebrow="Sistema" title="Configurações" description="Parâmetros institucionais e dados exibidos pelo portal."/><div className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]"><Card><CardHeader><CardTitle>Dados da empresa</CardTitle></CardHeader><CardContent><SettingsForm initial={initial}/></CardContent></Card><Card><CardHeader><CardTitle>Estrutura instalada</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div className="rounded-lg border p-4"><strong>Catálogo técnico</strong><p className="mt-1 text-muted-foreground">Categorias, produtos, SKUs, documentos e especificações.</p></div><div className="rounded-lg border p-4"><strong>Portal comercial</strong><p className="mt-1 text-muted-foreground">Clientes, representantes, orçamento, pedidos e comissão.</p></div><div className="rounded-lg border p-4"><strong>Segurança</strong><p className="mt-1 text-muted-foreground">Sessões persistentes, senha com hash, perfis de acesso e auditoria.</p></div></CardContent></Card></div></>}
