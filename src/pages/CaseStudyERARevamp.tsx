import CaseStudyShell, { VideoBlock, FeatureList } from '../components/CaseStudyShell'
import { useLanguage } from '../i18n/LanguageContext'
import eraVideo from '../imports/era-showcase.mp4'
import eraPoster from '../imports/era-showcase-poster.webp'

const S = { padding: '0 0 48px' } as const

const copy = {
  en: {
    title: 'ERA Digital Revamp',
    description: 'Revamp to build a new, fully digital website integrating new functionalities.',
    meta: [
      { label: 'Client', value: 'ERA Imobiliária (Portugal)' },
      { label: 'Role', value: 'Designed the full digital experience (UX/UI, screens and graphics). Video: storyboard and script by me with a copywriter; screens and graphics by me; motion design in partnership with a motion designer.', short: 'Full digital experience: UX/UI, screens, graphics', span: true },
      { label: 'Platform', value: 'Website (desktop and mobile)' },
      { label: 'Year', value: '2021–2022' },
      { label: 'Team', value: 'Account, Copywriter, Motion Designer, UX/UI Designer and Lead UX/UI Designer', short: 'Account · Copywriter · Motion Designer +2' },
    ],
    videoLabel: 'Product film',
    featuresTitle: 'Features',
    features: [
      'Search with Comprar, Arrendar and Trespasse tabs, removable filter chips and "As minhas pesquisas"',
      'Mobile location with history, current location, area drawing on a map and several locations at once',
      'Property listing with price, characteristics, gallery, contact, favourite and exclude',
      'Favourites with sorting and personal notes on each property',
      'ERA advantages on the home page (ERA Guarantee, energy certification, financing up to 100%)',
      'Free valuation "Quanto vale a minha casa?" in 4 steps',
      'Free listing creation, with exact or approximate location on the map',
      'Consistent experience on desktop and mobile',
    ],
  },
  pt: {
    title: 'ERA Digital Revamp',
    description: 'Revamp para construir um novo website totalmente digital, integrando novas funcionalidades.',
    meta: [
      { label: 'Cliente', value: 'ERA Imobiliária (Portugal)' },
      { label: 'Função', value: 'Desenho de toda a experiência digital (UX/UI, ecrãs e gráficos). Vídeo: storyboard e script da minha autoria com um copywriter; ecrãs e gráficos meus; motion design em parceria com um motion designer.', short: 'Experiência digital completa: UX/UI, ecrãs, gráficos', span: true },
      { label: 'Plataforma', value: 'Website (desktop e mobile)' },
      { label: 'Ano', value: '2021–2022' },
      { label: 'Equipa', value: 'Account, Copywriter, Motion Designer, UX/UI Designer e Lead UX/UI Designer', short: 'Account · Copywriter · Motion Designer +2' },
    ],
    videoLabel: 'Filme de produto',
    featuresTitle: 'Funcionalidades',
    features: [
      'Pesquisa com separadores Comprar, Arrendar e Trespasse, filtros em etiquetas removíveis e "As minhas pesquisas"',
      'Localização no mobile com histórico, localização atual, desenho de área no mapa e várias zonas em simultâneo',
      'Listagem de imóveis com preço, características, galeria, contactar, favoritar e excluir',
      'Favoritos com ordenação e notas pessoais em cada imóvel',
      'Vantagens ERA em destaque na home (Garantia ERA, certificação energética, financiamento até 100%)',
      'Avaliação gratuita "Quanto vale a minha casa?" em 4 passos',
      'Criação de anúncio grátis, com localização exata ou aproximada no mapa',
      'Experiência consistente em desktop e mobile',
    ],
  },
}

export default function CaseStudyERARevamp() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <CaseStudyShell title={t.title} description={t.description} meta={t.meta} stats={[]}>
      <div style={S}>
        <VideoBlock src={eraVideo} poster={eraPoster} label={t.videoLabel} />
        <FeatureList title={t.featuresTitle} items={t.features} />
      </div>
    </CaseStudyShell>
  )
}
