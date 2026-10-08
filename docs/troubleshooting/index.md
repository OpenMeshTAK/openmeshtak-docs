---
description: "Find common OpenMeshTak installation, TAK and Meshtastic problems by symptom and jump to the fix."
---

# Troubleshooting

Find the symptom, then follow the link to the page that explains the fix.

## Installation

| Symptom | Where to look |
| --- | --- |
| Core does not start | Run `docker compose logs core`. A port in use: [TAK ports](/installation/tak-ports#find-a-port-conflict). A missing or doubled root key: [Install](/installation/#the-root-key). |
| The Web app is not reachable | [Reverse proxy](/installation/reverse-proxy#check) |
| Live server log only updates slowly | The proxy does not pass WebSocket upgrades: [Reverse proxy](/installation/reverse-proxy#check) |
| Password reset emails do not arrive | Email settings and test email: [Configure the installation](/installation/settings#general) |

## TAK apps

| Symptom | Where to look |
| --- | --- |
| No QR code on the dashboard | The TAK server needs a publicly trusted certificate: [Server certificate](/installation/settings#server-certificate) |
| Enrollment fails | Port `8446` must be reachable: [TAK ports](/installation/tak-ports#troubleshooting) |
| ATAK connects, but no Data Packages | [TAK ports](/installation/tak-ports#troubleshooting) |
| iTAK cannot list Data Packages | [TAK ports](/installation/tak-ports#different-data-package-port) |
| Apps stopped connecting after a settings change | Devices keep the old address and ports: [Changing ports later](/installation/tak-ports#changing-ports-later) |

## Participants

| Symptom | Where to look |
| --- | --- |
| A setup or access link does not work | Links work once and expire. Create a new one: [Add members](/events/setup#_4-add-members) |
| The dashboard says "No active event" | The person is not a member yet, or the event is still a draft: [Set up an event](/events/setup) |
| A participant has no Meshtastic file | The event's Meshtastic configuration is not published yet: [Meshtastic](/events/meshtastic) |

## API

Every error response contains a `traceId`. Look it up under **Settings → Server log**. Status codes are explained in [API basics](/api/#errors).
