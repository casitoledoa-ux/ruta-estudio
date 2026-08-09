import { useState } from 'react'
import { Flashcard } from '../types'

interface FlashcardsProps {
  mazoInicial: Flashcard[]
  onCompletar: (puntosGanados: number) => void
  onSalir: () => void
}

const PUNTOS_POR_TARJETA = 3

function mezclar<T>(arr: T[]): T[] {
  const copia = [...arr]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

/**
 * Mazo de tarjetas de estudio. Se muestra el término, el usuario piensa la
 * definición y voltea la tarjeta para revisarla. Si "la sabía", la tarjeta sale
 * del mazo para siempre en esta sesión. Si necesita repasarla, vuelve al final
 * del mazo. Termina cuando el mazo queda vacío.
 */
export default function Flashcards({ mazoInicial, onCompletar, onSalir }: FlashcardsProps) {
  const [mazo, setMazo] = useState(() => mezclar(mazoInicial))
  const [revelada, setRevelada] = useState(false)
  const [puntos, setPuntos] = useState(0)
  const [aprendidas, setAprendidas] = useState(0)

  const total = mazoInicial.length
  const actual = mazo[0]

  function laSabia() {
    setPuntos((p) => p + PUNTOS_POR_TARJETA)
    setAprendidas((a) => a + 1)
    const resto = mazo.slice(1)
    setRevelada(false)
    if (resto.length === 0) {
      onCompletar(puntos + PUNTOS_POR_TARJETA)
    } else {
      setMazo(resto)
    }
  }

  function repasarDeNuevo() {
    const [primera, ...resto] = mazo
    setMazo([...resto, primera])
    setRevelada(false)
  }

  if (!actual) {
    return (
      <div className="max-w-md mx-auto p-6 bg-bosque-panel rounded-2xl text-center">
        <p className="font-display text-2xl text-ambar mb-2">¡Mazo completo! 🎴</p>
        <p className="font-cuerpo text-sm text-marfil/70 mb-6">Ganaste {puntos} puntos.</p>
        <button onClick={onSalir} className="font-cuerpo bg-menta text-bosque rounded-lg px-6 py-3">
          Volver al mapa
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-bosque-panel rounded-2xl">
      <button onClick={onSalir} className="font-cuerpo text-xs text-marfil/50 mb-3">
        ← Salir
      </button>

      <p className="font-cuerpo text-xs text-marfil/50 mb-4">
        {aprendidas} aprendidas · {mazo.length} en el mazo (de {total})
      </p>

      <button
        onClick={() => setRevelada(!revelada)}
        className="w-full min-h-[180px] bg-bosque rounded-2xl flex items-center justify-center p-6 text-center"
      >
        {!revelada ? (
          <span className="font-display text-xl text-ambar">{actual.termino}</span>
        ) : (
          <span className="font-cuerpo text-sm text-marfil/90">{actual.definicion}</span>
        )}
      </button>
      <p className="font-cuerpo text-xs text-marfil/40 text-center mt-2">
        {!revelada ? 'Toca la tarjeta para ver la definición' : 'Toca de nuevo para volver a tapar'}
      </p>

      {revelada && (
        <div className="flex gap-3 mt-5">
          <button
            onClick={repasarDeNuevo}
            className="flex-1 font-cuerpo text-sm bg-coral text-bosque rounded-lg py-3"
          >
            Repasar de nuevo
          </button>
          <button
            onClick={laSabia}
            className="flex-1 font-cuerpo text-sm bg-menta text-bosque rounded-lg py-3"
          >
            La sabía ✓
          </button>
        </div>
      )}
    </div>
  )
}
