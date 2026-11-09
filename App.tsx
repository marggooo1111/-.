import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LangProvider } from './i18n'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/biography" element={<ComingSoon k="nav.bio" />} />
          <Route path="/personal-life" element={<ComingSoon k="nav.life" />} />
          <Route path="/paintings" element={<ComingSoon k="nav.paintings" />} />
          <Route path="/art-style" element={<ComingSoon k="nav.style" />} />
          <Route path="/legacy" element={<ComingSoon k="nav.legacy" />} />
          <Route path="/museum" element={<ComingSoon k="nav.museum" />} />
          <Route path="*" element={<ComingSoon k="nav.home" />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  )
}
