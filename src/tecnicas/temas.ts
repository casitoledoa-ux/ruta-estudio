export interface Tema {
  id: string
  nombre: string
}

// Cada tema corresponde a una "clase" específica del material subido. El Camino por
// Materia arma un nodo del mapa por cada uno de estos, con las preguntas etiquetadas
// bajo ese tema (ver el campo `tema` en cada pregunta de alternativasTTM.ts y
// casosClinicosTTM.ts). Para agregar un tema nuevo: agrégalo aquí y etiqueta preguntas
// con ese id en su campo `tema`.
export const TEMAS: Tema[] = [
  { id: 'anatomia-funcional', nombre: 'Anatomía Funcional ATM' },
  { id: 'control-motor', nombre: 'Control Motor y Reflejos' },
  { id: 'dolor-sensibilizacion', nombre: 'Dolor y Sensibilización' },
  { id: 'diagnosticos-articulares', nombre: 'Diagnósticos Articulares' },
  { id: 'diagnosticos-musculares', nombre: 'Diagnósticos Musculares' },
  { id: 'cefaleas-neuralgias', nombre: 'Cefaleas y Neuralgias' },
  { id: 'sueno-bruxismo', nombre: 'Sueño y Bruxismo' },
  { id: 'metodologia-oppera', nombre: 'Metodología y OPPERA' },
]
