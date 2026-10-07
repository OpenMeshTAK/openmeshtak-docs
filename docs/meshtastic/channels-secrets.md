# Channels and secrets

## Audiences

A channel can target event groups, event roles, individual members, or any combination of them. A participant receives only channels in their audience.

## Secret channels

Before release, only designated key holders receive a secret channel's PSK. Other participants do not receive the key in profiles, files, QR codes, or Data Packages.

Releasing a channel includes it in future participant files. Existing files are not rewritten. Rotate the PSK after a suspected leak.

Every key reveal, release, and rotation is audited.

## Write-only settings

Passwords, fixed PINs, and similar firmware settings are write-only. OpenMeshTak reports whether they are set but does not return their values.
