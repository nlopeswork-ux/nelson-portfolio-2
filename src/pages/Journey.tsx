import { useState } from 'react'
import Nav from '../components/Nav'
import ChevronDown from '../components/ChevronDown'
import ChevronUp from '../components/ChevronUp'

const kpmgEngagements = [
  { client: 'Global energy company', industry: 'Financial Services', period: '2026–Present', scope: 'IntelliForge SR2R — ontology-driven financial close system, 200 franchise dealers' },
  { client: 'Government economic zone authority', industry: 'Government', period: '2025–2026', scope: 'OneRAK Portal Revamp — 3 portals unified, 18/18 services live' },
  { client: 'Retail bank', industry: 'Financial Services', period: '2024–2025', scope: 'Backoffice — 1,350+ frames, 14 feature areas' },
  { client: 'Retail bank — mobile', industry: 'Financial Services', period: '2024–2025', scope: 'Mobile Banking App Redesign — 1,590+ screens, 12 core features' },
  { client: 'National workforce fund', industry: 'Government', period: '2023–present', scope: 'National Workforce Platform — end-to-end digital funding ecosystem' },
]

const deloitteEngagements = [
  { client: 'Major airline', industry: 'Aviation', period: '2022–2023', scope: 'Passenger digital experience redesign' },
  { client: 'Energy group', industry: 'Energy', period: '2021–2022', scope: 'B2B customer portal and internal operations platform' },
  { client: 'Automotive manufacturer', industry: 'Automotive', period: '2020–2021', scope: 'Fleet management and dealer digital tools' },
  { client: 'Insurance provider', industry: 'Insurance', period: '2019–2020', scope: 'Claims management and customer-facing portal redesign' },
  { client: 'Energy operator', industry: 'Energy', period: '2019', scope: 'Internal digital workspace' },
  { client: 'Insurance group', industry: 'Insurance', period: '2018–2019', scope: 'Digital product design for broker platform' },
  { client: 'Automotive brand', industry: 'Automotive', period: '2018', scope: 'Dealer-facing UX design sprint' },
  { client: 'Various clients', industry: 'Multiple', period: '2018–2023', scope: 'Workshop facilitation, design sprints, UX audits' },
]

const divider = <div style={{ height: 1, background: '#EAF1FF' }} />

function TimelineRow({ period, children }: { period: string; children: React.ReactNode }) {
  return (
    <div className="timeline-row" style={{ padding: '32px 0 32px 0', borderRadius: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#001A5C', paddingTop: 4 }}>{period}</div>
      <div>{children}</div>
    </div>
  )
}

export default function Journey() {
  const [kpmgOpen, setKpmgOpen] = useState(false)
  const [deloitteOpen, setDeloitteOpen] = useState(false)

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* HEADER */}
      <div style={{ position: 'relative', padding: 'clamp(100px,15vw,150px) 20px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ position: 'absolute', top: 40, right: -220, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,216,255,0.28), transparent 70%)', filter: 'blur(75px)', zIndex: -1 }} />
        <div style={{ maxWidth: 900 }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 12 }}>Professional Journey</div>
          <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: 0 }}>From graphic design to product leadership</h1>
        </div>
      </div>

      {/* TIMELINE */}
      <div style={{ position: 'relative', padding: '40px 32px 140px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* KPMG */}
          <TimelineRow period="2023 — Present">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 4px' }}>Lead UX/UI Designer</h3>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#5A5F73', marginBottom: 12 }}>KPMG</div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 16px' }}>Took ownership of enterprise product design across multiple industries and regions, leading end-to-end digital products from discovery to delivery while shaping product strategy, design systems and scalable user experiences.</p>
            <button type="button" aria-expanded={kpmgOpen} className="engagement-toggle" onClick={() => setKpmgOpen(o => !o)}>
              {kpmgOpen ? <>Hide engagements<ChevronUp size={14} /></> : <>Show engagements<ChevronDown size={14} /></>}
            </button>
            {kpmgOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 16, padding: 20, background: '#F7FAFF', borderRadius: 14 }}>
                {kpmgEngagements.map((eng, i) => (
                  <div key={i} className="timeline-eng-row" style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, fontSize: 14, padding: '10px 0', borderBottom: i < kpmgEngagements.length - 1 ? '1px solid #EAF1FF' : 'none' }}>
                    <div style={{ fontWeight: 600, color: '#12141F' }}>{eng.client}</div>
                    <div style={{ color: '#5A5F73' }}>{eng.industry} · {eng.period}<br />{eng.scope}</div>
                  </div>
                ))}
              </div>
            )}
          </TimelineRow>

          {divider}

          {/* Deloitte */}
          <TimelineRow period="2018 — 2023">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 4px' }}>Digital Designer</h3>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#5A5F73', marginBottom: 12 }}>Deloitte Digital</div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 16px' }}>Grew from delivering individual screens to owning end-to-end digital experiences for aviation, energy, automotive and insurance clients.</p>
            <button type="button" aria-expanded={deloitteOpen} className="engagement-toggle" onClick={() => setDeloitteOpen(o => !o)}>
              {deloitteOpen ? <>Hide engagements<ChevronUp size={14} /></> : <>Show engagements<ChevronDown size={14} /></>}
            </button>
            {deloitteOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 16, padding: 20, background: '#F7FAFF', borderRadius: 14 }}>
                {deloitteEngagements.map((eng, i) => (
                  <div key={i} className="timeline-eng-row" style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, fontSize: 14, padding: '10px 0', borderBottom: i < deloitteEngagements.length - 1 ? '1px solid #EAF1FF' : 'none' }}>
                    <div style={{ fontWeight: 600, color: '#12141F' }}>{eng.client}</div>
                    <div style={{ color: '#5A5F73' }}>{eng.industry} · {eng.period}<br />{eng.scope}</div>
                  </div>
                ))}
              </div>
            )}
          </TimelineRow>

          {divider}

          {/* Wingman */}
          <TimelineRow period="2017 — 2018">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 4px' }}>Digital Designer</h3>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#5A5F73', marginBottom: 12 }}>Wingman</div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>First exposure to product thinking — designing for early-stage products where every decision had to earn its place.</p>
          </TimelineRow>

          {divider}

          {/* Ogilvy */}
          <TimelineRow period="Jan–Feb 2016">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 4px' }}>Trainee Motion Designer</h3>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#5A5F73', marginBottom: 12 }}>Ogilvy</div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>Short international placement focused on motion design fundamentals.</p>
          </TimelineRow>

          {divider}

          {/* Biocol */}
          <TimelineRow period="2015 — 2016">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 4px' }}>Creative Designer</h3>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#5A5F73', marginBottom: 12 }}>Biocol Labs</div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>Where it started — brand, packaging and editorial work that built the visual instincts everything since has drawn on.</p>
          </TimelineRow>

        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '40px 32px', fontSize: 13, color: '#6B7086' }}>© 2026 Nelson Lopes. Designed with care.</div>
    </div>
  )
}
