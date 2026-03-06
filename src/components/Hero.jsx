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

// ── LOGOS 3D ───────────────────────────────────────────
const TECH_LOGOS = [
  {
    id: 'react', label: 'React', color: '#61DAFB',
    draw: (ctx, t) => {
      ctx.save()
      ctx.shadowColor = '#61DAFB'
      ctx.shadowBlur = 16
      ctx.strokeStyle = '#61DAFB'
      ctx.lineWidth = 2.5
      // Nucleus con brillo
      const ng = ctx.createRadialGradient(0,0,0, 0,0,9)
      ng.addColorStop(0, '#ffffff')
      ng.addColorStop(1, '#61DAFB')
      ctx.beginPath(); ctx.arc(0,0,7,0,Math.PI*2)
      ctx.fillStyle = ng; ctx.fill()
      // 3 órbitas elípticas rotando
      for (let i = 0; i < 3; i++) {
        ctx.save()
        ctx.rotate((Math.PI/3)*i + t*0.7)
        ctx.scale(1, 0.36)
        ctx.beginPath()
        ctx.ellipse(0,0,40,40,0,0,Math.PI*2)
        ctx.stroke()
        // Electrón
        const ea = t*1.5 + (i/3)*Math.PI*2
        ctx.beginPath(); ctx.arc(Math.cos(ea)*40, Math.sin(ea)*40, 3, 0, Math.PI*2)
        ctx.fillStyle = '#61DAFB'; ctx.fill()
        ctx.restore()
      }
      ctx.restore()
    }
  },
  {
    id: 'typescript', label: 'TypeScript', color: '#3178C6',
    draw: (ctx, t) => {
      ctx.save()
      const s = 36 + Math.sin(t*1.1)*2
      const r = 7
      // Caja con gradiente 3D
      const g = ctx.createLinearGradient(-s/2,-s/2, s/2,s/2)
      g.addColorStop(0,'#4a9fd4'); g.addColorStop(0.5,'#3178C6'); g.addColorStop(1,'#1a4a80')
      ctx.beginPath()
      ctx.moveTo(-s/2+r,-s/2); ctx.lineTo(s/2-r,-s/2)
      ctx.arcTo(s/2,-s/2,s/2,-s/2+r,r)
      ctx.lineTo(s/2,s/2-r); ctx.arcTo(s/2,s/2,s/2-r,s/2,r)
      ctx.lineTo(-s/2+r,s/2); ctx.arcTo(-s/2,s/2,-s/2,s/2-r,r)
      ctx.lineTo(-s/2,-s/2+r); ctx.arcTo(-s/2,-s/2,-s/2+r,-s/2,r)
      ctx.closePath()
      ctx.shadowColor='#3178C6'; ctx.shadowBlur=16
      ctx.fillStyle=g; ctx.fill()
      // Borde highlight superior
      ctx.strokeStyle='rgba(100,180,255,0.5)'; ctx.lineWidth=1; ctx.stroke()
      // "TS" en blanco
      ctx.shadowBlur=0; ctx.fillStyle='#ffffff'
      ctx.font=`bold 16px monospace`
      ctx.textAlign='center'; ctx.textBaseline='middle'
      ctx.fillText('TS',0,1)
      ctx.restore()
    }
  },
  {
    id: 'angular', label: 'Angular', color: '#DD0031',
    draw: (ctx, t) => {
      ctx.save()
      const pulse = 1 + Math.sin(t*1.2)*0.03
      ctx.scale(pulse, pulse)
      ctx.shadowColor='#DD0031'; ctx.shadowBlur=18

      // Escudo relleno gradiente
      const g = ctx.createLinearGradient(0,-42,0,42)
      g.addColorStop(0,'#FF1744'); g.addColorStop(1,'#880020')
      const pts = [[0,-40],[36,-20],[30,18],[0,40],[-30,18],[-36,-20]]
      ctx.beginPath()
      ctx.moveTo(pts[0][0],pts[0][1])
      pts.slice(1).forEach(p => ctx.lineTo(p[0],p[1]))
      ctx.closePath()
      ctx.fillStyle=g; ctx.fill()
      ctx.strokeStyle='rgba(255,100,120,0.6)'; ctx.lineWidth=1.5; ctx.stroke()

      // Letra A con detalle
      ctx.shadowBlur=0; ctx.fillStyle='rgba(255,255,255,0.9)'
      ctx.font='bold 26px Georgia,serif'
      ctx.textAlign='center'; ctx.textBaseline='middle'
      ctx.fillText('A',0,2)
      // Barra central de la A
      ctx.strokeStyle='rgba(255,255,255,0.35)'; ctx.lineWidth=1.5
      ctx.beginPath(); ctx.moveTo(-9,8); ctx.lineTo(9,8); ctx.stroke()
      ctx.restore()
    }
  },
  {
    id: 'nextjs', label: 'Next.js', color: '#000000',
    draw: (ctx, t) => {
      ctx.save()
      const r = 34 + Math.sin(t * 0.8) * 2
      ctx.shadowColor = 'rgba(255,255,255,0.5)'
      ctx.shadowBlur = 14

      // Círculo relleno negro con gradiente
      const bg = ctx.createRadialGradient(-6, -6, 2, 0, 0, r)
      bg.addColorStop(0, '#3a3a3a')
      bg.addColorStop(1, '#0a0a0a')
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fillStyle = bg; ctx.fill()

      // Borde blanco
      ctx.strokeStyle = 'rgba(232,232,232,0.7)'; ctx.lineWidth = 1.8; ctx.stroke()

      // Logo Next.js real: letra N con gradiente que desaparece a la derecha
      ctx.shadowBlur = 0
      const grad = ctx.createLinearGradient(-13, 0, 13, 0)
      grad.addColorStop(0, '#ffffff')
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.strokeStyle = grad
      ctx.lineWidth = 3.5
      ctx.lineCap = 'butt'
      ctx.lineJoin = 'miter'
      ctx.beginPath()
      ctx.moveTo(-11, 13)
      ctx.lineTo(-11, -13)
      ctx.lineTo(11, 13)
      ctx.lineTo(11, -13)
      ctx.stroke()

      // Destello que orbita
      const da = t * 0.8
      ctx.beginPath()
      ctx.arc(Math.cos(da) * r, Math.sin(da) * r, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill()

      ctx.restore()
    }
  },
  {
    id: 'node', label: 'Node.js', color: '#68A063',
    draw: (ctx, t) => {
      ctx.save()
      ctx.shadowColor='#68A063'; ctx.shadowBlur=16
      const r = 36 + Math.sin(t*0.9)*2

      // Hexágono relleno con gradiente
      ctx.rotate(Math.PI/6)
      const g = ctx.createLinearGradient(-r,0,r,0)
      g.addColorStop(0,'#3d6b39'); g.addColorStop(0.5,'#68A063'); g.addColorStop(1,'#3d6b39')
      ctx.beginPath()
      for (let i=0; i<6; i++) {
        const a = (Math.PI*2/6)*i
        i===0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r)
               : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r)
      }
      ctx.closePath()
      ctx.fillStyle=g; ctx.fill()
      ctx.strokeStyle='rgba(150,220,140,0.5)'; ctx.lineWidth=1.5; ctx.stroke()
      ctx.rotate(-Math.PI/6)

      // Texto "node"
      ctx.shadowBlur=0; ctx.fillStyle='rgba(255,255,255,0.9)'
      ctx.font='bold 12px monospace'
      ctx.textAlign='center'; ctx.textBaseline='middle'
      ctx.fillText('node',0,-5)
      // ".js" más pequeño
      ctx.fillStyle='rgba(180,255,160,0.8)'
      ctx.font='10px monospace'
      ctx.fillText('.js',0,8)
      ctx.restore()
    }
  },
]

// ── TECH CANVAS con hover ──────────────────────────────
function TechCanvas() {
  const canvasRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [next, setNext] = useState(null)
  const transitionRef = useRef(0)
  const timeRef = useRef(0)
  const rafRef = useRef(null)
  const isTransitioning = useRef(false)

  // Avanza al siguiente logo
  const goNext = useCallback(() => {
    if (isTransitioning.current) return
    isTransitioning.current = true
    transitionRef.current = 0
    setNext(prev => ((prev ?? current) + 1) % TECH_LOGOS.length)
  }, [current])

  // Auto-rotate cada 2.5s
  useEffect(() => {
    const id = setInterval(goNext, 2500)
    return () => clearInterval(id)
  }, [goNext])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const SIZE = 160; canvas.width = SIZE; canvas.height = SIZE

    const render = () => {
      ctx.clearRect(0,0,SIZE,SIZE)
      timeRef.current += 0.025
      const cx = SIZE/2, cy = SIZE/2

      if (isTransitioning.current && next !== null) {
        transitionRef.current = Math.min(transitionRef.current + 0.05, 1)
        const p = transitionRef.current
        // ease
        const ep = p < 0.5 ? 2*p*p : -1+(4-2*p)*p

        ctx.save(); ctx.globalAlpha = 1-ep
        ctx.translate(cx - ep*55, cy)
        TECH_LOGOS[current].draw(ctx, timeRef.current)
        ctx.restore()

        ctx.save(); ctx.globalAlpha = ep
        ctx.translate(cx + (1-ep)*55, cy)
        TECH_LOGOS[next].draw(ctx, timeRef.current)
        ctx.restore()

        if (transitionRef.current >= 1) {
          setCurrent(next); setNext(null); isTransitioning.current = false
        }
      } else {
        ctx.save(); ctx.translate(cx, cy)
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
    <div className={styles.techCanvasWrap} data-hover>
      <canvas ref={canvasRef} className={styles.techCanvas} />
      <div className={styles.techDots}>
        {TECH_LOGOS.map((l, i) => (
          <span
            key={l.id}
            className={`${styles.techDot} ${i===current ? styles.techDotActive : ''}`}
            style={i===current ? {background:logo.color, boxShadow:`0 0 6px ${logo.color}`} : {}}
            onClick={() => { if (!isTransitioning.current) { isTransitioning.current=true; transitionRef.current=0; setNext(i) }}}
          />
        ))}
      </div>
      <div className={styles.techHint}>
        <span style={{color:logo.color}}>{logo.label}</span>

      </div>
    </div>
  )
}

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_TEXTS, 80, 3900)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    let raf, time=0
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.strokeStyle='rgba(55,55,55,0.6)'; ctx.lineWidth=0.5
      const sp=60
      for(let x=0;x<=canvas.width;x+=sp){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke()}
      for(let y=0;y<=canvas.height;y+=sp){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke()}
      for(let i=0;i<6;i++){
        const a=time*0.25+(i/6)*Math.PI*2
        const x=canvas.width/2+Math.cos(a)*canvas.width*0.3
        const y=canvas.height/2+Math.sin(a)*canvas.height*0.35
        ctx.beginPath();ctx.arc(x,y,1.5,0,Math.PI*2)
        ctx.fillStyle=`rgba(180,180,180,${0.1+0.15*Math.abs(Math.sin(time+i))})`
        ctx.fill()
      }
      time+=0.008; raf=requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize',resize) }
  }, [])

  return (
    <section className={styles.hero} id="inicio">
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}/>
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
            {['React','TypeScript','Angular','Next.js','Node'].map(t => (
              <span key={t} className={styles.tech}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <TechCanvas />
          <div className={styles.statsCard}>
            <Stat value="3+" label="proyectos" />
            <Stat value="100%" label="satisfacción" />
            <Stat value="⚡" label="React / TS" />
          </div>
        </div>
      </div>

      <div className={styles.tickerWrap}>
        <div className={styles.tickerFadeL}/>
        <div className={styles.tickerFadeR}/>
        <div className={styles.tickerTrack}>
          {[...Array(4)].map((_,copy) => (
            <div key={copy} className={styles.tickerGroup} aria-hidden={copy>0}>
              {TICKER_ITEMS.map(item => (
                <span key={item} className={styles.tickerItem}>
                  <span className={styles.tickerSep}>◆</span>{item}
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