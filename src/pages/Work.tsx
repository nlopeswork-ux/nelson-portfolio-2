import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronRight from '../components/ChevronRight'
import ChevronLeft from '../components/ChevronLeft'
import intelliforgeImg from '../imports/IntelliForge_SR2R.png'
import onerakImg from '../imports/OneRAK_Portal_Revamp.png'
import tamkeenImg from '../imports/National_Workforce_Digital_Platform.png'
import dsImg from '../imports/Internal_DS.png'
import edpAppPoster from '../imports/EDP-planetazero-app-poster.png'
import eraPoster from '../imports/era-showcase-poster.png'

const earlierWork = [
  {
    id: 'edp-planeta-zero',
    to: '/work/edp-planeta-zero',
    poster: edpAppPoster,
    eyebrow: 'EDP COMERCIAL — ENERGY · PORTUGAL',
    title: 'EDP Planeta Zero',
    description: 'Gamified app and programme website where customers earn Zs, level up and unlock rewards, with a CO₂ simulator and a community movement.',
    tag: 'Energy',
    cta: 'See case study',
    alt: 'EDP Planeta Zero product film thumbnail',
  },
  {
    id: 'era-revamp',
    to: '/work/era-revamp',
    poster: eraPoster,
    eyebrow: 'ERA IMOBILIÁRIA — REAL ESTATE · PORTUGAL',
    title: 'ERA Digital Revamp',
    description: 'A new fully digital website with smarter search, favourites with notes and a free home valuation.',
    tag: 'Real Estate',
    cta: 'See case study',
    alt: 'ERA Digital Revamp product film thumbnail',
  },
]

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

function WorkFilterTabs({ options, value, onChange }: { options: string[]; value: string; onChange: (next: string) => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    window.addEventListener('resize', updateScrollState)
    return () => { ro.disconnect(); window.removeEventListener('resize', updateScrollState) }
  }, [options.length])

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.7, 240), behavior: 'smooth' })
  }

  const focusAndSelect = (index: number) => {
    const next = options[(index + options.length) % options.length]
    onChange(next)
    tabRefs.current[next]?.focus()
    tabRefs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); focusAndSelect(index + 1); break
      case 'ArrowLeft': e.preventDefault(); focusAndSelect(index - 1); break
      case 'Home': e.preventDefault(); focusAndSelect(0); break
      case 'End': e.preventDefault(); focusAndSelect(options.length - 1); break
    }
  }

  return (
    <div className="work-filter-wrap">
      <div
        className="work-filter-track"
        role="radiogroup"
        aria-label="Filter by category"
        ref={trackRef}
        onScroll={updateScrollState}
      >
        {options.map((f, i) => (
          <button
            key={f}
            ref={el => { tabRefs.current[f] = el }}
            type="button"
            role="radio"
            aria-checked={value === f}
            tabIndex={value === f ? 0 : -1}
            className={`work-filter-tab${value === f ? ' is-active' : ''}`}
            onClick={() => onChange(f)}
            onKeyDown={e => onKeyDown(e, i)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className={`work-filter-fade work-filter-fade-left${canScrollLeft ? ' visible' : ''}`} aria-hidden="true" />
      <div className={`work-filter-fade work-filter-fade-right${canScrollRight ? ' visible' : ''}`} aria-hidden="true" />
      {canScrollLeft && (
        <button type="button" className="work-filter-scroll work-filter-scroll-left" onClick={() => scrollBy(-1)} aria-label="Scroll categories left">
          <ChevronLeft size={14} className="" />
        </button>
      )}
      {canScrollRight && (
        <button type="button" className="work-filter-scroll work-filter-scroll-right" onClick={() => scrollBy(1)} aria-label="Scroll categories right">
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  )
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
      <div style={{ padding: '24px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
        <WorkFilterTabs options={filterOptions} value={activeFilter} onChange={setActiveFilter} />
      </div>

      {/* RESULTS */}
      <div ref={list.ref} style={{ position: 'relative', padding: '24px 32px 80px', maxWidth: 1200, margin: '0 auto', ...list.style }}>
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
                  aspectRatio: '562 / 180',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600, color: '#002FA7' }}>Read the full case study<ChevronRight size={15} /></div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* EARLIER WORK */}
      <div style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(22px,3vw,28px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 12px' }}>Earlier work: UX/UI and product film</h2>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: '#5A5F73', maxWidth: 640, margin: '0 0 28px' }}>Digital experiences I designed end to end, presented through product films. I designed the UX/UI, screens and graphics, and wrote the storyboard and script with a copywriter — the animation was handled by a motion designer.</p>
        <div className="work-grid">
          {earlierWork.map(w => (
            <Link key={w.id} to={w.to} className="case-card interactive-card" style={{ display: 'block', textDecoration: 'none', borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(20,30,60,0.08)', boxShadow: '0 12px 32px rgba(120,150,255,0.08)', transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              <div style={{ padding: 12 }}>
                <div style={{ position: 'relative', width: '100%', borderRadius: 14, overflow: 'hidden', background: '#F5F7FC', aspectRatio: '562 / 180' }}>
                  <img
                    src={w.poster}
                    alt={w.alt}
                    onError={e => { e.currentTarget.style.display = 'none' }}
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(18,20,31,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M6 4l10 6-10 6V4z" fill="#FFFFFF" /></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '8px 24px 24px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#4A4F63', background: '#F2F6FF', display: 'inline-block', padding: '4px 11px', borderRadius: 11, marginBottom: 10 }}>{w.eyebrow}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 6px' }}>{w.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: '#5A5F73', margin: '0 0 12px' }}>{w.description}</p>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#4A4F63', background: '#F2F6FF', display: 'inline-block', padding: '4px 11px', borderRadius: 11, marginBottom: 14 }}>{w.tag}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600, color: '#002FA7' }}>{w.cta}<ChevronRight size={15} /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* PLACEHOLDER */}
      <div style={{ padding: '0 32px 120px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: 13, color: '#A0A4B8' }}>More case studies in progress</span>
      </div>

      <Footer />
    </div>
  )
}
