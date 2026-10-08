---
description: "Set up OpenMeshTak roles and groups so callsigns, TAK teams and radio names follow from each participant's place in the event."
---

# Roles and groups

Roles and groups turn a member list into callsigns, TAK teams and radio names. What they mean is explained in [How an event works](/events/#roles-and-groups); this page shows how to set them up.

## Groups

A group usually is a team, for example `Bravo`. It defines:

- the **callsign format**, built from `{username}` and optionally `{group}`, for example `{username} [{group}]`;
- the **TAK team color** and the default TAK role;
- optional **TAK group names** used on the TAK server; and
- the **Meshtastic short-name prefix**, for example `B`, so the radios become `B1`, `B2` and so on. TAK-only events do not need it.

## Roles

A role describes what a member does, for example `Participant` or `Squad Leader`. Radio channels can be given to a role, so only squad leaders receive the leaders' channel and its key. A role can also override the group's default TAK role, so a squad leader shows up as `Team Lead` in ATAK while the rest of the team keeps the default.

## Check the result

Open a member to see their profile with the final callsign, TAK identity and radio name. Fix conflicts, such as two members with the same callsign, before you activate the event.

Use stable slugs for roles and groups. [Integrations](/api/examples/groups-roles) refer to them by slug.
