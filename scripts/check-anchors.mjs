// VitePress reports links to missing pages but not to missing headings. This check reads the built
// site and fails when an internal link points at an id that the target page does not contain.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const distDirectory = path.resolve("docs/.vitepress/dist");
const base = "/openmeshtak-docs/";

const pages = new Map();

for (const file of await htmlFiles(distDirectory)) {
  pages.set(routeOf(file), await readFile(file, "utf8"));
}

const broken = [];

for (const [route, html] of pages) {
  for (const href of html.matchAll(/<a\b[^>]*\shref="([^"]*#[^"]+)"/gu)) {
    const target = resolve(route, decodeEntities(href[1]));
    if (target === null || target.hash.startsWith("tag/") || target.hash.startsWith("description/")) {
      continue;
    }
    const targetHtml = pages.get(target.route);
    if (targetHtml === undefined || !hasId(targetHtml, target.hash)) {
      broken.push(`${route} -> ${target.route}#${target.hash}`);
    }
  }
}

if (broken.length > 0) {
  console.error(`Broken heading links:\n${broken.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Heading links verified on ${String(pages.size)} pages.`);
}

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => path.join(entry.parentPath, entry.name));
}

/** `installation/tak-ports.html` and `installation/index.html` become the routes VitePress links to. */
function routeOf(file) {
  const relative = path.relative(distDirectory, file).replaceAll(path.sep, "/");
  return relative.replace(/(^|\/)index\.html$/u, "$1").replace(/\.html$/u, "");
}

/** Returns null for external links and links whose page is not part of the built site. */
function resolve(fromRoute, href) {
  const [pathPart, hash] = href.split("#", 2);
  if (hash === "" || /^[a-z]+:/iu.test(pathPart)) {
    return null;
  }
  if (pathPart === "") {
    return { route: fromRoute, hash: decodeURIComponent(hash) };
  }
  if (!pathPart.startsWith(base)) {
    return null;
  }
  const route = pathPart.slice(base.length).replace(/\.html$/u, "");
  return pages.has(route) ? { route, hash: decodeURIComponent(hash) } : { route, hash };
}

function hasId(html, id) {
  return html.includes(`id="${id}"`);
}

function decodeEntities(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"');
}
