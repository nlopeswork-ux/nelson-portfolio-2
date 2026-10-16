import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage, type Lang } from '../i18n/LanguageContext'
import ChevronDown from './ChevronDown'

const linksByLang: Record<Lang, { to: string; label: string }[]> = {
  en: [
    { to: '/work', label: 'Work' },
    { to: '/journey', label: 'Journey' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ],
  pt: [
    { to: '/work', label: 'Trabalho' },
    { to: '/journey', label: 'Percurso' },
    { to: '/about', label: 'Sobre' },
    { to: '/contact', label: 'Contacto' },
  ],
}

const LANG_LABEL: Record<Lang, string> = { pt: 'PT', en: 'EN' }

function LanguageSwitch() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const other: Lang = lang === 'pt' ? 'en' : 'pt'

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={lang === 'pt' ? 'Selecionar idioma' : 'Select language'}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 4px', fontSize: 13, fontWeight: 600, color: '#4A4F63', fontFamily: "'Inter', sans-serif" }}
      >
        {LANG_LABEL[lang]}
        <span style={{ display: 'inline-flex', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms var(--ease-out)' }}>
          <ChevronDown size={12} className="" />
        </span>
      </button>
      <div className={`lang-switch-panel${open ? ' open' : ''}`}>
        <button
          type="button"
          onClick={() => { setLang(other); setOpen(false) }}
          style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 10px', fontSize: 13, fontWeight: 600, color: '#4A4F63', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' }}
        >
          {LANG_LABEL[other]}
        </button>
      </div>
    </div>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const links = linksByLang[lang]

  const isActive = (to: string) => {
    if (to === '/work') return pathname === '/work' || pathname.startsWith('/work/')
    return pathname === to
  }

  // Current page gets a light-blue filled pill (same tokens as the
  // category badge on the Work page cards); hover/focus/press states for
  // both the active and inactive cases live in `.nav-link`'s CSS
  // pseudo-classes (index.css) — only the base/active split is inline.
  const linkStyle = (to: string): React.CSSProperties => ({
    color: isActive(to) ? '#12141F' : '#4A4F63',
    background: isActive(to) ? '#F2F6FF' : 'transparent',
    textDecoration: 'none',
    fontWeight: isActive(to) ? 600 : 500,
  })

  const mobileLink: React.CSSProperties = {
    fontSize: 16,
    padding: '10px 14px',
    borderRadius: 999,
    textDecoration: 'none',
    transition: 'color 200ms ease-out, background-color 200ms ease-out',
  }

  return (
    <div style={{
      position: 'fixed', top: 20, left: 20, right: 20,
      maxWidth: 1200, margin: '0 auto', zIndex: 100,
      padding: '14px 24px',
      background: 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(20,30,60,0.12)',
      borderRadius: 20,
      boxShadow: '0 10px 30px rgba(20,30,60,0.14)',
    }}>
      {/* Top row: logo | desktop links (true center, absolutely positioned so the
          side groups' widths never push it off-center) | language + burger */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" className="logo-link" aria-label="Nelson Lopes" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img src="/logo-nl.svg" alt="" style={{ display: 'block', height: 24, width: 'auto' }} />
        </Link>

        <nav className="nav-links" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', alignItems: 'center' }}>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link${isActive(to) ? ' is-active' : ''}`}
              style={linkStyle(to)}
              aria-current={isActive(to) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LanguageSwitch />

          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-label={lang === 'pt' ? 'Alternar menu' : 'Toggle menu'}
            aria-expanded={open}
            className="nav-burger"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: '#1A1D29', alignItems: 'center', justifyContent: 'center' }}
          >
            {open
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
            }
          </button>
        </div>
      </div>

      {/* In-pill dropdown — mobile only */}
      <div className={`nav-dropdown${open ? ' open' : ''}`}>
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            aria-current={isActive(to) ? 'page' : undefined}
            style={{
              ...mobileLink,
              color: isActive(to) ? '#12141F' : '#4A4F63',
              background: isActive(to) ? '#F2F6FF' : 'transparent',
              fontWeight: isActive(to) ? 700 : 500,
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
