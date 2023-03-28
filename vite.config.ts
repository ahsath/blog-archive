import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: [
        "templates/index.html",
        "templates/layout-base.html",
        "templates/header.html",
        "templates/article.html",
      ], // TODO: dinamically generate this
    },
  },
});
