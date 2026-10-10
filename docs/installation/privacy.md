---
description: "Which personal data OpenMeshTak stores, for how long, and what you control as the operator."
---

# Data and privacy

You run OpenMeshTak, so you decide what happens with the data of your participants. This page lists what is stored, so you can describe it in your own privacy notice.

## What is stored

| Data | Stored | How long |
| --- | --- | --- |
| Accounts | name, username, optional email address, password hash or passkeys | until the account is deleted; event accounts until the event is archived |
| Event membership | role, group, callsign and the participant's setup files | as long as the member belongs to the event |
| TAK apps | each app's certificate and the device it reported, for example *iPhone 17 · iTAK* | until the certificate expires or is revoked |
| Live positions | only in memory, never on disk | until the item goes stale; gone after a restart |
| Recorded traffic | positions and markers, only if the event records them | the event's retention period (30 days by default), at most until the event is deleted |
| Audit log | who did what, for example who viewed or exported recorded traffic | kept for review by administrators |
| Server log | technical messages without passwords, keys or tokens; warnings and errors | the last seven days are shown under System status |

Channel keys, certificate keys and other secrets are stored encrypted with the root key from `.env`. Direct messages between TAK apps are forwarded but never stored or shown to anyone else.

## Recording positions

Recording is **off** by default, because positions are personal data. Switch it on per event in the event's **Settings** tab and choose how many days to keep the data. Recorded positions are deleted automatically after that time; people with the permission can delete them earlier, for one track or the whole event. Viewing, exporting and deleting recorded traffic are all audited. See [Live view and history](/events/live-history).

## Outside the server

- **Map tiles**: browsers load online base maps directly from the map provider you configured, who sees the viewer's IP address.
- **Email**: account emails go through the SMTP server you configured.
- **Offline HQ**: map data stored for offline use stays in that browser until it is removed there; revoking someone's access does not delete it. See [Offline HQ](/events/offline-hq).
- **TAK apps and radios** keep their own copy of what they received, outside your control.
