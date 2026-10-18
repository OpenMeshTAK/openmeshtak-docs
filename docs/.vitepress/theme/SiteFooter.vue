<script setup lang="ts">
import { withBase } from "vitepress";
import manifest from "../../public/api/manifest.json";

const github = "https://github.com/OpenMeshTAK";

// Only repositories that exist publicly; add the CLI and examples once they are published.
const columns = [
  {
    title: "Guides",
    links: [
      { text: "Install", link: "/installation/" },
      { text: "Run an event", link: "/events/" },
      { text: "Participants", link: "/participants/" },
      { text: "Help", link: "/troubleshooting/" },
    ],
  },
  {
    title: "Developers",
    links: [
      { text: "API basics", link: "/api/" },
      { text: "API examples", link: "/api/examples/" },
      { text: "SDK", link: "/sdk/" },
      { text: "API reference", link: "/api/reference" },
    ],
  },
  {
    title: "Source code",
    links: [
      { text: "Core", link: `${github}/openmeshtak` },
      { text: "Web app", link: `${github}/openmeshtak-web` },
      { text: "SDK", link: `${github}/openmeshtak-sdk` },
      { text: "Documentation", link: `${github}/openmeshtak-docs` },
    ],
  },
];

function href(link: string) {
  return link.startsWith("https://") ? link : withBase(link);
}
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer-main">
      <div class="site-footer-brand">
        <a class="site-footer-name" :href="withBase('/')">
          <img :src="withBase('/logo-mark.svg')" alt="" />
          OpenMeshTak
        </a>
        <p>Self-hosted TAK and Meshtastic provisioning for events.</p>
        <p class="site-footer-version">Documentation for OpenMeshTak {{ manifest.coreVersion }}</p>
      </div>
      <nav v-for="column in columns" :key="column.title" class="site-footer-column">
        <h2>{{ column.title }}</h2>
        <a v-for="entry in column.links" :key="entry.link" :href="href(entry.link)">{{ entry.text }}</a>
      </nav>
    </div>
    <div class="site-footer-bottom">
      <a :href="github">Open source on GitHub</a>
      <a :href="`${github}/openmeshtak/issues`">Report an issue</a>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  padding: 48px 24px 24px;
  font-size: 14px;
}

.site-footer-main,
.site-footer-bottom {
  margin: 0 auto;
  max-width: 72rem;
}

.site-footer-main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 24px;
}

.site-footer-brand {
  grid-column: 1 / -1;
}

.site-footer-name {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--vp-c-text-1);
  font-size: 18px;
  font-weight: 600;
}

.site-footer-name img {
  width: 28px;
  height: 28px;
}

.site-footer-brand p {
  margin-top: 12px;
  max-width: 22rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.site-footer-brand .site-footer-version {
  margin-top: 8px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.site-footer-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.site-footer-column h2 {
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
}

.site-footer a {
  color: var(--vp-c-text-2);
  transition: color 0.2s;
}

.site-footer a:hover {
  color: var(--vp-c-brand-1);
}

.site-footer .site-footer-name:hover {
  color: var(--vp-c-text-1);
}

.site-footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
}

@media (min-width: 768px) {
  .site-footer {
    padding: 64px 48px 32px;
  }

  .site-footer-main {
    grid-template-columns: 2fr repeat(3, 1fr);
  }

  .site-footer-brand {
    grid-column: auto;
  }
}

/* Same column as the home hero and feature cards. */
@media (min-width: 960px) {
  .site-footer {
    padding-right: 4rem;
    padding-left: 4rem;
  }

  .site-footer-main,
  .site-footer-bottom {
    max-width: 80vw;
  }
}
</style>
