import { Tecnica } from '../types'

// ⚠️ VERSIÓN DE PRUEBA: tiempos cortos (10s por etapa) solo para testear rápido
// que el guardado en Supabase funciona. Antes de usarla con tu grupo de estudio,
// hay que volver a los tiempos reales (ver comentario más abajo).
export const mapaMental: Tecnica = {
  id: 'mapa-mental',
  nombre: 'Mapa Mental',
  objetivo: 'Explorar',
  etapas: [
    {
      id: 'idea-central',
      titulo: 'Idea central',
      instruccion: 'Escribe en el centro el concepto principal del tema que estás estudiando.',
      duracionSegundos: 10, // real: 180 (3 min)
      puntos: 10,
    },
    {
      id: 'ramas-principales',
      titulo: 'Ramas principales',
      instruccion: 'Anota 3 a 5 subtemas que se desprenden directamente de la idea central.',
      duracionSegundos: 10, // real: 300 (5 min)
      puntos: 15,
    },
    {
      id: 'detalles-ejemplos',
      titulo: 'Detalles y ejemplos',
      instruccion: 'Agrega ejemplos o datos concretos a cada rama.',
      duracionSegundos: 10, // real: 420 (7 min)
      puntos: 20,
    },
    {
      id: 'revision-conexion',
      titulo: 'Revisión y conexión',
      instruccion: 'Revisa el mapa completo y traza líneas entre ramas que se relacionen entre sí.',
      duracionSegundos: 10, // real: 180 (3 min)
      puntos: 10,
    },
  ],
}
