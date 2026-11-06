import { MotionProvider } from "@/components/motion-provider"
import { Preloader } from "@/components/preloader"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Cursor, WhatsAppFab } from "@/components/floating"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Classes } from "@/components/sections/classes"
import { Marquee } from "@/components/sections/marquee"
import { Hours } from "@/components/sections/hours"
import { Plans } from "@/components/sections/plans"
import { Units } from "@/components/sections/units"
import { Faq } from "@/components/sections/faq"
import { Cta } from "@/components/sections/cta"
import { brand, units, type Range } from "@/data/site"

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

/** SEO local: um ExerciseGym por unidade, com horários, telefone e link do Maps */
function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": units.map((u) => {
      // agrupa dias com o mesmo horário
      const groups = new Map<string, { range: Range; days: string[] }>()
      u.week.forEach((r, d) => {
        const key = `${r.open}-${r.close}`
        const g = groups.get(key) ?? { range: r, days: [] }
        g.days.push(`https://schema.org/${DAYS[d]}`)
        groups.set(key, g)
      })
      return {
        "@type": ["ExerciseGym", "HealthClub"],
        "@id": `${brand.url}/#${u.id}`,
        name: u.name,
        url: brand.url,
        telephone: `+${brand.whatsapp}`,
        image: `${brand.url}/logo.svg`,
        hasMap: u.mapsUrl,
        sameAs: [brand.instagram],
        parentOrganization: {
          "@type": "Organization",
          name: brand.name,
          url: brand.url,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: u.address,
          addressLocality: brand.city,
          addressRegion: brand.state,
          addressCountry: "BR",
        },
        openingHoursSpecification: [...groups.values()].map((g) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: g.days,
          opens: g.range.open,
          closes: g.range.close,
        })),
      }
    }),
  }
}

export default function Home() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        // conteúdo estático gerado a partir de src/data/site.ts
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <div className="grain">
        <Preloader />
        <SiteNav />
        <main>
          <Hero />
          <About />
          <Classes />
          <Marquee />
          <Hours />
          <Plans />
          <Units />
          <Faq />
          <Cta />
        </main>
        <SiteFooter />
        <WhatsAppFab />
        <Cursor />
      </div>
    </MotionProvider>
  )
}
