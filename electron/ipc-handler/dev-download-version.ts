import { getAppDataPath } from "../../packages/fs";
import { IpcHandler } from "../../packages/ipc/types";
import {
  downloadResources,
  getVersionDetails,
  getVersionManifest,
  resolveResources,
} from "../../packages/minecraft-version-resolver";
import { IpcMainInvokeEvent } from "electron";
import * as path from "path";

export class DevDownloadVersionHandler implements IpcHandler {
  channel: string = "dev:download-version";

  /**
   *
   */
  async listener(_: IpcMainInvokeEvent, versionId: string) {
    try {
      console.log(`[Dev] Fetching manifest to find version: ${versionId}`);
      const manifest = await getVersionManifest();
      const versionInfo = manifest.versions.find(
        (v: { id: string }) => v.id === versionId,
      );

      if (!versionInfo) {
        throw new Error(`Version ${versionId} not found in manifest.`);
      }

      console.log(`[Dev] Fetching metadata for ${versionId}...`);
      const details = await getVersionDetails(versionInfo);

      console.log(
        `[Dev] Resolving required resources for ${process.platform}...`,
      );
      const resources = await resolveResources(details);

      const targetDir = path.join(getAppDataPath(), "versions", versionId);
      console.log(
        `[Dev] Starting download of ${resources.length} objects to ${targetDir}...`,
      );

      await downloadResources(resources, targetDir, {
        concurrency: 10,
        onProgress: (done: number, total: number) => {
          if (done % 50 === 0 || done === total) {
            console.log(
              `[Dev] Download progress: ${done}/${total} (${Math.round((done / total) * 100)}%)`,
            );
          }
        },
      });

      console.log(`[Dev] Successfully downloaded version ${versionId}!`);
      return { success: true, count: resources.length, path: targetDir };
    } catch (err: unknown) {
      console.error(`[Dev] Failed to download version ${versionId}:`, err);
      return { success: false, error: (err as unknown as Error).message };
    }
  }
}
