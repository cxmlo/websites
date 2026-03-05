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

  useEffect(() => {
    const steps = [
      { p: 25, t: 'cargando assets...', delay: 300 },
      { p: 55, t: 'compilando estilos...', delay: 700 },
      { p: 80, t: 'montando componentes...', delay: 1100 },
      { p: 100, t: 'listo.', delay: 1600 },
    ]
    steps.forEach(({ p, t, delay }) => {
      setTimeout(() => {
        setProgress(p)
        setText(t)
        if (p === 100) setTimeout(onDone, 500)
      }, delay)
    })
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#0a0a0a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, fontFamily: "'Share Tech Mono', monospace"
    }}>
      <div style={{ fontSize: '2.5rem', letterSpacing: '0.3em', color: '#e8e8e8', marginBottom: '2rem' }}>
        &gt;_ DEVSTUDIO
      </div>
      <div style={{ width: '280px', height: '1px', background: '#2a2a2a', marginBottom: '0.75rem', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: '#888', width: `${progress}%`, transition: 'width 0.4s ease' }} />
      </div>
      <div style={{ fontSize: '0.72rem', color: '#555', letterSpacing: '0.1em' }}>
        {text} [{progress}%]
      </div>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [legalPage, setLegalPage] = useState(null) // null | 'privacidad' | 'terminos' | 'cookies' | 'contacto-legal'
  const handleDone = useCallback(() => setLoading(false), [])

  // When LegalModal asks to switch tabs, it calls onClose(newId)
  // If newId is a string, open that page. If undefined/null, close.
  const handleLegalClose = useCallback((newPage) => {
    if (typeof newPage === 'string') {
      setLegalPage(newPage)
    } else {
      setLegalPage(null)
    }
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
          {legalPage && (
            <LegalModal
              page={legalPage}
              onClose={handleLegalClose}
            />
          )}
        </>
      )}
    </>
  )
}