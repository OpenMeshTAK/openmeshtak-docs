# Synchronize external members

Requires `members.sync` for the event.

```sh
export EXTERNAL_ID="123456789012345678"

curl --fail-with-body --silent --show-error \
  -X PUT \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  -H "Content-Type: application/json" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/external-members/discord/$EXTERNAL_ID" \
  --data '{
    "username": "peter",
    "eventRole": "participant",
    "group": "bravo"
  }'
```

This request is safe to repeat. It creates or updates the same external identity and event membership.

The response has `outcome: "member"` with the membership, or `outcome: "sync-issue"` when an organizer has to step in, for example because the group does not exist or the callsign is taken. A sync issue leaves the membership unchanged.

The member gets no password or login. To give them Web access, [create an access link](/api/examples/participant-claims).
