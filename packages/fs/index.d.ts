/**
 * Returns the application data directory based on the user's OS.
 * - Windows: `%APPDATA%/less-launcher`
 * - macOS: `~/Library/Application Support/less-launcher`
 * - Linux: `~/.config/less-launcher`
 */
export declare function getAppDataPath(): string;
/**
 * Ensures the given directory path exists.
 */
export declare function ensureDir(dirPath: string): Promise<void>;
