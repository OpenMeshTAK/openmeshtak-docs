---
description: "OpenMeshTak is an open-source, self-hosted TAK server for ATAK, iTAK and WinTAK: certificate enrollment, live CoT and Data Packages in one Docker container, set up per event."
---

# Self-hosted TAK server

OpenMeshTak includes its own TAK server. You do not install or connect a separate one: the TAK server, the Web app and the API run together in one Docker container on your own server. It is open source and built for events, so every participant gets their own TAK connection without hand-made certificates or server lists.

## What the TAK server does

| Service | What it means for participants |
| --- | --- |
| Certificate enrollment | Each device signs in once with the participant's login and receives its own client certificate. |
| CoT streaming | ATAK, iTAK and WinTAK exchange live positions, markers and chat with everyone in the same event. |
| Data Packages | Map content published in the Web app reaches the TAK apps automatically. |

The TAK app also takes over the participant's callsign, team color and role from the event. They follow from the participant's role and group, see [How an event works](/events/).

## Connecting TAK apps

Participants connect from their dashboard by QR code, connection package or login data. ATAK-CIV on Android, iTAK on iPhone and WinTAK on Windows are supported; the tested versions and every step are in [TAK apps](/participants/tak-apps).

Operators see every connected TAK app on the event map in the browser and can replay recorded tracks afterwards, see [Live view and history](/events/live-history).

## Running it

The Web app and API sit behind your usual reverse proxy. The TAK ports go straight to OpenMeshTak, which terminates mutual TLS itself.

1. Start the container with Docker Compose, see [Install with Docker](/installation/).
2. Put the Web app behind your reverse proxy, see [Reverse proxy and TLS](/installation/reverse-proxy).
3. Publish the TAK ports and check them, see [TAK ports](/installation/tak-ports).
4. Choose the TAK server certificate, see [Configure the installation](/installation/settings).

## With Meshtastic radios

Where there is no network, the TAK apps can keep working over Meshtastic radios. OpenMeshTak prepares the radios and the TAK apps of an event together, see [ATAK with Meshtastic](/atak-meshtastic).
