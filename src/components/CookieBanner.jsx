import { useState, useEffect } from 'react'
import styles from './CookieBanner.module.css'

const COOKIE_KEY = 'devstudio_cookies_v1'

export default function CookieBanner({ onOpenCookies }) {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: true, marketing: true })

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY)
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const save = (accepted) => {
    const data = {
      accepted,
      prefs: accepted ? prefs : { analytics: false, marketing: false },
      timestamp: Date.now(),
    }
    localStorage.setItem(COOKIE_KEY, JSON.stringify(data))

    // Apply Google consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: data.prefs.analytics ? 'granted' : 'denied',
        ad_storage: data.prefs.marketing ? 'granted' : 'denied',
      })
    }

    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={`${styles.banner} ${visible ? styles.visible : ''}`} role="dialog" aria-label="Preferencias de cookies">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.titleRow}>
            <span className={styles.icon}>⬡</span>
            <span className={styles.title}>Este sitio usa cookies</span>
          </div>
          <p className={styles.text}>
            Utilizamos cookies para analizar el tráfico y medir el rendimiento de nuestras campañas.
            Puedes aceptar todas, personalizar o rechazar las no esenciales.{' '}
            <button className={styles.learnMore} onClick={onOpenCookies}>
              Ver política completa →
            </button>
          </p>
        </div>

        {expanded && (
          <div className={styles.prefs}>
            <CookieToggle
              label="Cookies esenciales"
              desc="Necesarias para el funcionamiento del sitio. No se pueden desactivar."
              checked={true}
              disabled={true}
            />
            <CookieToggle
              label="Cookies analíticas (Google Analytics)"
              desc="Nos ayudan a entender cómo usas el sitio. Toda la información es anónima."
              checked={prefs.analytics}
              onChange={(v) => setPrefs(p => ({ ...p, analytics: v }))}
            />
            <CookieToggle
              label="Cookies de marketing (Google Ads)"
              desc="Miden la efectividad de nuestros anuncios. Sin datos personales identificables."
              checked={prefs.marketing}
              onChange={(v) => setPrefs(p => ({ ...p, marketing: v }))}
            />
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={() => save(false)}>
            Rechazar no esenciales
          </button>
          <button className={styles.btnSecondary} onClick={() => setExpanded(e => !e)}>
            {expanded ? 'Ocultar opciones ↑' : 'Personalizar ↓'}
          </button>
          <button className={styles.btnPrimary} onClick={() => save(true)}>
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}

function CookieToggle({ label, desc, checked, disabled, onChange }) {
  return (
    <label className={`${styles.toggle} ${disabled ? styles.toggleDisabled : ''}`}>
      <div className={styles.toggleInfo}>
        <span className={styles.toggleLabel}>{label}</span>
        <span className={styles.toggleDesc}>{desc}</span>
      </div>
      <div
        className={`${styles.switch} ${checked ? styles.switchOn : ''}`}
        onClick={() => !disabled && onChange?.(!checked)}
        role="checkbox"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
      >
        <span className={styles.switchThumb} />
      </div>
    </label>
  )
}