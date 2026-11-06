import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const alt = "ONE Academia — Marechal Cândido Rondon"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Imagem de compartilhamento (WhatsApp, Instagram, Facebook), gerada no build. */
export default async function OgImage() {
  const svg = await readFile(join(process.cwd(), "public/logo.svg"), "utf8")
  const logo = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(90% 75% at 50% 115%, #c9601d 0%, #5a2a0c 38%, #0d0c0b 72%)",
        color: "#fff",
      }}
    >
      <img src={logo} width={620} height={347} alt="" />
      <div
        style={{
          marginTop: 40,
          fontSize: 30,
          color: "#d4d4d4",
          letterSpacing: 2,
        }}
      >
        Independência e Centro · Marechal Cândido Rondon/PR
      </div>
    </div>,
    size
  )
}
