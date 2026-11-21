# 11. Project Timeline by Construction Stage

Assumes an approximately 16-month design-and-build programme for the villa. Smart home work is shown relative to the main construction, with the reason each step happens when it does. Durations are indicative and depend on the contractor's schedule.

| Stage | Months | Smart home activities | Gate / output |
|---|---|---|---|
| 0. Briefing | 0 to 1 | Client interview (sleep, health, routines, ageing in place), principles agreed, budget band set, protocol decision (KNX + DALI + HA) | Signed design brief |
| 1. Concept design | 1 to 3 | Review architect's concept: rack room location, room list, AP positions, riser. Draft interface matrix. First budget range | Concept review note |
| 2. Design development | 3 to 5 | Device schedule, single-line and topology diagrams, conduit and backbox drawings, neutral-at-switch requirement, HVAC/ERV gateway requirement. Vendor shortlist and quotes | **Design review gate** ([07](07-design-coordination-checklist.md), 7.7) |
| 3. Tender and vendor selection | 5 to 6 | Compare at least three quotes per package. Technical clarification meetings. Award integrator, supply of KNX, network, security | Awarded contracts, updated budget |
| 4. Foundation and structure | 6 to 9 | Embedded sleeves through slabs/beams, earthing pits, outdoor conduit for cameras and meters, riser and rack room shell confirmed | Sleeve inspection against drawings |
| 5. Masonry and first fix | 9 to 11 | Conduit and backbox installation by electrician, riser pull cords, rack-room trays, water entry space for valve and meter. Site audit with photos before plastering | **First-fix inspection** (counts, depths, neutrals, separation) |
| 6. Services first fix and ceilings | 10 to 12 | Cat6A and KNX cable pulling, DALI cabling, sensor and shade-pocket prewire, ERV duct sensors, leak-sensor positions. Cable certification before ceilings close | **Pre-closure inspection** |
| 7. Plaster, flooring, paint | 11 to 13 | Protect backboxes, keep ceiling access panels, low-VOC materials checked, cable tests repeated if damaged | Updated as-builts |
| 8. Second fix | 13 to 14 | Install keypads, sensors, fixtures, shades, APs, cameras, rack equipment, valve and meters. Network and rack built and labelled | Installation complete record |
| 9. Commissioning | 14 to 15 | ETS and HA programming, scene tuning, [commissioning checklist](08-commissioning-checklist.md), hub-off and power-cut tests, balancing ventilation, calibration | Test sheets, punch list |
| 10. Handover and training | 15 to 16 | [Resident guide](09-resident-quick-guide.md) and [runbook](10-facility-runbook.md), as-built set, ETS file, credentials, warranty list, training of residents and facility staff | Signed handover |
| 11. Post-occupancy | 16 to 28 | 30-day review of schedules and thresholds, 90-day air and sleep-lighting review, 6-month and 12-month checks, warranty clean-up | Closing report |

## Critical-path notes

- **Stages 2 and 5 decide the project.** A missing neutral or a missing conduit found after plastering costs many times more than during design.
- **HVAC and ERV selection** must include the gateway and points list before purchase. Late selection blocks commissioning.
- **Do not close ceilings** until cable certification and sensor positions are signed off.
- **Programming** can start on a bench before site is ready, saving time at stage 9.
- **Procurement lead times** for KNX products, fixtures with DT8 drivers and ERVs can run several weeks. Order after design freeze and before first fix.

## Milestone payments (suggested)

| Milestone | Share |
|---|---|
| Design package accepted | 15% |
| First-fix inspection passed | 20% |
| Equipment delivered and installed | 30% |
| Commissioning passed | 25% |
| Handover and training complete | 10% (retention until the 12-month check) |

## Risk register (top items)

| Risk | Effect | Response |
|---|---|---|
| Neutral or conduit missed | Costly rework or compromises | Design gate and first-fix audit |
| Vendor gateway not available | HVAC left out of the system | Decide at tender, and make the gateway a purchase condition |
| Scope creep | Budget and delay | Change-control form, cost shown before approval |
| Late fixture selection | Wrong drivers or dimming issues | Freeze fixtures at design development, and test samples |
| Single integrator dependence | Service risk | Hand over files, train two parties, source-of-truth docs |
| EMF anxiety versus facts | Mismatched expectations | Be clear about what the design does and does not promise |
