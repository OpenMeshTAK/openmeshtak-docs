# OpenMeshTak documentation

This repository contains the publishable documentation site for OpenMeshTak. It is built with VitePress 2 and published separately from the product repositories.

Start with [CONTRIBUTING.md](CONTRIBUTING.md) when editing pages, navigation, or the versioned API reference.

## Local development

Requirements:

- Node.js 24 or newer
- pnpm 10.12.4

Install dependencies and start the development server:

```sh
pnpm install --frozen-lockfile
pnpm docs:dev
```

The configured project-site base path is `/openmeshtak-docs/`.

Run the full local check before submitting a change:

```sh
pnpm check
```

The check validates dependency licenses and builds the complete site, including internal-link validation.

The complete API reference is generated in the browser from the released OpenAPI file pinned in `docs/public/api/manifest.json`. It does not make live requests or store credentials.

Repository-specific dependency license reviews are recorded in [DEPENDENCY_LICENSES.md](DEPENDENCY_LICENSES.md).

## AI assistance

See [AI_USAGE.md](AI_USAGE.md) for the repository's review expectations.

## License

Original documentation content is licensed under [CC BY 4.0](LICENSE). Third-party material and code excerpts may have separate attribution and license requirements.
