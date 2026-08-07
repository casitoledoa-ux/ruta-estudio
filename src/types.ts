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
