# Troubleshooting

## Core does not start

```sh
docker compose logs core
docker compose ps
```

Check required secrets, the root key, database migrations, and occupied TAK ports.

## Find a port conflict

```sh
sudo ss -tlnp
docker ps --format 'table {{.Names}}\t{{.Ports}}'
```

Do not silently remap TAK ports. Follow the [TAK port guide](/installation/tak-ports).

## ATAK still uses 8443

When ATAK should use another Marti port, repeat enrollment. The connection profile must be imported before ATAK can use the new port.

## iTAK cannot list packages

Make sure OpenMeshTak Marti is publicly reachable on `8443`.

## API errors

| Status | Meaning |
| ---: | --- |
| `401` | Missing or invalid authentication |
| `403` | Permission or event scope missing |
| `404` | Not found or hidden from this caller |
| `409` | State or version conflict |
| `422` | Invalid field or domain value |
| `429` | Too many requests |

Record the response `code` and `traceId`. Do not share the bearer token.
