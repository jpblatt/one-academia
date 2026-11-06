"use client"

import { useRef } from "react"
import { ClockIcon, MapPinIcon, NavigationIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RollText } from "@/components/roll-text"
import { SectionHead } from "@/components/section-head"
import { UnitStatus } from "@/components/unit-status"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import {
  gsap,
  prefersReducedMotion,
  useGSAP,
} from "@/components/motion-provider"
import { units, whatsappUrl } from "@/data/site"
import { fmtRange } from "@/lib/schedule"

export function Units() {
  const root = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>("[data-unit-img]").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, scrub: true },
          }
        )
      })
      gsap.from("[data-unit]", {
        y: 50,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-units-grid]", start: "top 85%" },
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id="unidades"
      className="scroll-mt-20 px-gutter py-24 md:py-32"
    >
      <SectionHead title={["Unidades"]}>
        Uma no bairro Independência, outra no Centro. O WhatsApp é o mesmo para
        as duas.
      </SectionHead>

      <div data-units-grid className="grid gap-5 lg:grid-cols-2">
        {units.map((u) => (
          <article
            key={u.id}
            data-unit
            className="overflow-hidden rounded-[2rem] border border-white/[.06] bg-card"
          >
            <div className="relative h-56 overflow-hidden sm:h-72">
              <img
                data-unit-img
                src={u.image}
                alt={`Ambiente de treino (foto ilustrativa da ${u.name})`}
                loading="lazy"
                className="absolute inset-0 size-full scale-[1.25] object-cover saturate-[.7]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,var(--card))]" />
              <UnitStatus
                unit={u}
                showName={false}
                className="absolute top-4 left-4"
              />
            </div>

            <div className="p-5 sm:p-7">
              <h3 className="font-heading text-[clamp(40px,6vw,56px)] leading-[0.9] font-extrabold uppercase">
                {u.name}
              </h3>
              <ul className="mt-5 flex flex-col gap-3 text-[15px]">
                <li className="flex items-start gap-3">
                  <MapPinIcon
                    className="mt-0.5 size-[18px] shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    {u.address}
                    <span className="text-muted-foreground">
                      , Marechal Cândido Rondon/PR
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ClockIcon
                    className="mt-0.5 size-[18px] shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    Seg a sex {fmtRange(u.week[1])}
                    <span className="block text-muted-foreground">
                      Sáb {fmtRange(u.week[6])} · Dom {fmtRange(u.week[0])}
                    </span>
                  </span>
                </li>
              </ul>

              <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                <Button
                  asChild
                  size="pill-lg"
                  variant="secondary"
                  className="px-5"
                >
                  <a href={u.mapsUrl} target="_blank" rel="noopener">
                    <NavigationIcon className="size-[18px]" />
                    <RollText>Como chegar</RollText>
                  </a>
                </Button>
                <Button asChild size="pill-lg" className="px-5">
                  <a
                    href={whatsappUrl(u.message)}
                    target="_blank"
                    rel="noopener"
                  >
                    <WhatsAppIcon className="size-5" />
                    <RollText>WhatsApp</RollText>
                  </a>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
