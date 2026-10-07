# Backup and upgrade

All data of an installation lives in two places: the `core-data` Docker volume (database, uploads, certificates) and the `root_encryption_key` file. A backup needs both.

## Back up

Run this in the directory with `docker-compose.yml`. Core stops for the copy, so nothing changes while it runs:

```sh
docker compose stop core
docker run --rm \
  -v openmeshtak_core-data:/data:ro \
  -v "$PWD":/backup \
  alpine tar czf /backup/openmeshtak-$(date +%F).tar.gz -C /data .
docker compose start core
```

This creates `openmeshtak-<date>.tar.gz` next to the Compose file. Copy it, together with `root_encryption_key`, to another machine. Store the key apart from the archive: anyone with both can read every stored secret.

## Restore

Restore onto the same OpenMeshTak version that made the backup:

```sh
docker compose down
docker volume rm openmeshtak_core-data
docker volume create openmeshtak_core-data
docker run --rm \
  -v openmeshtak_core-data:/data \
  -v "$PWD":/backup \
  alpine tar xzf /backup/openmeshtak-2026-10-08.tar.gz -C /data
docker compose up -d
```

Put the matching `root_encryption_key` next to `docker-compose.yml` before starting. Test a restore on a spare machine once, before you need it.

## Upgrade

1. Read the release notes.
2. Make a backup as above.
3. If you use a fixed version, set `OPENMESHTAK_VERSION` in `.env` to the new one. With `latest`, skip this step.
4. Start the new version:

   ```sh
   docker compose pull
   docker compose up -d
   docker compose logs core
   ```

Core updates the database on its first start. To go back, restore the backup and set the old version again. Do not start an older version on a database that a newer one has already updated.

