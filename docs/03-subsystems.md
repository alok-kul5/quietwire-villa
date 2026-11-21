# 03. Subsystem Designs

Setpoints below are starting values. They should be tuned with the residents during commissioning and any limits that matter for health must come from the relevant guidance or a qualified consultant.

## 3.1 Circadian lighting

**Goal:** light that supports sleep and alertness without the residents managing it.

**Hardware:** tunable-white (2200 to 5000 K) LED fixtures on DALI-2 DT8 drivers. KNX presence/lux sensors and keypads. Warm-dim to near-dark at night paths.

**Behaviour**

| Time / state | Colour temp | Level | Notes |
|---|---|---|---|
| Morning (sunrise to 10:00) | 4000 to 5000 K, rising | 70 to 100% | Support wake-up in living, kitchen, study |
| Daytime | 4000 to 4500 K | As needed, daylight-harvested | Dim when lux sensor shows enough daylight |
| Evening (from sunset) | 3000 to 2700 K, falling | 60 to 40% | Living and dining |
| Late evening | 2200 to 2500 K | 20 to 30% | Bedrooms and lounge, no cool white |
| Night trip (motion, 23:00 to 06:00) | 2200 K | 3 to 5% | Bedroom to bath, stairs, route to kitchen. Never full brightness |
| Manual override | Any | Any | Keypad press always wins for a timeout, then returns to schedule |

**Rules**

- Wall keypads work with no hub. Scene logic lives in KNX, circadian curves are pushed by Home Assistant (or by a KNX scheduler as a fallback).
- Night lighting never uses cool white.
- Presence-based off timers: living areas 20 min, bathrooms 10 min, bedrooms manual or long timer.
- Drivers must be flicker-free at low dim levels. Test at 1% and 5% during commissioning.

## 3.2 Climate and ERV ventilation

**Goal:** comfortable temperature and humidity with fresh air that is actually fresh.

**Equipment (by MEP consultant):** VRF or ducted multi-split for cooling; two energy recovery ventilators (ERV), one per floor, with filtration (at least MERV 13 / F7 on supply); bathroom and kitchen extract.

**Sensing:** KNX room controllers with temperature and humidity; PoE air nodes with CO2 (NDIR), PM2.5 and VOC index in the six main rooms; outdoor air station on the terrace (PM2.5, temperature, humidity).

**Control logic (per floor)**

| Input | Condition | Action |
|---|---|---|
| CO2 | Above about 800 ppm | ERV to medium |
| CO2 | Above about 1000 ppm | ERV to high; notify if above 1400 ppm for 10 min |
| PM2.5 (indoor) | Above about 25 ug/m3 | Increase filtration/ERV, notify |
| Outdoor PM2.5 | Above indoor and above about 50 ug/m3 | Reduce intake, recirculate through filters where available |
| VOC index | Rising above baseline | ERV to medium, check source (cooking, cleaning, new furnishings) |
| Relative humidity | Above about 65% | Dehumidify via HVAC |
| Relative humidity | Below about 35% | Notify, humidify only if equipment installed |
| Bedroom at night | Occupied, CO2 rising | Quiet ERV boost, keep noise within agreed limit |
| Window open (contact) | Open | Pause HVAC in that zone |
| Kitchen hob on | Extract on, make-up air available | Boost extract, avoid negative pressure |

**Interfaces:** HVAC gateway (KNX or Modbus) exposes on/off, setpoint, mode and fault. ERV exposes fan speed and filter status (Modbus or 0 to 10 V plus dry contacts). Ownership of each interface is written in the interface matrix at design stage ([07](07-design-coordination-checklist.md)).

**Fallbacks:** if the hub or sensors fail, ERV runs on a fixed schedule, and thermostats keep local control.

## 3.3 Water quality and leak protection

**Goal:** know what is in the water, and stop damage fast.

**Water quality**

- Inline TDS/EC sensors at: RO outlet (drinking), kitchen tap line, and borewell/municipal inlet to the sump.
- Trend and alert on drift. Example: RO outlet TDS rising above an agreed threshold (for example 100 ppm, tune to the installed RO) means membrane or filter service is due.
- TDS is only a proxy. It does not detect bacteria, pesticides or heavy metals. Periodic lab testing is part of the runbook ([10](10-facility-runbook.md)).

**Leak detection and shut-off**

- Leak sensors under kitchen sink, utility, each bathroom, near water heater, near the washing machine, and the tank room.
- A motorised ball valve on the main water entry in the rack/utility room (fail-safe design, manual lever override).
- Flow meter on the main line for continuous-flow detection (a tap left open or a hidden leak).

| Event | Action |
|---|---|
| Any leak sensor wet | Close main valve, push alert, light the nearest keypad indicator, log event |
| Flow above 0 for longer than the agreed limit (for example 90 min at night) | Alert first, close valve if confirmed |
| Valve closed and leak cleared | Reopen only by resident confirmation (keypad or app), not automatically |
| Hub down | Valve action runs from a wired controller input, so that the key safety path does not depend on HA |
| Away mode | Tighter flow limit, valve closes if flow continues |

Check any valve closing against pump and RO protection, so closing a valve does not run a pump dry. The pump controller needs a dry-run cutoff and an interlock with the valve.

## 3.4 Energy monitoring

- 3-phase main meter plus circuit-level meters for: first-floor HVAC, ground-floor HVAC, ERVs, kitchen, water heater/geyser, EV charger, and solar inverter, all on Modbus RS-485 to a gateway.
- Home Assistant records consumption, solar generation, and per-circuit cost with time-of-use tariffs.
- Useful automations: run the geyser and EV charge during solar surplus, notify on abnormal standby load, flag a failing appliance by its changed profile.
- Load shedding rule: keep life-safety, rack/UPS, refrigeration and ventilation. Shed EV charging and water heating first.

## 3.5 Security and access

| Element | Design |
|---|---|
| Doors and windows | Wired reed contacts to KNX binary inputs |
| Cameras | Six PoE cameras (porch, garage x2, terrace, rear, side gate), recorded locally on an NVR/NAS, no mandatory cloud |
| Video doorbell | PoE, local streaming, wired chime |
| Door lock | Thread/Matter smart lock on main door, mechanical key retained |
| Alarm | Home Assistant alarm panel logic with a wired keypad and siren. Modes: home, away, night |
| Privacy | No cameras inside bedrooms or bathrooms. Indoor cameras only if the residents opt in, off by default when home |
| Fire/gas | Code-compliant fire alarm is separate and listed. HA only listens through a dry contact. Gas leak detector in kitchen with a valve or alert |
| Remote access | Private VPN (WireGuard), not open ports |

## 3.6 Network and rack room

**Rack room (G5):** about 2.0 x 2.2 m, lockable, with its own ventilation, one dedicated circuit with sub-metering, water-free ceiling above, and a fire-rated door if the architect allows it.

**Rack contents (18U wall or floor rack, front and back access):** patch panel (Cat6A), two PoE+ switches, firewall/router, HA server and spare, NAS/NVR, KNX power supplies and IP interface, DALI and actuator DIN rail enclosure (or a separate DB), UPS, labelled PDU.

**Cabling:** home-run Cat6A from the rack to every outlet. Count and positions in [05](05-device-schedule.md). Every cable and outlet labelled. Separate low-voltage route from power.

**VLANs**

| VLAN | Name | Devices | Rules |
|---|---|---|---|
| 10 | Management | Switches, APs, firewall, HA, NAS | Residents' devices cannot reach it |
| 20 | Residents | Phones, laptops, tablets | Internet and HA only |
| 30 | Smart / IoT | Air nodes, Zigbee/Thread coordinators, meters, TVs | No internet by default, only allowed outbound exceptions, reachable by HA only |
| 40 | Cameras | Cameras, doorbell | Reach NVR only, no internet |
| 50 | Guests | Guest Wi-Fi | Internet only, isolated |
| 60 | Building systems | HVAC gateways, ERV, EV charger, inverter | Reachable by HA and the service provider VPN only |

**Resilience**

- Online UPS sized for the rack for about 2 to 4 hours (final sizing by load calculation), with generator or inverter backup connected to the lighting, safety and rack circuits.
- Dual internet uplinks (fibre plus 4G/5G backup) with automatic failover. Core functions do not need either.
- Daily encrypted backup of the HA configuration and ETS project to the NAS and to an offline copy.
