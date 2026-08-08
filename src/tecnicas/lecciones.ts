import { Ejercicio, Leccion } from '../types'
import { alternativasTTM } from './alternativasTTM'
import { casosClinicosTTM } from './casosClinicosTTM'

// Cada lección mezcla ejercicios de alternativas y casos clínicos, en una proporción
// de aproximadamente 2 alternativas por cada caso clínico (los casos son más largos).
// EJERCICIOS_POR_LECCION controla cuántos ejercicios tiene cada nodo del mapa.
const EJERCICIOS_POR_LECCION = 6
const PROPORCION_ALTERNATIVAS = 2 // por cada caso clínico

function construirEjercicios(): Ejercicio[] {
  const alternativas: Ejercicio[] = alternativasTTM.preguntas.map((p) => ({ tipo: 'alternativa', pregunta: p }))
  const casos: Ejercicio[] = casosClinicosTTM.preguntas.map((p) => ({ tipo: 'caso', pregunta: p }))

  const resultado: Ejercicio[] = []
  let iAlt = 0
  let iCaso = 0
  while (iAlt < alternativas.length || iCaso < casos.length) {
    for (let i = 0; i < PROPORCION_ALTERNATIVAS && iAlt < alternativas.length; i++) {
      resultado.push(alternativas[iAlt++])
    }
    if (iCaso < casos.length) {
      resultado.push(casos[iCaso++])
    }
  }
  return resultado
}

function construirLecciones(): Leccion[] {
  const ejercicios = construirEjercicios()
  const lecciones: Leccion[] = []
  for (let i = 0; i < ejercicios.length; i += EJERCICIOS_POR_LECCION) {
    const grupo = ejercicios.slice(i, i + EJERCICIOS_POR_LECCION)
    const numero = lecciones.length + 1
    lecciones.push({
      id: `leccion-${numero}`,
      titulo: `Lección ${numero}`,
      ejercicios: grupo,
    })
  }
  return lecciones
}

export const lecciones: Leccion[] = construirLecciones()
