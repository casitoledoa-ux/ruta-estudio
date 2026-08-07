/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fondo principal: verde bosque profundo. Reduce el brillo de pantalla
        // (menos sobreestimulación visual) sin ser negro puro.
        bosque: {
          DEFAULT: '#16302B',
          panel: '#1F3F38',
        },
        // Texto principal sobre fondo oscuro
        marfil: '#F2EFE4',
        // Acento de progreso: cada parada del camino se "enciende" en ámbar al completarse
        ambar: {
          DEFAULT: '#F0B429',
          suave: '#F7CD6B',
        },
        // Acento de foco activo: anillo del temporizador durante el sprint
        menta: '#5FBEA8',
        // Acento de alerta (racha rota, etc.) — uso escaso a propósito
        coral: '#E8735A',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        cuerpo: ['Inter', 'sans-serif'],
        dato: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
