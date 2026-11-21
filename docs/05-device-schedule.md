# 05. Room-by-Room Device Schedule

Room IDs match the assumed plan in [01](01-overview-and-principles.md). Quantities are design counts for budgeting and coordination, to be confirmed against the final architectural layout.

**Column key**

- **TW zones:** tunable-white lighting zones on DALI-2 DT8
- **Keypad:** KNX wall keypads (4 to 6 button)
- **Pres/lux:** KNX presence + lux sensors
- **Air:** PoE air-quality node (CO2, PM2.5, VOC, T/RH)
- **Shade:** curtain or blind motors
- **Contacts:** wired door/window reed contacts (to KNX binary inputs)
- **Data:** Cat6A outlets (home-run to rack), not counting devices already listed that are PoE

## 5.1 Ground floor

| ID | Room | TW zones | Keypad | Pres/lux | Air | Shade | Contacts | Data | Other devices |
|---|---|---|---|---|---|---|---|---|---|
| G1 | Foyer and porch | 2 | 1 | 1 | 0 | 0 | 1 | 1 | PoE video doorbell, Thread lock, camera (porch) |
| G2 | Living | 5 | 2 | 2 | 1 | 2 | 2 | 3 | AP living, KNX room controller, HVAC indoor unit, TV outlet |
| G3 | Dining | 2 | 1 | 1 | 0 | 1 | 1 | 1 | |
| G4 | Kitchen | 3 | 1 | 1 | 0 | 0 | 1 | 1 | Leak sensor, gas detector, extract fan interface, TDS (tap line) |
| G5 | Utility and rack room | 1 | 1 | 1 | 0 | 0 | 1 | 4 | Rack, 2 leak sensors, main valve, flow meter, TDS (inlet and RO outlet), temperature sensor, door contact |
| G6 | Study | 3 | 1 | 1 | 1 | 1 | 1 | 3 | AP study, KNX room controller, HVAC indoor unit |
| G7 | Guest BR4 + bath | 3 | 2 | 1 | 1 | 1 | 1 | 2 | KNX room controller, HVAC indoor unit, bath leak sensor |
| G8 | Powder | 1 | 1 | 1 | 0 | 0 | 0 | 0 | Leak sensor |
| G9 | Staircase | 2 | 2 | 2 | 0 | 0 | 0 | 0 | Night-path low-level lighting |
| G10 | Garage / driveway | 2 | 1 | 1 | 0 | 0 | 1 | 1 | AP outdoor, 2 cameras, 7.4 kW EV charger, sub-meter |
| **GF total** | | **24** | **13** | **12** | **3** | **5** | **9** | **16** | |

## 5.2 First floor

| ID | Room | TW zones | Keypad | Pres/lux | Air | Shade | Contacts | Data | Other devices |
|---|---|---|---|---|---|---|---|---|---|
| F1 | Master bedroom | 5 | 3 | 2 | 1 | 2 | 2 | 2 | KNX room controller, HVAC indoor unit, **no AP, no wireless sensors in room**, night-light path to bath |
| F1b | Master dressing + bath | 3 | 1 | 2 | 0 | 0 | 0 | 0 | Leak sensor |
| F2 | Bedroom 2 | 3 | 2 | 1 | 1 | 1 | 1 | 2 | KNX room controller, HVAC indoor unit |
| F3 | Bedroom 3 + bath | 4 | 2 | 2 | 1 | 1 | 1 | 2 | KNX room controller, HVAC indoor unit, bath leak sensor |
| F4 | Family lounge | 3 | 1 | 1 | 0 | 1 | 1 | 3 | AP lounge (night schedule), KNX room controller, HVAC indoor unit |
| F5 | Balcony / terrace | 2 | 1 | 1 | outdoor station | 0 | 1 | 1 | Camera (terrace), outdoor air station |
| F6 | Roof | 0 | 0 | 0 | 0 | 0 | 0 | 2 | Tank level sensors (x2), leak sensor (tank room), inverter interface, ERV and outdoor-unit interfaces |
| **FF total** | | **20** | **10** | **9** | **3 (+1 outdoor)** | **5** | **6** | **12** | |

## 5.3 Exterior and whole-house

| Item | Qty | Location |
|---|---|---|
| Cameras | 6 | Porch, garage x2, terrace, rear, side gate |
| PoE video doorbell | 1 | G1 |
| Wi-Fi APs | 4 | Living, study, lounge, garage/outdoor |
| Zigbee/Thread coordinators (PoE) | 2 + 1 Thread border router | Rack room and first-floor ceiling |
| Leak sensors (Zigbee) | 8 | Kitchen 1, utility 2, BR4 bath 1, powder 1, master bath 1, BR3 bath 1, tank room 1 |
| ERV units | 2 | One per floor (roof / ceiling plant) |
| Energy meters | 8 | Main, GF HVAC, FF HVAC, ERVs, kitchen, geyser, EV, solar inverter |
| Cat6A spare drops | 6 | Unassigned, in the lounge, study and rack room |

## 5.4 Project totals (feeds the bill of materials)

| Item | Total |
|---|---|
| Tunable-white lighting zones | 44 |
| KNX keypads | 23 |
| KNX presence/lux sensors | 21 |
| Air-quality nodes (indoor) | 6 |
| Outdoor air station | 1 |
| Shade motors | 10 |
| Wired contacts | 15 |
| Leak sensors | 8 |
| Cameras | 6 |
| Wi-Fi APs | 4 |
| Cat6A drops (data above, plus PoE devices, plus 6 spare) | about 60 |
| Energy meters | 8 |
| KNX room controllers (thermostat with humidity) | 7 |

## 5.5 Interface matrix (who owns each handoff)

| Interface | Provided by | Connects to | Protocol | Responsible for the handoff |
|---|---|---|---|---|
| HVAC indoor units | MEP / HVAC vendor | KNX or Modbus gateway | Vendor to KNX/Modbus | MEP provides gateway and points list, integrator maps |
| ERV | MEP vendor | Modbus gateway, dry contacts | Modbus or 0 to 10 V | MEP provides register map |
| Fire alarm | Fire consultant | HA dry contact (read-only) | Contact closure | Fire contractor, integrator listens only |
| Solar inverter | Solar vendor | Modbus gateway | Modbus TCP/RTU | Solar vendor provides map |
| EV charger | Electrician | Ethernet, local API | OCPP or vendor local API | Electrician installs, integrator integrates |
| Pump, RO | Plumbing vendor | Dry contacts and valve interlock | Contact closure | Plumbing vendor |
| Lift / BMS (if any) | Not applicable here | | | Reserved |
