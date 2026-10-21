import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import ChevronUp from './ChevronUp'
import AnimatedLogo from './AnimatedLogo'

const copy = {
  en: { copyright: '© 2026 Nelson Lopes. Designed with care.', backToTop: 'Back to top' },
  pt: { copyright: '© 2026 Nelson Lopes. Feito com cuidado.', backToTop: 'Voltar ao topo' },
}

export default function Footer() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <div style={{ padding: '0 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ padding: '48px 0 12px' }}>
          <Link to="/" aria-label="Nelson Lopes" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <AnimatedLogo />
          </Link>
        </div>

        <div style={{
          borderTop: '1px solid rgba(20,30,60,0.1)',
          padding: '32px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <span style={{ fontSize: 13, color: '#6B7086' }}>{t.copyright}</span>
          <button
            type="button"
            className="footer-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t.backToTop}
          >
            <ChevronUp size={16} className="" />
          </button>
        </div>
      </div>
    </div>
  )
}
