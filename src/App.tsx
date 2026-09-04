import { HashRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import Work from './pages/Work'
import Journey from './pages/Journey'
import About from './pages/About'
import Contact from './pages/Contact'
import CaseStudyIntelliForge from './pages/CaseStudyIntelliForge'
import CaseStudyOneRAK from './pages/CaseStudyOneRAK'
import CaseStudyTamkeen from './pages/CaseStudyTamkeen'
import CaseStudyDesignSystem from './pages/CaseStudyDesignSystem'
import CaseStudyNeoBank from './pages/CaseStudyNeoBank'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/intelliforge" element={<CaseStudyIntelliForge />} />
        <Route path="/work/onerak" element={<CaseStudyOneRAK />} />
        <Route path="/work/tamkeen" element={<CaseStudyTamkeen />} />
        <Route path="/work/design-system" element={<CaseStudyDesignSystem />} />
        <Route path="/work/neobank" element={<CaseStudyNeoBank />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </HashRouter>
  )
}
