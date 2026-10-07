# Create an event

Requires instance-wide `events.manage`.

```sh
curl --fail-with-body --silent --show-error \
  -X POST \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  -H "Content-Type: application/json" \
  "$OMTK_ORIGIN/api/v1/events" \
  --data '{
    "name": "LightSim 2027",
    "slug": "lightsim-2027",
    "timeZone": "Europe/Berlin",
    "startsAt": "2027-05-01T08:00:00.000Z",
    "endsAt": "2027-05-02T18:00:00.000Z",
    "takLoginTokenDays": 0,
    "permanentAccounts": false
  }'
```

The response is the new event in `draft` state. Save its `id` for later requests:

```sh
export EVENT_ID="replace-with-event-id"
```

The dates do not activate or archive the event automatically.
