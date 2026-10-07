# ATAK

ATAK-CIV `5.6.0.12` is confirmed working on Android 16.

## Setup options

- ATAK connection package
- ATAK QR code
- manual host, username, and password

The connection package contains server and trust settings but no password. ATAK creates its own key during enrollment.

## Ports

ATAK uses enrollment on `8446` and CoT on `8089`. Marti normally uses `8443`.

ATAK can use a different public Marti port, such as `8484`. OpenMeshTak delivers the port during enrollment, so the participant does not enter it manually.

## Working features

- certificate enrollment
- live CoT
- Data Package list and download
- automatic Data Package installation and updates
- QR and connection-package setup
- certificate revocation and immediate disconnect
- TAK through the Meshtastic Android app's local TAK server
