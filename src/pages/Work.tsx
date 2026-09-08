import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import intelliforgeImg from '../imports/IntelliForge_SR2R.png'
import onerakImg from '../imports/OneRAK_Portal_Revamp.png'
import tamkeenImg from '../imports/National_Workforce_Digital_Platform.png'
import dsImg from '../imports/Internal_DS.png'

const filterOptions = ['All', 'Financial Services', 'Government', 'Internal Platform']

const studies = [
  {
    id: 'intelliforge',
    to: '/work/intelliforge',
    client: 'Global energy company',
    title: 'IntelliForge SR2R',
    summary: 'Turned 200 manual close cycles into a governed, auditable system.',
    industry: 'Financial Services',
    tags: ['Financial Services'],
    quote: 'The confidence scoring changed how fast the team could move — cases that sat in review for a day now clear in minutes.',
    quoteAttribution: 'Head of Delivery, the client',
    color: 'linear-gradient(135deg, #002FA7 0%, #3D63E0 100%)',
    initials: 'SR2R',
    image: intelliforgeImg,
  },
  {
    id: 'onerak',
    to: '/work/onerak',
    client: 'KPMG × government economic zone authority',
    title: 'OneRAK Portal Revamp',
    summary: '18/18 services unified, 97.8% task success, 82% fewer support calls.',
    industry: 'Government',
    tags: ['Government'],
    quote: 'What used to take a full audit cycle to trace, we can now walk through in one meeting.',
    quoteAttribution: 'Engagement Lead, KPMG',
    color: 'linear-gradient(135deg, #0F4C75 0%, #1B6CA8 100%)',
    initials: 'GEZ',
    image: onerakImg,
  },
  {
    id: 'tamkeen',
    to: '/work/tamkeen',
    client: 'National workforce-development fund',
    title: 'National Workforce Digital Platform',
    summary: 'Replaced a fully manual funding process with one unified ecosystem.',
    industry: 'Government',
    tags: ['Government'],
    quote: null,
    quoteAttribution: null,
    color: 'linear-gradient(135deg, #1E3A5F 0%, #2E6EA6 100%)',
    initials: 'NEOT',
    image: tamkeenImg,
  },
  {
    id: 'design-system',
    to: '/work/design-system',
    client: 'Internal — multiple client domains',
    title: 'Internal Design System',
    summary: 'A shared foundation across 15 projects, delivering the flagship pilot 25% faster.',
    industry: 'Internal Platform',
    tags: ['Internal Platform'],
    quote: null,
    quoteAttribution: null,
    color: 'linear-gradient(135deg, #2D2D2D 0%, #4A4A6A 100%)',
    initials: 'DS',
    image: dsImg,
  },
]


function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 600ms ease-out, transform 600ms ease-out' } }
}

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All')
  const list = useFadeIn()

  const filtered = useMemo(() =>
    activeFilter === 'All' ? studies : studies.filter(s => s.tags.includes(activeFilter)),
    [activeFilter]
  )

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* HEADER */}
      <div style={{ position: 'relative', padding: 'clamp(100px,15vw,150px) 20px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 12 }}>Work</div>
        <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 16px', maxWidth: 700 }}>
          Case studies from the decision layer.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#5A5F73', maxWidth: 600, margin: 0 }}>
          Selected engagements where the interface was only as good as the decisions built underneath it.
        </p>
      </div>

      {/* FILTERS */}
      <div style={{ padding: '24px 32px 0', maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {filterOptions.map(f => (
          <button
            key={f}
            type="button"
            className="filter-chip"
            onClick={() => setActiveFilter(f)}
            style={{
              cursor: 'pointer', padding: '9px 18px', fontSize: 13, fontWeight: 600, borderRadius: 20,
              background: activeFilter === f ? '#002FA7' : '#F5F7FC',
              color: activeFilter === f ? '#FFFFFF' : '#4A4F63',
              border: `1px solid ${activeFilter === f ? '#002FA7' : 'rgba(27,42,74,0.08)'}`,
              transition: 'background 200ms ease-out, color 200ms ease-out',
              fontFamily: "'Inter', sans-serif",
            }}
          >{f}</button>
        ))}
      </div>

      {/* RESULTS */}
      <div ref={list.ref} style={{ position: 'relative', padding: '24px 32px', maxWidth: 1200, margin: '0 auto', ...list.style }}>
        <div className="work-grid">
          {filtered.map(s => (
            <Link key={s.id} to={s.to} className="case-card interactive-card" style={{ display: 'block', textDecoration: 'none', borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(20,30,60,0.08)', boxShadow: '0 12px 32px rgba(120,150,255,0.08)', transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              <div style={{ padding: 12 }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#F5F7FC',
                  aspectRatio: '4 / 3',
                  maxHeight: 280,
                }}>
                  <img
                    src={s.image}
                    alt={s.title}
                    onError={e => { e.currentTarget.style.display = 'none' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, transparent, #ffffff)', pointerEvents: 'none' }} />
                </div>
              </div>
              <div style={{ padding: '8px 24px 24px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#4A4F63', background: '#F2F6FF', display: 'inline-block', padding: '4px 11px', borderRadius: 11, marginBottom: 10 }}>{s.industry}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 6px' }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: '#5A5F73', margin: '0 0 12px' }}>{s.summary}</p>
                {s.quote && (
                  <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(20,30,60,0.03)', marginBottom: 14 }}>
                    <p style={{ fontSize: 13.5, fontStyle: 'italic', lineHeight: 1.55, color: '#3A3F4C', margin: '0 0 6px' }}>"{s.quote}"</p>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#001A5C' }}>— {s.quoteAttribution}</div>
                  </div>
                )}
                <div style={{ fontSize: 14, fontWeight: 600, color: '#002FA7' }}>Read the full case study →</div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* PLACEHOLDER */}
      <div style={{ padding: '0 32px 120px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: 13, color: '#A0A4B8' }}>More case studies in progress</span>
      </div>

      <div style={{ textAlign: 'center', padding: '40px 32px', fontSize: 13, color: '#6B7086' }}>© 2026 Nelson Lopes. Designed with care.</div>
    </div>
  )
}
