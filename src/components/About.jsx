import { useInView, useCounter } from '../hooks'
import styles from './About.module.css'

const STATS = [
  { value: 3,   suffix: '+',  label: 'proyectos entregados',    isCounter: true  },
  { value: 100, suffix: '%',  label: 'clientes satisfechos',    isCounter: true  },
  { value: null, display: 'React',   label: 'tecnología principal',  isCounter: false },
  { value: null, display: '2025',    label: 'fundada',               isCounter: false },
]

const PROCESS = [
  { step: '01', title: 'Descubrimiento', desc: 'Analizamos tu negocio, objetivos y competencia.' },
  { step: '02', title: 'Diseño',         desc: 'Prototipamos y diseñamos en Figma. Tú apruebas.' },
  { step: '03', title: 'Desarrollo',     desc: 'Código limpio, rápido y escalable. Actualizaciones semanales.' },
  { step: '04', title: 'Lanzamiento',    desc: 'Deploy, dominio, hosting y capacitación incluidos.' },
]

function StatItem({ stat, inView }) {
  const count = useCounter(stat.isCounter ? stat.value : 0, 2000, inView)
  const display = stat.isCounter ? `${count}${stat.suffix}` : stat.display

  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{display}</span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  )
}

export default function About() {
  const [statsRef, statsInView] = useInView()
  const [procRef,  procInView]  = useInView()

  return (
    <section className={styles.section} id="nosotros">
      <div className="container">

        <div ref={statsRef} className={`${styles.statsGrid} ${statsInView ? styles.visible : ''}`}>
          {STATS.map((s, i) => (
            <StatItem key={i} stat={s} inView={statsInView} />
          ))}
        </div>

        <div className={`${styles.aboutGrid} ${procInView ? 'fade-in-up' : ''}`} ref={procRef}>
          <div className={styles.aboutLeft}>
            <span className="section-label">nosotros</span>
            <h2 className={styles.title}>
              Hacemos webs que{' '}
              <span className={styles.emphasis}>trabajan</span>{' '}
              por tu negocio
            </h2>
            <p className={styles.text}>
              Somos una agencia joven con hambre de resultados. Nos especializamos en
              React, TypeScript y Angular — y cada proyecto lo tratamos como si fuera el nuestro.
            </p>
            <p className={styles.text}>
              Arrancamos en 2025 con una misión simple: <em>construir webs que generen
              resultados reales,</em> no solo páginas bonitas.
            </p>
            <a
              href="https://wa.me/573001234567?text=Quiero%20conocer%20más%20sobre%20su%20equipo"
              target="_blank" rel="noopener noreferrer"
              className="btn"
            >
              <span>hablemos →</span>
            </a>
          </div>

          <div className={styles.aboutRight}>
            <div className="terminal-box" data-label="// proceso" style={{ padding: 0 }}>
              {PROCESS.map((p, i) => (
                <div key={p.step} className={styles.processItem} style={{ animationDelay: `${i * 0.15}s` }}>
                  <span className={styles.processStep}>{p.step}</span>
                  <div>
                    <div className={styles.processTitle}>{p.title}</div>
                    <div className={styles.processDesc}>{p.desc}</div>
                  </div>
                  <span className={styles.processIcon}>▸</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}