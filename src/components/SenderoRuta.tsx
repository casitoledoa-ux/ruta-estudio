interface SenderoRutaProps {
  totalParadas: number
  paradaActual: number // índice 0-based de la parada activa
}

/**
 * Dibuja el camino de la sesión de estudio como un sendero con paradas (waypoints).
 * - Paradas completadas: círculo lleno en ámbar (con un check).
 * - Parada activa: círculo con anillo pulsante en menta.
 * - Paradas bloqueadas: solo contorno, apagadas.
 *
 * El trazo entre paradas se dibuja progresivamente con stroke-dasharray,
 * simulando que el camino "avanza" junto contigo.
 */
export default function SenderoRuta({ totalParadas, paradaActual }: SenderoRutaProps) {
  const espaciado = 90
  const anchoSvg = espaciado * (totalParadas - 1) + 60
  const y = 40

  return (
    <svg
      viewBox={`0 0 ${anchoSvg} 80`}
      className="w-full h-20"
      role="img"
      aria-label={`Progreso: parada ${paradaActual + 1} de ${totalParadas}`}
    >
      {/* Línea base del camino (apagada) */}
      <line
        x1={30}
        y1={y}
        x2={anchoSvg - 30}
        y2={y}
        stroke="#2A4941"
        strokeWidth={3}
      />
      {/* Línea de progreso (ámbar), crece según la parada activa */}
      <line
        x1={30}
        y1={y}
        x2={30 + espaciado * paradaActual}
        y2={y}
        stroke="#F0B429"
        strokeWidth={3}
        strokeLinecap="round"
        style={{ transition: 'x2 0.6s ease-out' }}
      />

      {Array.from({ length: totalParadas }).map((_, i) => {
        const cx = 30 + espaciado * i
        const completada = i < paradaActual
        const activa = i === paradaActual

        return (
          <g key={i}>
            {activa && (
              <circle
                cx={cx}
                cy={y}
                r={16}
                fill="none"
                stroke="#5FBEA8"
                strokeWidth={2}
                opacity={0.5}
              >
                <animate
                  attributeName="r"
                  values="14;19;14"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.15;0.6"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <circle
              cx={cx}
              cy={y}
              r={10}
              fill={completada ? '#F0B429' : activa ? '#16302B' : '#16302B'}
              stroke={completada ? '#F0B429' : activa ? '#5FBEA8' : '#2A4941'}
              strokeWidth={2}
            />
            {completada && (
              <path
                d={`M ${cx - 4} ${y} l 3 3 l 6 -6`}
                stroke="#16302B"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}
