import { useEffect, useState } from 'react'
import { SesionCasosClinicos } from '../types'
import SenderoRuta from './SenderoRuta'

interface CasoClinicoProps {
  sesion: SesionCasosClinicos
  onCompletar: (puntosGanados: number) => void
}

type Fase = 'respondiendo' | 'autoevaluando' | 'terminado'

/**
 * Motor de juego para preguntas de desarrollo tipo caso clínico:
 * 1. Muestra el caso + pregunta, con un tiempo sugerido para responder (más largo
 *    que el sprint de técnicas visuales, porque son casos complejos de razonar).
 * 2. Al terminar el tiempo (o si el usuario marca que ya terminó), pasa a autoevaluación:
 *    se revela la pauta como checklist y el usuario marca qué puntos cubrió realmente.
 * 3. Repite para cada pregunta de la sesión, sumando los puntos autoevaluados.
 */
export default function CasoClinico({ sesion, onCompletar }: CasoClinicoProps) {
  const [indicePregunta, setIndicePregunta] = useState(0)
  const pregunta = sesion.preguntas[indicePregunta]

  const [segundosRestantes, setSegundosRestantes] = useState(pregunta.duracionSegundos)
  const [fase, setFase] = useState<Fase>('respondiendo')
  const [respuesta, setRespuesta] = useState('')
  const [criteriosMarcados, setCriteriosMarcados] = useState<Set<string>>(new Set())
  const [puntosAcumulados, setPuntosAcumulados] = useState(0)

  const esUltimaPregunta = indicePregunta === sesion.preguntas.length - 1
  const puntajeMaximoPregunta = pregunta.pauta.reduce((sum, c) => sum + c.puntos, 0)

  // Countdown del tiempo sugerido de respuesta
  useEffect(() => {
    if (fase !== 'respondiendo') return
    if (segundosRestantes <= 0) {
      setFase('autoevaluando')
      return
    }
    const id = setTimeout(() => setSegundosRestantes((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [fase, segundosRestantes])

  function alternarCriterio(id: string) {
    setCriteriosMarcados((prev) => {
      const nuevo = new Set(prev)
      nuevo.has(id) ? nuevo.delete(id) : nuevo.add(id)
      return nuevo
    })
  }

  function confirmarAutoevaluacion() {
    const puntosPregunta = pregunta.pauta
      .filter((c) => criteriosMarcados.has(c.id))
      .reduce((sum, c) => sum + c.puntos, 0)
    const nuevoTotal = puntosAcumulados + puntosPregunta

    if (esUltimaPregunta) {
      setPuntosAcumulados(nuevoTotal)
      setFase('terminado')
      onCompletar(nuevoTotal)
    } else {
      setPuntosAcumulados(nuevoTotal)
      const siguiente = indicePregunta + 1
      setIndicePregunta(siguiente)
      setSegundosRestantes(sesion.preguntas[siguiente].duracionSegundos)
      setRespuesta('')
      setCriteriosMarcados(new Set())
      setFase('respondiendo')
    }
  }

  const minutos = Math.floor(segundosRestantes / 60)
  const segundos = segundosRestantes % 60

  return (
    <div className="max-w-lg mx-auto p-6 bg-bosque-panel rounded-2xl">
      <p className="font-cuerpo text-sm text-menta mb-2">{sesion.objetivo}</p>
      <h2 className="font-display text-2xl mb-4">{sesion.nombre}</h2>

      <SenderoRuta totalParadas={sesion.preguntas.length} paradaActual={indicePregunta} />

      {fase === 'respondiendo' && (
        <div className="mt-6">
          <p className="font-cuerpo text-sm text-marfil/80 mb-3 whitespace-pre-line">{pregunta.caso}</p>
          <p className="font-cuerpo text-sm text-ambar mb-4 whitespace-pre-line">{pregunta.pregunta}</p>

          <div className="font-dato text-2xl text-ambar tabular-nums text-center mb-3">
            {String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
          </div>

          <textarea
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Escribe tu respuesta aquí..."
            className="font-cuerpo w-full min-h-[160px] bg-bosque rounded-lg p-3 outline-none placeholder:text-marfil/40"
          />

          <button
            onClick={() => setFase('autoevaluando')}
            className="font-cuerpo w-full mt-3 bg-menta text-bosque rounded-lg py-3"
          >
            Terminar y autoevaluar
          </button>
        </div>
      )}

      {fase === 'autoevaluando' && (
        <div className="mt-6">
          <p className="font-display text-lg text-ambar mb-1">Pauta de corrección</p>
          <p className="font-cuerpo text-xs text-marfil/50 mb-4">
            Marca honestamente qué puntos cubrió tu respuesta — es para tu propio aprendizaje.
          </p>

          <div className="flex flex-col gap-2">
            {pregunta.pauta.map((criterio) => (
              <label
                key={criterio.id}
                className="font-cuerpo text-sm flex items-start gap-3 bg-bosque rounded-lg p-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={criteriosMarcados.has(criterio.id)}
                  onChange={() => alternarCriterio(criterio.id)}
                  className="mt-1"
                />
                <span className="flex-1">{criterio.texto}</span>
                <span className="text-ambar text-xs whitespace-nowrap">+{criterio.puntos} pts</span>
              </label>
            ))}
          </div>

          <p className="font-dato text-sm text-marfil/60 text-center mt-4">
            {pregunta.pauta.filter((c) => criteriosMarcados.has(c.id)).reduce((s, c) => s + c.puntos, 0)}
            {' / '}
            {puntajeMaximoPregunta} pts en esta pregunta
          </p>

          <button
            onClick={confirmarAutoevaluacion}
            className="font-cuerpo w-full mt-4 bg-ambar text-bosque rounded-lg py-3"
          >
            {esUltimaPregunta ? 'Confirmar y terminar' : 'Confirmar y siguiente caso'}
          </button>
        </div>
      )}

      {fase === 'terminado' && (
        <div className="mt-6 text-center">
          <p className="font-display text-xl text-ambar">¡Sesión de casos completada! 🏁</p>
          <p className="font-cuerpo text-sm text-marfil/70 mt-1">Ganaste {puntosAcumulados} puntos.</p>
        </div>
      )}
    </div>
  )
}
