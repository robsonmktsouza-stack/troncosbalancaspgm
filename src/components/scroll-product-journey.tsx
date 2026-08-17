"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const journeyItems = [
  {
    category: "Linha de contenção",
    title: "Segurança começa no controle do manejo.",
    text: "Troncos reforçados, acessos bem posicionados e operação pensada para dar domínio à equipe sem aumentar o estresse do animal.",
    image: "/images/products/tronco-americano-contencao.webp",
    href: "/catalogo?categoria=troncos-de-contencao",
  },
  {
    category: "Linha de pesagem",
    title: "A pesagem acompanha o ritmo da fazenda.",
    text: "Modelos mecânicos e eletrônicos preparados para diferentes capacidades, com leitura confiável e construção adequada ao trabalho diário.",
    image: "/images/products/balanca-mecanica-1500.webp",
    href: "/catalogo?categoria=balancas-pecuarias",
  },
  {
    category: "Peças e eletrônica",
    title: "Cada componente completa o resultado.",
    text: "Indicadores, células, barras e conexões integram a estrutura para tornar a operação mais precisa, prática e fácil de manter.",
    image: "/images/products/indicador-eletronico.webp",
    href: "/catalogo?categoria=pecas-e-eletronica",
  },
] as const

export function ScrollProductJourney() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const steps = section.querySelectorAll<HTMLElement>("[data-journey-step]")
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.journeyStep))
      }
    }, { rootMargin: "-38% 0px -38% 0px", threshold: 0.01 })

    steps.forEach((step) => observer.observe(step))
    return () => observer.disconnect()
  }, [])

  return <section ref={sectionRef} className="journey-section border-y border-slate-200 bg-[#f7f9fb]">
    <div className="container-wide journey-layout">
      <div className="journey-visual-column">
        <div className="journey-visual overflow-hidden border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.12)]">
          {journeyItems.map((item, index) => <div key={item.title} aria-hidden={index !== active} className={`journey-image ${index === active ? "is-active" : ""}`}>
            <Image src={item.image} alt={item.title} fill priority={index === 0} sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
          </div>)}
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-5 p-6 text-white sm:p-9">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-sky-300">Experiência interativa</p><p className="mt-2 max-w-md text-xl font-extrabold sm:text-2xl">{journeyItems[active].category}</p></div>
            <span className="font-mono text-5xl font-black tracking-tighter text-white/55 sm:text-7xl">0{active + 1}</span>
          </div>
          <div className="absolute right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2">{journeyItems.map((item, index) => <span key={item.title} className={`h-8 w-1 transition-all duration-500 ${index === active ? "bg-sky-300" : "bg-white/40"}`} />)}</div>
        </div>
      </div>

      <div className="journey-steps">
        <div className="journey-scroll-hint flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-slate-400"><ArrowDown className="size-4 animate-bounce" />Role para conhecer cada etapa</div>
        {journeyItems.map((item, index) => <article key={item.title} data-journey-step={index} className="journey-step flex items-center">
          <div className={`max-w-lg transition-all duration-500 ${active === index ? "translate-y-0 opacity-100" : "translate-y-5 opacity-40"}`}>
            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-primary">0{index + 1} — {item.category}</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">{item.title}</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">{item.text}</p>
            <Link href={item.href} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-primary px-6 text-xs font-extrabold uppercase tracking-[.1em] text-primary transition hover:bg-primary hover:text-white">Conhecer a linha <ArrowUpRight className="size-4" /></Link>
          </div>
        </article>)}
      </div>
    </div>
  </section>
}
