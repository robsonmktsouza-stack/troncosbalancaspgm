import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const schema = z.object({
  name: z.string().min(2), company: z.string().min(2), document: z.string().optional(), phone: z.string().min(6), email: z.string().email(), city: z.string().min(2), state: z.string().min(2).max(2), quantity: z.coerce.number().positive().default(1), notes: z.string().optional(), productId: z.string().optional(),
})

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) return NextResponse.json({ error: "Revise os campos obrigatórios." }, { status: 400 })
  const data = parsed.data
  const [last, rep] = await Promise.all([
    prisma.quote.findFirst({ orderBy: { createdAt: "desc" }, select: { number: true } }),
    prisma.representative.findFirst({ where: { active: true, states: { has: data.state.toUpperCase() } }, orderBy: { createdAt: "asc" } }),
  ])
  const lastSeq = Number(last?.number.split("-").pop()) || 0
  const number = `ORC-${new Date().getFullYear()}-${String(lastSeq + 1).padStart(4, "0")}`
  let unitPrice = 0
  if (data.productId) {
    const product = await prisma.product.findUnique({ where: { id: data.productId }, select: { basePrice: true } })
    unitPrice = Number(product?.basePrice ?? 0)
  }
  const total = unitPrice * data.quantity
  const quote = await prisma.quote.create({ data: {
    number, representativeId: rep?.id, prospectName: `${data.company} • ${data.name}`, prospectDocument: data.document || null, prospectEmail: data.email, prospectPhone: data.phone, prospectCity: data.city, prospectState: data.state.toUpperCase(), subtotal: total, total, notes: data.notes || null,
    ...(data.productId ? { items: { create: [{ productId: data.productId, quantity: data.quantity, unitPrice, total }] } } : {}),
  } })
  return NextResponse.json({ ok: true, number: quote.number })
}
