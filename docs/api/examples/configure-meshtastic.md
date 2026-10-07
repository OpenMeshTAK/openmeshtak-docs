# Configure Meshtastic

List the installed firmware profiles:

```sh
curl --fail-with-body --silent --show-error \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  "$OMTK_ORIGIN/api/v1/meshtastic/firmware-profiles"
```

Read the current event configuration:

```sh
curl --fail-with-body --silent --show-error \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/meshtastic/configuration"
```

Create a primary channel and let Core generate a random 32-byte PSK:

```sh
curl --fail-with-body --silent --show-error \
  -X POST \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  -H "Content-Type: application/json" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/meshtastic/channels" \
  --data '{
    "name": "Event",
    "uplinkEnabled": false,
    "downlinkEnabled": false,
    "positionPrecision": 32,
    "audience": {
      "groupIds": [],
      "roleIds": [],
      "memberIds": []
    },
    "secret": false
  }'
```

Use the firmware preview endpoint before a change that requires confirmation. Send the returned `confirmation` together with the configuration `version` when applying the change.

Secret values are set through the dedicated secrets endpoint and are never returned by later reads.
