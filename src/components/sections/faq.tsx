import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { RevealTitle } from "@/components/section-head"
import { faq } from "@/data/site"

export function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-20 px-gutter py-24 md:py-32">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <RevealTitle
            lines={["Dúvidas", "frequentes"]}
            className="text-[clamp(52px,9vw,128px)] leading-[0.86]"
          />
          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
            Não achou sua resposta? A equipe responde pelo WhatsApp.
          </p>
        </div>
        <Accordion type="single" collapsible className="border-t">
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="border-b!">
              <AccordionTrigger className="py-6 text-left text-lg font-semibold hover:no-underline md:text-xl">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
