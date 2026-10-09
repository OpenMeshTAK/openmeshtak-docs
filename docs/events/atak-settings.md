---
description: "Send ATAK settings such as coordinate format, units and reporting rates to the whole event, and single settings to a group, a role or one member."
---

# ATAK settings

OpenMeshTak can set up the participants' ATAK apps: coordinate format, units, how often positions are sent and many other settings. The apps get them from the TAK server when they enroll, and again after a change.

## Settings for the whole event

1. Open the event's **TAK** tab. The menu lists the ATAK settings by topic, such as **Display and units** or **Position reporting**.
2. Choose values. **Not set** sends nothing, so each device keeps its own value. The **(?)** next to a setting explains it and shows ATAK's default and the key.
3. Rarely needed settings appear under **Advanced** at the end of a topic once you switch them on.
4. Save, then publish the configuration.

To find a setting, type part of its name, key or value into **Search settings**. The search covers every topic, also advanced settings, and opens the setting you pick.

## Settings for single groups, roles or members

Under **Targeted & custom**, choose **Add setting** and pick who it is for: a group, a role or one member. Personal values such as phone numbers or email addresses can only be set for one member. Here you can also add plugin settings that are not in the topic lists.

If several settings use the same key, a participant gets the most specific one: their own, then their role's, then their group's, then the whole event's. Each topic page shows next to a setting which groups, roles or members have their own value. If someone takes part in several active events, the event that started last wins.

Callsign, team color and role always come from the participant's group and role, see [Roles and groups](/events/roles-groups).

## Import a complete setup

Set up one ATAK the way it should be, export its settings as a `.pref` file and choose **Import** under **Targeted & custom**. The file's settings apply to the whole event. Settings that belong to one person or device, such as the callsign, server connection and passwords, are left out and listed.

## Undo a setting

Setting a value back to **Not set** does not change apps that already have it. To undo it on the devices, choose the reset button next to the setting, which sends ATAK's default, then publish.
