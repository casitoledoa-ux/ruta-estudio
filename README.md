# Ruta de Estudio — MVP (técnica: Mapa Mental)

## Qué es esto
Es el proyecto completo de tu app. Sigue estos pasos EN ORDEN. No necesitas escribir código, solo copiar, pegar y hacer clic.

## Paso 1 — Crear las tablas en Supabase
1. Entra a tu proyecto en supabase.com
2. Ve al menú lateral: **SQL Editor** → **New query**
3. Abre el archivo `supabase-schema.sql` de este proyecto, copia todo su contenido y pégalo ahí
4. Clic en **Run**. Deberías ver "Success" — ya tienes tus tablas y la seguridad configurada.

## Paso 2 — Crear tu primer usuario (grupo cerrado)
1. En Supabase, ve a **Authentication → Users → Add user**
2. Crea un usuario con email y contraseña para ti (y luego uno por cada compañero)
3. Marca "Auto Confirm User" para que no necesite verificar email

## Paso 3 — Obtener tus claves de conexión
1. En Supabase, ve a **Settings → API**
2. Copia el **Project URL** y la clave **anon public**
3. En este proyecto, duplica el archivo `.env.example`, renómbralo a `.env`, y pega ahí tus dos valores

## Paso 4 — Subir el proyecto a GitHub (sin usar terminal)
1. Entra a github.com, clic en **New repository**, nómbralo `ruta-estudio`, y créalo
2. Dentro del repo vacío, clic en **uploading an existing file**
3. Arrastra TODOS los archivos y carpetas de este proyecto (incluyendo el `.env` que acabas de crear) y confirma el commit

## Paso 5 — Publicar en Vercel
1. Entra a vercel.com → **Add New → Project**
2. Elige el repositorio `ruta-estudio` que acabas de subir
3. Antes de darle a Deploy, abre **Environment Variables** y agrega ahí las mismas dos claves de tu `.env` (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`)
4. Clic en **Deploy** — en un par de minutos tendrás un link tipo `ruta-estudio.vercel.app` funcionando, tanto en computador como celular (y se puede "instalar" desde el navegador del celular como si fuera una app)

## Qué incluye este MVP
- Login para el grupo cerrado
- Una técnica de estudio (Mapa Mental) con sus 4 etapas
- Mecánica de sprint + etapas: temporizador por etapa, pausa activa de 30s entre paradas, puntos, y el camino visual que se va "encendiendo"

## Qué falta (Fase 2, ya lo vemos juntos después)
- Guardar los puntos/sesiones reales en la base de datos (por ahora solo se ven en la consola del navegador)
- Las 7 técnicas restantes
- Racha diaria, insignias y ranking del grupo
