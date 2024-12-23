import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
    proxy: {
      "/public": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
