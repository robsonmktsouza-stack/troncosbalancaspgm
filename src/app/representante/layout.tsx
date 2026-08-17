import { CircleDollarSign, ContactRound, LayoutDashboard, ReceiptText, UsersRound } from "lucide-react"
import { PortalShell } from "@/components/portal-shell"
import { requireRole } from "@/lib/auth"

export default async function RepLayout({children}:{children:React.ReactNode}){const user=await requireRole(["REPRESENTATIVE"]);const items=[{label:"Visão geral",href:"/representante",icon:LayoutDashboard},{label:"Leads",href:"/representante/leads",icon:ContactRound},{label:"Clientes",href:"/representante/clientes",icon:UsersRound},{label:"Orçamentos",href:"/representante/orcamentos",icon:ReceiptText},{label:"Comissões",href:"/representante/comissoes",icon:CircleDollarSign}];return <PortalShell title="Área do representante" subtitle={user.representative?.region||user.email} userName={user.name} items={items}>{children}</PortalShell>}
