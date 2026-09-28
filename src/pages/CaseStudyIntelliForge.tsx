import { useState } from 'react'
import CaseStudyShell, { Body, DarkBox, SeverityChip } from '../components/CaseStudyShell'
import ChevronLeft from '../components/ChevronLeft'
import ChevronRight from '../components/ChevronRight'

const S = { padding: '0 20px 64px', maxWidth: 760, margin: '0 auto' } as const
const H2 = { fontSize: 'clamp(20px,3vw,26px)' as const, fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 20px' }

const auditColumns = ['Finding', 'Severity', 'Operational Impact']
const tabsColumns = ['Tab', 'Persona', 'Core Decision Served']
const kpiColumns = ['KPI', 'Baseline', 'Result / Target']

const personas = [
  {
    n: '1 of 3',
    name: 'The R2R Accountant',
    desc: 'The daily operator. Success: completing close on time with zero unresolved exceptions and a full audit trail. Frustration: discovering a close-blocking anomaly in the final hour, with no time to investigate.',
    implication: 'Design implication: a prioritised exception queue with enough context to act immediately — never a data dump.',
  },
  {
    n: '2 of 3',
    name: 'The Account Partner',
    desc: "The commercial lead for the expansion bid. Success: walking out with a signed letter of intent. Frustration: no visual, interactive proof point — only a spreadsheet projection any skeptic can dismiss.",
    implication: 'Design implication: operable by a non-technical partner, unassisted, in under three minutes, live in the room.',
  },
  {
    n: '3 of 3',
    name: 'The Client Regional Finance Manager',
    desc: "Accountable for audit defensibility. Success: reproducing any posted journal back to its source in under three minutes. Frustration: today's paper trail spans three spreadsheets and two email threads.",
    implication: 'Design implication: a journal-anchored navigator, with every governing rule shown inline as a human-readable citation.',
  },
]

const tabs = [
  { tab: 'Command Center', persona: 'R2R Accountant', decision: 'Is the close on track?' },
  { tab: 'Submission Ingestion', persona: 'R2R Accountant', decision: 'Have all 200 franchises submitted valid files?' },
  { tab: 'GL Mapping Workbench', persona: 'R2R Accountant', decision: 'Which mapped accounts need human review?' },
  { tab: 'Exception Workbench', persona: 'R2R Accountant', decision: 'Which anomalies will delay close?' },
  { tab: 'Journal Review', persona: 'R2R Accountant', decision: 'Which proposed journals are ready to approve?' },
  { tab: 'Simulation Mode', persona: 'Account Partner', decision: 'What does cost look like at 2,000 franchises?' },
  { tab: 'Audit & Trace', persona: 'Client Finance Manager', decision: 'Where did this journal entry come from?' },
]

const auditFindings = [
  { finding: 'KPIs carry no anomaly alerting', severity: 'Critical', impact: 'A £192M figure read with the same visual weight as £0' },
  { finding: 'No consolidated, role-aware dashboard', severity: 'Critical', impact: 'Analysts "chase" retailers site by site for status' },
  { finding: "Search doesn't recognise R2R vocabulary", severity: 'Critical', impact: 'Zero results for a core term, day before deadline' },
  { finding: 'Integration log fails silently', severity: 'Critical', impact: '11 errors sat undetected until the day before deadline' },
  { finding: 'Filters carry no persistent state', severity: 'Critical', impact: '2–3 hours of redundant reconfiguration, every cycle' },
]

const keyDecisions = [
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
    result: null,
  },
  {
    title: 'Inaction Cost Estimator — Not in the Original Brief',
    rejected: null,
    shipped: 'Emerged from Account Partner interviews: partners needed to explain not just what a journal was, but the financial cost of not posting it — today, not eventually. A deterministic, auditable calculator — journal amount, delay in days, cost of capital — became the system\'s eighth decision capability, now a reusable platform primitive.',
    result: null,
  },
  {
    title: 'Policy Configuration',
    rejected: 'Hardcoded Engineering Parameters — changing a threshold meant a pull request, a review, and downtime. Engagement parameters change too often for that.',
    shipped: 'Every threshold and policy lives in versioned, human-readable YAML, editable by a partner through an admin form — no deployment required, every journal citing the exact rule version that governed it.',
    result: null,
  },
]

const testingRounds = [
  {
    title: 'Round 1 — Internal Analyst Testing',
    body: '5 client analysts, 12 task scenarios. The readiness score as a single "73%" prompted the same question every time: "73% of what?" Redesigned as a four-zone gauge (Not Started / In Progress / At Risk / Close Ready) with a 6-component breakdown.',
    result: 'Analysts correctly identified the close-blocking item in 100% of scenarios, up from 40%.',
    quote: null,
    quoteAttrib: null,
  },
  {
    title: 'Round 2 — Partner Simulation Mode Testing',
    body: '2 Account Partners stalled at manual parameter entry mid-demo. Redesigned to a single input — a franchise volume slider — with all baseline parameters pre-seeded from live engagement data.',
    result: 'Both partners completed the demo unassisted, averaging 2 minutes 40 seconds.',
    quote: '"I would never open this in a room without a script. I need it to open ready."',
    quoteAttrib: '— Account Partner, Round 2 testing',
  },
  {
    title: 'Round 3 — Client Finance Manager Audit Testing',
    body: 'The original reverse-chronological log read "like a system log, not an audit explanation." Redesigned as a forward step-by-step timeline: Submission → Parsed & Validated → GL Mapped → Exception Reviewed → Journal Proposed → Governing Rule Applied → Analyst Approved → Posted.',
    result: 'Reproduced a test journal in 2 minutes 11 seconds — within the 3-minute requirement.',
    quote: '"I need to tell the story forwards, from the submission to the posting."',
    quoteAttrib: '— Client Regional Finance Manager, Round 3 testing',
  },
]

const kpiRows = [
  { kpi: 'Analyst time per franchise', baseline: '60–90 min', result: '8–12 min (est., Phase 2 validation)' },
  { kpi: 'GL mapping manual review queue', baseline: '100% of accounts', result: '~18% (low-confidence only)' },
  { kpi: 'Audit trail reproduction time', baseline: '30+ min, 3 spreadsheets', result: '2 min 11 sec' },
  { kpi: 'Exception triage accuracy', baseline: '40% (Round 1)', result: '100% post-iteration' },
  { kpi: 'Submission format variants handled', baseline: '0 (all manual)', result: '12 variants' },
  { kpi: 'Partner demo (expansion bid scenario)', baseline: 'Spreadsheet estimate only', result: '2 min 40 sec uncoached' },
  { kpi: 'Policy change turnaround', baseline: 'Engineering deployment', result: 'Partner-editable YAML, no deployment' },
  { kpi: 'Marginal cost of 1,800 new franchises', baseline: '≈ 10× headcount', result: 'Near-zero — same system, new config' },
]

export default function CaseStudyIntelliForge() {
  const [personaIdx, setPersonaIdx] = useState(0)
  const [testingIdx, setTestingIdx] = useState(0)

  return (
    <CaseStudyShell
      eyebrow="Case Study"
      title="IntelliForge SR2R"
      description="Designing a governed, ontology-driven Intelligent Financial Close system that transforms 200 manual month-end close cycles into a scalable, auditable decision engine — and builds the evidence base for a 10× volume bid."
      meta={[
        { label: 'Role', value: 'Product Designer (UX/UI)' },
        { label: 'Client', value: 'Global energy company' },
        { label: 'Timeline', value: '14 weeks — Phase 1 prototype' },
        { label: 'Team', value: '1 Designer · Architect · Data Engineer · 2 Engineers · Partner · PM' },
        { label: 'Tools', value: 'Figma · FigJam · Python (FastAPI) · RDFLib · YAML' },
        { label: 'Deliverable', value: '7-screen control plane · 5 decision engines · 20 API endpoints' },
      ]}
      stats={[
        { value: '200', label: 'franchise dealers in monthly scope' },
        { value: '60–90 min', label: 'analyst time per franchise, per cycle' },
        { value: '8', label: 'decision capabilities designed and shipped' },
      ]}
    >
      {/* THE HOOK */}
      <div style={{ ...S, paddingTop: 48 }}>
        <h2 style={H2}>The Hook</h2>
        <Body>Every month, 200 third-party retail franchise dealers submit financial data to the client's Record-to-Report managed service — trial balances, account schedules, and supporting documents loaded into Microsoft Business Central. Every month, client analysts manually ingest every file, map every local dealer account code to the client's corporate Chart of Accounts, reconcile discrepancies, investigate anomalies, propose journal entries, and govern what gets posted — against a hard month-end close deadline that waits for no one.</Body>
        <p style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 20px' }}>The process works. The economics don't.</p>
        <Body>At 60–90 minutes of analyst time per franchise per cycle, the engagement consumes up to 300 analyst-hours every single month. The cost of the 200th franchise equals the cost of the first. Nothing compounds. When the client's Mobility division — roughly 10× the current engagement in scale — issued a bid invitation, the engagement team faced a structural problem: winning that contract and delivering it manually would require 10× the headcount. Winning it on a cost basis was not commercially viable.</Body>
        <Body>IntelliForge SR2R is an ontology-driven Decision Twin — a governed control layer sitting on top of Business Central — that ingests submissions, maps accounts with confidence scoring, scores close readiness, predicts risk, estimates the cost of inaction, generates intervention plans, automates governed journal entries, and maintains a complete, reproducible audit trail. Eight decision capabilities. One system. Near-zero marginal cost of scale.</Body>
      </div>

      {/* RESEARCH */}
      <div style={{ position: 'relative', ...S }}>
        <div style={{ position: 'absolute', top: 0, right: -180, width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(183,204,255,0.22), transparent 70%)', filter: 'blur(70px)', zIndex: -1 }} />
        <h2 style={H2}>Outlining the Research</h2>
        <Body>Discovery ran five parallel tracks across the first three weeks — starting with an independent audit of the system IntelliForge would sit on top of.</Body>

        <div style={{ padding: 24, borderRadius: 20, background: '#F2F6FF', border: '1px solid #EAF1FF', marginBottom: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>0. Baseline UX Audit — The Legacy Business Central Portal</div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 20px' }}>An independent UX audit of the existing Microsoft Dynamics 365 Business Central portal, deliberately conducted by someone with no day-to-day operational familiarity — unfamiliarity treated as a methodological asset, since experienced users stop perceiving friction that has become routine.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 20 }}>
            {[['26', 'usability findings logged'], ['13', 'rated critical severity'], ['5', 'structural root causes identified']].map(([v, l]) => (
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
                {auditColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 16px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {auditFindings.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < auditFindings.length - 1 ? '1px solid #EAF1FF' : undefined }}>
                  <td data-label={auditColumns[0]} style={{ padding: '14px 16px', color: '#12141F' }}>{row.finding}</td>
                  <td data-label={auditColumns[1]} style={{ padding: '14px 16px' }}><SeverityChip>{row.severity}</SeverityChip></td>
                  <td data-label={auditColumns[2]} style={{ padding: '14px 16px', color: '#5A5F73' }}>{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            { n: '1', title: 'Process Archaeology — Three Consecutive Close Cycles', body: "Shadowed R2R analysts through three consecutive month-end closes, documenting every manual decision. The output: a catalogue of 34 distinct decision points — not a process map, a decision inventory. Every point became a candidate for the system's decision engine." },
            { n: '2', title: 'Data Structure Analysis — 200 Submission Formats', body: 'Catalogued all 200 franchise submission formats and identified 12 structurally distinct variants — different account code conventions, granularities, and intercompany handling — directly scoping the ontology.' },
            { n: '3', title: 'Stakeholder Interviews — Three Persona Tiers', body: "Structured interviews across analysts, the Account Partner, and the client's Regional Finance Manager — three tiers, three entirely different definitions of success, each directly driving a screen." },
            { n: '4', title: 'Competitive Benchmarking — R2R Automation Tools', body: 'Evaluated six market tools; all treated the problem as data transformation, none offered governed decision-making or reproducible audit trails. The market had ETL tools. The client needed a Decision Twin.' },
          ].map(({ n, title, body }) => (
            <div key={n}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 6 }}>{n}. {title}</div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT WE LEARNED */}
      <div style={S}>
        <DarkBox label="What We Learned">
          <p style={{ fontSize: 16, lineHeight: 1.75, margin: '0 0 16px' }}>The root problem wasn't the volume of work — it was that all mapping knowledge, validation rules, and escalation logic lived in analyst memory and spreadsheets. Nothing accumulated into institutional knowledge.</p>
          <p style={{ fontSize: 16, lineHeight: 1.75, margin: 0 }}>The secondary finding reshaped the product's commercial framing: the Account Partner's real audience wasn't the delivery team — it was the client's bid committee. The hero screen wasn't the analyst workbench; it was a Simulation Mode proving the model could scale to 2,000 franchises at near-zero marginal cost.</p>
        </DarkBox>
      </div>

      {/* PERSONAS */}
      <div style={S}>
        <h2 style={H2}>Define — Personas and Decision Maps</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 24px' }}>Three personas drove every design decision. Designing a screen without asking "which persona is sitting in front of this?" was treated as a process failure.</p>

        <div style={{ padding: 28, borderRadius: 20, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', minHeight: 180 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 6 }}>Persona {personas[personaIdx].n}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{personas[personaIdx].name}</div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 10px' }}>{personas[personaIdx].desc}</p>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: '#7A7F94', margin: 0 }}>{personas[personaIdx].implication}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 20 }}>
          <button onClick={() => setPersonaIdx(i => (i - 1 + personas.length) % personas.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronLeft size={16} className="" /></button>
          <div style={{ display: 'flex', gap: 8 }}>
            {personas.map((_, i) => (
              <button key={i} onClick={() => setPersonaIdx(i)} style={{ cursor: 'pointer', width: 8, height: 8, borderRadius: '50%', background: i === personaIdx ? '#002FA7' : '#DCE8FF', border: 'none', padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setPersonaIdx(i => (i + 1) % personas.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronRight size={16} className="" /></button>
        </div>
      </div>

      {/* IA */}
      <div style={S}>
        <h2 style={H2}>Information Architecture — The 7-Tab Control Plane</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 24px' }}>Rather than one monolithic dashboard, the control plane was organised around the persona-decision matrix — which decisions belong to whom, at which stage of the cycle.</p>
        <div className="table-scroll" style={{ padding: 24, borderRadius: 24, border: '1px solid #EAF1FF', background: '#F8FAFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                {tabsColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 16px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tabs.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < tabs.length - 1 ? '1px solid #EAF1FF' : undefined }}>
                  <td data-label={tabsColumns[0]} style={{ padding: '14px 16px', color: '#12141F', fontWeight: 600 }}>{row.tab}</td>
                  <td data-label={tabsColumns[1]} style={{ padding: '14px 16px', color: '#5A5F73' }}>{row.persona}</td>
                  <td data-label={tabsColumns[2]} style={{ padding: '14px 16px', color: '#5A5F73' }}>{row.decision}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KEY FEATURE DECISIONS */}
      <div style={S}>
        <h2 style={H2}>Key Feature Decisions — and What We Rejected</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 32px' }}>Every significant feature went through rejected directions before landing — that's where the actual design thinking lives.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {keyDecisions.map(({ title, rejected, shipped, result }) => (
            <div key={title} style={{ padding: 24, borderRadius: 20, background: '#F8FAFF', border: '1px solid #EAF1FF' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#12141F', marginBottom: 12 }}>{title}</div>
              {rejected && (
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 10px' }}>
                  <strong style={{ color: '#B23A3A' }}>Rejected — </strong>{rejected}
                </p>
              )}
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#5A5F73', margin: result ? '0 0 10px' : 0 }}>
                <strong style={{ color: '#1F7A4D' }}>Shipped: </strong>{shipped}
              </p>
              {result && <p style={{ fontSize: 14, lineHeight: 1.7, color: '#12141F', margin: 0, fontWeight: 600 }}>Result: {result}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ARCHITECTURE PRINCIPLE */}
      <div style={S}>
        <DarkBox label="Architecture Principle">
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F2F6FF', marginBottom: 14 }}>Deterministic-First / LLM-Second</div>
          <p style={{ fontSize: 15, lineHeight: 1.75, margin: 0 }}>Every score, flag, and decision is computed from defined formulas with inspectable inputs. The LLM only generates the text of intervention plans and powers the agent chat — it cannot modify a number, post a journal, or override a rule. Every LLM output is labelled "Suggested plan — review before actioning." The system assists; humans govern.</p>
        </DarkBox>
      </div>

      {/* TESTING CAROUSEL */}
      <div style={S}>
        <h2 style={H2}>Prototypes and Design Iterations — Three Rounds of Testing</h2>

        <div style={{ overflow: 'hidden', borderRadius: 20, border: '1px solid #EAF1FF', background: '#F8FAFF', padding: 28 }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', transform: `translateX(-${testingIdx * 100}%)`, transition: 'transform 420ms ease-out' }}>
              {testingRounds.map(({ title, body, result, quote, quoteAttrib }) => (
                <div key={title} style={{ flex: '0 0 100%', paddingRight: 4 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#12141F', marginBottom: 8 }}>{title}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 12px' }}>{body}</p>
                  {quote && (
                    <div style={{ padding: '16px 20px', borderLeft: '3px solid #C9D9FF', background: '#F2F6FF', borderRadius: '0 10px 10px 0', marginBottom: 12 }}>
                      <p style={{ fontSize: 15, fontStyle: 'italic', color: '#12141F', lineHeight: 1.6, margin: '0 0 6px' }}>{quote}</p>
                      <p style={{ fontSize: 13, color: '#5A5F73', margin: 0 }}>{quoteAttrib}</p>
                    </div>
                  )}
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#12141F', margin: 0 }}>Result: {result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 20 }}>
          <button onClick={() => setTestingIdx(i => (i - 1 + testingRounds.length) % testingRounds.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronLeft size={16} className="" /></button>
          <div style={{ display: 'flex', gap: 8 }}>
            {testingRounds.map((_, i) => (
              <button key={i} onClick={() => setTestingIdx(i)} style={{ cursor: 'pointer', width: 8, height: 8, borderRadius: '50%', background: i === testingIdx ? '#002FA7' : '#DCE8FF', border: 'none', padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setTestingIdx(i => (i + 1) % testingRounds.length)} style={{ cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F6FF', color: '#3D63E0', border: 'none' }}><ChevronRight size={16} className="" /></button>
        </div>
      </div>

      {/* CONCLUDING WITH IMPACT */}
      <div style={S}>
        <h2 style={H2}>Concluding with Impact</h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5A5F73', margin: '0 0 32px' }}>Delivered as a fully validated, development-ready prototype at the end of 14 weeks: a 7-tab control plane, 5 decision engines, 20 FastAPI endpoints, 195 automated tests, and 600 synthetic artifact files covering 12 franchises × 12 months.</p>
        <div className="table-scroll" style={{ marginBottom: 32 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #EAF1FF' }}>
                {kpiColumns.map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#001A5C', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {kpiRows.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < kpiRows.length - 1 ? '1px solid #F2F6FF' : undefined }}>
                  <td data-label={kpiColumns[0]} style={{ padding: '10px 12px', color: '#12141F' }}>{row.kpi}</td>
                  <td data-label={kpiColumns[1]} style={{ padding: '10px 12px', color: '#5A5F73' }}>{row.baseline}</td>
                  <td data-label={kpiColumns[2]} style={{ padding: '10px 12px', color: '#1F7A4D', fontWeight: 600 }}>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '24px 28px', borderRadius: 20, border: '1px solid rgba(61,99,224,0.2)', background: 'rgba(0,47,167,0.03)' }}>
          <p style={{ fontSize: 16, fontStyle: 'italic', lineHeight: 1.7, color: '#3A3F4C', margin: '0 0 8px' }}>"The confidence scoring changed how fast the team could move — cases that sat in review for a day now clear in minutes."</p>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#001A5C' }}>— Head of Delivery, the client</div>
        </div>
      </div>

      {/* WHAT'S NEXT */}
      <div style={S}>
        <h2 style={H2}>{"What's Next"}</h2>
        <Body>Phase 2 replaces the synthetic dataset with a live Business Central connection and adds persistent storage, authentication, and role-based access control — the test architecture was written to be data-source-agnostic, making this a configuration change, not a rewrite.</Body>
        <Body>Phase 3 brings Mobility-division onboarding: a gain-share commercial module converting Simulation Mode from a demo tool into a live dashboard tracking actual versus projected margin differential.</Body>
        <Body>If the client's Mobility contract is won and delivered manually, delivery cost scales 10×. With IntelliForge SR2R as the control layer, delivery cost scales near-zero — and the margin differential funds the full platform investment. The prototype doesn't just improve the current engagement. It proves the model that wins the bid.</Body>
      </div>
    </CaseStudyShell>
  )
}
