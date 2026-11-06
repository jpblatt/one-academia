"use client"

import { useRef } from "react"
import { RevealTitle } from "@/components/section-head"
import {
  gsap,
  prefersReducedMotion,
  useGSAP,
} from "@/components/motion-provider"
import { about, images } from "@/data/site"

export function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // contadores sobem de 0 até o valor final
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v))
          },
        })
      })
      gsap.from("[data-about-text]", {
        y: 28,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-about-text]", start: "top 88%" },
      })
      gsap.fromTo(
        "[data-about-img]",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: true },
        }
      )
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      aria-labelledby="sobre-title"
      className="relative px-gutter py-24 md:py-36"
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <div>
          <h2 id="sobre-title" className="sr-only">
            Sobre a ONE Academia
          </h2>
          <RevealTitle
            as="h3"
            lines={["Duas unidades,", "um só jeito", "de treinar."]}
            className="text-[clamp(44px,7vw,104px)] leading-[0.88]"
          />
          <p
            data-about-text
            className="mt-8 max-w-[56ch] text-lg leading-relaxed text-muted-foreground"
          >
            {about.text}
          </p>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t pt-8 sm:gap-8">
            {about.stats.map((s) => (
              // dt vem antes do dd no HTML (válido); a ordem visual inverte com flex-col-reverse
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm leading-snug text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="font-heading text-[clamp(56px,9vw,112px)] leading-[0.85] font-extrabold">
                  <span data-count={s.value} className="text-brand">
                    {s.value}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:aspect-auto">
          <img
            data-about-img
            src={images.about}
            alt="Aluno treinando com halteres em ambiente escuro"
            loading="lazy"
            className="absolute inset-0 size-full scale-[1.18] object-cover saturate-[.75]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,oklch(0.155_0.003_67.6/.85))]" />
          <div className="absolute inset-0 glow-bottom opacity-70" />
        </div>
      </div>
    </section>
  )
}
