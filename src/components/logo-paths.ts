// Geometria vetorial da logo ONE Academia (redesenhada a partir da logo original).
// Usada pelo componente <Logo /> e pelo script scripts/build-logo.mjs (gera public/logo.svg e o favicon).

export const GOLD = "#F5A623"
export const ORANGE = "#E8501E"

/** "ONE" — altura 100, largura 246. O "N" é espelhado com a diagonal quebrando como um raio. */
export const ONE_PATHS = [
  // O: anel circular fino
  "M50 0a50 50 0 1 1 0 100a50 50 0 1 1 0-100Zm0 5.5a44.5 44.5 0 1 0 0 89a44.5 44.5 0 1 0 0-89Z",
  // N: perna fina + diagonal que se funde à haste grossa (o "raio")
  "M105 0H110.5V94.5L143 62L159 0H177L173 100H155V58L113 100H105Z",
  // E: traços retos
  "M188 0H246V5.5H193.5V47.25H240V52.75H193.5V94.5H246V100H188Z",
]

/** "ACADEMIA" — traços (stroke 2.6), altura 16, origem na linha de base. */
const G = {
  A: { w: 16, d: "M1 0L8 -15.5L15 0M3.8 -6H12.2" },
  C: { w: 15, d: "M13.1 -13.1A7.2 7.2 0 1 0 13.1 -2.9" },
  D: { w: 15, d: "M1.3 -14.7V-1.3H6.5A6.7 6.7 0 0 0 6.5 -14.7Z" },
  E: { w: 12, d: "M11 -14.7H1.3V-1.3H11M1.3 -8H9.5" },
  M: { w: 18, d: "M1.3 0V-14.7L9 -4L16.7 -14.7V0" },
  I: { w: 2.6, d: "M1.3 0V-16" },
} as const

export const ACADEMIA_GLYPHS = "ACADEMIA"
  .split("")
  .map((c) => G[c as keyof typeof G])

/** Distribui "ACADEMIA" com espaçamento largo ocupando a largura do "ONE" (0 → 246). */
export function layoutAcademia(width = 246) {
  const total = ACADEMIA_GLYPHS.reduce((s, g) => s + g.w, 0)
  const gap = (width - total) / (ACADEMIA_GLYPHS.length - 1)
  let x = 0
  return ACADEMIA_GLYPHS.map((g) => {
    const item = { d: g.d, x: Number(x.toFixed(2)) }
    x += g.w + gap
    return item
  })
}
