---
description: "Give every participant their own Meshtastic radio settings file with name, LoRa settings and channels, including secret channels."
---

# Meshtastic

OpenMeshTak creates one settings file per participant for their Meshtastic radio. It contains the radio's name, the event's radio settings and the channels that participant may use.

This page applies to events with **Use Meshtastic radios** turned on; see [Set up an event](/events/setup#_1-create-the-event).

## Set up the radios

<Screenshot name="event-meshtastic" alt="Meshtastic firmware page with the event firmware line and releases" side />

1. Under the event's Meshtastic settings, choose the firmware. The recommended version is preselected.
2. Adjust the radio settings and save.
3. Create the primary channel and any secondary channels.
4. Choose who receives each channel, see below.
5. Under **TAK connection**, choose the channel the Meshtastic app sends TAK on. Without a choice, it uses the primary channel.
6. Publish the configuration.

Participants then download their file from the dashboard; see [Participant setup](/participants/).

Only settings the chosen firmware supports are written to the file. Firmware versions tested on a real radio are marked **Tested on a device**; currently that is firmware <code>{{ $versions.firmware }}</code> with the Meshtastic Android app.

## Who gets which channel

<Screenshot name="meshtastic-channels" alt="Channel list with the primary channel, group channels and a secret channel" side />

Each channel has an audience: event groups, roles, single members, or any mix. A participant's file contains only the channels in their audience.

## Secret channels

A secret channel's key goes only to its **key holders** at first. Everyone else does not receive it in any file or QR code. Key holders see a handout on their dashboard to share the channel on site when the time comes.

When you **release** the channel, it is included in files created from then on. Files that were already downloaded do not change. If a key may have leaked, rotate it.

Every key handout, release and rotation is recorded in the audit log.

## Passwords and PINs

Settings such as a fixed Bluetooth PIN are write-only. The Web app shows whether they are set, never their value.

## Mesh nodes

Positions [forwarded by an Offline HQ](/events/offline-hq#forward-to-openmeshtak) belong to a radio, not yet to a person. **Mesh nodes** in the event's **Meshtastic** tab lists every radio the HQs heard.

<Screenshot name="mesh-nodes" alt="Mesh nodes list with BLADE, FROST and KILO suggested for the matching members, and two unknown nodes" side />

- When a radio's short name and long name match a member's, for example `B1` and `BLADE`, OpenMeshTak suggests that member. **Confirm** binds the radio.
- **Bind a node** binds a radio to another member, also before any HQ heard it, by its node ID such as `!2b6c0011`.
- A bound radio's positions continue the member's track and appear in the member's group. Radios nobody is bound to appear as **Unknown mesh nodes**, under their node ID.

Binding needs the permission **Bind Meshtastic nodes to members** and applies at once; it is not part of the published configuration. Positions recorded before the binding keep their old name.
