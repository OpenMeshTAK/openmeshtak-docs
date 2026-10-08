---
description: "Let participants join an OpenMeshTak event from a Discord command, using the REST API instead of manual member lists."
---

# Use the API from Discord

Many groups organize their events on Discord. This example shows how a Discord command could use the OpenMeshTak API, so that people join an event themselves instead of an organizer adding each one by hand. It is about the API calls, not about building a Discord bot; any bot framework works.

## The idea

A participant types `/join` in your Discord server. Your bot then:

1. reads the person's Discord user ID and Discord roles;
2. picks the matching OpenMeshTak role and group;
3. adds the person to the event with one API call; and
4. replies with the callsign, or with what went wrong.

<div class="flow">
  <div class="flow-step"><strong>Participant</strong><span>types <code>/join</code> in Discord</span></div>
  <div class="flow-arrow" aria-hidden="true">→</div>
  <div class="flow-step"><strong>Your bot</strong><span>maps the Discord roles to a role and group</span></div>
  <div class="flow-arrow" aria-hidden="true">→</div>
  <div class="flow-step"><strong>OpenMeshTak</strong><span><code>PUT</code> external member returns the member or a sync issue</span></div>
  <div class="flow-arrow" aria-hidden="true">→</div>
  <div class="flow-step"><strong>Your bot</strong><span>replies “You joined Bravo”</span></div>
</div>

This does not create a login. The person becomes an event member identified by their Discord ID, nothing more. It is not "Sign in with Discord".

## What the bot needs

- An [API client](/api/#get-an-api-key) limited to this one event, with the permission `members.sync`.
- The event's ID, and the slugs of the roles and groups you map to.
- A table from Discord roles to OpenMeshTak slugs, kept in the bot's own configuration:

| Discord role | OpenMeshTak role | OpenMeshTak group |
| --- | --- | --- |
| `Team Bravo` | `participant` | `bravo` |
| `Team Bravo Lead` | `team-lead` | `bravo` |
| `Medics` | `medic` | `medic` |

OpenMeshTak never sees the Discord roles. The bot decides; the API only receives the result.

## The call

The bot sends one request per `/join`, the [external member sync](/api/examples/sync-members):

::: code-group

```http [HTTP]
PUT /api/v1/events/{eventId}/external-members/discord/{discordUserId}
Authorization: Bearer <API key>
Content-Type: application/json

{ "username": "peter", "eventRole": "participant", "group": "bravo" }
```

```ts [SDK]
const result = await client.upsertExternalMember(eventId, "discord", discordUserId, {
  username: "peter",
  eventRole: "participant",
  group: "bravo",
});
```

:::

It is safe to repeat. Running `/join` again after a role change updates the same member instead of creating a second one.

## The reply

The response has one of two shapes:

| `outcome` | Meaning | What the bot could reply |
| --- | --- | --- |
| `member` | The person is a member. `change` says `created`, `updated` or `unchanged`; `member` holds the callsign. | "You joined Bravo as Peter." |
| `sync-issue` | Something needs an organizer, for example a callsign conflict or an unknown group. The membership stays unchanged. | "An organizer needs to check your entry." |

Organizers see open sync issues in the event's members view and can resolve them there.

## Going further

- **Web access:** a Discord member has no password. With the extra permission `member-claims.create`, the bot can create an [access link](/api/examples/participant-claims) and send it to the person in a direct message, never in a channel.
- **Show the setup:** read the person's [profile](/api/examples/resolved-profiles) to reply with their radio name and channels.
