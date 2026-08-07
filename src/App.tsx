import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './components/Login'
import SprintEstudio from './components/SprintEstudio'
import { mapaMental } from './tecnicas/mapaMental'
import { registrarSesionCompletada, obtenerProgreso } from './lib/progreso'
import { ProgresoUsuario } from './types'

export default function App() {
  const [sesionActiva, setSesionActiva] = useState(false)
  const [cargandoSesion, setCargandoSesion] = useState(true)
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

  // Cuando hay sesión activa, carga el progreso real guardado en Supabase
  useEffect(() => {
    if (!sesionActiva) return
    obtenerProgreso().then(setProgreso)
  }, [sesionActiva])

  async function manejarCompletar(puntos: number) {
    setGuardando(true)
    setErrorGuardado(null)
    try {
      const duracionTotal = mapaMental.etapas.reduce((sum, e) => sum + e.duracionSegundos, 0)
      await registrarSesionCompletada(mapaMental.id, duracionTotal, puntos)
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

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      {progreso && (
        <div className="font-dato text-sm text-marfil/70 mb-6">
          🔥 {progreso.rachaDias} {progreso.rachaDias === 1 ? 'día' : 'días'} · {progreso.puntosTotales} pts · nivel {progreso.nivel}
        </div>
      )}

      <div className="flex-1 flex items-center justify-center w-full">
        {!sesionTerminada ? (
          <SprintEstudio tecnica={mapaMental} onCompletar={manejarCompletar} />
        ) : (
          <div className="text-center">
            {guardando && <p className="font-cuerpo text-sm text-marfil/60 mb-3">Guardando tu progreso...</p>}
            {errorGuardado && <p className="font-cuerpo text-sm text-coral mb-3">{errorGuardado}</p>}
            <button
              onClick={() => setSesionTerminada(false)}
              className="font-cuerpo bg-menta text-bosque rounded-lg px-6 py-3"
            >
              Empezar otra ruta
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
