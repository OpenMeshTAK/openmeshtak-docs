# Events and participants

## Create an event

Choose a name, unique slug, and IANA time zone such as `Europe/Berlin`. Start and end times describe the schedule but do not activate or archive the event automatically.

## Add roles and groups

Every participant needs one event role and one event group. Use stable slugs because API integrations refer to them.

## Add participants

You can:

- add an existing user;
- create a new event account and deliver its setup link; or
- synchronize an external member through the API.

External synchronization does not create a login. Create a participant claim separately when the person needs Web access.

## Activate

Activation validates the event and publishes its first configuration revision. Active events can generate participant files and accept TAK connections.

Archiving makes an event read-only. Event accounts are removed unless they were made permanent or still belong to another active or draft event.
