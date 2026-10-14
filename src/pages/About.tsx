import { useState, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronRight from '../components/ChevronRight'
import ChevronDown from '../components/ChevronDown'
import ChevronUp from '../components/ChevronUp'
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

function PhilosophyFlower({ hovered, onHover, size = 340 }: { hovered: number | null; onHover: (i: number | null) => void; size?: number }) {
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
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={14} fontWeight={800} fill="#001A5C" fontFamily="Inter, sans-serif" style={{ pointerEvents: 'none' }}>DESIGN</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fontSize={14} fontWeight={800} fill="#001A5C" fontFamily="Inter, sans-serif" style={{ pointerEvents: 'none' }}>PHILOSOPHY</text>
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

const methodologies = [
  { key: 'designThinking', title: 'Design Thinking', subtitle: 'Discovery' },
  { key: 'waterfall', title: 'Waterfall', subtitle: 'Planned delivery' },
  { key: 'agile', title: 'Agile', subtitle: 'Adaptive delivery' },
  { key: 'scrum', title: 'Scrum', subtitle: 'Adaptive delivery' },
  { key: 'lean', title: 'Lean', subtitle: 'Efficiency & value' },
]

const philosophyItems = [
  { n: '01', text: 'Clarity over decoration' },
  { n: '02', text: 'Research before assumptions' },
  { n: '03', text: 'Systems before screens' },
  { n: '04', text: 'Accessibility by default' },
  { n: '05', text: 'Products should reduce complexity, not display it' },
]

const skills = ['Product Design', 'UX Research', 'Design Systems', 'Accessibility', 'Strategy', 'Leadership', 'Visual Design', 'AI for Designers']

const workPhases = [
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
    question: "Whose definition of success are we actually designing for?",
    proof: { label: 'See this in the workforce-fund personas', to: '/work/tamkeen' },
  },
  {
    id: 'design', name: 'Design',
    description: 'Prototyping decisions, not just screens.',
    deliverables: ['Wireframes', 'Prototypes', 'Design systems'],
    detail: "Every screen has to answer one decision, not showcase a feature. I sketch the rejected direction alongside the shipped one — arguing against my own first idea is usually what gets it to the second, better one.",
    question: "Would this hold up under a live audit, not just a demo?",
    proof: { label: 'See this in the Design System key decisions', to: '/work/design-system' },
  },
  {
    id: 'deliver', name: 'Deliver',
    description: 'Handing over something a team can actually run, not just a working prototype.',
    deliverables: ['Dev handoff specs', 'QA passes', 'Rollout support'],
    detail: "I stay through the first weeks of real use, not just the handoff meeting. Adoption problems show up as small hesitations, not bug reports — catching those early is the difference between a shipped feature and a used one.",
    question: "Did this actually change how people work?",
    proof: { label: 'See this in the IntelliForge results', to: '/work/intelliforge' },
  },
]

const education = [
  { degree: "Master's — Design Management", school: "IADE – Creative University · 2017–2019", logo: iadeLogo },
  { degree: "Bachelor — Graphic Design", school: "ECV – École de Création Visuelle · 2016", logo: ecvLogo },
  { degree: "Bachelor — Design", school: "IADE – Creative University · 2012–2015", logo: iadeLogo },
]

const certifications = [
  { title: "Dynamic User Experience: Design and Usability", org: "IxDF · Sep 2024", logo: ixdfLogo },
  { title: "AI for Designers", org: "IxDF · May 2026", logo: ixdfLogo },
  { title: "Accessibility: How to Design for All", org: "IxDF · Jan 2025", logo: ixdfLogo },
  { title: "UX Management: Strategy and Tactics", org: "IxDF · Sep 2024", logo: ixdfLogo },
  { title: "User Research: Methods and Best Practices", org: "IxDF · Sep 2023", logo: ixdfLogo },
]

export default function About() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [philosophyHover, setPhilosophyHover] = useState<number | null>(null)

  const toggle = (id: string) => setExpanded(e => ({ ...e, [id]: !e[id] }))

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* ── ABOUT BIO ── */}
      <div style={{ position: 'relative', padding: 'clamp(100px,15vw,150px) 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 32 }}>About</div>

        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>Design has been the thread connecting everything I've done, even before I realised it would become my career.</p>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>I began in Graphic Design, where I developed a deep appreciation for visual communication, typography and the subtle details that shape how people perceive information. Over time, I became less interested in the interface itself and more interested in the people behind it. That curiosity naturally led me into UX, UI and eventually Product Design.</p>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>Today, I design enterprise products that transform complex systems into experiences that feel intuitive, efficient and meaningful. Looking back, my career has never been about changing disciplines — it has been about broadening my perspective: from visual execution to strategic thinking, from designing screens to designing products that create value for both people and businesses.</p>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>I believe the best design isn't the one people notice. It's the one that quietly helps them achieve what they came to do.</p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>That work has also taken me across borders — international client engagements across financial services and government, among others.</p>
          </div>
          <div style={{ flex: '0 0 auto', width: 'min(320px, 100%)', height: 480, borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 50px rgba(120,150,255,0.18)', background: '#F2F6FF', animation: 'floatSlow 9s ease-in-out infinite' }}>
            <img src={profileImg} alt="Nelson Lopes" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <h2 style={sectionTitle}>How I Think</h2>
        <div style={{ columns: '2 340px', columnGap: 48 }}>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>Curiosity has always shaped the way I approach both design and life.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>As a child, I dreamed of becoming a car designer. I wasn't fascinated by cars themselves, but by the balance between engineering, aesthetics and human experience. I admired how thoughtful design could make something complex feel effortless. Although my path led me into digital products instead, I realised I was pursuing the very same idea: creating experiences where clarity, craftsmanship and purpose work together seamlessly.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>I rarely begin with solutions — I begin with questions. Understanding people, their context and the problems they're trying to solve is the foundation of every meaningful product.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>I'm naturally calm in complex environments and enjoy bringing clarity where there is ambiguity. I think in systems, connecting individual details with the bigger picture while balancing user needs, business goals and technical constraints.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>For me, great products are never created in isolation. They emerge through research, collaboration and open conversations between designers, engineers, product managers and stakeholders.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: 0 }}>Beautiful interfaces matter, but they're rarely the objective. They're the outcome of thoughtful decisions made throughout the entire design process.</p>
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <div className="philosophy-layout">
          <PhilosophyFlower hovered={philosophyHover} onHover={setPhilosophyHover} />
          <div className="philosophy-list">
            {philosophyItems.map(({ n, text }, i) => {
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
          <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: 'italic', fontSize: 'clamp(22px,3vw,34px)', lineHeight: 1.45, color: '#2A2F3A', margin: 0 }}>Clarity over complexity. Understanding before execution. Progress through collaboration.</p>
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <h2 style={sectionTitle}>Beyond Design</h2>
        <div style={{ columns: '2 300px', columnGap: 40 }}>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>Curiosity doesn't stop when I close my laptop.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>I'm constantly exploring emerging technologies, particularly Artificial Intelligence, and I'm always interested in discovering products that solve problems with elegance and simplicity. I find inspiration in architecture, industrial design, photography and the quiet beauty of minimalist spaces — but just as often in everyday moments, conversations and the way people naturally interact with the world around them.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>Some of my best ideas don't happen in front of a screen. They arrive during a walk, a swim in the sea, or simply by paying attention to the small details most people overlook. There's a particular kind of clarity that comes from being in nature — the rhythm of the ocean, the quiet of a long walk on the beach — that mirrors the same clarity I look for in design: nothing extra, nothing forced.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: 0 }}>Travelling has taught me that every environment shapes behaviour differently, while observing people continually reminds me that the smallest design decisions often have the greatest impact.</p>
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <p style={{ textAlign: 'center', fontSize: 17, lineHeight: 1.7, color: '#5A5F73', maxWidth: 640, margin: '0 auto' }}>Technology evolves constantly. Human behaviour changes slowly. That's why I believe understanding people will always be the most valuable design skill.</p>
      </div>

      <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', maxWidth: 1200, margin: '0 auto', padding: '0 20px 56px' }}>⸻</div>

      {/* ── SKILLS ── */}
      <div style={{ position: 'relative', padding: '0 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={eyebrowWithTitle}>Skills &amp; Expertise</div>
        <h2 style={sectionTitle}>Where I add the most value</h2>
        <div className="skills-marquee">
          <div className="skills-marquee-track">
            <div className="skills-marquee-group">
              {skills.map(s => <span key={s} className="skills-card">{s}</span>)}
            </div>
            <div className="skills-marquee-group" aria-hidden="true">
              {skills.map(s => <span key={`${s}-dup`} className="skills-card">{s}</span>)}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 40 }}>
          <div style={{ ...eyebrow, marginBottom: 16 }}>Methodologies</div>
          <div className="methodologies-grid">
            {methodologies.map(m => {
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

      <p style={{ textAlign: 'center', fontSize: 15, fontStyle: 'italic', color: '#5A5F73', maxWidth: 1200, margin: '0 auto 56px', padding: '0 20px' }}>Process matters as much as craft.</p>

      {/* ── HOW I WORK ── */}
      <div style={{ position: 'relative', padding: '0 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={eyebrowWithTitle}>How I Work</div>
        <h2 style={sectionTitle}>From discovery to a shipped decision</h2>
        <div className="rg-phase">
          {workPhases.map(phase => {
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
                    {isOpen ? <>Show less<ChevronUp size={14} /></> : <>Learn more<ChevronDown size={14} /></>}
                  </button>
                  {isOpen && (
                    <div style={{ marginTop: 16, padding: 16, background: 'rgba(255,255,255,0.6)', borderRadius: 14, borderTop: '1px solid rgba(255,255,255,0.8)' }}>
                      <p style={{ fontSize: 13, lineHeight: 1.6, color: '#4A4F63', margin: '0 0 10px' }}>{phase.detail}</p>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#12141F', fontStyle: 'italic', margin: '0 0 10px' }}>"{phase.question}"</div>
                      <Link to={phase.proof.to} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#002FA7' }}>{phase.proof.label}<ChevronRight size={14} /></Link>
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
        <div style={eyebrowStandalone}>Education</div>
        <div className="rg-edu" style={{ marginBottom: 60 }}>
          {education.map(({ degree, school, logo }) => (
            <div key={degree} style={{ display: 'flex', alignItems: 'center', gap: 14, border: '1px solid #EAF1FF', borderRadius: 12, padding: 22, background: '#FFFFFF', boxShadow: '0 4px 12px rgba(20,30,60,0.04)' }}>
              <div style={thumb}><img src={logo} alt="" style={thumbImg} /></div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 4 }}>{degree}</div>
                <div style={{ fontSize: 13, color: '#5A5F73' }}>{school}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CERTIFICATIONS */}
        <div style={eyebrowStandalone}>Certifications</div>
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
          Fluent in Portuguese and English, working proficiency in Spanish and French.
        </div>
      </div>

      <Footer />
    </div>
  )
}
