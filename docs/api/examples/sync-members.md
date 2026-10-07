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

The result contains either the resolved membership or a sync issue. A missing role or group records an issue and leaves the membership unchanged.

Synchronization does not create a password, login provider, browser session, or “Sign in with Discord” account.
