import { useState } from 'react'
import { useInView } from '../hooks'
import styles from './Services.module.css'

const SERVICES = [
  {
    id: '01',
    icon: '⬡',
    title: 'Landing Pages',
    desc: 'Páginas de aterrizaje optimizadas para convertir visitantes en clientes. Velocidad máxima, diseño que vende.',
    features: ['Diseño personalizado', 'Optimización de conversión', 'Formularios integrados', 'A/B testing listo'],
    tag: 'más popular',
  },
  {
    id: '02',
    icon: '⬢',
    title: 'Tiendas Online',
    desc: 'E-commerce robusto con carrito, pagos seguros y gestión de inventario. Tu negocio abierto 24/7.',
    features: ['WooCommerce / Shopify', 'Pagos PSE / Nequi / Tarjeta', 'Panel de gestión', 'SEO para productos'],
    tag: null,
  },
  {
    id: '03',
    icon: '◈',
    title: 'Sitios Corporativos',
    desc: 'Presencia digital profesional para empresas. Credibilidad, autoridad y captación de leads.',
    features: ['Multi-página', 'Blog / noticias', 'Formularios de contacto', 'Google My Business'],
    tag: null,
  },
  {
    id: '04',
    icon: '◆',
    title: 'Portafolios',
    desc: 'Muestra tu trabajo de forma impactante. Ideal para creativos, fotógrafos, arquitectos y freelancers.',
    features: ['Galería interactiva', 'Animaciones suaves', 'Optimizado para móvil', 'CMS fácil de editar'],
    tag: null,
  },
  {
    id: '05',
    icon: '◇',
    title: 'Web Apps',
    desc: 'Aplicaciones web a medida para automatizar procesos, gestionar datos o escalar tu negocio.',
    features: ['React / Next.js', 'APIs personalizadas', 'Dashboard admin', 'Escalable en la nube'],
    tag: 'nuevo',
  },
  {
    id: '06',
    icon: '▣',
    title: 'Mantenimiento & SEO',
    desc: 'Mantén tu web segura, actualizada y visible en Google. Plan mensual sin sorpresas.',
    features: ['Backups automáticos', 'Actualizaciones', 'Reporte mensual SEO', 'Soporte prioritario'],
    tag: null,
  },
]

function ServiceCard({ service, index, isActive, onClick }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isActive ? styles.cardActive : ''} ${inView ? styles.visible : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onClick(service.id)}
      data-hover
    >
      {service.tag && (
        <span className={styles.tag}>{service.tag}</span>
      )}

      <div className={styles.cardTop}>
        <span className={styles.cardNum}>{service.id}</span>
        <span className={styles.icon}>{service.icon}</span>
      </div>

      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardDesc}>{service.desc}</p>

      <ul className={`${styles.features} ${isActive ? styles.featuresVisible : ''}`}>
        {service.features.map((f, i) => (
          <li key={i} className={styles.feature}>
            <span className={styles.featureCheck}>▸</span> {f}
          </li>
        ))}
      </ul>

      <div className={styles.cardFooter}>
        <span className={styles.learnMore}>
          {isActive ? '[ contraer ]' : '[ ver más ]'}
        </span>
        <a
          href="https://wa.me/573001234567?text=Quiero%20información%20sobre%20este%20servicio"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaLink}
          onClick={(e) => {
            e.stopPropagation()
            window.gtag?.('event', 'click_whatsapp', { event_category: 'services', event_label: service.title })
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
            Cada proyecto es único. Cada línea de código tiene un propósito.
            Selecciona un servicio para ver los detalles.
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
      </div>
    </section>
  )
}