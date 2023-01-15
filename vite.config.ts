import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Components()],
  build: {
    rollupOptions: {
      input: ["templates/base.html", "templates/counter.html"], // TODO: dinamically generate this
    },
  },
});
