# 06. Bill of Materials and Budget

> **All prices are rough planning estimates, not quotations.** They are INR ranges for the Indian market (device and installation), based on typical street-level ranges for the product class, and they will move with brand, region, GST, exchange rates and time. USD is approximate at about INR 88 per USD. Obtain at least three written quotes before committing. Excluded: the main HVAC equipment, solar array and inverter, furniture, AV/home-theatre, and building-code fire systems.

Quantities come from the totals in [05](05-device-schedule.md). Amounts are in thousand INR (k).

## 6.1 A. Lighting and KNX

| # | Item | Qty | Unit (k) | Line low (k) | Line high (k) |
|---|---|---|---|---|---|
| 1 | KNX power supply 640 mA | 2 | 15 to 25 | 30 | 50 |
| 2 | KNX IP router / interface | 1 | 30 to 45 | 30 | 45 |
| 3 | KNX switch actuators, 16-ch | 3 | 25 to 40 | 75 | 120 |
| 4 | DALI-2 DT8 gateways | 3 | 30 to 50 | 90 | 150 |
| 5 | Tunable-white LED fixtures with DT8 drivers | 44 zones | 6 to 12 | 260 | 530 |
| 6 | KNX wall keypads | 23 | 5 to 12 | 115 | 275 |
| 7 | KNX presence/lux sensors | 21 | 6 to 12 | 125 | 250 |
| 8 | Curtain/shade motors + KNX blind actuators | 10 + 2 | 18 to 35 / 20 to 30 | 220 | 410 |
| | **Subtotal A** | | | **945** | **1,830** |

## 6.2 B. Climate and air

| # | Item | Qty | Unit (k) | Line low (k) | Line high (k) |
|---|---|---|---|---|---|
| 9 | KNX room controllers with temp/humidity | 7 | 8 to 15 | 56 | 105 |
| 10 | PoE air-quality nodes (open firmware, CO2 + PM + VOC) | 6 | 6 to 10 | 36 | 60 |
| 11 | Outdoor air station | 1 | 8 to 15 | 8 | 15 |
| 12 | ERV units (equipment, one per floor) | 2 | 80 to 180 | 160 | 360 |
| 13 | HVAC KNX/Modbus gateways | 2 | 20 to 40 | 40 | 80 |
| 14 | ERV dampers, duct sensors, controls | 1 lot | 30 to 60 | 30 | 60 |
| | **Subtotal B** | | | **330** | **680** |

## 6.3 C. Water

| # | Item | Qty | Unit (k) | Line low (k) | Line high (k) |
|---|---|---|---|---|---|
| 15 | Motorised main shut-off valve (DN25, manual override) | 1 | 12 to 25 | 12 | 25 |
| 16 | Flow meter (pulse or Modbus) | 1 | 10 to 20 | 10 | 20 |
| 17 | Inline TDS/EC sensors | 3 | 5 to 12 | 15 | 36 |
| 18 | Leak sensors (Zigbee) + wired rope sensor | 8 + 2 | 1.5 to 3 / 3 to 6 | 18 | 36 |
| 19 | Tank level sensors | 2 | 4 to 10 | 8 | 20 |
| | **Subtotal C** | | | **63** | **137** |

## 6.4 D. Energy

| # | Item | Qty | Unit (k) | Line low (k) | Line high (k) |
|---|---|---|---|---|---|
| 20 | 3-phase main meter (Modbus) | 1 | 15 to 30 | 15 | 30 |
| 21 | DIN sub-meters | 7 | 5 to 9 | 35 | 63 |
| 22 | RS-485 to Ethernet gateway | 1 | 8 to 15 | 8 | 15 |
| 23 | EV charger 7.4 kW with local API | 1 | 45 to 90 | 45 | 90 |
| | **Subtotal D** | | | **103** | **198** |

## 6.5 E. Security and access

| # | Item | Qty | Unit (k) | Line low (k) | Line high (k) |
|---|---|---|---|---|---|
| 24 | PoE cameras | 6 | 8 to 20 | 48 | 120 |
| 25 | PoE video doorbell | 1 | 12 to 30 | 12 | 30 |
| 26 | Thread/Matter smart lock | 1 | 20 to 45 | 20 | 45 |
| 27 | Wired contacts + KNX binary inputs | 15 + 2 | 0.5 to 1 / 8 to 15 | 24 | 45 |
| 28 | Siren and keypad panel | 1 | 10 to 20 | 10 | 20 |
| 29 | NAS/NVR, 2 bays, 2 x 4 TB surveillance disks | 1 | 45 to 80 | 45 | 80 |
| | **Subtotal E** | | | **159** | **340** |

## 6.6 F. Network and compute

| # | Item | Qty | Unit (k) | Line low (k) | Line high (k) |
|---|---|---|---|---|---|
| 30 | Firewall/router (small x86 box) | 1 | 25 to 50 | 25 | 50 |
| 31 | 24-port PoE+ managed switches | 2 | 45 to 90 | 90 | 180 |
| 32 | Wi-Fi 6 access points | 4 | 10 to 22 | 40 | 88 |
| 33 | Home Assistant server + cold spare | 2 | 20 to 38 | 40 | 75 |
| 34 | Zigbee PoE coordinators x2 + Thread border router | 3 | 8 to 15 | 25 | 45 |
| 35 | Online UPS 1.5 kVA with batteries | 1 | 55 to 95 | 55 | 95 |
| 36 | 18U rack, patch panel, PDU, cooling, labelling | 1 lot | 50 to 90 | 50 | 90 |
| 37 | Cat6A cabling, about 60 drops, supply and install | 60 | 2.5 to 4.5 | 150 | 270 |
| | **Subtotal F** | | | **475** | **893** |

## 6.7 G. Engineering and services

| # | Item | Qty | Unit (k) | Line low (k) | Line high (k) |
|---|---|---|---|---|---|
| 38 | System design, ETS programming, HA configuration | 1 | 300 to 600 | 300 | 600 |
| 39 | Commissioning, testing, training, documentation | 1 | 80 to 150 | 80 | 150 |
| | **Subtotal G** | | | **380** | **750** |

## 6.8 Summary

| Section | Low (k INR) | High (k INR) |
|---|---|---|
| A. Lighting and KNX | 945 | 1,830 |
| B. Climate and air | 330 | 680 |
| C. Water | 63 | 137 |
| D. Energy | 103 | 198 |
| E. Security and access | 159 | 340 |
| F. Network and compute | 475 | 893 |
| G. Engineering and services | 380 | 750 |
| **Total (estimate)** | **2,455** | **4,828** |
| Contingency, 10% | 246 | 483 |
| **Budget range with contingency** | **about 2,700** | **about 5,310** |

So roughly **INR 27 to 53 lakh (about USD 31,000 to 60,000)** for the scope above, or about INR 800 to 1,550 per sq ft of built-up area. The low end assumes mid-range KNX brands and simple fixtures. The high end assumes premium brands and designer fixtures.

## 6.9 How to read this

- **Lighting fixtures are the biggest swing.** Choosing decorative fixtures moves the high end more than any controls decision.
- **Wired-first costs most at construction and least later.** Cabling and backboxes (see [07](07-design-coordination-checklist.md)) are cheap during first fix and expensive after plastering.
- **Closed ecosystems.** Comparable scope from a single-vendor integrated system is commonly quoted higher, mainly through licensing and programming. This is not verified here, so compare against real quotes.
- **Running costs.** Plan for yearly filter and consumable changes (ERV filters, RO), a service contract or integrator hours, and battery replacement for wireless sensors every 2 to 3 years.
- **Value-engineering options.** Fewer tunable-white zones (tunable only in bedrooms, living, study), fewer keypad buttons, one NAS disk pair instead of a larger array, or standard cameras instead of premium ones.
