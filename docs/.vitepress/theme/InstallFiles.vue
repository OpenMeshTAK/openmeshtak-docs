<script setup lang="ts">
import { computed, ref } from "vue";
import { withBase } from "vitepress";
import { data as files } from "./install-files.data";

const selected = ref(0);
const file = computed(() => files[selected.value]!);
const copied = ref(false);

async function copy() {
  await navigator.clipboard.writeText(file.value.code);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}
</script>

<template>
  <div class="install-files">
    <div class="install-files-header">
      <span class="install-files-dots" aria-hidden="true"><i /><i /><i /></span>
      <div class="install-files-tabs" role="tablist">
        <button
          v-for="(entry, index) in files"
          :key="entry.name"
          type="button"
          role="tab"
          :aria-selected="index === selected"
          :class="{ active: index === selected }"
          @click="selected = index"
        >
          {{ entry.name }}
        </button>
      </div>
      <button type="button" class="install-files-copy" @click="copy">
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </div>
    <div class="install-files-code vp-code" role="tabpanel" v-html="file.html" />
    <div class="install-files-footer">
      <code><span>$</span> docker compose up -d</code>
      <a :href="withBase('/installation/')">Installation guide</a>
    </div>
  </div>
</template>

<style scoped>
.install-files {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-code-block-bg);
  text-align: left;
  overflow: hidden;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

.install-files-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px 0 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.install-files-dots {
  display: flex;
  gap: 6px;
}

.install-files-dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff5f57;
}

.install-files-dots i:nth-child(2) {
  background: #febc2e;
}

.install-files-dots i:nth-child(3) {
  background: #28c840;
}

/* On phones the tab names need the room. */
@media (max-width: 480px) {
  .install-files-dots {
    display: none;
  }
}

.install-files-tabs {
  display: flex;
  flex: 1;
  gap: 4px;
}

.install-files-tabs button {
  padding: 10px 8px;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  color: var(--vp-c-text-2);
}

.install-files-tabs button:hover {
  color: var(--vp-c-text-1);
}

.install-files-tabs button.active {
  border-bottom-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.install-files-copy {
  padding: 2px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.install-files-copy:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-3);
}

.install-files-code :deep(pre) {
  margin: 0;
  padding: 16px 0;
  background: transparent !important;
  font-family: var(--vp-font-family-mono);
  line-height: 1.6;
  counter-reset: line;
}

/* Long lines wrap behind the line number instead of scrolling sideways. */
.install-files-code :deep(.line) {
  position: relative;
  display: inline-block;
  width: 100%;
  min-height: 1.6em;
  padding: 0 16px 0 calc(2.5rem + 12px);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.install-files-code :deep(.line)::before {
  counter-increment: line;
  content: counter(line);
  position: absolute;
  left: 0;
  width: 2.5rem;
  text-align: right;
  color: var(--vp-c-text-3);
}

.install-files-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  padding: 10px 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.install-files-footer code {
  color: var(--vp-c-text-1);
}

.install-files-footer code span {
  color: var(--vp-c-text-3);
  user-select: none;
}

.install-files-footer a {
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-base);
  font-weight: 500;
}
</style>
