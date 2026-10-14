import { Link } from 'react-router-dom'
import ChevronUp from './ChevronUp'

export default function Footer() {
  return (
    <div style={{ padding: '0 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ padding: '48px 0 32px' }}>
          <Link to="/" aria-label="Nelson Lopes" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img src="/logo-nl.svg" alt="" height={32} style={{ display: 'block', width: 'auto' }} />
          </Link>
        </div>

        <div style={{
          borderTop: '1px solid rgba(20,30,60,0.1)',
          padding: '32px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <span style={{ fontSize: 13, color: '#6B7086' }}>© 2026 Nelson Lopes. Designed with care.</span>
          <button
            type="button"
            className="footer-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <ChevronUp size={16} className="" />
          </button>
        </div>
      </div>
    </div>
  )
}
