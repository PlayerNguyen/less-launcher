import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import { ensureDir, getRuntimePath } from "../fs";
import {
  getLatestJREAsset,
  resolveAdaptiumFolder,
  type AdoptiumAsset,
} from "./adoptium";
import extractZip from "extract-zip";
import * as tar from "tar";

/**
 * Downloads a file to a streaming destination
 */
async function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    https
      .get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          // Handle Adoptium redirect to github releases or mirroring endpoints
          if (!response.headers.location) {
            reject(
              new Error(
                `Redirected, but no location header provided (HTTP ${response.statusCode})`,
              ),
            );
            return;
          }

          file.close();
          // Delete initially created empty file
          fs.unlink(dest, () => {});

          // Recursively try to download following redirect
          downloadFile(response.headers.location, dest)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download file (HTTP ${response.statusCode})`),
          );
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
        reject(err);
      });
  });
}

/**
 * Downloads and extracts the Java Runtime from Adoptium
 * @param version The major version of the runtime to download (e.g. 17)
 * @param onProgress Optional callback to receive status updates
 *
 * @returns a target directory where the runtime is downloaded
 */
export async function setupJavaRuntime(
  version: number | string,
  onProgress?: (message: string) => void,
): Promise<string> {
  const versionStr = version.toString();
  const runtimeBaseDir = getRuntimePath(versionStr);
  await ensureDir(runtimeBaseDir);

  // Create a specific folder for this version using the requested version
  // We'll rename it later when we know the exact extracted name
  const targetDir = path.join(runtimeBaseDir, versionStr);

  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    onProgress?.("Found existing Java Runtime version " + versionStr);
    return await resolveAdaptiumFolder(targetDir);
  }

  onProgress?.(`Resolving latest JRE ${versionStr} details via API...`);
  const jreMeta: AdoptiumAsset = await getLatestJREAsset(versionStr);

  // Download payload
  const archivePath = path.join(runtimeBaseDir, jreMeta.name);
  onProgress?.(
    `Starting download: ${jreMeta.name} (${(jreMeta.size / 1024 / 1024).toFixed(1)} MB)`,
  );

  await downloadFile(jreMeta.url, archivePath);

  // Extract payload
  onProgress?.(`Extracting ${jreMeta.name}...`);

  await ensureDir(targetDir);

  try {
    if (jreMeta.name.endsWith(".zip")) {
      await extractZip(archivePath, { dir: targetDir });
    } else if (jreMeta.name.endsWith(".tar.gz")) {
      await tar.x({
        file: archivePath,
        cwd: targetDir,
      });
    } else {
      throw new Error(`Unsupported archive format: ${jreMeta.name}`);
    }
  } catch (extractErr) {
    onProgress?.(`Failed to extract! Cleaning up...`);
    // Cleanup partial extraction to avoid corrupt state
    fs.rmSync(targetDir, { recursive: true, force: true });
    if (fs.existsSync(archivePath)) fs.unlinkSync(archivePath);
    throw extractErr;
  }

  // Optional: Clean up the archive download
  onProgress?.("Cleaning up archive...");
  fs.unlinkSync(archivePath);

  // We keep the extraction wrapped inside `targetDir`
  // so the java path will typically be APPDATA/runtime/<version>/<jre-root>/bin/java

  onProgress?.(`Java Runtime successfully installed at ${targetDir}`);

  return await resolveAdaptiumFolder(targetDir);
}
