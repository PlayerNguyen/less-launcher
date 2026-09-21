/// <reference types="vitest/config" />
/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon

// Shares accross all build environments
const pathAliases = {
  "@packages": path.resolve(__dirname, "./packages"),
  "@src": path.resolve(__dirname, "./src"),
  "@components": path.resolve(__dirname, "./src/components"),
  "@electron": path.resolve(__dirname, "./electron"),
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isTest = mode === "test" || process.env.NODE_ENV === "test";

  return {
    resolve: {
      alias: pathAliases,
    },
    plugins: [
      tailwindcss(),
      react(),
      // The Electron plugin must not run during tests: it builds the main
      // process and spawns Electron, which requires a display.
      ...(isTest
        ? []
        : [
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
              renderer: {},
            }),
          ]),
    ],
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(dirname, ".storybook"),
            }),
          ],
          test: {
            name: "storybook",
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [
                {
                  browser: "chromium",
                },
              ],
            },
            setupFiles: [".storybook/vitest.setup.ts"],
          },
        },
      ],
    },
  };
});
