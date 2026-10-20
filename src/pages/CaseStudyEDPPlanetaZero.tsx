import CaseStudyShell, { VideoBlock, FeatureList } from '../components/CaseStudyShell'
import { useLanguage } from '../i18n/LanguageContext'
import appVideo from '../imports/EDP-planetazero-app.mp4'
import appPoster from '../imports/EDP-planetazero-app-poster.png'
import websiteVideo from '../imports/EDP-planetazero-web.mp4'
import websitePoster from '../imports/EDP-planetazero-web-poster.png'

const S = { padding: '0 0 48px' } as const

const copy = {
  en: {
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
  },
  pt: {
    title: 'EDP Planeta Zero',
    description: 'Programa de gamificação que premeia hábitos sustentáveis, numa app mobile e num website.',
    meta: [
      { label: 'Cliente', value: 'EDP Comercial (Portugal)' },
      { label: 'Função', value: 'Desenho de toda a experiência digital (UX/UI, ecrãs e gráficos), com apoio na conceção de conteúdos para redes sociais e comunicações internas da EDP sobre o programa. Vídeo: storyboard e script da minha autoria com um copywriter; ecrãs e gráficos meus; motion design em parceria com um motion designer.', span: true },
      { label: 'Plataforma', value: 'App mobile e website (desktop e mobile)' },
      { label: 'Ano', value: 'App 2021–2022 · Website 2020–2022' },
      { label: 'Equipa', value: 'Account, Copywriter, Motion Designer, UX/UI Designer e Lead UX/UI Designer' },
    ],
    appLabel: 'App',
    appFeaturesTitle: 'Funcionalidades — App',
    appFeatures: [
      'Nível do utilizador (Explorador, Entusiasta, entre 4 níveis) com anel de progresso, Zs acumulados e quanto falta para o nível seguinte',
      'Quatro separadores: Início, O seu nível, Ganhar Zs e Vantagens Zs',
      'Formas de ganhar Zs: completar o perfil, eficiência energética, dicas sustentáveis por notificação e desafios individuais e globais',
      'Vantagens trocadas por Zs: sorteios, apoio a projetos socioambientais com votação, ofertas EDP e parceiros, experiências exclusivas',
      'Vantagens bloqueadas até ao nível seguinte',
      'Gestão do contrato na mesma app, doações a instituições e ranking de utilizadores',
    ],
    websiteLabel: 'Website',
    websiteFeaturesTitle: 'Funcionalidades — Website',
    websiteFeatures: [
      'Navegação própria sob a barra global EDP: O Planeta, Missão, Explorar, O Movimento',
      'Landing page com vídeo, "Quer fazer a sua parte?" e últimas novidades',
      'O Planeta: o que é o Planeta Zero, programa de prémios (sorteios, experiências, ofertas) e parceiros',
      'Missão: rumo do planeta, transição energética e simulador de pegada de CO₂ com recompensa em Zs',
      'Explorar: coleções filtráveis por ícones, conteúdos abertos e conteúdos exclusivos após login, com ligação às vantagens',
      'Leitura de artigos em mobile com barra de progresso',
      'O Movimento: planeta em números, timeline de iniciativas, ações com clientes e testemunhos da comunidade',
      'Chamadas à adesão ao longo das páginas',
    ],
  },
}

export default function CaseStudyEDPPlanetaZero() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <CaseStudyShell title={t.title} description={t.description} meta={t.meta} stats={[]}>
      <div style={S}>
        <VideoBlock src={appVideo} poster={appPoster} label={t.appLabel} />
        <FeatureList title={t.appFeaturesTitle} items={t.appFeatures} />
      </div>

      <div style={S}>
        <VideoBlock src={websiteVideo} poster={websitePoster} label={t.websiteLabel} />
        <FeatureList title={t.websiteFeaturesTitle} items={t.websiteFeatures} />
      </div>
    </CaseStudyShell>
  )
}
