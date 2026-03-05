import { useEffect, useRef, useState, useCallback } from 'react'
import { useTypewriter } from '../hooks'
import styles from './Hero.module.css'

const TYPEWRITER_TEXTS = [
  'landing pages que convierten.',
  'tiendas online que venden.',
  'portafolios que impactan.',
  'apps web que escalan.',
  'marcas que se recuerdan.',
]

const TICKER_ITEMS = [
  'REACT', 'TYPESCRIPT', 'ANGULAR', 'NEXT.JS',
  'NODE.JS', 'LANDING PAGES', 'E-COMMERCE', 'SEO',
  'FIGMA', 'UI/UX', 'APPS WEB', 'BRANDING',
]

// ── TECH LOGOS 3D ──────────────────────────────────────
const TECH_LOGOS = [
  {
    id: 'react',
    label: 'React',
    color: '#61DAFB',
    draw: (ctx, t) => {
      ctx.save()
      ctx.strokeStyle = '#61DAFB'
      ctx.lineWidth = 2.5
      ctx.shadowColor = '#61DAFB'
      ctx.shadowBlur = 12

      // Nucleus
      ctx.beginPath()
      ctx.arc(0, 0, 6, 0, Math.PI * 2)
      ctx.fillStyle = '#61DAFB'
      ctx.fill()

      // 3 orbits
      for (let i = 0; i < 3; i++) {
        ctx.save()
        ctx.rotate((Math.PI / 3) * i + t * 0.6)
        ctx.scale(1, 0.38)
        ctx.beginPath()
        ctx.ellipse(0, 0, 38, 38, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }
      ctx.restore()
    },
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    color: '#3178C6',
    draw: (ctx, t) => {
      ctx.save()
      const s = 34 + Math.sin(t * 1.2) * 3
      const r = 6

      // Rounded rect
      ctx.beginPath()
      ctx.moveTo(-s/2 + r, -s/2)
      ctx.lineTo(s/2 - r, -s/2)
      ctx.arcTo(s/2, -s/2, s/2, -s/2 + r, r)
      ctx.lineTo(s/2, s/2 - r)
      ctx.arcTo(s/2, s/2, s/2 - r, s/2, r)
      ctx.lineTo(-s/2 + r, s/2)
      ctx.arcTo(-s/2, s/2, -s/2, s/2 - r, r)
      ctx.lineTo(-s/2, -s/2 + r)
      ctx.arcTo(-s/2, -s/2, -s/2 + r, -s/2, r)
      ctx.closePath()
      ctx.fillStyle = '#3178C6'
      ctx.shadowColor = '#3178C6'
      ctx.shadowBlur = 14
      ctx.fill()

      // "TS" text
      ctx.fillStyle = '#fff'
      ctx.font = `bold ${14 + Math.sin(t) * 1}px monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowBlur = 0
      ctx.fillText('TS', 0, 0)
      ctx.restore()
    },
  },
  {
    id: 'angular',
    label: 'Angular',
    color: '#DD0031',
    draw: (ctx, t) => {
      ctx.save()
      ctx.shadowColor = '#DD0031'
      ctx.shadowBlur = 14

      const pulse = 1 + Math.sin(t * 1.5) * 0.04
      ctx.scale(pulse, pulse)

      // Shield
      const pts = [
        [0, -38], [34, -22], [34, 10], [0, 38], [-34, 10], [-34, -22]
      ]
      ctx.beginPath()
      ctx.moveTo(pts[0][0], pts[0][1])
      pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]))
      ctx.closePath()
      ctx.strokeStyle = '#DD0031'
      ctx.lineWidth = 2.5
      ctx.stroke()

      // Inner "A"
      ctx.fillStyle = '#DD0031'
      ctx.shadowBlur = 0
      ctx.font = 'bold 26px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('A', 0, 2)
      ctx.restore()
    },
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    color: '#e8e8e8',
    draw: (ctx, t) => {
      ctx.save()
      const r = 32 + Math.sin(t * 0.8) * 2
      ctx.shadowColor = '#e8e8e8'
      ctx.shadowBlur = 10

      // Circle
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.strokeStyle = '#e8e8e8'
      ctx.lineWidth = 2
      ctx.stroke()

      // N letter
      ctx.fillStyle = '#e8e8e8'
      ctx.font = `bold ${20 + Math.sin(t) * 1}px monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowBlur = 0
      ctx.fillText('N', 0, 0)
      ctx.restore()
    },
  },
  {
    id: 'node',
    label: 'Node.js',
    color: '#68A063',
    draw: (ctx, t) => {
      ctx.save()
      ctx.shadowColor = '#68A063'
      ctx.shadowBlur = 12

      // Hexagon
      const sides = 6
      const r = 34 + Math.sin(t * 0.9) * 2
      ctx.rotate(t * 0.3)
      ctx.beginPath()
      for (let i = 0; i < sides; i++) {
        const a = (Math.PI * 2 / sides) * i - Math.PI / 6
        i === 0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r)
                : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r)
      }
      ctx.closePath()
      ctx.strokeStyle = '#68A063'
      ctx.lineWidth = 2.5
      ctx.stroke()
      ctx.rotate(-t * 0.3)

      ctx.fillStyle = '#68A063'
      ctx.shadowBlur = 0
      ctx.font = `bold 13px monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('node', 0, 0)
      ctx.restore()
    },
  },
]

function TechCanvas() {
  const canvasRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [next, setNext] = useState(null)
  const transitionRef = useRef(0) // 0..1
  const timeRef = useRef(0)
  const rafRef = useRef(null)
  const isTransitioning = useRef(false)

  const handleClick = useCallback(() => {
    if (isTransitioning.current) return
    isTransitioning.current = true
    transitionRef.current = 0
    setNext((current + 1) % TECH_LOGOS.length)
  }, [current])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const SIZE = 160
    canvas.width = SIZE
    canvas.height = SIZE

    const render = () => {
      ctx.clearRect(0, 0, SIZE, SIZE)
      timeRef.current += 0.025

      const cx = SIZE / 2
      const cy = SIZE / 2

      if (isTransitioning.current && next !== null) {
        transitionRef.current = Math.min(transitionRef.current + 0.045, 1)
        const prog = transitionRef.current

        // outgoing — slide left + fade
        ctx.save()
        ctx.globalAlpha = 1 - prog
        ctx.translate(cx - prog * 60, cy)
        TECH_LOGOS[current].draw(ctx, timeRef.current)
        ctx.restore()

        // incoming — slide in from right + fade
        ctx.save()
        ctx.globalAlpha = prog
        ctx.translate(cx + (1 - prog) * 60, cy)
        TECH_LOGOS[next].draw(ctx, timeRef.current)
        ctx.restore()

        if (transitionRef.current >= 1) {
          setCurrent(next)
          setNext(null)
          isTransitioning.current = false
        }
      } else {
        ctx.save()
        ctx.translate(cx, cy)
        TECH_LOGOS[current].draw(ctx, timeRef.current)
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(rafRef.current)
  }, [current, next])

  const logo = TECH_LOGOS[current]

  return (
    <div className={styles.techCanvasWrap} onClick={handleClick} title="Clic para cambiar" data-hover>
      <canvas ref={canvasRef} className={styles.techCanvas} />
      <div className={styles.techDots}>
        {TECH_LOGOS.map((l, i) => (
          <span
            key={l.id}
            className={`${styles.techDot} ${i === current ? styles.techDotActive : ''}`}
            style={i === current ? { background: logo.color, boxShadow: `0 0 6px ${logo.color}` } : {}}
          />
        ))}
      </div>
      <div className={styles.techHint}>
        <span style={{ color: logo.color }}>{logo.label}</span>
      </div>
    </div>
  )
}

function TerminalLine({ children, delay = 0, prefix = '$' }) {
  return (
    <div className={styles.terminalLine} style={{ animationDelay: `${delay}s` }}>
      <span className={styles.termPrefix}>{prefix}</span>
      <span>{children}</span>
    </div>
  )
}

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_TEXTS, 55, 2200)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    let raf, time = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(55,55,55,0.6)'
      ctx.lineWidth = 0.5
      const sp = 60
      for (let x = 0; x <= canvas.width; x += sp) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke() }
      for (let y = 0; y <= canvas.height; y += sp) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke() }
      for (let i = 0; i < 6; i++) {
        const a = time * 0.25 + (i / 6) * Math.PI * 2
        const x = canvas.width/2 + Math.cos(a) * canvas.width*0.3
        const y = canvas.height/2 + Math.sin(a) * canvas.height*0.35
        ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI*2)
        ctx.fillStyle = `rgba(180,180,180,${0.1 + 0.15*Math.abs(Math.sin(time+i))})`
        ctx.fill()
      }
      time += 0.008
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className={styles.hero} id="inicio">
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.content}>
        {/* ── LEFT ── */}
        <div className={styles.left}>
          <div className={styles.terminalBlock}>
            <div className={styles.terminalHeader}>
              <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
              <span className={styles.termTitle}>devstudio_v2.0 — bash</span>
            </div>
            <div className={styles.terminalBody}>
              <TerminalLine delay={0.3}>npm create devstudio@latest</TerminalLine>
              <TerminalLine delay={0.9} prefix='>'>Inicializando proyecto...</TerminalLine>
              <TerminalLine delay={1.5} prefix='>'>Cargando creatividad... <span className={styles.ok}>[OK]</span></TerminalLine>
              <TerminalLine delay={2.1} prefix='>'>Listo para construir tu web.</TerminalLine>
              <div className={styles.terminalLine} style={{ animationDelay: '2.7s' }}>
                <span className={styles.termPrefix}>{'>'}</span>
                <span className={styles.promptText}>_</span>
              </div>
            </div>
          </div>

          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>disponible para nuevos proyectos</span>
          </div>

          <h1 className={styles.headline}>
            <span className={styles.headlinePre}>Creamos</span>
            <span className={styles.headlineTyped}>{typed}<span className={styles.caret}>|</span></span>
          </h1>

          <p className={styles.sub}>
            Agencia de desarrollo web que construye presencias digitales memorables.
            Código limpio, diseño brutal, resultados reales.
          </p>

          <div className={styles.actions}>
            <a href="https://wa.me/573001234567?text=Hola!%20Quiero%20cotizar%20mi%20página%20web"
              target="_blank" rel="noopener noreferrer" className="btn btn-primary"
              onClick={() => window.gtag?.('event','click_whatsapp',{event_category:'cta',event_label:'hero'})}>
              <span>⬡ cotizar proyecto</span>
            </a>
            <a href="#servicios" className="btn"><span>ver servicios →</span></a>
          </div>

          <div className={styles.techStack}>
            <span className={styles.techLabel}>// stack</span>
            {['React', 'TypeScript', 'Angular', 'Next.js', 'Node'].map(t => (
              <span key={t} className={styles.tech}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className={styles.right}>
          <TechCanvas />
          <div className={styles.statsCard}>
            <Stat value="3+" label="proyectos" />
            <Stat value="100%" label="satisfacción" />
            <Stat value="⚡" label="React / TS" />
          </div>
        </div>
      </div>

      {/* ── TICKER ── */}
      <div className={styles.tickerWrap}>
        <div className={styles.tickerFadeL} />
        <div className={styles.tickerFadeR} />
        <div className={styles.tickerTrack}>
          {[...Array(4)].map((_, copy) => (
            <div key={copy} className={styles.tickerGroup} aria-hidden={copy > 0}>
              {TICKER_ITEMS.map(item => (
                <span key={item} className={styles.tickerItem}>
                  <span className={styles.tickerSep}>◆</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}