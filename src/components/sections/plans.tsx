"use client"

import { useRef } from "react"
import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RollText } from "@/components/roll-text"
import { SectionHead } from "@/components/section-head"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import {
  gsap,
  prefersReducedMotion,
  useGSAP,
} from "@/components/motion-provider"
import { plans, whatsappUrl } from "@/data/site"
import { cn } from "@/lib/utils"

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

export function Plans() {
  const root = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from("[data-plan]", {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-plans-grid]", start: "top 85%" },
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id="planos"
      className="scroll-mt-20 px-gutter py-24 md:py-32"
    >
      <SectionHead title={["Planos"]}>
        Os valores mudam conforme o plano e as condições do mês. Chame no
        WhatsApp e receba a tabela atualizada.
      </SectionHead>

      <div data-plans-grid className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <article
            key={p.name}
            data-plan
            className={cn(
              "relative flex flex-col rounded-[2rem] p-5 sm:p-6 md:p-8",
              p.featured
                ? "border-2 border-transparent shadow-[0_30px_80px_-30px_oklch(0.676_0.189_42/.55)]"
                : "border border-white/[.07] bg-card/70"
            )}
            // borda em gradiente: fundo do card no padding-box + gradiente da marca no border-box
            style={
              p.featured
                ? {
                    background:
                      "linear-gradient(var(--card), var(--card)) padding-box, var(--brand-gradient) border-box",
                  }
                : undefined
            }
          >
            {p.badge && (
              <span className="absolute -top-3.5 left-6 rounded-full bg-brand px-3 py-1 text-xs font-bold text-primary-foreground">
                {p.badge}
              </span>
            )}
            <h3 className="font-heading text-[44px] leading-none font-extrabold uppercase">
              {p.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.period}</p>

            <div className="mt-8 border-y border-white/10 py-6">
              {p.price === null ? (
                <>
                  <span className="text-brand font-heading text-[56px] leading-none font-extrabold">
                    Consulte
                  </span>
                  <p className="mt-2 text-sm text-muted-foreground">
                    valor enviado pelo WhatsApp
                  </p>
                </>
              ) : (
                <>
                  <span className="font-heading text-[56px] leading-none font-extrabold">
                    {brl(p.price)}
                  </span>
                  <p className="mt-2 text-sm text-muted-foreground">por mês</p>
                </>
              )}
            </div>

            <ul className="mt-6 mb-8 flex flex-col gap-3">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-[15px]">
                  <CheckIcon
                    className="mt-0.5 size-[18px] shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {perk}
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="pill-lg"
              variant={p.featured ? "default" : "secondary"}
              className="mt-auto w-full px-4 text-sm sm:text-base"
            >
              <a
                href={whatsappUrl(
                  `Olá! Quero consultar os valores do plano ${p.name} da ONE Academia.`
                )}
                target="_blank"
                rel="noopener"
              >
                <WhatsAppIcon className="size-5" />
                <RollText>Consultar valores no WhatsApp</RollText>
              </a>
            </Button>
          </article>
        ))}
      </div>
    </section>
  )
}
