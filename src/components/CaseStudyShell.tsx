import { Link } from 'react-router-dom'
import Nav from './Nav'
import Counter from './Counter'
import ChevronLeft from './ChevronLeft'

interface MetaItem {
  label: string
  value: string
  span?: boolean
}

interface StatItem {
  value: string
  label: string
}

interface CaseStudyShellProps {
  eyebrow: string
  title: string
  description: string
  meta: MetaItem[]
  stats: StatItem[]
  accentColor?: string
  children: React.ReactNode
}

export default function CaseStudyShell({ eyebrow, title, description, meta, stats, accentColor = '#002FA7', children }: CaseStudyShellProps) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* HERO */}
      <div style={{ position: 'relative', padding: 'clamp(120px,18vw,180px) 20px 60px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ position: 'absolute', top: -160, left: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(183,204,255,0.32), transparent 70%)', filter: 'blur(70px)', animation: 'driftA 24s var(--ease-in-out) infinite', zIndex: -1 }} />

        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: accentColor, marginBottom: 16 }}>{eyebrow}</div>
        <h1 style={{ fontSize: 'clamp(28px,5.5vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#12141F', margin: '0 0 24px', lineHeight: 1.1 }}>{title}</h1>
        <p style={{ fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.7, color: '#5A5F73', maxWidth: 720, margin: '0 0 44px' }}>{description}</p>

        {/* META GRID */}
        <div className="rg-meta" style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: 28, marginBottom: 24 }}>
          {meta.map(({ label, value, span }) => (
            <div key={label} style={{ gridColumn: span ? '1 / -1' : undefined }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: accentColor, marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#12141F', lineHeight: 1.5 }}>{value}</div>
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="rg-stats" style={{ '--stat-cols': stats.length } as React.CSSProperties}>
          {stats.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center', padding: 20, borderRadius: 18, background: '#F2F6FF' }}>
              <div style={{ fontSize: stats.length === 4 ? 22 : 30, fontWeight: 800, color: accentColor, lineHeight: 1.1 }}><Counter value={value} /></div>
              <div style={{ fontSize: 13, color: '#5A5F73', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      {children}

      {/* BACK LINK */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px 80px' }}>
        <Link to="/work" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600, color: '#002FA7', textDecoration: 'none' }}>
          <ChevronLeft size={15} className="" />Back to all work
        </Link>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, lineHeight: 1.6, color: '#A0A4B8', margin: 0 }}>Client names and identifying details have been generalized to respect confidentiality agreements. Metrics and outcomes reflect the real scope and impact of the engagement.</p>
      </div>

      <div style={{ textAlign: 'center', padding: '0 20px 40px', fontSize: 13, color: '#6B7086' }}>© 2026 Nelson Lopes. Designed with care.</div>
    </div>
  )
}

export function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4A4F63', margin: '0 0 20px' }}>{children}</p>
}

export function SeverityChip({ children, tone = 'critical' }: { children: React.ReactNode; tone?: 'critical' | 'neutral' }) {
  const colors = tone === 'critical' ? { color: '#B23A3A', background: 'rgba(178,58,58,0.1)' } : { color: '#5A5F73', background: '#F2F6FF' }
  return (
    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, ...colors }}>
      {children}
    </span>
  )
}

export function DarkBox({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 28, borderRadius: 24, background: '#12141F', color: '#F2F6FF', marginBottom: 24 }}>
      {label && <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8FAEFF', marginBottom: 12 }}>{label}</div>}
      {children}
    </div>
  )
}
