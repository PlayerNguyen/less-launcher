import fs from "fs";
import path from "path";

const BASE_URL = "https://api.adoptium.net/v3/assets/latest";

export interface AdoptiumAsset {
  version: string;
  url: string;
  name: string;
  size: number;
  os: string;
  architecture: string;
}

/**
 * Returns the OS identifier used by Adoptium API
 */
function getAdoptiumOS(): string {
  const platform = process.platform;
  if (platform === "win32") return "windows";
  if (platform === "darwin") return "mac";
  if (platform === "linux") return "linux";
  // Adoptium supports alpine-linux, aix, solaries, etc, but we'll stick to basic 3 for this launcher
  throw new Error(`Unsupported OS platform for JRE download: ${platform}`);
}

/**
 * Returns the architecture identifier used by Adoptium API
 */
function getAdoptiumArchitecture(): string {
  const arch = process.arch;
  if (arch === "x64") return "x64";
  if (arch === "arm64") return "aarch64";
  if (arch === "arm") return "arm";
  if (arch === "ia32") return "x32";
  throw new Error(`Unsupported architecture for JRE download: ${arch}`);
}

/**
 * Fetches the download URL and metadata for the latest JRE of a specified version.
 * @param version The major Java version (e.g., 8, 11, 17, 21)
 */
export async function getLatestJREAsset(
  version: number | string,
): Promise<AdoptiumAsset> {
  const osType = getAdoptiumOS();
  const arch = getAdoptiumArchitecture();

  // API returns an array, we find the binary object that matches our needs
  const apiUrl = `${BASE_URL}/${version}/hotspot?os=${osType}&architecture=${arch}&image_type=jre`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch from Adoptium API (${response.status}): ${await response.text()}`,
    );
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    throw new Error(`No JRE found for version ${version} on ${osType} ${arch}`);
  }

  // Find the exact binary payload in the response (usually there is only one in the array for 'latest')
  const release = data[0];
  const binary = release.binary;
  const pkg = binary.package;

  return {
    version: release.version.semver,
    url: pkg.link,
    name: pkg.name,
    size: pkg.size,
    os: binary.os,
    architecture: binary.architecture,
  };
}

/**
 * Looks for binary directory folder extracted from archived file.
 *
 * @param targetDirectory the target directory
 */
export async function resolveAdaptiumFolder(targetDirectory: string) {
  const files = fs.readdirSync(targetDirectory);
  if (files.length > 1 || files.length === 0) {
    throw new Error(`Unsupported archive format: ${targetDirectory}`);
  }

  return path.resolve(targetDirectory, files[0]);
}
