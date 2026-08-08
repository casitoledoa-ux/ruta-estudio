import { Leccion } from '../types'

interface MapaLeccionesProps {
  lecciones: Leccion[]
  leccionActual: number // índice de la próxima lección a desbloquear
  onElegir: (indice: number) => void
}

/**
 * Pantalla principal tipo Duolingo: un sendero vertical de nodos, uno por lección.
 * - Completadas: nodo ámbar sólido con check.
 * - Desbloqueada (la próxima a jugar): nodo menta pulsante.
 * - Bloqueadas: nodo apagado con candado, no clickeable.
 */
export default function MapaLecciones({ lecciones, leccionActual, onElegir }: MapaLeccionesProps) {
  return (
    <div className="max-w-xs mx-auto py-4">
      <div className="flex flex-col items-center gap-6">
        {lecciones.map((leccion, i) => {
          const completada = i < leccionActual
          const desbloqueada = i === leccionActual
          const bloqueada = i > leccionActual
          const offset = i % 2 === 0 ? 0 : 36 // zigzag horizontal como Duolingo

          return (
            <div key={leccion.id} style={{ transform: `translateX(${offset}px)` }} className="flex flex-col items-center">
              <button
                onClick={() => (bloqueada ? null : onElegir(i))}
                disabled={bloqueada}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center font-display text-lg
                  ${completada ? 'bg-ambar text-bosque' : ''}
                  ${desbloqueada ? 'bg-menta text-bosque' : ''}
                  ${bloqueada ? 'bg-bosque-panel text-marfil/30' : ''}
                `}
              >
                {completada ? '✓' : bloqueada ? '🔒' : i + 1}
                {desbloqueada && (
                  <span className="absolute inset-0 rounded-full border-2 border-menta animate-ping opacity-40" />
                )}
              </button>
              <span className="font-cuerpo text-xs text-marfil/60 mt-1">{leccion.titulo}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
