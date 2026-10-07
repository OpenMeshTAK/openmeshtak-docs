# API

OpenMeshTak exposes a versioned JSON API below `/api/v1`.

The API covers:

- setup, accounts, sessions, registration, and user groups;
- events, roles, groups, members, claims, and configuration revisions;
- API clients and keys;
- TAK settings, certificates, enrollment, traffic, and recording;
- Meshtastic firmware, settings, channels, and secrets;
- Data Packages, layers, mission objects, imports, exports, and revisions;
- participant profiles and provisioning downloads;
- instance, map, email, health, and server-log settings.

Use the [complete API reference](/api/reference) for every operation and schema. Use the [examples](/api/examples/) for common workflows.

TypeScript and JavaScript integrations can also use the [SDK reference](/sdk/).

## Base URL

```text
https://tak.example.org/api/v1
```

Use HTTPS outside local development.

## First request

```sh
export OMTK_ORIGIN="https://tak.example.org"
export OMTK_API_KEY="omtk_ak_replace_me"

curl --fail-with-body --silent --show-error \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  "$OMTK_ORIGIN/api/v1/principal"
```

Never put the API key in a URL.
