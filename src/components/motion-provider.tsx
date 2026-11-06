"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

type MotionState = {
  /** true depois que o preloader termina — libera as animações de entrada */
  ready: boolean
  setReady: (v: boolean) => void
  lenis: React.RefObject<Lenis | null>
}

const MotionContext = React.createContext<MotionState | null>(null)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false)
  const lenis = React.useRef<Lenis | null>(null)

  // Rolagem suave (Lenis) sincronizada com o ScrollTrigger
  React.useEffect(() => {
    if (prefersReducedMotion()) return
    const instance = new Lenis({ lerp: 0.1 })
    lenis.current = instance
    instance.on("scroll", ScrollTrigger.update)
    const tick = (t: number) => instance.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    instance.stop()

    // Links de âncora (#aulas etc.) rolam suavemente
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      )
      if (!a) return
      const id = a.getAttribute("href")!
      const target = id === "#top" ? 0 : document.querySelector<HTMLElement>(id)
      if (target === null) return
      e.preventDefault()
      instance.scrollTo(target, { offset: -72, duration: 1.4 })
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      gsap.ticker.remove(tick)
      instance.destroy()
      lenis.current = null
    }
  }, [])

  React.useEffect(() => {
    if (ready) lenis.current?.start()
  }, [ready])

  React.useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    return () => window.removeEventListener("load", refresh)
  }, [])

  const value = React.useMemo(() => ({ ready, setReady, lenis }), [ready])
  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  )
}

export function useMotion() {
  const ctx = React.useContext(MotionContext)
  if (!ctx)
    throw new Error("useMotion precisa estar dentro de <MotionProvider>")
  return ctx
}

export { gsap, ScrollTrigger, useGSAP }
