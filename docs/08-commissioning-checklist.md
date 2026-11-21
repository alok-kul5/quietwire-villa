# 08. Commissioning and Testing Checklist

Run in order. Record the date, the tester, the result and any defect against each line. A system is not handed over until every critical item passes (marked **C**).

## 8.1 Pre-commissioning (before power-up)

| # | Test | Crit | Result |
|---|---|---|---|
| 1 | Cable certification report for every Cat6A drop (pass), with labels matching the schedule | C | [ ] |
| 2 | KNX bus voltage, polarity and line topology checked, with no short between conductors | C | [ ] |
| 3 | Insulation and continuity tests by the electrician, signed | C | [ ] |
| 4 | Earthing of rack, trays and shielded cable verified | C | [ ] |
| 5 | Rack ventilation running, temperature logged for 24 h | | [ ] |
| 6 | Design drawings updated to as-built where site changed | | [ ] |

## 8.2 Network

| # | Test | Crit | Result |
|---|---|---|---|
| 7 | VLANs configured as in the plan, with inter-VLAN rules tested (IoT cannot reach residents, guests isolated) | C | [ ] |
| 8 | PoE budgets checked, and the switches show headroom | | [ ] |
| 9 | Wi-Fi survey: coverage in each room, and no AP inside bedrooms | | [ ] |
| 10 | **Night schedule:** AP radios turn off and on at set times, and wired ports stay up | C | [ ] |
| 11 | Internet failover to backup link works, and local control continues throughout | C | [ ] |
| 12 | UPS pull-test: rack stays up for the design time, and the shutdown sequence is graceful | C | [ ] |
| 13 | Remote access over VPN works, with no open inbound ports | C | [ ] |

## 8.3 Lighting and shading

| # | Test | Crit | Result |
|---|---|---|---|
| 14 | Every keypad button maps to the documented scene | C | [ ] |
| 15 | Every light zone dims smoothly down to 1% with no flicker or flash at switch-on | | [ ] |
| 16 | Colour temperature range reaches both ends (about 2200 K and 5000 K) | | [ ] |
| 17 | **Hub-off test:** unplug Home Assistant, and all keypads, scenes and shading still work | C | [ ] |
| 18 | Night-trip lighting: level 3 to 5%, warm, and returns to off after the timer | | [ ] |
| 19 | Presence timers and lux thresholds tuned per room with the residents | | [ ] |
| 20 | Shades: travel limits set and safe stop on obstruction | | [ ] |

## 8.4 Climate, ERV and air quality

| # | Test | Crit | Result |
|---|---|---|---|
| 21 | Each indoor unit follows its setpoint and mode from the keypad/app, and reports faults | C | [ ] |
| 22 | ERV speeds respond to CO2 test (breathe on the sensor or use a calibration source) | C | [ ] |
| 23 | Air node values cross-checked against a reference instrument, and offsets recorded | | [ ] |
| 24 | Window open contact pauses HVAC in the zone | | [ ] |
| 25 | Kitchen extract boost with make-up air, with no door slamming or backdraught | | [ ] |
| 26 | Bedroom noise measured at night mode, below the agreed level | | [ ] |
| 27 | Filter status alerts reach the right person | | [ ] |

## 8.5 Water

| # | Test | Crit | Result |
|---|---|---|---|
| 28 | Wet each leak sensor: alert received within the agreed time, and the main valve closes | C | [ ] |
| 29 | Valve closes and reopens from the keypad/app, and the manual override works | C | [ ] |
| 30 | **Hub-off test:** leak triggers shut-off with Home Assistant stopped | C | [ ] |
| 31 | Pump dry-run protection works when the valve is closed | C | [ ] |
| 32 | Flow-limit alarm triggers on a test (open tap) | | [ ] |
| 33 | TDS sensors read plausibly against a handheld meter and are calibrated | | [ ] |
| 34 | Sensor battery levels and last-seen status visible in the dashboard | | [ ] |

## 8.6 Energy

| # | Test | Crit | Result |
|---|---|---|---|
| 35 | Each meter reads close to a clamp meter under a known load | | [ ] |
| 36 | Sum of sub-meters is within an agreed tolerance of the main meter | | [ ] |
| 37 | Solar and EV values appear, with time-of-use tariff configured | | [ ] |

## 8.7 Security and access

| # | Test | Crit | Result |
|---|---|---|---|
| 38 | All contacts report open/closed correctly | C | [ ] |
| 39 | Alarm arm, disarm, entry delay and siren tested in each mode | C | [ ] |
| 40 | Each camera records, with correct field of view, retention and no blind spots | C | [ ] |
| 41 | Door lock works by app, code, and mechanical key, and fails safe on power loss | C | [ ] |
| 42 | Fire alarm trigger is seen by the system, and the system cannot silence the fire alarm | C | [ ] |
| 43 | Privacy check: no cameras in bedrooms or bathrooms, and any indoor cameras off when home | C | [ ] |

## 8.8 Integration, backup and resilience

| # | Test | Crit | Result |
|---|---|---|---|
| 44 | HA backup runs and a **test restore** onto the spare server succeeds | C | [ ] |
| 45 | ETS project file and group address list exported and stored in two places | C | [ ] |
| 46 | Power cut test: lights, rack, security and valve behave as designed, and everything returns cleanly | C | [ ] |
| 47 | Alert routing: critical alerts reach at least two people | C | [ ] |
| 48 | Admin accounts, passwords and keys recorded in a password manager with an emergency-access process | C | [ ] |

## 8.9 Sign-off

- Punch-list: open items listed with owner and date.
- Residents trained and have [the quick guide](09-resident-quick-guide.md).
- Facility team trained and has [the runbook](10-facility-runbook.md).
- As-built drawings, device list, passwords hand-over, warranty list and the support contract delivered.
- Signed by: integrator ______ , PM ______ , owner ______ , date ______ .
