import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: ["templates/base.html", "templates/counter.html"], // TODO: dinamically generate this
    },
  },
});
