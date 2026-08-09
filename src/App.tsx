import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './components/Login'
import MapaConceptual from './components/MapaConceptual'
import CrearPersonaje from './components/CrearPersonaje'
import AvatarExplorador, { ColorAvatar, GeneroAvatar } from './components/AvatarExplorador'
import MapaLecciones from './components/MapaLecciones'
import LeccionJuego from './components/LeccionJuego'
import Flashcards from './components/Flashcards'
import Biblioteca from './components/Biblioteca'
import { mapasConceptuales } from './tecnicas/mapaConceptualTTM'
import { lecciones } from './tecnicas/lecciones'
import { leccionesPorMateria } from './tecnicas/caminoPorMateria'
import { flashcardsTTM } from './tecnicas/flashcardsTTM'
import { registrarSesionCompletada, registrarLeccionCompletada, obtenerProgreso, guardarPerfil } from './lib/progreso'
import { ProgresoUsuario, MapaConceptualEjercicio } from './types'

type Pantalla = 'inicio' | 'mapa' | 'leccion' | 'practica-libre' | 'flashcards' | 'biblioteca'
type Camino = 'mixto' | 'materia'

export default function App() {
  const [sesionActiva, setSesionActiva] = useState(false)
  const [cargandoSesion, setCargandoSesion] = useState(true)
  const [pantalla, setPantalla] = useState<Pantalla>('inicio')
  const [caminoActivo, setCaminoActivo] = useState<Camino>('mixto')
  const [indiceLeccion, setIndiceLeccion] = useState(0)
  const [progreso, setProgreso] = useState<(ProgresoUsuario & { leccionActual: number; leccionActualMateria: number }) | null>(null)
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

  const leccionesActivas = caminoActivo === 'mixto' ? lecciones : leccionesPorMateria
  const leccionActualActiva = caminoActivo === 'mixto' ? progreso.leccionActual : progreso.leccionActualMateria

  function volverAlInicio() {
    setPantalla('inicio')
    setSesionMapaMentalTerminada(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
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

      {pantalla === 'inicio' && (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => {
              setCaminoActivo('mixto')
              setPantalla('mapa')
            }}
            className="font-cuerpo bg-bosque-panel rounded-xl px-5 py-4 text-left"
          >
            <span className="block font-display text-lg text-ambar">Camino Mixto</span>
            <span className="block text-xs text-marfil/60 mt-1">Lecciones con todos los temas mezclados</span>
          </button>
          <button
            onClick={() => {
              setCaminoActivo('materia')
              setPantalla('mapa')
            }}
            className="font-cuerpo bg-bosque-panel rounded-xl px-5 py-4 text-left"
          >
            <span className="block font-display text-lg text-ambar">Camino por Materia</span>
            <span className="block text-xs text-marfil/60 mt-1">Un nodo por cada clase específica</span>
          </button>
          <button
            onClick={() => {
              const aleatorio = mapasConceptuales[Math.floor(Math.random() * mapasConceptuales.length)]
              setMapaElegido(aleatorio)
              setPantalla('practica-libre')
            }}
            className="font-cuerpo bg-bosque-panel rounded-xl px-5 py-4 text-left"
          >
            <span className="block font-display text-lg text-ambar">Mapa Conceptual</span>
            <span className="block text-xs text-marfil/60 mt-1">Rellena los términos que faltan</span>
          </button>
          <button
            onClick={() => setPantalla('flashcards')}
            className="font-cuerpo bg-bosque-panel rounded-xl px-5 py-4 text-left"
          >
            <span className="block font-display text-lg text-ambar">Tarjetas de Estudio</span>
            <span className="block text-xs text-marfil/60 mt-1">Repasa términos y conceptos clave</span>
          </button>
          <button
            onClick={() => setPantalla('biblioteca')}
            className="font-cuerpo bg-bosque-panel rounded-xl px-5 py-4 text-left"
          >
            <span className="block font-display text-lg text-ambar">Biblioteca</span>
            <span className="block text-xs text-marfil/60 mt-1">Busca y repasa todo el contenido</span>
          </button>
        </div>
      )}

      {pantalla === 'mapa' && (
        <div className="w-full">
          <button onClick={volverAlInicio} className="font-cuerpo text-xs text-marfil/50 mb-4 block mx-auto">
            ← Volver al inicio
          </button>
          <MapaLecciones
            lecciones={leccionesActivas}
            leccionActual={leccionActualActiva}
            onElegir={(i) => {
              setIndiceLeccion(i)
              setPantalla('leccion')
            }}
          />
        </div>
      )}

      {pantalla === 'leccion' && (
        <LeccionJuego
          leccion={leccionesActivas[indiceLeccion]}
          onCompletar={async (puntos) => {
            await registrarLeccionCompletada(indiceLeccion, puntos, caminoActivo)
            await cargarProgreso()
          }}
          onSalir={() => setPantalla('mapa')}
        />
      )}

      {pantalla === 'practica-libre' && mapaElegido && !sesionMapaMentalTerminada && (
        <MapaConceptual
          ejercicio={mapaElegido}
          onSalir={volverAlInicio}
          onCompletar={async (puntos) => {
            await registrarSesionCompletada(mapaElegido.id, 0, puntos)
            await cargarProgreso()
            setSesionMapaMentalTerminada(true)
          }}
        />
      )}

      {pantalla === 'practica-libre' && sesionMapaMentalTerminada && (
        <div className="text-center">
          <button onClick={volverAlInicio} className="font-cuerpo bg-menta text-bosque rounded-lg px-6 py-3">
            Volver al inicio
          </button>
        </div>
      )}

      {pantalla === 'flashcards' && (
        <Flashcards
          mazoInicial={flashcardsTTM}
          onSalir={volverAlInicio}
          onCompletar={async (puntos) => {
            await registrarSesionCompletada('flashcards', 0, puntos)
            await cargarProgreso()
          }}
        />
      )}

      {pantalla === 'biblioteca' && <Biblioteca onSalir={volverAlInicio} />}
    </div>
  )
}

