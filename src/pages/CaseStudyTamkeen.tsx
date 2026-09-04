import CaseStudyShell, { Body, DarkBox } from '../components/CaseStudyShell'
import { Link } from 'react-router-dom'

const S = { padding: '0 20px 64px', maxWidth: 760, margin: '0 auto' } as const
const SW = { padding: '0 20px 64px', maxWidth: 900, margin: '0 auto' } as const
const H2 = { fontSize: 'clamp(20px,3vw,26px)' as const, fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 20px' }

const researchColumns = ['Finding', 'Design decision it drove']
const iaColumns = ['Section', 'What it contains']
const validationColumns = ['Flow', 'Category', 'Quick win']

const contextCards = [
  { title: 'Business Goals', body: 'Replace a fully manual funding process with a unified digital lifecycle; support a national digital-first mandate; build a platform capable of absorbing new programmes without rebuilding it each time.' },
  { title: 'Users', body: '5 external personas (Individual, Enterprise, Vendor, Training Provider, Bank) and 15 internal roles across 5 functional groups (Assessment, Customer Service, Disbursement, Monitoring, Data Monitoring).' },
  { title: 'Stakeholders', body: 'Internal Fund departments, banking partners, training providers, vendors.' },
  { title: 'Constraints', body: 'Built on OutSystems (low-code); bilingual English/Arabic with RTL layout, light/dark mode; three distinct support types (P&S, Training and Wages), each with its own eligibility, claim and amendment rules.' },
  { title: 'Risks', body: "Compliance and financial-data handling across banking integrations; fraud — the platform's IA includes a dedicated Violations and Frauds flow for this reason." },
]

const challengeCards = [
  'A single application had to support three different support types — P&S, Training and Wages — each with its own claim, payment and amendment rules, inside one Application Detail (360) record.',
  'Money moved through three distinct actors — applicant, vendor and bank — so Payment & Claims had to model Claim a Payment, Pay to a Vendor and Delivery Confirmation as separate but connected flows, not one generic "payment" screen.',
  'Internal review wasn\'t a single approval chain: five functional groups each needed a different working view of the same case (eligibility for Assessment, disbursement for Disbursement, ongoing compliance for Monitoring and Data Monitoring, applicant queries for Customer Service).',
  'Many users held multiple identities at once — a single person could apply as an Individual while also managing funding applications for one or more companies.',
]

const researchTracks = [
  { n: '1', title: 'Year 1 (2023) Foundational Discovery', body: 'Mapping the email-and-in-person lifecycle end to end, then defining personas by profile type (external) and case-handling responsibility (internal) rather than by department.' },
  { n: '2', title: 'End-of-Year Scoping Interviews', body: 'Internal (Fund staff) and external (applicants and partners), run near the close of each year to surface what to improve or add before the next year\'s project is scoped.' },
  { n: '3', title: 'Intra-Year Retrospective Workshops', body: 'A structured 6-step method (define flow, walkthrough, identify pain points, group, vote, convert to action points) run per flow, with ~20 cross-functional participants — one full cycle documented on 20 May 2024 (see Validation).' },
]

const researchFindings = [
  { finding: '"Assigning applications is inefficient due to the lack of a direct assignment option to specific internal users" (top-voted, 2024)', decision: 'Reconstructed the internal model around a Relationship Manager role responsible for case assignment, distinct from Assessor and Approver.' },
  { finding: '"Hard for the customer to know what other stages the application will go through" (6/7 votes, 2024)', decision: 'Application Detail (360) design principle: one always-visible status tracker per application, plus a first-login guided tutorial.' },
  { finding: '"Unclear error messages" / "system doesn\'t direct the customer back to the specific incomplete field" (2024)', decision: 'Design principle: define clear, specific validation messages on Application forms instead of generic ones.' },
  { finding: 'No digital channel existed at all pre-2023', decision: 'Core IA decision to unify Application, Payment & Claims, Approved Support and Processes under a single Application Detail (360) record shared by applicant and reviewer.' },
]

const insights = [
  { n: '01', title: 'Visibility mattered more than speed', body: "Applicants didn't primarily need a faster process; they needed to stop being in the dark. The single highest-voted Guidance pain point in 2024 (6/7 votes) was that customers couldn't tell what stage their application would go through next. This is why the status tracker and first-login guided tutorial became core design principles, not optional polish." },
  { n: '02', title: 'Assigning work needs to be explicit', body: 'The single highest-voted pain point across the entire 2024 review (7/7 votes) was that applications had no direct assignment option to a specific internal user. This is the clearest evidence in the whole engagement that operational efficiency and customer experience are the same problem: an unassigned application is a delayed applicant.' },
  { n: '03', title: "Internal review isn't one queue, it's five different lenses on the same case", body: "Assessment, Disbursement, Customer Service, Monitoring and Data Monitoring each needed a different working view of an identical Application Detail (360) record. That's the direct reason the internal model ended up as 5 functional groups and 15 named roles instead of one generic 'back office' team.", wide: true },
]

const quickWins = [
  'Showing an individual\'s own programmes before enterprise ones',
  'A first-login guided tutorial and visual timeline for payments/IBAN',
  'Clear, specific form validation messages instead of generic errors',
  'A dashboard for quick review of pending rejections and approvals',
  'Accepting an application directly from a notification hyperlink',
  'A required reason whenever an application is sent back',
  'A tutorial for creating an e-bill vs. non-e-bill payment',
  'Cancelling a pending e-bill payment code and generating a new one',
  'Paying multiple vendors within a single e-bill transaction',
]

const designPrinciples = [
  ['Guide instead of instruct', 'surface eligibility rules inside the form itself, not in a separate document.'],
  ['Design for transparency', 'one always-visible status tracker per application, replacing silence with a specific stage.'],
  ['One 360 application record', 'shared by applicant and reviewer, so status, documents and history never diverge between the two platforms.'],
  ['Payment and claims unified', 'into a single area instead of separate menus for claiming, paying a vendor, and confirming delivery.'],
  ['Amendments handled', 'against the existing Approved Support item rather than as a new application.'],
  ['Profile type as the single mechanism', "that scopes what a user sees, instead of separate portals per profile."],
  ['Internal roles grouped by function', 'rather than by a single generic approval hierarchy.'],
  ['Design one ecosystem', 'every persona has a distinct workflow, but the product should feel like a single coherent platform.'],
]

const phases = [
  { year: '2023', label: 'Foundation', body: 'Replace manual processes with a unified digital platform. Delivered the full External Platform (Individual, Enterprise, Vendor, Training Provider, Bank), eligibility assessment, funding applications, internal assessment and approval workflows, payment requests, reimbursements, IBAN management, and the Internal Operations Platform.' },
  { year: '2024', label: 'Platform Expansion', body: 'Grow the ecosystem and reduce operational complexity. Delivered the Job Centre persona, a Customer 360 view, multi-persona profiles, a Programme Recommendation experience, an Applications Dashboard, site-visit management, and early AI-assisted document/compliance checks. Also the quick-wins cycle documented in Validation.' },
  { year: '2025', label: 'Omnichannel Experience', body: 'Increase engagement through mobile. Delivered NEOT — a native mobile companion app covering application tracking, notifications, reimbursement status, monitoring requests and profile management.' },
  { year: '2026', label: 'Intelligence & Personalisation (current)', body: 'Personalised onboarding, dynamic profile completion, an AI operational agent, AI-assisted monitoring and compliance intelligence, and executive business-intelligence dashboards.' },
]

const iaSections = [
  { section: '0. Access', contents: 'Registration, Login, Forgot password, Account recovery (manual, Face ID, e-Key)' },
  { section: '1. Homepage → Application Detail (360)', contents: 'Applications List → Application Detail (360), branching into Application Details, Approval Letter, Notifications, Payment & Claims, Approved Support, Processes, Manage my Application, Special Conditions' },
  { section: '2. Programs', contents: 'Programs List → Program Detail → Customer Application flow' },
  { section: '3. Management', contents: 'IBAN Management, User Management' },
  { section: '4. My Documents', contents: 'Document repository for the profile' },
  { section: '5. Profile', contents: 'Profile Type (Individual, Enterprise, Vendor, Training Provider, Bank), My Account' },
  { section: '6. Add CR / License', contents: 'Associate Profile' },
  { section: '7. Notifications', contents: 'Platform-wide notification center' },
]

const userFlows = [
  { steps: ['Eligibility', 'Application', 'Internal Review', 'Approval', 'Reimbursement', 'Monitoring'], note: "The core end-to-end journey, now living as one Application Detail (360) both applicant and reviewer share." },
  { steps: ['Claim a Payment', 'Pay to a Vendor', 'Delivery Confirmation'], note: 'Three connected flows because money moves through three actors, closing the loop before funds move.' },
  { steps: ['Vendor Purchase', 'Invoice Submission', 'Payment Request'], note: 'Gives Vendor persona users a direct channel into the process.' },
  { steps: ['Job Centre', 'Candidate Referral', 'Enterprise Placement'], note: 'Connects candidate referrals to Fund-funded roles.' },
]

const validationRows = [
  { flow: 'Customer Application', category: 'User type & permissions', win: "Show an individual's own programmes first; surface enterprise programmes only after switching profile" },
  { flow: 'Customer Application', category: 'Guidance', win: 'First-login animated tutorial + visual timeline for payments/IBAN/withdrawals' },
  { flow: 'Customer Application', category: 'Application forms', win: 'Replace unclear validation messages with defined, specific error messages' },
  { flow: 'Assessment & Approval', category: 'Dashboard', win: 'Quick review of pending rejections, approvals, or a specific certificate type' },
  { flow: 'Assessment & Approval', category: 'Customer view', win: 'Accept an approved application directly from a notification hyperlink' },
  { flow: 'Assessment & Approval', category: 'Remarks & send back', win: 'Require a specific reason whenever an application is sent back' },
  { flow: 'E-Bill Payments', category: 'Guidance', win: 'Short tutorial on e-bill vs. non-e-bill payment' },
  { flow: 'E-Bill Payments', category: 'Cancel payment code', win: 'Cancel a pending code and generate a new one' },
  { flow: 'E-Bill Payments', category: 'Multiple vendors payment', win: 'Pay multiple vendors within a single transaction' },
]

const ecosystem = [
  'Individual Portal', 'Enterprise Portal', 'Training Provider Portal',
  'Vendor Portal', 'Banking Portal', 'Job Centre Portal',
  'Internal Operations Platform', 'NEOT Mobile Application (2025)', 'AI-Assisted Operational Services (2026, current)',
]

export default function CaseStudyTamkeen() {
  return (
    <CaseStudyShell
      eyebrow="Case Study · 01 Overview"
      title="National Workforce Digital Platform"
      description="Designing a national workforce-development ecosystem — from a manual, email-and-in-person process to a unified digital platform for citizens, businesses and government, across four years of continuous evolution."
      meta={[
        { label: 'Role', value: 'UX/UI Designer (2023, on kickoff) → Senior UX/UI Designer & Design Lead (2024–present)' },
        { label: 'Client', value: 'National workforce-development fund (Government / Employment & Economic Development)' },
        { label: 'Timeline', value: 'January 2023 – Present (3.5+ years), across 4 annual phases: 2023 Foundation, 2024 Platform Expansion, 2025 Omnichannel, 2026 Intelligence & Personalisation (current)' },
        { label: 'Platform', value: 'OutSystems (low-code) — External Platform + Internal Operations Platform, plus a native mobile companion (NEOT) introduced in the 2025 phase' },
        { label: 'Team (peak)', value: '1 Design Lead · 2 UX/UI Designers · 2 Business Analysts · 1 PM · 1 Solution Architect · 5 OutSystems Developers · 1 QA Lead' },
        { label: 'Deliverable', value: 'Unified digital ecosystem serving 5 external and 15 internal user roles across four annual delivery phases', span: true },
      ]}
      stats={[
        { value: '5', label: 'external user roles served' },
        { value: '15', label: 'internal user roles' },
        { value: '4', label: 'annual delivery phases' },
      ]}
    >
      {/* 02 CONTEXT */}
      <div style={{ ...SW, paddingTop: 48 }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>02 Context</div>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 20px' }}>The Fund is a national labour fund, funding skills, employment and enterprise-growth programmes for eligible individuals and private-sector companies. Before 2023, none of that ran through a portal — applications, documents, approvals, payment claims and status updates were handled entirely through email correspondence and in-person visits. There was no self-service channel and no shared case record between an applicant and the Fund.</p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 32px' }}>A national Digital Government Strategy and a parallel digital-economy sector strategy set a "digital-first" mandate to rebuild public and semi-governmental services around digital delivery. This platform is the Fund's answer to that mandate: not a single portal, but a scalable digital product built and grown across four annual phases.</p>

        <div className="rg-2" style={{ gap: 20 }}>
          {contextCards.map(({ title, body }, i) => (
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
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>03 The Challenge</div>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 20px' }}>There was no existing portal to learn from or migrate off — the challenge was designing a self-service digital case lifecycle to replace a process that had only ever existed as email threads and in-person conversations, without losing the flexibility a human caseworker had offered informally.</p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 32px' }}>The scale of what had to be built from scratch: one External Platform spanning 7 top-level sections and 5 distinct applicant/partner personas, feeding into one Internal Platform of 15 named roles spread across 5 functional groups.</p>
        <div className="rg-2">
          {challengeCards.map((text, i) => (
            <div key={i} style={{ padding: '20px 24px', borderRadius: 16, background: '#F2F6FF' }}>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#3A3F4C', margin: 0 }} dangerouslySetInnerHTML={{ __html: text.replace(/P&S, Training and Wages|three distinct actors — applicant, vendor and bank|five functional groups|multiple identities at once/g, m => `<strong style="color:#12141F">${m}</strong>`) }} />
            </div>
          ))}
        </div>
      </div>

      {/* 04 DISCOVERY */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>04 Discovery &amp; Research</div>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 32px' }}>Before designing a single interface, the goal was to understand how funding programmes actually operated end to end — across applicants, internal teams and partner organisations — since no digital version of that process existed to audit.</p>

        <div className="rg-3" style={{ marginBottom: 36 }}>
          {researchTracks.map(({ n, title, body }) => (
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
                {researchColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {researchFindings.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < researchFindings.length - 1 ? '1px solid #F2F6FF' : undefined }}>
                  <td data-label={researchColumns[0]} style={{ padding: '10px 12px', color: '#12141F', fontStyle: 'italic' }}>{row.finding}</td>
                  <td data-label={researchColumns[1]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 05 KEY INSIGHTS */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 24 }}>05 Key Insights</div>
        <div className="rg-2" style={{ gap: 20 }}>
          {insights.map(({ n, title, body, wide }) => (
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
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>06 Workshop &amp; Prioritisation</div>
        <h2 style={H2}>Aligning teams around the highest-impact opportunities</h2>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 20px', maxWidth: 760 }}>Following the discovery phase, we facilitated client retrospective workshops with Product Owners, BA leads, QA leads and UX/UI leads to translate research into a prioritised action plan — one workshop per flow, run across Customer Application, Assessment &amp; Approval, and E-Bill Payments, with roughly 20 cross-functional participants per session.</p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 32px', maxWidth: 760 }}>Rather than redesigning the experience immediately, the objective was to build shared understanding, align priorities across teams, and identify improvements capable of delivering measurable value in the shortest time.</p>

        <div style={{ padding: 24, borderRadius: 18, background: '#F2F6FF', marginBottom: 32, maxWidth: 760 }}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: '#001A5C', marginBottom: 8 }}>Process</div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#3A3F4C', margin: 0 }}>Each session ran the same six-step method: check in on the flow to analyse → walk through it as a group → identify pain points individually → group them into categories → vote (6 votes per participant) → convert the top-voted pain points into action points.</p>
        </div>

        <div style={{ fontSize: 16, fontWeight: 700, color: '#12141F', marginBottom: 16 }}>Quick Wins Identified — nine action points prioritised for early delivery</div>
        <div className="rg-3" style={{ gap: 14, marginBottom: 36 }}>
          {quickWins.map((win, i) => (
            <div key={i} style={{ padding: '16px 18px', borderRadius: 14, background: '#F8FAFF', border: '1px solid #EAF1FF', fontSize: 13.5, lineHeight: 1.55, color: '#3A3F4C' }}>{win}</div>
          ))}
        </div>

        <div style={{ maxWidth: 760, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: '#001A5C', marginBottom: 6 }}>My Role — Senior UX/UI Designer &amp; Design Lead (from 2024)</div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>Planned and facilitated the workshops, synthesised pain points into prioritised categories, guided the voting-based prioritisation, and translated the output into the following year's roadmap.</p>
        </div>

        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto', padding: '24px 0' }}>
          <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 44, lineHeight: 1, color: '#001A5C', opacity: 0.35, marginBottom: 8 }}>"</div>
          <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: 'italic', fontSize: 24, lineHeight: 1.45, color: '#2A2F3A', margin: 0 }}>Research uncovered the problems. The workshop created alignment. Prioritisation transformed insights into an actionable roadmap that guided both immediate improvements and the long-term evolution of the product.</p>
        </div>
      </div>

      {/* 07 DESIGN PRINCIPLES */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>07 Design Principles</div>
        <div className="rg-2">
          {designPrinciples.map(([label, text]) => (
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
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>08 Solution</div>
        <h2 style={H2}>Product Strategy — Four Annual Phases</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 48px', maxWidth: 720 }}>The platform evolved through four strategic phases, each a separately scoped annual project.</p>

        <div style={{ position: 'relative' }}>
          <div className="cs-timeline-line" />
          <div className="cs-timeline-line-v" />
          <div className="cs-timeline">
            {phases.map(({ year, label, body }) => (
              <div key={year} style={{ display: 'flex', gap: 20 }}>
                {/* dot — shown on mobile as left-side marker, on desktop sits at top */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: year >= '2025' ? '#3D63E0' : '#001A5C', border: '4px solid #FFFFFF', boxShadow: `0 0 0 2px ${year >= '2025' ? '#3D63E0' : '#001A5C'}`, flexShrink: 0 }} />
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
        <h2 style={H2}>Information Architecture — External Platform (7 Sections)</h2>
        <div className="table-scroll">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                {iaColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {iaSections.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < iaSections.length - 1 ? '1px solid #F2F6FF' : undefined }}>
                  <td data-label={iaColumns[0]} style={{ padding: '10px 12px', color: '#12141F', fontWeight: 600 }}>{row.section}</td>
                  <td data-label={iaColumns[1]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.contents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ ...SW, paddingTop: 0 }}>
        <h2 style={H2}>External Personas &amp; Internal Roles</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { label: 'External · 5 personas', title: 'Individual, Enterprise, Vendor, Training Provider, Bank', body: 'Bank: a banking partner mapping its own financial-credit customers against applications where the Fund acts as sponsor.' },
            { label: 'Internal · 15 roles, 5 functional groups', title: 'Assessment, Customer Service, Disbursement, Monitoring, Data Monitoring', body: 'Assessment (Relationship Manager, Assessor, Approver), Customer Service (Customer Service Agent), Disbursement (Disbursement Agent ×5), Monitoring (Monitoring Agent ×3), Data Monitoring (Data Monitoring Agent ×3).' },
          ].map(({ label, title, body }) => (
            <div key={label} style={{ padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(20,30,60,0.1)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{title}</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...SW, paddingTop: 0 }}>
        <h2 style={H2}>User Flows</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {userFlows.map(({ steps, note }) => (
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
        <h2 style={H2}>Design System as Infrastructure</h2>
        <Body>From year one, the design team built and maintained a component library in Figma — initially for internal consistency, later extended to OutSystems-ready components that developers could implement directly. By Phase 2, the component library covered 90+ components across light and dark themes, with Arabic RTL variants for every pattern introduced in Phase 3.</Body>

        <DarkBox label="Design Lead Transition — 2024">
          <p style={{ fontSize: 16, lineHeight: 1.75, margin: '0 0 16px' }}>Taking the Design Lead role in 2024 meant moving from delivery to governance: running weekly design reviews, establishing a decision log for every significant UX decision (rationale, alternatives considered, who approved), and mentoring a junior designer joining the engagement mid-programme.</p>
          <p style={{ fontSize: 16, lineHeight: 1.75, margin: 0 }}>The most significant structural change: implementing a shared definition of "design done" — a checklist covering accessibility, RTL, dark mode, error states, and empty states — that every screen had to pass before entering development. It added two days to design cycles and eliminated an entire category of late-stage development rework.</p>
        </DarkBox>
      </div>

      {/* FINAL ECOSYSTEM */}
      <div style={SW}>
        <h2 style={H2}>Final Solution — Today's Ecosystem</h2>
        <div className="rg-3" style={{ gap: 14 }}>
          {ecosystem.map(name => (
            <div key={name} style={{ padding: '18px 20px', borderRadius: 14, background: '#F8FAFF', border: '1px solid #EAF1FF', fontSize: 13.5, fontWeight: 600, color: '#12141F' }}>{name}</div>
          ))}
        </div>
      </div>

      {/* 09 VALIDATION */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>09 Validation &amp; Continuous Product Iteration</div>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 32px' }}>Validation ran as a continuous activity, not a single usability-testing pass. Every year has included a recurring cycle of client retrospective workshops, run specifically to identify and implement quick wins. One full cycle is documented in a dated internal deliverable ("UX Monitoring," the Fund, 20 May 2024) reviewing three flows: Customer Application, Assessment &amp; Approval, and E-Bill Payments.</p>

        <div className="table-scroll" style={{ marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                {validationColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {validationRows.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < validationRows.length - 1 ? '1px solid #F2F6FF' : undefined }}>
                  <td data-label={validationColumns[0]} style={{ padding: '10px 12px', color: '#12141F', fontWeight: 600 }}>{row.flow}</td>
                  <td data-label={validationColumns[1]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.category}</td>
                  <td data-label={validationColumns[2]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.win}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: 0 }}>Beyond this documented cycle: across the 3.5-year engagement, most of these nine quick wins shipped, along with a larger set of further quick wins from other workshop cycles.</p>
      </div>

      {/* 10 IMPACT */}
      <div style={SW}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>10 Impact</div>

        <div className="rg-impact" style={{ marginBottom: 40 }}>
          {[
            { label: 'Business Impact', bg: '#12141F', items: ['Created a unified national digital platform for workforce development, replacing a fully manual, email-and-in-person process.', 'Established a scalable product architecture that absorbed 4 major expansions (Job Centre, NEOT mobile, AI services, BI dashboards) without a ground-up rebuild.', 'Reduced dependency on manual operational processes across Assessment, Disbursement and Monitoring.'] },
            { label: 'User Impact', bg: '#3A5A99', items: ['Simplified funding journeys for 5 external personas through one shared Application Detail (360) record.', 'Improved transparency at every application stage via the status-tracker design principle.', 'Reduced administrative effort through integrated, unified reimbursement workflows.', 'Extended access through NEOT, a dedicated mobile experience (2025).'] },
            { label: 'Team Impact', bg: '#2A4CB8', items: ['A shared design system reduced implementation effort and kept 5 external and 15 internal experiences visually and behaviourally consistent across 4 annual releases.', 'A repeatable annual delivery model let the team plan a year at a time instead of one continuous, undifferentiated backlog.'] },
          ].map(({ label, bg, items }) => (
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
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#001A5C', marginBottom: 16 }}>11 Reflection</div>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 16px' }}><strong style={{ color: '#12141F' }}>What worked:</strong> treating funding programmes as connected service ecosystems, not isolated forms, meant every design decision considered the applicant, the internal reviewer, and the partner organisations sharing the same journey.</p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 16px' }}><strong style={{ color: '#12141F' }}>{"What I'd improve:"}</strong> Year 1's original 2023 research isn't documented with the same granularity as the 2024 workshop cycle — a consistent research-logging practice from day one would make every later case-study retelling stronger.</p>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: 0 }}><strong style={{ color: '#12141F' }}>What I learned:</strong> government platforms succeed as service ecosystems, not collections of digital forms. Designing for evolution — building each release so the next one extends it rather than replacing it — mattered more over a 4-year engagement than getting any single release perfect. Leading the product across multiple phases also reinforced that operational efficiency and customer experience are frequently the same problem seen from two sides, not competing priorities to trade off.</p>
      </div>
    </CaseStudyShell>
  )
}
