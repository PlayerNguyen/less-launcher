import { runMinecraft } from "@packages/minecraft-runner/runner";
import { getLatestVersions } from "@packages/minecraft-version-resolver";
import { MenuItem } from "electron";
import { randomUUID } from "crypto";

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
  },
];
