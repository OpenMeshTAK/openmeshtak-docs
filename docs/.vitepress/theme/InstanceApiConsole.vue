<script setup lang="ts">
import { ref } from "vue";

const installationOrigin = ref("");
const error = ref("");

function openConsole() {
  error.value = "";

  let parsed: URL;

  try {
    parsed = new URL(installationOrigin.value.trim());
  } catch {
    error.value = "Enter a complete URL such as https://tak.example.org.";
    return;
  }

  if (parsed.username || parsed.password) {
    error.value = "Do not put credentials in the URL.";
    return;
  }

  const localHosts = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);
  const secure = parsed.protocol === "https:";
  const localDevelopment = parsed.protocol === "http:" && localHosts.has(parsed.hostname);

  if (!secure && !localDevelopment) {
    error.value = "Use HTTPS. HTTP is accepted only for localhost development.";
    return;
  }

  const consoleUrl = new URL("/api/docs", parsed.origin);
  window.location.assign(consoleUrl.href);
}
</script>

<template>
  <form class="instance-console" @submit.prevent="openConsole">
    <label for="installation-origin">OpenMeshTak installation URL</label>
    <div class="instance-console__controls">
      <input
        id="installation-origin"
        v-model="installationOrigin"
        type="url"
        inputmode="url"
        autocomplete="url"
        autocapitalize="none"
        spellcheck="false"
        placeholder="https://tak.example.org"
      />
      <button type="submit">Open API console</button>
    </div>
    <p v-if="error" class="instance-console__error" role="alert">{{ error }}</p>
  </form>
</template>
