---
description: "Use ATAK and iTAK over Meshtastic radios: OpenMeshTak prepares every participant's radio and TAK app for an event, so TAK keeps working over LoRa without network."
---

# ATAK with Meshtastic

Meshtastic radios form a LoRa mesh that needs neither mobile network nor internet. The Meshtastic app can carry TAK traffic over that mesh, so ATAK and iTAK keep exchanging positions where there is no network. OpenMeshTak prepares both sides for every participant of an event: the radio settings and the TAK connection.

## How it fits together

<div class="flow">
  <div class="flow-step"><strong>ATAK or iTAK</strong><span>talks to the Meshtastic app on the same phone</span></div>
  <div class="flow-arrow" aria-hidden="true">→</div>
  <div class="flow-step"><strong>Meshtastic app</strong><span>sends TAK on the event's TAK mesh channel</span></div>
  <div class="flow-arrow" aria-hidden="true">→</div>
  <div class="flow-step"><strong>Radio mesh</strong><span>LoRa, hop by hop between the participants' radios</span></div>
  <div class="flow-arrow" aria-hidden="true">→</div>
  <div class="flow-step"><strong>Other TAK apps</strong><span>receive the positions through their own radio</span></div>
</div>

Whenever there is network, the TAK apps also use the [OpenMeshTak TAK server](/tak-server), which delivers the event's map data.

## What OpenMeshTak prepares

- **One radio settings file per participant** with the radio's name, the event's LoRa settings and exactly the channels that participant may use, including secret channels. See [Meshtastic](/events/meshtastic).
- **The TAK mesh channel** each participant sets in the Meshtastic app, shown on their dashboard.
- **The TAK connection** to the OpenMeshTak TAK server, with callsign, team color and role from the event. See [TAK apps](/participants/tak-apps).
- **Map data** as Data Packages for the TAK apps. See [Map data](/events/mission-data).

Nobody types channel keys or LoRa settings by hand, so all radios of an event match.

## Setting it up

1. Turn on **Use Meshtastic radios** for the event, see [Set up an event](/events/setup).
2. Choose the radio settings, channels and who receives which channel, see [Meshtastic](/events/meshtastic).
3. Participants import their settings file into the Meshtastic app, see [Participant setup](/participants/).
4. Participants connect ATAK or iTAK over Meshtastic, see [TAK apps over Meshtastic](/participants/tak-apps#over-meshtastic).

## At the HQ

Without internet, the HQ can still follow the radio positions on the event map in the browser, with a Meshtastic radio on USB. See [Offline HQ](/events/offline-hq).
