import { useMemo, useState } from 'react'
import { MapaConceptualEjercicio } from '../types'

interface MapaConceptualProps {
  ejercicio: MapaConceptualEjercicio
  onCompletar: (puntosGanados: number) => void
  onSalir: () => void
}

const ANCHO_NODO = 74
const ALTO_NODO = 34
const PUNTOS_POR_ACIERTO = 5

function mezclar<T>(arr: T[]): T[] {
  const copia = [...arr]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

// Parte un texto en hasta 2 líneas para que quepa dentro del nodo (por la primera palabra).
function partirTexto(texto: string): string[] {
  const espacio = texto.indexOf(' ')
  if (espacio === -1 || texto.length <= 11) return [texto]
  return [texto.slice(0, espacio), texto.slice(espacio + 1)]
}

/**
 * Mapa conceptual interactivo: algunos nodos ya vienen rellenos, otros están vacíos.
 * El usuario toca un término del banco (abajo) y luego toca el nodo vacío donde cree
 * que corresponde. Si acierta, el término se "engancha" en el nodo. Si falla, el
 * nodo destella en rojo y el término vuelve al banco para reintentar.
 */
export default function MapaConceptual({ ejercicio, onCompletar, onSalir }: MapaConceptualProps) {
  const nodosVacios = useMemo(() => ejercicio.nodos.filter((n) => n.texto === null), [ejercicio])
  const [rellenos, setRellenos] = useState<Record<string, string>>({})
  const [terminoSeleccionado, setTerminoSeleccionado] = useState<string | null>(null)
  const [nodoError, setNodoError] = useState<string | null>(null)
  const [puntos, setPuntos] = useState(0)

  const [banco] = useState(() =>
    mezclar([
      ...nodosVacios.map((n) => n.respuestaCorrecta as string),
      ...(ejercicio.terminosDistractores ?? []),
    ]),
  )

  const terminosDisponibles = banco.filter((t) => !Object.values(rellenos).includes(t))
  const completado = Object.keys(rellenos).length === nodosVacios.length

  function tocarNodoVacio(nodoId: string, respuestaCorrecta: string) {
    if (!terminoSeleccionado || rellenos[nodoId]) return

    if (terminoSeleccionado === respuestaCorrecta) {
      const nuevosRellenos = { ...rellenos, [nodoId]: terminoSeleccionado }
      setRellenos(nuevosRellenos)
      setTerminoSeleccionado(null)
      const nuevosPuntos = puntos + PUNTOS_POR_ACIERTO
      setPuntos(nuevosPuntos)
      if (Object.keys(nuevosRellenos).length === nodosVacios.length) {
        setTimeout(() => onCompletar(nuevosPuntos), 600)
      }
    } else {
      setNodoError(nodoId)
      setTerminoSeleccionado(null)
      setTimeout(() => setNodoError(null), 500)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-bosque-panel rounded-2xl">
      <button onClick={onSalir} className="font-cuerpo text-xs text-marfil/50 mb-3">
        ← Salir
      </button>
      <h2 className="font-display text-xl mb-1">{ejercicio.titulo}</h2>
      <p className="font-cuerpo text-xs text-marfil/50 mb-4">
        Toca un término de abajo y luego el espacio vacío donde crees que corresponde.
      </p>

      <svg viewBox="0 0 420 300" className="w-full h-auto">
        {/* líneas de conexión padre-hijo */}
        {ejercicio.nodos
          .filter((n) => n.padreId)
          .map((n) => {
            const padre = ejercicio.nodos.find((p) => p.id === n.padreId)!
            return (
              <line
                key={`linea-${n.id}`}
                x1={padre.x}
                y1={padre.y}
                x2={n.x}
                y2={n.y}
                stroke="#2A4941"
                strokeWidth={2}
              />
            )
          })}

        {ejercicio.nodos.map((n) => {
          const esVacio = n.texto === null
          const valorRelleno = rellenos[n.id]
          const textoMostrado = esVacio ? valorRelleno : n.texto!
          const enError = nodoError === n.id
          const completadoAqui = esVacio && valorRelleno

          let relleno = '#16302B'
          let borde = '#2A4941'
          if (!esVacio) {
            relleno = '#1F3F38'
            borde = '#3A5A52'
          }
          if (esVacio && !valorRelleno) {
            borde = '#5FBEA8'
          }
          if (completadoAqui) {
            relleno = '#F0B429'
            borde = '#F0B429'
          }
          if (enError) {
            relleno = '#E8735A'
            borde = '#E8735A'
          }

          return (
            <g
              key={n.id}
              onClick={() => esVacio && !valorRelleno && tocarNodoVacio(n.id, n.respuestaCorrecta!)}
              style={{ cursor: esVacio && !valorRelleno && terminoSeleccionado ? 'pointer' : 'default' }}
            >
              <rect
                x={n.x - ANCHO_NODO / 2}
                y={n.y - ALTO_NODO / 2}
                width={ANCHO_NODO}
                height={ALTO_NODO}
                rx={8}
                fill={relleno}
                stroke={borde}
                strokeWidth={esVacio && !valorRelleno ? 1.5 : 2}
                strokeDasharray={esVacio && !valorRelleno ? '4 3' : undefined}
                style={{ transition: 'fill 0.3s, stroke 0.3s' }}
              />
              {textoMostrado ? (
                partirTexto(textoMostrado).map((linea, i, arr) => (
                  <text
                    key={i}
                    x={n.x}
                    y={n.y + (i - (arr.length - 1) / 2) * 11 + 3}
                    textAnchor="middle"
                    fontSize={n.id === 'centro' ? 9 : 8.5}
                    fill={completadoAqui ? '#16302B' : '#F2EFE4'}
                    fontFamily="Inter, sans-serif"
                  >
                    {linea}
                  </text>
                ))
              ) : (
                <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize={12} fill="#5FBEA8">
                  ?
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {!completado && (
        <div className="mt-5">
          <p className="font-cuerpo text-xs text-marfil/50 mb-2">Banco de términos</p>
          <div className="flex flex-wrap gap-2">
            {terminosDisponibles.map((termino) => (
              <button
                key={termino}
                onClick={() => setTerminoSeleccionado(terminoSeleccionado === termino ? null : termino)}
                className={`font-cuerpo text-xs rounded-full px-3 py-2 ${
                  terminoSeleccionado === termino ? 'bg-ambar text-bosque' : 'bg-bosque text-marfil/80'
                }`}
              >
                {termino}
              </button>
            ))}
          </div>
        </div>
      )}

      {completado && (
        <div className="mt-5 text-center">
          <p className="font-display text-lg text-ambar">¡Mapa completado! 🌳</p>
          <p className="font-cuerpo text-sm text-marfil/70">Ganaste {puntos} puntos.</p>
        </div>
      )}
    </div>
  )
}
