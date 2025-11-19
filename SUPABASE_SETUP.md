# Supabase Setup Instructions

## Створення таблиці email_subscriptions

Є два способи створити таблицю в Supabase:

### Спосіб 1: Через SQL Editor (Рекомендовано)

1. Відкрийте ваш Supabase проект
2. Перейдіть в **SQL Editor**
3. Скопіюйте та виконайте SQL з файлу `supabase/migrations/001_create_email_subscriptions.sql`

### Спосіб 2: Через Table Editor

1. Відкрийте ваш Supabase проект
2. Перейдіть в **Table Editor**
3. Натисніть **New Table**
4. Назвіть таблицю: `email_subscriptions`
5. Додайте колонки:
   - `id` (uuid, primary key, default: `gen_random_uuid()`)
   - `email` (text, unique, not null)
   - `created_at` (timestamptz, default: `now()`)
6. Збережіть таблицю

### Налаштування Row Level Security (RLS)

Після створення таблиці:

1. Перейдіть в **Authentication** → **Policies**
2. Для таблиці `email_subscriptions` створіть політику:
   - **Policy name**: Allow public insert
   - **Allowed operation**: INSERT
   - **Target roles**: public
   - **Policy definition**: `true`

Це дозволить будь-кому додавати email адреси без автентифікації.

## Перевірка

Після створення таблиці, форма на сайті має працювати коректно.

