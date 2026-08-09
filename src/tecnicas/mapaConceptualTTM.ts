import { MapaConceptualEjercicio } from '../types'

// Varios mapas conceptuales sobre distintos temas del material subido. Cada vez que el
// usuario entra a "Práctica libre", se elige uno al azar (ver App.tsx) para que el
// contenido vaya variando.
//
// Los distractores están elegidos a propósito para ser "de la misma familia" que los
// términos correctos (ej. otro músculo, otro núcleo, otra patología articular) — así el
// ejercicio no se resuelve por descarte obvio, hay que saber realmente cuál va dónde.

const sistemaCraneoCervicoMandibular: MapaConceptualEjercicio = {
  id: 'mapa-sistema-general',
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
    { id: 'pterigoideos', texto: null, respuestaCorrecta: 'Pterigoideo medial', x: 250, y: 200, padreId: 'musculatura' },
    { id: 'atlas', texto: 'Atlas (C1)', x: 295, y: 200, padreId: 'cervical' },
    { id: 'axis', texto: null, respuestaCorrecta: 'Axis (C2)', x: 335, y: 260, padreId: 'cervical' },
    { id: 'ligamento-nucal', texto: null, respuestaCorrecta: 'Ligamento nucal', x: 375, y: 200, padreId: 'cervical' },
  ],
  // Distractores de la misma familia: otro músculo elevador que no aparece en el mapa,
  // y una estructura cervical/ligamentosa que también podría "sonar" plausible.
  terminosDistractores: ['Pterigoideo lateral', 'Ligamento transverso del atlas'],
}

const musculaturaMasticatoria: MapaConceptualEjercicio = {
  id: 'mapa-musculatura',
  titulo: 'Musculatura Masticatoria',
  nodos: [
    { id: 'centro', texto: 'Musculatura Masticatoria', x: 210, y: 30, padreId: null },
    { id: 'elevadores', texto: 'Músculos Elevadores', x: 120, y: 120, padreId: 'centro' },
    { id: 'depresores', texto: 'Músculos Depresores', x: 300, y: 120, padreId: 'centro' },
    { id: 'masetero', texto: 'Masetero', x: 60, y: 210, padreId: 'elevadores' },
    { id: 'temporal', texto: null, respuestaCorrecta: 'Temporal', x: 120, y: 270, padreId: 'elevadores' },
    { id: 'pter-medial', texto: null, respuestaCorrecta: 'Pterigoideo medial', x: 180, y: 210, padreId: 'elevadores' },
    { id: 'digastrico', texto: 'Digástrico', x: 250, y: 210, padreId: 'depresores' },
    { id: 'milohioideo', texto: null, respuestaCorrecta: 'Milohioideo', x: 300, y: 270, padreId: 'depresores' },
    { id: 'genihioideo', texto: null, respuestaCorrecta: 'Genihioideo', x: 350, y: 210, padreId: 'depresores' },
  ],
  // Distractores: otro músculo elevador real (no incluido aquí) y un músculo cervical
  // que suele confundirse por estar "cerca" del sistema masticatorio pero no lo es.
  terminosDistractores: ['Pterigoideo lateral', 'Esternocleidomastoideo'],
}

const sistemaTrigeminal: MapaConceptualEjercicio = {
  id: 'mapa-trigeminal',
  titulo: 'Sistema Trigeminal Sensitivo',
  nodos: [
    { id: 'centro', texto: 'Sistema Trigeminal Sensitivo', x: 210, y: 30, padreId: null },
    { id: 'receptor', texto: 'Receptor', x: 80, y: 120, padreId: 'centro' },
    { id: 'ganglio', texto: 'Ganglio', x: 210, y: 120, padreId: 'centro' },
    { id: 'nucleo-seg', texto: 'Núcleo Segmentario', x: 340, y: 120, padreId: 'centro' },
    { id: 'nucleo-mesenc', texto: 'Núcleo Mesencefálico', x: 260, y: 210, padreId: 'nucleo-seg' },
    { id: 'nucleo-principal', texto: null, respuestaCorrecta: 'Núcleo Sensitivo Principal', x: 340, y: 270, padreId: 'nucleo-seg' },
    { id: 'nucleo-espinal', texto: null, respuestaCorrecta: 'Núcleo Espinal', x: 400, y: 210, padreId: 'nucleo-seg' },
    { id: 'subnucleo-oral', texto: 'Subnúcleo Oral', x: 370, y: 300, padreId: 'nucleo-espinal' },
    { id: 'subnucleo-interpolar', texto: null, respuestaCorrecta: 'Subnúcleo Interpolar', x: 400, y: 330, padreId: 'nucleo-espinal' },
  ],
  // Distractores: otros núcleos/estructuras reales del sistema trigeminal, pero que no
  // corresponden a estos espacios en particular.
  terminosDistractores: ['Núcleo Motor', 'Tálamo'],
}

const diagnosticosArticulares: MapaConceptualEjercicio = {
  id: 'mapa-diagnosticos-articulares',
  titulo: 'Trastornos Funcionales de las ATM',
  nodos: [
    { id: 'centro', texto: 'Trastornos Funcionales ATM', x: 210, y: 30, padreId: null },
    { id: 'condilo-disco', texto: 'Alt. Complejo Cóndilo-Disco', x: 80, y: 120, padreId: 'centro' },
    { id: 'incompatibilidad', texto: 'Incompatibilidad Estructural', x: 210, y: 120, padreId: 'centro' },
    { id: 'inflamatorios', texto: 'Trastornos Inflamatorios', x: 340, y: 120, padreId: 'centro' },
    { id: 'desplazamiento', texto: 'Desplazamiento discal', x: 30, y: 210, padreId: 'condilo-disco' },
    { id: 'bloqueo-intermitente', texto: null, respuestaCorrecta: 'Bloqueo intermitente', x: 80, y: 270, padreId: 'condilo-disco' },
    { id: 'sin-reduccion', texto: null, respuestaCorrecta: 'Sin reducción', x: 130, y: 210, padreId: 'condilo-disco' },
    { id: 'alt-morfologicas', texto: 'Alteraciones morfológicas', x: 170, y: 210, padreId: 'incompatibilidad' },
    { id: 'adherencias', texto: null, respuestaCorrecta: 'Adherencias y adhesiones', x: 210, y: 270, padreId: 'incompatibilidad' },
    { id: 'subluxacion', texto: null, respuestaCorrecta: 'Subluxación articular', x: 250, y: 210, padreId: 'incompatibilidad' },
    { id: 'sinovitis', texto: 'Sinovitis / Capsulitis', x: 300, y: 210, padreId: 'inflamatorios' },
    { id: 'retrodiscitis', texto: null, respuestaCorrecta: 'Retrodiscitis', x: 340, y: 270, padreId: 'inflamatorios' },
    { id: 'osteoartritis', texto: null, respuestaCorrecta: 'Osteoartritis', x: 385, y: 210, padreId: 'inflamatorios' },
  ],
  // Distractores: otros diagnósticos reales de la misma clasificación, pero que
  // pertenecen a una rama distinta de la que se muestra vacía.
  terminosDistractores: ['Luxación articular espontánea', 'Artritis juvenil idiopática'],
}

export const mapasConceptuales: MapaConceptualEjercicio[] = [
  sistemaCraneoCervicoMandibular,
  musculaturaMasticatoria,
  sistemaTrigeminal,
  diagnosticosArticulares,
]

// Se mantiene por compatibilidad si algo aún importa el mapa único.
export const mapaConceptualTTM = sistemaCraneoCervicoMandibular
