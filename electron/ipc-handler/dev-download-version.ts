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
import log from "electron-log";
export class DevDownloadVersionHandler implements IpcHandler {
  channel: string = "dev:download-version";

  /**
   *
   */
  async listener(_: IpcMainInvokeEvent, versionId: string) {
    try {
      log.info(`[Dev] Fetching manifest to find version: ${versionId}`);
      const manifest = await getVersionManifest();
      const versionInfo = manifest.versions.find(
        (v: { id: string }) => v.id === versionId,
      );

      if (!versionInfo) {
        throw new Error(`Version ${versionId} not found in manifest.`);
      }

      log.info(`[Dev] Fetching metadata for ${versionId}...`);
      const details = await getVersionDetails(versionInfo);

      log.info(`[Dev] Resolving required resources for ${process.platform}...`);
      const resources = await resolveResources(details);

      const targetDir = path.join(getAppDataPath(), "versions", versionId);
      log.info(
        `[Dev] Starting download of ${resources.length} objects to ${targetDir}...`,
      );

      await downloadResources(resources, targetDir, {
        concurrency: 10,
        onProgress: (done: number, total: number) => {
          if (done % 50 === 0 || done === total) {
            log.info(
              `[Dev] Download progress: ${done}/${total} (${Math.round((done / total) * 100)}%)`,
            );
          }
        },
      });

      log.info(`[Dev] Successfully downloaded version ${versionId}!`);
      return { success: true, count: resources.length, path: targetDir };
    } catch (err: unknown) {
      log.error(`[Dev] Failed to download version ${versionId}:`, err);
      return { success: false, error: (err as unknown as Error).message };
    }
  }
}
