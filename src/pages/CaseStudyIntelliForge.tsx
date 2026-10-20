import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyShell, { Body, DarkBox, SeverityChip } from '../components/CaseStudyShell'
import ChevronLeft from '../components/ChevronLeft'
import ChevronRight from '../components/ChevronRight'
import { useLanguage } from '../i18n/LanguageContext'
import showcaseVideo from '../imports/inteli-showcase.mp4'
import browserFrame from '../imports/browser-frame.svg'

// Video sits in the white area of the 1492×961 frame (1440×900, the video's own ratio).
// Plays once, muted, when scrolled into view; stays on the last frame when it ends.
function ShowcaseVideo({ src, label }: { src: string; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.play().catch(() => {}); io.disconnect() }
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div>
      {label && <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{label}</div>}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1492 / 961', filter: 'drop-shadow(0 24px 40px rgba(0,26,92,0.14)) drop-shadow(0 6px 14px rgba(0,26,92,0.08))' }}>
        <img src={browserFrame} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        <video ref={ref} controls muted controlsList="nodownload" onContextMenu={e => e.preventDefault()} preload="auto" playsInline style={{ position: 'absolute', left: `${26 / 14.92}%`, top: `${31 / 9.61}%`, width: `${1440 / 14.92}%`, height: `${900 / 9.61}%`, borderRadius: '1.944% / 3.111%', objectFit: 'cover', background: '#fff' }}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

const S = { padding: '0 0 48px' } as const
const H2 = { fontSize: 'clamp(20px,3vw,26px)' as const, fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 20px' }

const copy = {
  en: {
    eyebrow: 'Case Study',
    title: 'IntelliForge SR2R',
    description: 'Designing a governed, ontology-driven Intelligent Financial Close system that transforms 200 manual month-end close cycles into a scalable, auditable decision engine — and builds the evidence base for a 10× volume bid.',
    meta: [
      { label: 'Role', value: 'Product Designer (UX/UI)' },
      { label: 'Client', value: 'Global energy company' },
      { label: 'Timeline', value: '14 weeks — Phase 1 prototype' },
      { label: 'Team', value: '1 Designer · Architect · Data Engineer · 2 Engineers · Partner · PM' },
      { label: 'Tools', value: 'Figma · FigJam · Python (FastAPI) · RDFLib · YAML' },
      { label: 'Deliverable', value: '7-screen control plane · 5 decision engines · 20 API endpoints' },
    ],
    stats: [
      { value: '200', label: 'franchise dealers in monthly scope' },
      { value: '60–90 min', label: 'analyst time per franchise, per cycle' },
      { value: '8', label: 'decision capabilities designed and shipped' },
    ],
    showcaseLabel: 'Prototype showcase',
    hookTitle: 'The Hook',
    hook1: "Every month, 200 third-party retail franchise dealers submit financial data to the client's Record-to-Report managed service — trial balances, account schedules, and supporting documents loaded into Microsoft Business Central. Every month, client analysts manually ingest every file, map every local dealer account code to the client's corporate Chart of Accounts, reconcile discrepancies, investigate anomalies, propose journal entries, and govern what gets posted — against a hard month-end close deadline that waits for no one.",
    hookEmphasis: "The process works. The economics don't.",
    hook2: "At 60–90 minutes of analyst time per franchise per cycle, the engagement consumes up to 300 analyst-hours every single month. The cost of the 200th franchise equals the cost of the first. Nothing compounds. When the client's Mobility division — roughly 10× the current engagement in scale — issued a bid invitation, the engagement team faced a structural problem: winning that contract and delivering it manually would require 10× the headcount. Winning it on a cost basis was not commercially viable.",
    hook3: 'IntelliForge SR2R is an ontology-driven Decision Twin — a governed control layer sitting on top of Business Central — that ingests submissions, maps accounts with confidence scoring, scores close readiness, predicts risk, estimates the cost of inaction, generates intervention plans, automates governed journal entries, and maintains a complete, reproducible audit trail. Eight decision capabilities. One system. Near-zero marginal cost of scale.',
    researchTitle: 'Outlining the Research',
    researchIntro: 'Discovery ran five parallel tracks across the first three weeks — starting with an independent audit of the system IntelliForge would sit on top of.',
    auditTitle: '0. Baseline UX Audit — The Legacy Business Central Portal',
    auditBody: 'An independent UX audit of the existing Microsoft Dynamics 365 Business Central portal, deliberately conducted by someone with no day-to-day operational familiarity — unfamiliarity treated as a methodological asset, since experienced users stop perceiving friction that has become routine.',
    auditStats: [['26', 'usability findings logged'], ['13', 'rated critical severity'], ['5', 'structural root causes identified']],
    auditColumns: ['Finding', 'Severity', 'Operational Impact'],
    auditFindings: [
      { finding: 'KPIs carry no anomaly alerting', severity: 'Critical', impact: 'A £192M figure read with the same visual weight as £0' },
      { finding: 'No consolidated, role-aware dashboard', severity: 'Critical', impact: 'Analysts "chase" retailers site by site for status' },
      { finding: "Search doesn't recognise R2R vocabulary", severity: 'Critical', impact: 'Zero results for a core term, day before deadline' },
      { finding: 'Integration log fails silently', severity: 'Critical', impact: '11 errors sat undetected until the day before deadline' },
      { finding: 'Filters carry no persistent state', severity: 'Critical', impact: '2–3 hours of redundant reconfiguration, every cycle' },
    ],
    researchTracks: [
      { n: '1', title: 'Process Archaeology — Three Consecutive Close Cycles', body: "Shadowed R2R analysts through three consecutive month-end closes, documenting every manual decision. The output: a catalogue of 34 distinct decision points — not a process map, a decision inventory. Every point became a candidate for the system's decision engine." },
      { n: '2', title: 'Data Structure Analysis — 200 Submission Formats', body: 'Catalogued all 200 franchise submission formats and identified 12 structurally distinct variants — different account code conventions, granularities, and intercompany handling — directly scoping the ontology.' },
      { n: '3', title: 'Stakeholder Interviews — Three Persona Tiers', body: "Structured interviews across analysts, the Account Partner, and the client's Regional Finance Manager — three tiers, three entirely different definitions of success, each directly driving a screen." },
      { n: '4', title: 'Competitive Benchmarking — R2R Automation Tools', body: 'Evaluated six market tools; all treated the problem as data transformation, none offered governed decision-making or reproducible audit trails. The market had ETL tools. The client needed a Decision Twin.' },
    ],
    learnedLabel: 'What We Learned',
    learnedBox: [
      'The root problem wasn\'t the volume of work — it was that all mapping knowledge, validation rules, and escalation logic lived in analyst memory and spreadsheets. Nothing accumulated into institutional knowledge.',
      "The secondary finding reshaped the product's commercial framing: the Account Partner's real audience wasn't the delivery team — it was the client's bid committee. The hero screen wasn't the analyst workbench; it was a Simulation Mode proving the model could scale to 2,000 franchises at near-zero marginal cost.",
    ],
    personasTitle: 'Define — Personas and Decision Maps',
    personasIntro: 'Three personas drove every design decision. Designing a screen without asking "which persona is sitting in front of this?" was treated as a process failure.',
    personaLabel: 'Persona',
    personas: [
      {
        n: '1 of 3',
        name: 'The R2R Accountant',
        desc: 'The daily operator. Success: completing close on time with zero unresolved exceptions and a full audit trail. Frustration: discovering a close-blocking anomaly in the final hour, with no time to investigate.',
        implication: 'Design implication: a prioritised exception queue with enough context to act immediately — never a data dump.',
      },
      {
        n: '2 of 3',
        name: 'The Account Partner',
        desc: 'The commercial lead for the expansion bid. Success: walking out with a signed letter of intent. Frustration: no visual, interactive proof point — only a spreadsheet projection any skeptic can dismiss.',
        implication: 'Design implication: operable by a non-technical partner, unassisted, in under three minutes, live in the room.',
      },
      {
        n: '3 of 3',
        name: 'The Client Regional Finance Manager',
        desc: "Accountable for audit defensibility. Success: reproducing any posted journal back to its source in under three minutes. Frustration: today's paper trail spans three spreadsheets and two email threads.",
        implication: 'Design implication: a journal-anchored navigator, with every governing rule shown inline as a human-readable citation.',
      },
    ],
    iaTitle: 'Information Architecture — The 7-Tab Control Plane',
    iaIntro: 'Rather than one monolithic dashboard, the control plane was organised around the persona-decision matrix — which decisions belong to whom, at which stage of the cycle.',
    tabsColumns: ['Tab', 'Persona', 'Core Decision Served'],
    tabs: [
      { tab: 'Command Center', persona: 'R2R Accountant', decision: 'Is the close on track?' },
      { tab: 'Submission Ingestion', persona: 'R2R Accountant', decision: 'Have all 200 franchises submitted valid files?' },
      { tab: 'GL Mapping Workbench', persona: 'R2R Accountant', decision: 'Which mapped accounts need human review?' },
      { tab: 'Exception Workbench', persona: 'R2R Accountant', decision: 'Which anomalies will delay close?' },
      { tab: 'Journal Review', persona: 'R2R Accountant', decision: 'Which proposed journals are ready to approve?' },
      { tab: 'Simulation Mode', persona: 'Account Partner', decision: 'What does cost look like at 2,000 franchises?' },
      { tab: 'Audit & Trace', persona: 'Client Finance Manager', decision: 'Where did this journal entry come from?' },
    ],
    keyDecisionsTitle: 'Key Feature Decisions — and What We Rejected',
    keyDecisionsIntro: "Every significant feature went through rejected directions before landing — that's where the actual design thinking lives.",
    rejectedLabel: 'Rejected — ',
    shippedLabel: 'Shipped: ',
    resultLabel: 'Result: ',
    keyDecisions: [
      {
        title: 'GL Mapping Confidence Score',
        rejected: 'Binary Match/No-Match — told analysts a mapping existed, not whether to trust it. Analysts verified every account regardless — an incorrect high-confidence mapping is worse than a flagged low-confidence one.',
        shipped: 'A three-tier confidence score (High/Medium/Low) from SHACL shape validation and semantic similarity. Only Low-confidence mappings enter the review queue.',
        result: 'Manual review queue fell from 100% to ~18% of mapped accounts.',
      },
      {
        title: 'Exception Workbench Sort Order',
        rejected: 'Chronological Detection — oldest flag first carried no triage signal; analysts spent the first 45 minutes on items with no bearing on close readiness.',
        shipped: 'Sorted by pre-close risk score — P(delay) from 8 weighted features. The LLM generates the narrative intervention plan; the deterministic engine provides the facts.',
        result: null as string | null,
      },
      {
        title: 'Inaction Cost Estimator — Not in the Original Brief',
        rejected: null as string | null,
        shipped: "Emerged from Account Partner interviews: partners needed to explain not just what a journal was, but the financial cost of not posting it — today, not eventually. A deterministic, auditable calculator — journal amount, delay in days, cost of capital — became the system's eighth decision capability, now a reusable platform primitive.",
        result: null as string | null,
      },
      {
        title: 'Policy Configuration',
        rejected: 'Hardcoded Engineering Parameters — changing a threshold meant a pull request, a review, and downtime. Engagement parameters change too often for that.',
        shipped: 'Every threshold and policy lives in versioned, human-readable YAML, editable by a partner through an admin form — no deployment required, every journal citing the exact rule version that governed it.',
        result: null as string | null,
      },
    ],
    archPrincipleLabel: 'Architecture Principle',
    archPrincipleTitle: 'Deterministic-First / LLM-Second',
    archPrincipleBody: "Every score, flag, and decision is computed from defined formulas with inspectable inputs. The LLM only generates the text of intervention plans and powers the agent chat — it cannot modify a number, post a journal, or override a rule. Every LLM output is labelled \"Suggested plan — review before actioning.\" The system assists; humans govern.",
    testingTitle: 'Prototypes and Design Iterations — Three Rounds of Testing',
    testingRounds: [
      {
        title: 'Round 1 — Internal Analyst Testing',
        body: '5 client analysts, 12 task scenarios. The readiness score as a single "73%" prompted the same question every time: "73% of what?" Redesigned as a four-zone gauge (Not Started / In Progress / At Risk / Close Ready) with a 6-component breakdown.',
        result: 'Analysts correctly identified the close-blocking item in 100% of scenarios, up from 40%.',
        quote: null as string | null,
        quoteAttrib: null as string | null,
      },
      {
        title: 'Round 2 — Partner Simulation Mode Testing',
        body: '2 Account Partners stalled at manual parameter entry mid-demo. Redesigned to a single input — a franchise volume slider — with all baseline parameters pre-seeded from live engagement data.',
        result: 'Both partners completed the demo unassisted, averaging 2 minutes 40 seconds.',
        quote: '"I would never open this in a room without a script. I need it to open ready."' as string | null,
        quoteAttrib: '— Account Partner, Round 2 testing' as string | null,
      },
      {
        title: 'Round 3 — Client Finance Manager Audit Testing',
        body: 'The original reverse-chronological log read "like a system log, not an audit explanation." Redesigned as a forward step-by-step timeline: Submission → Parsed & Validated → GL Mapped → Exception Reviewed → Journal Proposed → Governing Rule Applied → Analyst Approved → Posted.',
        result: 'Reproduced a test journal in 2 minutes 11 seconds — within the 3-minute requirement.',
        quote: '"I need to tell the story forwards, from the submission to the posting."' as string | null,
        quoteAttrib: '— Client Regional Finance Manager, Round 3 testing' as string | null,
      },
    ],
    methodTitle: 'The method behind it',
    method: 'The way this case was run, with a brief first, assumptions kept visible and a human decision at each checkpoint, is the process I later formalised as the Agentic UX Flow plugin.',
    methodLink: 'See the Agentic UX Flow case study',
    impactTitle: 'Concluding with Impact',
    impactIntro: 'Delivered as a fully validated, development-ready prototype at the end of 14 weeks: a 7-tab control plane, 5 decision engines, 20 FastAPI endpoints, 195 automated tests, and 600 synthetic artifact files covering 12 franchises × 12 months.',
    kpiColumns: ['KPI', 'Baseline', 'Result / Target'],
    kpiRows: [
      { kpi: 'Analyst time per franchise', baseline: '60–90 min', result: '8–12 min (est., Phase 2 validation)' },
      { kpi: 'GL mapping manual review queue', baseline: '100% of accounts', result: '~18% (low-confidence only)' },
      { kpi: 'Audit trail reproduction time', baseline: '30+ min, 3 spreadsheets', result: '2 min 11 sec' },
      { kpi: 'Exception triage accuracy', baseline: '40% (Round 1)', result: '100% post-iteration' },
      { kpi: 'Submission format variants handled', baseline: '0 (all manual)', result: '12 variants' },
      { kpi: 'Partner demo (expansion bid scenario)', baseline: 'Spreadsheet estimate only', result: '2 min 40 sec uncoached' },
      { kpi: 'Policy change turnaround', baseline: 'Engineering deployment', result: 'Partner-editable YAML, no deployment' },
      { kpi: 'Marginal cost of 1,800 new franchises', baseline: '≈ 10× headcount', result: 'Near-zero — same system, new config' },
    ],
    quote: 'The confidence scoring changed how fast the team could move — cases that sat in review for a day now clear in minutes.',
    quoteAttrib: '— Head of Delivery, the client',
    nextTitle: "What's Next",
    next: [
      'Phase 2 replaces the synthetic dataset with a live Business Central connection and adds persistent storage, authentication, and role-based access control — the test architecture was written to be data-source-agnostic, making this a configuration change, not a rewrite.',
      'Phase 3 brings Mobility-division onboarding: a gain-share commercial module converting Simulation Mode from a demo tool into a live dashboard tracking actual versus projected margin differential.',
      "If the client's Mobility contract is won and delivered manually, delivery cost scales 10×. With IntelliForge SR2R as the control layer, delivery cost scales near-zero — and the margin differential funds the full platform investment. The prototype doesn't just improve the current engagement. It proves the model that wins the bid.",
    ],
  },
  pt: {
    eyebrow: 'Case Study',
    title: 'IntelliForge SR2R',
    description: 'Desenho de um sistema de Fecho Financeiro Inteligente, governado e orientado por ontologia, que transforma 200 ciclos de fecho mensal manuais num motor de decisão escalável e auditável — e constrói a base de evidência para uma proposta de 10× o volume.',
    meta: [
      { label: 'Função', value: 'Product Designer (UX/UI)' },
      { label: 'Cliente', value: 'Empresa global de energia' },
      { label: 'Duração', value: '14 semanas — protótipo da Fase 1' },
      { label: 'Equipa', value: '1 Designer · Architect · Data Engineer · 2 Engineers · Partner · PM' },
      { label: 'Ferramentas', value: 'Figma · FigJam · Python (FastAPI) · RDFLib · YAML' },
      { label: 'Entregável', value: 'Control plane com 7 ecrãs · 5 motores de decisão · 20 endpoints de API' },
    ],
    stats: [
      { value: '200', label: 'concessionários franchisados no âmbito mensal' },
      { value: '60–90 min', label: 'tempo de analista por concessionário, por ciclo' },
      { value: '8', label: 'capacidades de decisão desenhadas e entregues' },
    ],
    showcaseLabel: 'Showcase do protótipo',
    hookTitle: 'O Ponto de Partida',
    hook1: 'Todos os meses, 200 concessionários de retalho franchisados submetem dados financeiros ao serviço gerido de Record-to-Report do cliente — balancetes, mapas de contas e documentos de suporte carregados no Microsoft Business Central. Todos os meses, os analistas do cliente processam manualmente cada ficheiro, mapeiam cada código de conta local do concessionário para o Chart of Accounts corporativo do cliente, reconciliam discrepâncias, investigam anomalias, propõem lançamentos contabilísticos e governam o que é lançado — contra um prazo rígido de fecho mensal que não espera por ninguém.',
    hookEmphasis: 'O processo funciona. A economia, não.',
    hook2: 'A 60–90 minutos de tempo de analista por concessionário, por ciclo, a colaboração consome até 300 horas de analista todos os meses. O custo do concessionário 200 é igual ao custo do primeiro. Nada se acumula. Quando a divisão Mobility do cliente — cerca de 10× a escala da colaboração atual — lançou um convite à proposta, a equipa enfrentou um problema estrutural: ganhar esse contrato e entregá-lo manualmente exigiria 10× o número de pessoas. Ganhá-lo numa base de custo não era comercialmente viável.',
    hook3: 'A IntelliForge SR2R é um Decision Twin orientado por ontologia — uma camada de controlo governada, assente sobre o Business Central — que processa submissões, mapeia contas com pontuação de confiança, pontua a prontidão do fecho, prevê risco, estima o custo da inação, gera planos de intervenção, automatiza lançamentos contabilísticos governados, e mantém um registo de auditoria completo e reproduzível. Oito capacidades de decisão. Um sistema. Custo marginal de escala quase zero.',
    researchTitle: 'Delinear a Investigação',
    researchIntro: 'O Discovery decorreu em cinco pistas paralelas ao longo das primeiras três semanas — começando com uma auditoria independente ao sistema sobre o qual a IntelliForge assentaria.',
    auditTitle: '0. Auditoria UX de Referência — O Portal Legado do Business Central',
    auditBody: 'Uma auditoria UX independente ao portal existente do Microsoft Dynamics 365 Business Central, conduzida deliberadamente por alguém sem familiaridade operacional do dia a dia — a falta de familiaridade tratada como um ativo metodológico, já que utilizadores experientes deixam de perceber fricção que se tornou rotina.',
    auditStats: [['26', 'descobertas de usabilidade registadas'], ['13', 'classificadas como severidade crítica'], ['5', 'causas-raiz estruturais identificadas']],
    auditColumns: ['Descoberta', 'Severidade', 'Impacto Operacional'],
    auditFindings: [
      { finding: 'Os KPIs não têm alertas de anomalia', severity: 'Crítico', impact: 'Um valor de £192M lido com o mesmo peso visual que £0' },
      { finding: 'Sem dashboard consolidado e sensível a papéis', severity: 'Crítico', impact: 'Analistas "perseguem" retalhistas site a site por estado' },
      { finding: 'A pesquisa não reconhece o vocabulário de R2R', severity: 'Crítico', impact: 'Zero resultados para um termo central, no dia anterior ao prazo' },
      { finding: 'O log de integração falha silenciosamente', severity: 'Crítico', impact: '11 erros não detetados até ao dia anterior ao prazo' },
      { finding: 'Os filtros não mantêm estado persistente', severity: 'Crítico', impact: '2–3 horas de reconfiguração redundante, em cada ciclo' },
    ],
    researchTracks: [
      { n: '1', title: 'Arqueologia de Processo — Três Ciclos de Fecho Consecutivos', body: 'Acompanhei analistas de R2R durante três fechos mensais consecutivos, documentando cada decisão manual. O resultado: um catálogo de 34 pontos de decisão distintos — não um mapa de processo, um inventário de decisões. Cada ponto tornou-se candidato ao motor de decisão do sistema.' },
      { n: '2', title: 'Análise de Estrutura de Dados — 200 Formatos de Submissão', body: 'Catalogados os 200 formatos de submissão dos concessionários, identificando 12 variantes estruturalmente distintas — convenções de código de conta, granularidades e tratamento intercompany diferentes — a delimitar diretamente a ontologia.' },
      { n: '3', title: 'Entrevistas a Stakeholders — Três Níveis de Persona', body: 'Entrevistas estruturadas a analistas, ao Account Partner, e ao Regional Finance Manager do cliente — três níveis, três definições de sucesso completamente diferentes, cada uma a orientar diretamente um ecrã.' },
      { n: '4', title: 'Benchmarking Competitivo — Ferramentas de Automação de R2R', body: 'Avaliadas seis ferramentas de mercado; todas tratavam o problema como transformação de dados, nenhuma oferecia tomada de decisão governada ou registos de auditoria reproduzíveis. O mercado tinha ferramentas de ETL. O cliente precisava de um Decision Twin.' },
    ],
    learnedLabel: 'O Que Aprendemos',
    learnedBox: [
      'O problema de raiz não era o volume de trabalho — era que todo o conhecimento de mapeamento, regras de validação e lógica de escalada vivia na memória dos analistas e em folhas de cálculo. Nada se acumulava em conhecimento institucional.',
      'A descoberta secundária reformulou o enquadramento comercial do produto: o verdadeiro público do Account Partner não era a equipa de entrega — era o comité de decisão de proposta do cliente. O ecrã principal não era a bancada de trabalho do analista; era um Simulation Mode a provar que o modelo conseguia escalar para 2.000 concessionários a custo marginal quase zero.',
    ],
    personasTitle: 'Definir — Personas e Mapas de Decisão',
    personasIntro: 'Três personas orientaram cada decisão de design. Desenhar um ecrã sem perguntar "que persona está à frente disto?" era tratado como uma falha de processo.',
    personaLabel: 'Persona',
    personas: [
      {
        n: '1 de 3',
        name: 'O Contabilista R2R',
        desc: 'O operador diário. Sucesso: concluir o fecho a tempo, com zero exceções por resolver e um registo de auditoria completo. Frustração: descobrir uma anomalia que bloqueia o fecho na última hora, sem tempo para investigar.',
        implication: 'Implicação de design: uma fila de exceções priorizada, com contexto suficiente para agir imediatamente — nunca um despejo de dados.',
      },
      {
        n: '2 de 3',
        name: 'O Account Partner',
        desc: 'O responsável comercial pela proposta de expansão. Sucesso: sair da reunião com uma carta de intenções assinada. Frustração: sem prova visual e interativa — apenas uma projeção em folha de cálculo que qualquer cético consegue descartar.',
        implication: 'Implicação de design: operável por um partner não técnico, sem assistência, em menos de três minutos, ao vivo na sala.',
      },
      {
        n: '3 de 3',
        name: 'O Regional Finance Manager do Cliente',
        desc: 'Responsável pela defensabilidade em auditoria. Sucesso: reproduzir qualquer lançamento contabilístico até à sua origem em menos de três minutos. Frustração: hoje, o rasto em papel espalha-se por três folhas de cálculo e duas threads de email.',
        implication: 'Implicação de design: um navegador ancorado ao lançamento contabilístico, com cada regra governante mostrada inline como citação legível por humanos.',
      },
    ],
    iaTitle: 'Arquitetura de Informação — O Control Plane de 7 Separadores',
    iaIntro: 'Em vez de um único dashboard monolítico, o control plane foi organizado à volta da matriz persona-decisão — que decisões pertencem a quem, em que fase do ciclo.',
    tabsColumns: ['Separador', 'Persona', 'Decisão Principal Servida'],
    tabs: [
      { tab: 'Command Center', persona: 'Contabilista R2R', decision: 'O fecho está dentro do prazo?' },
      { tab: 'Submission Ingestion', persona: 'Contabilista R2R', decision: 'Todos os 200 concessionários submeteram ficheiros válidos?' },
      { tab: 'GL Mapping Workbench', persona: 'Contabilista R2R', decision: 'Que contas mapeadas precisam de revisão humana?' },
      { tab: 'Exception Workbench', persona: 'Contabilista R2R', decision: 'Que anomalias vão atrasar o fecho?' },
      { tab: 'Journal Review', persona: 'Contabilista R2R', decision: 'Que lançamentos propostos estão prontos para aprovar?' },
      { tab: 'Simulation Mode', persona: 'Account Partner', decision: 'Como é o custo a 2.000 concessionários?' },
      { tab: 'Audit & Trace', persona: 'Finance Manager do Cliente', decision: 'De onde veio este lançamento contabilístico?' },
    ],
    keyDecisionsTitle: 'Decisões-Chave de Funcionalidades — e o Que Rejeitámos',
    keyDecisionsIntro: 'Cada funcionalidade significativa passou por direções rejeitadas antes de ser fechada — é aí que vive o verdadeiro raciocínio de design.',
    rejectedLabel: 'Rejeitado — ',
    shippedLabel: 'Entregue: ',
    resultLabel: 'Resultado: ',
    keyDecisions: [
      {
        title: 'Pontuação de Confiança do Mapeamento GL',
        rejected: 'Corresponde/Não Corresponde binário — dizia aos analistas que um mapeamento existia, não se deviam confiar nele. Os analistas verificavam todas as contas de qualquer forma — um mapeamento incorreto de alta confiança é pior do que um de baixa confiança sinalizado.',
        shipped: 'Uma pontuação de confiança em três níveis (Alta/Média/Baixa), a partir de validação de forma SHACL e similaridade semântica. Só os mapeamentos de Baixa confiança entram na fila de revisão.',
        result: 'A fila de revisão manual caiu de 100% para cerca de 18% das contas mapeadas.',
      },
      {
        title: 'Ordem de Ordenação do Exception Workbench',
        rejected: 'Deteção Cronológica — a sinalização mais antiga primeiro não dava qualquer sinal de triagem; os analistas passavam os primeiros 45 minutos em itens sem relevância para a prontidão do fecho.',
        shipped: 'Ordenado por pontuação de risco pré-fecho — P(atraso) a partir de 8 características ponderadas. O LLM gera o plano de intervenção narrativo; o motor determinístico fornece os factos.',
        result: null as string | null,
      },
      {
        title: 'Estimador de Custo de Inação — Fora do Briefing Original',
        rejected: null as string | null,
        shipped: 'Surgiu das entrevistas ao Account Partner: os partners precisavam de explicar não só o que era um lançamento, mas o custo financeiro de não o lançar — hoje, não eventualmente. Uma calculadora determinística e auditável — valor do lançamento, atraso em dias, custo de capital — tornou-se a oitava capacidade de decisão do sistema, hoje uma primitiva reutilizável da plataforma.',
        result: null as string | null,
      },
      {
        title: 'Configuração de Políticas',
        rejected: 'Parâmetros de engenharia fixos no código — alterar um limiar significava um pull request, uma revisão e downtime. Os parâmetros da colaboração mudam com demasiada frequência para isso.',
        shipped: 'Cada limiar e política vive em YAML versionado e legível por humanos, editável por um partner através de um formulário de administração — sem necessidade de deployment, com cada lançamento a citar a versão exata da regra que o governou.',
        result: null as string | null,
      },
    ],
    archPrincipleLabel: 'Princípio de Arquitetura',
    archPrincipleTitle: 'Determinístico Primeiro / LLM Depois',
    archPrincipleBody: 'Cada pontuação, sinalização e decisão é calculada a partir de fórmulas definidas, com inputs inspecionáveis. O LLM só gera o texto dos planos de intervenção e potencia o chat do agente — não pode alterar um número, lançar um movimento contabilístico, nem sobrepor-se a uma regra. Cada output do LLM é rotulado "Plano sugerido — rever antes de agir." O sistema assiste; os humanos governam.',
    testingTitle: 'Protótipos e Iterações de Design — Três Rondas de Testes',
    testingRounds: [
      {
        title: 'Ronda 1 — Testes Internos com Analistas',
        body: '5 analistas do cliente, 12 cenários de tarefa. A pontuação de prontidão como um único "73%" gerava sempre a mesma pergunta: "73% de quê?" Redesenhada como um indicador de quatro zonas (Não Iniciado / Em Curso / Em Risco / Pronto para Fechar) com uma desagregação em 6 componentes.',
        result: 'Os analistas identificaram corretamente o item que bloqueava o fecho em 100% dos cenários, subindo de 40%.',
        quote: null as string | null,
        quoteAttrib: null as string | null,
      },
      {
        title: 'Ronda 2 — Testes do Simulation Mode com Partners',
        body: '2 Account Partners pararam na introdução manual de parâmetros a meio da demonstração. Redesenhado para um único input — um slider de volume de concessionários — com todos os parâmetros de base pré-preenchidos a partir de dados reais da colaboração.',
        result: 'Ambos os partners concluíram a demonstração sem assistência, numa média de 2 minutos e 40 segundos.',
        quote: '"Nunca abriria isto numa sala sem um guião. Preciso que abra já pronto."' as string | null,
        quoteAttrib: '— Account Partner, testes da Ronda 2' as string | null,
      },
      {
        title: 'Ronda 3 — Testes de Auditoria com o Finance Manager do Cliente',
        body: 'O registo cronológico inverso original lia-se "como um log de sistema, não como uma explicação de auditoria." Redesenhado como uma linha temporal progressiva, passo a passo: Submissão → Processado e Validado → Mapeado para GL → Exceção Revista → Lançamento Proposto → Regra Governante Aplicada → Aprovado pelo Analista → Lançado.',
        result: 'Reproduziu um lançamento de teste em 2 minutos e 11 segundos — dentro do requisito de 3 minutos.',
        quote: '"Preciso de contar a história para a frente, da submissão até ao lançamento."' as string | null,
        quoteAttrib: '— Regional Finance Manager do Cliente, testes da Ronda 3' as string | null,
      },
    ],
    methodTitle: 'O método por trás',
    method: 'A forma como este caso foi conduzido, com o brief primeiro, os pressupostos sempre visíveis e uma decisão humana em cada checkpoint, é o processo que depois formalizei no plugin Agentic UX Flow.',
    methodLink: 'Ver o case study do Agentic UX Flow',
    impactTitle: 'Concluir com Impacto',
    impactIntro: 'Entregue como um protótipo totalmente validado e pronto para desenvolvimento, ao fim de 14 semanas: um control plane de 7 separadores, 5 motores de decisão, 20 endpoints FastAPI, 195 testes automatizados, e 600 ficheiros de artefactos sintéticos cobrindo 12 concessionários × 12 meses.',
    kpiColumns: ['KPI', 'Referência', 'Resultado / Objetivo'],
    kpiRows: [
      { kpi: 'Tempo de analista por concessionário', baseline: '60–90 min', result: '8–12 min (estimado, validação da Fase 2)' },
      { kpi: 'Fila de revisão manual do mapeamento GL', baseline: '100% das contas', result: '~18% (só baixa confiança)' },
      { kpi: 'Tempo de reprodução do registo de auditoria', baseline: '30+ min, 3 folhas de cálculo', result: '2 min 11 seg' },
      { kpi: 'Precisão da triagem de exceções', baseline: '40% (Ronda 1)', result: '100% pós-iteração' },
      { kpi: 'Variantes de formato de submissão suportadas', baseline: '0 (tudo manual)', result: '12 variantes' },
      { kpi: 'Demonstração ao partner (cenário de proposta de expansão)', baseline: 'Só estimativa em folha de cálculo', result: '2 min 40 seg sem assistência' },
      { kpi: 'Tempo de resposta a alteração de política', baseline: 'Deployment de engenharia', result: 'YAML editável pelo partner, sem deployment' },
      { kpi: 'Custo marginal de 1.800 novos concessionários', baseline: '≈ 10× o número de pessoas', result: 'Quase zero — mesmo sistema, nova configuração' },
    ],
    quote: 'A pontuação de confiança mudou a velocidade a que a equipa conseguia avançar — casos que ficavam um dia em revisão agora ficam concluídos em minutos.',
    quoteAttrib: '— Head of Delivery do cliente',
    nextTitle: 'O Que Vem a Seguir',
    next: [
      'A Fase 2 substitui o conjunto de dados sintéticos por uma ligação ao vivo ao Business Central e acrescenta armazenamento persistente, autenticação e controlo de acesso baseado em papéis — a arquitetura de testes foi escrita para ser agnóstica à fonte de dados, tornando isto uma mudança de configuração, não uma reescrita.',
      'A Fase 3 traz o onboarding da divisão Mobility: um módulo comercial de partilha de ganhos que transforma o Simulation Mode de ferramenta de demonstração num dashboard ao vivo que acompanha o diferencial de margem real versus projetado.',
      'Se o contrato da divisão Mobility do cliente for ganho e entregue manualmente, o custo de entrega escala 10×. Com a IntelliForge SR2R como camada de controlo, o custo de entrega escala quase para zero — e o diferencial de margem financia todo o investimento na plataforma. O protótipo não melhora apenas a colaboração atual. Prova o modelo que ganha a proposta.',
    ],
  },
}

export default function CaseStudyIntelliForge() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [personaIdx, setPersonaIdx] = useState(0)
  const [testingIdx, setTestingIdx] = useState(0)

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
        <Body>{t.hook1}</Body>
        <p style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 20px' }}>{t.hookEmphasis}</p>
        <Body>{t.hook2}</Body>
        <Body>{t.hook3}</Body>
      </div>

      {/* PROTOTYPE SHOWCASE */}
      <div style={{ ...S, paddingBottom: 32 }}>
        <ShowcaseVideo src={showcaseVideo} label={t.showcaseLabel} />
      </div>

      {/* RESEARCH */}
      <div style={{ position: 'relative', ...S }}>
        <div style={{ position: 'absolute', top: 0, right: -180, width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(183,204,255,0.22), transparent 70%)', filter: 'blur(70px)', zIndex: -1 }} />
        <h2 style={H2}>{t.researchTitle}</h2>
        <Body>{t.researchIntro}</Body>

        <div style={{ padding: 24, borderRadius: 20, background: '#F2F6FF', border: '1px solid #EAF1FF', marginBottom: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{t.auditTitle}</div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 20px' }}>{t.auditBody}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 20 }}>
            {t.auditStats.map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#12141F' }}>{v}</div>
                <div style={{ fontSize: 12, color: '#5A5F73' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="table-scroll" style={{ marginBottom: 28, padding: 24, borderRadius: 20, border: '1px solid #EAF1FF', background: '#F8FAFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                {t.auditColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 16px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.auditFindings.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < t.auditFindings.length - 1 ? '1px solid #EAF1FF' : undefined }}>
                  <td data-label={t.auditColumns[0]} style={{ padding: '14px 16px', color: '#12141F' }}>{row.finding}</td>
                  <td data-label={t.auditColumns[1]} style={{ padding: '14px 16px' }}><SeverityChip>{row.severity}</SeverityChip></td>
                  <td data-label={t.auditColumns[2]} style={{ padding: '14px 16px', color: '#5A5F73' }}>{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {t.researchTracks.map(({ n, title, body }) => (
            <div key={n}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 6 }}>{n}. {title}</div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT WE LEARNED */}
      <div style={S}>
        <DarkBox label={t.learnedLabel}>
          {t.learnedBox.map((p, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.75, margin: i === t.learnedBox.length - 1 ? 0 : '0 0 16px' }}>{p}</p>
          ))}
        </DarkBox>
      </div>

      {/* PERSONAS */}
      <div style={S}>
        <h2 style={H2}>{t.personasTitle}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 24px' }}>{t.personasIntro}</p>

        <div style={{ padding: 28, borderRadius: 20, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', minHeight: 180 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 6 }}>{t.personaLabel} {t.personas[personaIdx].n}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{t.personas[personaIdx].name}</div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 10px' }}>{t.personas[personaIdx].desc}</p>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: '#7A7F94', margin: 0 }}>{t.personas[personaIdx].implication}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 20 }}>
          <button onClick={() => setPersonaIdx(i => (i - 1 + t.personas.length) % t.personas.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronLeft size={16} className="" /></button>
          <div style={{ display: 'flex', gap: 8 }}>
            {t.personas.map((_, i) => (
              <button key={i} onClick={() => setPersonaIdx(i)} style={{ cursor: 'pointer', width: 8, height: 8, borderRadius: '50%', background: i === personaIdx ? '#002FA7' : '#DCE8FF', border: 'none', padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setPersonaIdx(i => (i + 1) % t.personas.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronRight size={16} className="" /></button>
        </div>
      </div>

      {/* IA */}
      <div style={S}>
        <h2 style={H2}>{t.iaTitle}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 24px' }}>{t.iaIntro}</p>
        <div className="table-scroll" style={{ padding: 24, borderRadius: 24, border: '1px solid #EAF1FF', background: '#F8FAFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                {t.tabsColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 16px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.tabs.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < t.tabs.length - 1 ? '1px solid #EAF1FF' : undefined }}>
                  <td data-label={t.tabsColumns[0]} style={{ padding: '14px 16px', color: '#12141F', fontWeight: 600 }}>{row.tab}</td>
                  <td data-label={t.tabsColumns[1]} style={{ padding: '14px 16px', color: '#5A5F73' }}>{row.persona}</td>
                  <td data-label={t.tabsColumns[2]} style={{ padding: '14px 16px', color: '#5A5F73' }}>{row.decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KEY FEATURE DECISIONS */}
      <div style={S}>
        <h2 className="cs-h2-mark" style={H2}>{t.keyDecisionsTitle}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 32px' }}>{t.keyDecisionsIntro}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {t.keyDecisions.map(({ title, rejected, shipped, result }) => (
            <div key={title} style={{ padding: 24, borderRadius: 20, background: '#F8FAFF', border: '1px solid #EAF1FF' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#12141F', marginBottom: 12 }}>{title}</div>
              {rejected && (
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 10px' }}>
                  <strong style={{ color: '#B23A3A' }}>{t.rejectedLabel}</strong>{rejected}
                </p>
              )}
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: result ? '0 0 10px' : 0 }}>
                <strong style={{ color: '#1F7A4D' }}>{t.shippedLabel}</strong>{shipped}
              </p>
              {result && <p style={{ fontSize: 14, lineHeight: 1.7, color: '#12141F', margin: 0, fontWeight: 600 }}>{t.resultLabel}{result}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ARCHITECTURE PRINCIPLE */}
      <div style={S}>
        <DarkBox label={t.archPrincipleLabel}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F2F6FF', marginBottom: 14 }}>{t.archPrincipleTitle}</div>
          <p style={{ fontSize: 15, lineHeight: 1.75, margin: 0 }}>{t.archPrincipleBody}</p>
        </DarkBox>
      </div>

      {/* TESTING CAROUSEL */}
      <div style={S}>
        <h2 style={H2}>{t.testingTitle}</h2>

        <div style={{ overflow: 'hidden', borderRadius: 20, border: '1px solid #EAF1FF', background: '#F8FAFF', padding: 28 }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', transform: `translateX(-${testingIdx * 100}%)`, transition: 'transform 420ms ease-out' }}>
              {t.testingRounds.map(({ title, body, result, quote, quoteAttrib }) => (
                <div key={title} style={{ flex: '0 0 100%', paddingRight: 4 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>{title}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 12px' }}>{body}</p>
                  {quote && (
                    <div style={{ padding: '16px 20px', borderLeft: '3px solid #C9D9FF', background: '#F2F6FF', borderRadius: '0 10px 10px 0', marginBottom: 12 }}>
                      <p style={{ fontSize: 15, fontStyle: 'italic', color: '#12141F', lineHeight: 1.6, margin: '0 0 6px' }}>{quote}</p>
                      <p style={{ fontSize: 13, color: '#5A5F73', margin: 0 }}>{quoteAttrib}</p>
                    </div>
                  )}
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#12141F', margin: 0 }}>{t.resultLabel}{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 20 }}>
          <button onClick={() => setTestingIdx(i => (i - 1 + t.testingRounds.length) % t.testingRounds.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronLeft size={16} className="" /></button>
          <div style={{ display: 'flex', gap: 8 }}>
            {t.testingRounds.map((_, i) => (
              <button key={i} onClick={() => setTestingIdx(i)} style={{ cursor: 'pointer', width: 8, height: 8, borderRadius: '50%', background: i === testingIdx ? '#002FA7' : '#DCE8FF', border: 'none', padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setTestingIdx(i => (i + 1) % t.testingRounds.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronRight size={16} className="" /></button>
        </div>
      </div>

      {/* CONCLUDING WITH IMPACT */}
      <div style={S}>
        <h2 className="cs-h2-mark" style={H2}>{t.impactTitle}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 32px' }}>{t.impactIntro}</p>
        <div className="table-scroll" style={{ marginBottom: 32 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                {t.kpiColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.kpiRows.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < t.kpiRows.length - 1 ? '1px solid #F2F6FF' : undefined }}>
                  <td data-label={t.kpiColumns[0]} style={{ padding: '10px 12px', color: '#12141F' }}>{row.kpi}</td>
                  <td data-label={t.kpiColumns[1]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.baseline}</td>
                  <td data-label={t.kpiColumns[2]} style={{ padding: '10px 12px', color: '#1F7A4D', fontWeight: 600 }}>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '24px 28px', borderRadius: 20, border: '1px solid rgba(61,99,224,0.2)', background: 'rgba(0,47,167,0.03)' }}>
          <p style={{ fontSize: 16, fontStyle: 'italic', lineHeight: 1.7, color: '#3A3F4C', margin: '0 0 8px' }}>"{t.quote}"</p>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#001A5C' }}>{t.quoteAttrib}</div>
        </div>
      </div>

      {/* METHOD */}
      <div style={S}>
        <h2 style={H2}>{t.methodTitle}</h2>
        <Body>{t.method}</Body>
        <Link to="/work/agentic-ux-flow" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600, color: '#002FA7', textDecoration: 'none' }}>{t.methodLink}<ChevronRight size={15} /></Link>
      </div>

      {/* WHAT'S NEXT */}
      <div style={S}>
        <h2 style={H2}>{t.nextTitle}</h2>
        {t.next.map((p, i) => <Body key={i}>{p}</Body>)}
      </div>
    </CaseStudyShell>
  )
}
