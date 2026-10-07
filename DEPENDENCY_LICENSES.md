# Dependency license review

OpenMeshTak documentation accepts dependencies under MIT, BSD-2-Clause, BSD-3-Clause, ISC, Apache-2.0, BlueOak-1.0.0, and Unlicense by default. Dependencies outside that list remain blocked unless they are reviewed and recorded here.

## Reviewed exceptions

| Dependency | Version | License | Use and review outcome |
| --- | --- | --- | --- |
| `@iconify-json/simple-icons` | `1.2.99` | CC0-1.0 | Transitive VitePress package containing public-domain icon data. CC0 permits use, modification, and redistribution without attribution requirements. |
| `lightningcss` and its platform packages | `1.33.0` | MPL-2.0 | Transitive Vite build dependency used to process CSS. OpenMeshTak does not modify or redistribute its MPL-covered source files; generated static-site output is not placed under the MPL by using the tool. |
| `tslib` | `2.8.1` | 0BSD | Transitive Scalar dependency (through `@swc/helpers` and `aria-hidden`) providing TypeScript runtime helpers. 0BSD permits use, modification, and redistribution without attribution requirements. |

These exceptions apply only to the named versions. Updating any of these dependencies must update this review after checking its package metadata and distributed license files. Platform-specific `lightningcss-*` packages are covered only at version `1.33.0` and only as binaries published with `lightningcss`.

The automated license check encodes the same package- and version-specific exceptions. It must not be widened to allow any of these license categories globally.
