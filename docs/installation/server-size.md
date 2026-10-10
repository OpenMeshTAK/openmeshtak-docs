---
description: "How big the OpenMeshTak server and its internet connection need to be for 100, 200 or 500 TAK apps."
---

# Server size and bandwidth

OpenMeshTak needs little computing power. What grows with an event is **bandwidth**: every position a TAK app sends is forwarded to every other app that may see it.

## Server

Measured with up to 500 simulated TAK apps sending their position every five seconds:

| Connected apps | CPU of OpenMeshTak | Memory |
| ---: | --- | --- |
| 100 | about 3 % of one core | about 300 MB |
| 500 | under 10 % of one core | up to about 1.7 GB |

A small server with **2 CPU cores and 2 GB RAM** is enough for events up to a few hundred participants; give it **4 GB** for 500. The memory grows mostly while slow apps fall behind (see [below](#when-an-app-cannot-keep-up)). Disk space matters only for recorded traffic and uploaded map data.

## Bandwidth

A position report is about half a kilobyte. Each app receives the positions of everyone it may see, so the server's upload grows with the **square** of the people who see each other:

| People who see each other | Server upload | Download per phone |
| ---: | ---: | ---: |
| 50 | about 2 Mbit/s | about 5 KB/s |
| 100 | about 8 Mbit/s | about 10 KB/s |
| 200 | about 32 Mbit/s | about 20 KB/s |
| 500 | about 200 Mbit/s | about 50 KB/s (180 MB per hour) |

Values for positions every five seconds; markers and chat add little. Phones on mobile data feel the right column first.

## Large events

Do not let everyone see everyone. With the [TAK group mode](/events/roles-groups#tak-group-mode), each participant only receives their own group, while leaders still see all groups. Four groups of 125 people need about a quarter of the bandwidth of one group of 500.

## When an app cannot keep up

An app on a weak connection may not read its data fast enough. OpenMeshTak then holds back up to 2 MB for it and disconnects it when that is full, so one slow phone never slows down the others. The app reconnects by itself. Many such disconnects at once mean the server's upload or the participants' network is too small; see [System status and logs](/installation/monitoring#warnings).
