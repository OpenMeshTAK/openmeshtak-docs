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
| **Let's Encrypt (automatic)** | Recommended. OpenMeshTak gets and renews a publicly trusted certificate itself. The DNS zone of the TAK host name must be at Cloudflare; you enter the zone ID and an API token limited to DNS editing for that zone. No web port needs to be open. |
| **Upload certificate** | You already have a publicly trusted certificate, for example from certbot. Upload the full chain and the key. You must upload the renewed one before it expires. |
| **OpenMeshTak CA** | Testing. Works without setup, but phones do not trust it on their own: there is no QR code for ATAK or iTAK, and participants set up their app with the connection package, which brings the trust along. |

The certificates of participants' apps are separate. They always come from the OpenMeshTak certificate authority (CA) during enrollment, whatever you choose here.

### Enrolled apps

The TAK server page lists every app that received a certificate. Revoking one disconnects that app at once. Revoke apps of lost phones and of people who leave.
