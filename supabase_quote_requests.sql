-- ==========================================================
-- SUPABASE MIGRATION: QUOTE REQUESTS & APP SETTINGS TABLES
-- ==========================================================

-- 1. Create quote_requests table
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email         TEXT NOT NULL,
  fname         TEXT NOT NULL,
  lname         TEXT NOT NULL,
  pnumber       TEXT,
  company       TEXT,
  category      TEXT NOT NULL, -- 'electrical', 'flooring', 'steel', 'furniture', 'general'
  status        TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'In Review', 'Completed'
  details       JSONB NOT NULL, -- dynamic fields based on category
  pdf_url       TEXT, -- URL of the generated PDF invoice/quote
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexing for quick filtering and sorting
CREATE INDEX IF NOT EXISTS idx_quote_requests_user_id ON public.quote_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON public.quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON public.quote_requests(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- 2. Create app_settings table for secrets/configs
CREATE TABLE IF NOT EXISTS public.app_settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on app_settings
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------

-- Policies for quote_requests:
-- A. Clients can view their own quote requests
CREATE POLICY "Users can view own quote requests" 
  ON public.quote_requests FOR SELECT 
  USING (auth.uid() = user_id);

-- B. Anyone can submit a quote request (both logged-in and public users)
CREATE POLICY "Anyone can insert quote requests" 
  ON public.quote_requests FOR INSERT 
  WITH CHECK (true);

-- C. Admins have full access to quote requests
CREATE POLICY "Admins have full access to quote requests" 
  ON public.quote_requests FOR ALL 
  USING (
    auth.jwt() ->> 'email' IN ('admin@buildprouk.co.uk', 'kidfl@live.co.uk', 'info@buildprouk.co.uk')
  );

-- Policies for app_settings:
-- A. Only admins can read app_settings
CREATE POLICY "Admins can view app_settings"
  ON public.app_settings FOR SELECT
  USING (
    auth.jwt() ->> 'email' IN ('admin@buildprouk.co.uk', 'kidfl@live.co.uk', 'info@buildprouk.co.uk')
  );

-- B. Only admins can write/update app_settings
CREATE POLICY "Admins can modify app_settings"
  ON public.app_settings FOR ALL
  USING (
    auth.jwt() ->> 'email' IN ('admin@buildprouk.co.uk', 'kidfl@live.co.uk', 'info@buildprouk.co.uk')
  );

-- ----------------------------------------------------------
-- REALTIME SUBSCRIPTIONS AND PUBLICATION
-- ----------------------------------------------------------
-- Enable realtime publication for quote_requests if publication exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.quote_requests;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;
