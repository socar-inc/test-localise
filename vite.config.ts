/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      renderLegacyChunks: true,
      modernPolyfills: true,
    }),
  ],
  build: {
    target: "es2015",
  },
  envDir: "./environments",
});
