import { IpcHandler } from "@packages/ipc/types";
import { listAllVersions } from "../../packages/minecraft-version-resolver";
import { IpcMainInvokeEvent } from "electron";

export class ListMinecraftVersionsHandler implements IpcHandler {
  channel: string = "app:list-minecraft-versions";

  /**
   * Loads a raw version info and extract all versions
   */
  async listener(_: IpcMainInvokeEvent) {
    const rawVersions = (await listAllVersions())
      .filter((versionInfo) => versionInfo.type === "release")
      .map((versionInfo) => versionInfo.id);

    return rawVersions;
  }
}
