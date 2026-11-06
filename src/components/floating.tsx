"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { gsap, useMotion } from "@/components/motion-provider"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { whatsappUrl } from "@/data/site"
import { cn } from "@/lib/utils"

/** Botão flutuante do WhatsApp, aparece depois do preloader. */
export function WhatsAppFab() {
  const { ready } = useMotion()
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener"
      aria-label="Falar com a ONE Academia no WhatsApp"
      className={cn(
        "fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_oklch(0_0_0/.45),0_0_30px_oklch(0.676_0.189_42/.35)] transition-transform duration-500 ease-[cubic-bezier(.2,1.4,.4,1)] hover:scale-110 sm:right-6 sm:bottom-6",
        ready ? "scale-100" : "scale-0"
      )}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}

const FINE_POINTER = "(hover: hover) and (pointer: fine)"
const getFinePointer = () => window.matchMedia(FINE_POINTER).matches
const subscribeFinePointer = (cb: () => void) => {
  const mq = window.matchMedia(FINE_POINTER)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}

/** Cursor laranja que cresce sobre links e botões (só em desktop com mouse). */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [big, setBig] = useState(false)
  // no servidor (e na hidratação) é false; no navegador lê o media query
  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointer,
    () => false
  )

  useEffect(() => {
    if (!enabled || !ref.current) return
    const qx = gsap.quickTo(ref.current, "x", {
      duration: 0.25,
      ease: "power3",
    })
    const qy = gsap.quickTo(ref.current, "y", {
      duration: 0.25,
      ease: "power3",
    })
    const move = (e: PointerEvent) => {
      qx(e.clientX)
      qy(e.clientY)
      setBig(
        !!(e.target as HTMLElement).closest(
          "a, button, [role=tab], [role=radio]"
        )
      )
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [enabled])

  if (!enabled) return null
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[65] rounded-full border-2 border-primary transition-[width,height,margin,background-color] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
        big
          ? "-mt-7 -ml-7 size-14 bg-primary/15"
          : "-mt-1.5 -ml-1.5 size-3 bg-primary"
      )}
    />
  )
}
