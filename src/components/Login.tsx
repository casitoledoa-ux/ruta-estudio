import { useState } from 'react'
import { supabase } from '../supabaseClient'

interface LoginProps {
  onIngreso: () => void
}

/**
 * Login simple por email + contraseña. Como el grupo es cerrado,
 * las cuentas se crean manualmente desde el panel de Supabase (Authentication → Users)
 * en vez de tener un registro público — ver el README para el paso a paso.
 */
export default function Login({ onIngreso }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  async function manejarIngreso(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setCargando(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setCargando(false)
    if (error) {
      setError('Email o contraseña incorrectos.')
      return
    }
    onIngreso()
  }

  return (
    <div className="max-w-sm mx-auto mt-24 p-6">
      <h1 className="font-display text-3xl text-center mb-1">Ruta de Estudio</h1>
      <p className="font-cuerpo text-sm text-marfil/60 text-center mb-8">
        Enfócate, un paso a la vez.
      </p>

      <form onSubmit={manejarIngreso} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="font-cuerpo bg-bosque-panel rounded-lg px-4 py-3 outline-none placeholder:text-marfil/40"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="font-cuerpo bg-bosque-panel rounded-lg px-4 py-3 outline-none placeholder:text-marfil/40"
        />
        {error && <p className="font-cuerpo text-sm text-coral">{error}</p>}
        <button
          type="submit"
          disabled={cargando}
          className="font-cuerpo font-medium bg-ambar text-bosque rounded-lg py-3 mt-2 disabled:opacity-50"
        >
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
