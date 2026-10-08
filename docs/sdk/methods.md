---
description: "Every method of the OpenMeshTak TypeScript SDK client, grouped by task."
---

# SDK methods

Every method of the SDK client, grouped by task. Each one sends a single request; the API client needs the same permission as the request in the [API reference](/api/reference). Updates take the `version` you last read, as explained in [Changing data safely](/api/#changing-data-safely).

## Check the connection

| Method | What it does |
| --- | --- |
| `getPrincipal()` | Returns the API client or user behind the credentials. |

## Events

| Method | What it does |
| --- | --- |
| `listEvents({ status?, limit?, cursor? })` | Lists events, optionally only `draft`, `active` or `archived` ones. |
| `createEvent(body)` | Creates an event in draft state. |
| `getEvent(eventId)` | Reads one event. |
| `updateEvent(eventId, body)` | Changes name, dates and other settings. |
| `activateEvent(eventId, { version })` | Makes a draft event active for participants. |
| `archiveEvent(eventId, { version })` | Makes the event read-only and removes event accounts. |
| `reactivateEvent(eventId, { version })` | Makes an archived event active again. |

## Roles and groups

| Method | What it does |
| --- | --- |
| `listEventRoles(eventId, { limit?, cursor? })` | Lists the event's roles. |
| `createEventRole(eventId, body)` | Creates a role with `name`, `slug` and an optional TAK role override. |
| `getEventRole(eventId, roleId)` | Reads one role. |
| `updateEventRole(eventId, roleId, body)` | Changes a role. |
| `deleteEventRole(eventId, roleId)` | Deletes a role. |
| `listEventGroups(eventId, { limit?, cursor? })` | Lists the event's groups. |
| `createEventGroup(eventId, body)` | Creates a group with callsign format, TAK team and short-name prefix. |
| `getEventGroup(eventId, groupId)` | Reads one group. |
| `updateEventGroup(eventId, groupId, body)` | Changes a group. |
| `deleteEventGroup(eventId, groupId)` | Deletes a group. |

## Members

| Method | What it does |
| --- | --- |
| `listEventMembers(eventId, { limit?, cursor? })` | Lists the event's members. |
| `createEventMember(eventId, body)` | Adds an existing user with a role and group. |
| `createEventMemberAccount(eventId, body)` | Creates a new person and returns their one-time `setupLink`. |
| `getEventMember(eventId, memberId)` | Reads one member. |
| `updateEventMember(eventId, memberId, body)` | Changes role, group or callsign override. |
| `deleteEventMember(eventId, memberId)` | Removes a member from the event. |
| `getMemberProfile(eventId, memberId)` | Reads the member's [profile](/events/#the-participant-s-profile). |

## Members from other systems

| Method | What it does |
| --- | --- |
| `upsertExternalMember(eventId, provider, externalId, body)` | Creates or updates the member that another system, such as Discord, knows by `externalId`. Safe to repeat. |
| `listSyncIssues(eventId, { status?, limit?, cursor? })` | Lists entries that need an organizer, optionally only `open` or `resolved` ones. |
| `retrySyncIssue(eventId, syncIssueId, { callsignOverride? })` | Tries an entry again, for example with a different callsign. |

`upsertExternalMember` returns `outcome: "member"` or `outcome: "sync-issue"`, as in [Synchronize external members](/api/examples/sync-members).

## Access links

| Method | What it does |
| --- | --- |
| `createMemberClaim(eventId, memberId)` | Creates a one-time [access link](/api/examples/participant-claims) as `claimUrl`. Earlier unused links of that member stop working. |
| `listMemberClaims(eventId, memberId)` | Lists the member's access links without their secret part. |
| `revokeMemberClaim(eventId, memberId, claimId)` | Cancels an access link. |

`createMemberClaim` and `createEventMemberAccount` return a link that signs a person in. It is returned only once; send it only to that person.

## Configuration revisions

| Method | What it does |
| --- | --- |
| `publishConfiguration(eventId)` | Publishes the event's current configuration. Returns `created: false` if nothing changed. |
| `listConfigurationRevisions(eventId, { limit?, cursor? })` | Lists the published revisions. |
| `getConfigurationRevision(eventId, revisionId)` | Reads one revision. |
