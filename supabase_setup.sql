CREATE TABLE products (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_code  TEXT NOT NULL UNIQUE,
  product_name  TEXT NOT NULL,
  description   TEXT,
  category      TEXT NOT NULL,
  subcategory   TEXT,
  price         NUMERIC(10,2),
  price_unit    TEXT DEFAULT 'each',
  in_stock      BOOLEAN DEFAULT true,
  datasheet_url TEXT,
  image_emoji   TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookups by code and category
CREATE INDEX idx_products_code ON products (product_code);
CREATE INDEX idx_products_category ON products (category);

-- Row Level Security: Anyone can READ, only service_role can WRITE
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Service role write access"
  ON products FOR ALL
  USING (auth.role() = 'service_role');

-- Seed with 10 dummy electrical items
INSERT INTO products (product_code, product_name, description, category, subcategory, price, price_unit, image_emoji) VALUES
('LEVCT2132O-A', 'EV Charging Station (Cable Version)', '7.3KW AC electric vehicle charging station, IP55 protection, with Type 2 cable and RFID function.', 'electrical', 'ev-charging', 1.00, 'each', '🔌'),
('KR106B-030', 'Single Module RCBO 6A B Curve', '6A 6KA Single Module Type AC RCBO, 30mA residual current, B Curve tripping characteristic.', 'electrical', 'protection', 1.00, 'each', '🛡️'),
('RA120B-030', 'High Immunity RCBO 20A Type A', '20A 10kA Single Module Type A High Immunity RCBO, 30mA, B Curve.', 'electrical', 'protection', 1.00, 'each', '🛡️'),
('LHMC22/100', '22 Way Metal Clad Consumer Unit', 'Surface mounted metal clad consumer unit complete with 100A Isolator switch.', 'electrical', 'consumer-units', 1.00, 'each', '📦'),
('DCM420C', '4 Pole DC MCB 20A', '20A C Curve 6kA 1000V DC Miniature Circuit Breaker for Solar PV installations.', 'electrical', 'protection', 1.00, 'each', '☀️'),
('TIME162D', 'Digital 2-Channel Timer Switch', 'Programmable digital time switch with pulse program and sleep mode for energy saving.', 'electrical', 'controls', 1.00, 'each', '⏱️'),
('LEVST2132O-A', 'EV Charging Station (Socket Version)', '7.3KW AC EV charging station, IP54, Socket version with Ethernet/Wifi/4G options.', 'electrical', 'ev-charging', 1.00, 'each', '🔌'),
('KR132B-030', 'Single Module RCBO 32A', '32A 6KA Type AC RCBO, 30mA, B Curve, compact single module design.', 'electrical', 'protection', 1.00, 'each', '🛡️'),
('LMS2100', 'Main Switch Isolator 100A', 'Double Pole 100A Main Switch Isolator for use in Consumer Units and Enclosures.', 'electrical', 'consumer-units', 1.00, 'each', '🔘'),
('LTPN4', 'TPN Distribution Board 4 Way', '4 Way Triple Pole and Neutral (TPN) distribution board for industrial applications.', 'electrical', 'distribution', 1.00, 'each', '🔧');
