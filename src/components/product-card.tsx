import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ProductVisual } from "@/components/product-visual"

export function ProductCard({ product }: { product: { name: string; slug: string; sku: string; shortDescription: string; stockStatus: string; heroImage?: string | null; category: { name: string } } }) {
  return <Link href={`/catalogo/${product.slug}`} className="group block h-full"><Card className="h-full overflow-hidden border-0 bg-[#fdfdfd] shadow-[0_4px_24px_rgba(15,23,42,.055)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(15,23,42,.11)]"><ProductVisual name={product.name} sku={product.sku} imageSrc={product.heroImage} fit="contain" showSku={false} className="h-64 rounded-none border-0 bg-white" /><CardContent className="flex min-h-[150px] flex-col items-center px-5 pb-7 pt-4 text-center"><p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-slate-400">{product.category.name}</p><h3 className="mt-2 line-clamp-3 text-sm font-extrabold leading-5 text-slate-900 transition group-hover:text-primary">{product.name}</h3><span className="mt-auto pt-5 text-sm font-medium text-primary">Saiba mais</span></CardContent></Card></Link>
}
