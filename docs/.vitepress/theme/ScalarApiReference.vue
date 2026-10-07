<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useData, withBase } from "vitepress";

const container = ref<HTMLElement | null>(null);
const { isDark } = useData();
let reference: { destroy: () => void } | null = null;

/**
 * Scalar keeps its own light/dark state and marks <body>, which its global stylesheet then paints
 * for the whole page. Force it to follow the VitePress appearance switch instead.
 */
function configuration() {
  return {
    url: withBase("/api/openapi-0.1.9.json"),
    agent: { disabled: true },
    mcp: { disabled: true },
    // The contract's relative server would resolve to the docs site; show a placeholder instead.
    servers: [{ url: "https://openmeshtak.example.org/api/v1", description: "Your OpenMeshTak installation" }],
    darkMode: isDark.value,
    forceDarkModeState: isDark.value ? ("dark" as const) : ("light" as const),
    hideDarkModeToggle: true,
    documentDownloadType: "direct" as const,
    hideClientButton: true,
    hideTestRequestButton: true,
    hiddenClients: [],
    modelsSectionLabel: "Schemas",
    persistAuth: false,
    showDeveloperTools: "never" as const,
    showOperationId: true,
    telemetry: false,
    withDefaultFonts: false,
  };
}

/** Scalar applies the appearance only when it mounts, so a theme switch mounts it again. */
async function mount(): Promise<void> {
  if (!container.value) {
    return;
  }

  const { createApiReference } = await import("@scalar/api-reference");
  // The page may have been left while the module was loading.
  if (!container.value) {
    return;
  }
  unmount();
  reference = createApiReference(container.value, configuration());
}

function unmount(): void {
  reference?.destroy();
  reference = null;
  document.body.classList.remove("dark-mode", "light-mode");
}

onMounted(mount);
watch(isDark, mount);
onUnmounted(unmount);
</script>

<template>
  <!-- vp-raw keeps the VitePress router away from Scalar's own hash links. -->
  <div ref="container" class="scalar-reference vp-raw" />
</template>
