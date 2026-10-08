---
description: "Install OpenMeshTak with Docker Compose: one container for the Web app, the REST API and the built-in TAK server."
---

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

Next to it, save the [.env example](/examples/openmeshtak.env.example.txt) as `.env`.

## 2. Fill in `.env`

| Setting | Value |
| --- | --- |
| `OPENMESHTAK_VERSION` | Optional. Without it, the newest release (`latest`) runs. Set an exact release such as {{ $coreVersion }} to upgrade only when you choose. |
| `PUBLIC_HOST` | The public DNS name without `https://`, for example `tak.example.org`. |
| `ROOT_ENCRYPTION_KEY` | The root key, see below. |

::: tip latest or a fixed version?
With `latest`, every `docker compose pull` can bring a new version, and OpenMeshTak updates its database on the next start. That is convenient, but make a [backup](/installation/backup-upgrade) before pulling. A fixed version only changes when you edit `.env`, so nothing updates by surprise, for example shortly before an event.
:::

### The root key

The root key is the installation's only secret. It encrypts stored secrets such as channel keys and the TAK certificate authority, and signs sign-in sessions. Create it once and paste the output as `ROOT_ENCRYPTION_KEY`:

```sh
openssl rand -base64 32
```

Copy it to a safe place right away and never change it. Without it, stored secrets cannot be read and a backup cannot be restored.

Keep `.env` private and out of version control.

::: details Keep the key in a separate file instead
Save the key with `openssl rand -base64 32 > root_encryption_key` and `chmod 600 root_encryption_key`. In `docker-compose.yml`, remove the `ROOT_ENCRYPTION_KEY` line and uncomment both `secrets` blocks. Then `.env` contains no secret. Setting the key in both places stops OpenMeshTak from starting.
:::

## 3. Start

```sh
docker compose up -d
```

If Docker reports that a port is already allocated, another program uses it; follow [TAK ports](/installation/tak-ports).

Check that Core is running:

```sh
curl --fail https://tak.example.org/api/v1/health
```

## 4. Create the first administrator

1. Read the one-time setup token: `docker compose logs core`.
2. Open `https://tak.example.org` and enter the token.
3. Create the administrator account. Its username is also the TAK login, so choose it well.
4. Add a passkey if you like.

Then go through [Configure the installation](/installation/settings).

