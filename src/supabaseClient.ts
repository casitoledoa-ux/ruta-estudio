import { createClient } from '@supabase/supabase-js'

// Estas dos variables vienen del archivo .env (ver .env.example)
// Las obtienes en tu proyecto de Supabase: Settings → API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
