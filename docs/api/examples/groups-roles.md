---
description: "Create the groups and roles of an OpenMeshTak event through the REST API with curl or the TypeScript SDK."
---

# Create groups and roles

Create a participant role:

::: code-group

```sh [curl]
curl --fail-with-body --silent --show-error \
  -X POST \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  -H "Content-Type: application/json" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/roles" \
  --data '{
    "name": "Participant",
    "slug": "participant",
    "description": "Standard event participant",
    "takRoleOverride": null
  }'
```

```ts [SDK]
await client.createEventRole(eventId, {
  name: "Participant",
  slug: "participant",
  description: "Standard event participant",
  takRoleOverride: null,
});
```

:::

Create a Bravo group:

::: code-group

```sh [curl]
curl --fail-with-body --silent --show-error \
  -X POST \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  -H "Content-Type: application/json" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/groups" \
  --data '{
    "name": "Bravo",
    "slug": "bravo",
    "description": "Bravo team",
    "provisioning": {
      "callsignFormat": "{username} [Bravo]",
      "shortNamePrefix": "B",
      "tak": {
        "serverGroups": [],
        "role": "Team Member",
        "team": "Purple"
      }
    }
  }'
```

```ts [SDK]
await client.createEventGroup(eventId, {
  name: "Bravo",
  slug: "bravo",
  description: "Bravo team",
  provisioning: {
    callsignFormat: "{username} [Bravo]",
    shortNamePrefix: "B",
    tak: { serverGroups: [], role: "Team Member", team: "Purple" },
  },
});
```

:::

Integrations use the slugs `participant` and `bravo` when synchronizing members.
