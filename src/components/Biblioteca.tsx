import { useMemo, useState } from 'react'
import { alternativasTTM } from '../tecnicas/alternativasTTM'
import { casosClinicosTTM } from '../tecnicas/casosClinicosTTM'
import { TEMAS } from '../tecnicas/temas'

interface BibliotecaProps {
  onSalir: () => void
}

type Entrada =
  | { tipo: 'alternativa'; id: string; tema?: string; titulo: string; detalle: string }
  | { tipo: 'caso'; id: string; tema?: string; titulo: string; detalle: string }

function normalizar(texto: string): string {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Biblioteca de repaso: lista todas las preguntas (alternativas y casos clínicos)
 * agrupadas por tema, con un buscador libre. Es solo para leer/repasar — no tiene
 * puntaje ni corazones, para que se pueda usar como consulta rápida.
 */
export default function Biblioteca({ onSalir }: BibliotecaProps) {
  const [busqueda, setBusqueda] = useState('')
  const [temaExpandido, setTemaExpandido] = useState<string | null>(null)
  const [entradaAbierta, setEntradaAbierta] = useState<string | null>(null)

  const entradas: Entrada[] = useMemo(() => {
    const alt: Entrada[] = alternativasTTM.preguntas.map((p) => ({
      tipo: 'alternativa',
      id: p.id,
      tema: p.tema,
      titulo: p.enunciado,
      detalle: `${p.opciones.map((o, i) => `${i === p.indiceCorrecta ? '✓' : '·'} ${o}`).join('\n')}\n\n${p.explicacion}`,
    }))
    const casos: Entrada[] = casosClinicosTTM.preguntas.map((p) => ({
      tipo: 'caso',
      id: p.id,
      tema: p.tema,
      titulo: p.pregunta,
      detalle: `${p.caso ? p.caso + '\n\n' : ''}Pauta de corrección:\n${p.pauta.map((c) => `• ${c.texto} (${c.puntos} pts)`).join('\n')}`,
    }))
    return [...alt, ...casos]
  }, [])

  const filtradas = useMemo(() => {
    if (!busqueda.trim()) return entradas
    const q = normalizar(busqueda)
    return entradas.filter((e) => normalizar(e.titulo + ' ' + e.detalle).includes(q))
  }, [busqueda, entradas])

  return (
    <div className="max-w-lg mx-auto p-6 bg-bosque-panel rounded-2xl">
      <button onClick={onSalir} className="font-cuerpo text-xs text-marfil/50 mb-3">
        ← Salir
      </button>
      <h2 className="font-display text-xl mb-4">Biblioteca</h2>

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por palabra clave..."
        className="font-cuerpo w-full bg-bosque rounded-lg px-4 py-3 outline-none placeholder:text-marfil/40 mb-4"
      />

      {busqueda.trim() ? (
        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
          {filtradas.length === 0 && (
            <p className="font-cuerpo text-sm text-marfil/50">Sin resultados para "{busqueda}".</p>
          )}
          {filtradas.map((e) => (
            <EntradaItem
              key={e.id}
              entrada={e}
              abierta={entradaAbierta === e.id}
              onToggle={() => setEntradaAbierta(entradaAbierta === e.id ? null : e.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
          {TEMAS.map((tema) => {
            const deEsteTema = entradas.filter((e) => e.tema === tema.id)
            if (deEsteTema.length === 0) return null
            const expandido = temaExpandido === tema.id
            return (
              <div key={tema.id}>
                <button
                  onClick={() => setTemaExpandido(expandido ? null : tema.id)}
                  className="font-cuerpo w-full text-left text-sm bg-bosque rounded-lg px-4 py-3 flex justify-between items-center"
                >
                  <span>{tema.nombre}</span>
                  <span className="text-marfil/40 text-xs">{deEsteTema.length} · {expandido ? '−' : '+'}</span>
                </button>
                {expandido && (
                  <div className="flex flex-col gap-2 mt-2 mb-1 pl-2">
                    {deEsteTema.map((e) => (
                      <EntradaItem
                        key={e.id}
                        entrada={e}
                        abierta={entradaAbierta === e.id}
                        onToggle={() => setEntradaAbierta(entradaAbierta === e.id ? null : e.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function EntradaItem({ entrada, abierta, onToggle }: { entrada: Entrada; abierta: boolean; onToggle: () => void }) {
  return (
    <div className="bg-bosque rounded-lg p-3">
      <button onClick={onToggle} className="font-cuerpo text-xs text-left text-marfil/90 w-full">
        <span className="text-ambar mr-1">{entrada.tipo === 'alternativa' ? '☰' : '📝'}</span>
        {entrada.titulo}
      </button>
      {abierta && (
        <p className="font-cuerpo text-xs text-marfil/60 mt-2 whitespace-pre-line">{entrada.detalle}</p>
      )}
    </div>
  )
}
