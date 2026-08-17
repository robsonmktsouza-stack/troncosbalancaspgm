import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function BrandMark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return <Link href="/" className={cn("inline-flex shrink-0 items-center", className)} aria-label="Troncos e Balanças Paragominas - início">
    <Image
      src="/images/logo-pgm.png"
      alt="Troncos e Balanças Paragominas"
      width={841}
      height={269}
      sizes={compact ? "130px" : "(max-width: 640px) 155px, 220px"}
      className={cn("h-auto w-[155px] object-contain sm:w-[205px]", compact && "w-[130px] sm:w-[145px]")}
    />
  </Link>
}
