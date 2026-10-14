import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronRight from '../components/ChevronRight'
import intelliforgeImg from '../imports/hero.png'

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible, style: { opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 600ms ease-out, transform 600ms ease-out' } }
}

const heroTags = [
  { icon: 'pen', label: 'Product Design', caption: 'Shaping end-to-end flows' },
  { icon: 'layers', label: 'Design Systems', caption: 'Scaling consistency' },
]

const heroTagIcons: Record<string, React.ReactNode> = {
  pen: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#002FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  layers: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#002FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>,
}

type TeaserPath = '/work' | '/journey' | '/about'

const teasers: { to: TeaserPath; label: string; sub: string; desc: string; cta: string }[] = [
  {
    to: '/work', label: 'Work', sub: '6 case studies live, more in progress',
    desc: 'Case studies from enterprise systems where the interface is only as good as the decisions underneath it.',
    cta: 'See the work',
  },
  {
    to: '/journey', label: 'Journey', sub: '11 years, 4 studios, one throughline',
    desc: 'From graphic design to leading product strategy — eleven years, four studios, one throughline.',
    cta: 'See the path',
  },
  {
    to: '/about', label: 'About', sub: 'Design philosophy, curiosity, and the person behind it',
    desc: 'How I think, what I believe about design, and what keeps me curious beyond the screen.',
    cta: 'Read more',
  },
]

const teaserTheme: Record<TeaserPath, { base: string; glow: string }> = {
  '/work': { base: '#F9F8FC', glow: '#F0845F' },
  '/journey': { base: '#F6FAF9', glow: '#4FBF93' },
  '/about': { base: '#F6F7FC', glow: '#6E86D6' },
}

const teaserTilts: Record<TeaserPath, number> = {
  '/work': -3,
  '/journey': 2,
  '/about': -2,
}

export default function Portfolio() {
  const preview = useFadeIn()
  const teaserGroup = useFadeIn()
  const contact = useFadeIn()

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* HERO */}
      <div style={{ position: 'relative', padding: 'clamp(100px,15vw,150px) 20px 80px' }}>
        <div style={{ position: 'absolute', top: -180, left: -160, width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,191,255,0.35), rgba(220,232,255,0.1) 60%, transparent 75%)', filter: 'blur(60px)', animation: 'driftA 22s var(--ease-in-out) infinite' }} />
        <div style={{ position: 'absolute', top: -60, right: -220, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,216,255,0.22), rgba(242,246,255,0.08) 60%, transparent 75%)', filter: 'blur(70px)', animation: 'driftB 26s var(--ease-in-out) infinite' }} />

        {/* geometric accents */}
        <div className="hero-accent" style={{ top: 140, left: '7%', width: 14, height: 14, background: '#3D63E0', borderRadius: 4, transform: 'rotate(45deg)', opacity: 0.5, animation: 'floatSlow 7s ease-in-out infinite' }} />
        <div className="hero-accent" style={{ top: 100, right: '10%', width: 8, height: 8, background: '#002FA7', borderRadius: '50%', opacity: 0.4, animation: 'floatSlow 9s ease-in-out infinite 1s' }} />
        <div className="hero-accent" style={{ bottom: 70, left: '12%', width: 10, height: 10, border: '2px solid #3D63E0', borderRadius: '50%', opacity: 0.45, animation: 'floatSlow 8s ease-in-out infinite 0.5s' }} />

        {/* floating labels — glass chips, not buttons. Each converges toward the
            headline from its own side: top-left tag drifts in from upper-left,
            bottom-right tag from lower-right, staggered and settling with a
            slight overshoot. */}
        <div
          className="hero-float-enter"
          style={{ top: 190, left: '4%', ['--enter-x' as string]: '-36px', ['--enter-y' as string]: '-28px', transitionDelay: '150ms' } as React.CSSProperties}
        >
          <div className="hero-float" style={{ animation: 'floatSlow 8s ease-in-out infinite' }}>
            <span className="hero-float-icon">{heroTagIcons[heroTags[0].icon]}</span>
            <span>
              <span className="hero-float-label">{heroTags[0].label}</span>
              <span className="hero-float-caption">{heroTags[0].caption}</span>
            </span>
          </div>
        </div>
        <div
          className="hero-float-enter"
          style={{ bottom: 40, right: '5%', ['--enter-x' as string]: '36px', ['--enter-y' as string]: '28px', transitionDelay: '300ms' } as React.CSSProperties}
        >
          <div className="hero-float" style={{ animation: 'floatSlow 9s ease-in-out infinite 0.8s' }}>
            <span className="hero-float-icon">{heroTagIcons[heroTags[1].icon]}</span>
            <span>
              <span className="hero-float-label">{heroTags[1].label}</span>
              <span className="hero-float-caption">{heroTags[1].caption}</span>
            </span>
          </div>
        </div>

        <div style={{ position: 'relative', maxWidth: 920, margin: '0 auto', textAlign: 'center', padding: '0 32px 32px' }}>
          <div className="hero-reveal" style={{ transitionDelay: '0ms', fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 24 }}>Lead Product Designer — Lisbon, Portugal</div>
          <h1 className="hero-reveal" style={{ transitionDelay: '60ms', fontSize: 'clamp(42px,6.6vw,78px)', lineHeight: 1.06, fontWeight: 900, letterSpacing: '-0.04em', color: '#12141F', margin: '0 0 28px' }}>
            Product systems for complex,<br /><span className="hero-highlight">high-stakes</span> decisions.
          </h1>
          <p className="hero-reveal" style={{ transitionDelay: '120ms', fontSize: 20, lineHeight: 1.6, fontWeight: 400, color: '#5A5F73', maxWidth: 600, margin: '0 auto 44px' }}>
            I design the decision layer beneath enterprise products — banking, insurance, government — where clarity has to survive real deadlines and real stakes.
          </p>
          <div className="hero-reveal" style={{ transitionDelay: '180ms', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/work" className="primary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 12, color: '#002FA7', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(120,150,255,0.12)', transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              View selected work<ChevronRight />
            </Link>
            <Link to="/contact" className="secondary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', color: '#002FA7', fontSize: 15, fontWeight: 600 }}>
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURED WORK PREVIEW */}
      <div ref={preview.ref} style={{ position: 'relative', padding: '32px 32px 112px', maxWidth: 1200, margin: '0 auto', ...preview.style }}>
        <div className="rg-featured">
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#6B7086', marginBottom: 6 }}>Featured work</div>
            <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em', color: '#12141F', margin: '0 0 6px' }}>IntelliForge SR2R</h2>
            <p style={{ fontSize: 16, color: '#5A5F73', margin: '0 0 8px' }}>A control layer for a 10× bid.</p>
            <Link to="/work/intelliforge" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 15, fontWeight: 600, color: '#3D63E0' }}>See case study<ChevronRight size={15} /></Link>
          </div>

          <img
            src={intelliforgeImg}
            alt="IntelliForge SR2R desktop preview"
            style={{ width: '100%', height: 'auto', borderRadius: 16 }}
          />
        </div>
      </div>

      {/* AREA TEASERS */}
      <div ref={teaserGroup.ref} style={{ position: 'relative', padding: '24px 32px 96px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="rg-teasers">
          {teasers.map(({ to, label, sub, desc, cta }, i) => {
            const tilt = teaserTilts[to]
            return (
              <div
                key={to}
                className="teaser-reveal"
                style={{
                  ['--tilt' as string]: `${tilt}deg`,
                  opacity: teaserGroup.visible ? 1 : 0,
                  transform: teaserGroup.visible
                    ? 'rotate(var(--tilt))'
                    : 'translateY(28px) rotate(calc(var(--tilt) * 3)) scale(0.97)',
                  transitionDelay: `${i * 70}ms`,
                } as React.CSSProperties}
              >
                <Link
                  to={to}
                  className="teaser-card-v3"
                  style={{ background: teaserTheme[to].base }}
                  aria-label={`${label} — ${sub}. ${desc}`}
                >
                  <div className="teaser-glow" style={{ background: teaserTheme[to].glow }} />
                  <div className="teaser-grain" />
                  <div className="teaser-label-v3" aria-hidden="true">{label}</div>
                  <div className="teaser-flip" aria-hidden="true">
                    <div className="teaser-face teaser-face-front">
                      <div className="teaser-sub-v3">{sub}</div>
                    </div>
                    <div className="teaser-face teaser-face-back">
                      <p className="teaser-desc-v3">{desc}</p>
                    </div>
                  </div>
                  <div className="teaser-cta-link" aria-hidden="true">{cta}<ChevronRight size={15} /></div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* CONTACT CTA */}
      <div id="contact" ref={contact.ref} style={{ position: 'relative', padding: '64px 32px 120px', maxWidth: 1200, margin: '0 auto', ...contact.style }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,191,255,0.3), transparent 70%)', filter: 'blur(70px)', zIndex: -1 }} />
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '40px 24px' }}>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 20px', lineHeight: 1.2 }}>
              Let's build something<br />thoughtful together.
            </h2>
            <p style={{ fontSize: 17, color: '#5A5F73', margin: '0 0 36px' }}>Based in Lisbon — open to select global opportunities.</p>
            <a href="mailto:nlopes.nl@gmail.com" className="primary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '18px 36px', background: '#002FA7', color: '#FFFFFF', borderRadius: 12, fontSize: 15, fontWeight: 600, transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              Email me directly<ChevronRight />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
