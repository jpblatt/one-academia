"use client"

import { MapPinIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionHead } from "@/components/section-head"
import { UnitStatus } from "@/components/unit-status"
import { useNow } from "@/hooks/use-now"
import { hourRows, units, type Unit } from "@/data/site"
import { fmtRange } from "@/lib/schedule"
import { cn } from "@/lib/utils"

/** Tabela de uma unidade, em pílulas como no post de horários. */
function UnitHours({ unit, today }: { unit: Unit; today: number | null }) {
  return (
    <div className="rounded-[2rem] border border-white/[.06] bg-surface/70 p-3 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-1">
        <h3 className="flex items-center gap-2 font-heading text-[28px] leading-none font-bold uppercase sm:text-[32px]">
          <MapPinIcon className="size-6 text-primary" aria-hidden="true" />
          {unit.name}
        </h3>
        <UnitStatus unit={unit} showName={false} className="min-h-9 py-1.5" />
      </div>
      <ul className="flex flex-col gap-2.5">
        {hourRows.map((row) => {
          const range = "holiday" in row ? unit.holiday : unit.week[row.days[0]]
          const current =
            today !== null && (row.days as readonly number[]).includes(today)
          return (
            <li
              key={row.label}
              aria-current={current ? "date" : undefined}
              className={cn(
                "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-full border py-3.5 pr-4 pl-4 sm:grid-cols-[150px_1fr] sm:gap-3 sm:pr-5 sm:pl-5",
                current
                  ? "border-primary bg-primary/12 shadow-[0_0_30px_-8px_oklch(0.676_0.189_42/.6)]"
                  : "border-white/[.07] bg-card"
              )}
            >
              <span className="flex items-center gap-1.5 text-base font-semibold whitespace-nowrap sm:gap-2 sm:text-[17px]">
                {row.label}
                {current && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
                    hoje
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "text-right font-heading text-xl leading-none font-bold whitespace-nowrap tabular-nums sm:border-l sm:border-white/15 sm:pl-4 sm:text-left sm:text-2xl",
                  current && "text-gold"
                )}
              >
                {fmtRange(range)}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Hours() {
  const now = useNow()
  const today = now?.getDay() ?? null

  return (
    <section
      id="horarios"
      className="relative scroll-mt-20 overflow-hidden px-gutter py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 glow-bottom opacity-60"
      />
      <SectionHead title={["Horários de", "funcionamento"]}>
        Cada unidade tem seu horário no fim de semana. Confira antes de sair de
        casa.
      </SectionHead>

      {/* mobile: abas */}
      <Tabs defaultValue={units[0].id} className="md:hidden">
        <TabsList className="mb-4 h-12! w-full rounded-full bg-card p-1">
          {units.map((u) => (
            <TabsTrigger
              key={u.id}
              value={u.id}
              className="rounded-full text-[15px] font-semibold data-active:bg-primary! data-active:text-primary-foreground!"
            >
              {u.short}
            </TabsTrigger>
          ))}
        </TabsList>
        {units.map((u) => (
          <TabsContent key={u.id} value={u.id}>
            <UnitHours unit={u} today={today} />
          </TabsContent>
        ))}
      </Tabs>

      {/* desktop: lado a lado */}
      <div className="hidden gap-5 md:grid md:grid-cols-2">
        {units.map((u) => (
          <UnitHours key={u.id} unit={u} today={today} />
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Em feriados vale a linha &ldquo;Feriado&rdquo;. O status &ldquo;aberto
        agora&rdquo; considera o horário de dias normais.
      </p>
    </section>
  )
}
