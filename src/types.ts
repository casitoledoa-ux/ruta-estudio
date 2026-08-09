// Una "etapa" es una parada del camino dentro de una técnica de estudio.
// Ej: la técnica "Mapa Mental" tiene 4 etapas.
export interface Etapa {
  id: string
  titulo: string
  instruccion: string
  duracionSegundos: number
  puntos: number
}

// Una "técnica" agrupa varias etapas. El motor de juego es el mismo
// para las 8 técnicas — solo cambia esta configuración.
export interface Tecnica {
  id: string
  nombre: string
  objetivo: string // ej: "Explorar", "Clasificar", "Comparar"...
  etapas: Etapa[]
}

export interface ProgresoUsuario {
  usuarioId: string
  rachaDias: number
  puntosTotales: number
  nivel: number
  leccionActual?: number
  leccionActualMateria?: number
  nombreJugador?: string | null
  avatarGenero?: string | null
  avatarColor?: string | null
}

// Un criterio de la pauta de corrección: un punto clínico que la respuesta
// debería cubrir, con el puntaje que vale ese punto específico.
export interface CriterioPauta {
  id: string
  texto: string
  puntos: number
}

// Una pregunta de desarrollo tipo caso clínico: presenta un caso + pregunta,
// el usuario responde en texto libre, y luego se autoevalúa contra la pauta.
export interface PreguntaDesarrollo {
  id: string
  tema?: string
  caso: string
  pregunta: string
  duracionSegundos: number
  pauta: CriterioPauta[]
}

export interface SesionCasosClinicos {
  id: string
  nombre: string
  objetivo: string
  preguntas: PreguntaDesarrollo[]
}

// Una pregunta de alternativas: enunciado + opciones, con feedback inmediato al elegir.
export interface PreguntaAlternativa {
  id: string
  tema?: string
  enunciado: string
  opciones: string[]
  indiceCorrecta: number
  explicacion: string
  puntos: number
}

export interface SesionAlternativas {
  id: string
  nombre: string
  objetivo: string
  preguntas: PreguntaAlternativa[]
}

// Un ejercicio dentro de una lección: puede ser una alternativa o un caso clínico.
export type Ejercicio =
  | { tipo: 'alternativa'; pregunta: PreguntaAlternativa }
  | { tipo: 'caso'; pregunta: PreguntaDesarrollo }

// Una lección es un nodo del mapa: un grupo corto de ejercicios mixtos.
export interface Leccion {
  id: string
  titulo: string
  ejercicios: Ejercicio[]
}

export interface ProgresoLecciones {
  usuarioId: string
  rachaDias: number
  puntosTotales: number
  nivel: number
  leccionActual: number
}

// Un nodo del mapa conceptual interactivo. Si "texto" ya viene con valor, el nodo
// aparece completado desde el inicio. Si "texto" es null, el nodo está vacío y
// "respuestaCorrecta" indica qué término del banco corresponde ahí.
export interface NodoMapaConceptual {
  id: string
  texto: string | null
  respuestaCorrecta?: string
  x: number
  y: number
  padreId: string | null
}

export interface MapaConceptualEjercicio {
  id: string
  titulo: string
  nodos: NodoMapaConceptual[]
  terminosDistractores?: string[]
}

// Una tarjeta de estudio: término/concepto en el frente, definición al reverso.
export interface Flashcard {
  id: string
  tema?: string
  termino: string
  definicion: string
}
