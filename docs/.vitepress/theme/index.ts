import ScalarApiReference from "./ScalarApiReference.vue";
import Screenshot from "./Screenshot.vue";
import mediumZoom, { type Zoom } from "medium-zoom";
import { nextTick, onMounted, watch } from "vue";
import { useRoute, withBase } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "@scalar/api-reference/style.css";
import "./styles.css";
import manifest from "../../public/api/manifest.json";
import { versions } from "../versions";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ScalarApiReference", ScalarApiReference);
    app.component("Screenshot", Screenshot);
    // The Core release the reference and the install files come from; see scripts/sync-core.mjs.
    app.config.globalProperties.$coreVersion = manifest.coreVersion;
    app.config.globalProperties.$versions = versions;
    app.config.globalProperties.$openapiUrl = withBase(`/api/${manifest.openapiFile}`);
  },
  setup() {
    // Screenshots are shown small in the page; a click opens them at full size.
    const route = useRoute();
    let zoom: Zoom | undefined;
    const attachScreenshots = () => {
      zoom?.detach();
      zoom?.attach(".vp-doc img.screenshot");
    };
    onMounted(() => {
      zoom = mediumZoom({ background: "var(--vp-c-bg)", margin: 24 });
      attachScreenshots();
    });
    watch(() => route.path, () => nextTick(attachScreenshots));
  },
};
