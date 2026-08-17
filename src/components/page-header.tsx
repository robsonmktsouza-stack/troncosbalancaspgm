export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-7 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-end md:justify-between"><div>{eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>}<h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>{description && <p className="mt-2 max-w-3xl text-muted-foreground">{description}</p>}</div>{action}</div>
}
