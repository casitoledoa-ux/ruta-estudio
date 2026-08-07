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

