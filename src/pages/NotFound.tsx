import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: { title: 'This page took a different route.', body: "It's not here, but the good stuff still is.", cta: 'Back to the work' },
  pt: { title: 'Esta página foi por outro caminho.', body: 'Não está aqui, mas o melhor continua.', cta: 'Voltar ao trabalho' },
}

export default function NotFound() {
  const { lang } = useLanguage()
  const t = copy[lang === 'pt' ? 'pt' : 'en']
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '160px 32px 120px' }}>
      <div aria-hidden="true" style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--color-accent)', marginBottom: 24 }} />
      <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', lineHeight: 1.1, color: 'var(--ink-headline)', margin: '0 0 16px' }}>{t.title}</h1>
      <p style={{ fontSize: 20, color: '#5A5F73', margin: '0 0 32px' }}>{t.body}</p>
      <Link to="/work" className="primary-btn" style={{ display: 'inline-flex', padding: '14px 28px', borderRadius: 12 }}>{t.cta}</Link>
    </main>
  )
}
