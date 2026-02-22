import { VersionManifest, VersionInfo } from './types';
export declare const VERSION_MANIFEST_URL = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json";
/**
 * Fetches the entire version manifest from Mojang.
 */
export declare function getVersionManifest(): Promise<VersionManifest>;
/**
 * Lists all available Minecraft versions.
 */
export declare function listAllVersions(): Promise<VersionInfo[]>;
/**
 * Gets the latest release and snapshot version IDs.
 */
export declare function getLatestVersions(): Promise<{
    release: string;
    snapshot: string;
}>;
