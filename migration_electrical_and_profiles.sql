-- =============================================
-- FOCUSED MIGRATION: Profiles + Electrical Prices
-- Scope: Only transaction-ready categories
-- Run in: Supabase SQL Editor
-- =============================================

-- ─────────────────────────────────────────────
-- 1. PROFILES TABLE (if not already created)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id    TEXT NOT NULL UNIQUE,
  fname      TEXT,
  lname      TEXT,
  email      TEXT,
  pnumber    TEXT,
  acc_type   TEXT CHECK (acc_type IN ('customer', 'trade')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast username lookups
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles (user_id);

-- ─────────────────────────────────────────────
-- 2. PROFILES RLS POLICIES
-- ─────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users can view own profile"
      ON profiles FOR SELECT
      USING (auth.uid() = id);
  END IF;
END $$;

-- Users can insert their own profile (on signup trigger)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users can insert own profile"
      ON profiles FOR INSERT
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Users can update their own profile
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users can update own profile"
      ON profiles FOR UPDATE
      USING (auth.uid() = id);
  END IF;
END $$;

-- Anon can check username existence (needed for signup uniqueness check)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anon can check username existence' AND tablename = 'profiles') THEN
    CREATE POLICY "Anon can check username existence"
      ON profiles FOR SELECT
      USING (true);
  END IF;
END $$;

-- ─────────────────────────────────────────────
-- 3. AUTO-CREATE PROFILE ON SIGNUP (trigger)
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, fname, lname, email, pnumber, acc_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'user_id', NEW.id::text),
    NEW.raw_user_meta_data ->> 'fname',
    NEW.raw_user_meta_data ->> 'lname',
    NEW.email,
    NEW.raw_user_meta_data ->> 'pnumber',
    NEW.raw_user_meta_data ->> 'acc_type'
  );
  RETURN NEW;
END;
$$;

-- Drop trigger if exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────────
-- 4. UPDATE ELECTRICAL PRICES (from £1.00 → real)
-- ─────────────────────────────────────────────
UPDATE products SET price = 449.99 WHERE product_code = 'LEVCT2132O-A';
UPDATE products SET price = 12.99  WHERE product_code = 'KR106B-030';
UPDATE products SET price = 18.99  WHERE product_code = 'RA120B-030';
UPDATE products SET price = 89.99  WHERE product_code = 'LHMC22/100';
UPDATE products SET price = 24.99  WHERE product_code = 'DCM420C';
UPDATE products SET price = 29.99  WHERE product_code = 'TIME162D';
UPDATE products SET price = 399.99 WHERE product_code = 'LEVST2132O-A';
UPDATE products SET price = 13.99  WHERE product_code = 'KR132B-030';
UPDATE products SET price = 19.99  WHERE product_code = 'LMS2100';
UPDATE products SET price = 149.99 WHERE product_code = 'LTPN4';

-- ─────────────────────────────────────────────
-- 5. GRANT ACCESS (ensure tables are accessible)
-- ─────────────────────────────────────────────
GRANT SELECT ON profiles TO anon;
GRANT SELECT ON profiles TO authenticated;
GRANT INSERT ON profiles TO authenticated;
GRANT UPDATE ON profiles TO authenticated;

-- ─────────────────────────────────────────────
-- 6. VERIFY
-- ─────────────────────────────────────────────
-- After running, check results with:
--   SELECT product_code, product_name, price FROM products WHERE category = 'electrical';
--   SELECT COUNT(*) FROM profiles;
