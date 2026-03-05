import styles from './Footer.module.css'

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Precios', href: '#precios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

const LEGAL_LINKS = [
  { label: 'Política de Privacidad', id: 'privacidad' },
  { label: 'Términos y Condiciones', id: 'terminos' },
  { label: 'Política de Cookies', id: 'cookies' },
  { label: 'Contacto Legal', id: 'contacto-legal' },
]

export default function Footer({ onOpenLegal }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Top grid */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>&gt;_ DEVSTUDIO</span>
            <p className={styles.tagline}>
              Construimos presencias digitales<br />
              que convierten y escalan.
            </p>
            <a
              href="https://wa.me/573001234567?text=Hola!%20Quiero%20información%20sobre%20sus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
            >
              <span className={styles.waIcon}>◉</span>
              WhatsApp directo
            </a>
          </div>

          <nav className={styles.nav} aria-label="Navegación footer">
            <span className={styles.navTitle}>// navegación</span>
            <ul>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={styles.navLink}>
                    <span className={styles.navPrefix}>./</span>{label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <span className={styles.navTitle}>// contacto</span>
            <a href="mailto:hola@devstudio.com" className={styles.contactLink}>
              hola@devstudio.com
            </a>
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              +57 300 123 4567
            </a>
            <p className={styles.hours}>Lun–Vie 8am–6pm · Sáb 9am–1pm</p>
            <div className={styles.social}>
              {[['Instagram', 'I'], ['LinkedIn', 'Li'], ['Behance', 'Be']].map(([name, code]) => (
                <a key={name} href="#" className={styles.socialLink} aria-label={name}>
                  [{code}]
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal strip */}
        <div className={styles.legalStrip}>
          <span className={styles.legalLabel}>// documentos legales</span>
          <div className={styles.legalLinks}>
            {LEGAL_LINKS.map(({ label, id }) => (
              <button
                key={id}
                className={styles.legalLink}
                onClick={() => onOpenLegal(id)}
                data-hover
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <span className={styles.copy}>
            © {new Date().getFullYear()} DEVSTUDIO — Todos los derechos reservados.
          </span>
          <span className={styles.made}>
            Hecho con <span className={styles.heart}>♥</span> en Colombia
          </span>
        </div>

      </div>
    </footer>
  )
}