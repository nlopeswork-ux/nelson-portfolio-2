import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronRight from '../components/ChevronRight'
import { useLanguage, type Lang } from '../i18n/LanguageContext'
import HeroShowreel from '../components/HeroShowreel'
import intelliforgeImg from '../imports/hero.webp'

const copy = {
  en: {
    role: 'Lead Product Designer, Lisbon',
    title: 'Product systems for high-stakes decisions.',
    subtitle: 'I design the decision layer beneath enterprise products in banking, insurance and government, where clarity has to survive real deadlines.',
    viewWork: 'View work', showreelLabel: 'Showreel of product work: banking app login and AI assistant, delivery console, government platforms.',
    getInTouch: 'Get in touch',
    featuredLabel: 'Featured work',
    featuredTitle: 'IntelliForge SR2R',
    featuredDesc: 'A control layer for a 10× bid.',
    seeCaseStudy: 'See case study',
    index: [
      { to: '/work', label: 'Work', cta: 'See the work', meta: '7 case studies', desc: 'Enterprise systems where the interface is only as good as the decisions underneath it.' },
      { to: '/journey', label: 'Journey', cta: 'See the journey', meta: '11 years, 4 studios', desc: 'From graphic design to leading product strategy. One throughline.' },
      { to: '/about', label: 'About', cta: 'Get to know me', meta: 'Philosophy and curiosity', desc: 'How I think, what I believe about design, and what keeps me curious beyond the screen.' },
    ],
    contactTitle: "Let's build something thoughtful together.",
    contactSubtitle: 'Based in Lisbon. Open to select global opportunities.',
    emailMe: 'Email me directly',
  },
  pt: {
    role: 'Lead Product Designer, Lisboa',
    title: 'Sistemas de produto para decisões de alto risco.',
    subtitle: 'Desenho a camada de decisão por trás de produtos empresariais em banca, seguros e setor público, onde a clareza tem de sobreviver a prazos reais.',
    viewWork: 'Ver trabalho', showreelLabel: 'Showreel de trabalho de produto: login e assistente AI de uma app bancária, consola de operações, plataformas governamentais.',
    getInTouch: 'Entrar em contacto',
    featuredLabel: 'Trabalho em destaque',
    featuredTitle: 'IntelliForge SR2R',
    featuredDesc: 'Uma camada de controlo para uma proposta 10×.',
    seeCaseStudy: 'Ver case study',
    index: [
      { to: '/work', label: 'Trabalho', cta: 'Ver o trabalho', meta: '7 case studies', desc: 'Sistemas empresariais onde a interface só é tão boa quanto as decisões por trás dela.' },
      { to: '/journey', label: 'Percurso', cta: 'Ver o percurso', meta: '11 anos, 4 estúdios', desc: 'Do design gráfico à liderança de estratégia de produto. Um só fio condutor.' },
      { to: '/about', label: 'Sobre', cta: 'Conhecer-me', meta: 'Filosofia e curiosidade', desc: 'Como penso, no que acredito em design, e o que me mantém curioso para além do ecrã.' },
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
        <div className="hero-bulb-halo" aria-hidden="true" />
        <div className="hero-accent" style={{ top: 140, right: '7%', width: 14, height: 14, background: 'var(--color-accent)', borderRadius: 4, transform: 'rotate(45deg)', opacity: 0.5 }} />
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
          <div className="hero-reveal hv1-hero-media" style={{ transitionDelay: '240ms' }}>
            <HeroShowreel label={t.showreelLabel} />
          </div>
        </div>
      </section>

      {/* INDEX: three cards on one row, same surface as the Work page cards */}
      <section className="hv2-index hv1-rows">
        <ul>
          {t.index.map(({ to, label, cta, meta, desc }) => (
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

      {/* CONTACT: full-bleed colour band resets the rhythm */}
      <section className="hv2-contact" id="contact">
        <div className="hv2-contact-inner">
          <h2>{t.contactTitle}</h2>
          <div>
            <p>{t.contactSubtitle}</p>
            <a href="mailto:nlopes.nl@gmail.com" className="hv2-btn-outline">{t.emailMe}</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
