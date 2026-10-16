import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronRight from '../components/ChevronRight'
import { useLanguage, type Lang } from '../i18n/LanguageContext'
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

const copy = {
  en: {
    role: 'Lead Product Designer — Lisbon, Portugal',
    titleLine1: 'Product systems for complex,',
    titleLine2Pre: '',
    titleLine2Highlight: 'high-stakes',
    titleLine2Post: ' decisions.',
    subtitle: 'I design the decision layer beneath enterprise products — banking, insurance, government — where clarity has to survive real deadlines and real stakes.',
    heroTags: [
      { icon: 'pen', label: 'Product Design', caption: 'Shaping end-to-end flows' },
      { icon: 'layers', label: 'Design Systems', caption: 'Scaling consistency' },
    ],
    viewWork: 'View selected work',
    getInTouch: 'Get in touch',
    featuredLabel: 'Featured work',
    featuredTitle: 'IntelliForge SR2R',
    featuredDesc: 'A control layer for a 10× bid.',
    seeCaseStudy: 'See case study',
    teasers: [
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
    ],
    contactTitleLine1: "Let's build something",
    contactTitleLine2: 'thoughtful together.',
    contactSubtitle: 'Based in Lisbon — open to select global opportunities.',
    emailMe: 'Email me directly',
  },
  pt: {
    role: 'Lead Product Designer — Lisboa, Portugal',
    titleLine1: 'Sistemas de produto para decisões',
    titleLine2Pre: 'complexas e de ',
    titleLine2Highlight: 'alto risco.',
    titleLine2Post: '',
    subtitle: 'Desenho a camada de decisão por trás de produtos empresariais — banca, seguros, setor público — onde a clareza tem de sobreviver a prazos e riscos reais.',
    heroTags: [
      { icon: 'pen', label: 'Product Design', caption: 'A desenhar fluxos end-to-end' },
      { icon: 'layers', label: 'Design Systems', caption: 'A escalar consistência' },
    ],
    viewWork: 'Ver trabalho selecionado',
    getInTouch: 'Entrar em contacto',
    featuredLabel: 'Trabalho em destaque',
    featuredTitle: 'IntelliForge SR2R',
    featuredDesc: 'Uma camada de controlo para uma proposta 10×.',
    seeCaseStudy: 'Ver case study',
    teasers: [
      {
        to: '/work', label: 'Trabalho', sub: '6 case studies publicadas, mais em curso',
        desc: 'Case studies de sistemas empresariais onde a interface só é tão boa quanto as decisões por trás dela.',
        cta: 'Ver o trabalho',
      },
      {
        to: '/journey', label: 'Percurso', sub: '11 anos, 4 estúdios, um só fio condutor',
        desc: 'Do design gráfico à liderança de estratégia de produto — onze anos, quatro estúdios, um só fio condutor.',
        cta: 'Ver o percurso',
      },
      {
        to: '/about', label: 'Sobre', sub: 'Filosofia de design, curiosidade e a pessoa por trás do trabalho',
        desc: 'Como penso, no que acredito em design, e o que me mantém curioso para além do ecrã.',
        cta: 'Saber mais',
      },
    ],
    contactTitleLine1: 'Vamos construir algo',
    contactTitleLine2: 'cuidado, juntos.',
    contactSubtitle: 'Vivo em Lisboa — disponível para oportunidades globais selecionadas.',
    emailMe: 'Enviar email diretamente',
  },
}

type Teaser = (typeof copy)['en']['teasers'][number]

const heroTagIcons: Record<string, React.ReactNode> = {
  pen: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#002FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  layers: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#002FA7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>,
}

const teaserTheme: Record<Teaser['to'], { base: string; glow: string; opacity: number }> = {
  '/work': { base: '#E9EEFB', glow: '#3D63E0', opacity: 0.26 },
  '/journey': { base: '#EFF2FC', glow: '#3D63E0', opacity: 0.18 },
  '/about': { base: '#F6F7FC', glow: '#3D63E0', opacity: 0.1 },
}

const teaserTilts: Record<Teaser['to'], number> = {
  '/work': -3,
  '/journey': 2,
  '/about': -2,
}

export default function Portfolio() {
  const { lang } = useLanguage()
  const t = copy[lang as Lang]
  const preview = useFadeIn()
  const teasers = useFadeIn()
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
            <span className="hero-float-icon">{heroTagIcons[t.heroTags[0].icon]}</span>
            <span>
              <span className="hero-float-label">{t.heroTags[0].label}</span>
              <span className="hero-float-caption">{t.heroTags[0].caption}</span>
            </span>
          </div>
        </div>
        <div
          className="hero-float-enter"
          style={{ bottom: 40, right: '5%', ['--enter-x' as string]: '36px', ['--enter-y' as string]: '28px', transitionDelay: '300ms' } as React.CSSProperties}
        >
          <div className="hero-float" style={{ animation: 'floatSlow 9s ease-in-out infinite 0.8s' }}>
            <span className="hero-float-icon">{heroTagIcons[t.heroTags[1].icon]}</span>
            <span>
              <span className="hero-float-label">{t.heroTags[1].label}</span>
              <span className="hero-float-caption">{t.heroTags[1].caption}</span>
            </span>
          </div>
        </div>

        <div style={{ position: 'relative', maxWidth: 920, margin: '0 auto', textAlign: 'center', padding: '0 32px 32px' }}>
          <div className="hero-reveal" style={{ transitionDelay: '0ms', fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 24 }}>{t.role}</div>
          <h1 className="hero-reveal" style={{ transitionDelay: '60ms', textWrap: 'balance', fontSize: lang === 'pt' ? 'clamp(38px,5.6vw,68px)' : 'clamp(42px,6.6vw,78px)', lineHeight: 1.06, fontWeight: 900, letterSpacing: '-0.04em', color: '#12141F', margin: '0 0 28px' }}>
            {t.titleLine1}{lang === 'en' ? <br /> : ' '}{t.titleLine2Pre}<span style={{ whiteSpace: 'nowrap' }}><span className="hero-highlight">{t.titleLine2Highlight}</span>{t.titleLine2Post}</span>
          </h1>
          <p className="hero-reveal" style={{ transitionDelay: '120ms', fontSize: 20, lineHeight: 1.6, fontWeight: 400, color: '#5A5F73', maxWidth: 600, margin: '0 auto 44px' }}>
            {t.subtitle}
          </p>
          <div className="hero-reveal" style={{ transitionDelay: '180ms', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/work" className="primary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 12, color: '#002FA7', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(120,150,255,0.12)', transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              {t.viewWork}<ChevronRight />
            </Link>
            <Link to="/contact" className="secondary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', color: '#002FA7', fontSize: 15, fontWeight: 600 }}>
              {t.getInTouch}
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURED WORK PREVIEW */}
      <div ref={preview.ref} style={{ position: 'relative', padding: '32px 32px 112px', maxWidth: 1200, margin: '0 auto', ...preview.style }}>
        <div className="rg-featured">
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#6B7086', marginBottom: 6 }}>{t.featuredLabel}</div>
            <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em', color: '#12141F', margin: '0 0 6px' }}>{t.featuredTitle}</h2>
            <p style={{ fontSize: 16, color: '#5A5F73', margin: '0 0 8px' }}>{t.featuredDesc}</p>
            <Link to="/work/intelliforge" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 15, fontWeight: 600, color: '#3D63E0' }}>{t.seeCaseStudy}<ChevronRight size={15} /></Link>
          </div>

          <img
            src={intelliforgeImg}
            alt="IntelliForge SR2R desktop preview"
            style={{ width: '100%', height: 'auto', borderRadius: 16 }}
          />
        </div>
      </div>

      {/* AREA TEASERS */}
      <div ref={teasers.ref} style={{ position: 'relative', padding: '24px 32px 96px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="rg-teasers">
          {t.teasers.map(({ to, label, sub, desc, cta }, i) => {
            const tilt = teaserTilts[to]
            return (
              <div
                key={to}
                className="teaser-reveal"
                style={{
                  ['--tilt' as string]: `${tilt}deg`,
                  opacity: teasers.visible ? 1 : 0,
                  transform: teasers.visible
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
                  <div className="teaser-glow" style={{ background: teaserTheme[to].glow, opacity: teaserTheme[to].opacity }} />
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
              {t.contactTitleLine1}<br />{t.contactTitleLine2}
            </h2>
            <p style={{ fontSize: 17, color: '#5A5F73', margin: '0 0 36px' }}>{t.contactSubtitle}</p>
            <a href="mailto:nlopes.nl@gmail.com" className="primary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '18px 36px', background: '#002FA7', color: '#FFFFFF', borderRadius: 12, fontSize: 15, fontWeight: 600, transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              {t.emailMe}<ChevronRight />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
