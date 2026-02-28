/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Shares accross all build environments
 */
const pathAliases = {
  "@packages": path.resolve(__dirname, "./packages"),
  "@src": path.resolve(__dirname, "./src"),
  "@components": path.resolve(__dirname, "./src/components"),
  "@electron": path.resolve(__dirname, "./electron"),
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: pathAliases,
  },
  plugins: [
    tailwindcss(),
    react(),
    electron({
      main: {
        entry: "electron/main.ts",
        vite: {
          resolve: {
            alias: pathAliases,
          },
        },
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts"),
        vite: {
          resolve: {
            alias: pathAliases,
          },
        },
      },
      renderer: process.env.NODE_ENV === "test" ? undefined : {},
    }),
  ],
});