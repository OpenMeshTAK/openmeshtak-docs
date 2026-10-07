# Docker Compose

## Requirements

- Linux with Docker Engine and Docker Compose
- a public DNS name, for example `tak.example.org`
- a reverse proxy for Web/API HTTPS
- public access to the required TAK ports

## Configuration

Download the files and keep them in the same directory:

- [docker-compose.yml](/examples/docker-compose.yml)
- [.env example](/examples/openmeshtak.env.example.txt) — save it as `.env`

The Compose file is the Core `0.1.9` sample deployment:

```yaml
name: openmeshtak

services:
  core:
    image: ghcr.io/openmeshtak/openmeshtak:${OPENMESHTAK_VERSION:-latest}
    restart: unless-stopped
    environment:
      PUBLIC_ORIGIN: https://${PUBLIC_HOST:?Set PUBLIC_HOST in .env}
      BETTER_AUTH_SECRET: ${BETTER_AUTH_SECRET:?Set BETTER_AUTH_SECRET in .env}
      LOG_LEVEL: ${LOG_LEVEL:-info}
      SWAGGER_ENABLED: ${SWAGGER_ENABLED:-false}
    secrets:
      - root_encryption_key
    volumes:
      - core-data:/server/data
    ports:
      - "127.0.0.1:8080:3000"
      - "8446:8446"
      - "8443:8443"
      - "8089:8089"

secrets:
  root_encryption_key:
    file: ./root_encryption_key

volumes:
  core-data:
```

Create `.env` beside it:

```dotenv
OPENMESHTAK_VERSION=0.1.9
PUBLIC_HOST=tak.example.org
BETTER_AUTH_SECRET=replace-with-output-of-openssl-rand-base64-48
LOG_LEVEL=info
SWAGGER_ENABLED=false
```

`PUBLIC_HOST` is the public DNS name without `https://`. Replace the secret placeholder before starting Core. Keep `OPENMESHTAK_VERSION` pinned to an exact release instead of `latest`, and do not commit `.env`.

Generate the authentication secret:

```sh
openssl rand -base64 48
```

Create the root encryption key once:

```sh
openssl rand -base64 32 > root_encryption_key
chmod 600 root_encryption_key
```

Back up `root_encryption_key` separately. Stored secrets cannot be recovered without it.

## Start

```sh
sh scripts/preflight.sh
docker compose pull
docker compose up -d
docker compose logs core
```

The log shows the short-lived token for creating the first administrator.

Forward the public Web host to `http://127.0.0.1:8080`. Then verify the deployment:

```sh
curl --fail https://tak.example.org/api/v1/health
```

Runtime data is stored in the `core-data` volume at `/server/data`.
