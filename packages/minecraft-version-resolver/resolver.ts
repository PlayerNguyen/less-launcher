import fs from 'node:fs'
import path from 'node:path'
import { getVersionPath } from "../fs";
import {
  VersionInfo,
  Version,
  AssetIndex,
  Library,
  ResolvedResource,
  TargetOS,
} from "./types";
import { shouldAcceptRule } from "../minecraft-manifest-rules/resolver";
import { getSystemCriteria } from "../minecraft-manifest-rules/helper";

/**
 * Fetches the specific details for a given Minecraft version.
 */
export async function getVersionDetails(
  versionInfo: VersionInfo,
): Promise<Version> {
  const versionJsonPath = path.join(
    getVersionPath(versionInfo.id),
    `${versionInfo.id}.json`,
  );

  if (fs.existsSync(versionJsonPath)) {
    const content = await fs.promises.readFile(versionJsonPath, "utf-8");
    return JSON.parse(content);
  }

  const response = await fetch(versionInfo.url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch version details for ${versionInfo.id}: ${response.statusText}`,
    );
  }

  const versionData = await response.json();

  const versionDir = path.dirname(versionJsonPath);
  if (!fs.existsSync(versionDir)) {
    await fs.promises.mkdir(versionDir, { recursive: true });
  }
  await fs.promises.writeFile(
    versionJsonPath,
    JSON.stringify(versionData, null, 2),
    "utf-8",
  );

  return versionData;
}

/**
 * Returns the correct TargetOS based on the current Node platform.
 */
export function getTargetOS(): TargetOS {
  if (process.platform === "win32") return "windows";
  if (process.platform === "darwin") return "osx";
  return "linux";
}

/**
 * Determines whether a library should be included for the target OS.
 * @deprecated use minecraft-manifest-rules for compile conditional
 */
export function isLibraryAllowed(
  library: Library,
  targetOs: TargetOS,
): boolean {
  if (!library.rules || library.rules.length === 0) {
    return true;
  }

  let allowed = false;
  for (const rule of library.rules) {
    if (rule.action === "allow") {
      if (
        !rule.os ||
        rule.os.name === targetOs ||
        (targetOs === "osx" && rule.os.name === "osx")
      ) {
        allowed = true;
      }
    } else if (rule.action === "disallow") {
      if (rule.os && rule.os.name === targetOs) {
        allowed = false;
      }
    }
  }
  return allowed;
}

/**
 * Resolves all resources required by the given version (JAR, libraries, natives, and assets).
 */
export async function resolveResources(
  version: Version,
  targetOs: TargetOS = getTargetOS(),
): Promise<ResolvedResource[]> {
  const resources: ResolvedResource[] = [];

  // 1. Client JAR
  if (version.downloads.client) {
    resources.push({
      url: version.downloads.client.url,
      path: `versions/${version.id}/${version.id}.jar`,
      sha1: version.downloads.client.sha1,
      size: version.downloads.client.size,
    });
  }

  // 2. Libraries
  for (const lib of version.libraries) {
    if (lib.rules && !shouldAcceptRule(lib.rules, getSystemCriteria())) {
      continue;
    }

    // Standard Artifact
    if (lib.downloads?.artifact) {
      if (lib.downloads.artifact.path) {
        resources.push({
          url: lib.downloads.artifact.url,
          path: `libraries/${lib.downloads.artifact.path}`,
          sha1: lib.downloads.artifact.sha1,
          size: lib.downloads.artifact.size,
        });
      }
    }

    // Native classifiers
    if (lib.natives && lib.natives[targetOs]) {
      const nativeKey = lib.natives[targetOs]!;

      const resolvedNativeKey = nativeKey.replace(
        "${arch}",
        process.arch === "x64" ? "64" : "32",
      );

      const nativeDownload = lib.downloads?.classifiers?.[resolvedNativeKey];
      if (nativeDownload && nativeDownload.path) {
        resources.push({
          url: nativeDownload.url,
          path: `libraries/${nativeDownload.path}`,
          sha1: nativeDownload.sha1,
          size: nativeDownload.size,
        });
      }
    }
  }

  // 3. Assets
  if (version.assetIndex) {
    resources.push({
      url: version.assetIndex.url,
      path: `assets/indexes/${version.assetIndex.id}.json`,
      sha1: version.assetIndex.sha1,
      size: version.assetIndex.size,
    });

    const indexResponse = await fetch(version.assetIndex.url);
    if (indexResponse.ok) {
      const assetIndex: AssetIndex = await indexResponse.json();
      for (const value of Object.values(assetIndex.objects)) {
        const hashDir = value.hash.substring(0, 2);
        resources.push({
          url: `https://resources.download.minecraft.net/${hashDir}/${value.hash}`,
          path: `assets/objects/${hashDir}/${value.hash}`,
          sha1: value.hash,
          size: value.size,
        });
      }
    }
  }

  return resources;
}
