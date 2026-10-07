---
layout: home

hero:
  name: OpenMeshTak
  text: Self-hosted TAK and Meshtastic provisioning
  tagline: Set up an event once. Every participant gets their own TAK connection, radio profile and maps.
  image:
    src: /logo.svg
    alt: OpenMeshTak
  actions:
    - theme: brand
      text: Install
      link: /installation/
    - theme: alt
      text: Run an event
      link: /events/
    - theme: alt
      text: Use the API
      link: /api/

features:
  - title: One container
    details: Web app, API and a built-in TAK server with enrollment, Data Packages and live CoT. Self-hosted with Docker Compose.
    link: /installation/
    linkText: Installation
  - title: Events, roles and groups
    details: Callsigns, TAK teams and radio names follow from the participant's role and group, not from hand-written lists.
    link: /events/setup
    linkText: Set up an event
  - title: ATAK and iTAK
    details: Participants connect with a QR code, a connection package or their login, over the internet or over the Meshtastic radio.
    link: /participants/tak-apps
    linkText: Connect TAK apps
  - title: Meshtastic radios
    details: Per-participant .cfg files with names, channels and keys. Secret channels reach only their key holders.
    link: /events/meshtastic
    linkText: Configure radios
  - title: Mission data
    details: Edit map content, publish it as Data Packages and deliver updates to the TAK apps automatically.
    link: /events/mission-data
    linkText: Data Packages
  - title: Automation
    details: Everything in the Web app is available through a versioned REST API, for example to add members from a Discord bot.
    link: /api/examples/
    linkText: API examples
---
