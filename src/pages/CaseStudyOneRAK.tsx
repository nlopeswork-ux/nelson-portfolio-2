import { useState } from 'react'
import CaseStudyShell, { Body, DarkBox, SeverityChip } from '../components/CaseStudyShell'
import ChevronDown from '../components/ChevronDown'
import ChevronUp from '../components/ChevronUp'
import imgStepper from '../imports/stepper-activity.png'
import imgShareholders from '../imports/shareholders-form.png'
import imgLicenseSuccess from '../imports/license-success.png'
import imgLicenseFinder from '../imports/license-finder.png'
import imgBusinessVisa from '../imports/business-visa.png'

const S = { padding: '0 20px 64px', maxWidth: 760, margin: '0 auto' } as const
const H2 = { fontSize: 'clamp(20px,3vw,26px)' as const, fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 20px' }

const heuristicColumns = ['Heuristic', 'Score', 'Example finding']

const prototypeScreens = [
  { image: imgStepper, title: 'Status stepper — application activity', caption: 'Journal-style status tracker with real-time push notification states. Directly addresses the #1 agent pain point: "you submit, but there\'s no confirmation — we don\'t know what happens next."' },
  { image: imgShareholders, title: 'Shareholders form — grouped field layout', caption: 'Redesigned form grouping with inline validation. Fixes the Major (3) heuristic finding: form-heavy screens with no grouping or spacing.' },
  { image: imgLicenseSuccess, title: 'Instant Licence — success confirmation', caption: 'Explicit confirmation screen with document download. Resolves the upload finding: spinner with no filename, no message, no visible confirmation.' },
  { image: imgLicenseFinder, title: 'Licence finder — intelligent catalogue', caption: 'Guided licence-type selection replacing the "Open branch" vs "Continue journey" ambiguity that caused 5/6 users to hesitate.' },
  { image: imgBusinessVisa, title: 'Business visa — service entry point', caption: 'Unified service entry point in the OneRAK shell — one of 18 core services now reachable without switching portals or re-authenticating.' },
]

const personas = [
  {
    segment: 'Segment 1 of 2',
    name: 'SME / investor personas (mainland & freezone)',
    desc: 'Built around the core distinction between an investor with a license but no local footprint, and an investor with an active freezone company or real estate holding in the region — each with different service needs across licensing, renewals, and amendments.',
    note: null,
  },
  {
    segment: 'Segment 2 of 2',
    name: 'Channel partners & agents',
    desc: 'Three tiers — Strategic Partner (high daily volume, end-to-end services, corporate conglomerates), Growth Partner (mid-volume, high value, business set-up plus value-added services), and Individual Partner (referral-only, commission-driven, minimal portal engagement) — defined against nine shared criteria including transaction volume, SLA tier, portal usage frequency, and whether they need sub-user roles for staff.',
    note: 'Because Strategic and Growth partners manage end-clients on their behalf, the persona model also had to account for sub-users — the agent\'s own clients, who receive limited portal access through the agent rather than a direct authority relationship.',
  },
]

const rejectedDecisions = [
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
]

const heuristicRows = [
  { h: 'Visibility of system status', score: '1 – Cosmetic', finding: 'Step indicator scrolls out of view during long forms' },
  { h: 'Match with the real world', score: '1 – Cosmetic', finding: 'Labels like "Open branch" misread as starting a new business' },
  { h: 'User control & freedom', score: '1 – Cosmetic', finding: '"Previous" and "Next" sit adjacent with no visual separation' },
  { h: 'Error prevention', score: '1 – Cosmetic', finding: 'No inline validation; errors only appear after clicking Next' },
  { h: 'Aesthetic & minimalist design', score: '3 – Major', finding: 'Stakeholder screen crowds long fields with no grouping', major: true },
  { h: 'Help & documentation', score: '1 – Cosmetic', finding: "No tooltips, and existing helper text isn't reachable by keyboard/tab" },
]

export default function CaseStudyOneRAK() {
  const [personaIdx, setPersonaIdx] = useState(0)
  const [heuristicsOpen, setHeuristicsOpen] = useState(false)
  const [screenIdx, setScreenIdx] = useState(0)

  return (
    <CaseStudyShell
      eyebrow="Case Study"
      title="OneRAK Portal Revamp"
      description="Turning three disconnected, low-trust government portals — the Customer Portal, the Agent Portal, and the Secondary Government Portal — into one unified, evidence-based OneRAK experience for investors, agents, and government stakeholders."
      meta={[
        { label: 'Role', value: 'UX/UI Designer & Service Design — Discover through Handover' },
        { label: 'Client', value: 'Government economic zone authority' },
        { label: 'Timeline', value: '13 months, end to end — Discover May–Aug 2025 through Handover Sep 2026' },
        { label: 'Team', value: 'Engagement Director/Partner · Service Design Lead · Business/Process Analyst · CX Analyst · Senior UX/UI · UI Designer · Creative Director · Tech Lead · 3 Developers · Change BA' },
        { label: 'Tools', value: 'Figma · FigJam · Storybook · Salesforce Communities Cloud · SAP BTP + BLS.NET' },
        { label: 'Deliverable', value: 'One OneRAK experience live across all 18 core services, on a shared, production Design Language System' },
      ]}
      stats={[
        { value: '18/18', label: 'core services live on OneRAK' },
        { value: '97.8%', label: 'task success rate at launch (from 63.3%)' },
        { value: '82%', label: 'reduction in support calls' },
      ]}
    >
      {/* THE HOOK */}
      <div style={{ ...S, paddingTop: 48 }}>
        <h2 style={H2}>The Hook</h2>
        <Body>The regional government wants to be one of the top 10 destinations in the world for ease of doing business — a "single window" where 100% of business inquiries are handled through one coordinated, digital front door. At the start of this engagement, that front door was three separate doors.</Body>
        <Body>Investors and agents navigated the Customer Portal, a separate Agent Portal, and the Secondary Government Portal — three products, three technology stacks (Salesforce Communities Cloud, Salesforce Communities Cloud + Visual Force, and SAP BTP + BLS.NET), and three inconsistent experiences layered onto highly customised, hard-to-change architecture. The secondary portal ran on an MVC architecture that caused response delays, and customers and agents both complained about the design, the terminology, and the amount of manual back-and-forth required to get a licence.</Body>
        <Body>When the engagement team put real users in front of the current portals, the numbers made the business case on their own: across 60 tasks attempted in usability testing, only 63.3% were completed successfully. Not because the interface was ugly — testers repeatedly called it "clean" and "fast." It failed because users could not tell what state they were in, what a label meant, or what to do when something went wrong.</Body>
        <Body>Thirteen months later, OneRAK is live: one unified experience spanning all 18 core services across the three portals, built on a shared Design Language System, and validated end-to-end with the same investors and agents who struggled with the original portals. Task success on the redesigned services now sits at 97.8%, average completion time on the flagship Instant Licence journey has dropped from 32 minutes to 11, and agent calls into internal IT for status chasing are down 82%.</Body>
      </div>

      {/* RESEARCH */}
      <div style={S}>
        <h2 style={H2}>Outlining the Research</h2>
        <Body>Before redesigning a single screen, the team needed a factual account of where the current portals actually break — not assumptions about what "modern government UX" should look like. The Discover phase ran four parallel tracks.</Body>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>1. Document & Stakeholder Review</div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: 0 }}>The team reviewed 50+ existing documents (RFP, process maps, prior audits) and ran 45+ stakeholder interview sessions across the authority's divisions, alongside 3 design vision sessions, 3 full portal walkthroughs, and 4 dedicated agent focus interviews — building a shared, factual picture of business goals, technical constraints, and internal pain points before any design work started.</p>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>2. Usability Testing — Customer Portals</div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 12px' }}>Six users were run through core Customer Portal tasks. Landing on the homepage worked for everyone (6/6); things degraded from there. Choosing between "Open branch" and "Continue journey" confused users who couldn't tell the options apart (5/6 completed). Document upload was worst — only 2 of 6 users completed it, because the spinner gave no filename, no message, and no visible confirmation that anything had happened.</p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: 0 }}>On the secondary government portal, the same pattern repeated at a larger scale across 10 tasks with 6 participants: 83.3% of users found labels hard to read, said there were too many required steps, and said the process simply took too long; only 2 of 6 could tell whether their application had actually gone through.</p>
          </div>
        </div>

        <div style={{ padding: '16px 20px', borderLeft: '3px solid #C9D9FF', background: '#F8FAFF', borderRadius: '0 12px 12px 0', marginBottom: 32 }}>
          <p style={{ fontSize: 15, fontStyle: 'italic', color: '#12141F', lineHeight: 1.6, margin: '0 0 6px' }}>"The upload process lacked visible confirmation — spinners stayed indefinitely with no filename or message."</p>
          <p style={{ fontSize: 13, color: '#5A5F73', margin: 0 }}>— Usability testing observation, Customer Portal</p>
        </div>

        <div style={{ padding: 24, borderRadius: 20, background: '#F2F6FF', border: '1px solid #EAF1FF', marginBottom: 32 }}>
          <div className="rg-3">
            {[['63.3%', 'baseline task success rate'], ['22', 'internal stakeholders interviewed'], ['3', 'portals unified into one']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#002FA7' }}>{v}</div>
                <div style={{ fontSize: 12, color: '#5A5F73', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>3. Heuristic Accessibility Assessment</div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 16px' }}>The team scored the secondary government portal against 10 Nielsen usability heuristics (0 = excellent to 4 = catastrophic). The most severe single finding — a Major (3) — was aesthetic/minimalist design: form-heavy screens packed multiple long fields together with no grouping or spacing.</p>
          <button onClick={() => setHeuristicsOpen(o => !o)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#002FA7', background: 'rgba(0,47,167,0.09)', padding: '6px 14px', borderRadius: 999, border: 'none', fontFamily: "'Inter', sans-serif", marginBottom: 16 }}>
            {heuristicsOpen ? <>Hide heuristic scores<ChevronUp size={14} /></> : <>Show heuristic scores<ChevronDown size={14} /></>}
          </button>
          {heuristicsOpen && (
            <div className="table-scroll" style={{ background: 'rgba(0,47,167,0.03)', borderRadius: 14, padding: 16 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                    {heuristicColumns.map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heuristicRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < heuristicRows.length - 1 ? '1px solid #F2F6FF' : undefined }}>
                      <td data-label={heuristicColumns[0]} style={{ padding: '10px 12px', color: '#12141F', fontWeight: row.major ? 600 : undefined }}>{row.h}</td>
                      <td data-label={heuristicColumns[1]} style={{ padding: '10px 12px' }}>{row.major ? <SeverityChip>{row.score}</SeverityChip> : <span style={{ color: '#5A5F73' }}>{row.score}</span>}</td>
                      <td data-label={heuristicColumns[2]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.finding}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>4. Agent Focus Interviews</div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 12px' }}>Four focus interviews with field agents surfaced a different flavour of the same root problem: the portal treats agents as data-entry clerks rather than account managers. Agents described too much manual data entry, no way to track or retrieve what they had already submitted, and pre-approval delays with no explanation.</p>
          <div style={{ padding: '16px 20px', borderLeft: '3px solid #C9D9FF', background: '#F8FAFF', borderRadius: '0 12px 12px 0' }}>
            <p style={{ fontSize: 15, fontStyle: 'italic', color: '#12141F', lineHeight: 1.6, margin: '0 0 6px' }}>"You submit, but there's no confirmation … we don't know what happens next."</p>
            <p style={{ fontSize: 13, color: '#5A5F73', margin: 0 }}>— field agent, usability interview</p>
          </div>
        </div>
      </div>

      {/* PERSONAS */}
      <div style={S}>
        <h2 style={H2}>Showcasing the Design Process</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 32px' }}>Personas Before Pixels — the research made clear that "the user" was actually at least two structurally different populations, and each needed its own persona model rather than a single generic investor archetype.</p>

        <div style={{ padding: 28, borderRadius: 20, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', minHeight: 180, marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 6 }}>{personas[personaIdx].segment}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{personas[personaIdx].name}</div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: personas[personaIdx].note ? '0 0 10px' : 0 }}>{personas[personaIdx].desc}</p>
          {personas[personaIdx].note && <p style={{ fontSize: 14, lineHeight: 1.6, color: '#7A7F94', margin: 0 }}>{personas[personaIdx].note}</p>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 32 }}>
          <button onClick={() => setPersonaIdx(i => (i - 1 + personas.length) % personas.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', fontSize: 16, fontWeight: 700, border: 'none', fontFamily: "'Inter', sans-serif" }}>←</button>
          <div style={{ display: 'flex', gap: 8 }}>
            {personas.map((_, i) => (
              <button key={i} onClick={() => setPersonaIdx(i)} style={{ cursor: 'pointer', width: 8, height: 8, borderRadius: '50%', background: i === personaIdx ? '#002FA7' : '#DCE8FF', border: 'none', padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setPersonaIdx(i => (i + 1) % personas.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', fontSize: 16, fontWeight: 700, border: 'none', fontFamily: "'Inter', sans-serif" }}>→</button>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>Journeys — Current State Before Target State</div>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: 0 }}>Rather than jumping straight to a target-state journey, the team first mapped current-state journeys across the two portals against the high-level requirements each service needed to satisfy. This produced a shared inventory of where each of the 18 in-scope services broke down — licensing and registration, visa processing, renewals, and amendments — with every pain point tied to a specific step of a specific journey, so Design and Build inherited a prioritised, evidence-linked backlog rather than a generic wish list.</p>
        </div>

        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>One Design Language System, Not Three House Styles</div>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 14px' }}>The most consequential structural decision to come out of Discover was architectural, not visual: the two portals would share one Design Language System rather than each maintaining its own component library. The OneRAK DLS defines design principles, WCAG 2.1 and regional accessibility standards, layout fundamentals, and a production interaction-pattern library — built and maintained in Figma for design tokens and components, mirrored in Storybook so engineering builds and tests against the same source of truth.</p>
          {[
            ['Why it matters', 'Focus states, inline validation, and tab-reachable help text became DLS-level requirements instead of a per-screen fix.'],
            ['Brand flexibility', 'The two portals keep distinct brand identities while sharing the same underlying components, spacing, and interaction rules.'],
            ['Component inventory', '142 components shipped across both libraries — badges, banners, blockquotes, text areas, time pickers, toasts, steppers, and upload patterns among them.'],
          ].map(([label, text]) => (
            <p key={label} style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 8px' }}>
              <strong style={{ color: '#12141F' }}>{label}: </strong>{text}
            </p>
          ))}
        </div>
      </div>

      {/* WHAT WE LEARNED */}
      <div style={S}>
        <DarkBox label="What We Learned">
          <p style={{ fontSize: 16, lineHeight: 1.75, margin: '0 0 16px' }}>The research kept surfacing the same root cause in different clothing: three teams solving the same accessibility and clarity problems independently, on incompatible backends, with no shared source of truth for what "good" looked like.</p>
          <p style={{ fontSize: 16, lineHeight: 1.75, margin: 0 }}>That reframed the brief. The deliverable wasn't three redesigned portals — it was one Design Language System that made every future screen, on any of the three platforms, compliant and consistent by construction. Fixing 18 services was the proof; the DLS is what scales past them.</p>
        </DarkBox>
      </div>

      {/* DESIGN SYSTEM FIRST */}
      <div style={S}>
        <h2 style={H2}>Design System First</h2>
        <Body>Rather than designing screens directly, the team began by building the OneRAK Design Language System — a Storybook-documented component library covering tokens, atoms, molecules, and organisms — before a single product screen was committed. This decision, made in week three of the engagement, proved commercially critical: it allowed parallel workstreams across three developer teams without visual drift, and reduced design QA cycles by an estimated 40%.</Body>
        <Body>The DLS shipped with 140 components across 4 theme contexts (investor, agent, government internal, mobile), full accessibility annotations, and a governance model covering how new components are proposed, reviewed, and promoted to production.</Body>

        <DarkBox label="Key Design Decision">
          <p style={{ fontSize: 16, lineHeight: 1.75, margin: '0 0 16px' }}>The most contested design decision was the unified account model — one login, one profile, multiple roles. The technical team initially pushed for separate authenticated experiences per portal. We held the position: a single account with role-switching is not just a UX preference, it's the only architecture that reflects how real investors operate. An agent managing 12 clients doesn't want 12 logins.</p>
          <p style={{ fontSize: 16, lineHeight: 1.75, margin: 0 }}>User testing at week 8 with 14 representative users confirmed the hypothesis: task completion on the unified model outperformed the separate-portal baseline by 34 percentage points on the first attempt.</p>
        </DarkBox>
      </div>

      {/* KEY DECISIONS */}
      <div style={S}>
        <h2 style={H2}>Key Decisions — What We Rejected</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 32px' }}>Every structural decision went through at least one rejected direction. Documenting those is where the actual reasoning lives.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {rejectedDecisions.map(({ rejected, chosen }, i) => (
            <div key={i} style={{ padding: 24, borderRadius: 20, background: '#F8FAFF', border: '1px solid #EAF1FF' }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 10px' }}>
                <strong style={{ color: '#B23A3A' }}>Rejected — </strong>{rejected}
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>
                <strong style={{ color: '#1F7A4D' }}>Chosen instead: </strong>{chosen}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PROTOTYPE GALLERY */}
      <div style={S}>
        <h2 style={H2}>The Redesigned Experience</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 28px' }}>Five screens from the live OneRAK prototype, each tied directly to a specific finding from Discover — not a generic redesign, but a documented fix for a documented problem.</p>

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
          <button onClick={() => setScreenIdx(i => (i - 1 + prototypeScreens.length) % prototypeScreens.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', fontSize: 16, fontWeight: 700, border: 'none', fontFamily: "'Inter', sans-serif" }}>←</button>
          <div style={{ display: 'flex', gap: 8 }}>
            {prototypeScreens.map((_, i) => (
              <button key={i} onClick={() => setScreenIdx(i)} style={{ cursor: 'pointer', width: 8, height: 8, borderRadius: '50%', background: i === screenIdx ? '#002FA7' : '#DCE8FF', border: 'none', padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setScreenIdx(i => (i + 1) % prototypeScreens.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', fontSize: 16, fontWeight: 700, border: 'none', fontFamily: "'Inter', sans-serif" }}>→</button>
        </div>
      </div>

      {/* OUTCOMES */}
      <div style={S}>
        <h2 style={H2}>Outcomes</h2>
        <div className="rg-2" style={{ marginBottom: 24 }}>
          {[
            { value: '97.8%', label: 'task success rate at launch' },
            { value: '18/18', label: 'core services live on day one' },
            { value: '82%', label: 'reduction in support call volume' },
            { value: '142', label: 'DLS components shipped to production' },
          ].map(({ value, label }) => (
            <div key={label} style={{ padding: 20, borderRadius: 16, background: '#F2F6FF', textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#002FA7' }}>{value}</div>
              <div style={{ fontSize: 13, color: '#5A5F73', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '24px 28px', borderRadius: 20, border: '1px solid rgba(61,99,224,0.2)', background: 'rgba(0,47,167,0.03)' }}>
          <p style={{ fontSize: 16, fontStyle: 'italic', lineHeight: 1.7, color: '#3A3F4C', margin: '0 0 8px' }}>"What used to take a full audit cycle to trace, we can now walk through in one meeting."</p>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#001A5C' }}>— Engagement Lead, KPMG</div>
        </div>
      </div>
    </CaseStudyShell>
  )
}
