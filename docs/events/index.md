# How an event works

Everything in OpenMeshTak belongs to an event, such as an exercise or a game weekend. You describe the event once: who takes part, in which role and team, which radio channels and which map data. OpenMeshTak then creates the setup for every participant's devices.

## Users and members

A **user** is an account on the installation. A **member** is a user taking part in one event. The same person can have a different role, group and callsign in each event.

Some people only need an account for one event. Such **event accounts** are removed when the event is archived, unless you make them permanent.

## Roles and groups

Every member has exactly one event role and one event group:

| | What it decides | Example |
| --- | --- | --- |
| **Event role** | The member's function and TAK role | `Medic`, `Team Lead` |
| **Event group** | Callsign pattern, TAK team color and Meshtastic short name | `Bravo`, radios `B1`, `B2` |

Roles and groups describe the event, not access rights. Who may administer what is decided by **user groups** in the Web app's settings.

## The participant's profile

From the role, group and event settings, OpenMeshTak works out each member's **profile**: callsign, TAK team and role, Meshtastic names, the channels they may use and the configuration revision it came from. Every file a participant downloads is built from this profile, so all devices agree.

## Draft, active, archived

| State | What happens |
| --- | --- |
| **Draft** | You prepare the event. Participants see nothing yet. |
| **Active** | Participants see their setup, download files and connect to TAK. |
| **Archived** | The event is read-only. Event accounts are removed. |

Start and end dates describe the schedule but do not change the state on their own.

## Configuration revisions

Activating an event publishes its configuration as revision 1. Later changes to channels or radio settings become a new revision when you publish them. Files that participants already downloaded keep the revision they were made from.
