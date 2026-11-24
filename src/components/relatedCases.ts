import imgIntelliforge from '../imports/IntelliForge_SR2R.webp'
import imgOnerak from '../imports/OneRAK_Portal_Revamp.webp'
import imgTamkeen from '../imports/National_Workforce_Digital_Platform.webp'
import imgDs from '../imports/Internal_DS.webp'
import imgAgentic from '../imports/Agentic_UX_Flow.svg'
import imgEdp from '../imports/EDP-planetazero-app-poster.webp'
import imgEra from '../imports/era-showcase-poster.webp'

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

const LAST_KEY = 'closing-block-last'

/**
 * Cases for the closing block of case studies and Contact: random, never the current case, and never
 * the same pair the visitor just saw in the previous closing block (so no single case is always promoted).
 */
export function randomCases(slug: string, count = 2): RelatedCase[] {
  const pool = cases.filter(c => c.slug !== slug)
  let last: string[] = []
  try { last = JSON.parse(sessionStorage.getItem(LAST_KEY) ?? '[]') } catch { /* storage unavailable */ }
  const fresh = pool.filter(c => !last.includes(c.slug))
  const source = [...(fresh.length >= count ? fresh : pool)]
  for (let i = source.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[source[i], source[j]] = [source[j], source[i]]
  }
  const pick = source.slice(0, count)
  try { sessionStorage.setItem(LAST_KEY, JSON.stringify(pick.map(c => c.slug))) } catch { /* storage unavailable */ }
  return pick
}
