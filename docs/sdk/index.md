---
description: "Install and use @openmeshtak/sdk, the official TypeScript and JavaScript client for the OpenMeshTak REST API."
---

# SDK basics

`@openmeshtak/sdk` is the official TypeScript and JavaScript client for the OpenMeshTak API. It sends the same requests as the `curl` examples, but with typed methods and results, so your editor completes field names and catches mistakes. Everything in [API basics](/api/) still applies: API clients, permissions, versions and errors work the same way.

## Install

```sh
pnpm add @openmeshtak/sdk
```

The SDK needs Node.js 24 or newer. Its version always matches OpenMeshTak: use SDK {{ $coreVersion }} with OpenMeshTak {{ $coreVersion }}. It also works with the later patch releases of the same version line, so a Core update from 0.2.0 to 0.2.1 does not break it.

## Create a client

```ts
import { createOpenMeshTakClient } from "@openmeshtak/sdk";

const client = createOpenMeshTakClient({
  baseUrl: "https://tak.example.org",
  apiKey: () => process.env.OMTK_API_KEY ?? "",
});

const me = await client.getPrincipal();
```

`getPrincipal()` returns the API client behind the key, a quick way to check that the key works.

| Option | What it does |
| --- | --- |
| `baseUrl` | Your installation, for example `https://tak.example.org`. `/api/v1` is added for you. |
| `apiKey` | The API key, or a function that returns it. A function is called before every request, so a rotated key is picked up without a restart. |
| `credentials` | Only for browser code on the installation's own site: without `apiKey`, requests use the signed-in user's session. Default `same-origin`. |
| `fetch` | Your own `fetch`, for example in tests. |

If the key is missing or does not look like an OpenMeshTak key, the call throws before anything is sent.

## Methods

Every method sends one request and returns its result. Methods that delete something return nothing. [SDK methods](/sdk/methods) lists them all. The [API examples](/api/examples/) show the SDK version of each task next to `curl`.

Request and result types are exported by name:

```ts
import type { CreateEventRequest, EventMember } from "@openmeshtak/sdk";
```

## Errors

A failed request throws `OpenMeshTakApiError`. Its fields match the [API error](/api/#errors): `status`, `code`, `type`, `traceId` and the full `problem`.

```ts
import { OpenMeshTakApiError } from "@openmeshtak/sdk";

try {
  await client.getEvent(eventId);
} catch (error) {
  if (error instanceof OpenMeshTakApiError && error.status === 404) {
    // The event does not exist, or the API client may not see it.
  } else {
    throw error;
  }
}
```

## Long lists

List methods return one page of up to `limit` items (1 to 100). `paginate` walks through all pages for you:

```ts
import { paginate } from "@openmeshtak/sdk";

for await (const member of paginate((page) => client.listEventMembers(eventId, { limit: 100, ...page }))) {
  console.log(member.callsign);
}
```

The next page is loaded only when the loop needs it, so `break` stops further requests.

## Everything else

The SDK has methods for events, roles, groups, members, access links and configuration revisions. For other operations, such as Data Packages or Meshtastic channels, call the API directly. The full generated contract is available as types:

```ts
import type { components, paths } from "@openmeshtak/sdk/generated";

type DataPackage = components["schemas"]["DataPackageDto"];
```

`SDK_VERSION`, `SUPPORTED_API_VERSION_RANGE` and `OPENAPI_SOURCE_VERSION` tell your program at runtime which versions it was built for.
