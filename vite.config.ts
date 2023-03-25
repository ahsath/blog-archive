import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssr: {
    noExternal: ["@vuelidate/core"],
  },
  build: {
    rollupOptions: {
      input: [
        "templates/index.html",
        "templates/layout-base.html",
        "templates/header.html",
        "template/article.html",
      ], // TODO: dinamically generate this
    },
  },
});
