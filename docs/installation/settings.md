---
description: "Configure an OpenMeshTak installation in the Web app: sign-up, email delivery and TAK server certificates."
---

# Configure the installation

After the first sign-in, a few installation-wide settings decide how people sign up, how email is sent and how TAK apps trust your server. All of them are under **Settings** in the Web app; nothing here belongs in `.env`.

## General

**Settings → General** holds:

| Section | What to set |
| --- | --- |
| **Installation** | The name people see in the browser tab, on the sign-in page and in emails. |
| **Registration** | **Closed**: only administrators create accounts, participants arrive through links. **Invite only**: people sign up with a single-use invite link you create. **Open**: anyone who reaches the site can sign up. |
| **Email** | SMTP server, sender address and sender name for password resets, address confirmations and security notices. Send a test email after saving. |
| **Base map** | The online map shown in the map editor and live view: an HTTPS tile URL with `{z}`, `{x}` and `{y}`, plus the attribution the provider requires. |

New accounts have no permissions until you add them to a user group or an event, even with open registration.

Without email, everything else still works, but nobody can reset a forgotten password by email.

## TAK server

**Settings → TAK server** controls the built-in TAK server.

### Address and ports

Enter the public host name and the three ports exactly as devices reach them. These values go into every QR code and connection package. Change them only together with the Docker port mapping; see [TAK ports](/installation/tak-ports).

### Server certificate

The server certificate is what ATAK and iTAK check to know they talk to your server. Choose one source:

| Source | Good for |
| --- | --- |
| **Let's Encrypt (automatic)** | Recommended. OpenMeshTak gets and renews a publicly trusted certificate itself, checked in one of two ways (below). |
| **Reverse proxy files** | Your reverse proxy already has a certificate for the TAK host name, for example from certbot or Caddy. OpenMeshTak reads it and picks up renewals by itself. See below. |
| **Upload certificate** | You already have a publicly trusted certificate, for example from certbot. Upload the full chain and the key. You must upload the renewed one before it expires. |
| **OpenMeshTak CA** | Testing. Works without setup, but phones do not trust it on their own: there is no QR code for ATAK or iTAK, and participants set up their app with the connection package, which brings the trust along. |

Let's Encrypt has to check that the TAK host name is yours. Choose how:

| Check | Requirements |
| --- | --- |
| **HTTP-01 · Web address** | The TAK host name is the same as the Web address in `PUBLIC_HOST`, and port `80` reaches your reverse proxy. Nothing else to set up: Let's Encrypt asks through the proxy, and OpenMeshTak answers. |
| **DNS-01 · Cloudflare** | The DNS zone of the TAK host name is at Cloudflare. Enter the zone ID and an API token limited to DNS editing for that zone. No web port needs to be open, and the TAK host name may differ from the Web address. |

Before switching Let's Encrypt on, choose **Test setup**. It runs the whole check against Let's Encrypt's test service and installs nothing, so a mistake does not count against the limits of the real service.

#### Reverse proxy files

Mount the proxy's certificate directory read-only into OpenMeshTak. For certbot, uncomment this line in `docker-compose.yml` and restart with `docker compose up -d`:

```yaml
volumes:
  - /etc/letsencrypt:/server/certs:ro
```

Then choose **Reverse proxy files** and enter both files relative to that directory, for certbot `live/tak.example.org/fullchain.pem` and `live/tak.example.org/privkey.pem`. OpenMeshTak reads only below `/server/certs` and checks the files every twelve hours, so a renewed certificate is used without any action.

#### Expiry warnings

When a public certificate is 14 and again 3 days from expiring, administrators with a verified email address get a warning. This happens when Let's Encrypt keeps failing, when the proxy stops renewing, or when an uploaded certificate was not replaced. It needs working [email](#general).

The certificates of participants' apps are separate. They always come from the OpenMeshTak certificate authority (CA) during enrollment, whatever you choose here.

### Enrolled apps

The TAK server page lists every app that received a certificate. Revoking one disconnects that app at once. Revoke apps of lost phones and of people who leave.

An app is named after the device it reports once it connects, for example *iPhone 17 · iTAK 2.12.3 · Peter*. iTAK and WinTAK packages contain a ready-made login, so one that no app connects with within **Unused package expiry** (24 hours by default) is revoked by itself.
