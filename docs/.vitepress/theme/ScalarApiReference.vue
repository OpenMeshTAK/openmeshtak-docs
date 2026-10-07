<script setup lang="ts">
import { onMounted, ref } from "vue";
import { withBase } from "vitepress";

const container = ref<HTMLElement | null>(null);

onMounted(async () => {
  if (!container.value) {
    return;
  }

  const { createApiReference } = await import("@scalar/api-reference");

  createApiReference(container.value, {
    url: withBase("/api/openapi-0.1.9.json"),
    agent: { disabled: true },
    documentDownloadType: "direct",
    hideClientButton: true,
    hideTestRequestButton: true,
    hiddenClients: [],
    modelsSectionLabel: "Schemas",
    persistAuth: false,
    showDeveloperTools: "never",
    showOperationId: true,
    telemetry: false,
    withDefaultFonts: false,
  });
});
</script>

<template>
  <div ref="container" class="scalar-reference" />
</template>
