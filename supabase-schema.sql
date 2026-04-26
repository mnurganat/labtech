-- ====================================================
-- LabTech KZ — Supabase Schema (v2)
-- Запустить ПЕРВЫМ в: Supabase → SQL Editor
-- ====================================================

-- Категории каталога
create table if not exists categories (
  id          text primary key,
  slug        text not null unique,
  parent_id   text references categories(id),
  image_url   text,
  sort_order  int default 0,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- Товары
create table if not exists products (
  id          text primary key,
  slug        text not null unique,
  category_id text references categories(id),
  price       text,                        -- NULL = "По запросу"
  images      text[] default '{}',
  specs       jsonb  default '{}',
  features    jsonb  default '[]',
  is_featured boolean default false,
  is_active   boolean default true,
  hits        int default 0,
  created_at  timestamptz default now()
);

-- Переводы: название, описание, производитель
create table if not exists translations (
  id          bigserial primary key,
  entity_type text not null,   -- 'product' | 'category'
  entity_id   text not null,
  locale      text not null,   -- 'ru' | 'kz' | 'en'
  field       text not null,   -- 'name' | 'description' | 'manufacturer'
  value       text not null,
  unique (entity_type, entity_id, locale, field)
);

-- Заявки с сайта
create table if not exists leads (
  id           bigserial primary key,
  name         text not null,
  phone        text not null,
  email        text,
  message      text,
  product_id   text,
  product_name text,
  status       text default 'new',  -- 'new' | 'in_progress' | 'done'
  created_at   timestamptz default now()
);

-- Новости
create table if not exists news (
  id         bigserial primary key,
  slug       text not null unique,
  locale     text not null,
  title      text not null,
  body       text,
  image_url  text,
  published  boolean default true,
  created_at timestamptz default now()
);

-- Индексы
create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_featured  on products(is_featured) where is_featured = true;
create index if not exists idx_products_active    on products(is_active)   where is_active   = true;
create index if not exists idx_translations_lookup on translations(entity_type, entity_id, locale);
create index if not exists idx_leads_status on leads(status);

-- RLS: читают все, пишет только service role
alter table categories   enable row level security;
alter table products     enable row level security;
alter table translations enable row level security;
alter table leads        enable row level security;
alter table news         enable row level security;

-- Политики
do $$ begin
  if not exists (select 1 from pg_policies where policyname='Public read categories')   then create policy "Public read categories"   on categories   for select using (is_active = true);   end if;
  if not exists (select 1 from pg_policies where policyname='Public read products')     then create policy "Public read products"     on products     for select using (is_active = true);     end if;
  if not exists (select 1 from pg_policies where policyname='Public read translations') then create policy "Public read translations" on translations for select using (true);                  end if;
  if not exists (select 1 from pg_policies where policyname='Public read news')         then create policy "Public read news"         on news         for select using (published = true);      end if;
  if not exists (select 1 from pg_policies where policyname='Insert leads')             then create policy "Insert leads"             on leads        for insert with check (true);             end if;
end $$;

-- Storage bucket для изображений (создаётся если нет)
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;
