---
description: "Set up OpenMeshTak roles and groups so callsigns, TAK teams and radio names follow from each participant's place in the event."
---

# Roles and groups

Roles and groups turn a member list into callsigns, TAK teams and radio names. What they mean is explained in [How an event works](/events/#roles-and-groups); this page shows how to set them up.

## Groups

A group usually is a team, for example `Bravo`. It defines:

- the **callsign format**, built from `{username}` and optionally `{group}`, for example `{username} [{group}]`;
- the **TAK team color** and the default TAK role;
- optional **TAK server group names**, passed on for an external TAK server; the built-in TAK server ignores them; and
- the **Meshtastic short-name prefix**, for example `B`, so the radios become `B1`, `B2` and so on. TAK-only events do not need it.

## Roles

A role describes what a member does, for example `Participant` or `Squad Leader`. Radio channels can be given to a role, so only squad leaders receive the leaders' channel and its key. A role can also override the group's default TAK role, so a squad leader shows up as `Team Lead` in ATAK while the rest of the team keeps the default. A role marked **Sees all TAK groups**, for example platoon leaders, sees and reaches everyone whatever the [TAK group mode](#tak-group-mode).

## TAK group mode

By default every TAK app sees everyone in the event. In the event's **TAK** tab, **Who sees whom** changes that:

| Mode | Who sees whom |
| --- | --- |
| **Everyone sees the whole event** | All participants see each other. Fine for small events. |
| **Members see only their own group** | Each member sees only their own group, plus everyone whose role sees all TAK groups. Leaders see and reach all groups. |
| **TAK groups with receive and send per member** | You create free TAK groups and decide per member which groups they receive from and send to, for example a medic who receives Alpha and Bravo but sends only to Medics. With **Show groups in TAK apps**, ATAK lists the member's groups and lets them switch single groups off on the device. |

Direct messages and items sent to one person always arrive, also across groups. The mode applies within seconds, without publishing. Teams that must not know about each other at all, such as red and blue, belong in separate events.

Separating groups also saves bandwidth in large events; see [Server size and bandwidth](/installation/server-size#large-events).

## Check the result

Open a member to see their profile with the final callsign, TAK identity and radio name. Fix conflicts, such as two members with the same callsign, before you activate the event.

Use stable slugs for roles and groups. [Integrations](/api/examples/groups-roles) refer to them by slug.
