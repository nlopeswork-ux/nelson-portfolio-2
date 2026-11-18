import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronRight from '../components/ChevronRight'
import { useLanguage, type Lang } from '../i18n/LanguageContext'
import intelliforgeImg from '../imports/hero.webp'
import showreelMp4 from '../imports/hero-showreel.mp4'
import showreelWebm from '../imports/hero-showreel.webm'
import showreelPoster from '../imports/hero-showreel-poster.jpg'

// Muted looping showreel (autoplay needs muted). Plays only while on screen,
// and stays on the poster frame when the visitor prefers reduced motion.
function HeroShowreel({ label }: { label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { el.pause(); return }
    if (typeof IntersectionObserver === 'undefined') { el.play().catch(() => {}); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.play().catch(() => {})
      else el.pause()
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <video ref={ref} aria-label={label} poster={showreelPoster} muted loop playsInline preload="metadata" disablePictureInPicture>
      <source src={showreelWebm} type="video/webm" />
      <source src={showreelMp4} type="video/mp4" />
    </video>
  )
}

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

const copy = {
  en: {
    role: 'Lead Product Designer · Lisbon, Portugal',
    titleLine1: 'Product systems for complex,',
    titleLine2Pre: '',
    titleLine2Highlight: 'high-stakes',
    titleLine2Post: ' decisions.',
    subtitle: 'I design the decision layer beneath enterprise products: banking, insurance, government. Clarity has to survive real deadlines and real stakes.',
    showreelLabel: 'Showreel of product work: banking app login and AI assistant, delivery console, government platforms.',
    viewWork: 'View work',
    getInTouch: 'Get in touch',
    featuredLabel: 'Featured work',
    featuredTitle: 'IntelliForge SR2R',
    featuredDesc: 'A control layer for a 10× bid.',
    seeCaseStudy: 'See case study',
    rows: [
      { to: '/work', label: 'Work', cta: 'See the work', meta: '7 case studies', desc: 'Enterprise systems where the interface is only as good as the decisions underneath it.' },
      { to: '/journey', label: 'Journey', cta: 'See the journey', meta: '11 years, 4 studios', desc: 'From graphic design to leading product strategy. One throughline.' },
      { to: '/about', label: 'About', cta: 'Get to know me', meta: 'Philosophy and curiosity', desc: 'How I think, what I believe about design, and what keeps me curious beyond the screen.' },
    ],
    contactTitleLine1: "Let's build something",
    contactTitleLine2: 'thoughtful together.',
    contactSubtitle: 'Based in Lisbon, open to select global opportunities.',
    emailMe: 'Email me directly',
  },
  pt: {
    role: 'Lead Product Designer · Lisboa, Portugal',
    titleLine1: 'Sistemas de produto para decisões',
    titleLine2Pre: 'complexas e de ',
    titleLine2Highlight: 'alto risco.',
    titleLine2Post: '',
    subtitle: 'Desenho a camada de decisão por trás de produtos empresariais: banca, seguros, setor público. A clareza tem de sobreviver a prazos e riscos reais.',
    showreelLabel: 'Showreel de trabalho de produto: login e assistente AI de uma app bancária, consola de operações, plataformas governamentais.',
    viewWork: 'Ver trabalho',
    getInTouch: 'Entrar em contacto',
    featuredLabel: 'Trabalho em destaque',
    featuredTitle: 'IntelliForge SR2R',
    featuredDesc: 'Uma camada de controlo para uma proposta 10×.',
    seeCaseStudy: 'Ver case study',
    rows: [
      { to: '/work', label: 'Trabalho', cta: 'Ver o trabalho', meta: '7 case studies', desc: 'Sistemas empresariais onde a interface só é tão boa quanto as decisões por trás dela.' },
      { to: '/journey', label: 'Percurso', cta: 'Ver o percurso', meta: '11 anos, 4 estúdios', desc: 'Do design gráfico à liderança de estratégia de produto. Um só fio condutor.' },
      { to: '/about', label: 'Sobre', cta: 'Conhecer-me', meta: 'Filosofia e curiosidade', desc: 'Como penso, no que acredito em design, e o que me mantém curioso para além do ecrã.' },
    ],
    contactTitleLine1: 'Vamos construir algo',
    contactTitleLine2: 'cuidado, juntos.',
    contactSubtitle: 'Vivo em Lisboa, disponível para oportunidades globais selecionadas.',
    emailMe: 'Enviar email diretamente',
  },
}

export default function Portfolio() {
  const { lang } = useLanguage()
  const t = copy[lang as Lang]
  const preview = useFadeIn()
  const rows = useFadeIn()
  const contact = useFadeIn()

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* HERO */}
      <div style={{ position: 'relative', padding: 'clamp(100px,15vw,150px) 20px var(--section-gap)' }}>
        <div style={{ position: 'absolute', top: -180, right: -160, width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,191,255,0.35), rgba(220,232,255,0.1) 60%, transparent 75%)', willChange: 'transform', animation: 'driftA 22s var(--ease-in-out) infinite' }} />
        <div className="hero-bulb-halo" aria-hidden="true" />
        <div style={{ position: 'absolute', top: -60, right: -220, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,216,255,0.22), rgba(242,246,255,0.08) 60%, transparent 75%)', willChange: 'transform', animation: 'driftB 26s var(--ease-in-out) infinite' }} />

        {/* geometric accents */}
        <div className="hero-accent" style={{ top: 140, right: '7%', width: 14, height: 14, background: 'var(--color-accent)', borderRadius: 4, transform: 'rotate(45deg)', opacity: 0.5, animation: 'floatSlow 7s ease-in-out infinite' }} />

        <div className="hv1-hero-grid">
        <div className="hv1-hero-copy">
          <div className="hero-reveal" style={{ transitionDelay: '0ms', fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 24 }}>{t.role}</div>
          <h1 className="hero-reveal" style={{ transitionDelay: '60ms', textWrap: 'balance', fontSize: lang === 'pt' ? 'clamp(32px,3.6vw,50px)' : 'clamp(34px,4vw,56px)', lineHeight: 1.06, fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--ink-headline)', margin: '0 0 28px' }}>
            {t.titleLine1}{' '}{t.titleLine2Pre}<span style={{ whiteSpace: 'nowrap' }}><span className="hero-highlight">{t.titleLine2Highlight}</span></span>{t.titleLine2Post ? <>{' '}<span style={{ whiteSpace: 'nowrap' }}>{t.titleLine2Post.trim()}</span></> : null}
          </h1>
          <p className="hero-reveal" style={{ transitionDelay: '120ms', fontSize: 20, lineHeight: 1.6, fontWeight: 400, color: '#5A5F73', maxWidth: 520, margin: '0 0 44px' }}>
            {t.subtitle}
          </p>
          <div className="hero-reveal hv1-hero-actions" style={{ transitionDelay: '180ms' }}>
            <Link to="/work" className="primary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', background: '#002FA7', borderRadius: 12, color: '#FFFFFF', fontSize: 15, fontWeight: 600, transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              {t.viewWork}<ChevronRight />
            </Link>
            <Link to="/contact" className="secondary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', color: '#002FA7', fontSize: 15, fontWeight: 600 }}>
              {t.getInTouch}
            </Link>
          </div>
        </div>
        <div className="hero-reveal hv1-hero-media" style={{ transitionDelay: '240ms' }}>
          <HeroShowreel label={t.showreelLabel} />
        </div>
        </div>
      </div>

      {/* AREA ROWS */}
      <div ref={rows.ref} className="hv2-index hv1-rows" style={{ paddingTop: 0, paddingBottom: 'var(--section-gap)', ...rows.style }}>
        <ul style={{ marginTop: 0 }}>
          {t.rows.map(({ to, label, cta, meta, desc }) => (
            <li key={to}>
              <Link to={to} className="case-card interactive-card hv1-card">
                <span className="hv1-card-badge">{meta}</span>
                <span className="hv1-card-title">{label}</span>
                <span className="hv1-card-desc">{desc}</span>
                <span className="hv1-card-link">{cta}<ChevronRight size={15} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* FEATURED WORK PREVIEW */}
      <div ref={preview.ref} className="hv1-feat-wrap" style={preview.style}>
        <Link to="/work/intelliforge" className="hv1-feat" aria-label={`${t.featuredTitle}, ${t.seeCaseStudy}`}>
          <div className="hv1-feat-copy">
            <div className="label-with-dot" style={{ fontSize: 14, fontWeight: 500, color: '#5A5F73', marginBottom: 14 }}><span aria-hidden="true" className="label-dot" />{t.featuredLabel}</div>
            <h2>{t.featuredTitle}</h2>
            <p>{t.featuredDesc}</p>
            <span className="hv1-feat-link">{t.seeCaseStudy}<ChevronRight size={16} /></span>
          </div>
          <div className="hv1-feat-media">
            <img src={intelliforgeImg} alt="IntelliForge SR2R desktop preview" />
          </div>
        </Link>
      </div>

      {/* CONTACT CTA */}
      <div id="contact" ref={contact.ref} style={{ position: 'relative', padding: '0 32px var(--section-gap)', maxWidth: 1200, margin: '0 auto', ...contact.style }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink-headline)', margin: '0 0 20px', lineHeight: 1.2 }}>
              {t.contactTitleLine1}<br />{t.contactTitleLine2}
            </h2>
            <p style={{ fontSize: 17, color: '#5A5F73', margin: '0 0 36px' }}>{t.contactSubtitle}</p>
            <a href="mailto:nlopes.nl@gmail.com" className="secondary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', color: '#002FA7', fontSize: 15, fontWeight: 600 }}>
              {t.emailMe}
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
