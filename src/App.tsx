import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Breadcrumb from './components/Breadcrumb'
import { LanguageProvider } from './i18n/LanguageContext'
import Portfolio from './pages/Portfolio'
const Work = lazy(() => import('./pages/Work'))
const Journey = lazy(() => import('./pages/Journey'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const CaseStudyIntelliForge = lazy(() => import('./pages/CaseStudyIntelliForge'))
const CaseStudyOneRAK = lazy(() => import('./pages/CaseStudyOneRAK'))
const CaseStudyTamkeen = lazy(() => import('./pages/CaseStudyTamkeen'))
const CaseStudyDesignSystem = lazy(() => import('./pages/CaseStudyDesignSystem'))
const CaseStudyAgenticUXFlow = lazy(() => import('./pages/CaseStudyAgenticUXFlow'))
const CaseStudyEDPPlanetaZero = lazy(() => import('./pages/CaseStudyEDPPlanetaZero'))
const CaseStudyERARevamp = lazy(() => import('./pages/CaseStudyERARevamp'))

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <Breadcrumb />
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/intelliforge" element={<CaseStudyIntelliForge />} />
          <Route path="/work/onerak" element={<CaseStudyOneRAK />} />
          <Route path="/work/tamkeen" element={<CaseStudyTamkeen />} />
          <Route path="/work/design-system" element={<CaseStudyDesignSystem />} />
          <Route path="/work/agentic-ux-flow" element={<CaseStudyAgenticUXFlow />} />
          <Route path="/work/edp-planeta-zero" element={<CaseStudyEDPPlanetaZero />} />
          <Route path="/work/era-revamp" element={<CaseStudyERARevamp />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        </Suspense>
      </HashRouter>
    </LanguageProvider>
  )
}
