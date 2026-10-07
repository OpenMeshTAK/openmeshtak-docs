# Core concepts

## Installation

One OpenMeshTak installation represents one organization. Core serves the Web app and API and also runs the built-in TAK services.

## Users and event members

A user is a global account. An event member assigns that user to one event role and one event group. A person can have different roles, groups, and callsigns in different events.

## Three kinds of groups

| Type | What it does |
| --- | --- |
| User group | Grants application permissions. |
| Event role | Describes the participant's function and optional TAK role. |
| Event group | Defines callsign, TAK team, and Meshtastic short-name rules. |

Event roles and event groups do not grant administrator permissions.

## Event lifecycle

Events move through `draft → active → archived`.

- **Draft:** editable and visible to administrators.
- **Active:** visible to participants and able to generate provisioning files.
- **Archived:** read-only and no longer available for normal participant use.

## Resolved profile

Each participant receives a resolved profile containing their callsign, TAK team and role, Meshtastic name, channels, and configuration revision. All generated files use this profile.

## Data Packages

Data Packages contain mission objects and files. Editors work on a draft and publish immutable revisions. Only published revisions reach participants.
