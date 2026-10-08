import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/openmeshtak-docs/",
  title: "OpenMeshTak",
  description: "Documentation for OpenMeshTak",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/openmeshtak-docs/logo.svg" }],
  ],
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: { src: "/logo.svg", alt: "OpenMeshTak" },
    nav: [
      { text: "Install", link: "/installation/" },
      { text: "Run an event", link: "/events/" },
      { text: "Participants", link: "/participants/" },
      { text: "API", link: "/api/" },
      { text: "SDK", link: "/sdk/" },
      { text: "API reference", link: "/api/reference" },
    ],
    // One sidebar in reading order, so the previous/next links lead through the whole guide.
    sidebar: [
      {
        text: "Install",
        items: [
          { text: "Install with Docker", link: "/installation/" },
          { text: "Reverse proxy and TLS", link: "/installation/reverse-proxy" },
          { text: "TAK ports", link: "/installation/tak-ports" },
          { text: "Configure the installation", link: "/installation/settings" },
          { text: "Backup and upgrade", link: "/installation/backup-upgrade" },
        ],
      },
      {
        text: "Run an event",
        items: [
          { text: "How an event works", link: "/events/" },
          { text: "Set up an event", link: "/events/setup" },
          { text: "Roles and groups", link: "/events/roles-groups" },
          { text: "Meshtastic", link: "/events/meshtastic" },
          { text: "Map data", link: "/events/mission-data" },
        ],
      },
      {
        text: "Participants",
        items: [
          { text: "Participant setup", link: "/participants/" },
          { text: "TAK apps", link: "/participants/tak-apps" },
        ],
      },
      {
        text: "API",
        items: [
          { text: "API basics", link: "/api/" },
          {
            text: "Examples",
            link: "/api/examples/",
            collapsed: true,
            items: [
              { text: "Create an event", link: "/api/examples/create-event" },
              { text: "Create groups and roles", link: "/api/examples/groups-roles" },
              { text: "Synchronize external members", link: "/api/examples/sync-members" },
              { text: "Use the API from Discord", link: "/api/examples/discord-bot" },
              { text: "Create an access link", link: "/api/examples/participant-claims" },
              { text: "Read a participant's profile", link: "/api/examples/resolved-profiles" },
              { text: "Download participant files", link: "/api/examples/provisioning-artifacts" },
              { text: "Configure Meshtastic", link: "/api/examples/configure-meshtastic" },
              { text: "Work with Data Packages", link: "/api/examples/data-packages" },
            ],
          },
          {
            text: "SDK",
            link: "/sdk/",
            collapsed: true,
            items: [
              { text: "SDK basics", link: "/sdk/" },
              { text: "SDK methods", link: "/sdk/methods" },
            ],
          },
          { text: "API reference", link: "/api/reference" },
        ],
      },
      {
        text: "Help",
        items: [{ text: "Troubleshooting", link: "/troubleshooting/" }],
      },
    ],
    search: { provider: "local" },
    socialLinks: [{ icon: "github", link: "https://github.com/OpenMeshTAK" }],
    footer: { message: "OpenMeshTak documentation is licensed under CC BY 4.0." },
    outline: { level: [2, 3] },
    lastUpdated: { text: "Last updated", formatOptions: { dateStyle: "medium" } },
  },
});
