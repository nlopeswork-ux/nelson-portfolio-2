import { useState } from 'react'
import CaseStudyShell, { Body, DarkBox, SeverityChip } from '../components/CaseStudyShell'
import ChevronDown from '../components/ChevronDown'
import ChevronUp from '../components/ChevronUp'
import ChevronLeft from '../components/ChevronLeft'
import ChevronRight from '../components/ChevronRight'
import { useLanguage } from '../i18n/LanguageContext'
import imgStepper from '../imports/stepper-activity.png'
import imgShareholders from '../imports/shareholders-form.png'
import imgLicenseSuccess from '../imports/license-success.png'
import imgLicenseFinder from '../imports/license-finder.png'
import imgBusinessVisa from '../imports/business-visa.png'

const S = { padding: '0 20px 64px', maxWidth: 760, margin: '0 auto' } as const
const H2 = { fontSize: 'clamp(20px,3vw,26px)' as const, fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 20px' }

const screenImages = [imgStepper, imgShareholders, imgLicenseSuccess, imgLicenseFinder, imgBusinessVisa]

const copy = {
  en: {
    eyebrow: 'Case Study',
    title: 'OneRAK Portal Revamp',
    description: 'Turning three disconnected, low-trust government portals — the Customer Portal, the Agent Portal, and the Secondary Government Portal — into one unified, evidence-based OneRAK experience for investors, agents, and government stakeholders.',
    meta: [
      { label: 'Role', value: 'UX/UI Designer & Service Design — Discover through Handover' },
      { label: 'Client', value: 'Government economic zone authority' },
      { label: 'Timeline', value: '13 months, end to end — Discover May–Aug 2025 through Handover Sep 2026' },
      { label: 'Team', value: 'Engagement Director/Partner · Service Design Lead · Business/Process Analyst · CX Analyst · Senior UX/UI · UI Designer · Creative Director · Tech Lead · 3 Developers · Change BA' },
      { label: 'Tools', value: 'Figma · FigJam · Storybook · Salesforce Communities Cloud · SAP BTP + BLS.NET' },
      { label: 'Deliverable', value: 'One OneRAK experience live across all 18 core services, on a shared, production Design Language System' },
    ],
    stats: [
      { value: '18/18', label: 'core services live on OneRAK' },
      { value: '97.8%', label: 'task success rate at launch (from 63.3%)' },
      { value: '82%', label: 'reduction in support calls' },
    ],
    hookTitle: 'The Hook',
    hook: [
      'The regional government wants to be one of the top 10 destinations in the world for ease of doing business — a "single window" where 100% of business inquiries are handled through one coordinated, digital front door. At the start of this engagement, that front door was three separate doors.',
      'Investors and agents navigated the Customer Portal, a separate Agent Portal, and the Secondary Government Portal — three products, three technology stacks (Salesforce Communities Cloud, Salesforce Communities Cloud + Visual Force, and SAP BTP + BLS.NET), and three inconsistent experiences layered onto highly customised, hard-to-change architecture. The secondary portal ran on an MVC architecture that caused response delays, and customers and agents both complained about the design, the terminology, and the amount of manual back-and-forth required to get a licence.',
      'When the engagement team put real users in front of the current portals, the numbers made the business case on their own: across 60 tasks attempted in usability testing, only 63.3% were completed successfully. Not because the interface was ugly — testers repeatedly called it "clean" and "fast." It failed because users could not tell what state they were in, what a label meant, or what to do when something went wrong.',
      'Thirteen months later, OneRAK is live: one unified experience spanning all 18 core services across the three portals, built on a shared Design Language System, and validated end-to-end with the same investors and agents who struggled with the original portals. Task success on the redesigned services now sits at 97.8%, average completion time on the flagship Instant Licence journey has dropped from 32 minutes to 11, and agent calls into internal IT for status chasing are down 82%.',
    ],
    researchTitle: 'Outlining the Research',
    researchIntro: 'Before redesigning a single screen, the team needed a factual account of where the current portals actually break — not assumptions about what "modern government UX" should look like. The Discover phase ran four parallel tracks.',
    track1Title: '1. Document & Stakeholder Review',
    track1Body: "The team reviewed 50+ existing documents (RFP, process maps, prior audits) and ran 45+ stakeholder interview sessions across the authority's divisions, alongside 3 design vision sessions, 3 full portal walkthroughs, and 4 dedicated agent focus interviews — building a shared, factual picture of business goals, technical constraints, and internal pain points before any design work started.",
    track2Title: '2. Usability Testing — Customer Portals',
    track2Body: [
      'Six users were run through core Customer Portal tasks. Landing on the homepage worked for everyone (6/6); things degraded from there. Choosing between "Open branch" and "Continue journey" confused users who couldn\'t tell the options apart (5/6 completed). Document upload was worst — only 2 of 6 users completed it, because the spinner gave no filename, no message, and no visible confirmation that anything had happened.',
      'On the secondary government portal, the same pattern repeated at a larger scale across 10 tasks with 6 participants: 83.3% of users found labels hard to read, said there were too many required steps, and said the process simply took too long; only 2 of 6 could tell whether their application had actually gone through.',
    ],
    quote1: '"The upload process lacked visible confirmation — spinners stayed indefinitely with no filename or message."',
    quote1Attr: '— Usability testing observation, Customer Portal',
    researchStats: [['63.3%', 'baseline task success rate'], ['22', 'internal stakeholders interviewed'], ['3', 'portals unified into one']],
    track3Title: '3. Heuristic Accessibility Assessment',
    track3Body: 'The team scored the secondary government portal against 10 Nielsen usability heuristics (0 = excellent to 4 = catastrophic). The most severe single finding — a Major (3) — was aesthetic/minimalist design: form-heavy screens packed multiple long fields together with no grouping or spacing.',
    showHeuristics: 'Show heuristic scores',
    hideHeuristics: 'Hide heuristic scores',
    heuristicColumns: ['Heuristic', 'Score', 'Example finding'],
    heuristicRows: [
      { h: 'Visibility of system status', score: '1 – Cosmetic', finding: 'Step indicator scrolls out of view during long forms' },
      { h: 'Match with the real world', score: '1 – Cosmetic', finding: 'Labels like "Open branch" misread as starting a new business' },
      { h: 'User control & freedom', score: '1 – Cosmetic', finding: '"Previous" and "Next" sit adjacent with no visual separation' },
      { h: 'Error prevention', score: '1 – Cosmetic', finding: 'No inline validation; errors only appear after clicking Next' },
      { h: 'Aesthetic & minimalist design', score: '3 – Major', finding: 'Stakeholder screen crowds long fields with no grouping', major: true },
      { h: 'Help & documentation', score: '1 – Cosmetic', finding: "No tooltips, and existing helper text isn't reachable by keyboard/tab" },
    ],
    track4Title: '4. Agent Focus Interviews',
    track4Body: 'Four focus interviews with field agents surfaced a different flavour of the same root problem: the portal treats agents as data-entry clerks rather than account managers. Agents described too much manual data entry, no way to track or retrieve what they had already submitted, and pre-approval delays with no explanation.',
    quote2: '"You submit, but there\'s no confirmation … we don\'t know what happens next."',
    quote2Attr: '— field agent, usability interview',
    personasTitle: 'Showcasing the Design Process',
    personasIntro: 'Personas Before Pixels — the research made clear that "the user" was actually at least two structurally different populations, and each needed its own persona model rather than a single generic investor archetype.',
    personas: [
      {
        segment: 'Segment 1 of 2',
        name: 'SME / investor personas (mainland & freezone)',
        desc: 'Built around the core distinction between an investor with a license but no local footprint, and an investor with an active freezone company or real estate holding in the region — each with different service needs across licensing, renewals, and amendments.',
        note: null as string | null,
      },
      {
        segment: 'Segment 2 of 2',
        name: 'Channel partners & agents',
        desc: 'Three tiers — Strategic Partner (high daily volume, end-to-end services, corporate conglomerates), Growth Partner (mid-volume, high value, business set-up plus value-added services), and Individual Partner (referral-only, commission-driven, minimal portal engagement) — defined against nine shared criteria including transaction volume, SLA tier, portal usage frequency, and whether they need sub-user roles for staff.',
        note: "Because Strategic and Growth partners manage end-clients on their behalf, the persona model also had to account for sub-users — the agent's own clients, who receive limited portal access through the agent rather than a direct authority relationship." as string | null,
      },
    ],
    journeysTitle: 'Journeys — Current State Before Target State',
    journeysBody: 'Rather than jumping straight to a target-state journey, the team first mapped current-state journeys across the two portals against the high-level requirements each service needed to satisfy. This produced a shared inventory of where each of the 18 in-scope services broke down — licensing and registration, visa processing, renewals, and amendments — with every pain point tied to a specific step of a specific journey, so Design and Build inherited a prioritised, evidence-linked backlog rather than a generic wish list.',
    dlsTitle: 'One Design Language System, Not Three House Styles',
    dlsBody: 'The most consequential structural decision to come out of Discover was architectural, not visual: the two portals would share one Design Language System rather than each maintaining its own component library. The OneRAK DLS defines design principles, WCAG 2.1 and regional accessibility standards, layout fundamentals, and a production interaction-pattern library — built and maintained in Figma for design tokens and components, mirrored in Storybook so engineering builds and tests against the same source of truth.',
    dlsPoints: [
      ['Why it matters', 'Focus states, inline validation, and tab-reachable help text became DLS-level requirements instead of a per-screen fix.'],
      ['Brand flexibility', 'The two portals keep distinct brand identities while sharing the same underlying components, spacing, and interaction rules.'],
      ['Component inventory', '142 components shipped across both libraries — badges, banners, blockquotes, text areas, time pickers, toasts, steppers, and upload patterns among them.'],
    ],
    learnedLabel: 'What We Learned',
    learnedBox: [
      'The research kept surfacing the same root cause in different clothing: three teams solving the same accessibility and clarity problems independently, on incompatible backends, with no shared source of truth for what "good" looked like.',
      "That reframed the brief. The deliverable wasn't three redesigned portals — it was one Design Language System that made every future screen, on any of the three platforms, compliant and consistent by construction. Fixing 18 services was the proof; the DLS is what scales past them.",
    ],
    dsFirstTitle: 'Design System First',
    dsFirst: [
      'Rather than designing screens directly, the team began by building the OneRAK Design Language System — a Storybook-documented component library covering tokens, atoms, molecules, and organisms — before a single product screen was committed. This decision, made in week three of the engagement, proved commercially critical: it allowed parallel workstreams across three developer teams without visual drift, and reduced design QA cycles by an estimated 40%.',
      'The DLS shipped with 140 components across 4 theme contexts (investor, agent, government internal, mobile), full accessibility annotations, and a governance model covering how new components are proposed, reviewed, and promoted to production.',
    ],
    keyDecisionLabel: 'Key Design Decision',
    keyDecisionBox: [
      "The most contested design decision was the unified account model — one login, one profile, multiple roles. The technical team initially pushed for separate authenticated experiences per portal. We held the position: a single account with role-switching is the only architecture that reflects how real investors actually operate. An agent managing 12 clients doesn't want 12 logins.",
      'User testing at week 8 with 14 representative users confirmed the hypothesis: task completion on the unified model outperformed the separate-portal baseline by 34 percentage points on the first attempt.',
    ],
    rejectedTitle: 'Key Decisions — What We Rejected',
    rejectedIntro: 'Every structural decision went through at least one rejected direction. Documenting those is where the actual reasoning lives.',
    rejectedLabel: 'Rejected — ',
    chosenLabel: 'Chosen instead: ',
    rejectedDecisions: [
      {
        rejected: 'Single merged super-portal — the two portals sit on different backends (Salesforce vs. SAP BTP + BLS.NET) with different legal mandates; a full merge would have added 6–9 months of integration risk with no user-facing benefit over a shared front-end shell.',
        chosen: 'A federated OneRAK shell with one DLS and one navigation model, sitting on top of the existing platforms.',
      },
      {
        rejected: 'Screen-by-screen accessibility fixes prioritized by complaint volume — would have re-created three inconsistent experiences, just each slightly better than before.',
        chosen: 'WCAG 2.1 AA baked into the DLS component library itself, so every screen built from it is compliant by construction.',
      },
      {
        rejected: 'A single generic "investor" persona reused across customer and agent flows, to save research time — rejected once early interviews showed Strategic, Growth, and Individual partners had structurally different needs (volume, SLA tier, sub-user access) from SME investors.',
        chosen: 'The two-segment, sub-user–aware persona model described above.',
      },
      {
        rejected: 'A fully automated, "black box" pre-approval for agents — faster, but agents said in interviews they wanted visibility more than raw speed.',
        chosen: 'A transparent, journal-style status stepper with real-time push notifications at every decision point.',
      },
    ],
    galleryTitle: 'The Redesigned Experience',
    galleryIntro: 'Five screens from the live OneRAK prototype, each tied directly to a specific finding from Discover — not a generic redesign, but a documented fix for a documented problem.',
    prototypeScreens: [
      { title: 'Status stepper — application activity', caption: 'Journal-style status tracker with real-time push notification states. Directly addresses the #1 agent pain point: "you submit, but there\'s no confirmation — we don\'t know what happens next."' },
      { title: 'Shareholders form — grouped field layout', caption: 'Redesigned form grouping with inline validation. Fixes the Major (3) heuristic finding: form-heavy screens with no grouping or spacing.' },
      { title: 'Instant Licence — success confirmation', caption: 'Explicit confirmation screen with document download. Resolves the upload finding: spinner with no filename, no message, no visible confirmation.' },
      { title: 'Licence finder — intelligent catalogue', caption: 'Guided licence-type selection replacing the "Open branch" vs "Continue journey" ambiguity that caused 5/6 users to hesitate.' },
      { title: 'Business visa — service entry point', caption: 'Unified service entry point in the OneRAK shell — one of 18 core services now reachable without switching portals or re-authenticating.' },
    ],
    outcomesTitle: 'Outcomes',
    outcomes: [
      { value: '97.8%', label: 'task success rate at launch' },
      { value: '18/18', label: 'core services live on day one' },
      { value: '82%', label: 'reduction in support call volume' },
      { value: '142', label: 'DLS components shipped to production' },
    ],
    quote3: '"What used to take a full audit cycle to trace, we can now walk through in one meeting."',
    quote3Attr: '— Engagement Lead, KPMG',
  },
  pt: {
    eyebrow: 'Case Study',
    title: 'OneRAK Portal Revamp',
    description: 'Transformar três portais governamentais desligados e de baixa confiança — o Portal de Clientes, o Portal de Agentes e o Portal Governamental Secundário — numa única experiência OneRAK unificada e baseada em evidência, para investidores, agentes e stakeholders governamentais.',
    meta: [
      { label: 'Função', value: 'UX/UI Designer & Service Design — de Discover a Handover' },
      { label: 'Cliente', value: 'Autoridade de zona económica governamental' },
      { label: 'Duração', value: '13 meses, de ponta a ponta — Discover Mai–Ago 2025 até Handover Set 2026' },
      { label: 'Equipa', value: 'Engagement Director/Partner · Service Design Lead · Business/Process Analyst · CX Analyst · Senior UX/UI · UI Designer · Creative Director · Tech Lead · 3 Developers · Change BA' },
      { label: 'Ferramentas', value: 'Figma · FigJam · Storybook · Salesforce Communities Cloud · SAP BTP + BLS.NET' },
      { label: 'Entregável', value: 'Uma experiência OneRAK em produção nos 18 serviços principais, sobre um Design Language System partilhado e em produção' },
    ],
    stats: [
      { value: '18/18', label: 'serviços principais em produção no OneRAK' },
      { value: '97,8%', label: 'taxa de sucesso nas tarefas no lançamento (de 63,3%)' },
      { value: '82%', label: 'redução em chamadas de suporte' },
    ],
    hookTitle: 'O Ponto de Partida',
    hook: [
      'O governo regional quer ser um dos 10 melhores destinos do mundo para facilidade de fazer negócio — uma "janela única" onde 100% dos pedidos de negócio são tratados através de uma única porta digital coordenada. No início desta colaboração, essa porta eram, na verdade, três portas separadas.',
      'Investidores e agentes navegavam entre o Portal de Clientes, um Portal de Agentes separado, e o Portal Governamental Secundário — três produtos, três stacks tecnológicas (Salesforce Communities Cloud, Salesforce Communities Cloud + Visual Force, e SAP BTP + BLS.NET), e três experiências inconsistentes sobrepostas a uma arquitetura altamente personalizada e difícil de alterar. O portal secundário corria sobre uma arquitetura MVC que causava atrasos de resposta, e tanto clientes como agentes se queixavam do design, da terminologia e da quantidade de idas e vindas manuais necessárias para obter uma licença.',
      'Quando a equipa colocou utilizadores reais perante os portais atuais, os números por si só justificaram o projeto: em 60 tarefas tentadas em testes de usabilidade, apenas 63,3% foram concluídas com sucesso. Não porque a interface fosse feia — os testadores chamavam-lhe repetidamente "limpa" e "rápida". Falhava porque os utilizadores não conseguiam perceber em que estado estavam, o que um label significava, ou o que fazer quando algo corria mal.',
      'Treze meses depois, o OneRAK está em produção: uma experiência unificada que abrange os 18 serviços principais nos três portais, construída sobre um Design Language System partilhado, e validada de ponta a ponta com os mesmos investidores e agentes que tinham dificuldades com os portais originais. O sucesso nas tarefas nos serviços redesenhados está agora em 97,8%, o tempo médio de conclusão da jornada principal de Licença Instantânea caiu de 32 minutos para 11, e as chamadas de agentes para o IT interno a perguntar pelo estado caíram 82%.',
    ],
    researchTitle: 'Delinear a Investigação',
    researchIntro: 'Antes de redesenhar um único ecrã, a equipa precisava de um retrato factual de onde os portais atuais realmente falhavam — não de suposições sobre o que "UX governamental moderna" deveria parecer. A fase de Discover decorreu em quatro pistas paralelas.',
    track1Title: '1. Revisão de Documentos e Stakeholders',
    track1Body: 'A equipa reviu mais de 50 documentos existentes (RFP, mapas de processo, auditorias anteriores) e realizou mais de 45 sessões de entrevista a stakeholders em todas as divisões da autoridade, além de 3 sessões de visão de design, 3 percursos completos pelos portais e 4 entrevistas de foco dedicadas a agentes — construindo uma imagem factual e partilhada dos objetivos de negócio, restrições técnicas e pontos de dor internos antes de qualquer trabalho de design começar.',
    track2Title: '2. Testes de Usabilidade — Portais de Cliente',
    track2Body: [
      'Seis utilizadores realizaram as tarefas principais do Portal de Clientes. Chegar à homepage funcionou para todos (6/6); a partir daí, as coisas degradaram-se. Escolher entre "Open branch" e "Continue journey" confundiu utilizadores que não conseguiam distinguir as opções (5/6 concluíram). O upload de documentos foi o pior — apenas 2 em 6 utilizadores concluíram, porque o spinner não dava nome de ficheiro, mensagem, nem qualquer confirmação visível de que algo tinha acontecido.',
      'No portal governamental secundário, o mesmo padrão repetiu-se a maior escala, em 10 tarefas com 6 participantes: 83,3% dos utilizadores acharam os labels difíceis de ler, disseram que havia demasiados passos obrigatórios, e disseram que o processo demorava simplesmente demasiado tempo; apenas 2 em 6 conseguiam perceber se a sua candidatura tinha de facto sido submetida.',
    ],
    quote1: '"O processo de upload não tinha confirmação visível — os spinners ficavam indefinidamente, sem nome de ficheiro nem mensagem."',
    quote1Attr: '— Observação de testes de usabilidade, Portal de Clientes',
    researchStats: [['63,3%', 'taxa de sucesso de referência nas tarefas'], ['22', 'stakeholders internos entrevistados'], ['3', 'portais unificados num só']],
    track3Title: '3. Avaliação Heurística de Acessibilidade',
    track3Body: 'A equipa avaliou o portal governamental secundário em 10 heurísticas de usabilidade de Nielsen (0 = excelente a 4 = catastrófico). A descoberta isolada mais severa — um Major (3) — foi design estético/minimalista: ecrãs cheios de formulários juntavam vários campos longos sem agrupamento nem espaçamento.',
    showHeuristics: 'Mostrar pontuações heurísticas',
    hideHeuristics: 'Ocultar pontuações heurísticas',
    heuristicColumns: ['Heurística', 'Pontuação', 'Exemplo de descoberta'],
    heuristicRows: [
      { h: 'Visibilidade do estado do sistema', score: '1 – Cosmético', finding: 'O indicador de passos sai do ecrã em formulários longos' },
      { h: 'Correspondência com o mundo real', score: '1 – Cosmético', finding: 'Labels como "Open branch" interpretados como abrir um novo negócio' },
      { h: 'Controlo e liberdade do utilizador', score: '1 – Cosmético', finding: '"Previous" e "Next" ficam lado a lado sem separação visual' },
      { h: 'Prevenção de erros', score: '1 – Cosmético', finding: 'Sem validação inline; os erros só aparecem depois de clicar em Next' },
      { h: 'Design estético e minimalista', score: '3 – Major', finding: 'O ecrã de acionistas amontoa campos longos sem agrupamento', major: true },
      { h: 'Ajuda e documentação', score: '1 – Cosmético', finding: 'Sem tooltips, e o texto de ajuda existente não é acessível por teclado/tab' },
    ],
    track4Title: '4. Entrevistas de Foco com Agentes',
    track4Body: 'Quatro entrevistas de foco com agentes de campo revelaram uma variante diferente do mesmo problema de raiz: o portal trata os agentes como funcionários de introdução de dados, não como gestores de conta. Os agentes descreveram demasiada introdução manual de dados, nenhuma forma de acompanhar ou recuperar o que já tinham submetido, e atrasos de pré-aprovação sem explicação.',
    quote2: '"Submetemos, mas não há confirmação … não sabemos o que acontece a seguir."',
    quote2Attr: '— agente de campo, entrevista de usabilidade',
    personasTitle: 'Mostrar o Processo de Design',
    personasIntro: 'Personas Antes de Pixels — a investigação deixou claro que "o utilizador" era, na verdade, pelo menos duas populações estruturalmente diferentes, e cada uma precisava do seu próprio modelo de persona em vez de um arquétipo genérico de investidor.',
    personas: [
      {
        segment: 'Segmento 1 de 2',
        name: 'Personas de PME / investidor (mainland e freezone)',
        desc: 'Construído à volta da distinção central entre um investidor com licença mas sem presença local, e um investidor com uma empresa freezone ativa ou propriedade imobiliária na região — cada um com necessidades de serviço diferentes em licenciamento, renovações e alterações.',
        note: null as string | null,
      },
      {
        segment: 'Segmento 2 de 2',
        name: 'Parceiros de canal e agentes',
        desc: 'Três níveis — Strategic Partner (volume diário elevado, serviços de ponta a ponta, conglomerados corporativos), Growth Partner (volume médio, alto valor, constituição de empresas mais serviços de valor acrescentado), e Individual Partner (apenas referências, orientado a comissão, envolvimento mínimo no portal) — definidos face a nove critérios partilhados, incluindo volume de transações, nível de SLA, frequência de uso do portal, e se precisam de perfis de sub-utilizador para a sua equipa.',
        note: 'Como os parceiros Strategic e Growth gerem clientes finais em nome próprio, o modelo de persona também teve de ter em conta sub-utilizadores — os próprios clientes do agente, que recebem acesso limitado ao portal através do agente em vez de uma relação direta com a autoridade.' as string | null,
      },
    ],
    journeysTitle: 'Jornadas — Estado Atual Antes do Estado-Alvo',
    journeysBody: 'Em vez de avançar diretamente para uma jornada de estado-alvo, a equipa mapeou primeiro as jornadas no estado atual nos dois portais, face aos requisitos de alto nível que cada serviço precisava de cumprir. Isto produziu um inventário partilhado de onde cada um dos 18 serviços em âmbito falhava — licenciamento e registo, processamento de vistos, renovações e alterações — com cada ponto de dor associado a um passo específico de uma jornada específica, para que Design e Build herdassem um backlog priorizado e ligado a evidência, em vez de uma lista de desejos genérica.',
    dlsTitle: 'Um Design Language System, Não Três Estilos Próprios',
    dlsBody: 'A decisão estrutural mais consequente a sair do Discover foi arquitetural, não visual: os dois portais passariam a partilhar um único Design Language System em vez de cada um manter a sua própria biblioteca de componentes. O DLS do OneRAK define princípios de design, WCAG 2.1 e normas regionais de acessibilidade, fundamentos de layout, e uma biblioteca de padrões de interação em produção — construída e mantida em Figma para tokens e componentes, espelhada em Storybook para que a engenharia construa e teste contra a mesma fonte de verdade.',
    dlsPoints: [
      ['Porque importa', 'Estados de foco, validação inline e texto de ajuda acessível por tab passaram a ser requisitos ao nível do DLS, em vez de uma correção ecrã a ecrã.'],
      ['Flexibilidade de marca', 'Os dois portais mantêm identidades de marca distintas enquanto partilham os mesmos componentes, espaçamento e regras de interação subjacentes.'],
      ['Inventário de componentes', '142 componentes entregues nas duas bibliotecas — badges, banners, citações, text areas, seletores de hora, toasts, steppers e padrões de upload, entre outros.'],
    ],
    learnedLabel: 'O Que Aprendemos',
    learnedBox: [
      'A investigação continuava a revelar a mesma causa-raiz com roupagens diferentes: três equipas a resolver os mesmos problemas de acessibilidade e clareza de forma independente, em backends incompatíveis, sem uma fonte de verdade partilhada sobre o que "bom" significava.',
      'Isso reformulou o briefing. O entregável não eram três portais redesenhados — era um Design Language System que tornava cada ecrã futuro, em qualquer uma das três plataformas, conforme e consistente por construção. Corrigir 18 serviços foi a prova; o DLS é o que escala para além deles.',
    ],
    dsFirstTitle: 'Design System Primeiro',
    dsFirst: [
      'Em vez de desenhar ecrãs diretamente, a equipa começou por construir o Design Language System do OneRAK — uma biblioteca de componentes documentada em Storybook, cobrindo tokens, átomos, moléculas e organismos — antes de qualquer ecrã de produto ser fechado. Esta decisão, tomada na terceira semana da colaboração, revelou-se comercialmente crítica: permitiu workstreams paralelos em três equipas de developers sem deriva visual, e reduziu os ciclos de design QA em cerca de 40%.',
      'O DLS foi entregue com 140 componentes em 4 contextos de tema (investidor, agente, interno governamental, mobile), anotações completas de acessibilidade, e um modelo de governança que cobre como novos componentes são propostos, revistos e promovidos a produção.',
    ],
    keyDecisionLabel: 'Decisão de Design Chave',
    keyDecisionBox: [
      'A decisão de design mais contestada foi o modelo de conta unificado — um login, um perfil, vários papéis. A equipa técnica pressionou inicialmente por experiências autenticadas separadas por portal. Mantivemos a posição: uma única conta com troca de papel é a única arquitetura que reflete como os investidores reais operam de facto. Um agente a gerir 12 clientes não quer 12 logins.',
      'Os testes com utilizadores na semana 8, com 14 utilizadores representativos, confirmaram a hipótese: a conclusão de tarefas no modelo unificado superou a referência de portais separados em 34 pontos percentuais à primeira tentativa.',
    ],
    rejectedTitle: 'Decisões Chave — O Que Rejeitámos',
    rejectedIntro: 'Cada decisão estrutural passou por pelo menos uma direção rejeitada. Documentar essas é onde está o verdadeiro raciocínio.',
    rejectedLabel: 'Rejeitado — ',
    chosenLabel: 'Escolhido em vez disso: ',
    rejectedDecisions: [
      {
        rejected: 'Um super-portal único fundido — os dois portais assentam em backends diferentes (Salesforce vs. SAP BTP + BLS.NET) com mandatos legais diferentes; uma fusão completa teria acrescentado 6–9 meses de risco de integração sem qualquer benefício visível para o utilizador face a um shell de front-end partilhado.',
        chosen: 'Um shell OneRAK federado, com um único DLS e um único modelo de navegação, assente sobre as plataformas existentes.',
      },
      {
        rejected: 'Correções de acessibilidade ecrã a ecrã, priorizadas por volume de queixas — teria recriado três experiências inconsistentes, cada uma apenas ligeiramente melhor que antes.',
        chosen: 'WCAG 2.1 AA incorporado na própria biblioteca de componentes do DLS, para que cada ecrã construído a partir dele seja conforme por construção.',
      },
      {
        rejected: 'Uma única persona genérica de "investidor" reutilizada em fluxos de cliente e de agente, para poupar tempo de investigação — rejeitada assim que as primeiras entrevistas mostraram que parceiros Strategic, Growth e Individual tinham necessidades estruturalmente diferentes (volume, nível de SLA, acesso de sub-utilizador) dos investidores PME.',
        chosen: 'O modelo de persona em dois segmentos, com sub-utilizadores, descrito acima.',
      },
      {
        rejected: 'Uma pré-aprovação totalmente automatizada, "caixa negra", para agentes — mais rápida, mas os agentes disseram em entrevista que queriam visibilidade mais do que velocidade pura.',
        chosen: 'Um indicador de estado transparente, estilo diário, com notificações push em tempo real em cada ponto de decisão.',
      },
    ],
    galleryTitle: 'A Experiência Redesenhada',
    galleryIntro: 'Cinco ecrãs do protótipo OneRAK em produção, cada um ligado diretamente a uma descoberta específica do Discover — não um redesign genérico, mas uma correção documentada para um problema documentado.',
    prototypeScreens: [
      { title: 'Indicador de estado — atividade da candidatura', caption: 'Indicador de estado estilo diário, com estados de notificação push em tempo real. Responde diretamente ao principal ponto de dor dos agentes: "submetemos, mas não há confirmação — não sabemos o que acontece a seguir."' },
      { title: 'Formulário de acionistas — layout de campos agrupados', caption: 'Agrupamento de formulário redesenhado com validação inline. Corrige a descoberta heurística Major (3): ecrãs cheios de formulários sem agrupamento nem espaçamento.' },
      { title: 'Licença Instantânea — confirmação de sucesso', caption: 'Ecrã de confirmação explícito com download de documento. Resolve a descoberta de upload: spinner sem nome de ficheiro, sem mensagem, sem confirmação visível.' },
      { title: 'Localizador de licenças — catálogo inteligente', caption: 'Seleção guiada de tipo de licença, substituindo a ambiguidade "Open branch" vs "Continue journey" que fazia 5 em 6 utilizadores hesitar.' },
      { title: 'Visto de negócio — ponto de entrada de serviço', caption: 'Ponto de entrada de serviço unificado no shell OneRAK — um dos 18 serviços principais, agora acessível sem trocar de portal nem reautenticar.' },
    ],
    outcomesTitle: 'Resultados',
    outcomes: [
      { value: '97,8%', label: 'taxa de sucesso nas tarefas no lançamento' },
      { value: '18/18', label: 'serviços principais em produção no primeiro dia' },
      { value: '82%', label: 'redução no volume de chamadas de suporte' },
      { value: '142', label: 'componentes do DLS entregues em produção' },
    ],
    quote3: '"O que antes levava um ciclo de auditoria completo a rastrear, agora conseguimos percorrer numa única reunião."',
    quote3Attr: '— Engagement Lead, KPMG',
  },
}

export default function CaseStudyOneRAK() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [personaIdx, setPersonaIdx] = useState(0)
  const [heuristicsOpen, setHeuristicsOpen] = useState(false)
  const [screenIdx, setScreenIdx] = useState(0)

  const prototypeScreens = t.prototypeScreens.map((s, i) => ({ ...s, image: screenImages[i] }))

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
        <h2 className="cs-h2-mark" style={H2}>{t.hookTitle}</h2>
        {t.hook.map((p, i) => <Body key={i}>{p}</Body>)}
      </div>

      {/* RESEARCH */}
      <div style={S}>
        <h2 style={H2}>{t.researchTitle}</h2>
        <Body>{t.researchIntro}</Body>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>{t.track1Title}</div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: 0 }}>{t.track1Body}</p>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>{t.track2Title}</div>
            {t.track2Body.map((p, i) => (
              <p key={i} style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: i === t.track2Body.length - 1 ? 0 : '0 0 12px' }}>{p}</p>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px', borderLeft: '3px solid #C9D9FF', background: '#F8FAFF', borderRadius: '0 12px 12px 0', marginBottom: 32 }}>
          <p style={{ fontSize: 15, fontStyle: 'italic', color: '#12141F', lineHeight: 1.6, margin: '0 0 6px' }}>{t.quote1}</p>
          <p style={{ fontSize: 13, color: '#5A5F73', margin: 0 }}>{t.quote1Attr}</p>
        </div>

        <div style={{ padding: 24, borderRadius: 20, background: '#F2F6FF', border: '1px solid #EAF1FF', marginBottom: 32 }}>
          <div className="rg-3">
            {t.researchStats.map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#002FA7' }}>{v}</div>
                <div style={{ fontSize: 12, color: '#5A5F73', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>{t.track3Title}</div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 16px' }}>{t.track3Body}</p>
          <button onClick={() => setHeuristicsOpen(o => !o)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#002FA7', background: 'rgba(0,47,167,0.09)', padding: '6px 14px', borderRadius: 999, border: 'none', fontFamily: "'Inter', sans-serif", marginBottom: 16 }}>
            {heuristicsOpen ? <>{t.hideHeuristics}<ChevronUp size={14} /></> : <>{t.showHeuristics}<ChevronDown size={14} /></>}
          </button>
          {heuristicsOpen && (
            <div className="table-scroll" style={{ background: 'rgba(0,47,167,0.03)', borderRadius: 14, padding: 16 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                    {t.heuristicColumns.map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.heuristicRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < t.heuristicRows.length - 1 ? '1px solid #F2F6FF' : undefined }}>
                      <td data-label={t.heuristicColumns[0]} style={{ padding: '10px 12px', color: '#12141F', fontWeight: row.major ? 600 : undefined }}>{row.h}</td>
                      <td data-label={t.heuristicColumns[1]} style={{ padding: '10px 12px' }}>{row.major ? <SeverityChip>{row.score}</SeverityChip> : <span style={{ color: '#5A5F73' }}>{row.score}</span>}</td>
                      <td data-label={t.heuristicColumns[2]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.finding}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>{t.track4Title}</div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 12px' }}>{t.track4Body}</p>
          <div style={{ padding: '16px 20px', borderLeft: '3px solid #C9D9FF', background: '#F8FAFF', borderRadius: '0 12px 12px 0' }}>
            <p style={{ fontSize: 15, fontStyle: 'italic', color: '#12141F', lineHeight: 1.6, margin: '0 0 6px' }}>{t.quote2}</p>
            <p style={{ fontSize: 13, color: '#5A5F73', margin: 0 }}>{t.quote2Attr}</p>
          </div>
        </div>
      </div>

      {/* PERSONAS */}
      <div style={S}>
        <h2 style={H2}>{t.personasTitle}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 32px' }}>{t.personasIntro}</p>

        <div style={{ padding: 28, borderRadius: 20, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', minHeight: 180, marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 6 }}>{t.personas[personaIdx].segment}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{t.personas[personaIdx].name}</div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: t.personas[personaIdx].note ? '0 0 10px' : 0 }}>{t.personas[personaIdx].desc}</p>
          {t.personas[personaIdx].note && <p style={{ fontSize: 14, lineHeight: 1.6, color: '#7A7F94', margin: 0 }}>{t.personas[personaIdx].note}</p>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 32 }}>
          <button onClick={() => setPersonaIdx(i => (i - 1 + t.personas.length) % t.personas.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronLeft size={16} className="" /></button>
          <div style={{ display: 'flex', gap: 8 }}>
            {t.personas.map((_, i) => (
              <button key={i} onClick={() => setPersonaIdx(i)} style={{ cursor: 'pointer', width: 8, height: 8, borderRadius: '50%', background: i === personaIdx ? '#002FA7' : '#DCE8FF', border: 'none', padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setPersonaIdx(i => (i + 1) % t.personas.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronRight size={16} className="" /></button>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{t.journeysTitle}</div>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: 0 }}>{t.journeysBody}</p>
        </div>

        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{t.dlsTitle}</div>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 14px' }}>{t.dlsBody}</p>
          {t.dlsPoints.map(([label, text]) => (
            <p key={label} style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 8px' }}>
              <strong style={{ color: '#12141F' }}>{label}: </strong>{text}
            </p>
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

      {/* DESIGN SYSTEM FIRST */}
      <div style={S}>
        <h2 style={H2}>{t.dsFirstTitle}</h2>
        {t.dsFirst.map((p, i) => <Body key={i}>{p}</Body>)}

        <DarkBox label={t.keyDecisionLabel}>
          {t.keyDecisionBox.map((p, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.75, margin: i === t.keyDecisionBox.length - 1 ? 0 : '0 0 16px' }}>{p}</p>
          ))}
        </DarkBox>
      </div>

      {/* KEY DECISIONS */}
      <div style={S}>
        <h2 className="cs-h2-mark" style={H2}>{t.rejectedTitle}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 32px' }}>{t.rejectedIntro}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {t.rejectedDecisions.map(({ rejected, chosen }, i) => (
            <div key={i} style={{ padding: 24, borderRadius: 20, background: '#F8FAFF', border: '1px solid #EAF1FF' }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 10px' }}>
                <strong style={{ color: '#B23A3A' }}>{t.rejectedLabel}</strong>{rejected}
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>
                <strong style={{ color: '#1F7A4D' }}>{t.chosenLabel}</strong>{chosen}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PROTOTYPE GALLERY */}
      <div style={S}>
        <h2 style={H2}>{t.galleryTitle}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 28px' }}>{t.galleryIntro}</p>

        <div style={{ overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ display: 'flex', transform: `translateX(-${screenIdx * 100}%)`, transition: 'transform 420ms ease-out' }}>
            {prototypeScreens.map(({ image, title, caption }) => (
              <div key={title} style={{ flex: '0 0 100%', borderRadius: 16, border: '1px solid #EAF1FF', overflow: 'hidden', background: '#FFFFFF' }}>
                <img src={image} alt={title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#12141F', marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: '#5A5F73', margin: 0 }}>{caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <button onClick={() => setScreenIdx(i => (i - 1 + prototypeScreens.length) % prototypeScreens.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronLeft size={16} className="" /></button>
          <div style={{ display: 'flex', gap: 8 }}>
            {prototypeScreens.map((_, i) => (
              <button key={i} onClick={() => setScreenIdx(i)} style={{ cursor: 'pointer', width: 8, height: 8, borderRadius: '50%', background: i === screenIdx ? '#002FA7' : '#DCE8FF', border: 'none', padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setScreenIdx(i => (i + 1) % prototypeScreens.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronRight size={16} className="" /></button>
        </div>
      </div>

      {/* OUTCOMES */}
      <div style={S}>
        <h2 className="cs-h2-mark" style={H2}>{t.outcomesTitle}</h2>
        <div className="rg-2" style={{ marginBottom: 24 }}>
          {t.outcomes.map(({ value, label }) => (
            <div key={label} style={{ padding: 20, borderRadius: 16, background: '#F2F6FF', textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#002FA7' }}>{value}</div>
              <div style={{ fontSize: 13, color: '#5A5F73', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '24px 28px', borderRadius: 20, border: '1px solid rgba(61,99,224,0.2)', background: 'rgba(0,47,167,0.03)' }}>
          <p style={{ fontSize: 16, fontStyle: 'italic', lineHeight: 1.7, color: '#3A3F4C', margin: '0 0 8px' }}>{t.quote3}</p>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#001A5C' }}>{t.quote3Attr}</div>
        </div>
      </div>
    </CaseStudyShell>
  )
}
