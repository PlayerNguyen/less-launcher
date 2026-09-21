import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/react-vite";
import * as projectAnnotations from "./preview";

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);

// Stories run in a browser without the Electron preload bridge. Provide a
// minimal `ipcRenderer` mock so components that call it during mount do not
// throw unhandled errors in tests.
if (typeof window !== "undefined" && !window.ipcRenderer) {
  window.ipcRenderer = {
    invoke: async () => [],
    on: () => window.ipcRenderer,
    off: () => window.ipcRenderer,
    send: () => undefined,
  } as unknown as typeof window.ipcRenderer;
}
