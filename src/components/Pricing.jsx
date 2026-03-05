import { useState } from 'react'
import { useInView } from '../hooks'
import styles from './Pricing.module.css'

// ── FEATURES TABLE ─────────────────────────────────────
const FEATURE_ROWS = [
  { category: 'diseño',      label: 'Páginas incluidas',       starter: '1',      pro: 'Hasta 8',   enterprise: 'Ilimitadas' },
  { category: 'diseño',      label: 'Diseño personalizado',    starter: '✓',      pro: '✓',         enterprise: '✓' },
  { category: 'diseño',      label: 'Responsivo móvil',        starter: '✓',      pro: '✓',         enterprise: '✓' },
  { category: 'diseño',      label: 'Animaciones premium',     starter: '—',      pro: '✓',         enterprise: '✓' },
  { category: 'funciones',   label: 'Formulario de contacto',  starter: '✓',      pro: '✓',         enterprise: '✓' },
  { category: 'funciones',   label: 'Integración WhatsApp',    starter: '✓',      pro: '✓',         enterprise: '✓' },
  { category: 'funciones',   label: 'Blog / CMS',              starter: '—',      pro: '✓',         enterprise: '✓' },
  { category: 'funciones',   label: 'E-commerce',              starter: '—',      pro: 'Básico',    enterprise: 'Completo' },
  { category: 'funciones',   label: 'Dashboard admin',         starter: '—',      pro: '—',         enterprise: '✓' },
  { category: 'funciones',   label: 'Pasarela de pagos',       starter: '—',      pro: '—',         enterprise: '✓' },
  { category: 'marketing',   label: 'Google Analytics',        starter: '✓',      pro: '✓',         enterprise: '✓' },
  { category: 'marketing',   label: 'SEO técnico',             starter: 'Básico', pro: 'Avanzado',  enterprise: 'SEO + SEM' },
  { category: 'marketing',   label: 'Google Ads listo',        starter: '—',      pro: '✓',         enterprise: '✓' },
  { category: 'soporte',     label: 'Soporte post-entrega',    starter: '30 días',pro: '90 días',   enterprise: '1 año' },
  { category: 'soporte',     label: 'Dominio .com (1 año)',    starter: '✓',      pro: '✓',         enterprise: '✓' },
  { category: 'soporte',     label: 'Hosting (1 año)',         starter: '✓',      pro: '✓',         enterprise: '✓' },
  { category: 'soporte',     label: 'Mantenimiento mensual',   starter: '—',      pro: '—',         enterprise: '✓' },
]

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: { cop: '$1.500.000', usd: 'USD 380' },
    desc: 'Para emprendedores que dan sus primeros pasos en digital.',
    tag: null,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { cop: '$3.800.000', usd: 'USD 950' },
    desc: 'Para negocios que quieren una web completa y lista para escalar.',
    tag: 'recomendado',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { cop: '$8.500.000', usd: 'USD 2.100' },
    desc: 'Solución avanzada para empresas con necesidades específicas.',
    tag: null,
  },
]

const CATEGORIES = ['diseño', 'funciones', 'marketing', 'soporte']

function CellValue({ val, isPro }) {
  if (val === '✓') return <span className={`${styles.cellCheck} ${isPro ? styles.cellCheckPro : ''}`}>✓</span>
  if (val === '—') return <span className={styles.cellNope}>—</span>
  return <span className={styles.cellText}>{val}</span>
}

export default function Pricing() {
  const [currency, setCurrency] = useState('cop')
  const [ref, inView] = useInView()
  const [activeCategory, setActiveCategory] = useState('todas')

  const visibleRows = activeCategory === 'todas'
    ? FEATURE_ROWS
    : FEATURE_ROWS.filter(r => r.category === activeCategory)

  const handleCta = (planId) => {
    const msg = `Hola! Me interesa el plan ${planId.toUpperCase()} para mi proyecto.`
    window.open(`https://wa.me/573001234567?text=${encodeURIComponent(msg)}`, '_blank')
    window.gtag?.('event', 'click_pricing', { event_category: 'conversion', event_label: planId })
  }

  return (
    <section className={styles.section} id="precios">
      <div className="container">

        {/* ── HEADER ── */}
        <div className={`${styles.header} ${inView ? 'fade-in-up' : ''}`} ref={ref}>
          <span className="section-label">precios</span>
          <h2 className={styles.title}>
            <span className={styles.prefix}>{'>'} </span>inversión transparente
          </h2>
          <p className={styles.subtitle}>
            Sin costos ocultos. Compara cada plan y elige el que se adapta a tu proyecto.
          </p>

          <div className={styles.controls}>
            <div className={styles.currencySwitch}>
              <button className={`${styles.switchBtn} ${currency === 'cop' ? styles.switchActive : ''}`} onClick={() => setCurrency('cop')}>COP $</button>
              <button className={`${styles.switchBtn} ${currency === 'usd' ? styles.switchActive : ''}`} onClick={() => setCurrency('usd')}>USD $</button>
            </div>

            <div className={styles.catFilter}>
              {['todas', ...CATEGORIES].map(c => (
                <button
                  key={c}
                  className={`${styles.catBtn} ${activeCategory === c ? styles.catActive : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── COMPARISON TABLE ── */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thFeature}>
                  <span className={styles.thFeatureLabel}>// característica</span>
                </th>
                {PLANS.map(p => (
                  <th key={p.id} className={`${styles.thPlan} ${p.tag ? styles.thPlanFeatured : ''}`}>
                    {p.tag && <span className={styles.featuredTag}>{p.tag}</span>}
                    <span className={styles.planName}>{p.name}</span>
                    <span className={styles.planPrice}>{p.price[currency]}</span>
                    <span className={styles.planDesc}>{p.desc}</span>
                    <button
                      className={`btn ${p.tag ? 'btn-primary' : ''} ${styles.planCta}`}
                      onClick={() => handleCta(p.id)}
                    >
                      <span>cotizar →</span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, i) => {
                // Insert category separator
                const prevCat = i > 0 ? visibleRows[i - 1].category : null
                const showSep = row.category !== prevCat
                return (
                  <>
                    {showSep && (
                      <tr key={`sep-${row.category}`} className={styles.catRow}>
                        <td colSpan={4} className={styles.catLabel}>
                          // {row.category}
                        </td>
                      </tr>
                    )}
                    <tr key={row.label} className={`${styles.row} ${i % 2 === 0 ? styles.rowAlt : ''}`}>
                      <td className={styles.tdFeature}>{row.label}</td>
                      <td className={styles.tdVal}><CellValue val={row.starter} /></td>
                      <td className={`${styles.tdVal} ${styles.tdFeatured}`}><CellValue val={row.pro} isPro /></td>
                      <td className={styles.tdVal}><CellValue val={row.enterprise} /></td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className={styles.note}>
          * Precios desde. El costo final depende de los requerimientos del proyecto.
          Todos los planes incluyen dominio .com y hosting por 1 año.
        </p>
      </div>
    </section>
  )
}