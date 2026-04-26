-- ============================================================
-- LabTech KZ — Supabase seed data (v3 — full scrape 50 products)
-- Products table: id, slug, category_id, price (text nullable),
--   images (text[]), specs (jsonb), features (jsonb),
--   is_featured, is_active, hits
-- Run in Supabase → SQL Editor
-- ON CONFLICT DO UPDATE → safe to re-run
-- ============================================================

-- ──────────────────────────────────────────────────────────────
-- 1. CATEGORIES (15 items)
-- ──────────────────────────────────────────────────────────────
INSERT INTO categories (id, slug, sort_order, is_active)
VALUES
  ('cat-01','kliniko-diagnosticheskaya', 1,true),
  ('cat-02','mikroskopy',                2,true),
  ('cat-03','obshchelaboratornoe',       3,true),
  ('cat-04','reagenty',                  4,true),
  ('cat-05','veterinariya',             5,true),
  ('cat-06','chistye-pomeshcheniya',    6,true),
  ('cat-07','laboratornaya-posuda',     7,true),
  ('cat-08','nebulayizery',             8,true),
  ('cat-09','pcr-diagnostika',          9,true),
  ('cat-10','koagulyatsiya',           10,true),
  ('cat-11','immunologiya',            11,true),
  ('cat-12','gematologiya',            12,true),
  ('cat-13','biohimiya',               13,true),
  ('cat-14','mikrobiologiya',          14,true),
  ('cat-15','raskhodnye-materialy',    15,true)
ON CONFLICT (id) DO UPDATE SET slug=EXCLUDED.slug, sort_order=EXCLUDED.sort_order;

-- Category translations (ru)
INSERT INTO translations (entity_type,entity_id,locale,field,value) VALUES
  ('category','cat-01','ru','name','Клинико-диагностическая лаборатория'),
  ('category','cat-02','ru','name','Микроскопы'),
  ('category','cat-03','ru','name','Общелабораторное оборудование'),
  ('category','cat-04','ru','name','Реагенты и красители'),
  ('category','cat-05','ru','name','Ветеринария'),
  ('category','cat-06','ru','name','Чистые помещения'),
  ('category','cat-07','ru','name','Лабораторная посуда'),
  ('category','cat-08','ru','name','Небулайзеры'),
  ('category','cat-09','ru','name','ПЦР-диагностика'),
  ('category','cat-10','ru','name','Коагулология'),
  ('category','cat-11','ru','name','Иммунология и серология'),
  ('category','cat-12','ru','name','Гематология'),
  ('category','cat-13','ru','name','Биохимия'),
  ('category','cat-14','ru','name','Микробиология'),
  ('category','cat-15','ru','name','Расходные материалы')
ON CONFLICT (entity_type,entity_id,locale,field) DO UPDATE SET value=EXCLUDED.value;

INSERT INTO translations (entity_type,entity_id,locale,field,value) VALUES
  ('category','cat-01','kz','name','Клиникалық-диагностикалық зертхана'),
  ('category','cat-02','kz','name','Микроскоптар'),
  ('category','cat-03','kz','name','Жалпы зертханалық жабдықтар'),
  ('category','cat-04','kz','name','Реагенттер мен бояғыштар'),
  ('category','cat-05','kz','name','Ветеринария'),
  ('category','cat-06','kz','name','Таза бөлмелер'),
  ('category','cat-07','kz','name','Зертханалық ыдыс-аяқ'),
  ('category','cat-08','kz','name','Небулайзерлер'),
  ('category','cat-09','kz','name','ПЦР-диагностика'),
  ('category','cat-10','kz','name','Коагулология'),
  ('category','cat-11','kz','name','Иммунология және серология'),
  ('category','cat-12','kz','name','Гематология'),
  ('category','cat-13','kz','name','Биохимия'),
  ('category','cat-14','kz','name','Микробиология'),
  ('category','cat-15','kz','name','Тұтынылатын материалдар')
ON CONFLICT (entity_type,entity_id,locale,field) DO UPDATE SET value=EXCLUDED.value;

INSERT INTO translations (entity_type,entity_id,locale,field,value) VALUES
  ('category','cat-01','en','name','Clinical Diagnostic Laboratory'),
  ('category','cat-02','en','name','Microscopes'),
  ('category','cat-03','en','name','General Laboratory Equipment'),
  ('category','cat-04','en','name','Reagents & Stains'),
  ('category','cat-05','en','name','Veterinary'),
  ('category','cat-06','en','name','Cleanrooms'),
  ('category','cat-07','en','name','Laboratory Glassware'),
  ('category','cat-08','en','name','Nebulizers'),
  ('category','cat-09','en','name','PCR Diagnostics'),
  ('category','cat-10','en','name','Coagulology'),
  ('category','cat-11','en','name','Immunology & Serology'),
  ('category','cat-12','en','name','Hematology'),
  ('category','cat-13','en','name','Biochemistry'),
  ('category','cat-14','en','name','Microbiology'),
  ('category','cat-15','en','name','Consumables')
ON CONFLICT (entity_type,entity_id,locale,field) DO UPDATE SET value=EXCLUDED.value;


-- ──────────────────────────────────────────────────────────────
-- 2. PRODUCTS (47 items — all scraped from labtech.kz)
-- NULL price  = "По запросу"
-- ARRAY[]     = no photo yet
-- ON CONFLICT DO UPDATE → updates images/specs if re-run
-- ──────────────────────────────────────────────────────────────
INSERT INTO products
  (id, slug, category_id, price, images, specs, features, is_featured, is_active, hits)
VALUES

-- ────── КДЛ / ГЕМАТОЛОГИЯ ────────────────────────────────────
('prod-01','gematologicheskij-analizator-urit-3000-plus','cat-01',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__9c__188-9c7e332e.jpeg'],
  '{"Тип":"Автоматический","Производительность":"60 тестов/час","Параметры":"19","Метод":"Кондуктометрический, бесцианидный HGB","Объём пробы (вена)":"18 мкл","Объём пробы (разведение)":"20 мкл","Дисплей":"10.4 дюйма цветной LCD","ОС":"Linux","Память":"10 млн результатов","Питание":"AC 100-220V 50/60 Гц 180 Вт","Размеры":"330x440x500 мм","Вес":"24 кг"}'::jsonb,
  '[]'::jsonb, true,true,0),

('prod-02','gematologicheskij-analizator-urit-5160','cat-01',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__d8__2-d851df78.jpeg'],
  '{"Тип":"Полностью автоматический","Производительность":"60 тестов/час","Параметры":"28 (5-дифф + ретикулоциты)","Метод HGB":"Бесцианидный колориметрический","Объём пробы":"20 мкл","Дисплей":"10.4 дюйма сенсорный LCD","Память":">100 000 образцов","Питание":"110-240V 50-60 Гц","Размеры":"580x750x550 мм","Вес":"~35 кг"}'::jsonb,
  '[]'::jsonb, true,true,0),

('prod-03','analizator-mochi-urit-50','cat-01',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__e5__3-e5c8bf0f.jpeg'],
  '{"Тип":"Полуавтоматический","Метод":"Отражательная фотометрия","Параметры":"14 (pH, белок, глюкоза, лейкоциты, эритроциты, кетоны, билирубин и др.)","Производительность":"60-125 тестов/час","Дисплей":"LCD","Принтер":"Встроенный термопринтер","Память":"5 000 результатов","Интерфейс":"RS232","Питание":"DC 12V (адаптер 100-240V)","Мощность":"30 Вт","Размеры":"290x200x100 мм","Вес":"~2 кг"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-04','gemoglobinometr-portativnyj-urit-12','cat-01',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__38__4-38dc1765.jpeg'],
  '{"Параметр":"Гемоглобин","Точность":"96%","Тип пробы":"Капиллярная или венозная кровь","Объём пробы":"15-20 мкл","Время анализа":"<10 секунд","Диапазон":"4-24 г/дл","Память":"250 тестов"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-05','koagulometr-4-kanalnyj-urit-610','cat-01',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__68__cg_4-68ab3c21.jpeg'],
  '{"Тип":"Полуавтоматический 4-канальный","Метод":"Магнитно-механический (спаренные гранулы)","Тесты":"PT, APTT, Тромбиновое время, Фибриноген","Каналов":"4","Позиций образцов":"16","Позиций реагентов":"4 (регулируемых)","Дисплей":"LCD","Память":"500 результатов"}'::jsonb,
  '[]'::jsonb, false,true,0),

-- ────── МИКРОСКОПЫ ───────────────────────────────────────────
('prod-06','mikroskop-mkh-300-t','cat-02',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/66/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2023-12-01_104414-66150d26.png'],
  '{"Тип":"Тринокулярный биологический","Оптика":"ICO Infinitive (скорр. на бесконечность)","Макс. увеличение":"2000x","Окуляры":"WF 10x/18 мм","Объективы":"Ахроматические планахроматы 4x, 10x, 20x, 40x, 100x (масло)","Предметный столик":"Прямоугольный 135x140 мм механический","Конденсор":"Аббе NA 1.25","Освещение":"LED 12 Вт","Питание":"220V 50 Гц","Размеры":"30x30x39 см","Вес":"7 кг"}'::jsonb,
  '[]'::jsonb, true,true,0),

('prod-07','mikroskop-mkh-100-t','cat-02',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/c9/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2023-12-01_104349-c92c6484.png'],
  '{"Тип":"Биологический бинокулярный","Макс. увеличение":"2000x","Окуляры":"WF 10x/18 мм","Объективы":"4x, 10x, 20x, 40x, 100x (масло)","Предметный столик":"Механический 135x140 мм","Конденсор":"Аббе NA 1.25","Освещение":"LED 12 Вт","Питание":"220V 50 Гц","Размеры":"30x30x39 см","Вес":"7 кг"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-08','mikroskop-mkh-50','cat-02',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/f9/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2023-12-01_104310-f99b0908.png'],
  '{"Тип":"Бинокулярный научно-исследовательский","Увеличение":"40x-1000x","Окуляры":"WF 10x/18 мм","Объективы":"4x, 10x, 40x, 100x (масло)","Столик":"Механический 120x120 мм","Конденсор":"Аббе регулируемый NA 1.25","Освещение":"LED 0.5 Вт с регулировкой","Питание":"220V 50 Гц","Размеры":"36x17x20 см"}'::jsonb,
  '[]'::jsonb, false,true,0),

-- ────── ОБЩЕЛАБОРАТОРНОЕ ОБОРУДОВАНИЕ ────────────────────────
('prod-09','vorteks-v-1-plus','cat-03',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__2e__v_1_plus-2ed52d87.png'],
  '{"Диаметр орбиты":"4 мм","Диапазон скоростей":"750-3000 об/мин","Макс. нагрузка":"30 г","Макс. объём":"30 мл","Непрерывная работа":"8 часов","Совм. объёмы пробирок":"0.2-50 мл","Питание":"AC 100-240V → DC 12V","Мощность":"3.8 Вт","Размеры":"90x150x80 мм","Вес":"0.8 кг"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-10','multi-vorteks-v-32','cat-03',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__68__22-6-68975b9d.jpeg'],
  '{"Вместимость":"32 пробирки одновременно","Диапазон скоростей":"500-3000 об/мин","Диаметр орбиты":"2 мм","Режимы":"Непрерывный/Импульсный","Макс. нагрузка":"70 г","Непрерывная работа":"8 часов","Питание":"12V DC (AC 100-240V адаптер)","Мощность":"3.8 Вт","Размеры":"120x180x100 мм","Вес":"1.5 кг"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-11','magnitnaya-meshalka-msh-300i','cat-03',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__76__msh_300i-76749959.png'],
  '{"Диапазон скоростей":"100-1250 об/мин (шаг 10)","Макс. объём":"20 л","Диапазон температур":"+30...+330°C","Диапазон внеш. датчика":"+20...+150°C","Дисплей":"LCD","Равномерность":"+/-3°C","Материал поверхности":"Алюминиевый сплав","Питание":"230V или 120V 50/60 Гц","Мощность нагрева":"550 Вт","Размеры":"190x270x100 мм","Вес":"3.2 кг"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-12','termostat-tverdotelnyj-gnom','cat-03',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__a3__14-a39df5fa.jpeg'],
  '{"Ёмкость 1.5 мл":"40 пробирок","Ёмкость 0.5 мл":"28 пробирок","Диапазон температур":"Комнатная до 99°C","Диапазон времени":"2 мин - 99 ч","Шаг температуры":"1.0°C","Мощность":"85 Вт","Программ":"До 3 последовательных интервалов"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-13','termoshejker-planshetnyj-pst-60hl','cat-03',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__dd__170-dd531685.png'],
  '{"Диапазон температур":"+25...+60°C","Стабильность":"+/-0.1°C","Диапазон скоростей":"250-1200 об/мин","Орбита":"2 мм","Планшетов":"2 (стандартные 96-луночные)","Таймер":"1 мин - 96 ч / непрерывно","Питание":"12V DC 3.3A 40 Вт","Дисплей":"LCD 16x2","Размеры":"270x260x125 мм","Вес":"6.1 кг"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-14','vodnaya-banya-termostat-tw-2','cat-03',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__71__p0011-71131413.jpeg'],
  '{"Диапазон температур":"Комн. +3°C до 90°C","Дискретность":"+/-0.1°C","Время нагрева до макс.":"50 минут","Макс. объём жидкости":"4.5 л","Питание":"100-240V 50/60 Гц","Мощность":"1.5 кВт","Размеры":"330x180x250 мм","Вес":"1.6 кг"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-15','tsentrifuga-vysokoskorostnaya-ns-3180','cat-03',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__e5__29-e51f7de6.jpeg'],
  '{"Макс. скорость":"21 000 об/мин","Макс. ОЦС":"23 194 x g","Точность скорости":"+/-100 об/мин","Уровень шума":"<=55 дБ","Таймер":"1 мин - 99:59:59","Питание":"AC 220V 50 Гц","Мощность":"550 ВА","Роторов":"7 конфигураций (0.5-100 мл)"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-16','tsentrifuga-lmc-3000','cat-03',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__80__22-80aa0752.png'],
  '{"Диапазон скоростей (пробирки)":"100-3000 об/мин (1610 x g)","Диапазон скоростей (планшеты)":"100-2000 об/мин (560 x g)","Шаг скорости":"100 об/мин","Таймер":"1-90 мин","Диаметр камеры":"335 мм","Дисплей":"LCD 2x16","Питание":"230V 50/60 Гц","Мощность":"110 Вт","Размеры":"420x495x235 мм","Вес":"11.8 кг"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-17','mini-tsentrifuga-vorteks-fvl-2400n','cat-03',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__a1__19-a1dae3b1.png'],
  '{"Скорость (50 Гц)":"2800 об/мин","ОЦС (50 Гц)":"500 x g","Скорость (60 Гц)":"3500 об/мин","Режимы":"Непрерывный и импульсный","Защита":"Автостоп при открытии крышки","Питание":"120V или 230V 50/60 Гц","Мощность":"25-30 Вт","Размеры":"190x235x125 мм","Вес":"1.7 кг"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-18','tsentrifuga-cm-6m','cat-03',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__0a__21-0a94d90f.png'],
  '{"Диапазон скоростей":"100-3500 об/мин","Макс. ОЦС":"2300 x g","Таймер":"1-99 мин","Ступеней торможения":"6","Применение":"Пробирки и гель-карты","Питание":"100-240V 50-60 Гц","Мощность":"250 Вт","Размеры":"426x410x233 мм","Вес":"13.5 кг"}'::jsonb,
  '[]'::jsonb, false,true,0),

-- ────── РЕАГЕНТЫ И КРАСИТЕЛИ ─────────────────────────────────
('prod-19','diakhim-bufer-g','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__6a__129-6ade8999.jpeg'],
  '{"pH":"6.8-7.2","Объём":"10 мл (концентрат)","Разведение":"1:300 с дистиллированной водой (10 мл на 3 л)","Форма":"Концентрат жидкий","Применение":"Буферизованная вода для растворов гематологических красителей","Артикул":"483"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-20','diakhim-uniklin','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__1f__122-1f83d835.jpeg'],
  '{"Применение":"Очистка и обезжиривание лабораторных стёкол многократного использования","Ресурс":"5 000 стёкол"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-21','diakhim-pap','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__56__120-56877a59.jpeg'],
  '{"Назначение":"Окраска урогенитальных мазков по Папаниколау","Тип":"Набор реагентов","Упаковка":"100 определений","Применение":"Цитологические препараты, ядра клеток гематоксилином"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-22','diakhim-diffkvik','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__cc__118-cc39aa9d.jpeg'],
  '{"Назначение":"Быстрое дифференцированное окрашивание","Время окрашивания":"~1 минута","Предварительная подготовка":"Не требуется","Образцы":"Плоский эпителий, выпотные жидкости, эякулят, периферическая кровь","Форма":"Готовые к применению красители"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-23','diakhim-tsitostejn-s','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__39__127-39b7d04a.jpeg'],
  '{"Назначение":"Краситель для цитологических исследований"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-24','diakhim-tsitostejn-mpo','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__1d__126-1d35817c.jpeg'],
  '{"Назначение":"Краситель для выявления миелопероксидазы (МПО) при цитологических исследованиях"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-25','diakhim-gelminty-rabinovich','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__70__125-70b37226.jpeg'],
  '{"Назначение":"Исследование кала на гельминты методом Рабиновича","Тип":"Набор реагентов"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-26','diakhim-okraska-po-gramu','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__fe__111-febbd16f.jpeg'],
  '{"Назначение":"Дифференциальное окрашивание бактерий по методу Грама","Тип":"Набор реагентов"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-27','diakhim-okraska-tsil-nilsen','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__3b__123-3b018903.jpeg'],
  '{"Назначение":"Окраска кислотоустойчивых бактерий (микобактерий туберкулёза) по Циль-Нильсену","Тип":"Набор реагентов"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-28','krasitel-po-romanovskomu','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__d1__101-d1b579cb.png'],
  '{"Метод":"Романовский (Азур-Эозин)","Применение":"Окраска мазков крови и костного мозга"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-29','krasitel-po-lejshmanu','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__96__103-962f05e7.jpeg'],
  '{"Метод":"Лейшман (эозин метиленовый синий)","Применение":"Окраска гематологических препаратов"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-30','krasitel-po-maj-gryunvaldu','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__4d__105-4d22e353.jpeg'],
  '{"Метод":"Май-Грюнвальд (эозин метиленовый синий)","Применение":"Окраска мазков крови"}'::jsonb,
  '[]'::jsonb, false,true,0),

-- ────── ВЕТЕРИНАРИЯ ──────────────────────────────────────────
('prod-31','amplifikator-dtlite','cat-05',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__84__180-84a591d8.jpeg'],
  '{"Форматы термоблока":"S1/S2 (48 пробирок 0.2 мл), L (192 пробирки 0.045 мл)","Диапазон температур":"0-100°C","Точность температуры":"+/-0.2°C","Скорость нагрева S":"5.0°C/сек","Скорость охлаждения S":"2.5°C/сек","Каналы детекции":"4 или 5","Источник света":"LED","Детектор":"ПЗС-матрица","Спектр (4-кан)":"470-675 нм","Спектр (5-кан)":"470-750 нм"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-32','analizator-biokhimicheskij-urit-8210-vet','cat-05',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__fc__200-fc488c5e.jpeg'],
  '{"Методы":"Конечная точка, кинетика, фиксированная кинетика","Длины волн":"10 (340-800 нм)","Контроль температуры":"37°C +/-0.1°C","Объём пробы":"2-50 мкл","Объём реагента R1":"25-400 мкл","Память":">1200 результатов","Питание":"220V 50 Гц","Размеры":"950x680x1110 мм","Вес":"174 кг"}'::jsonb,
  '[]'::jsonb, true,true,0),

('prod-33','analizator-gematologicheskij-urit-2900-plus-vet','cat-05',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__b6__analizator-gematologicheskij-urit-2900-plus-vet-b66a7c7c.jpeg'],
  '{"Производительность":"30 анализов/час","Виды животных":"13 + 3 профиля","Параметры":"21 (3-дифф)","Метод":"Электрическое сопротивление + фотометрический","Объём пробы":"10 мкл (вена), 20 мкл (разведение)","Дисплей":"10.4 дюйма цветной LCD","Память":"100 000 записей","Размеры":"65x47x60 см","Вес":"28 кг"}'::jsonb,
  '[]'::jsonb, true,true,0),

('prod-34','vosher-mikroplanshetnyj-urit-670','cat-05',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__d2__7-d2c2f8f0.jpeg'],
  '{"Методы промывки":"до 50","Типы лунок":"U, V, плоское дно","Циклы промывки":"до 20","Объём дозирования":"50-450 мкл на лунку","Остаточный объём":"<2 мкл (двойная аспирация)","Конфигурация головки":"8- или 12-канальная","Дисплей":"LCD 240x128","Интерфейс":"RS232"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-35','rider-mikroplanshetnyj-urit-660','cat-05',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__f8__6-f89b21f4.jpeg'],
  '{"Типы планшетов":"Стандартные 96- и 48-луночные","Скорость":"5 сек на планшет (одна длина волны)","Диапазон длин волн":"400-700 нм","Оптика":"8-канальная","Фильтры":"405, 450, 492, 630 нм (расширяемые до 8)","Встроенный шейкер":"3 скорости","Память":"10 000 результатов","Интерфейс":"RS232","Размеры":"460x320x210 мм","Вес":"8 кг"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-36','analizator-mochi-urit-50-vet','cat-05',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__e5__3-e5c8bf0f.jpeg'],
  '{"Тип":"Полуавтоматический","Метод":"Отражательная фотометрия","Применение":"Ветеринарная диагностика"}'::jsonb,
  '[]'::jsonb, false,true,0),

-- ────── ЧИСТЫЕ ПОМЕЩЕНИЯ ─────────────────────────────────────
('prod-37','boks-pcr-biobase','cat-06',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__8c__49-8c2cbc9f.jpeg'],
  '{"Модели":"PCR-800, PCR-1200, PCR-1300, PCR-1500","Поток":"Вертикальный","КПД HEPA":"99.999% при 0.3 мкм","Скорость воздуха":"0.3-0.5 м/с","УФ-лампа":"20-40 Вт, 253.7 нм, таймер 0-90 мин","Освещение":"8-12 Вт, >=1000 Лк","Шум":"<=65 дБ","Материал":"Нержавеющая сталь (поверхность), покрашенный холоднокатаный лист (корпус)","Питание":"AC 220V +/-10%"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-38','laminarnyj-boks-bsc-1300-ii-b2x','cat-06',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__62__46-628bb3b2.png'],
  '{"Класс безопасности":"II тип B2X","Габариты":"1300x750x2250 мм","Рабочая камера":"1150x600x660 мм","Скорость входящего потока":"0.53 м/с","Скорость нисходящего потока":"0.33 м/с","КПД HEPA":"99.999% (>0.3 мкм)","Шум":"<=65 дБ","УФ-лампа":"20 Вт","Освещение":"21 Вт / 800 Лк","Мощность":"1200 Вт","Вес":"320 кг","Питание":"110-240V 50-60 Гц"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-39','vytyazhnye-shkafy-fh','cat-06',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__66__50-6617d1fb.jpeg'],
  '{"Модели":"FH1000(P), FH1200(P), FH1500(P), FH1800(P)","Скорость воздуха":"0.3-0.8 м/с","Шум":"<=68 дБ","Мощность":"330-360 Вт","Питание":"220V +/-10% 50/60 Гц","Материал":"Белый полипропилен 8 мм (устойчив к кислотам/щелочам)","Рабочая поверхность":"Химически стойкая фенольная смола"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-40','obluchatel-retsirkulyator-fiolet-t02','cat-06',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__e5__53-e59f438d.jpeg'],
  '{"Тип":"Бактерицидный рециркулятор закрытый","Лампы":"2 x 15 Вт TUV15, 253.4 нм (безозоновые)","Объём обеззараживания":"36 м3/ч","Рекомендуемая площадь":"14 м2","Ресурс лампы":"9 000 часов","Питание":"220V +/-10% 50 Гц","Мощность":"40 Вт","Размеры":"150x70x1100 мм","Особенность":"Работает в присутствии людей"}'::jsonb,
  '[]'::jsonb, false,true,0),

-- ────── ЛАБОРАТОРНАЯ ПОСУДА ──────────────────────────────────
('prod-41','chashki-petri','cat-07',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/7a/%D1%87%D0%B0%D1%88%D0%BA%D0%B8_%D0%BF%D0%B5%D1%82%D1%80%D0%B8-7a64b30e.jpeg'],
  '{"Стандарты":"ГОСТ 25336-82, ТУ 4320-012-2908133-2009","Варианты":"100x20 мм (НС/ТС), 90x18 мм (НС/ТС)","Упаковка":"10-36 шт.","Артикулы":"11000213, 11000234, 11000235, 11000233"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-42','probirki-eppendorf','cat-07',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__51__3dcbd8056f504532259e733a4b9e2ae3_M-511a7700.jpeg'],
  '{"Материал":"Полипропилен","Крышка":"Откидная с замком безопасной блокировки","Объёмы":"0.5 мл, 1.5 мл, 2 мл","Особенность":"Деления объёма и поверхность для маркировки"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-43','stekla-pokrovnye','cat-07',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__b6__66-b6db69ad.jpeg'],
  '{"Материал":"Бесцветное силикатное стекло","Толщина":"0.17 мм","Размеры":"18x18, 20x20, 22x22, 22x32, 22x40, 22x50, 22x60, 24x24, 24x32, 24x36, 24x40, 24x48, 24x50, 24x55, 24x60 мм","Упаковка":"500 или 1000 шт."}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-44','bumaga-filtrovalnaya','cat-07',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__aa__79-aa2d4306.jpeg'],
  '{"Назначение":"Фильтрация жидкостей и осадков в лабораторных условиях"}'::jsonb,
  '[]'::jsonb, false,true,0),

('prod-45','planshety-gruppy-krovi','cat-07',NULL,
  ARRAY[]::text[],
  '{"Назначение":"Определение групп крови в лабораторных условиях"}'::jsonb,
  '[]'::jsonb, false,true,0),

-- ────── НЕБУЛАЙЗЕРЫ ──────────────────────────────────────────
('prod-46','mesh-nebulajzer-m102','cat-08',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/6e/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA3-6e775c62.png'],
  '{"Тип":"Меш-небулайзер","Применение":"Для всех возрастов (дети и взрослые)","Режим работы":"Портативный","Маски":"Детская и взрослая в комплекте","Особенность":"Бесшумная работа, глубокое проникновение аэрозоля"}'::jsonb,
  '[]'::jsonb, false,true,0),

-- ────── TNC КОМПЛЕКС (реагент, не найден в скрейпе но есть) ─
('prod-47','tnc-kompleks','cat-04',NULL,
  ARRAY[]::text[],
  '{"Назначение":"Лизирующий реагент для гематологических анализаторов","Совместимость":"URIT, Mindray BC-серия, Sysmex KX-21","Объём":"20 л (канистра)"}'::jsonb,
  '[]'::jsonb, false,true,0)

ON CONFLICT (id) DO UPDATE SET
  images   = EXCLUDED.images,
  specs    = EXCLUDED.specs,
  category_id = EXCLUDED.category_id,
  is_active   = EXCLUDED.is_active;


-- ──────────────────────────────────────────────────────────────
-- 3. PRODUCT TRANSLATIONS — ru (name + description + manufacturer)
-- ──────────────────────────────────────────────────────────────
INSERT INTO translations (entity_type,entity_id,locale,field,value) VALUES

-- КДЛ
('product','prod-01','ru','name','Гематологический анализатор URIT-3000 Plus'),
('product','prod-01','ru','description','Автоматический анализатор крови по 19 параметрам с 3-популяционной дифференцировкой лейкоцитов. Производительность 60 тестов/час. Объём пробы 18 мкл (вена) / 20 мкл (разведение). Дисплей 10.4", ОС Linux. Память на 10 млн результатов с гистограммами. Поддержка USB, мультиязычный интерфейс включая русский.'),
('product','prod-01','ru','manufacturer','URIT Medical Electronic Group Co., Ltd'),

('product','prod-02','ru','name','Гематологический анализатор URIT-5160'),
('product','prod-02','ru','description','Полностью автоматический анализатор нового поколения с 5-популяционной дифференцировкой лейкоцитов и подсчётом ретикулоцитов. 28 параметров, 60 тестов/час. Объём пробы 20 мкл. Сенсорный дисплей 10.4". Память >100 000 образцов с гистограммами и скатерограммами.'),
('product','prod-02','ru','manufacturer','URIT Medical Electronic Group Co., Ltd'),

('product','prod-03','ru','name','Анализатор мочи полуавтоматический URIT 50'),
('product','prod-03','ru','description','Полуавтоматический анализатор мочи методом отражательной фотометрии. Определяет 14 параметров: pH, белок, глюкоза, лейкоциты, эритроциты, кетоны, билирубин, уробилиноген, нитриты, микроальбумин и др. Производительность 60–125 тестов/час. Встроенный термопринтер.'),
('product','prod-03','ru','manufacturer','URIT Medical Electronic Group Co., Ltd'),

('product','prod-04','ru','name','Гемоглобинометр портативный URIT-12'),
('product','prod-04','ru','description','Портативный прибор для быстрого измерения уровня гемоглобина. Результат за менее 10 секунд. Диапазон измерения 4–24 г/дл. Объём пробы 15–20 мкл (капиллярная или венозная кровь). Память на 250 тестов. Идеален для скорой помощи и выездной работы.'),
('product','prod-04','ru','manufacturer','URIT Medical Electronic Group Co., Ltd'),

('product','prod-05','ru','name','Коагулометр 4-канальный полуавтоматический URIT-610'),
('product','prod-05','ru','description','Полуавтоматический 4-канальный анализатор свёртываемости крови. Использует метод определения спаренных гранул в магнитном поле. Тесты: ПТ, АЧТВ, Тромбиновое время, Фибриноген. 16 позиций образцов, 4 регулируемые позиции реагентов. Память на 500 результатов.'),
('product','prod-05','ru','manufacturer','URIT Medical Electronic Group Co., Ltd'),

-- Микроскопы
('product','prod-06','ru','name','Биологический микроскоп МХ-300Т (тринокулярный)'),
('product','prod-06','ru','description','Профессиональный тринокулярный микроскоп серии MX с оптикой ICO Infinitive, скорригированной на бесконечность. Максимальное увеличение 2000×. Ахроматические планахроматы 4×/10×/20×/40×/100× (масло). Конденсор Аббе NA 1.25. Механический столик 135×140 мм. LED 12 Вт. Идеален для мазков крови, мочи, гистологических препаратов.'),
('product','prod-06','ru','manufacturer','WestMedica'),

('product','prod-07','ru','name','Биологический микроскоп МХ-100Т (бинокулярный)'),
('product','prod-07','ru','description','Лабораторный бинокулярный микроскоп серии MX. Максимальное увеличение 2000×. Объективы 4×/10×/20×/40×/100× (масло). Механический столик 135×140 мм. Конденсор Аббе NA 1.25. LED подсветка 12 Вт. Оптимален для рутинных диагностических исследований.'),
('product','prod-07','ru','manufacturer','WestMedica'),

('product','prod-08','ru','name','Биологический микроскоп МХ-50'),
('product','prod-08','ru','description','Бинокулярный микроскоп в полной комплектации для научных исследований, медицины, биологии, химии. Увеличение 40×–1000×. Ахроматические объективы 4×/10×/40×/100× (масло). Механический столик 120×120 мм. Регулируемая LED подсветка.'),
('product','prod-08','ru','manufacturer','WestMedica'),

-- Общелабораторное
('product','prod-09','ru','name','Вортекс-миксер V-1 plus'),
('product','prod-09','ru','description','Лабораторный вортекс для перемешивания растворов и суспензий в пробирках 0.2–50 мл. Диапазон скоростей 750–3000 об/мин, диаметр орбиты 4 мм. Непрерывная работа до 8 часов. Компактный, бесшумный, антивибрационные ножки.'),
('product','prod-09','ru','manufacturer','Biosan'),

('product','prod-10','ru','name','Мульти-вортекс V-32'),
('product','prod-10','ru','description','Вортекс для одновременного перемешивания до 32 пробирок. Предназначен для интенсивного перемешивания бактериальных и дрожжевых клеток, экстракции метаболитов. Скорость 500–3000 об/мин. Режимы: непрерывный и импульсный.'),
('product','prod-10','ru','manufacturer','Biosan'),

('product','prod-11','ru','name','Магнитная мешалка с подогревом MSH-300i'),
('product','prod-11','ru','description','Цифровая магнитная мешалка с подогревом для лабораторий с высокими требованиями. Перемешивание жидкостей объёмом до 20 л. Диапазон скоростей 100–1250 об/мин, температура +30…+330°С. Поддержка внешнего датчика температуры. LCD дисплей.'),
('product','prod-11','ru','manufacturer','Biosan'),

('product','prod-12','ru','name','Термостат твердотельный программируемый «Гном»'),
('product','prod-12','ru','description','Программируемый твёрдотельный термостат для пробирок 1.5 мл (40 шт.) и 0.5 мл (28 шт.). До трёх последовательных температурно-временных интервалов. Диапазон от комнатной до 99°С. Термоизоляционная крышка, встроенный вентилятор охлаждения, LCD.'),
('product','prod-12','ru','manufacturer','НПО ДНК-ТЕХНОЛОГИЯ'),

('product','prod-13','ru','name','Термошейкер для планшетов PST-60HL'),
('product','prod-13','ru','description','Термошейкер для стандартных 96-луночных планшетов — одновременно инкубатор, планшетный шейкер и термошейкер. Диапазон +25…+60°С, стабильность ±0.1°С. Скорость 250–1200 об/мин. Два планшета одновременно. Запатентованный двусторонний нагрев.'),
('product','prod-13','ru','manufacturer','Biosan'),

('product','prod-14','ru','name','Водяная баня-термостат TW 2'),
('product','prod-14','ru','description','Настольный термостат водяная баня. Диапазон комнатная +3°С до 90°С, дискретность ±0.1°С. Объём до 4.5 л. Время нагрева до максимума 50 минут. Применяется в медицине, биологии, химии.'),
('product','prod-14','ru','manufacturer','ELMI'),

('product','prod-15','ru','name','Высокоскоростная центрифуга НС-3180'),
('product','prod-15','ru','description','Настольная высокоскоростная центрифуга до 21 000 об/мин (23 194 × g). Привод постоянного тока со ступенчатой регулировкой. 7 конфигураций ротора (0.5–100 мл). Низкий уровень шума ≤55 дБ. Применяется для разделения патологических проб крови.'),
('product','prod-15','ru','manufacturer','Zonkia'),

('product','prod-16','ru','name','Центрифуга медицинская лабораторная LMC-3000'),
('product','prod-16','ru','description','Настольная низкоскоростная центрифуга для биологических жидкостей. До 3000 об/мин для пробирок (1610 × g), до 2000 об/мин для планшетов (560 × g). Применяется с микропланшетами, пробирками и гелевыми картами для ИФА. Детектор дисбаланса.'),
('product','prod-16','ru','manufacturer','Biosan'),

('product','prod-17','ru','name','Мини-центрифуга-вортекс комби-спин FVL-2400N'),
('product','prod-17','ru','description','Универсальная мини-центрифуга-вортекс для ПЦР-диагностики. Объединяет центрифугирование и перемешивание. 2800/3500 об/мин (50/60 Гц). Применяется в ПЦР, микробиологии, биохимии, клинических лабораториях. Автостоп при открытии крышки.'),
('product','prod-17','ru','manufacturer','Biosan'),

('product','prod-18','ru','name','Центрифуга лабораторная CM-6M/CM-6MT'),
('product','prod-18','ru','description','Компактная многофункциональная центрифуга для пробирок и гель-карт. Скорость 100–3500 об/мин, макс. 2300 × g. Таймер 1–99 мин. 6 ступеней торможения. Применяется в микробиологии, вирусологии, клинической биохимии, аналитической химии.'),
('product','prod-18','ru','manufacturer','ELMI'),

-- Реагенты
('product','prod-19','ru','name','Диахим-Буфер-Г'),
('product','prod-19','ru','description','Концентрированная жидкость для приготовления буферизованной воды (pH 6.8–7.2), необходимой для рабочих растворов гематологических красителей по Романовскому–Гимзе. Разведение 1:300 (10 мл концентрата на 3 л дистиллированной воды). Артикул 483.'),
('product','prod-19','ru','manufacturer','Абрис+'),

('product','prod-20','ru','name','Диахим-Униклин'),
('product','prod-20','ru','description','Смесь для очистки и обезжиривания лабораторных стёкол многократного использования. Рассчитана на 5 000 стёкол.'),
('product','prod-20','ru','manufacturer','Абрис+'),

('product','prod-21','ru','name','Диахим-ПАП (набор для окраски по Папаниколау)'),
('product','prod-21','ru','description','Набор реагентов для окраски урогенитальных мазков по методу Папаниколау. Предназначен для цитологических препаратов в КДЛ. Избирательно окрашивает ядра клеток гематоксилином, цитоплазму — смесями красителей в зависимости от типа и зрелости клетки. Упаковка 100 определений.'),
('product','prod-21','ru','manufacturer','Абрис+'),

('product','prod-22','ru','name','Диахим-Диффквик (быстрое дифференцированное окрашивание)'),
('product','prod-22','ru','description','Набор готовых красителей для быстрого (~1 минута) дифференцированного окрашивания простейших, бактерий, клеточных структур и тканей. Предварительная подготовка не требуется. Подходит для плоского эпителия, выпотных жидкостей, эякулята, периферической крови.'),
('product','prod-22','ru','manufacturer','Абрис+'),

('product','prod-23','ru','name','Диахим-ЦитоСтейн-С'),
('product','prod-23','ru','description','Краситель для цитологических исследований. Производитель: Абрис+, Россия.'),
('product','prod-23','ru','manufacturer','Абрис+'),

('product','prod-24','ru','name','Диахим-ЦитоСтейн-МПО (миелопероксидаза)'),
('product','prod-24','ru','description','Краситель для выявления активности миелопероксидазы (МПО) при цитологических исследованиях. Производитель: Абрис+, Россия.'),
('product','prod-24','ru','manufacturer','Абрис+'),

('product','prod-25','ru','name','Диахим — набор для исследования на гельминты по Рабиновичу'),
('product','prod-25','ru','description','Набор реагентов для исследования кала на наличие яиц гельминтов методом Рабиновича. Производитель: Абрис+, Россия.'),
('product','prod-25','ru','manufacturer','Абрис+'),

('product','prod-26','ru','name','Диахим — набор для окраски по Граму'),
('product','prod-26','ru','description','Набор реагентов для дифференциального окрашивания бактерий по методу Грама. Позволяет разделять бактерии на грамположительные и грамотрицательные. Производитель: Абрис+, Россия.'),
('product','prod-26','ru','manufacturer','Абрис+'),

('product','prod-27','ru','name','Диахим — набор для окраски по Циль-Нильсену'),
('product','prod-27','ru','description','Набор для окраски кислотоустойчивых бактерий, в том числе микобактерий туберкулёза, по методу Циль-Нильсена. Производитель: Абрис+, Россия.'),
('product','prod-27','ru','manufacturer','Абрис+'),

('product','prod-28','ru','name','Краситель по Романовскому (Азур-Эозин)'),
('product','prod-28','ru','description','Краситель для окраски мазков крови и костного мозга методом Романовского–Гимзы. Производитель: Абрис+, Россия.'),
('product','prod-28','ru','manufacturer','Абрис+'),

('product','prod-29','ru','name','Краситель по Лейшману'),
('product','prod-29','ru','description','Эозин метиленовый синий типа Лейшмана для окраски гематологических препаратов. Производитель: Абрис+, Россия.'),
('product','prod-29','ru','manufacturer','Абрис+'),

('product','prod-30','ru','name','Краситель по Май-Грюнвальду'),
('product','prod-30','ru','description','Эозин метиленовый синий по методу Май-Грюнвальда для окраски мазков крови. Производитель: Абрис+, Россия.'),
('product','prod-30','ru','manufacturer','Абрис+'),

-- Ветеринария
('product','prod-31','ru','name','Амплификатор детектирующий DTlite (Real-Time PCR)'),
('product','prod-31','ru','description','Компактный многофункциональный амплификатор с детекцией в режиме реального времени. Форматы термоблока: S1/S2 (48 пробирок 0.2 мл) и L (192 пробирки 0.045 мл). 4 или 5 каналов флуоресценции. Анализ кривых плавления. Точность температуры ±0.2°С.'),
('product','prod-31','ru','manufacturer','НПО ДНК-ТЕХНОЛОГИЯ'),

('product','prod-32','ru','name','Ветеринарный биохимический анализатор URIT-8210 Vet'),
('product','prod-32','ru','description','Полностью автоматический биохимический анализатор для сыворотки, плазмы, мочи, ликвора. 10 фотометрических фильтров 340–800 нм. Контроль температуры 37°С ±0.1°С. Объём пробы 2–50 мкл. Память >1200 результатов.'),
('product','prod-32','ru','manufacturer','URIT Medical Electronic Group Co., Ltd'),

('product','prod-33','ru','name','Ветеринарный гематологический анализатор URIT-2900 Plus Vet'),
('product','prod-33','ru','description','Многопараметровый автоматический гематологический анализатор для 13 видов животных (+3 пользовательских профиля). 21 параметр с 3-популяционной дифференцировкой лейкоцитов. Производительность 30 анализов/час. Объём пробы 10 мкл.'),
('product','prod-33','ru','manufacturer','URIT Medical Electronic Group Co., Ltd'),

('product','prod-34','ru','name','Вошер микропланшетный URIT-670'),
('product','prod-34','ru','description','Полуавтоматический промыватель для 96/48-луночных планшетов U, V и плоского дна (ИФА). До 50 методов промывки, до 20 циклов. Объём дозирования 50–450 мкл на лунку. Остаточный объём <2 мкл. 8- или 12-канальная головка.'),
('product','prod-34','ru','manufacturer','URIT Medical Electronic Group Co., Ltd'),

('product','prod-35','ru','name','Ридер микропланшетный URIT-660'),
('product','prod-35','ru','description','Планшетный ридер для автоматического фотометрического анализа ИФА (96/48-луночные планшеты). Измерение одного планшета за 5 сек. Диапазон 400–700 нм. 4 стандартных фильтра (405, 450, 492, 630 нм), расширяемые до 8. Встроенный шейкер 3 скоростей.'),
('product','prod-35','ru','manufacturer','URIT Medical Electronic Group Co., Ltd'),

('product','prod-36','ru','name','Анализатор мочи ветеринарный URIT-50 Vet'),
('product','prod-36','ru','description','Полуавтоматический анализатор мочи для ветеринарных лабораторий. Метод отражательной фотометрии. Производитель: URIT Medical Electronic Group Co., Ltd, КНР.'),
('product','prod-36','ru','manufacturer','URIT Medical Electronic Group Co., Ltd'),

-- Чистые помещения
('product','prod-37','ru','name','ПЦР-бокс Biobase (PCR-800/1200/1300/1500)'),
('product','prod-37','ru','description','Операционный шкаф для ПЦР с вертикальным воздушным потоком. HEPA-фильтрация 99.999% (≥0.3 мкм). УФ-лампа 20–40 Вт с таймером. LED освещение ≥1000 Лк. Скорость потока 0.3–0.5 м/с. Доступны ширины 800, 1200, 1300, 1500 мм.'),
('product','prod-37','ru','manufacturer','Biobase'),

('product','prod-38','ru','name','Ламинарный бокс биологической безопасности II BSC-1300 II B2X'),
('product','prod-38','ru','description','Бокс биологической безопасности класса II тип B2X для микробиологических, биомедицинских и ПЦР-лабораторий. HEPA 99.999% (>0.3 мкм). Скорость входящего потока 0.53 м/с. Двойное закалённое стекло, УФ-лампа 20 Вт.'),
('product','prod-38','ru','manufacturer','Biobase'),

('product','prod-39','ru','name','Вытяжной шкаф Biobase серии FH(P)'),
('product','prod-39','ru','description','Лабораторный вытяжной шкаф для работы с химически агрессивными, летучими и токсичными реагентами. Материал — белый полипропилен 8 мм (устойчив к кислотам и щелочам). Рабочая поверхность из химически стойкой фенольной смолы. Ширина 1000–1800 мм.'),
('product','prod-39','ru','manufacturer','Biobase'),

('product','prod-40','ru','name','Облучатель-рециркулятор бактерицидный «Фиолет Т02»'),
('product','prod-40','ru','description','Бактерицидный рециркулятор закрытого типа для обеззараживания воздуха в присутствии людей. Две безозоновые лампы 15 Вт (TUV15). Производительность 36 м³/ч. Рекомендуемая площадь 14 м². Ресурс лампы 9000 часов.'),
('product','prod-40','ru','manufacturer','Медпромсервис'),

-- Лабораторная посуда
('product','prod-41','ru','name','Чашки Петри'),
('product','prod-41','ru','description','Лабораторные чашки Петри для культивирования микроорганизмов на плотных питательных средах. Выдерживают все химические и термические режимы стерилизации. ГОСТ 25336-82. Размеры 100×20 мм и 90×18 мм (НС и ТС варианты). Упаковка 10–36 шт.'),
('product','prod-41','ru','manufacturer',NULL),

('product','prod-42','ru','name','Микропробирки Eppendorf (Safe-Lock)'),
('product','prod-42','ru','description','Полипропиленовые микропробирки с откидной крышкой системы Safe-Lock. Надёжный замок исключает утечку при центрифугировании. Деления объёма и поверхность для маркировки. Объёмы 0.5 мл, 1.5 мл, 2 мл.'),
('product','prod-42','ru','manufacturer','Eppendorf'),

('product','prod-43','ru','name','Стёкла покровные'),
('product','prod-43','ru','description','Покровные стёкла из бесцветного силикатного стекла толщиной 0.17 мм для защиты микропрепаратов. Широкий ассортимент размеров от 18×18 до 24×60 мм. Упаковка 500 или 1000 шт.'),
('product','prod-43','ru','manufacturer','LabTechnology'),

('product','prod-44','ru','name','Бумага фильтровальная лабораторная'),
('product','prod-44','ru','description','Лабораторная фильтровальная бумага для фильтрации жидкостей и осадков. Широкий ассортимент по размерам и плотности.'),
('product','prod-44','ru','manufacturer',NULL),

('product','prod-45','ru','name','Планшеты для определения групп крови'),
('product','prod-45','ru','description','Планшеты для определения групп крови в лабораторных условиях. Предназначены для работы в КДЛ.'),
('product','prod-45','ru','manufacturer',NULL),

-- Небулайзеры
('product','prod-46','ru','name','Меш-небулайзер Yuwell M102'),
('product','prod-46','ru','description','Портативный бесшумный небулайзер для всей семьи. Подходит для детей и взрослых. Эффективное аэрозольное распыление обеспечивает глубокое проникновение в дыхательные пути. В комплекте детская и взрослая маски.'),
('product','prod-46','ru','manufacturer','Yuwell'),

-- TNC Комплекс
('product','prod-47','ru','name','TNC Комплекс (лизирующий реагент)'),
('product','prod-47','ru','description','Лизирующий реагент для одновременного разрушения эритроцитов и подсчёта лейкоцитов/тромбоцитов в гематологических анализаторах. Совместим с анализаторами URIT, Mindray BC-серия, Sysmex KX-21. Канистра 20 л.'),
('product','prod-47','ru','manufacturer','Диахим')

ON CONFLICT (entity_type,entity_id,locale,field) DO UPDATE SET value=EXCLUDED.value;


-- ──────────────────────────────────────────────────────────────
-- 4. PRODUCT TRANSLATIONS — en (names + short descriptions)
-- ──────────────────────────────────────────────────────────────
INSERT INTO translations (entity_type,entity_id,locale,field,value) VALUES
('product','prod-01','en','name','Hematology Analyzer URIT-3000 Plus'),
('product','prod-01','en','description','19-parameter automatic blood analyzer, 3-part WBC differential. 60 tests/hour, 18 µL sample. 10.4" display, Linux OS. Manufacturer: URIT Medical (China).'),

('product','prod-02','en','name','Hematology Analyzer URIT-5160'),
('product','prod-02','en','description','28-parameter automatic analyzer with 5-part WBC differential and reticulocytes. 60 tests/hour, 20 µL sample. 10.4" touchscreen. Manufacturer: URIT Medical (China).'),

('product','prod-03','en','name','Semi-automatic Urine Analyzer URIT-50'),
('product','prod-03','en','description','14-parameter semi-automatic urine analyzer using reflectance photometry. 60–125 tests/hour. Built-in thermal printer. Manufacturer: URIT Medical (China).'),

('product','prod-04','en','name','Portable Hemoglobinometer URIT-12'),
('product','prod-04','en','description','Portable hemoglobin meter. Result in <10 seconds. Range 4–24 g/dL, 15–20 µL sample. Memory 250 tests. Manufacturer: URIT Medical (China).'),

('product','prod-05','en','name','4-Channel Semi-automatic Coagulation Analyzer URIT-610'),
('product','prod-05','en','description','4-channel coagulometer using magnetic-mechanical principle. Tests: PT, APTT, Thrombin Time, Fibrinogen. 16 sample positions. Manufacturer: URIT Medical (China).'),

('product','prod-06','en','name','Biological Microscope MX-300T (Trinocular)'),
('product','prod-06','en','description','Professional trinocular microscope with ICO Infinitive optics. Up to 2000×. Planachromat objectives 4×–100×. Abbe condenser NA 1.25. LED 12W. Manufacturer: WestMedica (Austria).'),

('product','prod-07','en','name','Biological Microscope MX-100T (Binocular)'),
('product','prod-07','en','description','Binocular lab microscope. Up to 2000×. Objectives 4×–100×. Abbe condenser NA 1.25. LED 12W. Manufacturer: WestMedica (Austria).'),

('product','prod-08','en','name','Biological Microscope MX-50'),
('product','prod-08','en','description','Binocular research microscope, 40×–1000×. Achromat objectives 4×/10×/40×/100×. Adjustable LED illumination. Manufacturer: WestMedica (Austria).'),

('product','prod-09','en','name','Vortex Mixer V-1 plus'),
('product','prod-09','en','description','750–3000 rpm vortex for tubes 0.2–50 mL. 8 hours continuous use. Compact, quiet. Manufacturer: Biosan (Latvia).'),

('product','prod-10','en','name','Multi-Vortex V-32'),
('product','prod-10','en','description','Simultaneously mixes up to 32 tubes, 500–3000 rpm. Continuous and pulse modes. Manufacturer: Biosan (Latvia).'),

('product','prod-11','en','name','Magnetic Stirrer with Heating MSH-300i'),
('product','prod-11','en','description','Digital magnetic stirrer with heating for up to 20 L. Speed 100–1250 rpm, temperature +30…+330°C. External probe support. Manufacturer: Biosan (Latvia).'),

('product','prod-12','en','name','Programmable Solid-State Thermostat "Gnom"'),
('product','prod-12','en','description','Programmable thermostat for 1.5 mL (40 tubes) and 0.5 mL (28 tubes) tubes. Up to 3 sequential temperature-time programs. Range: room temp to 99°C. Manufacturer: DNA-Technology (Russia).'),

('product','prod-13','en','name','Plate Thermoshaker PST-60HL'),
('product','prod-13','en','description','Thermoshaker for standard 96-well plates. +25…+60°C, ±0.1°C stability. 250–1200 rpm. 2 plates simultaneously. Manufacturer: Biosan (Latvia).'),

('product','prod-14','en','name','Water Bath Thermostat TW 2'),
('product','prod-14','en','description','Bench-top water bath. Range room temp +3°C to 90°C, resolution ±0.1°C. Up to 4.5 L. Manufacturer: ELMI (Latvia).'),

('product','prod-15','en','name','High-Speed Centrifuge NS-3180'),
('product','prod-15','en','description','High-speed bench centrifuge up to 21,000 rpm (23,194 × g). 7 rotor configurations (0.5–100 mL). Noise ≤55 dB. Manufacturer: Zonkia (China).'),

('product','prod-16','en','name','Medical Laboratory Centrifuge LMC-3000'),
('product','prod-16','en','description','Low-speed bench centrifuge for tubes (3000 rpm / 1610 × g) and plates (2000 rpm / 560 × g). Imbalance detector. Manufacturer: Biosan (Latvia).'),

('product','prod-17','en','name','Mini Centrifuge-Vortex Combi-Spin FVL-2400N'),
('product','prod-17','en','description','Combined mini-centrifuge and vortex for PCR diagnostics. 2800/3500 rpm (50/60 Hz). Auto-stop on lid open. Manufacturer: Biosan (Latvia).'),

('product','prod-18','en','name','Laboratory Centrifuge CM-6M/CM-6MT'),
('product','prod-18','en','description','Compact multi-purpose centrifuge for tubes and gel cards. 100–3500 rpm, max 2300 × g. 6 braking levels. Manufacturer: ELMI (Latvia).'),

('product','prod-19','en','name','Diachim-Buffer-G (phosphate buffer pH 6.8)'),
('product','prod-19','en','description','Concentrated phosphate buffer pH 6.8–7.2 for preparing Romanowsky-Giemsa staining solutions. Dilution 1:300. Article 483. Manufacturer: Abris+ (Russia).'),

('product','prod-20','en','name','Diachim-Uniclin (glass cleaning agent)'),
('product','prod-20','en','description','Solution for cleaning and degreasing reusable laboratory slides. Capacity: 5,000 slides. Manufacturer: Abris+ (Russia).'),

('product','prod-21','en','name','Diachim-PAP (Papanicolaou staining kit)'),
('product','prod-21','en','description','Reagent kit for Papanicolaou staining of urogenital smears. 100 determinations per kit. Manufacturer: Abris+ (Russia).'),

('product','prod-22','en','name','Diachim-DiffQuik (rapid differential staining)'),
('product','prod-22','en','description','Ready-to-use reagents for rapid (~1 min) differential staining of cells and tissues. No preliminary preparation needed. Manufacturer: Abris+ (Russia).'),

('product','prod-23','en','name','Diachim-CytoStain-S'),
('product','prod-23','en','description','Stain for cytological examinations. Manufacturer: Abris+ (Russia).'),

('product','prod-24','en','name','Diachim-CytoStain-MPO (myeloperoxidase)'),
('product','prod-24','en','description','Stain for detecting myeloperoxidase (MPO) activity in cytological studies. Manufacturer: Abris+ (Russia).'),

('product','prod-25','en','name','Diachim — Helminth Detection Kit (Rabinovich method)'),
('product','prod-25','en','description','Reagent kit for detection of helminth eggs in stool using the Rabinovich method. Manufacturer: Abris+ (Russia).'),

('product','prod-26','en','name','Diachim — Gram Staining Kit'),
('product','prod-26','en','description','Reagent kit for differential Gram staining of bacteria. Manufacturer: Abris+ (Russia).'),

('product','prod-27','en','name','Diachim — Ziehl-Neelsen Staining Kit'),
('product','prod-27','en','description','Kit for staining acid-fast bacteria (Mycobacterium tuberculosis) by Ziehl-Neelsen method. Manufacturer: Abris+ (Russia).'),

('product','prod-28','en','name','Romanowsky Stain (Azure-Eosin)'),
('product','prod-28','en','description','Azure-Eosin stain for blood and bone marrow smears by Romanowsky-Giemsa method. Manufacturer: Abris+ (Russia).'),

('product','prod-29','en','name','Leishman Stain'),
('product','prod-29','en','description','Eosin-methylene blue (Leishman type) for hematological preparations. Manufacturer: Abris+ (Russia).'),

('product','prod-30','en','name','May-Grünwald Stain'),
('product','prod-30','en','description','Eosin-methylene blue by May-Grünwald method for blood smears. Manufacturer: Abris+ (Russia).'),

('product','prod-31','en','name','Real-Time PCR Amplifier DTlite'),
('product','prod-31','en','description','Compact real-time PCR thermocycler. Formats: S1/S2 (48 tubes 0.2 mL), L (192 tubes 0.045 mL). 4 or 5 fluorescence channels. Temperature accuracy ±0.2°C. Manufacturer: DNA-Technology (Russia).'),

('product','prod-32','en','name','Veterinary Biochemistry Analyzer URIT-8210 Vet'),
('product','prod-32','en','description','Fully automatic biochemistry analyzer for serum, plasma, urine, CSF. 10 photometric filters 340–800 nm. Temperature control 37°C ±0.1°C. Sample 2–50 µL. Manufacturer: URIT Medical (China).'),

('product','prod-33','en','name','Veterinary Hematology Analyzer URIT-2900 Plus Vet'),
('product','prod-33','en','description','Multi-parameter automated hematology analyzer for 13+ animal species. 21 parameters, 3-part WBC differential. 30 tests/hour. 10 µL sample. Manufacturer: URIT Medical (China).'),

('product','prod-34','en','name','Microplate Washer URIT-670'),
('product','prod-34','en','description','Semi-automatic washer for 96/48-well ELISA plates. Up to 50 wash programs, 20 cycles. 50–450 µL per well. Residual volume <2 µL. 8- or 12-channel head. Manufacturer: URIT Medical (China).'),

('product','prod-35','en','name','Microplate Reader URIT-660'),
('product','prod-35','en','description','Photometric ELISA reader for 96/48-well plates. 5 sec per plate. Range 400–700 nm. Filters 405/450/492/630 nm (expandable). Built-in shaker. Manufacturer: URIT Medical (China).'),

('product','prod-36','en','name','Veterinary Urine Analyzer URIT-50 Vet'),
('product','prod-36','en','description','Semi-automatic urine analyzer for veterinary labs. Reflectance photometry method. Manufacturer: URIT Medical (China).'),

('product','prod-37','en','name','PCR Box Biobase (PCR-800/1200/1300/1500)'),
('product','prod-37','en','description','PCR cabinet with vertical airflow. HEPA 99.999% (≥0.3 µm). UV lamp with timer. LED ≥1000 lux. Available widths: 800–1500 mm. Manufacturer: Biobase (China).'),

('product','prod-38','en','name','Biological Safety Cabinet Class II BSC-1300 II B2X'),
('product','prod-38','en','description','Class II type B2X biosafety cabinet for microbiology, biomedicine, PCR labs. HEPA 99.999% (>0.3 µm). Inflow 0.53 m/s. Double tempered glass. UV lamp 20W. Manufacturer: Biobase (China).'),

('product','prod-39','en','name','Fume Hood Biobase FH(P) Series'),
('product','prod-39','en','description','Chemical fume hood for work with aggressive, volatile and toxic reagents. White polypropylene 8 mm (acid/alkali resistant). Chemical-resistant phenolic resin worktop. Widths 1000–1800 mm. Manufacturer: Biobase (China).'),

('product','prod-40','en','name','UV Recirculator "Violet T02"'),
('product','prod-40','en','description','Closed-type UV recirculator for air disinfection in the presence of people. Two 15W ozone-free UV lamps. Capacity 36 m³/h. Recommended area 14 m². Lamp life 9,000 hours. Manufacturer: Medpromservis (Ukraine).'),

('product','prod-41','en','name','Petri Dishes'),
('product','prod-41','en','description','Laboratory Petri dishes for microbial culture on solid media. Withstand all chemical and thermal sterilization cycles. GOST 25336-82. Sizes 100×20 mm and 90×18 mm. Pack 10–36 pcs.'),

('product','prod-42','en','name','Eppendorf Microtubes (Safe-Lock)'),
('product','prod-42','en','description','Polypropylene microtubes with Safe-Lock snap-cap. Leak-proof for centrifugation. Volume markings and writing surface. 0.5 mL, 1.5 mL, 2 mL.'),

('product','prod-43','en','name','Coverslips'),
('product','prod-43','en','description','0.17 mm coverslips from colourless silicate glass. Sizes 18×18 to 24×60 mm. Packs of 500 or 1,000 pcs. Manufacturer: LabTechnology.'),

('product','prod-44','en','name','Filter Paper'),
('product','prod-44','en','description','Laboratory filter paper for filtration of liquids and precipitates. Wide range of sizes and densities available.'),

('product','prod-45','en','name','Blood Grouping Plates'),
('product','prod-45','en','description','Laboratory plates for blood group determination.'),

('product','prod-46','en','name','Mesh Nebulizer Yuwell M102'),
('product','prod-46','en','description','Silent portable mesh nebulizer for all ages. Child and adult masks included. Deep aerosol penetration into airways. Manufacturer: Yuwell (China).'),

('product','prod-47','en','name','TNC Complex (lysing reagent)'),
('product','prod-47','en','description','Lysing reagent for simultaneous RBC lysis and WBC/PLT counting. Compatible with URIT, Mindray BC series, Sysmex KX-21. 20 L canister. Manufacturer: Diachim (Russia).')

ON CONFLICT (entity_type,entity_id,locale,field) DO UPDATE SET value=EXCLUDED.value;


-- ──────────────────────────────────────────────────────────────
-- 5. PRODUCT TRANSLATIONS — kz (names only; system falls back to ru)
-- ──────────────────────────────────────────────────────────────
INSERT INTO translations (entity_type,entity_id,locale,field,value) VALUES
('product','prod-01','kz','name','Гематологиялық анализатор URIT-3000 Plus'),
('product','prod-02','kz','name','Гематологиялық анализатор URIT-5160'),
('product','prod-03','kz','name','Зәр жартыавтоматты анализаторы URIT-50'),
('product','prod-04','kz','name','Портативті гемоглобинометр URIT-12'),
('product','prod-05','kz','name','4 арналы жартыавтоматты коагулометр URIT-610'),
('product','prod-06','kz','name','Биологиялық микроскоп МХ-300Т (тринокулярлы)'),
('product','prod-07','kz','name','Биологиялық микроскоп МХ-100Т (бинокулярлы)'),
('product','prod-08','kz','name','Биологиялық микроскоп МХ-50'),
('product','prod-09','kz','name','Вортекс-миксер V-1 plus'),
('product','prod-10','kz','name','Мульти-вортекс V-32'),
('product','prod-11','kz','name','Жылытқышы бар магниттік мешалка MSH-300i'),
('product','prod-12','kz','name','Бағдарламаланатын термостат «Гном»'),
('product','prod-13','kz','name','Планшеттік термошейкер PST-60HL'),
('product','prod-14','kz','name','Су моншасы-термостат TW 2'),
('product','prod-15','kz','name','Жоғары жылдамдықты центрифуга НС-3180'),
('product','prod-16','kz','name','Медициналық зертханалық центрифуга LMC-3000'),
('product','prod-17','kz','name','Мини-центрифуга-вортекс комби-спин FVL-2400N'),
('product','prod-18','kz','name','Зертханалық центрифуга CM-6M/CM-6MT'),
('product','prod-19','kz','name','Диахим-Буфер-Г'),
('product','prod-20','kz','name','Диахим-Уникліn'),
('product','prod-21','kz','name','Диахим-ПАП (Папаниколау бояуына арналған жинақ)'),
('product','prod-22','kz','name','Диахим-Диффквик (жылдам дифференциалды бояу)'),
('product','prod-23','kz','name','Диахим-ЦитоСтейн-С'),
('product','prod-24','kz','name','Диахим-ЦитоСтейн-МПО'),
('product','prod-25','kz','name','Диахим — гельминттерге арналған жинақ (Рабинович)'),
('product','prod-26','kz','name','Диахим — Грам бояуына арналған жинақ'),
('product','prod-27','kz','name','Диахим — Циль-Нильсен бояуына арналған жинақ'),
('product','prod-28','kz','name','Романовский бояуышы (Азур-Эозин)'),
('product','prod-29','kz','name','Лейшман бояуышы'),
('product','prod-30','kz','name','Май-Грюнвальд бояуышы'),
('product','prod-31','kz','name','Нақты уақыт режиміндегі амплификатор DTlite'),
('product','prod-32','kz','name','Ветеринарлық биохимиялық анализатор URIT-8210 Vet'),
('product','prod-33','kz','name','Ветеринарлық гематологиялық анализатор URIT-2900 Plus Vet'),
('product','prod-34','kz','name','Микропланшеттік вошер URIT-670'),
('product','prod-35','kz','name','Микропланшеттік ридер URIT-660'),
('product','prod-36','kz','name','Ветеринарлық зәр анализаторы URIT-50 Vet'),
('product','prod-37','kz','name','ПЦР-бокс Biobase (PCR-800/1200/1300/1500)'),
('product','prod-38','kz','name','Ламинарлы бокс BSC-1300 II B2X'),
('product','prod-39','kz','name','Тартпалы шкаф Biobase FH(P) сериясы'),
('product','prod-40','kz','name','Бактерицидтік рециркулятор «Фиолет Т02»'),
('product','prod-41','kz','name','Петри табақшалары'),
('product','prod-42','kz','name','Эппендорф микропробиркалары (Safe-Lock)'),
('product','prod-43','kz','name','Жабын шыны'),
('product','prod-44','kz','name','Сүзгіш қағаз'),
('product','prod-45','kz','name','Қан тобын анықтауға арналған планшеттер'),
('product','prod-46','kz','name','Меш-небулайзер Yuwell M102'),
('product','prod-47','kz','name','TNC Комплекс (лизирлеуші реагент)')
ON CONFLICT (entity_type,entity_id,locale,field) DO UPDATE SET value=EXCLUDED.value;


-- ──────────────────────────────────────────────────────────────
-- BATCH 2 — 64 additional products from full site scrape
-- New categories: cat-16 (PCR Automation), cat-17 (Disinfectants),
--                 cat-18 (Diabetes), cat-19 (Tonometers)
-- Products: prod-48 .. prod-111
-- ──────────────────────────────────────────────────────────────

-- New categories
INSERT INTO categories (id, slug, sort_order, is_active) VALUES
  ('cat-16','avtomatizatsiya-ptsr',16,true),
  ('cat-17','dezinfektsiya',       17,true),
  ('cat-18','diagnostika-diabeta', 18,true),
  ('cat-19','tonometry',           19,true)
ON CONFLICT (id) DO UPDATE SET slug=EXCLUDED.slug, sort_order=EXCLUDED.sort_order;

INSERT INTO translations (entity_type,entity_id,locale,field,value) VALUES
  ('category','cat-16','ru','name','Автоматизация ПЦР-лаборатории'),
  ('category','cat-16','kz','name','ПЦР зертханасын автоматтандыру'),
  ('category','cat-16','en','name','PCR Lab Automation'),
  ('category','cat-17','ru','name','Дезинфицирующие средства'),
  ('category','cat-17','kz','name','Дезинфекциялаушы заттар'),
  ('category','cat-17','en','name','Disinfectants'),
  ('category','cat-18','ru','name','Диагностика диабета'),
  ('category','cat-18','kz','name','Диабет диагностикасы'),
  ('category','cat-18','en','name','Diabetes Diagnostics'),
  ('category','cat-19','ru','name','Тонометры'),
  ('category','cat-19','kz','name','Тонометрлер'),
  ('category','cat-19','en','name','Tonometers')
ON CONFLICT (entity_type,entity_id,locale,field) DO UPDATE SET value=EXCLUDED.value;


-- ── PRODUCTS batch 2 ─────────────────────────────────────────
INSERT INTO products (id,slug,category_id,price,images,specs,features,is_featured,is_active,hits) VALUES

-- ── Красители Диахим (продолжение) ───────────────────────────
('prod-48','diakhim-sk','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__4e__128-4e5cd8af.jpeg'],
  '{"Метод":"о-толидиновый","Назначение":"Обнаружение скрытой крови в кале"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-49','diakhim-uristejn','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__72__121-72052b6f.jpeg'],
  '{"Назначение":"Суправитальный краситель осадка мочи","Исследований":"~200"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-50','diakhim-tsitostejn-gk','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__e8__119-e8bbfbab.jpeg'],
  '{"Краситель":"Гематоксилин Карачи","Объём":"250 мл","Определений":"1000"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-51','diakhim-tsitostejn-gm','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__e8__119-e8bbfbab.jpeg'],
  '{"Краситель":"Гематоксилин Майера","Объём":"250 мл","Определений":"1000"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-52','diakhim-tsitostejn-ne','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__cc__117-ccd592ee.jpeg'],
  '{"Назначение":"Неспецифическая эстераза в лейкоцитах","Определений":"10","Материал":"кровь, костный мозг"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-53','diakhim-tsitostejn-pas','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__e8__116-e857c3d8.jpeg'],
  '{"Назначение":"Выявление гликогена (ПАС-реакция)","Определений":"6","Материал":"мазки крови, костный мозг, ликвор, лимфоузлы"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-54','diakhim-tsitostejn-sch','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__f2__115-f2d60014.jpeg'],
  '{"Назначение":"Выявление фосфолипидов (Судан)","Определений":"12","Материал":"кровь, костный мозг"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-55','diakhim-tsitostejn-mpo-benzidinom','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__d6__114-d6545122.jpeg'],
  '{"Назначение":"Миелопероксидаза (с бензидином)","Определений":"12","Материал":"кровь, костный мозг"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-56','diakhim-likvor','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__29__113-29dbe6a0.jpeg'],
  '{"Назначение":"Клинический анализ спинномозговой жидкости","Тесты":"цитоз, реакция Панди, реакция Нонне-Апельта"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-57','diakhim-klinika-mocha','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__0d__112-0d59b796.jpeg'],
  '{"Назначение":"Клинический анализ мочи","Показатели":"pH, глюкоза, кетоны, билирубин, уробилиноиды","pH диапазон":"5.0-9.0"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-58','diakhim-nabor-analiza-mokroty','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__da__110-da398059.jpeg'],
  '{"Назначение":"Анализ мокроты (окраска Циль-Нильсен, Романовский-Май-Грюнвальд)"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-59','diakhim-nabor-analiza-kala','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__f4__p00015-f4964535.jpeg'],
  '{"Назначение":"Клинический анализ кала","Тесты":"скрытая кровь (бензидин), билирубин (Фуше), стеркобилин, микроскопия"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-60','diakhim-kato','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__9d__108-9dc328f6.jpeg'],
  '{"Назначение":"Исследование кала на яйца гельминтов (метод Като)","Метод":"Толстые мазки с глицерином и малахитовым зелёным"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-61','diakhim-gemistejn-r-klassik','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__d0__p00014-d0141403.jpeg'],
  '{"Краситель":"Азур-эозин по Романовскому","Разведение":"1:20-1:45","Ёмкость":"10000-25000 препаратов","Стабильность р-ра":"24 ч"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-62','diakhim-gemistejn-rtts','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__b9__106-b9ad41b3.jpeg'],
  '{"Назначение":"Суправитальная окраска ретикулоцитов","Объём":"50 мл","Исследований":"~1000"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-63','diakhim-gemistejn-mg','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__69__104-69a0b265.jpeg'],
  '{"Краситель":"Май-Грюнвальд в метаноле (фиксирующий)","Ёмкость фиксации":"до 3000","Ёмкость окрашивания":"до 4000"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-64','diakhim-gemistejn-l','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__b2__102-b2ad54d1.jpeg'],
  '{"Краситель":"Лейшман в метаноле (фиксирующий)","Ёмкость фиксации":"до 3000","Ёмкость окрашивания":"до 4000","Артикул":"438"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-65','krasitel-azur-eozin-professional','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__8c__100-8caec62b.jpeg'],
  '{"Краситель":"Азур-эозин (Романовский Профессионал)","Разведение":"1:10-1:15","Ёмкость":"6000-8000 препаратов","Стабильность р-ра":"6-8 ч"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-66','diakhim-reagenty-kamery-goryaeva','cat-04',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__c4__124-c48e3e81.jpeg'],
  '{"Назначение":"Подсчёт форменных элементов крови в камере Горяева","Лейкоциты":"1250 иссл.","Эритроциты":"125 иссл.","Тромбоциты":"125 иссл."}'::jsonb,'[]'::jsonb,false,true,0),

-- ── ПЦР-реагенты (ДНК-Технология) ───────────────────────────
('prod-67','tnc-kompleks-ptsr','cat-09',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__be__147-be8a701f.jpeg'],
  '{"Метод":"Мультиплексная ПЦР в реальном времени","Выявляет":"T.vaginalis, N.gonorrhoeae, C.trachomatis","Материал":"моча, соскобы уретры, цервикального канала","Артикул":"RT FL"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-68','tsitomegalovirus-tsvm-gen','cat-09',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__19__002-19d33016.jpeg'],
  '{"Метод":"ПЦР в реальном времени","Выявляет":"ДНК ЦМВ","Материал":"слюна, моча, соскобы уретры/цервикального канала, мононуклеары крови"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-69','hpv-kvant-21','cat-09',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__8c__006-8cb7b0d7.jpeg'],
  '{"Метод":"ПЦР в реальном времени","Выявляет":"ВПЧ 21 типа (низкий и высокий онкориск)","Типы ВПЧ":"6,11,44 (низкий); 16,18,26,31,33,35,39,45,51,52,53,56,58,59,66,68,73,82 (высокий)"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-70','sars-cov-2-sars-cov','cat-09',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__a8__007-a835e1e1.jpeg'],
  '{"Метод":"Мультиплексная ОТ-ПЦР в реальном времени","Мишени":"N-ген, E-ген","Время анализа":"~2 ч","Материал":"мазки носоглотки/ротоглотки, БАЛ, мокрота"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-71','virus-gepatita-b-hbv-kolichestvennyj','cat-09',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/ac/ac85ec81.jpeg'],
  '{"Метод":"Количественная ПЦР в реальном времени","Выявляет":"ДНК вируса гепатита B","Материал":"плазма крови","Название":"ГЕПАТОГЕН-Б количественный"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-72','femoflor-skrin','cat-09',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__b9__0013-b93bb6a2.jpeg'],
  '{"Метод":"ПЦР в реальном времени","Назначение":"Скрининг микробиоты урогенитального тракта (женщины)","Каналы":"FAM, HEX, ROX"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-73','femoflor-16','cat-09',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__9d__0012-9db9e794.jpeg'],
  '{"Метод":"ПЦР в реальном времени","Показателей":"25 (23 группы микроорганизмов)","Тестов на пробу":"12","Каналы":"FAM, HEX, ROX"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-74','androflor-skrin','cat-09',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__fb__0015-fb3f01ac.jpeg'],
  '{"Метод":"ПЦР в реальном времени","Назначение":"Микробиота урогенитального тракта (мужчины)","Материал":"соскобы уретры, моча, секрет простаты, эякулят"}'::jsonb,'[]'::jsonb,false,true,0),

-- ── Биохимические реагенты HUMAN Diagnostics ─────────────────
('prod-75','urea-liquicolor','cat-13',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__81__6-8102cf22.png'],
  '{"Назначение":"Определение мочевины","Метод":"Ферментативный (уреаза/GLDH)","Линейный диапазон":"2-50 ммоль/л","CV":"<=5%","Длина волны":"340 нм","Объём":"2x100 мл"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-76','triglycerides-liquicolor-mono','cat-13',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__81__6-8102cf22.png'],
  '{"Назначение":"Определение триглицеридов","Метод":"Ферментативный колориметрический (АЛФ)","Линейный диапазон":"1-11.3 ммоль/л","CV":"<=5%","Упаковка":"9x15 мл"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-77','glucose-liquicolor','cat-13',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__81__6-8102cf22.png'],
  '{"Назначение":"Определение глюкозы","Метод":"Глюкозооксидазный","Линейный диапазон":"1-27.8 ммоль/л","CV":"<=5%","Длина волны":"505 нм","Упаковка":"4x100 мл"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-78','cholesterol-liquicolor','cat-13',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__4b__6-fc793515-4b898c9d.webp'],
  '{"Назначение":"Определение холестерина","Метод":"Ферментативный","Линейный диапазон":"0.5-18.1 ммоль/л","CV":"<=5%","Длина волны":"500-546 нм"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-79','nabor-srb','cat-13',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__3b__9-3b1b378f.png'],
  '{"Назначение":"Определение С-реактивного белка (СРБ)","Метод":"Иммунотурбидиметрический","Норма":"<6 мг/л","Линейность":"до 150 мг/л","Предел обнаружения":"3 мг/л"}'::jsonb,'[]'::jsonb,false,true,0),

-- ── ИФА реагенты + оборудование ──────────────────────────────
('prod-80','immunofa-at-tpo','cat-11',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__09__300-09ba875c.png'],
  '{"Метод":"ИФА","Назначение":"Аутоантитела к тиреоидной пероксидазе (АТ-ТПО)","Материал":"сыворотка крови"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-81','immunofa-testosteron','cat-11',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__09__300-09ba875c.png'],
  '{"Метод":"ИФА","Назначение":"Количественное определение тестостерона","Материал":"сыворотка крови"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-82','immunofa-afp','cat-11',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__09__300-09ba875c.png'],
  '{"Метод":"Одноэтапный твёрдофазный ИФА","Назначение":"Альфа-фетопротеин (АФП)","Применение":"Диагностика первичного рака печени, пороков плода"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-83','vosher-avtomaticheskij-iw-8','cat-11',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__5d__iw8-5d4e783a.png'],
  '{"Назначение":"Автоматический промыватель 96-луночных планшетов (ИФА)","Мин. доза":"25 мкл","Макс. доза":"1600 мкл","Точность":"±2.5%","Программ":"50","Время промывки":"<=45 с (300 мкл)","Питание":"12В 22 Вт","Размеры":"375x345x180 мм"}'::jsonb,'[]'::jsonb,false,true,0),

-- ── ПЦР-лаборатория (оборудование) ───────────────────────────
('prod-84','dtkliner','cat-09',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/bc/bced00f5.jpeg'],
  '{"Назначение":"Очистка лунок ПЦР-амплификаторов","Питание":"110-240В 50-60 Гц","Масса":"0.15 кг","Непрерывная работа":"20-25 мин","Совместимость":"ДТпрайм М, ДТлайт S"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-85','amplifikator-dt-prime','cat-09',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/e5/e5989fa6.png'],
  '{"Диапазон температур":"0-100°C","Точность":"±0.2°C","Скорость нагрева":"3.3°C/с (96-лун)","Каналов детекции":"4 или 5","Форматы":"96 (0.2 мл), 384 (0.045 мл)","Размеры":"210x540x540 мм","Масса":"27 кг"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-86','ptsr-detektor-dzhin-4','cat-09',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/9d/9d6a9f03.jpeg'],
  '{"Каналы детекции":"2","Длины волн":"470/514 нм и 532/580 нм","Время детекции блока":"<=30 с (12 пробирок)","Питание":"5В USB","Чувствительность":"<=0.001 пмоль/мкл"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-87','aspirator-fta-2i','cat-09',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/2b/2bb0b69b.png'],
  '{"Вакуум":"-200 до -800 мбар (рег.)","Скорость аспирации":"до 10 л/мин","Объём колбы":"2 л (автоклавируемый полипропилен)","Питание":"12В 1А 10.8 Вт","Масса":"1.85 кг","Размеры":"185x290x390 мм"}'::jsonb,'[]'::jsonb,false,true,0),

-- ── Автоматизация ПЦР ────────────────────────────────────────
('prod-88','dtpak','cat-16',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/48/48963f42.jpeg'],
  '{"Назначение":"Запечатывание микропланшетов для ПЦР"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-89','dtstream','cat-16',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/18/183176d8.jpeg'],
  '{"Назначение":"Автоматизированная подготовка реакционных смесей для ПЦР","Производительность":"800 образцов/смена","Вариантов исполнения":"12","Типов компонентов":"20"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-90','dt-prime-ii','cat-16',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/47/4757d45d.jpeg'],
  '{"Назначение":"Детектирующий амплификатор 2-го поколения для ПЦР в реальном времени"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-91','dtmaster','cat-16',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/66/66808fac.png'],
  '{"Назначение":"ПО для управления детектирующими амплификаторами серии ДТ"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-92','dtintegrator','cat-16',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/1c/1cd3aa6a.jpeg'],
  '{"Назначение":"ПО для автоматизации ПЦР-лаборатории, интеграция всех этапов анализа"}'::jsonb,'[]'::jsonb,false,true,0),

-- ── Биохимическая лаборатория (оборудование) ─────────────────
('prod-93','urit-880','cat-13',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__d8__201-d8cadd68.jpeg'],
  '{"Тип":"Полуавтоматический биохимический","Метод":"Фотоэлектрическая колориметрия","Точность длины волны":"±2 нм","Диапазон OD":"-0.3-4.0","Точность температуры":"±0.2°C","CV":"<=1.0%","Перекрёстное загрязнение":"<=1.0%"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-94','urit-910-plus','cat-13',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__6d__urit910-6dac73d5.jpeg'],
  '{"Параметры":"K+, Na+, Cl-, Ca2+, pH, TCO2","Метод":"Ионоселективные электроды","Типы образцов":"кровь, моча, ликвор","Производительность":"50 тестов/час","Мин. объём пробы":"100-150 мкл","Память":"10 000 результатов","Размеры":"432x296x453 мм","Масса":"12.2 кг"}'::jsonb,'[]'::jsonb,false,true,0),

-- ── Дезинфицирующие средства ─────────────────────────────────
('prod-95','biaridez-lajt','cat-17',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__d3__biaridezlight-d3f3ad30.jpeg'],
  '{"Действие":"Бактерицидное, вирулицидное, туберкулоцидное, фунгицидное, спорицидное","pH":"7.0±2.0","Срок хранения":"7 лет","Стабильность р-ров":"48 суток"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-96','biaklinakva','cat-17',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/19/19ace96e.jpeg'],
  '{"Тип":"Кожный антисептик","Применение":"Гигиена рук, УЗИ/МРТ датчики, ампулы","Экспозиция (бактерии)":"30 с","Экспозиция (вирусы/грибы)":"1 мин","Экспозиция (туберкулёз)":"1.5 мин"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-97','biaseptin','cat-17',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/90/903887bf.jpeg'],
  '{"Активные вещества":"Изопропиловый спирт 70±5%, ЧАС","Гигиеническая обработка рук":"10 с","Хирургическая обработка":"1 мин","Дезинфекция поверхностей":"30 с","Биоматериалы":"10 мин"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-98','biaseptikm','cat-17',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/29/29aa12e6.jpeg'],
  '{"Активные вещества":"Изопропиловый спирт 75±5%","Гигиеническая обработка":"10 с","Хирургическая обработка":"1 мин","Инъекционное место":"15 с","Операционное поле":"1 мин"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-99','biaprofi','cat-17',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/c5/c5fceb70.jpeg'],
  '{"Активные вещества":"Изопропиловый спирт 75±5%, хлоргексидина биглюконат","Гигиеническая обработка":"10 с","Хирургическая обработка":"1 мин","Инструменты":"1.5 мин (двукратно)"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-100','biatsid-poroshok','cat-17',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/09/099fa7ee.jpeg'],
  '{"Основа":"Перкарбонат натрия","Активный кислород":"7.0-9.0%","pH":"9.5±1.5","Срок хранения":"5 лет","Стабильность р-ров":"10 суток","Эффект":"Отбеливающий"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-101','biakhlor','cat-17',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/51/51f4d006.jpeg'],
  '{"Основа":"Na-ДХЦК (натрий дихлоризоцианурат)","Активный хлор":"50±10%","pH":"нейтральный","Срок хранения":"7 лет","Стабильность р-ров":"28 суток","Особенность":"Деконтаминирует ДНК/РНК ампликоны"}'::jsonb,'[]'::jsonb,false,true,0),

-- ── Тонометры ────────────────────────────────────────────────
('prod-102','tonometr-ye630cr','cat-19',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/dc/dcd2e79b.jpeg'],
  '{"Тип":"Электронный с Bluetooth","Обхват руки":"22-36 см","Аккумулятор":"250+ измерений","Срок службы":"5 лет (6 раз/день)","Стандарты":"ESH/AAMI","Размеры":"125x62x24 мм","Масса":"257 г","Артикул":"YE630CR"}'::jsonb,'[]'::jsonb,false,true,0),

-- ── Диагностика диабета ───────────────────────────────────────
('prod-103','glyukometr-660','cat-18',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/b9/b941479c.png'],
  '{"Диапазон":"1.1-33.3 ммоль/л","Объём пробы":"1 мкл","Время результата":"<10 с","Память":"500 измерений","Автоотключение":"15 с - 3 мин"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-104','glyukometr-582','cat-18',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/5b/5b8031be.jpeg'],
  '{"Диапазон":"1.1-33.3 ммоль/л","Объём пробы":"1 мкл","Время результата":"<10 с","Память":"250 измерений","Гематокрит":"30-60%","Батарейки":"~1000 измерений"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-105','cgm-anytime-ct300d','cat-18',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/a4/a4779acc.jpeg'],
  '{"Тип":"Система непрерывного мониторинга глюкозы","Срок сенсора":"14 суток","Диапазон":"1.7-27.8 ммоль/л","Частота":"480 точек/сутки (каждые 3 мин)","Точность":"±20%","Передача данных":"Bluetooth","Артикул":"CT300D"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-106','element-multi','cat-18',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/b5/b501db48.jpeg'],
  '{"Параметры":"глюкоза, общий холестерин, триглицериды, ЛВП, ЛНП","Объём пробы":"0.3 мкл","Время (глюкоза)":"3 с","Время (холестерин)":"120 с","Погрешность":"<=5% (гл, хол, ТГ), <=7% (ЛВП)","Память":"100 результатов"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-107','analizator-hba1c-pch-100','cat-18',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/34/347a4605.png'],
  '{"Назначение":"Гликированный гемоглобин HbA1c","Метод":"Твёрдофазная рефлектометрия","Время теста":"<=3.5 мин","Диапазон":"4.0-15.0% HbA1c","Объём пробы":"5 мкл","CV":"<=8%","Принтер":"Встроенный термопринтер","Артикул":"PCH-100"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-108','clover-a1c','cat-18',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/1e/1e66c973.jpeg'],
  '{"Назначение":"HbA1c + глюкоза","Метод":"Борнатная аффинная хроматография / амперометрия","HbA1c диапазон":"4.0-14.0%","Глюкоза диапазон":"10-600 мг/дл","Объём HbA1c":"4 мкл","Объём глюкоза":"0.3 мкл","Время HbA1c":"5 мин","Время глюкоза":"3 с","Память":"200 результатов"}'::jsonb,'[]'::jsonb,false,true,0),

-- ── Ветеринария новые ─────────────────────────────────────────
('prod-109','dt-prime-vet','cat-05',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/cc/cc98149f.jpeg'],
  '{"Тип":"Детектирующий амплификатор Real-Time PCR для ветеринарии","Каналов детекции":"4 или 5","Точность":"±0.2°C","Масса":"27 кг"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-110','urit-880-vet','cat-05',NULL,
  ARRAY['https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/products/templates__yootheme__cache__d8__201-d8cadd68.jpeg'],
  '{"Тип":"Полуавтоматический биохимический (ветеринария)","Точность длины волны":"±2 нм","CV":"<=1.0%","Перекрёстное загрязнение":"<=1.0%","Артикул":"URIT-880 Vet"}'::jsonb,'[]'::jsonb,false,true,0),

('prod-111','aspirator-fta-1-vet','cat-05',NULL,
  ARRAY['https://www.labtech.kz/templates/yootheme/cache/70/70b06aa5.png'],
  '{"Назначение":"Аспиратор с колбой-ловушкой для ветеринарных лабораторий","Артикул":"FTA-1"}'::jsonb,'[]'::jsonb,false,true,0)

ON CONFLICT (id) DO UPDATE SET
  images=EXCLUDED.images, specs=EXCLUDED.specs,
  category_id=EXCLUDED.category_id, is_active=EXCLUDED.is_active;


-- ── Translations batch 2 — ru ─────────────────────────────────
INSERT INTO translations (entity_type,entity_id,locale,field,value) VALUES
('product','prod-48','ru','name','Диахим-СК (обнаружение скрытой крови в кале)'),
('product','prod-48','ru','description','Набор реагентов для обнаружения скрытой крови в кале. Метод о-толидина: сине-зеленое соединение при взаимодействии с кислородом, выделяемым из перекиси водорода в присутствии крови.'),
('product','prod-48','ru','manufacturer','Абрис+'),
('product','prod-49','ru','name','Диахим-УриСтейн (суправитальный краситель осадка мочи)'),
('product','prod-49','ru','description','Суправитальный краситель для чёткой идентификации и дифференцировки клеток осадка мочи. Гиалиновые цилиндры окрашиваются в синий цвет. ~200 исследований.'),
('product','prod-49','ru','manufacturer','Абрис+'),
('product','prod-50','ru','name','Диахим-ЦитоСтейн-ГК (гематоксилин Карачи)'),
('product','prod-50','ru','description','Цитологический и гистологический краситель. Ядра форменных элементов крови и костного мозга окрашиваются избирательно в синий/сине-сиреневый цвет. 250 мл, ~1000 определений.'),
('product','prod-50','ru','manufacturer','Абрис+'),
('product','prod-51','ru','name','Диахим-ЦитоСтейн-ГМ (гематоксилин Майера)'),
('product','prod-51','ru','description','Цитологический краситель для избирательного окрашивания ядер клеток. Используется в стандартных цитологических и гистохимических протоколах. 250 мл, ~1000 определений.'),
('product','prod-51','ru','manufacturer','Абрис+'),
('product','prod-52','ru','name','Диахим-ЦитоСтейн-НЭ (неспецифическая эстераза)'),
('product','prod-52','ru','description','Набор для определения активности неспецифической эстеразы в лейкоцитах. Диагностический маркёр острых лейкозов. Метод: гидролиз α-нафтилацетата с образованием красно-коричневого осадка. 10 определений.'),
('product','prod-52','ru','manufacturer','Абрис+'),
('product','prod-53','ru','name','Диахим-ЦитоСтейн-ПАС (гликоген)'),
('product','prod-53','ru','description','Набор для выявления гликогена (ПАС-реакция). Диагностический маркёр острых лейкозов и лимфолейкозов. Материал: мазки крови, костный мозг, ликвор, лимфоузлы. 6 определений.'),
('product','prod-53','ru','manufacturer','Абрис+'),
('product','prod-54','ru','name','Диахим-ЦитоСтейн-СЧ (фосфолипиды с Суданом)'),
('product','prod-54','ru','description','Набор для выявления фосфолипидов с Суданом. Диагностический маркёр острых лейкозов. Применяется совместно с реакцией на МПО для идентификации миелолейкоза. 12 определений.'),
('product','prod-54','ru','manufacturer','Абрис+'),
('product','prod-55','ru','name','Диахим-ЦитоСтейн-МПО (с бензидином)'),
('product','prod-55','ru','description','Набор для выявления миелопероксидазы. Диагностический маркёр острых лейкозов. Пероксидаза окисляет бензидин с перекисью водорода, образуя интенсивно окрашенные соединения. 12 определений.'),
('product','prod-55','ru','manufacturer','Абрис+'),
('product','prod-56','ru','name','Диахим-Ликвор (клинический анализ ликвора)'),
('product','prod-56','ru','description','Набор для клинического анализа спинномозговой жидкости. Определяет клеточный состав (цитоз), белок (реакция Панди), глобулины (реакция Нонне-Апельта).'),
('product','prod-56','ru','manufacturer','Абрис+'),
('product','prod-57','ru','name','Диахим-Клиника-Моча'),
('product','prod-57','ru','description','Набор реагентов для клинического анализа мочи. Определяет pH 5.0-9.0, глюкозу, кетоны, билирубин и уробилиноиды колориметрическими методами.'),
('product','prod-57','ru','manufacturer','Абрис+'),
('product','prod-58','ru','name','Диахим — набор для анализа мокроты'),
('product','prod-58','ru','description','Набор для микроскопического и бактериологического исследования мокроты: окраска по Цилю-Нильсену, выявление макрофагов с гемосидерином, окраска по Романовскому-Маю-Грюнвальду.'),
('product','prod-58','ru','manufacturer','Абрис+'),
('product','prod-59','ru','name','Диахим — набор для анализа кала'),
('product','prod-59','ru','description','Набор для клинического анализа кала. Тесты: скрытая кровь (бензидиновый метод), билирубин (реактив Фуше), стеркобилин (уксуснокислый цинк + Люголь), микроскопия.'),
('product','prod-59','ru','manufacturer','Абрис+'),
('product','prod-60','ru','name','Диахим-Като (гельминты, метод Като)'),
('product','prod-60','ru','description','Набор для исследования кала на яйца гельминтов методом Като. Создание толстых мазков фекалий, осветлённых глицерином и окрашенных малахитовым зелёным.'),
('product','prod-60','ru','manufacturer','Абрис+'),
('product','prod-61','ru','name','Диахим-ГемиСтейн-Р «Классик» (Романовский)'),
('product','prod-61','ru','description','Краситель по Романовскому для мазков крови. Раствор 0.76% азур-эозина в метаноле и глицерине. Разведение 1:20-1:45. Ёмкость 10 000-25 000 препаратов. Стабильность рабочего раствора 24 ч.'),
('product','prod-61','ru','manufacturer','Абрис+'),
('product','prod-62','ru','name','Диахим-ГемиСтейн-РТЦ (ретикулоциты)'),
('product','prod-62','ru','description','Суправитальный краситель для идентификации ретикулоцитов. Молодые эритроциты окрашиваются в сине-зелёный цвет при взаимодействии с ретикулофиламентозной субстанцией. 50 мл, ~1000 исследований.'),
('product','prod-62','ru','manufacturer','Абрис+'),
('product','prod-63','ru','name','Диахим-ГемиСтейн-МГ (Май-Грюнвальд)'),
('product','prod-63','ru','description','Фиксирующий краситель — раствор эозина метиленового синего по Маю-Грюнвальду в метаноле. Фиксация 2-3 мин. Ёмкость: фиксация до 3000, окрашивание до 4000 препаратов.'),
('product','prod-63','ru','manufacturer','Абрис+'),
('product','prod-64','ru','name','Диахим-ГемиСтейн-Л (Лейшман)'),
('product','prod-64','ru','description','Фиксирующий краситель типа Лейшмана в метаноле. Фиксация 2-3 мин. Ёмкость: фиксация до 3000, окрашивание до 4000 препаратов. Артикул 438.'),
('product','prod-64','ru','manufacturer','Абрис+'),
('product','prod-65','ru','name','Краситель Азур-Эозин по Романовскому «Профессионал»'),
('product','prod-65','ru','description','Универсальный краситель по Романовскому для мазков крови, костного мозга, лимфоузлов, хромосом и цитологических препаратов. Разведение 1:10-1:15. Ёмкость 6000-8000 препаратов.'),
('product','prod-65','ru','manufacturer','Абрис+'),
('product','prod-66','ru','name','Диахим — реагенты для камеры Горяева'),
('product','prod-66','ru','description','Набор для подсчёта форменных элементов крови в камере Горяева. Лейкоциты: 1250 исследований, эритроциты: 125, тромбоциты: 125.'),
('product','prod-66','ru','manufacturer','Абрис+'),
('product','prod-67','ru','name','TNC Комплекс (ПЦР: хламидии, гонококк, трихомонада)'),
('product','prod-67','ru','description','Набор для одновременного выявления ДНК Trichomonas vaginalis, Neisseria gonorrhoeae и Chlamydia trachomatis мультиплексной ПЦР в реальном времени. Материал: моча, соскобы уретры, цервикального канала. Артикул RT FL.'),
('product','prod-67','ru','manufacturer','ДНК-Технология'),
('product','prod-68','ru','name','Цитомегаловирус (ЦМВ-ГЕН)'),
('product','prod-68','ru','description','Набор для выявления ДНК цитомегаловируса методом ПЦР в реальном времени. Материал: слюна, моча, соскобы уретры и цервикального канала, мононуклеары периферической крови.'),
('product','prod-68','ru','manufacturer','ДНК-Технология'),
('product','prod-69','ru','name','HPV Квант-21 (ВПЧ 21 тип)'),
('product','prod-69','ru','description','Набор для выявления, типирования и количественного определения ДНК ВПЧ 21 типа (низкого и высокого онкориска) методом ПЦР в реальном времени. Охватывает типы 6, 11, 16, 18, 31, 33, 35, 39, 45, 51, 52, 56, 58, 59 и другие.'),
('product','prod-69','ru','manufacturer','ДНК-Технология'),
('product','prod-70','ru','name','SARS-CoV-2/SARS-CoV (ПЦР)'),
('product','prod-70','ru','description','Набор для выявления РНК SARS-CoV-2 и SARS-CoV мультиплексной ОТ-ПЦР в реальном времени. Три геномные мишени (N-ген, E-ген), внутренний контроль. Материал: мазки носоглотки/ротоглотки, БАЛ. Время ~2 ч.'),
('product','prod-70','ru','manufacturer','ДНК-Технология'),
('product','prod-71','ru','name','Вирус гепатита B (HBV) — количественный ПЦР'),
('product','prod-71','ru','description','Набор для количественного определения ДНК вируса гепатита B (ГЕПАТОГЕН-Б количественный). Применяется для диагностики и оценки эффективности противовирусной терапии. Материал: плазма крови.'),
('product','prod-71','ru','manufacturer','ДНК-Технология'),
('product','prod-72','ru','name','Фемофлор Скрин (микробиота у женщин)'),
('product','prod-72','ru','description','Скрининговая оценка микробиоты урогенитального тракта у женщин репродуктивного возраста. Определяет соотношение нормофлоры (Lactobacillus spp.) к общей бактериальной массе. ПЦР в реальном времени.'),
('product','prod-72','ru','manufacturer','ДНК-Технология'),
('product','prod-73','ru','name','Фемофлор 16 (25 показателей микробиоты)'),
('product','prod-73','ru','description','Количественное исследование микробиоценоза урогенитального тракта у женщин. 25 показателей (23 группы микроорганизмов) из одной биопробы методом ПЦР в реальном времени.'),
('product','prod-73','ru','manufacturer','ДНК-Технология'),
('product','prod-74','ru','name','Андрофлор Скрин (микробиота у мужчин)'),
('product','prod-74','ru','description','Выявление ДНК безусловно-патогенных и условно-патогенных микроорганизмов урогенитального тракта у мужчин. Материал: соскобы уретры, моча, секрет простаты, эякулят. ПЦР в реальном времени.'),
('product','prod-74','ru','manufacturer','ДНК-Технология'),
('product','prod-75','ru','name','Urea liquicolor (определение мочевины, HUMAN)'),
('product','prod-75','ru','description','Ферментативный колориметрический набор для определения мочевины в сыворотке, плазме и моче. Уреаза + GLDH. Линейный диапазон 2-50 ммоль/л, 340 нм, 2×100 мл.'),
('product','prod-75','ru','manufacturer','HUMAN Diagnostics'),
('product','prod-76','ru','name','Triglycerides liquicolor mono (триглицериды, HUMAN)'),
('product','prod-76','ru','description','Ферментативный колориметрический набор для определения триглицеридов в сыворотке и плазме. С антилипидным фактором (АЛФ). Диапазон 1-11.3 ммоль/л. 9×15 мл.'),
('product','prod-76','ru','manufacturer','HUMAN Diagnostics'),
('product','prod-77','ru','name','Glucose liquicolor (глюкоза, HUMAN)'),
('product','prod-77','ru','description','Ферментативный колориметрический тест для определения глюкозы в сыворотке и плазме без депротеинизации. Глюкозооксидазный метод. Диапазон 1-27.8 ммоль/л, 505 нм, 4×100 мл.'),
('product','prod-77','ru','manufacturer','HUMAN Diagnostics'),
('product','prod-78','ru','name','Cholesterol liquicolor (холестерин, HUMAN)'),
('product','prod-78','ru','description','Ферментативный набор для определения холестерина в сыворотке и плазме. Совместим с любым открытым биохимическим анализатором. Диапазон 0.5-18.1 ммоль/л, 500-546 нм.'),
('product','prod-78','ru','manufacturer','HUMAN Diagnostics'),
('product','prod-79','ru','name','Набор для определения С-реактивного белка (СРБ)'),
('product','prod-79','ru','description','Иммунотурбидиметрическое определение СРБ. Совместим с открытыми биохимическими анализаторами. Норма <6 мг/л, линейность до 150 мг/л, предел обнаружения 3 мг/л.'),
('product','prod-79','ru','manufacturer','Hospitex Diagnostics'),
('product','prod-80','ru','name','ИммуноФА-АТ-ТПО (антитела к тиреоидной пероксидазе)'),
('product','prod-80','ru','description','Количественное определение аутоантител к тиреоидной пероксидазе (АТ-ТПО) в сыворотке крови методом ИФА. Стрипованные полистироловые планшеты.'),
('product','prod-80','ru','manufacturer','Иммунотех'),
('product','prod-81','ru','name','ИммуноФА-Тестостерон'),
('product','prod-81','ru','description','Количественное определение тестостерона в сыворотке крови методом ИФА. Применяется при диагностике гирсутизма у женщин, оценке функции яичек, опухолей надпочечников.'),
('product','prod-81','ru','manufacturer','Иммунотех'),
('product','prod-82','ru','name','ИммуноФА-АФП (альфа-фетопротеин)'),
('product','prod-82','ru','description','Одноэтапный твёрдофазный ИФА для количественного определения альфа-фетопротеина. Применяется при диагностике первичного рака печени и пороков развития плода.'),
('product','prod-82','ru','manufacturer','Иммунотех'),
('product','prod-83','ru','name','Вошер автоматический микропланшетный IW-8'),
('product','prod-83','ru','description','Автоматический промыватель 96-луночных планшетов для ИФА. 3 канала промывающих растворов, датчики массы. 50 программ. Время промывки одного планшета <=45 с (300 мкл/лунку). Точность ±2.5%.'),
('product','prod-83','ru','manufacturer','Biosan'),
('product','prod-84','ru','name','ДТклинер (очистка лунок амплификаторов)'),
('product','prod-84','ru','description','Устройство для быстрой очистки лунок ПЦР-амплификаторов. Ускоряет процесс в несколько раз по сравнению с ручным способом. Использует одноразовые ватные тампоны. Предотвращает паразитные оптические сигналы.'),
('product','prod-84','ru','manufacturer','ДНК-Технология'),
('product','prod-85','ru','name','Амплификатор детектирующий DT-Prime (Real-Time PCR)'),
('product','prod-85','ru','description','Детектирующий амплификатор в реальном времени. Форматы: 96 (0.2 мл) и 384 (0.045 мл) образцов. 4 или 5 каналов флуоресценции. Точность ±0.2°C. Масса 27 кг.'),
('product','prod-85','ru','manufacturer','ДНК-Технология'),
('product','prod-86','ru','name','ПЦР-детектор флуоресцентный «Джин-4»'),
('product','prod-86','ru','description','Флуоресцентный детектор для регистрации результатов ПЦР с реагентами формата FLASH. 2 канала детекции (470/514 нм и 532/580 нм). Вместимость ротора 12 пробирок. Питание 5В USB.'),
('product','prod-86','ru','manufacturer','ДНК-Технология'),
('product','prod-87','ru','name','Аспиратор с колбой-ловушкой FTA-2i'),
('product','prod-87','ru','description','Аспиратор для удаления следовых количеств жидкости со стенок пробирок. Вакуум -200 до -800 мбар (регулируемый). Колба-ловушка 2 л (автоклавируемый полипропилен). Датчик уровня жидкости.'),
('product','prod-87','ru','manufacturer','Biosan'),
('product','prod-88','ru','name','ДТпак (запечатывание микропланшетов)'),
('product','prod-88','ru','description','Устройство для запечатывания микропланшетов. Предотвращает испарение реагентов при ПЦР.'),
('product','prod-88','ru','manufacturer','ДНК-Технология'),
('product','prod-89','ru','name','ДТстрим (автоматизация подготовки ПЦР-смесей)'),
('product','prod-89','ru','description','Автоматизированная система подготовки реакционных смесей. 12 вариантов исполнения, 20 типов компонентов. Дозирует 800 образцов за одну рабочую смену.'),
('product','prod-89','ru','manufacturer','ДНК-Технология'),
('product','prod-90','ru','name','ДТпрайм II (амплификатор 2-го поколения)'),
('product','prod-90','ru','description','Детектирующий амплификатор второго поколения для ПЦР в реальном времени серии ДТ.'),
('product','prod-90','ru','manufacturer','ДНК-Технология'),
('product','prod-91','ru','name','ДТмастер (ПО для амплификаторов ДТ)'),
('product','prod-91','ru','description','Программное обеспечение для управления детектирующими амплификаторами серии ДТ.'),
('product','prod-91','ru','manufacturer','ДНК-Технология'),
('product','prod-92','ru','name','ДТинтегратор (автоматизация ПЦР-лаборатории)'),
('product','prod-92','ru','description','ПО для автоматизации ПЦР-лаборатории. Интеграция всех этапов анализа в единую систему управления.'),
('product','prod-92','ru','manufacturer','ДНК-Технология'),
('product','prod-93','ru','name','Биохимический анализатор URIT-880'),
('product','prod-93','ru','description','Полуавтоматический биохимический анализатор для количественных биохимических и иммунологических тестов. Работает с сывороткой, мочой, ликвором и плазмой. Метод: фотоэлектрическая колориметрия. CV <=1.0%.'),
('product','prod-93','ru','manufacturer','URIT Medical'),
('product','prod-94','ru','name','Анализатор электролитов URIT-910 Plus'),
('product','prod-94','ru','description','Анализатор электролитов K+, Na+, Cl-, Ca2+, pH, TCO2 в сыворотке, плазме, цельной крови, моче и ликворе. Метод ионоселективных электродов. 50 тестов/час, память 10 000 результатов.'),
('product','prod-94','ru','manufacturer','URIT Medical'),
('product','prod-95','ru','name','БиаРидез Лайт (концентрат дезинфицирующего средства)'),
('product','prod-95','ru','description','Жидкий концентрат с широким спектром действия: бактерицидное, вирулицидное, туберкулоцидное, фунгицидное, спорицидное. Нейтрализует запахи, обезжиривает. Стабильность рабочих растворов 48 суток.'),
('product','prod-95','ru','manufacturer','Бирюза'),
('product','prod-96','ru','name','БиаКлинАква (кожный антисептик)'),
('product','prod-96','ru','description','Кожный антисептик на основе ЧАС и ПГМГ. Применяется для гигиены рук (10 с), дезинфекции УЗИ/МРТ датчиков, флаконов и ампул. Гигиена рук 10 с, вирусы/грибы 1 мин.'),
('product','prod-96','ru','manufacturer','Бирюза'),
('product','prod-97','ru','name','БиаСептин (антисептик на основе ИПС 70%)'),
('product','prod-97','ru','description','Дезинфицирующее средство на основе изопропилового спирта 70±5% и смеси ЧАС. Гигиеническая обработка рук 10 с, хирургическая обработка 1 мин, дезинфекция поверхностей 30 с, биоматериалы 10 мин.'),
('product','prod-97','ru','manufacturer','Бирюза'),
('product','prod-98','ru','name','БиаСептикМ (антисептик на основе ИПС 75%)'),
('product','prod-98','ru','description','Кожный антисептик на основе изопропилового спирта 75%. Гигиеническая обработка рук 10 с, хирургическая 1 мин, инъекционное поле 15 с, операционное поле 1 мин.'),
('product','prod-98','ru','manufacturer','Бирюза'),
('product','prod-99','ru','name','БиаПрофи (ИПС 75% + хлоргексидин)'),
('product','prod-99','ru','description','Антисептик на основе ИПС 75% и хлоргексидина биглюконата. Хирургическая обработка рук, операционное поле, инструменты. Инструменты: 1.5 мин двукратно.'),
('product','prod-99','ru','manufacturer','Бирюза'),
('product','prod-100','ru','name','Биацид (дезинфектант на основе перкарбоната, порошок)'),
('product','prod-100','ru','description','Порошковый дезинфектант на основе перкарбоната натрия. Полный спектр: бактерицидное, вирулицидное, туберкулоцидное, фунгицидное, спорицидное действие. Отбеливающий эффект. Срок хранения 5 лет.'),
('product','prod-100','ru','manufacturer','Бирюза'),
('product','prod-101','ru','name','БиаХлор (хлорсодержащий дезинфектант)'),
('product','prod-101','ru','description','Хлорсодержащий препарат на основе Na-ДХЦК. Полный спектр дезинфекции. Активный хлор 50±10%. Стабильность рабочих растворов 28 суток. Деконтаминирует ДНК/РНК ампликоны.'),
('product','prod-101','ru','manufacturer','Бирюза'),
('product','prod-102','ru','name','Электронный тонометр Yuwell YE630CR'),
('product','prod-102','ru','description','Компактный электронный тонометр с Bluetooth и подключением к смартфону. Вращающаяся манжета 360°, обхват 22-36 см. 250+ измерений на аккумуляторе. Голосовые оповещения, определение нерегулярного пульса. Стандарты ESH/AAMI.'),
('product','prod-102','ru','manufacturer','Yuwell'),
('product','prod-103','ru','name','Глюкометр Yuwell 660'),
('product','prod-103','ru','description','Современный глюкометр с голосовыми объявлениями, подсветкой экрана, автоматическим кодированием. Диапазон 1.1-33.3 ммоль/л. Объём пробы 1 мкл. Результат <10 с. Память 500 измерений.'),
('product','prod-103','ru','manufacturer','Yuwell'),
('product','prod-104','ru','name','Глюкометр Yuwell 582'),
('product','prod-104','ru','description','Компактный глюкометр. Результат за 8 секунд из 1 мкл крови. Автокалибровка, подсветка, голосовые объявления. ~1000 измерений на комплекте батареек. Память 250 измерений.'),
('product','prod-104','ru','manufacturer','Yuwell'),
('product','prod-105','ru','name','Система непрерывного мониторинга глюкозы Yuwell Anytime CT300D'),
('product','prod-105','ru','description','Система НМГ для лечения сахарного диабета (от 14 лет). Измеряет уровень сахара каждые 3 минуты (480 точек/сутки), передаёт данные по Bluetooth. Срок службы сенсора 14 суток. Диапазон 1.7-27.8 ммоль/л.'),
('product','prod-105','ru','manufacturer','Yuwell'),
('product','prod-106','ru','name','Element Multi (экспресс-анализатор: глюкоза + липидный профиль)'),
('product','prod-106','ru','description','Портативный экспресс-анализатор: глюкоза, общий холестерин, триглицериды, ЛВП, ЛНП. Объём пробы 0.3 мкл. Глюкоза за 3 с, холестерин за 120 с. Погрешность <=5%. Память 100 результатов.'),
('product','prod-106','ru','manufacturer','OSANG'),
('product','prod-107','ru','name','Анализатор HbA1c PCH-100 (гликированный гемоглобин)'),
('product','prod-107','ru','description','Портативный анализатор гликированного гемоглобина HbA1c. Метод: твёрдофазная рефлектометрия. Время теста <=3.5 мин. Диапазон 4.0-15.0% HbA1c. Объём 5 мкл. CV <=8%. Встроенный термопринтер, голосовые подсказки.'),
('product','prod-107','ru','manufacturer','Sinocare'),
('product','prod-108','ru','name','Анализатор HbA1c + глюкоза Clover A1c'),
('product','prod-108','ru','description','Анализатор для определения гликированного гемоглобина A1c и глюкозы в цельной крови. Метод борнатной аффинной хроматографии. HbA1c диапазон 4.0-14.0%, время 5 мин. Глюкоза 0.3 мкл, результат за 3 с.'),
('product','prod-108','ru','manufacturer','OSANG (Infopia)'),
('product','prod-109','ru','name','Амплификатор DT-Prime (ветеринария)'),
('product','prod-109','ru','description','Детектирующий амплификатор Real-Time PCR для ветеринарных ПЦР-исследований. 4 или 5 каналов флуоресценции. Точность ±0.2°C. ПО ДТмастер (русский и английский). Масса 27 кг.'),
('product','prod-109','ru','manufacturer','ДНК-Технология'),
('product','prod-110','ru','name','Биохимический анализатор URIT-880 VET (ветеринария)'),
('product','prod-110','ru','description','Полуавтоматический биохимический анализатор для ветеринарных клиник. Высокоточная фотоэлектрическая колориметрия. CV <=1.0%, перекрёстное загрязнение <=1.0%.'),
('product','prod-110','ru','manufacturer','URIT Medical'),
('product','prod-111','ru','name','Аспиратор с колбой-ловушкой FTA-1 (ветеринария)'),
('product','prod-111','ru','description','Аспиратор для удаления жидкостей со стенок пробирок в ветеринарных лабораториях. Артикул FTA-1.'),
('product','prod-111','ru','manufacturer','Biosan')

ON CONFLICT (entity_type,entity_id,locale,field) DO UPDATE SET value=EXCLUDED.value;


-- ── Translations batch 2 — kz (names only) ───────────────────
INSERT INTO translations (entity_type,entity_id,locale,field,value) VALUES
('product','prod-48','kz','name','Диахим-СК (нәжіста жасырын қан)'),
('product','prod-49','kz','name','Диахим-УриСтейн (зәр тұнбасының бояуышы)'),
('product','prod-50','kz','name','Диахим-ЦитоСтейн-ГК (Карачи гематоксилині)'),
('product','prod-51','kz','name','Диахим-ЦитоСтейн-ГМ (Майер гематоксилині)'),
('product','prod-52','kz','name','Диахим-ЦитоСтейн-НЭ (спецификалық емес эстераза)'),
('product','prod-53','kz','name','Диахим-ЦитоСтейн-ПАС (гликоген)'),
('product','prod-54','kz','name','Диахим-ЦитоСтейн-СЧ (фосфолипидтер)'),
('product','prod-55','kz','name','Диахим-ЦитоСтейн-МПО (бензидинмен)'),
('product','prod-56','kz','name','Диахим-Ликвор (жұлын сұйықтығы)'),
('product','prod-57','kz','name','Диахим-Клиника-Зәр'),
('product','prod-58','kz','name','Диахим — қақырықты зерттеуге арналған жинақ'),
('product','prod-59','kz','name','Диахим — нәжісті зерттеуге арналған жинақ'),
('product','prod-60','kz','name','Диахим-Като (гельминттер)'),
('product','prod-61','kz','name','Диахим-ГемиСтейн-Р «Классик»'),
('product','prod-62','kz','name','Диахим-ГемиСтейн-РТЦ (ретикулоциттер)'),
('product','prod-63','kz','name','Диахим-ГемиСтейн-МГ (Май-Грюнвальд)'),
('product','prod-64','kz','name','Диахим-ГемиСтейн-Л (Лейшман)'),
('product','prod-65','kz','name','Азур-Эозин бояуышы «Профессионал»'),
('product','prod-66','kz','name','Диахим — Горяев камерасына арналған реагенттер'),
('product','prod-67','kz','name','TNC Комплекс (ПЦР: хламидия, гонококк, трихомонада)'),
('product','prod-68','kz','name','Цитомегаловирус (ЦМВ-ГЕН)'),
('product','prod-69','kz','name','HPV Квант-21 (ВПЧ 21 түрі)'),
('product','prod-70','kz','name','SARS-CoV-2/SARS-CoV (ПЦР)'),
('product','prod-71','kz','name','Гепатит B вирусы (HBV) — сандық ПЦР'),
('product','prod-72','kz','name','Фемофлор Скрин'),
('product','prod-73','kz','name','Фемофлор 16'),
('product','prod-74','kz','name','Андрофлор Скрин'),
('product','prod-75','kz','name','Urea liquicolor (мочевина)'),
('product','prod-76','kz','name','Triglycerides liquicolor mono (триглицеридтер)'),
('product','prod-77','kz','name','Glucose liquicolor (глюкоза)'),
('product','prod-78','kz','name','Cholesterol liquicolor (холестерин)'),
('product','prod-79','kz','name','С-реактивті ақуыз (СРБ) жинағы'),
('product','prod-80','kz','name','ИммуноФА-АТ-ТПО'),
('product','prod-81','kz','name','ИммуноФА-Тестостерон'),
('product','prod-82','kz','name','ИммуноФА-АФП (альфа-фетопротеин)'),
('product','prod-83','kz','name','Автоматты микропланшеттік вошер IW-8'),
('product','prod-84','kz','name','ДТклинер'),
('product','prod-85','kz','name','ДТ-Прайм амплификаторы (Real-Time ПЦР)'),
('product','prod-86','kz','name','ПЦР-флуоресцентты детектор «Джин-4»'),
('product','prod-87','kz','name','Аспиратор FTA-2i'),
('product','prod-88','kz','name','ДТпак (микропланшеттерді жабу)'),
('product','prod-89','kz','name','ДТстрим (ПЦР қоспаларын дайындау)'),
('product','prod-90','kz','name','ДТпрайм II'),
('product','prod-91','kz','name','ДТмастер (ПЦР бағдарламасы)'),
('product','prod-92','kz','name','ДТинтегратор'),
('product','prod-93','kz','name','Биохимиялық анализатор URIT-880'),
('product','prod-94','kz','name','Электролиттер анализаторы URIT-910 Plus'),
('product','prod-95','kz','name','БиаРидез Лайт (дезинфекциялаушы концентрат)'),
('product','prod-96','kz','name','БиаКлинАква (тері антисептигі)'),
('product','prod-97','kz','name','БиаСептин (ИПС 70%)'),
('product','prod-98','kz','name','БиаСептикМ (ИПС 75%)'),
('product','prod-99','kz','name','БиаПрофи (ИПС 75% + хлоргексидин)'),
('product','prod-100','kz','name','Биацид (ұнтақ дезинфектант)'),
('product','prod-101','kz','name','БиаХлор (хлор бар дезинфектант)'),
('product','prod-102','kz','name','Электрондық тонометр Yuwell YE630CR'),
('product','prod-103','kz','name','Глюкометр Yuwell 660'),
('product','prod-104','kz','name','Глюкометр Yuwell 582'),
('product','prod-105','kz','name','Yuwell Anytime CT300D үздіксіз мониторинг жүйесі'),
('product','prod-106','kz','name','Element Multi (глюкоза + липидтер)'),
('product','prod-107','kz','name','HbA1c анализаторы PCH-100'),
('product','prod-108','kz','name','HbA1c + глюкоза анализаторы Clover A1c'),
('product','prod-109','kz','name','DT-Prime амплификаторы (ветеринария)'),
('product','prod-110','kz','name','Биохимиялық анализатор URIT-880 VET'),
('product','prod-111','kz','name','FTA-1 аспираторы (ветеринария)')
ON CONFLICT (entity_type,entity_id,locale,field) DO UPDATE SET value=EXCLUDED.value;


-- ── Translations batch 2 — en ─────────────────────────────────
INSERT INTO translations (entity_type,entity_id,locale,field,value) VALUES
('product','prod-48','en','name','Diakhim-SK (Fecal Occult Blood Detection)'),
('product','prod-48','en','description','Reagent kit for occult blood detection in stool. o-Tolidine method: blue-green compound forms in presence of blood. Manufacturer: Abris+ (Russia).'),
('product','prod-48','en','manufacturer','Abris+'),

('product','prod-49','en','name','Diakhim-UriStain (Urine Sediment Supravital Stain)'),
('product','prod-49','en','description','Supravital stain for clear identification and differentiation of urine sediment cells. Hyaline casts stain blue. ~200 determinations. Manufacturer: Abris+ (Russia).'),
('product','prod-49','en','manufacturer','Abris+'),

('product','prod-50','en','name','Diakhim-CytoStain-HK (Carazzi Hematoxylin)'),
('product','prod-50','en','description','Cytological and histological stain. Nuclei of blood and bone marrow cells stain selectively blue/blue-violet. 250 mL, ~1,000 determinations. Manufacturer: Abris+ (Russia).'),
('product','prod-50','en','manufacturer','Abris+'),

('product','prod-51','en','name','Diakhim-CytoStain-HM (Mayer Hematoxylin)'),
('product','prod-51','en','description','Cytological stain for selective nuclear staining. Used in standard cytological and histochemical protocols. 250 mL, ~1,000 determinations. Manufacturer: Abris+ (Russia).'),
('product','prod-51','en','manufacturer','Abris+'),

('product','prod-52','en','name','Diakhim-CytoStain-NE (Non-Specific Esterase)'),
('product','prod-52','en','description','Kit for determination of non-specific esterase activity in leukocytes. Diagnostic marker for acute leukemias. Hydrolysis of α-naphthyl acetate yields red-brown precipitate. 10 determinations. Manufacturer: Abris+ (Russia).'),
('product','prod-52','en','manufacturer','Abris+'),

('product','prod-53','en','name','Diakhim-CytoStain-PAS (Glycogen)'),
('product','prod-53','en','description','Kit for glycogen detection (PAS reaction). Diagnostic marker for acute leukemias and lympholeukemias. Material: blood smears, bone marrow, CSF, lymph nodes. 6 determinations. Manufacturer: Abris+ (Russia).'),
('product','prod-53','en','manufacturer','Abris+'),

('product','prod-54','en','name','Diakhim-CytoStain-SB (Phospholipids with Sudan Black)'),
('product','prod-54','en','description','Kit for phospholipid detection with Sudan Black. Diagnostic marker for acute leukemias. Used together with MPO reaction to identify myeloid leukemia. 12 determinations. Manufacturer: Abris+ (Russia).'),
('product','prod-54','en','manufacturer','Abris+'),

('product','prod-55','en','name','Diakhim-CytoStain-MPO (Myeloperoxidase, Benzidine)'),
('product','prod-55','en','description','Kit for myeloperoxidase detection. Diagnostic marker for acute leukemias. Peroxidase oxidises benzidine with hydrogen peroxide to form intensely coloured compounds. 12 determinations. Manufacturer: Abris+ (Russia).'),
('product','prod-55','en','manufacturer','Abris+'),

('product','prod-56','en','name','Diakhim-Liquor (CSF Clinical Analysis)'),
('product','prod-56','en','description','Kit for clinical analysis of cerebrospinal fluid. Determines cellular composition (cytosis), protein (Pandy reaction), globulins (Nonne-Apelt reaction). Manufacturer: Abris+ (Russia).'),
('product','prod-56','en','manufacturer','Abris+'),

('product','prod-57','en','name','Diakhim-Klinika-Urine (Urinalysis Kit)'),
('product','prod-57','en','description','Reagent kit for clinical urinalysis. Determines pH 5.0–9.0, glucose, ketones, bilirubin and urobilinoids by colorimetric methods. Manufacturer: Abris+ (Russia).'),
('product','prod-57','en','manufacturer','Abris+'),

('product','prod-58','en','name','Diakhim — Sputum Analysis Kit'),
('product','prod-58','en','description','Kit for microscopic and bacteriological sputum examination: Ziehl-Neelsen staining, hemosiderin-laden macrophage detection, Romanowsky-May-Grünwald staining. Manufacturer: Abris+ (Russia).'),
('product','prod-58','en','manufacturer','Abris+'),

('product','prod-59','en','name','Diakhim — Stool Analysis Kit'),
('product','prod-59','en','description','Kit for clinical stool analysis. Tests: occult blood (benzidine method), bilirubin (Fouchet reagent), stercobilin (zinc acetate + Lugol), microscopy. Manufacturer: Abris+ (Russia).'),
('product','prod-59','en','manufacturer','Abris+'),

('product','prod-60','en','name','Diakhim-Kato (Helminth Analysis, Kato Method)'),
('product','prod-60','en','description','Kit for stool examination for helminth eggs using the Kato method. Thick faecal smears clarified with glycerin and stained with malachite green. Manufacturer: Abris+ (Russia).'),
('product','prod-60','en','manufacturer','Abris+'),

('product','prod-61','en','name','Diakhim-HemiStain-R "Classic" (Romanowsky)'),
('product','prod-61','en','description','Romanowsky stain for blood smears. 0.76% azure-eosin in methanol and glycerine. Dilution 1:20–1:45. Capacity 10,000–25,000 preparations. Working solution stable 24 h. Manufacturer: Abris+ (Russia).'),
('product','prod-61','en','manufacturer','Abris+'),

('product','prod-62','en','name','Diakhim-HemiStain-RTC (Reticulocytes)'),
('product','prod-62','en','description','Supravital stain for reticulocyte identification. Young erythrocytes stain blue-green via interaction with reticulofilamentous substance. 50 mL, ~1,000 determinations. Manufacturer: Abris+ (Russia).'),
('product','prod-62','en','manufacturer','Abris+'),

('product','prod-63','en','name','Diakhim-HemiStain-MG (May-Grünwald)'),
('product','prod-63','en','description','Fixing stain — eosin methylene blue solution (May-Grünwald) in methanol. Fixation 2–3 min. Capacity: fixation up to 3,000, staining up to 4,000 preparations. Manufacturer: Abris+ (Russia).'),
('product','prod-63','en','manufacturer','Abris+'),

('product','prod-64','en','name','Diakhim-HemiStain-L (Leishman)'),
('product','prod-64','en','description','Leishman-type fixing stain in methanol. Fixation 2–3 min. Capacity: fixation up to 3,000, staining up to 4,000 preparations. Article 438. Manufacturer: Abris+ (Russia).'),
('product','prod-64','en','manufacturer','Abris+'),

('product','prod-65','en','name','Azure-Eosin Romanowsky Stain "Professional"'),
('product','prod-65','en','description','Universal Romanowsky stain for blood, bone marrow, lymph nodes, chromosomes and cytological preparations. Dilution 1:10–1:15. Capacity 6,000–8,000 preparations. Manufacturer: Abris+ (Russia).'),
('product','prod-65','en','manufacturer','Abris+'),

('product','prod-66','en','name','Diakhim — Goryaev Chamber Reagents'),
('product','prod-66','en','description','Kit for counting blood cells in a Goryaev chamber. Leukocytes: 1,250 tests; erythrocytes: 125; platelets: 125. Manufacturer: Abris+ (Russia).'),
('product','prod-66','en','manufacturer','Abris+'),

('product','prod-67','en','name','TNC Complex (PCR: Chlamydia, Gonococci, Trichomonas)'),
('product','prod-67','en','description','Multiplex real-time PCR kit for simultaneous detection of Trichomonas vaginalis, Neisseria gonorrhoeae and Chlamydia trachomatis DNA. Material: urine, urethral/cervical swabs. Article RT FL. Manufacturer: DNA-Technology (Russia).'),
('product','prod-67','en','manufacturer','DNA-Technology'),

('product','prod-68','en','name','Cytomegalovirus (CMV-GEN, Real-Time PCR)'),
('product','prod-68','en','description','Kit for CMV DNA detection by real-time PCR. Material: saliva, urine, urethral/cervical swabs, peripheral blood mononuclear cells. Manufacturer: DNA-Technology (Russia).'),
('product','prod-68','en','manufacturer','DNA-Technology'),

('product','prod-69','en','name','HPV Quant-21 (21 HPV Types)'),
('product','prod-69','en','description','Kit for detection, typing and quantification of 21 HPV types (low and high oncogenic risk) by real-time PCR. Covers types 6, 11, 16, 18, 31, 33, 35, 39, 45, 51, 52, 56, 58, 59 and others. Manufacturer: DNA-Technology (Russia).'),
('product','prod-69','en','manufacturer','DNA-Technology'),

('product','prod-70','en','name','SARS-CoV-2 / SARS-CoV (RT-PCR)'),
('product','prod-70','en','description','Multiplex RT-PCR kit for detection of SARS-CoV-2 and SARS-CoV RNA. Three genomic targets (N-gene, E-gene) plus internal control. Material: nasopharyngeal/oropharyngeal swabs, BAL. ~2 h. Manufacturer: DNA-Technology (Russia).'),
('product','prod-70','en','manufacturer','DNA-Technology'),

('product','prod-71','en','name','Hepatitis B Virus (HBV) — Quantitative PCR'),
('product','prod-71','en','description','Kit for quantitative HBV DNA determination (HEPATOGEN-B quantitative). Used for diagnosis and monitoring of antiviral therapy efficacy. Material: blood plasma. Manufacturer: DNA-Technology (Russia).'),
('product','prod-71','en','manufacturer','DNA-Technology'),

('product','prod-72','en','name','Femoflor Screen (Female Urogenital Microbiota)'),
('product','prod-72','en','description','Screening assessment of urogenital tract microbiota in women of reproductive age. Determines ratio of Lactobacillus spp. to total bacterial mass. Real-time PCR. Manufacturer: DNA-Technology (Russia).'),
('product','prod-72','en','manufacturer','DNA-Technology'),

('product','prod-73','en','name','Femoflor 16 (25 Microbiota Parameters)'),
('product','prod-73','en','description','Quantitative urogenital microbiocenosis analysis in women. 25 parameters (23 microbial groups) from a single sample by real-time PCR. Manufacturer: DNA-Technology (Russia).'),
('product','prod-73','en','manufacturer','DNA-Technology'),

('product','prod-74','en','name','Androflor Screen (Male Urogenital Microbiota)'),
('product','prod-74','en','description','Detection of obligate and opportunistic pathogens in the male urogenital tract. Material: urethral swabs, urine, prostate secretion, ejaculate. Real-time PCR. Manufacturer: DNA-Technology (Russia).'),
('product','prod-74','en','manufacturer','DNA-Technology'),

('product','prod-75','en','name','Urea liquicolor (Urea, HUMAN Diagnostics)'),
('product','prod-75','en','description','Enzymatic colorimetric kit for urea determination in serum, plasma and urine. Urease + GLDH method. Linear range 2–50 mmol/L, 340 nm, 2×100 mL. Manufacturer: HUMAN Diagnostics (Germany).'),
('product','prod-75','en','manufacturer','HUMAN Diagnostics'),

('product','prod-76','en','name','Triglycerides liquicolor mono (HUMAN Diagnostics)'),
('product','prod-76','en','description','Enzymatic colorimetric kit for triglycerides in serum and plasma. With anti-lipid factor (ALF). Range 1–11.3 mmol/L. 9×15 mL. Manufacturer: HUMAN Diagnostics (Germany).'),
('product','prod-76','en','manufacturer','HUMAN Diagnostics'),

('product','prod-77','en','name','Glucose liquicolor (HUMAN Diagnostics)'),
('product','prod-77','en','description','Enzymatic colorimetric test for glucose in serum and plasma. Glucose oxidase method. Range 1–27.8 mmol/L, 505 nm, 4×100 mL. Manufacturer: HUMAN Diagnostics (Germany).'),
('product','prod-77','en','manufacturer','HUMAN Diagnostics'),

('product','prod-78','en','name','Cholesterol liquicolor (HUMAN Diagnostics)'),
('product','prod-78','en','description','Enzymatic kit for cholesterol in serum and plasma. Compatible with any open biochemistry analyzer. Range 0.5–18.1 mmol/L, 500–546 nm. Manufacturer: HUMAN Diagnostics (Germany).'),
('product','prod-78','en','manufacturer','HUMAN Diagnostics'),

('product','prod-79','en','name','C-Reactive Protein (CRP) Detection Kit'),
('product','prod-79','en','description','Immunoturbidimetric CRP assay. Compatible with open biochemistry analyzers. Normal <6 mg/L, linearity up to 150 mg/L, detection limit 3 mg/L. Manufacturer: Hospitex Diagnostics.'),
('product','prod-79','en','manufacturer','Hospitex Diagnostics'),

('product','prod-80','en','name','ImmunoFA-AT-TPO (Anti-Thyroid Peroxidase Antibodies, ELISA)'),
('product','prod-80','en','description','Quantitative determination of anti-thyroid peroxidase autoantibodies (anti-TPO) in serum by ELISA. Stripped polystyrene plates. Manufacturer: Immunotech (Russia).'),
('product','prod-80','en','manufacturer','Immunotech'),

('product','prod-81','en','name','ImmunoFA-Testosterone (ELISA)'),
('product','prod-81','en','description','Quantitative testosterone determination in serum by ELISA. Used in diagnosis of hirsutism in women, testicular function assessment, adrenal tumours. Manufacturer: Immunotech (Russia).'),
('product','prod-81','en','manufacturer','Immunotech'),

('product','prod-82','en','name','ImmunoFA-AFP (Alpha-Fetoprotein, ELISA)'),
('product','prod-82','en','description','One-step solid-phase ELISA for quantitative AFP determination. Used in diagnosis of primary liver cancer and foetal developmental defects. Manufacturer: Immunotech (Russia).'),
('product','prod-82','en','manufacturer','Immunotech'),

('product','prod-83','en','name','Automatic Microplate Washer IW-8'),
('product','prod-83','en','description','Automatic 96-well ELISA plate washer. 3 wash solution channels, weight sensors. 50 programs. Wash time ≤45 s/plate (300 µL/well). Accuracy ±2.5%. Manufacturer: Biosan (Latvia).'),
('product','prod-83','en','manufacturer','Biosan'),

('product','prod-84','en','name','DTcleaner (PCR Block Cleaning Device)'),
('product','prod-84','en','description','Device for rapid cleaning of PCR amplifier wells. Several times faster than manual method. Uses disposable cotton swabs. Prevents parasitic optical signals. Manufacturer: DNA-Technology (Russia).'),
('product','prod-84','en','manufacturer','DNA-Technology'),

('product','prod-85','en','name','DT-Prime Real-Time PCR Amplifier'),
('product','prod-85','en','description','Detecting real-time PCR thermocycler. Formats: 96 (0.2 mL) and 384 (0.045 mL) wells. 4 or 5 fluorescence channels. Accuracy ±0.2°C. Weight 27 kg. Manufacturer: DNA-Technology (Russia).'),
('product','prod-85','en','manufacturer','DNA-Technology'),

('product','prod-86','en','name','"Jean-4" Fluorescent PCR Detector'),
('product','prod-86','en','description','Fluorescent detector for PCR results using FLASH reagents. 2 detection channels (470/514 nm and 532/580 nm). Rotor capacity 12 tubes. 5V USB power. Manufacturer: DNA-Technology (Russia).'),
('product','prod-86','en','manufacturer','DNA-Technology'),

('product','prod-87','en','name','FTA-2i Aspirator with Trap Flask'),
('product','prod-87','en','description','Aspirator for removing trace liquid from tube walls. Vacuum −200 to −800 mbar (adjustable). 2 L trap flask (autoclavable polypropylene). Liquid level sensor. Manufacturer: Biosan (Latvia).'),
('product','prod-87','en','manufacturer','Biosan'),

('product','prod-88','en','name','DTpack (Microplate Sealing Device)'),
('product','prod-88','en','description','Device for sealing microplates. Prevents reagent evaporation during PCR. Manufacturer: DNA-Technology (Russia).'),
('product','prod-88','en','manufacturer','DNA-Technology'),

('product','prod-89','en','name','DTstream (Automated PCR Mix Preparation)'),
('product','prod-89','en','description','Automated reaction mixture preparation system. 12 configurations, 20 component types. Processes 800 samples per shift. Manufacturer: DNA-Technology (Russia).'),
('product','prod-89','en','manufacturer','DNA-Technology'),

('product','prod-90','en','name','DTprime II (2nd-Gen Real-Time PCR Amplifier)'),
('product','prod-90','en','description','Second-generation detecting amplifier for real-time PCR from the DT series. Manufacturer: DNA-Technology (Russia).'),
('product','prod-90','en','manufacturer','DNA-Technology'),

('product','prod-91','en','name','DTmaster (PCR Amplifier Software)'),
('product','prod-91','en','description','Software for controlling DT-series detecting amplifiers. Manufacturer: DNA-Technology (Russia).'),
('product','prod-91','en','manufacturer','DNA-Technology'),

('product','prod-92','en','name','DTintegrator (PCR Lab Automation Software)'),
('product','prod-92','en','description','Software for PCR laboratory automation. Integrates all analysis stages into a unified management system. Manufacturer: DNA-Technology (Russia).'),
('product','prod-92','en','manufacturer','DNA-Technology'),

('product','prod-93','en','name','Biochemistry Analyzer URIT-880'),
('product','prod-93','en','description','Semi-automatic biochemistry analyzer for quantitative biochemical and immunological tests. Suitable for serum, urine, CSF and plasma. Photoelectric colorimetry method. CV ≤1.0%. Manufacturer: URIT Medical (China).'),
('product','prod-93','en','manufacturer','URIT Medical'),

('product','prod-94','en','name','Electrolyte Analyzer URIT-910 Plus'),
('product','prod-94','en','description','Electrolyte analyzer for K+, Na+, Cl⁻, Ca²+, pH, TCO₂ in serum, plasma, whole blood, urine and CSF. Ion-selective electrode method. 50 tests/h, 10,000 results memory. Manufacturer: URIT Medical (China).'),
('product','prod-94','en','manufacturer','URIT Medical'),

('product','prod-95','en','name','BiaRidez Light (Disinfectant Concentrate)'),
('product','prod-95','en','description','Liquid concentrate with broad spectrum: bactericidal, virucidal, tuberculocidal, fungicidal, sporicidal. Neutralises odours, degreases. Working solution stable 48 days. Manufacturer: Biryuza (Kazakhstan).'),
('product','prod-95','en','manufacturer','Biryuza'),

('product','prod-96','en','name','BiaKlinAqua (Skin Antiseptic)'),
('product','prod-96','en','description','Skin antiseptic based on QAC and PHMG. For hand hygiene (10 s), disinfection of ultrasound/MRI probes, vials and ampoules. Viruses/fungi: 1 min. Manufacturer: Biryuza (Kazakhstan).'),
('product','prod-96','en','manufacturer','Biryuza'),

('product','prod-97','en','name','BiaSeptin (Antiseptic IPA 70%)'),
('product','prod-97','en','description','Disinfectant based on isopropyl alcohol 70±5% and QAC blend. Hygienic hand treatment 10 s, surgical 1 min, surface disinfection 30 s, biological material 10 min. Manufacturer: Biryuza (Kazakhstan).'),
('product','prod-97','en','manufacturer','Biryuza'),

('product','prod-98','en','name','BiaSepticM (Antiseptic IPA 75%)'),
('product','prod-98','en','description','Skin antiseptic based on isopropyl alcohol 75%. Hygienic hand treatment 10 s, surgical 1 min, injection field 15 s, surgical field 1 min. Manufacturer: Biryuza (Kazakhstan).'),
('product','prod-98','en','manufacturer','Biryuza'),

('product','prod-99','en','name','BiaPro (IPA 75% + Chlorhexidine)'),
('product','prod-99','en','description','Antiseptic based on IPA 75% and chlorhexidine bigluconate. For surgical hand treatment, surgical field, instruments. Instruments: 1.5 min, twice. Manufacturer: Biryuza (Kazakhstan).'),
('product','prod-99','en','manufacturer','Biryuza'),

('product','prod-100','en','name','Biacid (Percarbonate Disinfectant Powder)'),
('product','prod-100','en','description','Powder disinfectant based on sodium percarbonate. Full spectrum: bactericidal, virucidal, tuberculocidal, fungicidal, sporicidal. Bleaching effect. Shelf life 5 years. Manufacturer: Biryuza (Kazakhstan).'),
('product','prod-100','en','manufacturer','Biryuza'),

('product','prod-101','en','name','BiaChlor (Chlorine-Based Disinfectant)'),
('product','prod-101','en','description','Chlorine-based preparation on Na-DCHCA. Full disinfection spectrum. Active chlorine 50±10%. Working solution stable 28 days. Decontaminates DNA/RNA amplicons. Manufacturer: Biryuza (Kazakhstan).'),
('product','prod-101','en','manufacturer','Biryuza'),

('product','prod-102','en','name','Electronic Blood Pressure Monitor Yuwell YE630CR'),
('product','prod-102','en','description','Compact BP monitor with Bluetooth and smartphone connectivity. 360° rotating cuff, 22–36 cm. 250+ measurements per charge. Voice alerts, irregular pulse detection. ESH/AAMI standards. Manufacturer: Yuwell (China).'),
('product','prod-102','en','manufacturer','Yuwell'),

('product','prod-103','en','name','Glucometer Yuwell 660'),
('product','prod-103','en','description','Modern glucometer with voice announcements, backlit display, auto-coding. Range 1.1–33.3 mmol/L. Sample volume 1 µL. Result <10 s. Memory 500 measurements. Manufacturer: Yuwell (China).'),
('product','prod-103','en','manufacturer','Yuwell'),

('product','prod-104','en','name','Glucometer Yuwell 582'),
('product','prod-104','en','description','Compact glucometer. Result in 8 seconds from 1 µL blood. Auto-calibration, backlight, voice announcements. ~1,000 measurements per battery set. Memory 250 measurements. Manufacturer: Yuwell (China).'),
('product','prod-104','en','manufacturer','Yuwell'),

('product','prod-105','en','name','Continuous Glucose Monitor Yuwell Anytime CT300D'),
('product','prod-105','en','description','CGM system for diabetes management (14+ years). Measures glucose every 3 minutes (480 readings/day) via Bluetooth. Sensor life 14 days. Range 1.7–27.8 mmol/L. Manufacturer: Yuwell (China).'),
('product','prod-105','en','manufacturer','Yuwell'),

('product','prod-106','en','name','Element Multi (Rapid Analyzer: Glucose + Lipid Profile)'),
('product','prod-106','en','description','Portable rapid analyzer: glucose, total cholesterol, triglycerides, HDL, LDL. Sample 0.3 µL. Glucose in 3 s, cholesterol in 120 s. Error ≤5%. Memory 100 results. Manufacturer: OSANG (Korea).'),
('product','prod-106','en','manufacturer','OSANG'),

('product','prod-107','en','name','HbA1c Analyzer PCH-100 (Glycated Hemoglobin)'),
('product','prod-107','en','description','Portable glycated hemoglobin analyzer. Method: solid-phase reflectometry. Test time ≤3.5 min. Range 4.0–15.0% HbA1c. Sample 5 µL. CV ≤8%. Built-in thermal printer, voice prompts. Manufacturer: Sinocare (China).'),
('product','prod-107','en','manufacturer','Sinocare'),

('product','prod-108','en','name','HbA1c + Glucose Analyzer Clover A1c'),
('product','prod-108','en','description','Analyzer for glycated hemoglobin A1c and glucose in whole blood. Boronate affinity chromatography. HbA1c range 4.0–14.0%, time 5 min. Glucose 0.3 µL, result in 3 s. Manufacturer: OSANG / Infopia (Korea).'),
('product','prod-108','en','manufacturer','OSANG (Infopia)'),

('product','prod-109','en','name','DT-Prime Real-Time PCR Amplifier (Veterinary)'),
('product','prod-109','en','description','Detecting real-time PCR amplifier for veterinary PCR testing. 4 or 5 fluorescence channels. Accuracy ±0.2°C. DTmaster software (Russian and English). Weight 27 kg. Manufacturer: DNA-Technology (Russia).'),
('product','prod-109','en','manufacturer','DNA-Technology'),

('product','prod-110','en','name','Biochemistry Analyzer URIT-880 VET (Veterinary)'),
('product','prod-110','en','description','Semi-automatic biochemistry analyzer for veterinary clinics. High-precision photoelectric colorimetry. CV ≤1.0%, cross-contamination ≤1.0%. Manufacturer: URIT Medical (China).'),
('product','prod-110','en','manufacturer','URIT Medical'),

('product','prod-111','en','name','FTA-1 Aspirator with Trap Flask (Veterinary)'),
('product','prod-111','en','description','Aspirator for removing liquids from tube walls in veterinary laboratories. Article FTA-1. Manufacturer: Biosan (Latvia).')

ON CONFLICT (entity_type,entity_id,locale,field) DO UPDATE SET value=EXCLUDED.value;


-- ──────────────────────────────────────────────────────────────
-- Done! Final count:
--   SELECT COUNT(*) FROM categories;   -- 19
--   SELECT COUNT(*) FROM products;     -- 111
--   SELECT COUNT(*) FROM translations
--     WHERE entity_type='product';     -- ~700+
-- ──────────────────────────────────────────────────────────────
