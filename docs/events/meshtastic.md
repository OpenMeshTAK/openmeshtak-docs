# Meshtastic

OpenMeshTak creates one settings file per participant for their Meshtastic radio. It contains the radio's name, the event's radio settings and the channels that participant may use.

## Set up the radios

1. Under the event's Meshtastic settings, choose the firmware. The recommended version is preselected.
2. Adjust the radio settings and save.
3. Create the primary channel and any secondary channels.
4. Choose who receives each channel, see below.
5. Publish the configuration.

Participants then download their file from the dashboard; see [Participant setup](/participants/).

Only settings the chosen firmware supports are written to the file. Firmware versions tested on a real radio are marked **Tested on a device**; currently that is firmware `2.8.1` with the Meshtastic Android app.

## Who gets which channel

Each channel has an audience: event groups, roles, single members, or any mix. A participant's file contains only the channels in their audience.

## Secret channels

A secret channel's key goes only to its **key holders** at first. Everyone else does not receive it in any file or QR code. Key holders see a handout on their dashboard to share the channel on site when the time comes.

When you **release** the channel, it is included in files created from then on. Files that were already downloaded do not change. If a key may have leaked, rotate it.

Every key handout, release and rotation is recorded in the audit log.

## Passwords and PINs

Settings such as a fixed Bluetooth PIN are write-only. The Web app shows whether they are set, never their value.
