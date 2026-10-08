---
description: "How an OpenMeshTak event works: users and members, roles and groups, TAK callsigns and teams, Meshtastic channels and map data."
---

# How an event works

Everything in OpenMeshTak belongs to an event, such as an exercise or a game weekend. You describe the event once: who takes part, in which role and team, which radio channels and which map data. OpenMeshTak then creates the setup for every participant's devices.

## Users and members

A **user** is a person's account on the installation: their sign-in, passkeys and user groups.

An **event member** is a user taking part in one event, with that event's role, group and callsign. One user can be a member of several events, with a different role, group and callsign in each. Removing someone from an event ends only that membership; the user stays. In these docs, **member** always means event member.

Users come in two kinds:

| Kind | Typical for | Exists |
| --- | --- | --- |
| **Permanent user** | Organizers and people who take part regularly | until you delete it |
| **Event account** | Someone who only needs an account for one event, for example a one-time guest | until the event is archived, unless you make it permanent |

Both kinds take part in events the same way, as event members.

Event members are not the same as members of a **user group**. User groups decide what a user may administer. Event membership decides how a user takes part in an event.

## Roles and groups

Every member has exactly one event role and one event group:

| | What it decides | Example |
| --- | --- | --- |
| **Event group** | Callsign pattern, TAK team color, default TAK role and Meshtastic short name | `Bravo`, radios `B1`, `B2` |
| **Event role** | The member's function: which channels they receive and, optionally, a different TAK role | `Participant`, `Squad Leader` |

The group sets most of the profile. The role adds to it, for example a leaders' channel that only `Squad Leader` receives.

Roles and groups describe the event, not access rights. Who may administer what is decided by **user groups** in the Web app's settings.

## The participant's profile

From the role, group and event settings, OpenMeshTak works out each member's **profile**: callsign, TAK team and role, the configuration revision it came from and, in Meshtastic events, their radio names and the channels they may use. Every file a participant downloads is built from this profile, so every device runs the same base configuration.

## Draft, active, archived

| State | What happens |
| --- | --- |
| **Draft** | You prepare the event. Participants see nothing yet. |
| **Active** | Participants see their setup, download files and connect to TAK. |
| **Archived** | The event is read-only. Event accounts are removed. |

Start and end dates describe the schedule but do not change the state on their own.

## Configuration revisions

Activating an event publishes its configuration as revision 1. Later changes to channels or radio settings become a new revision when you publish them. Files that participants already downloaded keep the revision they were made from.
