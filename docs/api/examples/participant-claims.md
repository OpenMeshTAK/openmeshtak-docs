# Create an access link

Requires `member-claims.create` for an active event.

```sh
export MEMBER_ID="replace-with-member-id"

curl --fail-with-body --silent --show-error \
  -X POST \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/members/$MEMBER_ID/claims"
```

Example response:

```json
{
  "claim": {
    "id": "1b3ab574-dd4a-4b9b-ae9a-36f73c547c8e",
    "eventId": "47dddbe9-1f30-4e7a-88cd-2826a4245ae2",
    "memberId": "cfe20816-bd8d-45d5-a766-e62b865d39ec",
    "status": "open",
    "expiresAt": "2026-10-08T12:00:00.000Z",
    "consumedAt": null,
    "revokedAt": null,
    "createdAt": "2026-10-07T12:00:00.000Z"
  },
  "token": "omtk_claim_<returned-once>",
  "claimUrl": "https://tak.example.org/claim#omtk_claim_<returned-once>"
}
```

Send `claimUrl` privately to the participant. It expires after 24 hours and works once. Creating another link revokes any earlier unused link for that member.

The link is returned only in this response. The participant signs in as themselves; they do not get the API client's permissions.
