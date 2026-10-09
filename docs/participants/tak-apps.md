---
description: "Connect ATAK on Android, iTAK on iPhone and WinTAK on Windows to the OpenMeshTak TAK server by QR code, connection package or login."
---

# TAK apps

Participants connect ATAK on Android, iTAK on iPhone or WinTAK on Windows to the OpenMeshTak TAK server. In events with Meshtastic, they also connect it to the Meshtastic app, so TAK keeps working over the radio when there is no network.

## Tested versions

| App | Version | Platform |
| --- | --- | --- |
| ATAK-CIV | <code>{{ $versions.atak }}</code> | Android {{ $versions.android }} |
| iTAK | <code>{{ $versions.itak }}</code> | iOS {{ $versions.ios }} |
| WinTAK | <code>{{ $versions.wintak }}</code> | Windows {{ $versions.windows }} |

Other versions may work but have not been tested.

## With the OpenMeshTak TAK server

On the dashboard, choose **Android · ATAK** or **iPhone · iTAK**, then one of three ways. WinTAK has its own way, see [WinTAK](#wintak).

| Way | What to do |
| --- | --- |
| **QR code** | ATAK: scan it with ATAK's QR scanner or tap **Open in ATAK**. iTAK: scan it with iTAK's server scanner, then sign in. |
| **Connection package** | Download the package and import it in the app. ATAK asks for username and password. |
| **Login data** | Add a server by hand with the address, port `8089` (SSL), username and password shown. |

The username and password are the participant's OpenMeshTak login. Participants who signed in with an access link set a password on their account page first, or use the ATAK QR code.

The dashboard confirms when the app has received its certificate. From then on the app exchanges positions with everyone in the same event, and receives the event's map data.

Good to know:

- The QR code appears only when the TAK server has a publicly trusted certificate. Otherwise, use the connection package.
- The QR code and the iTAK package sign in as the participant. Do not share them.
- Each iTAK or WinTAK download is a new login for one device. Import it within the time the dashboard shows (24 hours unless the operator changed it), otherwise it stops working. After the first connection the dashboard names the device, for example *iPhone 17 · iTAK 2.12.3 · Peter*.
- iTAK needs the TAK server's Data Package port on `8443`. Operators find the details in [TAK ports](/installation/tak-ports#different-data-package-port).

## WinTAK

WinTAK cannot sign in with a username and password, so it only gets a connection package with its own certificate:

1. On the dashboard, choose **Windows · WinTAK** and download the WinTAK package.
2. In WinTAK, open the main menu, then **Import Manager → Import Files**, and choose the downloaded file.

The package signs in as the participant. Do not share it. For another computer, download another package.

## Over Meshtastic

Only in events with Meshtastic. Here the TAK app talks to the Meshtastic app on the same phone, which sends TAK over the radio. Import the Meshtastic settings file first, so the radio has the event's channels.

**Android:**

1. In the Meshtastic app open **Settings → Module Config → TAK → TAK Server** and turn on **Enable Local TAK Server**.
2. Set **TAK Mesh Channel** to the channel shown on the dashboard.
3. Tap **Export TAK Data Package** and import the file in ATAK.

**iPhone:**

1. In the Meshtastic app open **Settings**, scroll to **TAK Server** and start it.
2. If the app offers a TAK mesh channel, choose the one shown on the dashboard.
3. Download the TAK Data Package from the app and import it in iTAK or TAK Aware.

Map data still comes from the OpenMeshTak TAK server whenever there is network. Without it, import the packages from the dashboard by hand.
