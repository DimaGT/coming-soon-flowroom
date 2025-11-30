-- ============================================
-- Early Access Table Setup Script
-- Copy and paste this script into Supabase SQL Editor
-- ============================================

-- Drop existing table if needed (uncomment if you want to recreate)
-- DROP TABLE IF EXISTS public.early_access CASCADE;

-- Create early_access table
CREATE TABLE IF NOT EXISTS public.early_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Teacher', 'Admin', 'Support')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_early_access_email ON public.early_access(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.early_access ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public insert" ON public.early_access;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.early_access;

-- Create policy to allow anyone to insert early access submissions
CREATE POLICY "Allow public insert" ON public.early_access
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (optional, adjust as needed)
CREATE POLICY "Allow authenticated read" ON public.early_access
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- Script completed successfully!
-- ============================================

