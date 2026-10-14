import CaseStudyShell, { VideoBlock, FeatureList } from '../components/CaseStudyShell'
import eraVideo from '../imports/era-showcase.mp4'
import eraPoster from '../imports/era-showcase-poster.png'

const S = { padding: '0 20px 64px', maxWidth: 760, margin: '0 auto' } as const

const copy = {
  eyebrow: 'Case Study · Product Film',
  title: 'ERA Digital Revamp',
  description: 'Revamp to build a new, fully digital website integrating new functionalities.',
  meta: [
    { label: 'Client', value: 'ERA Imobiliária (Portugal)' },
    { label: 'Role', value: 'Designed the full digital experience (UX/UI, screens and graphics). Video: storyboard and script by me with a copywriter; screens and graphics by me; motion design in partnership with a motion designer.', span: true },
    { label: 'Platform', value: 'Website (desktop and mobile)' },
    { label: 'Year', value: '2021–2022' },
    { label: 'Team', value: 'Account, Copywriter, Motion Designer, UX/UI Designer and Lead UX/UI Designer' },
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
}

export default function CaseStudyERARevamp() {
  return (
    <CaseStudyShell eyebrow={copy.eyebrow} title={copy.title} description={copy.description} meta={copy.meta} stats={[]}>
      <div style={{ ...S, paddingTop: 48 }}>
        <VideoBlock src={eraVideo} poster={eraPoster} label={copy.videoLabel} />
        <FeatureList title={copy.featuresTitle} items={copy.features} />
      </div>
    </CaseStudyShell>
  )
}
