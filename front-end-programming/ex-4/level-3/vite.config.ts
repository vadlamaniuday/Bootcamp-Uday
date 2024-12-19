import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    minify: true,

    rollupOptions: {
      treeshake: true,
    },

    outDir: "dist",

    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
