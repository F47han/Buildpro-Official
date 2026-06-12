-- =============================================
-- MIGRATION: Live Electrical Product Catalogue
-- Products: ~131 items from Live Electrical order form
-- Categories: 19 electrical sub-categories
-- Run in: Supabase SQL Editor
-- =============================================

-- ─────────────────────────────────────────────
-- 1. CREATE TABLE (with drop for clean overhaul)
-- ─────────────────────────────────────────────
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_code     TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  category      TEXT NOT NULL,
  description   TEXT,
  view_url      TEXT,
  price_enabled BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 2. PERFORMANCE INDEXES
-- ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_products_category  ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_item_code ON products(item_code);

-- ─────────────────────────────────────────────
-- 3. ROW-LEVEL SECURITY
-- ─────────────────────────────────────────────
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE policyname = 'Public read access for products'
      AND tablename  = 'products'
  ) THEN
    CREATE POLICY "Public read access for products"
      ON products FOR SELECT USING (true);
  END IF;
END $$;

-- ─────────────────────────────────────────────
-- 4. OPTIONAL: Clear old catalogue data
-- Uncomment the line below if migrating from the
-- old schema that used product_code / price columns.
-- ─────────────────────────────────────────────
-- DELETE FROM products;

-- ─────────────────────────────────────────────
-- 5. INSERT ALL PRODUCTS (upsert on item_code)
-- ─────────────────────────────────────────────
INSERT INTO products (item_code, name, category, description) VALUES

-- ═══════════════════════════════════════════════
-- CONSUMER UNITS  (17 products)
-- ═══════════════════════════════════════════════
('LSMC04',          'Metal Consumer Unit Surface Mounted 4 Way',               'consumer-units', '4 way surface mounted metal consumer unit for domestic installations.'),
('LSMC06',          'Metal Consumer Unit Surface Mounted 6 Way',               'consumer-units', '6 way surface mounted metal consumer unit for domestic installations.'),
('LSMC10',          'Metal Consumer Unit Surface Mounted 10 Way',              'consumer-units', '10 way surface mounted metal consumer unit for domestic installations.'),
('FMC04',           'Metal Consumer Unit Flush Mounted 4 Way',                 'consumer-units', '4 way flush mounted metal consumer unit for recessed installations.'),
('FMC10',           'Metal Consumer Unit Flush Mounted 10 Way',                'consumer-units', '10 way flush mounted metal consumer unit for recessed installations.'),
('LSMC04/100',      'Metal Main Switch Consumer Unit 4 Way 100A Surface',      'consumer-units', '4 way surface mounted consumer unit with 100A main switch isolator.'),
('LSMC08/100',      'Metal Main Switch Consumer Unit 8 Way 100A Surface',      'consumer-units', '8 way surface mounted consumer unit with 100A main switch isolator.'),
('FMC04/100',       'Metal Main Switch Consumer Unit 4 Way 100A Flush',        'consumer-units', '4 way flush mounted consumer unit with 100A main switch isolator.'),
('LSMC04-R63',      'Metal RCD Consumer Unit 4 Way 63A Surface',              'consumer-units', '4 way surface mounted consumer unit with 63A RCD incomer.'),
('FMC04-RC63',      'Metal RCD Consumer Unit 4 Way 63A Flush',                'consumer-units', '4 way flush mounted consumer unit with 63A RCD incomer.'),
('LSMC1463TR',      'Metal RCD Split Load Consumer Unit 14 Way 63A',          'consumer-units', '14 way surface mounted RCD split load consumer unit with 63A RCD.'),
('LSMC1480TR',      'Metal RCD Split Load Consumer Unit 14 Way 80A',          'consumer-units', '14 way surface mounted RCD split load consumer unit with 80A RCD.'),
('LSMC1463TR-SP',   'Metal RCD Split Load with Surge Protection',             'consumer-units', '14 way RCD split load consumer unit with integrated surge protection device.'),
('FMC04SRN/100',    'Metal Surge Protected RCBO Populated Unit 4 Way',        'consumer-units', '4 way surge protected consumer unit pre-populated with RCBOs and 100A main switch.'),
('LHMC24',          'Metal Clad Consumer Unit 24 Way',                        'consumer-units', '24 way metal clad consumer unit for larger domestic and small commercial installations.'),
('LHMC24/125',      'Metal Clad Consumer Unit 24 Way 125A',                   'consumer-units', '24 way metal clad consumer unit with 125A main switch isolator.'),
('LHMC1880TR-AS',   'Metal Surge Protected RCD Split Load MCB Unit 18 Way',   'consumer-units', '18 way metal consumer unit with RCD split load, MCB protection, and surge protection.'),

-- ═══════════════════════════════════════════════
-- RCBOs  (15 products)
-- ═══════════════════════════════════════════════
('AMR106B-030',     'Type A RCBO 6A B Curve 30mA Switched Neutral',            'rcbos', 'Type A RCBO, 6A rated, B curve, 30mA sensitivity. Switched neutral line configuration.'),
('AMR125C-030',     'Type A RCBO 25A C Curve 30mA Switched Neutral',           'rcbos', 'Type A RCBO, 25A rated, C curve, 30mA sensitivity. Switched neutral line configuration.'),
('AMR140B-100',     'Type A RCBO 40A B Curve 100mA Switched Neutral',          'rcbos', 'Type A RCBO, 40A rated, B curve, 100mA sensitivity. Switched neutral line configuration.'),
('RNA6B-030',       'Type A RCBO 6A B Curve 30mA Double Pole',                 'rcbos', 'Double pole Type A RCBO, 6A rated, B curve, 30mA sensitivity.'),
('RNA32B-030',      'Type A RCBO 32A B Curve 30mA Double Pole',                'rcbos', 'Double pole Type A RCBO, 32A rated, B curve, 30mA sensitivity.'),
('RNC106B-030N',    'Type A Compact RCBO 6A B Curve 30mA',                     'rcbos', 'Compact Type A RCBO, 6A rated, B curve, 30mA sensitivity.'),
('RNC120B-030N',    'Type A Compact RCBO 20A B Curve 30mA',                    'rcbos', 'Compact Type A RCBO, 20A rated, B curve, 30mA sensitivity.'),
('ARS106B-100',     'Type A Mini RCBO 6A B Curve 100mA',                       'rcbos', 'Mini Type A RCBO, 6A rated, B curve, 100mA sensitivity.'),
('ARS120B-100',     'Type A Mini RCBO 20A B Curve 100mA',                      'rcbos', 'Mini Type A RCBO, 20A rated, B curve, 100mA sensitivity.'),
('RA106B-030',      '10kA Type A RCBO 6A B Curve 30mA',                        'rcbos', 'High breaking capacity 10kA Type A RCBO, 6A rated, B curve, 30mA sensitivity.'),
('RA110C-030',      '10kA Type A RCBO 10A C Curve 30mA',                       'rcbos', 'High breaking capacity 10kA Type A RCBO, 10A rated, C curve, 30mA sensitivity.'),
('RA120B-100',      '10kA Type A RCBO 20A B Curve 100mA',                      'rcbos', 'High breaking capacity 10kA Type A RCBO, 20A rated, B curve, 100mA sensitivity.'),
('RA206B-030',      '10kA Type A RCBO 2 Pole 6A B Curve 30mA',                 'rcbos', 'High breaking capacity 10kA Type A RCBO, 2 pole, 6A rated, B curve, 30mA.'),
('AFD20B',          'Arc Fault Detection Device with RCBO 20A B Curve',         'rcbos', 'Combined AFDD and RCBO, 20A rated, B curve. Detects dangerous arc faults.'),
('AFD32C',          'Arc Fault Detection Device with RCBO 32A C Curve',         'rcbos', 'Combined AFDD and RCBO, 32A rated, C curve. Detects dangerous arc faults.'),

-- ═══════════════════════════════════════════════
-- MCBs  (12 products)
-- ═══════════════════════════════════════════════
('CA102B',          'MCB 2A B Curve 6kA Single Pole',                          'mcbs', 'Miniature circuit breaker, 2A rated, B curve, 6kA breaking capacity, single pole.'),
('CA140B',          'MCB 40A B Curve 6kA Single Pole',                         'mcbs', 'Miniature circuit breaker, 40A rated, B curve, 6kA breaking capacity, single pole.'),
('CA110C',          'MCB 10A C Curve 6kA Single Pole',                         'mcbs', 'Miniature circuit breaker, 10A rated, C curve, 6kA breaking capacity, single pole.'),
('CA106D',          'MCB 6A D Curve 6kA Single Pole',                          'mcbs', 'Miniature circuit breaker, 6A rated, D curve, 6kA breaking capacity, single pole.'),
('CA363B',          'MCB 63A B Curve 6kA 3 Pole',                              'mcbs', 'Miniature circuit breaker, 63A rated, B curve, 6kA breaking capacity, 3 pole.'),
('CA320C',          'MCB 20A C Curve 6kA 3 Pole',                              'mcbs', 'Miniature circuit breaker, 20A rated, C curve, 6kA breaking capacity, 3 pole.'),
('CB106C',          'MCB 6A C Curve 10kA Single Pole',                         'mcbs', 'High performance MCB, 6A rated, C curve, 10kA breaking capacity, single pole.'),
('CB120D',          'MCB 20A D Curve 10kA Single Pole',                        'mcbs', 'High performance MCB, 20A rated, D curve, 10kA breaking capacity, single pole.'),
('CB210B',          'MCB 10A B Curve 10kA Double Pole',                        'mcbs', 'High performance MCB, 10A rated, B curve, 10kA breaking capacity, double pole.'),
('CB306C',          'MCB 6A C Curve 10kA 3 Pole',                              'mcbs', 'High performance MCB, 6A rated, C curve, 10kA breaking capacity, 3 pole.'),
('CB320D',          'MCB 20A D Curve 10kA 3 Pole',                             'mcbs', 'High performance MCB, 20A rated, D curve, 10kA breaking capacity, 3 pole.'),
('LEM',             'Moulded Case Circuit Breaker (MCCB)',                      'mcbs', 'Moulded case circuit breaker for higher current applications and industrial use.'),

-- ═══════════════════════════════════════════════
-- SURGE PROTECTION  (6 products)
-- ═══════════════════════════════════════════════
('SP140-1PN',       'Surge Protection Device 1P+N Type 1+2',                   'surge-protection', 'Type 1+2 combined surge protection device, 1 pole + neutral configuration.'),
('SA120',           'SA Surge Protective Device 1P 20kA',                       'surge-protection', 'SA range surge protective device, single pole, 20kA discharge capacity.'),
('SA140',           'SA Surge Protective Device 1P 40kA',                       'surge-protection', 'SA range surge protective device, single pole, 40kA discharge capacity.'),
('SA240',           'SA Surge Protective Device 2P 40kA',                       'surge-protection', 'SA range surge protective device, 2 pole, 40kA discharge capacity.'),
('SA440',           'SA Surge Protective Device 4P 40kA',                       'surge-protection', 'SA range surge protective device, 4 pole, 40kA discharge capacity.'),
('SA140-1PN',       'SA Surge Protective Device 1P+N 40kA',                     'surge-protection', 'SA range surge protective device, 1 pole + neutral, 40kA discharge capacity.'),

-- ═══════════════════════════════════════════════
-- DISTRIBUTION BOARDS  (6 products)
-- ═══════════════════════════════════════════════
('TPN08-125',       'TP&N Distribution Board 8 Way 125A',                       'distribution-boards', '8 way triple pole and neutral distribution board with 125A incomer.'),
('TPN16-125S',      'TP&N Distribution Board 16 Way 125A',                      'distribution-boards', '16 way triple pole and neutral distribution board with 125A incomer.'),
('TPN24-250',       'TP&N Distribution Board 24 Way 250A',                      'distribution-boards', '24 way triple pole and neutral distribution board with 250A incomer.'),
('TPNM8250S',       'MCCB Panel Board 8 Way 250A Surface',                     'distribution-boards', '8 way MCCB panel board, 250A rated, surface mounted for industrial applications.'),
('TPNM08',          'MCCB Panel Board 8 Way',                                  'distribution-boards', '8 way MCCB panel board for commercial and industrial applications.'),
('TPNM8250M',       'MCCB Panel Board 8 Way 250A Metered',                     'distribution-boards', '8 way MCCB panel board, 250A rated, with integrated metering facility.'),

-- ═══════════════════════════════════════════════
-- EV CHARGING  (3 products)
-- ═══════════════════════════════════════════════
('LEVB240',         'EV Charger Consumer Unit IP40 2 Way 40A',                  'ev-charging', 'IP40 rated EV charger consumer unit, 2 way, 40A configuration.'),
('LEVB440-C',       'EV Charger Consumer Unit IP40 4 Way 40A',                  'ev-charging', 'IP40 rated EV charger consumer unit, 4 way, 40A configuration with Type C MCB.'),
('LEV440SP-BP',     'EV Charger Consumer Unit IP65 with Surge Protection',      'ev-charging', 'IP65 rated plastic EV charger consumer unit with integrated surge protection.'),

-- ═══════════════════════════════════════════════
-- SWITCHES & ISOLATORS  (10 products)
-- ═══════════════════════════════════════════════
('LFIS100',         'Fused Main Switch 100A',                                   'switches-isolators', '100A fused main switch isolator for mains incoming supply protection.'),
('MS1100D',         'Main Switch 100A Double Terminal',                         'switches-isolators', '100A main switch isolator with double terminal connections, single pole.'),
('MS4125D',         'Main Switch 125A 4 Pole Double Terminal',                  'switches-isolators', '125A main switch isolator with double terminal connections, 4 pole.'),
('MS1100',          'Main Switch Isolator 100A',                                'switches-isolators', '100A main switch isolator for consumer units and enclosures.'),
('MS2125',          'Changeover Main Switch 125A Double Pole',                  'switches-isolators', '125A changeover main switch for generator or dual supply changeover.'),
('WRB-63N',         'WiFi Smart Switch 63A',                                    'switches-isolators', 'WiFi enabled smart switch, 63A rated, for remote control and monitoring.'),
('RI432',           'Weatherproof Rotary Isolator 32A 4 Pole',                  'switches-isolators', 'IP65 weatherproof rotary isolator switch, 32A rated, 4 pole.'),
('RI4100',          'Weatherproof Rotary Isolator 100A 4 Pole',                 'switches-isolators', 'IP65 weatherproof rotary isolator switch, 100A rated, 4 pole.'),
('RIH332',          'Weatherproof Rotary Isolator with Handle 32A 3P',          'switches-isolators', 'IP65 weatherproof rotary isolator with extended handle, 32A rated, 3 pole.'),
('RIH3100',         'Weatherproof Rotary Isolator with Handle 100A 3P',         'switches-isolators', 'IP65 weatherproof rotary isolator with extended handle, 100A rated, 3 pole.'),

-- ═══════════════════════════════════════════════
-- SOCKETS & SPURS  (9 products)
-- ═══════════════════════════════════════════════
('WSDKP-5',         'White RCD Double Socket 13A',                              'sockets-spurs', '13A white RCD protected double socket outlet, BS 1363 compliant.'),
('WSRSP-5',         'White RCD Single Socket 13A',                              'sockets-spurs', '13A white RCD protected single socket outlet, BS 1363 compliant.'),
('WSTKP-5',         'White RCD Twin Socket 13A',                                'sockets-spurs', '13A white RCD protected twin socket outlet, BS 1363 compliant.'),
('RSMS213A/030-A',  'Metal Clad RCD Socket 13A 30mA Type A',                    'sockets-spurs', '13A metal clad RCD protected socket, 30mA Type A sensitivity.'),
('WSDKM-5',         'Metal Clad RCD Double Socket 13A',                         'sockets-spurs', '13A metal clad RCD protected double socket outlet.'),
('WSRSM-5',         'Metal Clad RCD Single Socket 13A',                         'sockets-spurs', '13A metal clad RCD protected single socket outlet.'),
('WSTKM-5',         'Metal Clad RCD Twin Socket 13A',                           'sockets-spurs', '13A metal clad RCD protected twin socket outlet.'),
('WSFP-5',          'White RCD Fused Spur',                                     'sockets-spurs', 'White RCD protected fused connection unit / spur.'),
('WSFM-5',          'Metal Clad RCD Fused Spur',                                'sockets-spurs', 'Metal clad RCD protected fused connection unit / spur.'),

-- ═══════════════════════════════════════════════
-- LIGHTING  (6 products)
-- ═══════════════════════════════════════════════
('LSTB',            'LED Globe Lamp',                                           'lighting', 'LED globe lamp for general and decorative lighting applications.'),
('LF1-60W',         'Diamond Frame LED Panel Light 60W',                        'lighting', '60W diamond frame LED panel light for commercial and office installations.'),
('LBOS',            'LED CCT Multi-Watt Bulkhead Light',                        'lighting', 'LED bulkhead light with selectable colour temperature and multi-watt settings.'),
('LF4-40W',         'Frame LED Panel Light 40W',                                'lighting', '40W frame LED panel light for suspended ceilings and surface mounting.'),
('LSP-36W',         'Slim Ceiling LED Panel Light 36W',                         'lighting', '36W ultra-slim ceiling LED panel light for modern installations.'),
('LBP3-48W',        'LED Backlit Panel Light 48W',                              'lighting', '48W LED backlit panel light with even light distribution.'),

-- ═══════════════════════════════════════════════
-- FUSES & HOLDERS  (9 products)
-- ═══════════════════════════════════════════════
('FU2A10',          'Fuse 2A 10x38mm',                                          'fuses-holders', 'Cylindrical cartridge fuse, 2A rated, 10x38mm size.'),
('FU4A10',          'Fuse 4A 10x38mm',                                          'fuses-holders', 'Cylindrical cartridge fuse, 4A rated, 10x38mm size.'),
('FU6A10',          'Fuse 6A 10x38mm',                                          'fuses-holders', 'Cylindrical cartridge fuse, 6A rated, 10x38mm size.'),
('FU16A10',         'Fuse 16A 10x38mm',                                         'fuses-holders', 'Cylindrical cartridge fuse, 16A rated, 10x38mm size.'),
('FU20A10',         'Fuse 20A 10x38mm',                                         'fuses-holders', 'Cylindrical cartridge fuse, 20A rated, 10x38mm size.'),
('FU32A22',         'Fuse 32A 22x58mm',                                         'fuses-holders', 'Cylindrical cartridge fuse, 32A rated, 22x58mm size.'),
('FU63A22',         'Fuse 63A 22x58mm',                                         'fuses-holders', 'Cylindrical cartridge fuse, 63A rated, 22x58mm size.'),
('WS18-32',         'Fuse Holder 32A Single Pole',                              'fuses-holders', 'DIN rail mounted fuse holder, 32A rated, single pole.'),
('WS18-125/3P',     'Fuse Holder 125A 3 Pole',                                  'fuses-holders', 'DIN rail mounted fuse holder, 125A rated, 3 pole.'),

-- ═══════════════════════════════════════════════
-- ENCLOSURES  (10 products)
-- ═══════════════════════════════════════════════
('ENC0365',         'IP65 Enclosure 3 Way',                                     'enclosures', 'IP65 rated weatherproof enclosure, 3 way, for shower units and garages.'),
('ENC0565',         'IP65 Enclosure 5 Way',                                     'enclosures', 'IP65 rated weatherproof enclosure, 5 way, for shower units and garages.'),
('MSE100',          'Metal Main Switch Enclosure 100A',                         'enclosures', 'Metal main switch enclosure with 100A isolator.'),
('MMGU05',          'Mini Garage Unit IP40 5 Way',                              'enclosures', 'IP40 rated mini garage unit, 5 way, for outbuildings and garages.'),
('MMGU05-32B',      'Mini Garage Unit IP40 5 Way with 32A MCB',                 'enclosures', 'IP40 rated mini garage unit, 5 way, pre-fitted with 32A type B MCB.'),
('AGU4-SP',         'IP65 Metal Surge Protection Mini Garage Unit 4 Way',       'enclosures', 'IP65 rated 4 way metal mini garage unit with integrated surge protection.'),
('AGU565-/B',       'IP65 Metal Garage Unit 5 Way',                             'enclosures', 'IP65 rated 5 way metal garage unit for outdoor installations.'),
('PEN2',            'Plastic Meter Isolation Enclosure IP20',                    'enclosures', 'IP20 rated plastic meter isolation enclosure, 2 way.'),
('PEN2100',         'Plastic Meter Isolation Enclosure 100A IP20',              'enclosures', 'IP20 rated plastic meter isolation enclosure with 100A isolator.'),
('PEN2100DP-SP',    'Plastic Meter Isolation 100A DP with Surge Protection',    'enclosures', 'IP20 rated plastic meter isolation, 100A double pole, with surge protection.'),

-- ═══════════════════════════════════════════════
-- CONTACTORS & CONTROL  (4 products)
-- ═══════════════════════════════════════════════
('MAC2P25',         'Modular AC Contactor 2 Pole 25A',                          'contactors-control', 'DIN rail mounted modular AC contactor, 2 pole, 25A rated.'),
('MDAC2P16/12V',    'DC Coil AC Contactor 2 Pole 16A 12V',                      'contactors-control', 'DC coil operated AC contactor, 2 pole, 16A rated, 12V coil.'),
('MDAC4P32/12V',    'DC Coil AC Contactor 4 Pole 32A 12V',                      'contactors-control', 'DC coil operated AC contactor, 4 pole, 32A rated, 12V coil.'),
('LBT-8',           'Bell Transformer 8V',                                      'contactors-control', 'DIN rail mounted bell transformer, 8V output for doorbells and chimes.'),

-- ═══════════════════════════════════════════════
-- RESIDUAL CURRENT DEVICES  (5 products)
-- ═══════════════════════════════════════════════
('RT2100-100',      'Time Delay RCD 100A 100mA',                                'rcds', 'Time delay residual current device, 100A rated, 100mA sensitivity.'),
('RDA440-030',      '4 Pole Type A RCD 40A 30mA',                               'rcds', '4 pole Type A residual current device, 40A rated, 30mA sensitivity.'),
('CEB225-030',      'Type B-HP RCCB 25A 30mA',                                  'rcds', 'Type B-HP residual current circuit breaker, 25A rated, 30mA. For heat pump and EV applications.'),
('CEB280-030',      'Type B-HP RCCB 80A 30mA',                                  'rcds', 'Type B-HP residual current circuit breaker, 80A rated, 30mA. For heat pump and EV applications.'),
('CEB416-030',      'Type B-HP RCCB 4 Pole 16A 30mA',                           'rcds', 'Type B-HP residual current circuit breaker, 4 pole, 16A rated, 30mA sensitivity.'),

-- ═══════════════════════════════════════════════
-- SMOKE ALARMS  (2 products)
-- ═══════════════════════════════════════════════
('SA101',           'Optical Smoke Alarm Mains Powered',                         'smoke-alarms', 'Mains powered optical smoke alarm with battery backup, BS EN 14604 compliant.'),
('SA001',           'Standalone Smoke Alarm Battery Powered',                    'smoke-alarms', 'Battery powered standalone smoke alarm, BS EN 14604 compliant.'),

-- ═══════════════════════════════════════════════
-- SOLAR & RENEWABLES  (4 products)
-- ═══════════════════════════════════════════════
('ENC12-PV4/1',     '12 Way Solar Consumer Unit',                                'solar-renewables', '12 way consumer unit designed for solar PV installations with dedicated PV circuits.'),
('ENC36-1PV6/3',    '36 Way Solar Consumer Unit',                                'solar-renewables', '36 way consumer unit for large solar PV installations with multiple PV circuits.'),
('DCM232C',         'DC Miniature Circuit Breaker 32A 2 Pole',                   'solar-renewables', 'DC MCB, 32A rated, C curve, 2 pole, for solar PV DC side protection.'),
('DCM432C',         'DC Miniature Circuit Breaker 32A 4 Pole',                   'solar-renewables', 'DC MCB, 32A rated, C curve, 4 pole, for solar PV DC side protection.'),

-- ═══════════════════════════════════════════════
-- JUNCTION BOXES & TERMINALS  (3 products)
-- ═══════════════════════════════════════════════
('JB155B',          'Junction Box IP20',                                         'junction-boxes', 'IP20 rated junction box for internal wiring connections and terminations.'),
('TB5P100',         'Terminal Block 5 Pole 100A',                                'junction-boxes', '5 pole terminal block, 100A rated, available in multiple colours.'),
('JB91-B',          'IP66 Junction Box',                                         'junction-boxes', 'IP66 rated weatherproof junction box for outdoor and wet area installations.'),

-- ═══════════════════════════════════════════════
-- INDUSTRIAL CONNECTORS  (3 products)
-- ═══════════════════════════════════════════════
('C163',            'Industrial Connector 16A 3 Pin',                            'industrial-connectors', '16A industrial plug/socket connector, 3 pin, IP44 rated.'),
('C165',            'Industrial Connector 16A 5 Pin',                            'industrial-connectors', '16A industrial plug/socket connector, 5 pin, IP44 rated.'),
('C325',            'Industrial Connector 32A 5 Pin',                            'industrial-connectors', '32A industrial plug/socket connector, 5 pin, IP44 rated.'),

-- ═══════════════════════════════════════════════
-- WEATHERPROOF ACCESSORIES  (5 products)
-- ═══════════════════════════════════════════════
('WPE1G',           'IP65 Weatherproof Socket Box 1 Gang',                       'weatherproof-accessories', 'IP65 rated weatherproof socket enclosure, 1 gang.'),
('WPE2G',           'IP65 Weatherproof Socket Box 2 Gang',                       'weatherproof-accessories', 'IP65 rated weatherproof socket enclosure, 2 gang.'),
('WP2GTKP-5',      '13A Weatherproof Twin Socket',                              'weatherproof-accessories', '13A IP66 rated weatherproof twin socket outlet for outdoor use.'),
('WP1G2W',          '20A Weatherproof Switch 1 Gang 2 Way',                      'weatherproof-accessories', '20A IP66 rated weatherproof switch, 1 gang, 2 way.'),
('WP2G2W',          '20A Weatherproof Switch 2 Gang 2 Way',                      'weatherproof-accessories', '20A IP66 rated weatherproof switch, 2 gang, 2 way.'),

-- ═══════════════════════════════════════════════
-- HEAT PUMPS  (2 products)
-- ═══════════════════════════════════════════════
('LHP840MSB',       'Metal Heat Pump Unit with Type B RCCB',                     'heat-pumps', 'Metal consumer unit designed for heat pump installations with Type B-HP/F RCCB protection.'),
('R290-ASHP',       'R290 Air Source Heat Pump',                                 'heat-pumps', 'R290 refrigerant air source heat pump unit for domestic heating and hot water.')

ON CONFLICT (item_code) DO UPDATE SET
  name        = EXCLUDED.name,
  category    = EXCLUDED.category,
  description = EXCLUDED.description;

-- ─────────────────────────────────────────────
-- 6. GRANT ACCESS
-- ─────────────────────────────────────────────
GRANT SELECT ON products TO anon;
GRANT SELECT ON products TO authenticated;

-- ─────────────────────────────────────────────
-- 7. VERIFY (run after migration)
-- ─────────────────────────────────────────────
-- SELECT category, COUNT(*) AS count
-- FROM products
-- GROUP BY category
-- ORDER BY count DESC;
--
-- Expected: 131 total products across 19 categories
