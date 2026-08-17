import Image from "next/image"
import { Scale, ShieldCheck, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProductVisual({ name, sku, imageSrc, className, priority = false }: { name: string; sku: string; imageSrc?: string | null; className?: string; priority?: boolean }) {
  if (imageSrc) return <div className={cn("relative overflow-hidden border bg-white", className)}>
    <Image src={imageSrc} alt={`${name} - ${sku}`} fill sizes="(max-width: 768px) 100vw, 55vw" priority={priority} className="object-cover transition duration-500 group-hover:scale-[1.025]"/>
    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/45 to-transparent"/>
    <span className="absolute bottom-3 right-3 bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold text-slate-700 backdrop-blur">{sku}</span>
  </div>
  return <div className={cn("relative overflow-hidden border bg-gradient-to-br from-sky-50 via-white to-sky-100", className)}>
    <div className="absolute -right-20 -top-20 size-64 rounded-full border-[30px] border-primary/5" />
    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
      <div><div className="mb-3 flex gap-2"><span className="rounded-md border bg-white/80 p-2 text-primary"><Scale className="size-5" /></span><span className="rounded-md border bg-white/80 p-2 text-primary"><ShieldCheck className="size-5" /></span><span className="rounded-md border bg-white/80 p-2 text-primary"><Wrench className="size-5" /></span></div><p className="max-w-sm text-xl font-bold tracking-tight text-slate-900">{name}</p><p className="mt-1 font-mono text-xs text-slate-500">{sku}</p></div>
      <span className="hidden text-6xl font-black tracking-tighter text-primary/10 sm:block">PGM</span>
    </div>
  </div>
}
