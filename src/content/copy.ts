// Textos de la página. Todo sale del VSL de Michelle Rodríguez (DISKRET), con sus palabras.
// Lo que sigue entre [corchetes] es un marcador pendiente: no inventar cifras, testimonios ni bonos.
import { BRAND_NAME, PERSON_NAME } from '@/config/funnel'

export interface Testimonial {
  name: string
  role: string
  quote: string
  /** Resultado concreto que dijo el testimonio (opcional): "+30% en ventas" */
  result?: string
  photo?: string
}

export interface TeamMember {
  name: string
  role: string
  bio?: string
  photo?: string
}

export const SEO = {
  landing: {
    title: `${BRAND_NAME} | Diseñamos tu casa completa, de principio a fin`,
    description:
      'Diseñamos, remodelamos, decoramos y fabricamos los muebles de tu casa con un solo equipo y una sola visión. Mira cómo trabaja el Método Diskret.',
  },
  video: {
    title: `Mira el video | ${BRAND_NAME}`,
    description: `${PERSON_NAME} te explica el Método Diskret y te muestra dos proyectos reales en Samborondón y Machala.`,
  },
  booking: { title: `Agenda tu asesoría | ${BRAND_NAME}`, description: 'Elige el día y la hora de tu asesoría de diseño.' },
  booked: { title: `Asesoría confirmada | ${BRAND_NAME}`, description: 'Tu asesoría de diseño está confirmada.' },
  noSpace: { title: `Todavía no es el momento | ${BRAND_NAME}`, description: 'Gracias por tu interés.' },
  pago: { title: `Confirma tu lugar | ${BRAND_NAME}`, description: 'Completa tu inscripción.' },
  confirmada: { title: `Inscripción confirmada | ${BRAND_NAME}`, description: 'Tu lugar está confirmado.' },
  privacy: { title: `Política de privacidad | ${BRAND_NAME}`, description: `Política de privacidad de ${BRAND_NAME}.` },
  legal: { title: `Aviso legal | ${BRAND_NAME}`, description: `Aviso legal de ${BRAND_NAME}.` },
}

// ── Landing (/) ───────────────────────────────────────────────────────────────
export const LANDING = {
  topbarTag: 'Arquitectura e interiorismo',
  // Temporizador del encabezado: ciclos de 12 h (00:00 y 12:00 hora de Ecuador) que se reinician solos.
  timer: { label: 'Agenda de asesorías', short: 'Agenda', prefix: 'Cierra en' },
  audience: ['Casa recién entregada', 'Casa que ya no te representa', 'Remodelación sin desgaste'],
  headline: 'Diseñamos tu casa completa, de principio a fin.',
  headlineAccent: 'Sin pasar meses hablando con maestros y proveedores.',
  sub: `Diseño, remodelación, decoración y muebles hechos en nuestro propio taller, con un solo equipo y una sola visión. ${PERSON_NAME} te lo cuenta en un video, con dos proyectos reales.`,
  videoCaption: 'Arquitecta · El Método Diskret',
  cta: 'Ver el video completo',
  ctaNote: 'Sin costo · Solo te pedimos tus datos para mostrártelo',

  // Banda bajo el hero: los 6 pasos del método con las palabras del VSL
  // (escucharte, la propuesta, los materiales, nuestro taller, la ejecución, la decoración)
  methodWords: ['Escuchar', 'Proponer', 'Escoger', 'Fabricar', 'Ejecutar', 'Decorar'],

  // Cifras: solo lo que dice el VSL
  facts: [
    { value: '+10', label: 'años amoblando, diseñando y remodelando espacios' },
    { value: '6', label: 'pasos del Método Diskret' },
    { value: '2', label: 'proyectos reales en el video: Samborondón y Machala' },
    { value: 'Propio', label: 'taller donde fabricamos tus muebles, con su control de calidad' },
  ],

  steps: {
    eyebrow: 'El Método Diskret',
    title: 'Un solo equipo diseña, remodela, decora y fabrica tus muebles',
    items: [
      {
        title: 'Escucharte',
        text: 'Necesitamos entender cómo vives, lo que necesitas y cómo sueñas tu casa.',
      },
      {
        title: 'La propuesta',
        text: 'Renders fotorrealistas con planos, medidas, detalles de materiales y detalles constructivos: todo lo que necesitas para ejecutar tu proyecto.',
      },
      {
        title: 'Los materiales',
        text: 'Escogemos contigo las piedras, la madera, las telas, los colores y todos los acabados, en físico.',
      },
      {
        title: 'Nuestro propio taller',
        text: 'Fabricamos los muebles a la medida de cada espacio.',
      },
      {
        title: 'La ejecución',
        text: 'Coordinamos y supervisamos la obra, tomando en cuenta tu opinión en las decisiones importantes.',
      },
      {
        title: 'La decoración',
        text: 'Seleccionamos contigo las telas para cortinas, las lámparas y todos los detalles finales.',
      },
    ],
    statement: 'Cada espacio tiene personalidad, pero todos hablan el mismo idioma.',
    cta: 'Ver el video completo',
  },

  about: {
    eyebrow: 'Quién te acompaña',
    title: `Soy ${PERSON_NAME}, arquitecta`,
    text: 'Trabajo hace más de diez años con mi equipo DISKRET, amoblando, diseñando y remodelando espacios. Muchas remodelaciones terminan mal, no por falta de gusto, sino por falta de conocimiento.',
    photo: '/michelle-rodriguez.webp',
    sign: 'Michelle Rodríguez',
  },

  // Testimonios REALES del cliente. Vacío = la sección no se muestra.
  testimonials: {
    eyebrow: 'Resultados',
    title: 'Lo que dicen nuestros clientes',
    items: [] as Testimonial[],
  },

  team: {
    eyebrow: 'Quién te acompaña',
    title: 'El equipo',
    items: [] as TeamMember[],
  },

  sticky: { title: 'El Método Diskret', sub: `Video de ${PERSON_NAME}`, cta: 'Ver video' },
  disclaimer:
    'Cada proyecto es distinto. Este sitio no está respaldado por Meta Platforms, Inc. ni forma parte de Facebook.',
}

// ── Modal de registro ─────────────────────────────────────────────────────────
export const REGISTRO = {
  eyebrow: 'El Método Diskret',
  title: 'Mira el video completo',
  sub: 'Michelle te explica cómo trabajamos y te muestra dos proyectos reales. Al final puedes agendar tu asesoría.',
  submit: 'Ver el video completo',
  submitPago: 'Continuar',
  legal: 'Tus datos están seguros · No spam',
}

// ── /ver-video ────────────────────────────────────────────────────────────────
export const VIDEO = {
  step: 'Paso 1 de 2',
  eyebrow: `${PERSON_NAME} · ${BRAND_NAME}`,
  title: 'Así diseñamos tu casa completa: el Método Diskret',
  sub: 'Mira el video completo. Al final puedes agendar una asesoría de diseño con Michelle.',
  lockText: 'El botón se habilita en',
  cta: 'Agendar mi asesoría',
  trust: 'Asesoría de diseño con Michelle Rodríguez · Arquitecta',
}

// ── Cualificación (las preguntas están en utils/qualification.ts) ─────────────
export const CUALIFICACION = {
  eyebrow: 'Último paso',
  title: 'Cuéntanos de tu espacio',
  sub: 'Una pregunta a la vez. Te toma un minuto.',
  consent: `Acepto que ${BRAND_NAME} me contacte por WhatsApp y correo, y acepto su`,
  submit: 'Ver horarios disponibles',
}

// ── /agendar ──────────────────────────────────────────────────────────────────
export const BOOKING = {
  step: 'Paso 2 de 2',
  title: 'Elige tu horario',
  sub: 'Una asesoría con Michelle para hablar de tu espacio y de cómo quieres vivirlo.',
  pending:
    'Estamos terminando de configurar el calendario. Te escribiremos por WhatsApp para coordinar tu asesoría.',
}

// ── /cita-confirmada ──────────────────────────────────────────────────────────
export const BOOKED = {
  title: 'Tu asesoría está confirmada',
  sub: 'Te enviamos los detalles a tu correo.',
  steps: [
    { icon: 'fa-solid fa-envelope', title: 'Revisa tu correo', text: 'Ahí tienes la fecha, la hora y el enlace.' },
    { icon: 'fa-brands fa-whatsapp', title: 'Te escribimos por WhatsApp', text: 'Para confirmar y resolver dudas antes.' },
    {
      icon: 'fa-solid fa-house',
      title: 'Piensa en tu espacio',
      text: 'Quién usa cada espacio, qué te molesta de cómo está hoy y qué sueñas que tenga.',
    },
  ],
}

// ── /sin-espacio ──────────────────────────────────────────────────────────────
export const NO_SPACE = {
  title: 'Todavía no es el momento, y está bien',
  text: 'Lo que hacemos tiene sentido cuando quieres que tu casa se piense completa, con una sola visión. Cuando estés listo para eso, aquí estamos.',
  cooldown: 'Ya enviaste una solicitud. Podrás intentarlo de nuevo en',
  resourcesTitle: `Sigue inspirándote con ${BRAND_NAME}`,
  resourcesText: 'En Instagram compartimos proyectos, antes y después, mobiliario, iluminación y tips de diseño.',
  whatsapp: 'Escríbenos por WhatsApp',
  whatsappMsg: 'Hola, vi el video de Michelle y quiero contarles de mi espacio.',
}

// ── Pago (no se usa en este funnel: PAYMENT_ENABLED = false) ──────────────────
export const PAGO = {
  step: 'Paso 2 de 2 · Confirma tu lugar',
  title: 'falta un paso para confirmar tu lugar',
  sub: 'Tu lugar queda reservado cuando completas el pago.',
  bullets: [] as string[],
  noLink: 'Recibimos tus datos. Te enviaremos el enlace de pago a tu WhatsApp y a tu correo.',
  whatsappMsg: (nombre: string) => `Hola, soy ${nombre}. Me registré y quiero completar mi pago.`,
}

export const CONFIRMADA = {
  title: 'Tu lugar está confirmado',
  steps: [
    { icon: 'fa-solid fa-envelope-open-text', text: 'Revisa tu correo: ahí te llega la confirmación.' },
    { icon: 'fa-brands fa-whatsapp', text: 'Te escribiremos por WhatsApp.' },
  ],
  calendarTitle: '¿Prefieres que veamos tu caso? Agenda una asesoría',
  calendarButton: 'Agendar una asesoría',
}
