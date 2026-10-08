---
description: "OpenMeshTak REST API basics: API clients and keys, the first request, errors, pagination and safe updates."
---

# API basics

Everything the Web app does goes through the same REST API, so other programs can do it too: a Discord integration that adds members, a script that creates events, a portal that hands out radio files. This page covers what every API call has in common. The [examples](/api/examples/) show common tasks, and the [reference](/api/reference) lists every operation.

## Get an API key

Programs sign in with an **API client**, not with a person's account.

1. Open **Settings → API clients** and create a client.
2. Give it only the permissions it needs, and limit it to the events it works on.
3. Create a key and copy it immediately. It is shown only once.

The key looks like `omtk_ak_<id>_<secret>`. Core checks the client's permissions on every request, so changing or revoking them takes effect at once.

**Keep the key secret.** Store it only in the program's server-side environment, never in source code, URLs, logs, chat messages or browser code. The same applies to every one-time value the API returns, such as setup links and access links.

To replace a key, create a new one, switch the program to it, then revoke the old one.

## First request

```sh
export OMTK_ORIGIN="https://tak.example.org"
export OMTK_API_KEY="omtk_ak_replace_me"

curl --fail-with-body --silent --show-error \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  "$OMTK_ORIGIN/api/v1/principal"
```

The response describes the API client the key belongs to. All examples use these two variables.

## Requests and responses

- The base URL is `https://<your host>/api/v1`.
- Bodies are JSON with `camelCase` names. IDs are UUIDs; slugs are lowercase with hyphens.
- Times are RFC 3339 with an offset, for example `2027-05-01T08:00:00Z`. Event time zones use IANA names such as `Europe/Berlin`.
- Long lists are paged. Pass `page.nextCursor` from the previous response to get the next page.

## Changing data safely

Resources that can change carry a `version` number. Send back the version you read; if someone else changed the resource in between, you get `409 Conflict` and can read it again.

`GET`, `PUT` and `DELETE` are safe to repeat. For `POST` requests that support it, send an `Idempotency-Key` header with a unique value, so a retried request does not create a duplicate.

## Errors

Errors are JSON with the type `application/problem+json`:

```json
{
  "type": "urn:openmeshtak:problem:validation-failed",
  "title": "Request validation failed",
  "status": 422,
  "code": "VALIDATION_FAILED",
  "traceId": "01JQ0Y8K3V6W2R4T7P9X1Z5ABC",
  "errors": [{ "field": "name", "code": "REQUIRED", "message": "Name is required." }]
}
```

| Status | Meaning |
| ---: | --- |
| `401` | No key, or the key is wrong, expired or revoked. |
| `403` | The client lacks the permission or the event. |
| `404` | Not found, or outside what the client may see. |
| `409` | Someone changed the resource first, or it is in the wrong state. |
| `422` | A field is missing or invalid. |
| `429` | Too many requests; wait and retry. |

Let your program react to `status` or `code`, not to the message text. When asking for help, quote the `traceId`; administrators find the matching entry under **Settings → Server log**.

## Try it on your installation

To send real requests from the browser, use the API console that comes with your installation:

1. Set `SWAGGER_ENABLED=true` in `.env` and run `docker compose up -d`.
2. Open `https://tak.example.org/api/docs`.
3. Either sign in to the Web app in the same browser first, so requests run as you, or choose **Authorize** and enter an API key, so they run as that API client.

Every request changes real data on your installation. Turn the console off again with `SWAGGER_ENABLED=false` when you no longer need it.

## Reference

The [API reference](/api/reference) shows every operation of OpenMeshTak {{ $coreVersion }}. It only displays the API and sends no requests; to try requests, see [above](#try-it-on-your-installation). You can also <a :href="$openapiUrl" download>download the OpenAPI document</a> for code generators.

For TypeScript and JavaScript, the [SDK](/sdk/) wraps these calls.
