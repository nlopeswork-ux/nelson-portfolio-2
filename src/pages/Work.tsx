import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ChevronRight from '../components/ChevronRight'
import ChevronLeft from '../components/ChevronLeft'
import { useLanguage, type Lang } from '../i18n/LanguageContext'
import intelliforgeImg from '../imports/IntelliForge_SR2R.png'
import onerakImg from '../imports/OneRAK_Portal_Revamp.png'
import tamkeenImg from '../imports/National_Workforce_Digital_Platform.png'
import dsImg from '../imports/Internal_DS.png'
import agenticImg from '../imports/Agentic_UX_Flow.svg'
import edpAppPoster from '../imports/EDP-planetazero-app-poster.png'
import eraPoster from '../imports/era-showcase-poster.png'

type Category = 'all' | 'financial-services' | 'government' | 'internal-platform'

const categoryLabel: Record<Lang, Record<Category, string>> = {
  en: { all: 'All', 'financial-services': 'Financial Services', government: 'Government', 'internal-platform': 'Internal Platform' },
  pt: { all: 'Todos', 'financial-services': 'Serviços Financeiros', government: 'Setor Público', 'internal-platform': 'Plataforma Interna' },
}

const filterOptions: Category[] = ['all', 'financial-services', 'government', 'internal-platform']

const studiesBase = [
  { id: 'intelliforge', to: '/work/intelliforge', title: 'IntelliForge SR2R', category: 'financial-services' as Category, color: 'linear-gradient(135deg, #002FA7 0%, #3D63E0 100%)', initials: 'SR2R', image: intelliforgeImg },
  { id: 'onerak', to: '/work/onerak', title: 'OneRAK Portal Revamp', category: 'government' as Category, color: 'linear-gradient(135deg, #0F4C75 0%, #1B6CA8 100%)', initials: 'GEZ', image: onerakImg },
  { id: 'tamkeen', to: '/work/tamkeen', title: 'National Workforce Digital Platform', category: 'government' as Category, color: 'linear-gradient(135deg, #1E3A5F 0%, #2E6EA6 100%)', initials: 'NWP', image: tamkeenImg },
  { id: 'design-system', to: '/work/design-system', title: 'Internal Design System', category: 'internal-platform' as Category, color: 'linear-gradient(135deg, #2D2D2D 0%, #4A4A6A 100%)', initials: 'DS', image: dsImg },
]

const studiesText: Record<Lang, Record<string, { summary: string; quote: string | null; quoteAttribution: string | null }>> = {
  en: {
    intelliforge: { summary: 'Turned 200 manual close cycles into a governed, auditable system.', quote: 'The confidence scoring changed how fast the team could move — cases that sat in review for a day now clear in minutes.', quoteAttribution: 'Head of Delivery, the client' },
    onerak: { summary: '18/18 services unified, 97.8% task success, 82% fewer support calls.', quote: 'What used to take a full audit cycle to trace, we can now walk through in one meeting.', quoteAttribution: 'Engagement Lead, KPMG' },
    tamkeen: { summary: 'Replaced a fully manual funding process with one unified ecosystem.', quote: null, quoteAttribution: null },
    'design-system': { summary: 'A shared foundation across 15 projects, delivering the flagship pilot 25% faster.', quote: null, quoteAttribution: null },
  },
  pt: {
    intelliforge: { summary: 'Transformou 200 ciclos de fecho manuais num sistema governado e auditável.', quote: 'A pontuação de confiança mudou a velocidade a que a equipa conseguia avançar — casos que ficavam um dia em revisão agora ficam concluídos em minutos.', quoteAttribution: 'Head of Delivery do cliente' },
    onerak: { summary: '18/18 serviços unificados, 97,8% de sucesso nas tarefas, menos 82% de chamadas de suporte.', quote: 'O que antes levava um ciclo de auditoria completo a rastrear, agora conseguimos percorrer numa única reunião.', quoteAttribution: 'Engagement Lead, KPMG' },
    tamkeen: { summary: 'Substituiu um processo de financiamento totalmente manual por um ecossistema unificado.', quote: null, quoteAttribution: null },
    'design-system': { summary: 'Uma base partilhada em 15 projetos, entregando o piloto principal 25% mais rápido.', quote: null, quoteAttribution: null },
  },
}

const earlierWorkBase = [
  { id: 'edp-planeta-zero', to: '/work/edp-planeta-zero', poster: edpAppPoster },
  { id: 'era-revamp', to: '/work/era-revamp', poster: eraPoster },
]

const earlierWorkText: Record<Lang, Record<string, { eyebrow: string; title: string; description: string; tag: string; cta: string; alt: string }>> = {
  en: {
    'edp-planeta-zero': {
      eyebrow: 'EDP COMERCIAL — ENERGY · PORTUGAL',
      title: 'EDP Planeta Zero',
      description: 'Gamified app and programme website where customers earn Zs, level up and unlock rewards, with a CO₂ simulator and a community movement.',
      tag: 'Energy',
      cta: 'See case study',
      alt: 'EDP Planeta Zero product film thumbnail',
    },
    'era-revamp': {
      eyebrow: 'ERA IMOBILIÁRIA — REAL ESTATE · PORTUGAL',
      title: 'ERA Digital Revamp',
      description: 'A new fully digital website with smarter search, favourites with notes and a free home valuation.',
      tag: 'Real Estate',
      cta: 'See case study',
      alt: 'ERA Digital Revamp product film thumbnail',
    },
  },
  pt: {
    'edp-planeta-zero': {
      eyebrow: 'EDP COMERCIAL — ENERGIA · PORTUGAL',
      title: 'EDP Planeta Zero',
      description: 'App e website do programa com gamificação, em que os clientes ganham Zs, sobem de nível e desbloqueiam vantagens, com um simulador de CO₂ e um movimento de comunidade.',
      tag: 'Energia',
      cta: 'Ver case study',
      alt: 'Miniatura do filme de produto EDP Planeta Zero',
    },
    'era-revamp': {
      eyebrow: 'ERA IMOBILIÁRIA — IMOBILIÁRIO · PORTUGAL',
      title: 'ERA Digital Revamp',
      description: 'Um novo website totalmente digital com pesquisa mais inteligente, favoritos com notas e avaliação gratuita de imóveis.',
      tag: 'Imobiliário',
      cta: 'Ver case study',
      alt: 'Miniatura do filme de produto ERA Digital Revamp',
    },
  },
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 600ms ease-out, transform 600ms ease-out' } }
}

function WorkFilterTabs({
  options, value, onChange, labels, ariaLabel, scrollLeftLabel, scrollRightLabel,
}: {
  options: Category[]
  value: Category
  onChange: (next: Category) => void
  labels: Record<Category, string>
  ariaLabel: string
  scrollLeftLabel: string
  scrollRightLabel: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    window.addEventListener('resize', updateScrollState)
    return () => { ro.disconnect(); window.removeEventListener('resize', updateScrollState) }
  }, [options.length])

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.7, 240), behavior: 'smooth' })
  }

  const focusAndSelect = (index: number) => {
    const next = options[(index + options.length) % options.length]
    onChange(next)
    tabRefs.current[next]?.focus()
    tabRefs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); focusAndSelect(index + 1); break
      case 'ArrowLeft': e.preventDefault(); focusAndSelect(index - 1); break
      case 'Home': e.preventDefault(); focusAndSelect(0); break
      case 'End': e.preventDefault(); focusAndSelect(options.length - 1); break
    }
  }

  return (
    <div className="work-filter-wrap">
      <div
        className="work-filter-track"
        role="radiogroup"
        aria-label={ariaLabel}
        ref={trackRef}
        onScroll={updateScrollState}
      >
        {options.map((f, i) => (
          <button
            key={f}
            ref={el => { tabRefs.current[f] = el }}
            type="button"
            role="radio"
            aria-checked={value === f}
            tabIndex={value === f ? 0 : -1}
            className={`work-filter-tab${value === f ? ' is-active' : ''}`}
            onClick={() => onChange(f)}
            onKeyDown={e => onKeyDown(e, i)}
          >
            {labels[f]}
          </button>
        ))}
      </div>
      <div className={`work-filter-fade work-filter-fade-left${canScrollLeft ? ' visible' : ''}`} aria-hidden="true" />
      <div className={`work-filter-fade work-filter-fade-right${canScrollRight ? ' visible' : ''}`} aria-hidden="true" />
      {canScrollLeft && (
        <button type="button" className="work-filter-scroll work-filter-scroll-left" onClick={() => scrollBy(-1)} aria-label={scrollLeftLabel}>
          <ChevronLeft size={14} className="" />
        </button>
      )}
      {canScrollRight && (
        <button type="button" className="work-filter-scroll work-filter-scroll-right" onClick={() => scrollBy(1)} aria-label={scrollRightLabel}>
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  )
}

const pageCopy = {
  en: {
    eyebrow: 'Work',
    title: 'Case studies from the decision layer.',
    subtitle: 'Selected engagements where the interface was only as good as the decisions built underneath it.',
    readFull: 'Read the full case study',
    moreInProgress: 'More case studies in progress',
    filterLabel: 'Filter by category',
    scrollLeft: 'Scroll categories left',
    scrollRight: 'Scroll categories right',
    methodTitle: 'How I work with AI agents',
    methodCardTitle: 'Agentic UX Flow',
    methodCardSummary: 'A Claude Code plugin with two paths, Quick and Complete, used on the IntelliForge case and built on the Internal Design System.',
    methodTag: 'Plugin, in development',
    earlierWorkTitle: 'Earlier work: UX/UI and product film',
    earlierWorkText: 'Digital experiences I designed end to end, presented through product films. I designed the UX/UI, screens and graphics, and wrote the storyboard and script with a copywriter — the animation was handled by a motion designer.',
  },
  pt: {
    eyebrow: 'Trabalho',
    title: 'Case studies da camada de decisão.',
    subtitle: 'Colaborações selecionadas onde a interface só foi tão boa quanto as decisões construídas por trás dela.',
    readFull: 'Ver a case study completa',
    moreInProgress: 'Mais case studies em curso',
    filterLabel: 'Filtrar por categoria',
    scrollLeft: 'Deslocar categorias para a esquerda',
    scrollRight: 'Deslocar categorias para a direita',
    methodTitle: 'Como trabalho com agentes de IA',
    methodCardTitle: 'Agentic UX Flow',
    methodCardSummary: 'Um plugin do Claude Code com dois percursos, Rápido e Completo, usado no caso IntelliForge e assente no Design System Interno.',
    methodTag: 'Plugin, em desenvolvimento',
    earlierWorkTitle: 'Trabalho anterior: UX/UI e filme de produto',
    earlierWorkText: 'Experiências digitais que desenhei de ponta a ponta, apresentadas em filmes de produto. Desenhei o UX/UI, os ecrãs e os gráficos, e escrevi o storyboard e o guião com um copywriter — a animação ficou a cargo de um motion designer.',
  },
}

export default function Work() {
  const { lang } = useLanguage()
  const p = pageCopy[lang]
  const [activeFilter, setActiveFilter] = useState<Category>('all')
  const list = useFadeIn()

  const studies = useMemo(() => studiesBase.map(s => ({ ...s, ...studiesText[lang][s.id] })), [lang])
  const earlierWork = useMemo(() => earlierWorkBase.map(w => ({ ...w, ...earlierWorkText[lang][w.id] })), [lang])

  const filtered = useMemo(() =>
    activeFilter === 'all' ? studies : studies.filter(s => s.category === activeFilter),
    [activeFilter, studies]
  )

  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* HEADER */}
      <div style={{ position: 'relative', padding: 'clamp(100px,15vw,150px) 20px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#001A5C', marginBottom: 12 }}>{p.eyebrow}</div>
        <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 16px', maxWidth: 700 }}>
          <span aria-hidden="true" className="title-dot" />{p.title}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#5A5F73', maxWidth: 600, margin: 0 }}>
          {p.subtitle}
        </p>
      </div>

      {/* FILTERS */}
      <div style={{ padding: '24px 32px 0', maxWidth: 1200, margin: '0 auto' }}>
        <WorkFilterTabs
          options={filterOptions}
          value={activeFilter}
          onChange={setActiveFilter}
          labels={categoryLabel[lang]}
          ariaLabel={p.filterLabel}
          scrollLeftLabel={p.scrollLeft}
          scrollRightLabel={p.scrollRight}
        />
      </div>

      {/* RESULTS */}
      <div ref={list.ref} style={{ position: 'relative', padding: '24px 32px 80px', maxWidth: 1200, margin: '0 auto', ...list.style }}>
        <div className="work-grid">
          {filtered.map(s => (
            <Link key={s.id} to={s.to} className="case-card interactive-card" style={{ display: 'block', textDecoration: 'none', borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(20,30,60,0.08)', boxShadow: '0 12px 32px rgba(120,150,255,0.08)', transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              <div style={{ padding: 12 }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#F5F7FC',
                  aspectRatio: '562 / 180',
                }}>
                  <img
                    src={s.image}
                    alt={s.title}
                    onError={e => { e.currentTarget.style.display = 'none' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </div>
              </div>
              <div style={{ padding: '8px 24px 24px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#4A4F63', background: '#F2F6FF', display: 'inline-block', padding: '4px 11px', borderRadius: 11, marginBottom: 10 }}>{categoryLabel[lang][s.category]}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 6px' }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: '#5A5F73', margin: '0 0 12px' }}>{s.summary}</p>
                {s.quote && (
                  <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(20,30,60,0.03)', marginBottom: 14 }}>
                    <p style={{ fontSize: 13.5, fontStyle: 'italic', lineHeight: 1.55, color: '#3A3F4C', margin: '0 0 6px' }}>"{s.quote}"</p>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#001A5C' }}>— {s.quoteAttribution}</div>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600, color: '#002FA7' }}>{p.readFull}<ChevronRight size={15} /></div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* METHOD AND TOOLING */}
      <div style={{ position: 'relative', padding: 'clamp(40px,5vw,64px) 0 clamp(120px,11.3vw,144px)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 30%, #000 70%, transparent 100%)', maskImage: 'linear-gradient(180deg, transparent 0%, #000 30%, #000 70%, transparent 100%)' }}>
          <div style={{ position: 'absolute', top: '8%', left: '-6%', width: '340px', height: '340px', borderRadius: '50%', background: 'rgba(183,204,255,0.38)', filter: 'blur(70px)' }} />
          <div style={{ position: 'absolute', top: '38%', left: '38%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(210,224,255,0.45)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', top: '4%', right: '6%', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(183,204,255,0.28)', filter: 'blur(70px)' }} />
          <div style={{ position: 'absolute', bottom: '6%', right: '-4%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,111,0,0.09)', filter: 'blur(80px)' }} />
        </div>
        <div style={{ position: 'relative', padding: '0 32px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(18px,2.2vw,22px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 24px' }}>{p.methodTitle}</h2>
        <Link to="/work/agentic-ux-flow" className="case-card interactive-card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24, textDecoration: 'none', borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(20,30,60,0.08)', boxShadow: '0 12px 32px rgba(120,150,255,0.08)', padding: 12 }}>
          <div style={{ flex: '1 1 320px', minWidth: 0, borderRadius: 14, overflow: 'hidden', background: '#F5F7FC', aspectRatio: '562 / 180' }}>
            <img src={agenticImg} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div style={{ flex: '1 1 320px', padding: '8px 12px 12px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#4A4F63', background: '#F2F6FF', display: 'inline-block', padding: '4px 11px', borderRadius: 11, marginBottom: 10 }}>{p.methodTag}</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 6px' }}>{p.methodCardTitle}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.5, color: '#5A5F73', margin: '0 0 14px' }}>{p.methodCardSummary}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600, color: '#002FA7' }}>{p.readFull}<ChevronRight size={15} /></div>
          </div>
        </Link>
        </div>
      </div>

      {/* EARLIER WORK */}
      <div style={{ padding: '0 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(22px,3vw,28px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 12px' }}>{p.earlierWorkTitle}</h2>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: '#5A5F73', maxWidth: 640, margin: '0 0 28px' }}>{p.earlierWorkText}</p>
        <div className="work-grid">
          {earlierWork.map(w => (
            <Link key={w.id} to={w.to} className="case-card interactive-card" style={{ display: 'block', textDecoration: 'none', borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(20,30,60,0.08)', boxShadow: '0 12px 32px rgba(120,150,255,0.08)', transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}>
              <div style={{ padding: 12 }}>
                <div style={{ position: 'relative', width: '100%', borderRadius: 14, overflow: 'hidden', background: '#F5F7FC', aspectRatio: '562 / 180' }}>
                  <img
                    src={w.poster}
                    alt={w.alt}
                    onError={e => { e.currentTarget.style.display = 'none' }}
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(18,20,31,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M6 4l10 6-10 6V4z" fill="#FFFFFF" /></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '8px 24px 24px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#4A4F63', background: '#F2F6FF', display: 'inline-block', padding: '4px 11px', borderRadius: 11, marginBottom: 10 }}>{w.eyebrow}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#12141F', margin: '0 0 6px' }}>{w.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: '#5A5F73', margin: '0 0 12px' }}>{w.description}</p>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#4A4F63', background: '#F2F6FF', display: 'inline-block', padding: '4px 11px', borderRadius: 11, marginBottom: 14 }}>{w.tag}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600, color: '#002FA7' }}>{w.cta}<ChevronRight size={15} /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* PLACEHOLDER */}
      <div style={{ padding: '0 32px 120px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: 13, color: '#A0A4B8' }}>{p.moreInProgress}</span>
      </div>

      <Footer />
    </div>
  )
}
