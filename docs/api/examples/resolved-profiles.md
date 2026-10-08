---
description: "Read a participant's resolved callsign, TAK team, role and radio settings through the OpenMeshTak REST API."
---

# Read a participant's profile

Requires `members.read`, or `member-artifacts.download` for an audited on-behalf view. An active participant can also read their own profile.

::: code-group

```sh [curl]
curl --fail-with-body --silent --show-error \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/members/$MEMBER_ID/profile"
```

```ts [SDK]
const profile = await client.getMemberProfile(eventId, memberId);
```

:::

The response is the participant's [profile](/events/#the-participant-s-profile): callsign, TAK identity, Meshtastic names and channels, and the configuration revision it came from.

Draft events return an administrator preview. Active events use the latest published configuration revision.
