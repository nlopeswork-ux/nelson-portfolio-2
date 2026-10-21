import CaseStudyShell, { Body, DarkBox } from '../components/CaseStudyShell'
import { useLanguage } from '../i18n/LanguageContext'

const S = { padding: '0 0 48px' } as const
const SW = { padding: '0 0 48px' } as const
const H2 = { fontSize: 'clamp(20px,3vw,26px)' as const, fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 20px' }

const copy = {
  en: {
    title: 'National Workforce Digital Platform',
    description: 'Designing a national workforce-development ecosystem — from a manual, email-and-in-person process to a unified digital platform for citizens, businesses and government, across four years of continuous evolution.',
    meta: [
      { label: 'Role', value: 'UX/UI Designer (2023, on kickoff) → Senior UX/UI Designer & Design Lead (2024–present)', short: 'UX/UI Designer → Design Lead' },
      { label: 'Client', value: 'National workforce-development fund (Government / Employment & Economic Development)', short: 'National workforce-development fund' },
      { label: 'Team (peak)', value: '1 Design Lead · 2 UX/UI Designers · 2 Business Analysts · 1 PM · 1 Solution Architect · 5 OutSystems Developers · 1 QA Lead', short: '1 Design Lead · 2 UX/UI Designers +5' },
      { label: 'Deliverable', value: 'Unified digital ecosystem serving 5 external and 15 internal user roles across four annual delivery phases', short: 'Unified digital ecosystem · 5 external, 15 internal roles', span: true },
    ],
    stats: [
      { value: '5', label: 'external user roles served' },
      { value: '15', label: 'internal user roles' },
      { value: '4', label: 'annual delivery phases' },
    ],
    contextLabel: '02 Context',
    context1: 'The Fund is a national labour fund, funding skills, employment and enterprise-growth programmes for eligible individuals and private-sector companies. Before 2023, none of that ran through a portal — applications, documents, approvals, payment claims and status updates were handled entirely through email correspondence and in-person visits. There was no self-service channel and no shared case record between an applicant and the Fund.',
    context2: 'A national Digital Government Strategy and a parallel digital-economy sector strategy set a "digital-first" mandate to rebuild public and semi-governmental services around digital delivery. This platform is the Fund\'s answer to that mandate: not a single portal, but a scalable digital product built and grown across four annual phases.',
    contextCards: [
      { title: 'Business Goals', body: 'Replace a fully manual funding process with a unified digital lifecycle; support a national digital-first mandate; build a platform capable of absorbing new programmes without rebuilding it each time.' },
      { title: 'Users', body: '5 external personas (Individual, Enterprise, Vendor, Training Provider, Bank) and 15 internal roles across 5 functional groups (Assessment, Customer Service, Disbursement, Monitoring, Data Monitoring).' },
      { title: 'Stakeholders', body: 'Internal Fund departments, banking partners, training providers, vendors.' },
      { title: 'Constraints', body: 'Built on OutSystems (low-code); bilingual English/Arabic with RTL layout, light/dark mode; three distinct support types (P&S, Training and Wages), each with its own eligibility, claim and amendment rules.' },
      { title: 'Risks', body: "Compliance and financial-data handling across banking integrations; fraud — the platform's IA includes a dedicated Violations and Frauds flow for this reason." },
    ],
    challengeLabel: '03 The Challenge',
    challenge1: 'There was no existing portal to learn from or migrate off — the challenge was designing a self-service digital case lifecycle to replace a process that had only ever existed as email threads and in-person conversations, without losing the flexibility a human caseworker had offered informally.',
    challenge2: 'The scale of what had to be built from scratch: one External Platform spanning 7 top-level sections and 5 distinct applicant/partner personas, feeding into one Internal Platform of 15 named roles spread across 5 functional groups.',
    challengeCards: [
      { text: 'A single application had to support three different support types — P&S, Training and Wages — each with its own claim, payment and amendment rules, inside one Application Detail (360) record.', bold: 'P&S, Training and Wages' },
      { text: 'Money moved through three distinct actors — applicant, vendor and bank — so Payment & Claims had to model Claim a Payment, Pay to a Vendor and Delivery Confirmation as separate but connected flows, not one generic "payment" screen.', bold: 'three distinct actors — applicant, vendor and bank' },
      { text: 'Internal review wasn\'t a single approval chain: five functional groups each needed a different working view of the same case (eligibility for Assessment, disbursement for Disbursement, ongoing compliance for Monitoring and Data Monitoring, applicant queries for Customer Service).', bold: 'five functional groups' },
      { text: 'Many users held multiple identities at once — a single person could apply as an Individual while also managing funding applications for one or more companies.', bold: 'multiple identities at once' },
    ],
    discoveryLabel: '04 Discovery & Research',
    discoveryIntro: 'Before designing a single interface, the goal was to understand how funding programmes actually operated end to end — across applicants, internal teams and partner organisations — since no digital version of that process existed to audit.',
    researchTracks: [
      { n: '1', title: 'Year 1 (2023) Foundational Discovery', body: 'Mapping the email-and-in-person lifecycle end to end, then defining personas by profile type (external) and case-handling responsibility (internal) rather than by department.' },
      { n: '2', title: 'End-of-Year Scoping Interviews', body: "Internal (Fund staff) and external (applicants and partners), run near the close of each year to surface what to improve or add before the next year's project is scoped." },
      { n: '3', title: 'Intra-Year Retrospective Workshops', body: 'A structured 6-step method (define flow, walkthrough, identify pain points, group, vote, convert to action points) run per flow, with ~20 cross-functional participants — one full cycle documented on 20 May 2024 (see Validation).' },
    ],
    researchColumns: ['Finding', 'Design decision it drove'],
    researchFindings: [
      { finding: '"Assigning applications is inefficient due to the lack of a direct assignment option to specific internal users" (top-voted, 2024)', decision: 'Reconstructed the internal model around a Relationship Manager role responsible for case assignment, distinct from Assessor and Approver.' },
      { finding: '"Hard for the customer to know what other stages the application will go through" (6/7 votes, 2024)', decision: 'Application Detail (360) design principle: one always-visible status tracker per application, plus a first-login guided tutorial.' },
      { finding: '"Unclear error messages" / "system doesn\'t direct the customer back to the specific incomplete field" (2024)', decision: 'Design principle: define clear, specific validation messages on Application forms instead of generic ones.' },
      { finding: 'No digital channel existed at all pre-2023', decision: 'Core IA decision to unify Application, Payment & Claims, Approved Support and Processes under a single Application Detail (360) record shared by applicant and reviewer.' },
    ],
    insightsLabel: '05 Key Insights',
    insights: [
      { n: '01', title: 'Visibility mattered more than speed', body: "Applicants didn't primarily need a faster process; they needed to stop being in the dark. The single highest-voted Guidance pain point in 2024 (6/7 votes) was that customers couldn't tell what stage their application would go through next. This is why the status tracker and first-login guided tutorial became core design principles, not optional polish." },
      { n: '02', title: 'Assigning work needs to be explicit', body: 'The single highest-voted pain point across the entire 2024 review (7/7 votes) was that applications had no direct assignment option to a specific internal user. This is the clearest evidence in the whole engagement that operational efficiency and customer experience are the same problem: an unassigned application is a delayed applicant.' },
      { n: '03', title: "Internal review isn't one queue, it's five different lenses on the same case", body: "Assessment, Disbursement, Customer Service, Monitoring and Data Monitoring each needed a different working view of an identical Application Detail (360) record. That's the direct reason the internal model ended up as 5 functional groups and 15 named roles instead of one generic 'back office' team.", wide: true },
    ],
    workshopLabel: '06 Workshop & Prioritisation',
    workshopTitle: 'Aligning teams around the highest-impact opportunities',
    workshop1: 'Following the discovery phase, we facilitated client retrospective workshops with Product Owners, BA leads, QA leads and UX/UI leads to translate research into a prioritised action plan — one workshop per flow, run across Customer Application, Assessment & Approval, and E-Bill Payments, with roughly 20 cross-functional participants per session.',
    workshop2: 'Rather than redesigning the experience immediately, the objective was to build shared understanding, align priorities across teams, and identify improvements capable of delivering measurable value in the shortest time.',
    processLabel: 'Process',
    processBody: 'Each session ran the same six-step method: check in on the flow to analyse → walk through it as a group → identify pain points individually → group them into categories → vote (6 votes per participant) → convert the top-voted pain points into action points.',
    quickWinsTitle: 'Quick Wins Identified — nine action points prioritised for early delivery',
    quickWins: [
      "Showing an individual's own programmes before enterprise ones",
      'A first-login guided tutorial and visual timeline for payments/IBAN',
      'Clear, specific form validation messages instead of generic errors',
      'A dashboard for quick review of pending rejections and approvals',
      'Accepting an application directly from a notification hyperlink',
      'A required reason whenever an application is sent back',
      'A tutorial for creating an e-bill vs. non-e-bill payment',
      'Cancelling a pending e-bill payment code and generating a new one',
      'Paying multiple vendors within a single e-bill transaction',
    ],
    myRoleLabel: 'My Role — Senior UX/UI Designer & Design Lead (from 2024)',
    myRoleBody: "Planned and facilitated the workshops, synthesised pain points into prioritised categories, guided the voting-based prioritisation, and translated the output into the following year's roadmap.",
    pullQuote: 'Research uncovered the problems. The workshop created alignment. Prioritisation transformed insights into an actionable roadmap that guided both immediate improvements and the long-term evolution of the product.',
    principlesLabel: '07 Design Principles',
    designPrinciples: [
      ['Guide instead of instruct', 'surface eligibility rules inside the form itself, not in a separate document.'],
      ['Design for transparency', 'one always-visible status tracker per application, replacing silence with a specific stage.'],
      ['One 360 application record', 'shared by applicant and reviewer, so status, documents and history never diverge between the two platforms.'],
      ['Payment and claims unified', 'into a single area instead of separate menus for claiming, paying a vendor, and confirming delivery.'],
      ['Amendments handled', 'against the existing Approved Support item rather than as a new application.'],
      ['Profile type as the single mechanism', 'that scopes what a user sees, instead of separate portals per profile.'],
      ['Internal roles grouped by function', 'rather than by a single generic approval hierarchy.'],
      ['Design one ecosystem', 'every persona has a distinct workflow, but the product should feel like a single coherent platform.'],
    ],
    solutionLabel: '08 Solution',
    solutionTitle: 'Product Strategy — Four Annual Phases',
    solutionIntro: 'The platform evolved through four strategic phases, each a separately scoped annual project.',
    phases: [
      { year: '2023', label: 'Foundation', body: 'Replace manual processes with a unified digital platform. Delivered the full External Platform (Individual, Enterprise, Vendor, Training Provider, Bank), eligibility assessment, funding applications, internal assessment and approval workflows, payment requests, reimbursements, IBAN management, and the Internal Operations Platform.' },
      { year: '2024', label: 'Platform Expansion', body: 'Grow the ecosystem and reduce operational complexity. Delivered the Job Centre persona, a Customer 360 view, multi-persona profiles, a Programme Recommendation experience, an Applications Dashboard, site-visit management, and early AI-assisted document/compliance checks. Also the quick-wins cycle documented in Validation.' },
      { year: '2025', label: 'Omnichannel Experience', body: 'Increase engagement across channels, including mobile.' },
      { year: '2026', label: 'Intelligence & Personalisation (current)', body: 'Personalised onboarding, dynamic profile completion, an AI operational agent, AI-assisted monitoring and compliance intelligence, and executive business-intelligence dashboards.' },
    ],
    iaTitle: 'Information Architecture — External Platform (7 Sections)',
    iaColumns: ['Section', 'What it contains'],
    iaSections: [
      { section: '0. Access', contents: 'Registration, Login, Forgot password, Account recovery (manual, Face ID, e-Key)' },
      { section: '1. Homepage → Application Detail (360)', contents: 'Applications List → Application Detail (360), branching into Application Details, Approval Letter, Notifications, Payment & Claims, Approved Support, Processes, Manage my Application, Special Conditions' },
      { section: '2. Programs', contents: 'Programs List → Program Detail → Customer Application flow' },
      { section: '3. Management', contents: 'IBAN Management, User Management' },
      { section: '4. My Documents', contents: 'Document repository for the profile' },
      { section: '5. Profile', contents: 'Profile Type (Individual, Enterprise, Vendor, Training Provider, Bank), My Account' },
      { section: '6. Add CR / License', contents: 'Associate Profile' },
      { section: '7. Notifications', contents: 'Platform-wide notification center' },
    ],
    personasTitle: 'External Personas & Internal Roles',
    personaGroups: [
      { label: 'External · 5 personas', title: 'Individual, Enterprise, Vendor, Training Provider, Bank', body: 'Bank: a banking partner mapping its own financial-credit customers against applications where the Fund acts as sponsor.' },
      { label: 'Internal · 15 roles, 5 functional groups', title: 'Assessment, Customer Service, Disbursement, Monitoring, Data Monitoring', body: 'Assessment (Relationship Manager, Assessor, Approver), Customer Service (Customer Service Agent), Disbursement (Disbursement Agent ×5), Monitoring (Monitoring Agent ×3), Data Monitoring (Data Monitoring Agent ×3).' },
    ],
    flowsTitle: 'User Flows',
    userFlows: [
      { steps: ['Eligibility', 'Application', 'Internal Review', 'Approval', 'Reimbursement', 'Monitoring'], note: 'The core end-to-end journey, now living as one Application Detail (360) both applicant and reviewer share.' },
      { steps: ['Claim a Payment', 'Pay to a Vendor', 'Delivery Confirmation'], note: 'Three connected flows because money moves through three actors, closing the loop before funds move.' },
      { steps: ['Vendor Purchase', 'Invoice Submission', 'Payment Request'], note: 'Gives Vendor persona users a direct channel into the process.' },
      { steps: ['Job Centre', 'Candidate Referral', 'Enterprise Placement'], note: 'Connects candidate referrals to Fund-funded roles.' },
    ],
    dsTitle: 'Design System as Infrastructure',
    dsBody: 'From year one, the design team built and maintained a component library in Figma — initially for internal consistency, later extended to OutSystems-ready components that developers could implement directly. By Phase 2, the component library covered 90+ components across light and dark themes, with Arabic RTL variants for every pattern introduced in Phase 3.',
    transitionLabel: 'Design Lead Transition — 2024',
    transitionBox: [
      'Taking the Design Lead role in 2024 meant moving from delivery to governance: running weekly design reviews, establishing a decision log for every significant UX decision (rationale, alternatives considered, who approved), and mentoring a junior designer joining the engagement mid-programme.',
      'The most significant structural change: implementing a shared definition of "design done" — a checklist covering accessibility, RTL, dark mode, error states, and empty states — that every screen had to pass before entering development. It added two days to design cycles and eliminated an entire category of late-stage development rework.',
    ],
    ecosystemTitle: "Final Solution — Today's Ecosystem",
    ecosystem: [
      'Individual Portal', 'Enterprise Portal', 'Training Provider Portal',
      'Vendor Portal', 'Banking Portal', 'Job Centre Portal',
      'Internal Operations Platform', 'AI-Assisted Operational Services (2026, current)',
    ],
    validationLabel: '09 Validation & Continuous Product Iteration',
    validationIntro: 'Validation ran as a continuous activity, not a single usability-testing pass. Every year has included a recurring cycle of client retrospective workshops, run specifically to identify and implement quick wins. One full cycle is documented in a dated internal deliverable ("UX Monitoring," the Fund, 20 May 2024) reviewing three flows: Customer Application, Assessment & Approval, and E-Bill Payments.',
    validationColumns: ['Flow', 'Category', 'Quick win'],
    validationRows: [
      { flow: 'Customer Application', category: 'User type & permissions', win: "Show an individual's own programmes first; surface enterprise programmes only after switching profile" },
      { flow: 'Customer Application', category: 'Guidance', win: 'First-login animated tutorial + visual timeline for payments/IBAN/withdrawals' },
      { flow: 'Customer Application', category: 'Application forms', win: 'Replace unclear validation messages with defined, specific error messages' },
      { flow: 'Assessment & Approval', category: 'Dashboard', win: 'Quick review of pending rejections, approvals, or a specific certificate type' },
      { flow: 'Assessment & Approval', category: 'Customer view', win: 'Accept an approved application directly from a notification hyperlink' },
      { flow: 'Assessment & Approval', category: 'Remarks & send back', win: 'Require a specific reason whenever an application is sent back' },
      { flow: 'E-Bill Payments', category: 'Guidance', win: 'Short tutorial on e-bill vs. non-e-bill payment' },
      { flow: 'E-Bill Payments', category: 'Cancel payment code', win: 'Cancel a pending code and generate a new one' },
      { flow: 'E-Bill Payments', category: 'Multiple vendors payment', win: 'Pay multiple vendors within a single transaction' },
    ],
    validationClosing: 'Beyond this documented cycle: across the 3.5-year engagement, most of these nine quick wins shipped, along with a larger set of further quick wins from other workshop cycles.',
    impactLabel: '10 Impact',
    impactGroups: [
      { label: 'Business Impact', bg: '#12141F', items: ['Created a unified national digital platform for workforce development, replacing a fully manual, email-and-in-person process.', 'Established a scalable product architecture that absorbed 3 major expansions (Job Centre, AI services, BI dashboards) without a ground-up rebuild.', 'Reduced dependency on manual operational processes across Assessment, Disbursement and Monitoring.'] },
      { label: 'User Impact', bg: '#3A5A99', items: ['Simplified funding journeys for 5 external personas through one shared Application Detail (360) record.', 'Improved transparency at every application stage via the status-tracker design principle.', 'Reduced administrative effort through integrated, unified reimbursement workflows.'] },
      { label: 'Team Impact', bg: '#2A4CB8', items: ['A shared design system reduced implementation effort and kept 5 external and 15 internal experiences visually and behaviourally consistent across 4 annual releases.', 'A repeatable annual delivery model let the team plan a year at a time instead of one continuous, undifferentiated backlog.'] },
    ],
    reflectionLabel: '11 Reflection',
    reflectionWorkedLabel: 'What worked:',
    reflectionWorked: 'treating funding programmes as connected service ecosystems, not isolated forms, meant every design decision considered the applicant, the internal reviewer, and the partner organisations sharing the same journey.',
    reflectionImproveLabel: "What I'd improve:",
    reflectionImprove: "Year 1's original 2023 research isn't documented with the same granularity as the 2024 workshop cycle — a consistent research-logging practice from day one would make every later case-study retelling stronger.",
    reflectionLearnedLabel: 'What I learned:',
    reflectionLearned: 'government platforms succeed as service ecosystems, not collections of digital forms. Designing for evolution — building each release so the next one extends it rather than replacing it — mattered more over a 4-year engagement than getting any single release perfect. Leading the product across multiple phases also reinforced that operational efficiency and customer experience are frequently the same problem seen from two sides, not competing priorities to trade off.',
  },
  pt: {
    title: 'Plataforma Digital Nacional de Força de Trabalho',
    description: 'Desenho de um ecossistema nacional de desenvolvimento da força de trabalho — de um processo manual, por email e presencial, a uma plataforma digital unificada para cidadãos, empresas e governo, ao longo de quatro anos de evolução contínua.',
    meta: [
      { label: 'Função', value: 'UX/UI Designer (2023, no arranque) → Senior UX/UI Designer & Design Lead (2024–presente)', short: 'UX/UI Designer → Design Lead' },
      { label: 'Cliente', value: 'Fundo nacional de desenvolvimento da força de trabalho (Setor Público / Emprego e Desenvolvimento Económico)', short: 'Fundo nacional de desenvolvimento' },
      { label: 'Equipa (pico)', value: '1 Design Lead · 2 UX/UI Designers · 2 Business Analysts · 1 PM · 1 Solution Architect · 5 OutSystems Developers · 1 QA Lead', short: '1 Design Lead · 2 UX/UI Designers +5' },
      { label: 'Entregável', value: 'Ecossistema digital unificado a servir 5 papéis externos e 15 internos ao longo de quatro fases anuais de entrega', short: 'Ecossistema digital unificado · 5 papéis externos e 15 internos', span: true },
    ],
    stats: [
      { value: '5', label: 'papéis de utilizador externos servidos' },
      { value: '15', label: 'papéis de utilizador internos' },
      { value: '4', label: 'fases anuais de entrega' },
    ],
    contextLabel: '02 Contexto',
    context1: 'O Fundo é um fundo laboral nacional, que financia programas de competências, emprego e crescimento empresarial para indivíduos e empresas privadas elegíveis. Antes de 2023, nada disso passava por um portal — candidaturas, documentos, aprovações, pedidos de pagamento e atualizações de estado eram tratados inteiramente por correspondência de email e visitas presenciais. Não existia canal de self-service nem um registo de caso partilhado entre um candidato e o Fundo.',
    context2: 'Uma Estratégia Digital Governamental nacional, e uma estratégia paralela para o setor da economia digital, estabeleceram um mandato "digital-first" para reconstruir serviços públicos e semipúblicos em torno da entrega digital. Esta plataforma é a resposta do Fundo a esse mandato: não um único portal, mas um produto digital escalável, construído e expandido ao longo de quatro fases anuais.',
    contextCards: [
      { title: 'Objetivos de Negócio', body: 'Substituir um processo de financiamento totalmente manual por um ciclo de vida digital unificado; apoiar um mandato nacional digital-first; construir uma plataforma capaz de absorver novos programas sem a reconstruir de cada vez.' },
      { title: 'Utilizadores', body: '5 personas externas (Individual, Empresa, Fornecedor, Entidade Formadora, Banco) e 15 papéis internos em 5 grupos funcionais (Assessment, Customer Service, Disbursement, Monitoring, Data Monitoring).' },
      { title: 'Stakeholders', body: 'Departamentos internos do Fundo, parceiros bancários, entidades formadoras, fornecedores.' },
      { title: 'Restrições', body: 'Construído em OutSystems (low-code); bilingue Inglês/Árabe com layout RTL, modo claro/escuro; três tipos de apoio distintos (P&S, Formação e Salários), cada um com as suas próprias regras de elegibilidade, reclamação e alteração.' },
      { title: 'Riscos', body: 'Conformidade e tratamento de dados financeiros em integrações bancárias; fraude — por isso a IA da plataforma inclui um fluxo dedicado de Violations and Frauds.' },
    ],
    challengeLabel: '03 O Desafio',
    challenge1: 'Não havia nenhum portal existente para aprender ou migrar — o desafio era desenhar um ciclo de vida de caso digital em self-service para substituir um processo que só alguma vez tinha existido como threads de email e conversas presenciais, sem perder a flexibilidade que um gestor de caso humano oferecia informalmente.',
    challenge2: 'A escala do que tinha de ser construído do zero: uma Plataforma Externa com 7 secções de topo e 5 personas distintas de candidato/parceiro, a alimentar uma Plataforma Interna de 15 papéis nomeados distribuídos por 5 grupos funcionais.',
    challengeCards: [
      { text: 'Uma única aplicação tinha de suportar três tipos de apoio diferentes — P&S, Formação e Salários — cada um com as suas próprias regras de reclamação, pagamento e alteração, dentro de um único registo de Application Detail (360).', bold: 'P&S, Formação e Salários' },
      { text: 'O dinheiro passava por três atores distintos — candidato, fornecedor e banco — por isso o Payment & Claims teve de modelar Claim a Payment, Pay to a Vendor e Delivery Confirmation como fluxos separados mas ligados, não um ecrã genérico de "pagamento".', bold: 'três atores distintos — candidato, fornecedor e banco' },
      { text: 'A revisão interna não era uma única cadeia de aprovação: cinco grupos funcionais precisavam cada um de uma vista de trabalho diferente do mesmo caso (elegibilidade para Assessment, desembolso para Disbursement, conformidade contínua para Monitoring e Data Monitoring, questões de candidatos para Customer Service).', bold: 'cinco grupos funcionais' },
      { text: 'Muitos utilizadores tinham várias identidades ao mesmo tempo — uma única pessoa podia candidatar-se como Individual e, ao mesmo tempo, gerir candidaturas de financiamento para uma ou mais empresas.', bold: 'várias identidades ao mesmo tempo' },
    ],
    discoveryLabel: '04 Discovery e Investigação',
    discoveryIntro: 'Antes de desenhar uma única interface, o objetivo era compreender como os programas de financiamento funcionavam de facto de ponta a ponta — entre candidatos, equipas internas e organizações parceiras — já que não existia nenhuma versão digital desse processo para auditar.',
    researchTracks: [
      { n: '1', title: 'Ano 1 (2023) Discovery Fundacional', body: 'Mapeamento do ciclo de vida por email e presencial de ponta a ponta, definindo depois personas por tipo de perfil (externo) e responsabilidade de gestão de caso (interno) em vez de por departamento.' },
      { n: '2', title: 'Entrevistas de Delimitação de Fim de Ano', body: 'Internas (equipa do Fundo) e externas (candidatos e parceiros), realizadas perto do fecho de cada ano para identificar o que melhorar ou acrescentar antes de delimitar o projeto do ano seguinte.' },
      { n: '3', title: 'Workshops de Retrospetiva Intra-Ano', body: 'Um método estruturado em 6 passos (definir o fluxo, percorrê-lo, identificar pontos de dor, agrupar, votar, converter em pontos de ação) realizado por fluxo, com cerca de 20 participantes multidisciplinares — um ciclo completo documentado a 20 de maio de 2024 (ver Validação).' },
    ],
    researchColumns: ['Descoberta', 'Decisão de design que motivou'],
    researchFindings: [
      { finding: '"A atribuição de candidaturas é ineficiente pela falta de uma opção de atribuição direta a utilizadores internos específicos" (mais votado, 2024)', decision: 'Reconstruído o modelo interno à volta de um papel de Relationship Manager responsável pela atribuição de casos, distinto do Assessor e do Approver.' },
      { finding: '"Difícil para o cliente saber por que outras fases a candidatura vai passar" (6/7 votos, 2024)', decision: 'Princípio de design do Application Detail (360): um indicador de estado sempre visível por candidatura, mais um tutorial guiado no primeiro login.' },
      { finding: '"Mensagens de erro pouco claras" / "o sistema não reencaminha o cliente para o campo específico por preencher" (2024)', decision: 'Princípio de design: definir mensagens de validação claras e específicas nos formulários de candidatura, em vez de genéricas.' },
      { finding: 'Não existia qualquer canal digital antes de 2023', decision: 'Decisão central de arquitetura de informação: unificar Application, Payment & Claims, Approved Support e Processes num único registo de Application Detail (360) partilhado por candidato e revisor.' },
    ],
    insightsLabel: '05 Principais Descobertas',
    insights: [
      { n: '01', title: 'A visibilidade importava mais do que a velocidade', body: 'Os candidatos não precisavam sobretudo de um processo mais rápido; precisavam de deixar de estar às escuras. O ponto de dor de Guidance mais votado em 2024 (6/7 votos) foi o facto de os clientes não conseguirem saber por que fase a sua candidatura passaria a seguir. É por isso que o indicador de estado e o tutorial guiado no primeiro login se tornaram princípios de design centrais, não um acabamento opcional.' },
      { n: '02', title: 'Atribuir trabalho precisa de ser explícito', body: 'O ponto de dor mais votado em toda a revisão de 2024 (7/7 votos) foi o facto de as candidaturas não terem opção de atribuição direta a um utilizador interno específico. É a evidência mais clara em toda a colaboração de que eficiência operacional e experiência do cliente são o mesmo problema: uma candidatura não atribuída é um candidato atrasado.' },
      { n: '03', title: 'A revisão interna não é uma única fila, são cinco lentes diferentes sobre o mesmo caso', body: 'Assessment, Disbursement, Customer Service, Monitoring e Data Monitoring precisavam cada um de uma vista de trabalho diferente de um mesmo registo de Application Detail (360). É a razão direta pela qual o modelo interno acabou em 5 grupos funcionais e 15 papéis nomeados, em vez de uma equipa genérica de "back office".', wide: true },
    ],
    workshopLabel: '06 Workshop e Priorização',
    workshopTitle: 'Alinhar equipas à volta das oportunidades de maior impacto',
    workshop1: 'Depois da fase de discovery, facilitámos workshops de retrospetiva com o cliente, com Product Owners, leads de BA, leads de QA e leads de UX/UI, para traduzir a investigação num plano de ação priorizado — um workshop por fluxo, realizado em Customer Application, Assessment & Approval e E-Bill Payments, com cerca de 20 participantes multidisciplinares por sessão.',
    workshop2: 'Em vez de redesenhar a experiência de imediato, o objetivo era construir entendimento partilhado, alinhar prioridades entre equipas, e identificar melhorias capazes de entregar valor mensurável no menor tempo possível.',
    processLabel: 'Processo',
    processBody: 'Cada sessão seguiu o mesmo método em seis passos: enquadrar o fluxo a analisar → percorrê-lo em grupo → identificar pontos de dor individualmente → agrupá-los em categorias → votar (6 votos por participante) → converter os pontos de dor mais votados em pontos de ação.',
    quickWinsTitle: 'Quick Wins Identificados — nove pontos de ação priorizados para entrega antecipada',
    quickWins: [
      'Mostrar os programas do próprio individual antes dos de empresa',
      'Tutorial guiado no primeiro login e linha temporal visual para pagamentos/IBAN',
      'Mensagens de validação de formulário claras e específicas, em vez de erros genéricos',
      'Um dashboard para revisão rápida de rejeições e aprovações pendentes',
      'Aceitar uma candidatura diretamente a partir de uma hiperligação de notificação',
      'Um motivo obrigatório sempre que uma candidatura é devolvida',
      'Um tutorial para criar um pagamento e-bill vs. não-e-bill',
      'Cancelar um código de pagamento e-bill pendente e gerar um novo',
      'Pagar vários fornecedores numa única transação e-bill',
    ],
    myRoleLabel: 'A Minha Função — Senior UX/UI Designer & Design Lead (desde 2024)',
    myRoleBody: 'Planeei e facilitei os workshops, sintetizei pontos de dor em categorias priorizadas, orientei a priorização por votação, e traduzi o resultado no roadmap do ano seguinte.',
    pullQuote: 'A investigação revelou os problemas. O workshop criou alinhamento. A priorização transformou as descobertas num roadmap acionável que orientou tanto as melhorias imediatas como a evolução de longo prazo do produto.',
    principlesLabel: '07 Princípios de Design',
    designPrinciples: [
      ['Guiar em vez de instruir', 'expor as regras de elegibilidade dentro do próprio formulário, não num documento separado.'],
      ['Desenhar para transparência', 'um indicador de estado sempre visível por candidatura, substituindo o silêncio por uma fase específica.'],
      ['Um registo de candidatura 360', 'partilhado por candidato e revisor, para que estado, documentos e histórico nunca divirjam entre as duas plataformas.'],
      ['Pagamentos e reclamações unificados', 'numa única área, em vez de menus separados para reclamar, pagar a um fornecedor e confirmar entrega.'],
      ['Alterações tratadas', 'contra o item de Approved Support existente, em vez de como uma nova candidatura.'],
      ['Tipo de perfil como mecanismo único', 'que delimita o que um utilizador vê, em vez de portais separados por perfil.'],
      ['Papéis internos agrupados por função', 'em vez de uma única hierarquia de aprovação genérica.'],
      ['Desenhar um só ecossistema', 'cada persona tem um workflow distinto, mas o produto deve parecer uma única plataforma coerente.'],
    ],
    solutionLabel: '08 Solução',
    solutionTitle: 'Estratégia de Produto — Quatro Fases Anuais',
    solutionIntro: 'A plataforma evoluiu através de quatro fases estratégicas, cada uma um projeto anual delimitado em separado.',
    phases: [
      { year: '2023', label: 'Fundação', body: 'Substituir processos manuais por uma plataforma digital unificada. Entregue a Plataforma Externa completa (Individual, Empresa, Fornecedor, Entidade Formadora, Banco), avaliação de elegibilidade, candidaturas de financiamento, workflows internos de avaliação e aprovação, pedidos de pagamento, reembolsos, gestão de IBAN, e a Plataforma de Operações Internas.' },
      { year: '2024', label: 'Expansão da Plataforma', body: 'Expandir o ecossistema e reduzir a complexidade operacional. Entregue a persona Job Centre, uma vista Customer 360, perfis multi-persona, uma experiência de Recomendação de Programas, um Dashboard de Candidaturas, gestão de visitas no terreno, e primeiras verificações de documentos/conformidade assistidas por IA. Também o ciclo de quick wins documentado em Validação.' },
      { year: '2025', label: 'Experiência Omnichannel', body: 'Aumentar o envolvimento em vários canais, incluindo o mobile.' },
      { year: '2026', label: 'Inteligência e Personalização (atual)', body: 'Onboarding personalizado, preenchimento dinâmico de perfil, um agente operacional de IA, monitorização e inteligência de conformidade assistidas por IA, e dashboards executivos de business intelligence.' },
    ],
    iaTitle: 'Arquitetura de Informação — Plataforma Externa (7 Secções)',
    iaColumns: ['Secção', 'O que contém'],
    iaSections: [
      { section: '0. Acesso', contents: 'Registo, Login, Esqueci-me da password, Recuperação de conta (manual, Face ID, e-Key)' },
      { section: '1. Homepage → Application Detail (360)', contents: 'Lista de Candidaturas → Application Detail (360), ramificando em Detalhes da Candidatura, Carta de Aprovação, Notificações, Payment & Claims, Approved Support, Processes, Gerir a Minha Candidatura, Condições Especiais' },
      { section: '2. Programas', contents: 'Lista de Programas → Detalhe do Programa → Fluxo de Candidatura do Cliente' },
      { section: '3. Gestão', contents: 'Gestão de IBAN, Gestão de Utilizadores' },
      { section: '4. Os Meus Documentos', contents: 'Repositório de documentos do perfil' },
      { section: '5. Perfil', contents: 'Tipo de Perfil (Individual, Empresa, Fornecedor, Entidade Formadora, Banco), A Minha Conta' },
      { section: '6. Adicionar CR / Licença', contents: 'Associar Perfil' },
      { section: '7. Notificações', contents: 'Centro de notificações de toda a plataforma' },
    ],
    personasTitle: 'Personas Externas e Papéis Internos',
    personaGroups: [
      { label: 'Externo · 5 personas', title: 'Individual, Empresa, Fornecedor, Entidade Formadora, Banco', body: 'Banco: um parceiro bancário que cruza os seus próprios clientes de crédito financeiro com candidaturas onde o Fundo atua como patrocinador.' },
      { label: 'Interno · 15 papéis, 5 grupos funcionais', title: 'Assessment, Customer Service, Disbursement, Monitoring, Data Monitoring', body: 'Assessment (Relationship Manager, Assessor, Approver), Customer Service (Customer Service Agent), Disbursement (Disbursement Agent ×5), Monitoring (Monitoring Agent ×3), Data Monitoring (Data Monitoring Agent ×3).' },
    ],
    flowsTitle: 'Fluxos de Utilizador',
    userFlows: [
      { steps: ['Elegibilidade', 'Candidatura', 'Revisão Interna', 'Aprovação', 'Reembolso', 'Monitorização'], note: 'A jornada central de ponta a ponta, hoje um único Application Detail (360) partilhado por candidato e revisor.' },
      { steps: ['Reclamar um Pagamento', 'Pagar a um Fornecedor', 'Confirmação de Entrega'], note: 'Três fluxos ligados porque o dinheiro passa por três atores, fechando o ciclo antes de os fundos se moverem.' },
      { steps: ['Compra do Fornecedor', 'Submissão de Fatura', 'Pedido de Pagamento'], note: 'Dá aos utilizadores da persona Fornecedor um canal direto para o processo.' },
      { steps: ['Job Centre', 'Referência de Candidato', 'Colocação em Empresa'], note: 'Liga referências de candidatos a funções financiadas pelo Fundo.' },
    ],
    dsTitle: 'Design System como Infraestrutura',
    dsBody: 'Desde o primeiro ano, a equipa de design construiu e manteve uma biblioteca de componentes em Figma — inicialmente por consistência interna, mais tarde alargada a componentes prontos para OutSystems que os developers podiam implementar diretamente. Na Fase 2, a biblioteca de componentes cobria mais de 90 componentes nos temas claro e escuro, com variantes Árabe RTL para cada padrão introduzido na Fase 3.',
    transitionLabel: 'Transição para Design Lead — 2024',
    transitionBox: [
      'Assumir o papel de Design Lead em 2024 significou passar de entrega para governança: realizar revisões de design semanais, estabelecer um registo de decisões para cada decisão UX significativa (justificação, alternativas consideradas, quem aprovou), e mentorizar uma designer júnior que se juntou à colaboração a meio do programa.',
      'A mudança estrutural mais significativa: implementar uma definição partilhada de "design concluído" — uma checklist cobrindo acessibilidade, RTL, modo escuro, estados de erro e estados vazios — que cada ecrã tinha de cumprir antes de entrar em desenvolvimento. Acrescentou dois dias aos ciclos de design e eliminou uma categoria inteira de retrabalho tardio em desenvolvimento.',
    ],
    ecosystemTitle: 'Solução Final — O Ecossistema de Hoje',
    ecosystem: [
      'Portal Individual', 'Portal Empresa', 'Portal Entidade Formadora',
      'Portal Fornecedor', 'Portal Bancário', 'Portal Job Centre',
      'Plataforma de Operações Internas', 'Serviços Operacionais Assistidos por IA (2026, atual)',
    ],
    validationLabel: '09 Validação e Iteração Contínua do Produto',
    validationIntro: 'A validação decorreu como uma atividade contínua, não uma única ronda de testes de usabilidade. Todos os anos incluíram um ciclo recorrente de workshops de retrospetiva com o cliente, realizados especificamente para identificar e implementar quick wins. Um ciclo completo está documentado num entregável interno datado ("UX Monitoring", o Fundo, 20 de maio de 2024), revendo três fluxos: Customer Application, Assessment & Approval e E-Bill Payments.',
    validationColumns: ['Fluxo', 'Categoria', 'Quick win'],
    validationRows: [
      { flow: 'Customer Application', category: 'Tipo de utilizador e permissões', win: 'Mostrar primeiro os programas do próprio individual; só mostrar programas de empresa depois de trocar de perfil' },
      { flow: 'Customer Application', category: 'Orientação', win: 'Tutorial animado no primeiro login + linha temporal visual para pagamentos/IBAN/levantamentos' },
      { flow: 'Customer Application', category: 'Formulários de candidatura', win: 'Substituir mensagens de validação pouco claras por mensagens de erro definidas e específicas' },
      { flow: 'Assessment & Approval', category: 'Dashboard', win: 'Revisão rápida de rejeições pendentes, aprovações, ou um tipo de certificado específico' },
      { flow: 'Assessment & Approval', category: 'Vista do cliente', win: 'Aceitar uma candidatura aprovada diretamente a partir de uma hiperligação de notificação' },
      { flow: 'Assessment & Approval', category: 'Observações e devolução', win: 'Exigir um motivo específico sempre que uma candidatura é devolvida' },
      { flow: 'E-Bill Payments', category: 'Orientação', win: 'Tutorial curto sobre pagamento e-bill vs. não-e-bill' },
      { flow: 'E-Bill Payments', category: 'Cancelar código de pagamento', win: 'Cancelar um código pendente e gerar um novo' },
      { flow: 'E-Bill Payments', category: 'Pagamento a vários fornecedores', win: 'Pagar vários fornecedores numa única transação' },
    ],
    validationClosing: 'Para além deste ciclo documentado: ao longo dos 3,5 anos de colaboração, a maioria destes nove quick wins foi entregue, juntamente com um conjunto maior de outros quick wins de outros ciclos de workshop.',
    impactLabel: '10 Impacto',
    impactGroups: [
      { label: 'Impacto no Negócio', bg: '#12141F', items: ['Criou uma plataforma digital nacional unificada para desenvolvimento da força de trabalho, substituindo um processo totalmente manual, por email e presencial.', 'Estabeleceu uma arquitetura de produto escalável que absorveu 3 grandes expansões (Job Centre, serviços de IA, dashboards de BI) sem uma reconstrução do zero.', 'Reduziu a dependência de processos operacionais manuais em Assessment, Disbursement e Monitoring.'] },
      { label: 'Impacto no Utilizador', bg: '#3A5A99', items: ['Simplificou as jornadas de financiamento para 5 personas externas através de um único registo partilhado de Application Detail (360).', 'Melhorou a transparência em cada fase da candidatura através do princípio de design do indicador de estado.', 'Reduziu o esforço administrativo através de workflows de reembolso integrados e unificados.'] },
      { label: 'Impacto na Equipa', bg: '#2A4CB8', items: ['Um design system partilhado reduziu o esforço de implementação e manteve 5 experiências externas e 15 internas visual e comportamentalmente consistentes ao longo de 4 lançamentos anuais.', 'Um modelo de entrega anual repetível permitiu à equipa planear um ano de cada vez, em vez de um backlog contínuo e indiferenciado.'] },
    ],
    reflectionLabel: '11 Reflexão',
    reflectionWorkedLabel: 'O que funcionou:',
    reflectionWorked: 'tratar os programas de financiamento como ecossistemas de serviço ligados entre si, não como formulários isolados, significou que cada decisão de design considerava o candidato, o revisor interno, e as organizações parceiras que partilhavam a mesma jornada.',
    reflectionImproveLabel: 'O que melhoraria:',
    reflectionImprove: 'a investigação original do Ano 1 (2023) não está documentada com o mesmo detalhe que o ciclo de workshops de 2024 — uma prática consistente de registo de investigação desde o primeiro dia tornaria mais forte cada reconto futuro desta case study.',
    reflectionLearnedLabel: 'O que aprendi:',
    reflectionLearned: 'plataformas governamentais têm sucesso como ecossistemas de serviço, não como coleções de formulários digitais. Desenhar para evolução — construir cada lançamento para que o seguinte o estenda em vez de o substituir — importou mais, ao longo de uma colaboração de 4 anos, do que tornar qualquer lançamento isolado perfeito. Liderar o produto ao longo de várias fases também reforçou que eficiência operacional e experiência do cliente são frequentemente o mesmo problema visto de dois lados, não prioridades concorrentes a sacrificar uma pela outra.',
  },
}

export default function CaseStudyTamkeen() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <CaseStudyShell
      title={t.title}
      description={t.description}
      meta={t.meta}
      stats={t.stats}
    >
      {/* 02 CONTEXT */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>{t.contextLabel}</div>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 20px' }}>{t.context1}</p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 32px' }}>{t.context2}</p>

        <div className="rg-2" style={{ gap: 20 }}>
          {t.contextCards.map(({ title, body }, i) => (
            <div
              key={title}
              style={{
                padding: '26px', borderRadius: 16,
                background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(20,30,60,0.1)',
                gridColumn: i === 4 ? '1 / -1' : undefined,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#12141F', marginBottom: 10 }}>{title}</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 03 THE CHALLENGE */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>{t.challengeLabel}</div>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 20px' }}>{t.challenge1}</p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 32px' }}>{t.challenge2}</p>
        <div className="rg-2">
          {t.challengeCards.map(({ text, bold }, i) => (
            <div key={i} style={{ padding: '20px 24px', borderRadius: 16, background: '#F2F6FF' }}>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#3A3F4C', margin: 0 }} dangerouslySetInnerHTML={{ __html: text.replace(bold, `<strong style="color:#12141F">${bold}</strong>`) }} />
            </div>
          ))}
        </div>
      </div>

      {/* 04 DISCOVERY */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>{t.discoveryLabel}</div>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 32px' }}>{t.discoveryIntro}</p>

        <div className="rg-3" style={{ marginBottom: 36 }}>
          {t.researchTracks.map(({ n, title, body }) => (
            <div key={n} style={{ padding: '26px', borderRadius: 16, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(20,30,60,0.1)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>{n}. {title}</div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>

        <div className="table-scroll">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                {t.researchColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.researchFindings.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < t.researchFindings.length - 1 ? '1px solid #F2F6FF' : undefined }}>
                  <td data-label={t.researchColumns[0]} style={{ padding: '10px 12px', color: '#12141F', fontStyle: 'italic' }}>{row.finding}</td>
                  <td data-label={t.researchColumns[1]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 05 KEY INSIGHTS */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 24 }}>{t.insightsLabel}</div>
        <div className="rg-2" style={{ gap: 20 }}>
          {t.insights.map(({ n, title, body, wide }) => (
            <div key={n} style={{ padding: '26px 28px', borderRadius: 18, background: '#FFFFFF', border: '1px solid #EAF1FF', boxShadow: '0 10px 28px rgba(20,30,60,0.05)', gridColumn: wide ? '1 / -1' : undefined }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#001A5C', marginBottom: 10 }}>{n}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>{title}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: '#4A4F63', margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 06 WORKSHOP */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>{t.workshopLabel}</div>
        <h2 style={H2}>{t.workshopTitle}</h2>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 20px' }}>{t.workshop1}</p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 32px' }}>{t.workshop2}</p>

        <div style={{ padding: 24, borderRadius: 18, background: '#F2F6FF', marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: '#001A5C', marginBottom: 8 }}>{t.processLabel}</div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3A3F4C', margin: 0 }}>{t.processBody}</p>
        </div>

        <h3 className="cs-h3">{t.quickWinsTitle}</h3>
        <div className="rg-3" style={{ gap: 14, marginBottom: 36 }}>
          {t.quickWins.map((win, i) => (
            <div key={i} style={{ padding: '16px 18px', borderRadius: 14, background: '#F8FAFF', border: '1px solid #EAF1FF', fontSize: 13.5, lineHeight: 1.55, color: '#3A3F4C' }}>{win}</div>
          ))}
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: '#001A5C', marginBottom: 6 }}>{t.myRoleLabel}</div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{t.myRoleBody}</p>
        </div>

        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 44, lineHeight: 1, color: '#001A5C', opacity: 0.35, marginBottom: 8 }}>"</div>
          <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: 'italic', fontSize: 24, lineHeight: 1.45, color: '#2A2F3A', margin: 0 }}>{t.pullQuote}</p>
        </div>
      </div>

      {/* 07 DESIGN PRINCIPLES */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>{t.principlesLabel}</div>
        <div className="rg-2">
          {t.designPrinciples.map(([label, text]) => (
            <div key={label} style={{ padding: '20px 24px', borderRadius: 16, background: '#F2F6FF' }}>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#3A3F4C', margin: 0 }}>
                <strong style={{ color: '#12141F' }}>{label}</strong> — {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 08 SOLUTION */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>{t.solutionLabel}</div>
        <h2 style={H2}>{t.solutionTitle}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 48px' }}>{t.solutionIntro}</p>

        <div style={{ position: 'relative' }}>
          <div className="cs-timeline-line" />
          <div className="cs-timeline-line-v" />
          <div className="cs-timeline">
            {t.phases.map(({ year, label, body }, phaseIndex) => (
              <div key={year} style={{ display: 'flex', gap: 20 }}>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: phaseIndex === t.phases.length - 1 ? 'var(--color-accent)' : year >= '2025' ? '#3D63E0' : '#001A5C', border: '4px solid #FFFFFF', boxShadow: `0 0 0 2px ${phaseIndex === t.phases.length - 1 ? 'var(--color-accent)' : year >= '2025' ? '#3D63E0' : '#001A5C'}`, flexShrink: 0 }} />
                </div>
                <div style={{ paddingBottom: 32 }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#12141F', marginBottom: 4 }}>{year}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#001A5C', marginBottom: 14 }}>{label}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: '#5A5F73', margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ ...SW, paddingTop: 0 }}>
        <h2 style={H2}>{t.iaTitle}</h2>
        <div className="table-scroll">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                {t.iaColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.iaSections.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < t.iaSections.length - 1 ? '1px solid #F2F6FF' : undefined }}>
                  <td data-label={t.iaColumns[0]} style={{ padding: '10px 12px', color: '#12141F', fontWeight: 600 }}>{row.section}</td>
                  <td data-label={t.iaColumns[1]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.contents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ ...SW, paddingTop: 0 }}>
        <h2 style={H2}>{t.personasTitle}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {t.personaGroups.map(({ label, title, body }) => (
            <div key={label} style={{ padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(20,30,60,0.1)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{title}</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...SW, paddingTop: 0 }}>
        <h2 style={H2}>{t.flowsTitle}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {t.userFlows.map(({ steps, note }) => (
            <div key={steps[0]}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const, marginBottom: 14 }}>
                {steps.map((step, i) => (
                  <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ padding: '11px 16px', borderRadius: 10, background: i === steps.length - 1 ? '#3E5C8A' : '#5C7AAE', color: '#FFFFFF', fontSize: 13, fontWeight: 600 }}>{step}</div>
                    {i < steps.length - 1 && <span style={{ color: '#3D63E0', fontSize: 16 }}>→</span>}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DESIGN SYSTEM AS INFRASTRUCTURE */}
      <div style={S}>
        <h2 style={H2}>{t.dsTitle}</h2>
        <Body>{t.dsBody}</Body>

        <DarkBox label={t.transitionLabel}>
          {t.transitionBox.map((p, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.75, margin: i === t.transitionBox.length - 1 ? 0 : '0 0 16px' }}>{p}</p>
          ))}
        </DarkBox>
      </div>

      {/* FINAL ECOSYSTEM */}
      <div style={SW}>
        <h2 style={H2}>{t.ecosystemTitle}</h2>
        <div className="rg-3" style={{ gap: 14 }}>
          {t.ecosystem.map(name => (
            <div key={name} style={{ padding: '18px 20px', borderRadius: 14, background: '#F8FAFF', border: '1px solid #EAF1FF', fontSize: 13.5, fontWeight: 600, color: '#12141F' }}>{name}</div>
          ))}
        </div>
      </div>

      {/* 09 VALIDATION */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>{t.validationLabel}</div>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 32px' }}>{t.validationIntro}</p>

        <div className="table-scroll" style={{ marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                {t.validationColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.validationRows.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < t.validationRows.length - 1 ? '1px solid #F2F6FF' : undefined }}>
                  <td data-label={t.validationColumns[0]} style={{ padding: '10px 12px', color: '#12141F', fontWeight: 600 }}>{row.flow}</td>
                  <td data-label={t.validationColumns[1]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.category}</td>
                  <td data-label={t.validationColumns[2]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.win}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: 0 }}>{t.validationClosing}</p>
      </div>

      {/* 10 IMPACT */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>{t.impactLabel}</div>

        <div className="rg-impact" style={{ marginBottom: 40 }}>
          {t.impactGroups.map(({ label, bg, items }) => (
            <div key={label} style={{ padding: 28, background: bg }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#8FAEFF', marginBottom: 14 }}>{label}</div>
              {items.map((item, i) => (
                <p key={i} style={{ fontSize: 13.5, lineHeight: 1.6, color: '#F4F1EA', margin: i < items.length - 1 ? '0 0 10px' : 0 }}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 11 REFLECTION */}
      <div style={S}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>{t.reflectionLabel}</div>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 16px' }}><strong style={{ color: '#12141F' }}>{t.reflectionWorkedLabel}</strong> {t.reflectionWorked}</p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 16px' }}><strong style={{ color: '#12141F' }}>{t.reflectionImproveLabel}</strong> {t.reflectionImprove}</p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: 0 }}><strong style={{ color: '#12141F' }}>{t.reflectionLearnedLabel}</strong> {t.reflectionLearned}</p>
      </div>
    </CaseStudyShell>
  )
}
