"use client"

import { useMemo, useRef, useState } from "react"
import {
  ActivityIcon,
  BabyIcon,
  DumbbellIcon,
  FlameIcon,
  FlowerIcon,
  MedalIcon,
  MusicIcon,
  TimerIcon,
  TrendingUpIcon,
  WavesIcon,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { RollText } from "@/components/roll-text"
import { SectionHead } from "@/components/section-head"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import {
  gsap,
  prefersReducedMotion,
  useGSAP,
} from "@/components/motion-provider"
import { useNow } from "@/hooks/use-now"
import {
  DAY_LONG,
  DAY_SHORT,
  classes,
  units,
  whatsappUrl,
  type ClassIcon,
  type GymClass,
} from "@/data/site"
import { classDays, fmt, fmtRange, sessionsOn } from "@/lib/schedule"
import { cn } from "@/lib/utils"

export const CLASS_ICONS: Record<ClassIcon, LucideIcon> = {
  core: ActivityIcon,
  pump: DumbbellIcon,
  jump: TrendingUpIcon,
  kids: BabyIcon,
  glute: FlameIcon,
  hiit: TimerIcon,
  dance: MusicIcon,
  hyrox: MedalIcon,
  yoga: FlowerIcon,
  pilates: WavesIcon,
}

/** Segunda primeiro, como na grade da academia */
const WEEK = [1, 2, 3, 4, 5, 6, 0]

const daysLabel = (cls: GymClass) => {
  const d = classDays(cls)
  return d.map((x) => DAY_SHORT[x]).join(", ")
}

export function Classes() {
  const root = useRef<HTMLElement>(null)
  const now = useNow()
  const today = now?.getDay() ?? null
  const nowMin = now ? now.getHours() * 60 + now.getMinutes() : null

  // null = o visitante ainda não escolheu; usa o dia de hoje (ou segunda antes de montar)
  const [picked, setPicked] = useState<number | null>(null)
  const day = picked ?? today ?? 1
  const isToday = today !== null && day === today

  const sessions = useMemo(() => sessionsOn(day), [day])
  const next =
    isToday && nowMin !== null
      ? (sessions.find((s) => s.min > nowMin) ?? null)
      : null

  // modalidades do dia, na ordem do primeiro horário
  const dayClasses = useMemo(() => {
    const seen = new Map<string, { cls: GymClass; times: typeof sessions }>()
    for (const s of sessions) {
      const entry = seen.get(s.cls.id) ?? { cls: s.cls, times: [] }
      entry.times.push(s)
      seen.set(s.cls.id, entry)
    }
    const list = [...seen.values()]
    if (!isToday || nowMin === null) return list
    // hoje: aulas que ainda vão acontecer primeiro (pela próxima sessão), encerradas no fim
    const nextMin = (e: (typeof list)[number]) =>
      e.times.find((t) => t.min > nowMin)?.min ?? Infinity
    return list.sort((a, b) => nextMin(a) - nextMin(b))
  }, [sessions, isToday, nowMin])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        "[data-class-card]",
        { y: 26, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.05,
          ease: "power3.out",
          overwrite: true,
        }
      )
    },
    { scope: root, dependencies: [day] }
  )

  return (
    <section
      ref={root}
      id="aulas"
      className="relative scroll-mt-20 px-gutter py-24 md:py-32"
    >
      <SectionHead title={["Aulas", "coletivas"]}>
        Dez modalidades por semana, das 06h às 20h. Escolha o dia e reserve sua
        vaga pelo WhatsApp.
      </SectionHead>

      {/* filtro por dia */}
      <ToggleGroup
        type="single"
        value={String(day)}
        onValueChange={(v) => v && setPicked(Number(v))}
        aria-label="Filtrar aulas por dia da semana"
        className="grid w-full max-w-3xl grid-cols-7 gap-1 rounded-full border border-white/10 bg-card/60 p-1"
        spacing={1}
      >
        {WEEK.map((d) => (
          <ToggleGroupItem
            key={d}
            value={String(d)}
            aria-label={DAY_LONG[d] + (d === today ? " (hoje)" : "")}
            className="relative h-12 min-w-0 flex-col gap-0 rounded-full px-0 text-[15px] font-semibold text-foreground/75 hover:bg-white/5 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <span className="leading-none">{DAY_SHORT[d]}</span>
            {d === today && (
              <span className="mt-1 text-[10px] leading-none font-bold tracking-wide uppercase opacity-80">
                hoje
              </span>
            )}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* resumo vivo do dia */}
      <p
        className="mt-6 min-h-6 text-base text-muted-foreground"
        aria-live="polite"
      >
        {dayClasses.length === 0 ? (
          <>Sem aulas coletivas em {DAY_LONG[day].toLowerCase()}.</>
        ) : isToday ? (
          next ? (
            <>
              Hoje tem {sessions.length} aulas. A próxima é{" "}
              <strong className="text-foreground">
                {next.cls.name} às {fmt(next.time)}
              </strong>
              .
            </>
          ) : (
            <>
              As aulas de hoje já terminaram. A musculação segue aberta no
              horário normal.
            </>
          )
        ) : (
          <>
            {DAY_LONG[day]}: {sessions.length} aulas, de {fmt(sessions[0].time)}{" "}
            a {fmt(sessions.at(-1)!.time)}.
          </>
        )}
      </p>

      {dayClasses.length === 0 ? (
        <div className="mt-8 rounded-[2rem] border border-dashed border-white/15 p-8 md:p-12">
          <p className="max-w-xl font-heading text-3xl leading-tight font-bold uppercase md:text-4xl">
            Fim de semana é de musculação
          </p>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {units.map((u, i) => (
              <span key={u.id}>
                {i > 0 && " "}
                {u.short}: {fmtRange(u.week[day])}.
              </span>
            ))}{" "}
            Volte para segunda e veja a grade.
          </p>
          <Button
            variant="outline"
            size="pill"
            className="mt-6"
            onClick={() => setPicked(1)}
          >
            Ver aulas de segunda
          </Button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {dayClasses.map(({ cls, times }) => {
            const Icon = CLASS_ICONS[cls.icon]
            const hasNext = next?.cls.id === cls.id
            const allPast =
              isToday && nowMin !== null && times.every((t) => t.min <= nowMin)
            const bookTime =
              (hasNext
                ? next
                : times.find(
                    (t) => nowMin === null || !isToday || t.min > nowMin
                  )) ?? times[0]
            const msg = `Olá! Quero reservar a aula de ${cls.name} de ${DAY_LONG[day].toLowerCase()} às ${fmt(bookTime.time)}.`
            return (
              <li
                key={cls.id}
                data-class-card
                className={cn(
                  "relative flex flex-col rounded-[1.75rem] border bg-card p-5 transition-colors md:p-6",
                  hasNext
                    ? "border-primary/70 shadow-[0_0_0_1px_var(--primary),0_20px_60px_-20px_oklch(0.676_0.189_42/.5)]"
                    : "border-white/[.06]",
                  allPast && "opacity-55"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-2xl",
                      hasNext
                        ? "bg-brand text-primary-foreground"
                        : "bg-white/[.06] text-gold"
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  {hasNext && (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      Próxima aula
                    </span>
                  )}
                  {allPast && (
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                      Encerrada hoje
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-heading text-[32px] leading-none font-bold uppercase">
                  {cls.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cls.blurb}
                </p>

                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label={`Horários de ${cls.name}`}
                >
                  {times.map((t) => {
                    const past = isToday && nowMin !== null && t.min <= nowMin
                    const isNext = next === t
                    return (
                      <li
                        key={t.time}
                        className={cn(
                          "rounded-full px-3.5 py-1.5 font-heading text-xl leading-none font-bold tabular-nums",
                          isNext
                            ? "bg-primary text-primary-foreground"
                            : past
                              ? "bg-white/[.04] text-muted-foreground line-through decoration-1"
                              : "bg-white/[.07] text-foreground"
                        )}
                      >
                        {fmt(t.time)}
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                  <span className="text-sm text-muted-foreground">
                    {daysLabel(cls)}
                  </span>
                  <Button
                    asChild
                    size="pill"
                    variant={hasNext ? "default" : "secondary"}
                  >
                    <a
                      href={whatsappUrl(msg)}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Reservar ${cls.name} às ${fmt(bookTime.time)} pelo WhatsApp`}
                    >
                      <WhatsAppIcon className="size-4" />
                      <RollText>Reservar</RollText>
                    </a>
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      <p className="mt-8 text-sm text-muted-foreground">
        Grade completa: {classes.length} modalidades. A unidade de cada aula é
        confirmada na reserva.
      </p>
    </section>
  )
}
