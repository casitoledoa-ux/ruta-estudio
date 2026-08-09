import { useState } from 'react'
import { Leccion } from '../types'

interface LeccionJuegoProps {
  leccion: Leccion
  onCompletar: (puntosGanados: number) => void
  onSalir: () => void
}

const CORAZONES_INICIALES = 5

/**
 * Motor de juego tipo Duolingo: recorre los ejercicios de una lección (mezcla de
 * alternativas y casos clínicos), con un sistema de 5 corazones. Cada respuesta
 * incorrecta (o cada caso clínico donde el usuario marcó menos del 50% de la pauta)
 * resta un corazón. Si los corazones llegan a 0, la lección termina sin desbloquear
 * la siguiente. Si se completan todos los ejercicios con al menos 1 corazón, la
 * lección se marca como superada.
 */
export default function LeccionJuego({ leccion, onCompletar, onSalir }: LeccionJuegoProps) {
  const [indice, setIndice] = useState(0)
  const [corazones, setCorazones] = useState(CORAZONES_INICIALES)
  const [puntosGanados, setPuntosGanados] = useState(0)
  const [estado, setEstado] = useState<'jugando' | 'sin-corazones' | 'completada'>('jugando')

  // estado del ejercicio de alternativa
  const [opcionElegida, setOpcionElegida] = useState<number | null>(null)
  // estado del ejercicio de caso clínico
  const [faseCaso, setFaseCaso] = useState<'respondiendo' | 'autoevaluando'>('respondiendo')
  const [respuestaTexto, setRespuestaTexto] = useState('')
  const [criteriosMarcados, setCriteriosMarcados] = useState<Set<string>>(new Set())

  // Acumula, por cada caso clínico respondido, los criterios de la pauta que NO se marcaron
  // (para mostrarlos como "puntos a repasar" al final de la lección).
  const [pendientes, setPendientes] = useState<{ titulo: string; criterios: string[] }[]>([])

  const ejercicio = leccion.ejercicios[indice]
  const esUltimo = indice === leccion.ejercicios.length - 1

  function perderCorazon() {
    const restantes = corazones - 1
    setCorazones(restantes)
    if (restantes <= 0) {
      setEstado('sin-corazones')
    }
  }

  function avanzar() {
    if (esUltimo) {
      setEstado('completada')
      onCompletar(puntosGanados)
    } else {
      setIndice(indice + 1)
      setOpcionElegida(null)
      setFaseCaso('respondiendo')
      setRespuestaTexto('')
      setCriteriosMarcados(new Set())
    }
  }

  // ---- Ejercicio de alternativa ----
  function elegirOpcion(i: number) {
    if (opcionElegida !== null || ejercicio.tipo !== 'alternativa') return
    setOpcionElegida(i)
    const acerto = i === ejercicio.pregunta.indiceCorrecta
    if (acerto) {
      setPuntosGanados((p) => p + ejercicio.pregunta.puntos)
    } else {
      perderCorazon()
    }
  }

  // ---- Ejercicio de caso clínico ----
  function alternarCriterio(id: string) {
    setCriteriosMarcados((prev) => {
      const nuevo = new Set(prev)
      nuevo.has(id) ? nuevo.delete(id) : nuevo.add(id)
      return nuevo
    })
  }

  function confirmarCaso() {
    if (ejercicio.tipo !== 'caso') return
    const maximo = ejercicio.pregunta.pauta.reduce((s, c) => s + c.puntos, 0)
    const obtenido = ejercicio.pregunta.pauta
      .filter((c) => criteriosMarcados.has(c.id))
      .reduce((s, c) => s + c.puntos, 0)
    setPuntosGanados((p) => p + obtenido)

    const noMarcados = ejercicio.pregunta.pauta
      .filter((c) => !criteriosMarcados.has(c.id))
      .map((c) => c.texto)
    if (noMarcados.length > 0) {
      const titulo = ejercicio.pregunta.pregunta.length > 70
        ? ejercicio.pregunta.pregunta.slice(0, 70) + '…'
        : ejercicio.pregunta.pregunta
      setPendientes((prev) => [...prev, { titulo, criterios: noMarcados }])
    }

    if (maximo > 0 && obtenido / maximo < 0.5) {
      perderCorazon()
    }
    avanzar()
  }

  function ListaPendientes() {
    if (pendientes.length === 0) return null
    return (
      <div className="mt-6 text-left">
        <p className="font-cuerpo text-sm text-ambar mb-2">📌 Puntos a repasar</p>
        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
          {pendientes.map((p, i) => (
            <div key={i} className="bg-bosque rounded-lg p-3">
              <p className="font-cuerpo text-xs text-marfil/60 mb-2">{p.titulo}</p>
              <ul className="font-cuerpo text-xs text-marfil/80 list-disc list-inside space-y-1">
                {p.criterios.map((c, j) => (
                  <li key={j}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (estado === 'sin-corazones') {
    return (
      <div className="max-w-md mx-auto p-6 bg-bosque-panel rounded-2xl text-center">
        <p className="font-display text-2xl text-coral mb-2">Sin corazones 💔</p>
        <p className="font-cuerpo text-sm text-marfil/70 mb-6">
          Te quedaste sin corazones en esta lección. Puedes intentarla de nuevo.
        </p>
        <ListaPendientes />
        <button onClick={onSalir} className="font-cuerpo bg-menta text-bosque rounded-lg px-6 py-3 mt-6">
          Volver al mapa
        </button>
      </div>
    )
  }

  if (estado === 'completada') {
    return (
      <div className="max-w-md mx-auto p-6 bg-bosque-panel rounded-2xl text-center">
        <p className="font-display text-2xl text-ambar mb-2">¡Lección completada! 🏆</p>
        <p className="font-cuerpo text-sm text-marfil/70 mb-1">Ganaste {puntosGanados} puntos.</p>
        <p className="font-cuerpo text-sm text-marfil/70 mb-6">Corazones restantes: {corazones}</p>
        <ListaPendientes />
        <button onClick={onSalir} className="font-cuerpo bg-menta text-bosque rounded-lg px-6 py-3 mt-6">
          Volver al mapa
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-bosque-panel rounded-2xl">
      {/* Barra superior: salir + progreso + corazones */}
      <div className="flex items-center justify-between mb-2">
        <button onClick={onSalir} className="font-cuerpo text-xs text-marfil/50">
          ← Salir
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 h-2 bg-bosque rounded-full mr-4 overflow-hidden">
          <div
            className="h-full bg-ambar rounded-full"
            style={{ width: `${((indice + (opcionElegida !== null ? 1 : 0)) / leccion.ejercicios.length) * 100}%`, transition: 'width 0.4s ease-out' }}
          />
        </div>
        <div className="font-dato text-sm text-coral whitespace-nowrap">
          {'❤️'.repeat(corazones)}{'🖤'.repeat(CORAZONES_INICIALES - corazones)}
        </div>
      </div>

      {ejercicio.tipo === 'alternativa' && (
        <div>
          <p className="font-cuerpo text-sm text-marfil/90 mb-4">{ejercicio.pregunta.enunciado}</p>
          <div className="flex flex-col gap-2">
            {ejercicio.pregunta.opciones.map((opcion, i) => {
              const esElegida = opcionElegida === i
              const esCorrecta = i === ejercicio.pregunta.indiceCorrecta
              const mostrar = opcionElegida !== null
              let estilo = 'bg-bosque'
              if (mostrar && esCorrecta) estilo = 'bg-menta text-bosque'
              else if (mostrar && esElegida && !esCorrecta) estilo = 'bg-coral text-bosque'
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
              <p className="font-cuerpo text-xs text-marfil/70">{ejercicio.pregunta.explicacion}</p>
              <button onClick={avanzar} className="font-cuerpo w-full mt-3 bg-ambar text-bosque rounded-lg py-3">
                Continuar
              </button>
            </div>
          )}
        </div>
      )}

      {ejercicio.tipo === 'caso' && faseCaso === 'respondiendo' && (
        <div>
          {ejercicio.pregunta.caso && (
            <p className="font-cuerpo text-sm text-marfil/80 mb-3 whitespace-pre-line">{ejercicio.pregunta.caso}</p>
          )}
          <p className="font-cuerpo text-sm text-ambar mb-4 whitespace-pre-line">{ejercicio.pregunta.pregunta}</p>
          <textarea
            value={respuestaTexto}
            onChange={(e) => setRespuestaTexto(e.target.value)}
            placeholder="Escribe tu respuesta aquí..."
            className="font-cuerpo w-full min-h-[140px] bg-bosque rounded-lg p-3 outline-none placeholder:text-marfil/40"
          />
          <button
            onClick={() => setFaseCaso('autoevaluando')}
            className="font-cuerpo w-full mt-3 bg-menta text-bosque rounded-lg py-3"
          >
            Terminar y autoevaluar
          </button>
        </div>
      )}

      {ejercicio.tipo === 'caso' && faseCaso === 'autoevaluando' && (
        <div>
          <p className="font-display text-lg text-ambar mb-1">Pauta de corrección</p>
          <p className="font-cuerpo text-xs text-marfil/50 mb-4">
            Marca honestamente qué puntos cubrió tu respuesta. Si cubres menos de la mitad, pierdes un corazón.
          </p>
          <div className="flex flex-col gap-2">
            {ejercicio.pregunta.pauta.map((criterio) => (
              <label key={criterio.id} className="font-cuerpo text-sm flex items-start gap-3 bg-bosque rounded-lg p-3 cursor-pointer">
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
          <button onClick={confirmarCaso} className="font-cuerpo w-full mt-4 bg-ambar text-bosque rounded-lg py-3">
            Confirmar
          </button>
        </div>
      )}
    </div>
  )
}
