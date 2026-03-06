import { useState, useEffect, useCallback } from 'react'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'servicios', href: '#servicios' },
  { label: 'proyectos', href: '#proyectos' },
  { label: 'precios', href: '#precios' },
  { label: 'nosotros', href: '#nosotros' },
  { label: 'contacto', href: '#contacto' },
]

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('devstudio-theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('devstudio-theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }, [])

  return (
    <button
      className={styles.themeBtn}
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
      data-hover
    >
      <span className={styles.themeIcon}>{theme === 'dark' ? '☀' : '◑'}</span>
      <span className={styles.themeLabel}>{theme === 'dark' ? 'claro' : 'oscuro'}</span>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setActive(href)
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Overlay when menu open on mobile */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}

      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <a className={styles.logo} href="#inicio" onClick={() => handleNav('#inicio')}>
            <span className={styles.logoSymbol}>&gt;_</span>
            <span className={styles.logoText}>DEVSTUDIO</span>
            <span className={styles.logoCursor}>█</span>
          </a>

          <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <button
                  className={`${styles.link} ${active === href ? styles.activeLink : ''}`}
                  onClick={() => handleNav(href)}
                >
                  <span className={styles.prefix}>./</span>{label}
                </button>
              </li>
            ))}
            <li className={styles.ctaWrap}>
              <a
                href="https://wa.me/573001234567?text=Hola!%20Quiero%20información%20sobre%20sus%20servicios"
                target="_blank" rel="noopener noreferrer"
                className={`btn btn-primary ${styles.ctaBtn}`}
              >
                <span>[ contactar ]</span>
              </a>
            </li>
          </ul>

          <div className={styles.rightControls}>
            <ThemeToggle />
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(m => !m)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}