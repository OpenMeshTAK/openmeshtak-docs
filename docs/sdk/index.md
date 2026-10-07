# SDK reference

`@openmeshtak/sdk` is the official TypeScript and JavaScript client for the OpenMeshTak REST API.

::: warning Release status
SDK `0.1.0` is prepared for OpenMeshTak API `>=0.1.9 <0.2.0`, but the package has not been published to npm yet. Use the [REST API](/api/) until the first SDK release is available.
:::

## Installation

After the first release:

```sh
pnpm add @openmeshtak/sdk
```

Node.js 20 or newer is required.

## Create a client

```ts
import { createOpenMeshTakClient } from "@openmeshtak/sdk";

const client = createOpenMeshTakClient({
  baseUrl: "https://tak.example.org",
  apiKey: () => process.env.OPENMESHTAK_API_KEY ?? "",
});
```

An origin automatically receives `/api/v1`. A complete API base URL is also accepted. Production integrations should use HTTPS.

The API key may be a string or a function that returns the current key. Keep it in the server environment; never put it in browser storage, a URL, logs, or source control.

When `apiKey` is omitted, browser requests use same-origin cookies by default.

## Client options

| Option | Type | Description |
| --- | --- | --- |
| `baseUrl` | `string` | Server origin or complete `/api/v1` base URL. |
| `apiKey` | `string \| () => string \| Promise<string>` | API-client credential evaluated before each request. |
| `credentials` | `RequestCredentials` | Browser cookie mode. Default: `same-origin`. |
| `fetch` | `typeof fetch` | Custom Fetch implementation for runtimes or tests. |

## Convenience methods

| Method | Result |
| --- | --- |
| `listEvents(options?)` | `Promise<EventPage>` |
| `createEvent(body)` | `Promise<Event>` |
| `getEvent(eventId)` | `Promise<Event>` |
| `createEventGroup(eventId, body)` | `Promise<EventGroup>` |
| `upsertExternalMember(eventId, provider, externalId, body)` | `Promise<ExternalMemberSyncResult>` |
| `getMemberProfile(eventId, memberId)` | `Promise<ResolvedProfile>` |

Example:

```ts
const event = await client.createEvent({
  name: "LightSim 2027",
  slug: "lightsim-2027",
  timeZone: "Europe/Berlin",
});

console.log(event.id);
```

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

For the prepared first release these values are `0.1.9`, `0.1.0`, and `>=0.1.9 <0.2.0` respectively.
