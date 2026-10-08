---
description: "Create, edit and publish ATAK Data Packages for an OpenMeshTak event through the REST API."
---

# Work with Data Packages

## Create a package

Requires `data-packages.edit`.

```sh
curl --fail-with-body --silent --show-error \
  -X POST \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  -H "Content-Type: application/json" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/data-packages" \
  --data '{
    "name": "Main mission",
    "description": "Mission objects and attachments"
  }'
```

Save the returned `id` and `version`:

```sh
export PACKAGE_ID="replace-with-package-id"
```

## Set automatic TAK delivery

Requires `data-packages.publish`. Replace `1` with the version you last read.

```sh
curl --fail-with-body --silent --show-error \
  -X PUT \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  -H "Content-Type: application/json" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/data-packages/$PACKAGE_ID/tak-delivery" \
  --data '{
    "version": 1,
    "takDelivery": {
      "onEnrollment": true,
      "onConnection": true
    }
  }'
```

## Publish

```sh
curl --fail-with-body --silent --show-error \
  -X POST \
  -H "Authorization: Bearer $OMTK_API_KEY" \
  "$OMTK_ORIGIN/api/v1/events/$EVENT_ID/data-packages/$PACKAGE_ID/revisions"
```

The response has `created: false` when the draft is unchanged from the latest revision.

The [complete API reference](/api/reference) includes the layer, mission-object, content, import, export, audience, revision, GeoJSON, KML, and ATAK endpoints.
