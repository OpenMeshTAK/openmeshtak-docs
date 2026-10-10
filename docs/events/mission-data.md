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

## Planning tools

| Tool | Key | What it draws |
| --- | --- | --- |
| Arrow | `D` | A line with an arrowhead at the start, the end or both. Two clicks finish; hold Shift to add more points. |
| Range & Bearing | `B` | A saved two-point line showing distance and true bearing. |
| Temporary Range & Bearing | `N` | A measurement on your own map only; it is not saved or published. |
| Bearing sector | `V` | A field of view from a point, with heading, sweep and radius. |
| Range rings | | Evenly spaced rings around a centre. |
| Bullseye | | A reference circle with rings and radial bearings. |

Select an object to change how it looks: label visibility, solid, dashed, dotted or outlined lines, arrowheads, a corridor around a line or route, or a safety distance around a shape. Route direction indicators only decorate a route; checkpoints and navigation cues stay as they are.

**Several objects at once:** hold Shift, Ctrl or Cmd while selecting, then move, delete or change colour, width and line style together. The whole change is one undo step. If one object is in a locked layer or was changed by someone else meanwhile, nothing is changed.

**Coordinates:** the inspector accepts decimal degrees, MGRS and UTM. A grid entry shows a preview first; choose **Apply** to move the object. MGRS uses the centre of the grid cell and shows its precision. Applying a position keeps the altitude.

**Tactical graphics:** draw a line or area and choose a **Tactical graphic** in the inspector. Available are Boundary, Phase Line, Assembly Area, Airborne/Aviation Axis and Supporting Attack Axis (MIL-STD-2525D) with their designation, echelon, country or date-time fields. The control points stay editable.

The editor has no text-only labels, because ATAK has no marker without an icon. Use a marker and its name instead. Standalone waypoint and checkpoint markers and the Joker affiliation cannot be chosen; waypoints and checkpoints inside a route work as usual, and imported objects keep their data.

**Create data package from layer** copies the layer as currently saved, including unpublished changes and new layers. The copy gets its own IDs; the source and its published revisions stay unchanged.

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

## MGRS grid

The grid button in the map toolbar shows an MGRS/UTM grid like ATAK: zone boundaries, 100 km squares and, when you zoom in, 10 km, 1 km or 100 m lines with their digits. While finer lines are shown, the 100 km square in the middle of the view (for example **32U NE**) appears above the scale bar. The same menu sets the line spacing, colour and width and turns the labels on or off; your browser remembers the choice. The special zones around Norway and Svalbard are drawn as regular zones.

## Choosing a base map

Under **Settings → General → Base maps**, administrators can configure up to ten online maps and choose a default. **Street** adds an OpenStreetMap template, **Satellite** adds [Esri World Imagery](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9), and **Custom map** accepts another HTTPS XYZ tile URL. Each map has its own name, required source attribution and maximum zoom. Save the list, then reload open map views.

When several maps are configured, use the **Base map** menu (map icon) in the editor or live-map toolbar to switch. The current position, zoom and mission layers stay in place; only the chosen online provider loads tiles. Your browser remembers the selected map after a reload and in other editor/live views. If that map is removed, the configured default is used. Zoom with the mouse wheel or a pinch gesture; the separate +/− buttons are hidden. Provider terms apply, and online basemaps are not exported as offline tiles.

## Finding WinTAK icon sets

On Windows, WinTAK stores installed icon sets in `%APPDATA%\WinTAK\Databases\iconsets.sqlite`. Paste `%APPDATA%\WinTAK\Databases` into File Explorer to find the database. Application assets are also under `C:\Program Files\WinTAK\Assets`.

Open **Settings → General → Icon sets**, beside the base-map settings, to upload `iconsets.sqlite`. Close WinTAK before copying the database. Upload, replacement and removal require permission to manage settings. Core accepts databases up to 10 MB and reports entries it cannot import. The shared images are available in every editor; existing package-specific libraries take precedence for matching icon paths.

In the editor, open **Icons** to search by set, group or filename. Select a marker on an editable, unlocked layer and use **Icon set** to choose its image. Replacing or removing the shared database keeps stored marker paths; missing paths use fallback symbols. Reload other open editor tabs after changing the database.

These images are used in the editor. TAK exports retain the marker's original icon path; install the matching set separately in TAK. Individual asset folders and icon-set ZIP imports are not supported yet. This editor update is implemented locally and still awaits verification before release.

OpenMeshTak does not include WinTAK's icon images. Operators supply their own icon-set files and are responsible for the right to use and share those images.
