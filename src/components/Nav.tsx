import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/journey', label: 'Journey' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const isActive = (to: string) => {
    if (to === '/work') return pathname === '/work' || pathname.startsWith('/work/')
    return pathname === to
  }

  // `.nav-link` in index.css reserves a transparent 2px bottom border at
  // rest, so only the color needs to change here — hover/focus swap that
  // same border to an underline via CSS, with no layout shift either way.
  const linkStyle = (to: string): React.CSSProperties => ({
    color: isActive(to) ? '#002FA7' : '#4A4F63',
    borderBottomColor: isActive(to) ? '#002FA7' : 'transparent',
    textDecoration: 'none',
    fontWeight: isActive(to) ? 600 : 500,
  })

  const mobileLink: React.CSSProperties = {
    fontSize: 16,
    padding: '10px 0',
    textDecoration: 'none',
    transition: 'color 200ms ease-out',
    borderBottom: 'none',
    paddingBottom: 0,
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
      {/* Top row: logo | desktop links (true center) | burger */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', columnGap: 12 }}>
        <Link to="/" className="logo-link" style={{ justifySelf: 'start', fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', color: '#1A1D29', textDecoration: 'none', flexShrink: 0 }}>
          Nelson Lopes
        </Link>

        <nav className="nav-links" style={{ justifySelf: 'center', alignItems: 'center', gap: 12 }}>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className="nav-link" style={linkStyle(to)}>{label}</Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="nav-burger"
          style={{ justifySelf: 'end', background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: '#1A1D29', alignItems: 'center', justifyContent: 'center' }}
        >
          {open
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
          }
        </button>
      </div>

      {/* In-pill dropdown — mobile only */}
      <div className={`nav-dropdown${open ? ' open' : ''}`}>
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            style={{
              ...mobileLink,
              color: isActive(to) ? '#002FA7' : '#4A4F63',
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
