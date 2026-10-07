# Generate provisioning artifacts

Requires `member-artifacts.download` for on-behalf access. Every on-behalf view and download is audited.

## Meshtastic device profile

```sh
curl --fail-with-body --silent --show-error \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/members/$MEMBER_ID/meshtastic/device-profile" \
  --output member-fw2.8.cfg
```

The file contains the member's names, radio settings, allowed channels, and applicable channel keys.

## ATAK Data Package

```sh
export PACKAGE_ID="replace-with-package-id"

curl --fail-with-body --silent --show-error \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/members/$MEMBER_ID/data-packages/$PACKAGE_ID/atak" \
  --output mission.zip
```

The member must belong to the package audience. Draft content is never included.

Treat generated files as sensitive when they contain certificates, channel keys, or participant-specific data.
