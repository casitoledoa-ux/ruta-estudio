import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './components/Login'
import SprintEstudio from './components/SprintEstudio'
import { mapaMental } from './tecnicas/mapaMental'

export default function App() {
  const [sesionActiva, setSesionActiva] = useState(false)
  const [cargandoSesion, setCargandoSesion] = useState(true)
  const [sesionTerminada, setSesionTerminada] = useState(false)

  // Al cargar la app, revisa si ya hay una sesión guardada (para no pedir login cada vez)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSesionActiva(!!data.session)
      setCargandoSesion(false)
    })
  }, [])

  if (cargandoSesion) {
    return <div className="min-h-screen flex items-center justify-center font-cuerpo text-marfil/60">Cargando...</div>
  }

  if (!sesionActiva) {
    return <Login onIngreso={() => setSesionActiva(true)} />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {!sesionTerminada ? (
        <SprintEstudio
          tecnica={mapaMental}
          onCompletar={(puntos) => {
            // TODO Fase 2: guardar `puntos` en la tabla `sesiones_estudio` de Supabase
            // y sumarlos a `progreso_usuario`. Por ahora solo marca la sesión como terminada.
            console.log('Puntos ganados en esta sesión:', puntos)
            setSesionTerminada(true)
          }}
        />
      ) : (
        <button
          onClick={() => setSesionTerminada(false)}
          className="font-cuerpo bg-menta text-bosque rounded-lg px-6 py-3"
        >
          Empezar otra ruta
        </button>
      )}
    </div>
  )
}
