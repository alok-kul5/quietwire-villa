# 07. Design-Stage Coordination Checklist (Architect and MEP)

Use at design development and again before each first-fix inspection. Each item has an owner. Items marked **(!)** are expensive or impossible to fix after plastering.

Owner key: **A** architect, **S** structural, **E** electrical consultant, **M** HVAC/MEP, **P** plumbing, **I** smart home integrator, **PM** smart home project manager.

## 7.1 Conduits, trunking and cabling

| # | Item | Owner | Done |
|---|---|---|---|
| 1 | **(!)** Conduit schedule issued: separate routes for mains, KNX/low-voltage, and Cat6A, with minimum separation from power (follow the code and cable maker guidance) | E, I | [ ] |
| 2 | **(!)** Spare conduit (at least one extra 25 mm per floor riser, and 25% spare in horizontal runs) | E | [ ] |
| 3 | **(!)** Vertical riser between G5 rack room and first floor, with pull cords | A, E | [ ] |
| 4 | **(!)** Sleeves through beams and slabs marked on structural drawings before casting | S, E | [ ] |
| 5 | Cable tray or ladder in the rack room and above the false ceiling in corridors | E | [ ] |
| 6 | Cable bending radius respected for Cat6A (no tight 90 degree conduit corners) | E, I | [ ] |
| 7 | Conduit to roof for outdoor air station, tank sensors and inverter interface | E | [ ] |
| 8 | Earthing and bonding of rack, trays and shielded cable per code | E | [ ] |

## 7.2 Backboxes and switch positions

| # | Item | Owner | Done |
|---|---|---|---|
| 9 | **(!)** **Neutral at every switch location.** Run a neutral to all backboxes, including bathrooms and corridors | E | [ ] |
| 10 | **(!)** Deep backboxes (at least 45 to 50 mm) for KNX keypads and multi-gang positions | E | [ ] |
| 11 | Backbox heights and positions agreed per room on an elevation drawing, including bed-side positions | A, I | [ ] |
| 12 | Ceiling backboxes or cut-outs for presence/lux sensors, with the sensor field of view clear of beams, fans and ducts | A, E, I | [ ] |
| 13 | Door contacts: routing to the frame or head, recess in the door frame, agreed with the carpenter | A, I | [ ] |
| 14 | Concealed curtain/blind pocket with power and KNX at each window, motor type known before the false ceiling is closed | A, I | [ ] |
| 15 | Bedside positions: no router, socket-heavy extension block or large transformer on the bed-head wall where it can be avoided | A, E | [ ] |

## 7.3 Rack room

| # | Item | Owner | Done |
|---|---|---|---|
| 16 | **(!)** Rack room at least 2.0 x 2.2 m, lockable, with clear front and rear access | A | [ ] |
| 17 | **(!)** No water or wet-area pipes above or in the rack room walls | A, P | [ ] |
| 18 | Dedicated supply with its own breaker and a sub-meter, and a UPS circuit | E | [ ] |
| 19 | Heat load calculated and ventilation or small split AC provided (target below about 30 degrees C) | M | [ ] |
| 20 | Fire stop and cable entry sealing | A, E | [ ] |
| 21 | Labelling scheme issued: rack, patch panel ports, outlets, and distribution boards | I | [ ] |
| 22 | Fibre or utility entry from the street side, and 4G/5G backup antenna position | I | [ ] |

## 7.4 HVAC, ERV and BMS interfaces

| # | Item | Owner | Done |
|---|---|---|---|
| 23 | **(!)** HVAC equipment selected with a **documented KNX or Modbus gateway** option, points list and manual available before purchase | M, PM | [ ] |
| 24 | ERV selected with a documented control interface (Modbus map or 0 to 10 V plus dry contacts), filter status output and quiet-mode operation | M | [ ] |
| 25 | Control cable route from the ERV and outdoor units to the rack or the nearest KNX line | M, E | [ ] |
| 26 | Sensor locations for CO2, humidity and temperature agreed with the HVAC designer (not behind curtains, not in direct sun or near supply air) | M, I | [ ] |
| 27 | Interface matrix signed off by each vendor ([05](05-device-schedule.md), section 5.5) | PM | [ ] |
| 28 | Fire alarm dry contact for the smart system, read-only, and fire code kept independent | E | [ ] |
| 29 | Kitchen extract and make-up air design coordinated with the chimney vendor | M | [ ] |

## 7.5 Water

| # | Item | Owner | Done |
|---|---|---|---|
| 30 | **(!)** Space and a straight pipe run for the main motorised valve, flow meter and TDS sensor in the utility/rack zone, with a manual bypass | P | [ ] |
| 31 | Valve closing checked against pump dry-run and RO protection | P | [ ] |
| 32 | Sensor positions for leaks under sinks and in wet areas, with floor traps and drain falls so that water reaches the sensor | P, A | [ ] |

## 7.6 Wellness and low-EMF specific

| # | Item | Owner | Done |
|---|---|---|---|
| 33 | No AP or wireless hub inside bedrooms. AP positions on the ceiling plan | I | [ ] |
| 34 | Two Cat6A outlets in every bedroom at desk and bedside | I | [ ] |
| 35 | Main distribution board position away from the head of bedroom walls where the layout permits | A, E | [ ] |
| 36 | Smart meter and inverter location away from bedrooms | E | [ ] |
| 37 | Material choices checked with the wellness consultant: low-VOC paints and sealants, since VOC baselines drive the ventilation logic | A | [ ] |

## 7.7 Design review gate

Before releasing the project to site, the project manager confirms in writing:

- [ ] Conduit, backbox and riser drawings are issued and match the device schedule.
- [ ] Neutral at switches is on the electrical drawings.
- [ ] Rack room location and size are approved.
- [ ] Every vendor interface is on the signed interface matrix.
- [ ] Budget estimate is refreshed from real quotes.
- [ ] Cost-impact of late changes after first fix has been explained to the client.
