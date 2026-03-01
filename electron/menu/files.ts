import { getAppDataPath, getMinecraftDirectory } from "@packages/fs";
import { MenuItem, shell } from "electron";

export const fileMenu: (MenuItem | Partial<MenuItem>)[] = [
  {
    label: "File",
    // @ts-expect-error types mismatch
    submenu: [
      {
        label: "Open resource file",
        click: () => {
          shell.openPath(getAppDataPath());
        },
      },
      {
        label: "Open launcher Minecraft folder",
        click: () => {
          shell.openPath(getMinecraftDirectory());
        },
      },
    ],
  },
];
