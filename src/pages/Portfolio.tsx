import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronRight from '../components/ChevronRight'
import { useLanguage, type Lang } from '../i18n/LanguageContext'
import intelliforgeImg from '../imports/hero.webp'

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
    viewWork: 'View selected work',
    getInTouch: 'Get in touch',
    featuredLabel: 'Featured work',
    featuredTitle: 'IntelliForge SR2R',
    featuredDesc: 'A control layer for a 10× bid.',
    seeCaseStudy: 'See case study',
    rows: [
      { to: '/work', label: 'Work', meta: '7 case studies', desc: 'Enterprise systems where the interface is only as good as the decisions underneath it.' },
      { to: '/journey', label: 'Journey', meta: '11 years, 4 studios', desc: 'From graphic design to leading product strategy. One throughline.' },
      { to: '/about', label: 'About', meta: 'Philosophy and curiosity', desc: 'How I think, what I believe about design, and what keeps me curious beyond the screen.' },
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
    viewWork: 'Ver trabalho selecionado',
    getInTouch: 'Entrar em contacto',
    featuredLabel: 'Trabalho em destaque',
    featuredTitle: 'IntelliForge SR2R',
    featuredDesc: 'Uma camada de controlo para uma proposta 10×.',
    seeCaseStudy: 'Ver case study',
    rows: [
      { to: '/work', label: 'Trabalho', meta: '7 case studies', desc: 'Sistemas empresariais onde a interface só é tão boa quanto as decisões por trás dela.' },
      { to: '/journey', label: 'Percurso', meta: '11 anos, 4 estúdios', desc: 'Do design gráfico à liderança de estratégia de produto. Um só fio condutor.' },
      { to: '/about', label: 'Sobre', meta: 'Filosofia e curiosidade', desc: 'Como penso, no que acredito em design, e o que me mantém curioso para além do ecrã.' },
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
      <div style={{ position: 'relative', padding: 'clamp(100px,15vw,150px) 20px 64px' }}>
        <div style={{ position: 'absolute', top: -180, left: -160, width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,191,255,0.35), rgba(220,232,255,0.1) 60%, transparent 75%)', willChange: 'transform', animation: 'driftA 22s var(--ease-in-out) infinite' }} />
        <div className="hero-bulb-halo" aria-hidden="true" />
        <div style={{ position: 'absolute', top: -60, right: -220, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,216,255,0.22), rgba(242,246,255,0.08) 60%, transparent 75%)', willChange: 'transform', animation: 'driftB 26s var(--ease-in-out) infinite' }} />

        {/* geometric accents */}
        <div className="hero-accent" style={{ top: 140, left: '7%', width: 14, height: 14, background: 'var(--color-accent)', borderRadius: 4, transform: 'rotate(45deg)', opacity: 0.5, animation: 'floatSlow 7s ease-in-out infinite' }} />

        <div style={{ position: 'relative', maxWidth: 920, margin: '0 auto', textAlign: 'center', padding: '0 32px 32px' }}>
          <div className="hero-reveal" style={{ transitionDelay: '0ms', fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 24 }}>{t.role}</div>
          <h1 className="hero-reveal" style={{ transitionDelay: '60ms', textWrap: lang === 'pt' ? 'balance' : undefined, fontSize: lang === 'pt' ? 'clamp(38px,5.6vw,68px)' : 'clamp(42px,6.6vw,78px)', lineHeight: 1.06, fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--ink-headline)', margin: '0 0 28px' }}>
            {t.titleLine1}{lang === 'en' ? <br /> : ' '}{t.titleLine2Pre}<span style={{ whiteSpace: 'nowrap' }}><span className="hero-highlight">{t.titleLine2Highlight}</span></span>{t.titleLine2Post ? <>{' '}<span style={{ whiteSpace: 'nowrap' }}>{t.titleLine2Post.trim()}</span></> : null}
          </h1>
          <p className="hero-reveal" style={{ transitionDelay: '120ms', fontSize: 20, lineHeight: 1.6, fontWeight: 400, color: '#5A5F73', maxWidth: 600, margin: '0 auto 44px' }}>
            {t.subtitle}
          </p>
          <div className="hero-reveal" style={{ transitionDelay: '180ms', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/work" className="primary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', background: '#002FA7', borderRadius: 12, color: '#FFFFFF', fontSize: 15, fontWeight: 600, transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              {t.viewWork}<ChevronRight />
            </Link>
            <Link to="/contact" className="secondary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', color: '#002FA7', fontSize: 15, fontWeight: 600 }}>
              {t.getInTouch}
            </Link>
          </div>
        </div>
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

      {/* AREA ROWS */}
      <div ref={rows.ref} className="hv2-index hv1-rows" style={{ paddingTop: 0, paddingBottom: 96, ...rows.style }}>
        <ul style={{ marginTop: 0 }}>
          {t.rows.map(({ to, label, meta, desc }) => (
            <li key={to}>
              <Link to={to} className="hv2-row" onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`); e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`) }}>
                <span className="hv2-row-label">{label}</span>
                <span className="hv2-row-body">
                  <span className="hv2-row-meta">{meta}</span>
                  <span className="hv2-row-desc">{desc}</span>
                </span>
                <span className="hv2-row-arrow" aria-hidden="true"><ChevronRight size={22} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CONTACT CTA */}
      <div id="contact" ref={contact.ref} style={{ position: 'relative', padding: '64px 32px 120px', maxWidth: 1200, margin: '0 auto', ...contact.style }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,191,255,0.3), transparent 70%)', filter: 'blur(70px)', zIndex: -1 }} />
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', padding: '40px 24px' }}>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink-headline)', margin: '0 0 20px', lineHeight: 1.2 }}>
              {t.contactTitleLine1}<br />{t.contactTitleLine2}
            </h2>
            <p style={{ fontSize: 17, color: '#5A5F73', margin: '0 0 36px' }}>{t.contactSubtitle}</p>
            <a href="mailto:nlopes.nl@gmail.com" className="primary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', background: '#002FA7', color: '#FFFFFF', borderRadius: 12, fontSize: 15, fontWeight: 600, transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              {t.emailMe}<ChevronRight />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
