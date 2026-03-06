import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    id: 1,
    title: 'Landing App Fitness',
    cat: 'landing',
    tech: ['React', 'TypeScript'],
    desc: 'Landing de alta conversión para app de fitness. Formulario con validación, animaciones CSS y Google Ads integrado.',
    result: '+1.200 registros / primer mes',
    imageUrl: null,
    liveUrl: 'https://tuproyecto1.com',
    accentColor: '#9d8ec4',
    mockupType: 'landing',
  },
  {
    id: 2,
    title: 'Panel Administrativo',
    cat: 'app',
    tech: ['Angular', 'TypeScript'],
    desc: 'Dashboard para gestión interna. Tablas dinámicas, gráficas en tiempo real y roles de usuario.',
    result: 'Reducción 60% tiempo de gestión',
    imageUrl: null,
    liveUrl: null,
    accentColor: '#8898b8',
    mockupType: 'dashboard',
  },
  {
    id: 3,
    title: 'Sitio Corporativo',
    cat: 'corporativo',
    tech: ['React', 'Next.js'],
    desc: 'Sitio multipágina con blog, SEO técnico y formulario de contacto. PageSpeed 98/100.',
    result: 'PageSpeed 98 · SEO top 3',
    imageUrl: null,
    liveUrl: 'https://tuproyecto3.com',
    accentColor: '#b08090',
    mockupType: 'corporate',
  },
]

function CanvasMockup({ type, accent }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    const W = c.width, H = c.height

    const rect = (x, y, w, h, r = 2, fill = 'rgba(255,255,255,0.07)') => {
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, r)
      else ctx.rect(x, y, w, h)
      ctx.fillStyle = fill
      ctx.fill()
    }

    ctx.clearRect(0, 0, W, H)
    const bg = ctx.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0, '#0f0f14')
    bg.addColorStop(1, '#1a1a24')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)

    // Browser bar
    ctx.fillStyle = 'rgba(255,255,255,0.04)'
    ctx.fillRect(0, 0, W, 28)
    ctx.fillStyle = 'rgba(255,255,255,0.12)'
    ctx.fillRect(0, 27, W, 1)
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(12 + i * 14, 14, 4, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${0.1 + i * 0.03})`
      ctx.fill()
    }
    rect(44, 8, W - 56, 14, 3, 'rgba(255,255,255,0.05)')

    const col = accent + '33'

    if (type === 'landing') {
      rect(16, 40, W - 32, 55, 4, col)
      rect(30, 50, 100, 10, 2, 'rgba(255,255,255,0.15)')
      rect(30, 65, 70, 6, 2, 'rgba(255,255,255,0.08)')
      rect(30, 76, 50, 12, 3, accent + '55')
      const cw = (W - 48) / 3
      for (let i = 0; i < 3; i++) {
        rect(16 + i * (cw + 8), 106, cw, 45, 4)
        rect(24 + i * (cw + 8), 114, cw - 16, 8, 2, 'rgba(255,255,255,0.1)')
        rect(24 + i * (cw + 8), 126, cw - 24, 5, 1, 'rgba(255,255,255,0.06)')
        rect(24 + i * (cw + 8), 134, cw - 28, 5, 1, 'rgba(255,255,255,0.04)')
      }
      rect(16, 162, W - 32, 16, 3, 'rgba(255,255,255,0.04)')
      rect(30, 167, 60, 6, 2, accent + '44')
    }

    if (type === 'dashboard') {
      rect(0, 28, 48, H - 28, 0, 'rgba(255,255,255,0.04)')
      for (let i = 0; i < 5; i++) rect(8, 38 + i * 20, 32, 10, 2, 'rgba(255,255,255,0.06)')
      rect(56, 36, W - 72, 14, 3, 'rgba(255,255,255,0.06)')
      const sw = (W - 64) / 3
      for (let i = 0; i < 3; i++) {
        rect(56 + i * (sw + 4), 58, sw, 36, 4, col)
        rect(62 + i * (sw + 4), 64, 30, 8, 2, 'rgba(255,255,255,0.2)')
        rect(62 + i * (sw + 4), 76, 20, 5, 1, 'rgba(255,255,255,0.08)')
      }
      rect(56, 102, W - 130, 72, 4)
      const bars = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 1.0, 0.75]
      bars.forEach((h, i) => rect(64 + i * 10, 102 + 72 - 60 * h, 7, 60 * h, 1, accent + '66'))
      rect(W - 66, 102, 58, 72, 4)
      for (let i = 0; i < 5; i++) rect(W - 62, 110 + i * 12, 50, 6, 1, 'rgba(255,255,255,0.07)')
    }

    if (type === 'corporate') {
      rect(16, 36, W - 32, 16, 2, 'rgba(255,255,255,0.05)')
      rect(16, 60, W - 32, 60, 4, col)
      rect(W / 2 - 55, 70, 110, 10, 2, 'rgba(255,255,255,0.2)')
      rect(W / 2 - 35, 84, 70, 6, 2, 'rgba(255,255,255,0.1)')
      rect(W / 2 - 25, 94, 50, 12, 3, accent + '55')
      const cw2 = (W - 48) / 2
      rect(16, 130, cw2, 45, 4)
      rect(24 + cw2, 130, cw2, 45, 4)
      for (let k = 0; k < 2; k++) {
        rect(24 + k * (cw2 + 8), 138, cw2 - 16, 8, 2, 'rgba(255,255,255,0.1)')
        rect(24 + k * (cw2 + 8), 150, cw2 - 24, 18, 2, 'rgba(255,255,255,0.05)')
      }
      ctx.fillStyle = 'rgba(255,255,255,0.04)'
      ctx.fillRect(0, H - 22, W, 22)
      rect(16, H - 16, 60, 6, 2, 'rgba(255,255,255,0.08)')
    }

    for (let y = 28; y < H; y += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.04)'
      ctx.fillRect(0, y, W, 1)
    }
    const glow = ctx.createRadialGradient(W, 0, 0, W, 0, 80)
    glow.addColorStop(0, accent + '22')
    glow.addColorStop(1, 'transparent')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, W, H)
  }, [type, accent])

  return <canvas ref={canvasRef} width={380} height={200} className={styles.mockupCanvas} />
}

function ProjectCard({ project, index }) {
  // Use threshold 0 so cards trigger even if partially visible
  const [cardRef, inView] = useInView({ threshold: 0, rootMargin: '0px 0px -50px 0px' })
  const [showCode, setShowCode] = useState(false)
  const [imgError, setImgError] = useState(false)
  const hasImage = project.imageUrl && !imgError

  const codeSnippets = {
    landing: `const useConversion = () => {
  const track = (event) => {
    gtag('event', event, {
      category: 'lead', value: 1
    })
  }
  return { track }
}`,
    dashboard: `@Component({
  selector: 'app-dashboard',
  template: \`
    <data-table
      [rows]="data$ | async"
      [cols]="columns">
    </data-table>
  \`
})
export class DashboardComponent {}`,
    corporate: `export async function getStaticProps() {
  const posts = await fetchPosts()
  return {
    props: { posts },
    revalidate: 3600
  }
}`,
  }

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${inView ? styles.visible : ''}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Visual */}
      <div className={styles.visual}>
        {hasImage
          ? <img src={project.imageUrl} alt={project.title} className={styles.screenshot} onError={() => setImgError(true)} />
          : <CanvasMockup type={project.mockupType} accent={project.accentColor} />
        }
        <div className={styles.accentLine} style={{ background: project.accentColor }} />
        {project.liveUrl
          ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>ver sitio →</a>
          : <span className={styles.privateTag}>[ privado ]</span>
        }
      </div>

      {/* Info */}
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
          <button className={styles.toggleCode} onClick={() => setShowCode(v => !v)}>
            {showCode ? '[ — ]' : '[ + código ]'}
          </button>
        </div>
        {showCode && (
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeDot} /><span className={styles.codeDot} /><span className={styles.codeDot} />
              <span className={styles.codeLabel}>// snippet</span>
            </div>
            <pre className={styles.codePre}><code>{codeSnippets[project.mockupType]}</code></pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [headerRef, headerInView] = useInView({ threshold: 0 })

  return (
    <section className={styles.section} id="proyectos">
      <div className="container">
        <div className={`${styles.header} ${headerInView ? styles.headerVisible : ''}`} ref={headerRef}>
          <span className="section-label">proyectos</span>
          <h2 className={styles.title}>
            <span className={styles.prefix}>// </span>trabajo reciente
          </h2>
          <p className={styles.subtitle}>
            Somos una agencia nueva con proyectos reales. Calidad sobre cantidad.
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
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
          >
            <span>hablemos →</span>
          </a>
        </div>
      </div>
    </section>
  )
}