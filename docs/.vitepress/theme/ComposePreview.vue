<script setup lang="ts">
import { ref } from "vue";
import { withBase } from "vitepress";
import { data } from "./compose.data";

const copied = ref(false);

async function copy() {
  await navigator.clipboard.writeText(data.code);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}
</script>

<template>
  <div class="compose-preview">
    <div class="compose-preview-header">
      <a :href="withBase('/installation/')">docker-compose.yml</a>
      <button type="button" class="compose-preview-copy" @click="copy">
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </div>
    <div class="compose-preview-code vp-code" v-html="data.html" />
  </div>
</template>

<style scoped>
.compose-preview {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-code-block-bg);
  text-align: left;
  overflow: hidden;
}

.compose-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px 8px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

.compose-preview-header a {
  color: var(--vp-c-text-2);
}

.compose-preview-header a:hover {
  color: var(--vp-c-brand-1);
}

.compose-preview-copy {
  padding: 2px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.compose-preview-copy:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-3);
}

.compose-preview-code {
  overflow-x: auto;
}

.compose-preview-code :deep(pre) {
  margin: 0;
  padding: 16px 0;
  background: transparent !important;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.6;
  counter-reset: line;
}

.compose-preview-code :deep(.line) {
  display: inline-block;
  min-width: 100%;
  padding-right: 16px;
}

.compose-preview-code :deep(.line)::before {
  counter-increment: line;
  content: counter(line);
  display: inline-block;
  width: 2.5rem;
  margin-right: 12px;
  text-align: right;
  color: var(--vp-c-text-3);
}
</style>
