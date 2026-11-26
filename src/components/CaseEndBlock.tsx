import { Link } from 'react-router-dom'
import ChevronRight from './ChevronRight'
import { useLanguage } from '../i18n/LanguageContext'
import { useMemo } from 'react'
import { randomCases } from './relatedCases'

const copy = {
  en: {
    ctaTitle: "Let's build something thoughtful together.",
    ctaSub: 'Based in Lisbon, open to select global opportunities.',
    ctaButton: 'Get in touch',
    workTitle: "While you're here",
    workSub: 'Two case studies worth a look.',
    allWork: 'See all work',
  },
  pt: {
    ctaTitle: 'Vamos construir algo cuidado, juntos.',
    ctaSub: 'Vivo em Lisboa, disponível para oportunidades globais selecionadas.',
    ctaButton: 'Contactar',
    workTitle: 'Já que estás aqui',
    workSub: 'Dois cases que vale a pena ver.',
    allWork: 'Ver todo o trabalho',
  },
}

/**
 * Closing block for case studies and the Contact page: same treatment as the homepage Work card
 * (tinted surface, orange circle peeking from the bottom edge), laid out horizontally with two `.related-card`s,
 * the same cards used in the sidebar of the ERA and EDP case pages.
 * `withCta` = the page's single primary action (case studies). The Contact page already has its own primary.
 */
export default function CaseEndBlock({ slug = '', withCta = true }: { slug?: string; withCta?: boolean }) {
  const { lang } = useLanguage()
  const t = copy[lang]
  // random but stable for this page view; not the pair shown in the previous closing block
  const cases = useMemo(() => randomCases(slug, 2), [slug])
  return (
    <section className="ceb">
      <span className="ceb-circle" aria-hidden="true" />
      <div className="ceb-copy">
        <h2 className="ceb-title">{withCta ? t.ctaTitle : t.workTitle}</h2>
        <p className="ceb-sub">{withCta ? t.ctaSub : t.workSub}</p>
        <div className="ceb-actions">
          {withCta && <Link to="/contact" className="primary-btn">{t.ctaButton}</Link>}
          <Link to="/work" className="hs-cta" style={{ marginTop: 0, paddingTop: 0 }}>{t.allWork}<ChevronRight size={15} /></Link>
        </div>
      </div>
      <ul className="related-list ceb-cases">
        {cases.map(c => (
          <li key={c.slug}>
            <Link to={`/work/${c.slug}`} className="related-card">
              <img src={c.image} alt="" className="related-thumb" />
              <span className="related-title">{c.title}</span>
              <ChevronRight size={14} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
