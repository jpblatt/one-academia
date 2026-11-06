"use client"

import { useRef } from "react"
import { ArrowUpIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/logo"
import {
  gsap,
  prefersReducedMotion,
  useGSAP,
} from "@/components/motion-provider"
import { brand, navLinks, units, whatsappUrl } from "@/data/site"

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        "[data-foot-big]",
        { yPercent: 35 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      )
    },
    { scope: ref }
  )

  const linkCls = "rounded-sm transition-colors hover:text-primary"

  return (
    <footer ref={ref} className="overflow-hidden px-gutter pt-20 pb-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-14 lg:grid-cols-[1.6fr_1fr_1.3fr_1fr]">
        <div className="col-span-full lg:col-span-1">
          <Logo className="mb-5 w-36" />
          <p className="max-w-[300px] text-sm leading-relaxed text-muted-foreground">
            Musculação e aulas coletivas em {brand.city}/{brand.state}.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h4 className="mb-4 text-sm font-semibold text-muted-foreground">
            Navegar
          </h4>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-muted-foreground">
            Unidades
          </h4>
          <ul className="flex flex-col gap-4">
            {units.map((u) => (
              <li key={u.id}>
                <a
                  href={u.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className={linkCls}
                >
                  <span className="block font-semibold">{u.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {u.address}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-muted-foreground">
            Social
          </h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener"
                className={linkCls}
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener"
                className={linkCls}
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:+${brand.whatsapp}`} className={linkCls}>
                {brand.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator />

      <div aria-hidden="true" className="mt-10">
        <div data-foot-big className="flex justify-center">
          <Logo mark className="w-[92%] max-w-[1400px] opacity-90" title="" />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pr-18 text-[13px] text-muted-foreground sm:pr-20">
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} {brand.name}. Todos os direitos
          reservados.
        </span>
        <a
          href="#top"
          className={`${linkCls} inline-flex min-h-11 items-center gap-1.5`}
        >
          Voltar ao topo
          <ArrowUpIcon className="size-4" aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
