# Create groups and roles

Create a participant role:

```sh
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

Create a Bravo group:

```sh
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

Integrations use the slugs `participant` and `bravo` when synchronizing members.
