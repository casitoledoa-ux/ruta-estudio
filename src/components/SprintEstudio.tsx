import { useEffect, useState } from 'react'
import { Tecnica } from '../types'
import SenderoRuta from './SenderoRuta'

interface SprintEstudioProps {
  tecnica: Tecnica
  onCompletar: (puntosGanados: number) => void
}

type Fase = 'sprint' | 'pausa-activa' | 'terminado'

/**
 * Este es EL MOTOR DE JUEGO reutilizable. Recibe cualquier "Tecnica" (Mapa Mental,
 * Cuadro Comparativo, etc.) y ejecuta la mecánica de sprint-por-etapas:
 *
 * 1. Muestra la instrucción de la etapa actual + temporizador countdown.
 * 2. Al llegar a 0, suma los puntos y pasa a una pausa activa breve (30s).
 * 3. Desbloquea la siguiente etapa.
 * 4. Al terminar todas las etapas, avisa al componente padre (onCompletar).
 *
 * Para agregar una técnica nueva en la Fase 2, NO se toca este archivo —
 * solo se crea su configuración en src/tecnicas/.
 */
export default function SprintEstudio({ tecnica, onCompletar }: SprintEstudioProps) {
  const [indiceEtapa, setIndiceEtapa] = useState(0)
  const [segundosRestantes, setSegundosRestantes] = useState(tecnica.etapas[0].duracionSegundos)
  const [fase, setFase] = useState<Fase>('sprint')
  const [puntosAcumulados, setPuntosAcumulados] = useState(0)

  const etapa = tecnica.etapas[indiceEtapa]
  const esUltimaEtapa = indiceEtapa === tecnica.etapas.length - 1

  // Countdown del sprint activo
  useEffect(() => {
    if (fase !== 'sprint') return
    if (segundosRestantes <= 0) {
      const nuevosPuntos = puntosAcumulados + etapa.puntos
      setPuntosAcumulados(nuevosPuntos)
      setFase('pausa-activa')
      return
    }
    const id = setTimeout(() => setSegundosRestantes((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [fase, segundosRestantes])

  // Pausa activa de 30s entre etapas (evita el "corte abrupto" del foco)
  useEffect(() => {
    if (fase !== 'pausa-activa') return
    const id = setTimeout(() => {
      if (esUltimaEtapa) {
        setFase('terminado')
        onCompletar(puntosAcumulados)
      } else {
        const siguiente = indiceEtapa + 1
        setIndiceEtapa(siguiente)
        setSegundosRestantes(tecnica.etapas[siguiente].duracionSegundos)
        setFase('sprint')
      }
    }, 30_000)
    return () => clearTimeout(id)
  }, [fase])

  const minutos = Math.floor(segundosRestantes / 60)
  const segundos = segundosRestantes % 60

  return (
    <div className="max-w-md mx-auto p-6 bg-bosque-panel rounded-2xl">
      <p className="font-cuerpo text-sm text-menta mb-2">{tecnica.objetivo}</p>
      <h2 className="font-display text-2xl mb-4">{tecnica.nombre}</h2>

      <SenderoRuta totalParadas={tecnica.etapas.length} paradaActual={indiceEtapa} />

      {fase === 'sprint' && (
        <div className="mt-6 text-center">
          <p className="font-cuerpo text-marfil/80 mb-1">{etapa.titulo}</p>
          <p className="font-cuerpo text-sm text-marfil/60 mb-4">{etapa.instruccion}</p>
          <div className="font-dato text-5xl text-ambar tabular-nums">
            {String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
          </div>
          <p className="font-cuerpo text-xs text-marfil/50 mt-2">+{etapa.puntos} pts al terminar</p>
        </div>
      )}

      {fase === 'pausa-activa' && (
        <div className="mt-6 text-center">
          <p className="font-display text-xl text-ambar mb-2">¡Parada completada!</p>
          <p className="font-cuerpo text-sm text-marfil/70">
            Respira hondo 3 veces o estírate un momento antes de seguir.
          </p>
        </div>
      )}

      {fase === 'terminado' && (
        <div className="mt-6 text-center">
          <p className="font-display text-xl text-ambar">¡Ruta completada! 🏁</p>
          <p className="font-cuerpo text-sm text-marfil/70 mt-1">
            Ganaste {puntosAcumulados} puntos.
          </p>
        </div>
      )}
    </div>
  )
}
