import { useState, useCallback, useEffect } from 'react'
import { useCursor } from './hooks'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import Pricing from './components/Pricing'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import LegalModal from './components/LegalModal'
import CookieBanner from './components/CookieBanner'
import './index.css'

// Apply saved theme before render
const savedTheme = localStorage.getItem('devstudio-theme') || 'light'
document.documentElement.setAttribute('data-theme', savedTheme)

function Cursor() {
  const { pos, hovering, clicking } = useCursor()
  return (
    <div
      className={`cursor ${hovering ? 'hovering' : ''} ${clicking ? 'clicking' : ''}`}
      style={{ left: pos.x, top: pos.y }}
    />
  )
}

function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState('inicializando...')
  const theme = document.documentElement.getAttribute('data-theme')
  const isDark = theme === 'dark'
  const loaderBg    = isDark ? '#0a0a0a' : '#f4f1eb'
  const loaderText  = isDark ? '#e8e8e8' : '#1a1714'
  const trackColor  = isDark ? '#2a2a2a' : '#c8c0b0'
  const barColor    = isDark ? '#888'    : '#5a5248'
  const subColor    = isDark ? '#555'    : '#9a9080'

  useEffect(() => {
    const steps = [
      { p: 25, t: 'cargando assets...',       delay: 300  },
      { p: 55, t: 'compilando estilos...',     delay: 700  },
      { p: 80, t: 'montando componentes...',   delay: 1100 },
      { p: 100, t: 'listo.',                   delay: 1600 },
    ]
    steps.forEach(({ p, t, delay }) => {
      setTimeout(() => { setProgress(p); setText(t); if (p === 100) setTimeout(onDone, 500) }, delay)
    })
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: loaderBg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, fontFamily: "'Share Tech Mono', monospace",
      padding: '1rem',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', letterSpacing: '0.2em', color: loaderText, marginBottom: '2rem', whiteSpace: 'nowrap' }}>
        &gt;_ DEVSTUDIO
      </div>
      <div style={{ width: 'min(280px, 80vw)', height: '1px', background: trackColor, marginBottom: '0.75rem', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: barColor, width: `${progress}%`, transition: 'width 0.4s ease' }} />
      </div>
      <div style={{ fontSize: '0.72rem', color: subColor, letterSpacing: '0.1em' }}>
        {text} [{progress}%]
      </div>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [legalPage, setLegalPage] = useState(null)
  const handleDone = useCallback(() => setLoading(false), [])
  const handleLegalClose = useCallback((newPage) => {
    if (typeof newPage === 'string') setLegalPage(newPage)
    else setLegalPage(null)
  }, [])

  return (
    <>
      {loading && <Loader onDone={handleDone} />}
      {!loading && (
        <>
          <Cursor />
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Projects />
            <About />
            <Pricing />
            <Contact />
          </main>
          <Footer onOpenLegal={(id) => setLegalPage(id)} />
          <WhatsAppFloat />
          <CookieBanner onOpenCookies={() => setLegalPage('cookies')} />
          {legalPage && <LegalModal page={legalPage} onClose={handleLegalClose} />}
        </>
      )}
    </>
  )
}