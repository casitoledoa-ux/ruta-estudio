import { MapaConceptualEjercicio } from '../types'

// Mapa conceptual del sistema cráneo-cérvico-mandibular. Los nodos con "texto" ya
// vienen completados; los nodos con texto: null son los que el usuario debe rellenar
// arrastrando/tocando el término correcto desde el banco.
// Para armar un mapa nuevo sobre otro tema: copia este patrón, cambia los nodos y
// las coordenadas (x,y dentro de un lienzo de 420 x 300).
export const mapaConceptualTTM: MapaConceptualEjercicio = {
  id: 'mapa-conceptual-ttm',
  titulo: 'Sistema Cráneo-Cérvico-Mandibular',
  nodos: [
    { id: 'centro', texto: 'Sistema Cráneo-Cérvico-Mandibular', x: 210, y: 30, padreId: null },

    { id: 'atm', texto: 'ATM', x: 85, y: 120, padreId: 'centro' },
    { id: 'musculatura', texto: 'Musculatura', x: 210, y: 120, padreId: 'centro' },
    { id: 'cervical', texto: 'Columna Cervical', x: 335, y: 120, padreId: 'centro' },

    { id: 'condilo', texto: 'Cóndilo mandibular', x: 45, y: 200, padreId: 'atm' },
    { id: 'disco', texto: null, respuestaCorrecta: 'Disco articular', x: 85, y: 260, padreId: 'atm' },
    { id: 'fosa', texto: null, respuestaCorrecta: 'Fosa mandibular', x: 125, y: 200, padreId: 'atm' },

    { id: 'masetero', texto: 'Masetero', x: 170, y: 200, padreId: 'musculatura' },
    { id: 'temporal', texto: null, respuestaCorrecta: 'Temporal', x: 210, y: 260, padreId: 'musculatura' },
    { id: 'pterigoideos', texto: null, respuestaCorrecta: 'Pterigoideos', x: 250, y: 200, padreId: 'musculatura' },

    { id: 'atlas', texto: 'Atlas (C1)', x: 295, y: 200, padreId: 'cervical' },
    { id: 'axis', texto: null, respuestaCorrecta: 'Axis (C2)', x: 335, y: 260, padreId: 'cervical' },
    { id: 'ligamento-nucal', texto: null, respuestaCorrecta: 'Ligamento nucal', x: 375, y: 200, padreId: 'cervical' },
  ],
  // Términos que no pertenecen a ningún espacio vacío de este mapa (para poner a prueba
  // que el usuario realmente reconoce el término, no solo que rellena por descarte).
  terminosDistractores: ['Reflejo miotático', 'Cóndilo bífido'],
}
