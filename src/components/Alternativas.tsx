import { useState } from 'react'
import { SesionAlternativas } from '../types'
import SenderoRuta from './SenderoRuta'

interface AlternativasProps {
  sesion: SesionAlternativas
  onCompletar: (puntosGanados: number) => void
}

/**
 * Motor de juego para preguntas de alternativas: elige una opción, ve feedback
 * inmediato (correcto/incorrecto + explicación), y avanza a la siguiente.
 * Más simple que CasoClinico.tsx: no hay temporizador ni autoevaluación,
 * el puntaje se calcula automáticamente según si acertó o no.
 */
export default function Alternativas({ sesion, onCompletar }: AlternativasProps) {
  const [indice, setIndice] = useState(0)
  const [opcionElegida, setOpcionElegida] = useState<number | null>(null)
  const [puntosAcumulados, setPuntosAcumulados] = useState(0)
  const [terminado, setTerminado] = useState(false)

  const pregunta = sesion.preguntas[indice]
  const esUltima = indice === sesion.preguntas.length - 1

  function elegirOpcion(i: number) {
    if (opcionElegida !== null) return // ya respondió esta pregunta
    setOpcionElegida(i)
  }

  function siguiente() {
    const acerto = opcionElegida === pregunta.indiceCorrecta
    const nuevoTotal = puntosAcumulados + (acerto ? pregunta.puntos : 0)

    if (esUltima) {
      setPuntosAcumulados(nuevoTotal)
      setTerminado(true)
      onCompletar(nuevoTotal)
    } else {
      setPuntosAcumulados(nuevoTotal)
      setIndice(indice + 1)
      setOpcionElegida(null)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-bosque-panel rounded-2xl">
      <p className="font-cuerpo text-sm text-menta mb-2">{sesion.objetivo}</p>
      <h2 className="font-display text-2xl mb-4">{sesion.nombre}</h2>

      <SenderoRuta totalParadas={sesion.preguntas.length} paradaActual={indice} />

      {!terminado && (
        <div className="mt-6">
          <p className="font-cuerpo text-sm text-marfil/90 mb-4">{pregunta.enunciado}</p>

          <div className="flex flex-col gap-2">
            {pregunta.opciones.map((opcion, i) => {
              const esElegida = opcionElegida === i
              const esCorrecta = i === pregunta.indiceCorrecta
              const mostrarEstado = opcionElegida !== null

              let estilo = 'bg-bosque'
              if (mostrarEstado && esCorrecta) estilo = 'bg-menta text-bosque'
              else if (mostrarEstado && esElegida && !esCorrecta) estilo = 'bg-coral text-bosque'

              return (
                <button
                  key={i}
                  onClick={() => elegirOpcion(i)}
                  disabled={opcionElegida !== null}
                  className={`font-cuerpo text-sm text-left rounded-lg p-3 ${estilo}`}
                >
                  {opcion}
                </button>
              )
            })}
          </div>

          {opcionElegida !== null && (
            <div className="mt-4">
              <p className="font-cuerpo text-xs text-marfil/70">{pregunta.explicacion}</p>
              <button
                onClick={siguiente}
                className="font-cuerpo w-full mt-3 bg-ambar text-bosque rounded-lg py-3"
              >
                {esUltima ? 'Terminar' : 'Siguiente pregunta'}
              </button>
            </div>
          )}
        </div>
      )}

      {terminado && (
        <div className="mt-6 text-center">
          <p className="font-display text-xl text-ambar">¡Ronda completada! 🏁</p>
          <p className="font-cuerpo text-sm text-marfil/70 mt-1">Ganaste {puntosAcumulados} puntos.</p>
        </div>
      )}
    </div>
  )
}
