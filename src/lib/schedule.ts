import {
  classes,
  DAY_LONG,
  type GymClass,
  type Range,
  type Time,
  type Unit,
} from "@/data/site"

export const toMin = (t: Time) => {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

/** "05:30" → "05h30" · "08:00" → "08h" */
export const fmt = (t: Time) => {
  const [h, m] = t.split(":")
  return m === "00" ? `${h}h` : `${h}h${m}`
}

export const fmtRange = (r: Range) => `${fmt(r.open)} às ${fmt(r.close)}`

export type UnitStatus =
  { open: true; closesAt: Time } | { open: false; opensAt: Time; when: string }

/** Status de uma unidade agora. Feriados não são detectados automaticamente. */
export function unitStatus(unit: Unit, now: Date): UnitStatus {
  const day = now.getDay()
  const min = now.getHours() * 60 + now.getMinutes()
  const today = unit.week[day]
  if (min >= toMin(today.open) && min < toMin(today.close))
    return { open: true, closesAt: today.close }
  if (min < toMin(today.open))
    return { open: false, opensAt: today.open, when: "hoje" }
  // todas as unidades abrem todos os dias, então a próxima abertura é amanhã
  return { open: false, opensAt: unit.week[(day + 1) % 7].open, when: "amanhã" }
}

export const dayName = (d: number) => DAY_LONG[d]

export type DaySession = {
  cls: GymClass
  time: Time
  min: number
  unidade?: Unit["id"]
}

/** Todas as aulas de um dia, em ordem de horário */
export function sessionsOn(day: number): DaySession[] {
  return classes
    .flatMap((cls) =>
      cls.sessions
        .filter((s) => s.days.includes(day))
        .map((s) => ({
          cls,
          time: s.time,
          min: toMin(s.time),
          unidade: s.unidade,
        }))
    )
    .sort((a, b) => a.min - b.min || a.cls.name.localeCompare(b.cls.name))
}

/** Dias (0–6) em que a aula acontece, em ordem de segunda a domingo */
export function classDays(cls: GymClass) {
  const set = new Set(cls.sessions.flatMap((s) => s.days))
  return [1, 2, 3, 4, 5, 6, 0].filter((d) => set.has(d))
}
