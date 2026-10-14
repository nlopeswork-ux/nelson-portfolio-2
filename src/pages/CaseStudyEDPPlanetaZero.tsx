import CaseStudyShell, { VideoBlock, FeatureList } from '../components/CaseStudyShell'
import appVideo from '../imports/EDP-planetazero-app.mp4'
import appPoster from '../imports/EDP-planetazero-app-poster.png'
import websiteVideo from '../imports/EDP-planetazero-web.mp4'
import websitePoster from '../imports/EDP-planetazero-web-poster.png'

const S = { padding: '0 20px 64px', maxWidth: 760, margin: '0 auto' } as const

const copy = {
  eyebrow: 'Case Study · Product Film',
  title: 'EDP Planeta Zero',
  description: 'Gamified programme that rewards sustainable habits, across a mobile app and a website.',
  meta: [
    { label: 'Client', value: 'EDP Comercial (Portugal)' },
    { label: 'Role', value: 'Designed the full digital experience (UX/UI, screens and graphics), with support on content design for social media and EDP internal communications about the programme. Video: storyboard and script by me with a copywriter; screens and graphics by me; motion design in partnership with a motion designer.', span: true },
    { label: 'Platform', value: 'Mobile app and website (desktop and mobile)' },
    { label: 'Year', value: 'App 2021–2022 · Website 2020–2022' },
    { label: 'Team', value: 'Account, Copywriter, Motion Designer, UX/UI Designer and Lead UX/UI Designer' },
  ],
  appLabel: 'App',
  appFeaturesTitle: 'Features — App',
  appFeatures: [
    'User level (Explorador, Entusiasta, among 4 levels) with a progress ring, accumulated Zs and what is left for the next level',
    'Four tabs: Início, O seu nível, Ganhar Zs and Vantagens Zs',
    'Ways to earn Zs: complete the profile, energy efficiency, sustainable tips by notification, individual and global challenges',
    'Rewards exchanged for Zs: prize draws, support for socio-environmental projects with voting, EDP and partner offers, exclusive experiences',
    'Locked rewards until the next level',
    'Contract management within the same app, plus donations to institutions and a user ranking',
  ],
  websiteLabel: 'Website',
  websiteFeaturesTitle: 'Features — Website',
  websiteFeatures: [
    'Own navigation under the EDP global bar: O Planeta, Missão, Explorar, O Movimento',
    'Landing page with video, "Quer fazer a sua parte?" and latest news',
    'O Planeta: what Planeta Zero is, the rewards programme (prize draws, experiences, offers) and partners',
    'Missão: planet direction, energy transition and a CO₂ footprint simulator with Zs reward',
    'Explorar: collections filterable by icons, open content and content exclusive after login, linking through to rewards',
    'Mobile article reading with progress bar',
    'O Movimento: planet in numbers, initiatives timeline, actions with customers and community testimonials',
    'Calls to join the programme throughout the site',
  ],
}

export default function CaseStudyEDPPlanetaZero() {
  return (
    <CaseStudyShell eyebrow={copy.eyebrow} title={copy.title} description={copy.description} meta={copy.meta} stats={[]}>
      <div style={{ ...S, paddingTop: 48 }}>
        <VideoBlock src={appVideo} poster={appPoster} label={copy.appLabel} />
        <FeatureList title={copy.appFeaturesTitle} items={copy.appFeatures} />
      </div>

      <div style={S}>
        <VideoBlock src={websiteVideo} poster={websitePoster} label={copy.websiteLabel} />
        <FeatureList title={copy.websiteFeaturesTitle} items={copy.websiteFeatures} />
      </div>
    </CaseStudyShell>
  )
}
