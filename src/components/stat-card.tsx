import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StatCard({ label, value, helper, icon: Icon }: { label: string; value: string; helper?: string; icon: LucideIcon }) {
  return <Card><CardContent className="flex items-start justify-between p-5"><div><p className="text-sm font-medium text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>{helper && <p className="mt-1 text-xs text-muted-foreground">{helper}</p>}</div><div className="rounded-lg bg-primary/10 p-2.5 text-primary"><Icon className="size-5" /></div></CardContent></Card>
}
