import { FileText, LayoutDashboard, PackageCheck, ReceiptText, UserRound } from "lucide-react"
import { PortalShell } from "@/components/portal-shell"
import { requireRole } from "@/lib/auth"

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(["CUSTOMER"])
  const items = [
    { label: "Visão geral", href: "/cliente", icon: LayoutDashboard },
    { label: "Orçamentos", href: "/cliente/orcamentos", icon: ReceiptText },
    { label: "Pedidos", href: "/cliente/pedidos", icon: PackageCheck },
    { label: "Documentos", href: "/cliente/documentos", icon: FileText },
    { label: "Minha empresa", href: "/cliente/perfil", icon: UserRound },
  ]
  return <PortalShell title="Área do cliente" subtitle={user.customer?.tradeName || user.customer?.legalName || user.email} userName={user.name} items={items}>{children}</PortalShell>
}
