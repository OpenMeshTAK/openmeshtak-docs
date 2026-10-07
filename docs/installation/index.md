# Install

OpenMeshTak runs as one container. It serves the Web app, the API and the built-in TAK server. This page takes you from an empty server to the first administrator account.

## What you need

- a Linux server with Docker Engine and Docker Compose;
- a public DNS name for it, for example `tak.example.org`;
- a reverse proxy that serves HTTPS for that name, see [Reverse proxy](/installation/reverse-proxy); and
- the public TAK ports `8446`, `8443` and `8089`, see [TAK ports](/installation/tak-ports).

## 1. Get the files

Create a directory on the server and save this file as `docker-compose.yml` ([download](/examples/docker-compose.yml)):

<<< @/public/examples/docker-compose.yml

Next to it, save the [.env example](/examples/openmeshtak.env.example.txt) as `.env`, and copy `scripts/preflight.sh` from the [Core repository](https://github.com/OpenMeshTAK/openmeshtak) into a `scripts` folder.

## 2. Fill in `.env`

| Setting | Value |
| --- | --- |
| `OPENMESHTAK_VERSION` | The exact release, for example {{ $coreVersion }}. Never `latest`, so upgrades only happen when you choose. |
| `PUBLIC_HOST` | The public DNS name without `https://`, for example `tak.example.org`. |

Keep `.env` private and out of version control.

## 3. Create the root key

The root key is the installation's only secret. It encrypts stored secrets such as channel keys and the TAK certificate authority, and signs sign-in sessions:

```sh
openssl rand -base64 32 > root_encryption_key
chmod 600 root_encryption_key
```

Copy this file to a safe place now. Without it, a backup cannot be restored. See [Backup and upgrade](/installation/backup-upgrade).

## 4. Start

```sh
sh scripts/preflight.sh
docker compose up -d
```

The preflight script checks that every port is free before anything starts. If it reports a conflict, follow [TAK ports](/installation/tak-ports).

Check that Core is running:

```sh
curl --fail https://tak.example.org/api/v1/health
```

## 5. Create the first administrator

1. Read the one-time setup token: `docker compose logs core`.
2. Open `https://tak.example.org` and enter the token.
3. Create the administrator account. Its username is also the TAK login, so choose it well.
4. Add a passkey if you like.

Then go through [Configure the installation](/installation/settings).

