import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { relatedCases } from './relatedCases'
import CaseEndBlock from './CaseEndBlock'
import { tocLabel } from './tocLabels'
import { Link, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import Counter from './Counter'
import ChevronLeft from './ChevronLeft'
import ChevronRight from './ChevronRight'
import ChevronUp from './ChevronUp'
import ChevronDown from './ChevronDown'
import { useLanguage } from '../i18n/LanguageContext'

const shellCopy = {
  en: {
    backToWork: 'Back to all work',
    confidentiality: 'Client names and identifying details have been generalized to respect confidentiality agreements. Metrics and outcomes reflect the real scope and impact of the engagement.',
    onThisPage: 'On this page',
    showDetails: 'Show full details',
    hideDetails: 'Hide full details',
    relatedTitle: 'Also worth a look',
    depthLabel: 'Reading depth',
    depth: { summary: 'Summary', mid: 'Intermediate', full: 'Full' },
  },
  pt: {
    backToWork: 'Voltar a todo o trabalho',
    confidentiality: 'Os nomes de clientes e detalhes identificativos foram generalizados para respeitar acordos de confidencialidade. As métricas e os resultados refletem o âmbito e o impacto reais da colaboração.',
    onThisPage: 'Nesta página',
    showDetails: 'Ver todos os detalhes',
    hideDetails: 'Ocultar detalhes',
    relatedTitle: 'Vale também a pena ver',
    depthLabel: 'Profundidade de leitura',
    depth: { summary: 'Resumo', mid: 'Intermédio', full: 'Completo' },
  },
}

export type Depth = 'summary' | 'mid' | 'full'
const DEPTHS: Depth[] = ['summary', 'mid', 'full']

interface MetaItem {
  label: string
  value: string
  /** Abbreviated value shown in the hero; the full value appears on hover or focus. */
  short?: string
  span?: boolean
}

interface StatItem {
  value: string
  label: string
}

interface CaseStudyShellProps {
  title: string
  description: string
  meta: MetaItem[]
  stats: StatItem[]
  accentColor?: string
  /** Opt-in editorial treatment: fewer boxes, numbered sections, orange section bar */
  refined?: boolean
  children: React.ReactNode
}

interface TocItem {
  id: string
  label: string
}

const slugify = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// Reads the H2s that the page rendered inside <main>, gives them ids, and
// tracks which one is current while scrolling. Anchors are buttons, not
// href="#id", because the router already owns the URL hash.
function useSectionIndex(mainRef: React.RefObject<HTMLElement | null>, lockRef: React.MutableRefObject<number>, deps: unknown[]) {
  const [items, setItems] = useState<TocItem[]>([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const main = mainRef.current
    if (!main) return
    const heads = Array.from(main.querySelectorAll('h2')).filter(h => h.getClientRects().length > 0)
    const used = new Set<string>()
    const next = heads.map((h, i) => {
      let id = h.id || slugify(h.textContent || '') || `section-${i}`
      while (used.has(id)) id += `-${i}`
      used.add(id)
      h.id = id
      return { id, label: tocLabel(h.textContent || '') }
    })
    setItems(next)
    setActive(next[0]?.id ?? '')

    if (next.length === 0) return
    let frame = 0
    const update = () => {
      frame = 0
      if (Date.now() < lockRef.current) return
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setActive(next[next.length - 1].id)
        return
      }
      const line = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) + 48
      let current = next[0].id
      for (const { id } of next) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { items, active, setActive }
}

export default function CaseStudyShell({ title, description, meta, stats, accentColor = '#002FA7', refined = false, children }: CaseStudyShellProps) {
  const { lang } = useLanguage()
  const { pathname } = useLocation()
  const t = shellCopy[lang]
  const mainRef = useRef<HTMLElement>(null)
  const [tocOpen, setTocOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const lockRef = useRef(0)
  // Every case opens on the shortest version; the choice is not remembered between cases or visits.
  const [depth, setDepth] = useState<Depth>('summary')
  useEffect(() => { setDepth('summary') }, [pathname])
  // Reading depth: sections carry data-level="summary" | "mid" | "full" (unmarked ones always show).
  // The selector exists only when the case has at least two distinct levels, and offers only those.
  const [levels, setLevels] = useState<Depth[]>([])
  useLayoutEffect(() => {
    const found = new Set<string>()
    mainRef.current?.querySelectorAll(':scope > [data-level]').forEach(el => found.add(el.getAttribute('data-level') ?? ''))
    setLevels(DEPTHS.filter(d => found.has(d)))
  }, [lang, pathname])
  const leveled = levels.length >= 2
  const rank = (d: Depth) => DEPTHS.indexOf(d)
  // Nearest available level to the saved preference (ties go to the shorter version).
  const current: Depth = leveled ? levels.reduce((best, l) => (Math.abs(rank(l) - rank(depth)) < Math.abs(rank(best) - rank(depth)) ? l : best), levels[0]) : depth
  const levelName = (d: Depth) => (levels.length === 2 && d === levels[1] ? t.depth.full : t.depth[d])
  const { items, active, setActive } = useSectionIndex(mainRef, lockRef, [lang, pathname, leveled ? current : ''])
  const showToc = items.length >= 2
  const expanded = leveled ? current === levels[levels.length - 1] : detailsOpen
  const hasAbbr = meta.some(m => !!m.short && m.short !== m.value)

  const goTo = (id: string) => {
    setActive(id)
    lockRef.current = Date.now() + 900
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    setTocOpen(false)
  }

  return (
    <div style={{ position: 'relative', overflow: 'clip', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* HERO */}
      <div className="cs-container cs-hero cs-hero--card">
        <div style={{ position: 'absolute', top: -160, left: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(183,204,255,0.32), transparent 70%)', filter: 'blur(70px)', animation: 'driftA 24s var(--ease-in-out) infinite', zIndex: -1 }} />

        <div className={`${stats.length > 0 ? 'cs-herocard cs-herocard--stats' : 'cs-herocard'}${leveled ? ' cs-herocard--leveled' : ''}`} data-details={expanded} data-abbr={hasAbbr && !leveled}>
          {leveled && (
            <div className="cs-depth">
              <div className="work-filter-track work-filter-track--white" role="radiogroup" aria-label={t.depthLabel}>
                {levels.map(d => (
                  <button key={d} type="button" role="radio" aria-checked={current === d} className={`work-filter-tab${current === d ? ' is-active' : ''}`} onClick={() => setDepth(d)}>{levelName(d)}</button>
                ))}
              </div>
            </div>
          )}
          <h1 style={{ fontSize: 'clamp(28px,5.5vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink-headline)', margin: '0 0 24px', lineHeight: 1.1, maxWidth: 900 }}>{title}</h1>
          <p style={{ fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.7, color: '#5A5F73', maxWidth: 720, margin: '0 0 8px' }}>{description}</p>

          <div className="rg-meta" style={{ padding: '32px 0 0' }}>
            {meta.map(({ label, value, short, span }, i) => {
              const abbr = !!short && short !== value
              const m = abbr ? short!.match(/^(.*?)\s*(\+\d+)$/) : null
              return (
                <div key={label} className={`${i >= 3 ? 'cs-meta-extra ' : ''}${abbr ? 'cs-meta-item cs-meta-item--abbr' : 'cs-meta-item'}`} tabIndex={abbr ? 0 : undefined} style={{ gridColumn: span ? '1 / -1' : undefined, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#5A5F73', marginBottom: 8 }}>{label}</div>
                  <div className="cs-meta-value" style={{ fontSize: 15, fontWeight: 500, color: '#12141F', lineHeight: 1.5 }}>
                    {abbr ? (
                      <>
                        <span aria-hidden="true" className="cs-meta-short">
                          {(() => {
                            const base = m ? m[1] : short!
                            const cut = base.lastIndexOf(' ') + 1
                            return <>{base.slice(0, cut)}<span className="cs-meta-tail">{base.slice(cut)}{m ? <span className="cs-meta-more">{m[2]}</span> : <span className="cs-meta-ellipsis">…</span>}</span></>
                          })()}
                        </span>
                        <span className="cs-meta-full">{value}</span>
                      </>
                    ) : value}
                  </div>
                </div>
              )
            })}
          </div>

          {!leveled && (hasAbbr || meta.length > 3) && (
            <button type="button" className="cs-details-toggle" aria-expanded={detailsOpen} onClick={() => setDetailsOpen(o => !o)}>
              {detailsOpen ? t.hideDetails : t.showDetails}
              {detailsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}

          {stats.length > 0 && (
            <ul className="cs-herostats" style={{ '--stat-cols': stats.length } as React.CSSProperties}>
              {stats.map(({ value, label }, i) => (
                <li key={label} className="cs-herostat">
                  <div className="cs-herostat-num" style={{ color: accentColor }}>
                    <span className="cs-herostat-figure">
                      {i === 0 && <span aria-hidden="true" className="cs-herostat-dot" />}
                      <Counter value={value} />
                    </span>
                  </div>
                  <div className="cs-herostat-label">{label}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* CONTENT: 9 columns of content + 3 columns of sticky sidebar */}
      <div className="cs-container cs-layout">
        <main ref={mainRef} data-depth={leveled ? current : undefined} className={refined ? 'cs-main cs-refined' : 'cs-main'}>{children}</main>

        <aside className="cs-aside">
          {showToc ? (
            <nav aria-label={t.onThisPage} className="cs-toc" data-open={tocOpen}>
              <button type="button" className="cs-toc-toggle" aria-expanded={tocOpen} onClick={() => setTocOpen(o => !o)}>
                {t.onThisPage}
                {tocOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <div className="cs-toc-title">{t.onThisPage}</div>
              <ol className="cs-toc-list">
                {items.map(({ id, label }) => (
                  <li key={id}>
                    <button type="button" className="cs-toc-link" aria-current={active === id ? 'true' : undefined} onClick={() => goTo(id)}>{label}</button>
                  </li>
                ))}
              </ol>
            </nav>
          ) : (
            <div className="cs-toc cs-toc-short">
              <div className="cs-toc-title">{t.relatedTitle}</div>
              <ul className="related-list">
                {relatedCases(pathname.split('/').filter(Boolean)[1] ?? '').map(c => (
                  <li key={c.slug}>
                    <Link to={`/work/${c.slug}`} className="related-card">
                      <img src={c.image} alt="" className="related-thumb" />
                      <span className="related-title">{c.title}</span>
                      <ChevronRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* CLOSING BLOCK: the one primary action of a case study + two more cases */}
      <div className="cs-container" style={{ paddingTop: 'var(--section-gap)', paddingBottom: 64 }}>
        <CaseEndBlock slug={pathname.split('/').filter(Boolean)[1] ?? ''} />
      </div>

      <div className="cs-container" style={{ paddingBottom: 40, textAlign: 'center' }}>
        <p style={{ fontSize: 12, lineHeight: 1.6, color: '#6B7086', margin: 0 }}>{t.confidentiality}</p>
      </div>

      <Footer />
    </div>
  )
}

export function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 16, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 20px' }}>{children}</p>
}

export function SeverityChip({ children, tone = 'critical' }: { children: React.ReactNode; tone?: 'critical' | 'neutral' }) {
  const colors = tone === 'critical' ? { color: '#B23A3A', background: 'rgba(178,58,58,0.1)' } : { color: '#5A5F73', background: '#F2F6FF' }
  return (
    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 8, ...colors }}>
      {children}
    </span>
  )
}

export function DarkBox({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 28, borderRadius: 24, background: '#12141F', color: '#F2F6FF', marginBottom: 24 }}>
      {label && <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8FAEFF', marginBottom: 12 }}>{label}</div>}
      {children}
    </div>
  )
}

/** `captions`: WebVTT URL shown by default (used for English subtitles on videos narrated in Portuguese). */
export function VideoBlock({ src, poster, label, captions }: { src: string; poster?: string; label?: string; captions?: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {label && <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 10 }}>{label}</div>}
      <div className="cs-bleed" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(20,30,60,0.08)', boxShadow: '0 12px 32px rgba(120,150,255,0.08)', background: '#12141F' }}>
        <video key={captions ? 'cc' : 'plain'} controls controlsList="nodownload" onContextMenu={e => e.preventDefault()} preload="metadata" playsInline poster={poster} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <source src={src} type="video/mp4" />
          {captions && <track kind="subtitles" srcLang="en" label="English" src={captions} default />}
        </video>
      </div>
    </div>
  )
}

export function FeatureList({ title, items }: { title?: string; items: string[] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {title && <div style={{ fontSize: 15, fontWeight: 700, color: '#12141F', marginBottom: 12 }}>{title}</div>}
      <ul className="rg-2" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.6, color: '#4A4F63' }}>
            <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: '#002FA7', marginTop: 8, flexShrink: 0 }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
