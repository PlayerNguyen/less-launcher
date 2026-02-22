/**
 * Downloads and extracts the Java Runtime from Adoptium
 * @param version The major version of the runtime to download (e.g. 17)
 * @param onProgress Optional callback to receive status updates
 */
export declare function setupJavaRuntime(version: number | string, onProgress?: (message: string) => void): Promise<string>;
