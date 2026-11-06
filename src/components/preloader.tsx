"use client"

import { useRef, useState } from "react"
import { Logo } from "@/components/logo"
import {
  gsap,
  prefersReducedMotion,
  useGSAP,
  useMotion,
} from "@/components/motion-provider"

/** A logo se desenha (traço) e depois recebe o preenchimento em gradiente. */
export function Preloader() {
  const { setReady } = useMotion()
  const root = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        setDone(true)
        setReady(true)
        return
      }
      const strokes = gsap.utils.toArray<SVGPathElement>(
        "[data-logo-path], [data-logo-academia] path"
      )
      strokes.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })
      gsap.set("[data-logo-path]", { fillOpacity: 0 })

      gsap
        .timeline({ onComplete: () => setDone(true) })
        .to("[data-logo-path]", {
          strokeDashoffset: 0,
          duration: 1.3,
          stagger: 0.15,
          ease: "power2.inOut",
        })
        .to(
          "[data-logo-academia] path",
          {
            strokeDashoffset: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=.6"
        )
        .to(
          "[data-logo-path]",
          { fillOpacity: 1, duration: 0.5, ease: "power1.out" },
          "-=.25"
        )
        .to(
          "[data-loader-glow]",
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
          "<"
        )
        .to(
          "[data-loader-inner]",
          { scale: 0.92, opacity: 0, duration: 0.45, ease: "power3.in" },
          "+=.25"
        )
        .add(() => setReady(true), "-=.1")
        .to(
          root.current,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.8,
            ease: "power4.inOut",
          },
          "<"
        )
    },
    { scope: root }
  )

  if (done) return null
  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[70] grid place-items-center overflow-hidden bg-background"
    >
      <div
        data-loader-glow
        className="absolute inset-0 scale-90 glow-bottom opacity-0"
      />
      <div data-loader-inner className="relative w-[min(62vw,280px)]">
        <Logo draw className="w-full" />
      </div>
    </div>
  )
}
