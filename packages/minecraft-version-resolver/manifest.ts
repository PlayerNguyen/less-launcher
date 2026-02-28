import { VersionManifest, VersionInfo } from './types'

export const VERSION_MANIFEST_URL = 'https://piston-meta.mojang.com/mc/game/version_manifest_v2.json'

/**
 * Fetches the entire version manifest from Mojang.
 */
export async function getVersionManifest(): Promise<VersionManifest> {
  const response = await fetch(VERSION_MANIFEST_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch version manifest: ${response.statusText}`)
  }
  return response.json()
}

/**
 * Lists all available Minecraft versions.
 */
export async function listAllVersions(): Promise<VersionInfo[]> {
  const manifest = await getVersionManifest()
  return manifest.versions
}

/**
 * Gets the latest release and snapshot version IDs.
 */
export async function getLatestVersions(): Promise<{ release: string; snapshot: string }> {
  const manifest = await getVersionManifest()
  return manifest.latest
}

export async function findVersionInfo(
  versionId: string,
): Promise<VersionInfo | undefined> {
  const manifest = await getVersionManifest();
  const versions = manifest.versions;

  const versionInfo: VersionInfo | undefined = versions.find(
    (version) => version.id === versionId,
  );
  return versionInfo;
} 
