import imgIntelliforge from '../imports/IntelliForge_SR2R.png'
import imgOnerak from '../imports/OneRAK_Portal_Revamp.png'
import imgTamkeen from '../imports/National_Workforce_Digital_Platform.png'
import imgDs from '../imports/Internal_DS.png'
import imgAgentic from '../imports/Agentic_UX_Flow.svg'
import imgEdp from '../imports/EDP-planetazero-app-poster.png'
import imgEra from '../imports/era-showcase-poster.png'

export interface RelatedCase {
  slug: string
  title: string
  image: string
  group: 'featured' | 'earlier'
}

const cases: RelatedCase[] = [
  { slug: "intelliforge", title: "IntelliForge SR2R", image: imgIntelliforge, group: "featured" },
  { slug: "onerak", title: "OneRAK Portal Revamp", image: imgOnerak, group: "featured" },
  { slug: "tamkeen", title: "National Workforce Digital Platform", image: imgTamkeen, group: "featured" },
  { slug: "design-system", title: "Internal Design System", image: imgDs, group: "featured" },
  { slug: "agentic-ux-flow", title: "Agentic UX Flow", image: imgAgentic, group: "featured" },
  { slug: "edp-planeta-zero", title: "EDP Planeta Zero", image: imgEdp, group: "earlier" },
  { slug: "era-revamp", title: "ERA Digital Revamp", image: imgEra, group: "earlier" },
]

// Siblings from the same group first, then the main case studies in order.
export function relatedCases(slug: string, count = 3): RelatedCase[] {
  const current = cases.find(c => c.slug === slug)
  const others = cases.filter(c => c.slug !== slug)
  const siblings = current ? others.filter(c => c.group === current.group) : []
  const rest = others.filter(c => !siblings.includes(c) && c.group === 'featured')
  return [...siblings, ...rest].slice(0, count)
}
