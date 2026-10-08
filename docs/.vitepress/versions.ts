/**
 * Version numbers written in the guides, kept in one place. Pages use them as {{ $versions.atak }}.
 * The Core version is not here: it comes from public/api/manifest.json, which `pnpm core:sync` sets.
 */
export const versions = {
  // Client and firmware versions that passed a real-device test. Change them only after a new test.
  atak: "5.6.0.12",
  android: "16",
  itak: "2.12.3",
  ios: "26",
  firmware: "2.8.1",

  // The SDK release these docs describe.
  sdk: "0.1.0",
  sdkOpenapiSource: "0.2.0",
  sdkApiRange: ">=0.2.0 <0.3.0",
};
