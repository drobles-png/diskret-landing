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
    title: `${BRAND_NAME} | Lo que ves en el render es lo que te entregamos`,
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
  timer: { label: 'Agenda de asesorías', prefix: 'Cierra en' },
  audience: ['Casa recién entregada', 'Casa que ya no te representa', 'Remodelación sin desgaste'],
  headline: 'Diseñamos tu casa completa, de principio a fin.',
  headlineAccent: 'Lo que ves en el render es lo que te entregamos.',
  sub: `Diseño, remodelación, decoración y muebles hechos en nuestro propio taller, con un solo equipo y una sola visión. ${PERSON_NAME} te lo cuenta en un video, con dos proyectos reales.`,
  videoCaption: 'Arquitecta · El Método Diskret',
  cta: 'Ver el video completo',
  ctaNote: 'Sin costo · Solo te pedimos tus datos para mostrártelo',

  // Banda bajo el hero: el resumen del método con las palabras del VSL
  // ("Escucharte, especificar cada detalle, escoger contigo los materiales, fabricar en nuestro taller, ejecutar y decorar")
  methodWords: ['Escuchar', 'Especificar', 'Escoger', 'Fabricar', 'Ejecutar', 'Decorar'],

  // Cifras: solo lo que dice el VSL
  facts: [
    { value: '+10', label: 'años diseñando, remodelando y amueblando casas' },
    { value: '1', label: 'solo equipo, con una sola visión' },
    { value: '6', label: 'pasos del Método Diskret' },
    { value: 'Todo', label: 'el mobiliario se fabrica en nuestro propio taller' },
  ],

  pains: {
    eyebrow: 'Lo que veo en casi todas las casas',
    title: 'La mayoría decide su casa por partes, y la casa no habla un mismo idioma',
    quote: 'Tomar veinte decisiones diferentes para cada rincón suele terminar en espacios desconectados.',
    items: [
      {
        icon: 'fa-clock',
        title: 'El desgaste',
        text: 'Meses de llamadas, de buscar al maestro que no llegó y de ir de tienda en tienda buscando una lámpara que combine.',
      },
      {
        icon: 'fa-image',
        title: 'Que no se parezca a lo que te mostraron',
        text: 'Aprobar un diseño precioso y recibir otra cosa, porque entre la imagen y la obra nadie se aseguró de que cada detalle se cumpliera.',
      },
      {
        icon: 'fa-couch',
        title: 'Muebles bonitos que no se sienten tuyos',
        text: 'Piezas que se ven bien en la tienda, pero que no fueron hechas para tus medidas ni para tu forma de vivir.',
      },
    ],
  },

  steps: {
    eyebrow: 'El Método Diskret',
    title: 'Un solo equipo diseña, remodela, decora y fabrica tus muebles',
    items: [
      {
        title: 'Escucharte',
        text: 'Antes de dibujar una sola línea, entendemos cómo vives: quién usa cada espacio, qué colores te hacen sentir en casa y qué sueñas que tenga.',
      },
      {
        title: 'La propuesta, especificada',
        text: 'Renders fotorrealistas, detalles constructivos, materiales, medidas y colores. Quien ejecute la obra sabe exactamente qué hacer.',
      },
      {
        title: 'Materiales en físico',
        text: 'La piedra, la madera, los acabados y las telas los escoges con nosotros, viéndolos con la luz real de tu espacio.',
      },
      {
        title: 'Nuestro propio taller',
        text: 'El mueble de la sala, la cocina, el baño y el clóset se fabrican con las medidas exactas de tu espacio.',
      },
      {
        title: 'Ejecución',
        text: 'Coordinamos la obra y la acompañamos hasta la última pieza. Tú tomas las decisiones que importan.',
      },
      {
        title: 'Decoración',
        text: 'Cada lámpara, cada cortina y cada detalle final, para que todo hable el mismo lenguaje del primer día.',
      },
    ],
    statement: 'Lo que ves en el render es lo que te entregamos.',
    cta: 'Ver el video completo',
  },

  // Proyectos reales que se muestran en el VSL. Sin fotos todavía (pendiente: renders o fotos del cliente).
  projects: {
    eyebrow: 'Proyectos reales',
    title: 'Lo que vieron en el render es lo que hoy viven todos los días',
    items: [
      {
        code: 'Proyecto MC',
        place: 'Samborondón',
        scope: 'Sala y comedor',
        before: 'Su departamento era bonito, pero se sentía frío. Querían un lugar cálido para recibir a su familia los fines de semana.',
        what: 'Tonos neutros, luz indirecta cálida y espejos para dar amplitud. Ocultamos visualmente la ventana del fondo y escogimos mobiliario con curvas.',
        after: 'Hoy ese departamento se siente cálido desde que abres la puerta.',
      },
      {
        code: 'Proyecto JR',
        place: 'Machala',
        scope: 'Casa completa',
        before: 'Ingreso, sala, comedor, cocina abierta, baño social, BBQ y una escalera a doble altura: era muy fácil terminar con cada ambiente por su lado.',
        what: 'Un hilo conductor con la misma paleta y los mismos materiales en toda la casa, la cocina abierta como protagonista y una lámpara protagonista en la escalera.',
        after: 'Del ingreso a la sala, de la sala a la cocina y de ahí al BBQ, todo pertenece al mismo lugar.',
      },
    ],
  },

  about: {
    eyebrow: 'Quién te acompaña',
    title: `Soy ${PERSON_NAME}, arquitecta`,
    text: 'Desde hace más de diez años diseño, remodelo y amueblo casas con mi equipo en DISKRET. Para mí, diseñar una casa no es hacer que se vea bonita. Es diseñar la casa que tú quieres vivir.',
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

  fit: {
    eyebrow: 'Antes de seguir',
    title: '¿Es para ti?',
    items: [
      { yes: true, text: 'Te acaban de entregar tu casa nueva y no sabes por dónde empezar.' },
      { yes: true, text: 'Vives en tu casa hace años y sientes que ya no te representa, que cada espacio quedó por su lado.' },
      { yes: true, text: 'Quieres remodelar sin pasar meses coordinando maestros, carpinteros y tiendas por tu cuenta.' },
      { yes: false, text: 'Buscas cambiar un solo mueble rápido, o la opción más barata aunque no combine con nada.' },
    ],
  },

  closing: {
    eyebrow: 'Siguiente paso',
    title: 'Empecemos a pensar juntos tu casa',
    sub: 'Mira el video y agenda una asesoría de diseño con Michelle. Cuéntale cómo es tu espacio y cómo quieres vivirlo.',
    cta: 'Ver el video completo',
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
