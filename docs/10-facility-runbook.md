# 10. Facility-Management Runbook

For the person or team who maintains the villa after handover. Keep it with the as-built pack. Fill the blanks at handover.

## 10.1 System map and ownership

| System | Where it lives | Primary owner | Backup owner |
|---|---|---|---|
| Rack, network, firewall | G5 rack room | Integrator | Facility manager |
| Home Assistant and spare | G5 rack | Integrator | Facility manager |
| KNX and DALI | Distribution boards, G5 | Electrician with integrator for programming | Integrator |
| HVAC and ERV | Roof and ceiling plant | HVAC contractor | Facility manager |
| Water valve, RO, pumps | G5 and tank room | Plumber | Facility manager |
| Cameras, NVR | Rack and exterior | Integrator | Facility manager |
| Energy, solar, EV | G5 and roof | Electrician | Facility manager |

Contacts, account owners and warranty documents are stored in the handover folder: ______ .

## 10.2 Access, credentials and documentation

- Credentials live in a password manager with at least two named admins. Never in email or notes.
- Documentation set: as-built drawings, ETS project file, group address list, device list with serials, network and VLAN plan, interface matrix, warranty list, this runbook.
- The ETS file and Home Assistant configuration are in version control (private), and copies are on the NAS and one offline drive.
- Changes go through a change log: who, what, when, why, how to roll back.

## 10.3 Routine maintenance

| Frequency | Task | Who |
|---|---|---|
| Daily (automatic) | HA config backup to NAS, camera recording check | System |
| Weekly | Open the dashboard: errors, offline devices, battery levels, disk space | Facility manager |
| Monthly | Test one leak sensor and watch the valve close, check UPS status and test load, check rack temperature | Facility manager |
| Quarterly | ERV and HVAC filters (clean or replace per vendor schedule), check air-node readings against a handheld meter, apply security updates after testing | HVAC, integrator |
| Quarterly | Test restore of the backup to the spare server | Integrator |
| Every 6 months | Review firewall rules and remote-access accounts, remove unused users, test internet failover | Integrator |
| Yearly | Replace battery sensors showing under 20% or older than 2 to 3 years, UPS battery health test, RO membrane and filter service, lab test of drinking water, review energy trends | Facility manager, plumber |
| Every 3 to 5 years | UPS batteries, NAS disks, HA server hardware, firmware roadmap review | Integrator |

## 10.4 Alert response

| Alert | Severity | First response | Then |
|---|---|---|---|
| Leak detected, valve closed | High | Go to the location, find and stop the source, dry the sensor | Reopen the valve after confirmation, log the event |
| Continuous water flow | High | Check taps, tank float, and pipes | Close the valve if a leak is suspected |
| CO2 above 1400 ppm for 10 min | Medium | Check the ERV is running and windows or doors | Inspect ERV and filters if the issue persists |
| PM2.5 or VOC high | Medium | Identify the source, boost ventilation | Replace filters if repeated |
| Gas detector | Critical | Treat as a real leak, see the resident guide | Call the gas provider, investigate before re-enabling |
| Rack temperature high | High | Check rack-room cooling, reduce load | Call the HVAC contractor |
| UPS on battery | Medium | Check the mains, note the time | Plan a graceful shutdown if the outage is long |
| Device offline | Low to medium | Check power, PoE port and the battery | Replace, then update the device list |
| Camera offline or disk full | Medium | Check the PoE port and the NAS | Fix and confirm recording resumed |
| Door left open, alarm | High | Check cameras, call the residents | Follow the security procedure |

## 10.5 Troubleshooting guide

| Symptom | Likely cause | Check |
|---|---|---|
| Keypad does nothing | KNX line fault or power supply | KNX power supply LED, bus voltage, ETS diagnostics |
| One room's lights dead | DALI gateway or driver fault | Gateway status, driver address, breaker |
| Lights fine but app slow | HA load, network | HA logs, switch and uplink utilisation |
| No data from air nodes | PoE port, VLAN 30 | Port status, node IP, MQTT or API connection |
| Leak sensor missing | Battery or Zigbee link | Battery level, coordinator, distance from the router |
| Valve will not open | Wet sensor still active, interlock, power | Sensor state, the valve LED, manual lever |
| Wi-Fi on at night | Schedule disabled | AP schedule, manual override timer |
| ERV not responding | Modbus fault or the unit is in local mode | Gateway link, ERV controller panel |
| Remote access fails | ISP, VPN keys | Firewall logs, the backup link |
| Cannot reach the HA UI | Server down | Rack power, UPS, boot the spare using the restore procedure |

## 10.6 Procedures

### Restore Home Assistant

1. Power off the failed server and label it.
2. Boot the spare server (same network settings, kept updated monthly).
3. Restore the latest backup from the NAS.
4. Check KNX, Modbus, MQTT and Zigbee integrations and one automation in each subsystem.
5. Log the incident and plan a replacement for the failed unit.

### Planned power shutdown

1. Notify residents and set maintenance mode (silences non-critical alerts).
2. Take a fresh backup.
3. Shut down in order: HA, NAS, switches and firewall, then the UPS.
4. After power returns, start in reverse order and run the quick checks: lights, valve status, cameras and alarm.

### Change management

- Test changes on the spare server first, apply during a quiet time, keep the last known good configuration, and record the change.
- Do not edit KNX group addresses without updating the ETS file and the documentation.
- Add every new device to the device list with the room, purpose, protocol, VLAN and serial.

### Adding a device

1. Choose a wired option first. Justify any wireless device.
2. Assign a VLAN, a name following the room-function convention, and a spare-cable route if wired.
3. Add it to the dashboard, the device list and the backup.
4. Test, then record.

## 10.7 Security hygiene

- Keep admin interfaces on the management VLAN only.
- Remote access over VPN only, with unique keys per person, and revoke on departure.
- Update firmware on a schedule, after testing, with the backup taken first.
- Review camera and door-lock access quarterly.
- Retain footage only as long as needed, and follow the privacy law in force locally.

## 10.8 Spares and consumables

| Item | Suggested spares |
|---|---|
| KNX power supply | 1 |
| DALI-2 driver for each fixture type | 2 each |
| Keypad, presence sensor | 2 each |
| Leak sensors and batteries | 4 |
| PoE switch or access point | 1 each, or a service agreement |
| HA spare server | 1, always updated |
| ERV and HVAC filters | 1 year's supply |
| RO filters and membrane | 1 year's supply |
| UPS batteries | Replace on schedule |

## 10.9 Escalation

1. Facility manager checks this runbook.
2. Integrator support line.
3. Vendor support for the product (HVAC, ERV, valve, charger, NAS).
4. Escalate to the project manager if a defect is a design or coordination issue.
