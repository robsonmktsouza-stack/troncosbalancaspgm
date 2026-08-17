import { Badge } from "@/components/ui/badge"
import { statusLabels } from "@/lib/status"

export function StatusBadge({ status }: { status: string }) {
  const good = ["ACTIVE","APPROVED","CONVERTED","DELIVERED","PAID","WON","CONFIRMED"]
  const bad = ["REJECTED","CANCELLED","LOST","BLOCKED","INACTIVE","EXPIRED"]
  return <Badge variant={bad.includes(status) ? "destructive" : good.includes(status) ? "default" : "secondary"}>{statusLabels[status] ?? status}</Badge>
}
