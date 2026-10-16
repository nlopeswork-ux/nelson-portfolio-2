import { useState } from 'react'
import CaseStudyShell, { Body, DarkBox } from '../components/CaseStudyShell'
import ChevronDown from '../components/ChevronDown'
import ChevronUp from '../components/ChevronUp'
import { useLanguage } from '../i18n/LanguageContext'

const S = { padding: '0 20px 64px', maxWidth: 760, margin: '0 auto' } as const
const H2 = { fontSize: 'clamp(20px,3vw,26px)' as const, fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 20px' }

const copy = {
  en: {
    eyebrow: 'Case Study',
    title: 'Internal Design System',
    description: 'Building an internal design platform that unified structure and components across projects, cutting redundant rebuild work and accelerating delivery — then evolving that same foundation from documentation a designer could read into a structured source an AI agent can read too.',
    meta: [
      { label: 'Role', value: 'Lead Product Designer' },
      { label: 'Timeline', value: '2023 — Present' },
      { label: 'Platform', value: 'Internal enterprise projects (multiple client domains)' },
      { label: 'Team (initial)', value: '1 Lead Product Designer · 1 UX/UI Designer · 1 Junior UX/UI Designer · 1 Senior Front-End Engineer · 1 Front-End Engineer' },
      { label: 'Team (expanded)', value: '+ 1 Senior Back-End Architect · 1 Back-End Engineer (added as the system matured)' },
      { label: 'Tools', value: 'Figma (Variables, Auto Layout) · FigJam' },
      { label: 'Responsibilities', value: 'Design System Strategy · UX Architecture · Component Design · Documentation · Governance · Design Tokens · Cross-team Alignment', span: true },
    ],
    stats: [
      { value: '15', label: 'projects audited' },
      { value: '2+', label: 'live projects adopting the system' },
      { value: '25%', label: 'faster delivery on flagship pilot' },
    ],
    hookTitle: 'The Hook',
    hook: [
      "By 2023, the design team had accumulated three years of project-specific component libraries, each built in isolation, each solving the same problems differently. A button in one engagement looked nothing like a button in another. A data table in one project shared no structure with the same pattern elsewhere. Every new engagement started from scratch, rebuilding foundations the team had built — and rebuilt — many times before.",
      "The cost was invisible in any single project but enormous in aggregate: an estimated 30–40% of designer time on every engagement was spent rebuilding components that already existed somewhere in the team's Figma library history, but couldn't be safely reused because their quality, accessibility, and documentation were inconsistent.",
    ],
    phase1Title: 'Phase 1 — Building the Foundation',
    phase1Intro: "Phase 1 had one job: turn three years of scattered, one-off component libraries into a single, governed platform — audited from real usage, categorised and prioritised by actual impact, designed to be agnostic of any one project's branding or platform, and documented well enough that a designer who'd never touched the system could pick it up unassisted.",
    auditingTitle: 'Auditing 15 Projects',
    inflationHeadline: '74% inflation, one funnel',
    inflationNote: 'Raw component libraries funneled to 43 real templates',
    auditIntro: 'Rather than starting from new designs, the process began with a structured audit of the existing project ecosystem — tracing every artifact from raw inventory to reusable pattern:',
    auditNumbers: [
      { label: 'Categories of components extracted', value: '25' },
      { label: 'Unique components + icons identified', value: '538 + 290' },
      { label: 'Screen templates organized across domains', value: '159' },
      { label: 'Screens consolidated into a working file', value: '165' },
      { label: 'Real structural templates after dedup', value: '~43' },
    ],
    gapFinding: "The gap between 165 and 43 was the real finding: roughly 40% of that inflation wasn't duplicate content — it was interaction states (hover, loading, empty, error, success) built as separate screens instead of variant properties on one component. Naming that distinction was what turned an inventory into a system.",
    showMethodology: 'Show audit methodology',
    hideMethodology: 'Hide audit methodology',
    methodologyIntro: 'Audit ran across three parallel methods — components, layouts, and underlying structure — each scored independently, then reconciled into a single prioritized backlog. Categories judged "strong" fed the Tier 1 backlog directly; categories judged "needs validation" or "mis-categorized" were re-scoped before being allowed into any tier.',
    auditDimensions: [
      { label: 'Components', desc: 'Buttons, inputs, cards, tables, navigation, modals' },
      { label: 'Layouts', desc: 'Dashboards, detail views, forms, listing pages, empty states' },
      { label: 'Structure', desc: 'Grid usage, spacing, autolayout adoption, naming conventions' },
    ],
    categorisingTitle: 'Categorising and Prioritising Components',
    categorisingIntro: 'The audit produced a prioritised component backlog — 120 candidate components ranked by frequency of use, cross-project relevance, and rebuild cost, then sorted into three tiers.',
    auditColumns: ['Tier', 'Components', 'Criteria'],
    tierRows: [
      { tier: 'Foundation', n: '28', criteria: 'Used in every project; zero exceptions' },
      { tier: 'Core', n: '52', criteria: 'Used in >70% of projects' },
      { tier: 'Extended', n: '40', criteria: 'Domain-specific but reusable with theming' },
    ],
    agnosticTitle: 'Agnostic Project Design',
    agnosticIntro: 'The system was intentionally split into two layers, so that consistency and flexibility could coexist rather than compete. The core structure never changed — only what sat on top of it did.',
    coreLabel: 'Core Platform (fixed)',
    coreLines: [
      '— Foundations: colour, typography, spacing, grid',
      '— Autolayout-first components (buttons, inputs, cards, tables, navigation, modals)',
      '— Reusable layout patterns (dashboard, detail view, form, listing, empty state)',
      '— Documentation and lightweight governance',
    ],
    projectLabel: 'Project Layer (flexible)',
    projectLines: [
      '— Brand identity and visual theme',
      '— Business-specific workflows',
      '— Domain terminology',
      '— Project-specific layout variations for ambitious, larger-scope work',
    ],
    judgmentTitle: 'Judgment Calls',
    judgmentIntro: "A shared design system isn't built from clean data. These are three calls made with incomplete information, and why.",
    judgmentCalls: [
      { n: '01', name: 'Reclassifying a catch-all category', desc: 'A category holding 138 miscellaneous items ("Others") was blocking Tier 1 work — it mixed chat widgets, status badges, loading states, and navigation fragments with no shared pattern. Rather than promote it as-is, I split it into eight named subcategories before any component was built, so the library wouldn\'t inherit an uncategorized "junk drawer."' },
      { n: '02', name: 'Deciding not to inherit a weak category', desc: 'Data visualization components were underrepresented relative to how central dashboards are to the product surface. Instead of promoting what little existed, I flagged charts as a gap requiring a dedicated capture pass — treating "coverage exists" and "coverage is adequate" as two different questions.' },
      { n: '03', name: 'Converting screens into variants, not components', desc: 'One recurring pattern showed up as five near-identical screens (differing only by an error state and its messaging). Rather than build five components, I modeled it as one component with three variant properties — state, illustration, and message — collapsing duplication at the architecture level instead of the documentation level.' },
    ],
    principlesTitle: 'Design Principles',
    principles: [
      { n: '01', name: 'Platform-agnostic tokens', desc: 'Design tokens stored as Figma Variables and exported as JSON — consumable by OutSystems, React, and any future platform without a design rework.' },
      { n: '02', name: 'Composition over configuration', desc: 'Components expose a small surface area of props. Complexity lives in composition — combining atoms into molecules — rather than in a single component trying to handle 40 variants.' },
      { n: '03', name: 'Documentation as the product', desc: "Every component ships with a usage guide, accessibility notes, and a \"when not to use\" section. A component without documentation doesn't ship." },
      { n: '04', name: 'Governance as a feature', desc: 'The system has a formal RFC process for new components: proposal, review, approve/reject/defer. Any designer can propose. No one person can approve alone.' },
    ],
    governanceTitle: 'Governance',
    governanceBoxLabel: 'The Governance Question',
    governanceBox: [
      "The hardest problem in a shared design system is not the first 100 components. It's what happens in month 8, when a designer on a fast-moving engagement needs a pattern the system doesn't have, the deadline is in three days, and the temptation to build it one-off is real.",
      "The RFC process was designed specifically for this moment: a lightweight proposal (one page, five fields) that can be reviewed asynchronously in 24 hours, approved for one-off use with a flag to be properly componentised in the next system sprint, or promoted directly to the backlog with a two-week SLA. It's the difference between a system that calcifies and one that grows.",
    ],
    phase1Closing: [
      'The roadmap was sequenced, not just scheduled: senior capacity was deliberately run near its ceiling (81–89% utilization) on the highest-risk phases — base components and structural templates — while junior capacity was held in reserve to absorb corrections without slipping the timeline. Token work was sequenced ahead of every component tier on purpose: building components against ungoverned values would have meant redoing Tier 1 once tokens were finalized.',
      'By the close of Phase 1, the system had moved past pilot status: adopted across 2+ live projects spanning different industries and geographies, each validating the core/project-layer split against a real, non-hypothetical brief — not just a heavier design file.',
      'Led the UX/UI direction for the initiative and acted as the technical bridge between UX/UI, front-end, backend and the PM — the design system only holds together if those four perspectives agree on the same constraints. Also provided hands-on technical support to junior UX/UI designers working within the system, reviewing their component contributions and helping them reason through edge cases rather than just approving or rejecting.',
      'Not every gap closed in Phase 1. Two functional modules (onboarding flows, search behavior) were reconstructed from observed patterns rather than re-validated against the original design teams — a known trade-off, flagged for confirmation before being treated as ground truth.',
    ],
    learnedLabel: 'What We Learned',
    learnedBox: 'The system worked because designers could read it. The next challenge was making it work when the reader is an AI agent, not a person.',
    phase2Title: 'Phase 2 — From Documentation to Agentic-Ready',
    phase2: [
      "I made the bet that documentation structured for machine parsing would outlast documentation structured for human reading habits — before an agent was actually the reader. A design system written for a human designer optimises for prose — a usage guide, a rationale paragraph, a \"when not to use\" note read once and internalised. None of that is reliably parseable by a generative AI agent trying to decide, at runtime, which component to reach for and which prop values are actually valid. Phase 2 restructures the same underlying platform — the same tokens, the same tiered component library, the same governance model — so its documentation is structured enough for an agent to read it correctly, not just a person.",
      'That meant moving component specs from narrative documentation toward explicit, structured metadata: enumerated props and variants, machine-readable naming conventions, and example-driven usage patterns an agent can pattern-match against, on top of the human-readable guide that stays for designers.',
    ],
    beforeLabel: 'Before (human-readable)',
    beforeText: '"Use this button variant when the action is destructive, but avoid it in confirmation dialogs where the user hasn\'t yet reviewed consequences."',
    afterLabel: 'After (agent-readable)',
    afterText: 'variant: destructive · valid_contexts: [standalone_action] · invalid_contexts: [unreviewed_confirmation] · fallback: secondary',
    phase2Closing: 'Phase 2 is live today, powering an internal initiative to define a new accelerator product for digital platform delivery — using the DS as the structured foundation an AI agent reads to generate pages and prototypes, not just a human designer.',
    resultsTitle: 'Results',
    results: [
      { value: '120', label: 'components in production library' },
      { value: '25%', label: 'faster delivery on flagship pilot' },
      { value: '15', label: 'projects audited to build the foundation' },
      { value: '2+', label: 'live projects adopting the system today' },
    ],
  },
  pt: {
    eyebrow: 'Case Study',
    title: 'Design System Interno',
    description: 'Construção de uma plataforma de design interna que unificou estrutura e componentes entre projetos, reduzindo trabalho redundante de reconstrução e acelerando a entrega — evoluindo depois essa mesma base de documentação legível por um designer para uma fonte estruturada que um agente de IA também consegue ler.',
    meta: [
      { label: 'Função', value: 'Lead Product Designer' },
      { label: 'Duração', value: '2023 — Presente' },
      { label: 'Plataforma', value: 'Projetos empresariais internos (múltiplos domínios de cliente)' },
      { label: 'Equipa (inicial)', value: '1 Lead Product Designer · 1 UX/UI Designer · 1 UX/UI Designer Júnior · 1 Senior Front-End Engineer · 1 Front-End Engineer' },
      { label: 'Equipa (expandida)', value: '+ 1 Senior Back-End Architect · 1 Back-End Engineer (adicionados à medida que o sistema amadureceu)' },
      { label: 'Ferramentas', value: 'Figma (Variables, Auto Layout) · FigJam' },
      { label: 'Responsabilidades', value: 'Estratégia de Design System · Arquitetura UX · Design de Componentes · Documentação · Governança · Design Tokens · Alinhamento entre Equipas', span: true },
    ],
    stats: [
      { value: '15', label: 'projetos auditados' },
      { value: '2+', label: 'projetos em produção a adotar o sistema' },
      { value: '25%', label: 'entrega mais rápida no piloto principal' },
    ],
    hookTitle: 'O Ponto de Partida',
    hook: [
      'Em 2023, a equipa de design tinha acumulado três anos de bibliotecas de componentes específicas de cada projeto, cada uma construída isoladamente, cada uma a resolver os mesmos problemas de forma diferente. Um botão numa colaboração não se parecia em nada com um botão noutra. Uma tabela de dados num projeto não partilhava estrutura nenhuma com o mesmo padrão noutro lado. Cada nova colaboração começava do zero, reconstruindo fundações que a equipa já tinha construído — e reconstruído — várias vezes antes.',
      "O custo era invisível em qualquer projeto isolado, mas enorme em conjunto: estima-se que 30–40% do tempo dos designers em cada colaboração era gasto a reconstruir componentes que já existiam algures no histórico de bibliotecas Figma da equipa, mas que não podiam ser reutilizados com segurança porque a sua qualidade, acessibilidade e documentação eram inconsistentes.",
    ],
    phase1Title: 'Fase 1 — Construir a Fundação',
    phase1Intro: "A Fase 1 tinha um único objetivo: transformar três anos de bibliotecas de componentes dispersas e pontuais numa única plataforma governada — auditada a partir do uso real, categorizada e priorizada por impacto real, desenhada para ser agnóstica em relação à marca ou plataforma de qualquer projeto específico, e documentada o suficiente para que um designer que nunca tivesse usado o sistema a conseguisse adotar sem ajuda.",
    auditingTitle: 'Auditoria a 15 Projetos',
    inflationHeadline: '74% de inflação, um só funil',
    inflationNote: 'Bibliotecas de componentes brutas filtradas para 43 templates reais',
    auditIntro: 'Em vez de começar por novos designs, o processo começou com uma auditoria estruturada ao ecossistema de projetos existente — a rastrear cada artefacto desde o inventário bruto até ao padrão reutilizável:',
    auditNumbers: [
      { label: 'Categorias de componentes extraídas', value: '25' },
      { label: 'Componentes e ícones únicos identificados', value: '538 + 290' },
      { label: 'Templates de ecrã organizados por domínio', value: '159' },
      { label: 'Ecrãs consolidados num ficheiro de trabalho', value: '165' },
      { label: 'Templates estruturais reais após deduplicação', value: '~43' },
    ],
    gapFinding: 'A diferença entre 165 e 43 foi a verdadeira descoberta: cerca de 40% dessa inflação não era conteúdo duplicado — eram estados de interação (hover, loading, vazio, erro, sucesso) construídos como ecrãs separados em vez de propriedades de variante num só componente. Nomear essa distinção foi o que transformou um inventário num sistema.',
    showMethodology: 'Mostrar metodologia da auditoria',
    hideMethodology: 'Ocultar metodologia da auditoria',
    methodologyIntro: 'A auditoria decorreu em três métodos paralelos — componentes, layouts e estrutura subjacente — cada um avaliado de forma independente e depois reconciliado num único backlog priorizado. Categorias avaliadas como "fortes" alimentaram diretamente o backlog do Tier 1; categorias avaliadas como "precisam de validação" ou "mal categorizadas" foram reavaliadas antes de poderem entrar em qualquer tier.',
    auditDimensions: [
      { label: 'Componentes', desc: 'Botões, inputs, cards, tabelas, navegação, modais' },
      { label: 'Layouts', desc: 'Dashboards, vistas de detalhe, formulários, páginas de listagem, estados vazios' },
      { label: 'Estrutura', desc: 'Uso de grelha, espaçamento, adoção de autolayout, convenções de nomenclatura' },
    ],
    categorisingTitle: 'Categorizar e Priorizar Componentes',
    categorisingIntro: 'A auditoria produziu um backlog de componentes priorizado — 120 componentes candidatos ordenados por frequência de uso, relevância entre projetos e custo de reconstrução, depois organizados em três tiers.',
    auditColumns: ['Tier', 'Componentes', 'Critério'],
    tierRows: [
      { tier: 'Foundation', n: '28', criteria: 'Usado em todos os projetos; zero exceções' },
      { tier: 'Core', n: '52', criteria: 'Usado em mais de 70% dos projetos' },
      { tier: 'Extended', n: '40', criteria: 'Específico de domínio mas reutilizável com theming' },
    ],
    agnosticTitle: 'Design de Projeto Agnóstico',
    agnosticIntro: 'O sistema foi deliberadamente dividido em duas camadas, para que consistência e flexibilidade pudessem coexistir em vez de competir. A estrutura central nunca mudava — só o que assentava sobre ela.',
    coreLabel: 'Plataforma Core (fixa)',
    coreLines: [
      '— Fundações: cor, tipografia, espaçamento, grelha',
      '— Componentes autolayout-first (botões, inputs, cards, tabelas, navegação, modais)',
      '— Padrões de layout reutilizáveis (dashboard, vista de detalhe, formulário, listagem, estado vazio)',
      '— Documentação e governança leve',
    ],
    projectLabel: 'Camada de Projeto (flexível)',
    projectLines: [
      '— Identidade de marca e tema visual',
      '— Workflows específicos do negócio',
      '— Terminologia de domínio',
      '— Variações de layout específicas de projeto para trabalho mais ambicioso',
    ],
    judgmentTitle: 'Decisões Difíceis',
    judgmentIntro: 'Um design system partilhado não se constrói a partir de dados limpos. Estas são três decisões tomadas com informação incompleta, e porquê.',
    judgmentCalls: [
      { n: '01', name: 'Reclassificar uma categoria "saco de gatos"', desc: 'Uma categoria com 138 itens diversos ("Outros") estava a bloquear o trabalho do Tier 1 — misturava widgets de chat, badges de estado, estados de loading e fragmentos de navegação sem qualquer padrão comum. Em vez de a promover tal como estava, dividi-a em oito subcategorias nomeadas antes de qualquer componente ser construído, para que a biblioteca não herdasse uma "gaveta de tralha" sem categorização.' },
      { n: '02', name: 'Decidir não herdar uma categoria fraca', desc: 'Os componentes de visualização de dados estavam sub-representados face à centralidade dos dashboards na superfície do produto. Em vez de promover o pouco que existia, assinalei os gráficos como uma lacuna que exigia um levantamento dedicado — tratando "existe cobertura" e "a cobertura é adequada" como duas perguntas diferentes.' },
      { n: '03', name: 'Converter ecrãs em variantes, não em componentes', desc: 'Um padrão recorrente aparecia como cinco ecrãs quase idênticos (diferindo apenas num estado de erro e na sua mensagem). Em vez de construir cinco componentes, modelei-o como um único componente com três propriedades de variante — estado, ilustração e mensagem — eliminando a duplicação ao nível da arquitetura, não da documentação.' },
    ],
    principlesTitle: 'Princípios de Design',
    principles: [
      { n: '01', name: 'Tokens agnósticos de plataforma', desc: 'Design tokens guardados como Figma Variables e exportados em JSON — consumíveis pelo OutSystems, React e qualquer plataforma futura, sem refazer o design.' },
      { n: '02', name: 'Composição em vez de configuração', desc: 'Os componentes expõem uma área de props reduzida. A complexidade vive na composição — combinar átomos em moléculas — em vez de um único componente a tentar lidar com 40 variantes.' },
      { n: '03', name: 'Documentação como o produto', desc: 'Cada componente é lançado com um guia de uso, notas de acessibilidade e uma secção "quando não usar". Um componente sem documentação não é lançado.' },
      { n: '04', name: 'Governança como funcionalidade', desc: 'O sistema tem um processo formal de RFC para novos componentes: proposta, revisão, aprovar/rejeitar/adiar. Qualquer designer pode propor. Nenhuma pessoa pode aprovar sozinha.' },
    ],
    governanceTitle: 'Governança',
    governanceBoxLabel: 'A Questão da Governança',
    governanceBox: [
      'O problema mais difícil num design system partilhado não são os primeiros 100 componentes. É o que acontece no mês 8, quando um designer numa colaboração acelerada precisa de um padrão que o sistema não tem, o prazo é daqui a três dias, e a tentação de o construir à pressa é real.',
      'O processo de RFC foi desenhado especificamente para este momento: uma proposta leve (uma página, cinco campos) que pode ser revista de forma assíncrona em 24 horas, aprovada para uso pontual com sinalização para ser devidamente componentizada no sprint seguinte do sistema, ou promovida diretamente ao backlog com um SLA de duas semanas. É a diferença entre um sistema que calcifica e um que cresce.',
    ],
    phase1Closing: [
      'O roadmap foi sequenciado, não apenas agendado: a capacidade sénior foi deliberadamente mantida perto do limite (81–89% de utilização) nas fases de maior risco — componentes base e templates estruturais — enquanto a capacidade júnior ficou em reserva para absorver correções sem atrasar o prazo. O trabalho de tokens foi sequenciado antes de qualquer tier de componentes de propósito: construir componentes sobre valores não governados teria significado refazer o Tier 1 assim que os tokens fossem finalizados.',
      'No encerramento da Fase 1, o sistema já tinha ultrapassado o estatuto de piloto: adotado em mais de 2 projetos em produção, em diferentes indústrias e geografias, cada um a validar a divisão core/camada de projeto face a um briefing real, não hipotético.',
      'Liderei a direção UX/UI da iniciativa e atuei como ponte técnica entre UX/UI, front-end, backend e o PM — o design system só se mantém coeso se essas quatro perspetivas concordarem nas mesmas restrições. Também dei apoio técnico direto a designers UX/UI júniores a trabalhar no sistema, revendo as suas contribuições de componentes e ajudando-os a raciocinar sobre casos-limite em vez de apenas aprovar ou rejeitar.',
      'Nem todas as lacunas fecharam na Fase 1. Dois módulos funcionais (fluxos de onboarding, comportamento de pesquisa) foram reconstruídos a partir de padrões observados em vez de revalidados junto das equipas de design originais — um trade-off conhecido, assinalado para confirmação antes de ser tratado como verdade estabelecida.',
    ],
    learnedLabel: 'O Que Aprendemos',
    learnedBox: 'O sistema funcionava porque os designers conseguiam lê-lo. O desafio seguinte era fazê-lo funcionar quando o leitor é um agente de IA, não uma pessoa.',
    phase2Title: 'Fase 2 — De Documentação a Pronto para Agentes',
    phase2: [
      'Apostei que documentação estruturada para leitura por máquina duraria mais do que documentação estruturada para hábitos de leitura humanos — antes de um agente ser, de facto, o leitor. Um design system escrito para um designer humano otimiza para prosa — um guia de uso, um parágrafo de justificação, uma nota de "quando não usar" lida uma vez e interiorizada. Nada disso é interpretável de forma fiável por um agente de IA generativa a tentar decidir, em tempo de execução, que componente usar e que valores de props são de facto válidos. A Fase 2 reestrutura a mesma plataforma subjacente — os mesmos tokens, a mesma biblioteca de componentes em tiers, o mesmo modelo de governança — para que a sua documentação seja suficientemente estruturada para um agente a ler corretamente, não só uma pessoa.',
      'Isso significou mover as especificações de componentes de documentação narrativa para metadados explícitos e estruturados: props e variantes enumeradas, convenções de nomenclatura legíveis por máquina, e padrões de uso orientados por exemplos que um agente consegue reconhecer por padrão, mantendo em paralelo o guia legível por humanos para os designers.',
    ],
    beforeLabel: 'Antes (legível por humanos)',
    beforeText: '"Usa esta variante de botão quando a ação for destrutiva, mas evita-a em diálogos de confirmação onde o utilizador ainda não reviu as consequências."',
    afterLabel: 'Depois (legível por agente)',
    afterText: 'variant: destructive · valid_contexts: [standalone_action] · invalid_contexts: [unreviewed_confirmation] · fallback: secondary',
    phase2Closing: 'A Fase 2 está em produção hoje, a potenciar uma iniciativa interna para definir um novo produto acelerador de entrega de plataformas digitais — usando o DS como a fundação estruturada que um agente de IA lê para gerar páginas e protótipos, não apenas um designer humano.',
    resultsTitle: 'Resultados',
    results: [
      { value: '120', label: 'componentes na biblioteca em produção' },
      { value: '25%', label: 'entrega mais rápida no piloto principal' },
      { value: '15', label: 'projetos auditados para construir a fundação' },
      { value: '2+', label: 'projetos em produção a adotar o sistema hoje' },
    ],
  },
}

export default function CaseStudyDesignSystem() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [methodologyOpen, setMethodologyOpen] = useState(false)

  return (
    <CaseStudyShell
      eyebrow={t.eyebrow}
      title={t.title}
      description={t.description}
      meta={t.meta}
      stats={t.stats}
    >
      {/* THE HOOK */}
      <div style={{ ...S, paddingTop: 48 }}>
        <h2 style={H2}>{t.hookTitle}</h2>
        {t.hook.map((p, i) => <Body key={i}>{p}</Body>)}
      </div>

      {/* PHASE 1 */}
      <div style={S}>
        <h2 style={H2}>{t.phase1Title}</h2>
        <Body>{t.phase1Intro}</Body>

        <div style={{ padding: 24, borderRadius: 20, background: '#F2F6FF', border: '1px solid #EAF1FF', marginBottom: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{t.auditingTitle}</div>

          <div style={{ display: 'flex', gap: 20, alignItems: 'baseline', flexWrap: 'wrap', padding: '16px 20px', borderRadius: 14, background: '#12141F', color: '#F2F6FF', marginBottom: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#8FAEFF', lineHeight: 1.1 }}>{t.inflationHeadline}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: '#C7D4FF' }}>{t.inflationNote}</div>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 16px' }}>{t.auditIntro}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {t.auditNumbers.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 16px', borderRadius: 10, background: '#FFFFFF' }}>
                <span style={{ fontSize: 14, color: '#5A5F73' }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#002FA7', whiteSpace: 'nowrap' }}>{value}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 16px' }}>{t.gapFinding}</p>

          <button
            onClick={() => setMethodologyOpen(o => !o)}
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#002FA7', background: 'rgba(0,47,167,0.09)', padding: '6px 14px', borderRadius: 999, border: 'none', fontFamily: "'Inter', sans-serif", marginBottom: 16 }}
          >
            {methodologyOpen ? <>{t.hideMethodology}<ChevronUp size={14} /></> : <>{t.showMethodology}<ChevronDown size={14} /></>}
          </button>

          {methodologyOpen && (
            <div style={{ background: 'rgba(0,47,167,0.03)', borderRadius: 14, padding: 20 }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 20px' }}>{t.methodologyIntro}</p>
              <div className="rg-3">
                {t.auditDimensions.map(({ label, desc }) => (
                  <div key={label} style={{ padding: 16, borderRadius: 12, background: '#FFFFFF' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#001A5C', marginBottom: 6 }}>{label}</div>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: '#5A5F73', margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 12 }}>{t.categorisingTitle}</div>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 20px' }}>{t.categorisingIntro}</p>

        <div className="table-scroll" style={{ padding: 24, borderRadius: 20, border: '1px solid #EAF1FF', background: '#F8FAFF', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                {t.auditColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 16px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.tierRows.map((row, i, arr) => (
                <tr key={row.tier} style={{ borderBottom: i < arr.length - 1 ? '1px solid #EAF1FF' : undefined }}>
                  <td data-label={t.auditColumns[0]} style={{ padding: '14px 16px', color: '#12141F', fontWeight: 600 }}>{row.tier}</td>
                  <td data-label={t.auditColumns[1]} style={{ padding: '14px 16px', color: '#002FA7', fontWeight: 700 }}>{row.n}</td>
                  <td data-label={t.auditColumns[2]} style={{ padding: '14px 16px', color: '#5A5F73' }}>{row.criteria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 12 }}>{t.agnosticTitle}</div>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 20px' }}>{t.agnosticIntro}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>
          <div style={{ padding: 24, borderRadius: 20, background: '#12141F', color: '#F2F6FF' }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#8FAEFF', marginBottom: 10 }}>{t.coreLabel}</div>
            {t.coreLines.map((line, i) => (
              <p key={i} style={{ fontSize: 15, lineHeight: 1.7, margin: i === t.coreLines.length - 1 ? 0 : '0 0 6px' }}>{line}</p>
            ))}
          </div>
          <div style={{ padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(20,30,60,0.1)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 10 }}>{t.projectLabel}</div>
            {t.projectLines.map((line, i) => (
              <p key={i} style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: i === t.projectLines.length - 1 ? 0 : '0 0 6px' }}>{line}</p>
            ))}
          </div>
        </div>

        <h2 style={{ ...H2, fontSize: 'clamp(18px,2.6vw,22px)', marginBottom: 8 }}>{t.judgmentTitle}</h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 20px' }}>{t.judgmentIntro}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {t.judgmentCalls.map(({ n, name, desc }) => (
            <div key={n} style={{ display: 'flex', gap: 20, padding: '20px 24px', borderRadius: 16, border: '1px solid #EAF1FF', background: '#FAFBFF' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#002FA7', minWidth: 28 }}>{n}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 6 }}>{name}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 12 }}>{t.principlesTitle}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {t.principles.map(({ n, name, desc }) => (
            <div key={n} style={{ display: 'flex', gap: 20, padding: '20px 24px', borderRadius: 16, border: '1px solid #EAF1FF', background: '#FAFBFF' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#002FA7', minWidth: 28 }}>{n}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 6 }}>{name}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 12 }}>{t.governanceTitle}</div>
        <DarkBox label={t.governanceBoxLabel}>
          {t.governanceBox.map((p, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.75, margin: i === t.governanceBox.length - 1 ? 0 : '0 0 16px' }}>{p}</p>
          ))}
        </DarkBox>

        {t.phase1Closing.map((p, i) => <Body key={i}>{p}</Body>)}
      </div>

      {/* WHAT WE LEARNED */}
      <div style={S}>
        <DarkBox label={t.learnedLabel}>
          <p style={{ fontSize: 16, lineHeight: 1.75, margin: 0 }}>{t.learnedBox}</p>
        </DarkBox>
      </div>

      {/* PHASE 2 */}
      <div style={S}>
        <h2 style={H2}>{t.phase2Title}</h2>
        {t.phase2.map((p, i) => <Body key={i}>{p}</Body>)}

        <div className="rg-2" style={{ marginBottom: 20 }}>
          <div style={{ padding: 20, borderRadius: 16, border: '1px solid #EAF1FF', background: '#FAFBFF' }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 10 }}>{t.beforeLabel}</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{t.beforeText}</p>
          </div>
          <div style={{ padding: 20, borderRadius: 16, background: '#12141F', color: '#F2F6FF' }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#8FAEFF', marginBottom: 10 }}>{t.afterLabel}</div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: '#C7D4FF', margin: 0, fontFamily: 'monospace' }}>{t.afterText}</p>
          </div>
        </div>
        <Body>{t.phase2Closing}</Body>
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
