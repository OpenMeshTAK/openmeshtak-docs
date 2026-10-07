import process from "node:process";

const allowedLicenses = new Set([
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "BlueOak-1.0.0",
  "ISC",
  "MIT",
  "Unlicense",
]);

const reviewedExceptions = new Set([
  "@iconify-json/simple-icons@1.2.99:CC0-1.0",
  "lightningcss@1.33.0:MPL-2.0",
  "lightningcss-android-arm64@1.33.0:MPL-2.0",
  "lightningcss-darwin-arm64@1.33.0:MPL-2.0",
  "lightningcss-darwin-x64@1.33.0:MPL-2.0",
  "lightningcss-freebsd-x64@1.33.0:MPL-2.0",
  "lightningcss-linux-arm-gnueabihf@1.33.0:MPL-2.0",
  "lightningcss-linux-arm64-gnu@1.33.0:MPL-2.0",
  "lightningcss-linux-arm64-musl@1.33.0:MPL-2.0",
  "lightningcss-linux-x64-gnu@1.33.0:MPL-2.0",
  "lightningcss-linux-x64-musl@1.33.0:MPL-2.0",
  "lightningcss-win32-arm64-msvc@1.33.0:MPL-2.0",
  "lightningcss-win32-x64-msvc@1.33.0:MPL-2.0",
  "tslib@2.8.1:0BSD",
]);

const input = await readStandardInput();
const report = JSON.parse(input);
const blocked = findBlockedDependencies(report);

if (blocked.length > 0) {
  console.error(`Blocked dependency licenses: ${blocked.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log("Dependency licenses are allowed or explicitly reviewed.");
}

function findBlockedDependencies(licenseReport) {
  const blockedDependencies = [];

  for (const [expression, value] of Object.entries(licenseReport)) {
    if (isAllowed(expression)) {
      continue;
    }

    const dependencies = Array.isArray(value) ? value : [value];

    for (const dependency of dependencies) {
      for (const version of dependency.versions ?? ["unknown-version"]) {
        const key = `${dependency.name}@${version}:${expression}`;

        if (!reviewedExceptions.has(key)) {
          blockedDependencies.push(key);
        }
      }
    }
  }

  return blockedDependencies;
}

function isAllowed(expression) {
  const normalized = expression.replaceAll(/[()]/g, "").trim();

  return normalized
    .split(/\s+AND\s+/u)
    .every((requiredExpression) =>
      requiredExpression
        .split(/\s+OR\s+/u)
        .some((alternative) => allowedLicenses.has(alternative.trim())),
    );
}

async function readStandardInput() {
  const chunks = [];

  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}
