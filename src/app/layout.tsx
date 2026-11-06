import type { Metadata, Viewport } from "next"
import { brand } from "@/data/site"

import "../index.css"

const title = "ONE Academia — Marechal Cândido Rondon"
const description =
  "ONE Academia: musculação e 10 modalidades coletivas (Hyrox, Pilates, Yoga, Jump, HIIT e mais) nas unidades Independência e Centro, em Marechal Cândido Rondon/PR. Aberta 7 dias por semana."

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title,
  description,
  applicationName: brand.name,
  // o ícone vem de src/app/icon.svg (convenção do Next)
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: brand.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0c0b",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body>{children}</body>
    </html>
  )
}
