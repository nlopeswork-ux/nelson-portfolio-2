import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronRight from './ChevronRight'
import profileImg from '../imports/c6037aa9-14d7-4c26-9a01-4a3a2bb1cf8d.webp'

type Item = { to: string; label: string; cta: string; meta: string; desc: string }
type Featured = { to: string; label: string; title: string; desc: string; img: string; alt: string }

/**
 * Homepage v3: Work, Journey and About as three large cards stacked like a cascade.
 * The first card is in front, the next two sit behind it; scrolling moves the front card up and away
 * while the next one comes forward. Falls back to a plain column on small screens and with reduced motion.
 */
export default function HomeStack({ items, featured }: { items: Item[]; featured: Featured }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [p, setP] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 861px) and (prefers-reduced-motion: no-preference)')
    const set = () => setEnabled(mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  useEffect(() => {
    if (!enabled) { setP(0); return }
    let raf = 0
    const update = () => {
      raf = 0
      const el = wrap.current
      if (!el) return
      const top = el.getBoundingClientRect().top
      setP(Math.min(items.length - 1, Math.max(0, -top / window.innerHeight)))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [enabled, items.length])

  const style = (i: number) => {
    if (!enabled) return undefined
    const r = i - p
    if (r > 0) return { zIndex: items.length - i, transform: `translateY(${r * 30}px) scale(${1 - r * 0.045})`, opacity: 1 }
    const t = Math.min(1, -r)
    return { zIndex: items.length - i, transform: `translateY(${-t * 108}%) scale(${1 - t * 0.03})`, opacity: Math.max(0, 1 - t * 1.8) }
  }
  const front = (i: number) => !enabled || Math.abs(i - p) < 0.5
  const [work, journey, about] = items

  return (
    <section className={`stack${enabled ? ' is-live' : ''}`} ref={wrap} style={enabled ? { height: `${items.length * 100}vh` } : undefined}>
      <div className="stack-sticky">
        <div className="stack-stage">
          {/* WORK */}
          <article className="stack-card stack-card--work" style={style(0)} {...(front(0) ? {} : { inert: true })}>
            <span className="hs-blob" aria-hidden="true" />
            <div className="stack-copy">
              <span className="hs-meta">{work.meta}</span>
              <h2 className="stack-title">{work.label}</h2>
              <p className="stack-desc">{work.desc}</p>
              <div className="hs-actions">
                <Link to={work.to} className="hs-cta hs-cta-main">{work.cta}<ChevronRight size={15} /></Link>
                <Link to={featured.to} className="hs-cta hs-featured-link">{featured.label}: {featured.title}<ChevronRight size={15} /></Link>
              </div>
            </div>
            <div className="stack-visual"><img src={featured.img} alt={featured.alt} /></div>
          </article>

          {/* JOURNEY */}
          <article className="stack-card stack-card--journey" style={style(1)} {...(front(1) ? {} : { inert: true })}>
            <div className="stack-copy">
              <span className="hs-meta">{journey.meta}</span>
              <h2 className="stack-title">{journey.label}</h2>
              <p className="stack-desc">{journey.desc}</p>
              <div className="hs-actions">
                <Link to={journey.to} className="hs-cta hs-cta-main">{journey.cta}<ChevronRight size={15} /></Link>
              </div>
            </div>
            <div className="stack-visual" aria-hidden="true">
              <svg viewBox="0 0 420 120" className="stack-timeline">
                <line x1="30" y1="60" x2="390" y2="60" stroke="#C9D3F2" strokeWidth="3" strokeLinecap="round" />
                {[40, 150, 260].map(x => <circle key={x} cx={x} cy="60" r="12" fill="#002FA7" />)}
                <circle cx="372" cy="60" r="14" fill="#FF6F00" />
              </svg>
            </div>
          </article>

          {/* ABOUT */}
          <article className="stack-card stack-card--about" style={style(2)} {...(front(2) ? {} : { inert: true })}>
            <div className="stack-copy">
              <span className="hs-meta">{about.meta}</span>
              <h2 className="stack-title">{about.label}</h2>
              <p className="stack-desc">{about.desc}</p>
              <div className="hs-actions">
                <Link to={about.to} className="hs-cta hs-cta-main">{about.cta}<ChevronRight size={15} /></Link>
              </div>
            </div>
            <div className="stack-visual"><img src={profileImg} alt="" className="stack-photo" /></div>
          </article>
        </div>
      </div>
    </section>
  )
}
