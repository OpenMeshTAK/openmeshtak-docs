# Read resolved profiles

Requires `members.read`, or `member-artifacts.download` for an audited on-behalf view. An active participant can also read their own profile.

```sh
curl --fail-with-body --silent --show-error \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/members/$MEMBER_ID/profile"
```

The response contains:

- callsign and username;
- event role and group;
- TAK connection, team, role, and callsign;
- Meshtastic firmware, names, and allowed channels; and
- the configuration revision used.

Draft events return an administrator preview. Active events use the latest published configuration revision.
