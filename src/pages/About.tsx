import { useState, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronRight from '../components/ChevronRight'
import ChevronDown from '../components/ChevronDown'
import ChevronUp from '../components/ChevronUp'
import { useLanguage } from '../i18n/LanguageContext'
import profileImg from '../imports/c6037aa9-14d7-4c26-9a01-4a3a2bb1cf8d.jpg'
import iadeLogo from '../imports/logos/iade.png'
import ecvLogo from '../imports/logos/ecv.png'
import ixdfLogo from '../imports/logos/ixdf.png'

const thumb = { width: 48, height: 48, borderRadius: 8, flexShrink: 0, background: '#F7FAFF', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' } as const
const thumbImg = { width: '70%', height: '70%', objectFit: 'contain' } as const

const eyebrow = { fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C' } as const
const eyebrowWithTitle = { ...eyebrow, marginBottom: 12 } as const
const eyebrowStandalone = { ...eyebrow, marginBottom: 20 } as const
const sectionTitle = { fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', color: '#12141F', margin: '0 0 24px' } as const

const PHILOSOPHY_ANGLES = [-90, -18, 54, 126, 198]

function PhilosophyFlower({ label, hovered, onHover, size = 340 }: { label: [string, string]; hovered: number | null; onHover: (i: number | null) => void; size?: number }) {
  const cx = 180, cy = 180, R = 96, d = 74
  const order = [...PHILOSOPHY_ANGLES.map((_, i) => i)].sort((a, b) => (a === hovered ? 1 : b === hovered ? -1 : 0))
  return (
    <svg viewBox="0 0 360 360" width={size} height={size} style={{ flexShrink: 0, overflow: 'visible' }}>
      <defs>
        <filter id="philosophy-center-shadow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="rgba(20,30,60,0.22)" />
        </filter>
      </defs>
      <g style={{ mixBlendMode: 'multiply' }}>
        {order.map(i => {
          const rad = (PHILOSOPHY_ANGLES[i] * Math.PI) / 180
          const isHovered = hovered === i
          return (
            <circle
              key={i}
              cx={cx + d * Math.cos(rad)}
              cy={cy + d * Math.sin(rad)}
              r={R}
              fill={isHovered ? 'rgba(61,99,224,0.34)' : 'rgba(61,99,224,0.14)'}
              stroke={isHovered ? '#3D63E0' : '#9FB4F2'}
              strokeWidth={isHovered ? 2 : 1}
              style={{ cursor: 'pointer', transition: 'fill 160ms ease, stroke 160ms ease, stroke-width 160ms ease' }}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
            />
          )
        })}
      </g>
      <circle cx={cx} cy={cy} r={66} fill="#FFFFFF" stroke="#DCE4F9" strokeWidth={1.5} filter="url(#philosophy-center-shadow)" style={{ pointerEvents: 'none' }} />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={14} fontWeight={800} fill="#001A5C" fontFamily="Inter, sans-serif" style={{ pointerEvents: 'none' }}>{label[0]}</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fontSize={14} fontWeight={800} fill="#001A5C" fontFamily="Inter, sans-serif" style={{ pointerEvents: 'none' }}>{label[1]}</text>
      {PHILOSOPHY_ANGLES.map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const nd = d + R * 0.46
        const isHovered = hovered === i
        return (
          <text
            key={i}
            x={cx + nd * Math.cos(rad)}
            y={cy + nd * Math.sin(rad) + 5}
            textAnchor="middle"
            fontSize={isHovered ? 14 : 13}
            fontWeight={800}
            fill="#001A5C"
            fontFamily="Inter, sans-serif"
            style={{ pointerEvents: 'none', transition: 'font-size 160ms ease' }}
          >
            {String(i + 1).padStart(2, '0')}
          </text>
        )
      })}
    </svg>
  )
}

function iconProps(size: number) {
  return { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
}
function BulbIcon({ size = 22 }: { size?: number }) {
  return (
    <svg {...iconProps(size)}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.44 1 1.14 1 1.9V16h5v-.2c0-.76.4-1.46 1-1.9A6 6 0 0 0 12 3Z" />
    </svg>
  )
}
function StairsIcon({ size = 22 }: { size?: number }) {
  return (
    <svg {...iconProps(size)}>
      <path d="M4 20v-4h4v-4h4V8h4V4" />
    </svg>
  )
}
function RefreshIcon({ size = 22 }: { size?: number }) {
  return (
    <svg {...iconProps(size)}>
      <path d="M4 11a8 8 0 0 1 14-5.2M20 4v4h-4" />
      <path d="M20 13a8 8 0 0 1-14 5.2M4 20v-4h4" />
    </svg>
  )
}
function ColumnsIcon({ size = 22 }: { size?: number }) {
  return (
    <svg {...iconProps(size)}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16M15 4v16" />
    </svg>
  )
}
function FunnelIcon({ size = 22 }: { size?: number }) {
  return (
    <svg {...iconProps(size)}>
      <path d="M4 5h16l-6 7.5V18l-4 2v-7.5Z" />
    </svg>
  )
}

const METHOD_VISUALS: Record<string, { Icon: (p: { size?: number }) => ReactElement; accent: string }> = {
  designThinking: { Icon: BulbIcon, accent: '#0B1640' },
  waterfall: { Icon: StairsIcon, accent: '#6B7390' },
  agile: { Icon: RefreshIcon, accent: '#3D56A6' },
  scrum: { Icon: ColumnsIcon, accent: '#1E3A8A' },
  lean: { Icon: FunnelIcon, accent: '#0F2EA1' },
}

const education = [
  { degreeKey: 'master', school: 'IADE – Creative University · 2017–2019', logo: iadeLogo },
  { degreeKey: 'bachelorGraphic', school: 'ECV – École de Création Visuelle · 2016', logo: ecvLogo },
  { degreeKey: 'bachelorDesign', school: 'IADE – Creative University · 2012–2015', logo: iadeLogo },
]

const certifications = [
  { title: 'Dynamic User Experience: Design and Usability', org: 'IxDF · Sep 2024', logo: ixdfLogo },
  { title: 'AI for Designers', org: 'IxDF · May 2026', logo: ixdfLogo },
  { title: 'Accessibility: How to Design for All', org: 'IxDF · Jan 2025', logo: ixdfLogo },
  { title: 'UX Management: Strategy and Tactics', org: 'IxDF · Sep 2024', logo: ixdfLogo },
  { title: 'User Research: Methods and Best Practices', org: 'IxDF · Sep 2023', logo: ixdfLogo },
]

const copy = {
  en: {
    eyebrow: 'About',
    bio: [
      "Design has been the thread connecting everything I've done, even before I realised it would become my career.",
      "I began in Graphic Design, where I developed a deep appreciation for visual communication, typography and the subtle details that shape how people perceive information. Over time, I became less interested in the interface itself and more interested in the people behind it. That curiosity naturally led me into UX, UI and eventually Product Design.",
      'Today, I design enterprise products that transform complex systems into experiences that feel intuitive and efficient. Looking back, my career has never been about changing disciplines — it has been about broadening my perspective: from visual execution to strategic thinking, from designing screens to designing products that create value for both people and businesses.',
      "I believe the best design isn't the one people notice. It's the one that quietly helps them achieve what they came to do.",
    ],
    bioNote: 'That work has also taken me across borders — international client engagements across financial services and government, among others.',
    howIThinkTitle: 'How I Think',
    howIThink: [
      'Curiosity has always shaped the way I approach both design and life.',
      "As a child, I dreamed of becoming a car designer. I wasn't fascinated by cars themselves, but by the balance between engineering, aesthetics and human experience. I admired how thoughtful design could make something complex feel effortless. Although my path led me into digital products instead, I realised I was pursuing the very same idea: experiences where clarity and craftsmanship serve a purpose, instead of existing for their own sake.",
      "I rarely begin with solutions — I begin with questions. Understanding people, their context and the problems they're trying to solve is the foundation of every meaningful product.",
      "I'm naturally calm in complex environments and enjoy bringing clarity where there is ambiguity. I think in systems, connecting individual details with the bigger picture while balancing user needs, business goals and technical constraints.",
      'For me, great products are never created in isolation. They emerge through research and honest conversation — between designers, engineers, product managers and stakeholders.',
      "Beautiful interfaces matter, but they're rarely the objective. They're the outcome of thoughtful decisions made throughout the entire design process.",
    ],
    pullQuote: 'Clarity over complexity. Understanding before execution. Progress through collaboration.',
    beyondTitle: 'Beyond Design',
    beyond: [
      "Curiosity doesn't stop when I close my laptop.",
      "I'm constantly exploring emerging technologies, particularly Artificial Intelligence, and I'm always interested in discovering products that solve problems with elegance and simplicity. I find inspiration in architecture, industrial design, photography and the quiet beauty of minimalist spaces — but just as often in everyday moments, conversations and the way people naturally interact with the world around them.",
      "Some of my best ideas don't happen in front of a screen. They arrive during a walk, a swim in the sea, or simply by paying attention to the small details most people overlook. There's a particular kind of clarity that comes from being in nature — the rhythm of the ocean, the quiet of a long walk on the beach — that mirrors the same clarity I look for in design: nothing extra, nothing forced.",
      'Travelling has taught me that every environment shapes behaviour differently, while observing people continually reminds me that the smallest design decisions often have the greatest impact.',
    ],
    closingNote: "Technology evolves constantly. Human behaviour changes slowly. That's why I believe understanding people will always be the most valuable design skill.",
    skillsEyebrow: 'Skills & Expertise',
    skillsTitle: 'Where I add the most value',
    skills: ['Product Design', 'UX Research', 'Design Systems', 'Accessibility', 'Strategy', 'Leadership', 'Visual Design', 'AI for Designers'],
    methodologiesEyebrow: 'Methodologies',
    methodologies: [
      { key: 'designThinking', title: 'Design Thinking', subtitle: 'Discovery' },
      { key: 'waterfall', title: 'Waterfall', subtitle: 'Planned delivery' },
      { key: 'agile', title: 'Agile', subtitle: 'Adaptive delivery' },
      { key: 'scrum', title: 'Scrum', subtitle: 'Adaptive delivery' },
      { key: 'lean', title: 'Lean', subtitle: 'Efficiency & value' },
    ],
    philosophyLabel: ['DESIGN', 'PHILOSOPHY'] as [string, string],
    philosophyItems: [
      { n: '01', text: 'Clarity over decoration' },
      { n: '02', text: 'Research before assumptions' },
      { n: '03', text: 'Systems before screens' },
      { n: '04', text: 'Accessibility by default' },
      { n: '05', text: 'Products should reduce complexity, not display it' },
    ],
    processNote: 'Process matters as much as craft.',
    howIWorkEyebrow: 'How I Work',
    howIWorkTitle: 'From discovery to a shipped decision',
    methodLink: 'See how I turned this into a repeatable agent workflow: Agentic UX Flow',
    showLess: 'Show less',
    learnMore: 'Learn more',
    workPhases: [
      {
        id: 'discover', name: 'Discover',
        description: "Understanding what's actually happening before proposing what's next.",
        deliverables: ['Stakeholder interviews', 'Audit findings', 'Journey maps'],
        detail: "I start by shadowing the real workflow, not the org chart's description of it — the gap between the two is usually where the project actually lives. I look for the moment someone reaches for a spreadsheet or a workaround; that's the brief writing itself.",
        question: "What's actually broken, and for whom?",
        proof: { label: 'See this in the OneRAK research phase', to: '/work/onerak' },
      },
      {
        id: 'define', name: 'Define',
        description: 'Turning findings into a brief the whole team can align behind.',
        deliverables: ['Personas', 'Problem statements', 'Success metrics'],
        detail: "I write the problem statement before the persona, not after — it keeps the persona honest to a real decision instead of a mood board. Every persona has to earn its place by driving at least one screen that would look different without it.",
        question: 'Whose definition of success are we actually designing for?',
        proof: { label: 'See this in the workforce-fund personas', to: '/work/tamkeen' },
      },
      {
        id: 'design', name: 'Design',
        description: 'Prototyping decisions, not just screens.',
        deliverables: ['Wireframes', 'Prototypes', 'Design systems'],
        detail: 'Every screen has to answer one decision, not showcase a feature. I sketch the rejected direction alongside the shipped one — arguing against my own first idea is usually what gets it to the second, better one.',
        question: 'Would this hold up under a live audit, not just a demo?',
        proof: { label: 'See this in the Design System key decisions', to: '/work/design-system' },
      },
      {
        id: 'deliver', name: 'Deliver',
        description: 'Handing over something a team can actually run, not just a working prototype.',
        deliverables: ['Dev handoff specs', 'QA passes', 'Rollout support'],
        detail: 'I stay through the first weeks of real use, not just the handoff meeting. Adoption problems show up as small hesitations, not bug reports — catching those early is the difference between a shipped feature and a used one.',
        question: 'Did this actually change how people work?',
        proof: { label: 'See this in the IntelliForge results', to: '/work/intelliforge' },
      },
    ],
    educationEyebrow: 'Education',
    degree: {
      master: "Master's — Design Management",
      bachelorGraphic: 'Bachelor — Graphic Design',
      bachelorDesign: 'Bachelor — Design',
    },
    certificationsEyebrow: 'Certifications',
    languages: 'Fluent in Portuguese and English, working proficiency in Spanish and French.',
  },
  pt: {
    eyebrow: 'Sobre',
    bio: [
      'O design tem sido o fio condutor de tudo o que fiz, mesmo antes de perceber que se tornaria a minha carreira.',
      'Comecei no Design Gráfico, onde desenvolvi uma apreciação profunda pela comunicação visual, tipografia e os detalhes subtis que moldam a forma como as pessoas percecionam a informação. Com o tempo, deixei de estar tão interessado na interface em si e passei a interessar-me mais pelas pessoas por trás dela. Essa curiosidade levou-me naturalmente para UX, UI e, eventualmente, Design de Produto.',
      'Hoje, desenho produtos empresariais que transformam sistemas complexos em experiências intuitivas e eficientes. Olhando para trás, a minha carreira nunca foi sobre mudar de disciplina — foi sobre alargar a perspetiva: da execução visual ao pensamento estratégico, de desenhar ecrãs a desenhar produtos que criam valor tanto para as pessoas como para os negócios.',
      'Acredito que o melhor design não é aquele que as pessoas notam. É aquele que, discretamente, as ajuda a alcançar aquilo que vieram fazer.',
    ],
    bioNote: 'Esse trabalho também me levou além-fronteiras — colaborações internacionais com clientes em serviços financeiros e setor público, entre outros.',
    howIThinkTitle: 'Como Penso',
    howIThink: [
      'A curiosidade sempre moldou a forma como encaro o design e a vida.',
      'Em criança, sonhava ser designer de automóveis. Não me fascinavam os carros em si, mas o equilíbrio entre engenharia, estética e experiência humana. Admirava como um design pensado conseguia tornar algo complexo em algo que parecia simples. Apesar de o meu caminho me ter levado para os produtos digitais, percebi que estava a perseguir exatamente a mesma ideia: experiências onde a clareza e o craft servem um propósito, em vez de existirem só por si.',
      'Raramente começo pelas soluções — começo pelas perguntas. Compreender as pessoas, o seu contexto e os problemas que tentam resolver é a base de qualquer produto com significado.',
      'Sou naturalmente calmo em ambientes complexos e gosto de trazer clareza onde há ambiguidade. Penso em sistemas, ligando detalhes individuais ao panorama geral, equilibrando as necessidades das pessoas, os objetivos do negócio e as restrições técnicas.',
      'Para mim, grandes produtos nunca nascem isolados. Surgem de investigação e conversas honestas — entre designers, engenheiros, product managers e stakeholders.',
      'Interfaces bonitas importam, mas raramente são o objetivo. São o resultado de decisões cuidadas tomadas ao longo de todo o processo de design.',
    ],
    pullQuote: 'Clareza antes da complexidade. Compreender antes de executar. Progresso através da colaboração.',
    beyondTitle: 'Para Além do Design',
    beyond: [
      'A curiosidade não para quando fecho o portátil.',
      'Exploro constantemente tecnologias emergentes, em particular Inteligência Artificial, e interessa-me sempre descobrir produtos que resolvem problemas com elegância e simplicidade. Encontro inspiração na arquitetura, no design industrial, na fotografia e na beleza discreta dos espaços minimalistas — mas tantas vezes também em momentos do dia a dia, em conversas e na forma natural como as pessoas interagem com o mundo à sua volta.',
      'Algumas das minhas melhores ideias não surgem à frente de um ecrã. Chegam durante um passeio, um mergulho no mar, ou simplesmente ao reparar nos pequenos detalhes que a maioria das pessoas ignora. Há uma clareza particular que vem de estar na natureza — o ritmo do oceano, o silêncio de uma caminhada longa na praia — que espelha a mesma clareza que procuro no design: nada a mais, nada forçado.',
      'Viajar ensinou-me que cada ambiente molda o comportamento de forma diferente, e observar as pessoas lembra-me constantemente que as decisões de design mais pequenas são muitas vezes as que têm mais impacto.',
    ],
    closingNote: 'A tecnologia evolui constantemente. O comportamento humano muda devagar. Por isso acredito que compreender as pessoas será sempre a competência de design mais valiosa.',
    skillsEyebrow: 'Competências e Especialização',
    skillsTitle: 'Onde acrescento mais valor',
    skills: ['Design de Produto', 'Investigação UX', 'Design Systems', 'Acessibilidade', 'Estratégia', 'Liderança', 'Design Visual', 'IA para Designers'],
    methodologiesEyebrow: 'Metodologias',
    methodologies: [
      { key: 'designThinking', title: 'Design Thinking', subtitle: 'Descoberta' },
      { key: 'waterfall', title: 'Waterfall', subtitle: 'Entrega planeada' },
      { key: 'agile', title: 'Agile', subtitle: 'Entrega adaptativa' },
      { key: 'scrum', title: 'Scrum', subtitle: 'Entrega adaptativa' },
      { key: 'lean', title: 'Lean', subtitle: 'Eficiência e valor' },
    ],
    philosophyLabel: ['FILOSOFIA', 'DE DESIGN'] as [string, string],
    philosophyItems: [
      { n: '01', text: 'Clareza antes da decoração' },
      { n: '02', text: 'Investigação antes de suposições' },
      { n: '03', text: 'Sistemas antes de ecrãs' },
      { n: '04', text: 'Acessibilidade por omissão' },
      { n: '05', text: 'Os produtos devem reduzir a complexidade, não exibi-la' },
    ],
    processNote: 'O processo importa tanto quanto o craft.',
    methodLink: 'Ver como transformei isto num workflow de agente repetível: Agentic UX Flow',
    howIWorkEyebrow: 'Como Trabalho',
    howIWorkTitle: 'Da descoberta a uma decisão implementada',
    showLess: 'Mostrar menos',
    learnMore: 'Saber mais',
    workPhases: [
      {
        id: 'discover', name: 'Descobrir',
        description: 'Compreender o que está realmente a acontecer antes de propor o que vem a seguir.',
        deliverables: ['Entrevistas a stakeholders', 'Resultados de auditoria', 'Mapas de jornada'],
        detail: 'Começo por acompanhar o fluxo de trabalho real, não a descrição que o organograma dá dele — a diferença entre os dois é normalmente onde o projeto realmente vive. Procuro o momento em que alguém recorre a uma folha de cálculo ou a uma solução paralela; é aí que o briefing se escreve sozinho.',
        question: 'O que está realmente partido, e para quem?',
        proof: { label: 'Ver isto na fase de investigação do OneRAK', to: '/work/onerak' },
      },
      {
        id: 'define', name: 'Definir',
        description: 'Transformar descobertas num briefing com o qual toda a equipa se alinha.',
        deliverables: ['Personas', 'Declarações de problema', 'Métricas de sucesso'],
        detail: 'Escrevo a declaração do problema antes da persona, não depois — isso mantém a persona fiel a uma decisão real, em vez de um mood board. Cada persona tem de justificar o seu lugar, orientando pelo menos um ecrã que seria diferente sem ela.',
        question: 'A definição de sucesso de quem estamos realmente a desenhar?',
        proof: { label: 'Ver isto nas personas do fundo de força de trabalho', to: '/work/tamkeen' },
      },
      {
        id: 'design', name: 'Desenhar',
        description: 'Prototipar decisões, não apenas ecrãs.',
        deliverables: ['Wireframes', 'Protótipos', 'Design systems'],
        detail: 'Cada ecrã tem de responder a uma decisão, não exibir uma funcionalidade. Esboço a direção rejeitada ao lado da que foi lançada — argumentar contra a minha própria primeira ideia é normalmente o que a leva à segunda, melhor.',
        question: 'Isto resistiria a uma auditoria real, e não só a uma demonstração?',
        proof: { label: 'Ver isto nas decisões-chave do Design System', to: '/work/design-system' },
      },
      {
        id: 'deliver', name: 'Entregar',
        description: 'Entregar algo que uma equipa consegue realmente operar, não apenas um protótipo funcional.',
        deliverables: ['Specs de handoff para dev', 'Ciclos de QA', 'Apoio ao lançamento'],
        detail: 'Mantenho-me presente nas primeiras semanas de uso real, não só na reunião de handoff. Os problemas de adoção aparecem como pequenas hesitações, não como relatórios de bugs — detetá-los cedo é a diferença entre uma funcionalidade lançada e uma funcionalidade usada.',
        question: 'Isto mudou mesmo a forma como as pessoas trabalham?',
        proof: { label: 'Ver isto nos resultados da IntelliForge', to: '/work/intelliforge' },
      },
    ],
    educationEyebrow: 'Formação Académica',
    degree: {
      master: 'Mestrado — Gestão de Design',
      bachelorGraphic: 'Licenciatura — Design Gráfico',
      bachelorDesign: 'Licenciatura — Design',
    },
    certificationsEyebrow: 'Certificações',
    languages: 'Fluente em Português e Inglês, com conhecimentos de trabalho em Espanhol e Francês.',
  },
}

export default function About() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [philosophyHover, setPhilosophyHover] = useState<number | null>(null)

  const toggle = (id: string) => setExpanded(e => ({ ...e, [id]: !e[id] }))

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* ── ABOUT BIO ── */}
      <div style={{ position: 'relative', padding: 'clamp(100px,15vw,150px) 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ ...eyebrow, marginBottom: 32 }}>{t.eyebrow}</div>

        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            {t.bio.map((p, i) => (
              <p key={i} style={{ fontSize: 18, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>{p}</p>
            ))}
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{t.bioNote}</p>
          </div>
          <div style={{ flex: '0 0 auto', width: 'min(320px, 100%)', height: 480, borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 50px rgba(120,150,255,0.18)', background: '#F2F6FF', animation: 'floatSlow 9s ease-in-out infinite' }}>
            <img src={profileImg} alt="Nelson Lopes" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <h2 style={sectionTitle}>{t.howIThinkTitle}</h2>
        <div style={{ columns: '2 340px', columnGap: 48 }}>
          {t.howIThink.map((p, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: i === t.howIThink.length - 1 ? 0 : '0 0 20px' }}>{p}</p>
          ))}
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <div className="philosophy-layout">
          <PhilosophyFlower label={t.philosophyLabel} hovered={philosophyHover} onHover={setPhilosophyHover} />
          <div className="philosophy-list">
            {t.philosophyItems.map(({ n, text }, i) => {
              const isHovered = philosophyHover === i
              return (
                <div
                  key={n}
                  className="philosophy-row"
                  onMouseEnter={() => setPhilosophyHover(i)}
                  onMouseLeave={() => setPhilosophyHover(null)}
                  style={{
                    background: isHovered ? 'rgba(61,99,224,0.12)' : 'rgba(0,47,167,0.05)',
                    boxShadow: isHovered ? '0 6px 18px rgba(20,30,60,0.08)' : 'none',
                  }}
                >
                  <span aria-hidden="true" className="philosophy-dot" />
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#001A5C', minWidth: 24, flexShrink: 0 }}>{n}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#12141F' }}>{text}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto', padding: '24px 0' }}>
          <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 52, lineHeight: 1, color: '#001A5C', opacity: 0.35, marginBottom: 8 }}>"</div>
          <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: 'italic', fontSize: 'clamp(22px,3vw,34px)', lineHeight: 1.45, color: '#2A2F3A', margin: 0 }}>{t.pullQuote}</p>
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <h2 style={sectionTitle}>{t.beyondTitle}</h2>
        <div style={{ columns: '2 300px', columnGap: 40 }}>
          {t.beyond.map((p, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: i === t.beyond.length - 1 ? 0 : '0 0 20px' }}>{p}</p>
          ))}
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <p style={{ textAlign: 'center', fontSize: 17, lineHeight: 1.7, color: '#5A5F73', maxWidth: 640, margin: '0 auto' }}>{t.closingNote}</p>
      </div>

      <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', maxWidth: 1200, margin: '0 auto', padding: '0 20px 56px' }}>⸻</div>

      {/* ── SKILLS ── */}
      <div style={{ position: 'relative', padding: '0 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={eyebrowWithTitle}>{t.skillsEyebrow}</div>
        <h2 style={sectionTitle}>{t.skillsTitle}</h2>
        <div className="skills-marquee">
          <div className="skills-marquee-track">
            <div className="skills-marquee-group">
              {t.skills.map(s => <span key={s} className="skills-card">{s}</span>)}
            </div>
            <div className="skills-marquee-group" aria-hidden="true">
              {t.skills.map(s => <span key={`${s}-dup`} className="skills-card">{s}</span>)}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 40 }}>
          <div style={{ ...eyebrow, marginBottom: 16 }}>{t.methodologiesEyebrow}</div>
          <div className="methodologies-grid">
            {t.methodologies.map(m => {
              const v = METHOD_VISUALS[m.key]
              const { Icon } = v
              return (
                <div key={m.key} className="method-card" style={{ color: v.accent }}>
                  <Icon />
                  <div>
                    <div className="method-card-title">{m.title}</div>
                    <div className="method-card-subtitle" style={{ opacity: 0.8 }}>{m.subtitle}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: 15, fontStyle: 'italic', color: '#5A5F73', maxWidth: 1200, margin: '0 auto 56px', padding: '0 20px' }}>{t.processNote}</p>

      {/* ── HOW I WORK ── */}
      <div style={{ position: 'relative', padding: '0 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={eyebrowWithTitle}>{t.howIWorkEyebrow}</div>
        <h2 style={sectionTitle}>{t.howIWorkTitle}</h2>
        <div className="rg-phase">
          {t.workPhases.map(phase => {
            const isOpen = !!expanded[phase.id]
            return (
              <div key={phase.id} className="phase-card-v3">
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#12141F', margin: '0 0 8px' }}>{phase.name}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#4A4F63', margin: '0 0 12px' }}>{phase.description}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
                    {phase.deliverables.map(d => (
                      <div key={d} style={{ fontSize: 12, color: '#6B7086' }}>· {d}</div>
                    ))}
                  </div>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    className="engagement-toggle"
                    onClick={() => toggle(phase.id)}
                    style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
                  >
                    {isOpen ? <>{t.showLess}<ChevronUp size={14} /></> : <>{t.learnMore}<ChevronDown size={14} /></>}
                  </button>
                  {isOpen && (
                    <div style={{ marginTop: 16, padding: 16, background: 'rgba(255,255,255,0.6)', borderRadius: 14, borderTop: '1px solid rgba(255,255,255,0.8)' }}>
                      <p style={{ fontSize: 13, lineHeight: 1.6, color: '#4A4F63', margin: '0 0 10px' }}>{phase.detail}</p>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#12141F', fontStyle: 'italic', margin: '0 0 10px' }}>"{phase.question}"</div>
                      <Link to={phase.proof.to} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#002FA7' }}>{phase.proof.label}<ChevronRight size={14} /></Link>
                      {phase.id === 'define' && (
                        <div style={{ marginTop: 8 }}>
                          <Link to="/work/agentic-ux-flow" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#002FA7' }}>{t.methodLink}<ChevronRight size={14} /></Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', maxWidth: 1200, margin: '0 auto', padding: '0 20px 56px' }}>⸻</div>

      {/* ── EDUCATION ── */}
      <div style={{ position: 'relative', padding: '0 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={eyebrowStandalone}>{t.educationEyebrow}</div>
        <div className="rg-edu" style={{ marginBottom: 60 }}>
          {education.map(({ degreeKey, school, logo }) => (
            <div key={degreeKey} style={{ display: 'flex', alignItems: 'center', gap: 14, border: '1px solid #EAF1FF', borderRadius: 12, padding: 22, background: '#FFFFFF', boxShadow: '0 4px 12px rgba(20,30,60,0.04)' }}>
              <div style={thumb}><img src={logo} alt="" style={thumbImg} /></div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 4 }}>{t.degree[degreeKey as keyof typeof t.degree]}</div>
                <div style={{ fontSize: 13, color: '#5A5F73' }}>{school}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CERTIFICATIONS */}
        <div style={eyebrowStandalone}>{t.certificationsEyebrow}</div>
        <div className="cert-marquee">
          <div className="cert-marquee-track">
            {[0, 1].map(dup => (
              <div className="cert-marquee-group" key={dup} aria-hidden={dup === 1}>
                {certifications.map(({ title, org, logo }) => (
                  <div key={title} className="cert-card">
                    <div style={thumb}><img src={logo} alt="" style={thumbImg} /></div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: 13, color: '#5A5F73' }}>{org}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: '#5A5F73' }}>
          {t.languages}
        </div>
      </div>

      <Footer />
    </div>
  )
}
