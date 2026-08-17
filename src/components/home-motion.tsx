"use client"

import { useEffect } from "react"

export function HomeMotion() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reducedMotion) {
      items.forEach((item) => item.classList.add("is-visible"))
      return
    }

    items.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight * 0.96) item.classList.add("is-visible")
    })
    document.documentElement.classList.add("home-motion-ready")

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add("is-visible")
        observer.unobserve(entry.target)
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })

    items.forEach((item) => {
      if (!item.classList.contains("is-visible")) observer.observe(item)
    })

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove("home-motion-ready")
    }
  }, [])

  return null
}
