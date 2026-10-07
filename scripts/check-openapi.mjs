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

if (manifest.sourceTag !== `v${manifest.coreVersion}`) {
  problems.push(`source tag ${manifest.sourceTag} does not match Core ${manifest.coreVersion}`);
}

if (sha256 !== manifest.sha256) {
  problems.push(`OpenAPI SHA-256 is ${sha256}, expected ${manifest.sha256}`);
}

if (Object.keys(openapi.paths ?? {}).length === 0) {
  problems.push("OpenAPI document contains no paths");
}

if (problems.length > 0) {
  for (const problem of problems) {
    console.error(`OpenAPI check failed: ${problem}`);
  }

  process.exitCode = 1;
} else {
  console.log(
    `OpenAPI ${openapi.info.version} verified (${Object.keys(openapi.paths).length} paths, SHA-256 ${sha256}).`,
  );
}
