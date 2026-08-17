import { randomBytes } from "crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "pgm_session"
const SESSION_DAYS = 14

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
  await prisma.session.create({ data: { token, userId, expiresAt } })
  const jar = await cookies()
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  })
}

export async function destroySession() {
  const jar = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  if (token) await prisma.session.deleteMany({ where: { token } })
  jar.delete(COOKIE_NAME)
}

export async function getCurrentUser() {
  const jar = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  if (!token) return null
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: { include: { customer: true, representative: true } } },
  })
  if (!session || session.expiresAt < new Date() || !session.user.active) return null
  return session.user
}

export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  return user
}

export async function requireRole(roles: string[]) {
  const user = await requireUser()
  if (!roles.includes(user.role)) redirect(roleHome(user.role))
  return user
}

export function roleHome(role: string) {
  if (role === "ADMIN") return "/admin"
  if (role === "REPRESENTATIVE") return "/representante"
  return "/cliente"
}
