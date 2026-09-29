import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      <div style={{ position: 'absolute', top: -160, left: -140, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,191,255,0.35), rgba(220,232,255,0.1) 60%, transparent 75%)', filter: 'blur(60px)', animation: 'driftA 22s var(--ease-in-out) infinite' }} />
      <div style={{ position: 'absolute', top: 120, right: -200, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,216,255,0.22), rgba(242,246,255,0.08) 60%, transparent 75%)', filter: 'blur(70px)', animation: 'driftB 26s var(--ease-in-out) infinite' }} />

      <div ref={ref} style={{ position: 'relative', padding: '170px 32px 140px', maxWidth: 1200, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 600ms ease-out, transform 600ms ease-out' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 20 }}>Say hi 👋</div>
          <h1 style={{ fontSize: 'clamp(34px,5vw,54px)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 20px' }}>
            Let's make something people actually enjoy using.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: '#5A5F73', margin: 0 }}>No forms, no gatekeeping — just pick your favourite way to reach me.</p>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', maxWidth: 820, margin: '0 auto' }}>
          <a href="mailto:nlopes.nl@gmail.com" className="contact-card interactive-card" style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 16, padding: '40px 36px', borderRadius: 28, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 20px 50px rgba(120,150,255,0.12)', textDecoration: 'none', transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
            <div style={{ fontSize: 34 }}>✉️</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 8 }}>Email</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#12141F', wordBreak: 'break-all' }}>nlopes.nl@gmail.com</div>
            </div>
            <div style={{ fontSize: 14, color: '#A0A4B8' }}>Best for project briefs &amp; coffee-shaped questions.</div>
          </a>

          <a href="https://www.linkedin.com/in/nelsonnlopes" target="_blank" rel="noopener noreferrer" className="contact-card interactive-card" style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 16, padding: '40px 36px', borderRadius: 28, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 20px 50px rgba(120,150,255,0.12)', textDecoration: 'none', transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
            <div style={{ fontSize: 34 }}>🔗</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 8 }}>LinkedIn</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#12141F' }}>linkedin.com/in/nelsonnlopes</div>
            </div>
            <div style={{ fontSize: 14, color: '#A0A4B8' }}>Best for networking &amp; mutual nosiness.</div>
          </a>
        </div>

        <div style={{ textAlign: 'center', marginTop: 56, fontSize: 14, color: '#A0A4B8' }}>Usually replies within a coffee's brew ☕ — based in Lisbon, happy to work with anyone, anywhere.</div>
      </div>

      <div style={{ textAlign: 'center', padding: '40px 32px', fontSize: 13, color: '#6B7086' }}>© 2026 Nelson Lopes. Designed with care.</div>
    </div>
  )
}
