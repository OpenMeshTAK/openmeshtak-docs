# Reverse proxy and TLS

OpenMeshTak has two kinds of public traffic, and they are handled differently:

- **Web app and API** on `https://tak.example.org`: your reverse proxy terminates HTTPS and forwards plain HTTP to Core.
- **TAK traffic** on `8446`, `8443` and `8089`: goes straight to Core, which handles TLS itself. See [TAK ports](/installation/tak-ports).

A **reverse proxy** is the web server that already answers on ports `80` and `443`, such as nginx, Caddy or the web server of a hosting panel. It holds the public HTTPS certificate and forwards requests to programs on the same machine.

## Web app and API

The shipped `docker-compose.yml` publishes the Web app and API only on the server itself:

```yaml
ports:
  - "127.0.0.1:8080:3000"
```

Point your reverse proxy for `PUBLIC_HOST` at `http://127.0.0.1:8080`. The proxy must:

- serve HTTPS with a publicly trusted certificate, for example from Let's Encrypt;
- forward the original host name and the `X-Forwarded-For` and `X-Forwarded-Proto` headers;
- pass WebSocket upgrades for `/api/realtime`. Without them, the live server log falls back to slower HTTP long-polling; and
- allow request bodies up to 64 MB, the largest Data Package upload Core accepts.

`PUBLIC_HOST` in `.env` must be exactly the host name the browser uses. Sign-in, passkeys and links in emails and QR codes depend on it.

### Let Core see real client addresses

Behind a proxy, every request reaches Core from the proxy's address, so all visitors would share one rate limit, for example for claim links, setup links and API keys. The shipped `docker-compose.yml` therefore sets `TRUST_PROXY`:

```yaml
environment:
  TRUST_PROXY: ${TRUST_PROXY:-true}
```

Core then takes the client address from the last `X-Forwarded-For` entry, the one your proxy adds. Earlier entries come from the visitor and are ignored, so nobody can fake their address by sending the header themselves.

This is only safe while port `8080` is published on `127.0.0.1` and one proxy sits in front of Core. If anything other than your proxy can reach port `8080`, set `TRUST_PROXY=false` in `.env`.

### nginx

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

# In the http block, once:
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
```


### Caddy

If the server has no web server yet, Caddy gets and renews a Let's Encrypt certificate by itself. A complete `Caddyfile`:

```text
tak.example.org {
    reverse_proxy 127.0.0.1:8080
}
```

Caddy forwards the headers and WebSocket upgrades automatically. Ports `80` and `443` must be reachable from the internet so Let's Encrypt can verify the name.

## TAK traffic

Never send TAK ports through an HTTP reverse proxy. Each device proves who it is with its own client certificate, and only Core may check it. A proxy that terminates TLS would hide that certificate.

If two TLS services must share one public port, use layer-4 SNI passthrough as described in [TAK ports](/installation/tak-ports#sni-passthrough). The router may read the host name but must forward the original TLS connection unchanged.

## Certificates

The Web certificate and the TAK certificate are separate.

- **Web**: your reverse proxy's certificate for `PUBLIC_HOST`. Core never sees it.
- **TAK server certificate**: chosen on the **TAK server** page. It can be created by the OpenMeshTak certificate authority (CA), uploaded as a publicly trusted certificate, or obtained and renewed by Core through ACME with a Cloudflare DNS challenge.
- **Client certificates**: always issued by the OpenMeshTak TAK CA during enrollment.

The TAK host can use the same name as the Web app. With a publicly trusted TAK certificate, devices do not need to trust an extra CA for the server.

## Check the result

```sh
curl --fail https://tak.example.org/api/v1/health
curl -sI https://tak.example.org/ | head -n 1
```

Both must succeed without certificate warnings. Then sign in to the Web app and open **Settings → Server log**. New lines should appear without reloading the page.

Written for OpenMeshTak `0.1.9`.
