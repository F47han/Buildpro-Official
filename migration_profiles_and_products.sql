-- =============================================
-- MIGRATION: profiles table + all products
-- Run in Supabase SQL Editor
-- =============================================

-- ─────────────────────────────────────────────
-- 1. PROFILES TABLE
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

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile (on signup trigger)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Service role can read all profiles (for username uniqueness checks via anon)
CREATE POLICY "Anon can check username existence"
  ON profiles FOR SELECT
  USING (true);

-- ─────────────────────────────────────────────
-- 2. AUTO-CREATE PROFILE ON SIGNUP (trigger)
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
-- 3. UPDATE ELECTRICAL PRICES (currently £1.00)
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
-- 4. ADD STEEL PRODUCTS
-- ─────────────────────────────────────────────
INSERT INTO products (product_code, product_name, description, category, subcategory, price, price_unit, image_emoji) VALUES
('STL-RSJ-203x133',    'RSJ Universal Beam 203x133x30',    'Hot-rolled steel universal beam, 203mm depth x 133mm flange. S355 grade steel.',            'steel', 'beams',       142.00, 'per metre', '🔺'),
('STL-PLT-20MM-S355',  'Mild Steel Plate 20mm S355',       'High-strength structural steel plate, 20mm thickness. Cut to size available.',              'steel', 'plates',       89.50, 'per m²',    '⬛'),
('STL-ANG-50x50x6-GALV','Galvanized Steel Angle 50x50x6mm','Hot-dip galvanized equal angle. Corrosion resistant for outdoor applications.',             'steel', 'fabrication',  28.00, 'per metre', '📐'),
('STL-RBR-16MM-B500B', 'Reinforcement Bar 16mm B500B',     'High-yield deformed reinforcement bar, 16mm diameter. B500B grade.',                        'steel', 'rebar',        18.75, 'per metre', '🔩'),
('STL-UC-203x203x46',  'Universal Column 203x203x46',      'Hot-rolled steel universal column. Vertical load-bearing applications.',                    'steel', 'beams',       168.00, 'per metre', '🏢'),
('STL-CHK-5MM-GALV',   'Galvanized Checker Plate 5mm',     'Anti-slip galvanized steel checker plate. Ideal for walkways and stairs.',                  'steel', 'plates',       67.00, 'per m²',    '⬡'),
('STL-FAB-BRK-CUSTOM', 'Custom Steel Bracket',             'Bespoke steel bracket fabrication to your drawings. Powder coated finish.',                 'steel', 'fabrication',  45.00, 'each',      '🔧'),
('STL-MSH-A142-ROLL',  'Steel Mesh A142',                  'Welded steel mesh for concrete reinforcement. 200x200mm aperture.',                         'steel', 'rebar',        52.00, 'each',      '🕸️'),
('STL-RAIL-PC-BLK',    'Powder Coated Railing',            'Modular steel railing system with black powder coated finish.',                              'steel', 'fabrication',  95.00, 'per metre', '🚧'),
('STL-UB-356x171x51',  'Universal Beam 356x171x51',        'Heavy-duty universal beam for large span applications. S355 grade.',                        'steel', 'beams',       214.00, 'per metre', '📏'),
('STL-SHT-0.7MM-GALV', 'Galvanized Steel Sheet 0.7mm',     'Light gauge galvanized steel sheet for cladding and roofing. Z275 coating.',                'steel', 'plates',       34.00, 'per sheet', '📄'),
('STL-GATE-FRM-CUSTOM','Custom Steel Gate Frame',           'Fabricated steel gate frames to your specifications. Galvanized or painted.',               'steel', 'fabrication', 320.00, 'each',      '🚪');

-- ─────────────────────────────────────────────
-- 5. ADD FLOORING PRODUCTS
-- ─────────────────────────────────────────────
INSERT INTO products (product_code, product_name, description, category, subcategory, price, price_unit, image_emoji) VALUES
('FLR-5984', 'Kingsley Oak',    'A timeless, natural oak finish with warm honey tones and realistic wood grain texture. Part of our premium SPC Rigid Core range.',                   'flooring', 'merrinton', 34.99, 'per m²', '🪵'),
('FLR-5982', 'Light Chestnut',  'Subtle, pale wood tones providing a bright and airy feel to any modern interior. Engineered for strength and heat resistance.',                     'flooring', 'merrinton', 32.99, 'per m²', '🏠'),
('FLR-5983', 'Stone Grey',      'A contemporary grey wood-effect plank with cool undertones. Features built-in IXPE underlay for noise reduction.',                                  'flooring', 'merrinton', 33.99, 'per m²', '⬜'),
('FLR-5985', 'Walnut',          'Deep, rich chocolate tones for a luxurious and classic aesthetic. 100% waterproof SPC construction.',                                               'flooring', 'merrinton', 35.99, 'per m²', '🟤'),
('FLR-5987', 'Norfolk Flint',   'Inspired by natural stone, this finish offers a rugged yet refined grey texture suitable for heavy-traffic areas.',                                 'flooring', 'stone',     36.99, 'per m²', '🪨'),
('FLR-5986', 'Tuscan Marble',   'A bright marble with soft veining and crisp white tones, bringing a clean, elegant Mediterranean feel. 6mm Thickness.',                            'flooring', 'stone',     38.99, 'per m²', '⚪'),
('FLR-5988', 'Biscay Marble',   'Deep grey marble effect with dramatic white veining. High-density core with Unipush click system for easy installation.',                          'flooring', 'stone',     38.99, 'per m²', '⚫');

-- ─────────────────────────────────────────────
-- 6. ADD FURNITURE PRODUCTS
-- ─────────────────────────────────────────────
INSERT INTO products (product_code, product_name, description, category, subcategory, price, price_unit, image_emoji) VALUES
('FUR-DT-OAK-180',     'Solid Oak Dining Table 180cm',          'Handcrafted solid oak dining table with natural finish. Seats 6-8 people. Custom sizes available.',             'furniture', 'dining',  1249.00, 'each', '🪑'),
('FUR-SF-CHE-3S',      'Classic Chesterfield 3-Seater',         'Traditional button-tufted Chesterfield sofa in premium leather or fabric. Handmade in the UK.',                'furniture', 'living',  1899.00, 'each', '🛋️'),
('FUR-WD-WAL-2D',      'Walnut Double Wardrobe',                'Solid walnut wardrobe with mirrored doors, internal shelving, and hanging rail. Made to your dimensions.',      'furniture', 'bedroom', 2100.00, 'each', '🚪'),
('FUR-DS-EXE-OAK',     'Executive Oak Desk with Drawers',       'Professional solid oak executive desk with 3 drawers, cable management, and leather inlay option.',             'furniture', 'office',   975.00, 'each', '🖥️'),
('FUR-AC-FAB-GRY',     'Upholstered Accent Armchair',           'Comfortable accent armchair in premium fabric. Multiple colour options. Solid wood frame.',                     'furniture', 'living',   549.00, 'each', '🪑'),
('FUR-SB-OAK-150',     'Oak Sideboard with Storage',            'Solid oak sideboard with 2 doors and 2 drawers. Perfect for dining room storage. Hand-finished.',               'furniture', 'dining',   799.00, 'each', '🗄️'),
('FUR-BD-PLT-OAK-K',   'Solid Oak Platform Bed King',           'Minimalist solid oak platform bed with low-profile design. King size. Includes slatted base.',                  'furniture', 'bedroom', 1350.00, 'each', '🛏️'),
('FUR-OS-MOD-OAK',     'Modular Office Storage System',         'Configurable oak office storage with shelves, drawers, and filing options. Custom layouts available.',           'furniture', 'office',  1100.00, 'each', '🗂️'),
('FUR-SF-VEL-2S-BLU',  'Velvet 2-Seater Sofa',                  'Luxurious velvet sofa with gold-finish legs. Available in navy, emerald, or blush. Made to order.',             'furniture', 'living',  1149.00, 'each', '✨'),
('FUR-CT-WAL-120',     'Walnut Coffee Table with Shelf',        'Elegant solid walnut coffee table with lower shelf. Hand-rubbed oil finish. Custom sizes available.',            'furniture', 'living',   485.00, 'each', '☕'),
('FUR-BC-OAK-180',     'Solid Oak Freestanding Bookcase',       'Tall solid oak bookcase with 5 adjustable shelves. Wall-fixing kit included. Custom heights available.',         'furniture', 'office',   620.00, 'each', '📚'),
('FUR-BD-UPH-GRY-K',  'Upholstered Bed with Storage',          'King size upholstered bed with hydraulic storage base. Premium fabric options. Made in the UK.',                 'furniture', 'bedroom', 1450.00, 'each', '🛏️');

-- ─────────────────────────────────────────────
-- 7. GRANT ACCESS (ensure tables are accessible)
-- ─────────────────────────────────────────────
GRANT SELECT ON profiles TO anon;
GRANT SELECT ON profiles TO authenticated;
GRANT INSERT ON profiles TO authenticated;
GRANT UPDATE ON profiles TO authenticated;
