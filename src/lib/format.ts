type NumericLike = number | string | bigint | { toString(): string } | null | undefined

/**
 * Formata valores monetários vindos tanto de tipos nativos quanto do Prisma Decimal.
 * O Prisma representa campos Decimal como objetos Decimal, não como `number`.
 */
export function money(value: NumericLike) {
  const number = Number(value ?? 0)
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Number.isFinite(number) ? number : 0,
  )
}

export function dateBR(value: Date | string | null | undefined) {
  if (!value) return "—"
  return new Intl.DateTimeFormat("pt-BR").format(new Date(value))
}

export function dateTimeBR(value: Date | string | null | undefined) {
  if (!value) return "—"
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value))
}
