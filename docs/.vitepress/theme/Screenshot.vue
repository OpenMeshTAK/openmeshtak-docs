<script setup lang="ts">
import { withBase } from "vitepress";

// Every screenshot exists as `<name>-light.webp` and `<name>-dark.webp`; CSS shows the one that
// matches the docs theme, so switching the theme swaps the picture too.
const props = defineProps<{ name: string; alt: string; side?: boolean }>();
const source = (scheme: "light" | "dark") => withBase(`/screenshots/${props.name}-${scheme}.webp`);
</script>

<template>
  <img class="screenshot screenshot-light" :class="{ 'screenshot-right': side }" :src="source('light')" :alt="alt" loading="lazy" />
  <img class="screenshot screenshot-dark" :class="{ 'screenshot-right': side }" :src="source('dark')" :alt="alt" loading="lazy" />
</template>
