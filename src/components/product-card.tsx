import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ProductVisual } from "@/components/product-visual"

export function ProductCard({ product }: { product: { name: string; slug: string; sku: string; shortDescription: string; stockStatus: string; heroImage?: string | null; category: { name: string } } }) {
  return <Link href={`/catalogo/${product.slug}`} className="group block"><Card className="h-full overflow-hidden border-sky-200 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"><ProductVisual name={product.name} sku={product.sku} imageSrc={product.heroImage} className="h-56 rounded-none border-0 border-b border-sky-200" /><CardContent className="p-5"><p className="text-xs font-bold uppercase tracking-wider text-primary">{product.category.name}</p><h3 className="font-display mt-2 text-xl font-bold leading-tight text-slate-950 group-hover:text-primary">{product.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{product.shortDescription}</p><div className="mt-5 flex items-center justify-between border-t pt-4"><span className="text-xs font-medium text-muted-foreground">{product.stockStatus}</span><span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Ver produto <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></div></CardContent></Card></Link>
}
