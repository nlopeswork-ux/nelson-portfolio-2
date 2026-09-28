import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import ChevronRight from '../components/ChevronRight'
import ChevronDown from '../components/ChevronDown'
import ChevronUp from '../components/ChevronUp'
import ChevronLeft from '../components/ChevronLeft'
import profileImg from '../imports/c6037aa9-14d7-4c26-9a01-4a3a2bb1cf8d.jpg'

const GradCap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#002FA7" strokeWidth="1.6" style={{ marginBottom: 14, display: 'block' }}>
    <path d="M12 3l9 4.5-9 4.5-9-4.5 9-4.5z"/><path d="M6.5 9.7v5.3c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V9.7"/><path d="M20 8v6"/>
  </svg>
)
const CertBadge = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#002FA7" strokeWidth="1.6" style={{ marginBottom: 14, display: 'block' }}>
    <circle cx="12" cy="9" r="6"/><path d="M9 9l2 2 3.5-3.5"/><path d="M8.5 14.5L7 21l5-2.5 5 2.5-1.5-6.5"/>
  </svg>
)

const philosophyItems = [
  { n: '01', text: 'Clarity over decoration.' },
  { n: '02', text: 'Research before assumptions.' },
  { n: '03', text: 'Systems before screens.' },
  { n: '04', text: 'Accessibility by default.' },
  { n: '05', text: 'Products should reduce complexity, not display it.', full: true },
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
  { degree: "Master's — Design Management", school: "IADE – Creative University · 2017–2019" },
  { degree: "Bachelor — Graphic Design", school: "ECV – École de Création Visuelle · 2016" },
  { degree: "Bachelor — Design", school: "IADE – Creative University · 2012–2015" },
]

const certifications = [
  { title: "Dynamic User Experience: Design and Usability", org: "IxDF · Sep 2024" },
  { title: "AI for Designers", org: "IxDF · May 2026" },
  { title: "Accessibility: How to Design for All", org: "IxDF · Jan 2025" },
  { title: "UX Management: Strategy and Tactics", org: "IxDF · Sep 2024" },
  { title: "User Research: Methods and Best Practices", org: "IxDF · Sep 2023" },
]

export default function About() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [certIdx, setCertIdx] = useState(0)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 640)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const handler = (e: MediaQueryListEvent) => { setIsMobile(e.matches); setCertIdx(0) }
    mq.addEventListener('change', handler)
    setIsMobile(mq.matches)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const perSlide = isMobile ? 1 : 3
  const certSlides = []
  for (let i = 0; i < certifications.length; i += perSlide) certSlides.push(certifications.slice(i, i + perSlide))

  const toggle = (id: string) => setExpanded(e => ({ ...e, [id]: !e[id] }))
  const certPrev = () => setCertIdx(i => (i - 1 + certSlides.length) % certSlides.length)
  const certNext = () => setCertIdx(i => (i + 1) % certSlides.length)

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
          <div style={{ flex: '0 0 auto', width: 'min(320px, 100%)', height: 480, borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 50px rgba(120,150,255,0.18)', background: '#F2F6FF' }}>
            <img src={profileImg} alt="Nelson Lopes" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', color: '#12141F', margin: '0 0 24px' }}>How I Think</h3>
        <div style={{ columns: '2 340px', columnGap: 48 }}>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>Curiosity has always shaped the way I approach both design and life.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>As a child, I dreamed of becoming a car designer. I wasn't fascinated by cars themselves, but by the balance between engineering, aesthetics and human experience. I admired how thoughtful design could make something complex feel effortless. Although my path led me into digital products instead, I realised I was pursuing the very same idea: creating experiences where clarity, craftsmanship and purpose work together seamlessly.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>I rarely begin with solutions — I begin with questions. Understanding people, their context and the problems they're trying to solve is the foundation of every meaningful product.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>I'm naturally calm in complex environments and enjoy bringing clarity where there is ambiguity. I think in systems, connecting individual details with the bigger picture while balancing user needs, business goals and technical constraints.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>For me, great products are never created in isolation. They emerge through research, collaboration and open conversations between designers, engineers, product managers and stakeholders.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: 0 }}>Beautiful interfaces matter, but they're rarely the objective. They're the outcome of thoughtful decisions made throughout the entire design process.</p>
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto', padding: '24px 0' }}>
          <div style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 52, lineHeight: 1, color: '#001A5C', opacity: 0.35, marginBottom: 8 }}>"</div>
          <p style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: 'italic', fontSize: 'clamp(22px,3vw,34px)', lineHeight: 1.45, color: '#2A2F3A', margin: 0 }}>Clarity over complexity. Understanding before execution. Progress through collaboration.</p>
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', color: '#12141F', margin: '0 0 24px' }}>Beyond Design</h3>
        <div style={{ columns: '2 300px', columnGap: 40 }}>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>Curiosity doesn't stop when I close my laptop.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>I'm constantly exploring emerging technologies, particularly Artificial Intelligence, and I'm always interested in discovering products that solve problems with elegance and simplicity. I find inspiration in architecture, industrial design, photography and the quiet beauty of minimalist spaces — but just as often in everyday moments, conversations and the way people naturally interact with the world around them.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: '0 0 20px' }}>Some of my best ideas don't happen in front of a screen. They arrive during a walk, a swim in the sea, or simply by paying attention to the small details most people overlook. There's a particular kind of clarity that comes from being in nature — the rhythm of the ocean, the quiet of a long walk on the beach — that mirrors the same clarity I look for in design: nothing extra, nothing forced.</p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: '#4A4F63', margin: 0 }}>Travelling has taught me that every environment shapes behaviour differently, while observing people continually reminds me that the smallest design decisions often have the greatest impact.</p>
        </div>

        <div style={{ textAlign: 'center', fontSize: 22, color: '#001A5C', margin: '56px 0' }}>⸻</div>

        <p style={{ textAlign: 'center', fontSize: 17, lineHeight: 1.7, color: '#5A5F73', maxWidth: 640, margin: '0 auto' }}>Technology evolves constantly. Human behaviour changes slowly. That's why I believe understanding people will always be the most valuable design skill.</p>
      </div>

      {/* ── SKILLS ── */}
      <div style={{ position: 'relative', padding: '0 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 12 }}>Skills &amp; Expertise</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 24px' }}>Where I add the most value</h2>
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
        <p style={{ marginTop: 16, fontSize: 14, color: '#5A5F73' }}>
          <span style={{ fontWeight: 600, color: '#12141F' }}>Methodologies:</span> Agile, Lean, Scrum, Waterfall, Design Thinking
        </p>
      </div>

      {/* ── PHILOSOPHY ── */}
      <div style={{ position: 'relative', padding: '0 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 24, textAlign: 'center' }}>Design Philosophy</div>
        <div className="rg-2" style={{ maxWidth: 900, margin: '0 auto' }}>
          {philosophyItems.map(({ n, text, full }) => (
            <div key={n} style={{ gridColumn: full ? '1 / -1' : undefined, display: 'flex', alignItems: 'center', gap: 20, padding: '20px 24px', background: 'rgba(0,47,167,0.05)', borderRadius: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#001A5C', minWidth: 24, flexShrink: 0 }}>{n}</div>
              <div style={{ fontSize: 'clamp(17px,2.2vw,22px)', fontWeight: 700, letterSpacing: '-0.01em', color: '#12141F' }}>{text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW I WORK ── */}
      <div style={{ position: 'relative', padding: '0 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 12, textAlign: 'center' }}>How I Work</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', color: '#12141F', margin: '0 0 32px', textAlign: 'center' }}>From discovery to a shipped decision</h2>
        <div className="rg-phase">
          {workPhases.map(phase => {
            const isOpen = !!expanded[phase.id]
            return (
              <div key={phase.id} style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid #EAF1FF', borderRadius: 16, padding: 24, background: '#FFFFFF', boxShadow: '0 4px 12px rgba(20,30,60,0.04)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#002FA7', marginBottom: 16, flexShrink: 0 }} />
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#12141F', margin: '0 0 8px' }}>{phase.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#5A5F73', margin: '0 0 12px' }}>{phase.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
                  {phase.deliverables.map(d => (
                    <div key={d} style={{ fontSize: 12, color: '#8A8FA3' }}>· {d}</div>
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
                  <div style={{ marginTop: 16, padding: 16, background: 'rgba(0,47,167,0.03)', borderRadius: 14, borderTop: '1px solid #EAF1FF' }}>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: '#4A4F63', margin: '0 0 10px' }}>{phase.detail}</p>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#12141F', fontStyle: 'italic', margin: '0 0 10px' }}>"{phase.question}"</div>
                    <Link to={phase.proof.to} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#002FA7' }}>{phase.proof.label}<ChevronRight size={14} /></Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── EDUCATION ── */}
      <div style={{ position: 'relative', padding: '0 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 20 }}>Education</div>
        <div className="rg-edu" style={{ marginBottom: 60 }}>
          {education.map(({ degree, school }) => (
            <div key={degree} style={{ border: '1px solid #EAF1FF', borderRadius: 12, padding: 22, background: '#FFFFFF', boxShadow: '0 4px 12px rgba(20,30,60,0.04)' }}>
              <GradCap />
              <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 4 }}>{degree}</div>
              <div style={{ fontSize: 13, color: '#5A5F73' }}>{school}</div>
            </div>
          ))}
        </div>

        {/* CERTIFICATIONS */}
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 20 }}>Certifications</div>
        <div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', transform: `translateX(${-certIdx * 100}%)`, transition: 'transform 420ms ease-out' }}>
              {certSlides.map((slide, si) => (
                <div key={si} className={isMobile ? undefined : 'carousel-3'} style={{ flex: '0 0 100%' }}>
                  {slide.map(({ title, org }) => (
                    <div key={title} style={{ border: '1px solid #EAF1FF', borderRadius: 12, padding: 22, background: '#FFFFFF', boxShadow: '0 4px 12px rgba(20,30,60,0.04)' }}>
                      <CertBadge />
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: 13, color: '#5A5F73' }}>{org}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 20 }}>
            <button type="button" aria-label="Previous" className="carousel-arrow" onClick={certPrev}><ChevronLeft size={16} className="" /></button>
            <div style={{ display: 'flex', gap: 8 }}>
              {certSlides.map((_, i) => (
                <button key={i} type="button" onClick={() => setCertIdx(i)} style={{ cursor: 'pointer', width: 8, height: 8, borderRadius: '50%', background: i === certIdx ? '#3D63E0' : '#D8E0F5', border: 'none', padding: 0 }} />
              ))}
            </div>
            <button type="button" aria-label="Next" className="carousel-arrow" onClick={certNext}><ChevronRight size={16} className="" /></button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: '#5A5F73' }}>
          Fluent in English and French, working proficiency in Spanish.
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '0 20px 40px', fontSize: 13, color: '#6B7086' }}>© 2026 Nelson Lopes. Designed with care.</div>
    </div>
  )
}
