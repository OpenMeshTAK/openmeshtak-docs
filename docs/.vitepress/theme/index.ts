import ScalarApiReference from "./ScalarApiReference.vue";
import { withBase } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "@scalar/api-reference/style.css";
import "./styles.css";
import manifest from "../../public/api/manifest.json";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ScalarApiReference", ScalarApiReference);
    // The Core release the reference and the install files come from; see scripts/sync-core.mjs.
    app.config.globalProperties.$coreVersion = manifest.coreVersion;
    app.config.globalProperties.$openapiUrl = withBase(`/api/${manifest.openapiFile}`);
  },
};
