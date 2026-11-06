# ONE Academia: landing page

Site institucional da ONE Academia (unidades Independência e Centro, Marechal Cândido Rondon/PR).
100% estático: sem backend, sem banco, sem `.env`. Pronto para a Vercel.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/postcss`) + `tw-animate-css`
- shadcn/ui (Radix UI) + `class-variance-authority` + ícones `lucide-react`
- GSAP 3 + ScrollTrigger via `@gsap/react` · rolagem suave com Lenis
- Fontes self-hosted via Fontsource: Barlow Condensed (títulos) e Manrope (texto)
- ESLint (`eslint-config-next`) + Prettier (`prettier-plugin-tailwindcss`)

## Como rodar

Requer Node 20+ (testado no Node 24).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando             | O que faz                                    |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | servidor de desenvolvimento                  |
| `npm run build`     | build de produção                            |
| `npm run start`     | serve o build de produção                    |
| `npm run lint`      | ESLint                                       |
| `npm run typecheck` | checagem de tipos (`tsc --noEmit`)           |
| `npm run format`    | formata o código com Prettier                |

## Onde editar cada coisa

| O quê                                                               | Arquivo                                     |
| ------------------------------------------------------------------- | ------------------------------------------- |
| **Todo o conteúdo**: WhatsApp, Instagram, unidades, endereços, horários, aulas, planos, FAQ, texto "sobre", fotos | `src/data/site.ts` |
| Cores, fontes e efeitos (brilho, granulado)                         | `src/index.css`                             |
| Título, descrição e Open Graph                                      | `src/app/layout.tsx`                        |
| Imagem de compartilhamento (gerada no build)                        | `src/app/opengraph-image.tsx`               |
| SEO local (JSON-LD `ExerciseGym` por unidade)                       | `src/app/page.tsx` (gerado a partir do `site.ts`) |
| Seções                                                              | `src/components/sections/*.tsx`             |
| Logo (geometria vetorial)                                           | `src/components/logo-paths.ts`              |

Tudo que ainda precisa de validação está marcado no código com `// a confirmar`.

### Aulas

Cada aula em `classes` (no `site.ts`) tem uma lista de `sessions` com `days` (0 = domingo … 6 = sábado) e `time` (`"18:30"`).
O campo opcional `unidade` (`"independencia"` ou `"centro"`) já existe, mas ainda não foi preenchido.

### Planos

Os preços estão como `price: null`, o que mostra "Consulte" e o botão "Consultar valores no WhatsApp".
Quando houver valores, troque por número (ex.: `price: 129.9`) e o card passa a mostrar `R$ 129,90 por mês`.

### Logo

A logo foi redesenhada em SVG a partir da original. Os paths ficam em `src/components/logo-paths.ts`.
Se alterar a geometria, gere de novo os arquivos estáticos:

```bash
node scripts/build-logo.mjs   # atualiza public/logo.svg, public/logo-mono.svg e src/app/icon.svg (favicon)
```

## Animações e acessibilidade

- O site respeita `prefers-reduced-motion`: com movimento reduzido, o GSAP e as animações CSS são desligados e todo o conteúdo aparece direto.
- **Atenção no Windows:** se "Efeitos de animação" estiver desligado (Configurações → Acessibilidade → Efeitos visuais), o navegador informa movimento reduzido e **as animações não aparecem no PC**. Não é bug: ligue a opção para ver o site animado.
- Texto sobre o laranja da marca é quase preto (branco sobre `#F26522` não passa no contraste AA).
- O status "Aberto agora / Fechado" usa o relógio do visitante e os horários de dias normais; feriados não são detectados automaticamente.

## Deploy na Vercel

1. Suba a pasta para um repositório no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório. O framework (Next.js) é detectado sozinho; não há variáveis de ambiente.
3. Depois do primeiro deploy, troque `brand.url` em `src/data/site.ts` pelo domínio final (é usado no Open Graph e no JSON-LD).

Ou pela CLI: `npx vercel` (prévia) e `npx vercel --prod`.

## Pendências

- [ ] **Preços** dos planos (e nomes/benefícios dos planos)
- [ ] **Endereço completo**: rua da ONE Centro (nº 749), tipo de logradouro e bairro da ONE Independência (nº 1879)
- [ ] **Unidade de cada aula** (campo `unidade` em `classes`)
- [ ] **Fotos reais** das unidades (hoje são placeholders do Unsplash, em `images` e `units[].image`)
- [ ] **Cidade**: Marechal Cândido Rondon/PR foi deduzida pelo @ e pelo DDD 45
- [ ] **Instagram**: o post de horários mostra `@one_independencia`; o site usa `@oneacademia.mcr`
- [ ] Textos genéricos marcados `// a confirmar`: "sobre", FAQ, descrições das aulas, selo "Mais procurado"
- [ ] Domínio final (`brand.url`)
