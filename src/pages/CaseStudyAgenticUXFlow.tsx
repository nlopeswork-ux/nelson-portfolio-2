import { Link } from 'react-router-dom'
import CaseStudyShell, { Body, DarkBox } from '../components/CaseStudyShell'
import ChevronRight from '../components/ChevronRight'
import intelliforgeImg from '../imports/IntelliForge_SR2R.png'
import dsImg from '../imports/Internal_DS.png'
import { useLanguage } from '../i18n/LanguageContext'

// ds-allow-hardcode:start - layout and ink values shared with every other case study; the site has no spacing or ink tokens
const S = { padding: '0 0 48px' } as const
const H2 = { fontSize: 'clamp(20px,3vw,26px)' as const, fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 20px' }
const H3 = { fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 12 } as const
// ds-allow-hardcode:end

const copy = {
  en: {
    eyebrow: 'Case Study',
    title: 'Agentic UX Flow',
    description: 'A plugin I designed and built that gives an AI agent a design process to follow: a brief before any pixels, assumptions that stay visible, human checkpoints, and gates that check the work instead of trusting it.',
    meta: [
      { label: 'Role', value: 'Designer and builder' },
      { label: 'Status', value: 'In development, private for testing and refinement' },
      { label: 'Format', value: 'Claude Code plugin: skills, agents and verification scripts' },
      { label: 'Scope', value: 'Solo project' },
      { label: 'Responsibilities', value: 'Workflow Design · Agent Roles · Intake and Briefing · Assumption Tracking · Quality Gates · Checkpoints', span: true },
    ],
    stats: [
      { value: '7', label: 'stages in the pipeline' },
      { value: '5', label: 'predefined paths' },
      { value: '4', label: 'human checkpoints' },
    ],
    hookTitle: 'The Hook',
    hook: [
      'Ask an AI agent for "a page to show my work" and it will happily build one. It will also decide the audience, the goal and the structure on its own, and you only find out when the result is wrong.',
      'The problem was not the quality of the output. It was that every decision the agent made for me was invisible. In design work, an invisible decision is the most expensive kind, because everything built on top of it has to be redone when it turns out to be wrong.',
    ],
    howTitle: 'How it works',
    howIntro: 'The plugin turns a request into seven stages. Each stage has a skill, the artifacts it must produce, and the gates it must pass before the next one starts.',
    stages: [
      { n: '01', name: 'Brief', desc: 'Scores how complete the request is, asks only for what is missing, one question at a time.' },
      { n: '02', name: 'Research', desc: 'Plans or synthesises user research. Optional.' },
      { n: '03', name: 'Structure', desc: 'Flows with error paths and a screen inventory, before any visual design.' },
      { n: '04', name: 'Design', desc: 'Screens and components built from the design system, not from guesses.' },
      { n: '05', name: 'Prototype', desc: 'A working build, measured rather than described.' },
      { n: '06', name: 'Test', desc: 'Checks the build and decides what to fix and what to accept as risk.' },
      { n: '07', name: 'Iterate', desc: 'Feeds the findings back into the earlier stages.' },
    ],
    pathsTitle: 'Two paths',
    pathsIntro: 'Not every request deserves the full process. A router reads the brief, proposes a path and explains why. I decide, and I can always change it.',
    paths: [
      { name: 'Quick', when: 'One screen, a clear user.', steps: ['Brief', 'Design', 'Prototype', 'Test'], note: 'The shortest route that still has a brief, gates and a test. This is the path used to build the page you are reading.' },
      { name: 'Complete', when: 'A product or a flow, or a user nobody has validated.', steps: ['Brief', 'Research', 'Structure', 'Design', 'Prototype', 'Test', 'Iterate'], note: 'Adds research and structure before design, because those are the stages where a wrong assumption is cheapest to fix.' },
    ],
    pathsMore: 'Three more variants exist for a single component, for designing from an image, and for auditing something that already exists.',
    decisionsTitle: 'Design decisions',
    decisions: [
      { n: '01', name: 'Assumptions are first-class', desc: 'Whatever the agent decides without asking becomes a numbered assumption, tagged [P3 · assumption] wherever it appears. It stays open until I confirm, correct or reject it, and a risky open assumption blocks the later stages.' },
      { n: '02', name: 'One question at a time', desc: 'The intake never shows a form. It proposes a value, offers two to four options and always allows "go ahead with assumptions", so the process never traps me.' },
      { n: '03', name: 'The path is a proposal', desc: 'The router suggests, I decide. Skipping a stage is allowed when the pipeline says it can be skipped, and the reason is recorded.' },
      { n: '04', name: 'The builder never approves its own work', desc: 'One agent builds from the approved design. A separate critic renders the result and argues for rejecting it, but only after the automated gates are green.' },
    ],
    gatesLabel: 'Gates before taste',
    gatesBox: [
      'Contrast, hard-coded values, emoji and brief consistency are checked by scripts that run every time and record their output. The agent has to quote that output instead of remembering it.',
      'Taste is the one thing no script can measure, so the Design checkpoint is explicitly human: "approve the taste, no gate measures it".',
    ],
    checkpointsTitle: 'Where a human decides',
    checkpoints: [
      { name: 'Brief', desc: 'Approve the brief and the open assumptions before work is spent on them.' },
      { name: 'Structure', desc: 'Approve the structure before designing. It is the last cheap moment to change the flow.' },
      { name: 'Design', desc: 'Approve the taste. No gate measures it.' },
      { name: 'Test', desc: 'Decide what to fix and what to accept as risk.' },
    ],
    usedTitle: 'Where it has been used',
    usedIntro: 'Two case studies on this site connect to the plugin.',
    used: [
      { to: '/work/intelliforge', image: intelliforgeImg, category: 'Financial Services', name: 'IntelliForge SR2R', desc: 'The process followed on this engagement is the one the plugin formalises: brief first, visible assumptions, human checkpoints.' },
      { to: '/work/design-system', image: dsImg, category: 'Internal Platform', name: 'Internal Design System', desc: 'The base of UI structure. The plugin builds screens from this system\'s tokens and component specs instead of from guesses.' },
    ],
    usedCta: 'Read the full case study',
    statusTitle: 'Where it stands',
    status: [
      'The repository is private for now. I am testing the plugin on real work, including this portfolio page, and refining it before it goes public.',
      'I have not run it with other designers yet, so I make no claims about speed or quality gains. What it already does is make the agent\'s decisions visible, which was the point.',
    ],
    ctaLead: 'Want to see it working, or talk about how I would apply this on your team?',
    ctaLink: 'Get in touch',
    resultsTitle: 'The system in numbers',
    results: [
      { value: '7', label: 'pipeline stages' },
      { value: '5', label: 'predefined paths' },
      { value: '2', label: 'agent roles: builder and critic' },
      { value: '4', label: 'human checkpoints' },
    ],
  },
  pt: {
    eyebrow: 'Case Study',
    title: 'Agentic UX Flow',
    description: 'Um plugin que desenhei e construí e que dá a um agente de IA um processo de design a seguir: um brief antes de qualquer pixel, pressupostos que ficam visíveis, checkpoints humanos e gates que verificam o trabalho em vez de confiar nele.',
    meta: [
      { label: 'Função', value: 'Designer e construtor' },
      { label: 'Estado', value: 'Em desenvolvimento, privado para testes e refinamento' },
      { label: 'Formato', value: 'Plugin do Claude Code: skills, agentes e scripts de verificação' },
      { label: 'Âmbito', value: 'Projeto individual' },
      { label: 'Responsabilidades', value: 'Design de Workflow · Papéis dos Agentes · Intake e Briefing · Registo de Pressupostos · Quality Gates · Checkpoints', span: true },
    ],
    stats: [
      { value: '7', label: 'etapas no pipeline' },
      { value: '5', label: 'percursos predefinidos' },
      { value: '4', label: 'checkpoints humanos' },
    ],
    hookTitle: 'O Ponto de Partida',
    hook: [
      'Pede a um agente de IA "uma página para mostrar o meu trabalho" e ele constrói uma sem hesitar. Também decide sozinho o público, o objetivo e a estrutura, e só descobres quando o resultado está errado.',
      'O problema não era a qualidade do resultado. Era que todas as decisões que o agente tomava por mim eram invisíveis. Em design, uma decisão invisível é a mais cara, porque tudo o que se constrói por cima tem de ser refeito quando se revela errada.',
    ],
    howTitle: 'Como funciona',
    howIntro: 'O plugin transforma um pedido em sete etapas. Cada etapa tem uma skill, os artefactos que tem de produzir e os gates que tem de passar antes de a seguinte começar.',
    stages: [
      { n: '01', name: 'Brief', desc: 'Pontua o quão completo é o pedido e pergunta só o que falta, uma pergunta de cada vez.' },
      { n: '02', name: 'Pesquisa', desc: 'Planeia ou sintetiza pesquisa com utilizadores. Opcional.' },
      { n: '03', name: 'Estrutura', desc: 'Fluxos com caminhos de erro e inventário de ecrãs, antes de qualquer design visual.' },
      { n: '04', name: 'Design', desc: 'Ecrãs e componentes construídos a partir do design system, não de suposições.' },
      { n: '05', name: 'Protótipo', desc: 'Uma build a funcionar, medida em vez de descrita.' },
      { n: '06', name: 'Teste', desc: 'Verifica a build e decide o que corrigir e o que aceitar como risco.' },
      { n: '07', name: 'Iterar', desc: 'Devolve as conclusões às etapas anteriores.' },
    ],
    pathsTitle: 'Dois percursos',
    pathsIntro: 'Nem todos os pedidos merecem o processo completo. Um router lê o brief, propõe um percurso e explica porquê. Eu decido, e posso sempre mudar.',
    paths: [
      { name: 'Rápido', when: 'Um ecrã, um utilizador claro.', steps: ['Brief', 'Design', 'Protótipo', 'Teste'], note: 'O caminho mais curto que ainda tem brief, gates e teste. Foi o percurso usado para construir a página que estás a ler.' },
      { name: 'Completo', when: 'Um produto ou um fluxo, ou um utilizador que ninguém validou.', steps: ['Brief', 'Pesquisa', 'Estrutura', 'Design', 'Protótipo', 'Teste', 'Iterar'], note: 'Acrescenta pesquisa e estrutura antes do design, porque são as etapas onde um pressuposto errado é mais barato de corrigir.' },
    ],
    pathsMore: 'Existem mais três variantes: para um só componente, para desenhar a partir de uma imagem e para auditar algo que já existe.',
    decisionsTitle: 'Decisões de design',
    decisions: [
      { n: '01', name: 'Os pressupostos são cidadãos de primeira', desc: 'Tudo o que o agente decide sem perguntar passa a ser um pressuposto numerado, etiquetado [P3 · pressuposto] onde quer que apareça. Fica em aberto até eu o confirmar, corrigir ou rejeitar, e um pressuposto arriscado em aberto bloqueia as etapas seguintes.' },
      { n: '02', name: 'Uma pergunta de cada vez', desc: 'O intake nunca mostra um formulário. Propõe um valor, oferece duas a quatro opções e aceita sempre "avança com pressupostos", para que o processo nunca me prenda.' },
      { n: '03', name: 'O percurso é uma proposta', desc: 'O router sugere, eu decido. Saltar uma etapa é permitido quando o pipeline o permite, e o motivo fica registado.' },
      { n: '04', name: 'Quem constrói nunca aprova o próprio trabalho', desc: 'Um agente constrói a partir do design aprovado. Um crítico separado renderiza o resultado e argumenta pela rejeição, mas só depois de os gates automáticos estarem verdes.' },
    ],
    gatesLabel: 'Gates antes do gosto',
    gatesBox: [
      'Contraste, valores fixos no código, emoji e consistência do brief são verificados por scripts que correm sempre e registam o resultado. O agente tem de citar essa saída em vez de a recordar.',
      'O gosto é a única coisa que nenhum script mede, por isso o checkpoint de Design é explicitamente humano: "aprovar o gosto, nenhum gate o mede".',
    ],
    checkpointsTitle: 'Onde decide uma pessoa',
    checkpoints: [
      { name: 'Brief', desc: 'Aprovar o brief e os pressupostos em aberto antes de gastar trabalho em cima deles.' },
      { name: 'Estrutura', desc: 'Aprovar a estrutura antes de desenhar. É a última altura barata para mudar o fluxo.' },
      { name: 'Design', desc: 'Aprovar o gosto. Nenhum gate o mede.' },
      { name: 'Teste', desc: 'Decidir o que corrigir e o que aceitar como risco.' },
    ],
    usedTitle: 'Onde já foi usado',
    usedIntro: 'Dois case studies deste site ligam-se ao plugin.',
    used: [
      { to: '/work/intelliforge', image: intelliforgeImg, category: 'Serviços Financeiros', name: 'IntelliForge SR2R', desc: 'O processo seguido neste projeto é o que o plugin formaliza: brief primeiro, pressupostos visíveis, checkpoints humanos.' },
      { to: '/work/design-system', image: dsImg, category: 'Plataforma Interna', name: 'Design System Interno', desc: 'A base de estrutura de UI. O plugin constrói ecrãs a partir dos tokens e das especificações de componentes deste sistema, em vez de suposições.' },
    ],
    usedCta: 'Ver a case study completa',
    statusTitle: 'Em que ponto está',
    status: [
      'O repositório é privado por agora. Estou a testar o plugin em trabalho real, incluindo esta página do portfólio, e a refiná-lo antes de o tornar público.',
      'Ainda não o usei com outros designers, por isso não faço afirmações sobre ganhos de velocidade ou qualidade. O que já faz é tornar visíveis as decisões do agente, que era o objetivo.',
    ],
    ctaLead: 'Queres vê-lo a funcionar, ou falar sobre como o aplicaria na tua equipa?',
    ctaLink: 'Fala comigo',
    resultsTitle: 'O sistema em números',
    results: [
      { value: '7', label: 'etapas do pipeline' },
      { value: '5', label: 'percursos predefinidos' },
      { value: '2', label: 'papéis de agente: construtor e crítico' },
      { value: '4', label: 'checkpoints humanos' },
    ],
  },
}

export default function CaseStudyAgenticUXFlow() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <CaseStudyShell
      eyebrow={t.eyebrow}
      title={t.title}
      description={t.description}
      meta={t.meta}
      stats={t.stats}
    >
      {/* THE HOOK */}
      <div style={S}>
        <h2 className="cs-h2-mark" style={H2}>{t.hookTitle}</h2>
        {t.hook.map((p, i) => <Body key={i}>{p}</Body>)}
      </div>

      {/* HOW IT WORKS */}
      <div style={S}>
        <h2 style={H2}>{t.howTitle}</h2>
        <Body>{t.howIntro}</Body>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {t.stages.map(({ n, name, desc }) => (
            <div key={n} style={{ display: 'flex', gap: 20, padding: '20px 24px', borderRadius: 16, border: '1px solid #EAF1FF', background: '#FAFBFF' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#002FA7', minWidth: 28 }}>{n}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 6 }}>{name}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TWO PATHS */}
      <div style={S}>
        <h2 style={H2}>{t.pathsTitle}</h2>
        <Body>{t.pathsIntro}</Body>
        {/* ds-allow-hardcode:start - same dark and glass panel treatment as the Agnostic Project Design block in the Design System case study */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 20 }}>
          {t.paths.map((path, i) => {
            const dark = i === 0
            return (
              <div
                key={path.name}
                style={dark
                  ? { padding: 24, borderRadius: 20, background: '#12141F', color: '#F2F6FF' }
                  : { padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(20,30,60,0.1)' }}
              >
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: dark ? '#F2F6FF' : '#12141F', marginBottom: 6 }}>{path.name}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: dark ? '#C7D4FF' : '#5A5F73', margin: '0 0 16px' }}>{path.when}</p>
                <ol style={{ listStyle: 'none', margin: '0 0 16px', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {path.steps.map(step => (
                    <li key={step} style={{ fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 999, color: dark ? '#F2F6FF' : '#002FA7', background: dark ? 'rgba(143,174,255,0.16)' : 'rgba(0,47,167,0.09)' }}>{step}</li>
                  ))}
                </ol>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: dark ? '#C7D4FF' : '#5A5F73', margin: 0 }}>{path.note}</p>
              </div>
            )
          })}
        </div>
        {/* ds-allow-hardcode:end */}
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{t.pathsMore}</p>
      </div>

      {/* DESIGN DECISIONS */}
      <div style={S}>
        <h2 style={H2}>{t.decisionsTitle}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {t.decisions.map(({ n, name, desc }) => (
            <div key={n} style={{ display: 'flex', gap: 20, padding: '20px 24px', borderRadius: 16, border: '1px solid #EAF1FF', background: '#FAFBFF' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#002FA7', minWidth: 28 }}>{n}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 6 }}>{name}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <DarkBox label={t.gatesLabel}>
          {t.gatesBox.map((p, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.75, margin: i === t.gatesBox.length - 1 ? 0 : '0 0 16px' }}>{p}</p>
          ))}
        </DarkBox>

        <div style={H3}>{t.checkpointsTitle}</div>
        <div className="rg-2">
          {t.checkpoints.map(({ name, desc }) => (
            <div key={name} style={{ padding: 20, borderRadius: 16, border: '1px solid #EAF1FF', background: '#FAFBFF' }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 8 }}>{name}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* USED IN */}
      <div style={S}>
        <h2 style={H2}>{t.usedTitle}</h2>
        <Body>{t.usedIntro}</Body>
        <div className="work-grid">
          {t.used.map(({ to, image, category, name, desc }) => (
            <Link key={to} to={to} className="case-card interactive-card" style={{ display: 'block', textDecoration: 'none', borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(20,30,60,0.08)', boxShadow: '0 12px 32px rgba(120,150,255,0.08)', transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              <div style={{ padding: 12 }}>
                <div style={{ position: 'relative', width: '100%', borderRadius: 14, overflow: 'hidden', background: '#F5F7FC', aspectRatio: '562 / 180' }}>
                  <img src={image} alt={name} onError={e => { e.currentTarget.style.display = 'none' }} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center' }} />
                </div>
              </div>
              <div style={{ padding: '8px 24px 24px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#4A4F63', background: '#F2F6FF', display: 'inline-block', padding: '4px 11px', borderRadius: 11, marginBottom: 10 }}>{category}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 6px' }}>{name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: '#5A5F73', margin: '0 0 12px' }}>{desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600, color: '#002FA7' }}>{t.usedCta}<ChevronRight size={15} /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* STATUS */}
      <div style={S}>
        <h2 style={H2}>{t.statusTitle}</h2>
        {t.status.map((p, i) => <Body key={i}>{p}</Body>)}
        <Body>
          {t.ctaLead}{' '}
          <Link to="/contact" style={{ color: '#002FA7', fontWeight: 600, textDecoration: 'none' }}>{t.ctaLink}</Link>
        </Body>
      </div>

      {/* RESULTS */}
      <div style={S}>
        <h2 style={H2}>{t.resultsTitle}</h2>
        <div className="rg-2">
          {t.results.map(({ value, label }) => (
            <div key={label} style={{ padding: 20, borderRadius: 16, background: '#F2F6FF', textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#002FA7' }}>{value}</div>
              <div style={{ fontSize: 13, color: '#5A5F73', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </CaseStudyShell>
  )
}
