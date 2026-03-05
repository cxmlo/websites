import { useInView, useForm } from '../hooks'
import styles from './Contact.module.css'

const validateForm = (values) => {
  const errors = {}
  if (!values.name.trim()) errors.name = 'nombre requerido'
  if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'email inválido'
  if (!values.service) errors.service = 'selecciona un servicio'
  if (values.message.length < 10) errors.message = 'mensaje muy corto'
  return errors
}

const INITIAL = { name: '', email: '', phone: '', service: '', budget: '', message: '' }

const SERVICES = [
  'Landing Page', 'Tienda Online', 'Sitio Corporativo',
  'Portafolio', 'Web App', 'Mantenimiento / SEO', 'Otro'
]

const BUDGETS = [
  'Menos de $1.5M COP', '$1.5M - $3M COP', '$3M - $6M COP',
  '$6M - $12M COP', 'Más de $12M COP', 'Lo definimos juntos'
]

export default function Contact() {
  const [ref, inView] = useInView()
  const { values, errors, submitting, submitted, handleChange, handleSubmit, setSubmitted } = useForm(INITIAL, validateForm)

  const onSubmit = async (data) => {
    // Gmail via mailto (abre cliente de correo)
    // Para producción, usa EmailJS, Formspree, o un backend propio
    const subject = encodeURIComponent(`[DEVSTUDIO] Nuevo proyecto: ${data.service}`)
    const body = encodeURIComponent(
      `Nombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone || 'N/A'}\nServicio: ${data.service}\nPresupuesto: ${data.budget || 'N/A'}\n\nMensaje:\n${data.message}`
    )
    window.location.href = `mailto:hola@devstudio.com?subject=${subject}&body=${body}`

    // Google Ads conversion tracking
    window.gtag?.('event', 'conversion', { send_to: 'AW-XXXXXXXXXX/XXXXXX' })
    window.gtag?.('event', 'form_submit', { event_category: 'contact', event_label: data.service })
  }

  if (submitted) {
    return (
      <section className={styles.section} id="contacto">
        <div className="container">
          <div className={styles.successBox}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.successTitle}>Mensaje enviado</h3>
            <p className={styles.successText}>Se abrió tu cliente de correo. Revisa que el mensaje fue enviado a hola@devstudio.com</p>
            <button className="btn" onClick={() => setSubmitted(false)}>
              <span>enviar otro mensaje</span>
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section} id="contacto">
      <div className="container">
        <div className={`${styles.header} ${inView ? 'fade-in-up' : ''}`} ref={ref}>
          <span className="section-label">contacto</span>
          <h2 className={styles.title}>
            <span className={styles.prefix}>{'>'} </span>hablemos de tu proyecto
          </h2>
        </div>

        <div className={styles.layout}>
          {/* Info column */}
          <div className={styles.infoCol}>
            <div className="terminal-box" data-label="// canales" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <p className={styles.infoText}>
                Respondemos en menos de 2 horas en horario hábil.
                Elige el canal que prefieras.
              </p>
            </div>

            <a
              href="https://wa.me/573001234567?text=Hola!%20Quiero%20cotizar%20mi%20proyecto%20web"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channel}
              onClick={() => window.gtag?.('event', 'click_whatsapp', { event_category: 'contact' })}
              data-hover
            >
              <div className={styles.channelIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.558 4.134 1.527 5.87L0 24l6.302-1.498A11.951 11.951 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.214-3.73.887.93-3.618-.236-.372A9.772 9.772 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.419 0 9.818 4.398 9.818 9.818 0 5.419-4.399 9.818-9.818 9.818z"/>
                </svg>
              </div>
              <div className={styles.channelInfo}>
                <span className={styles.channelName}>WhatsApp</span>
                <span className={styles.channelDetail}>+57 300 123 4567</span>
                <span className={styles.channelSub}>Respuesta inmediata</span>
              </div>
              <span className={styles.channelArrow}>→</span>
            </a>

            <a
              href="mailto:hola@devstudio.com"
              className={styles.channel}
              data-hover
            >
              <div className={styles.channelIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className={styles.channelInfo}>
                <span className={styles.channelName}>Email</span>
                <span className={styles.channelDetail}>hola@devstudio.com</span>
                <span className={styles.channelSub}>Respuesta en 2h</span>
              </div>
              <span className={styles.channelArrow}>→</span>
            </a>

            <div className={styles.workingHours}>
              <span className={styles.workLabel}>// horario</span>
              <span className={styles.workTime}>Lun — Vie: 8am — 6pm</span>
              <span className={styles.workTime}>Sáb: 9am — 1pm</span>
            </div>
          </div>

          {/* Form column */}
          <div className={styles.formCol}>
            <div className="terminal-box" data-label="// formulario de contacto" style={{ padding: '2rem' }}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>nombre *</label>
                  <input
                    className={`input ${errors.name ? styles.inputError : ''}`}
                    type="text"
                    name="name"
                    placeholder="Tu nombre completo"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>email *</label>
                  <input
                    className={`input ${errors.email ? styles.inputError : ''}`}
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>teléfono</label>
                  <input
                    className="input"
                    type="tel"
                    name="phone"
                    placeholder="+57 300 000 0000"
                    value={values.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>servicio *</label>
                  <select
                    className={`input ${errors.service ? styles.inputError : ''}`}
                    name="service"
                    value={values.service}
                    onChange={handleChange}
                  >
                    <option value="">— seleccionar —</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <span className={styles.error}>{errors.service}</span>}
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label className={styles.label}>presupuesto estimado</label>
                  <select className="input" name="budget" value={values.budget} onChange={handleChange}>
                    <option value="">— seleccionar —</option>
                    {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label className={styles.label}>cuéntanos tu proyecto *</label>
                  <textarea
                    className={`input ${errors.message ? styles.inputError : ''}`}
                    name="message"
                    placeholder="¿Qué tipo de web necesitas? ¿Tienes referentes? ¿Cuándo necesitas el proyecto listo?"
                    value={values.message}
                    onChange={handleChange}
                    rows={5}
                  />
                  {errors.message && <span className={styles.error}>{errors.message}</span>}
                </div>
              </div>

              {errors.form && <p className={styles.formError}>{errors.form}</p>}

              <div className={styles.formFooter}>
                <p className={styles.privacy}>
                  Al enviar aceptas nuestra política de privacidad.
                  No spam, nunca.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSubmit(onSubmit)}
                  disabled={submitting}
                >
                  <span>{submitting ? 'enviando...' : 'enviar mensaje →'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}