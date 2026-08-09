import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './components/Login'
import MapaConceptual from './components/MapaConceptual'
import CrearPersonaje from './components/CrearPersonaje'
import AvatarExplorador, { ColorAvatar, GeneroAvatar } from './components/AvatarExplorador'
import MapaLecciones from './components/MapaLecciones'
import LeccionJuego from './components/LeccionJuego'
import { mapasConceptuales } from './tecnicas/mapaConceptualTTM'
import { MapaConceptualEjercicio } from './types'
import { lecciones } from './tecnicas/lecciones'
import { registrarSesionCompletada, registrarLeccionCompletada, obtenerProgreso, guardarPerfil } from './lib/progreso'
import { ProgresoUsuario } from './types'

type Pantalla = 'mapa' | 'leccion' | 'practica-libre'

export default function App() {
  const [sesionActiva, setSesionActiva] = useState(false)
  const [cargandoSesion, setCargandoSesion] = useState(true)
  const [pantalla, setPantalla] = useState<Pantalla>('mapa')
  const [indiceLeccion, setIndiceLeccion] = useState(0)
  const [progreso, setProgreso] = useState<(ProgresoUsuario & { leccionActual: number }) | null>(null)
  const [sesionMapaMentalTerminada, setSesionMapaMentalTerminada] = useState(false)
  const [guardandoPerfil, setGuardandoPerfil] = useState(false)
  const [mapaElegido, setMapaElegido] = useState<MapaConceptualEjercicio | null>(null)
  const [cargandoProgreso, setCargandoProgreso] = useState(true)
  const [errorPerfil, setErrorPerfil] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSesionActiva(!!data.session)
      setCargandoSesion(false)
    })
  }, [])

  useEffect(() => {
    if (!sesionActiva) return
    cargarProgreso()
  }, [sesionActiva])

  async function cargarProgreso() {
    const p = await obtenerProgreso()
    setProgreso(p as any)
    setCargandoProgreso(false)
  }

  if (cargandoSesion || (sesionActiva && cargandoProgreso)) {
    return <div className="min-h-screen flex items-center justify-center font-cuerpo text-marfil/60">Cargando...</div>
  }

  if (!sesionActiva) {
    return <Login onIngreso={() => setSesionActiva(true)} />
  }

  const leccionActual = progreso?.leccionActual ?? 0

  if (!progreso || !progreso.nombreJugador) {
    return (
      <CrearPersonaje
        guardando={guardandoPerfil}
        error={errorPerfil}
        onConfirmar={async (nombre, genero, color) => {
          setGuardandoPerfil(true)
          setErrorPerfil(null)
          try {
            await guardarPerfil(nombre, genero, color)
            await cargarProgreso()
          } catch (e) {
            setErrorPerfil('No se pudo guardar el personaje. Revisa que hayas corrido la migración SQL de avatar en Supabase.')
          } finally {
            setGuardandoPerfil(false)
          }
        }}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      {progreso && (
        <div className="flex items-center gap-3 mb-6">
          <AvatarExplorador
            genero={(progreso.avatarGenero as GeneroAvatar) ?? 'nino'}
            color={(progreso.avatarColor as ColorAvatar) ?? 'ambar'}
            size={44}
          />
          <div>
            <p className="font-cuerpo text-sm text-marfil">{progreso.nombreJugador}</p>
            <p className="font-dato text-xs text-marfil/60">
              🔥 {progreso.rachaDias} {progreso.rachaDias === 1 ? 'día' : 'días'} · {progreso.puntosTotales} pts · nivel {progreso.nivel}
            </p>
          </div>
        </div>
      )}

      {pantalla === 'mapa' && (
        <div className="w-full">
          <MapaLecciones
            lecciones={lecciones}
            leccionActual={leccionActual}
            onElegir={(i) => {
              setIndiceLeccion(i)
              setPantalla('leccion')
            }}
          />
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                const aleatorio = mapasConceptuales[Math.floor(Math.random() * mapasConceptuales.length)]
                setMapaElegido(aleatorio)
                setPantalla('practica-libre')
              }}
              className="font-cuerpo text-sm bg-bosque-panel text-marfil/70 rounded-lg px-5 py-3"
            >
              Práctica libre: Mapa Conceptual
            </button>
          </div>
        </div>
      )}

      {pantalla === 'leccion' && (
        <LeccionJuego
          leccion={lecciones[indiceLeccion]}
          onCompletar={async (puntos) => {
            await registrarLeccionCompletada(indiceLeccion, puntos)
            await cargarProgreso()
          }}
          onSalir={() => setPantalla('mapa')}
        />
      )}

      {pantalla === 'practica-libre' && mapaElegido && !sesionMapaMentalTerminada && (
        <MapaConceptual
          ejercicio={mapaElegido}
          onSalir={() => setPantalla('mapa')}
          onCompletar={async (puntos) => {
            await registrarSesionCompletada(mapaElegido.id, 0, puntos)
            await cargarProgreso()
            setSesionMapaMentalTerminada(true)
          }}
        />
      )}


      {pantalla === 'practica-libre' && sesionMapaMentalTerminada && (
        <div className="text-center">
          <button
            onClick={() => {
              setSesionMapaMentalTerminada(false)
              setPantalla('mapa')
            }}
            className="font-cuerpo bg-menta text-bosque rounded-lg px-6 py-3"
          >
            Volver al mapa
          </button>
        </div>
      )}
    </div>
  )
}
