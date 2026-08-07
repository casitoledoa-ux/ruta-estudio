import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './components/Login'
import SprintEstudio from './components/SprintEstudio'
import CasoClinico from './components/CasoClinico'
import { mapaMental } from './tecnicas/mapaMental'
import { casosClinicosTTM } from './tecnicas/casosClinicosTTM'
import { registrarSesionCompletada, obtenerProgreso } from './lib/progreso'
import { ProgresoUsuario } from './types'

type TecnicaElegida = 'mapa-mental' | 'casos-clinicos' | null

export default function App() {
  const [sesionActiva, setSesionActiva] = useState(false)
  const [cargandoSesion, setCargandoSesion] = useState(true)
  const [tecnicaElegida, setTecnicaElegida] = useState<TecnicaElegida>(null)
  const [sesionTerminada, setSesionTerminada] = useState(false)
  const [progreso, setProgreso] = useState<ProgresoUsuario | null>(null)
  const [guardando, setGuardando] = useState(false)
  const [errorGuardado, setErrorGuardado] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSesionActiva(!!data.session)
      setCargandoSesion(false)
    })
  }, [])

  useEffect(() => {
    if (!sesionActiva) return
    obtenerProgreso().then(setProgreso)
  }, [sesionActiva])

  async function manejarCompletar(tecnicaId: string, duracionTotal: number, puntos: number) {
    setGuardando(true)
    setErrorGuardado(null)
    try {
      await registrarSesionCompletada(tecnicaId, duracionTotal, puntos)
      const progresoActualizado = await obtenerProgreso()
      setProgreso(progresoActualizado)
    } catch (e) {
      setErrorGuardado('No se pudo guardar tu progreso. Revisa tu conexión e inténtalo de nuevo.')
    } finally {
      setGuardando(false)
      setSesionTerminada(true)
    }
  }

  if (cargandoSesion) {
    return <div className="min-h-screen flex items-center justify-center font-cuerpo text-marfil/60">Cargando...</div>
  }

  if (!sesionActiva) {
    return <Login onIngreso={() => setSesionActiva(true)} />
  }

  function volverAlInicio() {
    setTecnicaElegida(null)
    setSesionTerminada(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      {progreso && (
        <div className="font-dato text-sm text-marfil/70 mb-6">
          🔥 {progreso.rachaDias} {progreso.rachaDias === 1 ? 'día' : 'días'} · {progreso.puntosTotales} pts · nivel {progreso.nivel}
        </div>
      )}

      <div className="flex-1 flex items-center justify-center w-full">
        {!tecnicaElegida && (
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={() => setTecnicaElegida('mapa-mental')}
              className="font-cuerpo bg-bosque-panel rounded-xl px-5 py-4 text-left"
            >
              <span className="block font-display text-lg text-ambar">Mapa Mental</span>
              <span className="block text-xs text-marfil/60 mt-1">Explorar un tema — 4 etapas</span>
            </button>
            <button
              onClick={() => setTecnicaElegida('casos-clinicos')}
              className="font-cuerpo bg-bosque-panel rounded-xl px-5 py-4 text-left"
            >
              <span className="block font-display text-lg text-ambar">Casos Clínicos TTM</span>
              <span className="block text-xs text-marfil/60 mt-1">Evaluar hipótesis — razonamiento clínico</span>
            </button>
          </div>
        )}

        {tecnicaElegida === 'mapa-mental' && !sesionTerminada && (
          <SprintEstudio
            tecnica={mapaMental}
            onCompletar={(puntos) => {
              const duracionTotal = mapaMental.etapas.reduce((s, e) => s + e.duracionSegundos, 0)
              manejarCompletar(mapaMental.id, duracionTotal, puntos)
            }}
          />
        )}

        {tecnicaElegida === 'casos-clinicos' && !sesionTerminada && (
          <CasoClinico
            sesion={casosClinicosTTM}
            onCompletar={(puntos) => {
              const duracionTotal = casosClinicosTTM.preguntas.reduce((s, p) => s + p.duracionSegundos, 0)
              manejarCompletar(casosClinicosTTM.id, duracionTotal, puntos)
            }}
          />
        )}

        {sesionTerminada && (
          <div className="text-center">
            {guardando && <p className="font-cuerpo text-sm text-marfil/60 mb-3">Guardando tu progreso...</p>}
            {errorGuardado && <p className="font-cuerpo text-sm text-coral mb-3">{errorGuardado}</p>}
            <button
              onClick={volverAlInicio}
              className="font-cuerpo bg-menta text-bosque rounded-lg px-6 py-3"
            >
              Elegir otra técnica
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
