# API conventions and errors

## Data format

- JSON with UTF-8
- `camelCase` property names
- UUID resource IDs
- lowercase hyphenated slugs
- RFC 3339 timestamps with an offset
- IANA event time zones such as `Europe/Berlin`

List endpoints return arrays and use cursor pagination where documented. Cursors are opaque; follow `page.nextCursor` instead of constructing one.

## Optimistic concurrency

Mutable resources include an integer `version`. Send the version you last read when updating the resource. A stale version returns `409 Conflict`.

## Idempotency

`GET`, `PUT`, and `DELETE` are idempotent. External-member synchronization is an idempotent `PUT` keyed by provider and external ID.

Use `Idempotency-Key` on operations that document it. Reusing the key with different request data returns `409`.

## Errors

Errors use `application/problem+json`:

```json
{
  "type": "urn:openmeshtak:problem:validation-failed",
  "title": "Request validation failed",
  "status": 422,
  "detail": "One or more fields are invalid.",
  "code": "VALIDATION_FAILED",
  "traceId": "01JQ0Y8K3V6W2R4T7P9X1Z5ABC",
  "errors": [
    {
      "field": "name",
      "code": "REQUIRED",
      "message": "Name is required."
    }
  ]
}
```

Branch on `status`, `type`, or `code`, not on the human-readable message. Use `traceId` to correlate a failure with sanitized server logs.

## One-time values

API keys, participant claims, invites, and setup links are returned only when created. Do not expect a later read endpoint to return the secret again.
