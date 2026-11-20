import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronRight from '../components/ChevronRight'
import { useLanguage, type Lang } from '../i18n/LanguageContext'
import HomeShowcase from '../components/HomeShowcase'
import HeroShowreel from '../components/HeroShowreel'
import intelliforgeImg from '../imports/hero.webp'

const copy = {
  en: {
    role: 'Lead UX/UI Designer | Product Designer | AI Designer | Design Systems, Lisbon',
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
    contactTitleLine1: "Let's build something",
    contactTitleLine2: 'thoughtful together.',
    contactSubtitle: 'Based in Lisbon, open to select global opportunities.',
    emailMe: 'Email me directly',
  },
  pt: {
    role: 'Lead UX/UI Designer | Product Designer | AI Designer | Design Systems, Lisboa',
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
    contactTitleLine1: 'Vamos construir algo',
    contactTitleLine2: 'cuidado, juntos.',
    contactSubtitle: 'Vivo em Lisboa, disponível para oportunidades globais selecionadas.',
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
        <div className="hero-accent hero-dot-halo" style={{ top: 140, right: '7%', width: 14, height: 14, background: 'var(--color-accent)', borderRadius: '50%', opacity: 0.5 }} />
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

      {/* WORK / JOURNEY / ABOUT showcase */}
      <HomeShowcase
        items={t.index}
        featured={{ to: '/work/intelliforge', label: t.featuredLabel, title: t.featuredTitle, desc: t.featuredDesc, img: intelliforgeImg, alt: 'IntelliForge SR2R desktop preview' }}
      />

      {/* CONTACT: same centred block as v1 */}
      <div id="contact" style={{ position: 'relative', padding: '0 32px var(--section-gap)', maxWidth: 1200, margin: '0 auto' }}>
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
