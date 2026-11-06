"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { RollText } from "@/components/roll-text"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import {
  ScrollTrigger,
  gsap,
  prefersReducedMotion,
  useGSAP,
  useMotion,
} from "@/components/motion-provider"
import { navLinks, whatsappUrl } from "@/data/site"
import { cn } from "@/lib/utils"

/**
 * Menu do desktop: uma pílula laranja desliza até o link sob o mouse.
 * Sem hover, ela marca a seção visível na tela (scroll spy + aria-current).
 */
function DesktopNav() {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [hovered, setHovered] = useState<number | null>(null)
  const [active, setActive] = useState<number | null>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)
  const target = hovered ?? active

  useGSAP(() => {
    const triggers = navLinks.map((l, i) => {
      const el = document.querySelector(l.href)
      if (!el) return null
      return ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (s) =>
          setActive((cur) => (s.isActive ? i : cur === i ? null : cur)),
      })
    })
    return () => triggers.forEach((t) => t?.kill())
  }, [])

  useLayoutEffect(() => {
    const measure = () => {
      const el = target === null ? null : linkRefs.current[target]
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [target])

  return (
    <nav
      aria-label="Seções"
      onPointerLeave={() => setHovered(null)}
      className="relative isolate hidden gap-1 rounded-full border border-white/10 bg-card/60 p-1.5 backdrop-blur-xl lg:flex"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1.5 bottom-1.5 -z-10 rounded-full bg-primary shadow-[0_0_28px_oklch(0.676_0.189_42/.55)] transition-[left,width,opacity,scale] duration-500 ease-[cubic-bezier(.2,.9,.2,1)]",
          pill ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}
        style={pill ?? undefined}
      />
      {navLinks.map((l, i) => (
        <Button
          key={l.href}
          asChild
          variant="ghost"
          className={cn(
            "h-9 rounded-full px-4 text-[15px] font-semibold transition-colors duration-300 hover:bg-transparent dark:hover:bg-transparent",
            target === i
              ? "text-primary-foreground hover:text-primary-foreground"
              : "text-foreground/80 hover:text-foreground"
          )}
        >
          <a
            ref={(el) => {
              linkRefs.current[i] = el
            }}
            href={l.href}
            aria-current={active === i ? "location" : undefined}
            onPointerEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
          >
            <RollText>{l.label}</RollText>
          </a>
        </Button>
      ))}
    </nav>
  )
}

export function SiteNav() {
  const { ready } = useMotion()
  const root = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 80,
      onToggle: (s) => setScrolled(s.isActive),
    })
    return () => st.kill()
  }, [])

  useGSAP(
    () => {
      if (!ready) return
      if (prefersReducedMotion()) {
        gsap.set(root.current, { autoAlpha: 1 })
        return
      }
      gsap.fromTo(
        root.current,
        { y: -30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
      )
    },
    { dependencies: [ready] }
  )

  return (
    <header
      ref={root}
      className={cn(
        "invisible fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 px-gutter py-3 transition-[background-color,box-shadow] duration-500",
        scrolled &&
          "bg-background/80 shadow-[0_1px_0_oklch(1_0_0/8%)] backdrop-blur-xl"
      )}
    >
      <a
        href="#top"
        className="flex items-center rounded-md"
        aria-label="ONE Academia, voltar ao início"
      >
        <Logo mark className="w-[78px]" title="ONE Academia" />
      </a>

      <DesktopNav />

      <div className="flex items-center gap-2">
        <Button asChild size="pill" className="hidden sm:inline-flex">
          <a href={whatsappUrl()} target="_blank" rel="noopener">
            <WhatsAppIcon className="size-[18px]" />
            <RollText>Falar no WhatsApp</RollText>
          </a>
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon-lg"
              className="size-11 rounded-full backdrop-blur-xl lg:hidden"
              aria-label="Abrir menu"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="rounded-b-3xl">
            <SheetHeader>
              <SheetTitle>
                <Logo mark className="w-20" />
              </SheetTitle>
              <SheetDescription>
                Unidades Independência e Centro
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Seções" className="flex flex-col gap-1 px-4 pb-6">
              {navLinks.map((l) => (
                <Button
                  key={l.href}
                  asChild
                  variant="ghost"
                  className="h-12 justify-start font-heading text-2xl font-bold uppercase"
                  onClick={() => setOpen(false)}
                >
                  <a href={l.href}>{l.label}</a>
                </Button>
              ))}
              <Button
                asChild
                size="pill"
                className="mt-3"
                onClick={() => setOpen(false)}
              >
                <a href={whatsappUrl()} target="_blank" rel="noopener">
                  <WhatsAppIcon className="size-[18px]" />
                  Falar no WhatsApp
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
