// Gera os arquivos SVG da logo a partir dos mesmos paths usados em src/components/logo.tsx.
// Uso: node scripts/build-logo.mjs  → public/logo.svg, public/logo-mono.svg, src/app/icon.svg
import { writeFileSync } from "node:fs"
import { ONE_PATHS, ACADEMIA_GLYPHS, layoutAcademia, GOLD, ORANGE } from "../src/components/logo-paths.ts"

const grad = (id, x2 = 246, y2 = 100) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}" gradientUnits="userSpaceOnUse"><stop offset=".15" stop-color="${GOLD}"/><stop offset="1" stop-color="${ORANGE}"/></linearGradient>`

const one = (fill) => `<g fill="${fill}">${ONE_PATHS.map((d) => `<path fill-rule="evenodd" d="${d}"/>`).join("")}</g>`

const academiaLinear = (stroke) =>
  `<g fill="none" stroke="${stroke}" stroke-width="2.6">${layoutAcademia()
    .map(({ d, x }) => `<path transform="translate(${x} 134)" d="${d}"/>`)
    .join("")}</g>`

const full = (fill, stroke, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 250 140">${defs}${one(fill)}${academiaLinear(stroke)}</svg>\n`

writeFileSync("public/logo.svg", full("url(#g)", "#fff", `<defs>${grad("g")}</defs>`))
writeFileSync("public/logo-mono.svg", full("#fff", "#fff"))

// Ícone circular (como a foto de perfil): ONE no centro + ACADEMIA em arco embaixo
const R = 150
const s = 0.86 // escala do ONE dentro do círculo
const oneX = R - (246 * s) / 2
const oneY = 142 - 50 * s
const arcR = 117
const letters = ACADEMIA_GLYPHS
const spanDeg = 94
const arc = letters
  .map((g, i) => {
    // ângulo a partir do ponto mais baixo do círculo: + à esquerda, − à direita
    const phi = spanDeg / 2 - (spanDeg / (letters.length - 1)) * i
    const rad = (phi * Math.PI) / 180
    const px = (R - arcR * Math.sin(rad)).toFixed(2)
    const py = (R + arcR * Math.cos(rad)).toFixed(2)
    return `<path transform="translate(${px} ${py}) rotate(${phi.toFixed(2)}) scale(1.15) translate(${-g.w / 2} 0)" d="${g.d}"/>`
  })
  .join("")

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs>${grad("g")}<radialGradient id="glow" cx="150" cy="330" r="230" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c9601d"/><stop offset=".35" stop-color="#5a2a0c"/><stop offset=".75" stop-color="#050505"/></radialGradient></defs><circle cx="150" cy="150" r="150" fill="url(#glow)"/><g transform="translate(${oneX.toFixed(2)} ${oneY.toFixed(2)}) scale(${s})">${one("url(#g)")}</g><g fill="none" stroke="#f5efe8" stroke-width="2.6">${arc}</g></svg>\n`
writeFileSync("src/app/icon.svg", icon)
console.log("ok")
