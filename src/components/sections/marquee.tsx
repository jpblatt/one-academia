"use client"

import { Fragment, useRef } from "react"
import {
  gsap,
  prefersReducedMotion,
  useGSAP,
  useMotion,
} from "@/components/motion-provider"
import { classes } from "@/data/site"

const WORDS = classes.map((c) => c.name)

/** Faixa laranja infinita com as modalidades; acelera e inverte conforme a rolagem (velocidade do Lenis). */
export function Marquee() {
  const { lenis } = useMotion()
  const track = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion() || !track.current) return
    const el = track.current
    let x = 0
    let speed = 1
    let dir = -1
    const tick = () => {
      const l = lenis.current
      if (l && Math.abs(l.velocity) > 0.1) {
        speed = Math.max(speed, 1 + Math.min(Math.abs(l.velocity) * 0.5, 12))
        dir = l.direction === -1 ? 1 : -1
      }
      const w = (el.firstElementChild as HTMLElement).offsetWidth
      x += dir * speed
      if (x <= -w) x += w
      if (x > 0) x -= w
      el.style.transform = `translate3d(${x}px,0,0)`
      speed += (1 - speed) * 0.05
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  })

  // o separador é a barra inclinada do "N" da logo
  const group = (
    <span className="inline-flex shrink-0 items-center gap-8 pr-8">
      {WORDS.map((w) => (
        <Fragment key={w}>
          {w}
          <span
            aria-hidden="true"
            className="inline-block h-[0.7em] w-[0.18em] skew-x-[-22deg] bg-primary-foreground"
          />
        </Fragment>
      ))}
    </span>
  )

  return (
    <div className="relative overflow-hidden py-10">
      <p className="sr-only">Modalidades: {WORDS.join(", ")}.</p>
      <div
        aria-hidden="true"
        className="-mx-[5%] -rotate-2 overflow-hidden bg-brand py-4 whitespace-nowrap text-primary-foreground"
      >
        <div
          ref={track}
          className="inline-flex font-heading text-[clamp(40px,6vw,76px)] leading-none font-extrabold uppercase will-change-transform"
        >
          {group}
          {group}
          {group}
        </div>
      </div>
    </div>
  )
}
