// Modelo de cualificación del funnel: UNA sola fuente de verdad.
// Para un cliente nuevo solo se editan QUESTIONS, OBJETIVO y la regla de qualifies().
// Salen del cierre del VSL / de lo que el cliente define como "sí es cliente" (no inventar).
//
// Cada respuesta viaja a GHL como `<key>` (valor interno) y `<key>_label` (texto legible:
// es el que se mapea en los campos personalizados). Ver references/contrato-ghl.md de la skill.
// Los `value` son estables: si GHL ya está mapeado, NO renombrarlos (solo agregar).

export interface QuestionOption {
  value: string
  label: string
}

export interface Question {
  key: string
  title: string
  /** Etiqueta corta para la nota del CRM */
  noteLabel: string
  options: readonly QuestionOption[]
}

export const QUESTIONS = [
  {
    key: 'momento',
    title: '¿En qué momento está tu casa?',
    noteLabel: 'Momento',
    options: [
      { value: 'casa_nueva', label: 'Me acaban de entregar mi casa nueva' },
      { value: 'no_representa', label: 'Vivo ahí hace años y ya no me representa' },
      { value: 'remodelar', label: 'Quiero remodelar uno o varios espacios' },
      { value: 'solo_info', label: 'Solo quiero informarme por ahora' },
    ],
  },
  {
    key: 'alcance',
    title: '¿Qué quieres hacer?',
    noteLabel: 'Alcance',
    options: [
      { value: 'casa_completa', label: 'Diseñar mi casa completa' },
      { value: 'un_espacio', label: 'Empezar por un espacio (cocina, sala, baño…)' },
      { value: 'un_mueble', label: 'Cambiar un solo mueble, algo rápido' },
    ],
  },
  {
    key: 'prioridad',
    title: '¿Qué es lo más importante para ti?',
    noteLabel: 'Prioridad',
    options: [
      { value: 'una_vision', label: 'Que un solo equipo lo piense todo y se cumpla tal cual' },
      { value: 'sin_desgaste', label: 'No tener que coordinar maestros, carpinteros y tiendas' },
      { value: 'mas_barato', label: 'La opción más barata, aunque no combine con todo' },
    ],
  },
] as const satisfies readonly Question[]

/** Último paso: pregunta abierta (va a GHL como `objetivo`). */
export const OBJETIVO = {
  title: 'Cuéntanos cómo es tu espacio y cómo quieres vivirlo',
  placeholder: 'Ej.: Nos entregaron un departamento en Samborondón y queremos que la sala y el comedor se sientan cálidos para recibir a la familia…',
  minWords: 10,
}

export type QuestionKey = (typeof QUESTIONS)[number]['key']
export type Answers = Record<QuestionKey, string>

export const emptyAnswers = (): Answers =>
  Object.fromEntries(QUESTIONS.map((q) => [q.key, ''])) as Answers

export function labelFor(key: QuestionKey, value: string): string {
  const q = QUESTIONS.find((x) => x.key === key)
  return q?.options.find((o) => o.value === value)?.label ?? value
}

// ── Regla de cualificación (Diskret) ──────────────────────────────────────────
// Sale del VSL: "Si lo que buscas es cambiar un solo mueble rápido, o elegir la opción más barata
// aunque no combine con nada, probablemente no somos para ti". También se descarta a quien solo
// viene a informarse. Todo lo demás califica (casa nueva, casa que no representa, remodelar,
// casa completa o un espacio). Pendiente confirmar con Michelle (presupuesto, ciudades).
const DISQUALIFY: Partial<Record<QuestionKey, readonly string[]>> = {
  momento: ['solo_info'],
  alcance: ['un_mueble'],
  prioridad: ['mas_barato'],
}

export function qualifies(a: Answers): boolean {
  return (Object.keys(DISQUALIFY) as QuestionKey[]).every(
    (k) => !(DISQUALIFY[k] ?? []).includes(a[k]),
  )
}
