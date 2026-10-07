# Backup and upgrade

## Back up

Back up both:

- the complete `/server/data` volume; and
- the separate `root_encryption_key` file.

Stop writes while copying the volume:

```sh
docker compose stop core
# Back up the openmeshtak_core-data volume and root_encryption_key.
docker compose start core
```

Encrypt backups and test restoration on a separate host.

## Upgrade

1. Read the release notes.
2. Create a verified backup.
3. Change `OPENMESHTAK_VERSION` in `.env` to the exact version you want to install.
4. Pull and recreate the container.

Keep the version pinned, for example `OPENMESHTAK_VERSION=0.1.9`. Do not use `latest` for a production installation: it can change what gets installed during an ordinary pull and makes upgrades and rollbacks harder to reproduce.

```sh
docker compose pull
docker compose up -d
docker compose logs core
```

Core applies database migrations during startup.
