// Copies the release artifacts the docs publish from a tagged Core release:
//
//   node scripts/sync-core.mjs 0.1.10
//
// The OpenAPI document and the sample docker-compose.yml always come from the same tag, so the
// reference and the install guide describe one release. check-core.mjs then verifies the pins.
import { createHash } from "node:crypto";
import { readFile, rm, writeFile } from "node:fs/promises";
import process from "node:process";

const repository = "OpenMeshTAK/openmeshtak";
const version = process.argv[2]?.replace(/^v/u, "");

if (version === undefined || !/^\d+\.\d+\.\d+$/u.test(version)) {
  console.error("Usage: node scripts/sync-core.mjs <version>, for example 0.1.10");
  process.exit(1);
}

const tag = `v${version}`;
const manifestUrl = new URL("../docs/public/api/manifest.json", import.meta.url);
const previous = JSON.parse(await readFile(manifestUrl, "utf8"));

const openapi = await download("openapi/openapi.json");
const compose = await download("docker-compose.yml");

const document = JSON.parse(openapi.toString("utf8"));
if (document.info?.version !== version) {
  throw new Error(`${tag} contains OpenAPI version ${document.info?.version ?? "none"}`);
}

const openapiFile = `openapi-${version}.json`;
if (previous.openapiFile !== openapiFile) {
  await rm(new URL(`../docs/public/api/${previous.openapiFile}`, import.meta.url), { force: true });
}
await writeFile(new URL(`../docs/public/api/${openapiFile}`, import.meta.url), openapi);
await writeFile(new URL("../docs/public/examples/docker-compose.yml", import.meta.url), compose);
await pinEnvironmentExample();

const manifest = {
  coreVersion: version,
  sourceTag: tag,
  sourceRepository: `https://github.com/${repository}`,
  openapiFile,
  sha256: sha256(openapi),
  composeSha256: sha256(compose),
};
await writeFile(manifestUrl, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Synced OpenAPI and docker-compose.yml from ${repository}@${tag}.`);

async function download(path) {
  const response = await fetch(`https://raw.githubusercontent.com/${repository}/${tag}/${path}`);
  if (!response.ok) {
    throw new Error(`${path} at ${tag}: HTTP ${String(response.status)}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

/** The .env example pins the same release the compose file and reference describe. */
async function pinEnvironmentExample() {
  const url = new URL("../docs/public/examples/openmeshtak.env.example.txt", import.meta.url);
  const text = await readFile(url, "utf8");
  await writeFile(url, text.replace(/^OPENMESHTAK_VERSION=.*$/mu, `OPENMESHTAK_VERSION=${version}`));
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}
