// Type-checks every TypeScript example in the docs against the SDK:
//
//   node scripts/check-sdk-snippets.mjs                 # the @openmeshtak/sdk devDependency
//   node scripts/check-sdk-snippets.mjs ../openmeshtak-sdk   # a built SDK checkout before its release
//
// Each ```ts block becomes its own module. Variables the examples take for granted, such as
// `client` or `eventId`, are declared unless the block defines them itself.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";

const checkout = process.argv[2] ? path.resolve(process.argv[2]).replaceAll("\\", "/") : undefined;
if (checkout && !existsSync(`${checkout}/dist/index.d.ts`)) {
  throw new Error(`${checkout}/dist/index.d.ts is missing; run pnpm install and pnpm build in the SDK first.`);
}
const sdkName = checkout ?? `@openmeshtak/sdk ${installedSdkVersion()}`;
const tsc = createRequire(import.meta.url).resolve("typescript/bin/tsc");

const assumed = {
  client: "OpenMeshTakClient",
  eventId: "string",
  memberId: "string",
  discordUserId: "string",
};

const docs = path.resolve("docs");
const snippets = markdownFiles(docs).flatMap((file) => tsBlocks(file));
// Inside node_modules so the examples resolve the installed SDK and Node types like a reader's project.
const directory = path.resolve("node_modules/.cache/sdk-snippets");
rmSync(directory, { recursive: true, force: true });
mkdirSync(directory, { recursive: true });

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
        "--skipLibCheck", "--types", "node", ...files],
      { encoding: "utf8", stdio: "pipe" },
    );
  } catch (error) {
    console.error(explain(String(error.stdout ?? error), files));
    process.exit(1);
  }
  console.log(`${String(snippets.length)} SDK examples type-check against ${sdkName}.`);
} finally {
  rmSync(directory, { recursive: true, force: true });
}

function installedSdkVersion() {
  return JSON.parse(readFileSync("node_modules/@openmeshtak/sdk/package.json", "utf8")).version;
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
  const declarations = Object.entries(assumed)
    .filter(([name]) => !new RegExp(`\\b(?:const|let)\\s+${name}\\b`, "u").test(snippet.code))
    .map(([name, type]) => `declare const ${name}: ${type};`);
  const code = [
    `// ${snippet.source}:${String(snippet.line)}`,
    'import type { OpenMeshTakClient } from "@openmeshtak/sdk";',
    ...declarations,
    snippet.code,
    "export {};",
  ].join("\n");
  if (!checkout) {
    return code;
  }
  return code
    .replaceAll('"@openmeshtak/sdk/generated"', `"${checkout}/dist/generated/schema.js"`)
    .replaceAll('"@openmeshtak/sdk"', `"${checkout}/dist/index.js"`);
}

/** Points each compiler error at the Markdown file and line the example came from. */
function explain(output, files) {
  return output.replace(/^(.*snippet-(\d+)\.mts)\((\d+),\d+\)/gmu, (match, file, index) => {
    const snippet = snippets[Number(index)];
    return `${snippet.source} (example starting at line ${String(snippet.line)})`;
  }) + `\n${String(files.length)} examples checked.`;
}
