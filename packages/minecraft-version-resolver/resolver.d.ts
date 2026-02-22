import { VersionInfo, Version, TargetOS, Library, ResolvedResource } from './types';
/**
 * Fetches the specific details for a given Minecraft version.
 */
export declare function getVersionDetails(versionInfo: VersionInfo): Promise<Version>;
/**
 * Returns the correct TargetOS based on the current Node platform.
 */
export declare function getTargetOS(): TargetOS;
/**
 * Determines whether a library should be included for the target OS.
 */
export declare function isLibraryAllowed(library: Library, targetOs: TargetOS): boolean;
/**
 * Resolves all resources required by the given version (JAR, libraries, natives, and assets).
 */
export declare function resolveResources(version: Version, targetOs?: TargetOS): Promise<ResolvedResource[]>;
