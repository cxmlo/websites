import { useEffect, useRef } from 'react'
import styles from './LegalModal.module.css'

export default function LegalModal({ page, onClose }) {
  const contentRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // Scroll to top when page changes
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [page])

  const content = LEGAL_CONTENT[page]
  if (!content) return null

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.dots}>
              <span className={styles.dot} onClick={onClose} title="Cerrar" />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <span className={styles.path}>devstudio://legal/{page}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <span>[ ESC ]</span>
          </button>
        </div>

        {/* Tab bar */}
        <div className={styles.tabs}>
          {TABS.map(t => (
            <button
              key={t.id}
              className={`${styles.tab} ${page === t.id ? styles.tabActive : ''}`}
              onClick={() => onClose(t.id)}
              data-hover
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className={styles.body} ref={contentRef}>
          <div className={styles.docHeader}>
            <span className={styles.docLabel}>documento legal</span>
            <h2 className={styles.docTitle}>{content.title}</h2>
            <div className={styles.docMeta}>
              <span>Última actualización: {content.updated}</span>
              <span className={styles.metaDivider}>·</span>
              <span>Versión {content.version}</span>
            </div>
          </div>

          <div className={styles.docContent}>
            {content.sections.map((section, i) => (
              <section key={i} className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.sectionNum}>{String(i + 1).padStart(2, '0')}.</span>
                  {section.title}
                </h3>
                {section.paragraphs.map((p, j) => (
                  typeof p === 'string'
                    ? <p key={j} className={styles.para}>{p}</p>
                    : <ul key={j} className={styles.list}>
                        {p.map((item, k) => (
                          <li key={k} className={styles.listItem}>
                            <span className={styles.bullet}>▸</span>{item}
                          </li>
                        ))}
                      </ul>
                ))}
              </section>
            ))}
          </div>

          <div className={styles.docFooter}>
            <span className={styles.footerLine}>
              © {new Date().getFullYear()} DEVSTUDIO — Bogotá, Colombia
            </span>
            <span className={styles.footerLine}>
              Para consultas: <a href="mailto:legal@devstudio.com" className={styles.footerLink}>legal@devstudio.com</a>
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className={styles.footer}>
          <span className={styles.footerHint}>// presiona ESC o haz clic fuera para cerrar</span>
          <button className="btn" onClick={onClose}>
            <span>cerrar documento</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const TABS = [
  { id: 'privacidad', label: 'Privacidad' },
  { id: 'terminos', label: 'Términos' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'contacto-legal', label: 'Contacto Legal' },
]

const LEGAL_CONTENT = {
  privacidad: {
    title: 'Política de Privacidad',
    updated: '01 de enero de 2025',
    version: '2.0',
    sections: [
      {
        title: 'Responsable del tratamiento',
        paragraphs: [
          'DEVSTUDIO (en adelante, "la Agencia", "nosotros" o "nuestro") es el responsable del tratamiento de los datos personales que se recopilan a través de este sitio web.',
          'Puedes contactarnos en: legal@devstudio.com | +57 300 123 4567 | Bogotá, Colombia.',
        ]
      },
      {
        title: 'Datos que recopilamos',
        paragraphs: [
          'Recopilamos únicamente los datos que tú nos proporcionas de manera voluntaria:',
          ['Nombre completo', 'Dirección de correo electrónico', 'Número de teléfono (opcional)', 'Información sobre tu proyecto o empresa', 'Presupuesto estimado (opcional)'],
          'Adicionalmente, de forma automática recopilamos datos de navegación mediante Google Analytics 4: dirección IP anonimizada, tipo de navegador, páginas visitadas, tiempo de sesión y país de origen.',
        ]
      },
      {
        title: 'Finalidad del tratamiento',
        paragraphs: [
          'Utilizamos tus datos exclusivamente para:',
          ['Responder a tus consultas y solicitudes de cotización', 'Enviarte información sobre nuestros servicios cuando lo hayas solicitado', 'Mejorar la experiencia de navegación en nuestro sitio', 'Cumplir con obligaciones legales y contractuales', 'Medir el rendimiento de campañas publicitarias (Google Ads)'],
        ]
      },
      {
        title: 'Base legal del tratamiento',
        paragraphs: [
          'El tratamiento de tus datos se basa en: (a) tu consentimiento explícito al enviar el formulario de contacto; (b) la ejecución de un contrato o medidas precontractuales a tu solicitud; y (c) nuestro interés legítimo en mejorar nuestros servicios.',
        ]
      },
      {
        title: 'Conservación de los datos',
        paragraphs: [
          'Conservamos tus datos durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados. Los datos de contacto se conservan durante 2 años desde el último contacto. Los datos de clientes activos se conservan durante la vigencia del contrato más 5 años por obligaciones legales.',
        ]
      },
      {
        title: 'Compartición de datos con terceros',
        paragraphs: [
          'No vendemos, alquilamos ni compartimos tus datos personales con terceros para fines comerciales. Únicamente los compartimos con:',
          ['Google LLC (Analytics y Ads) para análisis de tráfico y medición de campañas', 'Proveedores de hosting para el almacenamiento seguro del sitio', 'Autoridades competentes cuando así lo exija la ley colombiana'],
        ]
      },
      {
        title: 'Tus derechos',
        paragraphs: [
          'De acuerdo con la Ley 1581 de 2012 (Colombia) y el Reglamento General de Protección de Datos (RGPD), tienes derecho a:',
          ['Acceder a tus datos personales', 'Rectificar datos inexactos o incompletos', 'Solicitar la supresión de tus datos', 'Oponerte al tratamiento de tus datos', 'Portabilidad de tus datos en formato legible'],
          'Para ejercer estos derechos, escríbenos a legal@devstudio.com con el asunto "Derechos ARCO".',
        ]
      },
      {
        title: 'Seguridad',
        paragraphs: [
          'Implementamos medidas técnicas y organizativas para proteger tus datos: conexión HTTPS/TLS, acceso restringido a bases de datos, backups cifrados y revisiones periódicas de seguridad. Sin embargo, ningún sistema de transmisión por internet es 100% seguro.',
        ]
      },
    ]
  },

  terminos: {
    title: 'Términos y Condiciones',
    updated: '01 de enero de 2025',
    version: '2.1',
    sections: [
      {
        title: 'Aceptación de los términos',
        paragraphs: [
          'Al acceder y usar este sitio web, aceptas estar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguna parte, no debes usar nuestros servicios.',
          'DEVSTUDIO se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entran en vigor al ser publicados en este sitio.',
        ]
      },
      {
        title: 'Descripción de los servicios',
        paragraphs: [
          'DEVSTUDIO ofrece servicios de diseño y desarrollo web que incluyen, sin limitarse a:',
          ['Diseño y desarrollo de landing pages', 'Desarrollo de tiendas online (e-commerce)', 'Sitios web corporativos y portafolios', 'Aplicaciones web a medida', 'Mantenimiento, hosting y SEO', 'Consultoría digital'],
        ]
      },
      {
        title: 'Proceso de contratación',
        paragraphs: [
          'Todo proyecto inicia con una propuesta escrita que detalla el alcance, entregables, tiempos y costos. El proyecto se considera contratado únicamente cuando ambas partes firman el acuerdo de servicios y se recibe el anticipo pactado.',
          'Los cambios en el alcance después de la aprobación del diseño pueden generar costos adicionales y extensión de plazos, lo cual será informado y acordado previamente.',
        ]
      },
      {
        title: 'Pagos y facturación',
        paragraphs: [
          'Los pagos se estructuran generalmente así: 50% de anticipo al inicio, 25% al aprobar el diseño, y 25% restante al entregar el proyecto. Para proyectos menores a $1.5M COP, puede solicitarse el 100% de anticipo.',
          'Los precios publicados en este sitio son referenciales. El costo final se define en la propuesta según los requerimientos específicos de cada proyecto. Los precios incluyen IVA cuando aplique.',
        ]
      },
      {
        title: 'Propiedad intelectual',
        paragraphs: [
          'Una vez realizado el pago total del proyecto, el cliente recibe la propiedad de los diseños personalizados creados para su proyecto. DEVSTUDIO conserva el derecho de incluir el proyecto en su portafolio y materiales de marketing.',
          'El código fuente desarrollado específicamente para el cliente es propiedad del cliente. Las licencias de software de terceros utilizadas (plugins, temas, librerías) están sujetas a sus propios términos de licencia.',
        ]
      },
      {
        title: 'Garantías y soporte',
        paragraphs: [
          'Todos nuestros proyectos incluyen un período de garantía según el plan contratado, durante el cual corregimos sin costo adicional errores o bugs causados por nuestro desarrollo.',
          'La garantía no cubre: modificaciones realizadas por el cliente, conflictos con actualizaciones de plugins de terceros, ni cambios en el alcance original del proyecto.',
        ]
      },
      {
        title: 'Limitación de responsabilidad',
        paragraphs: [
          'DEVSTUDIO no se hace responsable por pérdidas de negocio, ingresos o datos derivadas del uso o la imposibilidad de usar el sitio web entregado. Nuestra responsabilidad máxima se limita al valor total pagado por el proyecto.',
          'No garantizamos posicionamiento específico en motores de búsqueda, ya que los algoritmos de Google cambian constantemente y están fuera de nuestro control.',
        ]
      },
      {
        title: 'Ley aplicable',
        paragraphs: [
          'Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa se resolverá preferiblemente mediante negociación directa. De no ser posible, las partes se someten a los tribunales competentes de Bogotá, Colombia.',
        ]
      },
    ]
  },

  cookies: {
    title: 'Política de Cookies',
    updated: '01 de enero de 2025',
    version: '1.3',
    sections: [
      {
        title: '¿Qué son las cookies?',
        paragraphs: [
          'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias, analizar cómo usas el sitio y ofrecerte una experiencia personalizada.',
        ]
      },
      {
        title: 'Tipos de cookies que utilizamos',
        paragraphs: [
          'Cookies estrictamente necesarias — Esenciales para el funcionamiento del sitio. No pueden desactivarse. Incluyen cookies de sesión y de seguridad. No almacenan información personal identificable.',
          'Cookies analíticas (Google Analytics 4) — Recopilan información sobre cómo los visitantes usan el sitio: páginas más visitadas, tiempo en el sitio, origen del tráfico. Toda la información es anónima y agregada.',
          'Cookies de marketing (Google Ads) — Utilizadas para medir la efectividad de nuestras campañas publicitarias. Nos permiten saber si un usuario llegó al sitio a través de un anuncio y si completó una acción de conversión.',
          'Cookies de preferencias — Recuerdan tus preferencias como el idioma o si ya aceptaste esta política de cookies.',
        ]
      },
      {
        title: 'Cookies de terceros',
        paragraphs: [
          'Utilizamos servicios de terceros que pueden instalar sus propias cookies:',
          ['Google Analytics (_ga, _gid, _gat) — Análisis de tráfico. Duración: hasta 2 años', 'Google Ads (IDE, _gcl_au) — Seguimiento de conversiones. Duración: hasta 13 meses', 'Google Fonts — Carga de tipografías. Sin almacenamiento de datos personales'],
          'Puedes consultar las políticas de privacidad de Google en policies.google.com.',
        ]
      },
      {
        title: 'Cómo gestionar las cookies',
        paragraphs: [
          'Puedes controlar y/o eliminar las cookies según desees. Puedes eliminar todas las cookies ya almacenadas en tu dispositivo y configurar la mayoría de los navegadores para que no las acepten.',
          'Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites el sitio y que algunos servicios y funcionalidades no funcionen.',
          'Instrucciones para los principales navegadores:',
          ['Chrome: Configuración → Privacidad y seguridad → Cookies', 'Firefox: Opciones → Privacidad y seguridad → Cookies', 'Safari: Preferencias → Privacidad → Gestionar datos de sitios web', 'Edge: Configuración → Privacidad → Cookies'],
        ]
      },
      {
        title: 'Herramienta de consentimiento',
        paragraphs: [
          'Al ingresar por primera vez a nuestro sitio, verás un banner de cookies donde puedes aceptar todas las cookies, rechazar las no esenciales o personalizar tu elección. Tu preferencia se guarda durante 12 meses.',
          'Puedes cambiar tu consentimiento en cualquier momento haciendo clic en el ícono de cookies en la esquina inferior izquierda del sitio.',
        ]
      },
      {
        title: 'Actualizaciones de esta política',
        paragraphs: [
          'Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en las cookies que usamos o por otras razones operativas, legales o reglamentarias. Revisa esta página regularmente para estar informado.',
        ]
      },
    ]
  },

  'contacto-legal': {
    title: 'Contacto Legal',
    updated: '01 de enero de 2025',
    version: '1.0',
    sections: [
      {
        title: 'Datos de la empresa',
        paragraphs: [
          'Razón social: DEVSTUDIO S.A.S.',
          'NIT: 900.XXX.XXX-X',
          'Domicilio principal: Bogotá D.C., Colombia',
          'Actividad económica: Desarrollo de software y consultoría informática (CIIU 6201)',
        ]
      },
      {
        title: 'Canales de contacto legal',
        paragraphs: [
          'Para consultas relacionadas con protección de datos, derechos ARCO, reclamaciones legales o cualquier asunto jurídico, utiliza exclusivamente los siguientes canales:',
          ['Email legal: legal@devstudio.com', 'Asunto recomendado: "Derechos ARCO", "Reclamación", "Consulta Legal"', 'Tiempo de respuesta: máximo 10 días hábiles', 'Dirección postal: Cra. XX # XX-XX, Bogotá, Colombia'],
        ]
      },
      {
        title: 'Ejercicio de derechos ARCO',
        paragraphs: [
          'Para ejercer tus derechos de Acceso, Rectificación, Cancelación u Oposición al tratamiento de tus datos personales, envía un correo a legal@devstudio.com con:',
          ['Asunto: "Solicitud Derechos ARCO — [tipo de derecho]"', 'Nombre completo y documento de identidad', 'Descripción clara de la solicitud', 'Datos de contacto para responder'],
          'Daremos respuesta dentro de los 10 días hábiles siguientes a la recepción de la solicitud, conforme a la Ley 1581 de 2012.',
        ]
      },
      {
        title: 'Reclamaciones y disputas',
        paragraphs: [
          'Si consideras que el tratamiento de tus datos no cumple con la normativa vigente, puedes presentar una reclamación ante la Superintendencia de Industria y Comercio (SIC) de Colombia, que es la autoridad de control en materia de protección de datos personales.',
          'Sitio web de la SIC: www.sic.gov.co | Línea gratuita: 01 8000 910165',
        ]
      },
      {
        title: 'Horario de atención legal',
        paragraphs: [
          'Lunes a viernes: 9:00 am — 5:00 pm (hora Colombia, UTC-5)',
          'Las solicitudes recibidas fuera de este horario serán procesadas el siguiente día hábil. Los plazos legales de respuesta comienzan a contar desde el primer día hábil tras la recepción.',
        ]
      },
    ]
  },
}