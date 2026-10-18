import { readFileSync } from "node:fs";
import { codeToHtml } from "shiki";

// The home page shows the synced sample compose file without its comments, highlighted at build
// time so the page ships no highlighter. The install guide keeps the commented original.
const composeFile = "../../public/examples/docker-compose.yml";

export interface ComposePreview {
  code: string;
  html: string;
}

declare const data: ComposePreview;
export { data };

export default {
  watch: [composeFile],
  // VitePress resolves `watch` relative to this file and passes the matching absolute paths.
  async load([file]: string[]): Promise<ComposePreview> {
    const code = withoutComments(readFileSync(file, "utf8"));
    const html = await codeToHtml(code.trimEnd(), {
      lang: "yaml",
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
    return { code, html };
  },
};

function withoutComments(source: string): string {
  return source
    .split(/\r?\n/u)
    .filter((line) => !line.trimStart().startsWith("#"))
    .join("\n")
    .replace(/\n{3,}/gu, "\n\n")
    .trim()
    .concat("\n");
}
