// Todo o conteúdo do site num lugar só. Edite aqui.
// Itens marcados com "a confirmar" ainda precisam ser validados com a academia.

export const brand = {
  name: "ONE Academia",
  city: "Marechal Cândido Rondon", // a confirmar (deduzido pelo @ e pelo DDD 45)
  state: "PR",
  /** WhatsApp único das duas unidades: DDI + DDD + número, só dígitos */
  whatsapp: "554532548495",
  phoneDisplay: "(45) 3254-8495",
  instagram: "https://www.instagram.com/oneacademia.mcr/",
  instagramHandle: "@oneacademia.mcr",
  whatsappMessage: "Olá! Quero informações sobre a ONE Academia.",
  url: "https://oneacademia.vercel.app", // a confirmar: troque pelo domínio final
}

export const whatsappUrl = (msg: string = brand.whatsappMessage) =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`

export const navLinks = [
  { href: "#aulas", label: "Aulas" },
  { href: "#horarios", label: "Horários" },
  { href: "#planos", label: "Planos" },
  { href: "#unidades", label: "Unidades" },
  { href: "#duvidas", label: "Dúvidas" },
] as const

/* ───────────────────────── Unidades e horários ───────────────────────── */

/** "HH:MM" */
export type Time = `${number}:${number}`
export type Range = { open: Time; close: Time }

export type UnitId = "independencia" | "centro"

export type Unit = {
  id: UnitId
  name: string
  short: string
  address: string
  mapsUrl: string
  image: string
  /** Mensagem pré-preenchida no WhatsApp */
  message: string
  /** Índice = dia da semana (0 = domingo … 6 = sábado) */
  week: [Range, Range, Range, Range, Range, Range, Range]
  holiday: Range
}

const weekdays = (r: Range, sat: Range, sun: Range): Unit["week"] => [
  sun,
  r,
  r,
  r,
  r,
  r,
  sat,
]

export const units: Unit[] = [
  {
    id: "independencia",
    name: "ONE Independência",
    short: "Independência",
    address: "Independência, 1879", // a confirmar: tipo de logradouro (rua/avenida) e bairro
    mapsUrl: "https://maps.app.goo.gl/87cyCTZ7iAvYrSYv7",
    image:
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1400&q=75",
    message: "Olá! Quero informações sobre a ONE Independência.",
    week: weekdays(
      { open: "05:30", close: "22:30" },
      { open: "08:00", close: "11:30" },
      { open: "09:00", close: "11:00" }
    ),
    holiday: { open: "08:30", close: "11:30" },
  },
  {
    id: "centro",
    name: "ONE Centro",
    short: "Centro",
    address: "Nº 749, Centro", // a confirmar: nome da rua
    mapsUrl: "https://maps.app.goo.gl/MH4ZnA62VRaXqd6XA",
    image:
      "https://images.unsplash.com/photo-1623874514711-0f321325f318?auto=format&fit=crop&w=1400&q=75",
    message: "Olá! Quero informações sobre a ONE Centro.",
    week: weekdays(
      { open: "05:30", close: "23:00" },
      { open: "14:00", close: "17:00" },
      { open: "17:00", close: "19:00" }
    ),
    holiday: { open: "16:00", close: "19:00" },
  },
]

/** Linhas da tabela de horários (como no post do Instagram) */
export const hourRows = [
  { label: "Seg a Sex", days: [1, 2, 3, 4, 5] },
  { label: "Sábado", days: [6] },
  { label: "Domingo", days: [0] },
  { label: "Feriado", days: [] as number[], holiday: true },
] as const

/* ───────────────────────── Aulas coletivas ───────────────────────── */

export type ClassIcon =
  | "core"
  | "pump"
  | "jump"
  | "kids"
  | "glute"
  | "hiit"
  | "dance"
  | "hyrox"
  | "yoga"
  | "pilates"

export type Session = {
  /** 0 = domingo … 6 = sábado */
  days: number[]
  time: Time
  /** Em qual unidade acontece. Ainda não informado. a confirmar */
  unidade?: UnitId
}

export type GymClass = {
  id: string
  name: string
  icon: ClassIcon
  blurb: string // a confirmar: descrições curtas genéricas
  sessions: Session[]
}

const SEG_QUA = [1, 3]
const TER_QUI = [2, 4]
const SEG_QUA_SEX = [1, 3, 5]

export const classes: GymClass[] = [
  {
    id: "hyrox",
    name: "Hyrox",
    icon: "hyrox",
    blurb: "Corrida e estações funcionais no formato da competição.",
    sessions: [
      { days: SEG_QUA_SEX, time: "06:00" },
      { days: SEG_QUA_SEX, time: "07:30" },
      { days: SEG_QUA_SEX, time: "18:00" },
      { days: SEG_QUA_SEX, time: "19:00" },
    ],
  },
  {
    id: "hiit",
    name: "HIIT",
    icon: "hiit",
    blurb: "Tiros curtos e intensos para acelerar o condicionamento.",
    sessions: [
      { days: SEG_QUA_SEX, time: "06:15" },
      { days: SEG_QUA, time: "18:15" },
    ],
  },
  {
    id: "pump",
    name: "Pump",
    icon: "pump",
    blurb: "Barra e anilhas no ritmo da música, para o corpo todo.",
    sessions: [
      { days: SEG_QUA, time: "19:00" },
      { days: TER_QUI, time: "06:00" },
      { days: [5], time: "18:45" },
    ],
  },
  {
    id: "power-gluteo",
    name: "Power Glúteo",
    icon: "glute",
    blurb: "Treino focado em glúteos e membros inferiores.",
    sessions: [
      { days: SEG_QUA, time: "20:00" },
      { days: TER_QUI, time: "17:45" },
    ],
  },
  {
    id: "jump",
    name: "Jump",
    icon: "jump",
    blurb: "Aeróbico no mini trampolim: alto gasto e baixo impacto.",
    sessions: [{ days: TER_QUI, time: "19:15" }],
  },
  {
    id: "ritmos",
    name: "Ritmos",
    icon: "dance",
    blurb: "Coreografias animadas para suar dançando.",
    sessions: [
      { days: SEG_QUA, time: "16:00" },
      { days: TER_QUI, time: "20:00" },
      { days: [5], time: "17:00" },
    ],
  },
  {
    id: "yoga",
    name: "Yoga",
    icon: "yoga",
    blurb: "Força, equilíbrio e respiração com calma.",
    sessions: [
      { days: SEG_QUA, time: "09:00" },
      { days: SEG_QUA, time: "17:00" },
      { days: TER_QUI, time: "07:30" },
      { days: [4], time: "18:00" },
    ],
  },
  {
    id: "pilates",
    name: "Pilates",
    icon: "pilates",
    blurb: "Postura, core e mobilidade com movimentos controlados.",
    sessions: [
      { days: SEG_QUA_SEX, time: "07:30" },
      { days: [2], time: "18:15" },
      { days: [5], time: "18:00" },
    ],
  },
  {
    id: "abdominal-mobilidade",
    name: "Abdominal e Mobilidade",
    icon: "core",
    blurb: "Core forte e articulações soltas em uma aula só.",
    sessions: [{ days: TER_QUI, time: "18:30" }],
  },
  {
    id: "kids",
    name: "Kids",
    icon: "kids",
    blurb: "Movimento e brincadeira orientados para as crianças.",
    sessions: [
      { days: TER_QUI, time: "10:00" },
      { days: TER_QUI, time: "15:00" },
    ],
  },
]

/** Nomes curtos dos dias, índice 0 = domingo */
export const DAY_SHORT = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
] as const
export const DAY_LONG = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
] as const

/* ───────────────────────── Planos ───────────────────────── */

export type Plan = {
  name: string
  /** Valor mensal em reais. `null` = ainda não informado, mostra "Consulte". */
  price: number | null
  period: string
  perks: string[]
  featured?: boolean
  /** Selo acima do card em destaque */
  badge?: string
}

// a confirmar: nomes dos planos, benefícios e valores. Nenhum preço foi informado.
export const plans: Plan[] = [
  {
    name: "Mensal",
    price: null,
    period: "sem fidelidade",
    perks: ["Musculação", "Aulas coletivas da grade", "Ideal para começar"],
  },
  {
    name: "Semestral",
    price: null,
    period: "6 meses",
    perks: ["Musculação", "Aulas coletivas da grade", "Valor mensal menor"],
    featured: true,
    badge: "Mais procurado", // a confirmar
  },
  {
    name: "Anual",
    price: null,
    period: "12 meses",
    perks: ["Musculação", "Aulas coletivas da grade", "Melhor custo no ano"],
  },
]

/* ───────────────────────── Sobre ───────────────────────── */

// a confirmar: texto institucional
export const about = {
  text: "A ONE nasceu para quem quer treinar perto de casa ou do trabalho, no horário que dá. São duas unidades em Marechal Cândido Rondon, musculação completa e uma grade de aulas coletivas que começa às 6h da manhã.",
  stats: [
    { value: 2, label: "unidades na cidade" },
    { value: 10, label: "modalidades coletivas" },
    { value: 7, label: "dias por semana abertos" },
  ],
}

/* ───────────────────────── Dúvidas ───────────────────────── */

// a confirmar: perguntas e respostas genéricas, validar com a academia
export const faq = [
  {
    q: "Posso treinar nas duas unidades?",
    a: "Fale com a equipe pelo WhatsApp: ela explica como funciona o acesso às unidades Independência e Centro no seu plano.",
  },
  {
    q: "As aulas coletivas estão incluídas no plano?",
    a: "A grade de aulas é para alunos da ONE. Confirme pelo WhatsApp quais modalidades entram no plano que você escolher.",
  },
  {
    q: "Preciso agendar as aulas?",
    a: "Algumas turmas têm vagas limitadas. Use o botão Reservar na aula desejada e a equipe confirma o seu lugar.",
  },
  {
    q: "Posso fazer uma aula experimental?",
    a: "Chame no WhatsApp e combine um dia para conhecer a estrutura e a equipe.",
  },
  {
    q: "A academia abre em feriados?",
    a: "Sim, em horário reduzido: Independência das 08h30 às 11h30 e Centro das 16h às 19h.",
  },
  {
    q: "Tem aula para crianças?",
    a: "Tem. A aula Kids acontece às terças e quintas, às 10h e às 15h.",
  },
]

/* ───────────────────────── Imagens (placeholders do Unsplash) ───────────────────────── */

// a confirmar: trocar por fotos reais das unidades
export const images = {
  hero: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=2000&q=75",
  about:
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=75",
  classes:
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=2000&q=75",
}
