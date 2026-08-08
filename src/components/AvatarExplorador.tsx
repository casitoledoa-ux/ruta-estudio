export type GeneroAvatar = 'nino' | 'nina'
export type ColorAvatar = 'ambar' | 'menta' | 'coral'

interface AvatarExploradorProps {
  genero: GeneroAvatar
  color: ColorAvatar
  size?: number
}

const COLORES: Record<ColorAvatar, string> = {
  ambar: '#F0B429',
  menta: '#5FBEA8',
  coral: '#E8735A',
}

/**
 * Ilustración plana de un explorador o exploradora infantil (gorro tipo safari,
 * chaleco con bolsillos, pañuelo/moño del color elegido). El color acentúa el
 * pañuelo, el borde del gorro y la mochila.
 */
export default function AvatarExplorador({ genero, color, size = 120 }: AvatarExploradorProps) {
  const acento = COLORES[color]
  const esNina = genero === 'nina'

  return (
    <svg viewBox="0 0 120 150" width={size} height={size * 1.25} role="img" aria-label={`Avatar ${esNina ? 'exploradora' : 'explorador'}`}>
      {/* mochila */}
      <rect x="78" y="70" width="24" height="34" rx="6" fill={acento} opacity={0.85} />

      {/* cuerpo / chaleco */}
      <path d="M40 80 L80 80 L86 140 L34 140 Z" fill="#B8935A" />
      <rect x="40" y="80" width="40" height="10" fill="#8C6B3E" />
      {/* pañuelo */}
      <path d="M46 80 L74 80 L60 96 Z" fill={acento} />

      {/* brazos */}
      <rect x="26" y="82" width="12" height="34" rx="6" fill="#B8935A" />
      <rect x="82" y="82" width="12" height="34" rx="6" fill="#B8935A" />
      <circle cx="32" cy="120" r="7" fill="#E8B98A" />
      <circle cx="88" cy="120" r="7" fill="#E8B98A" />

      {/* piernas */}
      <rect x="42" y="138" width="14" height="10" fill="#6B4A2E" />
      <rect x="64" y="138" width="14" height="10" fill="#6B4A2E" />

      {/* cabeza */}
      <circle cx="60" cy="52" r="26" fill="#E8B98A" />

      {/* cabello */}
      {esNina ? (
        <>
          <path d="M34 48 Q34 24 60 24 Q86 24 86 48 L86 40 Q60 30 34 40 Z" fill="#3E2C1E" />
          <circle cx="30" cy="56" r="7" fill="#3E2C1E" />
          <circle cx="90" cy="56" r="7" fill="#3E2C1E" />
        </>
      ) : (
        <path d="M34 44 Q34 22 60 22 Q86 22 86 44 L84 36 Q60 28 36 36 Z" fill="#3E2C1E" />
      )}

      {/* gorro safari */}
      <ellipse cx="60" cy="34" rx="30" ry="7" fill="#C9A46A" />
      <path d="M40 34 Q40 16 60 16 Q80 16 80 34 Z" fill="#C9A46A" />
      <rect x="30" y="31" width="60" height="6" rx="3" fill={acento} />

      {/* cara */}
      <circle cx="52" cy="54" r="2.4" fill="#16302B" />
      <circle cx="68" cy="54" r="2.4" fill="#16302B" />
      <path d="M52 63 Q60 68 68 63" stroke="#16302B" strokeWidth={2} fill="none" strokeLinecap="round" />
    </svg>
  )
}
