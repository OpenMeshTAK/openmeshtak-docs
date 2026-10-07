# API authentication

## Browser sessions

The OpenMeshTak Web app uses the secure `openmeshtak.session_token` cookie. Session authentication is intended for interactive use on the installation's own origin.

## API clients

Automations use an API client with explicit permission grants and optional event scopes.

1. Sign in as an administrator.
2. Create an API client.
3. Add only the required permissions and event scopes.
4. Create an API key.
5. Store the complete key immediately; it is shown only once.

Send the key as a bearer token:

```http
Authorization: Bearer omtk_ak_<public-key-id>_<secret>
```

API keys authenticate a machine client, not a user. The key itself contains no permissions; Core checks the API client's current status and grants on every request.

## Rotation

Creating another key rotates the client. Update the integration, verify it, then revoke the old key. Never store keys in browser local storage, source code, logs, command arguments, or chat messages.

## Responses

- `401` means authentication is missing, invalid, expired, or revoked.
- `403` means the client is authenticated but lacks permission.
- `404` may hide a resource outside the client's allowed scope.
