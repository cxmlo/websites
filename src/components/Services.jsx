import { useState } from 'react'
import { useInView } from '../hooks'
import styles from './Services.module.css'

const SERVICES = [
  {
    id: '01',
    icon: '▲',
    title: 'Landing Pages',
    tag: 'especialidad',
    price: 'Desde $1.500.000 COP',
    desc: 'Una página enfocada en un solo objetivo: que el visitante actúe. Cotización, compra, registro — sin distracciones.',
    features: [
      'Diseño 100% personalizado en Figma',
      'Optimizada para Google Ads y Meta Ads',
      'Formulario con validación y notificación',
      'Botón WhatsApp integrado',
      'Velocidad 90+ en PageSpeed',
      'Entrega en 7–10 días hábiles',
    ],
    stack: ['React', 'TypeScript'],
    wa: 'Hola! Me interesa una Landing Page.',
  },
  {
    id: '02',
    icon: '◈',
    title: 'Tiendas Online',
    tag: 'especialidad',
    price: 'Desde $3.800.000 COP',
    desc: 'Tu negocio abierto 24/7. Catálogo, carrito, pagos y gestión de pedidos — todo en un solo lugar.',
    features: [
      'Catálogo de productos ilimitado',
      'Pagos PSE · Nequi · Tarjeta crédito/débito',
      'Panel de administración fácil de usar',
      'SEO para productos y categorías',
      'Integración con redes sociales',
      'Soporte técnico 90 días',
    ],
    stack: ['React', 'WooCommerce'],
    wa: 'Hola! Me interesa una Tienda Online.',
  },
  {
    id: '03',
    icon: '◎',
    title: 'SEO & Posicionamiento',
    tag: 'complementario',
    price: 'Cotización',
    desc: 'De nada sirve una web bonita si nadie la encuentra. Optimizamos para que Google te muestre primero.',
    features: [
      'Auditoría SEO inicial completa',
      'Optimización técnica on-page',
      'Meta títulos y descripciones',
      'Velocidad y Core Web Vitals',
      'Google Search Console configurado',
      'Reporte mensual de posiciones',
    ],
    stack: ['Google Search Console', 'Analytics'],
    wa: 'Hola! Me interesa el servicio de SEO.',
  },
  {
    id: '04',
    icon: '⬡',
    title: 'Mantenimiento',
    tag: 'plan mensual',
    price: 'Desde $350.000 / mes',
    desc: 'Tu web actualizada, segura y funcionando. Sin preocuparte por nada técnico.',
    features: [
      'Backups automáticos diarios',
      'Actualizaciones de seguridad',
      'Monitoreo de disponibilidad 24/7',
      'Correcciones y ajustes menores',
      'Informe mensual de rendimiento',
      'Soporte vía WhatsApp en horas hábiles',
    ],
    stack: ['Hosting', 'SSL', 'CDN'],
    wa: 'Hola! Me interesa el plan de Mantenimiento.',
  },
]

// Mini terminal canvas per service card
function ServiceIcon({ icon, color }) {
  return (
    <div className={styles.iconBox} style={{ borderColor: color + '44', background: color + '11' }}>
      <span className={styles.iconGlyph} style={{ color }}>{icon}</span>
    </div>
  )
}

const ACCENT_COLORS = ['#9d8ec4', '#8898b8', '#b89880', '#b08090']

function ServiceCard({ service, index, isActive, onClick }) {
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length]
  const isEspecialidad = service.tag === 'especialidad'

  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardActive : ''} ${isEspecialidad ? styles.cardFeatured : ''}`}
      onClick={() => onClick(service.id)}
      data-hover
    >
      {service.tag && (
        <span className={styles.tag} style={isEspecialidad ? { color, borderColor: color + '66' } : {}}>
          {service.tag}
        </span>
      )}

      <div className={styles.cardTop}>
        <ServiceIcon icon={service.icon} color={color} />
        <span className={styles.cardNum}>{service.id}</span>
      </div>

      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardDesc}>{service.desc}</p>

      {/* Price */}
      <div className={styles.priceRow}>
        <span className={styles.priceIcon}>◆</span>
        <span className={styles.price} style={{ color }}>{service.price}</span>
      </div>

      {/* Expandable features */}
      <div className={`${styles.featuresWrap} ${isActive ? styles.featuresOpen : ''}`}>
        <ul className={styles.features}>
          {service.features.map((f, i) => (
            <li key={i} className={styles.feature}>
              <span className={styles.featureCheck} style={{ color }}>▸</span>
              {f}
            </li>
          ))}
        </ul>
        <div className={styles.stackRow}>
          {service.stack.map(s => (
            <span key={s} className={styles.stackTag}>{s}</span>
          ))}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.toggle}>
          {isActive ? '[ — menos ]' : '[ + detalles ]'}
        </span>
        <a
          href={`https://wa.me/573001234567?text=${encodeURIComponent(service.wa)}`}
          target="_blank" rel="noopener noreferrer"
          className={styles.ctaLink}
          style={{ color, borderColor: color + '55' }}
          onClick={e => {
            e.stopPropagation()
            window.gtag?.('event', 'click_service', { event_label: service.title })
          }}
        >
          cotizar →
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  const [activeCard, setActiveCard] = useState(null)
  const [ref, inView] = useInView()
  const handleClick = (id) => setActiveCard(a => a === id ? null : id)

  return (
    <section className={styles.section} id="servicios">
      <div className="container">
        <div className={`${styles.header} ${inView ? 'fade-in-up' : ''}`} ref={ref}>
          <span className="section-label">servicios</span>
          <h2 className={styles.title}>
            <span className={styles.titlePrefix}>{'>'}_</span>
            ¿qué construimos?
          </h2>
          <p className={styles.subtitle}>
            Nos especializamos en <strong>landing pages</strong> y <strong>tiendas online</strong>.
            También ofrecemos SEO y mantenimiento para que tu inversión dure.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              index={i}
              isActive={activeCard === s.id}
              onClick={handleClick}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div className={styles.note}>
          <span className={styles.noteIcon}>// </span>
          Los precios mostrados son referenciales. Cada proyecto se cotiza según sus requerimientos.
          <a
            href="https://wa.me/573001234567?text=Hola!%20Quiero%20una%20cotización%20personalizada."
            target="_blank" rel="noopener noreferrer"
            className={styles.noteLink}
          >
            Solicitar cotización gratis →
          </a>
        </div>
      </div>
    </section>
  )
}