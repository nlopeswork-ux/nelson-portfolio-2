import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ChevronRight from './ChevronRight'

type Item = { to: string; label: string; cta: string; meta: string; desc: string }
type Featured = { to: string; label: string; title: string; desc: string; img: string; alt: string }

// Homepage "Work / Journey / About" zone: one hero card for Work (with the featured case study
// bleeding off its edge) and two lighter cards beside it. Order of `items`: Work, Journey, About.
export default function HomeShowcase({ items, featured }: { items: Item[]; featured: Featured }) {
  const [work, ...rest] = items
  const card = useRef<HTMLDivElement>(null)

  // Playful touch: the orange circle rises from the bottom edge once the card's bottom edge appears on screen,
  // and stops at its resting height. Respects reduced motion (circle simply sits at rest).
  useEffect(() => {
    const el = card.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      // starts when the card's bottom edge enters the viewport (that is where the circle lives), done after 40% of the screen
      const p = Math.min(1, Math.max(0, (vh - el.getBoundingClientRect().bottom) / (vh * 0.4)))
      el.style.setProperty('--orb-p', p.toFixed(3))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="hs">
      <div className="hs-work interactive-card" ref={card}>
        <span className="hs-blob" aria-hidden="true" />
        <div className="hs-work-copy">
          <div className="hs-top"><span className="hs-meta">{work.meta}</span></div>
          <span className="hs-title hs-title-xl">{work.label}</span>
          <span className="hs-desc">{work.desc}</span>
          <div className="hs-actions">
            {/* Stretched link: the whole card opens the Work page; the featured link sits above it */}
            <Link to={work.to} className="hs-cta hs-cta-main">{work.cta}<ChevronRight size={15} /></Link>
            <Link to={featured.to} className="hs-cta hs-featured-link">{featured.label}: {featured.title}<ChevronRight size={15} /></Link>
          </div>
        </div>
        <Link to={featured.to} className="hs-work-media" tabIndex={-1} aria-hidden="true">
          <img src={featured.img} alt="" />
        </Link>
      </div>
      {rest.map((it, i) => (
        <Link key={it.to} to={it.to} className="hs-side interactive-card">
          <div className="hs-top"><span className="hs-meta">{it.meta}</span></div>
          <span className="hs-title">{it.label}</span>
          <span className="hs-desc">{it.desc}</span>
          <span className="hs-cta">{it.cta}<ChevronRight size={15} /></span>
        </Link>
      ))}
    </section>
  )
}
