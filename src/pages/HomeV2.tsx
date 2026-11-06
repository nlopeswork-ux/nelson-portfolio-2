import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronRight from '../components/ChevronRight'
import { useLanguage, type Lang } from '../i18n/LanguageContext'
import intelliforgeImg from '../imports/hero.webp'

const copy = {
  en: {
    role: 'Lead Product Designer, Lisbon',
    title: 'Product systems for high-stakes decisions.',
    subtitle: 'I design the decision layer beneath enterprise products in banking, insurance and government, where clarity has to survive real deadlines.',
    viewWork: 'View selected work',
    getInTouch: 'Get in touch',
    stats: [
      { value: '11', label: 'years in product' },
      { value: '4', label: 'studios' },
      { value: '7', label: 'case studies live' },
    ],
    featuredLabel: 'Featured work',
    featuredTitle: 'IntelliForge SR2R',
    featuredDesc: 'A control layer for a 10× bid.',
    seeCaseStudy: 'See case study',
    index: [
      { to: '/work', label: 'Work', meta: '7 case studies', desc: 'Enterprise systems where the interface is only as good as the decisions underneath it.' },
      { to: '/journey', label: 'Journey', meta: '11 years, 4 studios', desc: 'From graphic design to leading product strategy. One throughline.' },
      { to: '/about', label: 'About', meta: 'Philosophy and curiosity', desc: 'How I think, what I believe about design, and what keeps me curious beyond the screen.' },
    ],
    contactTitle: "Let's build something thoughtful together.",
    contactSubtitle: 'Based in Lisbon. Open to select global opportunities.',
    emailMe: 'Email me directly',
  },
  pt: {
    role: 'Lead Product Designer, Lisboa',
    title: 'Sistemas de produto para decisões de alto risco.',
    subtitle: 'Desenho a camada de decisão por trás de produtos empresariais em banca, seguros e setor público, onde a clareza tem de sobreviver a prazos reais.',
    viewWork: 'Ver trabalho selecionado',
    getInTouch: 'Entrar em contacto',
    stats: [
      { value: '11', label: 'anos em produto' },
      { value: '4', label: 'estúdios' },
      { value: '7', label: 'case studies publicadas' },
    ],
    featuredLabel: 'Trabalho em destaque',
    featuredTitle: 'IntelliForge SR2R',
    featuredDesc: 'Uma camada de controlo para uma proposta 10×.',
    seeCaseStudy: 'Ver case study',
    index: [
      { to: '/work', label: 'Trabalho', meta: '7 case studies', desc: 'Sistemas empresariais onde a interface só é tão boa quanto as decisões por trás dela.' },
      { to: '/journey', label: 'Percurso', meta: '11 anos, 4 estúdios', desc: 'Do design gráfico à liderança de estratégia de produto. Um só fio condutor.' },
      { to: '/about', label: 'Sobre', meta: 'Filosofia e curiosidade', desc: 'Como penso, no que acredito em design, e o que me mantém curioso para além do ecrã.' },
    ],
    contactTitle: 'Vamos construir algo cuidado, juntos.',
    contactSubtitle: 'Vivo em Lisboa. Disponível para oportunidades globais selecionadas.',
    emailMe: 'Enviar email diretamente',
  },
}

export default function HomeV2() {
  const { lang } = useLanguage()
  const t = copy[lang as Lang]

  return (
    <div className="hv2-page">
      <Nav />

      {/* HERO: asymmetric, left-aligned display type */}
      <section className="hv2-hero">
        <div className="hv2-halo" aria-hidden="true" />
        <div className="hv2-hero-grid">
          <div className="hv2-hero-copy">
            <div className="hero-reveal hv2-eyebrow" style={{ transitionDelay: '0ms' }}>{t.role}</div>
            <h1 className={`hero-reveal hv2-title${lang === 'pt' ? ' hv2-title-pt' : ''}`} style={{ transitionDelay: '60ms' }}>{t.title}</h1>
            <p className="hero-reveal hv2-subtitle" style={{ transitionDelay: '120ms' }}>{t.subtitle}</p>
            <div className="hero-reveal hv2-actions" style={{ transitionDelay: '180ms' }}>
              <Link to="/work" className="primary-btn hv2-btn-primary">{t.viewWork}<ChevronRight /></Link>
              <Link to="/contact" className="hv2-btn-quiet">{t.getInTouch}</Link>
            </div>
          </div>
          <dl className="hero-reveal hv2-stats" style={{ transitionDelay: '240ms' }}>
            {t.stats.map(s => (
              <div key={s.label} className="hv2-stat">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FEATURED: image with an overlapping text panel */}
      <section className="hv2-featured">
        <Link to="/work/intelliforge" className="hv2-featured-media" aria-label={`${t.featuredTitle}. ${t.seeCaseStudy}`}>
          <img src={intelliforgeImg} alt="IntelliForge SR2R desktop preview" />
        </Link>
        <div className="hv2-featured-panel">
          <div className="hv2-eyebrow">{t.featuredLabel}</div>
          <h2>{t.featuredTitle}</h2>
          <p>{t.featuredDesc}</p>
          <Link to="/work/intelliforge" className="hv2-link">{t.seeCaseStudy}<ChevronRight size={15} /></Link>
        </div>
      </section>

      {/* INDEX: dense typographic list */}
      <section className="hv2-index">
        <ul>
          {t.index.map(({ to, label, meta, desc }) => (
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
      </section>

      {/* CONTACT: full-bleed colour band resets the rhythm */}
      <section className="hv2-contact" id="contact">
        <div className="hv2-contact-inner">
          <h2>{t.contactTitle}</h2>
          <div>
            <p>{t.contactSubtitle}</p>
            <a href="mailto:nlopes.nl@gmail.com" className="hv2-btn-light">{t.emailMe}<ChevronRight /></a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
