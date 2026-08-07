import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Esta configuración hace dos cosas:
// 1. Prepara React + TypeScript (react()).
// 2. Convierte la web en una PWA instalable en el celular (VitePWA),
//    así tus compañeros pueden "instalarla" desde el navegador sin pasar por tiendas de apps.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Ruta de Estudio',
        short_name: 'RutaEstudio',
        description: 'App de estudio gamificada para concentración y TDAH',
        theme_color: '#16302B',
        background_color: '#16302B',
        display: 'standalone',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
