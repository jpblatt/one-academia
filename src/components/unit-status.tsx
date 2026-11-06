"use client"

import { useNow } from "@/hooks/use-now"
import type { Unit } from "@/data/site"
import { fmt, unitStatus } from "@/lib/schedule"
import { cn } from "@/lib/utils"

/**
 * "Aberto agora / Fechado", calculado pelo relógio do visitante.
 * Antes de montar (servidor/hidratação) mostra um placeholder neutro.
 */
export function UnitStatus({
  unit,
  className,
  showName = true,
}: {
  unit: Unit
  className?: string
  showName?: boolean
}) {
  const now = useNow()
  const status = now ? unitStatus(unit, now) : null

  return (
    <div
      className={cn(
        "inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/10 bg-card/70 py-2 pr-4 pl-3 text-sm backdrop-blur-md",
        className
      )}
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2.5 shrink-0 rounded-full",
          status === null
            ? "bg-muted-foreground/50"
            : status.open
              ? "pulse-dot bg-emerald-400"
              : "bg-muted-foreground"
        )}
      />
      <span className="leading-tight">
        {showName && <strong className="font-semibold">{unit.short}</strong>}
        {showName && " "}
        {status === null ? (
          <span className="text-muted-foreground">verificando horário…</span>
        ) : status.open ? (
          <>
            <span className="font-semibold text-emerald-300">aberto agora</span>
            <span className="text-muted-foreground">
              , fecha às {fmt(status.closesAt)}
            </span>
          </>
        ) : (
          <>
            <span className="font-semibold text-foreground/90">fechado</span>
            <span className="text-muted-foreground">
              , abre {status.when} às {fmt(status.opensAt)}
            </span>
          </>
        )}
      </span>
    </div>
  )
}
