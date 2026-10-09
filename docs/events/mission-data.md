---
description: "Edit maps, game areas and points of interest in the browser and deliver them to ATAK and iTAK as Data Packages."
---

# Map data

Map content such as the game area, points of interest and offline maps reaches ATAK and iTAK as **Data Packages**. You edit a package in the Web app's map editor and publish it; the TAK apps then receive it from the built-in TAK server.

## Create and publish

1. Create a Data Package in the event.
2. Draw or import the content. OpenMeshTak reads mission objects, CoT, KML/KMZ and existing ATAK Data Packages.
3. Choose who receives it: everyone, or selected groups, roles or members.
4. Choose whether the apps install it automatically on enrollment, on every connection, both, or not at all. Without either, participants load it from the TAK server in their app or download it on the dashboard.
5. Publish.

Participants only ever receive published revisions. Your draft stays private until you publish again, and publishing without changes keeps the current revision.

## How participants get it

- With the OpenMeshTak TAK server, ATAK and iTAK list, download and update packages by themselves.
- Every participant can also download their packages from the dashboard and import the ZIP by hand, for example when TAK runs over Meshtastic.

A downloaded file does not update itself. After a new revision, participants who import by hand need to download it again.

## Choosing a base map

Under **Settings → General → Base maps**, administrators can configure up to ten online maps and choose a default. **Street** adds an OpenStreetMap template, **Satellite** adds [Esri World Imagery](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9), and **Custom map** accepts another HTTPS XYZ tile URL. Each map has its own name, required source attribution and maximum zoom. Save the list, then reload open map views.

When several maps are configured, use the **Base map** menu (map icon) in the editor or live-map toolbar to switch. The current position, zoom and mission layers stay in place; only the chosen online provider loads tiles. Your browser remembers the selected map after a reload and in other editor/live views. If that map is removed, the configured default is used. Zoom with the mouse wheel or a pinch gesture; the separate +/− buttons are hidden. Provider terms apply, and online basemaps are not exported as offline tiles.

## Finding WinTAK icon sets

On Windows, WinTAK stores installed icon sets in `%APPDATA%\WinTAK\Databases\iconsets.sqlite`. Paste `%APPDATA%\WinTAK\Databases` into File Explorer to find the database. Application assets are also under `C:\Program Files\WinTAK\Assets`.

Open **Settings → General → Icon sets**, beside the base-map settings, to upload `iconsets.sqlite`. Close WinTAK before copying the database. Upload, replacement and removal require permission to manage settings. Core accepts databases up to 10 MB and reports entries it cannot import. The shared images are available in every editor; existing package-specific libraries take precedence for matching icon paths.

In the editor, open **Icons** to search by set, group or filename. Select a marker on an editable, unlocked layer and use **Icon set** to choose its image. Replacing or removing the shared database keeps stored marker paths; missing paths use fallback symbols. Reload other open editor tabs after changing the database.

These images are used in the editor. TAK exports retain the marker's original icon path; install the matching set separately in TAK. Individual asset folders and icon-set ZIP imports are not supported yet. This editor update is implemented locally and still awaits verification before release.

OpenMeshTak does not include WinTAK's icon images. Operators supply their own icon-set files and are responsible for the right to use and share those images.
