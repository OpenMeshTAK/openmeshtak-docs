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
      { text: "Home", link: "/" },
      {
        text: "Guide",
        items: [
          { text: "Getting started", link: "/getting-started/" },
          { text: "Installation", link: "/installation/" },
          { text: "Administration", link: "/administration/" },
          { text: "TAK", link: "/tak/" },
          { text: "Meshtastic", link: "/meshtastic/" },
          { text: "Edit these docs", link: "/contributing/" },
          { text: "Security", link: "/security/" },
          { text: "Troubleshooting", link: "/troubleshooting/" },
        ],
      },
      {
        text: "API",
        items: [
          { text: "API guide", link: "/api/" },
          { text: "Examples", link: "/api/examples/" },
          { text: "Complete reference", link: "/api/reference" },
          { text: "SDK reference", link: "/sdk/" },
        ],
      },
      { text: "Compatibility", link: "/compatibility/" },
    ],
    sidebar: {
      "/getting-started/": [
        {
          text: "Introduction",
          items: [
            { text: "Getting started", link: "/getting-started/" },
            { text: "Core concepts", link: "/getting-started/concepts" },
            { text: "Compatibility", link: "/compatibility/" },
          ],
        },
      ],
      "/installation/": [
        {
          text: "Installation",
          items: [
            { text: "Overview", link: "/installation/" },
            { text: "Docker Compose", link: "/installation/docker" },
            { text: "Reverse proxy and TLS", link: "/installation/reverse-proxy" },
            { text: "TAK ports", link: "/installation/tak-ports" },
            { text: "Backup and upgrade", link: "/installation/backup-upgrade" },
          ],
        },
      ],
      "/administration/": [
        {
          text: "Administration",
          items: [
            { text: "First administrator", link: "/administration/" },
            { text: "Events and participants", link: "/administration/events-participants" },
            { text: "Roles, groups and profiles", link: "/administration/roles-groups-profiles" },
          ],
        },
      ],
      "/tak/": [
        {
          text: "TAK",
          items: [
            { text: "Overview", link: "/tak/" },
            { text: "ATAK", link: "/tak/atak" },
            { text: "iTAK", link: "/tak/itak" },
            { text: "Data Packages", link: "/tak/data-packages" },
          ],
        },
      ],
      "/meshtastic/": [
        {
          text: "Meshtastic",
          items: [
            { text: "Configuration", link: "/meshtastic/" },
            { text: "Channels and secrets", link: "/meshtastic/channels-secrets" },
          ],
        },
      ],
      "/api/": [
        {
          text: "API guide",
          items: [
            { text: "Overview", link: "/api/" },
            { text: "Authentication", link: "/api/authentication" },
            { text: "Conventions and errors", link: "/api/conventions" },
            { text: "Complete reference", link: "/api/reference" },
            { text: "Instance console", link: "/api/instance-console" },
          ],
        },
        {
          text: "Examples",
          collapsed: false,
          items: [
            { text: "Overview", link: "/api/examples/" },
            { text: "Create an event", link: "/api/examples/create-event" },
            { text: "Create groups and roles", link: "/api/examples/groups-roles" },
            { text: "Build a Discord bot", link: "/api/examples/discord-bot" },
            { text: "Synchronize external members", link: "/api/examples/sync-members" },
            { text: "Get a one-time claim link", link: "/api/examples/participant-claims" },
            { text: "Read resolved profiles", link: "/api/examples/resolved-profiles" },
            { text: "Configure Meshtastic", link: "/api/examples/configure-meshtastic" },
            { text: "Generate artifacts", link: "/api/examples/provisioning-artifacts" },
            { text: "Use Data Packages", link: "/api/examples/data-packages" },
          ],
        },
      ],
      "/sdk/": [
        {
          text: "SDK",
          items: [{ text: "SDK reference", link: "/sdk/" }],
        },
      ],
      "/security/": [
        { text: "Security", items: [{ text: "Security guidance", link: "/security/" }] },
      ],
      "/troubleshooting/": [
        { text: "Help", items: [{ text: "Troubleshooting", link: "/troubleshooting/" }] },
      ],
    },
    search: { provider: "local" },
    socialLinks: [{ icon: "github", link: "https://github.com/OpenMeshTAK" }],
    footer: { message: "OpenMeshTak documentation is licensed under CC BY 4.0." },
    outline: { level: [2, 3] },
  },
});
