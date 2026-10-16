import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronDown from '../components/ChevronDown'
import ChevronUp from '../components/ChevronUp'
import { useLanguage } from '../i18n/LanguageContext'

const divider = <div style={{ height: 1, background: '#EAF1FF' }} />

function TimelineRow({ period, marker, children }: { period: string; marker?: 'current' | 'milestone'; children: React.ReactNode }) {
  return (
    <div className="timeline-row" style={{ padding: '32px 0 32px 0', borderRadius: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'start', gap: 10, fontSize: 14, fontWeight: 600, color: '#001A5C', paddingTop: 4 }}>
        {marker && <span aria-hidden="true" className={`tl-marker tl-marker-${marker}`} />}
        {period}
      </div>
      <div>{children}</div>
    </div>
  )
}

const copy = {
  en: {
    eyebrow: 'Professional Journey',
    title: 'From graphic design to product leadership',
    showEngagements: 'Show engagements',
    hideEngagements: 'Hide engagements',
    roles: [
      { period: '2023 — Present', title: 'Lead UX/UI Designer', company: 'KPMG Portugal', body: 'Took ownership of enterprise product design across multiple industries and regions, leading end-to-end digital products from discovery to delivery while shaping product strategy, design systems and scalable user experiences.' },
      { period: '2018 — 2023', title: 'Digital Designer', company: 'Deloitte Digital', body: 'Grew from delivering individual screens to owning end-to-end digital experiences for aviation, energy, automotive and insurance clients.' },
      { period: '2017 — 2018', title: 'Digital Designer', company: 'Wingman', body: 'First exposure to product thinking — designing for early-stage products where every decision had to earn its place.' },
      { period: 'Jan–Feb 2016', title: 'Trainee Motion Designer', company: 'Ogilvy', body: 'Short international placement focused on motion design fundamentals.' },
      { period: '2015 — 2016', title: 'Creative Designer', company: 'Biocol Labs', body: 'Where it started — brand, packaging and editorial work that built the visual instincts everything since has drawn on.' },
    ],
    kpmgEngagements: [
      { client: 'Global energy company', industry: 'Financial Services', period: '2026–Present', scope: 'IntelliForge SR2R — ontology-driven financial close system, 200 franchise dealers', link: { to: '/work/intelliforge', label: 'View case study' } },
      { client: 'Government economic zone authority', industry: 'Government', period: '2025–2026', scope: 'OneRAK Portal Revamp — 3 portals unified, 18/18 services live', link: { to: '/work/onerak', label: 'View case study' } },
      { client: 'Retail bank', industry: 'Financial Services', period: '2024–2025', scope: 'Backoffice — 1,350+ frames, 14 feature areas' },
      { client: 'Retail bank — mobile', industry: 'Financial Services', period: '2024–2025', scope: 'Mobile Banking App Redesign — 1,590+ screens, 12 core features' },
      { client: 'National workforce fund', industry: 'Government', period: '2023–present', scope: 'National Workforce Platform — end-to-end digital funding ecosystem', link: { to: '/work/tamkeen', label: 'View case study' } },
    ],
    deloitteEngagements: [
      { client: 'Major airline', industry: 'Aviation', period: '2022–2023', scope: 'Passenger digital experience redesign' },
      { client: 'Energy group', industry: 'Energy', period: '2021–2022', scope: 'B2B customer portal and internal operations platform' },
      { client: 'Automotive manufacturer', industry: 'Automotive', period: '2020–2021', scope: 'Fleet management and dealer digital tools' },
      { client: 'Insurance provider', industry: 'Insurance', period: '2019–2020', scope: 'Claims management and customer-facing portal redesign' },
      { client: 'Energy operator', industry: 'Energy', period: '2019', scope: 'Internal digital workspace' },
      { client: 'Insurance group', industry: 'Insurance', period: '2018–2019', scope: 'Digital product design for broker platform' },
      { client: 'Automotive brand', industry: 'Automotive', period: '2018', scope: 'Dealer-facing UX design sprint' },
      { client: 'Energy retailer', industry: 'Energy', period: '2020–2022', scope: 'Gamified loyalty app (2021–2022) and programme website (2020–2022) rewarding sustainable habits', link: { to: '/work/edp-planeta-zero', label: 'View case study' } },
      { client: 'Real estate group', industry: 'Real Estate', period: '2021–2022', scope: 'Fully digital property website revamp with smarter search and valuation tools', link: { to: '/work/era-revamp', label: 'View case study' } },
      { client: 'Various clients', industry: 'Multiple', period: '2018–2023', scope: 'Workshop facilitation, design sprints, UX audits' },
    ],
  },
  pt: {
    eyebrow: 'Percurso Profissional',
    title: 'Do design gráfico à liderança de produto',
    showEngagements: 'Mostrar colaborações',
    hideEngagements: 'Ocultar colaborações',
    roles: [
      { period: '2023 — Presente', title: 'Lead UX/UI Designer', company: 'KPMG Portugal', body: 'Assumi a responsabilidade pelo design de produto empresarial em várias indústrias e regiões, liderando produtos digitais de ponta a ponta — da descoberta à entrega — enquanto moldava estratégia de produto, design systems e experiências escaláveis.' },
      { period: '2018 — 2023', title: 'Digital Designer', company: 'Deloitte Digital', body: 'Evoluí de entregar ecrãs individuais para ser responsável por experiências digitais completas para clientes de aviação, energia, automóvel e seguros.' },
      { period: '2017 — 2018', title: 'Digital Designer', company: 'Wingman', body: 'Primeiro contacto com pensamento de produto — a desenhar para produtos em fase inicial, onde cada decisão tinha de justificar o seu lugar.' },
      { period: 'Jan–Fev 2016', title: 'Trainee Motion Designer', company: 'Ogilvy', body: 'Estágio internacional de curta duração focado em fundamentos de motion design.' },
      { period: '2015 — 2016', title: 'Creative Designer', company: 'Biocol Labs', body: 'Onde tudo começou — trabalho de marca, packaging e editorial que construiu os instintos visuais em que tudo o resto se apoiou.' },
    ],
    kpmgEngagements: [
      { client: 'Empresa global de energia', industry: 'Serviços Financeiros', period: '2026–Presente', scope: 'IntelliForge SR2R — sistema de fecho financeiro orientado por ontologia, 200 concessionários', link: { to: '/work/intelliforge', label: 'Ver case study' } },
      { client: 'Autoridade de zona económica governamental', industry: 'Setor Público', period: '2025–2026', scope: 'OneRAK Portal Revamp — 3 portais unificados, 18/18 serviços em produção', link: { to: '/work/onerak', label: 'Ver case study' } },
      { client: 'Banco de retalho', industry: 'Serviços Financeiros', period: '2024–2025', scope: 'Backoffice — mais de 1.350 ecrãs, 14 áreas funcionais' },
      { client: 'Banco de retalho — mobile', industry: 'Serviços Financeiros', period: '2024–2025', scope: 'Redesign da App de Banca Móvel — mais de 1.590 ecrãs, 12 funcionalidades principais' },
      { client: 'Fundo nacional de trabalho', industry: 'Setor Público', period: '2023–presente', scope: 'Plataforma Nacional de Força de Trabalho — ecossistema digital de financiamento de ponta a ponta', link: { to: '/work/tamkeen', label: 'Ver case study' } },
    ],
    deloitteEngagements: [
      { client: 'Companhia aérea de referência', industry: 'Aviação', period: '2022–2023', scope: 'Redesign da experiência digital do passageiro' },
      { client: 'Grupo de energia', industry: 'Energia', period: '2021–2022', scope: 'Portal B2B de clientes e plataforma de operações internas' },
      { client: 'Fabricante automóvel', industry: 'Automóvel', period: '2020–2021', scope: 'Gestão de frota e ferramentas digitais para concessionários' },
      { client: 'Seguradora', industry: 'Seguros', period: '2019–2020', scope: 'Redesign do portal de sinistros e da área de cliente' },
      { client: 'Operador de energia', industry: 'Energia', period: '2019', scope: 'Espaço de trabalho digital interno' },
      { client: 'Grupo segurador', industry: 'Seguros', period: '2018–2019', scope: 'Design de produto digital para plataforma de mediadores' },
      { client: 'Marca automóvel', industry: 'Automóvel', period: '2018', scope: 'Sprint de design UX orientado a concessionários' },
      { client: 'Comercializadora de energia', industry: 'Energia', period: '2020–2022', scope: 'App de fidelização com gamificação (2021–2022) e website do programa (2020–2022), a premiar hábitos sustentáveis', link: { to: '/work/edp-planeta-zero', label: 'Ver case study' } },
      { client: 'Grupo imobiliário', industry: 'Imobiliário', period: '2021–2022', scope: 'Revamp digital de website imobiliário, com pesquisa e avaliação mais inteligentes', link: { to: '/work/era-revamp', label: 'Ver case study' } },
      { client: 'Vários clientes', industry: 'Múltiplas', period: '2018–2023', scope: 'Facilitação de workshops, design sprints, auditorias de UX' },
    ],
  },
}

export default function Journey() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [kpmgOpen, setKpmgOpen] = useState(false)
  const [deloitteOpen, setDeloitteOpen] = useState(false)

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* HEADER */}
      <div style={{ position: 'relative', padding: 'clamp(100px,15vw,150px) 20px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ position: 'absolute', top: 40, right: -220, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,216,255,0.28), transparent 70%)', filter: 'blur(75px)', zIndex: -1 }} />
        <div style={{ maxWidth: 900 }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 12 }}>{t.eyebrow}</div>
          <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: 0 }}>{t.title}</h1>
        </div>
      </div>

      {/* TIMELINE */}
      <div style={{ position: 'relative', padding: '40px 32px 140px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* KPMG */}
          <TimelineRow period={t.roles[0].period} marker="current">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 4px' }}>{t.roles[0].title}</h3>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#5A5F73', marginBottom: 12 }}>{t.roles[0].company}</div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 16px' }}>{t.roles[0].body}</p>
            <button type="button" aria-expanded={kpmgOpen} className="engagement-toggle" onClick={() => setKpmgOpen(o => !o)}>
              {kpmgOpen ? <>{t.hideEngagements}<ChevronUp size={14} /></> : <>{t.showEngagements}<ChevronDown size={14} /></>}
            </button>
            {kpmgOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 16, padding: 20, background: '#F7FAFF', borderRadius: 14 }}>
                {t.kpmgEngagements.map((eng, i) => (
                  <div key={i} className="timeline-eng-row" style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, fontSize: 14, padding: '10px 0', borderBottom: i < t.kpmgEngagements.length - 1 ? '1px solid #EAF1FF' : 'none' }}>
                    <div style={{ fontWeight: 600, color: '#12141F' }}>{eng.client}</div>
                    <div style={{ color: '#5A5F73' }}>
                      {eng.industry} · {eng.period}<br />{eng.scope}
                      {'link' in eng && eng.link && (
                        <>
                          {' — '}
                          <Link to={eng.link.to} style={{ color: '#002FA7', fontWeight: 600, textDecoration: 'none' }}>{eng.link.label}</Link>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TimelineRow>

          {divider}

          {/* Deloitte */}
          <TimelineRow period={t.roles[1].period} marker="milestone">
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 4px' }}>{t.roles[1].title}</h3>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#5A5F73', marginBottom: 12 }}>{t.roles[1].company}</div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: '0 0 16px' }}>{t.roles[1].body}</p>
            <button type="button" aria-expanded={deloitteOpen} className="engagement-toggle" onClick={() => setDeloitteOpen(o => !o)}>
              {deloitteOpen ? <>{t.hideEngagements}<ChevronUp size={14} /></> : <>{t.showEngagements}<ChevronDown size={14} /></>}
            </button>
            {deloitteOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 16, padding: 20, background: '#F7FAFF', borderRadius: 14 }}>
                {t.deloitteEngagements.map((eng, i) => (
                  <div key={i} className="timeline-eng-row" style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, fontSize: 14, padding: '10px 0', borderBottom: i < t.deloitteEngagements.length - 1 ? '1px solid #EAF1FF' : 'none' }}>
                    <div style={{ fontWeight: 600, color: '#12141F' }}>{eng.client}</div>
                    <div style={{ color: '#5A5F73' }}>
                      {eng.industry} · {eng.period}<br />{eng.scope}
                      {'link' in eng && eng.link && (
                        <>
                          {' — '}
                          <Link to={eng.link.to} style={{ color: '#002FA7', fontWeight: 600, textDecoration: 'none' }}>{eng.link.label}</Link>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TimelineRow>

          {divider}

          {/* Wingman */}
          <TimelineRow period={t.roles[2].period}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 4px' }}>{t.roles[2].title}</h3>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#5A5F73', marginBottom: 12 }}>{t.roles[2].company}</div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{t.roles[2].body}</p>
          </TimelineRow>

          {divider}

          {/* Ogilvy */}
          <TimelineRow period={t.roles[3].period}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 4px' }}>{t.roles[3].title}</h3>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#5A5F73', marginBottom: 12 }}>{t.roles[3].company}</div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{t.roles[3].body}</p>
          </TimelineRow>

          {divider}

          {/* Biocol */}
          <TimelineRow period={t.roles[4].period}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#12141F', margin: '0 0 4px' }}>{t.roles[4].title}</h3>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#5A5F73', marginBottom: 12 }}>{t.roles[4].company}</div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5F73', margin: 0 }}>{t.roles[4].body}</p>
          </TimelineRow>

        </div>
      </div>

      <Footer />
    </div>
  )
}
