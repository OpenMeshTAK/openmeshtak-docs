# Contributing to the documentation

## Edit locally

```sh
pnpm install --frozen-lockfile
pnpm docs:dev
```

Pages live below `docs/`. Navigation lives in `docs/.vitepress/config.ts`. The guide has one sidebar in reading order (install, run an event, participants, API, help); VitePress builds the previous/next links from it, so add a new page where a reader would need it next.

Every fact has one home. Link to that page instead of repeating ports, tested versions, error codes or secret-handling rules.

SDK examples are type-checked against an SDK checkout next to this repository (built with `pnpm build` there): run `pnpm sdk:check`. `release.ps1` runs it automatically before publishing the docs. It is not part of `pnpm check` until the SDK is on npm.

Never type a version number into a page. The Core version comes from the manifest as `{{ $coreVersion }}`; the SDK has the same version as Core; tested app and firmware versions live in `docs/.vitepress/versions.ts` and appear as `{{ $versions.atak }}` and so on. After a new real-device test, change the value there once.

Write the useful result first. Prefer a short support statement, command, decision, or warning over a history of how it was discovered. Keep one task per page and explain technical terms when they first appear.

## Before submitting

```sh
pnpm check
```

The check verifies dependency licenses, the pinned OpenAPI artifact, internal page and heading links, and the production build.

## Keep up with Core

Until the next release, the docs describe the current development state of Core and the SDK. The API reference and the sample `docker-compose.yml` are copied together from Core:

```sh
pnpm core:sync ../openmeshtak   # a local Core checkout, including unpushed commits
pnpm core:sync main             # Core main on GitHub
pnpm core:sync 0.1.10           # a release tag, for the published docs
pnpm check
```

The script records the source and checksums in `docs/public/api/manifest.json` and pins the `.env` example to the same version; `pnpm check` fails when a copied file no longer matches. When Core publishes a release, the **Sync Core release** workflow copies it from the tag and opens a pull request. Version numbers in written pages come from the manifest through `{{ $coreVersion }}`.

## Compatibility claims

Name a TAK, iTAK, or Meshtastic workflow as supported only after its required real-client test passes. Public pages should state the working version and the relevant limitation without publishing private fixtures, personal data, credentials, or long test transcripts.

## Repository boundaries

This repository contains publishable documentation only. Do not copy private workspace planning files or fixtures into it. Substantial runnable integrations belong in `OpenMeshTAK/openmeshtak-examples` and may be linked from a concise guide here.
