interface SenderoRutaProps {
  totalParadas: number
  paradaActual: number // índice 0-based de la etapa activa
}

interface Arbol {
  x: number
  y: number
  escala: number
  tono: string
  grupo: number // a qué etapa pertenece este árbol
}

// Posiciones fijas de los árboles (a mano, para que la escena se vea intencional
// y no aleatoria). Repartidos en 4 grupos = 4 etapas de la técnica piloto.
// Si en el futuro una técnica tiene más/menos etapas, esta lista se puede generar
// dinámicamente, pero para el MVP basta con esto.
const ARBOLES: Arbol[] = [
  { x: 55, y: 175, escala: 1.0, tono: '#3A6B58', grupo: 0 },
  { x: 340, y: 170, escala: 1.05, tono: '#345F4E', grupo: 0 },
  { x: 90, y: 150, escala: 0.8, tono: '#2E5646', grupo: 0 },
  { x: 305, y: 145, escala: 0.85, tono: '#2A5142', grupo: 0 },

  { x: 40, y: 120, escala: 0.75, tono: '#2A5142', grupo: 1 },
  { x: 360, y: 115, escala: 0.7, tono: '#26493C', grupo: 1 },
  { x: 115, y: 105, escala: 0.6, tono: '#234539', grupo: 1 },
  { x: 280, y: 100, escala: 0.65, tono: '#234539', grupo: 1 },

  { x: 70, y: 80, escala: 0.55, tono: '#1F3E33', grupo: 2 },
  { x: 330, y: 78, escala: 0.5, tono: '#1C3830', grupo: 2 },
  { x: 145, y: 65, escala: 0.42, tono: '#1A342C', grupo: 2 },
  { x: 255, y: 62, escala: 0.45, tono: '#1A342C', grupo: 2 },

  { x: 100, y: 40, escala: 0.32, tono: '#16302B', grupo: 3 },
  { x: 300, y: 38, escala: 0.3, tono: '#16302B', grupo: 3 },
  { x: 175, y: 25, escala: 0.24, tono: '#132922', grupo: 3 },
  { x: 225, y: 24, escala: 0.24, tono: '#132922', grupo: 3 },
]

function Arbolito({ arbol, factor, opacidad }: { arbol: Arbol; factor: number; opacidad: number }) {
  const s = arbol.escala * factor
  return (
    <g
      transform={`translate(${arbol.x}, ${arbol.y}) scale(${s})`}
      opacity={opacidad}
      style={{ transition: 'opacity 1.1s ease-out, transform 1.1s ease-out' }}
    >
      {/* tronco */}
      <rect x={-2.5} y={0} width={5} height={14} fill="#3E2C1E" />
      {/* copa: tres capas apiladas tipo pino */}
      <path d="M 0 -46 L -16 -22 L 16 -22 Z" fill={arbol.tono} />
      <path d="M 0 -34 L -19 -6 L 19 -6 Z" fill={arbol.tono} />
      <path d="M 0 -20 L -22 8 L 22 8 Z" fill={arbol.tono} />
      {/* toque de luz para dar volumen */}
      <path d="M 0 -46 L -7 -22 L 0 -22 Z" fill="#FFFFFF" opacity={0.12} />
    </g>
  )
}

/**
 * Escena del "bosque que crece contigo": un sendero de tierra que se interna
 * en el bosque. Los árboles de cada tramo (grupo = etapa) van creciendo desde
 * brote hasta árbol completo a medida que avanzas en la ruta de estudio.
 */
export default function SenderoRuta({ totalParadas, paradaActual }: SenderoRutaProps) {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-48" role="img" aria-label={`Progreso: etapa ${paradaActual + 1} de ${totalParadas}`}>
      <defs>
        <linearGradient id="cieloNiebla" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#274F44" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#16302B" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="senderoTierra" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8935A" />
          <stop offset="100%" stopColor="#8C6B3E" />
        </linearGradient>
      </defs>

      {/* fondo con neblina hacia el fondo del bosque */}
      <rect x={0} y={0} width={400} height={220} fill="url(#cieloNiebla)" />

      {/* árboles: se dibujan primero los del fondo (grupo mayor) para que los cercanos los tapen */}
      {[...ARBOLES].reverse().map((arbol, i) => {
        const completado = arbol.grupo < paradaActual
        const creciendo = arbol.grupo === paradaActual
        const factor = completado ? 1 : creciendo ? 0.55 : 0.12
        const opacidad = completado ? 1 : creciendo ? 0.9 : 0.3
        return <Arbolito key={i} arbol={arbol} factor={factor} opacidad={opacidad} />
      })}

      {/* sendero de tierra, se angosta hacia el fondo (perspectiva) */}
      <path
        d="M 150 220 C 140 160, 175 130, 185 90 C 192 60, 195 35, 198 5
           L 202 5
           C 205 35, 208 60, 215 90 C 225 130, 260 160, 250 220 Z"
        fill="url(#senderoTierra)"
        opacity={0.95}
      />

      {/* marcador de "estás aquí": punto que sube por el sendero según tu avance */}
      <circle
        cx={200}
        cy={210 - (200 * paradaActual) / Math.max(totalParadas - 1, 1)}
        r={7}
        fill="#5FBEA8"
        stroke="#16302B"
        strokeWidth={2}
        style={{ transition: 'cy 0.8s ease-out' }}
      >
        <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

