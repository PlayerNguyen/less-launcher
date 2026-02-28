import { IpcHandler } from "@packages/ipc/types";
import { listAllVersions } from "../../packages/minecraft-version-resolver";

export class ListMinecraftVersionsHandler implements IpcHandler {
  channel: string = "app:list-minecraft-versions";

  /**
   * Loads a raw version info and extract all versions
   */
  async listener() {
    const rawVersions = (await listAllVersions())
      .filter((versionInfo) => versionInfo.type === "release")
      .map((versionInfo) => versionInfo.id);

    return rawVersions;
  }
}
