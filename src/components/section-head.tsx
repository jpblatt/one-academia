"use client"

import { useRef } from "react"
import {
  gsap,
  prefersReducedMotion,
  useGSAP,
} from "@/components/motion-provider"
import { cn } from "@/lib/utils"

/** Título condensado cujas linhas sobem de dentro de uma máscara ao entrar na tela. */
export function RevealTitle({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  immediate,
}: {
  lines: string[]
  as?: "h1" | "h2" | "h3"
  className?: string
  lineClassName?: string
  /** Anima já (hero), sem esperar a rolagem */
  immediate?: boolean
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion() || immediate) return
      gsap.from("[data-line]", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      })
    },
    { scope: ref }
  )
  return (
    <Tag
      ref={ref}
      className={cn("font-heading font-extrabold uppercase", className)}
    >
      {lines.map((l) => (
        // padding + margem negativa: a máscara não corta acentos (Á, Ú) nem descendentes
        <span
          key={l}
          className="-my-[0.08em] block overflow-hidden py-[0.08em]"
        >
          <span data-line className={cn("block", lineClassName)}>
            {l}
          </span>
        </span>
      ))}
    </Tag>
  )
}

export function SectionHead({
  title,
  children,
  className,
}: {
  title: string[]
  children?: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  useGSAP(() => {
    if (prefersReducedMotion() || !ref.current) return
    gsap.from(ref.current, {
      y: 20,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 92%" },
    })
  })
  return (
    <div
      className={cn(
        "mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 md:mb-14",
        className
      )}
    >
      <RevealTitle
        lines={title}
        className="text-[clamp(52px,9vw,128px)] leading-[0.86]"
      />
      {children && (
        <p
          ref={ref}
          className="max-w-md text-base leading-relaxed text-muted-foreground"
        >
          {children}
        </p>
      )}
    </div>
  )
}
