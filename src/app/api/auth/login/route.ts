import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { createSession, roleHome } from "@/lib/auth"

const schema = z.object({ email: z.string().email(), password: z.string().min(4) })

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) return NextResponse.json({ error: "Informe e-mail e senha válidos." }, { status: 400 })
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } })
  if (!user || !user.active || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return NextResponse.json({ error: "E-mail ou senha inválidos." }, { status: 401 })
  await createSession(user.id)
  await prisma.auditLog.create({ data: { userId: user.id, action: "LOGIN", entity: "User", entityId: user.id } })
  return NextResponse.json({ ok: true, redirect: roleHome(user.role) })
}
