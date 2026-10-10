---
description: "Use the event map and live radio positions at the HQ without internet: prepare the event in the browser and connect a Meshtastic radio over USB."
---

# Offline HQ

Where the HQ has no internet, the browser can still show the event map with the live positions of the Meshtastic radios. You store the map data in the browser while you are online; during the event, a Meshtastic radio on USB delivers the positions. Neither internet nor the OpenMeshTak server are needed then.

## What you need

- a computer with a current **Chrome or Edge** on Windows or Linux; other browsers cannot talk to a radio over USB;
- a **Meshtastic radio** on the event's channels, connected by USB cable; and
- the permission to make published content available offline, plus read access to the Data Packages; see [Users and permissions](/installation/users).

## Prepare while online

1. Open the active event and choose **Offline HQ** in its header.
2. Select the published Data Packages and missions you need. Unpublished drafts cannot be stored.
3. Choose **Store for offline use** and wait until everything is stored.
4. Check **Offline readiness**. It confirms that the app, the event data and an offline background map are stored, that the browser will keep the data, and that it can connect a radio.

For a background map without internet, one of the stored packages must contain an offline map. Without one, drawings and positions appear on a blank background.

Before the event, test once without network: disconnect, open **/offline** on your OpenMeshTak address and open the event.

## During the event

1. Open **/offline** in the same browser and choose the event. No sign-in is needed.
2. Choose **Connect radio** and allow the browser to use the USB port.
3. Positions appear as the radio hears the other nodes, with their age. Nodes not heard from for a while are marked as stale. **Full screen** suits a wall screen.

The radio only listens; the offline HQ sends nothing. Positions are not saved: after closing the page, the map starts empty again.

## Afterwards

Choose **Remove from this browser** on the Offline HQ page. The stored data stays on this computer until you remove it: revoking someone's access later does not delete it. Only prepare events on computers you trust. Keys, certificates and member data are never stored.
