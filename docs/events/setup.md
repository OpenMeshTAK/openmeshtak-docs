# Set up an event

This page walks through one event from creation to activation. Each step happens in the Web app under **Events**.

## 1. Create the event

Choose a name, a short slug such as `lightsim-2027`, and the time zone where the event takes place. Integrations refer to the event by its slug, so keep it stable.

## 2. Add roles and groups

Every member needs one role and one group, so create them first. See [Roles and groups](/events/roles-groups).

## 3. Choose how participants connect TAK

Under the event's TAK settings, pick one:

| Option | Use it when |
| --- | --- |
| **OpenMeshTak TAK server** | Participants have internet access. Their apps connect to the built-in TAK server. |
| **Meshtastic app local TAK server** | TAK should travel over the radio mesh. ATAK or iTAK talks to the Meshtastic app on the same phone. |
| **No TAK guidance** | Participants connect TAK some other way. |

The participant's dashboard shows matching instructions.

## 4. Set up radios and map data

- [Meshtastic](/events/meshtastic): firmware, radio settings and channels.
- [Map data](/events/mission-data): Data Packages for ATAK and iTAK.

Both are optional. Skip what your event does not use.

## 5. Add members

Open the event's members and choose **Add member**:

| Option | What happens |
| --- | --- |
| **New person** | Creates an account and shows a one-time **setup link**. The person opens it and chooses a password. |
| **Existing user** | Adds someone who already has an account. |
| **External identity** | Adds someone known from another system, such as a Discord ID. Usually done by an [integration](/api/examples/sync-members). |

A member added through an external identity has no password. To let them sign in, open the member and create an **access link**. It signs them in once, without a password, and expires after 24 hours.

Send setup and access links privately. Anyone with the link can use it.

## 6. Activate

Check the members' profiles for callsign or name conflicts, then activate the event. Participants now see their setup on the dashboard; see [Participant setup](/participants/).

When the event is over, archive it. It becomes read-only, and event accounts are removed unless you made them permanent.
