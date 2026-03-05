import { useState } from 'react'
import { useInView } from '../hooks'
import styles from './Projects.module.css'

// ─────────────────────────────────────────────────────────
// PERSONALIZA AQUÍ: cambia imageUrl por la URL de tu
// screenshot real o por '/images/proyecto1.jpg' si pones
// la imagen en /public/images/
// ─────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: 'Landing App Fitness',
    cat: 'landing',
    tech: ['React', 'TypeScript'],
    desc: 'Landing de alta conversión para app de fitness. Formulario con validación, animaciones CSS y Google Ads integrado.',
    result: '+1.200 registros / primer mes',
    imageUrl: null, // → pon aquí: 'https://tudominio.com/screenshot.jpg' o '/images/proyecto1.jpg'
    liveUrl: 'https://tuproyecto1.com', // → URL real del proyecto
    code: `// Hook de conversión
const useConversion = () => {
  const track = (event) => {
    gtag('event', event, {
      category: 'lead', value: 1
    })
  }
  return { track }
}`,
  },
  {
    id: 2,
    title: 'Panel Administrativo',
    cat: 'app',
    tech: ['Angular', 'TypeScript'],
    desc: 'Dashboard para gestión interna. Tablas dinámicas, gráficas en tiempo real y roles de usuario.',
    result: 'Reducción 60% en tiempo de gestión',
    imageUrl: null,
    liveUrl: null, // null = no hay link público (proyecto privado)
    code: `@Component({
  selector: 'app-dashboard',
  template: \`
    <data-table
      [rows]="data$ | async"
      [cols]="columns">
    </data-table>
  \`
})
export class DashboardComponent {}`,
  },
  {
    id: 3,
    title: 'Sitio Corporativo',
    cat: 'corporativo',
    tech: ['React', 'Next.js'],
    desc: 'Sitio multipágina con blog, SEO técnico y formulario de contacto. PageSpeed 98/100.',
    result: 'PageSpeed 98 · SEO posición top 3',
    imageUrl: null,
    liveUrl: 'https://tuproyecto3.com',
    code: `export async function getStaticProps() {
  const posts = await fetchPosts()
  return {
    props: { posts },
    revalidate: 3600
  }
}`,
  },
]

// Mockup SVG generado proceduralmente si no hay imagen real
function MockupPlaceholder({ title, cat }) {
  const colors = { landing: '#1e2a1e', app: '#1a1a2e', corporativo: '#1e1e2a' }
  const bg = colors[cat] || '#1a1a1a'
  return (
    <div className={styles.mockupPlaceholder} style={{ background: bg }}>
      <div className={styles.mockupBar}>
        <span className={styles.mockupDot}/><span className={styles.mockupDot}/><span className={styles.mockupDot}/>
        <span className={styles.mockupUrl}>https://{title.toLowerCase().replace(/\s+/g,'-')}.com</span>
      </div>
      <div className={styles.mockupBody}>
        <div className={styles.mockupHero}>
          <div className={styles.mockupLine} style={{width:'60%', height:'10px'}}/>
          <div className={styles.mockupLine} style={{width:'40%', height:'6px', marginTop:'8px'}}/>
          <div className={styles.mockupBtn}/>
        </div>
        <div className={styles.mockupCards}>
          {[1,2,3].map(i => <div key={i} className={styles.mockupCard}/>)}
        </div>
      </div>
      <div className={styles.mockupOverlayLabel}>{cat}</div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView()
  const [showCode, setShowCode] = useState(false)
  const [imgError, setImgError] = useState(false)

  const hasImage = project.imageUrl && !imgError

  return (
    <div
      ref={ref}
      className={`${styles.card} ${inView ? styles.visible : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* ── VISUAL ── */}
      <div className={styles.visual}>
        {hasImage ? (
          <img
            src={project.imageUrl}
            alt={`Screenshot de ${project.title}`}
            className={styles.screenshot}
            onError={() => setImgError(true)}
          />
        ) : (
          <MockupPlaceholder title={project.title} cat={project.cat} />
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.liveLink}
            onClick={e => e.stopPropagation()}
          >
            ver sitio →
          </a>
        )}
        {!project.liveUrl && (
          <span className={styles.privateTag}>proyecto privado</span>
        )}
      </div>

      {/* ── INFO ── */}
      <div className={styles.info}>
        <div className={styles.cardTop}>
          <span className={styles.cardNum}>{String(index + 1).padStart(2, '0')}</span>
          <span className={styles.catBadge}>{project.cat}</span>
        </div>

        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.desc}</p>

        <div className={styles.result}>
          <span className={styles.resultIcon}>▸</span>
          {project.result}
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.techList}>
            {project.tech.map(t => <span key={t} className={styles.techTag}>{t}</span>)}
          </div>
          <button className={styles.toggleCode} onClick={() => setShowCode(v => !v)} data-hover>
            {showCode ? '[ — código ]' : '[ + código ]'}
          </button>
        </div>

        {showCode && (
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeDot}/><span className={styles.codeDot}/><span className={styles.codeDot}/>
              <span className={styles.codeLabel}>// snippet</span>
            </div>
            <pre className={styles.codePre}><code>{project.code}</code></pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="proyectos">
      <div className="container">
        <div className={`${styles.header} ${inView ? 'fade-in-up' : ''}`} ref={ref}>
          <span className="section-label">proyectos</span>
          <h2 className={styles.title}>
            <span className={styles.prefix}>// </span>trabajo reciente
          </h2>
          <p className={styles.subtitle}>
            Somos una agencia nueva con proyectos reales. Calidad sobre cantidad.
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaLeft}>
            <span className={styles.ctaLabel}>// próximo proyecto</span>
            <p className={styles.ctaText}>¿Tu proyecto podría estar aquí?</p>
          </div>
          <a
            href="https://wa.me/573001234567?text=Quiero%20hablar%20sobre%20mi%20proyecto"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
            onClick={() => window.gtag?.('event','click_whatsapp',{event_category:'projects'})}
          >
            <span>hablemos →</span>
          </a>
        </div>
      </div>
    </section>
  )
}