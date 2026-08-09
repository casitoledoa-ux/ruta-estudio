import { supabase } from '../supabaseClient'
import { ProgresoUsuario } from '../types'

/**
 * Se llama cada vez que el usuario termina una ruta de estudio completa.
 * Hace dos cosas:
 * 1. Guarda un registro histórico de la sesión (tabla sesiones_estudio).
 * 2. Actualiza el resumen de progreso del usuario (tabla progreso_usuario):
 *    suma los puntos, sube de nivel si corresponde, y actualiza la racha diaria.
 */
export async function registrarSesionCompletada(
  tecnicaId: string,
  duracionSegundos: number,
  puntosGanados: number,
) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No hay usuario con sesión activa')

  // 1. Guardar el historial de la sesión
  const { error: errorSesion } = await supabase.from('sesiones_estudio').insert({
    usuario_id: user.id,
    tecnica_id: tecnicaId,
    duracion_segundos: duracionSegundos,
    puntos_ganados: puntosGanados,
  })
  if (errorSesion) throw errorSesion

  // 2. Leer el progreso actual para calcular la racha y el nuevo total
  const progresoActual = await obtenerProgreso()

  const hoy = new Date().toDateString()
  const ultimaFecha = progresoActual?.actualizadoEn ? new Date(progresoActual.actualizadoEn).toDateString() : null
  const ayer = new Date(Date.now() - 86_400_000).toDateString()

  let nuevaRacha = 1
  if (ultimaFecha === hoy) {
    // ya estudió hoy antes: la racha no cambia
    nuevaRacha = progresoActual?.rachaDias ?? 1
  } else if (ultimaFecha === ayer) {
    // estudió ayer: la racha sigue
    nuevaRacha = (progresoActual?.rachaDias ?? 0) + 1
  }
  // si no fue ni hoy ni ayer, la racha se reinicia a 1 (valor por defecto arriba)

  const nuevosPuntos = (progresoActual?.puntosTotales ?? 0) + puntosGanados
  const nuevoNivel = Math.floor(nuevosPuntos / 100) + 1

  // 3. Guardar el progreso actualizado (upsert: crea la fila si es la primera vez)
  const { error: errorProgreso } = await supabase.from('progreso_usuario').upsert({
    usuario_id: user.id,
    racha_dias: nuevaRacha,
    puntos_totales: nuevosPuntos,
    nivel: nuevoNivel,
    actualizado_en: new Date().toISOString(),
  })
  if (errorProgreso) throw errorProgreso
}

/** Lee el resumen de progreso del usuario actual (o null si nunca ha completado una sesión). */
export async function obtenerProgreso(): Promise<(ProgresoUsuario & { actualizadoEn: string; leccionActual: number; nombreJugador: string | null; avatarGenero: string | null; avatarColor: string | null }) | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('progreso_usuario')
    .select('*')
    .eq('usuario_id', user.id)
    .maybeSingle()

  if (error || !data) return null

  return {
    usuarioId: data.usuario_id,
    rachaDias: data.racha_dias,
    puntosTotales: data.puntos_totales,
    nivel: data.nivel,
    leccionActual: data.leccion_actual ?? 0,
    leccionActualMateria: data.leccion_actual_materia ?? 0,
    nombreJugador: data.nombre_jugador ?? null,
    avatarGenero: data.avatar_genero ?? null,
    avatarColor: data.avatar_color ?? null,
    actualizadoEn: data.actualizado_en,
  }
}

/**
 * Se llama cuando el usuario termina una lección del mapa tipo Duolingo con al
 * menos 1 corazón. Guarda el historial, suma puntos/racha (igual que las técnicas
 * anteriores) y avanza leccion_actual — solo si la lección jugada era justo la
 * próxima pendiente, para no permitir "saltarse" lecciones bloqueadas.
 */
export async function registrarLeccionCompletada(
  indiceLeccion: number,
  puntosGanados: number,
  camino: 'mixto' | 'materia' = 'mixto',
) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No hay usuario con sesión activa')

  const { error: errorSesion } = await supabase.from('sesiones_estudio').insert({
    usuario_id: user.id,
    tecnica_id: `leccion-${camino}-${indiceLeccion + 1}`,
    duracion_segundos: null,
    puntos_ganados: puntosGanados,
  })
  if (errorSesion) throw errorSesion

  const progresoActual = await obtenerProgreso()

  const hoy = new Date().toDateString()
  const ultimaFecha = progresoActual?.actualizadoEn ? new Date(progresoActual.actualizadoEn).toDateString() : null
  const ayer = new Date(Date.now() - 86_400_000).toDateString()

  let nuevaRacha = 1
  if (ultimaFecha === hoy) {
    nuevaRacha = progresoActual?.rachaDias ?? 1
  } else if (ultimaFecha === ayer) {
    nuevaRacha = (progresoActual?.rachaDias ?? 0) + 1
  }

  const nuevosPuntos = (progresoActual?.puntosTotales ?? 0) + puntosGanados
  const nuevoNivel = Math.floor(nuevosPuntos / 100) + 1
  const leccionActualPrevia = progresoActual?.leccionActual ?? 0
  const leccionActualMateriaPrevia = progresoActual?.leccionActualMateria ?? 0

  const actualizacion: Record<string, unknown> = {
    usuario_id: user.id,
    racha_dias: nuevaRacha,
    puntos_totales: nuevosPuntos,
    nivel: nuevoNivel,
    leccion_actual: leccionActualPrevia,
    leccion_actual_materia: leccionActualMateriaPrevia,
    actualizado_en: new Date().toISOString(),
  }
  if (camino === 'mixto' && indiceLeccion === leccionActualPrevia) {
    actualizacion.leccion_actual = leccionActualPrevia + 1
  }
  if (camino === 'materia' && indiceLeccion === leccionActualMateriaPrevia) {
    actualizacion.leccion_actual_materia = leccionActualMateriaPrevia + 1
  }

  const { error: errorProgreso } = await supabase.from('progreso_usuario').upsert(actualizacion)
  if (errorProgreso) throw errorProgreso
}

/**
 * Guarda el nombre y avatar elegidos en la pantalla de creación de personaje.
 * Se llama una sola vez, la primera vez que el usuario entra a la app.
 */
export async function guardarPerfil(nombre: string, genero: string, color: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No hay usuario con sesión activa')

  const progresoActual = await obtenerProgreso()

  const { error } = await supabase.from('progreso_usuario').upsert({
    usuario_id: user.id,
    racha_dias: progresoActual?.rachaDias ?? 0,
    puntos_totales: progresoActual?.puntosTotales ?? 0,
    nivel: progresoActual?.nivel ?? 1,
    leccion_actual: progresoActual?.leccionActual ?? 0,
    nombre_jugador: nombre,
    avatar_genero: genero,
    avatar_color: color,
    actualizado_en: new Date().toISOString(),
  })
  if (error) throw error
}
