-- Create email_subscriptions table
CREATE TABLE IF NOT EXISTS public.email_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_email ON public.email_subscriptions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert emails
CREATE POLICY "Allow public insert" ON public.email_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow authenticated users to read (optional, adjust as needed)
CREATE POLICY "Allow authenticated read" ON public.email_subscriptions
  FOR SELECT
  TO authenticated
  USING (true);

