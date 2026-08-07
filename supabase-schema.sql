-- Copia y pega TODO este archivo en Supabase → SQL Editor → New Query → Run
-- Crea las tablas base descritas en el esquema del MVP.

create table if not exists materiales_estudio (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references auth.users(id) not null,
  titulo text not null,
  contenido_texto text,
  materia text,
  creado_en timestamptz default now()
);

create table if not exists sesiones_estudio (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references auth.users(id) not null,
  material_id uuid references materiales_estudio(id),
  tecnica_id text not null,
  duracion_segundos int,
  puntos_ganados int,
  creado_en timestamptz default now()
);

create table if not exists progreso_usuario (
  usuario_id uuid references auth.users(id) primary key,
  racha_dias int default 0,
  puntos_totales int default 0,
  nivel int default 1,
  actualizado_en timestamptz default now()
);

-- Seguridad: cada usuario solo puede ver y modificar SUS PROPIOS datos.
alter table materiales_estudio enable row level security;
alter table sesiones_estudio enable row level security;
alter table progreso_usuario enable row level security;

create policy "usuarios ven sus propios materiales" on materiales_estudio
  for all using (auth.uid() = usuario_id);

create policy "usuarios ven sus propias sesiones" on sesiones_estudio
  for all using (auth.uid() = usuario_id);

create policy "usuarios ven su propio progreso" on progreso_usuario
  for all using (auth.uid() = usuario_id);
