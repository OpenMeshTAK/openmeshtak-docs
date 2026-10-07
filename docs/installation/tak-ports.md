# TAK ports

The built-in TAK server needs three public TCP ports. This page explains which ports must stay on their standard numbers, what to do when another program already uses one, and how to check the result.

## The standard ports

| Service | Public port | What it does |
| --- | ---: | --- |
| Certificate enrollment | `8446/tcp` | A new device signs in once and receives its own client certificate. |
| CoT streaming | `8089/tcp` | Live positions, markers and messages. |
| Marti / Data Packages | `8443/tcp` | Lists and downloads map content and other Data Packages. |

**Quick Connect** is the ATAK setup where a participant enters only the server name, username and password. It only works without extra input when enrollment is on `8446` and CoT is on `8089`, because ATAK asks for those ports before it has learned anything from the server. Keep these two ports free wherever possible.

`8443` is more flexible. ATAK can learn a different Data Package port during enrollment, so you can move it when nothing else helps. iTAK cannot; see [Use a different Data Package port](#different-data-package-port).

## Public ports and container ports

Three kinds of port numbers appear in a deployment. Do not mix them up.

- **Public port**: what devices connect to, for example `tak.example.org:8443`.
- **Host port**: the left side of a Docker `ports:` mapping. With a direct publish, it is the public port.
- **Container port**: the right side of the mapping, where Core listens inside the container. It defaults to `8446`, `8443` and `8089`.

QR codes, connection packages and enrollment profiles always use the ports entered on the **TAK server** page of the Web app. OpenMeshTak never takes them from the Docker mapping. When you change a mapping, enter the same public port on that page.

## Find a port conflict

If another program already uses one of the ports, `docker compose up` stops with "port is already allocated". To see which program owns a port:

```sh
sudo ss -tlnp | grep -E ':(8446|8443|8089)\b'
docker ps --format 'table {{.Names}}\t{{.Ports}}'
```

If Core cannot open one of its ports, it does not start at all. A TAK server never runs with only some of its services.

## When a port is already taken

Work through these options in order and stop at the first one that fits.

### 1. Publish the standard ports directly {#standard-ports-direct}

If all three ports are free, keep the shipped mapping:

```yaml
ports:
  - "8446:8446"
  - "8443:8443"
  - "8089:8089"
```

### 2. Give the TAK host its own address {#dedicated-address}

If the server has a second public IPv4 or IPv6 address, point the DNS name of the TAK host at it and publish Core's ports only on that address. The other program keeps its port on the first address.

```yaml
ports:
  - "198.51.100.11:8446:8446"
  - "198.51.100.11:8443:8443"
  - "198.51.100.11:8089:8089"
```

This is the recommended fix for every port, and the only clean fix when `8446` or `8089` is taken. Do not rely on IPv6 alone unless every participant network supports it.

### 3. Move the other program to a private address {#move-other-program}

Some programs only need to be reachable through another route, for example a hosting panel that you already open through a normal web address on `443`. If that program can listen on `127.0.0.1` instead of all addresses, the public port becomes free for Core.

Then publish Core on the public address only:

```yaml
ports:
  - "8446:8446"
  - "203.0.113.10:8443:8443"
  - "8089:8089"
```

A plain `"8443:8443"` also binds `127.0.0.1` and collides with the program there. Add an IPv6 mapping only if the TAK host has an AAAA record.

Check with `sudo ss -tlnp | grep 8443` that the other program listens only on `127.0.0.1` or `[::1]`. Repeat the check after updating that program: an update may restore its public listener, and Core then no longer starts.

### 4. Share 8443 with SNI passthrough {#sni-passthrough}

On a single public address, a layer-4 router such as HAProxy (TCP mode) or nginx `stream` with `ssl_preread` can own public `8443`. It reads only the host name from the start of each TLS connection and forwards the connection unchanged: `tak.example.org` goes to Core, the other name goes to the other program.

This works only when:

- the other program can move to a private port, because only the router may listen on public `8443`;
- the router does **not** terminate TLS. Core checks each device's client certificate itself, so no `ssl` option may appear on the router's listener or backend lines; and
- connections without a known host name go to Core, never to an administration panel.

Test enrollment, Data Package download and CoT with your participants' app versions before you rely on this setup.

### 5. Use a different Data Package port {#different-data-package-port}

When nothing else works and **all participants use ATAK**, publish Marti on another port, for example `8484`:

```yaml
ports:
  - "8446:8446"
  - "8484:8443"
  - "8089:8089"
```

Then enter `8484` as **Data Package port** on the **TAK server** page and confirm the change.

What happens for an ATAK participant:

1. They enter only the host, username and password in Quick Connect.
2. ATAK enrolls on `8446` and downloads an enrollment profile on the same port.
3. The profile sets ATAK's Data Package port (`apiSecureServerPort`) to `8484`.
4. ATAK connects CoT on `8089` and loads Data Packages from `https://tak.example.org:8484/Marti`.

This is a setting delivered by the profile, not a redirect from `8443`. ATAK never contacts the program on `8443`. If the profile cannot be downloaded or imported, the enrollment has failed and must be repeated.

Tested with ATAK-CIV `5.6.0.12` on Android 16.

::: warning iTAK requires public Marti port 8443
iTAK `2.12.3` ignores the delivered port and always requests Data Packages on `8443`. With a different Data Package port, iTAK still connects and exchanges CoT on `8089`, but cannot list or download server Data Packages. If participants use iTAK, use one of the options above instead.
:::

::: warning One Data Package port per ATAK device
ATAK stores the Data Package port once for the whole app, not per server. A device connected to several TAK servers that use different Data Package ports may stop reaching one of them.
:::

Do not move `8446` or `8089` unless there is no other way. The Web app warns you, because participants then have to enter the ports by hand and Quick Connect no longer works as described.

## Changing ports later

Devices keep the address and ports they were set up with. When you change the host name or a port on the **TAK server** page, the Web app:

- asks you to confirm the change and can email the affected users;
- creates new QR codes, connection packages and enrollment profiles with the new values; and
- shows how many enrolled apps still use the old values.

Those apps cannot connect until their users set them up again. Change Docker and the **TAK server** page together, ideally before an event starts.

## Check the result

After `docker compose up -d`, check from a computer outside the server's network:

```sh
nslookup tak.example.org
nc -vz tak.example.org 8446
nc -vz tak.example.org 8443
nc -vz tak.example.org 8089
openssl s_client -connect tak.example.org:8443 -servername tak.example.org </dev/null | openssl x509 -noout -subject -issuer
```

The certificate must belong to the TAK host, not to another program such as a hosting panel. Then set up one test device and confirm that enrollment, the Data Package list and live CoT all work.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `docker compose up` reports a port as already allocated | Another program owns one of the ports | [Find the program](#find-a-port-conflict) and pick an option above. |
| Quick Connect fails immediately | `8446` is blocked or owned by another program | Check the firewall and `ss -tlnp`; keep `8446` on the TAK host. |
| ATAK enrolls, but Data Packages fail and the server log shows no `/Marti` requests | ATAK still uses `8443` from an old setup or a failed profile import | Remove the server in ATAK and set it up again. Confirm the **TAK server** page shows the published port. |
| iTAK shows an error for server Data Packages | Marti is not on public `8443` | Use a second address, move the other program, or SNI passthrough. |
| The `openssl` check shows a panel certificate on `8443` | The other program still answers on public `8443` | Bind Core to the public address and the other program to loopback. |

To roll back, restore the previous `docker-compose.yml` mapping and **TAK server** values, restart with `docker compose up -d`, and set up the affected devices again.

## Background

The ATAK behavior above follows the official ATAK source: [`SslNetCotPort`](https://github.com/TAK-Product-Center/atak-civ/blob/main/atak/ATAK/app/src/main/java/com/atakmap/comms/SslNetCotPort.java) (default ports), [`CertificateEnrollmentClient`](https://github.com/TAK-Product-Center/atak-civ/blob/main/atak/ATAK/app/src/main/java/com/atakmap/net/CertificateEnrollmentClient.java) and [`DeviceProfileOperation`](https://github.com/TAK-Product-Center/atak-civ/blob/main/atak/ATAK/app/src/main/java/com/atakmap/net/DeviceProfileOperation.java) (enrollment and profile download), and [`CotMapComponent`](https://github.com/TAK-Product-Center/atak-civ/blob/main/atak/ATAK/app/src/main/java/com/atakmap/android/cot/CotMapComponent.java) (`apiSecureServerPort`). SNI passthrough is described in the [NGINX `ssl_preread`](https://nginx.org/en/docs/stream/ngx_stream_ssl_preread_module.html) and [HAProxy SNI](https://www.haproxy.com/blog/enhanced-ssl-load-balancing-with-server-name-indication-sni-tls-extension/) documentation.

Source code alone is not a compatibility result. All tested app versions are listed in [TAK apps](/participants/tak-apps#tested-versions).

Written for OpenMeshTak `0.1.9`.
