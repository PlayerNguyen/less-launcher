import { randomUUID } from "node:crypto";
import { runMinecraft } from "@packages/minecraft-runner";
import { getLatestVersions } from "@packages/minecraft-version-resolver";
import { MenuItem } from "electron";

export const debuggerMenu: () => (MenuItem | Partial<MenuItem>)[] = () => [
  new MenuItem({ role: "toggleDevTools" }),
  { type: "separator" },
  {
    label: "Launch",
    submenu: [
      {
        label: "Latest minecraft version",
        click: async () => {
          const latest = await getLatestVersions();
          const latestReleaseVersionId = latest.release;
          await runMinecraft(latestReleaseVersionId, {
            type: "offline",
            username: randomUUID(),
          });
        },
      },
      // biome-ignore lint/suspicious/noExplicitAny: Electron submenu item types do not align exactly
    ] as any,
  },
];
