// electrical-products-fallback.js - Local fallback dataset of 131 products
const FALLBACK_PRODUCTS = [
  {
    "item_code": "LSMC04",
    "name": "Metal Consumer Unit Surface Mounted 4 Way",
    "category": "consumer-units",
    "description": "4 way surface mounted metal consumer unit for domestic installations."
  },
  {
    "item_code": "LSMC06",
    "name": "Metal Consumer Unit Surface Mounted 6 Way",
    "category": "consumer-units",
    "description": "6 way surface mounted metal consumer unit for domestic installations."
  },
  {
    "item_code": "LSMC10",
    "name": "Metal Consumer Unit Surface Mounted 10 Way",
    "category": "consumer-units",
    "description": "10 way surface mounted metal consumer unit for domestic installations."
  },
  {
    "item_code": "FMC04",
    "name": "Metal Consumer Unit Flush Mounted 4 Way",
    "category": "consumer-units",
    "description": "4 way flush mounted metal consumer unit for recessed installations."
  },
  {
    "item_code": "FMC10",
    "name": "Metal Consumer Unit Flush Mounted 10 Way",
    "category": "consumer-units",
    "description": "10 way flush mounted metal consumer unit for recessed installations."
  },
  {
    "item_code": "LSMC04/100",
    "name": "Metal Main Switch Consumer Unit 4 Way 100A Surface",
    "category": "consumer-units",
    "description": "4 way surface mounted consumer unit with 100A main switch isolator."
  },
  {
    "item_code": "LSMC08/100",
    "name": "Metal Main Switch Consumer Unit 8 Way 100A Surface",
    "category": "consumer-units",
    "description": "8 way surface mounted consumer unit with 100A main switch isolator."
  },
  {
    "item_code": "FMC04/100",
    "name": "Metal Main Switch Consumer Unit 4 Way 100A Flush",
    "category": "consumer-units",
    "description": "4 way flush mounted consumer unit with 100A main switch isolator."
  },
  {
    "item_code": "LSMC04-R63",
    "name": "Metal RCD Consumer Unit 4 Way 63A Surface",
    "category": "consumer-units",
    "description": "4 way surface mounted consumer unit with 63A RCD incomer."
  },
  {
    "item_code": "FMC04-RC63",
    "name": "Metal RCD Consumer Unit 4 Way 63A Flush",
    "category": "consumer-units",
    "description": "4 way flush mounted consumer unit with 63A RCD incomer."
  },
  {
    "item_code": "LSMC1463TR",
    "name": "Metal RCD Split Load Consumer Unit 14 Way 63A",
    "category": "consumer-units",
    "description": "14 way surface mounted RCD split load consumer unit with 63A RCD."
  },
  {
    "item_code": "LSMC1480TR",
    "name": "Metal RCD Split Load Consumer Unit 14 Way 80A",
    "category": "consumer-units",
    "description": "14 way surface mounted RCD split load consumer unit with 80A RCD."
  },
  {
    "item_code": "LSMC1463TR-SP",
    "name": "Metal RCD Split Load with Surge Protection",
    "category": "consumer-units",
    "description": "14 way RCD split load consumer unit with integrated surge protection device."
  },
  {
    "item_code": "FMC04SRN/100",
    "name": "Metal Surge Protected RCBO Populated Unit 4 Way",
    "category": "consumer-units",
    "description": "4 way surge protected consumer unit pre-populated with RCBOs and 100A main switch."
  },
  {
    "item_code": "LHMC24",
    "name": "Metal Clad Consumer Unit 24 Way",
    "category": "consumer-units",
    "description": "24 way metal clad consumer unit for larger domestic and small commercial installations."
  },
  {
    "item_code": "LHMC24/125",
    "name": "Metal Clad Consumer Unit 24 Way 125A",
    "category": "consumer-units",
    "description": "24 way metal clad consumer unit with 125A main switch isolator."
  },
  {
    "item_code": "LHMC1880TR-AS",
    "name": "Metal Surge Protected RCD Split Load MCB Unit 18 Way",
    "category": "consumer-units",
    "description": "18 way metal consumer unit with RCD split load, MCB protection, and surge protection."
  },
  {
    "item_code": "AMR106B-030",
    "name": "Type A RCBO 6A B Curve 30mA Switched Neutral",
    "category": "rcbos",
    "description": "Type A RCBO, 6A rated, B curve, 30mA sensitivity. Switched neutral line configuration."
  },
  {
    "item_code": "AMR125C-030",
    "name": "Type A RCBO 25A C Curve 30mA Switched Neutral",
    "category": "rcbos",
    "description": "Type A RCBO, 25A rated, C curve, 30mA sensitivity. Switched neutral line configuration."
  },
  {
    "item_code": "AMR140B-100",
    "name": "Type A RCBO 40A B Curve 100mA Switched Neutral",
    "category": "rcbos",
    "description": "Type A RCBO, 40A rated, B curve, 100mA sensitivity. Switched neutral line configuration."
  },
  {
    "item_code": "RNA6B-030",
    "name": "Type A RCBO 6A B Curve 30mA Double Pole",
    "category": "rcbos",
    "description": "Double pole Type A RCBO, 6A rated, B curve, 30mA sensitivity."
  },
  {
    "item_code": "RNA32B-030",
    "name": "Type A RCBO 32A B Curve 30mA Double Pole",
    "category": "rcbos",
    "description": "Double pole Type A RCBO, 32A rated, B curve, 30mA sensitivity."
  },
  {
    "item_code": "RNC106B-030N",
    "name": "Type A Compact RCBO 6A B Curve 30mA",
    "category": "rcbos",
    "description": "Compact Type A RCBO, 6A rated, B curve, 30mA sensitivity."
  },
  {
    "item_code": "RNC120B-030N",
    "name": "Type A Compact RCBO 20A B Curve 30mA",
    "category": "rcbos",
    "description": "Compact Type A RCBO, 20A rated, B curve, 30mA sensitivity."
  },
  {
    "item_code": "ARS106B-100",
    "name": "Type A Mini RCBO 6A B Curve 100mA",
    "category": "rcbos",
    "description": "Mini Type A RCBO, 6A rated, B curve, 100mA sensitivity."
  },
  {
    "item_code": "ARS120B-100",
    "name": "Type A Mini RCBO 20A B Curve 100mA",
    "category": "rcbos",
    "description": "Mini Type A RCBO, 20A rated, B curve, 100mA sensitivity."
  },
  {
    "item_code": "RA106B-030",
    "name": "10kA Type A RCBO 6A B Curve 30mA",
    "category": "rcbos",
    "description": "High breaking capacity 10kA Type A RCBO, 6A rated, B curve, 30mA sensitivity."
  },
  {
    "item_code": "RA110C-030",
    "name": "10kA Type A RCBO 10A C Curve 30mA",
    "category": "rcbos",
    "description": "High breaking capacity 10kA Type A RCBO, 10A rated, C curve, 30mA sensitivity."
  },
  {
    "item_code": "RA120B-100",
    "name": "10kA Type A RCBO 20A B Curve 100mA",
    "category": "rcbos",
    "description": "High breaking capacity 10kA Type A RCBO, 20A rated, B curve, 100mA sensitivity."
  },
  {
    "item_code": "RA206B-030",
    "name": "10kA Type A RCBO 2 Pole 6A B Curve 30mA",
    "category": "rcbos",
    "description": "High breaking capacity 10kA Type A RCBO, 2 pole, 6A rated, B curve, 30mA."
  },
  {
    "item_code": "AFD20B",
    "name": "Arc Fault Detection Device with RCBO 20A B Curve",
    "category": "rcbos",
    "description": "Combined AFDD and RCBO, 20A rated, B curve. Detects dangerous arc faults."
  },
  {
    "item_code": "AFD32C",
    "name": "Arc Fault Detection Device with RCBO 32A C Curve",
    "category": "rcbos",
    "description": "Combined AFDD and RCBO, 32A rated, C curve. Detects dangerous arc faults."
  },
  {
    "item_code": "CA102B",
    "name": "MCB 2A B Curve 6kA Single Pole",
    "category": "mcbs",
    "description": "Miniature circuit breaker, 2A rated, B curve, 6kA breaking capacity, single pole."
  },
  {
    "item_code": "CA140B",
    "name": "MCB 40A B Curve 6kA Single Pole",
    "category": "mcbs",
    "description": "Miniature circuit breaker, 40A rated, B curve, 6kA breaking capacity, single pole."
  },
  {
    "item_code": "CA110C",
    "name": "MCB 10A C Curve 6kA Single Pole",
    "category": "mcbs",
    "description": "Miniature circuit breaker, 10A rated, C curve, 6kA breaking capacity, single pole."
  },
  {
    "item_code": "CA106D",
    "name": "MCB 6A D Curve 6kA Single Pole",
    "category": "mcbs",
    "description": "Miniature circuit breaker, 6A rated, D curve, 6kA breaking capacity, single pole."
  },
  {
    "item_code": "CA363B",
    "name": "MCB 63A B Curve 6kA 3 Pole",
    "category": "mcbs",
    "description": "Miniature circuit breaker, 63A rated, B curve, 6kA breaking capacity, 3 pole."
  },
  {
    "item_code": "CA320C",
    "name": "MCB 20A C Curve 6kA 3 Pole",
    "category": "mcbs",
    "description": "Miniature circuit breaker, 20A rated, C curve, 6kA breaking capacity, 3 pole."
  },
  {
    "item_code": "CB106C",
    "name": "MCB 6A C Curve 10kA Single Pole",
    "category": "mcbs",
    "description": "High performance MCB, 6A rated, C curve, 10kA breaking capacity, single pole."
  },
  {
    "item_code": "CB120D",
    "name": "MCB 20A D Curve 10kA Single Pole",
    "category": "mcbs",
    "description": "High performance MCB, 20A rated, D curve, 10kA breaking capacity, single pole."
  },
  {
    "item_code": "CB210B",
    "name": "MCB 10A B Curve 10kA Double Pole",
    "category": "mcbs",
    "description": "High performance MCB, 10A rated, B curve, 10kA breaking capacity, double pole."
  },
  {
    "item_code": "CB306C",
    "name": "MCB 6A C Curve 10kA 3 Pole",
    "category": "mcbs",
    "description": "High performance MCB, 6A rated, C curve, 10kA breaking capacity, 3 pole."
  },
  {
    "item_code": "CB320D",
    "name": "MCB 20A D Curve 10kA 3 Pole",
    "category": "mcbs",
    "description": "High performance MCB, 20A rated, D curve, 10kA breaking capacity, 3 pole."
  },
  {
    "item_code": "LEM",
    "name": "Moulded Case Circuit Breaker (MCCB)",
    "category": "mcbs",
    "description": "Moulded case circuit breaker for higher current applications and industrial use."
  },
  {
    "item_code": "SP140-1PN",
    "name": "Surge Protection Device 1P+N Type 1+2",
    "category": "surge-protection",
    "description": "Type 1+2 combined surge protection device, 1 pole + neutral configuration."
  },
  {
    "item_code": "SA120",
    "name": "SA Surge Protective Device 1P 20kA",
    "category": "surge-protection",
    "description": "SA range surge protective device, single pole, 20kA discharge capacity."
  },
  {
    "item_code": "SA140",
    "name": "SA Surge Protective Device 1P 40kA",
    "category": "surge-protection",
    "description": "SA range surge protective device, single pole, 40kA discharge capacity."
  },
  {
    "item_code": "SA240",
    "name": "SA Surge Protective Device 2P 40kA",
    "category": "surge-protection",
    "description": "SA range surge protective device, 2 pole, 40kA discharge capacity."
  },
  {
    "item_code": "SA440",
    "name": "SA Surge Protective Device 4P 40kA",
    "category": "surge-protection",
    "description": "SA range surge protective device, 4 pole, 40kA discharge capacity."
  },
  {
    "item_code": "SA140-1PN",
    "name": "SA Surge Protective Device 1P+N 40kA",
    "category": "surge-protection",
    "description": "SA range surge protective device, 1 pole + neutral, 40kA discharge capacity."
  },
  {
    "item_code": "TPN08-125",
    "name": "TP&N Distribution Board 8 Way 125A",
    "category": "distribution-boards",
    "description": "8 way triple pole and neutral distribution board with 125A incomer."
  },
  {
    "item_code": "TPN16-125S",
    "name": "TP&N Distribution Board 16 Way 125A",
    "category": "distribution-boards",
    "description": "16 way triple pole and neutral distribution board with 125A incomer."
  },
  {
    "item_code": "TPN24-250",
    "name": "TP&N Distribution Board 24 Way 250A",
    "category": "distribution-boards",
    "description": "24 way triple pole and neutral distribution board with 250A incomer."
  },
  {
    "item_code": "TPNM8250S",
    "name": "MCCB Panel Board 8 Way 250A Surface",
    "category": "distribution-boards",
    "description": "8 way MCCB panel board, 250A rated, surface mounted for industrial applications."
  },
  {
    "item_code": "TPNM08",
    "name": "MCCB Panel Board 8 Way",
    "category": "distribution-boards",
    "description": "8 way MCCB panel board for commercial and industrial applications."
  },
  {
    "item_code": "TPNM8250M",
    "name": "MCCB Panel Board 8 Way 250A Metered",
    "category": "distribution-boards",
    "description": "8 way MCCB panel board, 250A rated, with integrated metering facility."
  },
  {
    "item_code": "LEVB240",
    "name": "EV Charger Consumer Unit IP40 2 Way 40A",
    "category": "ev-charging",
    "description": "IP40 rated EV charger consumer unit, 2 way, 40A configuration."
  },
  {
    "item_code": "LEVB440-C",
    "name": "EV Charger Consumer Unit IP40 4 Way 40A",
    "category": "ev-charging",
    "description": "IP40 rated EV charger consumer unit, 4 way, 40A configuration with Type C MCB."
  },
  {
    "item_code": "LEV440SP-BP",
    "name": "EV Charger Consumer Unit IP65 with Surge Protection",
    "category": "ev-charging",
    "description": "IP65 rated plastic EV charger consumer unit with integrated surge protection."
  },
  {
    "item_code": "LFIS100",
    "name": "Fused Main Switch 100A",
    "category": "switches-isolators",
    "description": "100A fused main switch isolator for mains incoming supply protection."
  },
  {
    "item_code": "MS1100D",
    "name": "Main Switch 100A Double Terminal",
    "category": "switches-isolators",
    "description": "100A main switch isolator with double terminal connections, single pole."
  },
  {
    "item_code": "MS4125D",
    "name": "Main Switch 125A 4 Pole Double Terminal",
    "category": "switches-isolators",
    "description": "125A main switch isolator with double terminal connections, 4 pole."
  },
  {
    "item_code": "MS1100",
    "name": "Main Switch Isolator 100A",
    "category": "switches-isolators",
    "description": "100A main switch isolator for consumer units and enclosures."
  },
  {
    "item_code": "MS2125",
    "name": "Changeover Main Switch 125A Double Pole",
    "category": "switches-isolators",
    "description": "125A changeover main switch for generator or dual supply changeover."
  },
  {
    "item_code": "WRB-63N",
    "name": "WiFi Smart Switch 63A",
    "category": "switches-isolators",
    "description": "WiFi enabled smart switch, 63A rated, for remote control and monitoring."
  },
  {
    "item_code": "RI432",
    "name": "Weatherproof Rotary Isolator 32A 4 Pole",
    "category": "switches-isolators",
    "description": "IP65 weatherproof rotary isolator switch, 32A rated, 4 pole."
  },
  {
    "item_code": "RI4100",
    "name": "Weatherproof Rotary Isolator 100A 4 Pole",
    "category": "switches-isolators",
    "description": "IP65 weatherproof rotary isolator switch, 100A rated, 4 pole."
  },
  {
    "item_code": "RIH332",
    "name": "Weatherproof Rotary Isolator with Handle 32A 3P",
    "category": "switches-isolators",
    "description": "IP65 weatherproof rotary isolator with extended handle, 32A rated, 3 pole."
  },
  {
    "item_code": "RIH3100",
    "name": "Weatherproof Rotary Isolator with Handle 100A 3P",
    "category": "switches-isolators",
    "description": "IP65 weatherproof rotary isolator with extended handle, 100A rated, 3 pole."
  },
  {
    "item_code": "WSDKP-5",
    "name": "White RCD Double Socket 13A",
    "category": "sockets-spurs",
    "description": "13A white RCD protected double socket outlet, BS 1363 compliant."
  },
  {
    "item_code": "WSRSP-5",
    "name": "White RCD Single Socket 13A",
    "category": "sockets-spurs",
    "description": "13A white RCD protected single socket outlet, BS 1363 compliant."
  },
  {
    "item_code": "WSTKP-5",
    "name": "White RCD Twin Socket 13A",
    "category": "sockets-spurs",
    "description": "13A white RCD protected twin socket outlet, BS 1363 compliant."
  },
  {
    "item_code": "RSMS213A/030-A",
    "name": "Metal Clad RCD Socket 13A 30mA Type A",
    "category": "sockets-spurs",
    "description": "13A metal clad RCD protected socket, 30mA Type A sensitivity."
  },
  {
    "item_code": "WSDKM-5",
    "name": "Metal Clad RCD Double Socket 13A",
    "category": "sockets-spurs",
    "description": "13A metal clad RCD protected double socket outlet."
  },
  {
    "item_code": "WSRSM-5",
    "name": "Metal Clad RCD Single Socket 13A",
    "category": "sockets-spurs",
    "description": "13A metal clad RCD protected single socket outlet."
  },
  {
    "item_code": "WSTKM-5",
    "name": "Metal Clad RCD Twin Socket 13A",
    "category": "sockets-spurs",
    "description": "13A metal clad RCD protected twin socket outlet."
  },
  {
    "item_code": "WSFP-5",
    "name": "White RCD Fused Spur",
    "category": "sockets-spurs",
    "description": "White RCD protected fused connection unit / spur."
  },
  {
    "item_code": "WSFM-5",
    "name": "Metal Clad RCD Fused Spur",
    "category": "sockets-spurs",
    "description": "Metal clad RCD protected fused connection unit / spur."
  },
  {
    "item_code": "LSTB",
    "name": "LED Globe Lamp",
    "category": "lighting",
    "description": "LED globe lamp for general and decorative lighting applications."
  },
  {
    "item_code": "LF1-60W",
    "name": "Diamond Frame LED Panel Light 60W",
    "category": "lighting",
    "description": "60W diamond frame LED panel light for commercial and office installations."
  },
  {
    "item_code": "LBOS",
    "name": "LED CCT Multi-Watt Bulkhead Light",
    "category": "lighting",
    "description": "LED bulkhead light with selectable colour temperature and multi-watt settings."
  },
  {
    "item_code": "LF4-40W",
    "name": "Frame LED Panel Light 40W",
    "category": "lighting",
    "description": "40W frame LED panel light for suspended ceilings and surface mounting."
  },
  {
    "item_code": "LSP-36W",
    "name": "Slim Ceiling LED Panel Light 36W",
    "category": "lighting",
    "description": "36W ultra-slim ceiling LED panel light for modern installations."
  },
  {
    "item_code": "LBP3-48W",
    "name": "LED Backlit Panel Light 48W",
    "category": "lighting",
    "description": "48W LED backlit panel light with even light distribution."
  },
  {
    "item_code": "FU2A10",
    "name": "Fuse 2A 10x38mm",
    "category": "fuses-holders",
    "description": "Cylindrical cartridge fuse, 2A rated, 10x38mm size."
  },
  {
    "item_code": "FU4A10",
    "name": "Fuse 4A 10x38mm",
    "category": "fuses-holders",
    "description": "Cylindrical cartridge fuse, 4A rated, 10x38mm size."
  },
  {
    "item_code": "FU6A10",
    "name": "Fuse 6A 10x38mm",
    "category": "fuses-holders",
    "description": "Cylindrical cartridge fuse, 6A rated, 10x38mm size."
  },
  {
    "item_code": "FU16A10",
    "name": "Fuse 16A 10x38mm",
    "category": "fuses-holders",
    "description": "Cylindrical cartridge fuse, 16A rated, 10x38mm size."
  },
  {
    "item_code": "FU20A10",
    "name": "Fuse 20A 10x38mm",
    "category": "fuses-holders",
    "description": "Cylindrical cartridge fuse, 20A rated, 10x38mm size."
  },
  {
    "item_code": "FU32A22",
    "name": "Fuse 32A 22x58mm",
    "category": "fuses-holders",
    "description": "Cylindrical cartridge fuse, 32A rated, 22x58mm size."
  },
  {
    "item_code": "FU63A22",
    "name": "Fuse 63A 22x58mm",
    "category": "fuses-holders",
    "description": "Cylindrical cartridge fuse, 63A rated, 22x58mm size."
  },
  {
    "item_code": "WS18-32",
    "name": "Fuse Holder 32A Single Pole",
    "category": "fuses-holders",
    "description": "DIN rail mounted fuse holder, 32A rated, single pole."
  },
  {
    "item_code": "WS18-125/3P",
    "name": "Fuse Holder 125A 3 Pole",
    "category": "fuses-holders",
    "description": "DIN rail mounted fuse holder, 125A rated, 3 pole."
  },
  {
    "item_code": "ENC0365",
    "name": "IP65 Enclosure 3 Way",
    "category": "enclosures",
    "description": "IP65 rated weatherproof enclosure, 3 way, for shower units and garages."
  },
  {
    "item_code": "ENC0565",
    "name": "IP65 Enclosure 5 Way",
    "category": "enclosures",
    "description": "IP65 rated weatherproof enclosure, 5 way, for shower units and garages."
  },
  {
    "item_code": "MSE100",
    "name": "Metal Main Switch Enclosure 100A",
    "category": "enclosures",
    "description": "Metal main switch enclosure with 100A isolator."
  },
  {
    "item_code": "MMGU05",
    "name": "Mini Garage Unit IP40 5 Way",
    "category": "enclosures",
    "description": "IP40 rated mini garage unit, 5 way, for outbuildings and garages."
  },
  {
    "item_code": "MMGU05-32B",
    "name": "Mini Garage Unit IP40 5 Way with 32A MCB",
    "category": "enclosures",
    "description": "IP40 rated mini garage unit, 5 way, pre-fitted with 32A type B MCB."
  },
  {
    "item_code": "AGU4-SP",
    "name": "IP65 Metal Surge Protection Mini Garage Unit 4 Way",
    "category": "enclosures",
    "description": "IP65 rated 4 way metal mini garage unit with integrated surge protection."
  },
  {
    "item_code": "AGU565-/B",
    "name": "IP65 Metal Garage Unit 5 Way",
    "category": "enclosures",
    "description": "IP65 rated 5 way metal garage unit for outdoor installations."
  },
  {
    "item_code": "PEN2",
    "name": "Plastic Meter Isolation Enclosure IP20",
    "category": "enclosures",
    "description": "IP20 rated plastic meter isolation enclosure, 2 way."
  },
  {
    "item_code": "PEN2100",
    "name": "Plastic Meter Isolation Enclosure 100A IP20",
    "category": "enclosures",
    "description": "IP20 rated plastic meter isolation enclosure with 100A isolator."
  },
  {
    "item_code": "PEN2100DP-SP",
    "name": "Plastic Meter Isolation 100A DP with Surge Protection",
    "category": "enclosures",
    "description": "IP20 rated plastic meter isolation, 100A double pole, with surge protection."
  },
  {
    "item_code": "MAC2P25",
    "name": "Modular AC Contactor 2 Pole 25A",
    "category": "contactors-control",
    "description": "DIN rail mounted modular AC contactor, 2 pole, 25A rated."
  },
  {
    "item_code": "MDAC2P16/12V",
    "name": "DC Coil AC Contactor 2 Pole 16A 12V",
    "category": "contactors-control",
    "description": "DC coil operated AC contactor, 2 pole, 16A rated, 12V coil."
  },
  {
    "item_code": "MDAC4P32/12V",
    "name": "DC Coil AC Contactor 4 Pole 32A 12V",
    "category": "contactors-control",
    "description": "DC coil operated AC contactor, 4 pole, 32A rated, 12V coil."
  },
  {
    "item_code": "LBT-8",
    "name": "Bell Transformer 8V",
    "category": "contactors-control",
    "description": "DIN rail mounted bell transformer, 8V output for doorbells and chimes."
  },
  {
    "item_code": "RT2100-100",
    "name": "Time Delay RCD 100A 100mA",
    "category": "rcds",
    "description": "Time delay residual current device, 100A rated, 100mA sensitivity."
  },
  {
    "item_code": "RDA440-030",
    "name": "4 Pole Type A RCD 40A 30mA",
    "category": "rcds",
    "description": "4 pole Type A residual current device, 40A rated, 30mA sensitivity."
  },
  {
    "item_code": "CEB225-030",
    "name": "Type B-HP RCCB 25A 30mA",
    "category": "rcds",
    "description": "Type B-HP residual current circuit breaker, 25A rated, 30mA. For heat pump and EV applications."
  },
  {
    "item_code": "CEB280-030",
    "name": "Type B-HP RCCB 80A 30mA",
    "category": "rcds",
    "description": "Type B-HP residual current circuit breaker, 80A rated, 30mA. For heat pump and EV applications."
  },
  {
    "item_code": "CEB416-030",
    "name": "Type B-HP RCCB 4 Pole 16A 30mA",
    "category": "rcds",
    "description": "Type B-HP residual current circuit breaker, 4 pole, 16A rated, 30mA sensitivity."
  },
  {
    "item_code": "SA101",
    "name": "Optical Smoke Alarm Mains Powered",
    "category": "smoke-alarms",
    "description": "Mains powered optical smoke alarm with battery backup, BS EN 14604 compliant."
  },
  {
    "item_code": "SA001",
    "name": "Standalone Smoke Alarm Battery Powered",
    "category": "smoke-alarms",
    "description": "Battery powered standalone smoke alarm, BS EN 14604 compliant."
  },
  {
    "item_code": "ENC12-PV4/1",
    "name": "12 Way Solar Consumer Unit",
    "category": "solar-renewables",
    "description": "12 way consumer unit designed for solar PV installations with dedicated PV circuits."
  },
  {
    "item_code": "ENC36-1PV6/3",
    "name": "36 Way Solar Consumer Unit",
    "category": "solar-renewables",
    "description": "36 way consumer unit for large solar PV installations with multiple PV circuits."
  },
  {
    "item_code": "DCM232C",
    "name": "DC Miniature Circuit Breaker 32A 2 Pole",
    "category": "solar-renewables",
    "description": "DC MCB, 32A rated, C curve, 2 pole, for solar PV DC side protection."
  },
  {
    "item_code": "DCM432C",
    "name": "DC Miniature Circuit Breaker 32A 4 Pole",
    "category": "solar-renewables",
    "description": "DC MCB, 32A rated, C curve, 4 pole, for solar PV DC side protection."
  },
  {
    "item_code": "JB155B",
    "name": "Junction Box IP20",
    "category": "junction-boxes",
    "description": "IP20 rated junction box for internal wiring connections and terminations."
  },
  {
    "item_code": "TB5P100",
    "name": "Terminal Block 5 Pole 100A",
    "category": "junction-boxes",
    "description": "5 pole terminal block, 100A rated, available in multiple colours."
  },
  {
    "item_code": "JB91-B",
    "name": "IP66 Junction Box",
    "category": "junction-boxes",
    "description": "IP66 rated weatherproof junction box for outdoor and wet area installations."
  },
  {
    "item_code": "C163",
    "name": "Industrial Connector 16A 3 Pin",
    "category": "industrial-connectors",
    "description": "16A industrial plug/socket connector, 3 pin, IP44 rated."
  },
  {
    "item_code": "C165",
    "name": "Industrial Connector 16A 5 Pin",
    "category": "industrial-connectors",
    "description": "16A industrial plug/socket connector, 5 pin, IP44 rated."
  },
  {
    "item_code": "C325",
    "name": "Industrial Connector 32A 5 Pin",
    "category": "industrial-connectors",
    "description": "32A industrial plug/socket connector, 5 pin, IP44 rated."
  },
  {
    "item_code": "WPE1G",
    "name": "IP65 Weatherproof Socket Box 1 Gang",
    "category": "weatherproof-accessories",
    "description": "IP65 rated weatherproof socket enclosure, 1 gang."
  },
  {
    "item_code": "WPE2G",
    "name": "IP65 Weatherproof Socket Box 2 Gang",
    "category": "weatherproof-accessories",
    "description": "IP65 rated weatherproof socket enclosure, 2 gang."
  },
  {
    "item_code": "WP2GTKP-5",
    "name": "13A Weatherproof Twin Socket",
    "category": "weatherproof-accessories",
    "description": "13A IP66 rated weatherproof twin socket outlet for outdoor use."
  },
  {
    "item_code": "WP1G2W",
    "name": "20A Weatherproof Switch 1 Gang 2 Way",
    "category": "weatherproof-accessories",
    "description": "20A IP66 rated weatherproof switch, 1 gang, 2 way."
  },
  {
    "item_code": "WP2G2W",
    "name": "20A Weatherproof Switch 2 Gang 2 Way",
    "category": "weatherproof-accessories",
    "description": "20A IP66 rated weatherproof switch, 2 gang, 2 way."
  },
  {
    "item_code": "LHP840MSB",
    "name": "Metal Heat Pump Unit with Type B RCCB",
    "category": "heat-pumps",
    "description": "Metal consumer unit designed for heat pump installations with Type B-HP/F RCCB protection."
  },
  {
    "item_code": "R290-ASHP",
    "name": "R290 Air Source Heat Pump",
    "category": "heat-pumps",
    "description": "R290 refrigerant air source heat pump unit for domestic heating and hot water."
  }
];
