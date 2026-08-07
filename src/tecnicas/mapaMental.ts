import { Tecnica } from '../types'

// Esta es la técnica piloto del MVP. Para agregar las otras 7 técnicas
// en la Fase 2, solo hay que crear un archivo igual a este con sus propias etapas
// — el motor de juego (StudySprint.tsx) no cambia.
export const mapaMental: Tecnica = {
  id: 'mapa-mental',
  nombre: 'Mapa Mental',
  objetivo: 'Explorar',
  etapas: [
    {
      id: 'idea-central',
      titulo: 'Idea central',
      instruccion: 'Escribe en el centro el concepto principal del tema que estás estudiando.',
      duracionSegundos: 180, // 3 min
      puntos: 10,
    },
    {
      id: 'ramas-principales',
      titulo: 'Ramas principales',
      instruccion: 'Anota 3 a 5 subtemas que se desprenden directamente de la idea central.',
      duracionSegundos: 300, // 5 min
      puntos: 15,
    },
    {
      id: 'detalles-ejemplos',
      titulo: 'Detalles y ejemplos',
      instruccion: 'Agrega ejemplos o datos concretos a cada rama.',
      duracionSegundos: 420, // 7 min
      puntos: 20,
    },
    {
      id: 'revision-conexion',
      titulo: 'Revisión y conexión',
      instruccion: 'Revisa el mapa completo y traza líneas entre ramas que se relacionen entre sí.',
      duracionSegundos: 180, // 3 min
      puntos: 10,
    },
  ],
}
