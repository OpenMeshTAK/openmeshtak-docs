// Copies the API document and the sample docker-compose.yml from Core into the docs:
//
//   node scripts/sync-core.mjs 0.1.10          a release tag (what the published docs use)
//   node scripts/sync-core.mjs main            the development state on GitHub
//   node scripts/sync-core.mjs ../openmeshtak  a local Core checkout, including unpushed commits
//
// Until a release exists, the docs follow the development state. Both files always come from the
// same source, so the reference and the install guide describe one Core. check-core.mjs then
// verifies the recorded checksums.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repository = "OpenMeshTAK/openmeshtak";
const argument = process.argv[2];

if (argument === undefined) {
  console.error("Usage: node scripts/sync-core.mjs <version | main | path to a Core checkout>");
  process.exit(1);
}

const source = resolveSource(argument);
const manifestUrl = new URL("../docs/public/api/manifest.json", import.meta.url);
const previous = JSON.parse(await readFile(manifestUrl, "utf8"));

const openapi = await source.read("openapi/openapi.json");
const compose = await source.read("docker-compose.yml");

const version = JSON.parse(openapi.toString("utf8")).info?.version;
if (typeof version !== "string" || !/^\d+\.\d+\.\d+$/u.test(version)) {
  throw new Error(`${source.ref} contains no valid OpenAPI version`);
}
if (source.release && source.ref !== `v${version}`) {
  throw new Error(`${source.ref} contains OpenAPI version ${version}`);
}

const openapiFile = `openapi-${version}.json`;
if (previous.openapiFile !== openapiFile) {
  await rm(new URL(`../docs/public/api/${previous.openapiFile}`, import.meta.url), { force: true });
}
await writeFile(new URL(`../docs/public/api/${openapiFile}`, import.meta.url), openapi);
await writeFile(new URL("../docs/public/examples/docker-compose.yml", import.meta.url), compose);
await pinEnvironmentExample(version);

const manifest = {
  coreVersion: version,
  sourceRepository: `https://github.com/${repository}`,
  sourceRef: source.ref,
  release: source.release,
  openapiFile,
  sha256: sha256(openapi),
  composeSha256: sha256(compose),
};
await writeFile(manifestUrl, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Synced OpenAPI ${version} and docker-compose.yml from ${source.ref}.`);

function resolveSource(value) {
  if (/^v?\d+\.\d+\.\d+$/u.test(value)) {
    return fromGitHub(`v${value.replace(/^v/u, "")}`, true);
  }
  if (value === "main") {
    return fromGitHub("main", false);
  }
  const directory = path.resolve(value);
  if (!existsSync(path.join(directory, "openapi", "openapi.json"))) {
    throw new Error(`${directory} is not a Core checkout`);
  }
  const commit = execFileSync("git", ["-C", directory, "rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim();
  return {
    ref: `main@${commit}`,
    release: false,
    read: (file) => readFile(path.join(directory, file)),
  };
}

function fromGitHub(ref, release) {
  return {
    ref,
    release,
    async read(file) {
      const response = await fetch(`https://raw.githubusercontent.com/${repository}/${ref}/${file}`);
      if (!response.ok) {
        throw new Error(`${file} at ${ref}: HTTP ${String(response.status)}`);
      }
      return Buffer.from(await response.arrayBuffer());
    },
  };
}

/** The .env example pins the same version the compose file and reference describe. */
async function pinEnvironmentExample(coreVersion) {
  const url = new URL("../docs/public/examples/openmeshtak.env.example.txt", import.meta.url);
  const text = await readFile(url, "utf8");
  await writeFile(url, text.replace(/^OPENMESHTAK_VERSION=.*$/mu, `OPENMESHTAK_VERSION=${coreVersion}`));
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}
