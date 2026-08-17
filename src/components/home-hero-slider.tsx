"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent, PointerEvent, TouchEvent } from "react"

const slides = [
  {
    eyebrow: "Linha de contenção PGM",
    title: "Troncos robustos para um manejo mais seguro",
    text: "Estruturas reforçadas, acesso prático e fabricação própria em Paragominas.",
    image: "/images/products/tronco-americano-contencao.webp",
    href: "/catalogo?categoria=troncos-de-contencao",
    cta: "Conheça a linha",
    tone: "dark",
  },
  {
    eyebrow: "Pesagem pecuária",
    title: "Balanças preparadas para a rotina da fazenda",
    text: "Modelos mecânicos e eletrônicos para diferentes capacidades e estruturas de manejo.",
    image: "/images/products/balanca-mecanica-1500.webp",
    href: "/catalogo?categoria=balancas-pecuarias",
    cta: "Ver balanças",
    tone: "sky",
  },
  {
    eyebrow: "Catálogo técnico PGM",
    title: "Equipamentos, peças e componentes em um só lugar",
    text: "Consulte fotos reais, especificações e peça seu orçamento diretamente à fábrica.",
    image: "/images/products/barras-pesagem.webp",
    href: "/catalogo",
    cta: "Abrir catálogo",
    tone: "light",
  },
] as const

export function HomeHeroSlider() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<number | null>(null)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500)
    return () => window.clearInterval(timer)
  }, [paused])

  const slide = slides[active]

  function move(direction: number) {
    setActive((current) => (current + direction + slides.length) % slides.length)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current
    if (!frame) return
    const bounds = frame.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    frame.style.setProperty("--banner-shift-x", `${x * -18}px`)
    frame.style.setProperty("--banner-shift-y", `${y * -12}px`)
  }

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") setPaused(true)
  }

  function handlePointerLeave() {
    const frame = frameRef.current
    if (frame) {
      frame.style.setProperty("--banner-shift-x", "0px")
      frame.style.setProperty("--banner-shift-y", "0px")
    }
    setPaused(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") move(-1)
    if (event.key === "ArrowRight") move(1)
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStart.current = event.touches[0]?.clientX ?? null
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStart.current === null) return
    const distance = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1)
    touchStart.current = null
  }

  return <div ref={frameRef} role="region" aria-roledescription="carrossel" aria-label="Destaques PGM" tabIndex={0} onKeyDown={handleKeyDown} onPointerMove={handlePointerMove} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="home-slider relative overflow-hidden border border-slate-200 bg-slate-100 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
    <div key={slide.title} className={`home-banner home-banner-${slide.tone}`} aria-live="polite">
      <div className="home-banner-copy relative z-10 flex max-w-[610px] flex-col items-start justify-center px-8 py-12 sm:px-12 lg:px-16">
        <p className="text-xs font-extrabold uppercase tracking-[.18em] text-sky-200">{slide.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.8rem]">{slide.title}</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 opacity-85 sm:text-base">{slide.text}</p>
        <Link href={slide.href} className="mt-7 inline-flex min-h-11 items-center bg-white px-7 text-sm font-extrabold uppercase tracking-wide text-primary shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">{slide.cta}</Link>
      </div>
      <div className="relative min-h-[250px] overflow-hidden sm:min-h-[300px] lg:min-h-[376px]">
        <Image src={slide.image} alt={slide.title} fill priority={active === 0} sizes="(max-width: 768px) 100vw, 52vw" className="home-banner-image object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5" />
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[var(--banner-edge)] to-transparent" />
      </div>
    </div>

    <button type="button" aria-label="Banner anterior" onClick={() => move(-1)} className="absolute left-3 top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center bg-white/90 text-slate-700 shadow transition hover:scale-105 hover:bg-white"><ChevronLeft className="size-5" /></button>
    <button type="button" aria-label="Próximo banner" onClick={() => move(1)} className="absolute right-3 top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center bg-white/90 text-slate-700 shadow transition hover:scale-105 hover:bg-white"><ChevronRight className="size-5" /></button>
    <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">{slides.map((item, index) => <button key={item.title} type="button" aria-label={`Mostrar banner ${index + 1}`} aria-current={index === active} onClick={() => setActive(index)} className={`h-1.5 transition-all ${index === active ? "w-9 bg-white" : "w-6 bg-white/50"}`} />)}</div>
    <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-white/15"><span key={`${active}-${paused ? "paused" : "running"}`} className={`hero-progress-bar block h-full bg-sky-300 ${paused ? "is-paused" : ""}`} /></div>
  </div>
}
