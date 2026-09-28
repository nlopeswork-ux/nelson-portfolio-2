import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
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
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 600ms ease-out, transform 600ms ease-out' } }
}

export default function Portfolio() {
  const preview = useFadeIn()
  const teasers = useFadeIn()
  const contact = useFadeIn()

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* HERO */}
      <div style={{ position: 'relative', padding: 'clamp(100px,15vw,150px) 20px 80px' }}>
        <div style={{ position: 'absolute', top: -180, left: -160, width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,191,255,0.35), rgba(220,232,255,0.1) 60%, transparent 75%)', filter: 'blur(60px)', animation: 'driftA 22s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: -60, right: -220, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,216,255,0.22), rgba(242,246,255,0.08) 60%, transparent 75%)', filter: 'blur(70px)', animation: 'driftB 26s ease-in-out infinite' }} />

        <div style={{ position: 'relative', maxWidth: 920, margin: '0 auto', textAlign: 'center', padding: '0 32px 32px' }}>
          <div className="hero-reveal" style={{ transitionDelay: '0ms', fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 24 }}>Lead Product Designer — Lisbon, Portugal</div>
          <h1 className="hero-reveal" style={{ transitionDelay: '60ms', fontSize: 'clamp(42px,6.6vw,78px)', lineHeight: 1.06, fontWeight: 900, letterSpacing: '-0.04em', color: '#12141F', margin: '0 0 28px' }}>
            Product systems for complex,<br />high-stakes decisions.
          </h1>
          <p className="hero-reveal" style={{ transitionDelay: '120ms', fontSize: 20, lineHeight: 1.6, fontWeight: 400, color: '#5A5F73', maxWidth: 600, margin: '0 auto 44px' }}>
            I design the decision layer beneath enterprise products — banking, insurance, government — where clarity has to survive real deadlines and real stakes.
          </p>
          <div className="hero-reveal" style={{ transitionDelay: '180ms', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/work" className="primary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 24, color: '#002FA7', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(120,150,255,0.12)', transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              View selected work<ChevronRight />
            </Link>
            <Link to="/contact" className="secondary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', color: '#002FA7', fontSize: 15, fontWeight: 600 }}>
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURED WORK PREVIEW */}
      <div ref={preview.ref} style={{ position: 'relative', padding: '24px 32px 96px', maxWidth: 1200, margin: '0 auto', ...preview.style }}>
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
      <div ref={teasers.ref} style={{ position: 'relative', padding: '20px 32px 32px', maxWidth: 1200, margin: '0 auto', ...teasers.style }}>
        <div className="rg-teasers">
          {[
            {
              to: '/work',
              icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#002FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
              label: 'Work', sub: '6 case studies live, more in progress',
              desc: 'Case studies from enterprise systems where the interface is only as good as the decisions underneath it.',
              cta: 'See the work',
            },
            {
              to: '/journey',
              icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#002FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><circle cx="19" cy="9" r="2"/><path d="M5 8v4a3 3 0 0 0 3 3h2"/><path d="M14 17l3-3a3 3 0 0 0 .9-2.1V10"/></svg>,
              label: 'Journey', sub: '11 years, 4 studios, one throughline',
              desc: 'From graphic design to leading product strategy — eleven years, four studios, one throughline.',
              cta: 'See the path',
            },
            {
              to: '/about',
              icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#002FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 19a5.5 5.5 0 0 1 11 0"/></svg>,
              label: 'About', sub: 'Design philosophy, curiosity, and the person behind it',
              desc: 'How I think, what I believe about design, and what keeps me curious beyond the screen.',
              cta: 'Read more',
            },
          ].map(({ to, icon, label, sub, desc, cta }) => (
            <Link key={to} to={to} className="teaser-card interactive-card" style={{ display: 'block', background: '#FFFFFF', padding: '32px 28px', borderRadius: 16, border: '1px solid #E9EBF2', boxShadow: '0 1px 2px rgba(18,20,31,0.03)', textDecoration: 'none', transition: 'box-shadow 180ms ease-out, transform 180ms ease-out' }}>
              <div style={{ marginBottom: 16 }}>{icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 12 }}>{label}</div>
              <div style={{ fontSize: 13, color: '#8A8FA3', marginBottom: 10 }}>{sub}</div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4A4F63', margin: '0 0 16px' }}>{desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600, color: '#3D63E0' }}>{cta}<ChevronRight size={15} /></div>
            </Link>
          ))}
        </div>
      </div>

      {/* CONTACT CTA */}
      <div id="contact" ref={contact.ref} style={{ position: 'relative', padding: '40px 32px 120px', maxWidth: 1200, margin: '0 auto', ...contact.style }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,191,255,0.3), transparent 70%)', filter: 'blur(70px)', zIndex: -1 }} />
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '40px 24px' }}>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 20px', lineHeight: 1.2 }}>
              Let's build something<br />thoughtful together.
            </h2>
            <p style={{ fontSize: 17, color: '#5A5F73', margin: '0 0 36px' }}>Based in Lisbon — open to select global opportunities.</p>
            <a href="mailto:nlopes.nl@gmail.com" className="primary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '18px 36px', background: '#002FA7', color: '#FFFFFF', borderRadius: 24, fontSize: 15, fontWeight: 600, transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              Email me directly<ChevronRight />
            </a>
          </div>
          <div style={{ textAlign: 'center', marginTop: 48, fontSize: 13, color: '#6B7086' }}>© 2026 Nelson Lopes. Designed with care.</div>
        </div>
      </div>
    </div>
  )
}
