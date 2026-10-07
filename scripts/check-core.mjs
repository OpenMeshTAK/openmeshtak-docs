import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const manifestUrl = new URL("../docs/public/api/manifest.json", import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));
const openapiUrl = new URL(`../docs/public/api/${manifest.openapiFile}`, import.meta.url);
const openapiBytes = await readFile(openapiUrl);
const openapi = JSON.parse(openapiBytes.toString("utf8"));
const sha256 = createHash("sha256").update(openapiBytes).digest("hex");

const problems = [];

if (openapi.openapi !== "3.0.0") {
  problems.push(`expected OpenAPI 3.0.0, received ${openapi.openapi ?? "no version"}`);
}

if (openapi.info?.version !== manifest.coreVersion) {
  problems.push(
    `manifest pins Core ${manifest.coreVersion}, but the API document identifies ${openapi.info?.version ?? "no version"}`,
  );
}

if (manifest.release && manifest.sourceRef !== `v${manifest.coreVersion}`) {
  problems.push(`release ${manifest.sourceRef} does not match Core ${manifest.coreVersion}`);
}

if (sha256 !== manifest.sha256) {
  problems.push(`OpenAPI SHA-256 is ${sha256}, expected ${manifest.sha256}`);
}

// The install guide embeds this file; it must come from the same Core source as the API document.
const composeBytes = await readFile(new URL("../docs/public/examples/docker-compose.yml", import.meta.url));
if (createHash("sha256").update(composeBytes).digest("hex") !== manifest.composeSha256) {
  problems.push(`docker-compose.yml differs from ${manifest.sourceRef}; run node scripts/sync-core.mjs again`);
}

const environmentExample = await readFile(new URL("../docs/public/examples/openmeshtak.env.example.txt", import.meta.url), "utf8");
if (!environmentExample.includes(`OPENMESHTAK_VERSION=${manifest.coreVersion}
`)) {
  problems.push(`the .env example does not pin OPENMESHTAK_VERSION=${manifest.coreVersion}`);
}

if (Object.keys(openapi.paths ?? {}).length === 0) {
  problems.push("OpenAPI document contains no paths");
}

if (problems.length > 0) {
  for (const problem of problems) {
    console.error(`Core artifact check failed: ${problem}`);
  }

  process.exitCode = 1;
} else {
  console.log(
    `Core ${openapi.info.version} from ${manifest.sourceRef} verified (${Object.keys(openapi.paths).length} paths, compose included).`,
  );
}
