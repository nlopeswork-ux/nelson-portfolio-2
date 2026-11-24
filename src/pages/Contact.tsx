import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLanguage } from '../i18n/LanguageContext'
import CaseEndBlock from '../components/CaseEndBlock'

const copy = {
  en: {
    eyebrow: 'Say hi',
    title: "Let's make something people actually enjoy using.",
    subtitle: 'No forms, no gatekeeping — just pick your favourite way to reach me.',
    emailLabel: 'Email',
    emailNote: 'Best for project briefs and questions.',
    emailCta: 'Send an email',
    linkedinCta: 'Open LinkedIn',
    linkedinLabel: 'LinkedIn',
    linkedinNote: 'Best for networking and introductions.',
    footerNote: "Based in Lisbon, happy to work with anyone, anywhere.",
  },
  pt: {
    eyebrow: 'Diz olá',
    title: 'Vamos criar algo que as pessoas gostem mesmo de usar.',
    subtitle: 'Sem formulários, sem barreiras — escolhe a forma que preferires para falares comigo.',
    emailLabel: 'Email',
    emailNote: 'Ideal para briefings de projeto e perguntas.',
    emailCta: 'Enviar email',
    linkedinCta: 'Abrir LinkedIn',
    linkedinLabel: 'LinkedIn',
    linkedinNote: 'Ideal para networking e apresentações.',
    footerNote: 'Vivo em Lisboa, disponível para trabalhar com qualquer pessoa, em qualquer lugar.',
  },
}

export default function Contact() {
  const { lang } = useLanguage()
  const t = copy[lang]
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

      <div ref={ref} style={{ position: 'relative', padding: 'clamp(140px,13vw,156px) 32px 140px', maxWidth: 1200, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 600ms ease-out, transform 600ms ease-out' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 20 }}>{t.eyebrow}</div>
          <h1 style={{ fontSize: 'clamp(34px,5vw,54px)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink-headline)', margin: '0 0 20px' }}>
            {t.title}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: '#5A5F73', margin: 0 }}>{t.subtitle}</p>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', maxWidth: 920, margin: '0 auto' }}>
          <div className="ci-card">
            <div className="hs-top"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#002FA7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg><span className="hs-meta">{t.emailLabel}</span></div>
            <span className="hs-title" style={{ fontSize: 'clamp(18px, 2vw, 22px)', wordBreak: 'break-all' }}>nlopes.nl@gmail.com</span>
            <span className="hs-desc">{t.emailNote}</span>
            <a href="mailto:nlopes.nl@gmail.com" className="primary-btn">{t.emailCta}</a>
          </div>

          <div className="ci-card">
            <div className="hs-top"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#002FA7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1"/></svg><span className="hs-meta">{t.linkedinLabel}</span></div>
            <span className="hs-title" style={{ fontSize: 'clamp(18px, 2vw, 22px)', wordBreak: 'break-word' }}>linkedin.com/in/nelsonnlopes</span>
            <span className="hs-desc">{t.linkedinNote}</span>
            <a href="https://www.linkedin.com/in/nelsonnlopes" target="_blank" rel="noopener noreferrer" className="secondary-btn">{t.linkedinCta}</a>
          </div>
        </div>

        <div style={{ maxWidth: 920, margin: '64px auto 0' }}><CaseEndBlock withCta={false} /></div>

        <div style={{ textAlign: 'center', marginTop: 40, fontSize: 14, color: '#5A5F73' }}>{t.footerNote}</div>
      </div>

      <Footer />
    </div>
  )
}
