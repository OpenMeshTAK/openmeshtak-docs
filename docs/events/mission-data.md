---
description: "Edit maps, game areas and points of interest in the browser and deliver them to ATAK and iTAK as Data Packages or missions."
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

## Missions

A **mission** is a package that TAK apps keep in sync while the event runs (ATAK's *Data Sync*). Create it as a mission instead of a Data Package; it uses the same editor. **Sync** in the editor sends your changes to every subscribed app.

Participants subscribe to a mission in their TAK app. Groups, roles or members you name as **writers** can also change it from ATAK: their markers, drawings and uploaded files appear in the mission, on a layer called *From TAK apps*. Everyone else only reads it. Missions never show up among the Data Packages, and Data Packages never among the missions.

## Planning tools

Besides markers, lines, areas and routes, the editor offers arrows, Range & Bearing lines, bearing sectors, range rings, bullseyes and MIL-STD-2525D tactical graphics such as boundaries and phase lines. The inspector beside the map changes how an object looks, accepts coordinates as decimal degrees, MGRS or UTM, and changes several selected objects at once.

ATAK has no text without a marker, so the editor has none either: use a marker and its name. **Create data package from layer** copies a layer into a new package, for example to reuse a planning layer in another event.

## How objects look in TAK apps

All TAK apps receive the same Data Package. OpenMeshTak writes each object in the form ATAK uses itself, so it stays editable there.

| In the editor | In ATAK | Notes |
| --- | --- | --- |
| Marker with a military symbol | Symbol in its affiliation colour | The marker colour is not applied to military symbols. |
| Marker without symbol | Coloured spot marker | |
| Dashed, dotted or outlined line | Same line style | |
| Arrow or Range & Bearing with two points | Range & Bearing line | ATAK shows distance and bearing. With a start arrowhead, ATAK measures from the end point. A second arrowhead becomes a separate small triangle. |
| Arrow with more points | Line plus triangles for the heads | The triangles are separate objects named after the arrow. |
| Bearing sector | Sensor field of view | Fractional values, a full 360° sweep or more than 60 km become an area. |
| Corridor along a line | Line with a safety distance of half the width | Around a route, the route stays and a separate corridor area is added. |
| Range rings, bullseye | Native range rings and bullseye | ATAK may draw the bullseye in its own colour. |
| Tactical graphic | Military graphic from its control points | |

**iTAK** does not know ellipses, bullseyes and bearing sectors. It shows them as a placeholder icon at their position; rectangles may show differently coloured edges. Everything else appears as in ATAK.

Before downloading, the export dialog lists what a format cannot show exactly. Names, descriptions and remarks always stay unchanged. For editing elsewhere, use the ATAK Data Package or GeoJSON: both keep every editor detail. KML shows ordinary shapes; it stores the planning details as extra data that most GIS tools ignore.

## Map and grid

The map toolbar switches between the base maps an administrator configured (see [Configure the installation](/installation/settings#general)) and shows an MGRS/UTM grid like ATAK, with finer lines and their digits as you zoom in. Online base maps are only for the browser; they are not exported to TAK apps. For maps that work without internet in ATAK, import an offline map into a Data Package.

## Icon sets

To show WinTAK's or ATAK's own marker icons in the editor, an administrator uploads the icon-set database under **Settings → General → Icon sets**. On Windows, WinTAK keeps it in `%APPDATA%\WinTAK\Databases\iconsets.sqlite`; close WinTAK before copying it. The icons are only used in the editor: TAK apps need the same icon set installed themselves. OpenMeshTak includes no icon images, and you are responsible for the right to use the ones you upload.
