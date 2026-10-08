---
description: "Put OpenMeshTak behind a reverse proxy such as Caddy or nginx for HTTPS."
---

# Reverse proxy

Browsers reach the Web app over HTTPS. OpenMeshTak itself does not handle that: a web server in front of it, the **reverse proxy**, holds the HTTPS certificate and passes requests on to OpenMeshTak.

```text
Browser ──HTTPS :443──▶ reverse proxy ──HTTP──▶ 127.0.0.1:8080 (OpenMeshTak)
```

The sample `docker-compose.yml` already publishes OpenMeshTak on `127.0.0.1:8080`, reachable only from the server itself. You only set up the proxy.

This page is only about the Web app and API. ATAK and iTAK do not go through the proxy; they connect to OpenMeshTak directly on their own ports, see [TAK ports](/installation/tak-ports).

## Choose one

### No web server yet: Caddy

Caddy gets and renews the HTTPS certificate by itself. Install Caddy, then use this as the complete `Caddyfile`:

```text
tak.example.org {
    reverse_proxy 127.0.0.1:8080
}
```

Ports `80` and `443` must be reachable from the internet so Let's Encrypt can check the name.

### nginx already runs

Add a site for the host name. Replace the certificate paths with yours:

```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name tak.example.org;

    ssl_certificate     /etc/letsencrypt/live/tak.example.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tak.example.org/privkey.pem;

    client_max_body_size 64m;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}

# Once, in the http block:
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
```

### A hosting panel or another proxy

Create a reverse-proxy site for the host name that points to `http://127.0.0.1:8080`, and give it a Let's Encrypt certificate. Then check that it does what the nginx example does:

- passes the original host name and the `X-Forwarded-For` and `X-Forwarded-Proto` headers;
- passes WebSocket upgrades (`Upgrade` and `Connection` headers); and
- accepts uploads up to 64 MB.

## Check

```sh
curl --fail https://tak.example.org/api/v1/health
```

It must succeed without a certificate warning. Then sign in, open **Settings → Server log** and watch new lines appear without reloading. If they only appear after a reload, the proxy does not pass WebSocket upgrades.

## Good to know

- `PUBLIC_HOST` in `.env` must be exactly the name in the browser's address bar. Sign-in, passkeys and links in emails and QR codes use it.
- The sample compose file sets `TRUST_PROXY=true`, so OpenMeshTak sees each visitor's real address from your proxy. That is only safe while port `8080` stays on `127.0.0.1`. If anything else can reach it, set `TRUST_PROXY=false` in `.env`.
- The certificate here is only for the Web app. The TAK server has its own; see [Configure the installation](/installation/settings#server-certificate).
