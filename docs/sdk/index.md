# SDK reference

`@openmeshtak/sdk` is the official TypeScript and JavaScript client for the OpenMeshTak REST API.

::: warning Release status
SDK <code>{{ $versions.sdk }}</code> is prepared for OpenMeshTak API <code>{{ $versions.sdkApiRange }}</code>, but the package has not been published to npm yet. Use the [REST API](/api/) until the first SDK release is available.
:::

## Installation

After the first release:

```sh
pnpm add @openmeshtak/sdk
```

Node.js 24 or newer is required.

## Create a client

```ts
import { createOpenMeshTakClient } from "@openmeshtak/sdk";

const client = createOpenMeshTakClient({
  baseUrl: "https://tak.example.org",
  apiKey: () => process.env.OPENMESHTAK_API_KEY ?? "",
});
```

An origin automatically receives `/api/v1`. A complete API base URL is also accepted. Production integrations should use HTTPS.

The API key may be a string or a function that returns the current key. If it returns nothing, the request is not sent and the call throws a `TypeError`. Keep it in the server environment; never put it in browser storage, a URL, logs, or source control.

When `apiKey` is omitted, browser requests use same-origin cookies by default.

## Client options

| Option | Type | Description |
| --- | --- | --- |
| `baseUrl` | `string` | Server origin or complete `/api/v1` base URL. |
| `apiKey` | `string \| () => string \| Promise<string>` | API-client credential evaluated before each request. |
| `credentials` | `RequestInit["credentials"]` | Browser cookie mode. Default: `same-origin`. |
| `fetch` | `typeof fetch` | Custom Fetch implementation for runtimes or tests. |

## Convenience methods

Each method calls one API operation and returns its JSON result. Methods that delete something resolve to `undefined`. A failed call throws [`OpenMeshTakApiError`](#errors).

### Caller

| Method | Result |
| --- | --- |
| `getPrincipal()` | `Promise<Principal>` |

`getPrincipal` returns the user or API client behind the configured credentials. It is a quick way to check that an API key works.

### Events

| Method | Result |
| --- | --- |
| `listEvents(options?)` | `Promise<EventPage>` |
| `createEvent(body)` | `Promise<Event>` |
| `getEvent(eventId)` | `Promise<Event>` |
| `updateEvent(eventId, body)` | `Promise<Event>` |
| `activateEvent(eventId, { version })` | `Promise<Event>` |
| `archiveEvent(eventId, { version })` | `Promise<Event>` |
| `reactivateEvent(eventId, { version })` | `Promise<Event>` |

Updates and lifecycle changes need the `version` you last read. If someone changed the event in between, the call fails with status `409`.

### Roles and groups

| Method | Result |
| --- | --- |
| `listEventRoles(eventId, options?)` | `Promise<EventRolePage>` |
| `createEventRole(eventId, body)` | `Promise<EventRole>` |
| `getEventRole(eventId, roleId)` | `Promise<EventRole>` |
| `updateEventRole(eventId, roleId, body)` | `Promise<EventRole>` |
| `deleteEventRole(eventId, roleId)` | `Promise<void>` |
| `listEventGroups(eventId, options?)` | `Promise<EventGroupPage>` |
| `createEventGroup(eventId, body)` | `Promise<EventGroup>` |
| `getEventGroup(eventId, groupId)` | `Promise<EventGroup>` |
| `updateEventGroup(eventId, groupId, body)` | `Promise<EventGroup>` |
| `deleteEventGroup(eventId, groupId)` | `Promise<void>` |

### Members

| Method | Result |
| --- | --- |
| `listEventMembers(eventId, options?)` | `Promise<EventMemberPage>` |
| `createEventMember(eventId, body)` | `Promise<EventMember>` |
| `createEventMemberAccount(eventId, body)` | `Promise<CreatedEventMemberAccount>` |
| `getEventMember(eventId, memberId)` | `Promise<EventMember>` |
| `updateEventMember(eventId, memberId, body)` | `Promise<EventMember>` |
| `deleteEventMember(eventId, memberId)` | `Promise<void>` |
| `upsertExternalMember(eventId, provider, externalId, body)` | `Promise<ExternalMemberSyncResult>` |
| `getMemberProfile(eventId, memberId)` | `Promise<ResolvedProfile>` |

`createEventMember` adds an existing OpenMeshTak user. `upsertExternalMember` creates or updates a member from another system, such as Discord, and is safe to repeat. See [Sync members](/api/examples/sync-members).

### Sync issues

| Method | Result |
| --- | --- |
| `listSyncIssues(eventId, options?)` | `Promise<SyncIssuePage>` |
| `retrySyncIssue(eventId, syncIssueId, body?)` | `Promise<ExternalMemberSyncResult>` |

`listSyncIssues` accepts `status: "open"` or `"resolved"` besides the page options. `retrySyncIssue` can take a `callsignOverride` to resolve a callsign conflict.

### Participant claims

| Method | Result |
| --- | --- |
| `listMemberClaims(eventId, memberId)` | `Promise<MemberClaim[]>` |
| `createMemberClaim(eventId, memberId)` | `Promise<CreatedMemberClaim>` |
| `revokeMemberClaim(eventId, memberId, claimId)` | `Promise<MemberClaim>` |

See [Participant claims](/api/examples/participant-claims) for the whole flow.

::: warning Single-use links
`createMemberClaim` and `createEventMemberAccount` return a link that signs a person in. You receive it only once. Send it only to that person, for example in a direct message, and never log it.
:::

### Configuration

| Method | Result |
| --- | --- |
| `listConfigurationRevisions(eventId, options?)` | `Promise<ConfigurationRevisionPage>` |
| `publishConfiguration(eventId)` | `Promise<PublishConfigurationResult>` |
| `getConfigurationRevision(eventId, revisionId)` | `Promise<ConfigurationRevision>` |

`publishConfiguration` returns `created: false` and the latest revision when nothing changed.

### Example

```ts
const event = await client.createEvent({
  name: "LightSim 2027",
  slug: "lightsim-2027",
  timeZone: "Europe/Berlin",
});

console.log(event.id);
```

All request and result types are exported by name, for example `import type { EventMember } from "@openmeshtak/sdk"`.

## Pages

List methods return one page of up to `limit` items (1 to 100) and accept a `cursor` for the next one. `paginate` fetches the pages one after another and yields every item:

```ts
import { paginate } from "@openmeshtak/sdk";

for await (const member of paginate((page) => client.listEventMembers(eventId, { limit: 100, ...page }))) {
  console.log(member.id);
}
```

The next page is fetched only when the loop needs it, so `break` stops further requests. Treat cursors as opaque values; do not build or change them.

## Other operations

Operations without a convenience method, such as data packages or Meshtastic channels, are described by the [generated API types](#generated-api-types) and the [API reference](/api/reference).

## Errors

Failed API responses throw `OpenMeshTakApiError`:

```ts
import { OpenMeshTakApiError } from "@openmeshtak/sdk";

try {
  await client.getEvent("event-id");
} catch (error) {
  if (error instanceof OpenMeshTakApiError) {
    console.error(error.status, error.code, error.traceId);
  }
}
```

Available fields are `status`, `problem`, `type`, `code`, and `traceId`.

## Generated API types

The complete generated contract is available separately:

```ts
import type { components, operations, paths } from "@openmeshtak/sdk/generated";

type Event = components["schemas"]["EventDto"];
type CreateEvent = operations["CreateEvent"];
type EventsPath = paths["/events"];
```

The [complete API reference](/api/reference) remains the canonical list of operations and schemas.

## Version information

```ts
import {
  OPENAPI_SOURCE_VERSION,
  SDK_VERSION,
  SUPPORTED_API_VERSION_RANGE,
} from "@openmeshtak/sdk";
```

For the prepared first release these values are <code>{{ $versions.sdkOpenapiSource }}</code>, <code>{{ $versions.sdk }}</code>, and <code>{{ $versions.sdkApiRange }}</code> respectively.
