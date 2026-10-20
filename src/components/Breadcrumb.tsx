import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage, type Lang } from '../i18n/LanguageContext'

// One fixed slot for every page below the home page: same top offset, same
// left edge (the Work/Journey column) and same height, so the trail never
// moves when navigating between levels. Pages reserve the space with
// PAGE_TOP in their own top padding.
const text: Record<Lang, { home: string; nav: string; back: string; pages: Record<string, string>; work: Record<string, string> }> = {
  en: {
    home: 'Home',
    nav: 'Breadcrumb',
    back: '← Back to Work',
    pages: { work: 'Work', journey: 'Journey', about: 'About', contact: 'Contact' },
    work: {
      intelliforge: 'IntelliForge SR2R',
      onerak: 'OneRAK Portal Revamp',
      tamkeen: 'National Workforce Digital Platform',
      'design-system': 'Internal Design System',
      'agentic-ux-flow': 'Agentic UX Flow',
      'edp-planeta-zero': 'EDP Planeta Zero',
      'era-revamp': 'ERA Digital Revamp',
      neot: 'NEOT',
      neobank: 'NeoBank',
    },
  },
  pt: {
    home: 'Início',
    nav: 'Caminho de navegação',
    back: '← Voltar ao Trabalho',
    pages: { work: 'Trabalho', journey: 'Percurso', about: 'Sobre', contact: 'Contacto' },
    work: {
      intelliforge: 'IntelliForge SR2R',
      onerak: 'OneRAK Portal Revamp',
      tamkeen: 'National Workforce Digital Platform',
      'design-system': 'Design System Interno',
      'agentic-ux-flow': 'Agentic UX Flow',
      'edp-planeta-zero': 'EDP Planeta Zero',
      'era-revamp': 'ERA Digital Revamp',
      neot: 'NEOT',
      neobank: 'NeoBank',
    },
  },
}

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const { lang } = useLanguage()
  const t = text[lang]
  const [section, slug] = pathname.split('/').filter(Boolean)
  if (!section) return null

  const trail: { label: string; to?: string }[] = [{ label: t.home, to: '/' }]
  const sectionLabel = t.pages[section] ?? section
  if (slug) {
    trail.push({ label: sectionLabel, to: `/${section}` })
    trail.push({ label: t.work[slug] ?? slug })
  } else {
    trail.push({ label: sectionLabel })
  }

  return (
    <nav aria-label={t.nav} className="breadcrumb" data-depth={slug ? 3 : 2}>
      {slug && <Link to={`/${section}`} className="breadcrumb-back">{t.back}</Link>}
      <ol className="breadcrumb-list">
        {trail.map((item, i) => {
          const last = i === trail.length - 1
          return (
            <Fragment key={item.label}>
              {i > 0 && <li aria-hidden="true" className="breadcrumb-sep">/</li>}
              <li className={last ? 'breadcrumb-item breadcrumb-current' : 'breadcrumb-item'}>
                {last || !item.to
                  ? <span aria-current="page">{item.label}</span>
                  : <Link to={item.to} className="breadcrumb-link">{item.label}</Link>}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
