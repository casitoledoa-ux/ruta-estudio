import { Ejercicio, Leccion } from '../types'
import { alternativasTTM } from './alternativasTTM'
import { casosClinicosTTM } from './casosClinicosTTM'
import { TEMAS } from './temas'

// A diferencia de "lecciones.ts" (que mezcla todo el contenido sin importar el tema),
// este camino arma UN nodo del mapa por cada materia/clase, agrupando las preguntas
// que ya están etiquetadas con ese tema. La meta es llegar a 15 preguntas por tema —
// por ahora cada nodo tiene las que existen etiquetadas (a veces menos de 15; se
// pueden agregar más preguntas de esa materia más adelante para completar el cupo).
const META_PREGUNTAS_POR_TEMA = 15

function construirLeccionesPorMateria(): Leccion[] {
  return TEMAS.map((tema) => {
    const alternativas: Ejercicio[] = alternativasTTM.preguntas
      .filter((p) => p.tema === tema.id)
      .map((p) => ({ tipo: 'alternativa', pregunta: p }))
    const casos: Ejercicio[] = casosClinicosTTM.preguntas
      .filter((p) => p.tema === tema.id)
      .map((p) => ({ tipo: 'caso', pregunta: p }))

    // Intercalar alternativas y casos, tope de 15 (o los que haya disponibles)
    const ejercicios: Ejercicio[] = []
    let iAlt = 0
    let iCaso = 0
    while ((iAlt < alternativas.length || iCaso < casos.length) && ejercicios.length < META_PREGUNTAS_POR_TEMA) {
      if (iAlt < alternativas.length) ejercicios.push(alternativas[iAlt++])
      if (iCaso < casos.length && ejercicios.length < META_PREGUNTAS_POR_TEMA) ejercicios.push(casos[iCaso++])
    }

    return {
      id: `materia-${tema.id}`,
      titulo: tema.nombre,
      ejercicios,
    }
  }).filter((leccion) => leccion.ejercicios.length > 0)
}

export const leccionesPorMateria: Leccion[] = construirLeccionesPorMateria()
