import ScalarApiReference from "./ScalarApiReference.vue";
import DefaultTheme from "vitepress/theme";
import "@scalar/api-reference/style.css";
import "./styles.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ScalarApiReference", ScalarApiReference);
  },
};
