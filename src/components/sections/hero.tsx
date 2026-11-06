"use client"

import { useRef } from "react"
import { ArrowDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RollText } from "@/components/roll-text"
import { UnitStatus } from "@/components/unit-status"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import {
  gsap,
  prefersReducedMotion,
  useGSAP,
  useMotion,
} from "@/components/motion-provider"
import { images, units, whatsappUrl } from "@/data/site"

const LINES = ["Treine cedo.", "Treine tarde.", "Treine na ONE."]

export function Hero() {
  const { ready } = useMotion()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // estado inicial (escondido atrás do preloader)
      gsap.set("[data-line]", { yPercent: 110 })
      gsap.set("[data-hero-fade]", { y: 24, autoAlpha: 0 })
      gsap.set("[data-hero-img]", { scale: 1.18 })
      // parallax da foto
      gsap.to("[data-hero-media]", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    },
    { scope: root }
  )

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return
      gsap
        .timeline({ delay: 0.1 })
        .to(
          "[data-hero-img]",
          { scale: 1, duration: 2.2, ease: "power3.out" },
          0
        )
        .to(
          "[data-line]",
          { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" },
          0.1
        )
        .to(
          "[data-hero-fade]",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.6
        )
    },
    { scope: root, dependencies: [ready] }
  )

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* foto + luz quente vinda de baixo */}
      <div
        data-hero-media
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        <img
          data-hero-img
          src={images.hero}
          alt=""
          className="size-full object-cover object-[60%_30%] opacity-45 saturate-[.6]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--background)_0%,transparent_30%,transparent_45%,var(--background)_96%)]" />
        <div className="absolute inset-0 bg-[oklch(0.5_0.15_45/.18)] mix-blend-color" />
      </div>
      <div
        aria-hidden="true"
        className="glow-breathe absolute inset-x-[-20%] bottom-[-10%] -z-10 h-[75%] glow-bottom"
      />

      <div className="px-gutter pt-28 pb-10 md:pb-14">
        <div
          data-hero-fade
          className="mb-6 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap md:mb-8"
        >
          {units.map((u) => (
            <UnitStatus key={u.id} unit={u} />
          ))}
        </div>

        <h1 className="font-heading text-[min(15.5vw,19svh,212px)] leading-[0.84] font-extrabold uppercase">
          {LINES.map((l, i) => (
            <span
              key={l}
              className="-my-[0.06em] block overflow-hidden py-[0.06em]"
            >
              <span
                data-line
                className="block bg-[linear-gradient(180deg,#fff_0%,#fff_34%,var(--gold)_68%,var(--primary)_88%,var(--ember)_100%)] bg-[length:100%_300%] bg-clip-text text-transparent"
                style={{
                  backgroundPosition: `0 ${(i / (LINES.length - 1)) * 100}%`,
                }}
              >
                {l}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-7 flex flex-wrap items-end justify-between gap-x-12 gap-y-7 lg:mt-9">
          <p
            data-hero-fade
            className="max-w-xl text-lg leading-relaxed text-foreground/85"
          >
            Musculação e 10 modalidades coletivas em duas unidades de Marechal
            Cândido Rondon. Abrimos às 05h30 de segunda a sexta e também no
            sábado, domingo e feriado.
          </p>
          <div data-hero-fade className="flex flex-wrap gap-3 lg:mr-20">
            <Button asChild size="pill-lg">
              <a href={whatsappUrl()} target="_blank" rel="noopener">
                <WhatsAppIcon className="size-5" />
                <RollText>Falar no WhatsApp</RollText>
              </a>
            </Button>
            <Button
              asChild
              size="pill-lg"
              variant="outline"
              className="border-white/20 bg-white/5 backdrop-blur-md"
            >
              <a href="#aulas">
                <RollText>Ver as aulas</RollText>
                <ArrowDownIcon data-icon="inline-end" className="size-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
