// Type-checks every TypeScript example in the docs against an SDK checkout:
//
//   node scripts/check-sdk-snippets.mjs [path to openmeshtak-sdk, default ../openmeshtak-sdk]
//
// Each ```ts block becomes its own module. Variables the examples take for granted, such as
// `client` or `eventId`, are declared unless the block defines them itself. The SDK is not on npm
// yet, so this check runs locally and from release.ps1 rather than in the docs CI.
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

const sdk = path.resolve(process.argv[2] ?? "../openmeshtak-sdk").replaceAll("\\", "/");
const tsc = path.join(sdk, "node_modules", "typescript", "bin", "tsc");
for (const required of [`${sdk}/dist/index.d.ts`, tsc]) {
  if (!existsSync(required)) {
    throw new Error(`${required} is missing; run pnpm install and pnpm build in the SDK first.`);
  }
}

const assumed = {
  client: "OpenMeshTakClient",
  eventId: "string",
  memberId: "string",
  discordUserId: "string",
};

const docs = path.resolve("docs");
const snippets = markdownFiles(docs).flatMap((file) => tsBlocks(file));
const directory = mkdtempSync(path.join(tmpdir(), "openmeshtak-sdk-snippets-"));

try {
  const files = snippets.map((snippet, index) => {
    const file = path.join(directory, `snippet-${String(index)}.mts`);
    writeFileSync(file, moduleFor(snippet));
    return file;
  });

  try {
    execFileSync(
      process.execPath,
      [tsc, "--noEmit", "--strict", "--target", "es2022", "--module", "nodenext", "--moduleResolution", "nodenext",
        "--skipLibCheck", "--types", "node", "--typeRoots", `${sdk}/node_modules/@types`, ...files],
      { encoding: "utf8", stdio: "pipe" },
    );
  } catch (error) {
    console.error(explain(String(error.stdout ?? error), files));
    process.exit(1);
  }
  console.log(`${String(snippets.length)} SDK examples type-check against ${sdk}.`);
} finally {
  rmSync(directory, { recursive: true, force: true });
}

function markdownFiles(folder) {
  return readdirSync(folder, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && !entry.parentPath.includes(".vitepress"))
    .map((entry) => path.join(entry.parentPath, entry.name));
}

function tsBlocks(file) {
  const text = readFileSync(file, "utf8");
  return [...text.matchAll(/^```ts(?: \[[^\]]*\])?\n([\s\S]*?)^```$/gmu)].map((match) => ({
    source: path.relative(docs, file).replaceAll("\\", "/"),
    line: text.slice(0, match.index).split("\n").length,
    code: match[1],
  }));
}

function moduleFor(snippet) {
  const code = snippet.code
    .replaceAll('"@openmeshtak/sdk/generated"', `"${sdk}/dist/generated/schema.js"`)
    .replaceAll('"@openmeshtak/sdk"', `"${sdk}/dist/index.js"`);
  const declarations = Object.entries(assumed)
    .filter(([name]) => !new RegExp(`\\b(?:const|let)\\s+${name}\\b`, "u").test(code))
    .map(([name, type]) => `declare const ${name}: ${type};`);
  return [
    `// ${snippet.source}:${String(snippet.line)}`,
    `import type { OpenMeshTakClient } from "${sdk}/dist/index.js";`,
    ...declarations,
    code,
    "export {};",
  ].join("\n");
}

/** Points each compiler error at the Markdown file and line the example came from. */
function explain(output, files) {
  return output.replace(/^(.*snippet-(\d+)\.mts)\((\d+),\d+\)/gmu, (match, file, index) => {
    const snippet = snippets[Number(index)];
    return `${snippet.source} (example starting at line ${String(snippet.line)})`;
  }) + `\n${String(files.length)} examples checked.`;
}
