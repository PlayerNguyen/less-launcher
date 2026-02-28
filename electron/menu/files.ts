import { getAppDataPath, getMinecraftDirectory } from "@packages/fs";
import { MenuItem, shell } from "electron";

export const fileMenu: (MenuItem | Partial<MenuItem>)[] = [
  {
    label: "File",
    // @ts-ignore
    submenu: [
      {
        label: "Open resource file",
        click: () => {
          shell.showItemInFolder(getAppDataPath());
        },
      },
      {
        label: "Open launcher Minecraft folder",
        click: () => {
          shell.openExternal(getMinecraftDirectory());
        },
      },
    ],
  },
];
