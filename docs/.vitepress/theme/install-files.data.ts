import { readFileSync } from "node:fs";
import path from "node:path";
import { codeToHtml } from "shiki";

// The home hero shows the synced sample compose file without its comments and the .env example
// with every value left empty, so a copied .env holds only the reader's own values. Both are
// highlighted at build time so the page ships no highlighter. The install guide keeps the originals.
const composeFile = "../../public/examples/docker-compose.yml";
const environmentFile = "../../public/examples/openmeshtak.env.example.txt";

export interface InstallFile {
  name: string;
  code: string;
  html: string;
}

declare const data: InstallFile[];
export { data };

export default {
  watch: [composeFile, environmentFile],
  // VitePress resolves `watch` relative to this file and passes the matching absolute paths.
  async load(files: string[]): Promise<InstallFile[]> {
    const read = (name: string) => {
      const file = files.find((candidate) => path.basename(candidate) === path.basename(name));
      if (file === undefined) {
        throw new Error(`${name} is missing`);
      }
      return readFileSync(file, "utf8");
    };
    return Promise.all([
      highlighted("docker-compose.yml", "yaml", withoutComments(read(composeFile))),
      highlighted(".env", "dotenv", withoutValues(read(environmentFile))),
    ]);
  },
};

async function highlighted(name: string, lang: string, code: string): Promise<InstallFile> {
  const html = await codeToHtml(code.trimEnd(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
  return { name, code, html };
}

function tidy(lines: string[]): string {
  return lines.join("\n").replace(/\n{3,}/gu, "\n\n").trim().concat("\n");
}

function withoutComments(source: string): string {
  return tidy(source.split(/\r?\n/u).filter((line) => !line.trimStart().startsWith("#")));
}

/** Keeps the explaining comments but no sample value; the save hint is obvious from the tab. */
function withoutValues(source: string): string {
  return tidy(
    source
      .split(/\r?\n/u)
      .filter((line) => !line.startsWith("# Save this file"))
      .map((line) => line.replace(/^([A-Z0-9_]+)=.*$/u, "$1=")),
  );
}
