# 04. Topology

## 4.1 System topology

```mermaid
flowchart TB
  ISP1[Fibre ISP] --> FW
  ISP2[4G/5G backup] --> FW
  subgraph RACK[G5 Rack room, UPS backed]
    FW[Firewall / router<br/>VLANs 10-60]
    SW1[PoE+ switch 1<br/>ground floor]
    SW2[PoE+ switch 2<br/>first floor]
    HA[Home Assistant server<br/>+ cold spare]
    NAS[NAS / NVR<br/>recordings, backups]
    KNXIP[KNX IP interface<br/>+ power supplies]
    DALI[DALI-2 DT8 gateways<br/>+ switch actuators]
    MB[Modbus gateway<br/>RS-485 to Ethernet]
    ZB[Zigbee and Thread<br/>PoE coordinators]
    FW --- SW1
    FW --- SW2
    SW1 --- HA
    SW1 --- NAS
    SW1 --- KNXIP
    SW1 --- MB
    SW1 --- ZB
    KNXIP --- DALI
  end
  KNXIP ==>|KNX TP line GF| KGF[GF keypads, sensors,<br/>shades, contacts]
  KNXIP ==>|KNX TP line FF| KFF[FF keypads, sensors,<br/>shades, contacts]
  DALI ==>|DALI-2 DT8 lines| LGT[Tunable-white fixtures<br/>44 zones]
  SW1 -->|PoE Cat6A| AP1[AP living]
  SW1 -->|PoE Cat6A| AP2[AP study]
  SW1 -->|PoE Cat6A| CAM[6 cameras + doorbell]
  SW2 -->|PoE Cat6A| AP3[AP lounge<br/>night schedule]
  SW2 -->|PoE Cat6A| AIR[6 air quality nodes<br/>+ outdoor station]
  SW1 -->|PoE Cat6A| AP4[AP garage/outdoor]
  MB ==>|RS-485| EM[Energy meters x8<br/>inverter, EV charger]
  MB ==>|RS-485 / dry contacts| ERV[2 ERV units]
  KNXIP -.->|KNX or Modbus gateway| HVAC[VRF / split HVAC]
  ZB -.->|Zigbee| LEAK[Leak sensors x8]
  ZB -.->|Thread / Matter| LOCK[Main door lock]
  HA -->|valve control, wired| VALVE[Main water valve<br/>+ flow meter + TDS]
  HA --- NAS
  HA -->|WireGuard VPN| REMOTE[Remote access]
```

Line styles: thick = wired control bus, thin = Ethernet/PoE, dotted = wireless or vendor gateway.

## 4.2 Data and control flow

```mermaid
flowchart LR
  S[Sensors<br/>CO2 PM2.5 VOC lux presence leak flow] --> HA2[Home Assistant]
  K[Keypads and shades<br/>KNX] <--> HA2
  HA2 -->|circadian curve| KNXB[KNX / DALI-2]
  HA2 -->|fan speed| ERVc[ERV]
  HA2 -->|close valve| V[Water valve]
  HA2 -->|alerts| N[Phone and keypad indicator]
  KNXB -. works if hub is down .-> K
```

If Home Assistant is offline: keypads, scenes, shading, local thermostats and the leak valve interlock still work. Circadian curves fall back to the KNX scheduler, and the ERV runs on a schedule.

## 4.3 Zoning summary

| Zone | KNX line | DALI line | PoE switch | VLAN highlights |
|---|---|---|---|---|
| Ground floor | Line 1 | DALI 1 and 2 | SW1 | 30, 40, 60 |
| First floor | Line 2 | DALI 3 | SW2 | 30, 60 |
| Exterior / garage | Line 1 (outdoor branch) | DALI 1 | SW1 | 40 |
| Roof / plant | Via Modbus and Ethernet | None | SW2 | 60 |

Two KNX lines keep each line's load under the 64-device limit with headroom for expansion, and let a fault on one floor be isolated.
