import { Button } from "@/components/ui/button"
import { RollText } from "@/components/roll-text"
import { RevealTitle } from "@/components/section-head"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { units, whatsappUrl } from "@/data/site"

export function Cta() {
  return (
    <section aria-labelledby="cta-title" className="px-gutter py-16 md:py-24">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/[.06] bg-surface px-6 py-16 text-center sm:px-10 md:py-24">
        <div
          aria-hidden="true"
          className="glow-breathe absolute inset-0 -z-10 glow-bottom"
        />
        <h2 id="cta-title" className="sr-only">
          Fale com a sua unidade
        </h2>
        <RevealTitle
          as="h3"
          lines={["Seu primeiro", "treino começa", "com um oi."]}
          className="mx-auto text-[clamp(48px,9vw,136px)] leading-[0.86]"
        />
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-foreground/80">
          Escolha a unidade mais perto de você. A mensagem já vai pronta.
        </p>
        <div className="mx-auto mt-10 flex max-w-xl flex-col justify-center gap-3 sm:flex-row">
          {units.map((u, i) => (
            <Button
              key={u.id}
              asChild
              size="pill-lg"
              variant={i === 0 ? "default" : "outline"}
              className={
                i === 0 ? "sm:flex-1" : "border-white/20 bg-white/5 sm:flex-1"
              }
            >
              <a href={whatsappUrl(u.message)} target="_blank" rel="noopener">
                <WhatsAppIcon className="size-5" />
                <RollText>{u.name}</RollText>
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
