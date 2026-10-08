# Set up an event

This page walks through one event from creation to activation. Each step happens in the Web app under **Events**.

## 1. Create the event

Choose a name, a short slug such as `lightsim-2027`, and the time zone where the event takes place. Integrations refer to the event by its slug, so keep it stable.

Then decide whether the event uses Meshtastic radios. The switch **Use Meshtastic radios** is in the event's settings and is off for new events:

| | Participants get |
| --- | --- |
| **Off** (TAK only) | A connection to the OpenMeshTak TAK server and the event's map data. |
| **On** (Meshtastic) | A radio settings file, TAK over the Meshtastic app and the event's map data. |

With the switch off, the event has no **Meshtastic** tab. Channels and radio settings you already made stay saved for when you turn it on again. On an active event, the change reaches participants once you publish the configuration.

## 2. Add roles and groups

Every member needs one role and one group, so create them first. See [Roles and groups](/events/roles-groups).

## 3. Set up radios and map data

- [Meshtastic](/events/meshtastic): firmware, radio settings and channels. Only for Meshtastic events.
- [Map data](/events/mission-data): Data Packages for ATAK and iTAK. Optional.

## 4. Add members

Open the event's members and choose **Add member**:

| Option | What happens |
| --- | --- |
| **New person** | Creates an account and shows a one-time **setup link**. The person opens it and chooses a password. |
| **Existing user** | Adds someone who already has an account. |
| **External identity** | Adds someone known from another system, such as a Discord ID. Usually done by an [integration](/api/examples/sync-members). |

A member added through an external identity has no password. To let them sign in, open the member and create an **access link**. It signs them in once, without a password, and expires after 24 hours.

Send setup and access links privately. Anyone with the link can use it.

## 5. Activate

Check the members' profiles for callsign or name conflicts, then activate the event. Participants now see their setup on the dashboard; see [Participant setup](/participants/). The members list shows who has connected a TAK app.

When the event is over, archive it. It becomes read-only, and event accounts are removed unless you made them permanent.
