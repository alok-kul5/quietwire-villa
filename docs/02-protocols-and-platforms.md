# 02. Protocol Choices and Platform Comparison

## 2.1 Protocol decisions

| Function | Choice | Why | Where wireless is still allowed |
|---|---|---|---|
| Lighting and switches | **KNX TP** bus for keypads, sensors, actuators; **DALI-2 (DT8)** gateways for tunable-white drivers | KNX is an open, vendor-neutral ISO/IEC standard with hundreds of manufacturers and a decades-long product life. DALI-2 DT8 gives smooth colour-temperature control for circadian lighting. Both are wired | None |
| Network, APs, cameras, doorbell | **Ethernet Cat6A with PoE+** | Power and data on one cable, no batteries, no Wi-Fi for fixed devices, centrally UPS-backed | None |
| Air quality nodes | **PoE Ethernet** nodes running open firmware (ESPHome) with CO2, PM2.5, VOC sensors | Cheap, wired, local, transparent | None |
| Energy and plant interfaces | **Modbus RTU (RS-485)** to an Ethernet gateway | Standard on meters, ERVs, inverters, EV chargers | None |
| HVAC | Vendor gateway to **KNX or Modbus** | Keeps HVAC under the same automation without replacing the equipment | None |
| Battery sensors (leak, some temp) | **Zigbee 3.0** via PoE Ethernet coordinators | Mesh, very low duty cycle, years on a coin cell, local | Yes, limited to this class |
| Door lock | **Thread + Matter** | Local, low-power, interoperable | Yes |
| Voice / third-party | **Matter** bridge from Home Assistant, optional | Local, standard, off by default in bedrooms | Optional |
| Integration | **Home Assistant** (local server) with KNX, MQTT, Modbus, Zigbee, Matter | Open source, huge integration set, no licence fee, exportable config | |

### Wi-Fi policy

- Four ceiling Wi-Fi 6 access points, all PoE: living (G2), study (G6), lounge (F4), garage/outdoor (G10).
- **No AP in any bedroom.** The study and lounge APs cover guest and first-floor bedrooms, so those two AP radios follow a night schedule (for example 23:00 to 06:00 off, with a manual override on the keypad). The living and outdoor APs stay on for security and monitoring.
- Each bedroom has two Cat6A outlets so work and streaming devices can use cable.
- Phones will still radiate by their own design. The goal is to remove the fixed, always-on sources, not to promise zero RF.

### Why not "all Zigbee/Z-Wave/Wi-Fi"?

A wireless-everything approach is cheaper to retrofit but weaker for a new build: batteries to maintain, congestion, and constant radio sources. In a new construction the cable is cheap compared with fixing it later, which is why the design is wired-first and checked at the design stage ([07](07-design-coordination-checklist.md)).

## 2.2 KNX or wired DALI alone?

| Option | Strengths | Weaknesses | Verdict |
|---|---|---|---|
| **KNX for everything + DALI-2 gateways for tunable-white** (chosen) | One bus for lights, shades, HVAC, sensors; huge product range; strong tooling (ETS) | ETS licence and trained programmer needed; higher device cost than wireless | **Chosen** |
| DALI-2 only, with DALI control gear and application controllers | Excellent lighting control, cheaper per fixture | Weak for shading, HVAC, general I/O; needs a second system anyway | Use only as the fixture-level layer under KNX |
| KNX RF | Wireless KNX | Reintroduces a radio; unnecessary in new build | Rejected |

## 2.3 Platform comparison

Home Assistant (HA) as an open hub on KNX is compared with the commercial integrated systems an owner is commonly offered. Prices and availability are indicative and need local quotes.

| Criterion | **KNX + DALI-2 + Home Assistant (this design)** | **Control4** | **Crestron** | **Lutron** (RadioRA 3 / HomeWorks) |
|---|---|---|---|---|
| Openness | Open standards, multi-vendor | Closed, dealer-programmed, drivers from a catalogue | Closed, proprietary, dealer-only programming | Closed. Lutron-only lighting, partner integrations for the rest |
| Wiring | Wired bus (KNX TP, DALI) | Mixed wired and Zigbee/Wi-Fi | Fully wired or wireless options | RadioRA is RF; HomeWorks is wired |
| Local control without internet | Yes, by design | Mostly local, some features need the cloud account | Local processors | Local |
| Vendor lock-in | Low: any KNX/Modbus/Matter device, config exportable | High: dealer licence and driver dependency | Very high: only certified programmers can edit the system | High within lighting, moderate otherwise |
| Software licence | KNX: ETS (one-off, paid); HA: free | Dealer controls access; fees for some services | Dealer-only tools and licensing | Dealer tools |
| Typical cost (hardware + programming) | Lowest of the four for a wired villa; labour dominates | Mid to high | High to very high | Mid to high (lighting-heavy) |
| Serviceability | Any trained KNX integrator, or the owner for HA | Authorised dealer needed for most changes | Authorised dealer, sometimes a single local partner | Authorised dealer |
| Circadian / tunable white | DALI-2 DT8, flexible | Supported, driver-based | Supported, strong | Excellent (Lutron's strength) |
| India availability | KNX widely available (Schneider, ABB, Siemens, Hager, Gira, MDT via distributors); HA is software | Present through dealers, fewer than KNX integrators | Present, usually premium projects | Present in premium channels |
| US availability | Good through KNX distributors; HA community is large | Strong dealer network | Strong dealer network | Very strong |
| Longevity risk | Standard backed by an association, products interchangeable | Depends on one company | Depends on one company | Depends on one company |
| Fit for wired-first, low-EMF | Excellent | Medium (Zigbee/Wi-Fi leaning) | Good | Poor to medium (RF lighting) unless HomeWorks wired |

### Recommendation

Use **KNX + DALI-2 with Home Assistant as the local integration hub** for this villa. The reasons are open standards, wired-first fit, low software cost and serviceability by more than one party. Closed systems are acceptable when a client specifically wants one vendor and one warranty. In that case the same coordination checklist ([07](07-design-coordination-checklist.md)) still applies, and the cable and backbox decisions remain valid.

### Risks of the chosen approach, and mitigations

| Risk | Mitigation |
|---|---|
| Home Assistant is community-supported, no vendor SLA | Pin versions, test upgrades on a staging copy, keep daily backups, and document a rollback path ([10](10-facility-runbook.md)) |
| Only a few local KNX programmers | Hand over the ETS project file and group address list, and train two integrators during commissioning |
| Hub failure | Lights, shades and HVAC run on KNX without HA. Only cross-system automations pause. A cold spare server is in the rack |
| Mixed vendors, blame games | One named integrator is responsible for the whole system, with a written interface matrix |
