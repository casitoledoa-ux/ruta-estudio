import { useState } from 'react'
import AvatarExplorador, { ColorAvatar, GeneroAvatar } from './AvatarExplorador'

interface CrearPersonajeProps {
  onConfirmar: (nombre: string, genero: GeneroAvatar, color: ColorAvatar) => void
  guardando: boolean
  error: string | null
}

const COLORES: ColorAvatar[] = ['ambar', 'menta', 'coral']

export default function CrearPersonaje({ onConfirmar, guardando, error }: CrearPersonajeProps) {
  const [genero, setGenero] = useState<GeneroAvatar>('nino')
  const [color, setColor] = useState<ColorAvatar>('ambar')
  const [nombre, setNombre] = useState('')

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 text-center">
      <h1 className="font-display text-2xl mb-1">Crea tu explorador</h1>
      <p className="font-cuerpo text-sm text-marfil/60 mb-6">Así te vamos a ver en tu ruta de estudio.</p>

      <div className="flex justify-center mb-6">
        <AvatarExplorador genero={genero} color={color} size={140} />
      </div>

      <div className="flex justify-center gap-3 mb-5">
        <button
          onClick={() => setGenero('nino')}
          className={`font-cuerpo text-sm rounded-lg px-4 py-2 ${genero === 'nino' ? 'bg-ambar text-bosque' : 'bg-bosque-panel text-marfil/70'}`}
        >
          Explorador
        </button>
        <button
          onClick={() => setGenero('nina')}
          className={`font-cuerpo text-sm rounded-lg px-4 py-2 ${genero === 'nina' ? 'bg-ambar text-bosque' : 'bg-bosque-panel text-marfil/70'}`}
        >
          Exploradora
        </button>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {COLORES.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-9 h-9 rounded-full ${color === c ? 'ring-2 ring-marfil' : ''}`}
            style={{ backgroundColor: { ambar: '#F0B429', menta: '#5FBEA8', coral: '#E8735A' }[c] }}
            aria-label={`Color ${c}`}
          />
        ))}
      </div>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre de explorador"
        maxLength={20}
        className="font-cuerpo w-full bg-bosque-panel rounded-lg px-4 py-3 outline-none placeholder:text-marfil/40 mb-4"
      />

      {error && <p className="font-cuerpo text-xs text-coral mb-3">{error}</p>}

      <button
        onClick={() => nombre.trim() && onConfirmar(nombre.trim(), genero, color)}
        disabled={!nombre.trim() || guardando}
        className="font-cuerpo w-full bg-menta text-bosque rounded-lg py-3 disabled:opacity-50"
      >
        {guardando ? 'Guardando...' : 'Empezar la ruta'}
      </button>
    </div>
  )
}
