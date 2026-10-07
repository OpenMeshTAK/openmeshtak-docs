# Contributing to the documentation

## Edit locally

```sh
pnpm install --frozen-lockfile
pnpm docs:dev
```

Pages live below `docs/`. Navigation and sidebars live in `docs/.vitepress/config.ts`.

Write the useful result first. Prefer a short support statement, command, decision, or warning over a history of how it was discovered. Keep one task per page and explain technical terms when they first appear.

## Before submitting

```sh
pnpm check
```

The check verifies dependency licenses, the pinned OpenAPI artifact, internal links, and the production build.

## Update the API reference

The hosted reference must use a released Core contract, never an arbitrary moving checkout.

1. Check out the intended `OpenMeshTAK/openmeshtak` release tag.
2. Copy its `openapi/openapi.json` to `docs/public/api/openapi-<version>.json`.
3. Update `docs/public/api/manifest.json`, including the SHA-256 checksum.
4. Update the URL and displayed version in `ScalarApiReference.vue` and `docs/api/reference.md`.
5. Run `pnpm openapi:check` and `pnpm check`.

Keep written workflow guides separate from the generated reference. Guides explain goals, permissions, request order, errors, retries, and security. Scalar shows every operation and schema.

## Compatibility claims

Name a TAK, iTAK, or Meshtastic workflow as supported only after its required real-client test passes. Public pages should state the working version and the relevant limitation without publishing private fixtures, personal data, credentials, or long test transcripts.

## Repository boundaries

This repository contains publishable documentation only. Do not copy private workspace planning files or fixtures into it. Substantial runnable integrations belong in `OpenMeshTAK/openmeshtak-examples` and may be linked from a concise guide here.
