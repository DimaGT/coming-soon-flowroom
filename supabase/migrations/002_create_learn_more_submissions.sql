-- ============================================
-- Learn More Submissions Table Setup Script
-- Copy and paste this script into Supabase SQL Editor
-- ============================================

-- Create learn_more_submissions table
CREATE TABLE IF NOT EXISTS public.learn_more_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- User category and flow type
  user_category TEXT NOT NULL CHECK (user_category IN ('classroom_teacher', 'school_staff', 'parent', 'both', 'other')),
  flow_type TEXT NOT NULL CHECK (flow_type IN ('teacher', 'guardian', 'other')),
  other_explanation TEXT,
  
  -- Teacher flow fields
  teacher_q2 TEXT,
  teacher_q2_other TEXT,
  teacher_q3 TEXT,
  teacher_q4 TEXT,
  teacher_q4b TEXT,
  
  -- Guardian/Parent flow fields
  guardian_q2 TEXT,
  guardian_q2_other TEXT,
  guardian_q3 TEXT,
  guardian_q4 TEXT,
  guardian_q5 TEXT,
  country TEXT,
  
  -- Email (can be null for teacher flow if not provided)
  email TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_learn_more_submissions_email ON public.learn_more_submissions(email);

-- Create index on user_category and flow_type for filtering
CREATE INDEX IF NOT EXISTS idx_learn_more_submissions_category ON public.learn_more_submissions(user_category);
CREATE INDEX IF NOT EXISTS idx_learn_more_submissions_flow_type ON public.learn_more_submissions(flow_type);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_learn_more_submissions_created_at ON public.learn_more_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.learn_more_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public insert" ON public.learn_more_submissions;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.learn_more_submissions;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.learn_more_submissions;

-- Create policy to allow anyone to insert submissions
CREATE POLICY "Allow public insert" ON public.learn_more_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (optional, adjust as needed)
CREATE POLICY "Allow authenticated read" ON public.learn_more_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow public update (for guardian flow step 5)
-- This allows updating records by email for completing the form flow
CREATE POLICY "Allow public update" ON public.learn_more_submissions
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_learn_more_submissions_updated_at ON public.learn_more_submissions;
CREATE TRIGGER update_learn_more_submissions_updated_at
  BEFORE UPDATE ON public.learn_more_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Script completed successfully!
-- ============================================

