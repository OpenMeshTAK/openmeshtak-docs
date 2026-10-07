# Contributing to the documentation

## Edit locally

```sh
pnpm install --frozen-lockfile
pnpm docs:dev
```

Pages live below `docs/`. Navigation lives in `docs/.vitepress/config.ts`. The guide has one sidebar in reading order (install, run an event, participants, API, help); VitePress builds the previous/next links from it, so add a new page where a reader would need it next.

Every fact has one home. Link to that page instead of repeating ports, tested versions, error codes or secret-handling rules.

Never type a version number into a page. The Core version comes from the manifest as `{{ $coreVersion }}`; tested app and firmware versions and the SDK version live in `docs/.vitepress/versions.ts` and appear as `{{ $versions.atak }}` and so on. After a new real-device test, change the value there once.

Write the useful result first. Prefer a short support statement, command, decision, or warning over a history of how it was discovered. Keep one task per page and explain technical terms when they first appear.

## Before submitting

```sh
pnpm check
```

The check verifies dependency licenses, the pinned OpenAPI artifact, internal page and heading links, and the production build.

## Update to a new Core release

The API reference and the sample `docker-compose.yml` in the install guide come from a released Core tag, never from a moving checkout. Both are copied from the same tag:

```sh
pnpm core:sync 0.1.10
pnpm check
```

The script downloads `openapi/openapi.json` and `docker-compose.yml` from `OpenMeshTAK/openmeshtak` at `v0.1.10`, pins the `.env` example to that version and records checksums in `docs/public/api/manifest.json`. `pnpm check` fails when a copied file no longer matches. The **Sync Core release** workflow does the same when a new Core release appears and opens a pull request. Version numbers in written pages come from the manifest through `{{ $coreVersion }}`.

Keep written workflow guides separate from the generated reference. Guides explain goals, permissions, request order, errors, retries, and security. Scalar shows every operation and schema.

## Compatibility claims

Name a TAK, iTAK, or Meshtastic workflow as supported only after its required real-client test passes. Public pages should state the working version and the relevant limitation without publishing private fixtures, personal data, credentials, or long test transcripts.

## Repository boundaries

This repository contains publishable documentation only. Do not copy private workspace planning files or fixtures into it. Substantial runnable integrations belong in `OpenMeshTAK/openmeshtak-examples` and may be linked from a concise guide here.
